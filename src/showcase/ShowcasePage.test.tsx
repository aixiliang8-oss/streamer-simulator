import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ShowcasePage } from './ShowcasePage';

describe('ShowcasePage', () => {
  it('presents the concise case study and live demo link', () => {
    render(<ShowcasePage />);

    expect(
      screen.getByRole('heading', { name: '主播模拟器' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: '从选择题到主播人生' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Cause Feedback')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /立即体验 Demo/ })).toHaveAttribute(
      'href',
      'https://streamer-simulator-pied.vercel.app/',
    );
  });
});
