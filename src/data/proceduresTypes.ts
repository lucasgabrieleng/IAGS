export type GovernanceDomainId =
  | 'governanca'
  | 'ativos'
  | 'operacao'
  | 'identidade'
  | 'ciberseguranca'
  | 'resiliencia';

export interface GovernanceDomainMeta {
  id: GovernanceDomainId;
  label: string;
  shortLabel: string;
  description: string;
  accentHex: string;
  surfaceClass: string;
  textClass: string;
  borderClass: string;
}

export interface ProcedureTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface ProcedureSubsection {
  code: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ProcedureTable;
  note?: string;
}

export interface ProcedureSection {
  number: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: ProcedureSubsection[];
  table?: ProcedureTable;
  note?: string;
}

export interface ControlledRecordSpec {
  name: string;
  identification: string;
  storage: string;
  accessControl: string;
  retention: string;
  disposition: string;
}

export interface IagsProcedure {
  id: string;
  code: string;
  revision: string;
  title: string;
  shortTitle: string;
  domain: GovernanceDomainId;
  cadence: string;
  ownerRole: string;
  summary: string;
  keyMetrics: string[];
  references: string[];
  sections: ProcedureSection[];
  controlledRecords: ControlledRecordSpec[];
  sanitizationSummary: string;
}

export type InteractionType =
  | 'governanca'
  | 'operacional'
  | 'seguranca'
  | 'mudanca'
  | 'dados';

export interface ProcedureInteraction {
  id: string;
  from: string; // e.g. 'IAGS-15'
  to: string; // e.g. 'IAGS-04'
  label: string;
  trigger: string;
  type: InteractionType;
}

export interface ScenarioStep {
  stepNumber: number;
  from: string;
  to: string;
  title: string;
  action: string;
  artifact: string;
  slaNote: string;
}

export interface GovernanceScenario {
  id: string;
  title: string;
  category: string;
  severity: 'Crítica' | 'Alta' | 'Média';
  summary: string;
  involvedNodes: string[];
  steps: ScenarioStep[];
}
