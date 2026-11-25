import React, { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Download,
  FileCheck2,
  ShieldCheck,
  UserCheck,
  Users,
} from 'lucide-react';
import { IagsProcedure } from '../data/procedures';
import { useI18n } from '../i18n/I18nContext';
import {
  getLocalizedDomainMap,
  getLocalizedInteractions,
  getLocalizedOwnership,
} from '../i18n/dataTranslations';
import {
  getLocalizedProcedureMap,
  localizedProcedureToMarkdown,
} from '../i18n/procedureLocaleHelper';
import { GraphExpandableFrame } from './GraphExpandableFrame';

interface ProcedureDetailViewProps {
  procedure: IagsProcedure;
  isDark: boolean;
  onNavigateToProcedure: (code: string) => void;
}

export const ProcedureDetailView: React.FC<ProcedureDetailViewProps> = ({
  procedure,
  isDark,
  onNavigateToProcedure,
}) => {
  const { locale, t } = useI18n();
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const domMeta = useMemo(
    () => getLocalizedDomainMap(locale)[procedure.domain],
    [locale, procedure.domain]
  );
  const ownership = useMemo(
    () => getLocalizedOwnership(procedure.code, locale),
    [locale, procedure.code]
  );
  const interactions = useMemo(() => getLocalizedInteractions(locale), [locale]);
  const procMap = useMemo(() => getLocalizedProcedureMap(locale), [locale]);

  const incoming = useMemo(
    () => interactions.filter((e) => e.to === procedure.code),
    [interactions, procedure.code]
  );
  const outgoing = useMemo(
    () => interactions.filter((e) => e.from === procedure.code),
    [interactions, procedure.code]
  );

  React.useEffect(() => {
    setShowFullText(false);
    setCopied(false);
  }, [procedure.code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(localizedProcedureToMarkdown(procedure, locale));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard restriction
    }
  };

  const handleDownload = () => {
    const content = localizedProcedureToMarkdown(procedure, locale);
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${procedure.code}-${procedure.shortTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}-${locale.toUpperCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const miniSvgHeight = Math.max(220, Math.max(incoming.length, outgoing.length, 1) * 58 + 44);
  const centerY = miniSvgHeight / 2;

  return (
    <div className="space-y-5">
      {/* Header, Summary & Highlighted Ownership */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="h-1 w-full" style={{ backgroundColor: domMeta.accentHex }} />
        <div className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-mono font-bold text-blue-700 dark:text-sky-400">
                  {procedure.code}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {procedure.revision}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {domMeta.label}
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="font-mono text-slate-500 dark:text-slate-400">
                  {procedure.cadence}
                </span>
              </div>

              <h2 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
                {procedure.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {procedure.summary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFullText((v) => !v)}
                className={`inline-flex items-center gap-1.5 border px-3.5 py-2 text-xs font-semibold transition-colors ${
                  showFullText
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-sky-500 dark:bg-sky-600'
                    : 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                {showFullText ? t.procedure.collapseFull : t.procedure.readFull}
                {showFullText ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                    {t.procedure.copied}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {t.procedure.copyMd}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <Download className="h-3.5 w-3.5" />
                {t.procedure.downloadMd}
              </button>
            </div>
          </div>

          {/* Highlighted Ownership & Responsibility Banner */}
          {ownership && (
            <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 dark:border-slate-800 md:grid-cols-2 xl:grid-cols-4">
              <div className="border border-blue-200 bg-blue-50/60 p-3.5 dark:border-blue-900/70 dark:bg-blue-950/35">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-blue-700 dark:text-sky-400">
                  <UserCheck className="h-3.5 w-3.5" />
                  {t.procedure.ownerPrimaryTitle}
                </div>
                <div className="mt-1.5 font-display text-sm font-bold text-slate-900 dark:text-white">
                  {ownership.primaryOwner}
                </div>
                <div className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                  {t.procedure.ownerPrimaryDesc}
                </div>
              </div>

              <div className="border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.procedure.approverTitle}
                </div>
                <div className="mt-1.5 text-xs font-semibold leading-snug text-slate-900 dark:text-slate-100">
                  {ownership.approver}
                </div>
              </div>

              <div className="border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <Users className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  {t.procedure.executingTitle}
                </div>
                <ul className="mt-1.5 space-y-0.5 text-xs text-slate-800 dark:text-slate-200">
                  {ownership.executingTeams.map((team, idx) => (
                    <li key={idx} className="font-medium">
                      • {team}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {t.procedure.stakeholdersTitle}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                  {ownership.stakeholders.join(' · ')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Expandable Full Normative Text (opens cleanly right beneath summary when requested) */}
      {showFullText && (
        <div className="space-y-6 border border-blue-200 bg-white p-5 dark:border-blue-900/70 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
            <div>
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-sky-400">
                {t.procedure.fullDocBadge} · {procedure.code}
              </span>
              <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                {procedure.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowFullText(false)}
              className="border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t.procedure.closeFullDoc}
            </button>
          </div>

          {procedure.sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
                <span className="mr-2 font-mono text-blue-700 dark:text-sky-400">
                  {section.number}.
                </span>
                {section.title}
              </h4>

              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {p}
                </p>
              ))}

              {section.bullets && (
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              {section.table && (
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800">
                  <div className="border-b border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
                    {section.table.caption}
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-white text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                        {section.table.headers.map((h, i) => (
                          <th key={i} className="px-3 py-2">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-3 py-2 align-top leading-relaxed ${
                                cIdx === 0
                                  ? 'font-semibold text-slate-900 dark:text-slate-100'
                                  : 'text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section.subsections?.map((sub) => (
                <div key={sub.code} className="space-y-2 pt-2">
                  <h5 className="font-display text-sm font-semibold text-slate-800 dark:text-slate-100">
                    <span className="mr-1.5 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {sub.code}
                    </span>
                    {sub.title}
                  </h5>
                  {sub.paragraphs?.map((p, i) => (
                    <p
                      key={i}
                      className="text-sm leading-relaxed text-slate-700 dark:text-slate-300"
                    >
                      {p}
                    </p>
                  ))}
                  {sub.bullets && (
                    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                      {sub.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {sub.note && (
                    <div className="border border-amber-200 bg-amber-50/70 px-3 py-2 text-xs text-amber-950 dark:border-amber-900/70 dark:bg-amber-950/30 dark:text-amber-200">
                      <strong>{t.procedure.techNote}</strong> {sub.note}
                    </div>
                  )}
                </div>
              ))}

              {section.note && (
                <div className="border border-blue-200 bg-blue-50/60 px-3.5 py-2.5 text-xs leading-relaxed text-blue-950 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-sky-200">
                  <strong>{t.procedure.opsNote}</strong> {section.note}
                </div>
              )}
            </section>
          ))}

          {/* Controlled Records */}
          <section className="space-y-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <h4 className="font-display text-base font-semibold text-slate-900 dark:text-white">
              {t.procedure.controlledRecords}
            </h4>
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                    <th className="px-3 py-2">{t.procedure.recColRecord}</th>
                    <th className="px-3 py-2">{t.procedure.recColId}</th>
                    <th className="px-3 py-2">{t.procedure.recColStorage}</th>
                    <th className="px-3 py-2">{t.procedure.recColAccess}</th>
                    <th className="px-3 py-2">{t.procedure.recColRetention}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {procedure.controlledRecords.map((rec, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-2 font-semibold text-slate-900 dark:text-slate-100">
                        {rec.name}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                        {rec.identification}
                      </td>
                      <td className="px-3 py-2 text-slate-700 dark:text-slate-300">
                        {rec.storage}
                      </td>
                      <td className="px-3 py-2 text-slate-600 dark:text-slate-400">
                        {rec.accessControl}
                      </td>
                      <td className="px-3 py-2 font-mono text-[11px] text-emerald-800 dark:text-emerald-400">
                        {rec.retention}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* Executive Summary Metrics & References */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
            {t.procedure.summaryCardTitle} ({procedure.code})
          </h3>
          <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-800 dark:text-slate-200">
            {procedure.keyMetrics.map((metric, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-sky-400" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>

          {ownership && (
            <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                {t.procedure.artifactsTitle}
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {ownership.mandatoryArtifacts.map((art, i) => (
                  <span
                    key={i}
                    className="border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {art}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
            {t.procedure.referencesTitle}
          </h3>
          <ul className="mt-3 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            {procedure.references.map((ref, idx) => (
              <li key={idx}>{ref}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Maximizable Cross-Procedure Correlations Graph + Clickable Upstream/Downstream Lists */}
      <GraphExpandableFrame
        title={`${t.procedure.corrTitlePrefix} ${procedure.code} — ${procedure.shortTitle}`}
        subtitle={`${incoming.length} ${t.procedure.corrSubIn} · ${outgoing.length} ${t.procedure.corrSubOut} · ${t.procedure.corrSubClick}`}
        headerLeft={
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-4 w-4 text-blue-600 dark:text-sky-400" />
            <span className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              {t.procedure.corrMapHeader} ({incoming.length} {t.procedure.inShort} · {outgoing.length} {t.procedure.outShort})
            </span>
          </div>
        }
      >
        <svg
          viewBox={`0 0 920 ${miniSvgHeight}`}
          className="mx-auto h-auto min-w-[680px] max-w-4xl w-full select-none"
          role="img"
          aria-label={`${t.procedure.corrTitlePrefix} ${procedure.code}`}
        >
          <defs>
            <marker
              id="mini-arrow-in"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={isDark ? '#38bdf8' : '#2563eb'} />
            </marker>
            <marker
              id="mini-arrow-out"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1 L 10 5 L 0 9 z" fill={isDark ? '#34d399' : '#059669'} />
            </marker>
          </defs>

          <text
            x="110"
            y="18"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="IBM Plex Mono"
            fill={isDark ? '#94a3b8' : '#64748b'}
          >
            {t.procedure.svgInputs} ({incoming.length})
          </text>
          <text
            x="460"
            y="18"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="IBM Plex Mono"
            fill={isDark ? '#38bdf8' : '#1d4ed8'}
          >
            {t.procedure.svgFocus}
          </text>
          <text
            x="810"
            y="18"
            textAnchor="middle"
            fontSize="10"
            fontWeight="600"
            fontFamily="IBM Plex Mono"
            fill={isDark ? '#94a3b8' : '#64748b'}
          >
            {t.procedure.svgOutputs} ({outgoing.length})
          </text>

          {incoming.map((edge, idx) => {
            const spacing = (miniSvgHeight - 54) / Math.max(incoming.length, 1);
            const y = 38 + spacing * idx + spacing / 2;
            const srcProc = procMap[edge.from];
            const pathD = `M 212 ${y} C 295 ${y}, 305 ${centerY}, 362 ${centerY}`;
            return (
              <g key={edge.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isDark ? '#38bdf8' : '#2563eb'}
                  strokeWidth="1.8"
                  markerEnd="url(#mini-arrow-in)"
                />
                <circle r="3.5" fill={isDark ? '#38bdf8' : '#2563eb'}>
                  <animateMotion dur="2.1s" repeatCount="indefinite" path={pathD} />
                </circle>
                <g
                  transform={`translate(18, ${y - 21})`}
                  className="cursor-pointer"
                  onClick={() => onNavigateToProcedure(edge.from)}
                >
                  <rect
                    width="190"
                    height="42"
                    rx="3"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={isDark ? '#334155' : '#cbd5e1'}
                    strokeWidth="1.2"
                  />
                  <text
                    x="10"
                    y="16"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="IBM Plex Mono"
                    fill={isDark ? '#38bdf8' : '#2563eb'}
                  >
                    {edge.from}
                  </text>
                  <text
                    x="10"
                    y="32"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans"
                    fill={isDark ? '#f1f5f9' : '#0f172a'}
                  >
                    {srcProc?.shortTitle || edge.from}
                  </text>
                </g>
              </g>
            );
          })}

          {outgoing.map((edge, idx) => {
            const spacing = (miniSvgHeight - 54) / Math.max(outgoing.length, 1);
            const y = 38 + spacing * idx + spacing / 2;
            const tgtProc = procMap[edge.to];
            const pathD = `M 558 ${centerY} C 615 ${centerY}, 625 ${y}, 706 ${y}`;
            return (
              <g key={edge.id}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isDark ? '#34d399' : '#059669'}
                  strokeWidth="1.8"
                  markerEnd="url(#mini-arrow-out)"
                />
                <circle r="3.5" fill={isDark ? '#34d399' : '#059669'}>
                  <animateMotion dur="2.1s" repeatCount="indefinite" path={pathD} />
                </circle>
                <g
                  transform={`translate(712, ${y - 21})`}
                  className="cursor-pointer"
                  onClick={() => onNavigateToProcedure(edge.to)}
                >
                  <rect
                    width="190"
                    height="42"
                    rx="3"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={isDark ? '#334155' : '#cbd5e1'}
                    strokeWidth="1.2"
                  />
                  <text
                    x="10"
                    y="16"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="IBM Plex Mono"
                    fill={isDark ? '#34d399' : '#059669'}
                  >
                    {edge.to}
                  </text>
                  <text
                    x="10"
                    y="32"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans"
                    fill={isDark ? '#f1f5f9' : '#0f172a'}
                  >
                    {tgtProc?.shortTitle || edge.to}
                  </text>
                </g>
              </g>
            );
          })}

          <g transform={`translate(364, ${centerY - 34})`}>
            <rect
              width="192"
              height="68"
              rx="4"
              fill={isDark ? '#0f172a' : '#ffffff'}
              stroke={isDark ? '#38bdf8' : '#2563eb'}
              strokeWidth="2.2"
            />
            <rect width="192" height="5" fill={domMeta.accentHex} />
            <text
              x="96"
              y="24"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fontFamily="IBM Plex Mono"
              fill={isDark ? '#38bdf8' : '#1d4ed8'}
            >
              {procedure.code}
            </text>
            <text
              x="96"
              y="42"
              textAnchor="middle"
              fontSize="12"
              fontWeight="700"
              fontFamily="Plus Jakarta Sans"
              fill={isDark ? '#ffffff' : '#0f172a'}
            >
              {procedure.shortTitle}
            </text>
            <text
              x="96"
              y="57"
              textAnchor="middle"
              fontSize="9.5"
              fontFamily="Public Sans"
              fill={isDark ? '#94a3b8' : '#64748b'}
            >
              {domMeta.shortLabel}
            </text>
          </g>
        </svg>
      </GraphExpandableFrame>

      {/* Detailed Upstream / Downstream Trigger Cards */}
      <div className="grid grid-cols-1 divide-y divide-slate-200 border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-2 md:divide-x md:divide-y-0">
        <div className="p-5">
          <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-blue-700 dark:text-sky-400">
            {t.procedure.receivesFrom} ({incoming.length})
          </h4>
          {incoming.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {t.procedure.topDirectiveInfo}
            </p>
          ) : (
            <div className="mt-3 space-y-2.5">
              {incoming.map((edge) => {
                const source = procMap[edge.from];
                return (
                  <button
                    key={edge.id}
                    type="button"
                    onClick={() => onNavigateToProcedure(edge.from)}
                    className="flex w-full items-start justify-between gap-3 border border-slate-200 bg-slate-50/60 p-3 text-left transition-colors hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-500 dark:hover:bg-slate-800/70"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                          {edge.from}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {source?.shortTitle}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {edge.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {edge.trigger}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="p-5">
          <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            {t.procedure.triggersFeeds} ({outgoing.length})
          </h4>
          {outgoing.length === 0 ? (
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {t.procedure.noDirectOutputs}
            </p>
          ) : (
            <div className="mt-3 space-y-2.5">
              {outgoing.map((edge) => {
                const target = procMap[edge.to];
                return (
                  <button
                    key={edge.id}
                    type="button"
                    onClick={() => onNavigateToProcedure(edge.to)}
                    className="flex w-full items-start justify-between gap-3 border border-slate-200 bg-slate-50/60 p-3 text-left transition-colors hover:border-emerald-400 hover:bg-emerald-50/40 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-emerald-500 dark:hover:bg-slate-800/70"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                          {edge.to}
                        </span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">
                          {target?.shortTitle}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {edge.label}
                        </span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                        {edge.trigger}
                      </p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
