export type ChangeActionType =
  | 'logica'
  | 'patch'
  | 'energia'
  | 'rede'
  | 'falha';

export interface ChangeActionOption {
  id: ChangeActionType;
  label: string;
  shortLabel: string;
  description: string;
  propagationDepth: number; // how aggressively it spreads along dependencies
  propagatesVia: ('controle' | 'rede' | 'energia' | 'dados' | 'engenharia')[];
  baseRiskBoost: 'Alto' | 'Médio' | 'Crítico';
  triggersProcedures: string[];
}

export interface IndustrialPlant {
  id: string;
  code: string;
  name: string;
  areaType: string;
  criticality: 'Alta' | 'Média';
  rtoHours: number;
}

export interface IndustrialSystem {
  id: string;
  code: string;
  name: string;
  category: 'Controle' | 'Supervisão' | 'Dados' | 'Segurança' | 'Engenharia';
}

export interface AssetDependencyEdge {
  fromTag: string;
  toTag: string;
  relation: 'controle' | 'rede' | 'energia' | 'dados' | 'engenharia';
  description: string;
}

export interface AssetPlantMapping {
  assetTag: string;
  plantId: string;
  impactRole: 'Parada Total' | 'Operação Degradada' | 'Modo Manual Seguro' | 'Monitoramento Afetado';
}

export interface AssetSystemMapping {
  assetTag: string;
  systemId: string;
  impactDetail: string;
}

export const CHANGE_ACTION_OPTIONS: ChangeActionOption[] = [
  {
    id: 'logica',
    label: 'Alteração de Lógica / Firmware',
    shortLabel: 'Lógica / Firmware',
    description:
      'Modificação de programa em CLP, telas IHM, malhas de intertravamento ou upgrade de firmware industrial.',
    propagationDepth: 2,
    propagatesVia: ['controle', 'dados', 'engenharia'],
    baseRiskBoost: 'Alto',
    triggersProcedures: ['IAGS-03', 'IAGS-02', 'IAGS-08', 'IAGS-14', 'IAGS-11'],
  },
  {
    id: 'patch',
    label: 'Patch de Segurança / Reinicialização',
    shortLabel: 'Patch / Reboot',
    description:
      'Aplicação de correção CVE (IAGS-10) com reinicialização controlada e validação em ativo stand-by.',
    propagationDepth: 2,
    propagatesVia: ['rede', 'dados', 'controle'],
    baseRiskBoost: 'Alto',
    triggersProcedures: ['IAGS-10', 'IAGS-14', 'IAGS-03', 'IAGS-15', 'IAGS-11'],
  },
  {
    id: 'energia',
    label: 'Manutenção Elétrica / Desligamento',
    shortLabel: 'Energia / Parada',
    description:
      'Intervenção em Nobreak, painel elétrico ou substituição física de hardware crítico (APR/PTP + NR-10).',
    propagationDepth: 3,
    propagatesVia: ['energia', 'controle', 'rede', 'dados'],
    baseRiskBoost: 'Crítico',
    triggersProcedures: ['IAGS-13', 'IAGS-12', 'IAGS-03', 'IAGS-07', 'IAGS-11'],
  },
  {
    id: 'rede',
    label: 'Mudança de Firewall / Segmentação de Rede',
    shortLabel: 'Rede / Firewall',
    description:
      'Alteração de ACLs, VLANs industriais, regras IDMZ ou roteamento entre camadas OT e TI.',
    propagationDepth: 3,
    propagatesVia: ['rede', 'dados', 'engenharia'],
    baseRiskBoost: 'Alto',
    triggersProcedures: ['IAGS-03', 'IAGS-10', 'IAGS-15', 'IAGS-09', 'IAGS-11'],
  },
  {
    id: 'falha',
    label: 'Falha Súbita / Indisponibilidade (> RTO)',
    shortLabel: 'Falha / Crise',
    description:
      'Simulação de parada inesperada do ativo para avaliar acionamento de incidentes P1 e plano de continuidade DRP.',
    propagationDepth: 3,
    propagatesVia: ['energia', 'controle', 'rede', 'dados', 'engenharia'],
    baseRiskBoost: 'Crítico',
    triggersProcedures: ['IAGS-15', 'IAGS-04', 'IAGS-11', 'IAGS-03', 'IAGS-01'],
  },
];

