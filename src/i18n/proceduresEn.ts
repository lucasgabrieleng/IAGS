import { IagsProcedure } from '../data/proceduresTypes';

export type ProcedureLocalizedPayload = Pick<
  IagsProcedure,
  | 'title'
  | 'shortTitle'
  | 'cadence'
  | 'ownerRole'
  | 'summary'
  | 'keyMetrics'
  | 'references'
  | 'sections'
  | 'controlledRecords'
>;

export const PROCEDURES_EN: Record<string, ProcedureLocalizedPayload> = {
  'IAGS-01': {
    title: 'Automation Service Governance Framework',
    shortTitle: 'Service Governance',
    cadence: 'Quarterly Committee',
    ownerRole: 'IAGS Governance Leader',
    summary:
      'Establishes the structural architecture of OT Cybersecurity and Automation Service Governance, defining the Quarterly IAGS Committee, SPOC Service Desk, Automation Team, role segregation, document hierarchy, and continual improvement.',
    keyMetrics: [
      'Quarterly IAGS Governance Committee meetings with formal minutes retained for 3 years + historical archive.',
      'Structured governance across 15 integrated procedures aligned with ISA/IEC 62443-2-1, ISO/IEC 27001, and ITIL.',
      'Clear separation between Strategic Oversight (Committee), Intake/Triage (Service Desk), and Technical Execution.',
      'Periodic effectiveness reviews, audit tracking, and formal residual risk acceptance workflow.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Industrial Automation and Control Systems Security Management System',
      'ISO/IEC 27001 & 27002 — Information Security Management Systems',
      'ITIL 4 — IT & OT Service Management Governance Practices',
    ],
    sections: [
      {
        number: '1',
        title: 'Purpose and Scope',
        paragraphs: [
          'This procedure establishes the governance model, organizational functions, responsibilities, and management rituals required to ensure the availability, integrity, safety, and cybersecurity of industrial automation services and OT assets.',
          'It applies to all industrial plants, control rooms, automation data centers, engineering teams, partner areas (IT Infrastructure, Industrial IS, Electrical Maintenance, Instrumentation, Physical Security), and third-party vendors.',
        ],
      },
      {
        number: '2',
        title: 'Core Governance Functions',
        subsections: [
          {
            code: '2.1',
            title: 'IAGS Governance Committee',
            bullets: [
              'Convenes quarterly with oversight, decision-making, and continuous improvement responsibilities.',
              'Reviews compliance KPIs across all 15 procedures, audit deviations, vulnerability SLAs, and DRP drill readiness.',
              'Approves structural updates to policies, standards, and the Automation Service Catalog.',
            ],
          },
          {
            code: '2.2',
            title: 'OT Service Desk (SPOC)',
            bullets: [
              'Acts as the single point of contact (SPOC) for logging, triaging, and routing incidents, requests, and changes via ITSM.',
              'Monitors tiered SLA compliance across L1 through L4 support groups.',
            ],
          },
          {
            code: '2.3',
            title: 'Automation Engineering & Technical Team',
            bullets: [
              'Sustains OT assets (PLCs, HMIs, SCADA, Industrial Networks, Workstations, and COTS packages) under controlled change rules.',
              'Executes hardening, patching, technical homologation, version control, and continuity testing.',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Document Hierarchy and Continual Improvement',
        bullets: [
          'Level 1: Corporate OT Cybersecurity & Governance Policy.',
          'Level 2: 15 Normative IAGS Procedures (IAGS-01 through IAGS-15).',
          'Level 3: Technical Standards, Hardening Baselines, Service Sheets, and Work Instructions.',
          'Level 4: Controlled Records (Minutes, RFCs, Audits, Homologation Forms, Access Reviews).',
        ],
        note: 'All normative documents undergo scheduled periodic review or event-driven revision following major incidents or audits.',
      },
    ],
    controlledRecords: [
      {
        name: 'IAGS Governance Committee Minutes',
        identification: 'Sequential Code (YYYY/NN)',
        storage: 'Corporate Governance Repository',
        accessControl: 'Committee Members & Audit',
        retention: '3 years active + permanent archive',
        disposition: 'Historical Archive',
      },
    ],
  },

  'IAGS-02': {
    title: 'Automation Asset Lifecycle Management',
    shortTitle: 'Asset Management',
    cadence: 'Semiannual Audit / Biennial Full Inventory',
    ownerRole: 'OT Asset Manager',
    summary:
      'Governs the end-to-end lifecycle of all 6 critical OT asset classes (PLCs/RTUs, Automation Workstations, HMIs, Network Infrastructure, Industrial UPS, and COTS Software), enforcing 6 mandatory security gates and ERP/EAM ↔ CMDB ↔ AMP reconciliation.',
    keyMetrics: [
      '6 Critical OT Asset Classes tracked across 5 lifecycle phases: Demand, Procurement, Implementation, Operation, and Decommissioning.',
      '6 Mandatory Security Gates prior to production go-live (Homologation, Default Password Removal, Hardening, Scan, CMDB Sync, SIEM/NTP).',
      'Semiannual sampling audits (≥ 25%) and Biennial 100% physical/logical inventory reconciliation.',
      'Mandatory Action Plan via RFC (IAGS-03) for deviations; unlicensed software or unauthorized assets escalate immediately to Industrial IS.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Asset Inventory & Lifecycle Security Controls',
      'ISO/IEC 27001 Annex A.5.9 — Inventory of Information and Associated Assets',
      'ITIL 4 — IT/OT Asset Management & Configuration Management (CMDB)',
    ],
    sections: [
      {
        number: '1',
        title: 'Scope of Critical OT Asset Classes',
        paragraphs: [
          'Every industrial automation hardware or software asset impacting operational continuity or cybersecurity must be registered and synchronized across ERP/EAM, the ITSM CMDB, and the Asset Management Program (AMP).',
        ],
        table: {
          caption: 'The 6 Critical OT Asset Classes Governed by IAGS-02',
          headers: ['Class', 'Typical Subclasses', 'Nature'],
          rows: [
            ['PLC / RTUs', 'Process PLCs, Safety PLCs, Remote I/O', 'Hardware'],
            ['Automation Workstations', 'Engineering (EWS) & Operator (OWS) Consoles', 'Hardware'],
            ['HMI', 'Local Industrial Operator Panels', 'Hardware'],
            ['Network Infrastructure', 'Industrial Switches, Firewalls, Routers, Converters', 'Hardware'],
            ['Industrial UPS', 'Double-Conversion Industrial Uninterruptible Power', 'Hardware'],
            ['COTS Software Package', 'SCADA, Historian, MES, Version Control Servers', 'Software'],
          ],
        },
      },
      {
        number: '2',
        title: 'Lifecycle Phases & Security Gates',
        bullets: [
          'Demand & Procurement: Cybersecurity risk evaluation, contractual security clauses, and tripartite homologation (IAGS-14).',
          'Implementation: Mandatory replacement of all factory/integrator default passwords, baseline hardening, vulnerability scan, ERP/CMDB registration, and SIEM/NTP onboarding.',
          'Operation: Continuous monitoring, controlled changes via RFC, and periodic audits.',
          'Decommissioning: Secure memory/media sanitization, physical disposal certificate (IAGS-13), and final CMDB/ERP retirement.',
        ],
      },
      {
        number: '3',
        title: 'Audits, Deviations & Escalation',
        bullets: [
          'Semiannual sampling audit covering at least 25% of critical assets.',
          'Biennial 100% general inventory audit reconciling physical tags against ERP/EAM and CMDB.',
          'Unlicensed software, rogue devices, or unauthorized tampering trigger immediate Industrial IS incident escalation (IAGS-04).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'OT Asset Inventory & AMP Reconciliation',
        identification: 'ERP/EAM ID ↔ CMDB CI Tag',
        storage: 'ITSM CMDB & ERP/EAM',
        accessControl: 'Asset Manager, Automation & Audit',
        retention: 'Asset Lifecycle + 5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-03': {
    title: 'Automation Services & Assets Change Management',
    shortTitle: 'Change Management',
    cadence: 'Weekly CAB / Emergency ≤ 5 Business Days',
    ownerRole: 'OT Change Manager',
    summary:
      'Controls all additions, modifications, or removals affecting OT assets, control logic, firmware, or automation services through formal RFCs, risk assessment, OT-CAB approval, rollback planning, and post-change CMDB updates.',
    keyMetrics: [
      'Three change categories: Standard (pre-approved catalog model), Normal (CAB or Supervisor), and Emergency (immediate + RFC ≤ 5 business days).',
      'Mandatory Test Plan, Rollback Plan, Backup verification, and Operational Communication before execution.',
      'High-Risk or plant-outage changes require formal OT-CAB approval and planned maintenance window (P6).',
      'Mandatory post-implementation review and synchronization with CMDB (IAGS-02) and Version Control.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Configuration and Change Management',
      'ISO/IEC 27001 Annex A.8.32 — Change Management',
      'ITIL 4 — Change Enablement',
    ],
    sections: [
      {
        number: '1',
        title: 'Change Classification',
        table: {
          caption: 'Change Types & Approval Authorities',
          headers: ['Type', 'Criteria', 'Approver'],
          rows: [
            ['Standard', 'Low-risk, repeatable, pre-documented in Service Catalog', 'Pre-approved (Catalog Model)'],
            ['Normal (Low/Med)', 'Controlled changes without total plant stop', 'Automation Supervisor'],
            ['Normal (High)', 'Critical infrastructure, security perimeter, or plant stop', 'OT-CAB (Weekly Board)'],
            ['Emergency', 'Restore P1 outage or contain active cyber incident', 'Supervisor (RFC ≤ 5 business days)'],
          ],
        },
      },
      {
        number: '2',
        title: 'Mandatory Planning & Rollback Controls',
        bullets: [
          'Technical Test Plan validated on off-line bench or stand-by asset before touching live production.',
          'Verified, restorable backup and step-by-step Rollback Plan with clear abort criteria.',
          'Advance communication to Control Rooms, Plant Operations, and Maintenance supervision.',
          'Exclusive code check-in and mandatory CMDB attribute update prior to RFC closure.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Request for Change (RFC) & CAB Minutes',
        identification: 'RFC-YYYY-NNNN',
        storage: 'ITSM Change Module',
        accessControl: 'Automation, CAB & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-04': {
    title: 'Automation Services & Assets Incident Management',
    shortTitle: 'Incident Management',
    cadence: '24x7 Operations / Auto-Close 72h',
    ownerRole: 'OT Incident Manager',
    summary:
      'Restores normal automation operations as quickly as possible with minimal impact on industrial production, integrating ITSM incident tickets, ERP/EAM field Work Orders (WO), security incident escalation, and DRP crisis triggers.',
    keyMetrics: [
      'Five-tier priority matrix (P1 Critical to P5 Low) driven by plant safety, production impact, and urgency.',
      'Bi-directional traceability between Field Maintenance Work Orders (WO in ERP/EAM) and ITSM Incident records.',
      'Immediate escalation to Industrial IS / SOC for suspected cybersecurity incidents and to DRP (IAGS-11) if downtime exceeds RTO.',
      'Automatic ticket closure 72 hours after validated resolution if no requester objection is raised; mandatory RCA for P1/P2.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Incident Response and Recovery',
      'ISO/IEC 27001 Annex A.5.24–A.5.28 — Information Security Incident Management',
      'ITIL 4 — Incident Management',
    ],
    sections: [
      {
        number: '1',
        title: 'Intake, Prioritization & Field Integration',
        bullets: [
          'All incidents are logged via the Service Desk SPOC (IAGS-06), SIEM/NOC auto-alerts (IAGS-15), or linked Field Work Orders.',
          'Priority levels P1–P5 govern response targets, technical escalation (L1 → L4), and management notifications.',
          'Field Instrumentation performs initial physical inspection under ERP/EAM Work Orders linked to the ITSM ticket.',
        ],
      },
      {
        number: '2',
        title: 'Workarounds, Cyber Escalation & Closure',
        bullets: [
          'Temporary workarounds restore safe plant operation; permanent remediation requires a formal RFC (IAGS-03).',
          'Any suspected malware, unauthorized access, or configuration tampering escalates immediately to Industrial IS / SOC.',
          'If recovery time is projected to exceed plant RTO, Incident Manager invokes Crisis/DRP procedures (IAGS-11).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Incident Tickets & Root Cause Analysis (RCA)',
        identification: 'INC-YYYY-NNNN / RCA-YYYY-NNN',
        storage: 'ITSM Incident Module',
        accessControl: 'Service Desk, Automation, SOC & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-05': {
    title: 'Automation Service Catalog Management',
    shortTitle: 'Service Catalog',
    cadence: 'Annual Consistency Review',
    ownerRole: 'OT Service Catalog Manager',
    summary:
      'Maintains a single, accurate, business-facing portfolio of all automation services, defining SLAs, approval rules, pre-approved standard change models, service owners, and annual catalog consistency reviews.',
    keyMetrics: [
      'Standardized Service Specification Sheet mandatory for publishing, modifying, or retiring any automation service.',
      'Clear linkage between catalog services, support queues (IAGS-06), request SLAs (IAGS-07), and standard change models (IAGS-03).',
      'Annual Consistency Review validating active owners, technical feasibility, and retired service cleanup.',
      'Retiring underlying service infrastructure requires an approved RFC (IAGS-03).',
    ],
    references: [
      'ITIL 4 — Service Catalogue Management',
      'ISO/IEC 20000-1 — Service Portfolio & Catalogue Controls',
    ],
    sections: [
      {
        number: '1',
        title: 'Catalog Taxonomy & Service Specification Sheets',
        bullets: [
          'Organizes services by operational domain: Control & Field, Supervision & Historian, OT Network & Security, and Support/Access.',
          'Each Service Specification Sheet defines scope, eligible requesters, approval chain, fulfillment SLA, and support tier.',
        ],
      },
      {
        number: '2',
        title: 'Annual Consistency Review & Lifecycle',
        bullets: [
          'Service Catalog Manager and IAGS Governance Leader conduct an annual review verifying relevance, SLAs, and owners.',
          'New software homologated under IAGS-14 must update or publish its corresponding service sheet prior to go-live.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Automation Service Specification Sheets & Annual Review',
        identification: 'CAT-OT-NNN / REV-YYYY',
        storage: 'ITSM Service Portal & Governance Repository',
        accessControl: 'Catalog Manager, IAGS Leader & Audit',
        retention: '3 years after service retirement',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-06': {
    title: 'Automation Service Desk Operations',
    shortTitle: 'Service Desk',
    cadence: 'Continuous Triage / 4 Tiers',
    ownerRole: 'OT Service Desk Leader',
    summary:
      'Operates the Single Point of Contact (SPOC) for industrial automation, executing demand classification, first-level troubleshooting checklists, and structured routing across L1–L4 support tiers.',
    keyMetrics: [
      'Four-tier support model: L1 (Service Desk / OT Planner), L2 (Automation Technicians), L3 (Specialists / Architects), L4 (Vendors).',
      'Strict triage rules routing every ticket to Incident (IAGS-04), Service Request (IAGS-07), or Change (IAGS-03).',
      'Direct coordination with Instrumentation (field WO), NOC (availability), and SOC / Industrial IS (security).',
      'Zero informal execution outside registered ITSM tickets.',
    ],
    references: [
      'ITIL 4 — Service Desk Practice',
      'ISA/IEC 62443-2-1 — Operational Support Coordination',
    ],
    sections: [
      {
        number: '1',
        title: 'Four-Tier Support Architecture',
        table: {
          caption: 'OT Support Tiers & Scope',
          headers: ['Tier', 'Team', 'Primary Scope'],
          rows: [
            ['L1', 'OT Service Desk & Automation Planner', 'Logging, triage, standard checklists, pre-approved requests, routing'],
            ['L2', 'Automation Technicians & Field Service', 'Field diagnostics, workstation recovery, scheduled operational support'],
            ['L3', 'Automation Specialists & OT Architects', 'Complex PLC/SCADA engineering, network core, DRP, root cause analysis'],
            ['L4', 'OEMs & External Integrators', 'Proprietary firmware defects, vendor patches, warranty hardware support'],
          ],
        },
      },
      {
        number: '2',
        title: 'Triage & Routing Discipline',
        bullets: [
          'Unplanned service outage or degradation → Incident Management (IAGS-04).',
          'Standard cataloged demand (access, reports, operational support) → Service Request (IAGS-07).',
          'Modification of asset configuration, logic, or infrastructure → Change Management (IAGS-03).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'ITSM Triage Logs & Tiered SLA Reports',
        identification: 'SD-KPI-YYYY-MM',
        storage: 'ITSM Analytics Platform',
        accessControl: 'Service Desk Leader, Supervisor & Committee',
        retention: '3 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-07': {
    title: 'Automation Service Request Management',
    shortTitle: 'Service Requests',
    cadence: 'SLAs P1 (1d) to P7 (7d / Outage)',
    ownerRole: 'OT Service Request Manager',
    summary:
      'Standardizes fulfillment of routine, cataloged operational requests (logical/physical access, operational data, technical support), enforcing dual approval when required, field HSE permits (JSA/PTW), and P1–P7 fulfillment SLAs.',
    keyMetrics: [
      'Seven priority tiers (P1: 1 business day through P6: Planned Outage and P7: 7 business days).',
      'Mandatory technical (Service Owner) and managerial (Automation Supervisor) approval for non-pre-approved requests.',
      'Mandatory verification of HSE permits (JSA / Permit to Work) before any physical plant intervention.',
      'Primary ITSM intake gateway for Logical Access (IAGS-08) and Physical Access (IAGS-12).',
    ],
    references: [
      'ITIL 4 — Service Request Management',
      'Corporate HSE & Permit-to-Work (PTW) Standards',
    ],
    sections: [
      {
        number: '1',
        title: 'Priority Tiers & Fulfillment SLAs',
        table: {
          caption: 'Service Request Priority Matrix (P1–P7)',
          headers: ['Priority', 'Typical Case', 'Target SLA'],
          rows: [
            ['P1 — Immediate', 'Operational safety or critical access revocation', '1 business day'],
            ['P2 — Urgent', 'Contractor offboarding or high-impact operational demand', '2 business days'],
            ['P3 — High', 'Standard engineering support or report extraction', '3 business days'],
            ['P4 / P5 — Normal', 'Routine non-urgent cataloged requests', '4–5 business days'],
            ['P6 — Outage', 'Demands requiring scheduled plant turnaround', 'Next planned outage'],
            ['P7 — Scheduled', 'Planned low-urgency administrative requests', '7 business days'],
          ],
        },
      },
      {
        number: '2',
        title: 'Execution Safety & Closure',
        bullets: [
          'Physical interventions require validated JSA (Job Safety Analysis) and Permit to Work (PTW) prior to field dispatch.',
          'Requester confirmation closes the ticket with auditable evidence stored in ITSM.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'ITSM Service Request Records (REQ)',
        identification: 'REQ-YYYY-NNNN',
        storage: 'ITSM Request Module',
        accessControl: 'Service Desk, Requesters & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-08': {
    title: 'OT Logical Access Management (IAM)',
    shortTitle: 'Logical Access (IAM)',
    cadence: 'Annual Access Review + Offboarding',
    ownerRole: 'OT Logical Access Owner',
    summary:
      'Enforces identification, authentication, and authorization (AAA), least privilege, strict segregation of duties, exclusive source-code check-out, immediate offboarding revocation, and annual access recertification across AD and non-AD OT assets.',
    keyMetrics: [
      'Strict least privilege and individual named accounts (shared accounts prohibited except audited break-glass/PAM).',
      'Segregation of duties: Requester Manager approves business need; Asset Manager authorizes access; Access Team provisions.',
      'Exclusive PLC/SCADA source-code check-out (1 engineer at a time) linked to an active RFC.',
      'Annual access recertification covering both Active Directory (AD) and standalone OT assets, synchronized with HR offboarding.',
    ],
    references: [
      'ISA/IEC 62443-2-1 & 3-3 — Identification, Authentication & Use Control',
      'ISO/IEC 27001 Annex A.5.15–A.5.18 — Access Control & Identity Lifecycle',
    ],
    sections: [
      {
        number: '1',
        title: 'Core IAM Principles & Segregation of Duties',
        bullets: [
          'Every user must hold a unique, nominal, non-transferable credential mapped to their functional role.',
          'No single individual may simultaneously request, approve, and provision their own OT logical access.',
          'AD-integrated assets are provisioned by IT Access Control; standalone/local OT assets are provisioned by the Automation Access Team.',
        ],
      },
      {
        number: '2',
        title: 'Lifecycle, Contractors & Source-Code Control',
        bullets: [
          'Contractor access is strictly time-bound to contract end date and automatically revoked upon demobilization.',
          'HR termination or role transfer triggers synchronized revocation across AD, local OT accounts, PAM (IAGS-09), and physical badges (IAGS-12).',
          'Version control enforces single-user check-out of PLC/HMI/SCADA logic with mandatory check-in after testing.',
        ],
      },
      {
        number: '3',
        title: 'Annual Access Recertification',
        paragraphs: [
          'At least once per year, Asset Managers review and re-certify all active accounts and privilege profiles. Unjustified or stale accounts are immediately disabled and logged.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Annual OT Access Recertification Report',
        identification: 'IAM-REV-YYYY',
        storage: 'ITSM & Industrial IS Repository',
        accessControl: 'Access Owner, Industrial IS & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-09': {
    title: 'OT Privileged Account Management (PAM)',
    shortTitle: 'Privileged Accounts (PAM)',
    cadence: 'Semiannual Review + PAM Vault',
    ownerRole: 'OT Privileged Access Owner',
    summary:
      'Secures administrative, local emergency, service, and vendor support accounts on OT assets through centralized PAM vaulting, password rotation, session recording, 24x7 SIEM audit trails, and semiannual critical review.',
    keyMetrics: [
      'Triple-layer approval for privileged elevation: Requester Manager + Technical Assessment + Asset Manager.',
      'All shared/administrative/break-glass credentials vaulted in PAM with automated or immediate post-use password rotation.',
      '100% of privileged sessions audited and streamed to SIEM (IAGS-15) for real-time anomaly detection.',
      'Semiannual critical review of all privileged, service, and vendor accounts.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Privileged Access Management',
      'ISO/IEC 27001 Annex A.8.2 — Privileged Access Rights',
    ],
    sections: [
      {
        number: '1',
        title: 'Control Matrix by Privileged Account Type',
        table: {
          caption: 'Privileged Account Governance Controls',
          headers: ['Account Profile', 'Vault & Rotation', 'Monitoring'],
          rows: [
            ['Named Admin', 'Personal elevated ID separate from daily account', 'Full SIEM audit trail'],
            ['Local Break-Glass / Root', 'Stored in PAM Vault; immediate rotation after use', 'High-priority SIEM alert on checkout'],
            ['Service / System Account', 'Interactive login disabled; documented owner', 'Anomalous logon detection in SIEM'],
            ['Temporary Vendor Support', 'Time-boxed window; supervised session; immediate rotation', 'Session recording + SOC oversight'],
          ],
        },
      },
      {
        number: '2',
        title: 'Usage Rules, Rotation & Semiannual Review',
        bullets: [
          'Privileged credentials must never be hardcoded in scripts, stored in plaintext, or shared outside the PAM vault.',
          'Any vendor departure or suspected credential exposure triggers immediate password rotation across affected assets.',
          'Semiannual PAM Critical Review validates business justification for every privileged entitlement.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Privileged Access Register & Semiannual PAM Review',
        identification: 'PAM-REV-YYYY-S1/S2',
        storage: 'PAM Governance Vault & IS Repository',
        accessControl: 'PAM Owner, Industrial IS & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-10': {
    title: 'OT Vulnerability & Technical Compliance Management',
    shortTitle: 'Vulnerabilities & Compliance',
    cadence: 'Monthly TVM / Annual TCM / SLAs 60–180d',
    ownerRole: 'OT Cybersecurity Coordinator',
    summary:
      'Establishes continuous Technical Vulnerability Management (TVM), annual Technical Compliance Management (TCM), strict plant-safe pentesting rules (excluding PLCs and UPS), CVSS remediation SLAs (60/90/120/180d), and safe 4-stage OT patching.',
    keyMetrics: [
      'Monthly TVM scans and Annual TCM baseline compliance verification across OT infrastructure.',
      'CVSS Remediation SLAs: Critical ≤ 60 days, High ≤ 90 days, Medium ≤ 120 days, Low ≤ 180 days.',
      'Mandatory 4-Stage Safe Patching Sequence: Vendor Approval → Off-line Test → Stand-by → Production (RFC).',
      'PLCs/RTUs and Industrial UPS are strictly excluded from active internal/external penetration tests (NDA required for authorized pentests).',
    ],
    references: [
      'ISA/IEC 62443-2-3 — Patch Management in the IACS Environment',
      'ISO/IEC 27001 Annex A.8.8 — Management of Technical Vulnerabilities',
      'NIST SP 800-82 — Guide to Operational Technology (OT) Security',
    ],
    sections: [
      {
        number: '1',
        title: 'Three Technical Pillars: TVM, TCM & Penetration Testing',
        bullets: [
          'TVM (Monthly): Passive/safe credentialed vulnerability discovery prioritized by CVSS and asset criticality (A/B/C).',
          'TCM (Annual): Technical audit verifying OS, SCADA, AD OT, and Firewall configurations against approved hardening baselines.',
          'Penetration Testing (Internal/External): Conducted solely under formal scope approval and NDA, explicitly excluding PLCs/RTUs and Industrial UPS to prevent plant trips.',
        ],
      },
      {
        number: '2',
        title: 'Remediation SLAs & Safe OT Patching Sequence',
        table: {
          caption: 'CVSS Remediation SLAs & Safe Deployment Stages',
          headers: ['CVSS Severity', 'Target SLA', 'Mandatory Safe Patching Sequence'],
          rows: [
            ['Critical (9.0–10.0)', '≤ 60 days', '1. Vendor Approval → 2. Off-line Lab → 3. Stand-by → 4. Prod (RFC)'],
            ['High (7.0–8.9)', '≤ 90 days', '1. Vendor Approval → 2. Off-line Lab → 3. Stand-by → 4. Prod (RFC)'],
            ['Medium (4.0–6.9)', '≤ 120 days', 'Planned maintenance batch via Normal RFC'],
            ['Low (0.1–3.9)', '≤ 180 days', 'Bundled into scheduled upgrade cycle'],
          ],
        },
        note: 'Where technical constraints prevent patching within SLA, compensating controls and formal Residual Risk Acceptance by Automation Management & Corporate Risk are mandatory.',
      },
    ],
    controlledRecords: [
      {
        name: 'Monthly TVM, Annual TCM & Confidential Pentest Reports',
        identification: 'TVM-YYYY-MM / TCM-YYYY',
        storage: 'Restricted Industrial IS Repository',
        accessControl: 'Cybersecurity Coordinator, Management & Audit',
        retention: '5 years',
        disposition: 'Secure Deletion / Archive',
      },
    ],
  },

  'IAGS-11': {
    title: 'Critical Automation Infrastructure Continuity Management',
    shortTitle: 'OT Continuity (DRP)',
    cadence: 'Annual Review / Biennial Failover Drills',
    ownerRole: 'OT Infrastructure Continuity Coordinator',
    summary:
      'Guarantees operational resilience and controlled recovery of 5 priority OT infrastructure classes (PLCs, HMIs, SCADA, Industrial Switches, Firewalls) through BIA (RTO/RPO), redundant architectures, contingency kits, safe manual operation, and biennial failover drills.',
    keyMetrics: [
      'Covers 5 priority classes with documented BIA, RTO (1h–4h), and RPO (5m–60m) targets.',
      'Biennial practical failover/recovery drills aligned to planned plant outages + annual plan review.',
      'Mandatory contingency kits (pre-configured laptops, cables, verified backups, cold spares) and safe manual operating procedures.',
      'Temporary compensating controls during declared crises require Crisis Committee + Industrial IS sign-off and strict time limits.',
    ],
    references: [
      'ISO 22301 — Business Continuity Management Systems',
      'ISA/IEC 62443-2-1 — Backup, Restore & Continuity Controls',
    ],
    sections: [
      {
        number: '1',
        title: 'Priority Infrastructure & RTO/RPO Targets',
        table: {
          caption: 'Continuity Targets by Critical OT Class',
          headers: ['Asset Class', 'Target RTO', 'Target RPO', 'Resilience Strategy'],
          rows: [
            ['Industrial Firewall', '1 hour', '5 min', 'HA Active-Standby pair + replicated config'],
            ['SCADA System', '2 hours', '5 min', 'Active-Standby cluster + secondary Data Center'],
            ['Industrial Switch', '2 hours', '30 min', 'Redundant optical ring + config backup + cold spare'],
            ['PLC / RTUs', '4 hours', '15 min', 'Redundant CPU + versioned backup + spare modules'],
            ['HMI Panels', '4 hours', '60 min', 'Project image + contingency kit + safe manual mode'],
          ],
        },
      },
      {
        number: '2',
        title: 'Drills, Crisis Activation & Post-Crisis Return',
        bullets: [
          'Practical recovery tests are executed at least every 2 years during scheduled turnarounds and documented in the Contingency Log.',
          'Any incident projected to exceed RTO triggers DRP activation and Crisis Committee mobilization.',
          'Post-crisis normalization requires formal RFC (IAGS-03) and immediate revocation of any temporary emergency waivers.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'DRP/BCP Plans, BIA Matrix & Biennial Drill Log',
        identification: 'DRP-OT-YYYY / TEST-YYYY',
        storage: 'Primary & Offline Redundant Repositories',
        accessControl: 'Continuity Coordinator, L3 Specialists & Crisis Committee',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-12': {
    title: 'OT Physical Security Management',
    shortTitle: 'Physical Security',
    cadence: 'Annual Review + Offboarding Sync',
    ownerRole: 'OT Physical Security Manager',
    summary:
      'Protects industrial automation facilities across 7 physical and environmental security domains, classifying perimeters as High, Medium, or Low criticality, enforcing electrical safety credentials, biometric/badge controls, CCTV, and annual authorized-personnel reviews.',
    keyMetrics: [
      '3 Perimeter Criticality Tiers (HIGH: Data Centers, Substations, PLC/Control Rooms; MEDIUM: Area Electrical Rooms & Labs; LOW: General areas).',
      '7 Physical & Environmental Controls: Perimeter barriers, access control, CCTV, fire suppression, HVAC, power redundancy, and escort rules.',
      'Strict synchronization with HR offboarding and Logical Access revocation (IAGS-08).',
      'Annual audit of Authorized Personnel Rosters and mandatory electrical safety credentials for electrical rooms.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Physical and Environmental Security',
      'ISO/IEC 27001 Annex A.7 — Physical Security Controls',
    ],
    sections: [
      {
        number: '1',
        title: 'Perimeter Classification & Access Controls',
        bullets: [
          'HIGH Criticality (Data Centers, Substations, PLC & Control Rooms): Biometrics + Badge + 24x7 CCTV + entry/exit audit log + mandatory escort for visitors/contractors.',
          'MEDIUM Criticality (Area Electrical Rooms, Robotics Enclosures, OT Labs): Controlled badge/key access + electrical safety verification + annual inspection.',
          'Access types categorized as Permanent (staff), Temporary (time-boxed contractors), and One-Off (escorted visitors).',
        ],
      },
      {
        number: '2',
        title: 'Annual Review & Offboarding Synchronization',
        bullets: [
          'Critical Environment Managers review Authorized Personnel Rosters annually with Physical Security.',
          'Employee termination or contractor demobilization revokes physical credentials simultaneously with logical accounts (IAGS-08).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Authorized Personnel Roster & Annual Physical Review',
        identification: 'PHYS-REV-YYYY',
        storage: 'Physical Security & Governance Repository',
        accessControl: 'Physical Security, Area Managers & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-13': {
    title: 'Critical Automation Asset Protection & Maintenance',
    shortTitle: 'Asset Protection & Maint.',
    cadence: 'Annual Sampling Inspection Plan',
    ownerRole: 'OT Asset Protection & Maintenance Owner',
    summary:
      'Defines physical hardware safeguards, cabling segregation, unattended console lockouts, supervised vendor maintenance, controlled off-site asset movement, and certified secure disposal of decommissioned OT hardware.',
    keyMetrics: [
      'Physical cabinet locks, tamper protection, power/data cable segregation, and environmental sensors on critical OT hardware.',
      'Automatic screen locking and disabled unused USB/network ports on unattended workstations.',
      'Mandatory technical supervision for external maintenance vendors and formal exit authorization for off-site repairs.',
      'Certified secure memory wiping/physical destruction prior to hardware disposal or recycling.',
    ],
    references: [
      'ISO/IEC 27001 Annex A.7.8–A.7.14 — Equipment Siting, Cabling, Maintenance & Secure Disposal',
      'ISA/IEC 62443-2-1 — Equipment Protection & Maintenance Controls',
    ],
    sections: [
      {
        number: '1',
        title: 'Siting, Cabling & Unattended Equipment',
        bullets: [
          'Critical assets installed outside High-Criticality perimeters receive reinforced locked enclosures and port guards.',
          'Power and OT communication cables are physically segregated and protected against electromagnetic interference and accidental damage.',
          'Workstations enforce automatic session lockouts and physical/logical blocking of unauthorized removable media.',
        ],
      },
      {
        number: '2',
        title: 'Controlled Maintenance, Asset Exit & Secure Disposal',
        bullets: [
          'All preventive and corrective hardware interventions follow Change Management (IAGS-03) and vendor supervision rules.',
          'Moving OT hardware off-site for vendor repair requires Physical Security exit pass and pre-exit sensitive data backup/wipe.',
          'Decommissioned hardware containing non-volatile memory requires a Secure Disposal Certificate validated by Industrial IS.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Sampling Inspection Plans & Secure Disposal Certificates',
        identification: 'INSP-HW-YYYY / DISP-YYYY-NNN',
        storage: 'Automation & Industrial IS Repository',
        accessControl: 'Asset Protection Owner, Physical Security & Audit',
        retention: '5 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-14': {
    title: 'OT Software Homologation, Installation & Upgrade',
    shortTitle: 'Software Homologation',
    cadence: 'Per Release + Annual License Review',
    ownerRole: 'OT Software Engineering Leader',
    summary:
      'Requires tripartite technical validation (IT Infrastructure + Industrial IS + Automation) in an isolated pilot lab prior to installing or upgrading any OT software or firmware, alongside controlled RFC rollout and annual license audits.',
    keyMetrics: [
      'Mandatory Tripartite Sign-Off: IT Infrastructure (compatibility/resources), Industrial IS (security/hardening), and Automation (functional/plant safety).',
      'Pilot bench testing with documented Installation & Rollback Guides before production deployment.',
      'Zero unauthorized, trial, or unlicensed software allowed in OT environments.',
      'Annual Software License Reconciliation verifying compliance across all SCADA, Historian, and engineering suites.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Software Approval & Secure Deployment',
      'ISO/IEC 27001 Annex A.8.19 & A.8.31 — Software Installation & Separation of Environments',
    ],
    sections: [
      {
        number: '1',
        title: 'Tripartite Homologation Workflow',
        bullets: [
          'Step 1 — Technical Request: Business case, vendor authenticity verification, and architecture review.',
          'Step 2 — Isolated Pilot Lab: Functional testing, vulnerability scanning, hardening validation, and rollback verification.',
          'Step 3 — Tripartite Approval: Signed Homologation Form by IT Infrastructure, Industrial IS, and Automation Engineering.',
          'Step 4 — Controlled Deployment: Production installation via RFC (IAGS-03), Service Catalog update (IAGS-05), and DRP snapshot refresh (IAGS-11).',
        ],
      },
      {
        number: '2',
        title: 'Annual License Compliance Review',
        paragraphs: [
          'Automation Engineering conducts an annual reconciliation comparing installed software packages across the CMDB against active corporate licenses to eliminate compliance and cybersecurity risks.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Software Homologation Form & Annual License Audit',
        identification: 'HOM-SW-YYYY-NNN / LIC-YYYY',
        storage: 'Automation Engineering & ITSM Repository',
        accessControl: 'Software Leader, IT, Industrial IS & Audit',
        retention: 'Software Lifecycle + 3 years',
        disposition: 'Controlled Archive',
      },
    ],
  },

  'IAGS-15': {
    title: 'OT Asset Logs & Security Events Management',
    shortTitle: 'Logs & Events (SIEM)',
    cadence: '24x7 SIEM/NOC + NTP Sync',
    ownerRole: 'OT Monitoring & SOC Leader',
    summary:
      'Governs centralized collection, NTP clock synchronization, immutable append-only retention, and 24x7 SOC/NOC correlation of availability, capacity, and cybersecurity events across all critical OT assets.',
    keyMetrics: [
      'Mandatory NTP time synchronization across all OT servers, network devices, firewalls, and supported controllers.',
      'Centralized append-only SIEM ingestion with tamper protection and minimum legal/audit retention.',
      'Dual 24x7 monitoring: SOC (cybersecurity, PAM abuse, unauthorized changes) and NOC (availability, hardware health, capacity).',
      'Strict log anonymization and approval required before sharing diagnostic logs with external L4 vendors.',
    ],
    references: [
      'NIST SP 800-92 — Guide to Computer Security Log Management',
      'ISA/IEC 62443-2-1 & 3-3 — Continuous Monitoring & Audit Logging',
      'ISO/IEC 27001 Annex A.8.15 & A.8.17 — Logging & Clock Synchronization',
    ],
    sections: [
      {
        number: '1',
        title: 'Log Matrix, NTP Synchronization & Immutability',
        bullets: [
          'Every critical asset in the AMP/CMDB (IAGS-02) is mapped to mandatory event categories: authentication, privileged actions (IAGS-09), configuration changes, firewall drops, and health alarms.',
          'All OT devices synchronize clocks against redundant internal NTP servers to guarantee forensic timeline integrity.',
          'Logs are forwarded in real time to centralized SIEM storage protected with append-only / WORM controls against tampering.',
        ],
      },
      {
        number: '2',
        title: '24x7 SOC/NOC Correlation & Vendor Log Sharing',
        bullets: [
          'Correlated availability or security alerts automatically generate P1/P2 incidents in ITSM (IAGS-04).',
          'Activating agents or tuning monitoring thresholds on production OT assets requires a controlled RFC (IAGS-03).',
          'Diagnostic logs exported for external L4 vendor troubleshooting must be sanitized/anonymized and approved by Industrial IS.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'AMP Log Collection Matrix & Immutable SIEM Archives',
        identification: 'SIEM-MAT-YYYY',
        storage: 'Centralized SIEM (Append-Only Vault)',
        accessControl: 'SOC, NOC, Industrial IS & Forensics/Audit',
        retention: 'Minimum 1 year hot + 5 years immutable archive',
        disposition: 'Automated Lifecycle Purge after Retention',
      },
    ],
  },
};
