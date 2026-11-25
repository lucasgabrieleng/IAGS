export type Locale = 'pt' | 'en' | 'es';

export const LOCALE_OPTIONS: { id: Locale; code: string; label: string; htmlLang: string }[] = [
  { id: 'pt', code: 'PT', label: 'Português', htmlLang: 'pt-BR' },
  { id: 'en', code: 'EN', label: 'English', htmlLang: 'en' },
  { id: 'es', code: 'ES', label: 'Español', htmlLang: 'es' },
];

export interface UiDictionary {
  appTitle: string;
  appSubtitle: string;
  backToDashboardAria: string;
  openNavAria: string;
  closeNavAria: string;
  themeLight: string;
  themeDark: string;
  switchToLightAria: string;
  switchToDarkAria: string;
  languageLabel: string;
  sidebar: {
    studioSection: string;
    proceduresSection: string;
    exportAllTitle: string;
    filterPlaceholder: string;
    standardsFooter: string;
  };
  nav: {
    overview: { label: string; subtitle: string };
    studio: { label: string; subtitle: string };
    simulator: { label: string; subtitle: string };
    assets: { label: string; subtitle: string };
    compliance: { label: string; subtitle: string };
    governance: { label: string; subtitle: string };
  };
  graphFrame: {
    maximize: string;
    maximizeTitle: string;
    closeFullscreen: string;
    zoomIn: string;
    zoomOut: string;
    zoomReset: string;
  };
  overview: {
    kpiNormsTitle: string;
    kpiNormsBadge: string;
    kpiNormsFooter: string;
    kpiAssetsTitle: string;
    kpiAssetsCompliant: string;
    kpiAssetsSynced: string;
    kpiVulnsTitle: string;
    kpiVulnsBadge: string;
    kpiVulnsFooter: string;
    kpiActionsTitle: string;
    kpiActionsEscalated: string;
    kpiActionsFooter: string;
    chartDomainTitle: string;
    chartDomainSub: string;
    chartDomainTarget: string;
    chartDomainBar: string;
    chartDomainLine: string;
    chartOpsTitle: string;
    chartOpsSub: string;
    chartOpsWindow: string;
    chartOpsChanges: string;
    chartOpsIncidents: string;
    chartOpsSiem: string;
    chartVulnTitle: string;
    chartVulnSub: string;
    chartVulnLink: string;
    chartVulnRemediated: string;
    chartVulnOpen: string;
    classTableTitle: string;
    classTableSub: string;
    classTableLink: string;
    colAssetClass: string;
    colTotal: string;
    colErpCmdb: string;
    colSiemLogs: string;
    colCompliance: string;
    minutesTitle: string;
    minutesSub: string;
    registerMinute: string;
    minutePrefix: string;
    participantsWord: string;
    retentionPrefix: string;
    modalTitle: string;
    modalQuarter: string;
    modalQuarterDefault: string;
    modalParticipants: string;
    modalSummary: string;
    modalSummaryPlaceholder: string;
    modalDecisions: string;
    modalDecisionsPlaceholder: string;
    modalDefaultDecision: string;
    modalCancel: string;
    modalSave: string;
    retentionSuffix: string;
  };
  studio: {
    title: string;
    subtitle: string;
    modeSimulate: string;
    modeExplore: string;
    stepsWord: string;
    highlightDomain: string;
    allCount: string;
    graphTitle: string;
    simPrefix: string;
    stepLabel: string;
    explorePrefix: string;
    legendGov: string;
    legendOps: string;
    legendSec: string;
    legendChange: string;
    legendData: string;
    pause: string;
    play: string;
    prevStep: string;
    nextStep: string;
    restart: string;
    layer1: string;
    layer2: string;
    layer3: string;
    layer4: string;
    originBadge: string;
    targetBadge: string;
    artifactLabel: string;
    slaLabel: string;
    readBtn: string;
    openBtn: string;
    cadenceLabel: string;
    ownerLabel: string;
    incomingTitle: string;
    topDirectiveMsg: string;
    outgoingTitle: string;
    noOutgoingMsg: string;
    openFullNorm: string;
  };
  simulator: {
    title: string;
    subtitle: string;
    simulateBtn: string;
    fullViewBtn: string;
    fullViewTitle: string;
    step1Label: string;
    step2Label: string;
    zoneLabel: string;
    criticalityLabel: string;
    ownerShort: string;
    kpiAssetsTitle: string;
    kpiAssetsDirect: string;
    kpiAssetsCascade: string;
    kpiPlantsTitle: string;
    kpiPlantsStop: string;
    kpiSystemsTitle: string;
    kpiSystemsSub: string;
    kpiCabTitle: string;
    kpiCabRequired: string;
    kpiCabWaived: string;
    graphTitlePrefix: string;
    affectedAssetsWord: string;
    plantsWord: string;
    systemsWord: string;
    stageLabel: string;
    colOrigin: string;
    colDirect: string;
    colCascade: string;
    colPlants: string;
    clickToSimulate: string;
    cascadeTag: string;
    viaLabel: string;
    originWord: string;
    chainTitle: string;
    noPropagation: string;
    hop1Label: string;
    hop2Prefix: string;
    simulateThis: string;
    systemsTitle: string;
    verdictHeader: string;
    controlsTitle: string;
    triggeredNormsTitle: string;
    otAssetFallback: string;
  };
  procedure: {
    collapseFull: string;
    readFull: string;
    copied: string;
    copyMd: string;
    downloadMd: string;
    ownerPrimaryTitle: string;
    ownerPrimaryDesc: string;
    approverTitle: string;
    executingTitle: string;
    stakeholdersTitle: string;
    fullDocBadge: string;
    closeFullDoc: string;
    techNote: string;
    opsNote: string;
    controlledRecords: string;
    recColRecord: string;
    recColId: string;
    recColStorage: string;
    recColAccess: string;
    recColRetention: string;
    summaryCardTitle: string;
    artifactsTitle: string;
    referencesTitle: string;
    corrTitlePrefix: string;
    corrSubIn: string;
    corrSubOut: string;
    corrSubClick: string;
    corrMapHeader: string;
    inShort: string;
    outShort: string;
    svgInputs: string;
    svgFocus: string;
    svgOutputs: string;
    receivesFrom: string;
    topDirectiveInfo: string;
    triggersFeeds: string;
    noDirectOutputs: string;
  };
  assets: {
    title: string;
    subtitle: string;
    addBtn: string;
    searchPlaceholder: string;
    allClasses: string;
    allPhases: string;
    showingCount: string;
    ofWord: string;
    assetsWord: string;
    colTagAsset: string;
    colClass: string;
    colPhase: string;
    colErpCmdb: string;
    colGates: string;
    colStatus: string;
    critShort: string;
    ownerShort: string;
    pgaActive: string;
    pgaPending: string;
    checklistTitle: string;
    pendingAlert: string;
    modalTitle: string;
    fieldTag: string;
    fieldTagPlaceholder: string;
    fieldClass: string;
    fieldDesc: string;
    fieldDescPlaceholder: string;
    fieldNature: string;
    fieldPhase: string;
    fieldCriticality: string;
    fieldZone: string;
    fieldOwner: string;
    cancel: string;
    save: string;
    gates: {
      homologated: string;
      defaultPasswordsChanged: string;
      hardeningApplied: string;
      vulnerabilityScanOk: string;
      erpAndCmdbSynced: string;
      siemLogsEnabled: string;
    };
  };
  compliance: {
    title: string;
    subtitle: string;
    newActionBtn: string;
    tabGvt: string;
    tabActions: string;
    tabAudits: string;
    safeSeqTitle: string;
    safeSeqBody: string;
    safeSeqExcludedStrong: string;
    safeSeqExcludedRest: string;
    colCveAsset: string;
    colSeverity: string;
    colSla: string;
    colTeam: string;
    colStage: string;
    colAction: string;
    tdiBadge: string;
    doneBadge: string;
    advanceBtn: string;
    escalatedBadge: string;
    ownerShort: string;
    dueLabel: string;
    checkedLabel: string;
    deviationsLabel: string;
    secIncLabel: string;
    modalTitle: string;
    fieldCorrective: string;
    fieldCorrectivePlaceholder: string;
    fieldAsset: string;
    fieldOriginNorm: string;
    fieldDeviation: string;
    fieldRdm: string;
    fieldOwner: string;
    fieldDue: string;
    escalateCheckbox: string;
    cancel: string;
    createBtn: string;
    normOptions: Record<string, string>;
  };
  governance: {
    title: string;
    subtitle: string;
    tabPhysical: string;
    tabContinuity: string;
    tabRoles: string;
    physicalTitle: string;
    physicalSub: string;
    colPerimeter: string;
    colCriticality: string;
    colNr10: string;
    colControls: string;
    colAuthorized: string;
    colStatus: string;
    mandatory: string;
    na: string;
    continuityTitle: string;
    continuitySub: string;
    colCritClass: string;
    colRtoRpo: string;
    colRedundancy: string;
    colLastTest: string;
    colNextDue: string;
    colTestStatus: string;
    rolesTitle: string;
    rolesSub: string;
    colRole: string;
    colGroup: string;
    colCadence: string;
    colResp: string;
    colLinkedNorms: string;
  };
  markdown: {
    revision: string;
    domain: string;
    cadence: string;
    owner: string;
    references: string;
    note: string;
    controlledRecords: string;
    recHeaders: [string, string, string, string, string, string];
    compendiumTitle: string;
    compendiumTotal: string;
    compendiumNote: string;
    compendiumFilename: string;
  };
}