export const INDUSTRIAL_PLANTS: IndustrialPlant[] = [
  {
    id: 'PLT-01',
    code: 'PLANTA-01',
    name: 'Unidade de Processo Contínuo 01',
    areaType: 'Processo Primário',
    criticality: 'Alta',
    rtoHours: 4,
  },
  {
    id: 'PLT-02',
    code: 'PLANTA-02',
    name: 'Estação de Utilidades & Bombeamento',
    areaType: 'Utilidades Industriais',
    criticality: 'Alta',
    rtoHours: 2,
  },
  {
    id: 'PLT-03',
    code: 'PLANTA-03',
    name: 'Centro Integrado de Controle Operacional',
    areaType: 'Supervisão Central',
    criticality: 'Alta',
    rtoHours: 2,
  },
  {
    id: 'PLT-04',
    code: 'PLANTA-04',
    name: 'Unidade Auxiliar de Dosagem & Expedição',
    areaType: 'Processo Secundário',
    criticality: 'Média',
    rtoHours: 8,
  },
];

export const INDUSTRIAL_SYSTEMS: IndustrialSystem[] = [
  {
    id: 'SYS-CTRL',
    code: 'CTRL-OT',
    name: 'Malhas de Controle & Intertravamento',
    category: 'Controle',
  },
  {
    id: 'SYS-SCADA',
    code: 'SCADA-OP',
    name: 'Supervisão Operacional & Alarmes (SCADA)',
    category: 'Supervisão',
  },
  {
    id: 'SYS-HIST',
    code: 'HIST-BI',
    name: 'Historiamento de Processo & Balanço de Massa',
    category: 'Dados',
  },
  {
    id: 'SYS-SEC',
    code: 'IDMZ-SIEM',
    name: 'Perímetro IDMZ, NTP & Telemetria SIEM',
    category: 'Segurança',
  },
  {
    id: 'SYS-ENG',
    code: 'ENG-VER',
    name: 'Engenharia, Diagnóstico & Versionamento',
    category: 'Engenharia',
  },
];

