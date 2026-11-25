import React, { useMemo, useState } from 'react';
import { Lock, RefreshCw, Users } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import {
  getLocalizedContinuitySystems,
  getLocalizedPhysicalPerimeters,
  getLocalizedRolesMatrix,
} from '../i18n/dataTranslations';

interface GovernanceMatrixViewProps {
  onOpenProcedure: (code: string) => void;
}

export const GovernanceMatrixView: React.FC<GovernanceMatrixViewProps> = ({
  onOpenProcedure,
}) => {
  const { locale, t, trEnum } = useI18n();
  const [section, setSection] = useState<'physical' | 'continuity' | 'roles'>('physical');

  const perimeters = useMemo(() => getLocalizedPhysicalPerimeters(locale), [locale]);
  const continuity = useMemo(() => getLocalizedContinuitySystems(locale), [locale]);
  const roles = useMemo(() => getLocalizedRolesMatrix(locale), [locale]);

  return (
    <div className="space-y-5">
      <div className="border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h2 className="font-display text-lg font-semibold text-slate-900 dark:text-white">
            {t.governance.title}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {t.governance.subtitle}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setSection('physical')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              section === 'physical'
                ? 'border-slate-900 bg-slate-900 text-white dark:border-blue-600 dark:bg-blue-600'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            {t.governance.tabPhysical}
          </button>
          <button
            type="button"
            onClick={() => setSection('continuity')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              section === 'continuity'
                ? 'border-slate-900 bg-slate-900 text-white dark:border-blue-600 dark:bg-blue-600'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            {t.governance.tabContinuity}
          </button>
          <button
            type="button"
            onClick={() => setSection('roles')}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              section === 'roles'
                ? 'border-slate-900 bg-slate-900 text-white dark:border-blue-600 dark:bg-blue-600'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            {t.governance.tabRoles}
          </button>
        </div>
      </div>

      {/* SECTION 1: Physical Perimeters */}
      {section === 'physical' && (
        <div className="overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              {t.governance.physicalTitle}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.governance.physicalSub}
            </p>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                <th className="px-4 py-2.5">{t.governance.colPerimeter}</th>
                <th className="px-3 py-2.5">{t.governance.colCriticality}</th>
                <th className="px-3 py-2.5">{t.governance.colNr10}</th>
                <th className="px-3 py-2.5">{t.governance.colControls}</th>
                <th className="px-3 py-2.5 text-right">{t.governance.colAuthorized}</th>
                <th className="px-4 py-2.5 text-right">{t.governance.colStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {perimeters.map((per) => (
                <tr key={per.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {per.areaName}
                  </td>
                  <td className="px-3 py-3 font-mono font-semibold">
                    <span
                      className={
                        per.level === 'ALTA'
                          ? 'text-red-700 dark:text-red-400'
                          : per.level === 'MÉDIA'
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-slate-600 dark:text-slate-400'
                      }
                    >
                      {trEnum(per.level)}
                    </span>
                  </td>
                  <td className="px-3 py-3 font-mono text-slate-700 dark:text-slate-300">
                    {per.nr10Required ? t.governance.mandatory : t.governance.na}
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-400">
                    {per.accessControl}
                  </td>
                  <td className="px-3 py-3 text-right font-mono font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                    {per.authorizedCount}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">
                    <span
                      className={
                        per.status === 'Conforme'
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : 'text-amber-700 dark:text-amber-400'
                      }
                    >
                      {trEnum(per.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 2: Continuity DRP/PCN */}
      {section === 'continuity' && (
        <div className="overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              {t.governance.continuityTitle}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.governance.continuitySub}
            </p>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                <th className="px-4 py-2.5">{t.governance.colCritClass}</th>
                <th className="px-3 py-2.5">{t.governance.colRtoRpo}</th>
                <th className="px-3 py-2.5">{t.governance.colRedundancy}</th>
                <th className="px-3 py-2.5">{t.governance.colLastTest}</th>
                <th className="px-3 py-2.5">{t.governance.colNextDue}</th>
                <th className="px-4 py-2.5 text-right">{t.governance.colTestStatus}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {continuity.map((sys) => (
                <tr key={sys.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {trEnum(sys.assetClass)}
                  </td>
                  <td className="px-3 py-3 font-mono tabular-nums text-slate-800 dark:text-slate-200">
                    RTO {sys.rtoHours}h · RPO {sys.rpoMinutes}m
                  </td>
                  <td className="px-3 py-3 text-slate-600 dark:text-slate-400">
                    {sys.redundancyModel}
                  </td>
                  <td className="px-3 py-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                    {sys.lastTestDate}
                  </td>
                  <td className="px-3 py-3 font-mono tabular-nums text-slate-600 dark:text-slate-400">
                    {sys.nextTestDue}
                  </td>
                  <td className="px-4 py-3 text-right font-mono font-semibold">
                    <span
                      className={
                        sys.testStatus === 'Validado'
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : sys.testStatus === 'Agendado em Parada'
                          ? 'text-blue-700 dark:text-sky-400'
                          : 'text-amber-700 dark:text-amber-400'
                      }
                    >
                      {trEnum(sys.testStatus)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SECTION 3: Roles Matrix */}
      {section === 'roles' && (
        <div className="overflow-x-auto border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-5 py-3.5 dark:border-slate-800">
            <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
              {t.governance.rolesTitle}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {t.governance.rolesSub}
            </p>
          </div>
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400">
                <th className="px-4 py-2.5">{t.governance.colRole}</th>
                <th className="px-3 py-2.5">{t.governance.colGroup}</th>
                <th className="px-3 py-2.5">{t.governance.colCadence}</th>
                <th className="px-3 py-2.5">{t.governance.colResp}</th>
                <th className="px-4 py-2.5">{t.governance.colLinkedNorms}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {roles.map((row) => (
                <tr key={row.role} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                    {row.role}
                  </td>
                  <td className="px-3 py-3 text-slate-700 dark:text-slate-300">
                    {trEnum(row.functionGroup)}
                  </td>
                  <td className="px-3 py-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                    {row.cadence}
                  </td>
                  <td className="px-3 py-3 leading-relaxed text-slate-600 dark:text-slate-300">
                    {row.keyResponsibilities}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1.5">
                      {row.linkedProcedures.map((code) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => onOpenProcedure(code)}
                          className="border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700 hover:border-blue-400 hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-800 dark:text-sky-400 dark:hover:border-sky-500 dark:hover:bg-slate-700"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
