import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  ClipboardCheck,
  Download,
  Globe,
  LayoutDashboard,
  Menu,
  Moon,
  Search,
  Server,
  SlidersHorizontal,
  Sun,
  Workflow,
  X,
} from 'lucide-react';
import {
  ActionPlanItem,
  CommitteeMinute,
  INITIAL_ACTION_PLANS,
  INITIAL_ASSETS,
  INITIAL_AUDITS,
  INITIAL_MINUTES,
  INITIAL_VULNERABILITIES,
  OtAsset,
  SecurityGates,
  VulnerabilityItem,
} from './data/governanceData';
import { IagsLogo } from './components/IagsLogo';
import { OverviewView } from './components/OverviewView';
import { InteractionStudioView } from './components/InteractionStudioView';
import { ImpactSimulatorView } from './components/ImpactSimulatorView';
import { AssetInventoryView } from './components/AssetInventoryView';
import { ComplianceAuditView } from './components/ComplianceAuditView';
import { GovernanceMatrixView } from './components/GovernanceMatrixView';
import { ProcedureDetailView } from './components/ProcedureDetailView';
import { useI18n } from './i18n/I18nContext';
import { LOCALE_OPTIONS } from './i18n/uiStrings';
import { getLocalizedDomainMap } from './i18n/dataTranslations';
import {
  getLocalizedProcedureMap,
  getLocalizedProcedures,
  localizedAllProceduresToMarkdown,
} from './i18n/procedureLocaleHelper';

type TabId =
  | 'overview'
  | 'studio'
  | 'simulator'
  | 'assets'
  | 'compliance'
  | 'governance'
  | 'procedure';

type ThemeMode = 'light' | 'dark';

const NAV_ICONS: Record<
  Exclude<TabId, 'procedure'>,
  React.ComponentType<{ className?: string }>
> = {
  overview: LayoutDashboard,
  studio: Workflow,
  simulator: Activity,
  assets: Server,
  compliance: ClipboardCheck,
  governance: SlidersHorizontal,
};

const NAV_ORDER: Exclude<TabId, 'procedure'>[] = [
  'overview',
  'studio',
  'simulator',
  'assets',
  'compliance',
  'governance',
];

const PATCH_SEQUENCE: VulnerabilityItem['treatmentStep'][] = [
  'Homologação Fabricante',
  'Teste Off-line',
  'Aplicação Stand-by',
  'Produção (RDM)',
  'Mitigado / Concluído',
];

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem('iags-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) return 'dark';
  } catch {
    // ignore storage errors
  }
  return 'light';
}

