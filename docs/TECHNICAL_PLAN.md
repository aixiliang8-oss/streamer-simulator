# 《主播模拟器》技术方案

> 文档状态：Phase 0 建议方案，具体依赖在 Phase 1 锁定  
> 更新日期：2026-09-14

## 1. 技术目标

首版采用 React、TypeScript 和 Vite，面向移动端竖屏 H5。架构优先保证内容可扩展、规则可测试、存档可迁移和 UI 可替换，而不是过早建设后端或复杂编辑器。

最重要的边界是：

> React 负责展示与交互；游戏引擎负责状态转换；角色、事件和结局以数据定义。

## 2. 推荐工程目录

```text
主播模拟器/
├── docs/
│   ├── PRODUCT.md
│   ├── TECHNICAL_PLAN.md
│   └── ROADMAP.md
├── public/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── routes.tsx
│   ├── game/
│   │   ├── model/
│   │   │   ├── game-state.ts
│   │   │   ├── character.ts
│   │   │   ├── event.ts
│   │   │   ├── ending.ts
│   │   │   └── rules.ts
│   │   ├── engine/
│   │   │   ├── create-game.ts
│   │   │   ├── select-event.ts
│   │   │   ├── apply-choice.ts
│   │   │   ├── evaluate-condition.ts
│   │   │   ├── apply-effect.ts
│   │   │   ├── check-ending.ts
│   │   │   └── random.ts
│   │   ├── content/
│   │   │   ├── characters/
│   │   │   ├── events/
│   │   │   ├── endings/
│   │   │   └── tags.ts
│   │   ├── persistence/
│   │   │   ├── save-store.ts
│   │   │   └── migrations.ts
│   │   └── selectors/
│   ├── screens/
│   │   ├── StartScreen/
│   │   ├── CharacterSelectScreen/
│   │   ├── GameScreen/
│   │   └── ReportScreen/
│   ├── components/
│   │   ├── game/
│   │   └── ui/
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   ├── assets/
│   ├── test/
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

目录意图：

- `game/model`：只定义稳定领域类型，不依赖 React。
- `game/engine`：纯函数式规则层，输入旧状态和动作，输出新状态与结算结果。
- `game/content`：角色、事件、Tag 和结局配置；不放 UI 行为。
- `game/persistence`：序列化、校验、版本迁移和异常恢复。
- `selectors`：把底层状态转换成 UI 需要的数据，避免组件理解规则细节。
- `screens` / `components`：只处理页面流程、展示和用户输入。
- `styles`：尽早建立色彩、间距、字号、像素边框等设计令牌。

初期内容量很小时，事件可以按主题放在少量 TypeScript 文件中；不要为了“一事件一文件”制造大量碎片。内容增长后再按章节、题材或事件链拆分。

## 3. 核心数据实体

以下结构表达关系与职责，不是最终字段的硬性实现。

### 3.1 GameState

`GameState` 是一局游戏唯一可持久化的事实来源：

```ts
interface GameState {
  schemaVersion: number;
  runId: string;
  seed: string;
  rngState: number;
  status: 'playing' | 'ended';
  day: number;
  eventIndexInDay: number;
  maxDays: number;
  characterId: CharacterId;
  stats: VisibleStats;
  hiddenStats: HiddenStats;
  tags: TagId[];
  timedStatuses: TimedStatus[];
  currentEventId?: EventId;
  unlockedEventIds: EventId[];
  blockedEventIds: EventId[];
  eventOccurrences: Record<EventId, number>;
  history: HistoryEntry[];
  endingId?: EndingId;
}
```

约束：

- 所有状态变更都通过引擎动作完成，不允许组件直接修改字段。
- 可推导数据不重复存档；例如当前可选事件池应按状态计算。
- `history` 记录对结局、报告和调试有意义的事件及选择，不保存整个 UI 快照。
- 时间推进的唯一单位需要固定。推荐同时记录 `day` 与 `eventIndexInDay`，由引擎统一换算顺序。

### 3.2 Character

`Character` 是只读内容配置，用来创建初始状态并持续修正玩法：

```ts
interface Character {
  id: CharacterId;
  name: string;
  description: string;
  initialStats: VisibleStats;
  initialHiddenStats: HiddenStats;
  initialTags: TagId[];
  talents: Talent[];
  eventWeightModifiers: WeightModifier[];
}
```

角色专属差异通过可组合的天赋、条件、权重修正和选项条件表达，避免在 UI 中写 `if (characterId === ...)`。

### 3.3 Event

`Event` 是可被事件引擎筛选和抽取的只读内容：

```ts
interface GameEvent {
  id: EventId;
  title: string;
  description: string;
  time?: string;
  location?: string;
  scene?: string;
  category: EventCategory;
  timing: EventTiming;
  baseWeight: number;
  conditions: Condition[];
  weightModifiers?: WeightModifier[];
  repeatPolicy?: RepeatPolicy;
  choices: Choice[];
}
```

`description` 是兼容旧内容的简短摘要；`time`、`location` 和 `scene` 为可选叙事字段。当前 UI 优先展示 `scene`，字段缺失时回退到 `description`。

日数、角色、属性、Tag、前置事件和关键选择都统一表达成 `Condition`，不要为每种条件不断增加顶层字段。编辑体验需要的便捷写法可以在加载阶段转换成统一内部结构。

### 3.4 Choice

`Choice` 隶属于事件：

```ts
interface Choice {
  id: ChoiceId;
  label: string;
  conditions?: Condition[];
  effects: Effect[];
  resultText: string;
  significance?: 'normal' | 'major';
}
```

`Effect` 建议采用受控的判别联合，例如：

- 调整或设置显性 / 隐藏属性；
- 添加、移除 Tag 或限时状态；
- 解锁、屏蔽事件；
- 记录剧情标记；
- 推进时间；
- 指定立即结局。

常规内容避免保存任意函数或执行字符串脚本，以便校验、测试、调试和未来制作内容工具。确实无法声明表达的少数复杂机制，再由经过注册的规则处理器扩展。

### 3.5 Ending

`Ending` 同样是只读内容配置：

```ts
interface Ending {
  id: EndingId;
  title: string;
  description: string;
  persona: {
    title: string;
    tags: string[];
    description: string;
  };
  type: 'gameOver' | 'career';
  priority: number;
  conditions: Condition[];
}
```

- 每次选择结算后检查 `gameOver` 结局。
- 到达最后一天并完成最后一个事件后检查 `career` 结局。
- 多个结局同时满足时由明确优先级和稳定次序决定。
- 正常结局必须有无条件兜底项。
- `persona` 是结局携带的只读叙事配置，人生报告直接使用它，不在 React 中重新判断主播类型。
- 报告生成器负责把 History 和 Event 内容组合为人生轨迹，并过滤出可展示的显性属性变化；React 不重新执行 Effect。

## 4. 实体关系

```text
Character ──创建/修正──▶ GameState ◀──读取/更新── Game Engine
                              │                       │
                              │ 用于筛选              │ 应用选择
                              ▼                       ▼
                         Event ──包含──▶ Choice ──Effects──▶ 新 GameState
                              │                              │
                              └────记录到 History───────────┘
                                                             │
                                  每次结算/最终日后检查       ▼
                                                        Ending
