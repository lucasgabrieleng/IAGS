export type AssetClass =
  | 'CLP / Remotas'
  | 'Estações de Automação'
  | 'IHM'
  | 'Infraestrutura de Rede'
  | 'Nobreak'
  | 'Pacote de Mercado';

export type AssetNature = 'Hardware' | 'Software';

export type LifecyclePhase =
  | 'Demanda'
  | 'Aquisição'
  | 'Implementação'
  | 'Uso'
  | 'Descontinuação';

export type CriticalityLevel = 'Alta' | 'Média' | 'Baixa';

export interface SecurityGates {
  homologated: boolean;
  defaultPasswordsChanged: boolean;
  hardeningApplied: boolean;
  vulnerabilityScanOk: boolean;
  erpAndCmdbSynced: boolean;
  siemLogsEnabled: boolean;
}

export interface OtAsset {
  id: string;
  tag: string;
  name: string;
  assetClass: AssetClass;
  subclass: string;
  nature: AssetNature;
  siteZone: string;
  phase: LifecyclePhase;
  criticality: CriticalityLevel;
  owner: string;
  erpId: string;
  cmdbId: string;
  inPga: boolean;
  firmwareOrVersion: string;
  lastAuditDate: string;
  complianceStatus: 'Conforme' | 'Ação Pendente' | 'Incidente SI';
  gates: SecurityGates;
}

export interface AuditRecord {
  id: string;
  code: string;
  type: 'Semestral (Amostragem)' | 'Bienal (Inventário Geral)' | 'GCT (Conformidade Técnica)' | 'Sob Demanda';
  scope: string;
  procedureRef: string;
  scheduledDate: string;
  status: 'Concluída' | 'Em Andamento' | 'Agendada';
  assetsChecked: number;
  deviationsFound: number;
  securityIncidents: number;
  actionPlanRef?: string;
}

export interface VulnerabilityItem {
  id: string;
  cve: string;
  assetTag: string;
  assetClass: string;
  severity: 'Crítica' | 'Alta' | 'Média' | 'Baixa';
  cvss: number;
  slaDays: 60 | 90 | 120 | 180;
  daysOpen: number;
  ownerTeam: 'Automação' | 'SI Industrial' | 'Infraestrutura TI' | 'Manutenção';
  treatmentStep: 'Homologação Fabricante' | 'Teste Off-line' | 'Aplicação Stand-by' | 'Produção (RDM)' | 'Mitigado / Concluído';
  rdmRef?: string;
  tdiExcluded: boolean;
}

export interface ActionPlanItem {
  id: string;
  code: string;
  title: string;
  originProcedure: string;
  assetTag: string;
  deviationType:
    | 'Divergência ERP/CMDB'
    | 'Hardening Incompleto'
    | 'Software Não Licenciado'
    | 'Senha Padrão Pendente'
    | 'Vulnerabilidade CVE'
    | 'Desvio Segurança Física';
  rdmCode: string;
  owner: string;
  dueDate: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  escalatedToSecOps: boolean;
  status: 'Aberto' | 'Em Execução (RDM)' | 'Concluído';
}

export interface CommitteeMinute {
  id: string;
  sequence: string;
  date: string;
  quarter: string;
  participantsCount: number;
  summary: string;
  keyDecisions: string[];
  retentionUntil: string;
}

export interface PhysicalPerimeterRecord {
  id: string;
  areaName: string;
  level: 'ALTA' | 'MÉDIA' | 'BAIXA';
  nr10Required: boolean;
  accessControl: string;
  authorizedCount: number;
  lastReviewDate: string;
  status: 'Conforme' | 'Revisão Pendente';
}

export interface ContinuitySystemRecord {
  id: string;
  assetClass: 'CLP / Remotas' | 'IHM' | 'Sistema Supervisório (SCADA)' | 'Switch Industrial' | 'Firewall Industrial';
  rtoHours: number;
  rpoMinutes: number;
  redundancyModel: string;
  lastTestDate: string;
  nextTestDue: string;
  testStatus: 'Validado' | 'Agendado em Parada' | 'Atenção Prazo';
}

