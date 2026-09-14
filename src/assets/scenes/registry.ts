// Display-only image registry for the game's scene layer (SceneImage)
// and the life report poster. Every map here is optional and empty by
// default — until an entry exists, GamePage/ReportPage fall back to the
// CSS mood gradients defined in SceneImage.module.css / ReportPage.module.css.
//
// This file is the ONLY place that needs to change when illustrations
// arrive. Nothing in GamePage, ReportPage or the game engine needs to be
// touched.
//
// How to add a scene illustration for a specific event:
//   1. Drop the file under src/assets/scenes/events/, e.g. first-live.png
//   2. import firstLiveScene from './events/first-live.png';
//   3. EVENT_SCENE_IMAGES['first-live'] = firstLiveScene; // use the real Event id
//
// How to add a shared background for a whole category (used when an event
// has no dedicated illustration of its own):
//   1. Drop the file under src/assets/scenes/categories/, e.g. business.png
//   2. import businessScene from './categories/business.png';
//   3. CATEGORY_SCENE_IMAGES['商务'] = businessScene; // use the real category string
//
// How to add the streamer's own portrait (drawn in front of the scene):
//   1. Drop the file under src/assets/characters/, e.g. newcomer.png
//   2. import newcomerPortrait from '../characters/newcomer.png';
//   3. CHARACTER_PORTRAIT_IMAGES['newcomer'] = newcomerPortrait; // use the real Character id
//
// How to add an ending illustration for the life report poster:
//   1. Drop the file under src/assets/endings/, e.g. viral-star.png
//   2. import viralStar from '../endings/viral-star.png';
//   3. ENDING_ILLUSTRATION_IMAGES['流量爆发主播'] = viralStar; // use the ending's exact title text
//      (LifeReport only carries the ending's title, not its machine id.)
//
// How to add the StartPage cover image:
//   1. Drop the file under src/assets/cover/, e.g. cover.png
//   2. import startCover from '../cover/cover.png';
//   3. export const START_COVER_IMAGE: string | undefined = startCover;
import type { CharacterId, EventId } from '../../game/model/types';
import startCover from '../cover/cover.png';
import blackRedEdgeEnding from '../endings/black-red-edge.png';
import commercialStreamerEnding from '../endings/commercial-streamer.png';
import deepNightCompanionEnding from '../endings/deep-night-companion.png';
import leftStreamingEnding from '../endings/left-streaming.png';
import permanentBanEnding from '../endings/permanent-ban.png';
import stillLiveEnding from '../endings/still-live.png';
import trafficBreakoutEnding from '../endings/traffic-breakout.png';
import firstStreamScene from './events/first-stream.png';
import highlightHappyScene from './categories/highlight-happy.png';
import tensePressureScene from './categories/tense-pressure.png';

export const EVENT_SCENE_IMAGES: Partial<Record<EventId, string>> = {
  'first-stream': firstStreamScene,
};

// Only 3 illustrations exist so far, so each is reused as a generic stand-in
// across every category that shares its mood — better than leaving a
// category with no art at all. An event with a dedicated entry in
// EVENT_SCENE_IMAGES above still takes priority over these. Swap any of
// these for a dedicated illustration later without touching other entries.
export const CATEGORY_SCENE_IMAGES: Partial<Record<string, string>> = {
  // highlight mood: bright, celebratory
  开播: highlightHappyScene,
  流量: highlightHappyScene,
  成长: highlightHappyScene,
  // business mood: positive, opportunity-driven — reuses the same bright scene
  商务: highlightHappyScene,
  同行: highlightHappyScene,
  签约: highlightHappyScene,
  // tense mood: pressure, controversy, risk
  舆论: tensePressureScene,
  危机: tensePressureScene,
  压力: tensePressureScene,
  平台: tensePressureScene,
  // daily mood: quiet, grounded — reuses the calm first-stream scene
  日常: firstStreamScene,
  粉丝: firstStreamScene,
  定位: firstStreamScene,
  坚持: firstStreamScene,
  // reflective mood: quiet, values-driven turning points
  边界: firstStreamScene,
  抉择: firstStreamScene,
  人生选择: firstStreamScene,
};

export const CHARACTER_PORTRAIT_IMAGES: Partial<Record<CharacterId, string>> =
  {};

export const ENDING_ILLUSTRATION_IMAGES: Partial<Record<string, string>> = {
  永久封禁: permanentBanEnding,
  离开直播的人: leftStreamingEnding,
  黑红边缘主播: blackRedEdgeEnding,
  商业化主播: commercialStreamerEnding,
  深夜陪伴主播: deepNightCompanionEnding,
  流量爆发主播: trafficBreakoutEnding,
  慢热坚持者: stillLiveEnding,
  直播仍在继续: stillLiveEnding,
};

export const START_COVER_IMAGE: string | undefined = startCover;
