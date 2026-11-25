import React, { useMemo, useState } from 'react';
import {
  AlertOctagon,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Plus,
  ShieldAlert,
  X,
} from 'lucide-react';
import {
  ActionPlanItem,
  AuditRecord,
  VulnerabilityItem,
} from '../data/governanceData';
import { useI18n } from '../i18n/I18nContext';
import { localizeActionPlans, localizeAudits } from '../i18n/dataTranslations';

interface ComplianceAuditViewProps {
  audits: AuditRecord[];
  vulnerabilities: VulnerabilityItem[];
  actionPlans: ActionPlanItem[];
  onAdvanceVulnerability: (vulnId: string) => void;
  onUpdateActionStatus: (id: string, status: ActionPlanItem['status']) => void;
  onAddActionPlan: (plan: ActionPlanItem) => void;
}

const DEVIATION_OPTIONS: ActionPlanItem['deviationType'][] = [
  'Vulnerabilidade CVE',
  'Hardening Incompleto',
  'Divergência ERP/CMDB',
  'Software Não Licenciado',
  'Senha Padrão Pendente',
  'Desvio Segurança Física',
];

const NORM_CODES = ['IAGS-02', 'IAGS-08', 'IAGS-09', 'IAGS-10', 'IAGS-12', 'IAGS-13'] as const;

