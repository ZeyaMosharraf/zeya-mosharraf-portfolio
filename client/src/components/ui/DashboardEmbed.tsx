import React from "react";

interface DashboardEmbedProps {
  url: string;
  title: string;
  isPowerBI?: boolean; // If true, applies PowerBI-specific URL params and CSS clipping
}

export function DashboardEmbed({ url, title, isPowerBI = true }: DashboardEmbedProps) {
  if (!url) return null;

  // Auto-detect PowerBI from URL
  const isPowerBILink = isPowerBI || url.includes('powerbi');

  const getOptimizedUrl = () => {
    try {
      let rawUrl = url;
      // If user pasted full iframe HTML instead of just the URL, extract the src
      if (rawUrl.includes('<iframe') && rawUrl.includes('src=')) {
        const match = rawUrl.match(/src=["'](.*?)["']/);
        if (match && match[1]) {
          rawUrl = match[1];
        }
      }
      
      const urlObj = new URL(rawUrl);
      if (isPowerBILink) {
        // Strip Microsoft UI Frames (Works on enterprise links)
        urlObj.searchParams.set('navContentPaneEnabled', 'false');
        urlObj.searchParams.set('filterPaneEnabled', 'false');
        // Force Fit-to-Page layout scaling
        urlObj.searchParams.set('pageView', 'fitToPage');
      }
      return urlObj.toString();
    } catch (e) {
      return isPowerBILink 
        ? `${url}${url.includes('?') ? '&' : '?'}navContentPaneEnabled=false&filterPaneEnabled=false&pageView=fitToPage`
        : url;
    }
  };

  return (
    <div
      className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] relative group transition-all duration-500"
      style={{ 
        boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 32px 64px -16px rgba(0,0,0,0.8), 0 0 32px rgba(255,255,255,0.02)",
      }}
    >
      {/* Sleek Glassmorphic Window Chrome */}
      <div 
        className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] relative z-10"
        style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)" }}
      >
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57", boxShadow: "0 0 10px rgba(255,95,87,0.4)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E", boxShadow: "0 0 10px rgba(255,189,46,0.4)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28CA40", boxShadow: "0 0 10px rgba(40,202,64,0.4)" }} />
          </div>
          <span className="text-[10px] font-medium text-gray-500 tracking-widest uppercase">
            {title}
          </span>
        </div>
        
        {/* Subtle decorative element */}
        <div className="flex items-center gap-1.5 opacity-40">
          <div className="w-1 h-1 rounded-full bg-white" />
          <div className="w-1 h-1 rounded-full bg-white" />
          <div className="w-1 h-1 rounded-full bg-white" />
        </div>
      </div>

      <div className="aspect-video w-full relative bg-transparent overflow-hidden">
        <iframe
          title={`${title} Dashboard`}
          src={getOptimizedUrl()}
          frameBorder="0"
          allowFullScreen={true}
          className="absolute top-0 left-0 w-full border-0"
          // Force height > 100% and top-0 so the Power BI bottom bar is physically pushed out of the overflow container
          style={{ 
            height: isPowerBILink ? 'calc(100% + 70px)' : '100%', 
            backgroundColor: 'transparent' 
          }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; unload"
          sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        />
      </div>
    </div>
  );
}
