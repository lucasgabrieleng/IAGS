import React, { useMemo, useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Server,
  ShieldAlert,
  Square,
  X,
} from 'lucide-react';
import {
  ASSET_CLASSES,
  AssetClass,
  AssetNature,
  CriticalityLevel,
  LifecyclePhase,
  OtAsset,
  SecurityGates,
} from '../data/governanceData';

import { useI18n } from '../i18n/I18nContext';
import { localizeAsset } from '../i18n/dataTranslations';

interface AssetInventoryViewProps {
  assets: OtAsset[];
  onToggleGate: (assetId: string, gate: keyof SecurityGates) => void;
  onAddAsset: (asset: OtAsset) => void;
}

const LIFECYCLE_PHASES: LifecyclePhase[] = [
  'Demanda',
  'Aquisição',
  'Implementação',
  'Uso',
  'Descontinuação',
];

const GATE_KEYS: { key: keyof SecurityGates; norm: string }[] = [
  { key: 'homologated', norm: 'IAGS-14' },
  { key: 'defaultPasswordsChanged', norm: 'IAGS-02' },
  { key: 'hardeningApplied', norm: 'IAGS-10' },
  { key: 'vulnerabilityScanOk', norm: 'IAGS-10' },
  { key: 'erpAndCmdbSynced', norm: 'IAGS-02' },
  { key: 'siemLogsEnabled', norm: 'IAGS-15' },
];