export interface GovernanceRoleMatrixItem {
  role: string;
  functionGroup: 'Comitê IAGS' | 'Central de Serviços' | 'Equipe de Automação' | 'Partes Interessadas';
  cadence: string;
  keyResponsibilities: string;
  linkedProcedures: string[];
}

export const ASSET_CLASSES: AssetClass[] = [
  'CLP / Remotas',
  'Estações de Automação',
  'IHM',
  'Infraestrutura de Rede',
  'Nobreak',
  'Pacote de Mercado',
];

export const INITIAL_ASSETS: OtAsset[] = [
  {
    id: 'ast-01',
    tag: 'CLP-PROC-101',
    name: 'Controlador Principal — Área de Processo 01',
    assetClass: 'CLP / Remotas',
    subclass: 'CLP de Processo',
    nature: 'Hardware',
    siteZone: 'Zona OT-N1 · Sala de CLPs 01',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Eng. Marcos Ribeiro',
    erpId: 'EAM-88412',
    cmdbId: 'CI-OT-0101',
    inPga: true,
    firmwareOrVersion: 'v33.014',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Conforme',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-02',
    tag: 'EWS-ENG-004',
    name: 'Estação de Engenharia — Manutenção Lógica',
    assetClass: 'Estações de Automação',
    subclass: 'Estação de Engenharia',
    nature: 'Hardware',
    siteZone: 'Zona OT-N2 · Sala de Engenharia',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Eng. Carla Mendes',
    erpId: 'EAM-88459',
    cmdbId: 'CI-OT-0204',
    inPga: true,
    firmwareOrVersion: 'OS Ind. LTSC 21H2',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Ação Pendente',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: false,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-03',
    tag: 'FW-DMZ-OT01',
    name: 'Firewall Industrial de Perímetro IDMZ',
    assetClass: 'Infraestrutura de Rede',
    subclass: 'Firewall Industrial',
    nature: 'Hardware',
    siteZone: 'Zona IDMZ · Data Center Principal',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Esp. Rafael Tavares (SI Industrial)',
    erpId: 'EAM-89003',
    cmdbId: 'CI-OT-0401',
    inPga: true,
    firmwareOrVersion: 'FW-OS 7.4.5',
    lastAuditDate: '2026-09-02',
    complianceStatus: 'Conforme',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-04',
    tag: 'SCADA-SRV-01',
    name: 'Servidor Supervisório SCADA — Planta Integrada',
    assetClass: 'Pacote de Mercado',
    subclass: 'Sistema Supervisório',
    nature: 'Software',
    siteZone: 'Zona OT-N3 · Data Center Principal',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Eng. Lucas Nogueira',
    erpId: 'EAM-89114',
    cmdbId: 'CI-OT-0601',
    inPga: true,
    firmwareOrVersion: 'SCADA Core 11.2 SP1',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Ação Pendente',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: false,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-05',
    tag: 'IHM-LIN-207',
    name: 'IHM Local — Painel de Bombeamento',
    assetClass: 'IHM',
    subclass: 'Painel Operador 15"',
    nature: 'Hardware',
    siteZone: 'Zona OT-N1 · Área de Utilidades',
    phase: 'Implementação',
    criticality: 'Média',
    owner: 'Téc. Bruno Almeida',
    erpId: 'EAM-90218',
    cmdbId: 'CI-OT-0307',
    inPga: false,
    firmwareOrVersion: 'PanelOS 14.0',
    lastAuditDate: '2026-10-20',
    complianceStatus: 'Ação Pendente',
    gates: {
      homologated: true,
      defaultPasswordsChanged: false,
      hardeningApplied: true,
      vulnerabilityScanOk: false,
      erpAndCmdbSynced: false,
      siemLogsEnabled: false,
    },
  },
  {
    id: 'ast-06',
    tag: 'SW-CORE-OT02',
    name: 'Switch Industrial Backbone Anel Redundante',
    assetClass: 'Infraestrutura de Rede',
    subclass: 'Switch Industrial',
    nature: 'Hardware',
    siteZone: 'Zona OT-N2 · Sala de Controle Central',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Eng. Rafael Tavares',
    erpId: 'EAM-88620',
    cmdbId: 'CI-OT-0412',
    inPga: true,
    firmwareOrVersion: 'SwitchOS 9.2.1',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Conforme',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-07',
    tag: 'UPS-IND-009',
    name: 'Nobreak Industrial 20 kVA — Sala de CLPs 01',
    assetClass: 'Nobreak',
    subclass: 'Nobreak Industrial Dupla Conversão',
    nature: 'Hardware',
    siteZone: 'Zona OT-N0 · Subestação Elétrica 01',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Sup. Renato Costa (Manutenção)',
    erpId: 'EAM-87105',
    cmdbId: 'CI-OT-0509',
    inPga: true,
    firmwareOrVersion: 'MgmtCard 4.1',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Conforme',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-08',
    tag: 'HIST-OT-001',
    name: 'Servidor Historiador de Processo Industrial',
    assetClass: 'Pacote de Mercado',
    subclass: 'Historian',
    nature: 'Software',
    siteZone: 'Zona OT-N3 · Data Center Principal',
    phase: 'Uso',
    criticality: 'Alta',
    owner: 'Eng. Lucas Nogueira',
    erpId: 'EAM-89119',
    cmdbId: 'CI-OT-0602',
    inPga: true,
    firmwareOrVersion: 'Historian 2024 R2',
    lastAuditDate: '2026-08-14',
    complianceStatus: 'Conforme',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-09',
    tag: 'OWS-OP-012',
    name: 'Estação de Operação — Console Norte',
    assetClass: 'Estações de Automação',
    subclass: 'Estação de Operação',
    nature: 'Hardware',
    siteZone: 'Zona OT-N2 · Sala de Controle Norte',
    phase: 'Uso',
    criticality: 'Média',
    owner: 'Eng. Carla Mendes',
    erpId: 'EAM-88901',
    cmdbId: 'CI-OT-0212',
    inPga: true,
    firmwareOrVersion: 'OS Ind. LTSC 21H2',
    lastAuditDate: '2026-09-18',
    complianceStatus: 'Incidente SI',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: false,
      vulnerabilityScanOk: false,
      erpAndCmdbSynced: true,
      siemLogsEnabled: true,
    },
  },
  {
    id: 'ast-10',
    tag: 'CLP-LEG-042',
    name: 'Controlador Legado — Linha Auxiliar (Migração)',
    assetClass: 'CLP / Remotas',
    subclass: 'CLP Legado',
    nature: 'Hardware',
    siteZone: 'Zona OT-N1 · Unidade Auxiliar',
    phase: 'Descontinuação',
    criticality: 'Baixa',
    owner: 'Eng. Marcos Ribeiro',
    erpId: 'EAM-79041',
    cmdbId: 'CI-OT-0142',
    inPga: false,
    firmwareOrVersion: 'v20.011',
    lastAuditDate: '2026-07-05',
    complianceStatus: 'Ação Pendente',
    gates: {
      homologated: true,
      defaultPasswordsChanged: true,
      hardeningApplied: true,
      vulnerabilityScanOk: true,
      erpAndCmdbSynced: false,
      siemLogsEnabled: false,
    },
  },
];

