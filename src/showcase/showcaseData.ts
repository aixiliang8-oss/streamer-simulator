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

export const iterations = [
  {
    version: 'V1',
    title: '能玩，但不像人生',
    quote: '“账本变了，但人生没变。”',
    problem:
      '选择 → 数值变化 → Ending。玩家看得见变化，却感受不到过去真正影响了未来。',
    changes: ['识别长期因果缺失'],
  },
  {
    version: 'V2',
    title: '让选择产生长期因果',
    quote: '“这是因为我之前做了那个决定。”',
    problem: '让一次选择可以在几个事件之后，重新产生影响。',
    changes: [
      'Cause Feedback',
      'Hidden State',
      'Tag',
      'Violation Risk',
      '后续事件解锁',
      '差异化 Ending',
    ],
  },
  {
    version: 'V3',
    title: '从事件题目变成人生片段',
    quote: '“我成为了什么样的主播？”',
    problem: '让事件从一道选择题，变成一个主播人生片段。',
    changes: [
      '场景化事件',
      '更模糊的选择',
      'Persona',
      'Life Report',
      '像素游戏视觉',
    ],
  },
] as const;

export const workflow = [
  {
    role: '我',
    subtitle: 'Product Owner',
    tasks: ['产品目标', '核心机制', '优先级', '验收'],
  },
  {
    role: 'ChatGPT',
    subtitle: 'Product Thinking',
    tasks: ['产品拆解', '玩法讨论', 'Prompt', '阶段规划'],
  },
  {
    role: 'Codex',
    subtitle: 'Engineering',
    tasks: ['工程实现', '游戏系统', '测试', 'GitHub / Deployment'],
  },
  {
    role: 'Claude',
    subtitle: 'Product Review',
    tasks: ['产品 Review', 'Debug', 'UI 与交互优化'],
  },
  {
    role: 'Gemini / GPT',
    subtitle: 'Visual',
    tasks: ['Pixel Art', '视觉资产'],
  },
] as const;