export const AssetInventoryView: React.FC<AssetInventoryViewProps> = ({
  assets,
  onToggleGate,
  onAddAsset,
}) => {
  const { locale, t, trEnum } = useI18n();
  const [search, setSearch] = useState('');
  const [classFilter, setClassFilter] = useState<'Todos' | AssetClass>('Todos');
  const [phaseFilter, setPhaseFilter] = useState<'Todas' | LifecyclePhase>('Todas');
  const [selectedAssetId, setSelectedAssetId] = useState<string>(assets[0]?.id || '');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newTag, setNewTag] = useState('');
  const [newName, setNewName] = useState('');
  const [newClass, setNewClass] = useState<AssetClass>('CLP / Remotas');
  const [newNature, setNewNature] = useState<AssetNature>('Hardware');
  const [newPhase, setNewPhase] = useState<LifecyclePhase>('Implementação');
  const [newCriticality, setNewCriticality] = useState<CriticalityLevel>('Alta');
  const [newZone, setNewZone] = useState('OT Zone L1 · PLC Room');
  const [newOwner, setNewOwner] = useState('Eng. Marcos Ribeiro');

  const localizedAssets = useMemo(
    () => assets.map((a) => localizeAsset(a, locale)),
    [assets, locale]
  );

  const filteredAssets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return localizedAssets.filter((a) => {
      if (classFilter !== 'Todos' && a.assetClass !== classFilter) return false;
      if (phaseFilter !== 'Todas' && a.phase !== phaseFilter) return false;
      if (!q) return true;
      return [
        a.tag,
        a.name,
        a.assetClass,
        trEnum(a.assetClass),
        a.subclass,
        a.siteZone,
        a.owner,
        a.erpId,
        a.cmdbId,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [localizedAssets, search, classFilter, phaseFilter, trEnum]);

  const selectedAsset = useMemo(
    () =>
      localizedAssets.find((a) => a.id === selectedAssetId) ||
      filteredAssets[0] ||
      localizedAssets[0],
    [localizedAssets, selectedAssetId, filteredAssets]
  );

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim() || !newName.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const id = `ast-${Date.now()}`;
    const created: OtAsset = {
      id,
      tag: newTag.trim().toUpperCase(),
      name: newName.trim(),
      assetClass: newClass,
      subclass: newClass,
      nature: newNature,
      siteZone: newZone.trim() || 'OT Zone',
      phase: newPhase,
      criticality: newCriticality,
      owner: newOwner.trim() || trEnum('Equipe de Automação'),
      erpId: `EAM-${Math.floor(91000 + Math.random() * 8999)}`,
      cmdbId: `CI-OT-${Math.floor(1000 + Math.random() * 8999)}`,
      inPga: true,
      firmwareOrVersion: 'v1.0 Baseline',
      lastAuditDate: today,
      complianceStatus: 'Ação Pendente',
      gates: {
        homologated: true,
        defaultPasswordsChanged: false,
        hardeningApplied: false,
        vulnerabilityScanOk: false,
        erpAndCmdbSynced: true,
        siemLogsEnabled: false,
      },
    };
    onAddAsset(created);
    setSelectedAssetId(id);
    setNewTag('');
    setNewName('');
    setShowAddModal(false);
  };

  const countPassedGates = (g: SecurityGates) => Object.values(g).filter(Boolean).length;

  return (
    <div className="space-y-5">
      {/* Header & Controls */}
      <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {t.assets.title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.assets.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.assets.addBtn}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.assets.searchPlaceholder}
              className="w-64 border border-slate-300 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </div>

          <select
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value as 'Todos' | AssetClass)}
            className="border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="Todos">{t.assets.allClasses}</option>
            {ASSET_CLASSES.map((c) => (
              <option key={c} value={c}>
                {trEnum(c)}
              </option>
            ))}
          </select>

          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value as 'Todas' | LifecyclePhase)}
            className="border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-700 focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="Todas">{t.assets.allPhases}</option>
            {LIFECYCLE_PHASES.map((ph) => (
              <option key={ph} value={ph}>
                {trEnum(ph)}
              </option>
            ))}
          </select>

          <span className="ml-auto font-mono text-xs text-slate-500 tabular-nums dark:text-slate-400">
            {t.assets.showingCount} {filteredAssets.length} {t.assets.ofWord} {assets.length}{' '}
            {t.assets.assetsWord}
          </span>
        </div>
      </div>

      {/* Main Split: Assets Table + Selected Asset Security Gate Inspector */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 xl:col-span-8">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                <th className="px-3.5 py-2.5">{t.assets.colTagAsset}</th>
                <th className="px-3 py-2.5">{t.assets.colClass}</th>
                <th className="px-3 py-2.5">{t.assets.colPhase}</th>
                <th className="px-3 py-2.5">{t.assets.colErpCmdb}</th>
                <th className="px-3 py-2.5 text-center">{t.assets.colGates}</th>
                <th className="px-3 py-2.5 text-right">{t.assets.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAssets.map((asset) => {
                const isSelected = selectedAsset?.id === asset.id;
                const passed = countPassedGates(asset.gates);
                return (
                  <tr
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-blue-50/70 dark:bg-blue-950/40'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <td className="px-3.5 py-3">
                      <div className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                        {asset.tag}
                      </div>
                      <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                        {asset.name}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                      <div className="font-medium">{trEnum(asset.assetClass)}</div>
                      <div className="text-[11px] text-slate-400">
                        {asset.nature} · {t.assets.critShort} {trEnum(asset.criticality)}
                      </div>
                    </td>
                    <td className="px-3 py-3 font-medium text-slate-700 dark:text-slate-300">
                      {trEnum(asset.phase)}
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                      <div>{asset.erpId}</div>
                      <div className="text-slate-400">{asset.cmdbId}</div>
                    </td>
                    <td className="px-3 py-3 text-center font-mono font-semibold tabular-nums text-slate-800 dark:text-slate-200">
                      {passed}/6
                    </td>
                    <td className="px-3 py-3 text-right font-mono text-[11px] font-semibold">
                      <span
                        className={
                          asset.complianceStatus === 'Conforme'
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : asset.complianceStatus === 'Incidente SI'
                            ? 'text-red-700 dark:text-red-400'
                            : 'text-amber-700 dark:text-amber-400'
                        }
                      >
                        {trEnum(asset.complianceStatus)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Right Security Gates Inspector */}
        {selectedAsset && (
          <div className="border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 xl:col-span-4">
            <div className="border-b border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-blue-700 dark:text-sky-400">
                  <Server className="h-3.5 w-3.5" />
                  {selectedAsset.tag}
                </span>
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  {selectedAsset.firmwareOrVersion}
                </span>
              </div>
              <h3 className="mt-1 font-display text-sm font-semibold text-slate-900 dark:text-white">
                {selectedAsset.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {selectedAsset.siteZone} · {t.assets.ownerShort} {selectedAsset.owner}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                <span>ERP: {selectedAsset.erpId}</span>
                <span>·</span>
                <span>CMDB: {selectedAsset.cmdbId}</span>
                <span>·</span>
                <span>
                  {locale === 'en' ? 'AMP' : 'PGA'}:{' '}
                  {selectedAsset.inPga ? t.assets.pgaActive : t.assets.pgaPending}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-mono text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {t.assets.checklistTitle}
                </h4>
                <span className="font-mono text-xs font-semibold tabular-nums text-slate-900 dark:text-white">
                  {countPassedGates(selectedAsset.gates)}/6 OK
                </span>
              </div>

              <div className="space-y-2">
                {GATE_KEYS.map((item) => {
                  const checked = selectedAsset.gates[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onToggleGate(selectedAsset.id, item.key)}
                      className={`flex w-full items-start justify-between gap-3 border p-2.5 text-left transition-colors ${
                        checked
                          ? 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/70 dark:bg-emerald-950/30'
                          : 'border-amber-200 bg-amber-50/40 hover:bg-amber-50 dark:border-amber-900/70 dark:bg-amber-950/30 dark:hover:bg-amber-950/50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {checked ? (
                          <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-400" />
                        ) : (
                          <Square className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        )}
                        <span className="text-xs font-medium text-slate-900 dark:text-slate-100">
                          {t.assets.gates[item.key]}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                        {item.norm}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedAsset.complianceStatus !== 'Conforme' && (
                <div className="mt-4 flex items-start gap-2 border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-950 dark:border-amber-900/70 dark:bg-amber-950/40 dark:text-amber-200">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-700 dark:text-amber-400" />
                  <span>{t.assets.pendingAlert}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.assets.modalTitle}
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateAsset} className="space-y-3.5 p-5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldTag}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder={t.assets.fieldTagPlaceholder}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldClass}
                  </label>
                  <select
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value as AssetClass)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {ASSET_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {trEnum(c)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.assets.fieldDesc}
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={t.assets.fieldDescPlaceholder}
                  className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldNature}
                  </label>
                  <select
                    value={newNature}
                    onChange={(e) => setNewNature(e.target.value as AssetNature)}
                    className="mt-1 w-full border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldPhase}
                  </label>
                  <select
                    value={newPhase}
                    onChange={(e) => setNewPhase(e.target.value as LifecyclePhase)}
                    className="mt-1 w-full border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {LIFECYCLE_PHASES.map((ph) => (
                      <option key={ph} value={ph}>
                        {trEnum(ph)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldCriticality}
                  </label>
                  <select
                    value={newCriticality}
                    onChange={(e) => setNewCriticality(e.target.value as CriticalityLevel)}
                    className="mt-1 w-full border border-slate-300 bg-white px-2.5 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    <option value="Alta">{trEnum('Alta')}</option>
                    <option value="Média">{trEnum('Média')}</option>
                    <option value="Baixa">{trEnum('Baixa')}</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldZone}
                  </label>
                  <input
                    type="text"
                    value={newZone}
                    onChange={(e) => setNewZone(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.assets.fieldOwner}
                  </label>
                  <input
                    type="text"
                    value={newOwner}
                    onChange={(e) => setNewOwner(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {t.assets.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  {t.assets.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
