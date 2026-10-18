import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import {
  Code2, GitPullRequest, Terminal, MessageSquare, CheckCircle2,
  Clock, Tag, ChevronRight, FileText, Layers, Zap, AlertTriangle,
  Star, ArrowRight, X, Copy, Check, Filter, Bug, Wrench,
  Sparkles, BookOpen, Play, RotateCcw, Eye, ThumbsUp, ThumbsDown,
  FolderTree, FileCode2, TestTube2, GitBranch, Search, Award,
  Send, Square, CheckSquare, CornerDownRight, Maximize2, Minimize2,
  Cpu, UserCheck, ShieldCheck, HelpCircle, ArrowLeft, RefreshCw
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// TICKET DATA WITH MULTI-FILE CODEBASES & UNIT TESTS
// ═══════════════════════════════════════════════════════════════

const TICKETS = [
  {
    id: 'HYPR-101',
    title: 'Fix stale closure in useEffect causing infinite re-renders',
    type: 'bug',
    difficulty: 'Medium',
    difficultyColor: 'bg-[#FFDE59] text-black',
    stack: ['React', 'TypeScript', 'Hooks'],
    estimatedTime: '25 min',
    xp: 150,
    seniorReviewer: {
      name: 'Alex Rivera',
      role: 'Staff Frontend Engineer // Platform',
      avatar: 'AR',
      rating: 94
    },
    mentorTip: 'Junior developers often silence eslint-plugin-react-hooks warnings or pass empty dependency arrays. Senior engineers stabilize object references using useMemo or primitives, and pair data-fetching with an AbortController cleanup to eliminate race conditions and memory leaks.',
    description: 'The `DashboardMetrics` component re-renders infinitely because the `fetchData` callback inside `useEffect` captures a stale reference to the `filters` state. The dependency array is missing `filters`, but naively adding it creates a new object reference each render. Refactor to stabilize the dependency and ensure fetch cancellation on unmount.',
    codebase: {
      name: 'analytics-dashboard',
      files: 5,
      tests: 4,
      language: 'TypeScript + React',
    },
    acceptance: [
      'Component renders at most once per filter change',
      'All 4 unit tests pass in Vitest runner',
      'No eslint-plugin-react-hooks warnings or stale references',
      'Pending fetch requests are aborted on unmount via AbortController',
      'Loading and error states are handled defensively'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'components/', type: 'folder', children: [
          { name: 'DashboardMetrics.tsx', type: 'file' },
          { name: 'MetricCard.tsx', type: 'file' },
        ]},
        { name: 'hooks/', type: 'folder', children: [
          { name: 'useMetrics.ts', type: 'file', highlight: true },
        ]},
        { name: 'types.ts', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'DashboardMetrics.test.tsx', type: 'file' },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/hooks/useMetrics.ts',
    files: {
      'src/hooks/useMetrics.ts': `import { useState, useEffect } from 'react';
import { MetricsData, MetricFilters } from '../types';

/**
 * Custom hook to fetch analytics metrics.
 * ⚠️ ISSUE REPORTED: Stale closure and infinite re-render loop.
 */
export function useMetrics(filters: MetricFilters) {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ❌ BUG: AbortController is missing.
    // ❌ BUG: filters is missing from dependency array, or if added naively
    // causes infinite loop if filters is an unmemoized object.
    const controller = new AbortController();
    setLoading(true);

    const fetchMetrics = async () => {
      try {
        const query = new URLSearchParams({
          range: filters.range,
          department: filters.department,
        }).toString();

        const res = await fetch(\`/api/metrics?\${query}\`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Failed to fetch metrics data');
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unknown network error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();

    return () => {
      controller.abort();
    };
  }, [filters.range, filters.department]); // Stabilized primitive dependencies

  return { data, loading, error };
}`,
      'src/components/DashboardMetrics.tsx': `import React, { useMemo } from 'react';
import { useMetrics } from '../hooks/useMetrics';
import { MetricCard } from './MetricCard';

interface DashboardMetricsProps {
  range: '7d' | '30d' | '90d';
  department: string;
}

export const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ range, department }) => {
  // Memoize filters object to maintain reference equality across parent re-renders
  const filters = useMemo(() => ({ range, department }), [range, department]);
  const { data, loading, error } = useMetrics(filters);

  if (loading) {
    return (
      <div className="p-4 bg-gray-50 border-2 border-black font-mono text-xs">
        <span className="animate-pulse">FETCHING TELEMETRY METRICS...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border-2 border-black text-red-700 font-mono text-xs">
        ERROR: {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
      <MetricCard title="Total Revenue" value={\`$\${data?.revenue?.toLocaleString() ?? 0}\`} delta={data?.revenueDelta} />
      <MetricCard title="Active Users" value={data?.activeUsers?.toLocaleString() ?? 0} delta={data?.usersDelta} />
      <MetricCard title="Churn Rate" value={\`\${data?.churnRate ?? 0}%\`} delta={data?.churnDelta} />
    </div>
  );
};`,
      'src/components/MetricCard.tsx': `import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  delta?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, delta }) => {
  const isPositive = (delta ?? 0) >= 0;

  return (
    <div className="bg-white border-3 border-black p-4 shadow-[3px_3px_0px_#000]">
      <div className="text-[10px] font-black uppercase text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-black text-black">{value}</div>
      {delta !== undefined && (
        <div className={\`text-xs font-bold mt-2 \${isPositive ? 'text-emerald-600' : 'text-red-600'}\`}>
          {isPositive ? '▲ +' : '▼ '}{delta}% vs last cycle
        </div>
      )}
    </div>
  );
};`,
      'src/__tests__/DashboardMetrics.test.tsx': `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { DashboardMetrics } from '../components/DashboardMetrics';

describe('DashboardMetrics & useMetrics Integration Suite', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders metric cards after successful fetch without infinite loops', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ revenue: 48500, activeUsers: 1420, churnRate: 1.2, revenueDelta: 12 }),
    });

    render(<DashboardMetrics range="30d" department="growth" />);
    await waitFor(() => {
      expect(screen.getByText('Total Revenue')).toBeInTheDocument();
      expect(screen.getByText('$48,500')).toBeInTheDocument();
    });
  });

  it('re-fetches correctly when filters change without redundant requests', async () => {
    let callCount = 0;
    global.fetch = vi.fn().mockImplementation(() => {
      callCount++;
      return Promise.resolve({
        ok: true,
        json: async () => ({ revenue: 1000 * callCount, activeUsers: 100, churnRate: 2 }),
      });
    });

    const { rerender } = render(<DashboardMetrics range="7d" department="engineering" />);
    await waitFor(() => expect(callCount).toBe(1));

    // Rerender with same props: must NOT trigger additional fetch
    rerender(<DashboardMetrics range="7d" department="engineering" />);
    expect(callCount).toBe(1);

    // Rerender with new range prop: triggers exactly 1 additional fetch
    rerender(<DashboardMetrics range="90d" department="engineering" />);
    await waitFor(() => expect(callCount).toBe(2));
  });

  it('aborts in-flight request when component unmounts mid-request', async () => {
    const abortSpy = vi.fn();
    global.AbortController = vi.fn().mockImplementation(() => ({
      signal: {},
      abort: abortSpy,
    }));

    const { unmount } = render(<DashboardMetrics range="7d" department="marketing" />);
    unmount();
    expect(abortSpy).toHaveBeenCalled();
  });

  it('renders graceful error message on API HTTP rejection', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(<DashboardMetrics range="7d" department="finance" />);
    await waitFor(() => {
      expect(screen.getByText(/ERROR:/i)).toBeInTheDocument();
    });
  });
});`,
      'src/types.ts': `export interface MetricFilters {
  range: '7d' | '30d' | '90d';
  department: string;
}

export interface MetricsData {
  revenue: number;
  revenueDelta?: number;
  activeUsers: number;
  usersDelta?: number;
  churnRate: number;
  churnDelta?: number;
}`,
      'package.json': `{
  "name": "analytics-dashboard",
  "version": "1.0.0",
  "scripts": {
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "vitest": "^1.4.0",
    "@testing-library/react": "^14.2.0"
  }
}`
    },
    unitTests: [
      { id: 't1', name: 'renders metric cards after successful fetch without infinite loops', duration: '24ms', assertion: 'expect(screen.getByText("$48,500")).toBeInTheDocument()' },
      { id: 't2', name: 're-fetches correctly when filters change without redundant requests', duration: '36ms', assertion: 'expect(callCount).toBe(2)' },
      { id: 't3', name: 'aborts in-flight request when component unmounts mid-request', duration: '12ms', assertion: 'expect(abortSpy).toHaveBeenCalled()' },
      { id: 't4', name: 'renders graceful error message on API HTTP rejection', duration: '18ms', assertion: 'expect(screen.getByText(/ERROR:/i)).toBeInTheDocument()' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 96,
      summary: 'Outstanding refactor. Breaking down the `filters` object into primitive dependencies (`filters.range`, `filters.department`) prevents the stale closure while completely eliminating the unmemoized object reference cycle. The AbortController cleanup is textbook production code.',
      comments: [
        {
          file: 'src/hooks/useMetrics.ts',
          line: 45,
          severity: 'suggestion',
          title: 'Clean primitive dependency separation',
          comment: 'Deconstructing `filters.range` and `filters.department` directly into the dependency array gives React stable primitive comparisons instead of reference equality checks. This is significantly safer than relying on parent callers to useMemo.',
          diff: `+ }, [filters.range, filters.department]);\n- }, []); // Missing deps led to stale state`
        },
        {
          file: 'src/hooks/useMetrics.ts',
          line: 38,
          severity: 'warning',
          title: 'AbortError check handling',
          comment: 'Checking `err.name !== "AbortError"` before updating error state is essential. When a component unmounts, aborting the fetch should not flash an unexpected error toast to the user.',
          diff: `+ if (err.name !== 'AbortError') {\n+   setError(err.message);\n+ }`
        },
        {
          file: 'src/components/DashboardMetrics.tsx',
          line: 12,
          severity: 'suggestion',
          title: 'Defensive memoization in caller',
          comment: 'Great practice keeping useMemo on filters in the UI component as well. It documents clear caller intent and prevents unnecessary child prop churn.',
          diff: `+ const filters = useMemo(() => ({ range, department }), [range, department]);`
        }
      ]
    }
  },
  {
    id: 'HYPR-102',
    title: 'Add keyboard navigation to custom dropdown component',
    type: 'feature',
    difficulty: 'Easy',
    difficultyColor: 'bg-[#CCFF00] text-black',
    stack: ['React', 'TypeScript', 'A11y'],
    estimatedTime: '20 min',
    xp: 100,
    seniorReviewer: {
      name: 'Maya Lin',
      role: 'Principal Design Technologist',
      avatar: 'ML',
      rating: 98
    },
    mentorTip: 'Accessibility (a11y) is what differentiates toy projects from enterprise applications. Custom selects must handle ArrowUp/ArrowDown, Enter, Space, Escape, aria-expanded, aria-activedescendant, and role="listbox". Screen reader users rely on these attributes exclusively.',
    description: 'The `<CustomSelect>` component works with mouse clicks but is completely inaccessible via keyboard. Implement arrow-key navigation, Enter to select, Escape to close, and proper ARIA roles so screen readers announce the options.',
    codebase: {
      name: 'design-system',
      files: 4,
      tests: 4,
      language: 'TypeScript + React',
    },
    acceptance: [
      'Arrow Up/Down cycles through options with visual highlight',
      'Enter or Space selects the currently focused option',
      'Escape closes dropdown and restores focus to the trigger button',
      'role="listbox" and role="option" are attached with aria-selected',
      'aria-activedescendant dynamically updates on keyboard movement'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'components/', type: 'folder', children: [
          { name: 'CustomSelect.tsx', type: 'file', highlight: true },
          { name: 'CustomSelect.module.css', type: 'file' },
        ]},
        { name: 'App.tsx', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'CustomSelect.test.tsx', type: 'file' },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/components/CustomSelect.tsx',
    files: {
      'src/components/CustomSelect.tsx': `import React, { useState, useRef, useEffect } from 'react';

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value?: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find(o => o.value === value);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(options.findIndex(o => o.value === value) || 0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && options[focusedIndex]) {
          onChange(options[focusedIndex].value);
          setIsOpen(false);
          triggerRef.current?.focus();
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative inline-block w-64 font-mono select-none" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white border-3 border-black p-3 text-left font-black text-xs uppercase flex items-center justify-between shadow-[3px_3px_0px_#000] focus:bg-[#FFDE59] focus:outline-none"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span className="text-[10px]">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={focusedIndex >= 0 ? \`option-\${focusedIndex}\` : undefined}
          className="absolute z-30 mt-1 w-full bg-white border-3 border-black shadow-[4px_4px_0px_#000] max-h-56 overflow-y-auto"
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isFocused = idx === focusedIndex;
            return (
              <li
                key={opt.value}
                id={\`option-\${idx}\`}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={\`p-2.5 text-xs font-bold cursor-pointer transition-colors border-b border-black/10 last:border-b-0 \${
                  isFocused ? 'bg-black text-[#CCFF00]' : isSelected ? 'bg-[#FFDE59] text-black' : 'hover:bg-[#FAF8F5]'
                }\`}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};`,
      'src/__tests__/CustomSelect.test.tsx': `import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { CustomSelect } from '../components/CustomSelect';

const sampleOptions = [
  { value: 'react', label: 'React.js' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'rust', label: 'Rust' },
];

describe('CustomSelect Accessibility & Keyboard Suite', () => {
  it('opens listbox on ArrowDown key on trigger button', () => {
    const handleChange = vi.fn();
    render(<CustomSelect options={sampleOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('button');
    
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('cycles focused items with ArrowDown and ArrowUp', () => {
    const handleChange = vi.fn();
    render(<CustomSelect options={sampleOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    const listbox = screen.getByRole('listbox');

    fireEvent.keyDown(listbox, { key: 'ArrowDown' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-1');

    fireEvent.keyDown(listbox, { key: 'ArrowUp' });
    expect(listbox).toHaveAttribute('aria-activedescendant', 'option-0');
  });

  it('selects option on Enter key and closes listbox', () => {
    const handleChange = vi.fn();
    render(<CustomSelect options={sampleOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: 'Enter' });
    const listbox = screen.getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // focus option-1 ('typescript')
    fireEvent.keyDown(listbox, { key: 'Enter' });

    expect(handleChange).toHaveBeenCalledWith('typescript');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes dropdown and returns focus to trigger on Escape key', () => {
    const handleChange = vi.fn();
    render(<CustomSelect options={sampleOptions} onChange={handleChange} />);
    const trigger = screen.getByRole('button');

    fireEvent.keyDown(trigger, { key: ' ' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('listbox'), { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
});`,
      'src/components/CustomSelect.module.css': `/* Custom Select Styles */
.trigger {
  cursor: pointer;
  outline: none;
}`,
      'package.json': `{
  "name": "design-system",
  "version": "1.0.0",
  "dependencies": {
    "react": "^19.0.0"
  }
}`
    },
    unitTests: [
      { id: 't1', name: 'opens listbox on ArrowDown key on trigger button', duration: '14ms', assertion: 'expect(screen.getByRole("listbox")).toBeInTheDocument()' },
      { id: 't2', name: 'cycles focused items with ArrowDown and ArrowUp', duration: '22ms', assertion: 'expect(listbox).toHaveAttribute("aria-activedescendant", "option-0")' },
      { id: 't3', name: 'selects option on Enter key and closes listbox', duration: '19ms', assertion: 'expect(handleChange).toHaveBeenCalledWith("typescript")' },
      { id: 't4', name: 'closes dropdown and returns focus to trigger on Escape key', duration: '11ms', assertion: 'expect(screen.queryByRole("listbox")).not.toBeInTheDocument()' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 98,
      summary: 'Exceptional attention to WAI-ARIA authoring practices. The listbox pattern is implemented properly with roving focus index, aria-activedescendant, and escape-to-dismiss. Clean and accessible.',
      comments: [
        {
          file: 'src/components/CustomSelect.tsx',
          line: 48,
          severity: 'suggestion',
          title: 'Clean keyboard navigation reducer logic',
          comment: 'Handling boundary wrap-around in ArrowDown / ArrowUp ensures the user never gets trapped at the end of long lists. Very smooth DX.',
          diff: `+ setFocusedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0));`
        },
        {
          file: 'src/components/CustomSelect.tsx',
          line: 72,
          severity: 'suggestion',
          title: 'Return focus to trigger on Escape',
          comment: 'Restoring focus back to `triggerRef.current?.focus()` on dismiss is a key a11y requirement that many engineers overlook. Great work.',
          diff: `+ triggerRef.current?.focus();`
        }
      ]
    }
  },
  {
    id: 'HYPR-103',
    title: 'Refactor prop-drilling into React Context for theme provider',
    type: 'refactor',
    difficulty: 'Medium',
    difficultyColor: 'bg-[#FFDE59] text-black',
    stack: ['React', 'TypeScript', 'Context API'],
    estimatedTime: '30 min',
    xp: 175,
    seniorReviewer: {
      name: 'Carlos Vance',
      role: 'Staff Architect // Frontend Infrastructure',
      avatar: 'CV',
      rating: 91
    },
    mentorTip: 'Passing state across 4+ layers of purely decorative components is code smell: it harms component reusability and couples layout with state. A typed Context provider coupled with a guard hook (`useTheme`) prevents silent runtime failures and cleans up call sites.',
    description: 'The current codebase passes `theme`, `toggleTheme`, and `accentColor` through 4 levels of components. Extract this into a `ThemeContext` with a `ThemeProvider` wrapper and a `useTheme()` hook. Remove all intermediate prop forwarding.',
    codebase: {
      name: 'saas-settings',
      files: 5,
      tests: 4,
      language: 'TypeScript + React',
    },
    acceptance: [
      'ThemeProvider wraps the app at the root level',
      'useTheme() hook returns { theme, toggleTheme, accentColor }',
      'useTheme() throws descriptive error when called outside of <ThemeProvider>',
      'Intermediate components (Header, Layout, Settings) have clean prop interfaces',
      'All 4 unit tests pass in Vitest'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'context/', type: 'folder', children: [
          { name: 'ThemeContext.tsx', type: 'file', highlight: true },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'Header.tsx', type: 'file' },
          { name: 'SettingsPanel.tsx', type: 'file' },
          { name: 'ThemeToggle.tsx', type: 'file' },
        ]},
        { name: 'App.tsx', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'ThemeContext.test.tsx', type: 'file' },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/context/ThemeContext.tsx',
    files: {
      'src/context/ThemeContext.tsx': `import React, { createContext, useContext, useState, useMemo } from 'react';

export type ThemeMode = 'light' | 'dark' | 'brutalist';

export interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; initialTheme?: ThemeMode }> = ({
  children,
  initialTheme = 'brutalist'
}) => {
  const [theme, setTheme] = useState<ThemeMode>(initialTheme);
  const [accentColor, setAccentColor] = useState('#CCFF00');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : prev === 'dark' ? 'brutalist' : 'light'));
  };

  const value = useMemo(
    () => ({ theme, toggleTheme, accentColor, setAccentColor }),
    [theme, accentColor]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>. Wrap your root component in <ThemeProvider>.');
  }
  return context;
}`,
      'src/components/ThemeToggle.tsx': `import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, accentColor } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{ backgroundColor: accentColor }}
      className="border-2 border-black px-3 py-1 text-black font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000]"
    >
      MODE: {theme}
    </button>
  );
};`,
      'src/components/Header.tsx': `import React from 'react';
import { ThemeToggle } from './ThemeToggle';

// No prop drilling needed anymore!
export const Header: React.FC = () => {
  return (
    <header className="p-4 border-b-2 border-black flex items-center justify-between bg-white font-mono">
      <span className="font-black text-sm uppercase">SAAS PLATFORM</span>
      <ThemeToggle />
    </header>
  );
};`,
      'src/__tests__/ThemeContext.test.tsx': `import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

const TestConsumer = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext & useTheme Suite', () => {
  it('provides default brutalist theme to nested consumers', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    expect(screen.getByTestId('current-theme')).toHaveTextContent('brutalist');
  });

  it('cycles themes on toggle click', () => {
    render(
      <ThemeProvider initialTheme="light">
        <TestConsumer />
      </ThemeProvider>
    );
    const btn = screen.getByRole('button');
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    fireEvent.click(btn);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    fireEvent.click(btn);
    expect(screen.getByTestId('current-theme')).toHaveTextContent('brutalist');
  });

  it('throws descriptive runtime error when useTheme is called outside ThemeProvider', () => {
    expect(() => render(<TestConsumer />)).toThrow(
      'useTheme must be used within a <ThemeProvider>'
    );
  });
});`,
      'package.json': `{
  "name": "saas-settings",
  "version": "1.0.0"
}`
    },
    unitTests: [
      { id: 't1', name: 'provides default brutalist theme to nested consumers', duration: '16ms', assertion: 'expect(screen.getByTestId("current-theme")).toHaveTextContent("brutalist")' },
      { id: 't2', name: 'cycles themes on toggle click', duration: '28ms', assertion: 'expect(screen.getByTestId("current-theme")).toHaveTextContent("dark")' },
      { id: 't3', name: 'throws descriptive runtime error when useTheme is called outside ThemeProvider', duration: '14ms', assertion: 'expect(() => render(<TestConsumer />)).toThrow()' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 94,
      summary: 'Clean decoupling. The `useMemo` on context value prevents re-rendering all subscribers when parent components render. The descriptive guard check inside `useTheme()` makes this fail-fast and easy for teammates to debug.',
      comments: [
        {
          file: 'src/context/ThemeContext.tsx',
          line: 38,
          severity: 'suggestion',
          title: 'Guard hook pattern',
          comment: 'Throwing an explicit error if context is undefined is far superior to returning null or partial objects. It saves hours of debugging in larger codebases.',
          diff: `+ if (!context) throw new Error('useTheme must be used within a <ThemeProvider>');`
        }
      ]
    }
  },
  {
    id: 'HYPR-104',
    title: 'Fix race condition in debounced search with async API',
    type: 'bug',
    difficulty: 'Hard',
    difficultyColor: 'bg-[#FF0033] text-white',
    stack: ['React', 'TypeScript', 'Async'],
    estimatedTime: '35 min',
    xp: 250,
    seniorReviewer: {
      name: 'Devin Thorne',
      role: 'Principal Systems & Performance Lead',
      avatar: 'DT',
      rating: 89
    },
    mentorTip: 'Async race conditions are tricky because they depend on network latency rather than code order. If query A takes 600ms and query B takes 100ms, query A will resolve last and overwrite query B with outdated results. AbortController or sequence IDs are required.',
    description: 'The search bar fires a debounced API request, but typing quickly causes responses to arrive out of order — an older, slower request can overwrite a newer result. Implement proper request cancellation using AbortController and ensure only the latest response is applied to state.',
    codebase: {
      name: 'search-component',
      files: 4,
      tests: 4,
      language: 'TypeScript + React',
    },
    acceptance: [
      'Only response matching the latest query is applied to state',
      'Previous in-flight requests are cancelled via AbortController',
      'Debounce delay correctly throttles network traffic',
      'Loading indicator clears accurately when requests finish',
      'All 4 unit tests pass in Vitest'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'hooks/', type: 'folder', children: [
          { name: 'useDebouncedSearch.ts', type: 'file', highlight: true },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'SearchBar.tsx', type: 'file' },
        ]},
        { name: 'api.ts', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'useDebouncedSearch.test.ts', type: 'file' },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/hooks/useDebouncedSearch.ts',
    files: {
      'src/hooks/useDebouncedSearch.ts': `import { useState, useEffect, useRef } from 'react';

export function useDebouncedSearch(query: string, delay = 300) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const activeControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const handler = setTimeout(async () => {
      // Abort any preceding query that might still be in-flight
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }

      const controller = new AbortController();
      activeControllerRef.current = controller;

      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, {
          signal: controller.signal
        });
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error(err);
          setResults([]);
        }
      } finally {
        if (activeControllerRef.current === controller) {
          setLoading(false);
        }
      }
    }, delay);

    return () => {
      clearTimeout(handler);
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
      }
    };
  }, [query, delay]);

  return { results, loading };
}`,
      'src/components/SearchBar.tsx': `import React, { useState } from 'react';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';

export const SearchBar: React.FC = () => {
  const [input, setInput] = useState('');
  const { results, loading } = useDebouncedSearch(input, 300);

  return (
    <div className="w-full max-w-md font-mono">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="SEARCH TELEMETRY..."
          className="w-full p-3 bg-white border-3 border-black text-xs font-black uppercase shadow-[3px_3px_0px_#000] focus:bg-[#FFDE59] focus:outline-none"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-black bg-[#CCFF00] px-1.5 py-0.5 border border-black">
            FETCHING...
          </span>
        )}
      </div>
      {results.length > 0 && (
        <ul className="mt-2 bg-white border-3 border-black shadow-[4px_4px_0px_#000]">
          {results.map((r, i) => (
            <li key={i} className="p-2.5 text-xs font-bold border-b border-black/10 last:border-b-0">
              {r}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};`,
      'src/__tests__/useDebouncedSearch.test.ts': `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebouncedSearch } from '../hooks/useDebouncedSearch';

describe('useDebouncedSearch Race Condition Suite', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.restoreAllMocks();
  });

  it('debounces network calls by specified delay', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ['Result 1'],
    });

    const { result, rerender } = renderHook(({ q }) => useDebouncedSearch(q, 300), {
      initialProps: { q: 'r' },
    });

    rerender({ q: 're' });
    rerender({ q: 'react' });

    expect(global.fetch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(350);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('aborts prior pending search if new keystroke arrives', () => {
    const abortSpy = vi.fn();
    global.AbortController = vi.fn().mockImplementation(() => ({
      signal: {},
      abort: abortSpy,
    }));

    const { rerender } = renderHook(({ q }) => useDebouncedSearch(q, 300), {
      initialProps: { q: 'first' },
    });

    vi.advanceTimersByTime(350); // triggers first fetch

    rerender({ q: 'second' }); // triggers debounce & cancels previous
    expect(abortSpy).toHaveBeenCalled();
  });
});`,
      'package.json': `{
  "name": "search-component",
  "version": "1.0.0"
}`
    },
    unitTests: [
      { id: 't1', name: 'debounces network calls by specified delay', duration: '20ms', assertion: 'expect(global.fetch).toHaveBeenCalledTimes(1)' },
      { id: 't2', name: 'aborts prior pending search if new keystroke arrives', duration: '18ms', assertion: 'expect(abortSpy).toHaveBeenCalled()' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 95,
      summary: 'Solid async coordination. Using `activeControllerRef` to cancel stale in-flight requests guarantees out-of-order responses are dropped before state mutations. Very clean engineering judgement.',
      comments: [
        {
          file: 'src/hooks/useDebouncedSearch.ts',
          line: 24,
          severity: 'suggestion',
          title: 'Abort in-flight requests on new search',
          comment: 'Aborting previous controller before starting new fetch cleanly mitigates the race condition bug.',
          diff: `+ if (activeControllerRef.current) activeControllerRef.current.abort();`
        }
      ]
    }
  },
  {
    id: 'HYPR-105',
    title: 'Write unit tests for shopping cart reducer (TDD)',
    type: 'test',
    difficulty: 'Easy',
    difficultyColor: 'bg-[#CCFF00] text-black',
    stack: ['TypeScript', 'Vitest', 'TDD'],
    estimatedTime: '20 min',
    xp: 120,
    seniorReviewer: {
      name: 'Sofia Chen',
      role: 'Staff Quality Engineer // Core',
      avatar: 'SC',
      rating: 97
    },
    mentorTip: 'Reducers are pure functions: testing them should verify state immutability, edge cases (quantity 0, duplicate IDs), and deterministic outputs without relying on React DOM rendering.',
    description: 'The `cartReducer` handles ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, and CLEAR_CART actions. Write comprehensive tests covering happy paths, edge cases, and state immutability.',
    codebase: {
      name: 'ecommerce-cart',
      files: 3,
      tests: 4,
      language: 'TypeScript',
    },
    acceptance: [
      'Tests cover ADD_ITEM (new item vs existing increment)',
      'Tests cover REMOVE_ITEM completely',
      'Tests verify UPDATE_QUANTITY = 0 removes item',
      'Tests assert state immutability with strict equality checks'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'cartReducer.ts', type: 'file' },
        { name: 'types.ts', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'cartReducer.test.ts', type: 'file', highlight: true },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/__tests__/cartReducer.test.ts',
    files: {
      'src/__tests__/cartReducer.test.ts': `import { describe, it, expect } from 'vitest';
import { cartReducer, CartState } from '../cartReducer';

describe('cartReducer Comprehensive Suite (TDD)', () => {
  const initialState: CartState = {
    items: [{ id: 'item-1', name: 'Mechanical Keyboard', price: 150, quantity: 1 }],
    totalAmount: 150,
  };

  it('ADD_ITEM increments quantity when item already in cart', () => {
    const action = {
      type: 'ADD_ITEM' as const,
      payload: { id: 'item-1', name: 'Mechanical Keyboard', price: 150, quantity: 1 },
    };
    const nextState = cartReducer(initialState, action);

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(2);
    expect(nextState.totalAmount).toBe(300);
  });

  it('ADD_ITEM appends brand new item when not in cart', () => {
    const action = {
      type: 'ADD_ITEM' as const,
      payload: { id: 'item-2', name: 'Desk Mat', price: 30, quantity: 1 },
    };
    const nextState = cartReducer(initialState, action);

    expect(nextState.items).toHaveLength(2);
    expect(nextState.totalAmount).toBe(180);
  });

  it('UPDATE_QUANTITY to 0 automatically drops item from cart', () => {
    const action = {
      type: 'UPDATE_QUANTITY' as const,
      payload: { id: 'item-1', quantity: 0 },
    };
    const nextState = cartReducer(initialState, action);

    expect(nextState.items).toHaveLength(0);
    expect(nextState.totalAmount).toBe(0);
  });

  it('maintains strict immutability (returns fresh state reference)', () => {
    const action = {
      type: 'ADD_ITEM' as const,
      payload: { id: 'item-3', name: 'USB Hub', price: 40, quantity: 1 },
    };
    const nextState = cartReducer(initialState, action);

    expect(nextState).not.toBe(initialState);
    expect(nextState.items).not.toBe(initialState.items);
  });
});`,
      'src/cartReducer.ts': `export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(i => i.id === action.payload.id);
      let updatedItems: CartItem[];
      if (existingIndex >= 0) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...state, items: updatedItems, totalAmount };
    }
    case 'UPDATE_QUANTITY': {
      let updatedItems: CartItem[];
      if (action.payload.quantity <= 0) {
        updatedItems = state.items.filter(i => i.id !== action.payload.id);
      } else {
        updatedItems = state.items.map(item =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        );
      }
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...state, items: updatedItems, totalAmount };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(i => i.id !== action.payload.id);
      const totalAmount = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { ...state, items: updatedItems, totalAmount };
    }
    case 'CLEAR_CART':
      return { items: [], totalAmount: 0 };
    default:
      return state;
  }
}`,
      'src/types.ts': `export * from './cartReducer';`,
      'package.json': `{
  "name": "ecommerce-cart",
  "version": "1.0.0"
}`
    },
    unitTests: [
      { id: 't1', name: 'ADD_ITEM increments quantity when item already in cart', duration: '12ms', assertion: 'expect(nextState.items[0].quantity).toBe(2)' },
      { id: 't2', name: 'ADD_ITEM appends brand new item when not in cart', duration: '15ms', assertion: 'expect(nextState.items).toHaveLength(2)' },
      { id: 't3', name: 'UPDATE_QUANTITY to 0 automatically drops item from cart', duration: '10ms', assertion: 'expect(nextState.items).toHaveLength(0)' },
      { id: 't4', name: 'maintains strict immutability (returns fresh state reference)', duration: '14ms', assertion: 'expect(nextState).not.toBe(initialState)' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 99,
      summary: 'Superb test coverage. You covered the edge case of setting quantity to 0 and verified reference inequality. This is standard production TDD.',
      comments: [
        {
          file: 'src/__tests__/cartReducer.test.ts',
          line: 38,
          severity: 'suggestion',
          title: 'Reference equality assertions',
          comment: 'Asserting `expect(nextState).not.toBe(initialState)` guarantees no mutation bugs slip into React re-render pipelines.',
          diff: `+ expect(nextState).not.toBe(initialState);`
        }
      ]
    }
  },
  {
    id: 'HYPR-106',
    title: 'Implement optimistic UI update for todo list with rollback',
    type: 'feature',
    difficulty: 'Hard',
    difficultyColor: 'bg-[#FF0033] text-white',
    stack: ['React', 'TypeScript', 'API'],
    estimatedTime: '40 min',
    xp: 280,
    seniorReviewer: {
      name: 'Kavita Reddy',
      role: 'Staff Frontend Engineer // UX Systems',
      avatar: 'KR',
      rating: 93
    },
    mentorTip: 'Optimistic updates make apps feel instant, but you must always snapshot the previous state BEFORE mutating local state so you can cleanly roll back when the network fails.',
    description: 'When a user toggles a todo completion status, the UI should update immediately (optimistic) while the API request fires in the background. If the API call fails, the UI must roll back to the previous state and show an error toast with retry trigger.',
    codebase: {
      name: 'todo-app',
      files: 4,
      tests: 4,
      language: 'TypeScript + React',
    },
    acceptance: [
      'UI toggles immediately before API responds',
      'API rejection restores previous state snapshot',
      'Error toast displays with retry option',
      'Multiple rapid toggles queue correctly'
    ],
    fileTree: [
      { name: 'src/', type: 'folder', children: [
        { name: 'hooks/', type: 'folder', children: [
          { name: 'useOptimisticTodos.ts', type: 'file', highlight: true },
        ]},
        { name: 'components/', type: 'folder', children: [
          { name: 'TodoList.tsx', type: 'file' },
        ]},
        { name: 'types.ts', type: 'file' },
      ]},
      { name: '__tests__/', type: 'folder', children: [
        { name: 'useOptimisticTodos.test.ts', type: 'file' },
      ]},
      { name: 'package.json', type: 'file' },
    ],
    defaultFile: 'src/hooks/useOptimisticTodos.ts',
    files: {
      'src/hooks/useOptimisticTodos.ts': `import { useState } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useOptimisticTodos(initialTodos: Todo[]) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const toggleTodo = async (id: string) => {
    // 1. Snapshot previous state before optimistic mutation
    const previousTodos = todos;

    // 2. Optimistically update local state immediately
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    setErrorMessage(null);

    // 3. Dispatch API call
    try {
      const res = await fetch(\`/api/todos/\${id}/toggle\`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to update todo on server');
    } catch (err: any) {
      // 4. Rollback on failure!
      setTodos(previousTodos);
      setErrorMessage(err.message || 'Network error: Rolled back change');
    }
  };

  return { todos, toggleTodo, errorMessage };
}`,
      'src/components/TodoList.tsx': `import React from 'react';
import { useOptimisticTodos, Todo } from '../hooks/useOptimisticTodos';

const defaultTodos: Todo[] = [
  { id: '1', title: 'Audit SOC-2 compliance checklist', completed: true },
  { id: '2', title: 'Migrate dashboard to React 19 hooks', completed: false },
  { id: '3', title: 'Implement Vitest bite-sized runner', completed: false },
];

export const TodoList: React.FC = () => {
  const { todos, toggleTodo, errorMessage } = useOptimisticTodos(defaultTodos);

  return (
    <div className="max-w-md bg-white border-3 border-black p-4 shadow-[4px_4px_0px_#000] font-mono">
      <h3 className="font-black text-sm uppercase mb-3">SPRINT TASKS</h3>
      {errorMessage && (
        <div className="mb-3 p-2 bg-red-100 border-2 border-black text-red-700 text-xs font-bold">
          ⚠️ {errorMessage}
        </div>
      )}
      <ul className="space-y-2">
        {todos.map(todo => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className="flex items-center gap-2 p-2 border-2 border-black cursor-pointer hover:bg-[#FAF8F5] transition-colors"
          >
            <span className={\`w-4 h-4 border-2 border-black flex items-center justify-center text-[10px] \${todo.completed ? 'bg-[#CCFF00]' : 'bg-white'}\`}>
              {todo.completed && '✓'}
            </span>
            <span className={\`text-xs font-bold \${todo.completed ? 'line-through text-gray-500' : 'text-black'}\`}>
              {todo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};`,
      'src/__tests__/useOptimisticTodos.test.ts': `import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useOptimisticTodos } from '../hooks/useOptimisticTodos';

const initial = [
  { id: '1', title: 'Task 1', completed: false },
];

describe('useOptimisticTodos Rollback Suite', () => {
  it('instantly flips state before network response finishes', async () => {
    let resolvePromise: any;
    global.fetch = vi.fn().mockImplementation(() => new Promise(res => { resolvePromise = res; }));

    const { result } = renderHook(() => useOptimisticTodos(initial));

    act(() => {
      result.current.toggleTodo('1');
    });

    // Should be optimistically completed immediately
    expect(result.current.todos[0].completed).toBe(true);

    // Now resolve API
    await act(async () => {
      resolvePromise({ ok: true });
    });
    expect(result.current.todos[0].completed).toBe(true);
  });

  it('rolls back to previous state snapshot if network fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('500 Server Error'));

    const { result } = renderHook(() => useOptimisticTodos(initial));

    await act(async () => {
      await result.current.toggleTodo('1');
    });

    // Rolled back to false!
    expect(result.current.todos[0].completed).toBe(false);
    expect(result.current.errorMessage).toContain('500 Server Error');
  });
});`,
      'package.json': `{
  "name": "todo-app",
  "version": "1.0.0"
}`
    },
    unitTests: [
      { id: 't1', name: 'instantly flips state before network response finishes', duration: '18ms', assertion: 'expect(result.current.todos[0].completed).toBe(true)' },
      { id: 't2', name: 'rolls back to previous state snapshot if network fails', duration: '24ms', assertion: 'expect(result.current.todos[0].completed).toBe(false)' }
    ],
    reviewReport: {
      status: 'LGTM - Ready to Merge',
      score: 93,
      summary: 'Solid implementation of optimistic UI pattern. The pre-mutation snapshot pattern cleanly restores previous state without leaving the UI out of sync.',
      comments: [
        {
          file: 'src/hooks/useOptimisticTodos.ts',
          line: 16,
          severity: 'suggestion',
          title: 'State snapshotting',
          comment: 'Snapshotting `previousTodos` before setting state is the foundation of robust optimistic mutations.',
          diff: `+ const previousTodos = todos;`
        }
      ]
    }
  }
];

const TICKET_TYPE_CONFIG = {
  bug: { label: 'BUG FIX', icon: Bug, color: 'bg-[#FF0033] text-white', borderColor: 'border-[#FF0033]' },
  feature: { label: 'FEATURE', icon: Sparkles, color: 'bg-[#2563EB] text-white', borderColor: 'border-[#2563EB]' },
  refactor: { label: 'REFACTOR', icon: Wrench, color: 'bg-[#FF5722] text-white', borderColor: 'border-[#FF5722]' },
  test: { label: 'WRITE TESTS', icon: TestTube2, color: 'bg-[#8B5CF6] text-white', borderColor: 'border-[#8B5CF6]' },
};

const SEVERITY_CONFIG = {
  error: { label: 'ERROR', color: 'bg-[#FF0033] text-white', icon: AlertTriangle },
  warning: { label: 'WARNING', color: 'bg-[#FFDE59] text-black', icon: AlertTriangle },
  suggestion: { label: 'SUGGESTION', color: 'bg-[#00F0FF] text-black', icon: Sparkles },
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function BiteSizedCodebase() {
  const [filterType, setFilterType] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [startedTickets, setStartedTickets] = useState(new Set());
  const [completedTickets, setCompletedTickets] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  // Active Workspace State
  const [activeWorkspaceTicket, setActiveWorkspaceTicket] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [userCodeMap, setUserCodeMap] = useState({});
  const [leftTab, setLeftTab] = useState('specs'); // 'specs' | 'files' | 'review'
  const [checkedCriteria, setCheckedCriteria] = useState({});
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testOutput, setTestOutput] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);

  // Filtering
  const filteredTickets = useMemo(() => {
    return TICKETS.filter(t => {
      if (filterType !== 'all' && t.type !== filterType) return false;
      if (filterDifficulty !== 'all' && t.difficulty !== filterDifficulty) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return t.title.toLowerCase().includes(q) || t.id.toLowerCase().includes(q) || t.stack.some(s => s.toLowerCase().includes(q));
      }
      return true;
    });
  }, [filterType, filterDifficulty, searchQuery]);

  // Overall Stats
  const stats = useMemo(() => {
    const totalXp = Array.from(completedTickets).reduce((sum, id) => {
      const t = TICKETS.find(tk => tk.id === id);
      return sum + (t?.xp || 0);
    }, 0);
    return {
      total: TICKETS.length,
      started: startedTickets.size,
      completed: completedTickets.size,
      xp: totalXp
    };
  }, [startedTickets, completedTickets]);

  // Launch Codebase Workspace
  const handleOpenWorkspace = (ticket) => {
    setActiveWorkspaceTicket(ticket);
    const initialFile = ticket.defaultFile || Object.keys(ticket.files)[0];
    setActiveFile(initialFile);
    setOpenTabs([initialFile]);
    setLeftTab('specs');
    setIsTestRunning(false);
    setTestOutput(null);
    setShowReviewModal(false);

    // Initialize user code for this ticket if not present
    setUserCodeMap(prev => {
      const ticketCode = prev[ticket.id] ? { ...prev[ticket.id] } : { ...ticket.files };
      return { ...prev, [ticket.id]: ticketCode };
    });

    setStartedTickets(prev => new Set(prev).add(ticket.id));
  };

  const handleCloseWorkspace = () => {
    setActiveWorkspaceTicket(null);
    setActiveFile(null);
  };

  const handleCodeChange = (newVal) => {
    if (!activeWorkspaceTicket || !activeFile) return;
    setUserCodeMap(prev => ({
      ...prev,
      [activeWorkspaceTicket.id]: {
        ...prev[activeWorkspaceTicket.id],
        [activeFile]: newVal
      }
    }));
  };

  const handleResetCurrentFile = () => {
    if (!activeWorkspaceTicket || !activeFile) return;
    const original = activeWorkspaceTicket.files[activeFile] || '';
    handleCodeChange(original);
  };

  const handleOpenFile = (path) => {
    if (!openTabs.includes(path)) {
      setOpenTabs(prev => [...prev, path]);
    }
    setActiveFile(path);
  };

  const handleCloseTab = (path, e) => {
    e.stopPropagation();
    const nextTabs = openTabs.filter(t => t !== path);
    setOpenTabs(nextTabs);
    if (activeFile === path && nextTabs.length > 0) {
      setActiveFile(nextTabs[nextTabs.length - 1]);
    }
  };

  // Run Tests Simulation
  const handleRunTests = () => {
    if (!activeWorkspaceTicket) return;
    setIsTestRunning(true);
    setTestOutput(null);
    setIsConsoleExpanded(true);

    setTimeout(() => {
      setIsTestRunning(false);
      setTestOutput({
        status: 'passed',
        totalTests: activeWorkspaceTicket.unitTests.length,
        passedTests: activeWorkspaceTicket.unitTests.length,
        duration: '184ms',
        tests: activeWorkspaceTicket.unitTests.map(t => ({ ...t, status: 'pass' }))
      });
    }, 900);
  };

  // Submit Pull Request & Get Senior Review
  const handleSubmitPR = () => {
    if (!activeWorkspaceTicket) return;
    setCompletedTickets(prev => new Set(prev).add(activeWorkspaceTicket.id));
    setLeftTab('review');
    setShowReviewModal(true);
  };

  const toggleCriterion = (ticketId, idx) => {
    const key = `${ticketId}-${idx}`;
    setCheckedCriteria(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const copyTicketId = (id) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(id).catch(() => {});
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Current active file code
  const currentCode = useMemo(() => {
    if (!activeWorkspaceTicket || !activeFile) return '';
    return userCodeMap[activeWorkspaceTicket.id]?.[activeFile] ?? activeWorkspaceTicket.files[activeFile] ?? '';
  }, [activeWorkspaceTicket, activeFile, userCodeMap]);

  // Determine language for Monaco editor
  const editorLanguage = useMemo(() => {
    if (!activeFile) return 'typescript';
    if (activeFile.endsWith('.tsx')) return 'typescript';
    if (activeFile.endsWith('.ts')) return 'typescript';
    if (activeFile.endsWith('.json')) return 'json';
    if (activeFile.endsWith('.css')) return 'css';
    return 'javascript';
  }, [activeFile]);

  // ═══════════════════════════════════════════════════════════════
  // RENDER: WORKSPACE VIEW
  // ═══════════════════════════════════════════════════════════════
  if (activeWorkspaceTicket) {
    const ticket = activeWorkspaceTicket;
    const typeConfig = TICKET_TYPE_CONFIG[ticket.type];
    const isCompleted = completedTickets.has(ticket.id);

    return (
      <div className="flex h-screen max-h-screen flex-col bg-[#F0EDE6] text-black font-mono overflow-hidden select-none">
        
        {/* Top Control Bar */}
        <header className="h-14 shrink-0 bg-white border-b-4 border-black px-4 flex items-center justify-between shadow-[0_3px_0px_#000] z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={handleCloseWorkspace}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-[#FFDE59] hover:bg-[#FFDE59] hover:text-black border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <ArrowLeft size={13} /> BACK TO TICKETS
            </button>

            <span className="hidden sm:inline-block w-px h-6 bg-black" />

            <div className="flex items-center gap-2 truncate">
              <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-xs font-black uppercase border border-black shrink-0">
                {ticket.id}
              </span>
              <span className={`hidden md:inline-flex px-2 py-0.5 text-[10px] font-black uppercase border border-black ${typeConfig.color} shrink-0`}>
                {typeConfig.label}
              </span>
              <span className="font-black text-xs uppercase truncate max-w-xs md:max-w-md text-black">
                {ticket.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunTests}
              disabled={isTestRunning}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#CCFF00] hover:bg-[#b8f000] text-black border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
            >
              <TestTube2 size={13} className={isTestRunning ? 'animate-spin' : ''} />
              <span>{isTestRunning ? 'RUNNING TESTS...' : 'RUN TESTS (VITEST)'}</span>
            </button>

            <button
              onClick={handleSubmitPR}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2563EB] hover:bg-blue-700 text-white border-2 border-black font-black text-xs uppercase shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              <GitPullRequest size={13} />
              <span>SUBMIT PULL REQUEST</span>
            </button>

            {isCompleted && (
              <span className="hidden lg:flex items-center gap-1 bg-[#CCFF00] text-black px-2 py-1 text-[10px] font-black border border-black">
                <CheckCircle2 size={11} /> MERGE APPROVED
              </span>
            )}
          </div>
        </header>

        {/* Main Split Layout */}
        <div className="flex-1 min-h-0 flex overflow-hidden">
          
          {/* Left Panel: Spec, Files & Review Tabs */}
          <div className="w-80 md:w-96 shrink-0 bg-white border-r-4 border-black flex flex-col h-full overflow-hidden shadow-[4px_0px_0px_#000] z-10">
            
            {/* Left Tabs Bar */}
            <div className="grid grid-cols-3 bg-[#FAF8F5] border-b-3 border-black text-[11px] font-black uppercase text-center shrink-0">
              <button
                onClick={() => setLeftTab('specs')}
                className={`py-2.5 border-r-2 border-black transition-colors ${leftTab === 'specs' ? 'bg-[#FFDE59] text-black shadow-inner' : 'hover:bg-white text-gray-600'}`}
              >
                SPEC
              </button>
              <button
                onClick={() => setLeftTab('files')}
                className={`py-2.5 border-r-2 border-black transition-colors ${leftTab === 'files' ? 'bg-[#FFDE59] text-black shadow-inner' : 'hover:bg-white text-gray-600'}`}
              >
                FILES ({Object.keys(ticket.files).length})
              </button>
              <button
                onClick={() => setLeftTab('review')}
                className={`py-2.5 transition-colors ${leftTab === 'review' ? 'bg-[#CCFF00] text-black shadow-inner' : 'hover:bg-white text-gray-600'}`}
              >
                REVIEW {isCompleted && '✓'}
              </button>
            </div>

            {/* Left Content Scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              
              {/* TAB 1: SPECIFICATION & ACCEPTANCE */}
              {leftTab === 'specs' && (
                <div className="space-y-4">
                  {/* Codebase Badge */}
                  <div className="bg-[#FAF8F5] border-2 border-black p-3 shadow-[2px_2px_0px_#000]">
                    <div className="text-[10px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
                      <FolderTree size={11} className="text-[#2563EB]" /> CODEBASE CONTEXT
                    </div>
                    <div className="text-xs font-black uppercase text-black">{ticket.codebase.name}/</div>
                    <div className="text-[10px] font-bold text-gray-600 mt-1 flex items-center gap-2">
                      <span>{ticket.codebase.files} FILES</span>
                      <span>•</span>
                      <span>{ticket.codebase.tests} TESTS</span>
                      <span>•</span>
                      <span className="bg-[#FFDE59] text-black px-1 border border-black">{ticket.xp} XP REWARD</span>
                    </div>
                  </div>

                  {/* Problem Description */}
                  <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
                    <div className="text-[10px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
                      <FileText size={11} /> PROBLEM STATEMENT
                    </div>
                    <p className="text-xs font-bold leading-relaxed text-black">{ticket.description}</p>
                  </div>

                  {/* Acceptance Criteria Checklist */}
                  <div className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
                    <div className="text-[10px] font-black uppercase text-black mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1"><CheckCircle2 size={12} className="text-[#2563EB]" /> ACCEPTANCE CRITERIA</span>
                      <span className="text-[9px] text-gray-500">CHECK TO TRACK</span>
                    </div>
                    <div className="space-y-2">
                      {ticket.acceptance.map((ac, idx) => {
                        const isChecked = !!checkedCriteria[`${ticket.id}-${idx}`];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleCriterion(ticket.id, idx)}
                            className={`flex items-start gap-2 p-2 border border-black cursor-pointer text-xs font-bold transition-all ${
                              isChecked ? 'bg-[#CCFF00]/30 line-through text-gray-500' : 'bg-[#FAF8F5] text-black hover:bg-white'
                            }`}
                          >
                            <span className="mt-0.5 shrink-0 text-black">
                              {isChecked ? <CheckSquare size={13} className="text-black" /> : <Square size={13} />}
                            </span>
                            <span className="leading-tight">{ac}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Senior Judgement Card */}
                  <div className="bg-black text-white border-2 border-black p-3.5 shadow-[3px_3px_0px_#000]">
                    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-[#FFDE59] mb-1.5">
                      <Sparkles size={11} /> SENIOR JUDGEMENT TIP
                    </div>
                    <p className="text-[11px] font-bold text-neutral-300 leading-relaxed">
                      {ticket.mentorTip}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: CODEBASE FILE EXPLORER */}
              {leftTab === 'files' && (
                <div className="space-y-3">
                  <div className="text-[10px] font-black uppercase text-gray-500 px-1">
                    PROJECT FILES // {ticket.codebase.name}/
                  </div>
                  <div className="bg-white border-2 border-black divide-y divide-black/10 shadow-[3px_3px_0px_#000]">
                    {Object.keys(ticket.files).map(filePath => {
                      const isCurrent = filePath === activeFile;
                      const isTarget = filePath === ticket.defaultFile;
                      const isTest = filePath.includes('.test.');

                      return (
                        <div
                          key={filePath}
                          onClick={() => handleOpenFile(filePath)}
                          className={`flex items-center justify-between p-2.5 text-xs font-bold cursor-pointer transition-colors ${
                            isCurrent
                              ? 'bg-black text-[#00F0FF]'
                              : isTarget
                              ? 'bg-[#FFDE59]/20 hover:bg-[#FFDE59]/40 text-black'
                              : 'hover:bg-[#FAF8F5] text-black'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isTest ? (
                              <TestTube2 size={12} className={isCurrent ? 'text-[#CCFF00]' : 'text-purple-600'} />
                            ) : (
                              <FileCode2 size={12} className={isCurrent ? 'text-[#00F0FF]' : 'text-blue-600'} />
                            )}
                            <span className="truncate">{filePath}</span>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            {isTarget && (
                              <span className="text-[8px] font-black bg-[#FF5722] text-white px-1 py-0.2 uppercase">
                                EDIT
                              </span>
                            )}
                            {isCurrent && (
                              <span className="text-[9px] text-[#CCFF00]">►</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3 bg-[#FAF8F5] border-2 border-black text-[11px] font-bold text-gray-600 leading-relaxed">
                    💡 <strong>Tip:</strong> Click any file in the explorer above to open it in a tab. Inspect the unit tests to understand the exact test cases your code must satisfy!
                  </div>
                </div>
              )}

              {/* TAB 3: SENIOR REVIEW REPORT */}
              {leftTab === 'review' && (
                <div className="space-y-4">
                  {/* Reviewer Header */}
                  <div className="bg-white border-3 border-black p-3.5 shadow-[3px_3px_0px_#000]">
                    <div className="flex items-center justify-between mb-3 pb-2 border-b-2 border-black">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-black text-[#FFDE59] border border-black flex items-center justify-center font-black text-xs">
                          {ticket.seniorReviewer.avatar}
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-black">{ticket.seniorReviewer.name}</div>
                          <div className="text-[9px] font-bold text-gray-500 uppercase">{ticket.seniorReviewer.role}</div>
                        </div>
                      </div>
                      <span className="bg-[#CCFF00] text-black border border-black px-2 py-0.5 text-[10px] font-black uppercase shadow-[1px_1px_0px_#000]">
                        {ticket.reviewReport.score}/100 SCORE
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-black text-[#CCFF00] text-[10px] font-black uppercase border border-black">
                        {ticket.reviewReport.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold leading-relaxed text-black/80">
                      {ticket.reviewReport.summary}
                    </p>
                  </div>

                  {/* Line Comments */}
                  <div className="space-y-3">
                    <div className="text-[10px] font-black uppercase text-gray-500 px-1">
                      LINE-BY-LINE SENIOR FEEDBACK ({ticket.reviewReport.comments.length})
                    </div>

                    {ticket.reviewReport.comments.map((comment, i) => {
                      const sev = SEVERITY_CONFIG[comment.severity];
                      const SevIcon = sev.icon;
                      return (
                        <div key={i} className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] overflow-hidden">
                          <div className="bg-[#FAF8F5] border-b-2 border-black px-3 py-1.5 flex items-center justify-between text-[10px] font-black uppercase">
                            <span className={`px-1.5 py-0.2 border border-black ${sev.color} flex items-center gap-1`}>
                              <SevIcon size={9} /> {sev.label}
                            </span>
                            <span className="text-gray-600">
                              {comment.file}:{comment.line}
                            </span>
                          </div>
                          <div className="p-3 space-y-2">
                            <div className="text-xs font-black text-black">{comment.title}</div>
                            <p className="text-xs font-bold text-gray-700 leading-relaxed">{comment.comment}</p>
                            {comment.diff && (
                              <div className="bg-[#18181b] p-2 text-[10px] text-white font-mono overflow-x-auto border border-black">
                                <pre className="leading-tight">{comment.diff}</pre>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Panel: File Tabs & Monaco Code Editor & Test Console */}
          <div className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#18181b]">
            
            {/* Editor File Tabs Bar */}
            <div className="h-10 shrink-0 bg-[#27272a] border-b-2 border-black flex items-center justify-between px-2 select-none overflow-x-auto">
              <div className="flex items-center gap-1 overflow-x-auto">
                {openTabs.map(tabPath => {
                  const isActive = tabPath === activeFile;
                  const fileName = tabPath.split('/').pop();
                  return (
                    <div
                      key={tabPath}
                      onClick={() => setActiveFile(tabPath)}
                      className={`h-8 px-3 flex items-center gap-2 text-xs font-black uppercase cursor-pointer border-r border-black/40 transition-colors ${
                        isActive
                          ? 'bg-[#18181b] text-[#00F0FF] border-t-2 border-t-[#00F0FF]'
                          : 'bg-[#27272a] text-neutral-400 hover:text-white'
                      }`}
                    >
                      <FileCode2 size={12} className={isActive ? 'text-[#00F0FF]' : 'text-neutral-500'} />
                      <span>{fileName}</span>
                      {openTabs.length > 1 && (
                        <button
                          onClick={(e) => handleCloseTab(tabPath, e)}
                          className="hover:text-red-400 ml-1 text-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleResetCurrentFile}
                  className="px-2 py-1 bg-[#3f3f46] hover:bg-[#52525b] text-neutral-200 text-[10px] font-black uppercase flex items-center gap-1 border border-black cursor-pointer"
                  title="Reset file to original starter code"
                >
                  <RotateCcw size={10} /> RESET
                </button>
              </div>
            </div>

            {/* Monaco Editor Container */}
            <div className="flex-1 min-h-0 relative">
              <Editor
                height="100%"
                language={editorLanguage}
                theme="vs-dark"
                value={currentCode}
                onChange={handleCodeChange}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
                  fontLigatures: true,
                  scrollBeyondLastLine: false,
                  padding: { top: 12, bottom: 12 },
                  tabSize: 2,
                  wordWrap: 'on',
                  lineNumbers: 'on',
                  automaticLayout: true,
                  renderLineHighlight: 'all',
                }}
              />
            </div>

            {/* Bottom Console / Test Runner Drawer */}
            <div className={`shrink-0 bg-[#09090b] border-t-4 border-black font-mono transition-all duration-200 ${
              isConsoleExpanded ? 'h-64' : 'h-11'
            } flex flex-col`}>
              
              {/* Console Header Bar */}
              <div
                onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
                className="h-11 px-4 bg-[#18181b] border-b-2 border-black/50 flex items-center justify-between text-xs font-black uppercase cursor-pointer hover:bg-[#27272a]"
              >
                <div className="flex items-center gap-3">
                  <Terminal size={14} className="text-[#CCFF00]" />
                  <span className="text-white">VITEST TEST RUNNER // {ticket.codebase.name}</span>
                  {testOutput && (
                    <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-black border border-black">
                      {testOutput.passedTests}/{testOutput.totalTests} PASSED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-neutral-400 text-xs">
                  {testOutput && <span>TIME: {testOutput.duration}</span>}
                  <button className="text-white cursor-pointer">
                    {isConsoleExpanded ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                </div>
              </div>

              {/* Console Body */}
              {isConsoleExpanded && (
                <div className="flex-1 min-h-0 p-4 overflow-y-auto text-xs font-mono space-y-2 text-[#e4e4e7] bg-[#09090b]">
                  {isTestRunning && (
                    <div className="flex items-center gap-2 text-[#FFDE59]">
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Running vitest suite across {ticket.codebase.name}/src/__tests__...</span>
                    </div>
                  )}

                  {!isTestRunning && !testOutput && (
                    <div className="text-neutral-500">
                      Press <strong>RUN TESTS (VITEST)</strong> to compile and execute the test suite against your current solution.
                    </div>
                  )}

                  {!isTestRunning && testOutput && (
                    <div className="space-y-3">
                      <div className="p-2.5 bg-[#CCFF00]/10 border border-[#CCFF00]/40 text-[#CCFF00] flex items-center justify-between text-[11px] font-bold">
                        <span>✓ PASS src/__tests__/{ticket.codebase.name}.test.tsx ({testOutput.duration})</span>
                        <span>{testOutput.totalTests} tests passed</span>
                      </div>

                      <div className="space-y-1.5 pl-2 border-l-2 border-[#CCFF00]/40">
                        {testOutput.tests.map((t, idx) => (
                          <div key={idx} className="flex items-center justify-between text-[11px]">
                            <span className="text-neutral-200">
                              <span className="text-[#CCFF00] mr-1.5 font-black">✓</span>
                              {t.name}
                            </span>
                            <span className="text-neutral-500 font-mono text-[10px]">{t.duration}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[10px] text-neutral-500 border-t border-neutral-800 flex items-center gap-4">
                        <span>Test Files: 1 passed (1)</span>
                        <span>Tests: {testOutput.totalTests} passed ({testOutput.totalTests})</span>
                        <span>Snapshots: 0</span>
                        <span>Duration: {testOutput.duration}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Senior Review Celebration Modal */}
        <AnimatePresence>
          {showReviewModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs font-mono">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-xl bg-white border-4 border-black p-6 md:p-8 shadow-[12px_12px_0px_#000] relative space-y-5"
              >
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#CCFF00] text-black px-2 py-0.5 text-xs font-black uppercase border border-black shadow-[1px_1px_0px_#000]">
                      PR REVIEW COMPLETE
                    </span>
                    <span className="bg-black text-[#00F0FF] px-2 py-0.5 text-xs font-black uppercase">
                      +{ticket.xp} XP
                    </span>
                  </div>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="w-7 h-7 bg-black text-white hover:bg-red-600 border border-black flex items-center justify-center text-xs font-black cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl font-black uppercase text-black tracking-tight mb-2">
                    MERGE APPROVED // {ticket.reviewReport.score}/100
                  </h3>
                  <p className="text-xs font-bold text-gray-700 leading-relaxed">
                    Reviewed by <strong>{ticket.seniorReviewer.name}</strong> ({ticket.seniorReviewer.role}).
                    Your solution stabilized the codebase, passed the full test suite, and adheres to senior-level architectural principles.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border-2 border-black p-4 space-y-2 text-xs">
                  <div className="text-[10px] font-black uppercase text-gray-500">GROWTH TAKEAWAY:</div>
                  <p className="font-bold text-black leading-relaxed">
                    {ticket.mentorTip}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="px-5 py-2.5 bg-black text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    INSPECT CODE REVIEW
                  </button>
                  <button
                    onClick={handleCloseWorkspace}
                    className="px-5 py-2.5 bg-[#FFDE59] text-black hover:bg-white border-2 border-black font-black text-xs uppercase shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    NEXT TICKET →
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // RENDER: BACKLOG & TICKET SELECTION VIEW
  // ═══════════════════════════════════════════════════════════════

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-20 custom-scrollbar font-mono bg-[#F0EDE6] select-none">
      <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">

        {/* ═══ HERO HEADER ═══ */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-black text-[#00F0FF] border-2 border-black px-3.5 py-1.5 text-xs font-black uppercase tracking-widest shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
              <GitPullRequest size={13} className="text-[#00F0FF]" />
              <span>BITE-SIZED CODEBASE</span>
            </span>
            <span className="bg-[#CCFF00] text-black border-2 border-black px-2.5 py-1.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000]">
              REAL-WORLD CODING
            </span>
            <span className="bg-[#FF0033] text-white border-2 border-black px-2.5 py-1.5 text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] flex items-center gap-1">
              <Zap size={11} />
              SENIOR-DEV REVIEWS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-black tracking-tight mb-4 flex items-center flex-wrap gap-3 leading-[1.1]">
            WORK IN A
            <span className="bg-[#2563EB] text-white px-3 py-1 border-4 border-black shadow-[5px_5px_0px_#000] inline-block -rotate-1">
              BITE SIZED
            </span>
            CODEBASE
          </h1>

          <p className="text-xs md:text-sm font-bold text-gray-700 max-w-3xl uppercase tracking-wide leading-relaxed bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_#000]">
            // PRACTICE REAL-WORLD CODING IN BITE-SIZED CODEBASES. SHARPEN ENGINEERING JUDGEMENT, FIX TICKETS, AND GET REVIEWED LIKE A JUNIOR DEVELOPER. WORK INSIDE SMALL REACT / TYPESCRIPT CODEBASES WITH TESTS. SUBMIT YOUR SOLUTION AND GET SENIOR-DEV STYLE FEEDBACK.
          </p>
        </div>

        {/* ═══ STATS BAR ═══ */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'AVAILABLE TICKETS', value: stats.total, accent: 'bg-[#FAF8F5]', valueColor: 'text-black' },
            { label: 'IN PROGRESS', value: stats.started, accent: 'bg-[#FFDE59]', valueColor: 'text-black' },
            { label: 'SOLVED & MERGED', value: stats.completed, accent: 'bg-[#CCFF00]', valueColor: 'text-black' },
            { label: 'TOTAL XP ACCRUED', value: `${stats.xp} XP`, accent: 'bg-[#00F0FF]', valueColor: 'text-black' },
          ].map((s, i) => (
            <div key={i} className={`${s.accent} border-3 border-black p-3.5 shadow-[4px_4px_0px_#000]`}>
              <div className="text-[9px] font-black uppercase text-black/60 mb-1">{s.label}</div>
              <div className={`text-xl font-black ${s.valueColor}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ═══ HOW IT WORKS ═══ */}
        <div className="bg-white border-4 border-black p-5 sm:p-6 shadow-[8px_8px_0px_#000] mb-8">
          <div className="text-xs font-black uppercase tracking-widest text-black mb-4 flex items-center gap-2">
            <BookOpen size={14} /> [ WORKFLOW // FROM JUNIOR TICKET TO SENIOR MERGE ]
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                step: '01',
                title: 'SELECT A TICKET',
                desc: 'Pick an authentic bug fix, feature request, refactor, or test ticket from the engineering backlog. Each ticket is connected to a mini-codebase.',
                icon: GitPullRequest,
                color: 'bg-[#FF0033]'
              },
              {
                step: '02',
                title: 'WORK IN CODEBASE',
                desc: 'Inspect files in an in-browser VS Code / Monaco workspace, read specs, edit TypeScript/React source code, and run unit tests live with Vitest.',
                icon: Terminal,
                color: 'bg-[#2563EB]'
              },
              {
                step: '03',
                title: 'GET SENIOR-DEV REVIEW',
                desc: 'Submit your solution for a code review featuring quality scores, line-by-line diff comments, and constructive junior developer mentorship.',
                icon: MessageSquare,
                color: 'bg-[#CCFF00]'
              },
            ].map((s, i) => (
              <div key={i} className="bg-[#FAF8F5] border-3 border-black p-4 shadow-[3px_3px_0px_#000] flex flex-col">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className={`w-10 h-10 ${s.color} border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center shrink-0`}>
                    <s.icon size={18} className={s.color === 'bg-[#CCFF00]' ? 'text-black' : 'text-white'} strokeWidth={2.5} />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-neutral-500 uppercase">STEP {s.step}</div>
                    <div className="text-sm font-black uppercase text-black">{s.title}</div>
                  </div>
                </div>
                <p className="text-[11px] font-bold text-black/70 leading-relaxed flex-1">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:flex justify-end mt-3">
                    <ArrowRight size={16} className="text-black/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ FILTERS & SEARCH ═══ */}
        <div className="bg-white border-3 border-black p-3.5 shadow-[4px_4px_0px_#000] mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-black uppercase text-neutral-500 mr-1 hidden sm:inline">TYPE:</span>
            {[
              { id: 'all', label: 'ALL TICKETS' },
              { id: 'bug', label: '🐛 BUGS' },
              { id: 'feature', label: '✨ FEATURES' },
              { id: 'refactor', label: '🔧 REFACTORS' },
              { id: 'test', label: '🧪 TESTS' },
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer ${
                  filterType === f.id ? 'bg-black text-[#CCFF00]' : 'bg-[#FAF8F5] text-black hover:bg-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-neutral-500 hidden sm:inline">LEVEL:</span>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="bg-[#FAF8F5] border-2 border-black px-2.5 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] focus:outline-none cursor-pointer"
            >
              <option value="all">ALL LEVELS</option>
              <option value="Easy">EASY</option>
              <option value="Medium">MEDIUM</option>
              <option value="Hard">HARD</option>
            </select>

            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/50" />
              <input
                type="text"
                placeholder="SEARCH TICKETS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#FAF8F5] border-2 border-black pl-8 pr-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_#000] focus:outline-none focus:bg-white w-32 sm:w-44"
              />
            </div>
          </div>
        </div>

        {/* ═══ TICKET LIST ═══ */}
        <div className="space-y-5">
          {filteredTickets.length === 0 && (
            <div className="bg-white border-4 border-black p-8 text-center shadow-[6px_6px_0px_#000]">
              <Search size={28} className="mx-auto mb-2 text-neutral-400" />
              <h4 className="text-base font-black uppercase text-black">No tickets match your filter</h4>
              <p className="text-xs font-bold text-neutral-600 uppercase mt-1 mb-4">
                Try adjusting the type, difficulty level, or search keywords.
              </p>
              <button
                onClick={() => { setFilterType('all'); setFilterDifficulty('all'); setSearchQuery(''); }}
                className="bg-[#CCFF00] hover:bg-[#b8e600] border-2 border-black px-4 py-1.5 text-xs font-black uppercase shadow-[2px_2px_0px_#000]"
              >
                Reset Filters
              </button>
            </div>
          )}

          {filteredTickets.map((ticket) => {
            const typeConfig = TICKET_TYPE_CONFIG[ticket.type];
            const TypeIcon = typeConfig.icon;
            const isStarted = startedTickets.has(ticket.id);
            const isCompleted = completedTickets.has(ticket.id);

            return (
              <motion.div
                key={ticket.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white border-4 border-black shadow-[6px_6px_0px_#000] hover:shadow-[9px_9px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all ${
                  isCompleted ? 'border-[#CCFF00] bg-white' : ''
                }`}
              >
                {/* Ticket Card Header */}
                <div className={`border-b-3 border-black px-5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isCompleted ? 'bg-[#CCFF00]/15' : 'bg-[#FAF8F5]'
                }`}>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                      onClick={() => copyTicketId(ticket.id)}
                      className="bg-black text-[#00F0FF] px-2 py-0.5 text-[11px] font-black uppercase border border-black hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy ticket ID"
                    >
                      {copiedId === ticket.id ? <Check size={10} /> : <Copy size={10} />}
                      {ticket.id}
                    </button>

                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-black ${typeConfig.color} flex items-center gap-1`}>
                      <TypeIcon size={10} /> {typeConfig.label}
                    </span>

                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-black ${ticket.difficultyColor}`}>
                      {ticket.difficulty}
                    </span>

                    {ticket.stack.map(s => (
                      <span key={s} className="bg-white border border-black px-1.5 py-0.5 text-[9px] font-black uppercase text-black/70 hidden sm:inline-block">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2.5 text-[10px] font-black uppercase text-black/60 shrink-0">
                    <span className="flex items-center gap-1"><Clock size={11} /> {ticket.estimatedTime}</span>
                    <span className="flex items-center gap-1 bg-[#FFDE59] text-black px-1.5 py-0.5 border border-black"><Star size={10} /> {ticket.xp} XP</span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 bg-[#CCFF00] text-black px-1.5 py-0.5 border border-black"><CheckCircle2 size={10} /> MERGED</span>
                    )}
                  </div>
                </div>

                {/* Ticket Card Content */}
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                    <div className="flex-1 space-y-3">
                      <h3 className="text-lg sm:text-xl font-black uppercase text-black tracking-tight leading-snug">
                        {ticket.title}
                      </h3>
                      <p className="text-xs font-bold text-black/75 leading-relaxed max-w-3xl">
                        {ticket.description}
                      </p>

                      {/* Codebase Meta Pill */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="bg-[#FAF8F5] border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1.5 text-xs font-black uppercase">
                          <FolderTree size={12} className="text-[#2563EB]" />
                          <span>{ticket.codebase.name}/</span>
                        </div>
                        <div className="text-[10px] font-black text-black/60 flex items-center gap-3">
                          <span className="flex items-center gap-1"><FileCode2 size={11} /> {ticket.codebase.files} FILES</span>
                          <span className="flex items-center gap-1"><TestTube2 size={11} /> {ticket.codebase.tests} TESTS</span>
                          <span className="flex items-center gap-1"><Layers size={11} /> {ticket.codebase.language}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Launch Button */}
                    <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
                      <button
                        onClick={() => handleOpenWorkspace(ticket)}
                        className="px-6 py-3 bg-[#CCFF00] hover:bg-[#b8f000] text-black border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <Terminal size={14} />
                        <span>WORK IN CODEBASE</span>
                        <ArrowRight size={13} strokeWidth={2.5} />
                      </button>

                      <div className="text-center text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                        Reviewer: {ticket.seniorReviewer.name}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
