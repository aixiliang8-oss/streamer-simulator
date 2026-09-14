import type { Ending } from '../model/types';

export const endings: readonly Ending[] = [
  {
    id: 'permanent-ban',
    title: '永久封禁',
    description:
      '直播间图标变成了灰色的“已封禁”，粉丝群主动把置顶换成了小号链接——那条链接三天后也没人回。MCN 的合作邮件比封禁通知来得还快，主题只有一个词：“终止”。\n\n接下来的几个月，你手机相册里存着几十条没发出去的开播文案。深夜刷到别人的直播间，你会下意识去数弹幕，像戒断反应。有人在评论区认出你，也有人完全没认出来——这两种感觉一样陌生。\n\n很久以后你才想明白：不是流量抛弃了你，是你把每一次“再试一次”都当成了不用还的钱。环形灯还留在角落积灰，你没扔，也没再打开过。',
    persona: {
      title: '规则豪赌者',
      tags: ['流量至上', '高风险玩家'],
      description: '你把每一次平台提醒都当成还能再试一次，直到再也没有下一次。',
    },
    type: 'gameOver',
    priority: 100,
    conditions: [
      {
        type: 'stat',
        scope: 'visible',
        key: 'violation',
        comparator: 'gte',
        value: 100,
      },
    ],
  },
  {
    id: 'left-streaming',
    title: '离开直播的人',
    description:
      '环形灯拔掉插头的那晚，房间第一次在晚上八点就是暗的。手机震动提醒“该开播了”，你划掉，然后去洗了个不赶时间的澡。\n\n接下来的日子有点笨拙——你花了两周才想起白天该做什么，原来晚上不直播之后，一天可以有那么多空隙。老观众陆续私信问你去哪了，你回复得很慢，但都回了。\n\n直播间的数据永远停在了退出那天，可你没有。很久以后偶尔想起那段日子，你会觉得那是段挺拼命的青春，只是终于知道，下播不是失败，是终于敢把自己还给自己。',
    persona: {
      title: '生活重启者',
      tags: ['及时止损', '重新生活'],
      description:
        '你承认坚持并不总比离开勇敢，把自己从永不下播的夜里领了回来。',
    },
    type: 'gameOver',
    priority: 90,
    conditions: [
      {
        type: 'stat',
        scope: 'visible',
        key: 'mentality',
        comparator: 'lte',
        value: 15,
      },
    ],
  },
  {
    id: 'black-red-edge',
    title: '黑红边缘主播',
    description:
      '你的名字开始和“骂战”“塌房”“争议”绑在一起出现在热搜词条里。涨粉的速度很快，取关的速度也很快，评论区永远吵得像菜市场，你已经能一边看骂声一边喝奶茶。\n\n品牌方悄悄加了你，价格给得比同量级主播高，但合同里多了一条“如引发重大舆情，甲方有权即时解约”。你签了，也记住了那条。每次开播前，你都要先看一眼违规值，像看体温计。\n\n你知道自己走在一条随时会断的钢丝上，也清楚正是这份危险感在替你养活流量。有粉丝说喜欢你“敢说”，也有粉丝说怕你“哪天就没了”——你把这两条都截图存了下来，没回。',
    persona: {
      title: '争议操盘手',
      tags: ['话题制造者', '危险吸引力'],
      description: '你很懂怎样让所有人开口，只是他们开口未必都在说喜欢。',
    },
    type: 'career',
    priority: 100,
    conditions: [
      {
        type: 'stat',
        scope: 'visible',
        key: 'violation',
        comparator: 'gte',
        value: 80,
      },
      {
        type: 'stat',
        scope: 'visible',
        key: 'violation',
        comparator: 'lt',
        value: 100,
      },
      { type: 'tag', tagId: 'controversial', present: true },
    ],
  },
  {
    id: 'commercial-streamer',
    title: '商业化主播',
    description:
      '你的日历被排到了下个季度，颜色区分着“报价档”“专场”“周期合作”。粉丝群改名叫“XX的自留地”，置顶消息永远是最新的返场链接。你偶尔想起第一次开播那晚，环形灯还没照到床角。\n\n团队从你一个人变成了你加两个人，你学会了在直播前先算这场的坑产，再决定要不要多聊两句自己的生活。有老粉说“你变了”，你没否认，只是回了句“我在认真挣钱”。\n\n再往后，你成了同行嘴里“很懂平衡”的那种主播——不算最红，但报价单永远排得满满当当。深夜偶尔盘账的时候，你会想，这条路是自己选的，那就继续认真走完它。',
    persona: {
      title: '商业探索者',
      tags: ['经营意识', '合作导向'],
      description:
        '你擅长把注意力变成可持续的收入，也开始认真计算每次表达的成本。',
    },
    type: 'career',
    priority: 90,
    conditions: [
      {
        type: 'stat',
        scope: 'hidden',
        key: 'commercialValue',
        comparator: 'gte',
        value: 60,
      },
      {
        type: 'stat',
        scope: 'visible',
        key: 'money',
        comparator: 'gte',
        value: 100,
      },
    ],
  },
  {
    id: 'deep-night-companion',
    title: '深夜陪伴主播',
    description:
      '你的直播间从来上不了热榜，但每晚十一点，总有那么两三千人固定出现，弹幕说得最多的一句是“终于下班了”。你渐渐记住了几个 ID 的作息，他们大概也记住了你的。\n\n没有大爆款，也没有大危机。日子过得很慢，粉丝数涨得也很慢，可留言区越来越像一个真实存在的小房间——有人在这里请假、报喜、说晚安。\n\n很久以后回看数据，你的账号称不上“成功”，但你知道，那些安静的深夜里，自己确实成了某些人愿意留灯等一等的理由。这大概是另一种意义上的顶流。',
    persona: {
      title: '长期主义者',
      tags: ['温柔陪伴', '关系经营'],
      description:
        '你相信稳定的回应比瞬间的热搜更珍贵，把直播间经营成了一盏小夜灯。',
    },
    type: 'career',
    priority: 80,
    conditions: [
      {
        type: 'stat',
        scope: 'hidden',
        key: 'loyalty',
        comparator: 'gte',
        value: 65,
      },
      {
        type: 'stat',
        scope: 'visible',
        key: 'reputation',
        comparator: 'gte',
        value: 80,
      },
    ],
  },
  {
    id: 'traffic-breakout',
    title: '流量爆发主播',
    description:
      '那条切片一夜之间被转出了直播间，评论区突然涌进几万条陌生的 ID。你盯着后台不断跳动的粉丝数，手在抖，一半是激动，一半是不敢相信这次是真的。\n\n接下来一周，商务私信塞满了后台，平台小二主动加了你好友，连很久没联系的同行都来问“最近怎么样”。你第一次感觉到，自己好像真的被“看见”了。\n\n热度终会退潮，你也清楚。但那种被无数人同时注视的滋味，会留在记忆里很久——足够支撑你在下一次冷场的直播间里，继续相信“万一呢”这三个字。',
    persona: {
      title: '流量运营者',
      tags: ['热点嗅觉', '增长导向'],
      description: '你能迅速读懂平台和围观者的情绪，让一次机会滚成更大的浪。',
    },
    type: 'career',
    priority: 70,
    conditions: [
      {
        type: 'stat',
        scope: 'visible',
        key: 'popularity',
        comparator: 'gte',
        value: 180,
      },
      {
        type: 'stat',
        scope: 'visible',
        key: 'fans',
        comparator: 'gte',
        value: 180,
      },
    ],
  },
  {
    id: 'slow-burn-persistent',
    title: '慢热坚持者',
    description:
      '你的成长曲线画出来几乎是条缓坡，没有陡峭的高峰，也没有断崖式的下跌。同期开播的人换了一批又一批，你的直播间标题却还是那句没怎么改过的开场白。\n\n有人劝你“该冲一把爆款了”，你笑笑没接话。你更在意的是这场直播比上一场稳没稳、粉丝有没有变得更熟悉一点。日子一天天过，账号权重悄悄涨了上去，你几乎没有察觉。\n\n很久以后你才明白，慢不是问题，怕慢才是。当别人还在追逐下一个风口时，你已经把“活下去”这件事，过成了自己的节奏。',
    persona: {
      title: '耐心守夜人',
      tags: ['稳定成长', '自我节奏'],
      description:
        '你没有让短期数字替自己决定去留，愿意给尚未发生的故事多一点时间。',
    },
    type: 'career',
    priority: 10,
    conditions: [
      {
        type: 'stat',
        scope: 'visible',
        key: 'mentality',
        comparator: 'gte',
        value: 60,
      },
    ],
  },
  {
    id: 'still-live',
    title: '直播仍在继续',
    description:
      '第七天结束的时候，你的账号既没有大爆，也没有出事，像一部还没写到高潮的连续剧。后台数据平平淡淡，弹幕里偶尔冒出几句认真的留言，剩下的大多是路人。\n\n你还没想清楚自己要做哪种主播——搞笑、才艺、陪伴，还是别的什么。倒也不着急，环形灯还亮着，麦克风还开着，房间依旧很小，梦想也依旧没有上限。\n\n明天几点开播，你自己还没定。但你知道，只要灯还亮着，故事就还没写完。',
    persona: {
      title: '未定型主播',
      tags: ['继续探索', '尚未命名'],
      description: '你的数据暂时无法概括你，幸好人生也不必在第七天就完成分类。',
    },
    type: 'career',
    priority: 0,
    conditions: [],
  },
];
