/**
 * Loading Skeletons
 * Reusable skeleton loaders for different content types
 * Eliminates duplication of loading state UI
 */
import React from "react";

/**
 * SkillBarSkeleton - Skeleton for skill bar content
 */
export const SkillBarSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="space-y-5">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div
          className="h-3.5 rounded w-2/3 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        <div
          className="h-2.5 rounded-full w-full animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
      </div>
    ))}
  </div>
);

/**
 * PillsSkeleton - Skeleton for pill/badge content
 */
export const PillsSkeleton: React.FC<{ count?: number }> = ({ count = 8 }) => (
  <div className="flex flex-wrap justify-center gap-2">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-8 rounded-lg animate-pulse"
        style={{
          width: `${60 + (i % 4) * 20}px`,
          background: "rgba(255,255,255,0.04)",
        }}
      />
    ))}
  </div>
);

/**
 * CardSkeleton - Skeleton for card content
 */
export const CardSkeleton: React.FC<{ count?: number; height?: string }> = ({
  count = 3,
  height = "h-[400px]",
}) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`${height} rounded-xl p-6 animate-pulse`}
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Header */}
        <div
          className="h-4 rounded w-3/4 mb-4 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        {/* Content lines */}
        {[1, 2, 3].map((j) => (
          <div
            key={j}
            className={`h-3 rounded mb-3 animate-pulse ${
              j === 1 ? "w-full" : j === 2 ? "w-4/5" : "w-3/5"
            }`}
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        ))}
      </div>
    ))}
  </div>
);

/**
 * ProjectCardSkeleton - Skeleton for project cards
 */
export const ProjectCardSkeleton: React.FC<{ count?: number }> = ({
  count = 6,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="rounded-xl p-6 animate-pulse"
        style={{ background: "rgba(255,255,255,0.03)" }}
      >
        {/* Image placeholder */}
        <div
          className="h-40 rounded-lg mb-4 animate-pulse"
          style={{ background: "rgba(255,255,255,0.05)" }}
        />
        {/* Title */}
        <div
          className="h-5 rounded w-3/4 mb-3 animate-pulse"
          style={{ background: "rgba(255,255,255,0.08)" }}
        />
        {/* Description lines */}
        {[1, 2].map((j) => (
          <div
            key={j}
            className="h-3 rounded mb-2 animate-pulse"
            style={{
              background: "rgba(255,255,255,0.05)",
              width: j === 1 ? "100%" : "80%",
            }}
          />
        ))}
        {/* Tags */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((j) => (
            <div
              key={j}
              className="h-6 rounded px-3 animate-pulse"
              style={{
                width: `${40 + (j % 2) * 20}px`,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

/**
 * TextSkeleton - Generic text skeleton
 */
export const TextSkeleton: React.FC<{
  lines?: number;
  width?: string;
  height?: string;
}> = ({ lines = 3, width = "w-full", height = "h-4" }) => (
  <div className="space-y-2">
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className={`${height} rounded animate-pulse ${
          i === lines - 1 ? "w-3/4" : width
        }`}
        style={{ background: "rgba(255,255,255,0.05)" }}
      />
    ))}
  </div>
);
