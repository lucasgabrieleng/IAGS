import { Locale, translateEnum } from './uiStrings';
import {
  ActionPlanItem,
  AuditRecord,
  CommitteeMinute,
  CONTINUITY_SYSTEMS,
  ContinuitySystemRecord,
  DOMAIN_MATURITY_DATA,
  GOVERNANCE_ROLES_MATRIX,
  GovernanceRoleMatrixItem,
  MONTHLY_OPERATIONS_DATA,
  OtAsset,
  PHYSICAL_PERIMETERS,
  PhysicalPerimeterRecord,
  VULNERABILITY_SLA_CHART_DATA,
} from '../data/governanceData';
import {
  ASSET_DEPENDENCIES,
  ASSET_SYSTEM_MAPPINGS,
  CHANGE_ACTION_OPTIONS,
  ChangeActionOption,
  ChangeActionType,
  ImpactSimulationResult,
  INDUSTRIAL_PLANTS,
  INDUSTRIAL_SYSTEMS,
  simulateChangeImpact,
} from '../data/impactTopologyData';
import {
  PROCEDURE_OWNERSHIP_MAP,
  ProcedureOwnershipMeta,
} from '../data/procedureGovernanceDetails';
import {
  ANIMATED_SCENARIOS,
  GOVERNANCE_DOMAINS,
  GovernanceDomainId,
  GovernanceDomainMeta,
  GovernanceScenario,
  PROCEDURE_INTERACTIONS,
  ProcedureInteraction,
} from '../data/procedures';

// ─── 1. GOVERNANCE DOMAINS ───────────────────────────────────────────────
const DOMAIN_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<GovernanceDomainId, { label: string; shortLabel: string; description: string }>
> = {
  en: {
    governanca: {
      label: 'Governance & Direction',
      shortLabel: 'Governance',
      description: 'IAGS framework, Quarterly Committee, roles, document hierarchy, and continual improvement.',
    },
    ativos: {
      label: 'OT Assets & Inventory',
      shortLabel: 'OT Assets',
      description: 'Lifecycle of 6 critical asset classes, CMDB/ERP/AMP sync, and periodic audits.',
    },
    operacao: {
      label: 'Operations & Service Delivery',
      shortLabel: 'Operations',
      description: 'Service Desk L1–L4, Service Catalog, Requests, Incidents, and Changes (CAB).',
    },
    identidade: {
      label: 'Identity & Privileges',
      shortLabel: 'Identity',
      description: 'Logical Access (AAA), segregation of duties, source code control, and Privileged Accounts (PAM).',
    },
    ciberseguranca: {
      label: 'Cybersecurity, Software & SOC',
      shortLabel: 'Cyber & SOC',
      description: 'Vulnerabilities (TVM/TCM), tripartite software homologation, and 24x7 Logs/SIEM.',
    },
    resiliencia: {
      label: 'Resilience & Physical Security',
      shortLabel: 'Resilience',
      description: 'Continuity (DRP/RTO/RPO), Physical Perimeters (High/Medium/Low), and Hardware Protection.',
    },
  },
  es: {
    governanca: {
      label: 'Gobernanza y Dirección',
      shortLabel: 'Gobernanza',
      description: 'Estructura IAGS, Comité Trimestral, roles, jerarquía documental y mejora continua.',
    },
    ativos: {
      label: 'Activos e Inventario OT',
      shortLabel: 'Activos OT',
      description: 'Ciclo de vida de las 6 clases críticas, CMDB/ERP/PGA y auditorías periódicas.',
    },
    operacao: {
      label: 'Operación y Entrega de Servicios',
      shortLabel: 'Operación',
      description: 'Mesa de Servicios N1–N4, Catálogo, Solicitudes, Incidentes y Cambios (CAB).',
    },
    identidade: {
      label: 'Identidad y Privilegios',
      shortLabel: 'Identidad',
      description: 'Acceso Lógico (AAA), segregación de funciones, código fuente y Cuentas Privilegiadas (PAM).',
    },
    ciberseguranca: {
      label: 'Ciberseguridad, Software y SOC',
      shortLabel: 'Ciber y SOC',
      description: 'Vulnerabilidades (GVT/GCT), homologación tripartita de software y Logs/SIEM 24x7.',
    },
    resiliencia: {
      label: 'Resiliencia y Seguridad Física',
      shortLabel: 'Resiliencia',
      description: 'Continuidad (DRP/RTO/RPO), Perímetros Físicos (Alta/Media/Baja) y Protección de Hardware.',
    },
  },
};

export function getLocalizedDomains(locale: Locale): GovernanceDomainMeta[] {
  if (locale === 'pt') return GOVERNANCE_DOMAINS;
  return GOVERNANCE_DOMAINS.map((d) => ({
    ...d,
    ...DOMAIN_TEXT[locale][d.id],
  }));
}

export function getLocalizedDomainMap(locale: Locale): Record<GovernanceDomainId, GovernanceDomainMeta> {
  return getLocalizedDomains(locale).reduce(
    (acc, item) => {
      acc[item.id] = item;
      return acc;
    },
    {} as Record<GovernanceDomainId, GovernanceDomainMeta>
  );
}

// ─── 2. PROCEDURE INTERACTIONS (31 EDGES) ────────────────────────────────
const INTERACTION_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<string, { label: string; trigger: string }>
> = {
  en: {
    'e-01-02': { label: 'Directives & Audits', trigger: 'IAGS Committee sets CMDB/AMP coverage targets and monitors inventory deviations.' },
    'e-01-05': { label: 'Structural Approval', trigger: 'IAGS Leader validates the Service Catalog taxonomy and reviews annual consistency.' },
    'e-01-06': { label: 'SPOC Mandate', trigger: 'Establishes the Service Desk as the official single point of contact for OT.' },
    'e-01-10': { label: 'Risk Acceptance', trigger: 'Committee and Management deliberate on residual risks and technical compliance metrics.' },
    'e-01-11': { label: 'Crisis Governance', trigger: 'Oversees DRP/BCP readiness and approves compensating controls during crises.' },
    'e-02-03': { label: 'Action Plan → RFC', trigger: 'Audit deviations or asset decommissioning require opening a formal RFC.' },
    'e-02-10': { label: 'CMDB / Criticality Base', trigger: 'Provides updated inventory and criticality (A/B/C) to define TVM/TCM scope.' },
    'e-02-11': { label: 'Critical DRP Scope', trigger: 'Feeds critical asset maps and dependencies for BIA/RTO/RPO definition.' },
    'e-02-13': { label: 'Hardware Criticality', trigger: 'A/B/C classification drives inspection plans and physical hardware safeguards.' },
    'e-02-14': { label: 'Demand Gate', trigger: 'New software demands or upgrades require prior tripartite technical homologation.' },
    'e-02-15': { label: 'AMP Inventory Feed', trigger: 'New assets enter the log collection, NTP sync, and continuous monitoring matrix.' },
    'e-06-04': { label: 'Fault Triage', trigger: 'Service interruptions or degradations are routed to Incident Management (P1–P5).' },
    'e-06-07': { label: 'Request Triage', trigger: 'Standardized catalog requests flow to Service Request Management (P1–P7).' },
    'e-06-03': { label: 'Change Triage', trigger: 'Requests to alter assets or control logic are routed to Change Management.' },
    'e-05-07': { label: 'SLAs & Approval Rules', trigger: 'Catalog sheets define which requests are pre-approved and their fulfillment SLAs.' },
    'e-05-03': { label: 'Pre-approved Models / Removal', trigger: 'Provides pre-approved standard change models and mandates RFC to retire services.' },
    'e-04-03': { label: 'Permanent / Emergency Fix', trigger: 'Permanent resolution or emergency restoration of an incident triggers an RFC.' },
    'e-04-11': { label: 'Crisis Trigger (> RTO)', trigger: 'Downtime exceeding RTO escalates a critical incident into DRP/BCP activation.' },
    'e-03-02': { label: 'Post-RFC Update', trigger: 'Completed changes update CMDB configuration items, firmware, and versioning.' },
    'e-07-08': { label: 'Logical Access Request', trigger: 'Logical access grant, change, or revocation requests flow via ITSM.' },
    'e-07-12': { label: 'Physical Access Request', trigger: 'Permanent or temporary badge requests for critical OT perimeters.' },
    'e-08-09': { label: 'Privilege Elevation', trigger: 'Administrative profiles and service accounts follow additional PAM vault controls.' },
    'e-08-12': { label: 'Offboarding Sync', trigger: 'Termination or transfer simultaneously revokes logical accounts and physical badges.' },
    'e-09-15': { label: 'PAM Session Audit', trigger: 'Privileged activities stream continuous audit trails to SIEM for abuse detection.' },
    'e-10-03': { label: 'Remediation & Patching', trigger: 'CVE fixes (60–180d) and baseline adjustments are deployed via controlled RFC.' },
    'e-14-03': { label: 'Homologated Deploy', trigger: 'Pilot-approved software moves to production governed by RFC and rollback plans.' },
    'e-14-05': { label: 'Catalog Update', trigger: 'Newly installed software updates service catalog sheets and operational training.' },
    'e-14-11': { label: 'Backup / DRP Update', trigger: 'New versions require updating recovery media, snapshots, and contingency guides.' },
    'e-12-13': { label: 'Perimeter Criticality', trigger: 'Critical assets inside lower-tier areas receive extra physical hardware safeguards.' },
    'e-13-03': { label: 'Controlled Maintenance', trigger: 'Critical hardware maintenance and replacements are coordinated via Change Management.' },
    'e-13-15': { label: 'Health / Access Telemetry', trigger: 'Critical equipment and unattended stations send integrity events to SIEM.' },
    'e-15-04': { label: 'Availability / IS Alert', trigger: 'Availability, capacity, or cybersecurity alerts trigger immediate incidents.' },
    'e-15-03': { label: 'Collection Config', trigger: 'Enabling agents, NTP, and threshold tuning on OT assets requires a controlled RFC.' },
  },
  es: {
    'e-01-02': { label: 'Directrices y Auditorías', trigger: 'El Comité IAGS define metas de cobertura CMDB/PGA y monitorea desvíos de inventario.' },
    'e-01-05': { label: 'Aprobación Estructural', trigger: 'El Líder IAGS valida la taxonomía del Catálogo y revisa su consistencia anual.' },
    'e-01-06': { label: 'Mandato SPOC', trigger: 'Establece la Mesa de Servicios como punto único de contacto oficial de OT.' },
    'e-01-10': { label: 'Aceptación de Riesgo', trigger: 'Comité y Gerencia deliberan sobre riesgos residuales y métricas de cumplimiento.' },
    'e-01-11': { label: 'Gobernanza de Crisis', trigger: 'Supervisa la preparación DRP/PCN y aprueba controles compensatorios en crisis.' },
    'e-02-03': { label: 'Plan de Acción → RDM', trigger: 'Los desvíos de auditoría o bajas de activos exigen apertura formal de RDM.' },
    'e-02-10': { label: 'Base CMDB / Criticidad', trigger: 'Suministra inventario actualizado y criticidad (A/B/C) para alcance GVT/GCT.' },
    'e-02-11': { label: 'Alcance Crítico DRP', trigger: 'Alimenta el mapa de activos críticos y dependencias para definir BIA/RTO/RPO.' },
    'e-02-13': { label: 'Criticidad de Hardware', trigger: 'La clasificación A/B/C guía planes de inspección y protección física de equipos.' },
    'e-02-14': { label: 'Compuerta de Demanda', trigger: 'Nuevas demandas de software o mejoras exigen homologación tripartita previa.' },
    'e-02-15': { label: 'Inventario en PGA', trigger: 'Nuevos activos ingresan a la matriz de logs, NTP y monitoreo continuo.' },
    'e-06-04': { label: 'Triaje de Fallas', trigger: 'Interrupciones o degradaciones se derivan a Gestión de Incidentes (P1–P5).' },
    'e-06-07': { label: 'Triaje de Solicitudes', trigger: 'Demandas estandarizadas del Catálogo fluyen a Solicitudes de Servicio (P1–P7).' },
    'e-06-03': { label: 'Triaje de Cambios', trigger: 'Pedidos de modificación en activos o lógica se dirigen a Gestión de Cambios.' },
    'e-05-07': { label: 'SLAs y Reglas de Aprobación', trigger: 'Las fichas del Catálogo definen qué solicitudes están preaprobadas y sus plazos.' },
    'e-05-03': { label: 'Modelos Preaprobados / Baja', trigger: 'Aporta modelos de cambio estándar y exige RDM para retirar infraestructura.' },
    'e-04-03': { label: 'Corrección Definitiva / Emerg.', trigger: 'La solución definitiva o restauración de emergencia de un incidente dispara RDM.' },
    'e-04-11': { label: 'Activación de Crisis (> RTO)', trigger: 'La indisponibilidad superior al RTO escala el incidente crítico hacia DRP/PCN.' },
    'e-03-02': { label: 'Actualización Post-RDM', trigger: 'Los cambios concluidos actualizan ítems del CMDB, firmware y versionamiento.' },
    'e-07-08': { label: 'Solicitud de Acceso Lógico', trigger: 'Altas, cambios o revocaciones de acceso lógico se tramitan vía ITSM.' },
    'e-07-12': { label: 'Solicitud de Acceso Físico', trigger: 'Solicitudes de credencial permanente o temporal para perímetros críticos.' },
    'e-08-09': { label: 'Elevación de Privilegio', trigger: 'Perfiles administrativos y cuentas de servicio siguen controles de bóveda PAM.' },
    'e-08-12': { label: 'Sincronía Offboarding', trigger: 'La baja o traslado revoca simultáneamente accesos lógicos y credenciales físicas.' },
    'e-09-15': { label: 'Auditoría de Sesiones PAM', trigger: 'Actividades privilegiadas generan trazas continuas en el SIEM ante abusos.' },
    'e-10-03': { label: 'Remediación y Parcheo', trigger: 'Correcciones de CVE (60–180d) y ajustes de línea base se despliegan vía RDM.' },
    'e-14-03': { label: 'Despliegue Homologado', trigger: 'El software aprobado en piloto pasa a producción controlado por RDM y rollback.' },
    'e-14-05': { label: 'Actualización del Catálogo', trigger: 'Nuevo software instalado actualiza fichas de servicio y capacitación operativa.' },
    'e-14-11': { label: 'Actualización Backup/DRP', trigger: 'Nuevas versiones exigen actualizar medios, snapshots y guías de contingencia.' },
    'e-12-13': { label: 'Criticidad de Perímetro', trigger: 'Activos críticos en áreas de menor criticidad reciben salvaguardas físicas extra.' },
    'e-13-03': { label: 'Mantenimiento Controlado', trigger: 'Mantenimientos de hardware crítico y reemplazos se coordinan vía Cambios.' },
    'e-13-15': { label: 'Monitoreo de Salud/Acceso', trigger: 'Equipos críticos y estaciones desatendidas envían eventos de integridad al SIEM.' },
    'e-15-04': { label: 'Alerta Disponibilidad/SI', trigger: 'Eventos de indisponibilidad, capacidad o ciberseguridad disparan incidentes.' },
    'e-15-03': { label: 'Configuración de Colecta', trigger: 'Activar agentes, NTP y ajustar umbrales en activos OT exige RDM controlada.' },
  },
};

