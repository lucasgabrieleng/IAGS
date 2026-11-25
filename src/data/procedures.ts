import {
  GovernanceDomainId,
  GovernanceDomainMeta,
  GovernanceScenario,
  IagsProcedure,
  ProcedureInteraction,
} from './proceduresTypes';
import { PROCEDURES_PART_1 } from './proceduresPart1';
import { PROCEDURES_PART_2 } from './proceduresPart2';

export * from './proceduresTypes';

export const GOVERNANCE_DOMAINS: GovernanceDomainMeta[] = [
  {
    id: 'governanca',
    label: 'Governança & Direção',
    shortLabel: 'Governança',
    description: 'Estrutura IAGS, Comitê Trimestral, papéis, hierarquia documental e melhoria contínua.',
    accentHex: '#0f172a',
    surfaceClass: 'bg-slate-100',
    textClass: 'text-slate-900',
    borderClass: 'border-slate-300',
  },
  {
    id: 'ativos',
    label: 'Ativos & Inventário OT',
    shortLabel: 'Ativos OT',
    description: 'Ciclo de vida das 6 classes críticas, CMDB/ERP/PGA e auditorias periódicas.',
    accentHex: '#0284c7',
    surfaceClass: 'bg-sky-50',
    textClass: 'text-sky-800',
    borderClass: 'border-sky-200',
  },
  {
    id: 'operacao',
    label: 'Operação & Entrega de Serviços',
    shortLabel: 'Operação',
    description: 'Central de Serviços N1–N4, Catálogo, Solicitações, Incidentes e Mudanças (CAB).',
    accentHex: '#2563eb',
    surfaceClass: 'bg-blue-50',
    textClass: 'text-blue-800',
    borderClass: 'border-blue-200',
  },
  {
    id: 'identidade',
    label: 'Identidade & Privilégios',
    shortLabel: 'Identidade',
    description: 'Acesso Lógico (AAA), segregação de funções, código-fonte e Contas Privilegiadas (PAM).',
    accentHex: '#7c3aed',
    surfaceClass: 'bg-violet-50',
    textClass: 'text-violet-800',
    borderClass: 'border-violet-200',
  },
  {
    id: 'ciberseguranca',
    label: 'Cibersegurança, Software & SOC',
    shortLabel: 'Ciber & SOC',
    description: 'Vulnerabilidades (GVT/GCT), Homologação tripartite de software e Logs/SIEM 24x7.',
    accentHex: '#059669',
    surfaceClass: 'bg-emerald-50',
    textClass: 'text-emerald-800',
    borderClass: 'border-emerald-200',
  },
  {
    id: 'resiliencia',
    label: 'Resiliência & Segurança Física',
    shortLabel: 'Resiliência',
    description: 'Continuidade (DRP/RTO/RPO), Perímetros Físicos (Alta/Média/Baixa) e Proteção de Hardware.',
    accentHex: '#d97706',
    surfaceClass: 'bg-amber-50',
    textClass: 'text-amber-800',
    borderClass: 'border-amber-200',
  },
];

export const DOMAIN_MAP: Record<GovernanceDomainId, GovernanceDomainMeta> = GOVERNANCE_DOMAINS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<GovernanceDomainId, GovernanceDomainMeta>
);

export const ALL_PROCEDURES: IagsProcedure[] = [...PROCEDURES_PART_1, ...PROCEDURES_PART_2];

export const PROCEDURE_MAP: Record<string, IagsProcedure> = ALL_PROCEDURES.reduce(
  (acc, proc) => {
    acc[proc.code] = proc;
    return acc;
  },
  {} as Record<string, IagsProcedure>
);

