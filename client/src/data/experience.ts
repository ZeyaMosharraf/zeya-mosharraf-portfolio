export interface Experience {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
  skills: string[];
  slug: string;
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Associate Data Analyst",
    slug: "associate-data-analyst",
    issuer: "OneMetric (formerly Growtomation)",
    date: "Aug 2025 – Present",
    description: "At OneMetric, I designed and deployed end-to-end enterprise-grade data solutions, including automated ETL pipelines and robust data models, boosting reporting efficiency by 30%. I managed the complete Power BI development lifecycle (requirement gathering, data modeling, DAX optimization, and publishing), creating executive dashboards for Finance, Marketing, and Operations. I automated reporting workflows using SQL, Python, and Google Sheets, significantly reducing manual effort. Furthermore, I ensured 100% data accuracy through quality checks and partnered with cross-functional teams to translate business needs into actionable analytics, enabling faster, data-driven decisions. I also led automation initiatives by building scalable dashboards serving 10,000+ daily records with minimal maintenance.",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["ETL Pipelines", "Data Modeling", "Power BI", "DAX", "SQL", "Python", "Google Sheets", "Data Quality", "Business Analysis", "Automation"],
  },
  {
    id: 2,
    title: "Freelancer Power BI Consultant",
    slug: "freelancer-power-bi-consultant",
    issuer: "OneMetric (formerly Growtomation)",
    date: "Jul 2025 - Aug 2025",
    description: "As a freelance consultant, I independently designed and deployed custom Power BI dashboards by integrating Google Sheets and My Hours task logs to deliver actionable business insights. I created interactive reports using advanced DAX, slicers, filters, and conditional formatting to promote data self-exploration. I also built automation scripts that streamlined data refresh processes, reducing reporting time from hours to minutes. Collaborating with stakeholders, I aligned analytics solutions with strategic KPIs (revenue, productivity, marketing performance) and delivered self-service analytics training, demonstrating the ability to manage end-to-end BI projects from raw data to executive-ready reports.",
    imageUrl: "https://images.unsplash.com/photo-1551288258-293c04207908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["Power BI", "DAX", "Google Sheets", "Data Visualization", "Automation", "Stakeholder Collaboration", "Self-Service Analytics"],
  },
  {
    id: 3,
    title: "SQL Developer Intern / Database Consultant",
    slug: "sql-developer-intern-database-consultant",
    issuer: "Nirjai Technologies",
    date: "Mar 2025 - Apr 2025",
    description: "As an SQL Developer Intern at Nirjai Technologies, I am responsible for managing and optimizing database systems related to pathology lab data workflows. I design robust SQL queries and contribute to solving real-time business problems through efficient database solutions and reporting systems. The internship involves regular participation in daily and weekend planning meetings, allowing me to adapt to the dynamic, fast-paced startup environment. This role has enhanced my ability to deliver under pressure while supporting the company's core data infrastructure.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["SQL", "MySQL", "PostgreSQL", "Database Management", "Problem Solving", "Reporting", "Data Workflow Design", "Startup Adaptability", "Team Collaboration"],
  },
  {
    id: 4,
    title: "Data Analytics & Operations Intern",
    slug: "data-analytics-operations-intern",
    issuer: "The Design Cart",
    date: "Nov 2024 – Feb 2025",
    description: "Led data-driven initiatives to improve operational efficiency and business insights. Utilized Power BI to develop interactive dashboards tracking real-time KPIs. Automated daily reporting tasks using Python, significantly reducing manual effort. Leveraged SQL, Excel, and Google Sheets to clean, analyze, and visualize large datasets from platforms like Shopify, Facebook Ads, and Google Ads, enabling informed marketing and business decisions. Collaborated across departments to streamline Return-to-Origin (RTO) processes and identified cost-saving opportunities through financial and operational analysis.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["SQL", "Microsoft Excel", "Spreadsheets", "Microsoft Power BI", "Python", "Data Workflow Optimization", "Marketing Performance Analysis", "Financial Analysis", "Operational Efficiency", "Cross-functional Collaboration", "Report Automation"],
  },
];
