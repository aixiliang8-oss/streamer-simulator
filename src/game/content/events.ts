import type { Event } from '../model/types';

export const events: readonly Event[] = [
  {
    id: 'first-stream',
    title: '第一次直播',
    description:
      '晚上八点，你按下“开始直播”。房间里只有电脑风扇，比你更像一位成熟主播。',
    time: '晚上 20:03',
    location: '出租屋 · 临时直播角',
    scene:
      '环形灯把半张床也照进了镜头。你把外卖盒推到显示器后面，深吸一口气，按下“开始直播”。在线人数还是 0，电脑风扇先替你暖了场。',
    category: '开播',
    day: 1,
    order: 1,
    availableDays: [1],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'first-stream-careful',
        label: '认真调试，先和空气打招呼',
        resultText:
          '你完整讲完了开场白。虽然没人回应，平台觉得这个新人至少很稳定。',
        hiddenFeedback: ['平台认为你的开播表现稳定，推荐意愿略有上升。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 3,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 2 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 4,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -4,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 4,
          },
        ],
      },
      {
        id: 'first-stream-clickbait',
        label: '标题写成“今晚干票大的”',
        resultText: '人确实多了一点。问题是你还没想好今晚到底要干什么大的。',
        hiddenFeedback: ['平台对夸张标题的耐心正在下降。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 12,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -3,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 20,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: -5,
          },
          { type: 'addTag', tagId: 'clickbait' },
        ],
      },
    ],
  },
  {
    id: 'empty-room',
    title: '直播冷场',
    description:
      '在线人数：3。其中一个是你的小号，一个可能是误触，还有一个沉默得像房管。',
    time: '晚上 21:17',
    location: '直播间',
    scene:
      '准备好的段子已经讲完，弹幕区安静得能听见楼上拖椅子。在线人数显示 3：一个是你的小号，一个可能是误触，最后一个沉默得像房管。',
    category: '日常',
    day: 1,
    order: 2,
    availableDays: [1],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'empty-room-chat',
        label: '把仅有的观众当老朋友',
        resultText: '你认真聊了二十分钟。那个沉默的观众临走前点了关注。',
        hiddenFeedback: ['有观众开始记住你的开播时间。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -6,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 12 },
          { type: 'addTag', tagId: 'genuine' },
        ],
      },
      {
        id: 'empty-room-fake-traffic',
        label: '花钱刷点人气撑场面',
        resultText:
          '数字热闹起来了，弹幕却仍然安静。平台把这份热闹记在了小本本上。',
        hiddenFeedback: ['异常流量让平台开始留意这个直播间。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 18,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 25 },
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 25,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: -15,
          },
          { type: 'addTag', tagId: 'fakeTraffic' },
        ],
      },
    ],
  },
  {
    id: 'first-feedback',
    title: '第一批观众反馈',
    description:
      '下播后，后台真的多了几条留言。你反复刷新，确认它们不是系统通知。',
    time: '深夜 00:26',
    location: '床边 · 手机屏幕',
    scene:
      '灯已经关了，手机还亮着。后台多出三条留言，你刷新了四次，确认它们不是系统通知。有人说“明天还来”，短短五个字让你暂时忘了房租。',
    category: '粉丝',
    day: 1,
    order: 3,
    availableDays: [1],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'feedback-reply',
        label: '逐条认真回复他们',
        causeText: '因为你曾认真对待冷清直播间，早期观众愿意再回来。',
        resultText:
          '昨天被认真对待的人，今天又回来了。小直播间第一次有了熟面孔。',
        hiddenFeedback: ['熟悉的名字正在从路人变成核心观众。'],
        isImportant: true,
        conditions: [{ type: 'tag', tagId: 'genuine', present: true }],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 12 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -4,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
        ],
      },
      {
        id: 'feedback-overstate',
        label: '截图发动态：“家人们太爱我了”',
        causeText: '因为你没有建立稳定互动，只能把零散反馈包装成热闹。',
        resultText: '动态看起来声势浩大，只要没人细数截图里其实只有三条留言。',
        hiddenFeedback: ['夸张动态吸引来一些专门挑刺的围观者。'],
        conditions: [{ type: 'tag', tagId: 'genuine', present: false }],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 8,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 5 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -4,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 5 },
        ],
      },
      {
        id: 'feedback-watch-numbers',
        label: '什么也不回，只盯着增长曲线',
        resultText:
          '曲线动了一下。你也不确定是涨了一个粉，还是页面刷新时抖了一下。',
        hiddenFeedback: ['你的数据意识让账号显得更像一门生意。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'first-hater',
    title: '黑粉出现',
    description:
      '第二天刚开播，一条弹幕飘过：“就这水平也能当主播？”房间突然热闹了。',
    time: '晚上 22:08',
    location: '直播间 · 弹幕区',
    scene:
      '一条弹幕慢悠悠飘过：“就这水平也能当主播？”紧接着有人复制，有人劝架，还有人熟练地打开录屏。你第一次被这么多人同时看见。',
    category: '舆论',
    day: 4,
    order: 1,
    availableDays: [4],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'hater-fight',
        label: '直接和他对线',
        resultText: '直播间人数翻了几倍。有人为你喝彩，也有人开始录屏。',
        hiddenFeedback: ['争议切片正在外溢，反对你的人开始聚集。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 20,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 10 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -12,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 30,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 25 },
          { type: 'addTag', tagId: 'controversial' },
        ],
      },
      {
        id: 'hater-explain',
        label: '拆开争议讲清楚，放弃今晚的爆点',
        resultText: '热度很快散了，但有人发弹幕说：“至少他愿意把话讲完。”',
        hiddenFeedback: [
          '平台认为你处理冲突比较克制。',
          '几位老观众开始愿意在争议中替你说话。',
        ],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 8 },
          { type: 'addTag', tagId: 'calmResponse' },
        ],
      },
      {
        id: 'hater-mute',
        label: '先禁言保住节奏，下播后再处理',
        resultText: '直播顺利播完。下播后，一个名字很像的小号仍在评论区等你。',
        hiddenFeedback: ['被禁言的人没有消失，只是换了一个地方继续围观。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -4,
          },
          { type: 'changeStat', scope: 'visible', key: 'mentality', amount: 5 },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 5 },
        ],
      },
    ],
  },
  {
    id: 'first-business',
    title: '第一次商业机会',
    description:
      '私信里躺着第一封商务邀约。品牌名字陌生，报价却足够你吃好几顿外卖。',
    time: '下午 15:40',
    location: '便利店窗边',
    scene:
      '你正用吸管搅一杯最便宜的冰美式，手机弹出第一封商务邀约。品牌名字像临时起的，报价却足够支付半个月外卖。对方最后一句是：“老师，今晚能上吗？”',
    category: '商务',
    day: 4,
    order: 2,
    availableDays: [4],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'business-risky-ad',
        label: '黑红也是红，接下擦边推广',
        causeText: '因为你曾公开回应黑粉，品牌看中了你的争议流量。',
        resultText:
          '钱到账了，平台警告也到了。你第一次发现通知红点可以让人心跳这么快。',
        hiddenFeedback: [
          '平台明显降低了对这个直播间的信任。',
          '这份合作留下了一些说不清楚的法律风险。',
        ],
        isImportant: true,
        conditions: [{ type: 'tag', tagId: 'controversial', present: true }],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 60 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 25,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -15,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 40,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: -20,
          },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: 15 },
          { type: 'addTag', tagId: 'riskyAd' },
        ],
      },
      {
        id: 'business-review',
        label: '花一晚查产品，报一个可持续的价',
        resultText:
          '你拒绝了夸张话术，赚得不多，却第一次被当成一个可以长期合作的人。',
        hiddenFeedback: [
          '品牌开始把你当成可以长期合作的对象。',
          '平台对这次规范合作给出了更积极的评价。',
        ],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 25 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -6,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 20,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 8,
          },
        ],
      },
      {
        id: 'business-decline',
        label: '把档期留给内容，接受这周没收入',
        resultText: '银行卡没有变化，直播内容却多了一晚可以慢慢打磨。',
        hiddenFeedback: ['留下来的观众更相信你会认真把直播做下去。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -6,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: 10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
        ],
      },
    ],
  },
  {
    id: 'first-gift',
    title: '第一份礼物',
    description:
      '一个叫“加班到秃头”的观众送出价值一块钱的小心心。礼物动画很短，你却愣了半天。',
    time: '晚上 22:41',
    location: '直播间',
    scene:
      '屏幕忽然炸开一颗像素小心心。一个叫“加班到秃头”的观众送出价值一块钱的礼物。动画只亮了两秒，你却盯着它看了很久——原来真的有人愿意为这间小屋付钱。',
    category: '粉丝',
    day: 2,
    order: 1,
    availableDays: [2],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'gift-remember-name',
        label: '认真念出名字，好好说谢谢',
        resultText:
          '你有点磕巴地道谢。第二天，“加班到秃头”又准时出现在直播间。',
        hiddenFeedback: ['第一位愿意送礼物的观众，开始把这里当成固定去处。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -2,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 4,
          },
          { type: 'changeStat', scope: 'visible', key: 'mentality', amount: 5 },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
          { type: 'addTag', tagId: 'receivedFirstGift' },
        ],
      },
      {
        id: 'gift-big-performance',
        label: '立刻表演一个夸张的感谢节目',
        resultText:
          '你对着一块钱的小心心鞠了三个躬。这段表演意外比正片更受欢迎。',
        hiddenFeedback: [
          '有人喜欢你的节目效果，也有人开始研究你到底是真诚还是熟练。',
          '账号第一次显露出可以把互动变成收入的潜力。',
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 12,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 10 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -3,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 3 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 8,
          },
          { type: 'addTag', tagId: 'receivedFirstGift' },
        ],
      },
    ],
  },
  {
    id: 'keep-going',
    title: '今晚还播吗',
    description:
      '连续几晚开播后，你第一次在开播按钮前坐了十分钟。观众不多，疲惫倒是非常稳定。',
    time: '晚上 19:58',
    location: '出租屋 · 电脑前',
    scene:
      '开播提醒已经响了两次，你还穿着白天上班的外套。泡面在桌角慢慢变软，几个熟悉的头像可能正在等。观众不多，疲惫倒是每天准时到场。',
    category: '坚持',
    day: 2,
    order: 2,
    availableDays: [2],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'keep-going-schedule',
        label: '按约定时间准时开播',
        resultText:
          '人数依然不多，但几个熟悉的头像在你开口前就发来了“晚上好”。',
        hiddenFeedback: [
          '稳定开播让平台更愿意继续观察你。',
          '固定出现的观众开始形成最早的陪伴感。',
        ],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 12 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -12,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 6,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
          { type: 'addTag', tagId: 'consistent' },
        ],
      },
      {
        id: 'keep-going-rest',
        label: '请假一晚，把自己从椅子上拔下来',
        resultText:
          '你发了一条请假动态。只有两个人点赞，但其中一个留言：“先好好休息。”',
        hiddenFeedback: [
          '观众没有因为一次请假消失，反而更相信屏幕后面是个真人。',
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -3,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 3,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: 18,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 4 },
          { type: 'addTag', tagId: 'selfCare' },
        ],
      },
    ],
  },
  {
    id: 'content-direction',
    title: '到底播什么',
    description:
      '你看了三小时同行：有人唱歌，有人整活，有人只是吃外卖，在线人数却比你通讯录好友还多。',
    time: '凌晨 01:12',
    location: '床上 · 同行直播间',
    scene:
      '你裹着被子刷了三小时同行：有人唱歌，有人整活，有人只是在镜头前吃外卖，在线人数却比你通讯录好友还多。推荐页越刷越懂你，你却越来越不知道自己该播什么。',
    category: '定位',
    day: 2,
    order: 3,
    availableDays: [2],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'direction-community',
        label: '把直播间做成深夜聊天室',
        resultText: '你没有最炸的节目，却渐渐知道每个常来的人今天过得怎么样。',
        hiddenFeedback: ['观众开始因为“这里有人记得我”而回来。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -4,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 8 },
          { type: 'addTag', tagId: 'communityStyle' },
        ],
      },
      {
        id: 'direction-trends',
        label: '什么火就播什么，先让人进来',
        resultText:
          '你的直播分类一天换三次。观众不知道你是谁，但算法至少认识了你。',
        hiddenFeedback: [
          '围观的人变多了，挑刺的人也跟着进来了。',
          '商务方开始注意到你追热点的速度。',
        ],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 18,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 20 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 8 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 5,
          },
          { type: 'addTag', tagId: 'trendChaser' },
        ],
      },
      {
        id: 'direction-craft',
        label: '磨一项能长期播的内容',
        resultText:
          '数据涨得慢，但你第一次没有在下播后问自己：“明天还能播什么？”',
        hiddenFeedback: ['稳定内容让平台逐渐理解该把你推荐给谁。'],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -5 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 5,
          },
          { type: 'addTag', tagId: 'craftStyle' },
        ],
      },
    ],
  },
  {
    id: 'first-viral',
    title: '第一次爆火',
    description:
      '醒来时，昨晚的一段直播切片突然有了十万播放。你本人还没睡醒，互联网已经替你上班了。',
    time: '上午 09:06',
    location: '被窝 · 手机通知页',
    scene:
      '手机震得像在床头开了一场发布会。昨晚那段你自己都嫌尴尬的切片，播放量已经越过十万。你本人还没洗脸，互联网已经替你上了半天班。',
    category: '流量',
    day: 3,
    order: 1,
    availableDays: [3],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'viral-reply-community',
        label: '回到评论区，接住熟悉的观众',
        causeText: '因为你曾认真经营小直播间，爆火之后还有人记得原来的你。',
        resultText:
          '新观众来看热闹，老观众帮你解释前因后果。评论区第一次像个真正的社区。',
        hiddenFeedback: ['早期观众在突如其来的流量里产生了更强的归属感。'],
        conditions: [{ type: 'tag', tagId: 'genuine', present: true }],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 20,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 25 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: -5,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 12 },
          { type: 'addTag', tagId: 'viral' },
        ],
      },
      {
        id: 'viral-squeeze-traffic',
        label: '置顶切片，连夜复制同款内容',
        resultText:
          '同一个梗被你播了八遍。第六遍时观众还在笑，第八遍时只剩你在笑。',
        hiddenFeedback: ['快速增长吸引了商务目光，也带来了更挑剔的围观者。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 30,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 45 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -6,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 12 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 10,
          },
          { type: 'addTag', tagId: 'viral' },
        ],
      },
      {
        id: 'viral-observe',
        label: '先复盘它为什么火，不急着庆功',
        resultText:
          '你记下观众在哪一秒笑、在哪一秒划走。爆款第一次变成了可以学习的东西。',
        hiddenFeedback: [
          '平台认为你接住了流量，没有立刻把直播间变成事故现场。',
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 15,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 20 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 8,
          },
          { type: 'addTag', tagId: 'viral' },
        ],
      },
    ],
  },
  {
    id: 'fan-community',
    title: '直播间有了自己的暗号',
    description:
      '观众开始重复你无意间说过的一句怪话。你听了五分钟，才发现这个梗的原作者竟然是自己。',
    time: '晚上 20:52',
    location: '直播间 · 弹幕区',
    scene:
      '弹幕突然整齐地刷起一句怪话，新来的观众不停问什么意思。你听了五分钟，才想起那是自己冷场时随口说的。一个失误，被他们认真养成了暗号。',
    category: '粉丝',
    day: 3,
    order: 2,
    availableDays: [3],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'community-build-language',
        label: '接住这个梗，让它成为直播间暗号',
        causeText: '因为你选择了陪伴型内容，观众开始共同创造这个直播间。',
        resultText:
          '新观众一头雾水，老观众笑成一片。小房间第一次有了自己的语言。',
        hiddenFeedback: ['核心观众因为共同记忆变得更难离开。'],
        conditions: [{ type: 'tag', tagId: 'communityStyle', present: true }],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: -4,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 12 },
          { type: 'addTag', tagId: 'fanCulture' },
        ],
      },
      {
        id: 'community-open-door',
        label: '解释来龙去脉，别让新人被挡在门外',
        resultText:
          '老观众负责玩梗，你负责翻译。直播间既有暗号，也没有变成私人群聊。',
        hiddenFeedback: ['新老观众都更容易在直播间找到位置。'],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 12 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -4,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 8 },
        ],
      },
      {
        id: 'community-ignore',
        label: '别管暗号，继续准备好的流程',
        resultText:
          '流程很完整，笑声却比平时少了一点。你完成了节目，也错过了一次共同记忆。',
        hiddenFeedback: ['部分老观众觉得这个直播间开始不像从前。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: -5 },
        ],
      },
    ],
  },
  {
    id: 'traffic-or-fans',
    title: '粉丝和流量，先照顾谁',
    description:
      '数据告诉你，新观众喜欢高强度整活；弹幕告诉你，老观众只是想听你聊聊最近过得怎么样。',
    time: '晚上 23:18',
    location: '直播后台',
    scene:
      '后台曲线在整活时陡然抬头，熟悉的头像却越来越少说话。运营建议你趁热再来一轮，老观众问：“今晚还能聊会儿天吗？”两个窗口同时闪着，谁都没有替你做决定。',
    category: '抉择',
    day: 3,
    order: 3,
    availableDays: [3],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'traffic-first',
        label: '复制爆款公式，先把人留下来',
        resultText: '在线人数继续上涨，熟悉的弹幕却被更快的新消息冲走了。',
        hiddenFeedback: [
          '商业价值继续上升，最早留下的人却开始怀疑这里是否还需要自己。',
        ],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 25,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 30 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: -6 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 12,
          },
          { type: 'addTag', tagId: 'trafficFirst' },
        ],
      },
      {
        id: 'fans-first',
        label: '放慢节奏，和一路留下的人聊聊',
        resultText: '峰值人数掉了一截，但下播时还有人在弹幕里认真说晚安。',
        hiddenFeedback: ['核心观众确认，爆火之后的你仍然记得他们。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 5,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: -6,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 15 },
          { type: 'addTag', tagId: 'fansFirst' },
        ],
      },
    ],
  },
  {
    id: 'mcn-invitation',
    title: 'MCN 发来邀请',
    description:
      '一家 MCN 说要把你“打造成下一个现象级主播”。合同十二页，梦想只写在第一页。',
    time: '下午 14:30',
    location: 'MCN 公司会议室',
    scene:
      '会议室墙上挂着十几个百万主播的照片。经纪人把合同推到你面前，说你缺的只是“专业放大”。合同十二页，梦想写在第一页，违约责任从第六页开始。',
    category: '签约',
    day: 4,
    order: 3,
    availableDays: [4],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'mcn-sign-now',
        label: '签约换资源，接受团队排期',
        resultText:
          '运营、剪辑、选品群一夜之间全有了。你也第一次在合同里看见自己的违约金。',
        hiddenFeedback: [
          '团队资源显著抬高了你的商业价值。',
          '复杂合同也悄悄增加了未来的法律风险。',
        ],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 80 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 15,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -12,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 20,
          },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: 15 },
          { type: 'addTag', tagId: 'signedMCN' },
        ],
      },
      {
        id: 'mcn-review-contract',
        label: '花钱审合同，保留谈判空间',
        resultText:
          '律师圈出的条款比合同正文还醒目。MCN 的笑容也从“家人”变回了“合作方”。',
        hiddenFeedback: ['你保留了合作可能，也把隐藏的合同风险压低了一些。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -8 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: -5 },
          { type: 'addTag', tagId: 'independent' },
        ],
      },
      {
        id: 'mcn-refuse',
        label: '先不签，我还想知道自己能走多远',
        resultText:
          '你关掉了合同。没有团队替你兜底，但直播间暂时还完全属于你。',
        hiddenFeedback: ['老观众喜欢这种笨拙但自主的选择。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -8,
          },
          { type: 'changeStat', scope: 'visible', key: 'mentality', amount: 5 },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
          { type: 'addTag', tagId: 'independent' },
        ],
      },
    ],
  },
  {
    id: 'platform-rule-update',
    title: '平台规则突然更新',
    description:
      '平台凌晨发布新版规范，标题叫《营造健康直播生态》。全文八千字，违规案例看起来有几个很眼熟。',
    time: '凌晨 02:14',
    location: '直播后台 · 系统公告',
    scene:
      '后台弹出一份八千字的新规，关闭按钮灰了五秒。你一边往下滑，一边发现违规案例越看越眼熟。群里的同行都在问同一句话：“这个到底算不算我？”',
    category: '平台',
    day: 5,
    order: 1,
    availableDays: [5],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'rules-study',
        label: '停播半晚，重做内容清单',
        resultText:
          '你第一次把平台规范当睡前读物。很催眠，但至少醒来时直播间还在。',
        hiddenFeedback: ['平台发现你主动修正了内容，对账号恢复了一些信任。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 15,
          },
          { type: 'addTag', tagId: 'compliant' },
        ],
      },
      {
        id: 'rules-clean-fake-traffic',
        label: '删掉异常数据，主动停止刷量',
        causeText: '因为你曾经购买虚假流量，这次规则更新直接指向了你的操作。',
        resultText: '后台数字掉了一截，却第一次显得像真正属于你的数字。',
        hiddenFeedback: ['主动清理异常数据，让平台重新评估了这个直播间。'],
        conditions: [{ type: 'tag', tagId: 'fakeTraffic', present: true }],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: -15 },
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -5 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: -20,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 10,
          },
          { type: 'removeTag', tagId: 'fakeTraffic' },
        ],
      },
      {
        id: 'rules-ignore',
        label: '沿用成熟玩法，赌执行尺度没那么严',
        resultText:
          '你把公告划走了。平台没有回复，但推荐曲线很快替它表达了意见。',
        hiddenFeedback: ['平台降低了对账号的信任，审核也变得更严格。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 15,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: -10,
          },
        ],
      },
    ],
  },
  {
    id: 'first-collab',
    title: '第一次和主播连麦',
    description:
      '对面是比你大一些的主播。连麦开始前，你们互相说“多多关照”；开始后，双方都在抢下一句话。',
    time: '晚上 21:36',
    location: '双人连麦直播间',
    scene:
      '倒计时结束，对方的脸出现在屏幕另一半。开场前你们都说“多多关照”，开场后双方运营都在私信提醒：“别让话掉地上，也别让镜头全被抢走。”',
    category: '同行',
    day: 5,
    order: 2,
    availableDays: [5],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'collab-support',
        label: '接住对方的话，一起把节目做好',
        resultText:
          '这场直播没有谁碾压谁。下播后，对方认真发来一句：“下次还可以一起。”',
        hiddenFeedback: ['观众和平台都更认可你处理合作关系的方式。'],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 20 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 5,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 8 },
          { type: 'addTag', tagId: 'creatorFriend' },
        ],
      },
      {
        id: 'collab-steal-show',
        label: '抓住机会，把镜头全部抢过来',
        resultText:
          '切片里你赢得很彻底。对方的粉丝也非常团结地来到评论区问候你。',
        hiddenFeedback: ['节目效果带来新流量，也制造了一批组织明确的反对者。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -5 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 25,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 25 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 15 },
          { type: 'addTag', tagId: 'competitive' },
        ],
      },
      {
        id: 'collab-follow-script',
        label: '照着运营台本完成整场连麦',
        causeText: '因为你已经签约 MCN，运营为这场连麦准备了完整台本。',
        resultText:
          '每一个笑点都准时发生。观众看得很顺，你却像替另一个人播完了一场直播。',
        hiddenFeedback: ['标准化合作进一步提高了商业价值。'],
        conditions: [{ type: 'tag', tagId: 'signedMCN', present: true }],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 20 },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 15,
          },
        ],
      },
    ],
  },
  {
    id: 'sponsor-crisis',
    title: '合作产品翻车了',
    description:
      '昨天推荐的产品被用户投诉。品牌让你先别回应，评论区却已经把“主播出来解释”刷成了队形。',
    time: '上午 10:23',
    location: '厨房 · 品牌群聊',
    scene:
      '你刚咬下第一口早餐，品牌群突然跳出九十九条消息。昨天推荐的产品被用户投诉，品牌让你“统一口径，暂不回应”；评论区则把“主播出来解释”刷成了队形。',
    category: '危机',
    day: 5,
    order: 3,
    availableDays: [5],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'crisis-stop-and-check',
        label: '暂停推广，自己查清问题',
        resultText: '品牌不太高兴，但观众第一次看到你把“负责”放在报价前面。',
        hiddenFeedback: [
          '平台认可了你的主动处理。',
          '短期商务价值下降，长期合作信誉却更稳了一点。',
        ],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -10 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 15,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: -5,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
        ],
      },
      {
        id: 'crisis-delete-comments',
        label: '先按品牌要求冷处理',
        resultText:
          '你保住了当期合作，质疑却被截图搬到更多地方。互联网替品牌永久保存了沉默。',
        hiddenFeedback: [
          '删评激怒了更多围观者。',
          '拖延回应让潜在法律风险继续上升。',
        ],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 20 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -15,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 20,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 20 },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: 10 },
        ],
      },
      {
        id: 'crisis-admit-price-first',
        label: '承认当时只看了报价，公开道歉',
        causeText: '因为你曾接下擦边推广，这场危机和当时的选择直接相关。',
        resultText:
          '道歉不体面，也没有让所有人满意。但至少这次，你没有继续躲在合同后面。',
        hiddenFeedback: ['坦白降低了一部分法律风险，也让平台看到你愿意修正。'],
        conditions: [{ type: 'tag', tagId: 'riskyAd', present: true }],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -20 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'legalRisk',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 8,
          },
          { type: 'removeTag', tagId: 'riskyAd' },
        ],
      },
    ],
  },
  {
    id: 'algorithm-cold-wave',
    title: '算法突然不认识你了',
    description:
      '昨天还在上涨的推荐量，今天像被拔了网线。运营说这是“正常波动”，这四个字通常不负责安慰人。',
    time: '晚上 20:47',
    location: '直播后台 · 数据面板',
    scene:
      '开播四十分钟，推荐人数还停在个位数。昨天那条漂亮曲线像一场集体幻觉。运营说这是“正常波动”，这四个字很专业，唯一的问题是不负责安慰人。',
    category: '平台',
    day: 6,
    order: 1,
    availableDays: [6],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'algorithm-trust-plan',
        label: '按原计划播，等真正的观众回来',
        causeText: '因为平台仍然信任你的账号，稳定内容还有机会重新进入推荐。',
        resultText:
          '数字很难看，但那些主动搜到直播间的人，比推荐页上的路人更愿意留下。',
        hiddenFeedback: ['核心观众在流量低谷里表现得比算法更稳定。'],
        conditions: [
          {
            type: 'stat',
            scope: 'hidden',
            key: 'platformTrust',
            comparator: 'gte',
            value: 50,
          },
        ],
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 10 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
        ],
      },
      {
        id: 'algorithm-appeal',
        label: '整理材料，向平台申诉',
        causeText:
          '因为平台对账号信任不足，你必须先证明这些流量和内容是正常的。',
        resultText:
          '你提交了十几张截图和一份没人教过你写的说明。申诉按钮终于变成了“处理中”。',
        hiddenFeedback: ['主动说明让平台重新审视了账号历史。'],
        conditions: [
          {
            type: 'stat',
            scope: 'hidden',
            key: 'platformTrust',
            comparator: 'lt',
            value: 50,
          },
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 12,
          },
        ],
      },
      {
        id: 'algorithm-change-style',
        label: '立刻换内容，重新追推荐',
        resultText:
          '新内容重新换来一些曝光。老观众进来后问：“今天是不是走错直播间了？”',
        hiddenFeedback: ['数据更适合商业包装，但长期观众的熟悉感有所松动。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 15,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -5,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: -5 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 8,
          },
        ],
      },
    ],
  },
  {
    id: 'fan-boundary',
    title: '榜一想走进你的生活',
    description:
      '送礼最多的观众私信问你住在哪个区，说有一份“只想亲手交给你”的礼物。',
    time: '深夜 00:48',
    location: '私信列表',
    scene:
      '送礼最多的观众没有像往常一样说晚安。他问你住在哪个区，说准备了一份“只想亲手交给你”的礼物。输入框上方一直显示：对方正在输入。',
    category: '边界',
    day: 6,
    order: 2,
    availableDays: [6],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'boundary-refuse-private',
        label: '感谢支持，但拒绝私人见面',
        resultText:
          '对方沉默了一会儿，最后回了一个“理解”。你保住了边界，也接受了礼物可能变少。',
        hiddenFeedback: ['清晰边界降低了未来的纠纷风险。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: -5 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 8,
          },
          { type: 'changeStat', scope: 'visible', key: 'mentality', amount: 5 },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: -5 },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
          { type: 'addTag', tagId: 'healthyBoundary' },
        ],
      },
      {
        id: 'boundary-accept',
        label: '大哥这么支持，见一面也没什么',
        resultText:
          '礼物比想象中贵，聊天也比想象中私人。你开始分不清感谢、承诺和工作。',
        hiddenFeedback: ['粉丝关系变得更牢，也变得更难安全退出。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 40 },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 10 },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
          { type: 'changeStat', scope: 'hidden', key: 'legalRisk', amount: 10 },
          { type: 'addTag', tagId: 'blurredBoundary' },
        ],
      },
      {
        id: 'boundary-public-rules',
        label: '公开说明礼物和私联边界',
        resultText:
          '有人说你太冷漠，也有人第一次意识到，主播下播后仍然是一个需要生活的人。',
        hiddenFeedback: [
          '规则让真正愿意长期支持的人更安心，也让平台减少了担忧。',
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 8,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
          { type: 'addTag', tagId: 'healthyBoundary' },
        ],
      },
    ],
  },
  {
    id: 'burnout-night',
    title: '镜头关了，你还在表演',
    description:
      '下播后，你对着黑掉的屏幕继续笑了两秒。外卖凉了，手机里还有十七条“明天一定要更努力”。',
    time: '凌晨 03:07',
    location: '出租屋 · 熄灭的环形灯旁',
    scene:
      '直播已经结束，你对着黑掉的屏幕又笑了两秒。外卖凉透了，窗外只剩零星几盏灯。手机备忘录里还有十七条“明天一定要更努力”，没有一条写着什么时候休息。',
    category: '压力',
    day: 6,
    order: 3,
    availableDays: [6],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'burnout-rest',
        label: '停一天，允许自己什么都不产出',
        resultText:
          '你睡到自然醒，没有错过改变命运的热点。至少这一天，你重新像个普通人。',
        hiddenFeedback: ['愿意长期留下的人接受了你的暂时缺席。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: 25,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 5 },
          { type: 'addTag', tagId: 'selfCare' },
        ],
      },
      {
        id: 'burnout-force-stream',
        label: '趁还能笑，连播到天亮',
        resultText:
          '凌晨四点，在线人数达到新高。你看着数字，已经想不起自己为什么高兴。',
        hiddenFeedback: ['极限直播提高了账号的短期商业吸引力。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 20,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -25,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 10,
          },
          { type: 'addTag', tagId: 'burnout' },
        ],
      },
      {
        id: 'burnout-talk-openly',
        label: '在直播里承认：最近真的有点累',
        resultText:
          '你第一次没有努力制造情绪。弹幕安静了一会儿，然后有人说：“累就歇会儿。”',
        hiddenFeedback: [
          '坦诚让核心观众更愿意把你当作真实的人，而不是内容机器。',
        ],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: 10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 12 },
        ],
      },
    ],
  },
  {
    id: 'career-crossroads',
    title: '你想成为什么样的主播',
    description:
      '流量、观众、合同和警告都来过了。你终于发现，“继续播”不是答案，只是下一道题。',
    time: '傍晚 18:55',
    location: '出租屋 · 尚未开灯的直播间',
    scene:
      '开播前五分钟，你没有像往常一样立刻打开环形灯。流量、观众、合同和警告都来过了。显示器映出你的脸，你第一次认真问：如果继续，这间直播间最终要变成什么？',
    category: '人生选择',
    day: 7,
    order: 1,
    availableDays: [7],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'career-content',
        label: '做能被少数人长期记住的内容',
        resultText: '你放弃了一部分最快的增长，开始认真想象一年后的直播间。',
        hiddenFeedback: ['核心观众相信自己会参与这段更长的旅程。'],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -10,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 12,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 10 },
          { type: 'addTag', tagId: 'careerCreator' },
        ],
      },
      {
        id: 'career-business',
        label: '把直播认真做成一门生意',
        resultText:
          '你打开报价表，也给自己写下底线。理想开始有成本，职业也开始有边界。',
        hiddenFeedback: ['明确的商业路线显著提高了未来合作价值。'],
        isImportant: true,
        effects: [
          { type: 'changeStat', scope: 'visible', key: 'money', amount: 60 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 20,
          },
          { type: 'addTag', tagId: 'careerBusiness' },
        ],
      },
      {
        id: 'career-controversy',
        label: '既然争议有流量，那就把争议做到最大',
        causeText: '因为你已经成为争议主播，这条更快也更危险的路仍然向你敞开。',
        resultText:
          '你知道下一场会有更多人来，也知道其中很多人不是为了喜欢你。',
        hiddenFeedback: [
          '反对者正在变成流量的一部分，品牌也开始重新计算与你合作的代价。',
        ],
        conditions: [{ type: 'tag', tagId: 'controversial', present: true }],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 35,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 40 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 10,
          },
          { type: 'changeStat', scope: 'hidden', key: 'haters', amount: 15 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 8,
          },
          { type: 'addTag', tagId: 'careerControversy' },
        ],
      },
    ],
  },
  {
    id: 'stage-summary',
    title: '第一阶段总结',
    description:
      '第六场直播结束前，你看着屏幕上的数字。它们还很小，但已经不再全是零。',
    time: '深夜 23:59',
    location: '直播间 · 最后一盏灯前',
    scene:
      '这一阶段的最后一分钟，弹幕让你别急着下播。后台数字依然不算大，却已经不再全是零。你把手放在结束按钮上，突然想起第一晚只有电脑风扇回应你。',
    category: '成长',
    day: 7,
    order: 2,
    availableDays: [7],
    weight: 1,
    conditions: [],
    choices: [
      {
        id: 'summary-chase-heat',
        label: '追着热度，再冲一把',
        resultText:
          '你学会了怎样让更多人停下来看你，也开始习惯被陌生目光打量。',
        hiddenFeedback: ['商务方开始注意到你的流量增长。'],
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: 20,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 40 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: -5,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'mentality',
            amount: -10,
          },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'violation',
            amount: 10,
          },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'commercialValue',
            amount: 8,
          },
        ],
      },
      {
        id: 'summary-remember-people',
        label: '记住每一个留下的人',
        resultText: '你认真说了晚安。屏幕暗下去前，有人回复：“明天见。”',
        hiddenFeedback: [
          '平台逐渐认可这个稳定的小直播间。',
          '“明天见”正在变成一小群人的固定约定。',
        ],
        isImportant: true,
        effects: [
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'popularity',
            amount: -5,
          },
          { type: 'changeStat', scope: 'visible', key: 'fans', amount: 15 },
          {
            type: 'changeStat',
            scope: 'visible',
            key: 'reputation',
            amount: 10,
          },
          { type: 'changeStat', scope: 'visible', key: 'mentality', amount: 5 },
          {
            type: 'changeStat',
            scope: 'hidden',
            key: 'platformTrust',
            amount: 5,
          },
          { type: 'changeStat', scope: 'hidden', key: 'loyalty', amount: 15 },
        ],
      },
    ],
  },
];
