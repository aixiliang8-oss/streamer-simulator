# Assets

角色、场景、事件与结局视觉资源按用途分类存放。所有图片的接入点只有一个文件：
`src/assets/scenes/registry.ts`，其余页面代码不需要为新增图片而修改。

## 目录约定

```text
src/assets/
├── scenes/
│   ├── registry.ts        ← 唯一需要编辑的接入文件
│   ├── events/             事件专属插画（第一次开播、舆论危机……）
│   └── categories/         事件分类的共用背景（日常、商务、舆论……）
├── characters/              主播角色立绘（按 Character.id 命名）
└── endings/                 结局插画（按 Ending 标题命名，用于人生报告封面）
```

## 接入方式

1. 把图片文件放进对应目录。
2. 在 `registry.ts` 顶部 `import` 该文件。
3. 把它写入对应的映射表：
   - `EVENT_SCENE_IMAGES[eventId]`：某个具体事件的背景插画，优先级最高；
   - `CATEGORY_SCENE_IMAGES[category]`：一个分类下事件共用的背景，事件没有专属插画时回退到这里；
   - `CHARACTER_PORTRAIT_IMAGES[characterId]`：叠加在场景之上的主播立绘；
   - `ENDING_ILLUSTRATION_IMAGES[endingTitle]`：人生报告海报顶部的结局插画（用结局标题文本作为 key，因为 `LifeReport` 只携带标题，不携带 Ending 机器 ID）。

在任何一张图片就位之前，`SceneImage` 组件会用按事件情绪（日常 / 高光 / 舆论 / 商务 / 人生选择）生成的渐变色占位，`ReportPage` 的封面区同理。图片就位后自动替换，不需要改动 `GamePage.tsx` / `ReportPage.tsx` 或任何游戏逻辑。
