import React from "react";

type CaseStudy = {
  id: number;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  bulletPoints?: string[];
  date: string;
  toolsUsed: string[];
  imageUrl?: string;
  results: string;
  slug: string;
};


  // case studies
export  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Daily MIS & Power BI Dashboard for Marketing & Sales Insights",
      slug: "daily-mis-power-bi-dashboard",
      category: "Data Analytics | Operations | Business Intelligence",
      shortDescription: "Developed a Daily MIS and Power BI Dashboard to monitor sales, marketing, and revenue performance, enabling leadership to make fast, data-driven decisions.",
      fullDescription: `During my internship at The Design Cart as a Data Analyst and Operations Intern, I was responsible for building a Daily MIS & Power BI Dashboard to deliver real-time insights on company performance. My task involved consolidating data from multiple sources—such as sales reports, marketing platforms, and revenue trackers—into a single dashboard that would be reviewed by leadership on a daily basis.
                    I ensured the dashboard was automated, visually engaging, and updated with the latest figures to drive strategic planning. The system not only improved the accuracy and timeliness of reports but also helped the company evaluate marketing ROI and sales efficiency across various channels.`,
      bulletPoints: [
        "Built a fully automated Daily MIS Dashboard using Power BI",
        "Consolidated data from sales reports, marketing analytics, and revenue tracking",
        "Delivered real-time, structured insights for daily executive decision-making",
        "Improved reporting accuracy to 100%, boosting confidence in data",
        "Enabled performance tracking of key metrics like conversion rates and ad effectiveness",
        "Supported the CEO with daily performance reviews for faster strategic planning",
        "Helped identify high-performing marketing strategies, improving ROI"
      ],
      date: "Dec 2024",
      toolsUsed: ["Power BI", "Microsoft Excel", "Sales Reports", "Marketing Analytics", "Business Intelligence Concepts"],
      results: "The dashboard ensured accurate and error-free reporting throughout the internship period, reducing manual work by nearly 2 hours per day. It helped identify high-performing marketing strategies, leading to a 15–20% improvement in marketing ROI. These insights enabled the leadership team to make faster and more informed decisions."
    },
    {
      id: 2,
      title: "RTO Automation and Proof Extraction System",
      slug: "rto-automation-proof-extraction",
      category: "Operational Automation | Self-Initiated Project",
      shortDescription: "I independently created a system using Excel and Python to automate the extraction of AWB proof files, reducing manual work and supporting timely reattempts and freight waivers.",
      fullDescription: `During my internship at Design Cart, I identified a time-consuming process in handling RTO (Return to Origin) cases where extracting proof files like MP3 and PNG for specific AWBs (Air Waybill numbers) used to take around an hour daily. I took the initiative to automate this task.
                        First, I created an Excel tracking file to monitor how many AWBs had valid proof and how many delivery attempts had been made. Based on this, I identified cases with less than 3 attempts, helping me raise freight waiver claims efficiently.
                        Then, I built a Python script that automatically copied the proof files from a folder by matching them with the AWBs listed in Excel. These AWBs were then submitted for reattempts or waivers due to issues like fake delivery remarks.
                        This solution improved the accuracy of reattempt requests, supported timely freight waiver submissions, and significantly reduced manual workload.`,
      bulletPoints: [
        "Designed Excel file to track AWBs with valid delivery proof and number of attempts.",
        "Built a Python script to extract and copy MP3/PNG proof files based on AWB numbers.",
        "Enabled easy identification of AWBs with <3 attempts to raise freight waivers.",
        "Reduced daily manual effort from 1 or 2 hour to just 1 minute.",
        "Helped reduce RTO cases by 2–3% by ensuring timely reattempts with proper proof."
      ],
      date: "Jan 2025",
      toolsUsed: ["Microsoft Excel", "Python (Pandas, OS module)"],
      results: "This self-made automation helped reduce the daily manual work from 1 or 2 hour to 1 minute, saving over 25 hours per month. It led to a 2–3% reduction in RTOs by ensuring timely reattempts for AWBs with valid proof and also made it easier to raise bulk freight waiver claims for cases with fewer than 3 delivery attempts. The project improved both accuracy and efficiency in daily operations."
    },
    {
      id: 3,
      title: "Automating Daily Review Data Extraction with Python",
      slug: "automating-daily-review-data-extraction",
      category: "Data Analytics | Operations Automation | Python Scripting",
      shortDescription: "Automated a repetitive, time-consuming daily task that involved filtering and extracting order review data from multiple Excel files. By replacing manual lookups and cross-checks with a Python script, I reduced processing time from 20–30 minutes to under 2 minutes, improving both efficiency and accuracy in operations.",
      fullDescription: `During my internship as a Data Analyst and Operations Intern at The Design Cart, I was assigned a repetitive and time-consuming daily task: preparing review data to be sent to the operations team for customer outreach. This process required me to open four different Excel files, filter the primary sheet, manually copy order IDs, and use lookup formulas to check those IDs against complaint and delay records from the other three Excel files. If a match was found in any of the complaint-related files, I had to remove the order from the final list. After all verifications, I extracted relevant details such as the customer's name and phone number and compiled them into a new file to be shared with the team.
                        To eliminate this inefficiency, I developed a Python script that automated the entire workflow. The script automatically reads the Excel files, applies necessary filters, performs lookups to exclude flagged order IDs, and extracts only the required data fields. It then generates a clean CSV file ready to be sent to the operations team. This automation not only reduced manual work and the chances of human error but also improved data accuracy and consistency across daily reports.`,
      bulletPoints: [
        "Automated multi-file Excel filtering and data extraction using Python",
        "Eliminated manual lookups across Complaints and Delay sheets",
        "Used pandas, numpy, and openpyxl for efficient processing",
        "Delivered final CSV file with cleaned and verified order data",
        "Enabled same-day SMS outreach by saving up to 28 minutes daily"
      ],
      date: "February 2025",
      toolsUsed: ["Python", "pandas", "numpy", "openpyxl", "Jupyter Notebook / VS Code"],
      results: "The automation significantly improved daily operations. The time taken for this task dropped from approximately 20–30 minutes to just 1–2 minutes. It removed the need for manual lookups, filtering, and copying data, thereby minimizing human errors and inconsistencies. The operations team could now receive the review data faster, enabling quicker communication with customers and improving workflow efficiency. This automation also laid the foundation for creating similar scripts for other repetitive tasks within the team."
    },

        {
      id: 4,
      title: "Facebook Ad Campaign RTO & ROI Optimization",
      slug: "facebook-ad-campaign-rto-roi-optimization",
      category: "Marketing Analytics | Root Cause Analysis | Ad Performance Optimization",
      shortDescription: "Analyzed Facebook ad campaigns to identify and eliminate high RTO contributors, resulting in reduced logistics costs and improved return on ad spend (ROAS) and overall marketing ROI.",
      fullDescription: `During my internship at The Design Cart, I conducted a Root Cause Analysis (RCA) of Facebook ad performance to identify which campaigns, ad sets, and ad names were driving the highest Return-to-Origin (RTO) rates. High RTOs led to increased logistics costs and poor delivery efficiency.
                        I used Power BI to build an interactive dashboard with monthly and 3-month comparisons, enabling the team to identify underperforming campaigns. Using Power Query for transformation and DAX for metric calculations, I provided clear visuals and KPIs that allowed the marketing and operations teams to take immediate action.
                        As a result, several inefficient campaigns were paused or adjusted. This led to a significant reduction in RTO and a measurable increase in marketing ROI, by ensuring ad spend went toward better-quality orders with higher fulfillment success.`,
      bulletPoints: [
        "Conducted RCA on Facebook ad campaigns to isolate high-RTO ad sets.",
        "Created Power BI dashboard with filters by ad name, set, and time period (monthly + 3-month).",
        "Used Power Query to clean and transform ad and delivery datasets.",
        "Used DAX to calculate RTO%, ROAS, and conversion metrics.",
        "Presented findings to marketing and operations teams to drive campaign decision.",
        "Supported strategy to pause/adjust high-RTO ads, boosting ROI."
      ],
      date: "February 2025",
      toolsUsed: ["Power BI", "DAX", "Power Query", "Facebook Ads Data (CSV/Excel)"],
      results: "The analysis and dashboard led to a reduction in RTO by approximately 4–5% by identifying and pausing underperforming Facebook ad campaigns that were driving low-quality or undeliverable orders. Additionally, by reallocating ad spend toward high-performing campaigns with better fulfillment success, the company saw a 12–15% improvement in marketing ROI during the following month. This project not only enhanced operational efficiency but also enabled the marketing team to make more informed, data-backed decisions, leading to increased profitability and customer satisfaction."
    }
  ];