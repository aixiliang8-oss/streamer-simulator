# 《主播模拟器》项目交接文档

> 用途：供 Claude 或其他 AI 工具接手视觉优化、体验 Review 和后续迭代。  
> 当前阶段：Phase 3 Narrative Experience Upgrade 已完成。  
> 更新日期：2026-09-14。

## 0. 接手前必读

开始工作前，请依次阅读：

1. `docs/PRODUCT.md`：产品定位与长期玩法定义；
2. `docs/TECHNICAL_PLAN.md`：领域模型、引擎边界和工程原则；
3. `docs/ROADMAP.md`：已完成阶段与长期路线；
4. 本文件：当前真实实现、已知问题和接手建议。

重要边界：

- `src/game/` 是不依赖 React 的游戏领域层；
- React 页面只负责展示和提交玩家意图；
- 不要在组件中直接增减属性、应用 Effect 或判断 Ending；
- 当前 7 天、20 个事件是固定顺序的 Prototype，不是正式随机事件系统；
- `sources/` 是只读同步资料，不要修改。

## 1. 当前产品定位

《主播模拟器》是一款中文、移动端优先、竖屏 H5 独立小游戏。

玩家扮演一个从零开始直播的普通年轻人，在出租屋、直播间、平台后台、MCN 会议室和手机屏幕之间，面对冷场、涨粉、礼物、黑粉、爆款、商务、平台规则、粉丝边界和精神压力。

核心玩法是：

> 文字选择 + 数值养成 + 隐藏状态 + Tag 因果 + 多结局 + 主播人生报告。

当前版本重点验证的不是经营系统深度，而是：

> 玩家能否感到每一次选择都在塑造自己最终成为哪一种主播。

内容基调：

- 年轻、有互联网感；
- 有一点荒诞和黑色幽默；
- 有真实的主播行业细节；
- 有疲惫感，但最终温暖、有希望；
- 核心情绪是“房间很小，梦想暂时没有上限”。

视觉方向：

- authentic medium-coarse pixel art；
- 中国独立像素游戏；
- 夜晚的小卧室 / 小直播间；
- 深靛蓝、紫色和品牌粉；
- pixel indie HUD × livestream overlay；
- 不做赛博朋克、日韩二次元手游、SaaS Dashboard、3D 或写实风格。

## 2. 当前游戏流程

当前一局为 1 个角色、7 天、20 个固定事件：

```text
StartPage
  ↓ 选择“新人主播”
createGame(character)
  ↓
GamePage：展示 Event 场景与可用 Choice
  ↓ 玩家选择
applyChoice(gameState, choiceId)
  ↓
应用显性 / 隐藏属性、Tag
写入 History
检查提前 Ending
推进到下一个固定 Event
  ↓
GamePage：展示本次结果、属性变化和 Hidden Feedback
  ↓ 继续直播
下一个 Event
  ↓
完成全部事件或提前结束
  ↓
createLifeReport(gameState, character)
  ↓
ReportPage：Ending、Persona、总结、最终状态、可展开人生轨迹
  ↓
重新开始
```

事件阶段：

1. 新人主播：第一次开播、冷场、第一批反馈、第一份礼物、是否坚持、内容定位；
2. 成长主播：第一次爆火、直播间文化、粉丝与流量冲突；
3. 流量主播：黑粉、商务、MCN、平台规则、连麦、产品危机；
4. 主播人生选择：算法低谷、粉丝边界、过度疲劳、职业方向和阶段总结。

选择会影响：

- 可见属性；
- 隐藏属性；
- Tags；
- 后续可用 Choice；
- History；
- Ending 和 Persona。

当前不是随机事件池。Engine 会按 `day + order` 对事件排序后依次推进。

## 3. 当前页面结构

项目没有接入正式路由库。`src/app/App.tsx` 根据会话状态条件渲染三个页面。

### 3.1 StartPage

文件：`src/pages/StartPage.tsx`

当前内容：

- Prototype 状态标签；
- LIVE Logo 占位；
- 游戏标题和副标题；
- 唯一角色“新人主播”；
- 三项初始属性摘要；
- 开始游戏按钮。

已知问题：底部仍显示“2 天 · 6 个事件”，实际已经是 7 天、20 个事件。

### 3.2 GamePage

文件：`src/pages/GamePage.tsx`

事件状态展示：

- Day 与已经历事件数；
- 六项可见属性 HUD；
- 违规风险提示；
- 事件分类和幕次；
- 时间、地点、场景；
- 因果解锁提示；
- 2～3 个 Choice。

结果状态展示：

- 选择结果文案；
- 可见属性变化；
- Hidden Feedback 定性提示；
- 继续游戏或查看报告。

### 3.3 ReportPage

文件：`src/pages/ReportPage.tsx`

默认展示顺序：