export const ComplianceAuditView: React.FC<ComplianceAuditViewProps> = ({
  audits,
  vulnerabilities,
  actionPlans,
  onAdvanceVulnerability,
  onUpdateActionStatus,
  onAddActionPlan,
}) => {
  const { locale, t, trEnum } = useI18n();
  const [subTab, setSubTab] = useState<'gvt' | 'actions' | 'audits'>('gvt');
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [assetTag, setAssetTag] = useState('SCADA-SRV-01');
  const [originProc, setOriginProc] = useState('IAGS-10');
  const [deviationType, setDeviationType] =
    useState<ActionPlanItem['deviationType']>('Vulnerabilidade CVE');
  const [rdmCode, setRdmCode] = useState('RDM-2026-0480');
  const [owner, setOwner] = useState('Eng. Lucas Nogueira');
  const [dueDate, setDueDate] = useState('2026-12-20');
  const [escalate, setEscalate] = useState(false);

  const localizedAudits = useMemo(() => localizeAudits(audits, locale), [audits, locale]);
  const localizedPlans = useMemo(
    () => localizeActionPlans(actionPlans, locale),
    [actionPlans, locale]
  );

  const handleCreateAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddActionPlan({
      id: `pa-${Date.now()}`,
      code: `PA-2026-${String(actionPlans.length + 10).padStart(2, '0')}`,
      title: title.trim(),
      originProcedure: originProc,
      assetTag: assetTag.trim().toUpperCase(),
      deviationType,
      rdmCode: rdmCode.trim().toUpperCase(),
      owner: owner.trim(),
      dueDate,
      priority: escalate ? 'Alta' : 'Média',
      escalatedToSecOps: escalate,
      status: 'Aberto',
    });
    setTitle('');
    setEscalate(false);
    setShowModal(false);
    setSubTab('actions');
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
              {t.compliance.title}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.compliance.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500"
          >
            <Plus className="h-3.5 w-3.5" />
            {t.compliance.newActionBtn}
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSubTab('gvt')}
            className={`border px-3 py-1.5 text-xs font-semibold transition-colors ${
              subTab === 'gvt'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t.compliance.tabGvt} ({vulnerabilities.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('actions')}
            className={`border px-3 py-1.5 text-xs font-semibold transition-colors ${
              subTab === 'actions'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t.compliance.tabActions} ({actionPlans.length})
          </button>
          <button
            type="button"
            onClick={() => setSubTab('audits')}
            className={`border px-3 py-1.5 text-xs font-semibold transition-colors ${
              subTab === 'audits'
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            {t.compliance.tabAudits} ({audits.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Vulnerabilities GVT */}
      {subTab === 'gvt' && (
        <div className="space-y-4">
          <div className="border border-blue-200 bg-blue-50/50 px-4 py-3 text-xs text-blue-950 dark:border-blue-900/70 dark:bg-blue-950/30 dark:text-sky-200">
            <strong>{t.compliance.safeSeqTitle}</strong> {t.compliance.safeSeqBody}{' '}
            <span className="font-mono">{t.compliance.safeSeqExcludedStrong}</span>{' '}
            {t.compliance.safeSeqExcludedRest}
          </div>

          <div className="overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                  <th className="px-4 py-2.5">{t.compliance.colCveAsset}</th>
                  <th className="px-3 py-2.5">{t.compliance.colSeverity}</th>
                  <th className="px-3 py-2.5">{t.compliance.colSla}</th>
                  <th className="px-3 py-2.5">{t.compliance.colTeam}</th>
                  <th className="px-3 py-2.5">{t.compliance.colStage}</th>
                  <th className="px-4 py-2.5 text-right">{t.compliance.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {vulnerabilities.map((v) => {
                  const pct = Math.min(100, Math.round((v.daysOpen / v.slaDays) * 100));
                  const done = v.treatmentStep === 'Mitigado / Concluído';
                  return (
                    <tr key={v.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3">
                        <div className="font-mono font-semibold text-slate-900 dark:text-slate-100">
                          {v.cve}
                        </div>
                        <div className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          {v.assetTag} · {trEnum(v.assetClass)}
                          {v.tdiExcluded && (
                            <span className="ml-1.5 font-mono text-amber-700 dark:text-amber-400">
                              {t.compliance.tdiBadge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono">
                        <span
                          className={`font-semibold ${
                            v.severity === 'Crítica'
                              ? 'text-red-700 dark:text-red-400'
                              : v.severity === 'Alta'
                              ? 'text-amber-700 dark:text-amber-400'
                              : v.severity === 'Média'
                              ? 'text-sky-700 dark:text-sky-400'
                              : 'text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {trEnum(v.severity)}
                        </span>
                        <span className="ml-1.5 text-slate-500 tabular-nums dark:text-slate-400">
                          ({v.cvss.toFixed(1)})
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-20 bg-slate-100 dark:bg-slate-800">
                            <div
                              className={`h-full ${
                                done
                                  ? 'bg-emerald-600 dark:bg-emerald-500'
                                  : pct > 75
                                  ? 'bg-red-600 dark:bg-red-500'
                                  : pct > 50
                                  ? 'bg-amber-500'
                                  : 'bg-blue-600 dark:bg-sky-500'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="font-mono text-[11px] tabular-nums text-slate-600 dark:text-slate-400">
                            {v.daysOpen}d / {v.slaDays}d
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                        {trEnum(v.ownerTeam)}
                      </td>
                      <td className="px-3 py-3">
                        <div
                          className={`font-medium ${
                            done
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-900 dark:text-slate-100'
                          }`}
                        >
                          {trEnum(v.treatmentStep)}
                        </div>
                        {v.rdmRef && (
                          <div className="font-mono text-[10px] text-slate-400">{v.rdmRef}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {done ? (
                          <span className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="h-3.5 w-3.5" /> {t.compliance.doneBadge}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onAdvanceVulnerability(v.id)}
                            className="inline-flex items-center gap-1 border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-800 hover:border-blue-600 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-400"
                          >
                            {t.compliance.advanceBtn}
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Action Plans */}
      {subTab === 'actions' && (
        <div className="divide-y divide-slate-200 border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {localizedPlans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                    {plan.code}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    {plan.originProcedure}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-slate-100">
                    {plan.assetTag}
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {trEnum(plan.deviationType)}
                  </span>
                  {plan.escalatedToSecOps && (
                    <>
                      <span className="text-slate-300 dark:text-slate-700">·</span>
                      <span className="inline-flex items-center gap-1 font-mono font-semibold text-red-700 dark:text-red-400">
                        <AlertOctagon className="h-3.5 w-3.5" />
                        {t.compliance.escalatedBadge}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {plan.title}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>
                    {locale === 'en' ? 'RFC' : 'RDM'}:{' '}
                    <strong className="font-mono text-slate-800 dark:text-slate-200">
                      {plan.rdmCode}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    {t.compliance.ownerShort} {plan.owner}
                  </span>
                  <span>·</span>
                  <span className="font-mono tabular-nums">
                    {t.compliance.dueLabel} {plan.dueDate}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <select
                  value={plan.status}
                  onChange={(e) =>
                    onUpdateActionStatus(plan.id, e.target.value as ActionPlanItem['status'])
                  }
                  className={`border px-2.5 py-1.5 text-xs font-semibold focus:outline-none ${
                    plan.status === 'Concluído'
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : plan.status === 'Em Execução (RDM)'
                      ? 'border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950/60 dark:text-sky-300'
                      : 'border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  <option value="Aberto">{trEnum('Aberto')}</option>
                  <option value="Em Execução (RDM)">{trEnum('Em Execução (RDM)')}</option>
                  <option value="Concluído">{trEnum('Concluído')}</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Periodic Audits */}
      {subTab === 'audits' && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {localizedAudits.map((aud) => (
            <div
              key={aud.id}
              className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-2 text-xs">
                <span className="font-mono font-semibold text-blue-700 dark:text-sky-400">
                  {aud.code}
                </span>
                <span
                  className={`font-mono font-semibold ${
                    aud.status === 'Concluída'
                      ? 'text-emerald-700 dark:text-emerald-400'
                      : aud.status === 'Em Andamento'
                      ? 'text-amber-700 dark:text-amber-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {trEnum(aud.status)}
                </span>
              </div>
              <h4 className="mt-1.5 font-display text-sm font-semibold text-slate-900 dark:text-white">
                {trEnum(aud.type)}
              </h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {aud.scope}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center dark:border-slate-800">
                <div>
                  <div className="font-mono text-base font-bold tabular-nums text-slate-900 dark:text-white">
                    {aud.assetsChecked}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t.compliance.checkedLabel}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold tabular-nums text-amber-700 dark:text-amber-400">
                    {aud.deviationsFound}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t.compliance.deviationsLabel}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-base font-bold tabular-nums text-red-700 dark:text-red-400">
                    {aud.securityIncidents}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    {t.compliance.secIncLabel}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                  <CalendarClock className="h-3.5 w-3.5" />
                  {aud.scheduledDate}
                </span>
                <span className="inline-flex items-center gap-1 font-mono">
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  {aud.procedureRef}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: New Action Plan */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-lg border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
              <h4 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {t.compliance.modalTitle}
              </h4>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateAction} className="space-y-3.5 p-5">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                  {t.compliance.fieldCorrective}
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.compliance.fieldCorrectivePlaceholder}
                  className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs focus:border-blue-600 focus:outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldAsset}
                  </label>
                  <input
                    type="text"
                    required
                    value={assetTag}
                    onChange={(e) => setAssetTag(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldOriginNorm}
                  </label>
                  <select
                    value={originProc}
                    onChange={(e) => setOriginProc(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {NORM_CODES.map((code) => (
                      <option key={code} value={code}>
                        {t.compliance.normOptions[code] ?? code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldDeviation}
                  </label>
                  <select
                    value={deviationType}
                    onChange={(e) =>
                      setDeviationType(e.target.value as ActionPlanItem['deviationType'])
                    }
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  >
                    {DEVIATION_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {trEnum(opt)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldRdm}
                  </label>
                  <input
                    type="text"
                    required
                    value={rdmCode}
                    onChange={(e) => setRdmCode(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldOwner}
                  </label>
                  <input
                    type="text"
                    required
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                    {t.compliance.fieldDue}
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 w-full border border-slate-300 bg-white px-3 py-2 font-mono text-xs dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 border border-red-200 bg-red-50/50 px-3 py-2 text-xs text-red-900 dark:border-red-900/70 dark:bg-red-950/40 dark:text-red-200">
                <input
                  type="checkbox"
                  checked={escalate}
                  onChange={(e) => setEscalate(e.target.checked)}
                />
                <ShieldAlert className="h-3.5 w-3.5 text-red-700 dark:text-red-400" />
                {t.compliance.escalateCheckbox}
              </label>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {t.compliance.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                >
                  {t.compliance.createBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
