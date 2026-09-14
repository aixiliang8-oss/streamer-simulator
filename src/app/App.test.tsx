import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { App } from './App';

function chooseAndContinue(choiceLabel: string) {
  fireEvent.click(screen.getByRole('button', { name: choiceLabel }));
  fireEvent.click(
    screen.getByRole('button', {
      name: /继续直播|查看主播人生报告/,
    }),
  );
}

describe('App vertical slice', () => {
  it('plays a complete path, shows the report, and restarts', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '开始游戏' }));
    expect(
      screen.getByRole('heading', { name: '第一次直播' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('晚上 20:03 · 出租屋 · 临时直播角'),
    ).toBeInTheDocument();

    chooseAndContinue('认真调试，先和空气打招呼');
    chooseAndContinue('把仅有的观众当老朋友');
    chooseAndContinue('逐条认真回复他们');
    chooseAndContinue('认真念出名字，好好说谢谢');
    chooseAndContinue('按约定时间准时开播');
    chooseAndContinue('把直播间做成深夜聊天室');
    chooseAndContinue('回到评论区，接住熟悉的观众');
    chooseAndContinue('接住这个梗，让它成为直播间暗号');
    chooseAndContinue('放慢节奏，和一路留下的人聊聊');
    chooseAndContinue('拆开争议讲清楚，放弃今晚的爆点');
    chooseAndContinue('花一晚查产品，报一个可持续的价');
    chooseAndContinue('花钱审合同，保留谈判空间');
    chooseAndContinue('停播半晚，重做内容清单');
    chooseAndContinue('接住对方的话，一起把节目做好');
    chooseAndContinue('暂停推广，自己查清问题');
    chooseAndContinue('按原计划播，等真正的观众回来');
    chooseAndContinue('公开说明礼物和私联边界');
    chooseAndContinue('在直播里承认：最近真的有点累');
    chooseAndContinue('做能被少数人长期记住的内容');
    chooseAndContinue('记住每一个留下的人');

    expect(
      screen.getByRole('heading', { name: '深夜陪伴主播' }),
    ).toBeInTheDocument();
    expect(screen.getByText('长期主义者')).toBeInTheDocument();
    expect(screen.getByText('#温柔陪伴')).toBeInTheDocument();
    expect(screen.getByText('#内容理想')).toBeInTheDocument();
    expect(screen.getByText('20 段经历')).toBeInTheDocument();
    expect(
      screen.queryByText('你选择了：认真调试，先和空气打招呼'),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '查看完整人生轨迹' }));
    expect(
      screen.getByText('你选择了：认真调试，先和空气打招呼'),
    ).toBeInTheDocument();
    expect(screen.getByText('出租屋 · 临时直播角')).toBeInTheDocument();
    expect(screen.getAllByLabelText('属性影响')).toHaveLength(20);
    expect(
      screen.getByText('平台认为你的开播表现稳定，推荐意愿略有上升。'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '重新开始' }));
    expect(
      screen.getByRole('button', { name: '开始游戏' }),
    ).toBeInTheDocument();
  });

  it('plays the risky path without exposing a choice cause to the player', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: '开始游戏' }));
    chooseAndContinue('标题写成“今晚干票大的”');
    chooseAndContinue('花钱刷点人气撑场面');
    chooseAndContinue('什么也不回，只盯着增长曲线');
    chooseAndContinue('立刻表演一个夸张的感谢节目');
    chooseAndContinue('请假一晚，把自己从椅子上拔下来');
    chooseAndContinue('什么火就播什么，先让人进来');
    chooseAndContinue('置顶切片，连夜复制同款内容');
    chooseAndContinue('解释来龙去脉，别让新人被挡在门外');
    chooseAndContinue('复制爆款公式，先把人留下来');

    fireEvent.click(screen.getByRole('button', { name: '直接和他对线' }));
    expect(screen.getByText('平台关注')).toBeInTheDocument();
    expect(
      screen.getByText('争议切片正在外溢，反对你的人开始聚集。'),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '继续直播' }));

    expect(
      screen.getByRole('button', { name: '黑红也是红，接下擦边推广' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('因为你曾公开回应黑粉，品牌看中了你的争议流量。'),
    ).not.toBeInTheDocument();
    chooseAndContinue('花一晚查产品，报一个可持续的价');
    chooseAndContinue('花钱审合同，保留谈判空间');
    chooseAndContinue('停播半晚，重做内容清单');
    chooseAndContinue('抓住机会，把镜头全部抢过来');
    chooseAndContinue('暂停推广，自己查清问题');
    chooseAndContinue('按原计划播，等真正的观众回来');
    chooseAndContinue('大哥这么支持，见一面也没什么');
    chooseAndContinue('停一天，允许自己什么都不产出');
    chooseAndContinue('既然争议有流量，那就把争议做到最大');

    fireEvent.click(screen.getByRole('button', { name: '追着热度，再冲一把' }));
    expect(screen.getByText('高风险状态')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '查看主播人生报告' }));

    expect(
      screen.getByRole('heading', { name: '黑红边缘主播' }),
    ).toBeInTheDocument();
    expect(screen.getByText('争议操盘手')).toBeInTheDocument();
  });
});