// Directed dependency graph: if `fromTag` changes/fails, `toTag` is impacted
export const ASSET_DEPENDENCIES: AssetDependencyEdge[] = [
  // Power (Nobreak -> Field & Core)
  {
    fromTag: 'UPS-IND-009',
    toTag: 'CLP-PROC-101',
    relation: 'energia',
    description: 'Alimentação elétrica ininterrupta do rack principal do CLP.',
  },
  {
    fromTag: 'UPS-IND-009',
    toTag: 'SW-CORE-OT02',
    relation: 'energia',
    description: 'Alimentação redundante do backbone óptico industrial.',
  },
  {
    fromTag: 'UPS-IND-009',
    toTag: 'IHM-LIN-207',
    relation: 'energia',
    description: 'Sustentação elétrica do painel local de bombeamento.',
  },

  // PLC -> IHM, SCADA, Historian
  {
    fromTag: 'CLP-PROC-101',
    toTag: 'IHM-LIN-207',
    relation: 'controle',
    description: 'Troca de tags de comando, setpoints e intertravamentos locais.',
  },
  {
    fromTag: 'CLP-PROC-101',
    toTag: 'SCADA-SRV-01',
    relation: 'dados',
    description: 'Leitura cíclica de variáveis de processo, alarmes e comandos remotos.',
  },
  {
    fromTag: 'CLP-PROC-101',
    toTag: 'HIST-OT-001',
    relation: 'dados',
    description: 'Coleta de séries temporais para rastreabilidade e qualidade.',
  },

  // Network Backbone -> All connected nodes
  {
    fromTag: 'SW-CORE-OT02',
    toTag: 'CLP-PROC-101',
    relation: 'rede',
    description: 'Comunicação determinística do anel industrial com controladores.',
  },
  {
    fromTag: 'SW-CORE-OT02',
    toTag: 'SCADA-SRV-01',
    relation: 'rede',
    description: 'Tráfego de supervisão entre sala de CLPs e Data Center OT.',
  },
  {
    fromTag: 'SW-CORE-OT02',
    toTag: 'OWS-OP-012',
    relation: 'rede',
    description: 'Conectividade dos consoles de operação com servidores SCADA.',
  },
  {
    fromTag: 'SW-CORE-OT02',
    toTag: 'EWS-ENG-004',
    relation: 'rede',
    description: 'Canal de manutenção lógica e diagnóstico de engenharia.',
  },

  // Firewall IDMZ -> Historian, Engineering, SCADA remote/SIEM
  {
    fromTag: 'FW-DMZ-OT01',
    toTag: 'HIST-OT-001',
    relation: 'rede',
    description: 'Replicação controlada de dados industriais da IDMZ para camada corporativa.',
  },
  {
    fromTag: 'FW-DMZ-OT01',
    toTag: 'SCADA-SRV-01',
    relation: 'rede',
    description: 'Filtragem de acesso remoto supervisionado, NTP e envio de logs SIEM.',
  },
  {
    fromTag: 'FW-DMZ-OT01',
    toTag: 'EWS-ENG-004',
    relation: 'rede',
    description: 'Acesso controlado a repositórios de patches e cofre PAM.',
  },

  // SCADA -> Operator Consoles & Historian
  {
    fromTag: 'SCADA-SRV-01',
    toTag: 'OWS-OP-012',
    relation: 'dados',
    description: 'Renderização de sinóticos, tendências e reconhecimento de alarmes.',
  },
  {
    fromTag: 'SCADA-SRV-01',
    toTag: 'HIST-OT-001',
    relation: 'dados',
    description: 'Alimentação de eventos operacionais e histórico consolidado.',
  },

  // Engineering Workstation -> PLCs & IHMs
  {
    fromTag: 'EWS-ENG-004',
    toTag: 'CLP-PROC-101',
    relation: 'engenharia',
    description: 'Download de lógica, comissionamento e check-in de versionamento.',
  },
  {
    fromTag: 'EWS-ENG-004',
    toTag: 'IHM-LIN-207',
    relation: 'engenharia',
    description: 'Publicação de telas operacionais e perfis locais.',
  },
  {
    fromTag: 'EWS-ENG-004',
    toTag: 'CLP-LEG-042',
    relation: 'engenharia',
    description: 'Extração de backup e migração de malhas do controlador legado.',
  },

  // Legacy PLC -> SCADA
  {
    fromTag: 'CLP-LEG-042',
    toTag: 'SCADA-SRV-01',
    relation: 'dados',
    description: 'Telemetria da unidade auxiliar de dosagem em fase de migração.',
  },
];

export const ASSET_PLANT_MAPPINGS: AssetPlantMapping[] = [
  { assetTag: 'CLP-PROC-101', plantId: 'PLT-01', impactRole: 'Parada Total' },
  { assetTag: 'CLP-PROC-101', plantId: 'PLT-02', impactRole: 'Operação Degradada' },
  { assetTag: 'IHM-LIN-207', plantId: 'PLT-02', impactRole: 'Modo Manual Seguro' },
  { assetTag: 'UPS-IND-009', plantId: 'PLT-01', impactRole: 'Parada Total' },
  { assetTag: 'UPS-IND-009', plantId: 'PLT-02', impactRole: 'Parada Total' },
  { assetTag: 'SW-CORE-OT02', plantId: 'PLT-01', impactRole: 'Operação Degradada' },
  { assetTag: 'SW-CORE-OT02', plantId: 'PLT-03', impactRole: 'Parada Total' },
  { assetTag: 'SCADA-SRV-01', plantId: 'PLT-03', impactRole: 'Parada Total' },
  { assetTag: 'SCADA-SRV-01', plantId: 'PLT-01', impactRole: 'Modo Manual Seguro' },
  { assetTag: 'OWS-OP-012', plantId: 'PLT-03', impactRole: 'Operação Degradada' },
  { assetTag: 'FW-DMZ-OT01', plantId: 'PLT-03', impactRole: 'Monitoramento Afetado' },
  { assetTag: 'HIST-OT-001', plantId: 'PLT-03', impactRole: 'Monitoramento Afetado' },
  { assetTag: 'EWS-ENG-004', plantId: 'PLT-01', impactRole: 'Monitoramento Afetado' },
  { assetTag: 'CLP-LEG-042', plantId: 'PLT-04', impactRole: 'Parada Total' },
];