export const UI_STRINGS: Record<Locale, UiDictionary> = {
  pt: {
    appTitle: 'IAGS — Industrial Automation Governance Studio',
    appSubtitle: 'Industrial Automation Governance Studio (IAGS)',
    backToDashboardAria: 'Voltar ao Dashboard Executivo IAGS',
    openNavAria: 'Abrir navegação',
    closeNavAria: 'Fechar navegação',
    themeLight: 'Claro',
    themeDark: 'Escuro',
    switchToLightAria: 'Alternar para tema claro',
    switchToDarkAria: 'Alternar para tema escuro',
    languageLabel: 'Idioma',
    sidebar: {
      studioSection: 'Estúdio & Operação',
      proceduresSection: 'Procedimentos',
      exportAllTitle: 'Exportar todas as 15 normas em Markdown',
      filterPlaceholder: 'Filtrar norma...',
      standardsFooter: 'ISA/IEC 62443-2-1 · ISO 27001 · NIST 800-92',
    },
    nav: {
      overview: { label: 'Dashboard Executivo', subtitle: 'KPIs, gráficos & atas' },
      studio: { label: 'Mapa Interativo', subtitle: 'Animação das 15 normas' },
      simulator: { label: 'Simulador de Impacto', subtitle: 'Ativos, plantas & sistemas' },
      assets: { label: 'Ativos OT (CMDB)', subtitle: 'Ciclo de vida & gates' },
      compliance: { label: 'Vulnerab. & Auditorias', subtitle: 'GVT, GCT & planos RDM' },
      governance: { label: 'Controles & Papéis', subtitle: 'Física, DRP & matriz' },
    },
    graphFrame: {
      maximize: 'Maximizar',
      maximizeTitle: 'Maximizar grafo em tela cheia',
      closeFullscreen: 'Fechar Tela Cheia (Esc)',
      zoomIn: 'Ampliar zoom',
      zoomOut: 'Reduzir zoom',
      zoomReset: 'Resetar zoom para 100%',
    },
    overview: {
      kpiNormsTitle: 'Arquitetura Normativa IAGS',
      kpiNormsBadge: '100% estruturadas',
      kpiNormsFooter: 'domínios · ISA/IEC 62443-2-1 & ISO 27001',
      kpiAssetsTitle: 'Conformidade Ativos OT',
      kpiAssetsCompliant: 'conformes',
      kpiAssetsSynced: 'sincronizados ERP ↔ CMDB ↔ PGA',
      kpiVulnsTitle: 'CVEs Críticas & Altas (GVT)',
      kpiVulnsBadge: 'em remediação',
      kpiVulnsFooter: 'Metas IAGS-10: Crítica 60d · Alta 90d',
      kpiActionsTitle: 'Planos de Ação & RDMs',
      kpiActionsEscalated: 'escalado SI',
      kpiActionsFooter: 'Execução controlada via CAB / IAGS-03',
      chartDomainTitle: 'Índice de Conformidade por Domínio IAGS (%)',
      chartDomainSub: 'Aderência atual frente à meta corporativa nos 6 macrodomínios',
      chartDomainTarget: 'Meta ≥ 90%',
      chartDomainBar: 'Conformidade Atual (%)',
      chartDomainLine: 'Meta IAGS (%)',
      chartOpsTitle: 'Pulso Operacional OT — Mudanças, Incidentes & SIEM',
      chartOpsSub: 'Evolução mensal integrada de IAGS-03 (RDM), IAGS-04 (INC) e IAGS-15 (Alertas)',
      chartOpsWindow: 'Últimos 6 meses',
      chartOpsChanges: 'Mudanças (RDM)',
      chartOpsIncidents: 'Incidentes OT',
      chartOpsSiem: 'Alertas SI (SIEM)',
      chartVulnTitle: 'Vulnerabilidades por Janela SLA (IAGS-10)',
      chartVulnSub: 'Ciclo anual de remediação por severidade CVSS',
      chartVulnLink: 'Ver GVT',
      chartVulnRemediated: 'Remediadas no Prazo',
      chartVulnOpen: 'Em Tratamento',
      classTableTitle: 'Cobertura das 6 Classes Críticas de Ativos (IAGS-02)',
      classTableSub: 'Conciliação em tempo real entre Inventário, CMDB e Coleta SIEM/NTP',
      classTableLink: 'Gerenciar Ativos',
      colAssetClass: 'Classe de Ativo',
      colTotal: 'Total',
      colErpCmdb: 'ERP/CMDB',
      colSiemLogs: 'Logs SIEM',
      colCompliance: 'Conformidade',
      minutesTitle: 'Atas do Comitê de Governança IAGS (Registro Controlado · IAGS-01)',
      minutesSub: 'Reuniões trimestrais com papel fiscalizador · Retenção ativa de 3 anos + arquivamento histórico',
      registerMinute: 'Registrar Ata',
      minutePrefix: 'Ata',
      participantsWord: 'participantes',
      retentionPrefix: 'Retenção:',
      modalTitle: 'Registrar Nova Ata — Comitê de Governança IAGS',
      modalQuarter: 'Trimestre / Referência',
      modalQuarterDefault: '4º Trimestre 2026',
      modalParticipants: 'Participantes',
      modalSummary: 'Resumo Executivo da Reunião',
      modalSummaryPlaceholder: 'Ex.: Revisão de auditorias OT, status de vulnerabilidades críticas e deliberações de continuidade...',
      modalDecisions: 'Deliberações Principais (uma por linha)',
      modalDecisionsPlaceholder: 'Ex.: Aprovada janela de parada para patch SCADA...',
      modalDefaultDecision: 'Deliberações registradas para acompanhamento no próximo ciclo do Comitê IAGS.',
      modalCancel: 'Cancelar',
      modalSave: 'Salvar Ata (Retenção 3 Anos)',
      retentionSuffix: '(3 anos + histórico)',
    },
    studio: {
      title: 'Mapa Interativo & Simulação de Fluxos (15 Procedimentos)',
      subtitle: 'Visualize as dependências reais entre normas IAGS-01 a IAGS-15 ou reproduza cenários operacionais e cibernéticos ponta a ponta.',
      modeSimulate: 'Simulação Animada',
      modeExplore: 'Explorar Dependências',
      stepsWord: 'etapas',
      highlightDomain: 'Destacar domínio:',
      allCount: 'Todos (15)',
      graphTitle: 'Mapa Interativo de Procedimentos IAGS (IAGS-01 a IAGS-15)',
      simPrefix: 'Simulação:',
      stepLabel: 'Etapa',
      explorePrefix: 'Exploração:',
      legendGov: 'Governança',
      legendOps: 'Operacional',
      legendSec: 'Segurança / SI',
      legendChange: 'Mudança (RDM)',
      legendData: 'Dados / CMDB',
      pause: 'Pausar',
      play: 'Reproduzir',
      prevStep: 'Etapa anterior',
      nextStep: 'Próxima etapa',
      restart: 'Reiniciar simulação',
      layer1: 'CAMADA 1 · DIREÇÃO & GOVERNANÇA',
      layer2: 'CAMADA 2 · NÚCLEO DE ATIVOS, CENTRAL SPOC & CATÁLOGO',
      layer3: 'CAMADA 3 · ENTREGA OPERACIONAL, MUDANÇAS & ACESSO LÓGICO',
      layer4: 'CAMADA 4 · CIBERSEGURANÇA, SOC/SIEM, RESILIÊNCIA, FÍSICA & PAM',
      originBadge: 'ORIGEM',
      targetBadge: 'DESTINO',
      artifactLabel: 'Registro / Artefato:',
      slaLabel: 'Regra / SLA:',
      readBtn: 'Ler',
      openBtn: 'Abrir',
      cadenceLabel: 'Cadência:',
      ownerLabel: 'Dono:',
      incomingTitle: 'Entradas / Gatilhos Recebidos',
      topDirectiveMsg: 'Norma diretriz de topo (origem de governança).',
      outgoingTitle: 'Saídas / Processos Acionados',
      noOutgoingMsg: 'Sem saídas diretas adicionais mapeadas.',
      openFullNorm: 'Abrir Norma Completa',
    },
    simulator: {
      title: 'Simulador de Impacto de Mudanças em Ativos, Plantas & Sistemas',
      subtitle: 'Selecione um ativo OT (CLP, Nobreak, Firewall, Switch, SCADA) e o tipo de intervenção para simular o raio de propagação antes de abrir uma RDM (IAGS-03).',
      simulateBtn: 'Simular Propagação',
      fullViewBtn: 'Visão Total',
      fullViewTitle: 'Exibir impacto completo',
      step1Label: '1. Ativo Alvo da Mudança / Evento',
      step2Label: '2. Cenário de Mudança ou Evento Simulado',
      zoneLabel: 'Zona:',
      criticalityLabel: 'Criticidade:',
      ownerShort: 'Resp.:',
      kpiAssetsTitle: 'Outros Ativos Afetados',
      kpiAssetsDirect: 'diretos',
      kpiAssetsCascade: 'cascata',
      kpiPlantsTitle: 'Plantas / Unidades Impactadas',
      kpiPlantsStop: 'parada total',
      kpiSystemsTitle: 'Sistemas & Serviços OT',
      kpiSystemsSub: 'camadas impactadas',
      kpiCabTitle: 'Aprovação CAB-Automação',
      kpiCabRequired: 'Obrigatória',
      kpiCabWaived: 'Dispensada / Emerg.',
      graphTitlePrefix: 'Topologia de Propagação de Impacto —',
      affectedAssetsWord: 'ativos afetados',
      plantsWord: 'plantas',
      systemsWord: 'sistemas',
      stageLabel: 'Estágio',
      colOrigin: 'T+0 · ATIVO ORIGEM',
      colDirect: 'T+1 · IMPACTO DIRETO',
      colCascade: 'T+2 · EFEITO CASCATA',
      colPlants: 'T+3 · PLANTAS AFETADAS',
      clickToSimulate: 'Clique para simular a partir daqui',
      cascadeTag: 'Cascata',
      viaLabel: 'Via',
      originWord: 'Origem:',
      chainTitle: 'Cadeia de Ativos Impactados',
      noPropagation: 'Nenhum outro ativo OT sofre propagação direta para este tipo de intervenção isolada.',
      hop1Label: '1º Grau (Direto)',
      hop2Prefix: '2º Grau (via',
      simulateThis: 'Simular este',
      systemsTitle: 'Sistemas & Serviços Operacionais Afetados',
      verdictHeader: 'Parecer Automático de Governança IAGS',
      controlsTitle: 'Controles Obrigatórios Antes da Execução',
      triggeredNormsTitle: 'Procedimentos IAGS Acionados Nesta Mudança',
      otAssetFallback: 'Ativo OT',
    },
    procedure: {
      collapseFull: 'Recolher Texto Integral',
      readFull: 'Ler Norma na Íntegra',
      copied: 'Copiado',
      copyMd: 'Copiar .md',
      downloadMd: 'Baixar .md',
      ownerPrimaryTitle: 'Responsável Principal (Dono)',
      ownerPrimaryDesc: 'Responde pela eficácia, KPIs e revisão periódica',
      approverTitle: 'Aprovador / Fiscalizador',
      executingTitle: 'Equipes Executoras',
      stakeholdersTitle: 'Interfaces & Partes Envolvidas',
      fullDocBadge: 'Documento Normativo na Íntegra',
      closeFullDoc: 'Fechar Leitura Integral',
      techNote: 'Nota Técnica:',
      opsNote: 'Nota Operacional:',
      controlledRecords: 'Registros Controlados',
      recColRecord: 'Registro',
      recColId: 'Identificação',
      recColStorage: 'Armazenamento',
      recColAccess: 'Controle de Acesso',
      recColRetention: 'Retenção',
      summaryCardTitle: 'Resumo Operacional & Regras-Chave',
      artifactsTitle: 'Artefatos & Evidências Obrigatórias',
      referencesTitle: 'Referências Normativas',
      corrTitlePrefix: 'Correlações de',
      corrSubIn: 'entradas recebidas',
      corrSubOut: 'processos acionados',
      corrSubClick: 'Clique em qualquer nó para abrir',
      corrMapHeader: 'Mapa de Correlações',
      inShort: 'entradas',
      outShort: 'saídas',
      svgInputs: 'ENTRADAS / GATILHOS',
      svgFocus: 'PROCEDIMENTO EM FOCO',
      svgOutputs: 'SAÍDAS / ACIONAMENTOS',
      receivesFrom: 'Recebe Entradas De',
      topDirectiveInfo: 'Esta norma atua como diretriz estratégica de topo do ecossistema IAGS.',
      triggersFeeds: 'Aciona / Alimenta',
      noDirectOutputs: 'Não possui saídas diretas adicionais mapeadas para outras normas.',
    },
    assets: {
      title: 'Inventário OT, CMDB & Portões de Segurança (IAGS-02)',
      subtitle: 'Controle de ciclo de vida das 6 classes críticas, sincronia ERP/EAM ↔ CMDB ↔ PGA e validação interativa dos portões de cibersegurança.',
      addBtn: 'Cadastrar Ativo OT',
      searchPlaceholder: 'Filtrar tag, ERP, CMDB, responsável...',
      allClasses: 'Todas as Classes (6)',
      allPhases: 'Todas as Fases',
      showingCount: 'Exibindo',
      ofWord: 'de',
      assetsWord: 'ativos',
      colTagAsset: 'Tag / Ativo',
      colClass: 'Classe',
      colPhase: 'Fase',
      colErpCmdb: 'ERP / CMDB',
      colGates: 'Portões',
      colStatus: 'Situação',
      critShort: 'Crit.',
      ownerShort: 'Resp.:',
      pgaActive: 'Ativo',
      pgaPending: 'Pendente',
      checklistTitle: 'Checklist de Portões de Segurança',
      pendingAlert: 'Ativo com portões pendentes exige Plano de Ação formal via RDM (IAGS-03). Marque todos os 6 portões após regularização para atualizar a conformidade global.',
      modalTitle: 'Cadastrar Novo Ativo Crítico OT (CMDB / PGA)',
      fieldTag: 'Tag Técnica',
      fieldTagPlaceholder: 'Ex.: CLP-UTIL-305',
      fieldClass: 'Classe IAGS-02',
      fieldDesc: 'Descrição do Ativo',
      fieldDescPlaceholder: 'Ex.: Controlador Redundante — Estação de Bombeamento',
      fieldNature: 'Natureza',
      fieldPhase: 'Fase',
      fieldCriticality: 'Criticidade',
      fieldZone: 'Zona / Local',
      fieldOwner: 'Responsável',
      cancel: 'Cancelar',
      save: 'Salvar no CMDB',
      gates: {
        homologated: 'Homologação Prévia Aprovada',
        defaultPasswordsChanged: 'Senhas Padrão / Integrador Trocadas',
        hardeningApplied: 'Hardening conforme Baseline',
        vulnerabilityScanOk: 'Varredura de Vulnerabilidades Validada',
        erpAndCmdbSynced: 'Sincronia ERP/EAM ↔ CMDB (ITSM)',
        siemLogsEnabled: 'Coleta de Logs SIEM & NTP Ativa',
      },
    },
    compliance: {
      title: 'Vulnerabilidades (GVT/GCT), Auditorias & Planos de Ação',
      subtitle: 'Acompanhamento de SLAs CVSS (60/90/120/180d — IAGS-10), sequência segura de patching OT, auditorias periódicas (IAGS-02) e remediação via RDM (IAGS-03).',
      newActionBtn: 'Novo Plano de Ação (RDM)',
      tabGvt: 'Vulnerabilidades & Patching',
      tabActions: 'Planos de Ação & RDM',
      tabAudits: 'Auditorias Semestrais / Bienais / GCT',
      safeSeqTitle: 'Sequência Segura de Atualização OT (IAGS-10):',
      safeSeqBody: 'Homologação do Fabricante → Teste Off-line → Aplicação em Stand-by → Produção via RDM.',
      safeSeqExcludedStrong: 'CLPs/Remotas e Nobreaks Industriais',
      safeSeqExcludedRest: 'são excluídos de testes ativos TDI/TDE por segurança de planta.',
      colCveAsset: 'CVE / Ativo',
      colSeverity: 'Severidade / CVSS',
      colSla: 'Consumo SLA',
      colTeam: 'Equipe',
      colStage: 'Estágio de Patching',
      colAction: 'Ação',
      tdiBadge: '[Excluído TDI/TDE]',
      doneBadge: 'Concluída',
      advanceBtn: 'Avançar Etapa',
      escalatedBadge: 'Escalado SI Industrial',
      ownerShort: 'Resp.:',
      dueLabel: 'Prazo:',
      checkedLabel: 'Verificados',
      deviationsLabel: 'Desvios',
      secIncLabel: 'Inc. SI',
      modalTitle: 'Registrar Plano de Ação de Não Conformidade (via RDM)',
      fieldCorrective: 'Descrição da Ação Corretiva',
      fieldCorrectivePlaceholder: 'Ex.: Aplicar patch homologado e atualizar baseline...',
      fieldAsset: 'Ativo Afetado',
      fieldOriginNorm: 'Norma Origem',
      fieldDeviation: 'Tipo de Desvio',
      fieldRdm: 'RDM Vinculada',
      fieldOwner: 'Responsável',
      fieldDue: 'Prazo Limite',
      escalateCheckbox: 'Escalonar como Incidente de SI (Software ilegal, acesso indevido ou furto)',
      cancel: 'Cancelar',
      createBtn: 'Criar Plano de Ação',
      normOptions: {
        'IAGS-02': 'IAGS-02 (Ativos)',
        'IAGS-08': 'IAGS-08 (Acesso Lógico)',
        'IAGS-09': 'IAGS-09 (PAM)',
        'IAGS-10': 'IAGS-10 (Vulnerab./GCT)',
        'IAGS-12': 'IAGS-12 (Seg. Física)',
        'IAGS-13': 'IAGS-13 (Proteção HW)',
      },
    },
    governance: {
      title: 'Controles de Segurança Física, Continuidade & Papéis',
      subtitle: 'Perímetros industriais (IAGS-12), prontidão de recuperação DRP/RTO (IAGS-11) e segregação de funções organizacionais (IAGS-01).',
      tabPhysical: 'Segurança Física (IAGS-12)',
      tabContinuity: 'Continuidade DRP/RTO (IAGS-11)',
      tabRoles: 'Matriz de Papéis (IAGS-01)',
      physicalTitle: 'Classificação de Perímetros Físicos e Controle de Autorizados (IAGS-12)',
      physicalSub: '7 domínios de proteção física/ambiental · Revisão anual sincronizada com Offboarding e acessos permanentes, temporários e pontuais.',
      colPerimeter: 'Perímetro / Instalação',
      colCriticality: 'Criticidade',
      colNr10: 'NR-10',
      colControls: 'Controles Ativos',
      colAuthorized: 'Autorizados',
      colStatus: 'Situação',
      mandatory: 'Obrigatória',
      na: 'N/A',
      continuityTitle: 'Prontidão de Continuidade da Infraestrutura Crítica (IAGS-11)',
      continuitySub: '5 classes prioritárias de DRP/PCN · Testes práticos bienais alinhados a paradas programadas e análise crítica anual.',
      colCritClass: 'Classe Crítica',
      colRtoRpo: 'RTO / RPO',
      colRedundancy: 'Arquitetura de Redundância & Kit',
      colLastTest: 'Último Teste',
      colNextDue: 'Próximo Limite',
      colTestStatus: 'Status',
      rolesTitle: 'Matriz de Papéis, Funções e Governança Organizacional (IAGS-01)',
      rolesSub: 'Segregação de responsabilidades entre Comitê IAGS, Central de Serviços, Equipe de Automação e áreas parceiras.',
      colRole: 'Papel',
      colGroup: 'Função',
      colCadence: 'Cadência',
      colResp: 'Atribuições Principais',
      colLinkedNorms: 'Normas Vinculadas',
    },
    markdown: {
      revision: 'Revisão',
      domain: 'Domínio',
      cadence: 'Cadência',
      owner: 'Responsável',
      references: 'Referências Normativas',
      note: 'Nota',
      controlledRecords: 'Registros Controlados',
      recHeaders: ['Registro', 'Identificação', 'Armazenamento', 'Controle de Acesso', 'Retenção', 'Disposição'],
      compendiumTitle: '# Industrial Automation Governance Studio (IAGS) — Compêndio Normativo Completo',
      compendiumTotal: 'Total de Procedimentos Integrados: 15 (IAGS-01 a IAGS-15)',
      compendiumNote: 'Normas estruturadas em padrão corporativo neutro de Governança de Cibersegurança OT.',
      compendiumFilename: 'IAGS-Compendio-Completo-15-Normas-PT.md',
    },
  },

  en: {
    appTitle: 'IAGS — Industrial Automation Governance Studio',
    appSubtitle: 'Industrial Automation Governance Studio (IAGS)',
    backToDashboardAria: 'Return to IAGS Executive Dashboard',
    openNavAria: 'Open navigation',
    closeNavAria: 'Close navigation',
    themeLight: 'Light',
    themeDark: 'Dark',
    switchToLightAria: 'Switch to light theme',
    switchToDarkAria: 'Switch to dark theme',
    languageLabel: 'Language',
    sidebar: {
      studioSection: 'Studio & Operations',
      proceduresSection: 'Procedures',
      exportAllTitle: 'Export all 15 procedures as Markdown',
      filterPlaceholder: 'Filter procedure...',
      standardsFooter: 'ISA/IEC 62443-2-1 · ISO 27001 · NIST 800-92',
    },
    nav: {
      overview: { label: 'Executive Dashboard', subtitle: 'KPIs, charts & minutes' },
      studio: { label: 'Interactive Map', subtitle: '15-procedure animation' },
      simulator: { label: 'Impact Simulator', subtitle: 'Assets, plants & systems' },
      assets: { label: 'OT Assets (CMDB)', subtitle: 'Lifecycle & gates' },
      compliance: { label: 'Vulns & Audits', subtitle: 'TVM, TCM & RFC plans' },
      governance: { label: 'Controls & Roles', subtitle: 'Physical, DRP & matrix' },
    },
    graphFrame: {
      maximize: 'Maximize',
      maximizeTitle: 'Maximize graph to fullscreen',
      closeFullscreen: 'Exit Fullscreen (Esc)',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      zoomReset: 'Reset zoom to 100%',
    },
    overview: {
      kpiNormsTitle: 'IAGS Normative Architecture',
      kpiNormsBadge: '100% structured',
      kpiNormsFooter: 'domains · ISA/IEC 62443-2-1 & ISO 27001',
      kpiAssetsTitle: 'OT Asset Compliance',
      kpiAssetsCompliant: 'compliant',
      kpiAssetsSynced: 'synced ERP ↔ CMDB ↔ AMP',
      kpiVulnsTitle: 'Critical & High CVEs (TVM)',
      kpiVulnsBadge: 'in remediation',
      kpiVulnsFooter: 'IAGS-10 SLAs: Critical 60d · High 90d',
      kpiActionsTitle: 'Action Plans & RFCs',
      kpiActionsEscalated: 'escalated SecOps',
      kpiActionsFooter: 'Controlled execution via CAB / IAGS-03',
      chartDomainTitle: 'Compliance Index by IAGS Domain (%)',
      chartDomainSub: 'Current adherence versus corporate target across 6 macro-domains',
      chartDomainTarget: 'Target ≥ 90%',
      chartDomainBar: 'Current Compliance (%)',
      chartDomainLine: 'IAGS Target (%)',
      chartOpsTitle: 'OT Operational Pulse — Changes, Incidents & SIEM',
      chartOpsSub: 'Integrated monthly trend for IAGS-03 (RFC), IAGS-04 (INC), and IAGS-15 (Alerts)',
      chartOpsWindow: 'Last 6 months',
      chartOpsChanges: 'Changes (RFC)',
      chartOpsIncidents: 'OT Incidents',
      chartOpsSiem: 'Security Alerts (SIEM)',
      chartVulnTitle: 'Vulnerabilities by SLA Window (IAGS-10)',
      chartVulnSub: 'Annual remediation cycle by CVSS severity',
      chartVulnLink: 'View TVM',
      chartVulnRemediated: 'Remediated On Time',
      chartVulnOpen: 'In Progress',
      classTableTitle: 'Coverage Across 6 Critical Asset Classes (IAGS-02)',
      classTableSub: 'Real-time reconciliation across Inventory, CMDB, and SIEM/NTP telemetry',
      classTableLink: 'Manage Assets',
      colAssetClass: 'Asset Class',
      colTotal: 'Total',
      colErpCmdb: 'ERP/CMDB',
      colSiemLogs: 'SIEM Logs',
      colCompliance: 'Compliance',
      minutesTitle: 'IAGS Governance Committee Minutes (Controlled Record · IAGS-01)',
      minutesSub: 'Quarterly oversight meetings · 3-year active retention + historical archiving',
      registerMinute: 'Log Minute',
      minutePrefix: 'Minute',
      participantsWord: 'participants',
      retentionPrefix: 'Retention:',
      modalTitle: 'Log New Minute — IAGS Governance Committee',
      modalQuarter: 'Quarter / Reference',
      modalQuarterDefault: 'Q4 2026',
      modalParticipants: 'Participants',
      modalSummary: 'Executive Meeting Summary',
      modalSummaryPlaceholder: 'E.g., OT audit review, critical vulnerability status, and continuity resolutions...',
      modalDecisions: 'Key Decisions (one per line)',
      modalDecisionsPlaceholder: 'E.g., Approved outage window for SCADA patch...',
      modalDefaultDecision: 'Resolutions logged for follow-up in the next IAGS Committee cycle.',
      modalCancel: 'Cancel',
      modalSave: 'Save Minute (3-Year Retention)',
      retentionSuffix: '(3 years + archive)',
    },
    studio: {
      title: 'Interactive Map & Workflow Simulation (15 Procedures)',
      subtitle: 'Explore real dependencies across IAGS-01 through IAGS-15 or play end-to-end operational and cybersecurity scenarios.',
      modeSimulate: 'Animated Simulation',
      modeExplore: 'Explore Dependencies',
      stepsWord: 'steps',
      highlightDomain: 'Highlight domain:',
      allCount: 'All (15)',
      graphTitle: 'IAGS Interactive Procedures Map (IAGS-01 to IAGS-15)',
      simPrefix: 'Simulation:',
      stepLabel: 'Step',
      explorePrefix: 'Exploring:',
      legendGov: 'Governance',
      legendOps: 'Operational',
      legendSec: 'Security / IS',
      legendChange: 'Change (RFC)',
      legendData: 'Data / CMDB',
      pause: 'Pause',
      play: 'Play',
      prevStep: 'Previous step',
      nextStep: 'Next step',
      restart: 'Restart simulation',
      layer1: 'LAYER 1 · DIRECTION & GOVERNANCE',
      layer2: 'LAYER 2 · ASSET CORE, SPOC SERVICE DESK & CATALOG',
      layer3: 'LAYER 3 · SERVICE DELIVERY, CHANGES & LOGICAL ACCESS',
      layer4: 'LAYER 4 · CYBERSECURITY, SOC/SIEM, RESILIENCE, PHYSICAL & PAM',
      originBadge: 'SOURCE',
      targetBadge: 'TARGET',
      artifactLabel: 'Record / Artifact:',
      slaLabel: 'Rule / SLA:',
      readBtn: 'Read',
      openBtn: 'Open',
      cadenceLabel: 'Cadence:',
      ownerLabel: 'Owner:',
      incomingTitle: 'Incoming Triggers / Inputs',
      topDirectiveMsg: 'Top-level strategic directive (governance origin).',
      outgoingTitle: 'Outgoing / Triggered Processes',
      noOutgoingMsg: 'No additional direct outgoing triggers mapped.',
      openFullNorm: 'Open Full Procedure',
    },
    simulator: {
      title: 'Change Impact Simulator — OT Assets, Plants & Systems',
      subtitle: 'Select an OT asset (PLC, UPS, Firewall, Switch, SCADA) and intervention type to simulate blast radius before raising an RFC (IAGS-03).',
      simulateBtn: 'Simulate Propagation',
      fullViewBtn: 'Full View',
      fullViewTitle: 'Show complete impact',
      step1Label: '1. Target Asset for Change / Event',
      step2Label: '2. Simulated Change or Event Scenario',
      zoneLabel: 'Zone:',
      criticalityLabel: 'Criticality:',
      ownerShort: 'Owner:',
      kpiAssetsTitle: 'Other Affected Assets',
      kpiAssetsDirect: 'direct',
      kpiAssetsCascade: 'cascade',
      kpiPlantsTitle: 'Impacted Plants / Units',
      kpiPlantsStop: 'full shutdown',
      kpiSystemsTitle: 'OT Systems & Services',
      kpiSystemsSub: 'impacted layers',
      kpiCabTitle: 'OT-CAB Approval',
      kpiCabRequired: 'Mandatory',
      kpiCabWaived: 'Waived / Emerg.',
      graphTitlePrefix: 'Impact Propagation Topology —',
      affectedAssetsWord: 'affected assets',
      plantsWord: 'plants',
      systemsWord: 'systems',
      stageLabel: 'Stage',
      colOrigin: 'T+0 · SOURCE ASSET',
      colDirect: 'T+1 · DIRECT IMPACT',
      colCascade: 'T+2 · CASCADE EFFECT',
      colPlants: 'T+3 · IMPACTED PLANTS',
      clickToSimulate: 'Click to simulate from here',
      cascadeTag: 'Cascade',
      viaLabel: 'Via',
      originWord: 'Source:',
      chainTitle: 'Impacted Asset Chain',
      noPropagation: 'No other OT asset suffers direct propagation for this isolated intervention.',
      hop1Label: '1st Hop (Direct)',
      hop2Prefix: '2nd Hop (via',
      simulateThis: 'Simulate this',
      systemsTitle: 'Impacted Operational Systems & Services',
      verdictHeader: 'Automated IAGS Governance Assessment',
      controlsTitle: 'Mandatory Pre-Execution Controls',
      triggeredNormsTitle: 'IAGS Procedures Triggered by This Change',
      otAssetFallback: 'OT Asset',
    },
    procedure: {
      collapseFull: 'Collapse Full Document',
      readFull: 'Read Full Procedure',
      copied: 'Copied',
      copyMd: 'Copy .md',
      downloadMd: 'Download .md',
      ownerPrimaryTitle: 'Primary Owner (Accountable)',
      ownerPrimaryDesc: 'Accountable for effectiveness, KPIs, and periodic review',
      approverTitle: 'Approver / Oversight',
      executingTitle: 'Executing Teams',
      stakeholdersTitle: 'Interfaces & Stakeholders',
      fullDocBadge: 'Full Normative Procedure',
      closeFullDoc: 'Close Full Reader',
      techNote: 'Technical Note:',
      opsNote: 'Operational Note:',
      controlledRecords: 'Controlled Records',
      recColRecord: 'Record',
      recColId: 'Identification',
      recColStorage: 'Storage',
      recColAccess: 'Access Control',
      recColRetention: 'Retention',
      summaryCardTitle: 'Operational Summary & Key Rules',
      artifactsTitle: 'Mandatory Artifacts & Evidence',
      referencesTitle: 'Normative References',
      corrTitlePrefix: 'Correlations for',
      corrSubIn: 'incoming triggers',
      corrSubOut: 'triggered processes',
      corrSubClick: 'Click any node to navigate',
      corrMapHeader: 'Correlation Map',
      inShort: 'inputs',
      outShort: 'outputs',
      svgInputs: 'INPUTS / TRIGGERS',
      svgFocus: 'PROCEDURE IN FOCUS',
      svgOutputs: 'OUTPUTS / TRIGGERS',
      receivesFrom: 'Receives Inputs From',
      topDirectiveInfo: 'This procedure serves as the top-level strategic directive of the IAGS ecosystem.',
      triggersFeeds: 'Triggers / Feeds',
      noDirectOutputs: 'No additional direct outgoing links mapped to other procedures.',
    },
    assets: {
      title: 'OT Inventory, CMDB & Security Gates (IAGS-02)',
      subtitle: 'Lifecycle control across 6 critical asset classes, ERP/EAM ↔ CMDB ↔ AMP sync, and interactive cybersecurity gate validation.',
      addBtn: 'Register OT Asset',
      searchPlaceholder: 'Filter tag, ERP, CMDB, owner...',
      allClasses: 'All Classes (6)',
      allPhases: 'All Phases',
      showingCount: 'Showing',
      ofWord: 'of',
      assetsWord: 'assets',
      colTagAsset: 'Tag / Asset',
      colClass: 'Class',
      colPhase: 'Phase',
      colErpCmdb: 'ERP / CMDB',
      colGates: 'Gates',
      colStatus: 'Status',
      critShort: 'Crit.',
      ownerShort: 'Owner:',
      pgaActive: 'Active',
      pgaPending: 'Pending',
      checklistTitle: 'Security Gates Checklist',
      pendingAlert: 'Assets with pending security gates require a formal Action Plan via RFC (IAGS-03). Check all 6 gates once remediated to update global compliance.',
      modalTitle: 'Register New Critical OT Asset (CMDB / AMP)',
      fieldTag: 'Technical Tag',
      fieldTagPlaceholder: 'E.g., PLC-UTIL-305',
      fieldClass: 'IAGS-02 Class',
      fieldDesc: 'Asset Description',
      fieldDescPlaceholder: 'E.g., Redundant Controller — Pumping Station',
      fieldNature: 'Nature',
      fieldPhase: 'Phase',
      fieldCriticality: 'Criticality',
      fieldZone: 'Zone / Location',
      fieldOwner: 'Owner',
      cancel: 'Cancel',
      save: 'Save to CMDB',
      gates: {
        homologated: 'Prior Technical Homologation Approved',
        defaultPasswordsChanged: 'Default / Integrator Passwords Changed',
        hardeningApplied: 'Baseline Hardening Applied',
        vulnerabilityScanOk: 'Vulnerability Scan Validated',
        erpAndCmdbSynced: 'ERP/EAM ↔ CMDB (ITSM) Synchronized',
        siemLogsEnabled: 'SIEM Log Collection & NTP Active',
      },
    },
    compliance: {
      title: 'Vulnerabilities (TVM/TCM), Audits & Action Plans',
      subtitle: 'CVSS SLA tracking (60/90/120/180d — IAGS-10), safe OT patching sequence, periodic audits (IAGS-02), and RFC remediation (IAGS-03).',
      newActionBtn: 'New Action Plan (RFC)',
      tabGvt: 'Vulnerabilities & Patching',
      tabActions: 'Action Plans & RFC',
      tabAudits: 'Semiannual / Biennial / TCM Audits',
      safeSeqTitle: 'Safe OT Patching Sequence (IAGS-10):',
      safeSeqBody: 'Vendor Approval → Off-line Test → Stand-by Deployment → Production via RFC.',
      safeSeqExcludedStrong: 'PLCs/RTUs and Industrial UPS units',
      safeSeqExcludedRest: 'are excluded from active internal/external penetration tests for plant safety.',
      colCveAsset: 'CVE / Asset',
      colSeverity: 'Severity / CVSS',
      colSla: 'SLA Burn',
      colTeam: 'Team',
      colStage: 'Patching Stage',
      colAction: 'Action',
      tdiBadge: '[Pentest Excluded]',
      doneBadge: 'Completed',
      advanceBtn: 'Advance Stage',
      escalatedBadge: 'Escalated to Industrial IS',
      ownerShort: 'Owner:',
      dueLabel: 'Due:',
      checkedLabel: 'Checked',
      deviationsLabel: 'Deviations',
      secIncLabel: 'Sec. Inc.',
      modalTitle: 'Register Non-Conformity Action Plan (via RFC)',
      fieldCorrective: 'Corrective Action Description',
      fieldCorrectivePlaceholder: 'E.g., Apply vendor-approved patch and update baseline...',
      fieldAsset: 'Affected Asset',
      fieldOriginNorm: 'Origin Procedure',
      fieldDeviation: 'Deviation Type',
      fieldRdm: 'Linked RFC',
      fieldOwner: 'Owner',
      fieldDue: 'Due Date',
      escalateCheckbox: 'Escalate as Security Incident (Unlicensed software, unauthorized access, or theft)',
      cancel: 'Cancel',
      createBtn: 'Create Action Plan',
      normOptions: {
        'IAGS-02': 'IAGS-02 (Assets)',
        'IAGS-08': 'IAGS-08 (Logical Access)',
        'IAGS-09': 'IAGS-09 (PAM)',
        'IAGS-10': 'IAGS-10 (Vulns / TCM)',
        'IAGS-12': 'IAGS-12 (Physical Sec.)',
        'IAGS-13': 'IAGS-13 (HW Protection)',
      },
    },
    governance: {
      title: 'Physical Security, Continuity & Governance Roles',
      subtitle: 'Industrial perimeters (IAGS-12), DRP/RTO recovery readiness (IAGS-11), and organizational segregation of duties (IAGS-01).',
      tabPhysical: 'Physical Security (IAGS-12)',
      tabContinuity: 'DRP/RTO Continuity (IAGS-11)',
      tabRoles: 'Roles Matrix (IAGS-01)',
      physicalTitle: 'Physical Perimeter Classification & Authorized Access Control (IAGS-12)',
      physicalSub: '7 physical/environmental protection domains · Annual review synced with HR Offboarding and permanent, temporary, and one-off badges.',
      colPerimeter: 'Perimeter / Facility',
      colCriticality: 'Criticality',
      colNr10: 'Elec. Safety',
      colControls: 'Active Controls',
      colAuthorized: 'Authorized',
      colStatus: 'Status',
      mandatory: 'Mandatory',
      na: 'N/A',
      continuityTitle: 'Critical Infrastructure Continuity Readiness (IAGS-11)',
      continuitySub: '5 priority DRP/BCP classes · Biennial practical failover drills aligned to planned outages and annual critical review.',
      colCritClass: 'Critical Class',
      colRtoRpo: 'RTO / RPO',
      colRedundancy: 'Redundancy Architecture & Kit',
      colLastTest: 'Last Drill',
      colNextDue: 'Next Due',
      colTestStatus: 'Status',
      rolesTitle: 'Organizational Roles, Functions & Governance Matrix (IAGS-01)',
      rolesSub: 'Segregation of duties across IAGS Committee, Service Desk, Automation Engineering, and partner teams.',
      colRole: 'Role',
      colGroup: 'Function',
      colCadence: 'Cadence',
      colResp: 'Key Responsibilities',
      colLinkedNorms: 'Linked Procedures',
    },
    markdown: {
      revision: 'Revision',
      domain: 'Domain',
      cadence: 'Cadence',
      owner: 'Owner',
      references: 'Normative References',
      note: 'Note',
      controlledRecords: 'Controlled Records',
      recHeaders: ['Record', 'Identification', 'Storage', 'Access Control', 'Retention', 'Disposition'],
      compendiumTitle: '# Industrial Automation Governance Studio (IAGS) — Complete Normative Compendium',
      compendiumTotal: 'Total Integrated Procedures: 15 (IAGS-01 through IAGS-15)',
      compendiumNote: 'Procedures written in a neutral corporate OT Cybersecurity Governance standard.',
      compendiumFilename: 'IAGS-Complete-Compendium-15-Procedures-EN.md',
    },
  },

  es: {
    appTitle: 'IAGS — Industrial Automation Governance Studio',
    appSubtitle: 'Industrial Automation Governance Studio (IAGS)',
    backToDashboardAria: 'Volver al Panel Ejecutivo IAGS',
    openNavAria: 'Abrir navegación',
    closeNavAria: 'Cerrar navegación',
    themeLight: 'Claro',
    themeDark: 'Oscuro',
    switchToLightAria: 'Cambiar a tema claro',
    switchToDarkAria: 'Cambiar a tema oscuro',
    languageLabel: 'Idioma',
    sidebar: {
      studioSection: 'Estudio y Operación',
      proceduresSection: 'Procedimientos',
      exportAllTitle: 'Exportar las 15 normas en Markdown',
      filterPlaceholder: 'Filtrar norma...',
      standardsFooter: 'ISA/IEC 62443-2-1 · ISO 27001 · NIST 800-92',
    },
    nav: {
      overview: { label: 'Panel Ejecutivo', subtitle: 'KPIs, gráficos y actas' },
      studio: { label: 'Mapa Interactivo', subtitle: 'Animación de 15 normas' },
      simulator: { label: 'Simulador de Impacto', subtitle: 'Activos, plantas y sistemas' },
      assets: { label: 'Activos OT (CMDB)', subtitle: 'Ciclo de vida y controles' },
      compliance: { label: 'Vulnerab. y Auditorías', subtitle: 'GVT, GCT y planes RDM' },
      governance: { label: 'Controles y Roles', subtitle: 'Física, DRP y matriz' },
    },
    graphFrame: {
      maximize: 'Maximizar',
      maximizeTitle: 'Maximizar grafo a pantalla completa',
      closeFullscreen: 'Cerrar Pantalla Completa (Esc)',
      zoomIn: 'Acercar zoom',
      zoomOut: 'Alejar zoom',
      zoomReset: 'Restablecer zoom al 100%',
    },
    overview: {
      kpiNormsTitle: 'Arquitectura Normativa IAGS',
      kpiNormsBadge: '100% estructuradas',
      kpiNormsFooter: 'dominios · ISA/IEC 62443-2-1 e ISO 27001',
      kpiAssetsTitle: 'Cumplimiento Activos OT',
      kpiAssetsCompliant: 'conformes',
      kpiAssetsSynced: 'sincronizados ERP ↔ CMDB ↔ PGA',
      kpiVulnsTitle: 'CVEs Críticas y Altas (GVT)',
      kpiVulnsBadge: 'en remediación',
      kpiVulnsFooter: 'Metas IAGS-10: Crítica 60d · Alta 90d',
      kpiActionsTitle: 'Planes de Acción y RDMs',
      kpiActionsEscalated: 'escalado SI',
      kpiActionsFooter: 'Ejecución controlada vía CAB / IAGS-03',
      chartDomainTitle: 'Índice de Cumplimiento por Dominio IAGS (%)',
      chartDomainSub: 'Adherencia actual frente a la meta corporativa en los 6 macrodominios',
      chartDomainTarget: 'Meta ≥ 90%',
      chartDomainBar: 'Cumplimiento Actual (%)',
      chartDomainLine: 'Meta IAGS (%)',
      chartOpsTitle: 'Pulso Operativo OT — Cambios, Incidentes y SIEM',
      chartOpsSub: 'Evolución mensual integrada de IAGS-03 (RDM), IAGS-04 (INC) e IAGS-15 (Alertas)',
      chartOpsWindow: 'Últimos 6 meses',
      chartOpsChanges: 'Cambios (RDM)',
      chartOpsIncidents: 'Incidentes OT',
      chartOpsSiem: 'Alertas SI (SIEM)',
      chartVulnTitle: 'Vulnerabilidades por Ventana SLA (IAGS-10)',
      chartVulnSub: 'Ciclo anual de remediación por severidad CVSS',
      chartVulnLink: 'Ver GVT',
      chartVulnRemediated: 'Remediadas en Plazo',
      chartVulnOpen: 'En Tratamiento',
      classTableTitle: 'Cobertura de las 6 Clases Críticas de Activos (IAGS-02)',
      classTableSub: 'Conciliación en tiempo real entre Inventario, CMDB y Recolección SIEM/NTP',
      classTableLink: 'Gestionar Activos',
      colAssetClass: 'Clase de Activo',
      colTotal: 'Total',
      colErpCmdb: 'ERP/CMDB',
      colSiemLogs: 'Logs SIEM',
      colCompliance: 'Cumplimiento',
      minutesTitle: 'Actas del Comité de Gobernanza IAGS (Registro Controlado · IAGS-01)',
      minutesSub: 'Reuniones trimestrales de fiscalización · Retención activa de 3 años + archivo histórico',
      registerMinute: 'Registrar Acta',
      minutePrefix: 'Acta',
      participantsWord: 'participantes',
      retentionPrefix: 'Retención:',
      modalTitle: 'Registrar Nueva Acta — Comité de Gobernanza IAGS',
      modalQuarter: 'Trimestre / Referencia',
      modalQuarterDefault: '4.º Trimestre 2026',
      modalParticipants: 'Participantes',
      modalSummary: 'Resumen Ejecutivo de la Reunión',
      modalSummaryPlaceholder: 'Ej.: Revisión de auditorías OT, estado de vulnerabilidades críticas y acuerdos de continuidad...',
      modalDecisions: 'Decisiones Principales (una por línea)',
      modalDecisionsPlaceholder: 'Ej.: Aprobada ventana de parada para parche SCADA...',
      modalDefaultDecision: 'Acuerdos registrados para seguimiento en el próximo ciclo del Comité IAGS.',
      modalCancel: 'Cancelar',
      modalSave: 'Guardar Acta (Retención 3 Años)',
      retentionSuffix: '(3 años + histórico)',
    },
    studio: {
      title: 'Mapa Interactivo y Simulación de Flujos (15 Procedimientos)',
      subtitle: 'Visualice dependencias reales entre las normas IAGS-01 a IAGS-15 o reproduzca escenarios operativos y cibernéticos de extremo a extremo.',
      modeSimulate: 'Simulación Animada',
      modeExplore: 'Explorar Dependencias',
      stepsWord: 'etapas',
      highlightDomain: 'Resaltar dominio:',
      allCount: 'Todos (15)',
      graphTitle: 'Mapa Interactivo de Procedimientos IAGS (IAGS-01 a IAGS-15)',
      simPrefix: 'Simulación:',
      stepLabel: 'Etapa',
      explorePrefix: 'Exploración:',
      legendGov: 'Gobernanza',
      legendOps: 'Operativo',
      legendSec: 'Seguridad / SI',
      legendChange: 'Cambio (RDM)',
      legendData: 'Datos / CMDB',
      pause: 'Pausar',
      play: 'Reproducir',
      prevStep: 'Etapa anterior',
      nextStep: 'Siguiente etapa',
      restart: 'Reiniciar simulación',
      layer1: 'CAPA 1 · DIRECCIÓN Y GOBERNANZA',
      layer2: 'CAPA 2 · NÚCLEO DE ACTIVOS, MESA SPOC Y CATÁLOGO',
      layer3: 'CAPA 3 · ENTREGA OPERATIVA, CAMBIOS Y ACCESO LÓGICO',
      layer4: 'CAPA 4 · CIBERSEGURIDAD, SOC/SIEM, RESILIENCIA, FÍSICA Y PAM',
      originBadge: 'ORIGEN',
      targetBadge: 'DESTINO',
      artifactLabel: 'Registro / Artefacto:',
      slaLabel: 'Regla / SLA:',
      readBtn: 'Leer',
      openBtn: 'Abrir',
      cadenceLabel: 'Cadencia:',
      ownerLabel: 'Dueño:',
      incomingTitle: 'Entradas / Disparadores Recibidos',
      topDirectiveMsg: 'Norma directriz superior (origen de gobernanza).',
      outgoingTitle: 'Salidas / Procesos Activados',
      noOutgoingMsg: 'Sin salidas directas adicionales mapeadas.',
      openFullNorm: 'Abrir Norma Completa',
    },
    simulator: {
      title: 'Simulador de Impacto de Cambios en Activos, Plantas y Sistemas',
      subtitle: 'Seleccione un activo OT (PLC, UPS, Firewall, Switch, SCADA) y el tipo de intervención para simular el radio de propagación antes de abrir una RDM (IAGS-03).',
      simulateBtn: 'Simular Propagación',
      fullViewBtn: 'Vista Total',
      fullViewTitle: 'Mostrar impacto completo',
      step1Label: '1. Activo Objetivo del Cambio / Evento',
      step2Label: '2. Escenario de Cambio o Evento Simulado',
      zoneLabel: 'Zona:',
      criticalityLabel: 'Criticidad:',
      ownerShort: 'Resp.:',
      kpiAssetsTitle: 'Otros Activos Afectados',
      kpiAssetsDirect: 'directos',
      kpiAssetsCascade: 'cascada',
      kpiPlantsTitle: 'Plantas / Unidades Impactadas',
      kpiPlantsStop: 'parada total',
      kpiSystemsTitle: 'Sistemas y Servicios OT',
      kpiSystemsSub: 'capas impactadas',
      kpiCabTitle: 'Aprobación CAB-Automatización',
      kpiCabRequired: 'Obligatoria',
      kpiCabWaived: 'Exenta / Emerg.',
      graphTitlePrefix: 'Topología de Propagación de Impacto —',
      affectedAssetsWord: 'activos afectados',
      plantsWord: 'plantas',
      systemsWord: 'sistemas',
      stageLabel: 'Etapa',
      colOrigin: 'T+0 · ACTIVO ORIGEN',
      colDirect: 'T+1 · IMPACTO DIRECTO',
      colCascade: 'T+2 · EFECTO CASCADA',
      colPlants: 'T+3 · PLANTAS AFECTADAS',
      clickToSimulate: 'Clic para simular desde aquí',
      cascadeTag: 'Cascada',
      viaLabel: 'Vía',
      originWord: 'Origen:',
      chainTitle: 'Cadena de Activos Impactados',
      noPropagation: 'Ningún otro activo OT sufre propagación directa para esta intervención aislada.',
      hop1Label: '1.er Grado (Directo)',
      hop2Prefix: '2.º Grado (vía',
      simulateThis: 'Simular este',
      systemsTitle: 'Sistemas y Servicios Operativos Afectados',
      verdictHeader: 'Dictamen Automático de Gobernanza IAGS',
      controlsTitle: 'Controles Obligatorios Antes de la Ejecución',
      triggeredNormsTitle: 'Procedimientos IAGS Activados en Este Cambio',
      otAssetFallback: 'Activo OT',
    },
    procedure: {
      collapseFull: 'Ocultar Texto Integral',
      readFull: 'Leer Norma Completa',
      copied: 'Copiado',
      copyMd: 'Copiar .md',
      downloadMd: 'Descargar .md',
      ownerPrimaryTitle: 'Responsable Principal (Dueño)',
      ownerPrimaryDesc: 'Responde por la eficacia, KPIs y revisión periódica',
      approverTitle: 'Aprobador / Fiscalizador',
      executingTitle: 'Equipos Ejecutores',
      stakeholdersTitle: 'Interfaces y Partes Interesadas',
      fullDocBadge: 'Documento Normativo Integral',
      closeFullDoc: 'Cerrar Lectura Integral',
      techNote: 'Nota Técnica:',
      opsNote: 'Nota Operativa:',
      controlledRecords: 'Registros Controlados',
      recColRecord: 'Registro',
      recColId: 'Identificación',
      recColStorage: 'Almacenamiento',
      recColAccess: 'Control de Acceso',
      recColRetention: 'Retención',
      summaryCardTitle: 'Resumen Operativo y Reglas Clave',
      artifactsTitle: 'Artefactos y Evidencias Obligatorias',
      referencesTitle: 'Referencias Normativas',
      corrTitlePrefix: 'Correlaciones de',
      corrSubIn: 'entradas recibidas',
      corrSubOut: 'procesos activados',
      corrSubClick: 'Haga clic en cualquier nodo para abrir',
      corrMapHeader: 'Mapa de Correlaciones',
      inShort: 'entradas',
      outShort: 'salidas',
      svgInputs: 'ENTRADAS / DISPARADORES',
      svgFocus: 'PROCEDIMIENTO EN FOCO',
      svgOutputs: 'SALIDAS / ACTIVACIONES',
      receivesFrom: 'Recibe Entradas De',
      topDirectiveInfo: 'Esta norma actúa como directriz estratégica superior del ecosistema IAGS.',
      triggersFeeds: 'Activa / Alimenta',
      noDirectOutputs: 'No posee salidas directas adicionales mapeadas a otras normas.',
    },
    assets: {
      title: 'Inventario OT, CMDB y Compuertas de Seguridad (IAGS-02)',
      subtitle: 'Control del ciclo de vida de las 6 clases críticas, sincronía ERP/EAM ↔ CMDB ↔ PGA y validación interactiva de compuertas de ciberseguridad.',
      addBtn: 'Registrar Activo OT',
      searchPlaceholder: 'Filtrar tag, ERP, CMDB, responsable...',
      allClasses: 'Todas las Clases (6)',
      allPhases: 'Todas las Fases',
      showingCount: 'Mostrando',
      ofWord: 'de',
      assetsWord: 'activos',
      colTagAsset: 'Tag / Activo',
      colClass: 'Clase',
      colPhase: 'Fase',
      colErpCmdb: 'ERP / CMDB',
      colGates: 'Compuertas',
      colStatus: 'Estado',
      critShort: 'Crit.',
      ownerShort: 'Resp.:',
      pgaActive: 'Activo',
      pgaPending: 'Pendiente',
      checklistTitle: 'Lista de Compuertas de Seguridad',
      pendingAlert: 'Los activos con compuertas pendientes requieren Plan de Acción formal vía RDM (IAGS-03). Marque las 6 compuertas tras regularizar para actualizar el cumplimiento global.',
      modalTitle: 'Registrar Nuevo Activo Crítico OT (CMDB / PGA)',
      fieldTag: 'Tag Técnico',
      fieldTagPlaceholder: 'Ej.: PLC-UTIL-305',
      fieldClass: 'Clase IAGS-02',
      fieldDesc: 'Descripción del Activo',
      fieldDescPlaceholder: 'Ej.: Controlador Redundante — Estación de Bombeo',
      fieldNature: 'Naturaleza',
      fieldPhase: 'Fase',
      fieldCriticality: 'Criticidad',
      fieldZone: 'Zona / Ubicación',
      fieldOwner: 'Responsable',
      cancel: 'Cancelar',
      save: 'Guardar en CMDB',
      gates: {
        homologated: 'Homologación Previa Aprobada',
        defaultPasswordsChanged: 'Contraseñas Predeterminadas Cambiadas',
        hardeningApplied: 'Hardening según Línea Base',
        vulnerabilityScanOk: 'Escaneo de Vulnerabilidades Validado',
        erpAndCmdbSynced: 'Sincronía ERP/EAM ↔ CMDB (ITSM)',
        siemLogsEnabled: 'Recolección de Logs SIEM y NTP Activa',
      },
    },
    compliance: {
      title: 'Vulnerabilidades (GVT/GCT), Auditorías y Planes de Acción',
      subtitle: 'Seguimiento de SLAs CVSS (60/90/120/180d — IAGS-10), secuencia segura de parches OT, auditorías periódicas (IAGS-02) y remediación vía RDM (IAGS-03).',
      newActionBtn: 'Nuevo Plan de Acción (RDM)',
      tabGvt: 'Vulnerabilidades y Parches',
      tabActions: 'Planes de Acción y RDM',
      tabAudits: 'Auditorías Semestrales / Bienales / GCT',
      safeSeqTitle: 'Secuencia Segura de Actualización OT (IAGS-10):',
      safeSeqBody: 'Homologación del Fabricante → Prueba Off-line → Aplicación en Stand-by → Producción vía RDM.',
      safeSeqExcludedStrong: 'PLCs/Remotas y UPS Industriales',
      safeSeqExcludedRest: 'quedan excluidos de pruebas activas TDI/TDE por seguridad de planta.',
      colCveAsset: 'CVE / Activo',
      colSeverity: 'Severidad / CVSS',
      colSla: 'Consumo SLA',
      colTeam: 'Equipo',
      colStage: 'Etapa de Parcheo',
      colAction: 'Acción',
      tdiBadge: '[Excluido TDI/TDE]',
      doneBadge: 'Completada',
      advanceBtn: 'Avanzar Etapa',
      escalatedBadge: 'Escalado a SI Industrial',
      ownerShort: 'Resp.:',
      dueLabel: 'Plazo:',
      checkedLabel: 'Verificados',
      deviationsLabel: 'Desvíos',
      secIncLabel: 'Inc. SI',
      modalTitle: 'Registrar Plan de Acción de No Conformidad (vía RDM)',
      fieldCorrective: 'Descripción de la Acción Correctiva',
      fieldCorrectivePlaceholder: 'Ej.: Aplicar parche homologado y actualizar línea base...',
      fieldAsset: 'Activo Afectado',
      fieldOriginNorm: 'Norma Origen',
      fieldDeviation: 'Tipo de Desvío',
      fieldRdm: 'RDM Vinculada',
      fieldOwner: 'Responsable',
      fieldDue: 'Fecha Límite',
      escalateCheckbox: 'Escalar como Incidente de SI (Software sin licencia, acceso indebido o hurto)',
      cancel: 'Cancelar',
      createBtn: 'Crear Plan de Acción',
      normOptions: {
        'IAGS-02': 'IAGS-02 (Activos)',
        'IAGS-08': 'IAGS-08 (Acceso Lógico)',
        'IAGS-09': 'IAGS-09 (PAM)',
        'IAGS-10': 'IAGS-10 (Vulnerab./GCT)',
        'IAGS-12': 'IAGS-12 (Seg. Física)',
        'IAGS-13': 'IAGS-13 (Protección HW)',
      },
    },
    governance: {
      title: 'Controles de Seguridad Física, Continuidad y Roles',
      subtitle: 'Perímetros industriales (IAGS-12), preparación de recuperación DRP/RTO (IAGS-11) y segregación de funciones organizacionales (IAGS-01).',
      tabPhysical: 'Seguridad Física (IAGS-12)',
      tabContinuity: 'Continuidad DRP/RTO (IAGS-11)',
      tabRoles: 'Matriz de Roles (IAGS-01)',
      physicalTitle: 'Clasificación de Perímetros Físicos y Control de Autorizados (IAGS-12)',
      physicalSub: '7 dominios de protección física/ambiental · Revisión anual sincronizada con Offboarding y accesos permanentes, temporales y puntuales.',
      colPerimeter: 'Perímetro / Instalación',
      colCriticality: 'Criticidad',
      colNr10: 'Seg. Eléctrica',
      colControls: 'Controles Activos',
      colAuthorized: 'Autorizados',
      colStatus: 'Estado',
      mandatory: 'Obligatoria',
      na: 'N/A',
      continuityTitle: 'Preparación de Continuidad de Infraestructura Crítica (IAGS-11)',
      continuitySub: '5 clases prioritarias de DRP/PCN · Pruebas prácticas bienales alineadas a paradas programadas y revisión crítica anual.',
      colCritClass: 'Clase Crítica',
      colRtoRpo: 'RTO / RPO',
      colRedundancy: 'Arquitectura de Redundancia y Kit',
      colLastTest: 'Última Prueba',
      colNextDue: 'Próximo Límite',
      colTestStatus: 'Estado',
      rolesTitle: 'Matriz de Roles, Funciones y Gobernanza Organizacional (IAGS-01)',
      rolesSub: 'Segregación de responsabilidades entre Comité IAGS, Mesa de Servicios, Equipo de Automatización y áreas asociadas.',
      colRole: 'Rol',
      colGroup: 'Función',
      colCadence: 'Cadencia',
      colResp: 'Responsabilidades Principales',
      colLinkedNorms: 'Normas Vinculadas',
    },
    markdown: {
      revision: 'Revisión',
      domain: 'Dominio',
      cadence: 'Cadencia',
      owner: 'Responsable',
      references: 'Referencias Normativas',
      note: 'Nota',
      controlledRecords: 'Registros Controlados',
      recHeaders: ['Registro', 'Identificación', 'Almacenamiento', 'Control de Acceso', 'Retención', 'Disposición'],
      compendiumTitle: '# Industrial Automation Governance Studio (IAGS) — Compendio Normativo Completo',
      compendiumTotal: 'Total de Procedimientos Integrados: 15 (IAGS-01 a IAGS-15)',
      compendiumNote: 'Normas redactadas en estándar corporativo neutro de Gobernanza de Ciberseguridad OT.',
      compendiumFilename: 'IAGS-Compendio-Completo-15-Normas-ES.md',
    },
  },
};