export const INITIAL_VULNERABILITIES: VulnerabilityItem[] = [
  {
    id: 'vul-01',
    cve: 'CVE-2026-11428',
    assetTag: 'SCADA-SRV-01',
    assetClass: 'Pacote de Mercado',
    severity: 'Crítica',
    cvss: 9.4,
    slaDays: 60,
    daysOpen: 38,
    ownerTeam: 'Automação',
    treatmentStep: 'Aplicação Stand-by',
    rdmRef: 'RDM-2026-0441',
    tdiExcluded: false,
  },
  {
    id: 'vul-02',
    cve: 'CVE-2026-08912',
    assetTag: 'OWS-OP-012',
    assetClass: 'Estações de Automação',
    severity: 'Crítica',
    cvss: 9.1,
    slaDays: 60,
    daysOpen: 19,
    ownerTeam: 'Infraestrutura TI',
    treatmentStep: 'Teste Off-line',
    rdmRef: 'RDM-2026-0452',
    tdiExcluded: false,
  },
  {
    id: 'vul-03',
    cve: 'CVE-2025-44102',
    assetTag: 'EWS-ENG-004',
    assetClass: 'Estações de Automação',
    severity: 'Alta',
    cvss: 8.2,
    slaDays: 90,
    daysOpen: 54,
    ownerTeam: 'Infraestrutura TI',
    treatmentStep: 'Produção (RDM)',
    rdmRef: 'RDM-2026-0412',
    tdiExcluded: false,
  },
  {
    id: 'vul-04',
    cve: 'CVE-2026-03119',
    assetTag: 'CLP-PROC-101',
    assetClass: 'CLP / Remotas',
    severity: 'Alta',
    cvss: 7.8,
    slaDays: 90,
    daysOpen: 41,
    ownerTeam: 'Automação',
    treatmentStep: 'Homologação Fabricante',
    tdiExcluded: true,
  },
  {
    id: 'vul-05',
    cve: 'CVE-2025-39004',
    assetTag: 'SW-CORE-OT02',
    assetClass: 'Infraestrutura de Rede',
    severity: 'Média',
    cvss: 6.1,
    slaDays: 120,
    daysOpen: 67,
    ownerTeam: 'Automação',
    treatmentStep: 'Mitigado / Concluído',
    rdmRef: 'RDM-2026-0398',
    tdiExcluded: false,
  },
  {
    id: 'vul-06',
    cve: 'CVE-2025-21890',
    assetTag: 'UPS-IND-009',
    assetClass: 'Nobreak',
    severity: 'Baixa',
    cvss: 3.7,
    slaDays: 180,
    daysOpen: 82,
    ownerTeam: 'Manutenção',
    treatmentStep: 'Teste Off-line',
    tdiExcluded: true,
  },
];

