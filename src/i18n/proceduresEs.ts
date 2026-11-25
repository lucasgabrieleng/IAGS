import { ProcedureLocalizedPayload } from './proceduresEn';

export const PROCEDURES_ES: Record<string, ProcedureLocalizedPayload> = {
  'IAGS-01': {
    title: 'Estructura de Gobernanza de Servicios de Automatización',
    shortTitle: 'Gobernanza de Servicios',
    cadence: 'Comité Trimestral',
    ownerRole: 'Líder de Gobernanza IAGS',
    summary:
      'Establece la arquitectura estructural de la Gobernanza de Ciberseguridad OT y Servicios de Automatización, definiendo el Comité Trimestral IAGS, la Mesa de Servicios SPOC, el Equipo Técnico, la segregación de roles, la jerarquía documental y la mejora continua.',
    keyMetrics: [
      'Reuniones trimestrales del Comité de Gobernanza IAGS con actas formales retenidas por 3 años + archivo histórico.',
      'Gobernanza estructurada en 15 procedimientos integrados alineados con ISA/IEC 62443-2-1, ISO/IEC 27001 e ITIL.',
      'Separación clara entre Dirección/Fiscalización (Comité), Punto Único de Contacto (Mesa de Servicios) y Ejecución Técnica.',
      'Revisiones periódicas de eficacia, seguimiento de auditorías y flujo formal de aceptación de riesgo residual.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Sistema de Gestión de Seguridad en Automatización Industrial',
      'ISO/IEC 27001 y 27002 — Sistemas de Gestión de Seguridad de la Información',
      'ITIL 4 — Prácticas de Gobernanza y Gestión de Servicios TI/OT',
    ],
    sections: [
      {
        number: '1',
        title: 'Objetivo y Alcance',
        paragraphs: [
          'Este procedimiento establece el modelo de gobernanza, funciones organizacionales, responsabilidades y rituales de gestión necesarios para garantizar la disponibilidad, integridad, seguridad operativa y ciberseguridad de los servicios y activos OT.',
          'Aplica a todas las plantas industriales, salas de control, centros de datos de automatización, equipos de ingeniería, áreas asociadas (Infraestructura TI, SI Industrial, Mantenimiento Eléctrico, Instrumentación, Seguridad Patrimonial) y proveedores externos.',
        ],
      },
      {
        number: '2',
        title: 'Funciones Estructurantes de Gobernanza',
        subsections: [
          {
            code: '2.1',
            title: 'Comité de Gobernanza IAGS',
            bullets: [
              'Se reúne trimestralmente con rol fiscalizador, deliberativo y de mejora continua.',
              'Revisa indicadores de cumplimiento de las 15 normas, desvíos de auditoría, SLAs de vulnerabilidades y simulacros DRP.',
              'Aprueba actualizaciones estructurales de políticas, estándares y del Catálogo de Servicios de Automatización.',
            ],
          },
          {
            code: '2.2',
            title: 'Mesa de Servicios de Automatización (SPOC)',
            bullets: [
              'Actúa como punto único de contacto (SPOC) para registro, triaje y enrutamiento de incidentes, solicitudes y cambios en ITSM.',
              'Monitorea el cumplimiento de SLAs en los niveles de soporte N1 a N4.',
            ],
          },
          {
            code: '2.3',
            title: 'Equipo Técnico de Automatización',
            bullets: [
              'Sostiene activos OT (PLCs, HMIs, SCADA, Redes Industriales, Estaciones y paquetes comerciales) bajo control de cambios.',
              'Ejecuta hardening, parcheo seguro, homologación técnica, versionamiento y pruebas de continuidad.',
            ],
          },
        ],
      },
      {
        number: '3',
        title: 'Jerarquía Documental y Mejora Continua',
        bullets: [
          'Nivel 1: Política Corporativa de Gobernanza y Ciberseguridad OT.',
          'Nivel 2: 15 Procedimientos Normativos IAGS (IAGS-01 a IAGS-15).',
          'Nivel 3: Estándares Técnicos, Líneas Base de Hardening, Fichas de Servicio e Instrucciones.',
          'Nivel 4: Registros Controlados (Actas, RDMs, Auditorías, Homologaciones, Revisiones de Acceso).',
        ],
        note: 'Todos los documentos normativos pasan por revisión periódica programada o revisión extraordinaria tras incidentes mayores o auditorías.',
      },
    ],
    controlledRecords: [
      {
        name: 'Actas del Comité de Gobernanza IAGS',
        identification: 'Código Secuencial (AAAA/NN)',
        storage: 'Repositorio Corporativo de Gobernanza',
        accessControl: 'Miembros del Comité y Auditoría',
        retention: '3 años activos + archivo permanente',
        disposition: 'Archivo Histórico',
      },
    ],
  },

  'IAGS-02': {
    title: 'Gestión de Activos de Automatización',
    shortTitle: 'Gestión de Activos',
    cadence: 'Auditoría Semestral / Inventario Bienal',
    ownerRole: 'Responsable de Activos de Automatización',
    summary:
      'Gobierna el ciclo de vida completo de las 6 clases críticas de activos OT (PLCs/Remotas, Estaciones, HMIs, Infraestructura de Red, UPS Industriales y Paquetes Comerciales), exigiendo 6 compuertas de seguridad y conciliación ERP/EAM ↔ CMDB ↔ PGA.',
    keyMetrics: [
      '6 Clases Críticas OT controladas en 5 fases: Demanda, Adquisición, Implementación, Operación y Desincorporación.',
      '6 Compuertas de Seguridad obligatorias antes de producción (Homologación, Claves Predet., Hardening, Escaneo, CMDB, SIEM/NTP).',
      'Auditorías semestrales por muestreo (≥ 25%) e inventario físico/lógico general bienal (100%).',
      'Plan de Acción formal vía RDM (IAGS-03) ante desvíos; software sin licencia o activos no autorizados escalan de inmediato a SI Industrial.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Inventario de Activos y Controles de Ciclo de Vida',
      'ISO/IEC 27001 Anexo A.5.9 — Inventario de Información y Activos Asociados',
      'ITIL 4 — Gestión de Activos y Configuración (CMDB)',
    ],
    sections: [
      {
        number: '1',
        title: 'Alcance de Clases Críticas de Activos OT',
        paragraphs: [
          'Todo hardware o software de automatización industrial con impacto en continuidad operativa o ciberseguridad debe mantenerse registrado y sincronizado entre ERP/EAM, CMDB (ITSM) y el Programa de Gestión de Activos (PGA).',
        ],
        table: {
          caption: 'Las 6 Clases Críticas OT Gobernadas por IAGS-02',
          headers: ['Clase', 'Subclases Típicas', 'Naturaleza'],
          rows: [
            ['PLC / Remotas', 'PLCs de Proceso, PLCs de Seguridad, E/S Remotas', 'Hardware'],
            ['Estaciones de Automatización', 'Estaciones de Ingeniería (EWS) y Operación (OWS)', 'Hardware'],
            ['HMI', 'Paneles Industriales Locales de Operador', 'Hardware'],
            ['Infraestructura de Red', 'Switches Industriales, Firewalls, Routers, Conversores', 'Hardware'],
            ['UPS Industrial', 'Sistemas de Alimentación Ininterrumpida Doble Conversión', 'Hardware'],
            ['Paquete Comercial (COTS)', 'SCADA, Historiadores, MES, Servidores de Versionado', 'Software'],
          ],
        },
      },
      {
        number: '2',
        title: 'Ciclo de Vida y Compuertas de Seguridad',
        bullets: [
          'Demanda y Adquisición: Evaluación de riesgo SI, cláusulas contractuales de seguridad y homologación tripartita (IAGS-14).',
          'Implementación: Cambio obligatorio de claves de fábrica/integrador, hardening base, escaneo de vulnerabilidades, alta ERP/CMDB y colecta SIEM/NTP.',
          'Operación: Monitoreo continuo, cambios controlados vía RDM y auditorías periódicas.',
          'Desincorporación: Borrado seguro de memoria/medios, certificado de descarte físico (IAGS-13) y baja definitiva en CMDB/ERP.',
        ],
      },
      {
        number: '3',
        title: 'Auditorías, Desvíos y Escalamiento',
        bullets: [
          'Auditoría semestral por muestreo cubriendo al menos el 25% de los activos críticos.',
          'Inventario general bienal al 100% conciliando etiquetas físicas frente a ERP/EAM y CMDB.',
          'Software sin licencia, dispositivos no autorizados o manipulaciones indebidas escalan de inmediato como incidente SI (IAGS-04).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Inventario OT y Conciliación PGA',
        identification: 'ID ERP/EAM ↔ Tag CI CMDB',
        storage: 'CMDB ITSM y ERP/EAM',
        accessControl: 'Responsable de Activos, Automatización y Auditoría',
        retention: 'Ciclo de vida del activo + 5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-03': {
    title: 'Gestión de Cambios en Servicios y Activos de Automatización',
    shortTitle: 'Gestión de Cambios',
    cadence: 'CAB Semanal / Emergencia ≤ 5 Días Hábiles',
    ownerRole: 'Gestor de Cambios de Automatización',
    summary:
      'Controla toda adición, modificación o retiro que afecte activos OT, lógica de control, firmware o servicios mediante RDMs formales, análisis de riesgo, aprobación CAB-Automatización, plan de rollback y actualización post-cambio del CMDB.',
    keyMetrics: [
      'Tres categorías de cambio: Estándar (modelo preaprobado), Normal (CAB o Supervisor) y Emergencia (inmediato + RDM ≤ 5 días hábiles).',
      'Obligatoriedad de Plan de Pruebas, Plan de Rollback, respaldo verificado y comunicación operativa previa.',
      'Cambios de Riesgo Alto o con parada de planta requieren aprobación formal del CAB-Automatización y ventana programada (P6).',
      'Revisión post-implementación y sincronización obligatoria con CMDB (IAGS-02) y Control de Versiones.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Gestión de Configuración y Cambios',
      'ISO/IEC 27001 Anexo A.8.32 — Gestión de Cambios',
      'ITIL 4 — Habilitación del Cambio',
    ],
    sections: [
      {
        number: '1',
        title: 'Clasificación de Tipos de Cambio',
        table: {
          caption: 'Tipos de Cambio y Autoridades de Aprobación',
          headers: ['Tipo', 'Criterio', 'Aprobador'],
          rows: [
            ['Estándar', 'Bajo riesgo, repetitivo y documentado en Catálogo', 'Preaprobado (Modelo de Catálogo)'],
            ['Normal (Bajo/Medio)', 'Cambios controlados sin parada total de planta', 'Supervisor de Automatización'],
            ['Normal (Alto)', 'Infraestructura crítica, perímetro SI o parada total', 'CAB-Automatización (Comité Semanal)'],
            ['Emergencia', 'Restaurar incidente P1 o contener ciberataque activo', 'Supervisor (RDM ≤ 5 días hábiles)'],
          ],
        },
      },
      {
        number: '2',
        title: 'Planificación Obligatoria y Controles de Rollback',
        bullets: [
          'Plan de Pruebas validado en banco off-line o activo stand-by antes de intervenir producción.',
          'Respaldo íntegro restaurable y Plan de Rollback paso a paso con criterios claros de reversión.',
          'Comunicación anticipada a Salas de Control, Operación de Planta y Mantenimiento.',
          'Check-in exclusivo de código y actualización obligatoria del CMDB antes del cierre de la RDM.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Requerimientos de Cambio (RDM) y Actas CAB',
        identification: 'RDM-AAAA-NNNN',
        storage: 'Módulo de Cambios ITSM',
        accessControl: 'Automatización, CAB y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-04': {
    title: 'Gestión de Incidentes en Servicios y Activos de Automatización',
    shortTitle: 'Gestión de Incidentes',
    cadence: 'Operación 24x7 / Cierre Auto 72h',
    ownerRole: 'Gestor de Incidentes de Automatización',
    summary:
      'Restaura la operación normal de automatización en el menor tiempo posible con mínimo impacto productivo, integrando tickets ITSM, Órdenes de Mantenimiento (OM) en ERP/EAM, escalamiento de ciberseguridad y activación de crisis DRP.',
    keyMetrics: [
      'Matriz de 5 prioridades (P1 Crítica a P5 Baja) basada en seguridad de planta, impacto productivo y urgencia.',
      'Trazabilidad bidireccional entre Órdenes de Mantenimiento en campo (OM en ERP/EAM) y tickets ITSM.',
      'Escalamiento inmediato a SI Industrial / SOC ante sospechas cibernéticas y a DRP (IAGS-11) si supera el RTO.',
      'Cierre automático tras 72 horas sin objeción después de la solución validada; ACR obligatorio para P1/P2.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Respuesta y Recuperación ante Incidentes',
      'ISO/IEC 27001 Anexo A.5.24–A.5.28 — Gestión de Incidentes de Seguridad',
      'ITIL 4 — Gestión de Incidentes',
    ],
    sections: [
      {
        number: '1',
        title: 'Registro, Priorización e Integración de Campo',
        bullets: [
          'Todo incidente ingresa por la Mesa de Servicios SPOC (IAGS-06), alertas automáticas SIEM/NOC (IAGS-15) u OM de campo.',
          'Las prioridades P1–P5 definen tiempos de respuesta, escalamiento técnico (N1 → N4) y notificaciones gerenciales.',
          'Instrumentación realiza la primera verificación física en campo bajo OM (ERP/EAM) vinculada al ticket ITSM.',
        ],
      },
      {
        number: '2',
        title: 'Contorno, Escalamiento SI y Cierre',
        bullets: [
          'Las soluciones temporales restablecen la operación segura; la corrección definitiva exige RDM formal (IAGS-03).',
          'Sospechas de malware, accesos indebidos o alteraciones no autorizadas escalan inmediatamente a SI Industrial / SOC.',
          'Si la indisponibilidad proyectada excede el RTO de planta, se activa el plan de crisis DRP (IAGS-11).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Tickets de Incidente y Análisis de Causa Raíz (ACR)',
        identification: 'INC-AAAA-NNNN / ACR-AAAA-NNN',
        storage: 'Módulo de Incidentes ITSM',
        accessControl: 'Mesa de Servicios, Automatización, SOC y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-05': {
    title: 'Gestión del Catálogo de Servicios de Automatización',
    shortTitle: 'Catálogo de Servicios',
    cadence: 'Revisión de Consistencia Anual',
    ownerRole: 'Gestor del Catálogo de Servicios OT',
    summary:
      'Mantiene un portafolio único y actualizado de todos los servicios de automatización, definiendo SLAs, reglas de aprobación, modelos de cambio preaprobados, responsables y revisión anual de consistencia.',
    keyMetrics: [
      'Ficha de Servicio de Automatización obligatoria para publicar, alterar o retirar cualquier servicio.',
      'Vínculo directo entre servicios del catálogo, colas de soporte (IAGS-06), SLAs de solicitudes (IAGS-07) y cambios estándar (IAGS-03).',
      'Revisión anual de consistencia validando responsables vigentes, viabilidad técnica y depuración de servicios obsoletos.',
      'La baja de infraestructura subyacente a un servicio exige RDM aprobada (IAGS-03).',
    ],
    references: [
      'ITIL 4 — Gestión del Catálogo de Servicios',
      'ISO/IEC 20000-1 — Controles de Portafolio y Catálogo',
    ],
    sections: [
      {
        number: '1',
        title: 'Taxonomía y Fichas de Servicio',
        bullets: [
          'Organiza los servicios por dominio operativo: Control y Campo, Supervisión e Historiación, Red y Seguridad OT, y Soporte/Accesos.',
          'Cada Ficha de Servicio define alcance, solicitantes habilitados, cadena de aprobación, SLA y nivel de soporte.',
        ],
      },
      {
        number: '2',
        title: 'Revisión Anual de Consistencia y Ciclo de Vida',
        bullets: [
          'El Gestor del Catálogo y el Líder de Gobernanza IAGS ejecutan la revisión anual validando pertinencia, SLAs y dueños.',
          'Todo software homologado bajo IAGS-14 debe actualizar o publicar su ficha de servicio antes de pasar a producción.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Fichas de Servicio e Informe Anual de Consistencia',
        identification: 'CAT-OT-NNN / REV-AAAA',
        storage: 'Portal ITSM y Repositorio de Gobernanza',
        accessControl: 'Gestor de Catálogo, Líder IAGS y Auditoría',
        retention: '3 años tras retiro del servicio',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-06': {
    title: 'Mesa de Servicios de Automatización',
    shortTitle: 'Mesa de Servicios',
    cadence: 'Triaje Continuo / 4 Niveles',
    ownerRole: 'Líder de la Mesa de Servicios OT',
    summary:
      'Opera el Punto Único de Contacto (SPOC) de automatización industrial, ejecutando clasificación de demandas, checklists de primer nivel y enrutamiento estructurado a través de los niveles N1 a N4.',
    keyMetrics: [
      'Arquitectura de soporte en 4 niveles: N1 (Mesa / Planificador OT), N2 (Técnicos), N3 (Especialistas) y N4 (Proveedores).',
      'Reglas estrictas de triaje derivando cada demanda a Incidente (IAGS-04), Solicitud (IAGS-07) o Cambio (IAGS-03).',
      'Articulación directa con Instrumentación (OM campo), NOC (disponibilidad) y SOC / SI Industrial (ciberseguridad).',
      'Cero ejecuciones informales fuera de tickets registrados en ITSM.',
    ],
    references: [
      'ITIL 4 — Práctica de Mesa de Servicios',
      'ISA/IEC 62443-2-1 — Coordinación de Soporte Operativo',
    ],
    sections: [
      {
        number: '1',
        title: 'Arquitectura de Soporte en 4 Niveles',
        table: {
          caption: 'Niveles de Soporte OT y Alcance',
          headers: ['Nivel', 'Equipo', 'Alcance Principal'],
          rows: [
            ['N1', 'Mesa de Servicios y Planificador OT', 'Registro, triaje, checklists estándar, pedidos preaprobados y enrutamiento'],
            ['N2', 'Técnicos de Automatización y Campo', 'Diagnóstico en planta, recuperación de estaciones y soporte operativo'],
            ['N3', 'Especialistas y Arquitectos OT', 'Ingeniería compleja PLC/SCADA, núcleo de red, DRP y causa raíz'],
            ['N4', 'Fabricantes e Integradores Externos', 'Defectos de firmware propietario, parches de fabricante y garantía'],
          ],
        },
      },
      {
        number: '2',
        title: 'Disciplina de Triaje y Enrutamiento',
        bullets: [
          'Interrupción o degradación no planificada → Gestión de Incidentes (IAGS-04).',
          'Demanda catalogada estándar (accesos, reportes, soporte) → Solicitud de Servicios (IAGS-07).',
          'Alteración de configuración, lógica o infraestructura → Gestión de Cambios (IAGS-03).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registros de Triaje ITSM e Informes de SLA',
        identification: 'SD-KPI-AAAA-MM',
        storage: 'Plataforma Analítica ITSM',
        accessControl: 'Líder de Mesa, Supervisor y Comité',
        retention: '3 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-07': {
    title: 'Gestión de Solicitudes de Servicios de Automatización',
    shortTitle: 'Solicitud de Servicios',
    cadence: 'SLAs P1 (1d) a P7 (7d / Parada)',
    ownerRole: 'Gestor de Solicitudes de Automatización',
    summary:
      'Estandariza la atención de solicitudes operativas catalogadas (accesos lógicos/físicos, extracción de datos, soporte técnico), exigiendo doble aprobación cuando corresponda, permisos de seguridad industrial (APR/PTP) y SLAs P1–P7.',
    keyMetrics: [
      'Siete niveles de prioridad (P1: 1 día hábil hasta P6: Parada Programada y P7: 7 días hábiles).',
      'Aprobación técnica (Responsable del Servicio) y gerencial (Supervisor) para demandas no preaprobadas.',
      'Verificación obligatoria de APR y Permiso de Trabajo (PTP) antes de cualquier intervención física en planta.',
      'Puerta oficial en ITSM para Solicitudes de Acceso Lógico (IAGS-08) y Físico (IAGS-12).',
    ],
    references: [
      'ITIL 4 — Gestión de Solicitudes de Servicio',
      'Normas Corporativas de Seguridad Industrial (APR / PTP)',
    ],
    sections: [
      {
        number: '1',
        title: 'Prioridades y Plazos de Atención (P1–P7)',
        table: {
          caption: 'Matriz de Prioridades de Solicitudes',
          headers: ['Prioridad', 'Caso Típico', 'Plazo Objetivo'],
          rows: [
            ['P1 — Inmediata', 'Seguridad operativa o revocación crítica de acceso', '1 día hábil'],
            ['P2 — Urgencia', 'Desmovilización de terceros o demanda operativa alta', '2 días hábiles'],
            ['P3 — Alta', 'Soporte de ingeniería o extracción de reportes', '3 días hábiles'],
            ['P4 / P5 — Normal', 'Solicitudes rutinarias no urgentes del catálogo', '4–5 días hábiles'],
            ['P6 — Parada', 'Demandas que exigen parada programada de planta', 'Próxima parada programada'],
            ['P7 — Programada', 'Demandas administrativas de baja urgencia', '7 días hábiles'],
          ],
        },
      },
      {
        number: '2',
        title: 'Seguridad en la Ejecución y Cierre',
        bullets: [
          'Las actividades en campo requieren validación previa de APR y PTP antes del despliegue técnico.',
          'La confirmación del solicitante cierra el ticket con evidencia auditable en ITSM.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registros de Solicitud ITSM (REQ)',
        identification: 'REQ-AAAA-NNNN',
        storage: 'Módulo de Solicitudes ITSM',
        accessControl: 'Mesa de Servicios, Solicitantes y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-08': {
    title: 'Gestión de Acceso Lógico a Activos de Automatización',
    shortTitle: 'Acceso Lógico (IAM)',
    cadence: 'Revisión Anual + Offboarding',
    ownerRole: 'Responsable de Acceso Lógico OT',
    summary:
      'Garantiza identificación, autenticación y autorización (AAA), mínimo privilegio, segregación de funciones, check-out exclusivo de código fuente, revocación inmediata en bajas y revisión crítica anual en activos dentro y fuera de AD.',
    keyMetrics: [
      'Mínimo privilegio y cuentas nominales individuales (prohibidas cuentas compartidas salvo emergencia auditada en PAM).',
      'Segregación de funciones: Gestor aprueba necesidad; Gerente del Activo autoriza; Equipo de Acceso aprovisiona.',
      'Check-out exclusivo de código fuente PLC/SCADA (1 usuario a la vez) vinculado a RDM activa.',
      'Revisión crítica anual cubriendo Active Directory (AD) y activos OT locales, sincronizada con bajas de RR. HH.',
    ],
    references: [
      'ISA/IEC 62443-2-1 y 3-3 — Identificación, Autenticación y Control de Uso',
      'ISO/IEC 27001 Anexo A.5.15–A.5.18 — Control de Acceso y Ciclo de Identidades',
    ],
    sections: [
      {
        number: '1',
        title: 'Principios Fundamentales y Segregación de Funciones',
        bullets: [
          'Cada usuario debe poseer una credencial nominal, personal e intransferible acorde a su perfil operativo.',
          'Ninguna persona puede solicitar, aprobar y ejecutar su propio acceso lógico OT.',
          'Activos en AD son gestionados por Control de Acceso TI; activos autónomos locales por el equipo de Acceso Lógico OT.',
        ],
      },
      {
        number: '2',
        title: 'Ciclo de Vida, Terceros y Código Fuente',
        bullets: [
          'El acceso de terceros tiene vigencia estricta ligada al contrato y se revoca automáticamente al desmovilizar.',
          'Bajas o traslados de RR. HH. disparan revocación sincronizada en AD, activos locales, PAM (IAGS-09) y credenciales físicas (IAGS-12).',
          'El sistema de versionamiento garantiza check-out exclusivo de lógica PLC/HMI/SCADA y check-in obligatorio tras pruebas.',
        ],
      },
      {
        number: '3',
        title: 'Revisión Crítica Anual',
        paragraphs: [
          'Al menos una vez al año, los Gerentes de Activos revisan y recertifican todas las cuentas y perfiles vigentes. Cuentas sin justificación o inactivas se bloquean de inmediato.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Informe Anual de Revisión de Accesos OT',
        identification: 'IAM-REV-AAAA',
        storage: 'ITSM y Repositorio SI Industrial',
        accessControl: 'Responsable IAM, SI Industrial y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-09': {
    title: 'Gestión de Cuentas Privilegiadas en Activos de Automatización',
    shortTitle: 'Cuentas Privilegiadas (PAM)',
    cadence: 'Revisión Semestral + Bóveda PAM',
    ownerRole: 'Responsable de Cuentas Privilegiadas OT',
    summary:
      'Protege cuentas administrativas, locales de emergencia, de servicio y de soporte de proveedores mediante bóveda PAM centralizada, rotación de contraseñas, grabación de sesiones, trazas 24x7 en SIEM y revisión semestral.',
    keyMetrics: [
      'Aprobación en triple capa para privilegios: Gerente del Solicitante + Evaluación Técnica + Gerente del Activo.',
      'Todas las credenciales administrativas/compartidas resguardadas en bóveda PAM con rotación automática o inmediata post-uso.',
      '100% de las sesiones privilegiadas auditadas y enviadas al SIEM (IAGS-15) para detección de abusos.',
      'Revisión crítica semestral de todas las cuentas privilegiadas, de servicio y de proveedores.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Gestión de Acceso Privilegiado',
      'ISO/IEC 27001 Anexo A.8.2 — Derechos de Acceso Privilegiado',
    ],
    sections: [
      {
        number: '1',
        title: 'Matriz de Controles por Perfil Privilegiado',
        table: {
          caption: 'Controles de Gobernanza para Cuentas Privilegiadas',
          headers: ['Perfil', 'Bóveda y Rotación', 'Monitoreo'],
          rows: [
            ['Admin Nominal', 'ID elevado separado de la cuenta diaria', 'Traza completa en SIEM'],
            ['Local Emergencia / Root', 'En Bóveda PAM; rotación inmediata tras uso', 'Alerta prioritaria SIEM al retirar'],
            ['Cuenta de Servicio', 'Inicio interactivo bloqueado; dueño registrado', 'Detección de uso anómalo en SIEM'],
            ['Soporte Temporal Tercero', 'Ventana acotada; sesión supervisada; rotación inmediata', 'Grabación de sesión + SOC'],
          ],
        },
      },
      {
        number: '2',
        title: 'Reglas de Uso, Rotación y Revisión Semestral',
        bullets: [
          'Prohibido almacenar credenciales privilegiadas en texto plano, scripts o fuera de la bóveda PAM.',
          'Toda salida de proveedor o sospecha de exposición exige rotación inmediata en los activos afectados.',
          'La Revisión Crítica Semestral valida la necesidad de negocio de cada privilegio activo.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Registro PAM e Informe Semestral de Revisión',
        identification: 'PAM-REV-AAAA-S1/S2',
        storage: 'Bóveda PAM y Repositorio SI',
        accessControl: 'Responsable PAM, SI Industrial y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-10': {
    title: 'Gestión de Vulnerabilidades y Cumplimiento Técnico OT',
    shortTitle: 'Vulnerabilidades y Cumplim.',
    cadence: 'GVT Mensual / GCT Anual / SLAs 60–180d',
    ownerRole: 'Coordinador de Ciberseguridad OT',
    summary:
      'Establece la Gestión de Vulnerabilidades Técnicas (GVT) mensual, Gestión de Cumplimiento Técnico (GCT) anual, pruebas de intrusión seguras (excluyendo PLCs y UPS), SLAs de remediación CVSS (60/90/120/180d) y parcheo OT seguro en 4 etapas.',
    keyMetrics: [
      'Escaneos GVT mensuales y verificación anual GCT de líneas base en infraestructura OT.',
      'SLAs de Remediación CVSS: Crítica ≤ 60 días, Alta ≤ 90 días, Media ≤ 120 días, Baja ≤ 180 días.',
      'Secuencia Segura Obligatoria en 4 Etapas: Homologación Fabricante → Prueba Off-line → Stand-by → Producción (RDM).',
      'PLCs/Remotas y UPS Industriales excluidos de pruebas activas TDI/TDE (NDA obligatorio para pruebas autorizadas).',
    ],
    references: [
      'ISA/IEC 62443-2-3 — Gestión de Parches en Entornos IACS',
      'ISO/IEC 27001 Anexo A.8.8 — Gestión de Vulnerabilidades Técnicas',
      'NIST SP 800-82 — Guía de Seguridad en Tecnología Operacional (OT)',
    ],
    sections: [
      {
        number: '1',
        title: 'Pilares Técnicos: GVT, GCT y Pruebas de Intrusión',
        bullets: [
          'GVT (Mensual): Descubrimiento seguro de vulnerabilidades priorizado por CVSS y criticidad de activo (A/B/C).',
          'GCT (Anual): Auditoría técnica comparando servidores SCADA, AD OT y Firewalls contra líneas base aprobadas.',
          'Pruebas TDI/TDE: Ejecutadas solo con alcance aprobado y NDA, excluyendo explícitamente PLCs/Remotas y UPS para proteger la continuidad de planta.',
        ],
      },
      {
        number: '2',
        title: 'Plazos de Remediación y Secuencia Segura de Parcheo',
        table: {
          caption: 'SLAs CVSS y Etapas Seguras de Despliegue',
          headers: ['Severidad CVSS', 'SLA Objetivo', 'Secuencia Segura Obligatoria'],
          rows: [
            ['Crítica (9.0–10.0)', '≤ 60 días', '1. Fabricante → 2. Banco Off-line → 3. Stand-by → 4. Prod (RDM)'],
            ['Alta (7.0–8.9)', '≤ 90 días', '1. Fabricante → 2. Banco Off-line → 3. Stand-by → 4. Prod (RDM)'],
            ['Media (4.0–6.9)', '≤ 120 días', 'Lote planificado de mantenimiento vía RDM Normal'],
            ['Baja (0.1–3.9)', '≤ 180 días', 'Incluido en ciclo programado de actualización'],
          ],
        },
        note: 'Cuando existan restricciones técnicas para parchar en plazo, se exigen controles compensatorios y Aceptación Formal de Riesgo Residual por Gerencia y Riesgos Corporativos.',
      },
    ],
    controlledRecords: [
      {
        name: 'Informes Mensuales GVT, Anuales GCT y Confidenciales TDI/TDE',
        identification: 'GVT-AAAA-MM / GCT-AAAA',
        storage: 'Repositorio Restringido SI Industrial',
        accessControl: 'Coordinador Ciberseguridad, Gerencia y Auditoría',
        retention: '5 años',
        disposition: 'Eliminación Segura / Archivo',
      },
    ],
  },

  'IAGS-11': {
    title: 'Gestión de Continuidad de la Infraestructura Crítica OT',
    shortTitle: 'Continuidad OT (DRP)',
    cadence: 'Revisión Anual / Simulacros Bienales',
    ownerRole: 'Coordinador de Continuidad OT',
    summary:
      'Asegura la resiliencia operativa y recuperación controlada de 5 clases prioritarias (PLCs, HMIs, SCADA, Switches Industriales y Firewalls) mediante BIA (RTO/RPO), redundancia, kits de contingencia, operación manual segura y simulacros bienales.',
    keyMetrics: [
      'Cubre 5 clases prioritarias con metas documentadas de BIA, RTO (1h–4h) y RPO (5m–60m).',
      'Pruebas prácticas bienales de failover alineadas a paradas programadas + revisión crítica anual.',
      'Kits de contingencia obligatorios (laptops preconfigurados, cables, respaldos verificados, repuestos) y modo manual seguro.',
      'Controles compensatorios temporales en crisis requieren aprobación del Comité de Crisis + SI Industrial con vigencia acotada.',
    ],
    references: [
      'ISO 22301 — Sistemas de Gestión de Continuidad del Negocio',
      'ISA/IEC 62443-2-1 — Respaldo, Restauración y Continuidad',
    ],
    sections: [
      {
        number: '1',
        title: 'Infraestructura Prioritaria y Metas RTO/RPO',
        table: {
          caption: 'Metas de Continuidad por Clase Crítica OT',
          headers: ['Clase de Activo', 'RTO Meta', 'RPO Meta', 'Estrategia de Resiliencia'],
          rows: [
            ['Firewall Industrial', '1 hora', '5 min', 'Par HA Activo-Standby + configuración replicada'],
            ['Sistema SCADA', '2 horas', '5 min', 'Clúster Activo-Standby + Data Center secundario'],
            ['Switch Industrial', '2 horas', '30 min', 'Anillo óptico redundante + backup + repuesto'],
            ['PLC / Remotas', '4 horas', '15 min', 'CPU redundante + respaldo versionado + módulos repuesto'],
            ['Paneles HMI', '4 horas', '60 min', 'Imagen de proyecto + kit contingencia + operación manual'],
          ],
        },
      },
      {
        number: '2',
        title: 'Simulacros, Activación de Crisis y Normalización',
        bullets: [
          'Las pruebas prácticas de recuperación se ejecutan al menos cada 2 años en paradas programadas y quedan registradas.',
          'Todo incidente cuya recuperación proyectada supere el RTO activa DRP y moviliza al Comité de Crisis.',
          'El retorno a normalidad exige RDM formal (IAGS-03) y revocación inmediata de excepciones temporales.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Planes DRP/PCN, Matriz BIA y Registro de Simulacros',
        identification: 'DRP-OT-AAAA / TEST-AAAA',
        storage: 'Repositorios Primario y Redundante Off-line',
        accessControl: 'Coordinador Continuidad, Especialistas N3 y Comité de Crisis',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-12': {
    title: 'Gestión de Seguridad Física en Automatización',
    shortTitle: 'Seguridad Física',
    cadence: 'Revisión Anual + Sincronía Bajas',
    ownerRole: 'Gestor de Seguridad Física OT',
    summary:
      'Protege las instalaciones de automatización industrial en 7 dominios físicos y ambientales, clasificando perímetros en Alta, Media y Baja criticidad, exigiendo habilitación eléctrica, biometría/credenciales, CCTV y revisión anual de autorizados.',
    keyMetrics: [
      '3 Niveles de Perímetro (ALTA: Data Centers, Subestaciones, Salas PLC/Control; MEDIA: Salas Eléctricas y Labs; BAJA: Áreas generales).',
      '7 Controles Físicos/Ambientales: Barreras, control de acceso, CCTV, detección de incendios, climatización, energía y escolta.',
      'Sincronización estricta con bajas de RR. HH. y revocación de Acceso Lógico (IAGS-08).',
      'Auditoría anual de Listas de Autorizados y verificación obligatoria de habilitación eléctrica en salas energizadas.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Seguridad Física y Ambiental',
      'ISO/IEC 27001 Anexo A.7 — Controles de Seguridad Física',
    ],
    sections: [
      {
        number: '1',
        title: 'Clasificación de Perímetros y Controles de Acceso',
        bullets: [
          'Criticidad ALTA (Data Centers, Subestaciones, Salas de PLC y Control): Biometría + Credencial + CCTV 24x7 + registro de ingresos + acompañamiento a terceros.',
          'Criticidad MEDIA (Salas Eléctricas de Área, Cabinas de Robótica, Laboratorios OT): Llave/credencial controlada + habilitación eléctrica + inspección anual.',
          'Accesos clasificados en Permanentes (personal propio), Temporales (terceros con vencimiento) y Puntuales (visitantes acompañados).',
        ],
      },
      {
        number: '2',
        title: 'Revisión Anual y Sincronización de Offboarding',
        bullets: [
          'Los gestores de áreas críticas revisan anualmente las Listas de Personas Autorizadas junto a Seguridad Patrimonial.',
          'La baja de personal o cierre de contrato revoca credenciales físicas en paralelo con cuentas lógicas (IAGS-08).',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Lista de Autorizados e Informe Anual de Revisión Física',
        identification: 'PHYS-REV-AAAA',
        storage: 'Seguridad Patrimonial y Repositorio Gobernanza',
        accessControl: 'Seguridad Patrimonial, Gestores de Área y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-13': {
    title: 'Protección y Mantenimiento de Activos Críticos OT',
    shortTitle: 'Protección de Hardware',
    cadence: 'Plan Anual de Inspección Muestral',
    ownerRole: 'Responsable de Protección y Mantenimiento OT',
    summary:
      'Establece salvaguardas físicas de hardware, segregación de cableado, bloqueo de estaciones desatendidas, supervisión de mantenimiento por terceros, control de salida de activos y descarte seguro certificado.',
    keyMetrics: [
      'Gabinetes con cerradura, protección antimanipulación, segregación de cableado energía/datos y sensores ambientales.',
      'Bloqueo automático de pantalla y deshabilitación de puertos USB/red no utilizados en estaciones desatendidas.',
      'Supervisión técnica obligatoria a proveedores externos y autorización formal de salida para reparaciones fuera de planta.',
      'Borrado seguro o destrucción física certificada de memorias antes del descarte de hardware.',
    ],
    references: [
      'ISO/IEC 27001 Anexo A.7.8–A.7.14 — Ubicación, Cableado, Mantenimiento y Descarte Seguro',
      'ISA/IEC 62443-2-1 — Protección de Equipos y Mantenimiento',
    ],
    sections: [
      {
        number: '1',
        title: 'Ubicación, Cableado y Equipos Desatendidos',
        bullets: [
          'Activos críticos ubicados fuera de perímetros de Alta Criticidad reciben gabinetes reforzados y bloqueadores de puerto.',
          'El cableado de energía y comunicaciones OT se instala segregado y protegido contra interferencias y daños físicos.',
          'Las estaciones aplican bloqueo automático por inactividad y restricción de medios removibles no autorizados.',
        ],
      },
      {
        number: '2',
        title: 'Mantenimiento Controlado, Salida y Descarte Seguro',
        bullets: [
          'Toda intervención preventiva o correctiva de hardware sigue Gestión de Cambios (IAGS-03) y supervisión técnica.',
          'La salida de equipos para reparación externa exige autorización de Seguridad Patrimonial y respaldo/limpieza previa.',
          'El hardware retirado con memoria no volátil requiere Certificado de Descarte Seguro validado por SI Industrial.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Planes de Inspección Muestral y Certificados de Descarte',
        identification: 'INSP-HW-AAAA / DISP-AAAA-NNN',
        storage: 'Repositorio de Automatización y SI Industrial',
        accessControl: 'Responsable Protección, Seguridad Patrimonial y Auditoría',
        retention: '5 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-14': {
    title: 'Homologación, Instalación y Actualización de Software OT',
    shortTitle: 'Homologación de Software',
    cadence: 'Por Versión + Revisión Anual Licencias',
    ownerRole: 'Líder de Ingeniería de Software OT',
    summary:
      'Exige validación técnica tripartita (Infraestructura TI + SI Industrial + Automatización) en laboratorio piloto aislado antes de instalar o actualizar cualquier software o firmware OT, junto con despliegue vía RDM y auditoría anual de licencias.',
    keyMetrics: [
      'Aprobación Tripartita Obligatoria: Infraestructura TI (compatibilidad), SI Industrial (hardening/seguridad) y Automatización (funcionalidad/planta).',
      'Pruebas en banco piloto con Guías documentadas de Instalación y Rollback antes de pasar a producción.',
      'Cero software no autorizado, de prueba o sin licencia permitido en entornos OT.',
      'Revisión anual de licencias validando cumplimiento en suites SCADA, Historiadores e ingeniería.',
    ],
    references: [
      'ISA/IEC 62443-2-1 — Aprobación de Software y Despliegue Seguro',
      'ISO/IEC 27001 Anexo A.8.19 y A.8.31 — Instalación de Software y Separación de Ambientes',
    ],
    sections: [
      {
        number: '1',
        title: 'Flujo de Homologación Tripartita',
        bullets: [
          'Paso 1 — Solicitud Técnica: Justificación, autenticidad del fabricante y revisión arquitectónica.',
          'Paso 2 — Piloto Aislado: Pruebas funcionales, escaneo de vulnerabilidades, hardening y validación de rollback.',
          'Paso 3 — Aprobación Tripartita: Formulario de Homologación firmado por Infraestructura TI, SI Industrial y Automatización.',
          'Paso 4 — Despliegue Controlado: Instalación vía RDM (IAGS-03), actualización del Catálogo (IAGS-05) y respaldo DRP (IAGS-11).',
        ],
      },
      {
        number: '2',
        title: 'Revisión Anual de Licencias',
        paragraphs: [
          'Ingeniería de Automatización realiza anualmente la conciliación entre paquetes instalados en el CMDB y licencias corporativas vigentes para eliminar riesgos legales y de ciberseguridad.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Formulario de Homologación y Auditoría Anual de Licencias',
        identification: 'HOM-SW-AAAA-NNN / LIC-AAAA',
        storage: 'Repositorio de Ingeniería OT e ITSM',
        accessControl: 'Líder de Software, TI, SI Industrial y Auditoría',
        retention: 'Ciclo de vida del software + 3 años',
        disposition: 'Archivo Controlado',
      },
    ],
  },

  'IAGS-15': {
    title: 'Gestión de Logs y Eventos en Activos de Automatización',
    shortTitle: 'Logs y Eventos (SIEM)',
    cadence: 'SIEM/NOC 24x7 + Sincronía NTP',
    ownerRole: 'Líder de Monitoreo y SOC OT',
    summary:
      'Gobierna la recolección centralizada, sincronización horaria NTP, retención inmutable append-only y correlación 24x7 SOC/NOC de eventos de disponibilidad, capacidad y ciberseguridad en todos los activos críticos OT.',
    keyMetrics: [
      'Sincronización horaria NTP obligatoria en servidores OT, switches, firewalls y controladores compatibles.',
      'Ingesta centralizada en SIEM con almacenamiento inmutable (append-only) protegido contra alteración.',
      'Monitoreo dual 24x7: SOC (ciberseguridad, abuso PAM, cambios no autorizados) y NOC (disponibilidad, salud y capacidad).',
      'Anonimización y aprobación obligatorias antes de compartir logs de diagnóstico con proveedores externos N4.',
    ],
    references: [
      'NIST SP 800-92 — Guía de Gestión de Registros de Seguridad',
      'ISA/IEC 62443-2-1 y 3-3 — Monitoreo Continuo y Auditoría',
      'ISO/IEC 27001 Anexo A.8.15 y A.8.17 — Registro de Eventos y Sincronización de Relojes',
    ],
    sections: [
      {
        number: '1',
        title: 'Matriz de Logs, Sincronía NTP e Inmutabilidad',
        bullets: [
          'Todo activo crítico del PGA/CMDB (IAGS-02) se mapea a eventos obligatorios: autenticación, sesiones PAM (IAGS-09), cambios de configuración, bloqueos de firewall y alarmas de salud.',
          'Todos los equipos OT sincronizan relojes contra servidores NTP internos redundantes para garantizar integridad forense.',
          'Los logs se envían en tiempo real al SIEM centralizado con retención inmutable (append-only / WORM).',
        ],
      },
      {
        number: '2',
        title: 'Correlación SOC/NOC 24x7 y Envío a Terceros',
        bullets: [
          'Las alertas correlacionadas de disponibilidad o seguridad abren incidentes P1/P2 automáticamente en ITSM (IAGS-04).',
          'Habilitar agentes o ajustar umbrales en activos OT de producción exige RDM controlada (IAGS-03).',
          'Los logs exportados para soporte N4 de fabricantes deben ser anonimizados y aprobados por SI Industrial.',
        ],
      },
    ],
    controlledRecords: [
      {
        name: 'Matriz de Colecta PGA y Archivos Inmutables SIEM',
        identification: 'SIEM-MAT-AAAA',
        storage: 'SIEM Centralizado (Bóveda Append-Only)',
        accessControl: 'SOC, NOC, SI Industrial y Forense/Auditoría',
        retention: 'Mínimo 1 año activo + 5 años inmutable',
        disposition: 'Depuración Automática tras Retención',
      },
    ],
  },
};