export const PROCEDURE_INTERACTIONS: ProcedureInteraction[] = [
  // Governança -> Diretrizes
  {
    id: 'e-01-02',
    from: 'IAGS-01',
    to: 'IAGS-02',
    label: 'Diretrizes & Auditorias',
    trigger: 'Comitê IAGS define metas de cobertura CMDB/PGA e acompanha desvios de inventário.',
    type: 'governanca',
  },
  {
    id: 'e-01-05',
    from: 'IAGS-01',
    to: 'IAGS-05',
    label: 'Aprovação Estrutural',
    trigger: 'Líder IAGS valida a taxonomia do Catálogo de Serviços e revisa consistência anual.',
    type: 'governanca',
  },
  {
    id: 'e-01-06',
    from: 'IAGS-01',
    to: 'IAGS-06',
    label: 'Mandato SPOC',
    trigger: 'Estabelece a Central de Serviços como função oficial e ponto único de contato OT.',
    type: 'governanca',
  },
  {
    id: 'e-01-10',
    from: 'IAGS-01',
    to: 'IAGS-10',
    label: 'Aceite de Risco',
    trigger: 'Comitê e Gerência deliberam sobre riscos residuais e métricas de conformidade técnica.',
    type: 'governanca',
  },
  {
    id: 'e-01-11',
    from: 'IAGS-01',
    to: 'IAGS-11',
    label: 'Governança de Crise',
    trigger: 'Acompanha prontidão de DRP/PCN e aprova controles compensatórios em crise.',
    type: 'governanca',
  },

  // Ativos <-> Outros
  {
    id: 'e-02-03',
    from: 'IAGS-02',
    to: 'IAGS-03',
    label: 'Plano de Ação → RDM',
    trigger: 'Desvios de auditoria ou descontinuação de ativos exigem abertura de RDM formal.',
    type: 'mudanca',
  },
  {
    id: 'e-02-10',
    from: 'IAGS-02',
    to: 'IAGS-10',
    label: 'Base CMDB / Criticidade',
    trigger: 'Fornece inventário atualizado e criticidade (A/B/C) para escopo de GVT/GCT.',
    type: 'dados',
  },
  {
    id: 'e-02-11',
    from: 'IAGS-02',
    to: 'IAGS-11',
    label: 'Escopo Crítico DRP',
    trigger: 'Alimenta o mapa de ativos críticos e dependências para definição de BIA/RTO/RPO.',
    type: 'dados',
  },
  {
    id: 'e-02-13',
    from: 'IAGS-02',
    to: 'IAGS-13',
    label: 'Criticidade Hardware',
    trigger: 'Classificação A/B/C orienta planos de inspeção e proteção física de equipamentos.',
    type: 'dados',
  },
  {
    id: 'e-02-14',
    from: 'IAGS-02',
    to: 'IAGS-14',
    label: 'Gate de Demanda',
    trigger: 'Novas demandas de software ou upgrade exigem homologação tripartite prévia.',
    type: 'seguranca',
  },
  {
    id: 'e-02-15',
    from: 'IAGS-02',
    to: 'IAGS-15',
    label: 'Inventário no PGA',
    trigger: 'Novos ativos entram na matriz de coleta de logs, NTP e monitoramento contínuo.',
    type: 'dados',
  },

  // Central de Serviços -> Roteamento Operacional
  {
    id: 'e-06-04',
    from: 'IAGS-06',
    to: 'IAGS-04',
    label: 'Triagem de Falhas',
    trigger: 'Interrupções ou degradações são roteadas para Gestão de Incidentes (P1–P5).',
    type: 'operacional',
  },
  {
    id: 'e-06-07',
    from: 'IAGS-06',
    to: 'IAGS-07',
    label: 'Triagem de Pedidos',
    trigger: 'Demandas padronizadas do Catálogo seguem para Solicitação de Serviços (P1–P7).',
    type: 'operacional',
  },
  {
    id: 'e-06-03',
    from: 'IAGS-06',
    to: 'IAGS-03',
    label: 'Triagem de Mudanças',
    trigger: 'Pedidos de alteração em ativos ou lógica são direcionados à Gestão de Mudanças.',
    type: 'mudanca',
  },
  {
    id: 'e-05-07',
    from: 'IAGS-05',
    to: 'IAGS-07',
    label: 'SLAs & Regras de Aprovação',
    trigger: 'Fichas do Catálogo definem quais requisições são pré-aprovadas e seus prazos.',
    type: 'dados',
  },
  {
    id: 'e-05-03',
    from: 'IAGS-05',
    to: 'IAGS-03',
    label: 'Modelos Pré-aprovados / Remoção',
    trigger: 'Fornece mudanças padrão catalogadas e exige RDM para desativar infraestrutura de serviço.',
    type: 'mudanca',
  },

  // Incidentes <-> Mudanças / Continuidade
  {
    id: 'e-04-03',
    from: 'IAGS-04',
    to: 'IAGS-03',
    label: 'Correção Definitiva / Emergencial',
    trigger: 'Resolução definitiva ou restauração emergencial de incidente dispara RDM.',
    type: 'mudanca',
  },
  {
    id: 'e-04-11',
    from: 'IAGS-04',
    to: 'IAGS-11',
    label: 'Acionamento de Crise (> RTO)',
    trigger: 'Indisponibilidade superior ao RTO escala incidente crítico para DRP/PCN.',
    type: 'seguranca',
  },

  // Mudanças -> Atualização de CMDB & Continuidade
  {
    id: 'e-03-02',
    from: 'IAGS-03',
    to: 'IAGS-02',
    label: 'Atualização Pós-RDM',
    trigger: 'Mudanças concluídas atualizam itens de configuração (CMDB), firmware e versionamento.',
    type: 'dados',
  },

  // Solicitação -> Acessos
  {
    id: 'e-07-08',
    from: 'IAGS-07',
    to: 'IAGS-08',
    label: 'Requisição de Acesso Lógico',
    trigger: 'Pedidos de concessão, alteração ou revogação de acesso lógico tramitam via ITSM.',
    type: 'operacional',
  },
  {
    id: 'e-07-12',
    from: 'IAGS-07',
    to: 'IAGS-12',
    label: 'Requisição de Acesso Físico',
    trigger: 'Solicitações de credencial permanente ou temporária para perímetros críticos.',
    type: 'operacional',
  },

  // Identidade <-> PAM <-> Física <-> Logs
  {
    id: 'e-08-09',
    from: 'IAGS-08',
    to: 'IAGS-09',
    label: 'Elevação de Privilégio',
    trigger: 'Perfis administrativos e contas de serviço obedecem controles adicionais de cofre PAM.',
    type: 'seguranca',
  },
  {
    id: 'e-08-12',
    from: 'IAGS-08',
    to: 'IAGS-12',
    label: 'Sincronia Offboarding',
    trigger: 'Desligamento ou transferência revoga simultaneamente acessos lógicos e crachás físicos.',
    type: 'seguranca',
  },
  {
    id: 'e-09-15',
    from: 'IAGS-09',
    to: 'IAGS-15',
    label: 'Auditoria de Sessões PAM',
    trigger: 'Atividades privilegiadas geram trilha contínua no SIEM para detecção de abusos.',
    type: 'seguranca',
  },

  // Vulnerabilidade <-> Homologação <-> Mudanças
  {
    id: 'e-10-03',
    from: 'IAGS-10',
    to: 'IAGS-03',
    label: 'Remediação & Patching',
    trigger: 'Correções de CVEs (60–180d) e ajustes de baseline são implantados via RDM.',
    type: 'mudanca',
  },
  {
    id: 'e-14-03',
    from: 'IAGS-14',
    to: 'IAGS-03',
    label: 'Implantação Homologada',
    trigger: 'Software aprovado no piloto segue para produção controlada por RDM e rollback.',
    type: 'mudanca',
  },
  {
    id: 'e-14-05',
    from: 'IAGS-14',
    to: 'IAGS-05',
    label: 'Atualização do Catálogo',
    trigger: 'Novo software instalado atualiza fichas de serviço e capacitação operacional.',
    type: 'dados',
  },
  {
    id: 'e-14-11',
    from: 'IAGS-14',
    to: 'IAGS-11',
    label: 'Atualização de Backup/DRP',
    trigger: 'Novas versões exigem atualização de mídias, snapshots e procedimentos de contingência.',
    type: 'dados',
  },

  // Física <-> Proteção <-> Logs
  {
    id: 'e-12-13',
    from: 'IAGS-12',
    to: 'IAGS-13',
    label: 'Criticidade de Perímetro',
    trigger: 'Ativos críticos em ambientes de menor criticidade recebem salvaguardas físicas adicionais.',
    type: 'seguranca',
  },
  {
    id: 'e-13-03',
    from: 'IAGS-13',
    to: 'IAGS-03',
    label: 'Manutenção Controlada',
    trigger: 'Manutenções de hardware crítico e substituições são coordenadas via Gestão de Mudanças.',
    type: 'mudanca',
  },
  {
    id: 'e-13-15',
    from: 'IAGS-13',
    to: 'IAGS-15',
    label: 'Monitoração de Saúde/Acesso',
    trigger: 'Equipamentos críticos e estações desassistidas enviam eventos de integridade ao SIEM.',
    type: 'dados',
  },

  // Logs/SIEM -> Incidentes & Mudanças
  {
    id: 'e-15-04',
    from: 'IAGS-15',
    to: 'IAGS-04',
    label: 'Alerta Disponibilidade/SI',
    trigger: 'Eventos de indisponibilidade, capacidade ou cibersegurança disparam incidentes imediatos.',
    type: 'seguranca',
  },
  {
    id: 'e-15-03',
    from: 'IAGS-15',
    to: 'IAGS-03',
    label: 'Configuração de Coleta',
    trigger: 'Ativação de agentes, NTP e ajuste de thresholds em ativos OT exige RDM controlada.',
    type: 'mudanca',
  },
];