export const INITIAL_AUDITS: AuditRecord[] = [
  {
    id: 'aud-01',
    code: 'AUD-IAGS-2026-S2',
    type: 'Semestral (Amostragem)',
    scope: 'Amostragem 25% — Estações, Switches, IHMs e CMDB/ERP',
    procedureRef: 'IAGS-02',
    scheduledDate: '2026-08-14',
    status: 'Concluída',
    assetsChecked: 48,
    deviationsFound: 3,
    securityIncidents: 1,
    actionPlanRef: 'PA-2026-08',
  },
  {
    id: 'aud-02',
    code: 'GCT-IAGS-2026-01',
    type: 'GCT (Conformidade Técnica)',
    scope: 'Verificação cíclica anual de Baseline em Servidores SCADA, AD OT e Firewalls',
    procedureRef: 'IAGS-10',
    scheduledDate: '2026-10-28',
    status: 'Em Andamento',
    assetsChecked: 34,
    deviationsFound: 2,
    securityIncidents: 0,
    actionPlanRef: 'PA-2026-11',
  },
  {
    id: 'aud-03',
    code: 'AUD-IAGS-2027-G1',
    type: 'Bienal (Inventário Geral)',
    scope: '100% das 6 Classes Críticas OT + Conciliação PGA/ERP/CMDB',
    procedureRef: 'IAGS-02',
    scheduledDate: '2027-02-15',
    status: 'Agendada',
    assetsChecked: 0,
    deviationsFound: 0,
    securityIncidents: 0,
  },
];