export const ASSET_SYSTEM_MAPPINGS: AssetSystemMapping[] = [
  { assetTag: 'CLP-PROC-101', systemId: 'SYS-CTRL', impactDetail: 'Execução em tempo real das malhas primárias' },
  { assetTag: 'IHM-LIN-207', systemId: 'SYS-CTRL', impactDetail: 'Interface local de operação de campo' },
  { assetTag: 'CLP-LEG-042', systemId: 'SYS-CTRL', impactDetail: 'Intertravamento da linha auxiliar' },
  { assetTag: 'SCADA-SRV-01', systemId: 'SYS-SCADA', impactDetail: 'Servidor central de sinóticos e alarmes' },
  { assetTag: 'OWS-OP-012', systemId: 'SYS-SCADA', impactDetail: 'Estação de comando dos operadores' },
  { assetTag: 'HIST-OT-001', systemId: 'SYS-HIST', impactDetail: 'Gravação contínua de tags e KPIs industriais' },
  { assetTag: 'FW-DMZ-OT01', systemId: 'SYS-SEC', impactDetail: 'Isolamento TI/OT, NTP e encaminhamento SIEM' },
  { assetTag: 'SW-CORE-OT02', systemId: 'SYS-SEC', impactDetail: 'Segmentação VLAN e espelhamento de rede OT' },
  { assetTag: 'EWS-ENG-004', systemId: 'SYS-ENG', impactDetail: 'Ambiente de engenharia e versionamento de código' },
  { assetTag: 'UPS-IND-009', systemId: 'SYS-CTRL', impactDetail: 'Autonomia elétrica de painéis de controle' },
];

export interface ImpactedAssetNode {
  tag: string;
  hop: 1 | 2;
  viaRelation: AssetDependencyEdge['relation'];
  reason: string;
  parentTag: string;
}

export interface ImpactSimulationResult {
  sourceTag: string;
  action: ChangeActionOption;
  impactedAssets: ImpactedAssetNode[];
  activeEdges: AssetDependencyEdge[];
  impactedPlants: (IndustrialPlant & { impactRole: AssetPlantMapping['impactRole']; triggeredBy: string })[];
  impactedSystems: (IndustrialSystem & { impactDetail: string; triggeredBy: string })[];
  changeClassification: string;
  cabRequired: boolean;
  priorityWindow: string;
  mandatoryChecklists: string[];
  requiredProcedures: string[];
}

