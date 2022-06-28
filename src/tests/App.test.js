import { render, screen } from '@testing-library/react';
import Demo2 from '../demo-original/d2';

describe('Demo 2', () => {
  it('loads', () => {
    render(<Demo2 />);

    expect(screen.getByText('#2 Toggleable interfaces').toBeInTheDocument();
  });
});
