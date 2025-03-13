import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import HomePage from '.';

describe('HomePage', () => {
  it('should render Home page', () => {
    render(<HomePage />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Home page')).toBeInTheDocument();
  });
});
