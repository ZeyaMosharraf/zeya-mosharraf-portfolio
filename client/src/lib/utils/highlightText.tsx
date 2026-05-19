import React from "react";

/**
 * highlightText — Terminal-style syntax highlighter for the Hero section and case studies.
 * Highlights numbers, keywords, quotes, and terminal symbols.
 */
export function highlightText(text: string): JSX.Element {
  // Skip empty lines
  if (!text || text.trim() === "") {
    return <span>{text}</span>;
  }

  const numberRegex = /(\d+\.?\d*[MBK%]?\+?)/g;
  const bulletRegex = /(✓|•|└|├|─)/g;
  const quoteRegex = /(".*?")/g;
  const keywordRegex = /\b(true|false|success|active|online|error|failed|offline)\b/gi;

  const processText = (str: string) => {
    const result: (string | JSX.Element)[] = [];
    let idx = 0;

    // 1. Match numbers
    const numMatches = Array.from(str.matchAll(numberRegex));
    if (numMatches.length > 0) {
      numMatches.forEach((m, i) => {
        if (m.index! > idx) {
          result.push(str.slice(idx, m.index));
        }
        result.push(
          <span key={`num-${i}`} style={{ color: '#60A5FA' }}>
            {m[0]}
          </span>
        );
        idx = m.index! + m[0].length;
      });
      if (idx < str.length) {
        result.push(str.slice(idx));
      }
      return result;
    }

    // 2. Match bullets/symbols
    const bulletMatches = Array.from(str.matchAll(bulletRegex));
    if (bulletMatches.length > 0) {
      idx = 0;
      bulletMatches.forEach((m, i) => {
        if (m.index! > idx) {
          result.push(str.slice(idx, m.index));
        }
        result.push(
          <span key={`bullet-${i}`} style={{ color: '#34D399' }}>
            {m[0]}
          </span>
        );
        idx = m.index! + m[0].length;
      });
      if (idx < str.length) {
        result.push(str.slice(idx));
      }
      return result;
    }

    // 3. Match quoted text
    const quoteMatches = Array.from(str.matchAll(quoteRegex));
    if (quoteMatches.length > 0) {
      idx = 0;
      quoteMatches.forEach((m, i) => {
        if (m.index! > idx) {
          result.push(str.slice(idx, m.index));
        }
        result.push(
          <span key={`quote-${i}`} style={{ color: '#F8B4D4' }}>
            {m[0]}
          </span>
        );
        idx = m.index! + m[0].length;
      });
      if (idx < str.length) {
        result.push(str.slice(idx));
      }
      return result;
    }

    // 4. Match keywords
    const keywordMatches = Array.from(str.matchAll(keywordRegex));
    if (keywordMatches.length > 0) {
      idx = 0;
      keywordMatches.forEach((m, i) => {
        if (m.index! > idx) {
          result.push(str.slice(idx, m.index));
        }
        const isError = /error|failed|offline/i.test(m[0]);
        result.push(
          <span key={`kw-${i}`} style={{ color: isError ? '#F87171' : '#34D399' }}>
            {m[0]}
          </span>
        );
        idx = m.index! + m[0].length;
      });
      if (idx < str.length) {
        result.push(str.slice(idx));
      }
      return result;
    }

    return [str];
  };

  return <span>{processText(text)}</span>;
}

/**
 * Splits a multi-line / bullet-separated string into an array of clean strings.
 * Handles both newline-separated and "\u2022"-separated formats from the database.
 */
export const parseBullets = (text: string): string[] =>
  text
    .split(/\n|\u2022/)
    .map((s) => s.replace(/^\s+|\s+$/g, "").replace(/^\s*\u2022\s*/, ""))
    .filter((s) => s.length > 4);

/**
 * Renders a string with simple markdown-like formatting:
 * - **text** \u2192 <strong>
 * - ==text== \u2192 highlighted red span (for key metrics)
 */
export const renderFormattedText = (
  text: string | undefined | null
): React.ReactNode => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*|==.*?==)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-bold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return (
        <span
          key={i}
          className="text-red-500 font-bold bg-red-500/10 px-1.5 py-0.5 rounded-md border border-red-500/20 mx-0.5 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
        >
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
};
