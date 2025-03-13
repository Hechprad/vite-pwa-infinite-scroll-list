import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import AboutPage from '.';

describe('AboutPage', () => {
  it('should render About Us page', () => {
    render(<AboutPage />);

    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('About page')).toBeInTheDocument();
  });
});
