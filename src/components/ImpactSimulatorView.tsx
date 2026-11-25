import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Cpu,
  Factory,
  Layers,
  Play,
  RotateCcw,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { OtAsset } from '../data/governanceData';
import { ChangeActionType } from '../data/impactTopologyData';
import { useI18n } from '../i18n/I18nContext';
import {
  getLocalizedChangeActions,
  getLocalizedSimulation,
  localizeAsset,
} from '../i18n/dataTranslations';
import { getLocalizedProcedureMap } from '../i18n/procedureLocaleHelper';
import { GraphExpandableFrame } from './GraphExpandableFrame';

interface ImpactSimulatorViewProps {
  assets: OtAsset[];
  isDark: boolean;
  onOpenProcedure: (code: string) => void;
}

const RELATION_LABELS: Record<string, { colorLight: string; colorDark: string }> = {
  energia: { colorLight: '#dc2626', colorDark: '#f87171' },
  controle: { colorLight: '#d97706', colorDark: '#fbbf24' },
  rede: { colorLight: '#2563eb', colorDark: '#38bdf8' },
  dados: { colorLight: '#059669', colorDark: '#34d399' },
  engenharia: { colorLight: '#7c3aed', colorDark: '#a78bfa' },
};

export const ImpactSimulatorView: React.FC<ImpactSimulatorViewProps> = ({
  assets,
  isDark,
  onOpenProcedure,
}) => {
  const { locale, t, trEnum } = useI18n();
  const [selectedAssetTag, setSelectedAssetTag] = useState<string>('CLP-PROC-101');
  const [selectedAction, setSelectedAction] = useState<ChangeActionType>('logica');
  const [waveStage, setWaveStage] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const localizedAssets = useMemo(
    () => assets.map((a) => localizeAsset(a, locale)),
    [assets, locale]
  );

  const actionOptions = useMemo(() => getLocalizedChangeActions(locale), [locale]);
  const procMap = useMemo(() => getLocalizedProcedureMap(locale), [locale]);

  const selectedAsset = useMemo(
    () => localizedAssets.find((a) => a.tag === selectedAssetTag) || localizedAssets[0],
    [localizedAssets, selectedAssetTag]
  );

  const result = useMemo(
    () => getLocalizedSimulation(selectedAssetTag, selectedAction, locale),
    [selectedAssetTag, selectedAction, locale]
  );

  const runWaveAnimation = () => {
    setWaveStage(0);
    setIsSimulating(true);
  };

  useEffect(() => {
    if (!isSimulating) return;
    if (waveStage >= 3) {
      setIsSimulating(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setWaveStage((s) => s + 1);
    }, 750);
    return () => window.clearTimeout(timer);
  }, [isSimulating, waveStage]);

  const handleAssetChange = (tag: string) => {
    setSelectedAssetTag(tag);
    setWaveStage(0);
    setIsSimulating(true);
  };

  const handleActionChange = (act: ChangeActionType) => {
    setSelectedAction(act);
    setWaveStage(0);
    setIsSimulating(true);
  };

  // Layout coordinates for the dynamic 4-column Impact Propagation Topology SVG
  const hop1Nodes = result.impactedAssets.filter((a) => a.hop === 1);
  const hop2Nodes = result.impactedAssets.filter((a) => a.hop === 2);
  const maxRows = Math.max(
    hop1Nodes.length,
    hop2Nodes.length,
    result.impactedPlants.length,
    result.impactedSystems.length,
    2
  );
  const svgHeight = Math.max(360, maxRows * 78 + 80);
  const centerY = svgHeight / 2;

  const getY = (idx: number, total: number) => {
    if (total <= 1) return centerY;
    const usable = svgHeight - 96;
    const step = usable / (total - 1);
    return 56 + idx * step;
  };

  const hop1Pos = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    hop1Nodes.forEach((n, idx) => {
      map[n.tag] = { x: 350, y: getY(idx, hop1Nodes.length) };
    });
    return map;
  }, [hop1Nodes, svgHeight]);

  const hop2Pos = useMemo(() => {
    const map: Record<string, { x: number; y: number }> = {};
    hop2Nodes.forEach((n, idx) => {
      map[n.tag] = { x: 640, y: getY(idx, hop2Nodes.length) };
    });
    return map;
  }, [hop2Nodes, svgHeight]);

  return (
    <div className="space-y-5">
      {/* Header & Asset / Change Action Controls */}
      <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {t.simulator.title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.simulator.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={runWaveAnimation}
              className="inline-flex items-center gap-1.5 bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Play className="h-3.5 w-3.5" />
              {t.simulator.simulateBtn}
            </button>
            <button
              type="button"
              onClick={() => {
                setWaveStage(3);
                setIsSimulating(false);
              }}
              className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              title={t.simulator.fullViewTitle}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              {t.simulator.fullViewBtn}
            </button>
          </div>
        </div>

        {/* Selectors */}
        <div className="mt-4 grid grid-cols-1 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.simulator.step1Label}
            </label>
            <select
              value={selectedAssetTag}
              onChange={(e) => handleAssetChange(e.target.value)}
              className="mt-1.5 w-full border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {localizedAssets.map((ast) => (
                <option key={ast.tag} value={ast.tag}>
                  {ast.tag} — {ast.name} ({trEnum(ast.assetClass)})
                </option>
              ))}
            </select>
            {selectedAsset && (
              <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                {t.simulator.zoneLabel}{' '}
                <strong className="text-slate-700 dark:text-slate-300">{selectedAsset.siteZone}</strong> · {t.simulator.criticalityLabel}{' '}
                <strong className="text-slate-700 dark:text-slate-300">{trEnum(selectedAsset.criticality)}</strong> · {t.simulator.ownerShort} {selectedAsset.owner}
              </p>
            )}
          </div>

          <div className="lg:col-span-7">
            <label className="block font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.simulator.step2Label}
            </label>
            <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {actionOptions.map((opt) => {
                const active = opt.id === selectedAction;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleActionChange(opt.id)}
                    className={`border px-2.5 py-2 text-left text-xs font-semibold transition-colors ${
                      active
                        ? 'border-blue-600 bg-blue-600 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {opt.shortLabel}
                  </button>
                );
              })}
            </div>
            <p className="mt-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              {result.action.description}
            </p>
          </div>
        </div>
      </div>

      {/* Blast Radius KPI Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t.simulator.kpiAssetsTitle}</span>
            <Cpu className="h-4 w-4 text-blue-600 dark:text-sky-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {result.impactedAssets.length}
            </span>
            <span className="font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
              {hop1Nodes.length} {t.simulator.kpiAssetsDirect} · {hop2Nodes.length} {t.simulator.kpiAssetsCascade}
            </span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t.simulator.kpiPlantsTitle}</span>
            <Factory className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {result.impactedPlants.length}
            </span>
            <span className="font-mono text-xs text-red-700 dark:text-red-400">
              {result.impactedPlants.filter((p) => p.impactRole === 'Parada Total').length} {t.simulator.kpiPlantsStop}
            </span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t.simulator.kpiSystemsTitle}</span>
            <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              {result.impactedSystems.length}
            </span>
            <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
              {t.simulator.kpiSystemsSub}
            </span>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{t.simulator.kpiCabTitle}</span>
            <ShieldAlert className="h-4 w-4 text-red-600 dark:text-red-400" />
          </div>
          <div className="mt-1.5 flex items-baseline gap-2">
            <span
              className={`font-display text-xl font-bold ${
                result.cabRequired
                  ? 'text-red-700 dark:text-red-400'
                  : 'text-emerald-700 dark:text-emerald-400'
              }`}
            >
              {result.cabRequired ? t.simulator.kpiCabRequired : t.simulator.kpiCabWaived}
            </span>
          </div>
          <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
            {result.priorityWindow}
          </p>
        </div>
      </div>

      {/* Animated Propagation Topology SVG (Maximizable) */}
      <GraphExpandableFrame
        title={`${t.simulator.graphTitlePrefix} ${selectedAssetTag}`}
        subtitle={`${result.action.label} · ${result.impactedAssets.length} ${t.simulator.affectedAssetsWord} · ${result.impactedPlants.length} ${t.simulator.plantsWord} · ${result.impactedSystems.length} ${t.simulator.systemsWord}`}
        headerLeft={
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
            {Object.entries(RELATION_LABELS).map(([k, v]) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2 w-4"
                  style={{ backgroundColor: isDark ? v.colorDark : v.colorLight }}
                />
                {trEnum(k)}
              </span>
            ))}
            <span className="font-mono text-slate-400">· {t.simulator.stageLabel} T+{waveStage}</span>
          </div>
        }
        fullscreenControls={
          <button
            type="button"
            onClick={runWaveAnimation}
            className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Play className="h-3.5 w-3.5" />
            {t.simulator.simulateBtn}
          </button>
        }
      >
          <svg
            viewBox={`0 0 1120 ${svgHeight}`}
            className="h-auto min-w-[820px] w-full select-none"
            role="img"
            aria-label={`${t.simulator.graphTitlePrefix} ${selectedAssetTag}`}
          >
            <defs>
              <pattern id="sim-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle
                  cx="1.5"
                  cy="1.5"
                  r="1"
                  fill={isDark ? '#334155' : '#cbd5e1'}
                  opacity="0.65"
                />
              </pattern>
            </defs>

            <rect x="0" y="0" width="1120" height={svgHeight} fill="url(#sim-grid)" />

            {/* Column Headings */}
            <text x="108" y="24" textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono" fill={isDark ? '#38bdf8' : '#1d4ed8'}>
              {t.simulator.colOrigin}
            </text>
            <text x="350" y="24" textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono" fill={isDark ? '#94a3b8' : '#64748b'}>
              {t.simulator.colDirect} ({hop1Nodes.length})
            </text>
            <text x="640" y="24" textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono" fill={isDark ? '#94a3b8' : '#64748b'}>
              {t.simulator.colCascade} ({hop2Nodes.length})
            </text>
            <text x="955" y="24" textAnchor="middle" fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono" fill={isDark ? '#f87171' : '#dc2626'}>
              {t.simulator.colPlants} ({result.impactedPlants.length})
            </text>

            {/* Edges Origin -> Hop 1 */}
            {waveStage >= 1 &&
              hop1Nodes.map((node) => {
                const pos = hop1Pos[node.tag];
                const rel = RELATION_LABELS[node.viaRelation];
                const stroke = isDark ? rel.colorDark : rel.colorLight;
                const d = `M 196 ${centerY} C 245 ${centerY}, 240 ${pos.y}, 264 ${pos.y}`;
                return (
                  <g key={`e1-${node.tag}`}>
                    <path d={d} fill="none" stroke={stroke} strokeWidth="2.2" strokeDasharray="6 3" />
                    <circle r="4.5" fill={stroke}>
                      <animateMotion dur="1.5s" repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}

            {/* Edges Hop 1 -> Hop 2 */}
            {waveStage >= 2 &&
              hop2Nodes.map((node) => {
                const fromPos = hop1Pos[node.parentTag];
                const toPos = hop2Pos[node.tag];
                if (!fromPos || !toPos) return null;
                const rel = RELATION_LABELS[node.viaRelation];
                const stroke = isDark ? rel.colorDark : rel.colorLight;
                const d = `M ${fromPos.x + 86} ${fromPos.y} C ${fromPos.x + 145} ${fromPos.y}, ${toPos.x - 145} ${toPos.y}, ${toPos.x - 86} ${toPos.y}`;
                return (
                  <g key={`e2-${node.tag}`}>
                    <path d={d} fill="none" stroke={stroke} strokeWidth="2" strokeDasharray="5 3" />
                    <circle r="4" fill={stroke}>
                      <animateMotion dur="1.7s" repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}

            {/* Edges Affected Assets -> Impacted Plants */}
            {waveStage >= 3 &&
              result.impactedPlants.map((plant, idx) => {
                const py = getY(idx, result.impactedPlants.length);
                const srcPos =
                  plant.triggeredBy === selectedAssetTag
                    ? { x: 110, y: centerY }
                    : hop2Pos[plant.triggeredBy] || hop1Pos[plant.triggeredBy] || { x: 110, y: centerY };
                const startX = srcPos.x + 86;
                const stroke =
                  plant.impactRole === 'Parada Total'
                    ? isDark
                      ? '#f87171'
                      : '#dc2626'
                    : isDark
                    ? '#fbbf24'
                    : '#d97706';
                const d = `M ${startX} ${srcPos.y} C ${startX + 90} ${srcPos.y}, 770 ${py}, 842 ${py}`;
                return (
                  <g key={`ep-${plant.id}`}>
                    <path d={d} fill="none" stroke={stroke} strokeWidth="2" opacity="0.85" />
                    <circle r="4" fill={stroke}>
                      <animateMotion dur="1.8s" repeatCount="indefinite" path={d} />
                    </circle>
                  </g>
                );
              })}

            {/* Origin Asset Node */}
            <g transform={`translate(22, ${centerY - 34})`}>
              <rect
                x="-4"
                y="-4"
                width="182"
                height="76"
                rx="4"
                fill="none"
                stroke={isDark ? '#38bdf8' : '#2563eb'}
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <rect
                width="174"
                height="68"
                rx="3"
                fill={isDark ? '#0f172a' : '#ffffff'}
                stroke={isDark ? '#38bdf8' : '#2563eb'}
                strokeWidth="2"
              />
              <rect width="174" height="5" fill={isDark ? '#38bdf8' : '#2563eb'} />
              <text x="10" y="23" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono" fill={isDark ? '#38bdf8' : '#1d4ed8'}>
                {selectedAssetTag}
              </text>
              <text x="10" y="40" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans" fill={isDark ? '#ffffff' : '#0f172a'}>
                {selectedAsset ? trEnum(selectedAsset.assetClass) : t.simulator.otAssetFallback}
              </text>
              <text x="10" y="56" fontSize="9.5" fontFamily="Public Sans" fill={isDark ? '#94a3b8' : '#64748b'}>
                {result.action.shortLabel}
              </text>
            </g>

            {/* Hop 1 Direct Impacted Nodes */}
            {hop1Nodes.map((node) => {
              const pos = hop1Pos[node.tag];
              const visible = waveStage >= 1;
              const rel = RELATION_LABELS[node.viaRelation];
              const accent = isDark ? rel.colorDark : rel.colorLight;
              const assetObj = localizedAssets.find((a) => a.tag === node.tag);
              return (
                <g
                  key={node.tag}
                  transform={`translate(${pos.x - 86}, ${pos.y - 28})`}
                  opacity={visible ? 1 : 0.2}
                  className="cursor-pointer"
                  onClick={() => handleAssetChange(node.tag)}
                >
                  <rect
                    width="172"
                    height="56"
                    rx="3"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={visible ? accent : isDark ? '#334155' : '#cbd5e1'}
                    strokeWidth={visible ? 1.8 : 1}
                  />
                  <rect width="172" height="4" fill={accent} />
                  <text x="10" y="21" fontSize="10.5" fontWeight="700" fontFamily="IBM Plex Mono" fill={accent}>
                    {node.tag}
                  </text>
                  <text x="162" y="21" textAnchor="end" fontSize="9" fontFamily="IBM Plex Mono" fill={isDark ? '#94a3b8' : '#64748b'}>
                    {trEnum(node.viaRelation)}
                  </text>
                  <text x="10" y="38" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans" fill={isDark ? '#f1f5f9' : '#0f172a'}>
                    {assetObj ? trEnum(assetObj.assetClass) : t.simulator.otAssetFallback}
                  </text>
                  <text x="10" y="50" fontSize="9" fontFamily="Public Sans" fill={isDark ? '#94a3b8' : '#64748b'}>
                    {t.simulator.clickToSimulate}
                  </text>
                </g>
              );
            })}

            {/* Hop 2 Cascading Nodes */}
            {hop2Nodes.map((node) => {
              const pos = hop2Pos[node.tag];
              const visible = waveStage >= 2;
              const rel = RELATION_LABELS[node.viaRelation];
              const accent = isDark ? rel.colorDark : rel.colorLight;
              const assetObj = localizedAssets.find((a) => a.tag === node.tag);
              return (
                <g
                  key={node.tag}
                  transform={`translate(${pos.x - 86}, ${pos.y - 28})`}
                  opacity={visible ? 1 : 0.2}
                  className="cursor-pointer"
                  onClick={() => handleAssetChange(node.tag)}
                >
                  <rect
                    width="172"
                    height="56"
                    rx="3"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={visible ? accent : isDark ? '#334155' : '#cbd5e1'}
                    strokeWidth={visible ? 1.6 : 1}
                  />
                  <rect width="172" height="4" fill={accent} />
                  <text x="10" y="21" fontSize="10.5" fontWeight="700" fontFamily="IBM Plex Mono" fill={accent}>
                    {node.tag}
                  </text>
                  <text x="162" y="21" textAnchor="end" fontSize="9" fontFamily="IBM Plex Mono" fill={isDark ? '#94a3b8' : '#64748b'}>
                    {t.simulator.cascadeTag}
                  </text>
                  <text x="10" y="38" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans" fill={isDark ? '#f1f5f9' : '#0f172a'}>
                    {assetObj ? trEnum(assetObj.assetClass) : t.simulator.otAssetFallback}
                  </text>
                  <text x="10" y="50" fontSize="9" fontFamily="Public Sans" fill={isDark ? '#94a3b8' : '#64748b'}>
                    {t.simulator.viaLabel} {node.parentTag}
                  </text>
                </g>
              );
            })}

            {/* Impacted Plants Column */}
            {result.impactedPlants.map((plant, idx) => {
              const y = getY(idx, result.impactedPlants.length);
              const visible = waveStage >= 3;
              const isStop = plant.impactRole === 'Parada Total';
              const strokeColor = isStop
                ? isDark
                  ? '#f87171'
                  : '#dc2626'
                : isDark
                ? '#fbbf24'
                : '#d97706';
              return (
                <g
                  key={plant.id}
                  transform={`translate(846, ${y - 30})`}
                  opacity={visible ? 1 : 0.2}
                >
                  <rect
                    width="248"
                    height="60"
                    rx="3"
                    fill={isDark ? '#0f172a' : '#ffffff'}
                    stroke={visible ? strokeColor : isDark ? '#334155' : '#cbd5e1'}
                    strokeWidth={visible ? 1.8 : 1}
                  />
                  <rect width="248" height="4" fill={strokeColor} />
                  <text x="10" y="21" fontSize="10" fontWeight="700" fontFamily="IBM Plex Mono" fill={strokeColor}>
                    {plant.code} · {trEnum(plant.impactRole).toUpperCase()}
                  </text>
                  <text x="10" y="38" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans" fill={isDark ? '#ffffff' : '#0f172a'}>
                    {plant.name.length > 31 ? `${plant.name.slice(0, 30)}…` : plant.name}
                  </text>
                  <text x="10" y="52" fontSize="9.5" fontFamily="Public Sans" fill={isDark ? '#94a3b8' : '#64748b'}>
                    RTO {plant.rtoHours}h · {t.simulator.originWord} {plant.triggeredBy}
                  </text>
                </g>
              );
            })}
          </svg>
      </GraphExpandableFrame>

      {/* Detailed Impact Breakdown: Plants/Systems + Governance Requirements */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Left: Impacted Assets & Systems Details */}
        <div className="space-y-5 lg:col-span-7">
          <motion.div
            key={`${selectedAssetTag}-${selectedAction}-assets`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.simulator.chainTitle} ({result.impactedAssets.length})
              </h3>
            </div>
            {result.impactedAssets.length === 0 ? (
              <div className="p-5 text-xs text-slate-500 dark:text-slate-400">
                {t.simulator.noPropagation}
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {result.impactedAssets.map((item) => (
                  <div
                    key={item.tag}
                    className="flex items-start justify-between gap-3 px-5 py-3 text-xs"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {item.tag}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="font-mono text-[11px] font-semibold text-blue-700 dark:text-sky-400">
                          {item.hop === 1
                            ? t.simulator.hop1Label
                            : `${t.simulator.hop2Prefix} ${item.parentTag})`}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="font-medium text-slate-600 dark:text-slate-300">
                          {trEnum(item.viaRelation)}
                        </span>
                      </div>
                      <p className="mt-1 text-slate-600 dark:text-slate-400">{item.reason}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAssetChange(item.tag)}
                      className="shrink-0 border border-slate-200 px-2 py-1 font-mono text-[10px] font-semibold text-slate-700 hover:border-blue-500 hover:text-blue-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-400 dark:hover:text-sky-400"
                    >
                      {t.simulator.simulateThis}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.simulator.systemsTitle} ({result.impactedSystems.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {result.impactedSystems.map((sys) => (
                <div key={sys.id} className="px-5 py-3 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      <span className="mr-2 font-mono text-blue-700 dark:text-sky-400">
                        {sys.code}
                      </span>
                      {sys.name}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      {t.simulator.viaLabel} {sys.triggeredBy}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-600 dark:text-slate-400">{sys.impactDetail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Automated IAGS Governance & Compliance Decision Card */}
        <div className="border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wide text-blue-700 dark:text-sky-400">
            <Zap className="h-4 w-4" />
            {t.simulator.verdictHeader}
          </div>

          <div className="mt-3 border border-amber-200 bg-amber-50/70 p-3.5 dark:border-amber-900/70 dark:bg-amber-950/35">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
              <div>
                <div className="text-xs font-bold text-amber-950 dark:text-amber-200">
                  {result.changeClassification}
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-amber-800 dark:text-amber-300">
                  {result.priorityWindow}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.simulator.controlsTitle}
            </h4>
            <ul className="mt-2.5 space-y-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              {result.mandatoryChecklists.map((chk, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{chk}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {t.simulator.triggeredNormsTitle}
            </h4>
            <div className="mt-2.5 space-y-2">
              {result.requiredProcedures.map((code) => {
                const proc = procMap[code];
                if (!proc) return null;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => onOpenProcedure(code)}
                    className="flex w-full items-center justify-between gap-2 border border-slate-200 bg-slate-50/70 px-3 py-2 text-left transition-colors hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-500 dark:hover:bg-slate-800"
                  >
                    <div className="min-w-0">
                      <span className="font-mono text-xs font-semibold text-blue-700 dark:text-sky-400">
                        {proc.code}
                      </span>
                      <span className="ml-2 text-xs font-medium text-slate-900 dark:text-slate-100">
                        {proc.shortTitle}
                      </span>
                    </div>
                    <BookOpen className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