1. 主播人生报告；
2. Ending；
3. Persona；
4. 基于本局选择生成的一句话总结；
5. 主播成长标签；
6. 降低视觉权重的最终属性；
7. “查看完整人生轨迹”按钮；
8. 重新开始。

人生轨迹默认折叠。展开后每条记录显示：

- Day 和具体时间；
- 地点；
- 事件标题和场景；
- 玩家选择；
- 结果文案；
- 显性属性影响；
- Hidden Feedback；
- 关键选择标记。

### 3.4 公共 UI

- `src/components/ui/GameShell.tsx`：375px 移动端游戏容器，桌面居中；
- `src/components/ui/PixelButton.tsx`：通用像素按钮；
- `src/components/game/StatGrid.tsx`：六项属性展示；
- `src/styles/tokens.css`：颜色、字号、间距、阴影和边框 Token；
- `src/styles/global.css`：全局样式。

视觉调整应优先复用 Token。不要在页面里随意增加孤立颜色值。

## 4. 当前数据结构

核心类型集中在 `src/game/model/types.ts`。

### 4.1 Character

只读角色配置，包括：

- `id`、`name`、`description`；
- `initialStats`；
- `initialHiddenStats`；
- `initialTags`；
- `talents`。

当前只实现 `newcomerCharacter`。

### 4.2 GameState

一局游戏的唯一运行时事实来源：

- `schemaVersion`；
- `status`；
- `day`、`eventIndexInDay`；
- `character`；
- `stats`、`hiddenStats`；
- `tags`；
- `history`；
- `currentEventId`；
- `ending`。

当前没有运行时函数、React 对象或不可序列化数据。

### 4.3 VisibleStats

- `popularity`：人气；
- `fans`：粉丝；
- `reputation`：口碑；
- `money`：财富；
- `mentality`：精神状态；
- `violation`：违规值。

### 4.4 HiddenStats

- `haters`：黑粉值；
- `platformTrust`：平台信任；
- `loyalty`：核心粉丝忠诚度；
- `commercialValue`：商业价值；
- `legalRisk`：法律风险。

隐藏属性不展示数字，只通过事件文案和 Hidden Feedback 暗示变化。

### 4.5 Event

主要字段：

```ts
interface Event {
  id: string;
  title: string;
  description: string;
  time?: string;
  location?: string;
  scene?: string;
  category: string;
  day: number;
  order: number;
  availableDays?: readonly number[];
  weight: number;
  conditions: Condition[];
  choices: Choice[];
}
```

`description` 是兼容摘要。当前 UI 优先显示 `scene`，缺失时回退到 `description`。

### 4.6 Choice

主要字段：

- `id`、`label`；
- `resultText`；
- `causeText?`：因 Tag / 属性 / 历史出现该选项的原因；
- `hiddenFeedback?`：隐藏状态的定性反馈；
- `isImportant?`；
- `conditions?`；
- `effects`。

当前 Choice 设计原则是：每项都尽量同时拥有短期收益、长期代价和明确价值观。

### 4.7 Condition 与 Effect

Condition 是判别联合：

- `stat`；
- `tag`；
- `history`。

Effect 是判别联合：

- `changeStat`；
- `addTag`；
- `removeTag`；
- `triggerEnding`。

不要向内容数据中加入任意回调函数或脚本字符串。

### 4.8 HistoryItem

每次选择记录：

- 顺序和发生 Day；
- `eventId`、`choiceId`；
- 结果摘要；
- 本次 Effects；
- Hidden Feedback；
- 是否为关键选择。

### 4.9 Ending 与 Persona

Ending 包括：

- `id`、`title`、`description`；
- `type: gameOver | career`；
- `priority`；
- `conditions`；
- `persona`。

Persona 结构：

```ts
interface Persona {
  title: string;
  tags: string[];
  description: string;
}
```

当前结局：

- 永久封禁；
- 离开直播的人；
- 黑红边缘主播；
- 商业化主播；
- 深夜陪伴主播；
- 流量爆发主播；
- 慢热坚持者；
- 直播仍在继续（无条件安全兜底）。

Ending 条件基于 Stats、HiddenStats 和 Tags。报告生成时会结合 History 中的职业关键选择，为 Persona 增加一个路线标签，例如 `#内容理想`、`#经营路线` 或 `#争议路线`。

### 4.10 LifeReport

报告包括：

- Ending 标题与描述；
- Character 名称；
- Persona；
- 生存天数；
- 最终可见属性；
- 一句话总结；
- `moments` 人生轨迹。

每个 Moment 包含事件时间、地点、场景、选择、结果、显性属性变化、Hidden Feedback 和关键选择标记。

## 5. 已完成功能