export const ANIMATED_SCENARIOS: GovernanceScenario[] = [
  {
    id: 'scn-cyber-siem',
    title: 'Alerta de Intrusão no SIEM até Recuperação',
    category: 'Resposta a Incidentes Cibernéticos',
    severity: 'Crítica',
    summary:
      'Simula o fluxo completo quando uma tentativa de acesso privilegiado anômalo em servidor SCADA dispara alerta no SIEM e exige contenção emergencial.',
    involvedNodes: ['IAGS-09', 'IAGS-15', 'IAGS-06', 'IAGS-04', 'IAGS-03', 'IAGS-02'],
    steps: [
      {
        stepNumber: 1,
        from: 'IAGS-09',
        to: 'IAGS-15',
        title: 'Uso Anômalo de Conta Privilegiada',
        action:
          'Conta de suporte tenta login fora de janela em servidor de automação; trilha auditada é ingerida em tempo real no SIEM com timestamp NTP.',
        artifact: 'Evento de Segurança Correlação SIEM',
        slaNote: 'Detecção em tempo real (24x7)',
      },
      {
        stepNumber: 2,
        from: 'IAGS-15',
        to: 'IAGS-04',
        title: 'Abertura de Incidente Crítico (SI / OT)',
        action:
          'SOC classifica alerta como Cibersegurança, abre incidente P1 e aciona SI Industrial + Equipe de Automação N3 para isolamento.',
        artifact: 'Ticket INC P1 + Escalonamento SI Industrial',
        slaNote: 'Prioridade P1 — Crítica',
      },
      {
        stepNumber: 3,
        from: 'IAGS-04',
        to: 'IAGS-03',
        title: 'Contenção via Mudança Emergencial',
        action:
          'Supervisor de Automação autoriza regra emergencial no Firewall Industrial e rotação imediata da credencial comprometida.',
        artifact: 'RDM Emergencial (formalização ≤ 5 dias úteis)',
        slaNote: 'Execução imediata + RDM em até 5 dias úteis',
      },
      {
        stepNumber: 4,
        from: 'IAGS-03',
        to: 'IAGS-02',
        title: 'Atualização de Baseline e Registro de Lições',
        action:
          'Configurações atualizadas são registradas no CMDB, versionamento lógico atualizado e thresholds do PGA refinados.',
        artifact: 'CMDB Sincronizado + Lições Aprendidas PGA',
        slaNote: 'Encerramento auditável pós-incidente',
      },
    ],
  },
  {
    id: 'scn-cve-patch',
    title: 'CVE Crítica → Homologação → Patch em Planta',
    category: 'Gestão de Vulnerabilidades & Mudanças',
    severity: 'Alta',
    summary:
      'Demonstra o ciclo seguro para remediar uma vulnerabilidade CVSS 9.4 em Sistema Supervisório respeitando homologação piloto e janela CAB.',
    involvedNodes: ['IAGS-02', 'IAGS-10', 'IAGS-14', 'IAGS-03', 'IAGS-11'],
    steps: [
      {
        stepNumber: 1,
        from: 'IAGS-02',
        to: 'IAGS-10',
        title: 'Detecção Mensal (GVT) sobre CMDB',
        action:
          'Varredura mensal identifica CVE crítica (CVSS 9.4) no Pacote de Mercado SCADA mapeado como Criticidade A no CMDB.',
        artifact: 'Relatório GVT — Meta SLA ≤ 60 dias',
        slaNote: 'SLA Crítica: até 60 dias',
      },
      {
        stepNumber: 2,
        from: 'IAGS-10',
        to: 'IAGS-14',
        title: 'Homologação Tripartite em Ambiente Piloto',
        action:
          'Patch homologado pelo fabricante é validado em bancada off-line com testes funcionais e de segurança aprovados por TI, SI e Automação.',
        artifact: 'Formulário de Homologação + Guia de Instalação',
        slaNote: 'Validação pré-implantação obrigatória',
      },
      {
        stepNumber: 3,
        from: 'IAGS-14',
        to: 'IAGS-03',
        title: 'Aprovação no CAB-Automação e Deploy Stand-by',
        action:
          'RDM Normal de Risco Alto apresenta Planos de Teste, Rollback e Comunicação ao CAB; aplicação inicia no servidor stand-by antes da produção.',
        artifact: 'RDM Normal Aprovada (CAB) + Backup Pré-deploy',
        slaNote: 'Janela CAB Semanal / Parada Programada',
      },
      {
        stepNumber: 4,
        from: 'IAGS-14',
        to: 'IAGS-11',
        title: 'Atualização de Snapshots e Continuidade',
        action:
          'Após estabilização, novas imagens de backup/VM são replicadas para o Data Center redundante mantendo o RPO/RTO intactos.',
        artifact: 'Snapshot DRP Atualizado + CMDB Versão Nova',
        slaNote: 'Prontidão DRP preservada',
      },
    ],
  },
  {
    id: 'scn-offboarding',
    title: 'Offboarding de Terceiro após Startup de Planta',
    category: 'Identidade, Privilégios & Segurança Física',
    severity: 'Alta',
    summary:
      'Mostra a sincronização de revogação entre Solicitação de Serviço, Acesso Lógico, Cofre PAM, Rotação de Senhas e Perímetro Físico.',
    involvedNodes: ['IAGS-06', 'IAGS-07', 'IAGS-08', 'IAGS-09', 'IAGS-12'],
    steps: [
      {
        stepNumber: 1,
        from: 'IAGS-06',
        to: 'IAGS-07',
        title: 'Abertura de Solicitação de Desmobilização',
        action:
          'Gestor do contrato aciona a Central de Serviços ao encerrar a operação assistida do integrador na unidade.',
        artifact: 'Requisição ITSM (REQ) de Revogação',
        slaNote: 'Prioridade P2 — Urgência (≤ 2 dias)',
      },
      {
        stepNumber: 2,
        from: 'IAGS-07',
        to: 'IAGS-08',
        title: 'Revogação de Contas AD e Ativos Locais',
        action:
          'Equipes de Controle de Acesso TI (AD) e Automação (fora do AD) encerram credenciais nominais e validam check-in de código-fonte.',
        artifact: 'Log de Revogação AAA + Check-in Versionamento',
        slaNote: 'Segregação de funções preservada',
      },
      {
        stepNumber: 3,
        from: 'IAGS-08',
        to: 'IAGS-09',
        title: 'Bloqueio no Cofre PAM e Rotação de Senha',
        action:
          'Acesso temporário no cofre de senhas é revogado; contas de suporte compartilhadas conhecidas durante o startup sofrem rotação imediata.',
        artifact: 'Registro de Rotação PAM',
        slaNote: 'Rotação imediata obrigatória',
      },
      {
        stepNumber: 4,
        from: 'IAGS-08',
        to: 'IAGS-12',
        title: 'Cancelamento de Crachá e Biometria Física',
        action:
          'Segurança Patrimonial revoga credencial temporária de acesso às Salas de CLP e Salas de Controle (Perímetro Alta).',
        artifact: 'Lista de Autorizados Física Atualizada',
        slaNote: 'Sincronia lógica ↔ física concluída',
      },
    ],
  },
  {
    id: 'scn-new-asset',
    title: 'Comissionamento de Novo Ativo Crítico OT',
    category: 'Ciclo de Vida de Ativos & Governança',
    severity: 'Média',
    summary:
      'Percorre os portões de segurança desde a demanda de um novo CLP/Estação até o monitoramento contínuo no SIEM e inspeção física.',
    involvedNodes: ['IAGS-02', 'IAGS-14', 'IAGS-03', 'IAGS-13', 'IAGS-15'],
    steps: [
      {
        stepNumber: 1,
        from: 'IAGS-02',
        to: 'IAGS-14',
        title: 'Demanda e Homologação Técnica',
        action:
          'Novo ativo passa por avaliação de risco de SI, requisitos contratuais e homologação de software/firmware antes de entrar em rede.',
        artifact: 'Formulário de Homologação + Criticidade A',
        slaNote: 'Gates de Demanda e Aquisição',
      },
      {
        stepNumber: 2,
        from: 'IAGS-14',
        to: 'IAGS-03',
        title: 'Hardening e Troca de Senhas Padrão via RDM',
        action:
          'Na implementação, aplicam-se baseline de segurança, troca obrigatória de senhas de integrador e comissionamento via RDM.',
        artifact: 'RDM de Implementação + Checklist Hardening',
        slaNote: 'Zero senhas default em produção',
      },
      {
        stepNumber: 3,
        from: 'IAGS-02',
        to: 'IAGS-13',
        title: 'Proteção Física e Cabeamento Seguro',
        action:
          'Equipamento instalado em painel protegido com segregação de cabeamento, bloqueio de tela e inclusão no Plano de Inspeção anual.',
        artifact: 'Checklist de Proteção de Hardware Crítico',
        slaNote: 'Alinhado à criticidade do perímetro',
      },
      {
        stepNumber: 4,
        from: 'IAGS-02',
        to: 'IAGS-15',
        title: 'Cadastro no CMDB/PGA e Coleta de Logs NTP',
        action:
          'Ativo sincronizado entre ERP/EAM e CMDB passa a reportar eventos de disponibilidade e cibersegurança ao SIEM centralizado.',
        artifact: 'IC Ativo no CMDB + Regra SIEM/NTP',
        slaNote: 'Observabilidade 24x7 habilitada',
      },
    ],
  },
  {
    id: 'scn-crisis-drp',
    title: 'Disrupção de Infraestrutura Crítica (> RTO)',
    category: 'Gestão de Continuidade & Crise',
    severity: 'Crítica',
    summary:
      'Orquestra a resposta quando falha severa de rede/servidor ameaça superar o RTO, exigindo acionamento de DRP, operação segura e controle compensatório.',
    involvedNodes: ['IAGS-15', 'IAGS-04', 'IAGS-11', 'IAGS-01', 'IAGS-03'],
    steps: [
      {
        stepNumber: 1,
        from: 'IAGS-15',
        to: 'IAGS-04',
        title: 'Alarme Crítico de Disponibilidade (NOC)',
        action:
          'Monitoramento detecta perda de comunicação simultânea em switches core e servidor SCADA principal; incidente P1 aberto imediatamente.',
        artifact: 'Alerta NOC/SIEM → Ticket INC P1',
        slaNote: 'Escalonamento imediato N3',
      },
      {
        stepNumber: 2,
        from: 'IAGS-04',
        to: 'IAGS-11',
        title: 'Declaração de Crise e Acionamento DRP',
        action:
          'Estimativa de recuperação excede o RTO da planta; equipe aciona modo manual seguro, failover para Data Center secundário e kit de contingência.',
        artifact: 'Registro de Acionamento DRP/PCN',
        slaNote: 'Preservação de segurança operacional',
      },
      {
        stepNumber: 3,
        from: 'IAGS-01',
        to: 'IAGS-11',
        title: 'Aprovação de Controle Compensatório',
        action:
          'Comitê de Crise e SI Industrial autorizam temporariamente acesso remoto supervisionado para restauração com monitoramento intensivo.',
        artifact: 'Termo de Exceção Temporária + Monitoramento Reforçado',
        slaNote: 'Vigência estrita à duração da crise',
      },
      {
        stepNumber: 4,
        from: 'IAGS-04',
        to: 'IAGS-03',
        title: 'Retorno à Normalidade e Pós-Crise',
        action:
          'Após restauração definitiva via RDM, exceções temporárias são revogadas e lições aprendidas alimentam o próximo teste bienal de continuidade.',
        artifact: 'RDM de Normalização + Relatório de Crise',
        slaNote: 'Atualização anual do PCN/DRP',
      },
    ],
  },
];

