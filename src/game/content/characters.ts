import type { Character } from '../model/types';

export const newcomerCharacter: Character = {
  id: 'newcomer',
  name: '新人主播',
  description: '设备普通、粉丝为零，但还愿意对着空荡荡的直播间认真说晚安。',
  initialStats: {
    popularity: 10,
    fans: 0,
    reputation: 50,
    money: 20,
    mentality: 80,
    violation: 0,
  },
  initialHiddenStats: {
    haters: 0,
    platformTrust: 50,
    loyalty: 0,
    commercialValue: 0,
    legalRisk: 0,
  },
  initialTags: [],
  talents: [],
};

export const characters: readonly Character[] = [newcomerCharacter];
