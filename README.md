# 主播模拟器

移动端优先的文字选择与主播生涯模拟游戏。目前已完成 Phase 3 Narrative Upgrade，包含一个角色、七天二十个固定事件、带取舍的成长选择、七类核心命运、一个安全兜底结局和结构化主播人格报告。

## 本地开发

```bash
npm install
npm run dev
```

## 质量检查

```bash
npm run lint
npm run format:check
npm run test
npm run build
```

产品与技术约定见 `docs/`。`src/game/` 是不依赖 React 的游戏领域层；当前 Prototype 不包含随机事件、存档和完整内容。
