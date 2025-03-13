import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import Navbar from './index';

describe('Navbar', () => {
  it('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Navbar />
      </MemoryRouter>,
    );

    const productsLink = screen.getByText('Products');
    expect(productsLink.className).toContain('border-accent-light');
  });

  it('renders theme toggle button', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders logo icon', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    const logoLink = screen.getByRole('link', { name: '' });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('does not apply active class to non-active routes', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Navbar />
      </MemoryRouter>,
    );

    const homeLink = screen.getByText('Home');
    const aboutLink = screen.getByText('About');

    expect(homeLink.className).not.toContain('border-accent-light');
    expect(aboutLink.className).not.toContain('border-accent-light');
  });
});