export function getLocalizedInteractions(locale: Locale): ProcedureInteraction[] {
  if (locale === 'pt') return PROCEDURE_INTERACTIONS;
  return PROCEDURE_INTERACTIONS.map((e) => ({
    ...e,
    ...(INTERACTION_TEXT[locale][e.id] ?? {}),
  }));
}

// ─── 3. ANIMATED WORKFLOW SCENARIOS (5 SCENARIOS) ────────────────────────
const SCENARIOS_EN: GovernanceScenario[] = [
  {
    id: 'scn-cyber-siem',
    title: 'SIEM Intrusion Alert to Full Recovery',
    category: 'Cyber Incident Response',
    severity: 'Crítica',
    summary: 'Simulates the end-to-end flow when an anomalous privileged login attempt on a SCADA server triggers a SIEM alert requiring emergency containment.',
    involvedNodes: ['IAGS-09', 'IAGS-15', 'IAGS-06', 'IAGS-04', 'IAGS-03', 'IAGS-02'],
    steps: [
      { stepNumber: 1, from: 'IAGS-09', to: 'IAGS-15', title: 'Anomalous Privileged Account Usage', action: 'Support account attempts out-of-window login on an automation server; audit trail is ingested in real time by SIEM with NTP timestamp.', artifact: 'SIEM Correlated Security Event', slaNote: 'Real-time detection (24x7)' },
      { stepNumber: 2, from: 'IAGS-15', to: 'IAGS-04', title: 'Critical Incident Opening (IS / OT)', action: 'SOC classifies the alert as Cybersecurity, opens a P1 incident, and engages Industrial IS + Automation L3 for isolation.', artifact: 'P1 INC Ticket + Industrial IS Escalation', slaNote: 'Priority P1 — Critical' },
      { stepNumber: 3, from: 'IAGS-04', to: 'IAGS-03', title: 'Containment via Emergency Change', action: 'Automation Supervisor authorizes an emergency rule on the Industrial Firewall and immediate rotation of the compromised credential.', artifact: 'Emergency RFC (formalization ≤ 5 business days)', slaNote: 'Immediate action + RFC ≤ 5 business days' },
      { stepNumber: 4, from: 'IAGS-03', to: 'IAGS-02', title: 'Baseline Update & Lessons Learned', action: 'Updated firewall settings are recorded in CMDB, logic versioning updated, and AMP monitoring thresholds refined.', artifact: 'Synced CMDB + AMP Lessons Learned', slaNote: 'Auditable post-incident closure' },
    ],
  },
  {
    id: 'scn-cve-patch',
    title: 'Critical CVE → Homologation → Plant Patch',
    category: 'Vulnerability & Change Management',
    severity: 'Alta',
    summary: 'Demonstrates the safe cycle to remediate a CVSS 9.4 vulnerability on a Supervisory System honoring pilot testing and CAB windows.',
    involvedNodes: ['IAGS-02', 'IAGS-10', 'IAGS-14', 'IAGS-03', 'IAGS-11'],
    steps: [
      { stepNumber: 1, from: 'IAGS-02', to: 'IAGS-10', title: 'Monthly TVM Detection on CMDB Scope', action: 'Monthly scan identifies a critical CVE (CVSS 9.4) on the SCADA COTS package classified as Criticality A in CMDB.', artifact: 'TVM Report — Target SLA ≤ 60 days', slaNote: 'Critical SLA: up to 60 days' },
      { stepNumber: 2, from: 'IAGS-10', to: 'IAGS-14', title: 'Tripartite Homologation in Pilot Lab', action: 'Vendor-approved patch is validated on an off-line test bench with functional and security sign-off from IT, IS, and Automation.', artifact: 'Homologation Form + Installation Guide', slaNote: 'Mandatory pre-deployment approval' },
      { stepNumber: 3, from: 'IAGS-14', to: 'IAGS-03', title: 'OT-CAB Approval & Stand-by Deployment', action: 'High-Risk Normal RFC submits Test, Rollback, and Communication plans to CAB; patching starts on the stand-by server before production.', artifact: 'CAB-Approved Normal RFC + Pre-deploy Backup', slaNote: 'Weekly CAB / Planned Outage' },
      { stepNumber: 4, from: 'IAGS-14', to: 'IAGS-11', title: 'Snapshot & Continuity Refresh', action: 'After stabilization, updated backup/VM images are replicated to the redundant Data Center keeping RPO/RTO intact.', artifact: 'Updated DRP Snapshot + New CMDB Version', slaNote: 'DRP readiness preserved' },
    ],
  },
  {
    id: 'scn-offboarding',
    title: 'Contractor Offboarding After Plant Startup',
    category: 'Identity, Privileges & Physical Security',
    severity: 'Alta',
    summary: 'Illustrates synchronized revocation across Service Requests, Logical Access, PAM Vault, Password Rotation, and Physical Perimeters.',
    involvedNodes: ['IAGS-06', 'IAGS-07', 'IAGS-08', 'IAGS-09', 'IAGS-12'],
    steps: [
      { stepNumber: 1, from: 'IAGS-06', to: 'IAGS-07', title: 'Demobilization Request Opening', action: 'Contract manager contacts the Service Desk upon completion of the system integrator assisted operation period.', artifact: 'ITSM Revocation Request (REQ)', slaNote: 'Priority P2 — Urgent (≤ 2 days)' },
      { stepNumber: 2, from: 'IAGS-07', to: 'IAGS-08', title: 'AD & Local OT Account Revocation', action: 'IT Access Control (AD) and Automation (non-AD) teams disable nominal credentials and confirm source-code check-in.', artifact: 'AAA Revocation Log + Version Check-in', slaNote: 'Segregation of duties preserved' },
      { stepNumber: 3, from: 'IAGS-08', to: 'IAGS-09', title: 'PAM Vault Lock & Password Rotation', action: 'Temporary vault privileges are revoked; shared support credentials exposed during startup undergo immediate rotation.', artifact: 'PAM Rotation Record', slaNote: 'Immediate rotation mandatory' },
      { stepNumber: 4, from: 'IAGS-08', to: 'IAGS-12', title: 'Badge & Physical Biometrics Revocation', action: 'Physical Security cancels temporary badge access to PLC Rooms and Control Rooms (High Criticality Perimeter).', artifact: 'Updated Authorized Personnel Roster', slaNote: 'Logical ↔ physical sync complete' },
    ],
  },
  {
    id: 'scn-new-asset',
    title: 'Commissioning a New Critical OT Asset',
    category: 'Asset Lifecycle & Governance',
    severity: 'Média',
    summary: 'Follows mandatory security gates from the demand of a new PLC/Workstation through SIEM monitoring and physical protection.',
    involvedNodes: ['IAGS-02', 'IAGS-14', 'IAGS-03', 'IAGS-13', 'IAGS-15'],
    steps: [
      { stepNumber: 1, from: 'IAGS-02', to: 'IAGS-14', title: 'Demand & Technical Homologation', action: 'New asset completes IS risk assessment, contractual security clauses, and software/firmware homologation before network connection.', artifact: 'Homologation Form + Criticality A', slaNote: 'Demand & Procurement Gates' },
      { stepNumber: 2, from: 'IAGS-14', to: 'IAGS-03', title: 'Hardening & Default Password Removal via RFC', action: 'During implementation, security baseline hardening, integrator password replacement, and commissioning execute via RFC.', artifact: 'Implementation RFC + Hardening Checklist', slaNote: 'Zero default passwords in production' },
      { stepNumber: 3, from: 'IAGS-02', to: 'IAGS-13', title: 'Physical Protection & Segregated Cabling', action: 'Equipment is installed in a locked cabinet with cable segregation, screen locking, and entry into the annual inspection plan.', artifact: 'Critical Hardware Protection Checklist', slaNote: 'Aligned to perimeter criticality' },
      { stepNumber: 4, from: 'IAGS-02', to: 'IAGS-15', title: 'CMDB/AMP Registration & NTP Log Feed', action: 'Asset synced across ERP/EAM and CMDB begins forwarding availability and cybersecurity telemetry to centralized SIEM.', artifact: 'Active CMDB CI + SIEM/NTP Rule', slaNote: '24x7 observability enabled' },
    ],
  },
  {
    id: 'scn-crisis-drp',
    title: 'Critical Infrastructure Disruption (> RTO)',
    category: 'Continuity & Crisis Management',
    severity: 'Crítica',
    summary: 'Orchestrates response when a severe network/server failure threatens to breach RTO, triggering DRP, safe manual mode, and compensating controls.',
    involvedNodes: ['IAGS-15', 'IAGS-04', 'IAGS-11', 'IAGS-01', 'IAGS-03'],
    steps: [
      { stepNumber: 1, from: 'IAGS-15', to: 'IAGS-04', title: 'Critical Availability Alarm (NOC)', action: 'Monitoring detects simultaneous communication loss across core switches and primary SCADA server; P1 incident opened immediately.', artifact: 'NOC/SIEM Alert → P1 INC Ticket', slaNote: 'Immediate L3 escalation' },
      { stepNumber: 2, from: 'IAGS-04', to: 'IAGS-11', title: 'Crisis Declaration & DRP Activation', action: 'Estimated recovery exceeds plant RTO; team activates safe manual operation, failover to redundant Data Center, and contingency kit.', artifact: 'DRP/BCP Activation Log', slaNote: 'Operational safety preserved' },
      { stepNumber: 3, from: 'IAGS-01', to: 'IAGS-11', title: 'Compensating Control Approval', action: 'Crisis Committee and Industrial IS grant temporary supervised remote access for recovery under intensive SOC monitoring.', artifact: 'Temporary Exception Waiver + Enhanced SIEM', slaNote: 'Strictly limited to crisis window' },
      { stepNumber: 4, from: 'IAGS-04', to: 'IAGS-03', title: 'Return to Normal & Post-Crisis Review', action: 'After permanent restoration via RFC, temporary waivers are revoked and lessons learned feed the next biennial continuity drill.', artifact: 'Normalization RFC + Crisis Report', slaNote: 'Annual BCP/DRP update' },
    ],
  },
];

