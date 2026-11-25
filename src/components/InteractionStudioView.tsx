import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  GitBranch,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Workflow,
} from 'lucide-react';
import { ProcedureInteraction } from '../data/procedures';
import { useI18n } from '../i18n/I18nContext';
import {
  getLocalizedDomainMap,
  getLocalizedDomains,
  getLocalizedInteractions,
  getLocalizedScenarios,
} from '../i18n/dataTranslations';
import {
  getLocalizedProcedureMap,
  getLocalizedProcedures,
} from '../i18n/procedureLocaleHelper';
import { GraphExpandableFrame } from './GraphExpandableFrame';

interface InteractionStudioViewProps {
  isDark: boolean;
  onOpenProcedure: (procedureCode: string) => void;
}

interface NodePos {
  x: number;
  y: number;
}

const NODE_WIDTH = 164;
const NODE_HEIGHT = 64;

const NODE_POSITIONS: Record<string, NodePos> = {
  // Camada 1: Governança Estratégica
  'IAGS-01': { x: 600, y: 60 },

  // Camada 2: Núcleo de Ativos e Porta de Entrada de Serviços
  'IAGS-02': { x: 220, y: 186 },
  'IAGS-06': { x: 600, y: 186 },
  'IAGS-05': { x: 980, y: 186 },

  // Camada 3: Entrega Operacional, Mudanças e Acesso Lógico
  'IAGS-14': { x: 140, y: 344 },
  'IAGS-03': { x: 370, y: 344 },
  'IAGS-04': { x: 600, y: 344 },
  'IAGS-07': { x: 830, y: 344 },
  'IAGS-08': { x: 1060, y: 344 },

  // Camada 4: Cibersegurança, SOC, Resiliência, Física e PAM
  'IAGS-10': { x: 105, y: 522 },
  'IAGS-15': { x: 303, y: 522 },
  'IAGS-11': { x: 501, y: 522 },
  'IAGS-13': { x: 699, y: 522 },
  'IAGS-12': { x: 897, y: 522 },
  'IAGS-09': { x: 1095, y: 522 },
};

function computeCurvePath(fromCode: string, toCode: string, indexOffset = 0): string {
  const p1 = NODE_POSITIONS[fromCode];
  const p2 = NODE_POSITIONS[toCode];
  if (!p1 || !p2) return '';

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dist = Math.hypot(dx, dy) || 1;

  const halfW = NODE_WIDTH / 2 + 4;
  const halfH = NODE_HEIGHT / 2 + 4;

  const scale1 = Math.min(
    Math.abs(dx) > 0.01 ? halfW / Math.abs(dx) : Infinity,
    Math.abs(dy) > 0.01 ? halfH / Math.abs(dy) : Infinity
  );
  const startX = p1.x + dx * scale1;
  const startY = p1.y + dy * scale1;

  const scale2 = Math.min(
    Math.abs(dx) > 0.01 ? halfW / Math.abs(dx) : Infinity,
    Math.abs(dy) > 0.01 ? halfH / Math.abs(dy) : Infinity
  );
  const endX = p2.x - dx * scale2;
  const endY = p2.y - dy * scale2;

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  const nx = -dy / dist;
  const ny = dx / dist;
  const sameRow = Math.abs(dy) < 10;
  const curveMag = sameRow ? (dx > 0 ? -42 : 42) : 26 + indexOffset * 14;

  const ctrlX = midX + nx * curveMag;
  const ctrlY = midY + ny * curveMag;

  return `M ${startX.toFixed(1)} ${startY.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${endX.toFixed(1)} ${endY.toFixed(1)}`;
}

