import '@testing-library/jest-dom';
import { beforeAll } from 'vitest';

beforeAll(() => {
    global.IntersectionObserver = class {
      root: Element | null = null;
      rootMargin: string = '';
      thresholds: ReadonlyArray<number> = [];
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }
    };
  });
  