const SCENARIOS_ES: GovernanceScenario[] = [
  {
    id: 'scn-cyber-siem',
    title: 'Alerta de Intrusión en SIEM hasta Recuperación',
    category: 'Respuesta a Incidentes Cibernéticos',
    severity: 'Crítica',
    summary: 'Simula el flujo completo cuando un intento anómalo de acceso privilegiado en un servidor SCADA dispara una alerta SIEM y exige contención de emergencia.',
    involvedNodes: ['IAGS-09', 'IAGS-15', 'IAGS-06', 'IAGS-04', 'IAGS-03', 'IAGS-02'],
    steps: [
      { stepNumber: 1, from: 'IAGS-09', to: 'IAGS-15', title: 'Uso Anómalo de Cuenta Privilegiada', action: 'Una cuenta de soporte intenta iniciar sesión fuera de ventana en un servidor OT; el rastro se ingiere en tiempo real en SIEM con sello NTP.', artifact: 'Evento Correlacionado SIEM', slaNote: 'Detección en tiempo real (24x7)' },
      { stepNumber: 2, from: 'IAGS-15', to: 'IAGS-04', title: 'Apertura de Incidente Crítico (SI / OT)', action: 'El SOC clasifica la alerta como Ciberseguridad, abre un incidente P1 y activa SI Industrial + Automatización N3 para aislamiento.', artifact: 'Ticket INC P1 + Escalamiento SI Industrial', slaNote: 'Prioridad P1 — Crítica' },
      { stepNumber: 3, from: 'IAGS-04', to: 'IAGS-03', title: 'Contención vía Cambio de Emergencia', action: 'El Supervisor de Automatización autoriza regla de emergencia en el Firewall Industrial y rotación inmediata de la credencial comprometida.', artifact: 'RDM de Emergencia (formalización ≤ 5 días hábiles)', slaNote: 'Acción inmediata + RDM ≤ 5 días hábiles' },
      { stepNumber: 4, from: 'IAGS-03', to: 'IAGS-02', title: 'Actualización de Línea Base y Lecciones', action: 'Las configuraciones se actualizan en CMDB, se versiona el cambio y se afinan umbrales de monitoreo en el PGA.', artifact: 'CMDB Sincronizado + Lecciones Aprendidas PGA', slaNote: 'Cierre auditable post-incidente' },
    ],
  },
  {
    id: 'scn-cve-patch',
    title: 'CVE Crítica → Homologación → Parche en Planta',
    category: 'Gestión de Vulnerabilidades y Cambios',
    severity: 'Alta',
    summary: 'Demuestra el ciclo seguro para remediar una vulnerabilidad CVSS 9.4 en Sistema SCADA respetando piloto de laboratorio y ventana CAB.',
    involvedNodes: ['IAGS-02', 'IAGS-10', 'IAGS-14', 'IAGS-03', 'IAGS-11'],
    steps: [
      { stepNumber: 1, from: 'IAGS-02', to: 'IAGS-10', title: 'Detección Mensual (GVT) sobre CMDB', action: 'El escaneo mensual detecta una CVE crítica (CVSS 9.4) en el paquete SCADA clasificado como Criticidad A en CMDB.', artifact: 'Informe GVT — Meta SLA ≤ 60 días', slaNote: 'SLA Crítica: hasta 60 días' },
      { stepNumber: 2, from: 'IAGS-10', to: 'IAGS-14', title: 'Homologación Tripartita en Piloto', action: 'El parche aprobado por el fabricante se valida en banco off-line con aprobación funcional y de seguridad de TI, SI y Automatización.', artifact: 'Formulario de Homologación + Guía de Instalación', slaNote: 'Validación previa obligatoria' },
      { stepNumber: 3, from: 'IAGS-14', to: 'IAGS-03', title: 'Aprobación CAB y Despliegue Stand-by', action: 'La RDM Normal de Riesgo Alto presenta planes de Prueba, Rollback y Comunicación al CAB; se aplica primero en servidor stand-by.', artifact: 'RDM Aprobada (CAB) + Backup Previo', slaNote: 'Ventana CAB Semanal / Parada Programada' },
      { stepNumber: 4, from: 'IAGS-14', to: 'IAGS-11', title: 'Actualización de Snapshots y Continuidad', action: 'Tras la estabilización, las nuevas imágenes de respaldo/VM se replican al Data Center redundante manteniendo RPO/RTO intactos.', artifact: 'Snapshot DRP Actualizado + Nueva Versión CMDB', slaNote: 'Preparación DRP preservada' },
    ],
  },
  {
    id: 'scn-offboarding',
    title: 'Offboarding de Tercero tras Puesta en Marcha',
    category: 'Identidad, Privilegios y Seguridad Física',
    severity: 'Alta',
    summary: 'Muestra la revocación sincronizada entre Solicitud de Servicio, Acceso Lógico, Bóveda PAM, Rotación de Contraseñas y Perímetro Físico.',
    involvedNodes: ['IAGS-06', 'IAGS-07', 'IAGS-08', 'IAGS-09', 'IAGS-12'],
    steps: [
      { stepNumber: 1, from: 'IAGS-06', to: 'IAGS-07', title: 'Apertura de Solicitud de Desmovilización', action: 'El gestor del contrato contacta a la Mesa de Servicios al concluir la operación asistida del integrador en planta.', artifact: 'Solicitud ITSM (REQ) de Revocación', slaNote: 'Prioridad P2 — Urgencia (≤ 2 días)' },
      { stepNumber: 2, from: 'IAGS-07', to: 'IAGS-08', title: 'Revocación de Cuentas AD y Locales', action: 'Los equipos de Acceso TI (AD) y Automatización (fuera de AD) deshabilitan credenciales nominales y validan check-in de código.', artifact: 'Log Revocación AAA + Check-in Versionado', slaNote: 'Segregación de funciones preservada' },
      { stepNumber: 3, from: 'IAGS-08', to: 'IAGS-09', title: 'Bloqueo en Bóveda PAM y Rotación', action: 'Se revoca el acceso temporal en la bóveda y las credenciales compartidas usadas en puesta en marcha rotan de inmediato.', artifact: 'Registro de Rotación PAM', slaNote: 'Rotación inmediata obligatoria' },
      { stepNumber: 4, from: 'IAGS-08', to: 'IAGS-12', title: 'Cancelación de Credencial y Biometría', action: 'Seguridad Patrimonial cancela el acceso físico temporal a Salas de PLC y Salas de Control (Perímetro Alto).', artifact: 'Lista de Autorizados Física Actualizada', slaNote: 'Sincronía lógica ↔ física completada' },
    ],
  },
  {
    id: 'scn-new-asset',
    title: 'Comisionamiento de Nuevo Activo Crítico OT',
    category: 'Ciclo de Vida de Activos y Gobernanza',
    severity: 'Média',
    summary: 'Recorre las compuertas de seguridad desde la demanda de un nuevo PLC/Estación hasta el monitoreo continuo en SIEM e inspección física.',
    involvedNodes: ['IAGS-02', 'IAGS-14', 'IAGS-03', 'IAGS-13', 'IAGS-15'],
    steps: [
      { stepNumber: 1, from: 'IAGS-02', to: 'IAGS-14', title: 'Demanda y Homologación Técnica', action: 'El nuevo activo pasa por análisis de riesgo de SI, requisitos contractuales y homologación de software/firmware antes de conectarse.', artifact: 'Formulario de Homologación + Criticidad A', slaNote: 'Compuertas de Demanda y Adquisición' },
      { stepNumber: 2, from: 'IAGS-14', to: 'IAGS-03', title: 'Hardening y Cambio de Claves vía RDM', action: 'En la implementación se aplica la línea base de seguridad, cambio obligatorio de claves de integrador y alta vía RDM.', artifact: 'RDM de Implementación + Checklist Hardening', slaNote: 'Cero contraseñas default en producción' },
      { stepNumber: 3, from: 'IAGS-02', to: 'IAGS-13', title: 'Protección Física y Cableado Seguro', action: 'El equipo se instala en gabinete protegido con segregación de cableado, bloqueo de pantalla e inclusión en plan anual de inspección.', artifact: 'Checklist de Protección de Hardware Crítico', slaNote: 'Alineado a criticidad del perímetro' },
      { stepNumber: 4, from: 'IAGS-02', to: 'IAGS-15', title: 'Registro en CMDB/PGA y Colecta NTP', action: 'El activo sincronizado entre ERP/EAM y CMDB comienza a reportar eventos de disponibilidad y seguridad al SIEM centralizado.', artifact: 'IC Activo en CMDB + Regla SIEM/NTP', slaNote: 'Observabilidad 24x7 habilitada' },
    ],
  },
  {
    id: 'scn-crisis-drp',
    title: 'Disrupción de Infraestructura Crítica (> RTO)',
    category: 'Gestión de Continuidad y Crisis',
    severity: 'Crítica',
    summary: 'Orquesta la respuesta cuando una falla severa de red/servidor amenaza superar el RTO, activando DRP, operación manual segura y controles compensatorios.',
    involvedNodes: ['IAGS-15', 'IAGS-04', 'IAGS-11', 'IAGS-01', 'IAGS-03'],
    steps: [
      { stepNumber: 1, from: 'IAGS-15', to: 'IAGS-04', title: 'Alarma Crítica de Disponibilidad (NOC)', action: 'El monitoreo detecta pérdida simultánea de switches core y servidor SCADA principal; se abre incidente P1 de inmediato.', artifact: 'Alerta NOC/SIEM → Ticket INC P1', slaNote: 'Escalamiento inmediato N3' },
      { stepNumber: 2, from: 'IAGS-04', to: 'IAGS-11', title: 'Declaración de Crisis y Activación DRP', action: 'La recuperación estimada supera el RTO de planta; se activa operación manual segura, failover al Data Center secundario y kit de contingencia.', artifact: 'Registro de Activación DRP/PCN', slaNote: 'Seguridad operativa preservada' },
      { stepNumber: 3, from: 'IAGS-01', to: 'IAGS-11', title: 'Aprobación de Control Compensatorio', action: 'El Comité de Crisis y SI Industrial autorizan acceso remoto supervisado temporal para restauración bajo monitoreo intensivo.', artifact: 'Término de Excepción Temporal + Monitoreo Reforzado', slaNote: 'Vigencia estricta durante la crisis' },
      { stepNumber: 4, from: 'IAGS-04', to: 'IAGS-03', title: 'Retorno a la Normalidad y Post-Crisis', action: 'Tras la restauración definitiva vía RDM, se revocan excepciones temporales y las lecciones alimentan el siguiente simulacro bienal.', artifact: 'RDM de Normalización + Informe de Crisis', slaNote: 'Actualización anual del PCN/DRP' },
    ],
  },
];

