import { IagsProcedure } from './proceduresTypes';

export const PROCEDURES_PART_1: IagsProcedure[] = [
  {
    id: 'iags-01',
    code: 'IAGS-01',
    revision: 'Rev. 01',
    title: 'Estrutura de Governança de Serviços de Automação',
    shortTitle: 'Governança de Serviços',
    domain: 'governanca',
    cadence: 'Comitê Trimestral',
    ownerRole: 'Líder de Governança IAGS',
    summary:
      'Estabelece a estrutura organizacional, funções, papéis, escopo normativo e o ciclo de melhoria contínua do Industrial Automation Governance Studio (IAGS).',
    keyMetrics: [
      'Reuniões trimestrais do Comitê de Governança IAGS',
      'Retenção de 3 anos para atas de deliberação',
      'Alinhamento ISO/IEC 27001, 27002, ISA/IEC 62443-2-1 e ITIL',
    ],
    references: [
      'Política Corporativa de Segurança da Informação',
      'ABNT NBR ISO/IEC 27001 — Sistemas de Gestão da Segurança da Informação',
      'ABNT NBR ISO/IEC 27002 — Controles de Segurança da Informação',
      'ISA/IEC 62443-2-1 — Requisitos de Segurança para Sistemas de Automação e Controle Industrial',
      'Framework ITIL de Gerenciamento de Serviços',
    ],
    sanitizationSummary:
      'Norma reescrita em taxonomia neutra IAGS, com supressão integral de nomes corporativos, siglas departamentais proprietárias e códigos legados.',
    sections: [
      {
        number: '1',
        title: 'Objetivo e Escopo',
        paragraphs: [
          'Definir a estrutura de governança, o conjunto integrado de processos, os papéis de responsabilidade e os mecanismos de melhoria contínua que regem os serviços e ativos críticos de Automação Industrial (TO) da Organização.',
          'Aplica-se a todas as unidades industriais, equipes internas de Automação, Engenharia, Manutenção, Tecnologia da Informação (TI), Segurança da Informação Industrial (SI Industrial) e fornecedores contratados que interagem com o ambiente de automação.',
        ],
      },
      {
        number: '2',
        title: 'Funções Estruturantes do IAGS',
        subsections: [
          {
            code: '2.1',
            title: 'Comitê de Governança IAGS',
            bullets: [
              'Atua com papel estratégico e fiscalizador sobre o cumprimento dos 15 procedimentos normativos do ecossistema de automação.',
              'Reúne-se ordinariamente com periodicidade trimestral, ou extraordinariamente sob demanda de incidentes graves, auditorias ou mudanças estruturais.',
              'Avalia indicadores de maturidade, planos de ação de não conformidades, aceites formais de risco e priorização de investimentos em resiliência OT.',
            ],
          },
          {
            code: '2.2',
            title: 'Central de Serviços de Automação',
            bullets: [
              'Ponto único de contato (SPOC) para registro, triagem, priorização e encaminhamento de incidentes, solicitações e mudanças em serviços e ativos de automação.',
              'Garante rastreabilidade integral na plataforma corporativa de ITSM e integração controlada com ordens de manutenção no ERP/EAM.',
            ],
          },
          {
            code: '2.3',
            title: 'Equipe Técnica de Automação',
            bullets: [
              'Responsável pela engenharia, sustentação técnica, hardening, operação assistida, execução de mudanças aprovadas e manutenção lógica dos ativos industriais.',
              'Opera em sinergia com Infraestrutura de TI, SI Industrial, Manutenção Elétrica/Instrumentação e Operação de Planta.',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Papéis e Responsabilidades',
        table: {
          caption: 'Tabela 1 — Matriz de Papéis de Governança de Automação',
          headers: ['Papel', 'Atribuições Principais'],
          rows: [
            [
              'Gerência de Engenharia e Tecnologia de Automação',
              'Patrocinar o sistema de governança, aprovar diretrizes estratégicas, autorizar aceites de risco formal e prover recursos.',
            ],
            [
              'Líder de Governança IAGS',
              'Coordenar o Comitê IAGS, manter a base normativa atualizada, consolidar KPIs, acompanhar auditorias e conduzir a melhoria contínua.',
            ],
            [
              'Supervisor de Automação',
              'Aprovar solicitações técnicas, mudanças emergenciais, fichas de catálogo, acessos críticos e priorização operacional da equipe.',
            ],
            [
              'Supervisores de Manutenção Elétrica e Instrumentação',
              'Coordenar o primeiro atendimento em campo via Ordens de Manutenção (OM) e assegurar aderência à segurança física e de energia.',
            ],
            [
              'Donos de Processos (Process Owners)',
              'Garantir eficácia, indicadores, revisões periódicas e aderência de cada um dos 15 processos normativos.',
            ],
            [
              'Responsáveis por Serviços e Ativos',
              'Zelar pelo inventário, ciclo de vida, conformidade técnica, continuidade e controle de acesso dos ativos sob sua custódia.',
            ],
            [
              'Clientes / Usuários Operacionais',
              'Registrar demandas pelos canais oficiais, validar entregas e cumprir as políticas de uso aceitável e segurança.',
            ],
            [
              'Fornecedores e Integradores',
              'Atuar sob contrato e NDA, respeitando homologação, controles de acesso temporário, mudança formal e entrega de documentação.',
            ],
          ],
        },
      },
      {
        number: '4',
        title: 'Hierarquia Documental e Melhoria Contínua',
        paragraphs: [
          'A governança segue o ciclo PDCA: planejar controles alinhados à ISA/IEC 62443 e ISO 27001, executar rotinas operacionais registradas em ITSM/ERP, verificar por meio de auditorias e monitoramento contínuo, e agir por meio de planos de ação acompanhados pelo Comitê IAGS.',
          'Todas as normas da arquitetura IAGS passam por revisão periódica ou extraordinária sempre que ocorrerem mudanças tecnológicas, novas vulnerabilidades críticas ou recomendações de auditoria.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Atas das Reuniões do Comitê de Governança IAGS',
        identification: 'Ano / Sequencial (ex.: 2026/01)',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Leitura pelos membros do Comitê; edição restrita ao Líder IAGS',
        retention: '3 anos em arquivo ativo',
        disposition: 'Arquivamento histórico permanente após 3 anos',
      },
    ],
  },
  {
    id: 'iags-02',
    code: 'IAGS-02',
    revision: 'Rev. 01',
    title: 'Gestão de Ativos de Automação',
    shortTitle: 'Gestão de Ativos',
    domain: 'ativos',
    cadence: 'Auditoria Semestral / Inventário Bienal',
    ownerRole: 'Responsável por Ativos de Automação',
    summary:
      'Controla o ciclo de vida completo de ativos críticos de hardware e software de automação, sincronizando ERP/EAM, CMDB no ITSM e o Programa de Gerenciamento de Ativos (PGA).',
    keyMetrics: [
      '6 classes críticas de ativos OT (Hardware e Software)',
      'Sincronização contínua ERP/EAM ↔ CMDB (ITSM) ↔ PGA',
      'Auditoria amostral semestral e inventário geral bienal',
    ],
    references: [
      'IAGS-01 — Estrutura de Governança de Serviços de Automação',
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-14 — Homologação, Instalação e Atualização de Software de Automação',
      'ISO/IEC 27002 e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Removidas todas as menções a sistemas proprietários comerciais e siglas internas; inventário padronizado para ERP/EAM, CMDB/ITSM e PGA.',
    sections: [
      {
        number: '1',
        title: 'Objetivo e Escopo de Classes Críticas',
        paragraphs: [
          'Assegurar visibilidade, rastreabilidade, propriedade definida e controle de segurança ao longo de todo o ciclo de vida dos ativos de automação (hardware e software) que sustentam processos industriais.',
        ],
        table: {
          caption: 'Tabela 1 — Classes de Ativos no Escopo do IAGS',
          headers: ['Classe de Ativo', 'Subclasses / Exemplos', 'Natureza'],
          rows: [
            ['CLP / Remotas', 'Controladores Lógicos Programáveis e módulos de I/O remotas', 'Hardware & Firmware'],
            ['Estações de Automação', 'Estações de Engenharia e Estações de Operação', 'Hardware & Software'],
            ['IHM', 'Interfaces Homem-Máquina locais de painel e campo', 'Hardware & Firmware'],
            [
              'Infraestrutura de Rede',
              'Firewalls Industriais, Endpoints Industriais e Switches Industriais gerenciáveis',
              'Hardware & Firmware',
            ],
            ['Nobreak', 'Nobreaks Industriais dedicados à sustentação OT', 'Hardware'],
            [
              'Pacote de Mercado',
              'Sistemas Supervisórios (SCADA) e Historiadores de Processo (Historian)',
              'Software Crítico',
            ],
          ],
        },
      },
      {
        number: '2',
        title: 'Ciclo de Vida e Portões de Segurança (Security Gates)',
        paragraphs: [
          'Todo ativo percorre cinco fases governadas — Demanda, Aquisição, Implementação, Uso e Descontinuação — sob controle transversal contínuo no ERP/EAM (patrimônio físico), CMDB do ITSM (configuração lógica) e PGA (revisado anualmente ou sob demanda).',
        ],
        table: {
          caption: 'Tabela 2 — Requisitos Obrigatórios de Segurança por Fase',
          headers: ['Fase', 'Controles Obrigatórios'],
          rows: [
            [
              '1. Demanda',
              'Verificação de requisitos técnicos e de cibersegurança; exigência de homologação prévia para novos softwares ou arquiteturas (IAGS-14).',
            ],
            [
              '2. Aquisição',
              'Avaliação de risco de SI, cláusulas contratuais de segurança e confidencialidade com fornecedores, classificação de criticidade (A/B/C).',
            ],
            [
              '3. Implementação',
              'Hardening conforme baseline, atualização de patches/firmware, varredura de vulnerabilidades, troca obrigatória de senhas padrão de fábrica/integradores e cadastro no ERP/CMDB/PGA.',
            ],
            [
              '4. Uso',
              'Revisões periódicas de conformidade técnica, varreduras mensais de vulnerabilidades, controle de acesso lógico/físico e uso aceitável.',
            ],
            [
              '5. Descontinuação',
              'Análise de dependências operacionais, revogação de acessos e licenças, destruição segura/sanitização de mídias e dados confidenciais e baixa no CMDB/ERP via RDM.',
            ],
          ],
        },
      },
      {
        number: '3',
        title: 'Auditorias, Desvios e Tratamento',
        bullets: [
          'Auditoria semestral por amostragem para validar aderência entre planta física, ERP/EAM e CMDB/ITSM.',
          'Inventário geral bienal contemplando 100% dos ativos críticos no escopo.',
          'Auditorias extraordinárias sob demanda após projetos de expansão, paradas gerais ou incidentes.',
          'Desvios cadastrais ou técnicos geram Plano de Ação formal executado via Requisição de Mudança (IAGS-03).',
          'Detecção de software não licenciado, ativo não autorizado conectado à rede OT ou furto/extravio deve ser escalonada imediatamente como Incidente de Segurança da Informação.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Inventário de Ativos de Automação (CMDB / ERP)',
        identification: 'Código de Tag / Patrimônio / Item de Configuração (IC)',
        storage: 'Plataforma ITSM (CMDB) e ERP/EAM',
        accessControl: 'Alteração restrita às equipes autorizadas de Automação e Governança',
        retention: 'Permanente',
        disposition: 'Histórico mantido para ativos descontinuados',
      },
      {
        name: 'Programa de Gerenciamento de Ativos (PGA)',
        identification: 'Versão / Ano de Revisão',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Leitura restrita às equipes de Automação, TI e SI',
        retention: 'Permanente',
        disposition: 'Versionamento controlado',
      },
      {
        name: 'Plano de Ação de Auditoria de Ativos',
        identification: 'Código da Auditoria / Ano',
        storage: 'Repositório Corporativo de Governança / ITSM',
        accessControl: 'Equipes de Automação, Governança e Auditoria',
        retention: 'Permanente',
        disposition: 'Arquivamento digital permanente',
      },
    ],
  },
  {
    id: 'iags-03',
    code: 'IAGS-03',
    revision: 'Rev. 01',
    title: 'Gestão de Mudanças em Serviços e Ativos de Automação',
    shortTitle: 'Gestão de Mudanças',
    domain: 'operacao',
    cadence: 'CAB Semanal / Emergencial ≤ 5 dias úteis',
    ownerRole: 'Gestor de Mudanças de Automação',
    summary:
      'Disciplina o planejamento, avaliação de risco, aprovação em CAB-Automação, execução controlada, rollback e rastreabilidade de alterações no ambiente OT.',
    keyMetrics: [
      '3 tipos: Pré-aprovada, Normal (CAB p/ Risco Alto) e Emergencial',
      'Registro formal de emergência em até 5 dias úteis',
      'Rastreabilidade obrigatória da RDM no controle de versionamento',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação',
      'IAGS-04 — Gestão de Incidentes em Serviços e Ativos de Automação',
      'IAGS-14 — Homologação, Instalação e Atualização de Software de Automação',
      'ITIL Change Enablement e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Referências a ferramentas específicas de versionamento e ITSM substituídas por Sistema de Controle de Versionamento e Plataforma ITSM.',
    sections: [
      {
        number: '1',
        title: 'Classificação dos Tipos de Mudança',
        table: {
          caption: 'Tabela 1 — Modalidades de Requisição de Mudança (RDM)',
          headers: ['Tipo', 'Critério de Enquadramento', 'Fluxo de Aprovação'],
          rows: [
            [
              'Pré-aprovada (Padrão)',
              'Mudança recorrente, baixo risco, procedimento padronizado e documentado no Catálogo de Serviços.',
              'Autorização prévia vinculada ao modelo de catálogo; execução direta agendada.',
            ],
            [
              'Normal',
              'Mudança planejada sem modelo pré-aprovado. Classificada em risco Baixo, Médio ou Alto conforme matriz de impacto.',
              'Risco Baixo/Médio: aprovação do Responsável/Supervisor. Risco Alto: revisão e aprovação obrigatória pelo CAB-Automação (reunião semanal ou extraordinária).',
            ],
            [
              'Emergencial',
              'Alteração urgente para conter risco a pessoas/meio ambiente, restaurar parada crítica de planta ou atender requisito legal imediato.',
              'Execução imediata mediante aprovação verbal/direta do Supervisor de Automação, com registro formal obrigatório da RDM em até 5 dias úteis após a execução.',
            ],
          ],
        },
      },
      {
        number: '2',
        title: 'Matriz de Impacto, Risco e Prioridade',
        table: {
          caption: 'Tabela 2 — Avaliação de Impacto e Janela de Atendimento',
          headers: ['Peso', 'Descrição de Impacto', 'Risco Resultante', 'Prioridade / SLA'],
          rows: [
            ['5', 'Risco à Segurança de Pessoas ou ao Meio Ambiente', 'Alto', 'P1 — Até 1 dia'],
            ['4', 'Grande perda de produção ou impacto severo ao negócio', 'Alto', 'P1 — Até 1 dia'],
            ['2', 'Problemas internos sem impacto externo; se ativo parado eleva para P1', 'Médio', 'P2 — Até 2 dias (ou P1 se parado)'],
            ['1', 'Afeta ativo crítico sem impactar diretamente o processo produtivo', 'Baixo', 'P3 — Até 28 dias (ou P2 se parado)'],
          ],
        },
      },
      {
        number: '3',
        title: 'Planejamento Obrigatório e Ciclo de Estados',
        bullets: [
          'Mudanças Normais de Risco Alto exigem quatro artefatos obrigatórios: Plano de Testes (em ambiente isolado/controlado), Plano de Recuperação (backup/rollback/contingência), Plano de Comunicação às áreas afetadas e Avaliação Pós-Implantação (PIR).',
          'Estados do ciclo de vida no ITSM: Novo → Autorizar → Programado → Implementar → Encerrado (ou Cancelado).',
          'Códigos obrigatórios de encerramento: Bem-sucedido, Bem-sucedido com problema, ou Sem sucesso (acionando plano de rollback).',
          'Toda alteração lógica em CLPs, IHMs ou SCADA deve registrar o número da RDM, OM ou Projeto no Sistema de Controle de Versionamento para auditoria completa.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registro de Requisição de Mudança (RDM)',
        identification: 'Número sequencial automático ITSM',
        storage: 'Plataforma Corporativa de ITSM',
        accessControl: 'Abertura por usuários/equipes; aprovação restrita a perfis autorizados',
        retention: 'Permanente',
        disposition: 'Base histórica auditável',
      },
      {
        name: 'Planejamento de Mudança de Risco Alto (CAB)',
        identification: 'Vinculado ao número da RDM',
        storage: 'Plataforma ITSM (anexo controlado)',
        accessControl: 'Membros do CAB-Automação e Equipe de Automação',
        retention: 'Permanente',
        disposition: 'Retido com a RDM',
      },
    ],
  },
  {
    id: 'iags-04',
    code: 'IAGS-04',
    revision: 'Rev. 01',
    title: 'Gestão de Incidentes em Serviços e Ativos de Automação',
    shortTitle: 'Gestão de Incidentes',
    domain: 'operacao',
    cadence: 'Operação 24x7 / Fechamento Auto 72h',
    ownerRole: 'Gestor de Incidentes de Automação',
    summary:
      'Restaura a operação normal dos serviços e ativos de automação no menor tempo possível conforme ANS/SLA, integrando ITSM, Ordens de Manutenção e escalonamento cibernético.',
    keyMetrics: [
      'Matriz Impacto (1-3) × Urgência (1-3) → Prioridades P1 a P5',
      'Integração estruturada entre ITSM e OM de campo (ERP/EAM)',
      'Escalonamento imediato de eventos CID/Malware para SI Industrial',
    ],
    references: [
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-06 — Central de Serviços de Automação',
      'IAGS-15 — Gestão de Logs e Eventos em Ativos de Automação',
      'Procedimento de Controle de Bypass / Jumper Industrial',
    ],
    sanitizationSummary:
      'Canais de atendimento, nomenclaturas de equipes e regras de integração ITSM × ERP/EAM neutralizados sem marcas comerciais.',
    sections: [
      {
        number: '1',
        title: 'Registro, Canais e Matriz de Priorização',
        paragraphs: [
          'Qualquer interrupção não planejada ou redução na qualidade de um serviço ou ativo de automação deve ser registrada via Portal ITSM, Telefone, Chat, E-mail, Agente Virtual ou atendimento presencial na Central de Serviços.',
        ],
        table: {
          caption: 'Tabela 1 — Matriz Impacto × Urgência → Prioridade',
          headers: ['Impacto \\ Urgência', '1 - Alta (Parado)', '2 - Média (Parcial)', '3 - Baixa (Operando)'],
          rows: [
            ['1 - Alto (Segurança, Meio Ambiente ou Paralisação)', 'P1 — Crítica', 'P2 — Alta', 'P3 — Média'],
            ['2 - Médio (Lentidão com baixo impacto produtivo)', 'P2 — Alta', 'P3 — Média', 'P4 — Baixa'],
            ['3 - Baixo (Sem paralisação ou degradação relevante)', 'P3 — Média', 'P4 — Baixa', 'P5 — Muito Baixa'],
          ],
        },
      },
      {
        number: '2',
        title: 'Integração entre Ordens de Manutenção (OM) e ITSM',
        table: {
          caption: 'Tabela 2 — Cenários de Coordenação Campo (ERP/EAM) × Automação (ITSM)',
          headers: ['Cenário', 'OM no ERP/EAM', 'Chamado ITSM', 'Conduta Operacional'],
          rows: [
            ['1', 'Não possui', 'Não possui', 'Instrumentação ou Operação registra chamado na Central de Serviços para triagem inicial.'],
            ['2', 'Possui OM', 'Não possui', 'Instrumentista atende em campo; ao identificar falha lógica/rede OT, abre chamado no ITSM referenciando a OM.'],
            ['3', 'Não possui', 'Possui ITSM', 'Automação diagnostica; se exigir intervenção física/elétrica em campo, solicita abertura de OM vinculada.'],
            ['4', 'Possui OM', 'Possui ITSM', 'Atuação coordenada entre Manutenção e Automação com rastreabilidade cruzada até a restauração.'],
          ],
        },
      },
      {
        number: '3',
        title: 'Contorno, Escalonamento de Segurança e Encerramento',
        bullets: [
          'Soluções de contorno (workarounds) envolvendo jumper ou bypass lógico devem obedecer estritamente ao protocolo corporativo de controle de bypasses com aprovação e prazo definido.',
          'Correções definitivas que alterem configuração ou lógica devem originar Requisição de Mudança (IAGS-03); incidentes críticos ou recorrentes disparam Análise de Causa Raiz (ACR).',
          'Suspeitas de violação de Confidencialidade, Integridade ou Disponibilidade (CID), malware, acesso físico/lógico indevido, compartilhamento de credenciais, engenharia social ou extravio são escalonadas imediatamente para a Gestão de Incidentes de SI (Equipe SI Industrial / SOC).',
          'Estados no ITSM: Novo → Em andamento ↔ Pendente → Resolvido → Encerrado (ou Cancelado). Após resolução, ocorre validação pelo solicitante com fechamento automático em 72h (ou encerramento pelo Supervisor após 15 dias sem resposta) e disparo de pesquisa de satisfação.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registro de Incidente de Automação',
        identification: 'Número sequencial ITSM (INC)',
        storage: 'Plataforma Corporativa de ITSM',
        accessControl: 'Consulta por solicitantes e equipes técnicas; edição conforme fila de atendimento',
        retention: 'Permanente',
        disposition: 'Mantido na base histórica para análise de tendências e auditorias',
      },
    ],
  },
  {
    id: 'iags-05',
    code: 'IAGS-05',
    revision: 'Rev. 01',
    title: 'Gestão do Catálogo de Serviços de Automação',
    shortTitle: 'Catálogo de Serviços',
    domain: 'operacao',
    cadence: 'Consistência Anual ou Sob Demanda',
    ownerRole: 'Gestor do Catálogo de Serviços',
    summary:
      'Padroniza a estruturação, aprovação, publicação, atualização e revisão anual de consistência dos serviços de automação oferecidos à Organização no portal ITSM.',
    keyMetrics: [
      '2 categorias: Apoio ao Negócio e Interno de Automação',
      'Ficha de Serviço obrigatória com Responsável e SLA definidos',
      'Relatório de Análise de Consistência anual ou sob demanda',
    ],
    references: [
      'IAGS-01 — Estrutura de Governança de Serviços de Automação',
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-07 — Gestão de Solicitação de Serviços de Automação',
      'ITIL Service Catalogue Management',
    ],
    sanitizationSummary:
      'Estrutura de categorias, aprovações e formulários sanitizados para o padrão corporativo neutro IAGS.',
    sections: [
      {
        number: '1',
        title: 'Taxonomia do Catálogo de Serviços',
        paragraphs: [
          'O Catálogo consolida em uma fonte única todos os serviços ativos e suportados pela área de Automação, divididos em duas macrocategorias:',
        ],
        bullets: [
          'Serviços de Apoio ao Negócio: serviços diretamente consumidos pelas áreas industriais e operacionais (ex.: suporte a sistemas de controle, automação de processo, relatórios operacionais).',
          'Serviços Internos de Automação: serviços técnicos de sustentação (ex.: Equipamentos e Infraestrutura OT, Gestão de Acessos, Aplicações Industriais e Cibersegurança Industrial).',
        ],
      },
      {
        number: '2',
        title: 'Ciclo de Publicação e Alteração de Serviços',
        subsections: [
          {
            code: '2.1',
            title: 'Ficha de Serviço de Automação',
            paragraphs: [
              'Todo serviço catalogado deve possuir uma Ficha de Serviço especificando: escopo detalhado, Responsável obrigatório pelo Serviço, Acordos de Nível de Serviço (SLA/ANS), regime de suporte, dependências de ativos/terceiros, restrições operacionais e relação custo/benefício.',
            ],
          },
          {
            code: '2.2',
            title: 'Fluxo de Aprovação e Carga',
            bullets: [
              'Elaboração da estrutura taxonômica validada pelo Líder de Governança IAGS.',
              'Preenchimento da Ficha de Serviço e aprovação técnica pelo Supervisor de Automação.',
              'Validação de aderência pela Governança de TI/ITSM e carga em produção pela equipe de Sustentação do Portal.',
              'Comunicação oficial aos usuários e áreas clientes.',
              'Na descontinuação de um serviço, o item é marcado como "Inativo" para preservar rastreabilidade histórica; caso envolva desativação de infraestrutura ou ativos, é obrigatória abertura de RDM (IAGS-03).',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Análise de Consistência do Catálogo',
        paragraphs: [
          'Anualmente, ou sob demanda após reorganizações tecnológicas, o Gestor do Catálogo executa verificação completa de consistência comparando serviços publicados, fichas vigentes, responsáveis ativos e SLAs praticados, emitindo o Relatório de Análise de Consistência.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Ficha de Serviços de Automação',
        identification: 'Código do Serviço / Versão',
        storage: 'Repositório Corporativo de Governança / ITSM',
        accessControl: 'Edição restrita ao Gestor do Catálogo e Supervisão',
        retention: 'Permanente',
        disposition: 'Histórico preservado mesmo após inativação',
      },
      {
        name: 'Relatório de Análise de Consistência do Catálogo',
        identification: 'Ano / Sequencial',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Comitê IAGS, Supervisão e Auditoria',
        retention: 'Permanente',
        disposition: 'Arquivamento digital permanente',
      },
    ],
  },
  {
    id: 'iags-06',
    code: 'IAGS-06',
    revision: 'Rev. 01',
    title: 'Central de Serviços de Automação',
    shortTitle: 'Central de Serviços',
    domain: 'operacao',
    cadence: 'Triagem Contínua / 4 Níveis',
    ownerRole: 'Líder da Central de Serviços de Automação',
    summary:
      'Define o modelo de atendimento em 4 níveis de suporte e a matriz de triagem que roteia demandas de campo, usuários e alertas de monitoramento para o processo adequado.',
    keyMetrics: [
      '4 níveis estruturados de suporte (N1 a N4 Fornecedores)',
      'Roteamento determinístico para Incidente, Mudança, Requisição ou SI',
      'Integração direta com Instrumentação (OM), NOC e SOC/SI Industrial',
    ],
    references: [
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-04 — Gestão de Incidentes em Serviços e Ativos de Automação',
      'IAGS-07 — Gestão de Solicitação de Serviços de Automação',
      'IAGS-15 — Gestão de Logs e Eventos em Ativos de Automação',
    ],
    sanitizationSummary:
      'Níveis de cargo internos, filas proprietárias e ferramentas comerciais generalizados para papéis funcionais padrão de automação.',
    sections: [
      {
        number: '1',
        title: 'Arquitetura de Suporte em 4 Níveis',
        table: {
          caption: 'Tabela 1 — Camadas de Atendimento da Central de Serviços OT',
          headers: ['Nível', 'Composição Funcional', 'Escopo de Atuação'],
          rows: [
            [
              '1º Nível (N1)',
              'Planejador de Automação, Service Desk e Field Service',
              'Recepção, registro, triagem inicial, checklists padronizados, mudanças pré-aprovadas de baixo impacto, suporte a periféricos, estações e contas básicas de diretório.',
            ],
            [
              '2º Nível (N2)',
              'Técnicos de Automação Plenos e Analistas Juniores',
              'Diagnóstico e restauração em CLPs, sistemas SCADA/IHM, redes industriais básicas e tratativa de solicitações técnicas de média complexidade.',
            ],
            [
              '3º Nível (N3)',
              'Técnicos Sêniores, Analistas Plenos/Sêniores e Especialistas',
              'Incidentes críticos e gestão de crise, mudanças emergenciais, Controle Avançado de Processo (APC), engenharia complexa e acionamento técnico de fabricantes.',
            ],
            [
              '4º Nível (N4)',
              'Fornecedores, Integradores e Fabricantes',
              'Atendimento especializado sob contrato de suporte, garantia ou manutenção corretiva de hardware/software proprietário.',
            ],
          ],
        },
        note: 'Equipes de Instrumentação realizam o primeiro atendimento de campo via Ordem de Manutenção (OM) no ERP/EAM. As equipes de NOC e SOC/SI Industrial analisam alertas automatizados de rede e cibersegurança antes do acionamento.',
      },
      {
        number: '2',
        title: 'Matriz de Triagem e Roteamento de Demandas',
        table: {
          caption: 'Tabela 2 — Regras de Encaminhamento na Triagem',
          headers: ['Natureza da Demanda Identificada', 'Processo de Destino'],
          rows: [
            ['Interrupção, falha ou degradação não planejada de ativo/serviço', 'Gestão de Incidentes de Automação (IAGS-04)'],
            ['Necessidade de alteração planejada ou emergencial em ativo/lógica', 'Gestão de Mudanças (IAGS-03)'],
            ['Suspeita cibernética, malware, violação de acesso ou perda de ativo', 'Gestão de Incidentes de SI (SOC / SI Industrial)'],
            ['Pedido padrão previsto no Catálogo (acesso, relatório, orientação, instalação)', 'Gestão de Solicitação de Serviços (IAGS-07)'],
            ['Demanda fora do escopo de Automação ou duplicada', 'Recusa justificada ou redirecionamento para fila corporativa correta'],
          ],
        },
      },
    ],
    controlledRecords: [
      {
        name: 'Registro de Demandas e Atendimentos da Central de Serviços',
        identification: 'Número de Ticket ITSM',
        storage: 'Plataforma Corporativa de ITSM',
        accessControl: 'Restrito às equipes de atendimento e auditoria conforme perfil',
        retention: 'Permanente',
        disposition: 'Mantido para métricas de SLA, volume e auditoria',
      },
    ],
  },
  {
    id: 'iags-07',
    code: 'IAGS-07',
    revision: 'Rev. 01',
    title: 'Gestão de Solicitação de Serviços de Automação',
    shortTitle: 'Solicitação de Serviços',
    domain: 'operacao',
    cadence: 'SLAs P1 (1d) a P7 (7d/Parada)',
    ownerRole: 'Gestor de Solicitações de Automação',
    summary:
      'Regula o atendimento de requisições padronizadas do Catálogo de Serviços, estabelecendo fluxos de aprovação, prioridades P1 a P7 e verificação prévia de segurança do trabalho (APR/PTP).',
    keyMetrics: [
      '2 categorias: Pré-aprovados vs. Necessita Aprovação Técnica/Gerencial',
      'Escala de prioridades P1 (1 dia) até P7 (Operacional / Parada)',
      'Checagem obrigatória de APR e PTP antes de intervenção física',
    ],
    references: [
      'IAGS-05 — Gestão do Catálogo de Serviços de Automação',
      'IAGS-06 — Central de Serviços de Automação',
      'Normas de Segurança do Trabalho (APR / PTP)',
    ],
    sanitizationSummary:
      'Prioridades, papéis de aprovação e estados padronizados sem menção a departamentos ou sistemas legados.',
    sections: [
      {
        number: '1',
        title: 'Categorias e Fluxo de Aprovação',
        bullets: [
          'Serviços Pré-aprovados: itens catalogados sem risco a pessoas ou meio ambiente, sem impacto produtivo e sem custo adicional — seguem diretamente para fila de execução.',
          'Serviços com Aprovação Obrigatória: exigem validação técnica (Responsável pelo Serviço) e/ou aprovação gerencial (Supervisor de Automação) quando envolvem aquisição de recursos, ativos obsoletos sem sobressalente, impacto multiárea ou concessão de privilégios.',
        ],
      },
      {
        number: '2',
        title: 'Tabela de Prioridades e Prazos de Atendimento',
        table: {
          caption: 'Tabela 1 — Classificação de Prioridades (P1 a P7)',
          headers: ['Prioridade', 'Denominação', 'Critério Operacional', 'Prazo Alvo'],
          rows: [
            ['P1', 'Emergência', 'Equipamento/planta parada, risco iminente ou segurança/meio ambiente', 'Até 1 dia'],
            ['P2', 'Urgência', 'Planta operando com ativo de suporte parado ou degradado', 'Até 2 dias'],
            ['P3', 'Programação Semanal', 'Demanda operacional planejável no horizonte da semana', 'Até 7 dias'],
            ['P4', 'Programação Quinzenal', 'Demanda planejada com preparação de recursos', 'Até 14 dias'],
            ['P5', 'Normal', 'Demanda padrão sem urgência operacional', 'Até 28 dias'],
            ['P6', 'Normal Parada', 'Execução condicionada à janela de Parada Programada', 'Próxima Parada'],
            ['P7', 'Demanda Operacional Padrão', 'Rotinas padronizadas de apoio operacional', 'Até 7 dias'],
          ],
        },
      },
      {
        number: '3',
        title: 'Segurança na Execução e Encerramento',
        paragraphs: [
          'Antes de qualquer execução em campo ou painel elétrico/industrial, o executante deve validar a emissão de Análise Preliminar de Risco (APR) e Permissão de Trabalho Perigoso (PTP) quando aplicáveis.',
          'O ciclo de estados compreende: Aberto → Aguardando Aprovação → Pendente / Em Andamento → Encerrado Concluído, Encerrado Incompleto (Cancelado) ou Encerrado Ignorado (sem retorno do solicitante).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registro da Solicitação de Serviço de Automação',
        identification: 'Número de Requisição ITSM (REQ)',
        storage: 'Plataforma Corporativa de ITSM',
        accessControl: 'Consulta por solicitante, aprovadores e equipe técnica',
        retention: 'Permanente',
        disposition: 'Base histórica auditável',
      },
    ],
  },
  {
    id: 'iags-08',
    code: 'IAGS-08',
    revision: 'Rev. 01',
    title: 'Gestão de Acesso Lógico aos Ativos de Automação',
    shortTitle: 'Acesso Lógico (IAM)',
    domain: 'identidade',
    cadence: 'Análise Crítica Anual + Offboarding',
    ownerRole: 'Responsável por Acesso Lógico OT',
    summary:
      'Estabelece o controle de identidades baseado em AAA, segregação estrita de funções, governança de terceiros, proteção de código-fonte/lógica e revisão crítica anual de acessos.',
    keyMetrics: [
      'Segregação rígida: Solicitação → Aprovação → Aval. Técnica → Autorização → Concessão',
      'Controle exclusivo de código-fonte (1 usuário por vez + versionamento)',
      'Revogação imediata em desligamento, transferência ou fim de startup',
    ],
    references: [
      'IAGS-09 — Gestão de Contas com Privilégio de Acesso aos Ativos de Automação',
      'IAGS-12 — Gestão de Segurança Física em Automação',
      'IAGS-15 — Gestão de Logs e Eventos em Ativos de Automação',
      'ISO/IEC 27002 (Controle de Acesso) e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Nomes de áreas corporativas substituídos por Equipe de Controle de Acesso TI, Equipe de Acesso Lógico de Automação e Gerente Responsável pelo Ativo.',
    sections: [
      {
        number: '1',
        title: 'Princípios Fundamentais e Segregação de Funções',
        paragraphs: [
          'O acesso lógico aos ativos de automação obedece aos pilares AAA (Autenticação, Autorização e Auditoria) e aos princípios de Necessidade de Conhecimento e Necessidade de Uso (Privilégio Mínimo). Contas são estritamente individuais e intransferíveis; contas compartilhadas só são toleradas sob restrição técnica documentada e compensada.',
        ],
        table: {
          caption: 'Tabela 1 — Fluxo Obrigatório com Segregação de Funções',
          headers: ['Etapa', 'Responsável', 'Ação Obrigatória'],
          rows: [
            ['1. Solicitação', 'Solicitante ou Gestor', 'Abrir requisição formal via ITSM especificando ativo, perfil e justificativa.'],
            ['2. Aprovação Gerencial', 'Gestor do Solicitante', 'Validar necessidade funcional conforme cargo ou contrato vigente.'],
            ['3. Avaliação Técnica', 'Automação / Infraestrutura TI', 'Confirmar aderência técnica, perfil mínimo e compatibilidade do ativo.'],
            ['4. Autorização do Ativo', 'Gerente Responsável pelo Ativo', 'Autorizar formalmente o ingresso no ativo crítico sob sua custódia.'],
            [
              '5. Concessão / Revogação',
              'Controle de Acesso TI (AD) ou Acesso Lógico Automação (fora do AD)',
              'Provisionar ou revogar credenciais sem sobreposição de papéis com os aprovadores.',
            ],
          ],
        },
      },
      {
        number: '2',
        title: 'Ciclo de Vida, Terceiros e Controles Especiais',
        bullets: [
          'Terceiros e Integradores: vigência do acesso nunca pode exceder a data final do contrato, ficando restrita à atividade contratada e obrigatoriamente revogada após operação assistida/startup.',
          'Onboarding, Transferências e Offboarding: em mudanças de área, o gestor de origem deve solicitar revogação imediata e o gestor de destino solicitar novo acesso adequado; em desligamentos, a revogação é prioritária e sincronizada.',
          'Programas Utilitários Críticos: mantidos isolados, disponibilizados somente por tempo limitado (preferencialmente em parada programada) e removidos quando não necessários.',
          'Controle de Código-Fonte e Lógicas (CLPs, IHMs, SCADA): edição restrita a um usuário por vez (check-out/check-in), armazenamento centralizado no Sistema de Controle de Versionamento e rotina de backup auditada.',
        ],
      },
      {
        number: '3',
        title: 'Análise Crítica e Auditorias',
        paragraphs: [
          'Anualmente, ou sob demanda, é realizada a Análise Crítica de Acessos Lógicos com revisão de todos os perfis ativos junto aos gestores responsáveis, complementada por auditorias independentes de Auditoria Interna, Gestão de Riscos e SI Industrial.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Relatório de Análise Crítica dos Acessos Lógicos',
        identification: 'Ano / Escopo de Ativos',
        storage: 'Repositório Corporativo de Governança / ITSM',
        accessControl: 'Responsáveis pelos Ativos, Governança, SI e Auditoria',
        retention: 'Permanente',
        disposition: 'Evidência permanente de conformidade',
      },
    ],
  },
];
