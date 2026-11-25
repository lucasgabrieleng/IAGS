import { ALL_PROCEDURES, IagsProcedure } from '../data/procedures';
import { getLocalizedDomainMap } from './dataTranslations';
import { PROCEDURES_EN } from './proceduresEn';
import { PROCEDURES_ES } from './proceduresEs';
import { Locale, UI_STRINGS } from './uiStrings';

export function getLocalizedProcedures(locale: Locale): IagsProcedure[] {
  if (locale === 'pt') return ALL_PROCEDURES;
  const dict = locale === 'en' ? PROCEDURES_EN : PROCEDURES_ES;
  return ALL_PROCEDURES.map((proc) => {
    const localized = dict[proc.code];
    return localized ? { ...proc, ...localized } : proc;
  });
}

export function getLocalizedProcedureMap(locale: Locale): Record<string, IagsProcedure> {
  return getLocalizedProcedures(locale).reduce(
    (acc, proc) => {
      acc[proc.code] = proc;
      return acc;
    },
    {} as Record<string, IagsProcedure>
  );
}

export function localizedProcedureToMarkdown(proc: IagsProcedure, locale: Locale): string {
  const md = UI_STRINGS[locale].markdown;
  const domainMap = getLocalizedDomainMap(locale);
  const lines: string[] = [];

  lines.push(`# ${proc.code} — ${proc.title}`);
  lines.push(
    `**${md.revision}:** ${proc.revision} | **${md.domain}:** ${domainMap[proc.domain].label} | **${md.cadence}:** ${proc.cadence} | **${md.owner}:** ${proc.ownerRole}`
  );
  lines.push('');
  lines.push(`> ${proc.summary}`);
  lines.push('');
  lines.push(`## ${md.references}`);
  proc.references.forEach((ref) => lines.push(`- ${ref}`));
  lines.push('');

  proc.sections.forEach((sec) => {
    lines.push(`## ${sec.number}. ${sec.title}`);
    sec.paragraphs?.forEach((p) => {
      lines.push('');
      lines.push(p);
    });
    if (sec.bullets?.length) {
      lines.push('');
      sec.bullets.forEach((b) => lines.push(`- ${b}`));
    }
    if (sec.table) {
      lines.push('');
      lines.push(`**${sec.table.caption}**`);
      lines.push('');
      lines.push(`| ${sec.table.headers.join(' | ')} |`);
      lines.push(`| ${sec.table.headers.map(() => '---').join(' | ')} |`);
      sec.table.rows.forEach((r) => lines.push(`| ${r.join(' | ')} |`));
    }
    sec.subsections?.forEach((sub) => {
      lines.push('');
      lines.push(`### ${sub.code} ${sub.title}`);
      sub.paragraphs?.forEach((p) => {
        lines.push('');
        lines.push(p);
      });
      if (sub.bullets?.length) {
        lines.push('');
        sub.bullets.forEach((b) => lines.push(`- ${b}`));
      }
      if (sub.table) {
        lines.push('');
        lines.push(`**${sub.table.caption}**`);
        lines.push('');
        lines.push(`| ${sub.table.headers.join(' | ')} |`);
        lines.push(`| ${sub.table.headers.map(() => '---').join(' | ')} |`);
        sub.table.rows.forEach((r) => lines.push(`| ${r.join(' | ')} |`));
      }
      if (sub.note) {
        lines.push('');
        lines.push(`> **${md.note}:** ${sub.note}`);
      }
    });
    if (sec.note) {
      lines.push('');
      lines.push(`> **${md.note}:** ${sec.note}`);
    }
    lines.push('');
  });

  lines.push(`## ${md.controlledRecords}`);
  lines.push('');
  lines.push(`| ${md.recHeaders.join(' | ')} |`);
  lines.push('| --- | --- | --- | --- | --- | --- |');
  proc.controlledRecords.forEach((rec) => {
    lines.push(
      `| ${rec.name} | ${rec.identification} | ${rec.storage} | ${rec.accessControl} | ${rec.retention} | ${rec.disposition} |`
    );
  });

  return lines.join('\n');
}

export function localizedAllProceduresToMarkdown(locale: Locale): string {
  const md = UI_STRINGS[locale].markdown;
  const procs = getLocalizedProcedures(locale);
  const header = [
    md.compendiumTitle,
    md.compendiumTotal,
    md.compendiumNote,
    '',
    '---',
    '',
  ].join('\n');

  return header + procs.map((p) => localizedProcedureToMarkdown(p, locale)).join('\n\n---\n\n');
}