export function getLocalizedScenarios(locale: Locale): GovernanceScenario[] {
  if (locale === 'pt') return ANIMATED_SCENARIOS;
  return locale === 'en' ? SCENARIOS_EN : SCENARIOS_ES;
}

// ─── 4. PROCEDURE OWNERSHIP MAP (15 PROCEDURES) ──────────────────────────
const OWNERSHIP_EN: Record<string, ProcedureOwnershipMeta> = {
  'IAGS-01': { primaryOwner: 'IAGS Governance Leader', approver: 'Automation Engineering & Technology Management', executingTeams: ['IAGS Governance Committee', 'Process Owners (15 Procedures)'], stakeholders: ['OT Service Desk', 'Automation Engineering', 'Industrial IS', 'Internal Audit'], mandatoryArtifacts: ['Quarterly Committee Minutes (3-Year Retention)', 'IAGS Maturity Indicators'] },
  'IAGS-02': { primaryOwner: 'OT Asset Manager', approver: 'Automation Supervisor & IAGS Governance Leader', executingTeams: ['Automation Team', 'Asset Accounting & Control (ERP/EAM)'], stakeholders: ['ITSM Support (CMDB)', 'Industrial IS', 'Electrical Maintenance', 'Vendors'], mandatoryArtifacts: ['ERP/EAM ↔ CMDB Inventory', 'Asset Management Program (AMP)', 'Audit Action Plan'] },
  'IAGS-03': { primaryOwner: 'OT Change Manager', approver: 'OT-CAB (High Risk) / Automation Supervisor (Emergency)', executingTeams: ['Automation Team (L2/L3)', 'IT Infrastructure (shared assets)'], stakeholders: ['Plant Operations', 'Maintenance', 'Industrial IS', 'Service Desk'], mandatoryArtifacts: ['Request for Change (RFC)', 'Test, Rollback & Communication Plans', 'Version Control Log'] },
  'IAGS-04': { primaryOwner: 'OT Incident Manager', approver: 'Automation Supervisor (critical validation/escalation)', executingTeams: ['Service Desk (L1)', 'Automation Technicians & Analysts (L2/L3)', 'Vendors (L4)'], stakeholders: ['Instrumentation (Field WO)', 'Plant Operations', 'SOC / Industrial IS', 'NOC'], mandatoryArtifacts: ['ITSM Incident Ticket (INC)', 'ERP/EAM Work Order Link (WO)', 'Root Cause Analysis (RCA)'] },
  'IAGS-05': { primaryOwner: 'OT Service Catalog Manager', approver: 'Automation Supervisor & IAGS Governance Leader', executingTeams: ['IT Governance / ITSM Portal Support', 'Service Owners'], stakeholders: ['Business / Plant Operations', 'Service Desk', 'Internal Audit'], mandatoryArtifacts: ['Automation Service Specification Sheet', 'Annual Consistency Review Report'] },
  'IAGS-06': { primaryOwner: 'OT Service Desk Leader', approver: 'Automation Supervisor', executingTeams: ['Automation Planner (L1)', 'Service Desk & Field Service', 'Specialists (L2/L3)'], stakeholders: ['Instrumentation (WO)', 'NOC', 'SOC / Industrial IS', 'Vendors (L4)'], mandatoryArtifacts: ['ITSM Triage & Routing Log', 'Tiered SLA Performance Reports (L1–L4)'] },
  'IAGS-07': { primaryOwner: 'OT Service Request Manager', approver: 'Service Owner (Technical) & Automation Supervisor (Managerial)', executingTeams: ['Service Desk (L1)', 'Automation Technical Team'], stakeholders: ['Operational Requesters', 'HSE / Safety (JSA / PTW)', 'Outage Planning'], mandatoryArtifacts: ['ITSM Service Request (REQ)', 'JSA / Permit to Work Verification'] },
  'IAGS-08': { primaryOwner: 'OT Logical Access Owner', approver: 'Requester Manager (Approval) & Asset Manager (Authorization)', executingTeams: ['IT Access Control (AD)', 'OT Logical Access Team (non-AD)'], stakeholders: ['HR (Onboarding/Offboarding)', 'Industrial IS', 'Contractor Managers', 'Audit'], mandatoryArtifacts: ['Annual Access Recertification Report', 'ITSM Segregation of Duties Audit Trail'] },
  'IAGS-09': { primaryOwner: 'OT Privileged Access Owner (PAM)', approver: 'Requester Manager + Technical Review + Asset Manager', executingTeams: ['PAM Vault Administration / Industrial IS', 'Automation Team (Local/Service Accounts)'], stakeholders: ['SOC (24x7 Monitoring)', 'Vendors under Temporary Access', 'Internal Audit'], mandatoryArtifacts: ['Privileged Access Register', 'Semiannual PAM Critical Review Report'] },
  'IAGS-10': { primaryOwner: 'OT Cybersecurity Coordinator', approver: 'Automation Management & Corporate Risk Management (Risk Acceptance)', executingTeams: ['Industrial IS', 'Automation Team', 'IT Infrastructure / Network', 'Maintenance (UPS)'], stakeholders: ['Internal Audit (Pentest under NDA)', 'OT-CAB', 'OT Vendors'], mandatoryArtifacts: ['Monthly TVM & Annual TCM Reports', 'Confidential Pentest Report', 'Patching RFCs (60–180d)'] },
  'IAGS-11': { primaryOwner: 'OT Infrastructure Continuity Coordinator', approver: 'Crisis Committee & Automation/Engineering Management', executingTeams: ['Automation Specialists (L3)', 'IT Infrastructure (Data Centers)', 'Industrial IS'], stakeholders: ['Plant Operations (Safe Manual Mode)', 'Turnaround Planning', 'Risk Management'], mandatoryArtifacts: ['Contingency & Biennial Drill Log', 'DRP/BCP Plans & BIA Matrix (RTO/RPO)'] },
  'IAGS-12': { primaryOwner: 'OT Physical Security Manager', approver: 'Critical Environment Manager & Corporate Physical Security', executingTeams: ['Physical Security', 'Facility / Electrical Maintenance', 'Automation Team'], stakeholders: ['HR (Offboarding)', 'Emergency Brigade', 'Instrumentation', 'Visitors & Contractors'], mandatoryArtifacts: ['Annual Physical Security Review Report', 'Authorized Personnel Roster', 'Control Recommendations'] },
  'IAGS-13': { primaryOwner: 'OT Asset Protection & Maintenance Owner', approver: 'Automation Supervisor & Maintenance Supervision', executingTeams: ['Automation Team', 'Electrical / Instrumentation Maintenance', 'Supervised Vendors'], stakeholders: ['Physical Security (Asset Exit)', 'Industrial IS (Secure Disposal)', 'Audit'], mandatoryArtifacts: ['Sampling Inspection Plans', 'Control Recommendations', 'Secure Disposal Certificate'] },
  'IAGS-14': { primaryOwner: 'OT Software Engineering Leader', approver: 'Tripartite Sign-off: IT Infrastructure + Industrial IS + Automation', executingTeams: ['Automation Engineering', 'IT Infrastructure', 'Industrial IS', 'Monitored Vendors'], stakeholders: ['Operational Clients (Acceptance)', 'Catalog Manager', 'Continuity Manager'], mandatoryArtifacts: ['Software Homologation Form', 'Installation & Rollback Guide', 'Annual License Review'] },
  'IAGS-15': { primaryOwner: 'OT Monitoring & SOC Leader', approver: 'Industrial IS & Automation Supervisor', executingTeams: ['SOC (Cybersecurity)', 'NOC (Availability/Capacity)', 'Asset Owners'], stakeholders: ['Service Desk', 'Digital Forensics / Audit', 'L4 Vendors (Anonymized Logs)'], mandatoryArtifacts: ['Log Collection Matrix in AMP', 'NTP Config & Append-Only SIEM Retention'] },
};

