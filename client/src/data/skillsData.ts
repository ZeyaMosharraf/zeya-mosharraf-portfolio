export interface Skill {
  name: string;
  percentage: number;
}

export const programmingSkills: Skill[] = [
  {
    name: "Python (Pandas, NumPy, Scikit-learn)",
    percentage: 70
  },
  {
    name: "SQL",
    percentage: 85
  },
  {
    name: "Excel (Advanced)",
    percentage: 95
  },
    {
    name: "Spread Sheet",
    percentage: 70
  }
];

export const visualizationSkills: Skill[] = [
  {
    name: "Power BI",
    percentage: 95
  },
  {
    name: "Tableau",
    percentage: 90
  },
  {
    name: "Looker Studio",
    percentage: 85
  },
  {
    name: "Matplotlib/Seaborn",
    percentage: 80
  }
];

export const additionalSkills: string[] = [
  "Power BI Dashboard Development",
  "Tableau Data Visualization",
  "Google Data Studio Reporting",
  "Data Storytelling",
  "Statistical Analysis",
  "Machine Learning",
  "Data Cleaning",
  "ETL Processes",
  "Database Management",
  "Data Modeling",
  "A/B Testing",
  "Regression Analysis",
  "Git/Version Control"
];
