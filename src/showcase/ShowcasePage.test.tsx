import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ShowcasePage } from './ShowcasePage';

describe('ShowcasePage', () => {
  it('presents the case study and sends visitors to the live demo', () => {
    render(<ShowcasePage />);

    expect(
      screen.getByRole('heading', { name: '《主播模拟器》' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '从“选择题”到“主播人生”' }),
    ).toBeInTheDocument();
    expect(screen.getByText('20 个剧情事件')).toBeInTheDocument();
    expect(screen.getByText('8 种人生结局')).toBeInTheDocument();
    expect(
      screen.getAllByRole('link', {
        name: /立即体验 Demo|进入《主播模拟器》/,
      })[0],
    ).toHaveAttribute('href', 'https://streamer-simulator-pied.vercel.app/');
  });
});
