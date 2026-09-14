export const productionUrl = 'https://streamer-simulator-pied.vercel.app/';
export const repositoryUrl =
  'https://github.com/aixiliang8-oss/streamer-simulator';

export const visibleStats = ['人气', '粉丝', '口碑', '财富', '精神', '违规'];

export const hiddenStats = [
  '平台信任',
  '商业价值',
  '法律风险',
  '核心粉丝忠诚',
  '黑粉',
];

export const designPrinciples = [
  {
    index: '01',
    title: '没有绝对正确的选择',
    body: '认真经营不一定永远正确，追求流量也不一定永远错误。每个选项代表不同价值取向，以及会在未来显现的代价。',
  },
  {
    index: '02',
    title: '数字变化不是结果，人生变化才是',
    body: '属性只是底层状态。真正重要的是，过去的选择会不会在未来重新出现。',
  },
  {
    index: '03',
    title: 'Ending 不是分数，而是一段人生',
    body: '最终不是告诉玩家得了多少分，而是让他看见：自己最终成为了怎样的主播。',
  },
] as const;

export const iterations = [
  {
    version: 'V1',
    title: '能玩，但不像人生',
    quote: '“我的账本变了，但我的人生没变。”',
    problem:
      '最初的循环是选择、数值变化、下一个事件、Ending。玩家看得见增长，却感受不到选择真的改变了未来。',
    changes: ['识别“数值反馈”与“叙事后果”的断层', '把问题定义为长期因果缺失'],
  },
  {
    version: 'V2',
    title: '让选择产生长期因果',
    quote: '“这是因为我之前做了那个决定。”',
    problem:
      '只显示 +10 / -5 会让玩家像在做选择题，而不是在经营一段会回头影响自己的职业生涯。',
    changes: [
      'Cause Feedback 与隐藏状态反馈',
      'Tag、违规风险与后续事件解锁',
      '差异化 Ending',
    ],
  },
  {
    version: 'V3',
    title: '从事件题目变成人生片段',
    quote: '“我成为了什么样的主播？”',
    problem:
      '事件仍然像一道道题。于是把时间、地点、人物状态和更模糊的价值取向放进叙事。',
    changes: [
      '场景化事件表达',
      'Persona 与 Life Report',
      '像素人生模拟视觉重构',
    ],
  },
] as const;

export const workflow = [
  {
    role: '我',
    subtitle: 'Product Owner',
    tasks: ['产品目标', '核心机制', '优先级判断', '产品取舍与验收'],
  },
  {
    role: 'ChatGPT',
    subtitle: 'Product Thinking',
    tasks: ['产品拆解', '玩法讨论', 'Prompt 设计', '阶段规划'],
  },
  {
    role: 'Codex',
    subtitle: 'Engineering',
    tasks: ['工程架构', '状态系统', '功能实现', '测试与部署'],
  },
  {
    role: 'Claude',
    subtitle: 'Product Review',
    tasks: ['产品 Review', 'UI Review', '交互与前端打磨'],
  },
  {
    role: 'Gemini / GPT',
    subtitle: 'Visual Exploration',
    tasks: ['像素视觉探索', '场景素材', '结局配图'],
  },
] as const;