export const INITIAL_ACTION_PLANS: ActionPlanItem[] = [
  {
    id: 'pa-01',
    code: 'PA-2026-08-01',
    title: 'Aplicar baseline de hardening completo e bloqueio de USB em EWS-ENG-004',
    originProcedure: 'IAGS-10',
    assetTag: 'EWS-ENG-004',
    deviationType: 'Hardening Incompleto',
    rdmCode: 'RDM-2026-0412',
    owner: 'Eng. Carla Mendes',
    dueDate: '2026-12-05',
    priority: 'Alta',
    escalatedToSecOps: false,
    status: 'Em Execução (RDM)',
  },
  {
    id: 'pa-02',
    code: 'PA-2026-08-02',
    title: 'Remover software não homologado detectado em OWS-OP-012 e escalar para SI Industrial',
    originProcedure: 'IAGS-02',
    assetTag: 'OWS-OP-012',
    deviationType: 'Software Não Licenciado',
    rdmCode: 'RDM-2026-0428',
    owner: 'Esp. Rafael Tavares',
    dueDate: '2026-11-30',
    priority: 'Alta',
    escalatedToSecOps: true,
    status: 'Aberto',
  },
  {
    id: 'pa-03',
    code: 'PA-2026-10-03',
    title: 'Trocar senhas padrão de integrador e sincronizar IHM-LIN-207 no CMDB/PGA',
    originProcedure: 'IAGS-02',
    assetTag: 'IHM-LIN-207',
    deviationType: 'Senha Padrão Pendente',
    rdmCode: 'RDM-2026-0459',
    owner: 'Téc. Bruno Almeida',
    dueDate: '2026-12-02',
    priority: 'Alta',
    escalatedToSecOps: false,
    status: 'Em Execução (RDM)',
  },
  {
    id: 'pa-04',
    code: 'PA-2026-11-04',
    title: 'Executar destruição segura de memória e baixa definitiva no CMDB para CLP-LEG-042',
    originProcedure: 'IAGS-13',
    assetTag: 'CLP-LEG-042',
    deviationType: 'Divergência ERP/CMDB',
    rdmCode: 'RDM-2026-0463',
    owner: 'Eng. Marcos Ribeiro',
    dueDate: '2026-12-18',
    priority: 'Média',
    escalatedToSecOps: false,
    status: 'Aberto',
  },
];

export const INITIAL_MINUTES: CommitteeMinute[] = [
  {
    id: 'ata-2026-03',
    sequence: '2026/03',
    date: '2026-09-25',
    quarter: '3º Trimestre 2026',
    participantsCount: 14,
    summary:
      'Revisão consolidada das 15 normas IAGS, acompanhamento do plano de ação da auditoria semestral e aprovação da janela de parada para patch SCADA.',
    keyDecisions: [
      'Aprovada integração completa de logs privilegiados (IAGS-09/IAGS-15) no SIEM com retenção imutável.',
      'Definido prazo de 30 dias para encerramento dos desvios de hardening em estações de engenharia.',
      'Validado cronograma bienal de teste de continuidade DRP para Firewalls e SCADA na parada de janeiro.',
    ],
    retentionUntil: '2029-09-25 (3 anos + histórico)',
  },
  {
    id: 'ata-2026-02',
    sequence: '2026/02',
    date: '2026-06-22',
    quarter: '2º Trimestre 2026',
    participantsCount: 13,
    summary:
      'Avaliação de maturidade do Catálogo de Serviços, revisão semestral de contas privilegiadas (PAM) e relatório de segurança física em salas NR-10.',
    keyDecisions: [
      'Homologadas 18 fichas atualizadas no Catálogo de Serviços de Automação (IAGS-05).',
      'Revogados 6 acessos temporários residuais de terceiros pós-startup (IAGS-08/IAGS-12).',
    ],
    retentionUntil: '2029-06-22 (3 anos + histórico)',
  },
  {
    id: 'ata-2026-01',
    sequence: '2026/01',
    date: '2026-03-19',
    quarter: '1º Trimestre 2026',
    participantsCount: 15,
    summary:
      'Abertura do ciclo anual de governança IAGS, definição das metas de SLA de vulnerabilidades (60/90/120/180d) e calendário de auditorias.',
    keyDecisions: [
      'Confirmada exclusão de CLPs/Remotas e Nobreaks de testes ativos TDI/TDE (IAGS-10).',
      'Aprovado programa anual de revisão de licenças de software de automação (IAGS-14).',
    ],
    retentionUntil: '2029-03-19 (3 anos + histórico)',
  },
];

