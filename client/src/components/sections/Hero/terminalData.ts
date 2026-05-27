export interface TermLine {
  text: string;
  color?: string;        // default #A0AEC0 (gray-400ish)
  accent?: boolean;      // use --accent-primary
  dim?: boolean;         // 50% opacity
}

export const ROTATING_WORDS = ["Automated", "Observable", "Modular", "Performant"];

export const COMMANDS: Record<string, { cmd: string; lines: TermLine[] }> = {
  pipeline: {
    cmd: "dbt run --select core --target prod",
    lines: [
      { text: "10:24:42 | Starting analytics pipeline...", dim: true },
      { text: "" }, // Placeholder for visual horizontal DAG flowchart
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "10:24:47 | Pipeline completed successfully", color: "#10B981" },
      { text: "duration: 00:00:04", dim: true },
    ],
  },
  models: {
    cmd: "cat dbt_project.yml",
    lines: [
      { text: "name: 'zeya_analytics'", dim: true },
      { text: "version: '1.0.0'", dim: true },
      { text: "config-version: 2" },
      { text: "" },
      { text: "profile: 'bigquery_dw'" },
      { text: "" },
      { text: "models:" },
      { text: "  zeya_analytics:" },
      { text: "    staging:" },
      { text: "      +materialized: view" },
      { text: "      +schema: staging" },
      { text: "    marts:" },
      { text: "      +materialized: table" },
      { text: "      +schema: core" },
      { text: "" },
      { text: "✓ dbt configuration loaded.", accent: true },
    ],
  },
  transform: {
    cmd: "cat models/marts/fct_events.sql",
    lines: [
      { text: "-- Compiled transformation model", dim: true },
      { text: "" }, // Placeholder for SQL editor code block
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "" },
      { text: "✓ model compile check passed successfully.", accent: true },
    ],
  },
  observability: {
    cmd: "whoami --bio",
    lines: [
      { text: "role: Analytics Engineer", accent: true },
      { text: "location: Pune, India", dim: true },
      { text: "expertise: SQL, Python, dbt, Data Warehousing, Power BI" },
      { text: "focus: Building automated, modular data pipelines & schemas" },
      { text: "" },
      { text: "• 30+ data pipelines fully automated" },
      { text: "• 99.9% uptime on critical analytics schemas" },
      { text: "• 80%+ report latency reduction via data modeling" },
      { text: "" },
      { text: "✓ Ready for next engineering challenge.", accent: true },
    ],
  },
};