export function procedureToMarkdown(proc: IagsProcedure): string {
  const lines: string[] = [];
  lines.push(`# ${proc.code} — ${proc.title}`);
  lines.push(`**Revisão:** ${proc.revision} | **Domínio:** ${DOMAIN_MAP[proc.domain].label} | **Cadência:** ${proc.cadence} | **Responsável:** ${proc.ownerRole}`);
  lines.push('');
  lines.push(`> ${proc.summary}`);
  lines.push('');
  lines.push('## Referências Normativas');
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
        lines.push(`> **Nota:** ${sub.note}`);
      }
    });
    if (sec.note) {
      lines.push('');
      lines.push(`> **Nota:** ${sec.note}`);
    }
    lines.push('');
  });

  lines.push('## Registros Controlados');
  lines.push('');
  lines.push('| Registro | Identificação | Armazenamento | Controle de Acesso | Retenção | Disposição |');
  lines.push('| --- | --- | --- | --- | --- | --- |');
  proc.controlledRecords.forEach((rec) => {
    lines.push(
      `| ${rec.name} | ${rec.identification} | ${rec.storage} | ${rec.accessControl} | ${rec.retention} | ${rec.disposition} |`
    );
  });

  return lines.join('\n');
}

export function allProceduresToMarkdown(): string {
  const header = [
    '# Industrial Automation Governance Studio (IAGS) — Compêndio Normativo Completo',
    `Total de Procedimentos Integrados: ${ALL_PROCEDURES.length} (IAGS-01 a IAGS-15)`,
    'Normas reescritas em padrão corporativo neutro de Governança de Cibersegurança OT.',
    '',
    '---',
    '',
  ].join('\n');

  return header + ALL_PROCEDURES.map((p) => procedureToMarkdown(p)).join('\n\n---\n\n');
}