export const PHYSICAL_PERIMETERS: PhysicalPerimeterRecord[] = [
  {
    id: 'per-01',
    areaName: 'Data Center Industrial Principal & Redundante',
    level: 'ALTA',
    nr10Required: false,
    accessControl: 'Biometria + Crachá + CFTV 24x7 + Log',
    authorizedCount: 18,
    lastReviewDate: '2026-09-10',
    status: 'Conforme',
  },
  {
    id: 'per-02',
    areaName: 'Subestação de Entrada e Distribuição OT',
    level: 'ALTA',
    nr10Required: true,
    accessControl: 'Crachá NR-10 + Trancamento + Registro',
    authorizedCount: 24,
    lastReviewDate: '2026-09-10',
    status: 'Conforme',
  },
  {
    id: 'per-03',
    areaName: 'Salas de CLPs e Salas de Controle Operacional',
    level: 'ALTA',
    nr10Required: false,
    accessControl: 'Biometria + CFTV + Acompanhamento Terceiros',
    authorizedCount: 42,
    lastReviewDate: '2026-08-22',
    status: 'Conforme',
  },
  {
    id: 'per-04',
    areaName: 'Salas Elétricas de Área e Cabines de Robótica',
    level: 'MÉDIA',
    nr10Required: true,
    accessControl: 'Chave Controlada / Crachá + Inspeção Anual',
    authorizedCount: 56,
    lastReviewDate: '2026-04-18',
    status: 'Revisão Pendente',
  },
  {
    id: 'per-05',
    areaName: 'Laboratórios de Bancada e Escritórios com Rede OT',
    level: 'MÉDIA',
    nr10Required: false,
    accessControl: 'Crachá Funcional + Segregação de Porta Switch',
    authorizedCount: 31,
    lastReviewDate: '2026-09-04',
    status: 'Conforme',
  },
];

export const CONTINUITY_SYSTEMS: ContinuitySystemRecord[] = [
  {
    id: 'cnt-01',
    assetClass: 'CLP / Remotas',
    rtoHours: 4,
    rpoMinutes: 15,
    redundancyModel: 'CPU Redundante + Backup Versionado + Sobressalente',
    lastTestDate: '2025-11-12',
    nextTestDue: '2027-11-12',
    testStatus: 'Validado',
  },
  {
    id: 'cnt-02',
    assetClass: 'Sistema Supervisório (SCADA)',
    rtoHours: 2,
    rpoMinutes: 5,
    redundancyModel: 'Cluster Ativo-Standby + Replicação DC Secundário',
    lastTestDate: '2025-07-19',
    nextTestDue: '2027-07-19',
    testStatus: 'Validado',
  },
  {
    id: 'cnt-03',
    assetClass: 'Firewall Industrial',
    rtoHours: 1,
    rpoMinutes: 5,
    redundancyModel: 'Par HA Ativo-Standby + Plano Corporativo Dedicado',
    lastTestDate: '2025-01-24',
    nextTestDue: '2027-01-24',
    testStatus: 'Agendado em Parada',
  },
  {
    id: 'cnt-04',
    assetClass: 'Switch Industrial',
    rtoHours: 2,
    rpoMinutes: 30,
    redundancyModel: 'Anel Óptico Redundante + Config Backup + Spare',
    lastTestDate: '2025-05-08',
    nextTestDue: '2027-05-08',
    testStatus: 'Validado',
  },
  {
    id: 'cnt-05',
    assetClass: 'IHM',
    rtoHours: 4,
    rpoMinutes: 60,
    redundancyModel: 'Imagem de Projeto + Kit Notebook/Cabo + Operação Manual',
    lastTestDate: '2024-12-10',
    nextTestDue: '2026-12-10',
    testStatus: 'Atenção Prazo',
  },
];