// Enum display-label translators (internal canonical state keys stay untouched)
const ENUM_LABELS: Record<Locale, Record<string, string>> = {
  pt: {
    'CLP / Remotas': 'CLP / Remotas',
    'Estações de Automação': 'Estações de Automação',
    IHM: 'IHM',
    'Infraestrutura de Rede': 'Infraestrutura de Rede',
    Nobreak: 'Nobreak',
    'Pacote de Mercado': 'Pacote de Mercado',
    'Sistema Supervisório (SCADA)': 'Sistema Supervisório (SCADA)',
    'Switch Industrial': 'Switch Industrial',
    'Firewall Industrial': 'Firewall Industrial',
    Demanda: 'Demanda',
    Aquisição: 'Aquisição',
    Implementação: 'Implementação',
    Uso: 'Uso',
    Descontinuação: 'Descontinuação',
    Crítica: 'Crítica',
    Alta: 'Alta',
    Média: 'Média',
    Baixa: 'Baixa',
    ALTA: 'ALTA',
    MÉDIA: 'MÉDIA',
    BAIXA: 'BAIXA',
    Conforme: 'Conforme',
    'Ação Pendente': 'Ação Pendente',
    'Incidente SI': 'Incidente SI',
    'Revisão Pendente': 'Revisão Pendente',
    Automação: 'Automação',
    'SI Industrial': 'SI Industrial',
    'Infraestrutura TI': 'Infraestrutura TI',
    Manutenção: 'Manutenção',
    'Homologação Fabricante': 'Homologação Fabricante',
    'Teste Off-line': 'Teste Off-line',
    'Aplicação Stand-by': 'Aplicação Stand-by',
    'Produção (RDM)': 'Produção (RDM)',
    'Mitigado / Concluído': 'Mitigado / Concluído',
    Aberto: 'Aberto',
    'Em Execução (RDM)': 'Em Execução (RDM)',
    Concluído: 'Concluído',
    Concluída: 'Concluída',
    'Em Andamento': 'Em Andamento',
    Agendada: 'Agendada',
    'Semestral (Amostragem)': 'Semestral (Amostragem)',
    'Bienal (Inventário Geral)': 'Bienal (Inventário Geral)',
    'GCT (Conformidade Técnica)': 'GCT (Conformidade Técnica)',
    'Sob Demanda': 'Sob Demanda',
    'Divergência ERP/CMDB': 'Divergência ERP/CMDB',
    'Hardening Incompleto': 'Hardening Incompleto',
    'Software Não Licenciado': 'Software Não Licenciado',
    'Senha Padrão Pendente': 'Senha Padrão Pendente',
    'Vulnerabilidade CVE': 'Vulnerabilidade CVE',
    'Desvio Segurança Física': 'Desvio Segurança Física',
    Validado: 'Validado',
    'Agendado em Parada': 'Agendado em Parada',
    'Atenção Prazo': 'Atenção Prazo',
    'Comitê IAGS': 'Comitê IAGS',
    'Central de Serviços': 'Central de Serviços',
    'Equipe de Automação': 'Equipe de Automação',
    'Partes Interessadas': 'Partes Interessadas',
    'Parada Total': 'Parada Total',
    'Operação Degradada': 'Operação Degradada',
    'Modo Manual Seguro': 'Modo Manual Seguro',
    'Monitoramento Afetado': 'Monitoramento Afetado',
    energia: 'Energia',
    controle: 'Controle / I/O',
    rede: 'Rede OT',
    dados: 'Dados / SCADA',
    engenharia: 'Engenharia',
  },
  en: {
    'CLP / Remotas': 'PLC / RTUs',
    'Estações de Automação': 'Automation Workstations',
    IHM: 'HMI',
    'Infraestrutura de Rede': 'Network Infrastructure',
    Nobreak: 'Industrial UPS',
    'Pacote de Mercado': 'COTS Software Package',
    'Sistema Supervisório (SCADA)': 'Supervisory System (SCADA)',
    'Switch Industrial': 'Industrial Switch',
    'Firewall Industrial': 'Industrial Firewall',
    Demanda: 'Demand',
    Aquisição: 'Procurement',
    Implementação: 'Implementation',
    Uso: 'Operation',
    Descontinuação: 'Decommissioning',
    Crítica: 'Critical',
    Alta: 'High',
    Média: 'Medium',
    Baixa: 'Low',
    ALTA: 'HIGH',
    MÉDIA: 'MEDIUM',
    BAIXA: 'LOW',
    Conforme: 'Compliant',
    'Ação Pendente': 'Pending Action',
    'Incidente SI': 'IS Incident',
    'Revisão Pendente': 'Review Pending',
    Automação: 'Automation',
    'SI Industrial': 'Industrial IS',
    'Infraestrutura TI': 'IT Infrastructure',
    Manutenção: 'Maintenance',
    'Homologação Fabricante': 'Vendor Approval',
    'Teste Off-line': 'Off-line Testing',
    'Aplicação Stand-by': 'Stand-by Deployment',
    'Produção (RDM)': 'Production (RFC)',
    'Mitigado / Concluído': 'Mitigated / Closed',
    Aberto: 'Open',
    'Em Execução (RDM)': 'In Progress (RFC)',
    Concluído: 'Completed',
    Concluída: 'Completed',
    'Em Andamento': 'In Progress',
    Agendada: 'Scheduled',
    'Semestral (Amostragem)': 'Semiannual (Sampling)',
    'Bienal (Inventário Geral)': 'Biennial (Full Inventory)',
    'GCT (Conformidade Técnica)': 'TCM (Technical Compliance)',
    'Sob Demanda': 'On Demand',
    'Divergência ERP/CMDB': 'ERP/CMDB Mismatch',
    'Hardening Incompleto': 'Incomplete Hardening',
    'Software Não Licenciado': 'Unlicensed Software',
    'Senha Padrão Pendente': 'Default Password Pending',
    'Vulnerabilidade CVE': 'CVE Vulnerability',
    'Desvio Segurança Física': 'Physical Security Deviation',
    Validado: 'Validated',
    'Agendado em Parada': 'Scheduled in Outage',
    'Atenção Prazo': 'Due Soon',
    'Comitê IAGS': 'IAGS Committee',
    'Central de Serviços': 'Service Desk',
    'Equipe de Automação': 'Automation Team',
    'Partes Interessadas': 'Stakeholders',
    'Parada Total': 'Full Shutdown',
    'Operação Degradada': 'Degraded Operation',
    'Modo Manual Seguro': 'Safe Manual Mode',
    'Monitoramento Afetado': 'Monitoring Impacted',
    energia: 'Power',
    controle: 'Control / I/O',
    rede: 'OT Network',
    dados: 'Data / SCADA',
    engenharia: 'Engineering',
  },
  es: {
    'CLP / Remotas': 'PLC / Remotas',
    'Estações de Automação': 'Estaciones de Automatización',
    IHM: 'HMI',
    'Infraestrutura de Rede': 'Infraestructura de Red',
    Nobreak: 'UPS Industrial',
    'Pacote de Mercado': 'Paquete Comercial (COTS)',
    'Sistema Supervisório (SCADA)': 'Sistema de Supervisión (SCADA)',
    'Switch Industrial': 'Switch Industrial',
    'Firewall Industrial': 'Firewall Industrial',
    Demanda: 'Demanda',
    Aquisição: 'Adquisición',
    Implementação: 'Implementación',
    Uso: 'Operación',
    Descontinuação: 'Desincorporación',
    Crítica: 'Crítica',
    Alta: 'Alta',
    Média: 'Media',
    Baixa: 'Baja',
    ALTA: 'ALTA',
    MÉDIA: 'MEDIA',
    BAIXA: 'BAJA',
    Conforme: 'Conforme',
    'Ação Pendente': 'Acción Pendiente',
    'Incidente SI': 'Incidente SI',
    'Revisão Pendente': 'Revisión Pendiente',
    Automação: 'Automatización',
    'SI Industrial': 'SI Industrial',
    'Infraestrutura TI': 'Infraestructura TI',
    Manutenção: 'Mantenimiento',
    'Homologação Fabricante': 'Homologación Fabricante',
    'Teste Off-line': 'Prueba Off-line',
    'Aplicação Stand-by': 'Aplicación Stand-by',
    'Produção (RDM)': 'Producción (RDM)',
    'Mitigado / Concluído': 'Mitigado / Cerrado',
    Aberto: 'Abierto',
    'Em Execução (RDM)': 'En Ejecución (RDM)',
    Concluído: 'Completado',
    Concluída: 'Completada',
    'Em Andamento': 'En Curso',
    Agendada: 'Programada',
    'Semestral (Amostragem)': 'Semestral (Muestreo)',
    'Bienal (Inventário Geral)': 'Bienal (Inventario General)',
    'GCT (Conformidade Técnica)': 'GCT (Cumplimiento Técnico)',
    'Sob Demanda': 'Bajo Demanda',
    'Divergência ERP/CMDB': 'Divergencia ERP/CMDB',
    'Hardening Incompleto': 'Hardening Incompleto',
    'Software Não Licenciado': 'Software Sin Licencia',
    'Senha Padrão Pendente': 'Contraseña Predet. Pendiente',
    'Vulnerabilidade CVE': 'Vulnerabilidad CVE',
    'Desvio Segurança Física': 'Desvío Seguridad Física',
    Validado: 'Validado',
    'Agendado em Parada': 'Programado en Parada',
    'Atenção Prazo': 'Atención Plazo',
    'Comitê IAGS': 'Comité IAGS',
    'Central de Serviços': 'Mesa de Servicios',
    'Equipe de Automação': 'Equipo de Automatización',
    'Partes Interessadas': 'Partes Interesadas',
    'Parada Total': 'Parada Total',
    'Operação Degradada': 'Operación Degradada',
    'Modo Manual Seguro': 'Modo Manual Seguro',
    'Monitoramento Afetado': 'Monitoreo Afectado',
    energia: 'Energía',
    controle: 'Control / E/S',
    rede: 'Red OT',
    dados: 'Datos / SCADA',
    engenharia: 'Ingeniería',
  },
};

export function translateEnum(value: string, locale: Locale): string {
  return ENUM_LABELS[locale][value] ?? value;
}
