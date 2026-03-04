export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  imageUrl?: string;
  skills: string[];
  category: string;
  credentialLink?: string;
}

export const defaultCertificates: Certificate[] = [
  {
    id: 1,
    title: 'Google Data Analytics',
    issuer: 'Google',
    date: '2021',
    skills: [
      "Data Analysis",
      "Data Cleaning",
      "Data Visualization",
      "Spreadsheets",
      "SQL",
      "R",
      "Data-Driven Decision Making"
    ],
    category: 'Specialization',
    credentialLink: 'https://coursera.org/share/a28feb8c1fe7f8875c235bfdfb9c8f10',
    imageUrl: 'https://github.com/ZeyaMosharraf/zeyamosharraf.github.io/blob/main/Images/Certificate/Google%20Data%20Analytics.jpg?raw=true'
  },
  {
    id: 2,
    title: 'Google Advanced Data Analytics',
    issuer: 'Google',
    date: '2023',
    skills: [
      "Data Science",
      "Python",
      "Statistics",
      "Regression Analysis",
      "Machine Learning",
      "Data Visualization",
      "Predictive Modeling"
    ],
    category: 'Professional',
    credentialLink: 'https://coursera.org/share/d739582bfd61b66840b858675ee291b6',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Google%20Advanced%20Data%20Analytics.jpg'
  },
  {
    id: 3,
    title: 'The Structured Query Language',
    issuer: 'University of Colorado Boulder',
    date: '2023',
    skills: [
      "SQL",
      "Database Querying",
      "Data Manipulation",
      "Data Retrieval"
    ],
    category: 'Certificate',
    credentialLink: 'https://coursera.org/share/8012cdaf4bf6f400f250fa35eecd1f95',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/SQL%20Course.jpg'
  },
  {
    id: 4,
    title: 'Microsoft Excel',
    issuer: 'Udemy',
    date: '2024',
    skills: [
      "Microsoft Excel",
      "Data Analysis",
      "Spreadsheet Modeling",
      "Excel Formulas",
      "Data Visualization"
    ],
    category: 'Certificate',
    credentialLink: 'https://www.udemy.com/certificate/UC-aeff1a93-cde0-41af-8315-af4ebff31b11/',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Microsoft%20Excel.jpg'
  },
  {
    id: 5,
    title: 'Excel for Data Analysis',
    issuer: 'Microsoft',
    date: '2023',
    skills: [
      "Data Preparation",
      "Microsoft Excel",
      "Data Cleaning",
      "Spreadsheet Management",
      "Data Analysis"
    ],
    category: 'Certificate',
    credentialLink: 'https://coursera.org/share/3356449a5215f9fe0c9b1e4c1c4fb019',
    imageUrl: 'https://github.com/ZeyaMosharraf/zeyamosharraf.github.io/blob/main/Images/Certificate/Excel%20for%20Data%20Analysis.jpg?raw=true'
  },
  {
    id: 6,
    title: 'Exploring Data Transformation with Google Cloud',
    issuer: 'Google',
    date: '2023',
    skills: [
      "ETL",
      "Google Cloud",
      "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6413982',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Innovating%20with%20Data%20and%20Google%20Cloud.png'
  },
  {
    id: 7,
    title: 'Introduction to Large Language Models',
    issuer: 'Google',
    date: '2023',
    skills: [
      "LLM",
      "Google Cloud",
      "AI",
      "Machine Learning",
      "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6414875',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Introdution%20to%20Large%20Language%20Models.png'
  },
  {
    id: 8,
    title: 'Introduction to Generative AI',
    issuer: 'Google',
    date: '2023',
    skills: [
      "Generative AI",
      "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/6452259',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Introduction%20to%20Generative%20AI.png'
  },
  {
    id: 9,
    title: 'Set Up an App Dev Environment',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Cloud Functions",
      "Cloud Storage",
      "IAM",
      "Monitoring",
      "Pub/sub"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8129633',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Perform%20Foundational%20Infrastructure%20Task%20in%20Google%20cloud.png'
  },
  {
    id: 10,
    title: 'Store, Process, and Manage Data',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Cloud Functions",
      "Cloud Storage",
      "Image Processing",
      "Google Cloud Compute",
      "Pub/sub"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8154516',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Store%2C%20Process%2C%20and%20Manage%20Data%20-%20Console.png'
  },
  {
    id: 11,
    title: 'The Basics of Google Cloud Compute',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Compute Engine",
      "Virtual Machines",
      "Web Servers",
      "Persistent Disks"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8166722',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/The%20basic%20of%20Google%20Cloud%20Compute.png'
  },
  {
    id: 12,
    title: 'Insights from Data with BigQuery',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Google Cloud",
      "Big Query",
      "Data Cleaning",
      "Data Analysis"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8180435',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Insights%20from%20Data%20with%20BigQuery.png'
  },
  {
    id: 13,
    title: 'Perform Foundational Data, ML, and AI Tasks',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Google Cloud",
      "Machine Learning",
      "AI",
      "Data Management"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8224691',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Perform%20Foundational%20Data%2C%20ML%2C%20And%20AI%20Task%20in%20Google%20Cloud.png'
  },
  {
    id: 14,
    title: 'Build Infrastructure with Terraform',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Google Cloud Platform (GCP)",
      "Infrastructure as Code (IaC)",
      "Terraform"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8475299',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20Infrastructure%20with%20Terraform%20on%20Google%20Cloud.png'
  },
  {
    id: 15,
    title: 'Build a Website on Google Cloud',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Cloud Run",
      "Compute Engine",
      "Cloud Build",
      "GKE",
      "Microservice Architecture"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8475032',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20a%20Website%20on%20Google%20Cloud.png'
  },
  {
    id: 16,
    title: 'Build a Data Warehouse with BigQuery',
    issuer: 'Google',
    date: '2024',
    skills: [
      "BigQuery",
      "Data Ingestion",
      "Data Model",
      "Data Warehouse"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8479233',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Build%20a%20Website%20on%20Google%20Cloud.png'
  },
  {
    id: 17,
    title: 'Create ML Models with BigQuery ML',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Dialogflow",
      "BigQuery ML",
      "Forecasting",
      "Machine Learning"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8479270',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Create%20ML%20Models%20with%20BigQuery%20ML.png'
  },
  {
    id: 18,
    title: 'Detect Manufacturing Defects using Visual Inspection AI',
    issuer: 'Google',
    date: '2024',
    skills: [
      "Machine Learning",
      "ML Models",
      "Visual Inspection AI"
    ],
    category: 'Skill Badge',
    credentialLink: 'https://www.cloudskillsboost.google/public_profiles/6a77b5e7-559f-44eb-b078-954bf5d4e3b0/badges/8494930',
    imageUrl: 'https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Certificate/Detect%20Manufacturing%20Defects%20using%20Visual%20Inspection%20AI.png'
  }
];