export function simulateChangeImpact(
  sourceTag: string,
  actionType: ChangeActionType
): ImpactSimulationResult {
  const action =
    CHANGE_ACTION_OPTIONS.find((a) => a.id === actionType) || CHANGE_ACTION_OPTIONS[0];

  const visited = new Set<string>([sourceTag]);
  const impactedAssets: ImpactedAssetNode[] = [];
  const activeEdges: AssetDependencyEdge[] = [];

  // Hop 1 (direct dependencies)
  const hop1Tags: string[] = [];
  ASSET_DEPENDENCIES.forEach((edge) => {
    if (edge.fromTag === sourceTag && action.propagatesVia.includes(edge.relation)) {
      activeEdges.push(edge);
      if (!visited.has(edge.toTag)) {
        visited.add(edge.toTag);
        hop1Tags.push(edge.toTag);
        impactedAssets.push({
          tag: edge.toTag,
          hop: 1,
          viaRelation: edge.relation,
          reason: edge.description,
          parentTag: edge.fromTag,
        });
      }
    }
  });

  // Hop 2 (cascading indirect dependencies)
  if (action.propagationDepth >= 2) {
    hop1Tags.forEach((h1Tag) => {
      ASSET_DEPENDENCIES.forEach((edge) => {
        if (edge.fromTag === h1Tag && action.propagatesVia.includes(edge.relation)) {
          if (!visited.has(edge.toTag)) {
            visited.add(edge.toTag);
            activeEdges.push(edge);
            impactedAssets.push({
              tag: edge.toTag,
              hop: 2,
              viaRelation: edge.relation,
              reason: edge.description,
              parentTag: edge.fromTag,
            });
          }
        }
      });
    });
  }

  const allAffectedTags = [sourceTag, ...impactedAssets.map((a) => a.tag)];

  // Plants affected (prioritizing highest severity role if multiple assets hit same plant)
  const roleRank: Record<AssetPlantMapping['impactRole'], number> = {
    'Parada Total': 4,
    'Operação Degradada': 3,
    'Modo Manual Seguro': 2,
    'Monitoramento Afetado': 1,
  };

  const plantAcc = new Map<
    string,
    IndustrialPlant & { impactRole: AssetPlantMapping['impactRole']; triggeredBy: string }
  >();

  allAffectedTags.forEach((tag) => {
    ASSET_PLANT_MAPPINGS.filter((m) => m.assetTag === tag).forEach((mapping) => {
      const plant = INDUSTRIAL_PLANTS.find((p) => p.id === mapping.plantId);
      if (!plant) return;
      const existing = plantAcc.get(plant.id);
      if (!existing || roleRank[mapping.impactRole] > roleRank[existing.impactRole]) {
        plantAcc.set(plant.id, {
          ...plant,
          impactRole: mapping.impactRole,
          triggeredBy: tag,
        });
      }
    });
  });

  const impactedPlants = Array.from(plantAcc.values()).sort(
    (a, b) => roleRank[b.impactRole] - roleRank[a.impactRole]
  );

  // Systems affected
  const sysAcc = new Map<string, IndustrialSystem & { impactDetail: string; triggeredBy: string }>();
  allAffectedTags.forEach((tag) => {
    ASSET_SYSTEM_MAPPINGS.filter((m) => m.assetTag === tag).forEach((mapping) => {
      const sys = INDUSTRIAL_SYSTEMS.find((s) => s.id === mapping.systemId);
      if (!sys || sysAcc.has(sys.id)) return;
      sysAcc.set(sys.id, {
        ...sys,
        impactDetail: mapping.impactDetail,
        triggeredBy: tag,
      });
    });
  });

  const impactedSystems = Array.from(sysAcc.values());

  const hasTotalStop = impactedPlants.some((p) => p.impactRole === 'Parada Total');
  const cabRequired =
    action.id !== 'falha' && (hasTotalStop || impactedAssets.length >= 2 || action.baseRiskBoost === 'Crítico');

  const changeClassification =
    action.id === 'falha'
      ? 'Incidente Crítico P1 + Mudança Emergencial (RDM ≤ 5 dias úteis)'
      : cabRequired
      ? 'Mudança Normal — Risco Alto (Aprovação Obrigatória CAB-Automação)'
      : 'Mudança Normal — Risco Médio (Aprovação Supervisor de Automação)';

  const priorityWindow =
    action.id === 'falha'
      ? 'P1 — Ação Imediata / Acionamento DRP se exceder RTO'
      : hasTotalStop
      ? 'P6 — Janela de Parada Programada Obrigatória'
      : 'P2 / P3 — Programação Semanal Controlada';

  const mandatoryChecklists: string[] = [
    'Plano de Testes em ambiente off-line / bancada ou ativo stand-by (IAGS-03 / IAGS-14).',
    'Backup íntegro e Plano de Recuperação (Rollback) validado antes da intervenção (IAGS-03 / IAGS-11).',
    'Comunicação prévia às Salas de Controle e áreas operacionais impactadas.',
  ];

  if (action.id === 'logica') {
    mandatoryChecklists.push(
      'Check-out exclusivo de código-fonte (1 usuário por vez) e registro da RDM no versionamento (IAGS-08 / IAGS-03).'
    );
  }
  if (action.id === 'energia') {
    mandatoryChecklists.push(
      'Emissão obrigatória de APR, PTP e credencial NR-10 para intervenção física em subestação/painel (IAGS-07 / IAGS-12).'
    );
  }
  if (action.id === 'patch' || action.id === 'rede') {
    mandatoryChecklists.push(
      'Validação de continuidade da coleta SIEM/NTP e monitoramento intensivo pós-implantação (IAGS-15).'
    );
  }
  if (action.id === 'falha') {
    mandatoryChecklists.push(
      'Avaliar modo manual seguro e controle compensatório aprovado pelo Comitê de Crise + SI Industrial (IAGS-11).'
    );
  }

  return {
    sourceTag,
    action,
    impactedAssets,
    activeEdges,
    impactedPlants,
    impactedSystems,
    changeClassification,
    cabRequired,
    priorityWindow,
    mandatoryChecklists,
    requiredProcedures: action.triggersProcedures,
  };
}
