import { IagsProcedure } from './proceduresTypes';

export const PROCEDURES_PART_2: IagsProcedure[] = [
  {
    id: 'iags-09',
    code: 'IAGS-09',
    revision: 'Rev. 01',
    title: 'Gestão de Contas com Privilégio de Acesso aos Ativos de Automação',
    shortTitle: 'Contas Privilegiadas (PAM)',
    domain: 'identidade',
    cadence: 'Revisão Semestral + Cofre PAM',
    ownerRole: 'Responsável por Contas Privilegiadas OT',
    summary:
      'Regula a criação, custódia em cofre de senhas, rotação obrigatória, monitoramento contínuo e revisão semestral de contas administrativas e de serviço em ativos críticos OT.',
    keyMetrics: [
      '4 perfis privilegiados com matriz de cofre e controle de senha',
      'Revisão crítica semestral obrigatória + monitoramento SIEM 24x7',
      'Rotação imediata de senha em caso de desligamento de detentor',
    ],
    references: [
      'IAGS-08 — Gestão de Acesso Lógico aos Ativos de Automação',
      'IAGS-15 — Gestão de Logs e Eventos em Ativos de Automação',
      'ISO/IEC 27002 (Acesso Privilegiado) e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Controles de contas privilegiadas padronizados sem siglas organizacionais ou marcas de cofres proprietários.',
    sections: [
      {
        number: '1',
        title: 'Matriz de Controles por Perfil Privilegiado',
        paragraphs: [
          'Contas com privilégios elevados possuem alto potencial de impacto sobre a integridade e disponibilidade industrial. Seu provisionamento exige aprovação do Gerente do Solicitante, avaliação técnica e autorização formal do Gerente do Ativo.',
        ],
        table: {
          caption: 'Tabela 1 — Controles Obrigatórios por Tipo de Conta Privilegiada',
          headers: ['Tipo de Conta', 'Controle Direto de Senha', 'Cofre de Senha (PAM)', 'Monitoramento de Logs'],
          rows: [
            ['Suporte (ADM Local)', 'Sim (gestão restrita)', 'Não', 'Sim (contínuo)'],
            ['Conta de Serviço', 'Sim (privilégio mínimo; isenta de bloqueio automático)', 'Não', 'Sim (contínuo)'],
            ['Desenvolvimento TO (Interno)', 'Não (acesso mediado)', 'Sim (servidores)', 'Sim (contínuo)'],
            ['Desenvolvimento Terceiros (Temporário)', 'Não (acesso mediado e com prazo)', 'Sim (servidores)', 'Sim (contínuo)'],
          ],
        },
      },
      {
        number: '2',
        title: 'Regras de Uso, Rotação e Monitoramento',
        bullets: [
          'É estritamente proibido utilizar contas privilegiadas para navegação na internet, leitura de e-mail corporativo ou atividades rotineiras não administrativas.',
          'Sempre que um colaborador ou terceiro com conhecimento da senha de uma conta de Suporte ou Conta de Serviço for desligado ou realocado, deve ser aberta solicitação imediata para rotação da credencial.',
          'Todas as sessões e eventos de contas privilegiadas são monitorados continuamente (IAGS-15); qualquer uso anômalo ou fora de janela autorizada é escalonado como Incidente de Segurança da Informação.',
          'A Análise Crítica de Contas Privilegiadas ocorre obrigatoriamente a cada 6 meses (semestral), verificando vigência, justificativa e aderência ao cofre de senhas.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Controle de Acessos Privilegiados de Automação',
        identification: 'Inventário PAM / Ativo Crítico',
        storage: 'Plataforma de Gestão de Privilégios / Repositório Seguro',
        accessControl: 'Restrito aos administradores de SI, Governança e Auditoria',
        retention: 'Permanente',
        disposition: 'Histórico auditável mantido',
      },
      {
        name: 'Relatório de Análise Crítica Semestral de Contas Privilegiadas',
        identification: 'Ano / Semestre (ex.: 2026-S1)',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Comitê IAGS, SI Industrial e Auditoria Interna',
        retention: 'Permanente',
        disposition: 'Arquivamento digital permanente',
      },
    ],
  },
  {
    id: 'iags-10',
    code: 'IAGS-10',
    revision: 'Rev. 01',
    title: 'Gestão de Vulnerabilidade e Conformidade Técnica dos Ativos de Automação',
    shortTitle: 'Vulnerabilidades & Conformidade',
    domain: 'ciberseguranca',
    cadence: 'GVT Mensal / GCT Anual / SLAs 60-180d',
    ownerRole: 'Coordenador de Cibersegurança OT',
    summary:
      'Orquestra varreduras mensais de vulnerabilidades (GVT), verificações anuais de baseline (GCT), testes de intrusão controlados (TDI/TDE) e prazos de remediação de 60 a 180 dias.',
    keyMetrics: [
      'SLAs Críticos: Crítica 60d · Alta 90d · Média 120d · Baixa 180d',
      'CLPs/Remotas e Nobreaks excluídos de TDI/TDE por segurança de planta',
      'Sequência segura: Fabricante → Off-line → Stand-by → Produção (RDM)',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação',
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-14 — Homologação, Instalação e Atualização de Software de Automação',
      'CVSS v3.1 / CVE, ISO/IEC 27002 e ISA/IEC 62443',
    ],
    sanitizationSummary:
      'Matriz de responsabilidades por ativo reescrita com nomes funcionais padrão (Automação, SI Industrial, Infraestrutura TI, Manutenção).',
    sections: [
      {
        number: '1',
        title: 'Pilares Técnicos: GVT, GCT e Testes de Intrusão',
        bullets: [
          'Gestão de Vulnerabilidade Técnica (GVT): verificação mensal e sob demanda para identificação de vulnerabilidades conhecidas (CVE/CVSS) nos ativos de automação.',
          'Gestão de Conformidade Técnica (GCT): verificação cíclica anual por amostragem (e sob demanda) para validar aderência dos ativos às baselines de hardening aprovadas.',
          'Testes de Intrusão (TDI — Interno/Caixa Branca e TDE — Externo/Caixa Preta): coordenados por Auditoria Interna e SI Industrial mediante Acordo de Confidencialidade (NDA). Por segurança operacional, CLPs/Remotas e Nobreaks Industriais são expressamente excluídos do escopo de testes ativos de intrusão.',
        ],
      },
      {
        number: '2',
        title: 'Matriz de Responsabilidade por Classe de Ativo',
        table: {
          caption: 'Tabela 1 — Responsáveis pela Remediação e Conformidade',
          headers: ['Grupo de Ativos', 'Equipe Responsável'],
          rows: [
            ['CLPs / Remotas, IHMs, Switches Industriais e Aplicações OT (SCADA/Historian)', 'Equipe de Automação'],
            ['Firewalls Industriais e Endpoints Industriais (EDR/Proteção OT)', 'Segurança da Informação Industrial (SI Industrial)'],
            ['Active Directory, DNS/DHCP, SO e Hardware de Estações e Servidores', 'Infraestrutura de TI / Workplace / Redes'],
            ['Nobreaks Industriais', 'Equipe de Manutenção Elétrica / Predial'],
          ],
        },
      },
      {
        number: '3',
        title: 'Prazos de Remediação e Sequência Segura de Atualização',
        table: {
          caption: 'Tabela 2 — Metas de Tratamento para Ativos Críticos (Alinhadas a Paradas)',
          headers: ['Severidade (CVSS)', 'Prazo Máximo Alvo', 'Opções de Tratamento'],
          rows: [
            ['Crítica (9.0 – 10.0)', 'Até 60 dias', 'Patch homologado, hardening/segmentação ou controle compensatório imediato'],
            ['Alta (7.0 – 8.9)', 'Até 90 dias', 'Atualização planejada via RDM ou mitigação compensatória validada'],
            ['Média (4.0 – 6.9)', 'Até 120 dias', 'Aplicação em janela programada ou ajuste de firewall/baseline'],
            ['Baixa (0.1 – 3.9)', 'Até 180 dias', 'Remediação em ciclo de manutenção ou aceite formal de risco'],
          ],
        },
        note: 'Sequência obrigatória de patching OT: (1) Homologação oficial do fabricante → (2) Teste em ativo off-line/bancada → (3) Aplicação em ativo backup/stand-by → (4) Implantação em produção principal mediante RDM (IAGS-03) com plano de rollback. O aceite de risco residual exige aprovação formal da Gerência e reporte à Gestão de Riscos Corporativa.',
      },
    ],
    controlledRecords: [
      {
        name: 'Relatório de Análise de Vulnerabilidade e Conformidade Técnica',
        identification: 'Ano / Mês ou Ciclo GCT',
        storage: 'Repositório Seguro de SI Industrial',
        accessControl: 'Restrito a SI Industrial, Automação, Infra TI e Auditoria',
        retention: 'Permanente',
        disposition: 'Armazenamento criptografado permanente',
      },
      {
        name: 'Relatório de Testes de Intrusão (TDI / TDE)',
        identification: 'Ano / Escopo / Classificação Confidencial',
        storage: 'Repositório Seguro de Auditoria e SI',
        accessControl: 'Acesso estritamente restrito (Need-to-Know)',
        retention: 'Permanente',
        disposition: 'Armazenamento criptografado permanente',
      },
    ],
  },
  {
    id: 'iags-11',
    code: 'IAGS-11',
    revision: 'Rev. 01',
    title: 'Gestão de Continuidade da Infraestrutura Crítica de Automação',
    shortTitle: 'Continuidade (DRP/PCN)',
    domain: 'resiliencia',
    cadence: 'Análise Anual / Testes ≤ 2 anos',
    ownerRole: 'Coordenador de Continuidade OT',
    summary:
      'Garante a resiliência e recuperação da infraestrutura crítica de automação frente a disrupções, definindo BIA, RTO/RPO, arquiteturas redundantes, backups segregados e testes bienais.',
    keyMetrics: [
      '5 classes críticas de continuidade (CLP, IHM, SCADA, Switch, Firewall)',
      'Testes de contingência no máximo a cada 2 anos (em parada programada)',
      'Análise crítica anual independente da ocorrência de crises',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação',
      'IAGS-04 — Gestão de Incidentes em Serviços e Ativos de Automação',
      'IAGS-12 — Gestão de Segurança Física em Automação',
      'ISO 22301 (Continuidade de Negócios) e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Planos corporativos e infraestruturas específicas generalizados para PCN, DRP, Data Centers redundantes e ativos críticos padrão.',
    sections: [
      {
        number: '1',
        title: 'Conceitos, Crise e Escopo de Ativos Críticos',
        paragraphs: [
          'A Gestão de Continuidade baseia-se na Análise de Impacto no Negócio (BIA) para definir o Tempo de Recuperação Total (RTO) e o Objetivo de Ponto de Recuperação (RPO). Uma disrupção cuja indisponibilidade supere o RTO configura formalmente uma Crise, acionando o Plano de Recuperação de Desastres (DRP) e o Plano de Continuidade de Negócios (PCN).',
        ],
        bullets: [
          'Escopo prioritário (5 classes): CLP / Remotas, IHM, Sistema Supervisório (SCADA), Switch Industrial e Firewall Industrial (este último com plano corporativo dedicado testado em parada geral).',
        ],
      },
      {
        number: '2',
        title: 'Arquitetura de Redundância e Prontidão de Recuperação',
        table: {
          caption: 'Tabela 1 — Controles de Redundância e Recuperação OT',
          headers: ['Camada', 'Mecanismos Obrigatórios de Continuidade'],
          rows: [
            ['Infraestrutura Computacional', 'Data Centers redundantes com replicação de dados e Active Directory redundante dedicado à Automação.'],
            ['Rede e Perímetro', 'Backbone de rede industrial redundante (anel/dupla abordagem), SCADA e Firewalls em alta disponibilidade (ativo-standby).'],
            ['Energia e Operação', 'Nobreaks industriais e geradores de emergência testados, além de procedimentos validados de operação em modo manual seguro.'],
            [
              'Backups e Kit de Recuperação',
              'Backups completos e incrementais armazenados em locais fisicamente distintos, snapshots/clones de VMs, mídias de instalação, cabos de programação, notebooks de contingência e estoque de sobressalentes críticos.',
            ],
          ],
        },
        note: 'Controles Compensatórios em Crise: qualquer redução temporária de controles de cibersegurança durante uma disrupção só é permitida mediante avaliação conjunta com SI Industrial, aprovação do Comitê de Crise, registro documental e monitoramento reforçado até a normalização.',
      },
      {
        number: '3',
        title: 'Cadência de Testes e Revisão',
        bullets: [
          'Testes práticos de contingência e validação de recuperação realizados no máximo a cada 2 anos, sincronizados com janelas de paradas programadas de planta.',
          'Análise crítica anual dos planos, contatos de emergência, sobressalentes e métricas RTO/RPO, independentemente da ocorrência de disrupções reais.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registro de Contingência e Testes de Continuidade OT',
        identification: 'Ano / Classe de Ativo / Cenário Testado',
        storage: 'Repositório Corporativo de Continuidade (com cópia offline)',
        accessControl: 'Equipe de Continuidade, Automação, SI e Comitê de Crise',
        retention: 'Permanente',
        disposition: 'Mantido para evolução do DRP/PCN e auditorias',
      },
    ],
  },
  {
    id: 'iags-12',
    code: 'IAGS-12',
    revision: 'Rev. 01',
    title: 'Gestão de Segurança Física em Automação',
    shortTitle: 'Segurança Física',
    domain: 'resiliencia',
    cadence: 'Revisão Anual de Perímetros e Acessos',
    ownerRole: 'Gestor de Segurança Física OT',
    summary:
      'Classifica perímetros industriais em criticidade Alta, Média e Baixa, define 7 domínios de proteção física/ambiental e controla credenciais físicas permanentes, temporárias e pontuais.',
    keyMetrics: [
      '3 níveis de perímetro: Alta (DC/NR10/Salas CLP), Média e Baixa',
      '7 domínios físicos alinhados à ISO 27002 e ISA/IEC 62443-2-1',
      'Revisão anual da lista de autorizados sincronizada com Offboarding',
    ],
    references: [
      'IAGS-08 — Gestão de Acesso Lógico aos Ativos de Automação',
      'IAGS-13 — Proteção e Manutenção de Ativos Críticos de Automação',
      'NR-10 (Segurança em Instalações Elétricas), ISO/IEC 27002 e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Nomes de áreas produtivas locais removidos; perímetros reclassificados por tipologia técnica universal (Data Centers, Subestações NR10, Salas de CLP e Controle).',
    sections: [
      {
        number: '1',
        title: 'Classificação de Perímetros Industriais',
        table: {
          caption: 'Tabela 1 — Níveis de Criticidade Física de Ambientes OT',
          headers: ['Nível', 'Ambientes Abrangidos', 'Controles Reforçados'],
          rows: [
            [
              'ALTA',
              'Data Centers, Subestações elétricas (exigência NR-10), Salas de CLPs, Salas de Controle Operacional, Estações de Monitoramento Remoto e Perímetro Externo de Sirenes.',
              'Controle biométrico/crachá restrito, CFTV contínuo, registro de entrada/saída, proteção contra incêndio/climatização e supervisão rigorosa.',
            ],
            [
              'MÉDIA',
              'Salas Elétricas (NR-10), Cabines de Automação/Robótica, Laboratórios com ativos em rede OT e Escritórios com equipamentos conectados.',
              'Trancamento controlado, acesso por perfil autorizado, inspeção periódica e segregação de rede.',
            ],
            [
              'BAIXA',
              'Áreas industriais internas e externas gerais sem concentração de ativos centrais.',
              'Controle perimetral de planta, sinalização de segurança e proteção física local de painéis.',
            ],
          ],
        },
      },
      {
        number: '2',
        title: 'Sete Domínios de Segurança Física e Regras de Acesso',
        bullets: [
          'Os 7 domínios obrigatórios cobrem: (1) Perímetros de segurança física; (2) Controles de entrada física (biometria, crachás, logs, CFTV); (3) Segurança de salas e instalações; (4) Monitoramento contínuo; (5) Proteção contra ameaças físicas e ambientais; (6) Trabalho supervisionado em áreas seguras; (7) Serviços de utilidades (energia, incêndio, climatização, telecom).',
          'Acesso Permanente: equipes de Elétrica, Predial, Instrumentação, Automação, Brigada, Limpeza, Planejadores e TI — concedido via ITSM com aprovação do Supervisor/Gestor do ambiente e revogado automaticamente no Offboarding.',
          'Acesso Temporário: terceiros e projetos pontuais com prazo de validade explícito, identificação visível e acompanhamento técnico.',
          'Acesso Pontual: visitantes previamente agendados, registrados em portaria/sala e permanentemente acompanhados.',
          'Revisão anual obrigatória da lista de pessoas autorizadas e análise crítica anual da integridade física dos ambientes.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Relatório de Análise Crítica de Segurança Física',
        identification: 'Ano / Unidade / Perímetro',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Gestores de Ambiente, Automação, Segurança Patrimonial e SI',
        retention: 'Permanente',
        disposition: 'Arquivamento digital permanente',
      },
      {
        name: 'Lista de Pessoas Autorizadas e Recomendações de Controles',
        identification: 'Perímetro / Data de Revisão',
        storage: 'Sistema de Controle de Acesso Físico / Repositório Seguro',
        accessControl: 'Segurança Patrimonial, Gestores de Ambiente e Auditoria',
        retention: 'Permanente',
        disposition: 'Histórico de acessos mantido',
      },
    ],
  },
  {
    id: 'iags-13',
    code: 'IAGS-13',
    revision: 'Rev. 01',
    title: 'Proteção e Manutenção de Ativos Críticos de Automação',
    shortTitle: 'Proteção & Manutenção',
    domain: 'resiliencia',
    cadence: 'Inspeção Anual por Amostragem',
    ownerRole: 'Responsável por Manutenção de Ativos OT',
    summary:
      'Estabelece 8 categorias de salvaguarda física, cabeamento, manutenção supervisionada, mesa/tela limpa e descarte seguro para as 9 classes de hardware crítico de automação.',
    keyMetrics: [
      '9 classes de hardware crítico (incluindo Servidores e Geradores OT)',
      '8 categorias de proteção física, ambiental e de descarte seguro',
      'Análise crítica anual por amostragem via Planos de Inspeção',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação',
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-12 — Gestão de Segurança Física em Automação',
      'IAGS-15 — Gestão de Logs e Eventos em Ativos de Automação',
    ],
    sanitizationSummary:
      'Diretrizes consolidadas em linguagem técnica padronizada, preservando integralmente as 9 classes de hardware e os 8 controles operacionais.',
    sections: [
      {
        number: '1',
        title: 'Escopo das 9 Classes de Hardware Crítico',
        paragraphs: [
          'Aplica-se à proteção física e manutenção controlada das seguintes classes: (1) CLP/Remotas, (2) Estação de Operação, (3) Estação de Engenharia, (4) Firewall Industrial, (5) IHM, (6) Switch Industrial, (7) Servidores de Automação, (8) Nobreak Industrial e (9) Geradores de Energia que sustentam a infraestrutura de automação.',
          'Ativos classificados com Criticidade A (Alta), B (Média) ou C (Baixa) recebem controles proporcionais, com atenção redobrada quando um ativo de criticidade A encontra-se fisicamente instalado em ambiente de criticidade física menor.',
        ],
      },
      {
        number: '2',
        title: 'Oito Categorias de Controle de Proteção e Manutenção',
        table: {
          caption: 'Tabela 1 — Salvaguardas Obrigatórias de Equipamentos Críticos',
          headers: ['Categoria', 'Requisitos Operacionais'],
          rows: [
            ['1. Localização e Proteção', 'Instalação protegida contra poeira, umidade, vibração, interferência eletromagnética e acesso não autorizado.'],
            ['2. Segurança do Cabeamento', 'Segregação de cabos de dados e energia, eletrodutos/bandejas protegidos e identificação padronizada.'],
            ['3. Manutenção Supervisionada', 'Preventivas e corretivas executadas conforme recomendação do fabricante, alinhadas a Mudanças (IAGS-03) e acompanhadas quando realizadas por terceiros.'],
            ['4. Ativos Fora das Dependências', 'Transporte ou reparo externo somente com autorização formal, controle de saída patrimonial e proteção de dados embarcados.'],
            ['5. Descarte Seguro ou Reutilização', 'Sanitização ou destruição certificada de discos, cartões de memória e configurações antes de descarte ou reaproveitamento.'],
            ['6. Mesa Limpa e Tela Limpa', 'Bloqueio automático de sessões em estações de engenharia/operação e proibição de senhas ou diagramas sensíveis expostos.'],
            ['7. Remoção Autorizada', 'Nenhum equipamento ou módulo sobressalente pode ser retirado de painel ou sala sem registro formal.'],
            ['8. Equipamento Sem Monitoração', 'Estações desassistidas devem permanecer bloqueadas fisicamente/logicamente e monitoradas via logs (IAGS-15).'],
          ],
        },
      },
      {
        number: '3',
        title: 'Inspeção Periódica e Auditoria',
        paragraphs: [
          'Além do monitoramento contínuo de eventos de saúde e segurança (IAGS-15), executa-se análise crítica anual por amostragem (ou sob demanda) guiada por Planos de Inspeção, gerando Recomendações de Controles e suportando auditorias independentes.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Recomendação de Controles de Proteção e Manutenção',
        identification: 'Código de Inspeção / Ano',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Automação, Manutenção, SI e Auditoria',
        retention: 'Permanente',
        disposition: 'Acompanhamento até encerramento das recomendações',
      },
      {
        name: 'Relatório de Análise Crítica de Proteção de Ativos',
        identification: 'Ano / Ciclo Amostral',
        storage: 'Repositório Corporativo de Governança',
        accessControl: 'Comitê IAGS, Responsáveis pelos Ativos e Auditoria',
        retention: 'Permanente',
        disposition: 'Arquivamento digital permanente',
      },
    ],
  },
  {
    id: 'iags-14',
    code: 'IAGS-14',
    revision: 'Rev. 01',
    title: 'Homologação, Instalação e Atualização de Software de Automação',
    shortTitle: 'Homologação de Software',
    domain: 'ciberseguranca',
    cadence: 'Pré-Implantação / Revisão Anual Licenças',
    ownerRole: 'Líder de Engenharia de Software OT',
    summary:
      'Define o rigor técnico para homologar, testar funcionalmente e não funcionalmente, instalar e atualizar softwares de automação e ambientes compartilhados com TI.',
    keyMetrics: [
      'Aprovação tripartite: Infraestrutura TI + SI Industrial + Automação',
      'Bateria de testes funcionais e não funcionais em ambiente piloto',
      'Atualização obrigatória de Inventário, Catálogo e Continuidade pós-deploy',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação',
      'IAGS-03 — Gestão de Mudanças em Serviços e Ativos de Automação',
      'IAGS-05 — Gestão do Catálogo de Serviços de Automação',
      'IAGS-10 — Gestão de Vulnerabilidade e Conformidade Técnica',
    ],
    sanitizationSummary:
      'Escopo de software compartilhado e fluxos de aprovação padronizados sem menção a bancos comerciais específicos ou formulários legados.',
    sections: [
      {
        number: '1',
        title: 'Escopo e Fronteiras Processuais',
        paragraphs: [
          'Aplica-se à introdução de novos softwares ou upgrades de versão no ambiente de Automação e em ativos compartilhados com TI (ex.: servidores de banco de dados industriais e estações). Correções pontuais de lógica seguem IAGS-03 (Gestão de Mudanças), enquanto aplicação de patches de segurança segue IAGS-10 (Vulnerabilidades).',
        ],
      },
      {
        number: '2',
        title: 'Fluxo de Homologação e Implantação Controlada',
        subsections: [
          {
            code: '2.1',
            title: 'Etapa de Homologação Tripartite',
            bullets: [
              'Identificação da demanda técnica/operacional e preparação de ambiente piloto isolado.',
              'Execução da bateria de testes funcionais (unidade, sistema, integração e regressão) e não funcionais (desempenho/capacidade, cibersegurança/privilégio mínimo, conformidade, operacional/backup/redundância, documentação e aceitação do cliente).',
              'Preenchimento do Formulário de Homologação e elaboração do Guia de Instalação, validados conjuntamente por Infraestrutura de TI, SI Industrial e Automação.',
            ],
          },
          {
            code: '2.2',
            title: 'Instalação, Atualização e Licenciamento',
            bullets: [
              'Preparação obrigatória com backup íntegro, plano de rollback e checagem de compatibilidade de firmware e pacotes Turn-Key.',
              'Implantação regida por RDM (IAGS-03), preferencialmente iniciando em ativo paralelo/stand-by antes da produção principal.',
              'Atualização imediata do Inventário/CMDB (IAGS-02), Catálogo de Serviços (IAGS-05) e planos de Continuidade (IAGS-11), seguida de capacitação das partes interessadas.',
              'Regras estritas: vedada instalação em equipamentos de terceiros; conformidade de propriedade intelectual e licenciamento revisada anualmente; possuir conta privilegiada não isenta o cumprimento desta norma; acessos de fornecedores durante instalação são continuamente monitorados.',
            ],
          },
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Formulário de Homologação de Software de Automação',
        identification: 'Software / Versão / Ano',
        storage: 'Repositório Corporativo de Governança / ITSM',
        accessControl: 'Infraestrutura TI, SI Industrial, Automação e Auditoria',
        retention: 'Permanente',
        disposition: 'Vinculado ao ciclo de vida do software no CMDB',
      },
    ],
  },
  {
    id: 'iags-15',
    code: 'IAGS-15',
    revision: 'Rev. 01',
    title: 'Gestão de Logs e Eventos em Ativos de Automação',
    shortTitle: 'Logs & Eventos (SIEM)',
    domain: 'ciberseguranca',
    cadence: 'Monitoramento 24x7 / Revisão Anual',
    ownerRole: 'Líder de Monitoramento & SOC OT',
    summary:
      'Estrutura a coleta sincronizada (NTP), proteção de integridade, análise contínua no SIEM e roteamento de eventos sob os pilares de Disponibilidade, Cibersegurança e Capacidade.',
    keyMetrics: [
      '3 pilares: Disponibilidade, Cibersegurança e Capacidade (NIST SP 800-92)',
      'Segregação rígida: administradores não podem apagar próprios logs',
      'Sincronização NTP obrigatória + anonimização antes de envio a terceiros',
    ],
    references: [
      'IAGS-02 — Gestão de Ativos de Automação (PGA)',
      'IAGS-04 — Gestão de Incidentes em Serviços e Ativos de Automação',
      'IAGS-09 — Gestão de Contas com Privilégio de Acesso',
      'NIST SP 800-92 — Guide to Computer Security Log Management, ISO 27001/27002 e ISA/IEC 62443-2-1',
    ],
    sanitizationSummary:
      'Referências a ferramentas comerciais de SIEM e monitoramento de rede substituídas por SIEM Corporativo e Sistema de Monitoramento de Rede OT.',
    sections: [
      {
        number: '1',
        title: 'Pilares de Monitoramento e Implantação Segura',
        paragraphs: [
          'Cobre todas as classes críticas de ativos OT (CLPs, Estações, IHMs, Firewalls, Endpoints, Switches, Nobreaks e SCADA/Historian), estruturando a observabilidade em três pilares prioritários: Disponibilidade, Cibersegurança e Capacidade.',
        ],
        bullets: [
          'Planejamento de Escopo: definição de ativos prioritários, eventos coletados (logins, escalação de privilégio, alterações de configuração, anomalias DNS/botnet, CPU/memória/disco), thresholds/linha de base, dimensionamento de retenção e sincronização obrigatória de relógios via NTP.',
          'Implantação via RDM (IAGS-03): coleta com ou sem agente, validando previamente o impacto de desempenho em ativos industriais legados ou com recursos restritos.',
          'Monitoramento e Análise: operação coordenada entre SOC, NOC e Responsáveis pelos Ativos, seguida de ciclo de Lições Aprendidas e atualização documental.',
        ],
      },
      {
        number: '2',
        title: 'Matriz de Roteamento de Eventos e Alertas',
        table: {
          caption: 'Tabela 1 — Encaminhamento por Natureza do Evento Detectado',
          headers: ['Categoria do Evento', 'Destino e Ação'],
          rows: [
            [
              'Cibersegurança',
              'Escalonamento imediato para Gestão de Incidentes de SI (SOC / SI Industrial) para contenção e investigação.',
            ],
            [
              'Disponibilidade ou Capacidade',
              'Abertura de chamado na Gestão de Incidentes de Automação (IAGS-04) via Central de Serviços.',
            ],
            [
              'Tendência ou Comportamento Anormal',
              'Análise técnica para reconfiguração de thresholds e redução de falsos-positivos/falsos-negativos conforme PGA.',
            ],
          ],
        },
      },
      {
        number: '3',
        title: 'Integridade, Proteção Forense e Anonimização',
        bullets: [
          'Segregação de Funções: usuários privilegiados não possuem permissão para alterar, desativar ou excluir os próprios logs; cópias são enviadas em tempo real para o SIEM centralizado.',
          'Proteção contra Adulteração: uso de hashing criptográfico e armazenamento append-only garantindo validade para perícia digital.',
          'Revisão anual do catálogo de logs críticos e regras de correlação.',
          'Anonimização obrigatória de IPs internos, nomes de ativos e dados sensíveis antes de qualquer envio de logs a fornecedores ou suportes externos (N4).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Programa de Gerenciamento de Ativos (PGA — Matriz de Logs)',
        identification: 'Versão / Ano de Revisão',
        storage: 'Repositório Corporativo de Governança / SIEM',
        accessControl: 'Equipes de SOC, NOC, Automação e Auditoria',
        retention: 'Permanente',
        disposition: 'Atualizado a cada novo ativo ou lição aprendida',
      },
    ],
  },
];