const OWNERSHIP_ES: Record<string, ProcedureOwnershipMeta> = {
  'IAGS-01': { primaryOwner: 'Líder de Gobernanza IAGS', approver: 'Gerencia de Ingeniería y Tecnología de Automatización', executingTeams: ['Comité de Gobernanza IAGS', 'Dueños de Procesos (15 normas)'], stakeholders: ['Mesa de Servicios OT', 'Equipo de Automatización', 'SI Industrial', 'Auditoría Interna'], mandatoryArtifacts: ['Actas Trimestrales del Comité (Retención 3 años)', 'Indicadores de Madurez IAGS'] },
  'IAGS-02': { primaryOwner: 'Responsable de Activos de Automatización', approver: 'Supervisor de Automatización y Líder de Gobernanza IAGS', executingTeams: ['Equipo de Automatización', 'Control Patrimonial (ERP/EAM)'], stakeholders: ['Soporte ITSM (CMDB)', 'SI Industrial', 'Mantenimiento Eléctrico', 'Proveedores'], mandatoryArtifacts: ['Inventario ERP/EAM ↔ CMDB', 'Programa de Gestión de Activos (PGA)', 'Plan de Acción de Auditoría'] },
  'IAGS-03': { primaryOwner: 'Gestor de Cambios de Automatización', approver: 'CAB-Automatización (Riesgo Alto) / Supervisor (Emergencia)', executingTeams: ['Equipo de Automatización (N2/N3)', 'Infraestructura TI (activos compartidos)'], stakeholders: ['Operación de Planta', 'Mantenimiento', 'SI Industrial', 'Mesa de Servicios'], mandatoryArtifacts: ['Requerimiento de Cambio (RDM)', 'Planes de Prueba, Rollback y Comunicación', 'Registro en Control de Versiones'] },
  'IAGS-04': { primaryOwner: 'Gestor de Incidentes de Automatización', approver: 'Supervisor de Automatización (validación/escalamiento crítico)', executingTeams: ['Mesa de Servicios (N1)', 'Técnicos y Especialistas OT (N2/N3)', 'Proveedores (N4)'], stakeholders: ['Instrumentación (OM Campo)', 'Operación de Planta', 'SOC / SI Industrial', 'NOC'], mandatoryArtifacts: ['Registro de Incidente ITSM (INC)', 'Vínculo con OM (ERP/EAM)', 'Análisis de Causa Raíz (ACR)'] },
  'IAGS-05': { primaryOwner: 'Gestor del Catálogo de Servicios OT', approver: 'Supervisor de Automatización y Líder de Gobernanza IAGS', executingTeams: ['Gobernanza TI / Soporte Portal ITSM', 'Responsables de Servicios'], stakeholders: ['Áreas Clientes / Operación', 'Mesa de Servicios', 'Auditoría Interna'], mandatoryArtifacts: ['Ficha de Servicio de Automatización', 'Informe Anual de Consistencia'] },
  'IAGS-06': { primaryOwner: 'Líder de la Mesa de Servicios OT', approver: 'Supervisor de Automatización', executingTeams: ['Planificador OT (N1)', 'Service Desk y Field Service', 'Especialistas (N2/N3)'], stakeholders: ['Instrumentación (OM)', 'NOC', 'SOC / SI Industrial', 'Proveedores (N4)'], mandatoryArtifacts: ['Registro de Triaje y Enrutamiento ITSM', 'Informes de SLA por Nivel (N1–N4)'] },
  'IAGS-07': { primaryOwner: 'Gestor de Solicitudes de Automatización', approver: 'Responsable del Servicio (Técnica) y Supervisor (Gerencial)', executingTeams: ['Mesa de Servicios (N1)', 'Equipo Técnico de Automatización'], stakeholders: ['Solicitantes Operativos', 'Seguridad Industrial (APR/PTP)', 'Planificación de Paradas'], mandatoryArtifacts: ['Registro de Solicitud ITSM (REQ)', 'Verificación de APR / PTP cuando aplique'] },
  'IAGS-08': { primaryOwner: 'Responsable de Acceso Lógico OT', approver: 'Gestor del Solicitante (Aprobación) y Gerente del Activo (Autorización)', executingTeams: ['Control de Acceso TI (AD)', 'Equipo de Acceso Lógico OT (fuera de AD)'], stakeholders: ['RR. HH. (Altas/Bajas)', 'SI Industrial', 'Gestores de Contratos de Terceros', 'Auditoría'], mandatoryArtifacts: ['Informe Anual de Revisión de Accesos', 'Traza de Segregación de Funciones ITSM'] },
  'IAGS-09': { primaryOwner: 'Responsable de Cuentas Privilegiadas OT (PAM)', approver: 'Gerente del Solicitante + Evaluación Técnica + Gerente del Activo', executingTeams: ['Administración Bóveda PAM / SI Industrial', 'Equipo de Automatización (Cuentas Locales)'], stakeholders: ['SOC (Monitoreo 24x7)', 'Proveedores con Acceso Temporal', 'Auditoría Interna'], mandatoryArtifacts: ['Registro de Accesos Privilegiados', 'Informe Semestral de Revisión PAM'] },
  'IAGS-10': { primaryOwner: 'Coordinador de Ciberseguridad OT', approver: 'Gerencia de Automatización y Gestión de Riesgos Corporativa', executingTeams: ['SI Industrial', 'Equipo de Automatización', 'Infraestructura TI / Redes', 'Mantenimiento (UPS)'], stakeholders: ['Auditoría Interna (TDI/TDE con NDA)', 'CAB-Automatización', 'Fabricantes OT'], mandatoryArtifacts: ['Informe Mensual GVT y Anual GCT', 'Informe Confidencial TDI/TDE', 'RDMs de Parcheo (60–180d)'] },
  'IAGS-11': { primaryOwner: 'Coordinador de Continuidad de Infraestructura OT', approver: 'Comité de Crisis y Gerencia de Ingeniería/Automatización', executingTeams: ['Especialistas de Automatización (N3)', 'Infraestructura TI (Data Centers)', 'SI Industrial'], stakeholders: ['Operación de Planta (Modo Manual Seguro)', 'Planificación de Paradas', 'Gestión de Riesgos'], mandatoryArtifacts: ['Registro de Contingencia y Simulacros Bienales', 'Planes DRP/PCN y Matriz BIA (RTO/RPO)'] },
  'IAGS-12': { primaryOwner: 'Gestor de Seguridad Física en Automatización', approver: 'Gestor del Ambiente Crítico y Seguridad Patrimonial', executingTeams: ['Seguridad Patrimonial', 'Mantenimiento Eléctrico / Edilicio', 'Equipo de Automatización'], stakeholders: ['RR. HH. (Offboarding)', 'Brigada de Emergencia', 'Instrumentación', 'Visitantes y Terceros'], mandatoryArtifacts: ['Informe Anual de Revisión Física', 'Lista de Personas Autorizadas', 'Recomendación de Controles'] },
  'IAGS-13': { primaryOwner: 'Responsable de Protección y Mantenimiento OT', approver: 'Supervisor de Automatización y Supervisión de Mantenimiento', executingTeams: ['Equipo de Automatización', 'Mantenimiento Eléctrico / Instrumentación', 'Proveedores Supervisados'], stakeholders: ['Seguridad Patrimonial (Salida de Activos)', 'SI Industrial (Descarte Seguro)', 'Auditoría'], mandatoryArtifacts: ['Planes de Inspección Muestral', 'Recomendación de Controles', 'Certificado de Descarte Seguro'] },
  'IAGS-14': { primaryOwner: 'Líder de Ingeniería de Software OT', approver: 'Validación Tripartita: Infraestructura TI + SI Industrial + Automatización', executingTeams: ['Ingeniería de Automatización', 'Infraestructura TI', 'SI Industrial', 'Proveedores Monitoreados'], stakeholders: ['Clientes Operativos (Aceptación)', 'Gestor del Catálogo', 'Gestor de Continuidad'], mandatoryArtifacts: ['Formulario de Homologación de Software', 'Guía de Instalación y Rollback', 'Revisión Anual de Licencias'] },
  'IAGS-15': { primaryOwner: 'Líder de Monitoreo y SOC OT', approver: 'SI Industrial y Supervisor de Automatización', executingTeams: ['SOC (Ciberseguridad)', 'NOC (Disponibilidad/Capacidad)', 'Responsables de Activos'], stakeholders: ['Mesa de Servicios', 'Forense Digital / Auditoría', 'Proveedores N4 (Logs Anonimizados)'], mandatoryArtifacts: ['Matriz de Logs en PGA', 'Configuración NTP y Retención Append-Only SIEM'] },
};

export function getLocalizedOwnership(code: string, locale: Locale): ProcedureOwnershipMeta | undefined {
  if (locale === 'pt') return PROCEDURE_OWNERSHIP_MAP[code];
  return locale === 'en' ? OWNERSHIP_EN[code] : OWNERSHIP_ES[code];
}

