export interface ProcedureOwnershipMeta {
  primaryOwner: string;
  approver: string;
  executingTeams: string[];
  stakeholders: string[];
  mandatoryArtifacts: string[];
}

export const PROCEDURE_OWNERSHIP_MAP: Record<string, ProcedureOwnershipMeta> = {
  'IAGS-01': {
    primaryOwner: 'Líder de Governança IAGS',
    approver: 'Gerência de Engenharia e Tecnologia de Automação',
    executingTeams: ['Comitê de Governança IAGS', 'Donos de Processos (15 normas)'],
    stakeholders: ['Central de Serviços OT', 'Equipe de Automação', 'SI Industrial', 'Auditoria Interna'],
    mandatoryArtifacts: ['Atas Trimestrais do Comitê (Retenção 3 anos)', 'Indicadores de Maturidade IAGS'],
  },
  'IAGS-02': {
    primaryOwner: 'Responsável por Ativos de Automação',
    approver: 'Supervisor de Automação & Líder de Governança IAGS',
    executingTeams: ['Equipe de Automação', 'Planejamento & Controle Patrimonial (ERP/EAM)'],
    stakeholders: ['Sustentação ITSM (CMDB)', 'SI Industrial', 'Manutenção Elétrica', 'Fornecedores'],
    mandatoryArtifacts: ['Inventário ERP/EAM ↔ CMDB', 'Programa de Gerenciamento de Ativos (PGA)', 'Plano de Ação de Auditoria'],
  },
  'IAGS-03': {
    primaryOwner: 'Gestor de Mudanças de Automação',
    approver: 'CAB-Automação (Risco Alto) / Supervisor de Automação (Emergencial)',
    executingTeams: ['Equipe de Automação (N2/N3)', 'Infraestrutura TI (ativos compartilhados)'],
    stakeholders: ['Operação de Planta', 'Manutenção', 'SI Industrial', 'Central de Serviços'],
    mandatoryArtifacts: ['Requisição de Mudança (RDM)', 'Planos de Teste, Rollback e Comunicação', 'Registro no Controle de Versionamento'],
  },
  'IAGS-04': {
    primaryOwner: 'Gestor de Incidentes de Automação',
    approver: 'Supervisor de Automação (validação/escalonamento crítico)',
    executingTeams: ['Central de Serviços (N1)', 'Técnicos e Analistas de Automação (N2/N3)', 'Fornecedores (N4)'],
    stakeholders: ['Instrumentação (OM Campo)', 'Operação de Planta', 'SOC / SI Industrial', 'NOC'],
    mandatoryArtifacts: ['Registro de Incidente ITSM (INC)', 'Vínculo com OM (ERP/EAM)', 'Análise de Causa Raiz (ACR)'],
  },
  'IAGS-05': {
    primaryOwner: 'Gestor do Catálogo de Serviços de Automação',
    approver: 'Supervisor de Automação & Líder de Governança IAGS',
    executingTeams: ['Governança de TI / Sustentação do Portal ITSM', 'Responsáveis pelos Serviços'],
    stakeholders: ['Áreas Clientes / Operação', 'Central de Serviços', 'Auditoria Interna'],
    mandatoryArtifacts: ['Ficha de Serviço de Automação', 'Relatório Anual de Análise de Consistência'],
  },
  'IAGS-06': {
    primaryOwner: 'Líder da Central de Serviços de Automação',
    approver: 'Supervisor de Automação',
    executingTeams: ['Planejador de Automação (N1)', 'Service Desk & Field Service', 'Técnicos/Especialistas (N2/N3)'],
    stakeholders: ['Instrumentação (OM)', 'NOC', 'SOC / SI Industrial', 'Fornecedores (N4)'],
    mandatoryArtifacts: ['Registro de Triagem e Roteamento ITSM', 'Relatórios de SLA por Nível (N1–N4)'],
  },
  'IAGS-07': {
    primaryOwner: 'Gestor de Solicitações de Automação',
    approver: 'Responsável pelo Serviço (Técnica) & Supervisor de Automação (Gerencial)',
    executingTeams: ['Central de Serviços (N1)', 'Equipe Técnica de Automação'],
    stakeholders: ['Solicitantes Operacionais', 'Segurança do Trabalho (APR/PTP)', 'Planejamento de Paradas'],
    mandatoryArtifacts: ['Registro de Solicitação ITSM (REQ)', 'Verificação de APR / PTP quando aplicável'],
  },
  'IAGS-08': {
    primaryOwner: 'Responsável por Acesso Lógico OT',
    approver: 'Gestor do Solicitante (Aprovação) & Gerente Responsável pelo Ativo (Autorização)',
    executingTeams: ['Equipe de Controle de Acesso TI (AD)', 'Equipe de Acesso Lógico de Automação (fora do AD)'],
    stakeholders: ['RH (Onboarding/Offboarding)', 'SI Industrial', 'Gestores de Contratos de Terceiros', 'Auditoria'],
    mandatoryArtifacts: ['Relatório Anual de Análise Crítica de Acessos', 'Trilha de Segregação de Funções ITSM'],
  },
  'IAGS-09': {
    primaryOwner: 'Responsável por Contas Privilegiadas OT (PAM)',
    approver: 'Gerente do Solicitante + Avaliação Técnica + Gerente do Ativo',
    executingTeams: ['Administração de Cofre PAM / SI Industrial', 'Equipe de Automação (Contas Locais/Serviço)'],
    stakeholders: ['SOC (Monitoramento 24x7)', 'Fornecedores em Acesso Temporário', 'Auditoria Interna'],
    mandatoryArtifacts: ['Controle de Acessos Privilegiados', 'Relatório Semestral de Análise Crítica PAM'],
  },
  'IAGS-10': {
    primaryOwner: 'Coordenador de Cibersegurança OT',
    approver: 'Gerência de Automação & Gestão de Riscos Corporativa (Aceite de Risco)',
    executingTeams: ['SI Industrial', 'Equipe de Automação', 'Infraestrutura TI / Redes', 'Manutenção (Nobreaks)'],
    stakeholders: ['Auditoria Interna (TDI/TDE com NDA)', 'CAB-Automação', 'Fabricantes OT'],
    mandatoryArtifacts: ['Relatório Mensal GVT & Anual GCT', 'Relatório Confidencial TDI/TDE', 'RDMs de Patching (60–180d)'],
  },
  'IAGS-11': {
    primaryOwner: 'Coordenador de Continuidade da Infraestrutura OT',
    approver: 'Comitê de Crise & Gerência de Engenharia/Automação',
    executingTeams: ['Especialistas de Automação (N3)', 'Infraestrutura TI (Data Centers)', 'SI Industrial'],
    stakeholders: ['Operação de Planta (Modo Manual Seguro)', 'Planejamento de Paradas Gerais', 'Gestão de Riscos'],
    mandatoryArtifacts: ['Registro de Contingência e Testes Bienais', 'Planos DRP/PCN e Matriz BIA (RTO/RPO)'],
  },
  'IAGS-12': {
    primaryOwner: 'Gestor de Segurança Física em Automação',
    approver: 'Supervisor / Gestor do Ambiente Crítico & Segurança Patrimonial',
    executingTeams: ['Segurança Patrimonial', 'Manutenção Predial / Elétrica (NR-10)', 'Equipe de Automação'],
    stakeholders: ['RH (Offboarding)', 'Brigada de Emergência', 'Instrumentação', 'Visitantes e Terceiros'],
    mandatoryArtifacts: ['Relatório Anual de Análise Crítica Física', 'Lista de Pessoas Autorizadas', 'Recomendação de Controles'],
  },
  'IAGS-13': {
    primaryOwner: 'Responsável por Proteção e Manutenção de Ativos OT',
    approver: 'Supervisor de Automação & Supervisão de Manutenção',
    executingTeams: ['Equipe de Automação', 'Manutenção Elétrica / Instrumentação', 'Fornecedores Supervisionados'],
    stakeholders: ['Segurança Patrimonial (Saída de Ativos)', 'SI Industrial (Descarte Seguro)', 'Auditoria'],
    mandatoryArtifacts: ['Planos de Inspeção Amostral', 'Recomendação de Controles', 'Certificado de Descarte Seguro'],
  },
  'IAGS-14': {
    primaryOwner: 'Líder de Engenharia de Software de Automação',
    approver: 'Validação Tripartite: Infraestrutura TI + SI Industrial + Automação',
    executingTeams: ['Engenharia de Automação', 'Infraestrutura TI', 'SI Industrial', 'Fornecedores Monitorados'],
    stakeholders: ['Clientes Operacionais (Aceite)', 'Gestor do Catálogo', 'Gestor de Continuidade'],
    mandatoryArtifacts: ['Formulário de Homologação de Software', 'Guia de Instalação & Rollback', 'Revisão Anual de Licenças'],
  },
  'IAGS-15': {
    primaryOwner: 'Líder de Monitoramento & SOC OT',
    approver: 'SI Industrial & Supervisor de Automação',
    executingTeams: ['SOC (Cibersegurança)', 'NOC (Disponibilidade/Capacidade)', 'Responsáveis pelos Ativos'],
    stakeholders: ['Central de Serviços', 'Perícia Digital / Auditoria', 'Fornecedores N4 (Logs Anonimizados)'],
    mandatoryArtifacts: ['Matriz de Logs no PGA', 'Configuração NTP & Retenção Append-Only SIEM'],
  },
};
