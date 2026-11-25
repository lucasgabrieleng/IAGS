import React, { useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileText,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  ActionPlanItem,
  ASSET_CLASSES,
  CommitteeMinute,
  OtAsset,
  VulnerabilityItem,
} from '../data/governanceData';
import { ALL_PROCEDURES, GOVERNANCE_DOMAINS } from '../data/procedures';
import { useI18n } from '../i18n/I18nContext';
import {
  getLocalizedDomainMaturity,
  getLocalizedMonthlyOperations,
  getLocalizedVulnSlaChart,
  localizeMinutes,
} from '../i18n/dataTranslations';

interface OverviewViewProps {
  assets: OtAsset[];
  vulnerabilities: VulnerabilityItem[];
  actionPlans: ActionPlanItem[];
  minutes: CommitteeMinute[];
  isDark: boolean;
  onAddMinute: (minute: CommitteeMinute) => void;
  onNavigate: (
    tab: 'overview' | 'studio' | 'simulator' | 'assets' | 'compliance' | 'governance'
  ) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  assets,
  vulnerabilities,
  actionPlans,
  minutes,
  isDark,
  onAddMinute,
  onNavigate,
}) => {
  const { locale, t, trEnum } = useI18n();
  const [showMinuteModal, setShowMinuteModal] = useState(false);
  const [quarter, setQuarter] = useState(t.overview.modalQuarterDefault);
  const [participants, setParticipants] = useState('14');
  const [summary, setSummary] = useState('');
  const [decision, setDecision] = useState('');

  const localizedMinutes = useMemo(() => localizeMinutes(minutes, locale), [minutes, locale]);
  const domainChartData = useMemo(() => getLocalizedDomainMaturity(locale), [locale]);
  const opsChartData = useMemo(() => getLocalizedMonthlyOperations(locale), [locale]);
  const vulnChartData = useMemo(() => getLocalizedVulnSlaChart(locale), [locale]);

  const chartColors = useMemo(
    () => ({
      grid: isDark ? '#1e293b' : '#e2e8f0',
      axis: isDark ? '#334155' : '#cbd5e1',
      tick: isDark ? '#94a3b8' : '#475569',
      tickMuted: isDark ? '#94a3b8' : '#64748b',
      metaLine: isDark ? '#e2e8f0' : '#0f172a',
      tooltipBg: isDark ? '#0f172a' : '#ffffff',
      tooltipBorder: isDark ? '#334155' : '#cbd5e1',
      tooltipText: isDark ? '#f1f5f9' : '#0f172a',
    }),
    [isDark]
  );

  const metrics = useMemo(() => {
    const compliantAssets = assets.filter((a) => a.complianceStatus === 'Conforme').length;
    const complianceRate = assets.length ? Math.round((compliantAssets / assets.length) * 100) : 0;
    const pgaSynced = assets.filter((a) => a.inPga && a.gates.erpAndCmdbSynced).length;
    const openHighVulns = vulnerabilities.filter(
      (v) =>
        (v.severity === 'Crítica' || v.severity === 'Alta') &&
        v.treatmentStep !== 'Mitigado / Concluído'
    ).length;
    const openActions = actionPlans.filter((p) => p.status !== 'Concluído').length;
    const secOpsEscalations = actionPlans.filter(
      (p) => p.escalatedToSecOps && p.status !== 'Concluído'
    ).length;

    return {
      compliantAssets,
      complianceRate,
      pgaSynced,
      openHighVulns,
      openActions,
      secOpsEscalations,
    };
  }, [assets, vulnerabilities, actionPlans]);

  const classBreakdown = useMemo(() => {
    return ASSET_CLASSES.map((cls) => {
      const items = assets.filter((a) => a.assetClass === cls);
      const ok = items.filter((a) => a.complianceStatus === 'Conforme').length;
      const synced = items.filter((a) => a.gates.erpAndCmdbSynced).length;
      const siem = items.filter((a) => a.gates.siemLogsEnabled).length;
      return {
        assetClass: cls,
        total: items.length,
        compliant: ok,
        synced,
        siem,
        pct: items.length ? Math.round((ok / items.length) * 100) : 100,
      };
    });
  }, [assets]);

  const handleSaveMinute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const year = today.slice(0, 4);
    const nextSeq = `${year}/${String(minutes.length + 1).padStart(2, '0')}`;
    const retentionYear = Number(year) + 3;

    onAddMinute({
      id: `ata-${Date.now()}`,
      sequence: nextSeq,
      date: today,
      quarter: quarter.trim() || t.overview.modalQuarterDefault,
      participantsCount: Math.max(1, Number(participants) || 10),
      summary: summary.trim(),
      keyDecisions: decision.trim()
        ? decision
            .split('\n')
            .map((d) => d.trim())
            .filter(Boolean)
        : [t.overview.modalDefaultDecision],
      retentionUntil: `${retentionYear}-${today.slice(5)} ${t.overview.retentionSuffix}`,
    });

    setSummary('');
    setDecision('');
    setShowMinuteModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Executive KPI Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.overview.kpiNormsTitle}</span>
            <FileText className="h-4 w-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {ALL_PROCEDURES.length}
            </span>
            <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400">
              {t.overview.kpiNormsBadge}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {GOVERNANCE_DOMAINS.length} {t.overview.kpiNormsFooter}
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.overview.kpiAssetsTitle}</span>
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-sky-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {metrics.complianceRate}%
            </span>
            <span className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {metrics.compliantAssets}/{assets.length} {t.overview.kpiAssetsCompliant}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {metrics.pgaSynced}/{assets.length} {t.overview.kpiAssetsSynced}
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.overview.kpiVulnsTitle}</span>
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {metrics.openHighVulns}
            </span>
            <span className="font-mono text-xs text-amber-700 dark:text-amber-400">
              {t.overview.kpiVulnsBadge}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {t.overview.kpiVulnsFooter}
          </p>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">{t.overview.kpiActionsTitle}</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-slate-900 tabular-nums dark:text-white">
              {metrics.openActions}
            </span>
            <span className="font-mono text-xs text-red-700 tabular-nums dark:text-red-400">
              {metrics.secOpsEscalations} {t.overview.kpiActionsEscalated}
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {t.overview.kpiActionsFooter}
          </p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.overview.chartDomainTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.chartDomainSub}
              </p>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {t.overview.chartDomainTarget}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={domainChartData}
                margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis
                  dataKey="domain"
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  axisLine={{ stroke: chartColors.axis }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 11, fill: chartColors.tickMuted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 2,
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: chartColors.tick }} />
                <Bar
                  dataKey="conformidade"
                  name={t.overview.chartDomainBar}
                  fill="#3b82f6"
                  barSize={28}
                  radius={[2, 2, 0, 0]}
                />
                <Line
                  type="monotone"
                  dataKey="meta"
                  name={t.overview.chartDomainLine}
                  stroke={chartColors.metaLine}
                  strokeWidth={2}
                  dot={{ r: 3, fill: chartColors.metaLine }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.overview.chartOpsTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.chartOpsSub}
              </p>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              {t.overview.chartOpsWindow}
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={opsChartData}
                margin={{ top: 8, right: 12, left: -16, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  axisLine={{ stroke: chartColors.axis }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: chartColors.tickMuted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 2,
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: chartColors.tick }} />
                <Area
                  type="monotone"
                  dataKey="mudancas"
                  name={t.overview.chartOpsChanges}
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={isDark ? 0.22 : 0.28}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="incidentes"
                  name={t.overview.chartOpsIncidents}
                  stroke="#f59e0b"
                  fill="#f59e0b"
                  fillOpacity={isDark ? 0.2 : 0.25}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="alertasSiem"
                  name={t.overview.chartOpsSiem}
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={isDark ? 0.2 : 0.25}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.overview.chartVulnTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.chartVulnSub}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('compliance')}
              className="text-xs font-semibold text-blue-700 hover:underline dark:text-sky-400"
            >
              {t.overview.chartVulnLink}
            </button>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={vulnChartData}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis
                  dataKey="severidade"
                  tick={{ fontSize: 10.5, fill: chartColors.tick }}
                  axisLine={{ stroke: chartColors.axis }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: chartColors.tickMuted }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 2,
                    backgroundColor: chartColors.tooltipBg,
                    borderColor: chartColors.tooltipBorder,
                    color: chartColors.tooltipText,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, color: chartColors.tick }} />
                <Bar
                  dataKey="remediadas"
                  name={t.overview.chartVulnRemediated}
                  fill="#10b981"
                  barSize={20}
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="abertas"
                  name={t.overview.chartVulnOpen}
                  fill="#f59e0b"
                  barSize={20}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.overview.classTableTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t.overview.classTableSub}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('assets')}
              className="text-xs font-semibold text-blue-700 hover:underline dark:text-sky-400"
            >
              {t.overview.classTableLink}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <th className="py-2 pr-3">{t.overview.colAssetClass}</th>
                  <th className="px-2 py-2 text-right">{t.overview.colTotal}</th>
                  <th className="px-2 py-2 text-right">{t.overview.colErpCmdb}</th>
                  <th className="px-2 py-2 text-right">{t.overview.colSiemLogs}</th>
                  <th className="pl-3 py-2 text-right">{t.overview.colCompliance}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {classBreakdown.map((row) => (
                  <tr key={row.assetClass} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 pr-3 font-medium text-slate-900 dark:text-slate-100">
                      {trEnum(row.assetClass)}
                    </td>
                    <td className="px-2 py-2.5 text-right font-mono tabular-nums text-slate-700 dark:text-slate-300">
                      {row.total}
                    </td>
                    <td className="px-2 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {row.synced}/{row.total}
                    </td>
                    <td className="px-2 py-2.5 text-right font-mono tabular-nums text-slate-600 dark:text-slate-400">
                      {row.siem}/{row.total}
                    </td>
                    <td className="pl-3 py-2.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-slate-100 dark:bg-slate-800">
                          <div
                            className={`h-full ${
                              row.pct === 100
                                ? 'bg-emerald-600 dark:bg-emerald-500'
                                : row.pct >= 50
                                ? 'bg-amber-500'
                                : 'bg-red-600 dark:bg-red-500'
                            }`}
                            style={{ width: `${row.pct}%` }}
                          />
                        </div>
                        <span className="w-9 font-mono font-semibold tabular-nums text-slate-800 dark:text-slate-200">
                          {row.pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quarterly IAGS Committee Minutes */}
      <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              {t.overview.minutesTitle}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.overview.minutesSub}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setQuarter(t.overview.modalQuarterDefault);
              setShowMinuteModal(true);
            }}
            className="inline-flex items-center gap-1.5 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.overview.registerMinute}
          </button>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {localizedMinutes.map((min) => (
            <div key={min.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                    {t.overview.minutePrefix} {min.sequence}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">
                    {min.quarter}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="inline-flex items-center gap-1 font-mono text-slate-500 tabular-nums dark:text-slate-400">
                    <Calendar className="h-3 w-3" />
                    {min.date}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-500 tabular-nums dark:text-slate-400">
                    {min.participantsCount} {t.overview.participantsWord}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {t.overview.retentionPrefix} {min.retentionUntil}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                {min.summary}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-slate-600 dark:text-slate-400">
                {min.keyDecisions.map((dec, idx) => (
                  <li key={idx}>{dec}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Modal: Register New Committee Minute */}
      {showMinuteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.overview.modalTitle}
              </h4>
              <button
                type="button"
                onClick={() => setShowMinuteModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleSaveMinute} className="space-y-4 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.overview.modalQuarter}
                  </label>
                  <input
                    type="text"
                    required
                    value={quarter}
                    onChange={(e) => setQuarter(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.overview.modalParticipants}
                  </label>
                  <input
                    type="number"
                    min={1}
                    required
                    value={participants}
                    onChange={(e) => setParticipants(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.overview.modalSummary}
                </label>
                <textarea
                  rows={3}
                  required
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder={t.overview.modalSummaryPlaceholder}
                  className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.overview.modalDecisions}
                </label>
                <textarea
                  rows={3}
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  placeholder={t.overview.modalDecisionsPlaceholder}
                  className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowMinuteModal(false)}
                  className="border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {t.overview.modalCancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  {t.overview.modalSave}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