// ─── 5. OPERATIONAL DATASETS (ASSETS, AUDITS, PLANS, MINUTES, CONTROLS) ──
const ASSET_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<string, { name: string; subclass: string; siteZone: string; owner: string }>
> = {
  en: {
    'ast-01': { name: 'Main Process Controller — Process Area 01', subclass: 'Process PLC', siteZone: 'OT Zone L1 · PLC Room 01', owner: 'Eng. Marcos Ribeiro' },
    'ast-02': { name: 'Engineering Workstation — Logic Maintenance', subclass: 'Engineering Workstation', siteZone: 'OT Zone L2 · Engineering Room', owner: 'Eng. Carla Mendes' },
    'ast-03': { name: 'Industrial Perimeter Firewall (IDMZ)', subclass: 'Industrial Firewall', siteZone: 'IDMZ Zone · Main Data Center', owner: 'Spec. Rafael Tavares (Industrial IS)' },
    'ast-04': { name: 'SCADA Supervisory Server — Integrated Plant', subclass: 'Supervisory System', siteZone: 'OT Zone L3 · Main Data Center', owner: 'Eng. Lucas Nogueira' },
    'ast-05': { name: 'Local HMI — Pumping Panel', subclass: '15" Operator Panel', siteZone: 'OT Zone L1 · Utilities Area', owner: 'Tech. Bruno Almeida' },
    'ast-06': { name: 'Redundant Ring Backbone Industrial Switch', subclass: 'Industrial Switch', siteZone: 'OT Zone L2 · Central Control Room', owner: 'Eng. Rafael Tavares' },
    'ast-07': { name: 'Industrial UPS 20 kVA — PLC Room 01', subclass: 'Double-Conversion Industrial UPS', siteZone: 'OT Zone L0 · Electrical Substation 01', owner: 'Sup. Renato Costa (Maintenance)' },
    'ast-08': { name: 'Industrial Process Historian Server', subclass: 'Historian', siteZone: 'OT Zone L3 · Main Data Center', owner: 'Eng. Lucas Nogueira' },
    'ast-09': { name: 'Operator Workstation — North Console', subclass: 'Operator Workstation', siteZone: 'OT Zone L2 · North Control Room', owner: 'Eng. Carla Mendes' },
    'ast-10': { name: 'Legacy Controller — Auxiliary Line (Migration)', subclass: 'Legacy PLC', siteZone: 'OT Zone L1 · Auxiliary Unit', owner: 'Eng. Marcos Ribeiro' },
  },
  es: {
    'ast-01': { name: 'Controlador Principal — Área de Proceso 01', subclass: 'PLC de Proceso', siteZone: 'Zona OT-N1 · Sala de PLCs 01', owner: 'Ing. Marcos Ribeiro' },
    'ast-02': { name: 'Estación de Ingeniería — Mantenimiento Lógico', subclass: 'Estación de Ingeniería', siteZone: 'Zona OT-N2 · Sala de Ingeniería', owner: 'Ing. Carla Mendes' },
    'ast-03': { name: 'Firewall Industrial de Perímetro IDMZ', subclass: 'Firewall Industrial', siteZone: 'Zona IDMZ · Data Center Principal', owner: 'Esp. Rafael Tavares (SI Industrial)' },
    'ast-04': { name: 'Servidor de Supervisión SCADA — Planta Integrada', subclass: 'Sistema de Supervisión', siteZone: 'Zona OT-N3 · Data Center Principal', owner: 'Ing. Lucas Nogueira' },
    'ast-05': { name: 'HMI Local — Panel de Bombeo', subclass: 'Panel Operador 15"', siteZone: 'Zona OT-N1 · Área de Servicios Auxiliares', owner: 'Téc. Bruno Almeida' },
    'ast-06': { name: 'Switch Industrial Backbone Anillo Redundante', subclass: 'Switch Industrial', siteZone: 'Zona OT-N2 · Sala de Control Central', owner: 'Ing. Rafael Tavares' },
    'ast-07': { name: 'UPS Industrial 20 kVA — Sala de PLCs 01', subclass: 'UPS Industrial Doble Conversión', siteZone: 'Zona OT-N0 · Subestación Eléctrica 01', owner: 'Sup. Renato Costa (Mantenimiento)' },
    'ast-08': { name: 'Servidor Historiador de Proceso Industrial', subclass: 'Historian', siteZone: 'Zona OT-N3 · Data Center Principal', owner: 'Ing. Lucas Nogueira' },
    'ast-09': { name: 'Estación de Operación — Consola Norte', subclass: 'Estación de Operación', siteZone: 'Zona OT-N2 · Sala de Control Norte', owner: 'Ing. Carla Mendes' },
    'ast-10': { name: 'Controlador Legado — Línea Auxiliar (Migración)', subclass: 'PLC Legado', siteZone: 'Zona OT-N1 · Unidad Auxiliar', owner: 'Ing. Marcos Ribeiro' },
  },
};

export function localizeAsset(asset: OtAsset, locale: Locale): OtAsset {
  if (locale === 'pt') return asset;
  const override = ASSET_TEXT[locale][asset.id];
  return override ? { ...asset, ...override } : asset;
}

const AUDIT_SCOPES: Record<Exclude<Locale, 'pt'>, Record<string, string>> = {
  en: {
    'aud-01': '25% Sampling — Workstations, Switches, HMIs & CMDB/ERP reconciliation',
    'aud-02': 'Annual technical baseline check across SCADA Servers, OT AD, and Firewalls',
    'aud-03': '100% of all 6 Critical OT Classes + AMP/ERP/CMDB reconciliation',
  },
  es: {
    'aud-01': 'Muestreo 25% — Estaciones, Switches, HMIs y conciliación CMDB/ERP',
    'aud-02': 'Verificación cíclica anual de línea base en Servidores SCADA, AD OT y Firewalls',
    'aud-03': '100% de las 6 Clases Críticas OT + Conciliación PGA/ERP/CMDB',
  },
};

export function localizeAudits(audits: AuditRecord[], locale: Locale): AuditRecord[] {
  if (locale === 'pt') return audits;
  return audits.map((a) => ({
    ...a,
    scope: AUDIT_SCOPES[locale][a.id] ?? a.scope,
  }));
}

const ACTION_TITLES: Record<Exclude<Locale, 'pt'>, Record<string, string>> = {
  en: {
    'pa-01': 'Apply full hardening baseline and USB port lock on EWS-ENG-004',
    'pa-02': 'Remove unapproved software detected on OWS-OP-012 and escalate to Industrial IS',
    'pa-03': 'Replace integrator default passwords and sync IHM-LIN-207 in CMDB/AMP',
    'pa-04': 'Execute secure memory sanitization and final CMDB retirement for CLP-LEG-042',
  },
  es: {
    'pa-01': 'Aplicar línea base completa de hardening y bloqueo USB en EWS-ENG-004',
    'pa-02': 'Retirar software no homologado detectado en OWS-OP-012 y escalar a SI Industrial',
    'pa-03': 'Cambiar contraseñas de integrador y sincronizar IHM-LIN-207 en CMDB/PGA',
    'pa-04': 'Ejecutar borrado seguro de memoria y baja definitiva en CMDB para CLP-LEG-042',
  },
};

export function localizeActionPlans(plans: ActionPlanItem[], locale: Locale): ActionPlanItem[] {
  if (locale === 'pt') return plans;
  return plans.map((p) => ({
    ...p,
    title: ACTION_TITLES[locale][p.id] ?? p.title,
  }));
}

const MINUTES_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<string, { quarter: string; summary: string; keyDecisions: string[]; retentionUntil: string }>
> = {
  en: {
    'ata-2026-03': {
      quarter: 'Q3 2026',
      summary: 'Consolidated review of all 15 IAGS procedures, semiannual audit action plan tracking, and approval of the SCADA patching outage window.',
      keyDecisions: [
        'Approved full integration of privileged logs (IAGS-09/IAGS-15) into SIEM with immutable retention.',
        'Set a 30-day deadline to close hardening deviations on engineering workstations.',
        'Validated biennial DRP continuity drill schedule for Firewalls and SCADA during January outage.',
      ],
      retentionUntil: '2029-09-25 (3 years + archive)',
    },
    'ata-2026-02': {
      quarter: 'Q2 2026',
      summary: 'Service Catalog maturity assessment, semiannual PAM review, and physical security report for electrical safety rooms.',
      keyDecisions: [
        'Approved 18 updated service specification sheets in the Automation Service Catalog (IAGS-05).',
        'Revoked 6 residual temporary contractor accesses post-startup (IAGS-08/IAGS-12).',
      ],
      retentionUntil: '2029-06-22 (3 years + archive)',
    },
    'ata-2026-01': {
      quarter: 'Q1 2026',
      summary: 'Kickoff of the annual IAGS governance cycle, vulnerability SLA targets (60/90/120/180d), and audit calendar.',
      keyDecisions: [
        'Confirmed exclusion of PLCs/RTUs and UPS units from active internal/external pentests (IAGS-10).',
        'Approved annual automation software license reconciliation program (IAGS-14).',
      ],
      retentionUntil: '2029-03-19 (3 years + archive)',
    },
  },
  es: {
    'ata-2026-03': {
      quarter: '3.er Trimestre 2026',
      summary: 'Revisión consolidada de las 15 normas IAGS, seguimiento del plan de auditoría semestral y aprobación de ventana de parada para parche SCADA.',
      keyDecisions: [
        'Aprobada integración completa de logs privilegiados (IAGS-09/IAGS-15) en SIEM con retención inmutable.',
        'Definido plazo de 30 días para cerrar desvíos de hardening en estaciones de ingeniería.',
        'Validado cronograma bienal de prueba DRP para Firewalls y SCADA en la parada de enero.',
      ],
      retentionUntil: '2029-09-25 (3 años + histórico)',
    },
    'ata-2026-02': {
      quarter: '2.º Trimestre 2026',
      summary: 'Evaluación de madurez del Catálogo de Servicios, revisión semestral de cuentas privilegiadas (PAM) e informe de seguridad física.',
      keyDecisions: [
        'Homologadas 18 fichas actualizadas en el Catálogo de Servicios de Automatización (IAGS-05).',
        'Revocados 6 accesos temporales residuales de terceros tras puesta en marcha (IAGS-08/IAGS-12).',
      ],
      retentionUntil: '2029-06-22 (3 años + histórico)',
    },
    'ata-2026-01': {
      quarter: '1.er Trimestre 2026',
      summary: 'Apertura del ciclo anual de gobernanza IAGS, metas de SLA de vulnerabilidades (60/90/120/180d) y calendario de auditorías.',
      keyDecisions: [
        'Confirmada exclusión de PLCs/Remotas y UPS de pruebas activas TDI/TDE (IAGS-10).',
        'Aprobado programa anual de revisión de licencias de software de automatización (IAGS-14).',
      ],
      retentionUntil: '2029-03-19 (3 años + histórico)',
    },
  },
};

export function localizeMinutes(minutes: CommitteeMinute[], locale: Locale): CommitteeMinute[] {
  if (locale === 'pt') return minutes;
  return minutes.map((m) => ({
    ...m,
    ...(MINUTES_TEXT[locale][m.id] ?? {}),
  }));
}

const PERIMETERS_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<string, { areaName: string; accessControl: string }>
> = {
  en: {
    'per-01': { areaName: 'Primary & Redundant Industrial Data Center', accessControl: 'Biometrics + Badge + 24x7 CCTV + Log' },
    'per-02': { areaName: 'Main Intake & OT Power Distribution Substation', accessControl: 'Electrical Safety Badge + Lock + Registry' },
    'per-03': { areaName: 'PLC Rooms & Operational Control Rooms', accessControl: 'Biometrics + CCTV + Contractor Escort' },
    'per-04': { areaName: 'Area Electrical Rooms & Robotics Enclosures', accessControl: 'Controlled Key / Badge + Annual Inspection' },
    'per-05': { areaName: 'Test Bench Labs & Offices with OT Network', accessControl: 'Staff Badge + Switch Port Segregation' },
  },
  es: {
    'per-01': { areaName: 'Data Center Industrial Principal y Redundante', accessControl: 'Biometría + Credencial + CCTV 24x7 + Log' },
    'per-02': { areaName: 'Subestación de Entrada y Distribución OT', accessControl: 'Credencial Eléctrica + Cerradura + Registro' },
    'per-03': { areaName: 'Salas de PLCs y Salas de Control Operativo', accessControl: 'Biometría + CCTV + Acompañamiento a Terceros' },
    'per-04': { areaName: 'Salas Eléctricas de Área y Cabinas de Robótica', accessControl: 'Llave Controlada / Credencial + Inspección Anual' },
    'per-05': { areaName: 'Laboratorios de Banco y Oficinas con Red OT', accessControl: 'Credencial Funcional + Segregación de Puerto Switch' },
  },
};

export function getLocalizedPhysicalPerimeters(locale: Locale): PhysicalPerimeterRecord[] {
  if (locale === 'pt') return PHYSICAL_PERIMETERS;
  return PHYSICAL_PERIMETERS.map((p) => ({
    ...p,
    ...(PERIMETERS_TEXT[locale][p.id] ?? {}),
  }));
}