export const InteractionStudioView: React.FC<InteractionStudioViewProps> = ({
  isDark,
  onOpenProcedure,
}) => {
  const { locale, t, trEnum } = useI18n();
  const procedures = useMemo(() => getLocalizedProcedures(locale), [locale]);
  const procMap = useMemo(() => getLocalizedProcedureMap(locale), [locale]);
  const domains = useMemo(() => getLocalizedDomains(locale), [locale]);
  const domainMap = useMemo(() => getLocalizedDomainMap(locale), [locale]);
  const interactions = useMemo(() => getLocalizedInteractions(locale), [locale]);
  const scenarios = useMemo(() => getLocalizedScenarios(locale), [locale]);

  const [mode, setMode] = useState<'explore' | 'simulate'>('simulate');
  const [selectedNode, setSelectedNode] = useState<string>('IAGS-03');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scn-cyber-siem');
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [domainHighlight, setDomainHighlight] = useState<string>('all');

  const interactionColors: Record<ProcedureInteraction['type'], string> = useMemo(
    () => ({
      governanca: isDark ? '#94a3b8' : '#334155',
      operacional: isDark ? '#60a5fa' : '#2563eb',
      seguranca: isDark ? '#34d399' : '#059669',
      mudanca: isDark ? '#fbbf24' : '#d97706',
      dados: isDark ? '#38bdf8' : '#0284c7',
    }),
    [isDark]
  );

  const activeScenario = useMemo(
    () => scenarios.find((s) => s.id === selectedScenarioId) || scenarios[0],
    [scenarios, selectedScenarioId]
  );

  const currentStep = activeScenario.steps[activeStepIdx] || activeScenario.steps[0];

  useEffect(() => {
    if (mode !== 'simulate' || !isPlaying) return;
    const timer = window.setInterval(() => {
      setActiveStepIdx((prev) => (prev + 1) % activeScenario.steps.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, [mode, isPlaying, activeScenario.steps.length]);

  const handleSelectScenario = (id: string) => {
    setSelectedScenarioId(id);
    setActiveStepIdx(0);
    setMode('simulate');
    setIsPlaying(true);
  };

  const selectedProc = procMap[selectedNode] || procedures[0];

  const incomingEdges = useMemo(
    () => interactions.filter((e) => e.to === selectedNode),
    [interactions, selectedNode]
  );
  const outgoingEdges = useMemo(
    () => interactions.filter((e) => e.from === selectedNode),
    [interactions, selectedNode]
  );

  const activeEdgeIds = useMemo(() => {
    if (mode === 'explore') {
      return new Set(
        interactions
          .filter((e) => e.from === selectedNode || e.to === selectedNode)
          .map((e) => e.id)
      );
    }
    const ids = new Set<string>();
    interactions.forEach((e) => {
      if (e.from === currentStep.from && e.to === currentStep.to) {
        ids.add(e.id);
      }
    });
    return ids;
  }, [interactions, mode, selectedNode, currentStep]);

  const completedStepPairs = useMemo(() => {
    if (mode !== 'simulate') return new Set<string>();
    const pairs = new Set<string>();
    for (let i = 0; i < activeStepIdx; i++) {
      const st = activeScenario.steps[i];
      pairs.add(`${st.from}->${st.to}`);
    }
    return pairs;
  }, [mode, activeStepIdx, activeScenario]);

  const customSimStepPath = useMemo(() => {
    if (mode !== 'simulate') return null;
    const exists = interactions.some(
      (e) => e.from === currentStep.from && e.to === currentStep.to
    );
    if (exists) return null;
    return computeCurvePath(currentStep.from, currentStep.to, 1);
  }, [interactions, mode, currentStep]);

  const svgTheme = useMemo(
    () => ({
      gridDot: isDark ? '#334155' : '#cbd5e1',
      layerLine: isDark ? '#1e293b' : '#e2e8f0',
      layerLabel: isDark ? '#64748b' : '#64748b',
      mutedEdge: isDark ? '#334155' : '#cbd5e1',
      completedEdge: isDark ? '#1d4ed8' : '#93c5fd',
      nodeFill: isDark ? '#0f172a' : '#ffffff',
      nodeBorder: isDark ? '#334155' : '#cbd5e1',
      nodeTitle: isDark ? '#f1f5f9' : '#0f172a',
      nodeSub: isDark ? '#94a3b8' : '#64748b',
      simBlue: isDark ? '#38bdf8' : '#2563eb',
      simBluePulse: isDark ? '#38bdf8' : '#1d4ed8',
      simGreen: isDark ? '#34d399' : '#059669',
      simGreenText: isDark ? '#34d399' : '#047857',
      simBlueText: isDark ? '#38bdf8' : '#1d4ed8',
    }),
    [isDark]
  );

  return (
    <div className="space-y-5">
      {/* Top Mode & Scenario Control Bar */}
      <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {t.studio.title}
            </h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {t.studio.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setMode('simulate')}
              className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-semibold transition-colors ${
                mode === 'simulate'
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Workflow className="h-3.5 w-3.5" />
              {t.studio.modeSimulate}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('explore');
                setIsPlaying(false);
              }}
              className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-semibold transition-colors ${
                mode === 'explore'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-sky-500 dark:bg-sky-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <GitBranch className="h-3.5 w-3.5" />
              {t.studio.modeExplore}
            </button>
          </div>
        </div>

        {/* Scenario Selector Strip (Simulation Mode) or Domain Filter (Explore Mode) */}
        {mode === 'simulate' ? (
          <div className="mt-4 grid grid-cols-1 gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:grid-cols-2 xl:grid-cols-5">
            {scenarios.map((scn) => {
              const selected = scn.id === activeScenario.id;
              return (
                <button
                  key={scn.id}
                  type="button"
                  onClick={() => handleSelectScenario(scn.id)}
                  className={`border p-2.5 text-left transition-colors ${
                    selected
                      ? 'border-blue-600 bg-blue-50/70 dark:border-sky-500 dark:bg-blue-950/40'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-slate-700 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span
                      className={`font-mono font-semibold uppercase ${
                        scn.severity === 'Crítica'
                          ? 'text-red-700 dark:text-red-400'
                          : scn.severity === 'Alta'
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-sky-700 dark:text-sky-400'
                      }`}
                    >
                      {trEnum(scn.severity)}
                    </span>
                    <span className="font-mono text-slate-400 tabular-nums">
                      {scn.steps.length} {t.studio.stepsWord}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {scn.title}
                  </p>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {t.studio.highlightDomain}
            </span>
            <button
              type="button"
              onClick={() => setDomainHighlight('all')}
              className={`border px-2.5 py-1 text-xs font-medium transition-colors ${
                domainHighlight === 'all'
                  ? 'border-slate-900 bg-slate-900 text-white dark:border-blue-600 dark:bg-blue-600'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {t.studio.allCount}
            </button>
            {domains.map((dom) => (
              <button
                key={dom.id}
                type="button"
                onClick={() => setDomainHighlight(dom.id)}
                className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-medium transition-colors ${
                  domainHighlight === dom.id
                    ? 'border-slate-900 bg-slate-900 text-white dark:border-blue-600 dark:bg-blue-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <span
                  className="inline-block h-2 w-2"
                  style={{ backgroundColor: dom.accentHex }}
                />
                {dom.shortLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Split Workspace: Interactive SVG Canvas + Live Inspector / Playback Panel */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        {/* Left: Animated SVG Architecture Canvas (Maximizable) */}
        <div className="xl:col-span-8">
          <GraphExpandableFrame
            title={t.studio.graphTitle}
            subtitle={
              mode === 'simulate'
                ? `${t.studio.simPrefix} ${activeScenario.title} — ${t.studio.stepLabel} ${activeStepIdx + 1}/${activeScenario.steps.length}: ${currentStep.title}`
                : `${t.studio.explorePrefix} ${selectedProc.code} — ${selectedProc.title}`
            }
            headerLeft={
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-4 bg-slate-700 dark:bg-slate-400" /> {t.studio.legendGov}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-4 bg-blue-600 dark:bg-blue-400" /> {t.studio.legendOps}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-4 bg-emerald-600 dark:bg-emerald-400" /> {t.studio.legendSec}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-4 bg-amber-600 dark:bg-amber-400" /> {t.studio.legendChange}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-block h-2 w-4 bg-sky-600 dark:bg-sky-400" /> {t.studio.legendData}
                </span>
              </div>
            }
            fullscreenControls={
              mode === 'simulate' ? (
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {isPlaying ? t.studio.pause : t.studio.play}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIdx((prev) =>
                        prev === 0 ? activeScenario.steps.length - 1 : prev - 1
                      );
                    }}
                    className="border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={t.studio.prevStep}
                  >
                    <SkipBack className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIdx((prev) => (prev + 1) % activeScenario.steps.length);
                    }}
                    className="border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={t.studio.nextStep}
                  >
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : undefined
            }
            fullscreenFooter={
              mode === 'simulate' ? (
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-700 dark:text-sky-400">
                      {currentStep.from} → {currentStep.to}
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {currentStep.title}:
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">{currentStep.action}</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    {currentStep.slaNote}
                  </span>
                </div>
              ) : undefined
            }
          >
            <svg
              viewBox="0 0 1200 595"
              className="h-auto min-w-[780px] w-full select-none"
              role="img"
              aria-label={t.studio.graphTitle}
            >
              <defs>
                <pattern
                  id="iags-grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="1.5" cy="1.5" r="1" fill={svgTheme.gridDot} opacity="0.65" />
                </pattern>

                <marker
                  id="arrow-muted"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="5.5"
                  markerHeight="5.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill={svgTheme.mutedEdge} />
                </marker>
                <marker
                  id="arrow-active-blue"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={svgTheme.simBlue} />
                </marker>
                <marker
                  id="arrow-active-emerald"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={interactionColors.seguranca} />
                </marker>
                <marker
                  id="arrow-active-amber"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={interactionColors.mudanca} />
                </marker>
                <marker
                  id="arrow-active-slate"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={interactionColors.governanca} />
                </marker>
                <marker
                  id="arrow-active-sky"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6.5"
                  markerHeight="6.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={interactionColors.dados} />
                </marker>
              </defs>

              <rect x="0" y="0" width="1200" height="595" fill="url(#iags-grid)" />

              <line x1="20" y1="120" x2="1180" y2="120" stroke={svgTheme.layerLine} strokeDasharray="4 4" />
              <line x1="20" y1="262" x2="1180" y2="262" stroke={svgTheme.layerLine} strokeDasharray="4 4" />
              <line x1="20" y1="432" x2="1180" y2="432" stroke={svgTheme.layerLine} strokeDasharray="4 4" />

              <text x="24" y="28" fill={svgTheme.layerLabel} fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono">
                {t.studio.layer1}
              </text>
              <text x="24" y="140" fill={svgTheme.layerLabel} fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono">
                {t.studio.layer2}
              </text>
              <text x="24" y="282" fill={svgTheme.layerLabel} fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono">
                {t.studio.layer3}
              </text>
              <text x="24" y="452" fill={svgTheme.layerLabel} fontSize="10" fontWeight="600" fontFamily="IBM Plex Mono">
                {t.studio.layer4}
              </text>

              {/* Edges Layer */}
              {interactions.map((edge) => {
                const pathD = computeCurvePath(edge.from, edge.to);
                const isActive = activeEdgeIds.has(edge.id);
                const isCompletedInSim = completedStepPairs.has(`${edge.from}->${edge.to}`);
                const color = interactionColors[edge.type];
                const markerId =
                  edge.type === 'seguranca'
                    ? 'url(#arrow-active-emerald)'
                    : edge.type === 'mudanca'
                    ? 'url(#arrow-active-amber)'
                    : edge.type === 'governanca'
                    ? 'url(#arrow-active-slate)'
                    : edge.type === 'dados'
                    ? 'url(#arrow-active-sky)'
                    : 'url(#arrow-active-blue)';

                const strokeColor = isActive
                  ? mode === 'simulate'
                    ? svgTheme.simBlue
                    : color
                  : isCompletedInSim
                  ? svgTheme.completedEdge
                  : svgTheme.mutedEdge;

                const strokeWidth = isActive ? 2.6 : isCompletedInSim ? 1.9 : 1.1;
                const opacity = isActive ? 1 : isCompletedInSim ? 0.85 : mode === 'simulate' ? 0.25 : 0.35;

                return (
                  <g key={edge.id}>
                    <path
                      id={`path-${edge.id}`}
                      d={pathD}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      opacity={opacity}
                      strokeDasharray={isActive && mode === 'simulate' ? '7 4' : undefined}
                      markerEnd={
                        isActive
                          ? mode === 'simulate'
                            ? 'url(#arrow-active-blue)'
                            : markerId
                          : 'url(#arrow-muted)'
                      }
                    />
                    {isActive && (
                      <>
                        <circle
                          r={mode === 'simulate' ? 5 : 4}
                          fill={mode === 'simulate' ? svgTheme.simBluePulse : color}
                        >
                          <animateMotion
                            dur={mode === 'simulate' ? '1.6s' : '2.2s'}
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                        <circle r={mode === 'simulate' ? 3 : 2.5} fill="#ffffff">
                          <animateMotion
                            dur={mode === 'simulate' ? '1.6s' : '2.2s'}
                            begin="0.8s"
                            repeatCount="indefinite"
                            path={pathD}
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}

              {customSimStepPath && (
                <g>
                  <path
                    d={customSimStepPath}
                    fill="none"
                    stroke={svgTheme.simBlue}
                    strokeWidth="2.8"
                    strokeDasharray="7 4"
                    markerEnd="url(#arrow-active-blue)"
                  />
                  <circle r="5.5" fill={svgTheme.simBluePulse}>
                    <animateMotion
                      dur="1.5s"
                      repeatCount="indefinite"
                      path={customSimStepPath}
                    />
                  </circle>
                </g>
              )}

              {/* Nodes Layer (All 15 Procedures) */}
              {procedures.map((proc) => {
                const pos = NODE_POSITIONS[proc.code];
                if (!pos) return null;
                const dom = domainMap[proc.domain];
                const accentForDark =
                  dom.id === 'governanca' && isDark ? '#94a3b8' : dom.accentHex;

                const isSelectedExplore = mode === 'explore' && selectedNode === proc.code;
                const isNeighborExplore =
                  mode === 'explore' &&
                  interactions.some(
                    (e) =>
                      (e.from === selectedNode && e.to === proc.code) ||
                      (e.to === selectedNode && e.from === proc.code)
                  );
                const isSimSource = mode === 'simulate' && currentStep.from === proc.code;
                const isSimTarget = mode === 'simulate' && currentStep.to === proc.code;
                const isSimInvolved =
                  mode === 'simulate' && activeScenario.involvedNodes.includes(proc.code);

                const matchesDomainFilter =
                  mode === 'explore' && domainHighlight !== 'all'
                    ? proc.domain === domainHighlight
                    : true;

                const isHighlighted =
                  mode === 'simulate'
                    ? isSimSource || isSimTarget
                    : isSelectedExplore || isNeighborExplore;

                const nodeOpacity =
                  mode === 'simulate'
                    ? isSimSource || isSimTarget
                      ? 1
                      : isSimInvolved
                      ? 0.88
                      : 0.35
                    : !matchesDomainFilter
                    ? 0.3
                    : isSelectedExplore || isNeighborExplore || domainHighlight !== 'all'
                    ? 1
                    : 0.72;

                const x = pos.x - NODE_WIDTH / 2;
                const y = pos.y - NODE_HEIGHT / 2;

                return (
                  <g
                    key={proc.code}
                    transform={`translate(${x}, ${y})`}
                    opacity={nodeOpacity}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedNode(proc.code);
                      if (mode === 'simulate') {
                        setMode('explore');
                        setIsPlaying(false);
                      }
                    }}
                  >
                    {(isSelectedExplore || isSimSource || isSimTarget) && (
                      <rect
                        x="-4"
                        y="-4"
                        width={NODE_WIDTH + 8}
                        height={NODE_HEIGHT + 8}
                        rx="4"
                        fill="none"
                        stroke={isSimTarget ? svgTheme.simGreen : svgTheme.simBlue}
                        strokeWidth="2"
                        strokeDasharray={isSimSource || isSimTarget ? '5 3' : undefined}
                      />
                    )}

                    <rect
                      x="0"
                      y="0"
                      width={NODE_WIDTH}
                      height={NODE_HEIGHT}
                      rx="3"
                      fill={svgTheme.nodeFill}
                      stroke={
                        isSimTarget
                          ? svgTheme.simGreen
                          : isSimSource || isSelectedExplore
                          ? svgTheme.simBlue
                          : isHighlighted
                          ? accentForDark
                          : svgTheme.nodeBorder
                      }
                      strokeWidth={isSelectedExplore || isSimSource || isSimTarget ? 2 : 1.2}
                    />

                    <rect
                      x="0"
                      y="0"
                      width={NODE_WIDTH}
                      height="4"
                      rx="1"
                      fill={accentForDark}
                    />

                    <text
                      x="10"
                      y="21"
                      fontSize="10.5"
                      fontWeight="600"
                      fontFamily="IBM Plex Mono"
                      fill={
                        isSimTarget
                          ? svgTheme.simGreenText
                          : isSimSource
                          ? svgTheme.simBlueText
                          : accentForDark
                      }
                    >
                      {proc.code}
                    </text>

                    {(isSimSource || isSimTarget) && (
                      <text
                        x={NODE_WIDTH - 10}
                        y="21"
                        textAnchor="end"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="IBM Plex Mono"
                        fill={isSimTarget ? svgTheme.simGreenText : svgTheme.simBlueText}
                      >
                        {isSimSource ? t.studio.originBadge : t.studio.targetBadge}
                      </text>
                    )}

                    <text
                      x="10"
                      y="39"
                      fontSize="11.5"
                      fontWeight="600"
                      fontFamily="Plus Jakarta Sans"
                      fill={svgTheme.nodeTitle}
                    >
                      {proc.shortTitle.length > 22
                        ? `${proc.shortTitle.slice(0, 21)}…`
                        : proc.shortTitle}
                    </text>

                    <text
                      x="10"
                      y="54"
                      fontSize="9.5"
                      fontFamily="Public Sans"
                      fill={svgTheme.nodeSub}
                    >
                      {dom.shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </GraphExpandableFrame>
        </div>

        {/* Right: Dynamic Simulation Controller OR Node Dependency Inspector */}
        <div className="flex flex-col border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 xl:col-span-4">
          {mode === 'simulate' ? (
            <div className="flex h-full flex-col">
              <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-semibold uppercase text-blue-700 dark:text-sky-400">
                    {activeScenario.category}
                  </span>
                  <span className="font-mono text-slate-500 tabular-nums dark:text-slate-400">
                    {t.studio.stepLabel} {activeStepIdx + 1}/{activeScenario.steps.length}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-base font-semibold text-slate-900 dark:text-white">
                  {activeScenario.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {activeScenario.summary}
                </p>

                <div className="mt-3.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((p) => !p)}
                    className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    {isPlaying ? t.studio.pause : t.studio.play}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIdx((prev) =>
                        prev === 0 ? activeScenario.steps.length - 1 : prev - 1
                      );
                    }}
                    className="border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={t.studio.prevStep}
                  >
                    <SkipBack className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveStepIdx((prev) => (prev + 1) % activeScenario.steps.length);
                    }}
                    className="border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={t.studio.nextStep}
                  >
                    <SkipForward className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveStepIdx(0);
                      setIsPlaying(true);
                    }}
                    className="border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    title={t.studio.restart}
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="border-b border-slate-200 bg-blue-50/40 p-4 dark:border-slate-800 dark:bg-blue-950/25">
                <motion.div
                  key={`${activeScenario.id}-${currentStep.stepNumber}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-semibold">
                    <span className="border border-blue-200 bg-white px-1.5 py-0.5 text-blue-700 dark:border-blue-800 dark:bg-slate-900 dark:text-sky-400">
                      {currentStep.from}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    <span className="border border-emerald-200 bg-white px-1.5 py-0.5 text-emerald-700 dark:border-emerald-800 dark:bg-slate-900 dark:text-emerald-400">
                      {currentStep.to}
                    </span>
                  </div>
                  <h4 className="mt-2 font-display text-sm font-semibold text-slate-900 dark:text-white">
                    {currentStep.stepNumber}. {currentStep.title}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                    {currentStep.action}
                  </p>
                  <div className="mt-3 space-y-1 border-t border-blue-100 pt-2.5 text-[11px] dark:border-slate-800">
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-500 dark:text-slate-400">{t.studio.artifactLabel}</span>
                      <span className="text-right font-medium text-slate-900 dark:text-slate-100">
                        {currentStep.artifact}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2">
                      <span className="text-slate-500 dark:text-slate-400">{t.studio.slaLabel}</span>
                      <span className="text-right font-mono font-medium text-blue-800 dark:text-sky-400">
                        {currentStep.slaNote}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="flex-1 divide-y divide-slate-100 overflow-y-auto dark:divide-slate-800">
                {activeScenario.steps.map((st, idx) => {
                  const isCurrent = idx === activeStepIdx;
                  return (
                    <button
                      key={st.stepNumber}
                      type="button"
                      onClick={() => {
                        setActiveStepIdx(idx);
                        setIsPlaying(false);
                      }}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                        isCurrent
                          ? 'bg-slate-50 dark:bg-slate-800/70'
                          : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center font-mono text-[11px] font-semibold ${
                          isCurrent
                            ? 'bg-blue-600 text-white'
                            : idx < activeStepIdx
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {st.stepNumber}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                            {st.title}
                          </span>
                          <span className="shrink-0 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                            {st.from} → {st.to}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-slate-500 dark:text-slate-400">
                          {st.artifact}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between border-t border-slate-200 p-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenProcedure(currentStep.from)}
                  className="text-xs font-medium text-blue-700 hover:underline dark:text-sky-400"
                >
                  {t.studio.readBtn} {currentStep.from}
                </button>
                <button
                  type="button"
                  onClick={() => onOpenProcedure(currentStep.to)}
                  className="inline-flex items-center gap-1.5 border border-slate-200 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 dark:border-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {t.studio.openBtn} {currentStep.to}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col">
              <div className="border-b border-slate-200 p-4 dark:border-slate-800">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                    {selectedProc.code} · {selectedProc.revision}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    {domainMap[selectedProc.domain].shortLabel}
                  </span>
                </div>
                <h3 className="mt-1 font-display text-base font-semibold text-slate-900 dark:text-white">
                  {selectedProc.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {selectedProc.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    {t.studio.cadenceLabel}{' '}
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedProc.cadence}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t.studio.ownerLabel}{' '}
                    <strong className="text-slate-800 dark:text-slate-200">
                      {selectedProc.ownerRole}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                <div>
                  <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.studio.incomingTitle} ({incomingEdges.length})
                  </h4>
                  {incomingEdges.length === 0 ? (
                    <p className="mt-1.5 text-xs text-slate-400">
                      {t.studio.topDirectiveMsg}
                    </p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {incomingEdges.map((edge) => (
                        <button
                          key={edge.id}
                          type="button"
                          onClick={() => setSelectedNode(edge.from)}
                          className="w-full border border-slate-200 bg-slate-50/70 p-2.5 text-left hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-sky-600 dark:hover:bg-slate-800/70"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                              {edge.from} → {edge.to}
                            </span>
                            <span className="text-[11px] font-medium text-blue-700 dark:text-sky-400">
                              {edge.label}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                            {edge.trigger}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {t.studio.outgoingTitle} ({outgoingEdges.length})
                  </h4>
                  {outgoingEdges.length === 0 ? (
                    <p className="mt-1.5 text-xs text-slate-400">
                      {t.studio.noOutgoingMsg}
                    </p>
                  ) : (
                    <div className="mt-2 space-y-2">
                      {outgoingEdges.map((edge) => (
                        <button
                          key={edge.id}
                          type="button"
                          onClick={() => setSelectedNode(edge.to)}
                          className="w-full border border-slate-200 bg-white p-2.5 text-left hover:border-blue-300 hover:bg-blue-50/40 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-emerald-600 dark:hover:bg-slate-800/70"
                        >
                          <div className="flex items-center justify-between gap-2 text-xs">
                            <span className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                              {edge.from} → {edge.to}
                            </span>
                            <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
                              {edge.label}
                            </span>
                          </div>
                          <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                            {edge.trigger}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-200 p-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => onOpenProcedure(selectedProc.code)}
                  className="inline-flex w-full items-center justify-center gap-2 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  {t.studio.openFullNorm} ({selectedProc.code})
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
