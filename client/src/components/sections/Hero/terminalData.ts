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
      { text: "  warehouse: Snowflake" },
      { text: "  transformation: dbt Core" },
      { text: "  orchestration: Dagster / Airflow" },
      { text: "  infrastructure: Terraform / AWS" },
      { text: "  visualization: Power BI / Looker" },
      { text: "" },
      { text: "✓ Stack initialized.", accent: true },
    ],
  },
  pipelines: {
    cmd: "dbt run --select tag:production",
    lines: [
      { text: "08:31:12 | Concurrency: 8 threads", dim: true },
      { text: "08:31:12 | Found 142 models, 458 tests" },
      { text: "08:31:14 | 1 of 142 START table model.fct_orders", dim: true },
      { text: "08:31:16 | 1 of 142 OK created table model.fct_orders" },
      { text: "08:31:17 | 2 of 142 START view model.dim_customers", dim: true },
      { text: "08:31:18 | 2 of 142 OK created view model.dim_customers" },
      { text: "" },
      { text: "✓ All models completed successfully.", accent: true },
    ],
  },
  automation: {
    cmd: "python automation/monitor_quality.py",
    lines: [
      { text: "[INFO] Connecting to warehouse..." },
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
      { text: "expertise: SQL, Python, dbt, Cloud Architecture" },
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
