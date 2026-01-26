import React from "react";

// Certificate type definition
type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialLink: string;
  category: "course" | "achievement" | "experience" | "extracurricular";
  imageUrl?: string;
  pdfUrl?: string;
  skills: string[];
  duration?: string;
  slug: string;
};

  // Course
export  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Google Data Analytics",
      slug: "google-data-analytics",
      issuer: "Coursera",
      date: "Sep 2022",
      description: "This course introduced me to the fundamentals of data analytics, including data collection, cleaning, analysis, and visualization. I learned how to work with tools such as Excel, SQL, and Tableau, and developed a strong understanding of the data analysis process using the Ask, Prepare, Process, Analyze, Share, and Act framework. Through hands-on projects, I practiced transforming raw data into actionable insights and creating dashboards to support data-driven decision-making. This course laid a strong foundation for my journey in data analytics.",
      credentialLink: "https://www.coursera.org/account/accomplishments/professional-cert/X4S5GJVZBYE9?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
      category: "course",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      skills: ["Spreadsheet Software", "Data Management", "Data Analysis", "Business Communication", "General Statistics", "Business Analysis", "Data Visualization", "SQL"],
      duration: "24 weeks"
    },
    {
      id: 2,
      title: "The Structured Query Language (SQL)",
      slug: "sql",
      issuer: "Coursera",
      date: "Mar 2023",
      description: "In this course, I learned the core concepts of SQL used to manage and analyze data stored in relational databases. I practiced writing queries to retrieve, filter, sort, and aggregate data using commands like SELECT, WHERE, JOIN, GROUP BY, and ORDER BY. The course also covered subqueries, data manipulation with INSERT, UPDATE, and DELETE, as well as database design principles. This training strengthened my ability to work with large datasets and extract meaningful insights using SQL.",
      credentialLink: "https://coursera.org/share/8012cdaf4bf6f400f250fa35eecd1f95",
      category: "course",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",

      skills: ["Databases", "Critical Thinking", "Data Analysis", "Data Management", "Data Science", "SQL (Structured Query Language)", "Database (DBMS)"],
      duration: "27 hours"
    },
    {
      id: 3,
      title: "Google Advanced Data Analytics",
      slug: "google-advanced-data-analytics",
      issuer: "Coursera",
      date: "Apr 2023",
      description: "This course provided in-depth training on advanced data analysis techniques using real-world tools and datasets. I gained hands-on experience in statistical analysis, data visualization, and machine learning concepts using Python, SQL, and data science libraries like Pandas, Scikit-learn, and Matplotlib. The course emphasized critical thinking, data-driven decision-making, and end-to-end project workflows—from data cleaning and exploration to model evaluation and insight communication. It helped sharpen my ability to solve complex business problems with data.",
      credentialLink: "https://www.coursera.org/account/accomplishments/professional-cert/PPBLPXE83AH8?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=prof",
      category: "course",
      imageUrl: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",

      skills: ["Predictive Modelling", "Kaggle", "Data Analysis", "Data Science", "Exploratory Data Analysis (EDA)", "Jupyter Notebook", "Data Visualization", "Tableau Software","Statistical Analysis", "Machine Learning", "Regression Models", "Python Programming"],
      duration: "10 weeks"
    },
    {
      id: 4,
      title: "Preparing Data for Analysis with Microsoft Excel",
      slug: "preparing-data-for-analysis-with-microsoft-excel",
      issuer: "Coursera",
      date: "Nov 2023",
      description: "In this course, I learned how to clean, structure, and organize raw data using Excel to make it ready for analysis. I developed skills in identifying and handling missing or duplicate values, using filters and sorting tools, applying basic and advanced formulas, and converting unstructured data into tabular formats. The course also covered techniques such as data validation, text-to-columns, and conditional formatting to improve data quality and accuracy. This training strengthened my ability to prepare datasets for meaningful insights and decision-making.",
      credentialLink: "https://www.coursera.org/account/accomplishments/verify/9U69JRA5JFE5?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=course",
      category: "course",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",

      skills: ["Data Analysis", "formulas and functions", "Preparing Data", "power bi", "Microsoft Excel"],
      duration: "19 hours"
    },
    {
      id: 5,
      title: "Zero to Hero in Microsoft Excel",
      slug: "zero-to-hero-in-microsoft-excel",
      issuer: "Udemy",
      date: "Aug 2024",
      description: "This comprehensive course took me from beginner to advanced level in Microsoft Excel. I learned essential skills such as data entry, formatting, and basic formulas, then progressed to advanced functions including VLOOKUP, INDEX/MATCH, IF statements, data validation, pivot tables, and dynamic dashboards. The course also covered data cleaning techniques, automation using macros, and best practices for organizing and presenting data effectively. By the end, I was confident in using Excel for data analysis and business reporting tasks.",
      credentialLink: "https://www.udemy.com/certificate/UC-aeff1a93-cde0-41af-8315-af4ebff31b11/",
      category: "course",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",

      skills: ["Microsoft Excel", "Excel Charts", "Spreadsheets", "Formulas", "Shortcuts", "Macros", "Tips-Tricks"],
      duration: "9.5 hours"
    },
    // Achievement
    {
      id: 20,
      title: "Storyteller Badge Recipient — DataDNA April 2024 Challenge",
      slug: "storyteller-badge-recipient-data-dna-april-2024-challenge",
      issuer: "OnyxData",
      date: "Apr 2024",
      description: "In April 2024, I was awarded the Storyteller Badge by OnyxData in the DataDNA Challenge for my IMDB Movie Analytics project. This recognition highlights my ability to communicate complex data insights effectively through compelling storytelling and visual design. The project involved analyzing a dataset of over 246,000 movies to uncover trends in genres, revenue, budget, and production house performance. Using Power BI, I conducted data cleaning with Power Query, built a strong data model, and created an interactive dashboard with drill-through features to help users explore trends by year, genre, and production company. The final dashboard revealed insights such as the dominance of Drama and Comedy genres, $728B in revenue across the dataset, and top-performing studios like Walt Disney and Warner Bros. This project not only showcased my technical skills in Power BI, DAX, and data modeling but also demonstrated my strength in data storytelling—a key reason for receiving the badge.",
      credentialLink: "#",
      category: "achievement",
      imageUrl: "https://images.unsplash.com/photo-1546707012-c46675f12716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      skills: ["Power Query", "Data Cleaning", "Data Transformation", "Data Modeling", "DAX", "Dashboard Design", "Trend Analysis", "Feature Engineering", "Visualization", "Power BI", "Revenue Analysis", "Budget Trends", "Storytelling with Data", "Interactive Dashboards", "Drill-Through Features"]
    },

    // Experience
  {
      id: 56,
      title: "Freelancer Power BI Consultant",
      slug: "freelancer-power-bi-consultant",
      issuer: "OneMetric (formerly Growtomation)",
      date: "Jul 2025 - Aug 2025",
      description: "As a freelance consultant, I independently designed and deployed custom Power BI dashboards by integrating Google Sheets and My Hours task logs to deliver actionable business insights. I created interactive reports using advanced DAX, slicers, filters, and conditional formatting to promote data self-exploration. I also built automation scripts that streamlined data refresh processes, reducing reporting time from hours to minutes. Collaborating with stakeholders, I aligned analytics solutions with strategic KPIs (revenue, productivity, marketing performance) and delivered self-service analytics training, demonstrating the ability to manage end-to-end BI projects from raw data to executive-ready reports.",
      credentialLink: "#",
      category: "experience",
      imageUrl: "https://images.unsplash.com/photo-1551288258-293c04207908?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      skills: ["Power BI", "DAX", "Google Sheets", "Data Visualization", "Automation", "Stakeholder Collaboration", "Self-Service Analytics"]
    }, 
    {
      id: 57,
      title: "SQL Developer Intern / Database Consultant",
      slug: "sql-developer-intern-database-consultant",
      issuer: "Nirjai Technologies",
      date: "Mar 2025 - Apr 2025",
      description: "As an SQL Developer Intern at Nirjai Technologies, I am responsible for managing and optimizing database systems related to pathology lab data workflows. I design robust SQL queries and contribute to solving real-time business problems through efficient database solutions and reporting systems. The internship involves regular participation in daily and weekend planning meetings, allowing me to adapt to the dynamic, fast-paced startup environment. This role has enhanced my ability to deliver under pressure while supporting the company's core data infrastructure.",
      credentialLink: "#",
      category: "experience",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
      skills: ["SQL", "MySQL", "PostgreSQL", "Database Management", "Problem Solving", "Reporting", "Data Workflow Design", "Startup Adaptability", "Team Collaboration"]
    },
    {
      id: 58,
      title: "Data Analytics & Operations Intern",
      slug: "data-analytics-operations-intern",
      issuer: "The Design Cart",
      date: "Nov 2024 – Feb 2025",
      description: "Led data-driven initiatives to improve operational efficiency and business insights. Utilized Power BI to develop interactive dashboards tracking real-time KPIs. Automated daily reporting tasks using Python, significantly reducing manual effort. Leveraged SQL, Excel, and Google Sheets to clean, analyze, and visualize large datasets from platforms like Shopify, Facebook Ads, and Google Ads, enabling informed marketing and business decisions. Collaborated across departments to streamline Return-to-Origin (RTO) processes and identified cost-saving opportunities through financial and operational analysis.",
      credentialLink: "#",
      category: "experience",
      imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",

      skills: ["SQL", "Microsoft Excel", "Spreadsheets", "Microsoft Power BI", "Python", "Data Workflow Optimization", "Marketing Performance Analysis", "Financial Analysis", "Operational Efficiency", "Cross-functional Collaboration", "Report Automation"]
    },
  {
    id: 59,
    title: "Associate Data Analyst",
    slug: "associate-data-analyst",
    issuer: "OneMetric (formerly Growtomation)",
    date: "Aug 2025 – Present",
    description: "At OneMetric, I designed and deployed end-to-end enterprise-grade data solutions, including automated ETL pipelines and robust data models, boosting reporting efficiency by 30%. I managed the complete Power BI development lifecycle (requirement gathering, data modeling, DAX optimization, and publishing), creating executive dashboards for Finance, Marketing, and Operations. I automated reporting workflows using SQL, Python, and Google Sheets, significantly reducing manual effort. Furthermore, I ensured 100% data accuracy through quality checks and partnered with cross-functional teams to translate business needs into actionable analytics, enabling faster, data-driven decisions. I also led automation initiatives by building scalable dashboards serving 10,000+ daily records with minimal maintenance.",
    credentialLink: "#",
    category: "experience",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["ETL Pipelines", "Data Modeling", "Power BI", "DAX", "SQL", "Python", "Google Sheets", "Data Quality", "Business Analysis", "Automation"]
  },

  // extracurricular
    {
      id: 60,
      title: "Event Coordinator – Chembola Event",
      slug: "event-coordinator-chembola-event",
      issuer: "Deshbandhu College",
      date: "Apr 2021",
      description: "In April 2021, I contributed as a volunteer event coordinator for Chembola, an event organized by the Chemical Society of Deshbandhu College. My responsibilities included supporting the planning, logistics, and on-ground coordination on the day of the event. This hands-on experience enabled me to work as part of a team, handle responsibilities under time constraints, and ensure a successful and engaging experience for all participants. It was a valuable opportunity to build my teamwork, communication, and organizational skills in a real-world event setting.",
      credentialLink: "#",
      category: "extracurricular",
      imageUrl: "https://images.unsplash.com/photo-1581093588401-05c1e117f709",
      skills: ["Event Coordination", "Team Collaboration", "Time Management", "Communication Skills", "Organizational Skills", "Volunteer Experience"]
    },
    {
      id: 61,
      title: "Student Coordinator – National Science Day Event",
      slug: "student-coordinator-national-science-day-event",
      issuer: "Deshbandhu College",
      date: "Apr 2022",
      description: "In April 2022, I served as the Student Coordinator for the National Science Day Event at Deshbandhu College, where I played a key role in the creative and operational aspects of the program. I was recognized for designing visually impactful posters that effectively promoted the event and increased student engagement. I also led social media promotion efforts, which helped surpass expected attendance levels. Through efficient planning and coordination, the event was executed smoothly, earning me a Certificate of Recognition for excellence in both creative design and event organization. This experience highlighted my skills in creativity, communication, and event promotion.",
      credentialLink: "#",
      category: "extracurricular",
      imageUrl: "https://images.unsplash.com/photo-1581093588401-05c1e117f709",
      skills: ["Poster Design", "Event Coordination", "Creativity", "Communication Skills", "Social Media Promotion", "Team Collaboration", "Planning", "Marketing"]
    },
    {
      id: 62,
      title: "Coordinator for Chemistry Events",
      slug: "coordinator-for-chemistry-events",
      issuer: "Deshbandhu College",
      date: "Apr 2023",
      description: "In April 2023, I served as the Coordinator for Chemistry Events at Deshbandhu College, where I led the planning and execution of departmental activities. This role allowed me to apply and strengthen my project management, team collaboration, and problem-solving skills. Working closely with peers and faculty, I ensured that events ran smoothly, addressing challenges as they arose with quick thinking and adaptability. The experience enhanced my ability to communicate effectively, manage multiple responsibilities, and contribute meaningfully to a team—skills that are valuable both in academic and professional environments.",
      credentialLink: "#",
      category: "extracurricular",
      imageUrl: "https://images.unsplash.com/photo-1581093588401-05c1e117f709",
      skills: ["Project Management", "Team Collaboration", "Problem Solving", "Event Coordination", "Communication Skills", "Adaptability", "Time Management", "Leadership"]
    }
  ];