const CONTINUITY_TEXT: Record<Exclude<Locale, 'pt'>, Record<string, { redundancyModel: string }>> = {
  en: {
    'cnt-01': { redundancyModel: 'Redundant CPU + Versioned Backup + Cold Spare' },
    'cnt-02': { redundancyModel: 'Active-Standby Cluster + Secondary DC Replication' },
    'cnt-03': { redundancyModel: 'HA Active-Standby Pair + Dedicated Corporate Plan' },
    'cnt-04': { redundancyModel: 'Redundant Optical Ring + Config Backup + Spare' },
    'cnt-05': { redundancyModel: 'Project Image + Laptop/Cable Kit + Manual Operation' },
  },
  es: {
    'cnt-01': { redundancyModel: 'CPU Redundante + Backup Versionado + Repuesto' },
    'cnt-02': { redundancyModel: 'Clúster Activo-Standby + Replicación DC Secundario' },
    'cnt-03': { redundancyModel: 'Par HA Activo-Standby + Plan Corporativo Dedicado' },
    'cnt-04': { redundancyModel: 'Anillo Óptico Redundante + Backup Config + Repuesto' },
    'cnt-05': { redundancyModel: 'Imagen de Proyecto + Kit Laptop/Cable + Operación Manual' },
  },
};

export function getLocalizedContinuitySystems(locale: Locale): ContinuitySystemRecord[] {
  if (locale === 'pt') return CONTINUITY_SYSTEMS;
  return CONTINUITY_SYSTEMS.map((s) => ({
    ...s,
    ...(CONTINUITY_TEXT[locale][s.id] ?? {}),
  }));
}

const ROLES_TEXT: Record<
  Exclude<Locale, 'pt'>,
  { role: string; cadence: string; keyResponsibilities: string }[]
> = {
  en: [
    { role: 'Automation Engineering & Technology Management', cadence: 'Quarterly / Risk Acceptance', keyResponsibilities: 'Sponsor IAGS, approve policies, authorize formal residual risk acceptances, and fund resilience initiatives.' },
    { role: 'IAGS Governance Leader', cadence: 'Continuous / Quarterly Minutes', keyResponsibilities: 'Chair the IAGS Committee, maintain all 15 procedures, approve Catalog structure, and oversee audits and KPIs.' },
    { role: 'Automation Supervisor', cadence: 'Daily / Weekly CAB', keyResponsibilities: 'Approve emergency changes, service sheets, critical accesses, gated requests, and L1–L3 prioritization.' },
    { role: 'OT Service Desk & Planner (L1)', cadence: 'Continuous 24x7', keyResponsibilities: 'Receive demands in ITSM, triage tickets, run standard checklists, pre-approved changes, and route queues.' },
    { role: 'Automation Specialists & Technicians (L2/L3)', cadence: 'Operations / Outages', keyResponsibilities: 'Maintain PLCs/SCADA/Networks, homologate software, execute DRP drills, version logic, and remediate CVEs.' },
    { role: 'Industrial IS, SOC & NOC', cadence: '24x7 Monitoring / Monthly', keyResponsibilities: 'Operate SIEM/NTP, run TVM/TCM and pentests, administer PAM vault, firewalls, and cyber incident response.' },
    { role: 'Electrical Maintenance, Instrumentation & Physical Security', cadence: 'Field (WO) / Annual Review', keyResponsibilities: 'First-line field response via ERP/EAM Work Orders, UPS/generators, electrical rooms, and badge/biometric controls.' },
  ],
  es: [
    { role: 'Gerencia de Ingeniería y Tecnología de Automatización', cadence: 'Trimestral / Aceptación de Riesgo', keyResponsibilities: 'Patrocinar IAGS, aprobar políticas, autorizar riesgos residuales formales y liberar presupuesto de resiliencia.' },
    { role: 'Líder de Gobernanza IAGS', cadence: 'Continuo / Actas Trimestrales', keyResponsibilities: 'Coordinar el Comité IAGS, mantener las 15 normas, aprobar la estructura del Catálogo y dirigir auditorías y KPIs.' },
    { role: 'Supervisor de Automatización', cadence: 'Diario / CAB Semanal', keyResponsibilities: 'Aprobar cambios de emergencia, fichas de servicio, accesos críticos, solicitudes con aprobación y priorización N1–N3.' },
    { role: 'Mesa de Servicios y Planificador OT (N1)', cadence: 'Continuo 24x7', keyResponsibilities: 'Recibir demandas en ITSM, ejecutar triaje, aplicar listas estándar, cambios preaprobados y enrutamiento.' },
    { role: 'Especialistas y Técnicos de Automatización (N2/N3)', cadence: 'Operación / Paradas', keyResponsibilities: 'Mantener PLCs/SCADA/Redes, homologar software, conducir DRP, versionar códigos y remediar vulnerabilidades.' },
    { role: 'SI Industrial, SOC y NOC', cadence: 'Monitoreo 24x7 / Mensual', keyResponsibilities: 'Operar SIEM/NTP, ejecutar GVT/GCT y TDI/TDE, administrar bóveda PAM, firewalls y respuesta a incidentes.' },
    { role: 'Mantenimiento Eléctrico, Instrumentación y Seguridad Patrimonial', cadence: 'Campo (OM) / Revisión Anual', keyResponsibilities: 'Primera atención en campo vía OM (ERP/EAM), UPS/generadores, perímetros eléctricos y control biométrico.' },
  ],
};

export function getLocalizedRolesMatrix(locale: Locale): GovernanceRoleMatrixItem[] {
  if (locale === 'pt') return GOVERNANCE_ROLES_MATRIX;
  return GOVERNANCE_ROLES_MATRIX.map((row, idx) => ({
    ...row,
    ...(ROLES_TEXT[locale][idx] ?? {}),
  }));
}

// ─── 6. RECHARTS LOCALIZED SERIES ────────────────────────────────────────
const CHART_DOMAIN_LABELS: Record<Locale, string[]> = {
  pt: ['Governança', 'Ativos OT', 'Operação', 'Identidade', 'Ciber & SOC', 'Resiliência'],
  en: ['Governance', 'OT Assets', 'Operations', 'Identity', 'Cyber & SOC', 'Resilience'],
  es: ['Gobernanza', 'Activos OT', 'Operación', 'Identidad', 'Ciber y SOC', 'Resiliencia'],
};

const CHART_MONTH_LABELS: Record<Locale, string[]> = {
  pt: ['Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov'],
  en: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  es: ['Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov'],
};

const CHART_VULN_LABELS: Record<Locale, string[]> = {
  pt: ['Crítica (60d)', 'Alta (90d)', 'Média (120d)', 'Baixa (180d)'],
  en: ['Critical (60d)', 'High (90d)', 'Medium (120d)', 'Low (180d)'],
  es: ['Crítica (60d)', 'Alta (90d)', 'Media (120d)', 'Baja (180d)'],
};

export function getLocalizedDomainMaturity(locale: Locale) {
  return DOMAIN_MATURITY_DATA.map((row, idx) => ({
    ...row,
    domain: CHART_DOMAIN_LABELS[locale][idx] ?? row.domain,
  }));
}

export function getLocalizedMonthlyOperations(locale: Locale) {
  return MONTHLY_OPERATIONS_DATA.map((row, idx) => ({
    ...row,
    mes: CHART_MONTH_LABELS[locale][idx] ?? row.mes,
  }));
}

export function getLocalizedVulnSlaChart(locale: Locale) {
  return VULNERABILITY_SLA_CHART_DATA.map((row, idx) => ({
    ...row,
    severidade: CHART_VULN_LABELS[locale][idx] ?? row.severidade,
  }));
}

// ─── 7. CHANGE IMPACT SIMULATOR LOCALIZATION ─────────────────────────────
const ACTION_TEXT: Record<
  Exclude<Locale, 'pt'>,
  Record<ChangeActionType, { label: string; shortLabel: string; description: string }>
> = {
  en: {
    logica: { label: 'Logic / Firmware Change', shortLabel: 'Logic / Firmware', description: 'Modification of PLC program, HMI screens, interlock loops, or industrial firmware upgrade.' },
    patch: { label: 'Security Patch / Reboot', shortLabel: 'Patch / Reboot', description: 'CVE security fix (IAGS-10) with controlled restart and validation on stand-by asset.' },
    energia: { label: 'Electrical Maint. / Shutdown', shortLabel: 'Power / Outage', description: 'UPS intervention, electrical panel work, or critical hardware swap (JSA/PTW + Electrical Safety).' },
    rede: { label: 'Firewall / Network Segmentation', shortLabel: 'Network / FW', description: 'Changes to ACLs, industrial VLANs, IDMZ rules, or routing across OT and IT layers.' },
    falha: { label: 'Sudden Failure / Outage (> RTO)', shortLabel: 'Failure / Crisis', description: 'Unexpected asset failure drill to assess P1 incident escalation and DRP continuity activation.' },
  },
  es: {
    logica: { label: 'Cambio de Lógica / Firmware', shortLabel: 'Lógica / Firmware', description: 'Modificación de programa en PLC, pantallas HMI, lazos de enclavamiento o actualización de firmware.' },
    patch: { label: 'Parche de Seguridad / Reinicio', shortLabel: 'Parche / Reinicio', description: 'Aplicación de corrección CVE (IAGS-10) con reinicio controlado y validación en activo stand-by.' },
    energia: { label: 'Mant. Eléctrico / Apagado', shortLabel: 'Energía / Parada', description: 'Intervención en UPS, tablero eléctrico o reemplazo físico de hardware crítico (APR/PTP).' },
    rede: { label: 'Cambio Firewall / Segmentación', shortLabel: 'Red / Firewall', description: 'Modificación de ACLs, VLANs industriales, reglas IDMZ o enrutamiento entre capas OT y TI.' },
    falha: { label: 'Falla Súbita / Indisponib. (> RTO)', shortLabel: 'Falla / Crisis', description: 'Simulación de parada inesperada para evaluar incidentes P1 y activación del plan de continuidad DRP.' },
  },
};

export function getLocalizedChangeActions(locale: Locale): ChangeActionOption[] {
  if (locale === 'pt') return CHANGE_ACTION_OPTIONS;
  return CHANGE_ACTION_OPTIONS.map((o) => ({
    ...o,
    ...ACTION_TEXT[locale][o.id],
  }));
}

const PLANT_TEXT: Record<Exclude<Locale, 'pt'>, Record<string, { code: string; name: string; areaType: string }>> = {
  en: {
    'PLT-01': { code: 'PLANT-01', name: 'Continuous Process Unit 01', areaType: 'Primary Process' },
    'PLT-02': { code: 'PLANT-02', name: 'Utilities & Pumping Station', areaType: 'Industrial Utilities' },
    'PLT-03': { code: 'PLANT-03', name: 'Integrated Control Operations Center', areaType: 'Central Supervision' },
    'PLT-04': { code: 'PLANT-04', name: 'Auxiliary Dosing & Dispatch Unit', areaType: 'Secondary Process' },
  },
  es: {
    'PLT-01': { code: 'PLANTA-01', name: 'Unidad de Proceso Continuo 01', areaType: 'Proceso Primario' },
    'PLT-02': { code: 'PLANTA-02', name: 'Estación de Servicios Auxiliares y Bombeo', areaType: 'Servicios Industriales' },
    'PLT-03': { code: 'PLANTA-03', name: 'Centro Integrado de Control Operativo', areaType: 'Supervisión Central' },
    'PLT-04': { code: 'PLANTA-04', name: 'Unidad Auxiliar de Dosificación y Despacho', areaType: 'Proceso Secundario' },
  },
};

