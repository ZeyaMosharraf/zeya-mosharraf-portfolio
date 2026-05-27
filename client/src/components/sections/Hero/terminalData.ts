export interface TermLine {
  text: string;
  color?: string;        // default #A0AEC0 (gray-400ish)
  accent?: boolean;      // use --accent-primary
  dim?: boolean;         // 50% opacity
}

export const ROTATING_WORDS = ["Automated", "Observable", "Modular", "Performant"];

export const COMMANDS: Record<string, { cmd: string; lines: TermLine[] }> = {
  stack: {
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
  pipelines: {
    cmd: "python pipelines/sync_stripe.py",
    lines: [
      { text: "12:04:01 | INFO  | pipeline.py - Initializing Stripe API synchronization...", dim: true },
      { text: "12:04:02 | INFO  | pipeline.py - Fetching charges from endpoint /v1/charges" },
      { text: "12:04:03 | INFO  | pipeline.py - Ingested 142 records. Validating payloads...", dim: true },
      { text: "12:04:04 | SUCCESS| pipeline.py - Schema validations passed successfully" },
      { text: "12:04:04 | INFO  | pipeline.py - Running automated upsert process...", dim: true },
      { text: "12:04:05 | SUCCESS| pipeline.py - Merged 142 records into staging.stripe_charges" },
      { text: "" },
      { text: "✓ API pipeline synchronization finished.", accent: true },
    ],
  },
  automation: {
    cmd: "dbt test --select source:stripe",
    lines: [
      { text: "12:05:01 | Concurrency: 4 threads", dim: true },
      { text: "12:05:01 | 1 of 3 START test unique_raw_charges_id ........... [RUN]" },
      { text: "12:05:02 | 1 of 3 PASS unique_raw_charges_id .................. [PASS]", accent: true },
      { text: "12:05:02 | 2 of 3 START test not_null_raw_charges_amount ........ [RUN]" },
      { text: "12:05:03 | 2 of 3 PASS not_null_raw_charges_amount .............. [PASS]", accent: true },
      { text: "12:05:03 | 3 of 3 START test relationships_charges_customer_id .. [RUN]" },
      { text: "12:05:04 | 3 of 3 PASS relationships_charges_customer_id ........ [PASS]", accent: true },
      { text: "" },
      { text: "✓ Done. PASS=3 WARN=0 ERROR=0", accent: true },
    ],
  },
  experience: {
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
