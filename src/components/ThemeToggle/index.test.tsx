import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '.';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('should load the initial theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(<ThemeToggle />);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('should toggle theme from light to dark', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();

    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('should toggle theme from dark to light', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    // O tema começa como 'dark'
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();

    // Clica para mudar para 'light'
    fireEvent.click(button);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('should update localStorage when theme changes', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(button);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
