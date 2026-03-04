export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialLink: string;
  imageUrl?: string;
  skills: string[];
}

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Google Data Analytics",
    issuer: "Google",
    date: "2021",
    description: "This course introduced me to the fundamentals of data analytics, including data collection, cleaning, analysis, and visualization. I learned how to work with tools such as Excel, SQL, and Tableau, and developed a strong understanding of the data analysis process using the Ask, Prepare, Process, Analyze, Share, and Act framework. Through hands-on projects, I practiced transforming raw data into actionable insights and creating dashboards to support data-driven decision-making. This course laid a strong foundation for my journey in data analytics.",
    credentialLink: "https://www.coursera.org/account/accomplishments/professional-cert/X4S5GJVZBYE9?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=sharing_cta&utm_product=prof",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["Data Analysis", "Data Cleaning", "Data Visualization", "Spreadsheet Software", "SQL", "Business Communication", "General Statistics", "Business Analysis"]
  },
  {
    id: 2,
    title: "Google Advanced Data Analytics",
    issuer: "Google",
    date: "2023",
    description: "This course provided in-depth training on advanced data analysis techniques using real-world tools and datasets. I gained hands-on experience in statistical analysis, data visualization, and machine learning concepts using Python, SQL, and data science libraries like Pandas, Scikit-learn, and Matplotlib. The course emphasized critical thinking, data-driven decision-making, and end-to-end project workflows—from data cleaning and exploration to model evaluation and insight communication. It helped sharpen my ability to solve complex business problems with data.",
    credentialLink: "https://www.coursera.org/account/accomplishments/professional-cert/PPBLPXE83AH8?utm_source=link&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=prof",
    imageUrl: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["Data Science", "Python", "Statistics", "Data Analysis", "Machine Learning", "Data Visualization"]
  },
  {
    id: 3,
    title: "The Structured Query Language",
    issuer: "University of Colorado Boulder",
    date: "2023",
    description: "In this course, I learned the core concepts of SQL used to manage and analyze data stored in relational databases. I practiced writing queries to retrieve, filter, sort, and aggregate data using commands like SELECT, WHERE, JOIN, GROUP BY, and ORDER BY. The course also covered subqueries, data manipulation with INSERT, UPDATE, and DELETE, as well as database design principles. This training strengthened my ability to work with large datasets and extract meaningful insights using SQL.",
    credentialLink: "https://coursera.org/share/8012cdaf4bf6f400f250fa35eecd1f95",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["SQL", "Database Querying", "Data Manipulation"]
  },
  {
    id: 4,
    title: "Zero to Hero in Microsoft Excel: Complete Excel Guide 2024",
    issuer: "Udemy",
    date: "2024",
    description: "This comprehensive course took me from beginner to advanced level in Microsoft Excel. I learned essential skills such as data entry, formatting, and basic formulas, then progressed to advanced functions including VLOOKUP, INDEX/MATCH, IF statements, data validation, pivot tables, and dynamic dashboards. The course also covered data cleaning techniques, automation using macros, and best practices for organizing and presenting data effectively. By the end, I was confident in using Excel for data analysis and business reporting tasks.",
    credentialLink: "https://www.udemy.com/certificate/UC-aeff1a93-cde0-41af-8315-af4ebff31b11/",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    skills: ["Microsoft Excel", "Data Analysis", "Spreadsheet Modeling"]
  }
];