const SYSTEM_TEXT: Record<Exclude<Locale, 'pt'>, Record<string, { name: string }>> = {
  en: {
    'SYS-CTRL': { name: 'Control Loops & Safety Interlocks' },
    'SYS-SCADA': { name: 'Operational Supervision & Alarms (SCADA)' },
    'SYS-HIST': { name: 'Process Historization & Mass Balance' },
    'SYS-SEC': { name: 'IDMZ Perimeter, NTP & SIEM Telemetry' },
    'SYS-ENG': { name: 'Engineering, Diagnostics & Version Control' },
  },
  es: {
    'SYS-CTRL': { name: 'Lazos de Control y Enclavamientos' },
    'SYS-SCADA': { name: 'Supervisión Operativa y Alarmas (SCADA)' },
    'SYS-HIST': { name: 'Historiación de Proceso y Balance de Masa' },
    'SYS-SEC': { name: 'Perímetro IDMZ, NTP y Telemetría SIEM' },
    'SYS-ENG': { name: 'Ingeniería, Diagnóstico y Versionamiento' },
  },
};

const EDGE_DESC_MAP: Record<Exclude<Locale, 'pt'>, string[]> = {
  en: [
    'Uninterruptible electrical power feed to main PLC rack.',
    'Redundant power supply for industrial optical backbone.',
    'Electrical backup power for local pumping operator panel.',
    'Exchange of command tags, setpoints, and local interlocks.',
    'Cyclic scan of process variables, alarms, and remote commands.',
    'Time-series telemetry collection for traceability and quality.',
    'Deterministic industrial ring communication with controllers.',
    'Supervisory traffic between PLC room and OT Data Center.',
    'Operator console connectivity to SCADA supervisory servers.',
    'Logic maintenance and engineering diagnostics channel.',
    'Controlled industrial data replication from IDMZ to corporate layer.',
    'Supervised remote access filtering, NTP sync, and SIEM forwarding.',
    'Controlled access to patch repositories and PAM vault.',
    'Synoptic rendering, trends, and operator alarm acknowledgment.',
    'Operational events feed and consolidated process history.',
    'Logic download, commissioning, and version control check-in.',
    'Deployment of operator screens and local access profiles.',
    'Backup extraction and loop migration from legacy controller.',
    'Telemetry from auxiliary dosing unit undergoing migration.',
  ],
  es: [
    'Alimentación eléctrica ininterrumpida del rack principal del PLC.',
    'Alimentación redundante del backbone óptico industrial.',
    'Respaldo eléctrico del panel local de bombeo.',
    'Intercambio de tags de comando, consignas y enclavamientos locales.',
    'Lectura cíclica de variables de proceso, alarmas y comandos remotos.',
    'Recolección de series temporales para trazabilidad y calidad.',
    'Comunicación determinística del anillo industrial con controladores.',
    'Tráfico de supervisión entre sala de PLCs y Data Center OT.',
    'Conectividad de consolas de operación con servidores SCADA.',
    'Canal de mantenimiento lógico y diagnóstico de ingeniería.',
    'Replicación controlada de datos industriales desde IDMZ hacia capa corporativa.',
    'Filtrado de acceso remoto supervisado, NTP y envío de logs SIEM.',
    'Acceso controlado a repositorios de parches y bóveda PAM.',
    'Visualización de sinópticos, tendencias y reconocimiento de alarmas.',
    'Alimentación de eventos operativos e historial consolidado.',
    'Descarga de lógica, comisionamiento y check-in en versionamiento.',
    'Publicación de pantallas operativas y perfiles locales.',
    'Extracción de backup y migración de lazos del controlador legado.',
    'Telemetría de la unidad auxiliar de dosificación en migración.',
  ],
};

const SYS_MAPPING_DETAIL: Record<Exclude<Locale, 'pt'>, string[]> = {
  en: [
    'Real-time execution of primary process control loops',
    'Local field operator interface',
    'Auxiliary line safety interlocking',
    'Central synoptics and alarm management server',
    'Operator command and monitoring console',
    'Continuous tag recording and industrial KPIs',
    'IT/OT isolation, NTP sync, and SIEM log forwarding',
    'VLAN segmentation and OT network port mirroring',
    'Engineering environment and source-code versioning',
    'Electrical autonomy for control cabinets',
  ],
  es: [
    'Ejecución en tiempo real de los lazos primarios de control',
    'Interfaz local de operación en campo',
    'Enclavamiento de la línea auxiliar',
    'Servidor central de sinópticos y alarmas',
    'Estación de comando de los operadores',
    'Registro continuo de tags y KPIs industriales',
    'Aislamiento TI/OT, NTP y envío de logs SIEM',
    'Segmentación VLAN y espejo de red OT',
    'Entorno de ingeniería y control de versiones de código',
    'Autonomía eléctrica para gabinetes de control',
  ],
};

export function getLocalizedSimulation(
  sourceTag: string,
  actionType: ChangeActionType,
  locale: Locale
): ImpactSimulationResult {
  const base = simulateChangeImpact(sourceTag, actionType);
  if (locale === 'pt') return base;

  const action = {
    ...base.action,
    ...ACTION_TEXT[locale][base.action.id],
  };

  const edgeReasonByPair = new Map<string, string>();
  ASSET_DEPENDENCIES.forEach((edge, idx) => {
    edgeReasonByPair.set(`${edge.fromTag}->${edge.toTag}`, EDGE_DESC_MAP[locale][idx] ?? edge.description);
  });

  const sysDetailByPair = new Map<string, string>();
  ASSET_SYSTEM_MAPPINGS.forEach((m, idx) => {
    sysDetailByPair.set(`${m.assetTag}->${m.systemId}`, SYS_MAPPING_DETAIL[locale][idx] ?? m.impactDetail);
  });

  const impactedAssets = base.impactedAssets.map((node) => ({
    ...node,
    reason: edgeReasonByPair.get(`${node.parentTag}->${node.tag}`) ?? node.reason,
  }));

  const impactedPlants = base.impactedPlants.map((plant) => ({
    ...plant,
    ...(PLANT_TEXT[locale][plant.id] ?? {}),
  }));

  const impactedSystems = base.impactedSystems.map((sys) => ({
    ...sys,
    ...(SYSTEM_TEXT[locale][sys.id] ?? {}),
    impactDetail: sysDetailByPair.get(`${sys.triggeredBy}->${sys.id}`) ?? sys.impactDetail,
  }));

  const hasTotalStop = base.impactedPlants.some((p) => p.impactRole === 'Parada Total');

  let changeClassification: string;
  let priorityWindow: string;
  let mandatoryChecklists: string[];

  if (locale === 'en') {
    changeClassification =
      action.id === 'falha'
        ? 'Critical P1 Incident + Emergency Change (RFC ≤ 5 business days)'
        : base.cabRequired
        ? 'Normal Change — High Risk (Mandatory OT-CAB Approval)'
        : 'Normal Change — Medium Risk (Automation Supervisor Approval)';

    priorityWindow =
      action.id === 'falha'
        ? 'P1 — Immediate Action / Activate DRP if RTO is exceeded'
        : hasTotalStop
        ? 'P6 — Mandatory Planned Outage Window'
        : 'P2 / P3 — Controlled Weekly Maintenance Schedule';

    mandatoryChecklists = [
      'Off-line test bench / lab or stand-by validation plan (IAGS-03 / IAGS-14).',
      'Verified backup and validated Rollback recovery plan prior to execution (IAGS-03 / IAGS-11).',
      'Advance communication to Control Rooms and impacted operational areas.',
    ];
    if (action.id === 'logica') {
      mandatoryChecklists.push(
        'Exclusive source-code check-out (1 user at a time) and RFC reference in version control (IAGS-08 / IAGS-03).'
      );
    }
    if (action.id === 'energia') {
      mandatoryChecklists.push(
        'Mandatory JSA, Permit to Work (PTW), and electrical safety credential for physical panel work (IAGS-07 / IAGS-12).'
      );
    }
    if (action.id === 'patch' || action.id === 'rede') {
      mandatoryChecklists.push(
        'Validate SIEM/NTP log continuity and intensive post-deployment monitoring (IAGS-15).'
      );
    }
    if (action.id === 'falha') {
      mandatoryChecklists.push(
        'Evaluate safe manual operation and compensating controls approved by Crisis Committee + Industrial IS (IAGS-11).'
      );
    }
  } else {
    changeClassification =
      action.id === 'falha'
        ? 'Incidente Crítico P1 + Cambio de Emergencia (RDM ≤ 5 días hábiles)'
        : base.cabRequired
        ? 'Cambio Normal — Riesgo Alto (Aprobación Obligatoria CAB-Automatización)'
        : 'Cambio Normal — Riesgo Medio (Aprobación Supervisor de Automatización)';

    priorityWindow =
      action.id === 'falha'
        ? 'P1 — Acción Inmediata / Activar DRP si supera el RTO'
        : hasTotalStop
        ? 'P6 — Ventana de Parada Programada Obligatoria'
        : 'P2 / P3 — Programación Semanal Controlada';

    mandatoryChecklists = [
      'Plan de Pruebas en laboratorio off-line o activo stand-by (IAGS-03 / IAGS-14).',
      'Respaldo íntegro y Plan de Recuperación (Rollback) validado antes de intervenir (IAGS-03 / IAGS-11).',
      'Comunicación previa a Salas de Control y áreas operativas impactadas.',
    ];
    if (action.id === 'logica') {
      mandatoryChecklists.push(
        'Check-out exclusivo de código fuente (1 usuario por vez) y registro de RDM en versionamiento (IAGS-08 / IAGS-03).'
      );
    }
    if (action.id === 'energia') {
      mandatoryChecklists.push(
        'Emisión obligatoria de APR, PTP y habilitación eléctrica para intervención física en subestación/tablero (IAGS-07 / IAGS-12).'
      );
    }
    if (action.id === 'patch' || action.id === 'rede') {
      mandatoryChecklists.push(
        'Validación de continuidad de colecta SIEM/NTP y monitoreo intensivo post-despliegue (IAGS-15).'
      );
    }
    if (action.id === 'falha') {
      mandatoryChecklists.push(
        'Evaluar modo manual seguro y control compensatorio aprobado por Comité de Crisis + SI Industrial (IAGS-11).'
      );
    }
  }

  // keep base constants referenced cleanly
  void INDUSTRIAL_PLANTS;
  void INDUSTRIAL_SYSTEMS;
  void translateEnum;

  return {
    ...base,
    action,
    impactedAssets,
    impactedPlants,
    impactedSystems,
    changeClassification,
    priorityWindow,
    mandatoryChecklists,
  };
}
