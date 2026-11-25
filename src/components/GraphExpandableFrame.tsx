import React, { useEffect, useState } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface GraphExpandableFrameProps {
  title: string;
  subtitle?: string;
  headerLeft?: React.ReactNode;
  fullscreenControls?: React.ReactNode;
  fullscreenFooter?: React.ReactNode;
  children: React.ReactNode;
  canvasClassName?: string;
}

export const GraphExpandableFrame: React.FC<GraphExpandableFrameProps> = ({
  title,
  subtitle,
  headerLeft,
  fullscreenControls,
  fullscreenFooter,
  children,
  canvasClassName = 'bg-slate-50/70 dark:bg-slate-950/90',
}) => {
  const { t } = useI18n();
  const [isMaximized, setIsMaximized] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    if (!isMaximized) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMaximized(false);
        setZoom(100);
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMaximized]);

  const handleOpen = () => {
    setZoom(100);
    setIsMaximized(true);
  };

  const handleClose = () => {
    setIsMaximized(false);
    setZoom(100);
  };

  if (isMaximized) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-slate-950"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Fullscreen Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="min-w-0">
            <h3 className="truncate font-display text-sm font-bold text-slate-900 dark:text-white">
              {title}
            </h3>
            {subtitle && (
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {fullscreenControls}

            {/* Zoom Controls */}
            <div className="inline-flex items-center border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(75, z - 15))}
                className="px-2 py-1.5 text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-700"
                title={t.graphFrame.zoomOut}
                aria-label={t.graphFrame.zoomOut}
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoom(100)}
                className="border-x border-slate-200 px-2.5 py-1 font-mono text-[11px] font-semibold tabular-nums text-slate-700 hover:bg-slate-200/70 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-700"
                title={t.graphFrame.zoomReset}
              >
                {zoom}%
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(175, z + 15))}
                className="px-2 py-1.5 text-slate-600 hover:bg-slate-200/70 dark:text-slate-300 dark:hover:bg-slate-700"
                title={t.graphFrame.zoomIn}
                aria-label={t.graphFrame.zoomIn}
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              {t.graphFrame.closeFullscreen}
            </button>
          </div>
        </div>

        {/* Fullscreen Scrollable & Zoomable Canvas */}
        <div className={`flex-1 overflow-auto p-6 ${canvasClassName}`}>
          <div
            className="mx-auto flex min-h-full items-center justify-center transition-all duration-150"
            style={{ width: `${zoom}%`, minWidth: zoom > 100 ? `${zoom}%` : '100%' }}
          >
            <div className="w-full">{children}</div>
          </div>
        </div>

        {/* Optional Bottom Status / Legend Bar */}
        {(fullscreenFooter || headerLeft) && (
          <div className="border-t border-slate-200 bg-white px-5 py-2.5 dark:border-slate-800 dark:bg-slate-900">
            {fullscreenFooter || headerLeft}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 px-4 py-2.5 dark:border-slate-800">
        <div className="min-w-0 flex-1">{headerLeft}</div>
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex shrink-0 items-center gap-1.5 border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition-colors hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-400"
          title={t.graphFrame.maximizeTitle}
        >
          <Maximize2 className="h-3.5 w-3.5" />
          {t.graphFrame.maximize}
        </button>
      </div>
      <div className={`relative overflow-x-auto p-3 ${canvasClassName}`}>{children}</div>
    </div>
  );
};