export default function App() {
  const { locale, setLocale, t } = useI18n();
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProcedureCode, setSelectedProcedureCode] = useState<string>('IAGS-01');
  const [sidebarProcFilter, setSidebarProcFilter] = useState<string>('');

  const [assets, setAssets] = useState<OtAsset[]>(INITIAL_ASSETS);
  const [vulnerabilities, setVulnerabilities] = useState<VulnerabilityItem[]>(
    INITIAL_VULNERABILITIES
  );
  const [actionPlans, setActionPlans] = useState<ActionPlanItem[]>(INITIAL_ACTION_PLANS);
  const [minutes, setMinutes] = useState<CommitteeMinute[]>(INITIAL_MINUTES);

  const isDark = theme === 'dark';

  const localizedProcedures = useMemo(() => getLocalizedProcedures(locale), [locale]);
  const localizedProcMap = useMemo(() => getLocalizedProcedureMap(locale), [locale]);
  const localizedDomainMap = useMemo(() => getLocalizedDomainMap(locale), [locale]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('iags-theme', theme);
    } catch {
      // ignore storage errors
    }
  }, [isDark, theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleOpenProcedure = (code: string) => {
    setSelectedProcedureCode(code);
    setActiveTab('procedure');
    setMobileMenuOpen(false);
  };

  const handleExportAllProcedures = () => {
    const blob = new Blob([localizedAllProceduresToMarkdown(locale)], {
      type: 'text/markdown;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = t.markdown.compendiumFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleToggleAssetGate = (assetId: string, gate: keyof SecurityGates) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        const nextGates: SecurityGates = {
          ...asset.gates,
          [gate]: !asset.gates[gate],
        };
        const allOk = Object.values(nextGates).every(Boolean);
        return {
          ...asset,
          gates: nextGates,
          inPga: nextGates.erpAndCmdbSynced ? true : asset.inPga,
          complianceStatus: allOk
            ? 'Conforme'
            : asset.complianceStatus === 'Incidente SI'
            ? 'Incidente SI'
            : 'Ação Pendente',
        };
      })
    );
  };

  const handleAddAsset = (asset: OtAsset) => {
    setAssets((prev) => [asset, ...prev]);
  };

  const handleAdvanceVulnerability = (vulnId: string) => {
    setVulnerabilities((prev) =>
      prev.map((v) => {
        if (v.id !== vulnId) return v;
        const idx = PATCH_SEQUENCE.indexOf(v.treatmentStep);
        const nextStep =
          idx >= 0 && idx < PATCH_SEQUENCE.length - 1
            ? PATCH_SEQUENCE[idx + 1]
            : 'Mitigado / Concluído';
        return {
          ...v,
          treatmentStep: nextStep,
          rdmRef:
            nextStep === 'Produção (RDM)' && !v.rdmRef
              ? `RDM-2026-0${Math.floor(460 + Math.random() * 35)}`
              : v.rdmRef,
        };
      })
    );
  };

  const handleUpdateActionStatus = (id: string, status: ActionPlanItem['status']) => {
    setActionPlans((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const handleAddActionPlan = (plan: ActionPlanItem) => {
    setActionPlans((prev) => [plan, ...prev]);
  };

  const handleAddMinute = (minute: CommitteeMinute) => {
    setMinutes((prev) => [minute, ...prev]);
  };

  const filteredSidebarProcedures = localizedProcedures.filter((p) => {
    const q = sidebarProcFilter.trim().toLowerCase();
    if (!q) return true;
    return `${p.code} ${p.shortTitle} ${p.title}`.toLowerCase().includes(q);
  });

  const activeProcedure = localizedProcMap[selectedProcedureCode] || localizedProcedures[0];

  const headerTitle =
    activeTab === 'procedure'
      ? `${activeProcedure.code} — ${activeProcedure.shortTitle}`
      : t.nav[activeTab].label;

  const renderSidebarNavigation = (isMobile = false) => (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="px-2 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
        {t.sidebar.studioSection}
      </div>
      <div className="space-y-0.5">
        {NAV_ORDER.map((navId) => {
          const Icon = NAV_ICONS[navId];
          const active = activeTab === navId;
          const navMeta = t.nav[navId];
          return (
            <button
              key={navId}
              type="button"
              onClick={() => {
                setActiveTab(navId);
                if (isMobile) setMobileMenuOpen(false);
              }}
              className={`flex w-full items-start gap-2.5 px-2.5 py-2 text-left transition-colors ${
                active
                  ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
              }`}
            >
              <Icon
                className={`mt-0.5 h-4 w-4 shrink-0 ${
                  active ? 'text-sky-300 dark:text-sky-100' : 'text-slate-400 dark:text-slate-500'
                }`}
              />
              <div className="min-w-0">
                <div className="text-xs font-semibold leading-tight">{navMeta.label}</div>
                <div
                  className={`mt-0.5 text-[10.5px] leading-tight ${
                    active ? 'text-slate-300 dark:text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {navMeta.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Individual Menus for All 15 Procedures */}
      <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            {t.sidebar.proceduresSection} ({localizedProcedures.length})
          </span>
          <button
            type="button"
            onClick={handleExportAllProcedures}
            title={t.sidebar.exportAllTitle}
            className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold text-blue-700 hover:underline dark:text-sky-400"
          >
            <Download className="h-3 w-3" />
            .md
          </button>
        </div>

        <div className="relative mb-2 px-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={sidebarProcFilter}
            onChange={(e) => setSidebarProcFilter(e.target.value)}
            placeholder={t.sidebar.filterPlaceholder}
            className="w-full border border-slate-200 bg-slate-50 py-1 pl-7 pr-2 text-[11px] text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>

        <div className="space-y-0.5">
          {filteredSidebarProcedures.map((proc) => {
            const active = activeTab === 'procedure' && selectedProcedureCode === proc.code;
            const dom = localizedDomainMap[proc.domain];
            return (
              <button
                key={proc.code}
                type="button"
                onClick={() => handleOpenProcedure(proc.code)}
                className={`flex w-full items-center gap-2 px-2.5 py-1.5 text-left transition-colors ${
                  active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/70'
                }`}
              >
                <span
                  className="h-2 w-2 shrink-0"
                  style={{ backgroundColor: active ? '#ffffff' : dom.accentHex }}
                />
                <span
                  className={`shrink-0 font-mono text-[10.5px] font-semibold ${
                    active ? 'text-sky-100' : 'text-blue-700 dark:text-sky-400'
                  }`}
                >
                  {proc.code}
                </span>
                <span className="truncate text-[11.5px] font-medium">{proc.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      {/* Desktop Left Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col border-r border-slate-200 bg-white transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900 lg:flex">
        <div className="border-b border-slate-200 px-2.5 py-2.5 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            aria-label={t.backToDashboardAria}
            className="block w-full rounded-md text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
          >
            <IagsLogo variant="full" />
          </button>
        </div>

        {renderSidebarNavigation(false)}

        <div className="border-t border-slate-200 px-4 py-3 text-[10.5px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
          <p className="font-mono leading-snug">{t.sidebar.standardsFooter}</p>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex w-72 flex-col bg-white shadow-xl dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-200 p-3 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('overview');
                  setMobileMenuOpen(false);
                }}
                aria-label={t.backToDashboardAria}
                className="flex-1 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <IagsLogo variant="full" />
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label={t.closeNavAria}
                className="shrink-0 self-start border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            {renderSidebarNavigation(true)}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur transition-colors duration-200 dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="border border-slate-200 p-1.5 text-slate-700 dark:border-slate-700 dark:text-slate-200 lg:hidden"
                aria-label={t.openNavAria}
              >
                <Menu className="h-4 w-4" />
              </button>
              <IagsLogo variant="mark" size="md" className="lg:hidden" />
              <div className="min-w-0">
                <h1 className="truncate font-display text-base font-bold text-slate-900 dark:text-white">
                  {headerTitle}
                </h1>
                <p className="hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
                  {t.appSubtitle}
                </p>
              </div>
            </div>

            {/* Utility Controls: Language Switcher (PT | EN | ES) + Dark / Light Toggle */}
            <div className="flex shrink-0 items-center gap-2">
              <div
                className="inline-flex items-center border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                role="group"
                aria-label={t.languageLabel}
              >
                <span className="hidden items-center px-2 text-slate-400 dark:text-slate-500 sm:inline-flex">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                {LOCALE_OPTIONS.map((opt) => {
                  const selected = locale === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setLocale(opt.id)}
                      aria-pressed={selected}
                      title={opt.label}
                      className={`px-2 py-1.5 font-mono text-[11px] font-semibold transition-colors ${
                        selected
                          ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white'
                      }`}
                    >
                      {opt.code}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? t.switchToLightAria : t.switchToDarkAria}
                title={isDark ? t.themeLight : t.themeDark}
                className="inline-flex items-center gap-1.5 border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                {isDark ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">{t.themeLight}</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-slate-600" />
                    <span className="hidden sm:inline">{t.themeDark}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6">
          {activeTab === 'overview' && (
            <OverviewView
              assets={assets}
              vulnerabilities={vulnerabilities}
              actionPlans={actionPlans}
              minutes={minutes}
              isDark={isDark}
              onAddMinute={handleAddMinute}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'studio' && (
            <InteractionStudioView
              isDark={isDark}
              onOpenProcedure={handleOpenProcedure}
            />
          )}

          {activeTab === 'simulator' && (
            <ImpactSimulatorView
              assets={assets}
              isDark={isDark}
              onOpenProcedure={handleOpenProcedure}
            />
          )}

          {activeTab === 'procedure' && (
            <ProcedureDetailView
              procedure={activeProcedure}
              isDark={isDark}
              onNavigateToProcedure={handleOpenProcedure}
            />
          )}

          {activeTab === 'assets' && (
            <AssetInventoryView
              assets={assets}
              onToggleGate={handleToggleAssetGate}
              onAddAsset={handleAddAsset}
            />
          )}

          {activeTab === 'compliance' && (
            <ComplianceAuditView
              audits={INITIAL_AUDITS}
              vulnerabilities={vulnerabilities}
              actionPlans={actionPlans}
              onAdvanceVulnerability={handleAdvanceVulnerability}
              onUpdateActionStatus={handleUpdateActionStatus}
              onAddActionPlan={handleAddActionPlan}
            />
          )}

          {activeTab === 'governance' && (
            <GovernanceMatrixView onOpenProcedure={handleOpenProcedure} />
          )}
        </main>
      </div>
    </div>
  );
}
