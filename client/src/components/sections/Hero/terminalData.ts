export interface TermLine {
  text: string;
  color?: string;        // default #A0AEC0 (gray-400ish)
  accent?: boolean;      // use --accent-primary
  dim?: boolean;         // 50% opacity
}

export const ROTATING_WORDS = ["Automated", "Observable", "Modular", "Performant"];

export const COMMANDS: Record<string, { cmd: string; lines: TermLine[] }> = {
  stack: {
    cmd: "cat stack.yml",
    lines: [
      { text: "version: '3.8'", dim: true },
      { text: "services:", dim: true },
      { text: "  database: PostgreSQL / SQL Server / BigQuery" },
      { text: "  automation: Python (Pandas / Openpyxl)" },
      { text: "  reporting: Power BI / Tableau / Excel" },
      { text: "  workflows: GitHub Actions / Automations" },
      { text: "  scripting: Advanced SQL & PL/pgSQL" },
      { text: "" },
      { text: "✓ Stack initialized.", accent: true },
    ],
  },
  pipelines: {
    cmd: "python pipelines/ingest_sales.py",
    lines: [
      { text: "12:04:01 | INFO: Initializing pipeline pipeline flow...", dim: true },
      { text: "12:04:01 | INFO: Connecting to target analytics database..." },
      { text: "12:04:02 | INFO: Ingesting 142k raw log entries...", dim: true },
      { text: "12:04:03 | OK: Schema validation and data casting passed" },
      { text: "12:04:04 | INFO: Running automated pandas deduplication...", dim: true },
      { text: "12:04:05 | OK: Loaded processed data into clean database" },
      { text: "" },
      { text: "✓ Pipeline flow run finished successfully.", accent: true },
    ],
  },
  automation: {
    cmd: "python automation/monitor_quality.py",
    lines: [
      { text: "[INFO] Connecting to database..." },
      { text: "[INFO] Validating schema consistency..." },
      { text: "[INFO] Testing null constraints..." },
      { text: "├─ table: raw_events ........... [PASS]", accent: true },
      { text: "├─ table: processed_sales ...... [PASS]", accent: true },
      { text: "└─ table: fct_revenue .......... [PASS]", accent: true },
      { text: "" },
      { text: "✓ Quality checks passed. No anomalies detected.", accent: true },
    ],
  },
  experience: {
    cmd: "whoami --bio",
    lines: [
      { text: "role: Analytics Engineer / Data Lead", accent: true },
      { text: "location: Pune, India", dim: true },
      { text: "expertise: SQL, Python, Power BI, Advanced Analytics" },
      { text: "focus: Building automated, modular data systems" },
      { text: "" },
      { text: "• 130+ systems automated" },
      { text: "• 0% data loss on critical migrations" },
      { text: "• 70%+ reports fully automated" },
      { text: "" },
      { text: "✓ Ready for next engineering challenge.", accent: true },
    ],
  },
};
