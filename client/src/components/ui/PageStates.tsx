import React from "react";

interface PageLoadingProps {
  label?: string;
}

interface PageNotFoundProps {
  label?: string;
  backLabel?: string;
  onBack?: () => void;
}

/**
 * Full-screen loading spinner shown while data is fetching.
 */
export const PageLoading = ({ label = "Loading..." }: PageLoadingProps) => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d0d" }}>
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full border-2 border-red-600/20 border-t-red-600 animate-spin mb-4" />
      <p className="text-[11px] uppercase tracking-widest text-gray-600">{label}</p>
    </div>
  </div>
);

/**
 * Full-screen "not found" state with an optional back button.
 */
export const PageNotFound = ({
  label = "Page not found.",
  backLabel = "Go Back",
  onBack,
}: PageNotFoundProps) => (
  <div className="min-h-screen flex items-center justify-center" style={{ background: "#0d0d0d" }}>
    <div className="text-center">
      <p className="text-[13px] text-gray-600 mb-4">{label}</p>
      {onBack && (
        <button
          onClick={onBack}
          className="h-9 px-5 rounded-lg text-[12px] font-medium text-white transition-opacity hover:opacity-80"
          style={{ background: "#DC2626" }}
        >
          {backLabel}
        </button>
      )}
    </div>
  </div>
);
