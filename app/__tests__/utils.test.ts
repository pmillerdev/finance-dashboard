import {
  formatCurrency,
  formatDateToLocal,
  generatePagination,
  generateYAxis,
} from '../lib/utils';
import { Revenue } from '../types/invoices';

describe('formatCurrency', () => {
  it('formats a number to currency string (GBP)', () => {
    const formattedAmount = formatCurrency(12345);
    expect(formattedAmount).toBe('£123.45');
  });

  it('formats a string number to currency string (GBP)', () => {
    const formattedAmount = formatCurrency('12345');
    expect(formattedAmount).toBe('£123.45');
  });
});

describe('formatDateToLocal', () => {
  it('formats a date string to a localized date (en-GB)', () => {
    const dateStr = 'Mon Nov 14 2022 00:00:00 GMT+0000 (Greenwich Mean Time)';
    const formattedDate = formatDateToLocal(dateStr);
    expect(formattedDate).toBe('14 Nov 2022');
  });

  it('allows specifying a different locale', () => {
    const dateStr = 'Mon Nov 14 2022 00:00:00 GMT+0000 (Greenwich Mean Time)';
    const formattedDate = formatDateToLocal(dateStr, 'en-US');
    expect(formattedDate).toMatch('Nov 14, 2022'); // May vary slightly based on US format
  });
});

describe('generateYAxis', () => {
  it('calculates y-axis labels and top label for empty revenue data', () => {
    const revenue: Revenue[] = [];
    const { yAxisLabels, topLabel } = generateYAxis(revenue);
    expect(yAxisLabels).toEqual([]);
    expect(topLabel).toBe(0);
  });

  it('calculates y-axis labels and top label for sample revenue data', () => {
    const revenue: Revenue[] = [
      { month: 'Jan', revenue: 2500 },
      { month: 'Feb', revenue: 5000 },
    ];
    const { yAxisLabels, topLabel } = generateYAxis(revenue);
    expect(yAxisLabels).toEqual(['£5K', '£4K', '£3K', '£2K', '£1K', '£0K']);
    expect(topLabel).toBe(5000);
  });
});

describe('generatePagination', () => {
  it('generates page numbers for all pages when total pages <= 7', () => {
    const testCases = [
      { totalPages: 3, expected: [1, 2, 3] },
      { totalPages: 5, expected: [1, 2, 3, 4, 5] },
      { totalPages: 7, expected: [1, 2, 3, 4, 5, 6, 7] },
    ];

    for (const testCase of testCases) {
      const currentPage = 2; // Any value within the range works here
      const pagination = generatePagination(currentPage, testCase.totalPages);
      expect(pagination).toEqual(testCase.expected);
    }
  });

  it('generates pagination with ellipses for current page <= 3', () => {
    const testCases = [
      { currentPage: 1, totalPages: 10, expected: [1, 2, 3, '...', 9, 10] },
      { currentPage: 2, totalPages: 10, expected: [1, 2, 3, '...', 9, 10] },
      { currentPage: 3, totalPages: 10, expected: [1, 2, 3, '...', 9, 10] },
    ];

    for (const testCase of testCases) {
      const pagination = generatePagination(
        testCase.currentPage,
        testCase.totalPages,
      );
      expect(pagination).toEqual(testCase.expected);
    }
  });

  it('generates pagination with ellipses for current page >= totalPages - 2', () => {
    const testCases = [
      { currentPage: 8, totalPages: 10, expected: [1, 2, '...', 8, 9, 10] },
      { currentPage: 9, totalPages: 10, expected: [1, 2, '...', 8, 9, 10] },
      { currentPage: 10, totalPages: 10, expected: [1, 2, '...', 8, 9, 10] },
    ];

    for (const testCase of testCases) {
      const pagination = generatePagination(
        testCase.currentPage,
        testCase.totalPages,
      );
      expect(pagination).toEqual(testCase.expected);
    }
  });

  it('generates pagination with ellipses for current page in the middle (totalPages > 7)', () => {
    const testCases = [
      {
        currentPage: 4,
        totalPages: 10,
        expected: [1, '...', 3, 4, 5, '...', 10],
      },
      {
        currentPage: 5,
        totalPages: 10,
        expected: [1, '...', 4, 5, 6, '...', 10],
      },
      {
        currentPage: 6,
        totalPages: 10,
        expected: [1, '...', 5, 6, 7, '...', 10],
      },
    ];

    for (const testCase of testCases) {
      const pagination = generatePagination(
        testCase.currentPage,
        testCase.totalPages,
      );
      expect(pagination).toEqual(testCase.expected);
    }
  });
});