export const GOVERNANCE_ROLES_MATRIX: GovernanceRoleMatrixItem[] = [
  {
    role: 'Gerência de Engenharia e Tecnologia de Automação',
    functionGroup: 'Comitê IAGS',
    cadence: 'Trimestral / Aceite de Risco',
    keyResponsibilities:
      'Patrocinar o IAGS, aprovar políticas, autorizar aceites formais de risco residual e liberar orçamento de resiliência.',
    linkedProcedures: ['IAGS-01', 'IAGS-10', 'IAGS-11'],
  },
  {
    role: 'Líder de Governança IAGS',
    functionGroup: 'Comitê IAGS',
    cadence: 'Contínuo / Atas Trimestrais',
    keyResponsibilities:
      'Coordenar o Comitê IAGS, manter as 15 normas, aprovar estrutura do Catálogo e conduzir auditorias e KPIs.',
    linkedProcedures: ['IAGS-01', 'IAGS-02', 'IAGS-05'],
  },
  {
    role: 'Supervisor de Automação',
    functionGroup: 'Equipe de Automação',
    cadence: 'Diário / CAB Semanal',
    keyResponsibilities:
      'Aprovar mudanças emergenciais, fichas de serviço, acessos críticos, solicitações com aprovação e priorização N1–N3.',
    linkedProcedures: ['IAGS-03', 'IAGS-05', 'IAGS-07', 'IAGS-08'],
  },
  {
    role: 'Central de Serviços & Planejador OT (N1)',
    functionGroup: 'Central de Serviços',
    cadence: 'Contínuo 24x7',
    keyResponsibilities:
      'Receber demandas no ITSM, executar triagem, aplicar checklists padrão, mudanças pré-aprovadas e roteamento.',
    linkedProcedures: ['IAGS-04', 'IAGS-06', 'IAGS-07'],
  },
  {
    role: 'Especialistas & Técnicos de Automação (N2/N3)',
    functionGroup: 'Equipe de Automação',
    cadence: 'Operação / Paradas',
    keyResponsibilities:
      'Sustentar CLPs/SCADA/Redes, homologar softwares, conduzir DRP, versionar códigos e remediar vulnerabilidades.',
    linkedProcedures: ['IAGS-02', 'IAGS-03', 'IAGS-11', 'IAGS-14'],
  },
  {
    role: 'SI Industrial, SOC & NOC',
    functionGroup: 'Partes Interessadas',
    cadence: 'Monitoramento 24x7 / Mensal',
    keyResponsibilities:
      'Operar SIEM/NTP, conduzir GVT/GCT e TDI/TDE, administrar cofre PAM, firewalls e resposta a incidentes cibernéticos.',
    linkedProcedures: ['IAGS-09', 'IAGS-10', 'IAGS-14', 'IAGS-15'],
  },
  {
    role: 'Manutenção Elétrica, Instrumentação & Segurança Patrimonial',
    functionGroup: 'Partes Interessadas',
    cadence: 'Campo (OM) / Revisão Anual',
    keyResponsibilities:
      'Primeiro atendimento de campo via OM (ERP/EAM), nobreaks/geradores, perímetros NR-10 e controle de crachás/biometria.',
    linkedProcedures: ['IAGS-04', 'IAGS-12', 'IAGS-13'],
  },
];

// Chart Series Data for Recharts Dashboards
export const DOMAIN_MATURITY_DATA = [
  { domain: 'Governança', conformidade: 96, meta: 95, procedimentos: 1 },
  { domain: 'Ativos OT', conformidade: 86, meta: 90, procedimentos: 1 },
  { domain: 'Operação', conformidade: 92, meta: 90, procedimentos: 5 },
  { domain: 'Identidade', conformidade: 88, meta: 92, procedimentos: 2 },
  { domain: 'Ciber & SOC', conformidade: 84, meta: 90, procedimentos: 3 },
  { domain: 'Resiliência', conformidade: 90, meta: 90, procedimentos: 3 },
];

export const MONTHLY_OPERATIONS_DATA = [
  { mes: 'Jun', incidentes: 18, mudancas: 29, alertasSiem: 11 },
  { mes: 'Jul', incidentes: 15, mudancas: 34, alertasSiem: 9 },
  { mes: 'Ago', incidentes: 21, mudancas: 31, alertasSiem: 14 },
  { mes: 'Set', incidentes: 14, mudancas: 38, alertasSiem: 8 },
  { mes: 'Out', incidentes: 12, mudancas: 42, alertasSiem: 7 },
  { mes: 'Nov', incidentes: 10, mudancas: 36, alertasSiem: 6 },
];

export const VULNERABILITY_SLA_CHART_DATA = [
  { severidade: 'Crítica (60d)', abertas: 2, remediadas: 9, slaDias: 60 },
  { severidade: 'Alta (90d)', abertas: 2, remediadas: 16, slaDias: 90 },
  { severidade: 'Média (120d)', abertas: 1, remediadas: 24, slaDias: 120 },
  { severidade: 'Baixa (180d)', abertas: 1, remediadas: 19, slaDias: 180 },
];