```

关键关系：

- `Character`、`Event`、`Choice`、`Ending` 是只读定义；`GameState` 是运行时状态。
- 定义之间通过稳定 ID 引用，存档不复制整份内容配置。
- 引擎根据 `GameState + 内容定义 + 玩家动作` 生成新 `GameState`。
- `HistoryEntry` 保存 `eventId`、`choiceId`、发生时点、关键结果摘要，为后续因果条件和人生报告服务。

## 5. 规则引擎边界

建议把一轮选择处理成固定管线：

1. 验证当前事件和选项是否匹配且可用。
2. 按定义顺序应用效果。
3. 对有上下限的属性进行统一归一化。
4. 写入历史记录和关键选择。
5. 清理或推进限时状态。
6. 检查立即结局和 Game Over。
7. 若未结束，推进事件序号 / 天数并选取下一事件。
8. 返回新状态以及供 UI 播放的结算反馈。

UI 只派发类似 `startGame(characterId)`、`choose(choiceId)`、`continue()` 的意图，不参与计算增减值或结局。

## 6. 随机、权重与可复现性

- 每局创建随机种子，所有游戏随机行为只使用引擎内的种子随机数生成器。
- 存档同时保存随机数状态，以保证刷新页面后不会重抽结果。
- 自动化测试可以固定种子，稳定复现事件链。
- 事件抽取需要定义重复策略、冷却和无候选兜底。
- 关键剧情可以使用解锁后保底或显著增权，不能只依靠极低概率等待。

## 7. 状态管理建议

Vertical Slice 阶段优先使用 React Context + `useReducer` 承接页面订阅，核心 reducer 调用纯游戏引擎。暂不引入重量级状态管理库；当状态订阅性能、调试能力或跨模块编排出现实际压力时再评估 Zustand 等方案。

不要把 React reducer 本身当作领域引擎。引擎仍应能在没有浏览器和 React 的测试环境中独立运行。

## 8. 内容定义与校验

- 初期使用 TypeScript 内容对象，获得字段提示和静态检查。
- 在内容注册入口统一检查 ID 重复、引用缺失、非法权重、空选项和无效条件。
- 当内容转为外部 JSON 或引入编辑器时，再增加运行时 schema 校验（可评估 Zod）。
- 建立开发期内容检查：无法触发的事件、缺失前置、无出口事件链、重复 ID、未知 Tag、永远无法命中的结局。
- 所有展示文本与机器 ID 分离，后续更改文案不破坏存档。

## 9. 存档方案

第一阶段使用 `localStorage`，建议保存一个带元数据的存档信封：

```ts
interface SaveEnvelope {
  schemaVersion: number;
  savedAt: string;
  gameState: GameState;
}
```

要求：

- 固定存档 key 并带项目命名空间；
- 读取时解析、校验并迁移，不能盲目信任浏览器数据；
- 写入采用完整快照，捕获配额或序列化错误；
- 损坏或过旧存档提供“放弃旧存档并重新开始”的安全路径；
- 开发期提供清空存档入口，但不自动删除用户进度。

## 10. UI 与样式策略

- 以窄屏为基准设计，建议先覆盖约 360～430 CSS 像素宽度。
- 使用 CSS 自定义属性定义颜色、字号、间距、边框和动效时长。
- 页面层负责状态布局，通用组件保持无游戏规则知识。
- 最小点击区域、文本对比度、动态安全区域和长文案溢出需纳入测试。
- 像素风不应牺牲文本清晰度；正文不强制使用难读的像素字体。
- 动效尊重 `prefers-reduced-motion`。

## 11. 测试策略

Phase 1 建议配置 Vitest 与 React Testing Library，后续分层测试：

- 引擎单元测试：条件判断、效果应用、属性边界、时间推进、结局优先级。
- 种子测试：相同种子与相同选择得到相同结果。
- 内容校验测试：ID、引用、条件、Tag 和兜底完整性。
- 流程测试：一局 Vertical Slice 能开始、选择、结束、保存和恢复。
- 移动端人工验收：窄屏、触摸区域、长文案、刷新恢复。

## 12. 暂不建设

- 后端与远程同步；
- ECS 或通用工作流平台；
- 可视化剧情编辑器；
- 微前端；
- 服务端状态管理；
- AI 文案生成；
- 为尚未出现的性能问题提前优化。

## 13. 关键技术决策摘要

1. **纯函数规则引擎**：React 之外独立运行和测试。
2. **声明式内容模型**：条件与效果使用受控结构，数据通过稳定 ID 关联。
3. **可复现随机**：每局 seed 与随机状态进入存档。
4. **版本化存档**：从首版设置 schema 版本和迁移入口。
5. **历史是核心数据**：关键选择和重大事件既驱动后续条件，也生成最终报告。
