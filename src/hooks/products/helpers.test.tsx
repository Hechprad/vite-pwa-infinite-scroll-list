import { describe, it, expect } from 'vitest';
import { buildUrl } from './helpers';

describe('buildUrl', () => {
  it('should build URL with default values when no params are provided', () => {
    const url = buildUrl({});
    expect(url.toString()).toContain('/products/?limit=10&offset=0');
  });

  it('should build URL with all parameters when provided', () => {
    const params = {
      title: 'test product',
      priceMin: 10,
      priceMax: 100,
      limit: 20,
      offset: 5,
    };

    const url = buildUrl(params);
    const urlString = url.toString();

    expect(urlString).toContain('title=test+product');
    expect(urlString).toContain('price_min=10');
    expect(urlString).toContain('price_max=100');
    expect(urlString).toContain('limit=20');
    expect(urlString).toContain('offset=5');
  });

  it('should build URL with only title parameter', () => {
    const url = buildUrl({ title: 'test product' });
    expect(url.toString()).toContain('title=test+product');
    expect(url.toString()).toContain('limit=10');
    expect(url.toString()).toContain('offset=0');
  });

  it('should build URL with price range parameters', () => {
    const url = buildUrl({ priceMin: 10, priceMax: 50 });
    expect(url.toString()).toContain('price_min=10');
    expect(url.toString()).toContain('price_max=50');
    expect(url.toString()).toContain('limit=10');
    expect(url.toString()).toContain('offset=0');
  });

  it('should handle undefined values correctly', () => {
    const url = buildUrl({
      title: undefined,
      priceMin: undefined,
      priceMax: undefined,
      limit: undefined,
      offset: undefined,
    });

    expect(url.toString()).toContain('/products/?limit=10&offset=0');
  });
});