- React + TypeScript + Vite 工程；
- strict TypeScript；
- ESLint、Prettier、Vitest、Testing Library；
- 375px 移动端优先容器；
- 基础像素风 Token 和 UI 组件；
- 一个可选角色“新人主播”；
- 7 天、20 个固定叙事事件；
- 数据驱动 Event / Choice / Effect；
- Choice 条件筛选；
- 显性属性和隐藏属性结算；
- Tag 增删；
- History 记录；
- Choice 因果提示；
- Hidden Feedback；
- 违规值 50 / 80 / 100 风险反馈；
- 每次选择后的提前 Ending 检查；
- 最终职业 Ending 匹配与优先级；
- 结构化 Persona；
- 故事化人生报告；
- 默认折叠、可展开的完整人生轨迹；
- 重新开始完整流程；
- Engine 与 React 分层测试。

当前质量基线：

- `npm run lint` 通过；
- `npm run test`：2 个测试文件、14 个测试通过；
- `npm run format:check` 通过；
- `npm run build` 通过。

本地运行：

```bash
npm install
npm run dev
```

Vite 默认访问地址通常为 `http://localhost:5173/`；以终端实际输出为准。

## 6. 未解决的问题

### 6.1 P0：体验一致性

- StartPage 仍写“2 天 · 6 个事件”，实际为 7 天、20 个事件；
- “可玩的 Prototype”标签适合内部演示，但会削弱玩家代入感；
- 当前没有真实 Logo、角色图、卧室场景或事件插图；
- Report 虽已重构信息顺序，但仍缺少真正具有截图和传播价值的终局视觉；
- 需要在真实 375px 手机尺寸完整试玩，检查长场景文案、按钮换行和报告展开后的阅读节奏。

### 6.2 内容与平衡

- 当前事件固定，重玩时故事顺序完全一致；
- Choice 会改变数值、Tag、部分后续选项和结局，但不会替换整段事件链；
- 结局阈值目前主要用于 Prototype 验证，尚未经过足够多的路线覆盖和平衡测试；
- Persona 仍以规则模板为主，个性化总结只引用首个选择与最后一个关键选择；
- History 全量展开后有 20 条，移动端仍可能过长；后续可考虑“关键节点优先 + 查看全部”。

### 6.3 引擎能力

- Event 顶层 `conditions`、`weight`、`availableDays` 已有数据字段，但当前固定推进尚未使用它们做随机筛选；
- 没有 seed、随机数状态、事件冷却、重复策略、动态权重、解锁事件列表或屏蔽事件列表；
- 没有正式内容注册与运行时校验；
- 没有存档、恢复或 schema migration；
- 当前 `src/game/store/`、`src/app/router/`、`src/app/providers/` 仍是预留目录。

### 6.4 产品范围

- 只有一个角色，尚未实现颜值新人、搞笑社牛、才艺选手和富二代体验生活的正式差异；
- 尚未实现 30 天内容；
- 没有 AI API、后端、账号、支付或平台 SDK；
- 没有分享、保存报告图片或社交传播入口；
- 没有音效、复杂动画和最终美术资源。

## 7. 下一阶段建议

### 7.1 给 Claude 的当前建议：先做视觉与体验 Review

建议先进行一次不改规则的视觉审查，重点回答：

1. 首屏能否在 10 秒内传达“普通年轻人的主播人生”；
2. 事件页是否更像具体生活场景，而不是文字卡片题库；
3. HUD 是否像直播间叠层，而不是数据 Dashboard；
4. Choice 是否容易点击、文案是否有呼吸空间；
5. 结果反馈是否能表现“选择落下”的情绪，而不只是数字结算；
6. Report 首屏是否值得截图，Ending 和 Persona 是否成为视觉主角；
7. 展开 20 条人生轨迹后是否仍然易读。

视觉优化优先顺序建议：

1. 修正 StartPage 过期文案；
2. 建立卧室直播间背景层和明确的游戏 Logo 区；
3. 重构事件卡片的信息层级：时间地点 → 场景 → 因果 → Choice；
4. 为风险状态、礼物、爆款、平台通知建立一致的直播浮层语言；
5. 把 Report 首屏做成可截图的终局卡片；
6. 再处理细节动效和装饰。

视觉修改时请保持：

- 不改变 Engine API；
- 不在 React 中判断 Ending 或计算 Effect；
- 优先使用 `styles/tokens.css`；
- 优先使用 HTML / CSS，图片只用于角色、场景、事件和结局插图；
- 继续保证 375px 竖屏和桌面居中；
- 不接入新的网络服务、统计或 AI API。

### 7.2 视觉 Review 之后的工程阶段

若视觉体验验证通过，建议下一项独立任务再选择其一，不要同时展开：

- 正式 Event Engine：seed、权重、条件筛选、冷却、解锁、屏蔽和内容校验；
- 完整角色系统：四角色、角色天赋、专属 Choice 和事件权重差异；
- Report 分享能力：终局海报、图片导出和分享入口；
- 存档系统：`localStorage`、版本校验和迁移。

其中，若目标是继续验证“选择改变人生”，优先正式 Event Engine；若目标是近期面试展示，优先视觉优化和 Report 截图价值。
