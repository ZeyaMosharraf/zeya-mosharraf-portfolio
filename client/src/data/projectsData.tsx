import React from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  tag: string;
  tagColor: string;
  category:
    | "SQL"
    | "Python"
    | "Machine Learning"
    | "Power BI"
    | "Excel"
    | "Tableau"
    | "Looker Studio";
  githubUrl: string;
  methodology: string;
  resultsAndImpact: string;
  skills: string[];
  tools: string[];
  powerBiEmbedUrl?: string;
  imageUrl?: string;
  lookerstudioEmbedUrl?: string;
  tableauEmbedUrl?: string;
  excelDashboardUrl?: string;
  thumbhnailUrl: string;
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Promotion Analysis Dashboard",
    slug: "promotion-analysis-dashboard",
    description:
      "Atliq Mart, a major retail chain with over 50 stores across southern India, conducted a large-scale promotion during Diwali 2023 and Sankranti 2024. The goal of this project was to assess the effectiveness of these festive promotions and uncover actionable insights to optimize future marketing strategies. By integrating complex SQL queries and Power BI visualizations, the project provided a comprehensive analysis of store performance, promotion types, and product-category impact, ultimately supporting data-driven decision-making for Atliq Mart.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl:
      "https://github.com/ZeyaMosharraf/Promotion-Analysis-for-Atliq-Mart",
    methodology: `• Extracted and analyzed business-critical data using advanced SQL queries to ensure accuracy and reliability.
                   • Developed interactive Power BI dashboards by integrating multiple datasets, highlighting store performance, promotion impact, and product responsiveness.
                   • Maintained consistent and clean data across platforms to support dependable and data-driven decision-making.
                   • Created intuitive visualizations and KPIs to identify high-performing cities, successful promotions, and top-selling products, providing insights into pricing and operational strategies.`,
    resultsAndImpact: `• Bengaluru and Chennai were the top performers in Incremental Sold Units and Revenue, followed by Hyderabad, Coimbatore, and Mysuru.
                       • BOGOF (Buy One Get One Free) and 500 cashback promotions significantly outperformed discount-based offers in driving sales.
                       • Grocery & Staples and Home Appliances showed the most substantial promotional lift, with standout products like Atliq Waterproof Immersion Red and Atliq High Glo 15W LED Bulb.
                       • Achieved a 211.3% increase in Incremental Sold Units and 110% increase in Incremental Revenue.
                       • Insights supported city-specific strategies, product-level prioritization, and promotion refinement, benefiting Atliq Mart’s 50+ store operations.`,
    skills: [
      "Data Integration",
      "SQL Querying",
      "Data Visualization",
      "Insight Generation",
    ],
    tools: ["MYSQL", "Power BI"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiMjYzODk0MmItNzM3ZC00M2U0LTljYjctYmMyMTRiNjEyOWIyIiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9&pageName=58244039dbcbb3a3e038`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/Promotion%20Analysis.jpg",
  },
  {
    id: 2,
    title: "Mitron Bank Dashboard",
    slug: "mitron-bank-dashboard",
    description:
      "Mitron Bank, a prominent financial institution, explored launching a new line of credit cards to expand market presence. As part of a pilot project, a dataset of 4,000 customers was analyzed to uncover spending trends, segment behaviors, and city-wise performance. The project aimed to deliver data-driven recommendations for card features and targeted strategies. Using Power BI and DAX, a dynamic dashboard was developed to present the insights, which played a key role in influencing strategic decisions at the bank.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl: "https://github.com/ZeyaMosharraf/Mitron_bank",
    methodology: `• Analyzed demographic, income, and spending data to discover key patterns and behaviors among different customer types.
                   • Identified customer segments using visual analytics and data breakdowns by profession, marital status, and spending category.
                   • Used DAX formulas in Power BI to calculate income utilization, spending distributions, and KPIs across cities, age groups, and segments.
                   • Performed city-wise and age-wise comparisons to tailor recommendations for regional and demographic targeting.
                   • Presented findings in a user-friendly Power BI dashboard and summarized recommendations in a concise presentation for stakeholders.`,
    resultsAndImpact: ` • Identified 4 customer segments: Salaried IT, Other Salaried, Freelancers, and Business Owners.
                        • Mumbai emerged as the most valuable city in terms of engagement and income utilization.
                        • High-spending categories included Bills, Groceries, and Electronics, ideal for targeted credit card rewards.
                        • Married individuals and the 25–34 age group showed the highest engagement, ideal for family-focused offerings.
                        • Recommended features included travel benefits, digital wallet integration, bonus rewards, flexible limits, and security enhancements.
                        • Helped secure the project for AtliQ Data Services by delivering strategic, data-driven insights to Mitron Bank’s leadership.`,
    skills: [
      "Customer Segmentation",
      "Dashboard Design",
      "Insight Generation",
      "Presentation & Reporting",
    ],
    tools: ["Power BI (DAX)", "Microsoft PowerPoint"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiMWE0ZDVjODUtYzUzZi00ODljLTk1M2EtZDEyMWU0YzQzMzdhIiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9&pageName=ReportSection312009cc99025113c047`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/Mitron%20Bank.jpg",
  },

  {
    id: 3,
    title: "Beauty Insights",
    slug: "beauty-insights",
    description:
      "Designed a Power BI dashboard for a global skincare e-store to analyze sales trends, profit margins, and customer behavior. Delivered insights that supported growth, marketing, and product expansion strategies.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl: "https://github.com/ZeyaMosharraf/Beauty_Insights",
    methodology: `• Integrated and cleaned data across customers, markets, products, and discounts.
                   • Segmented data by region, product category, and customer segment.
                   • Used DAX for computing YOY growth, profit margins, and discount impact.
                   • Built interactive dashboards with filters and slicers to explore KPIs, sales trends, and customer behavior.
                   • Enabled real-time tracking and actionable decision-making insights for business stakeholders.`,
    resultsAndImpact: ` • Achieved 50.58% YOY sales growth and 19.14% average profit margin, exceeding the target of 15%.
                        • United States generated $1.07M in profit; Germany and China also performed strongly.
                        • Consumer segment accounted for 52.93% of total sales; Corporate segment contributed 31.06% of total profit.
                        • High-value customers like LS-172001402 highlighted the potential for customer-focused strategies.
                        • Recommended regional promotions, product line expansion, and loyalty programs to boost engagement and growth.`,
    skills: [
      "Sales & Market Analysis",
      "Customer Segmentation",
      "Profitability Tracking",
      "KPI Monitoring",
    ],
    tools: ["Power BI (DAX)", "Excel"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiMDNjNWFkZjAtNmYzMy00OGViLTgyMGEtYWFlODJlZjNiMDZkIiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9`,
    thumbhnailUrl:     "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/Beauty%20analysis.jpg",
  },
  {
    id: 4,
    title: "HR Dashboard",
    slug: "hr-dashboard",
    description:
      "This project focused on analyzing human resource data to gain actionable insights into employee distribution, compensation, turnover, retention, and departmental trends. The goal was to help HR leadership make data-driven decisions regarding employee management and workforce planning.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl: "https://github.com/ZeyaMosharraf/Human_resources",
    methodology: `• Collected and explored structured HR data related to employee demographics, salary, bonuses, and departmental roles.
                   • Cleaned and transformed data to ensure consistency and usability for visualization.
                   • Built interactive dashboards to track KPIs such as total employees, salary trends, bonus distribution, retention/turnover rates, and gender-wise employee ratios.
                   • Performed segmented analysis by business unit, year, department, and job title to derive deeper insights.`,
    resultsAndImpact: ` • Identified that the average salary across departments was $113K, with the highest being in Marketing and Vice President roles.
                        • Highlighted bonus trends, with Corporate receiving the highest average bonus ($19K).
                        • Turnover rates were slightly higher for male employees (9.5%) compared to females (7.5%).
                        • Business units like Speciality Products had higher retention (93.21%), aiding in targeted employee engagement strategies.
                        • Created a dynamic HR dashboard to allow stakeholders to filter insights by year, department, gender, and more—empowering the HR team to make informed, strategic decisions.`,
    skills: [
      "Data Cleaning",
      "Data Analysis",
      "Dashboard Development",
      "KPI Tracking",
      "Insight Generation",
    ],
    tools: ["Microsoft Power BI", "Data Modeling", "DAX"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiYTQwOWJhOWItYjA2NC00YzZiLTk5NjktNmRlZTIxMzVjY2EyIiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9&pageName=ReportSection0d436829096ca5dc282e`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/Hr%20Analysis.jpg",
  },
  {
    id: 5,
    title: "IMDB Insight",
    slug: "imdb-insight",
    description:
      "This project focused on analyzing a comprehensive dataset from IMDB to uncover insights related to movie genres, revenue, budget trends, popularity, and production house performance. The goal was to create an interactive dashboard that supports data-driven decisions in the entertainment industry.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl: "https://github.com/ZeyaMosharraf/IMDB_Insight",
    methodology: ` • Conducted data cleaning and transformation using Power Query in Power BI to handle inconsistencies, null values, and prepare data for analysis.
                    • Performed data modeling to define relationships between key fields such as year, genre, production house, and financial metrics.
                    • Created interactive visualizations to analyze trends in revenue and budget over time, genre popularity, and vote count distributions.
                    • Enabled drill-through capabilities to examine top-performing movies and studios over various time periods.`,
    resultsAndImpact: ` • Analyzed a total of 246K movies, revealing $728B in revenue and $283B in budgets across the dataset.
                        • Identified Drama and Comedy as the most prevalent genres, while highlighting the top 10 trending movies by popularity and votes.
                        • Discovered that companies like Walt Disney, Universal Pictures, and Warner Bros. consistently produced high-grossing content.
                        • Delivered a user-friendly dashboard that empowers users to explore trends by year, genre, and production company with just a few clicks.`,
    skills: [
      "Data Cleaning (Power Query)",
      "Data Modeling",
      "DAX, Dashboard Design",
      "Trend Analysis",
    ],
    tools: ["Power Query", "Data Model", "DAX", "Visualization"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiYTFkZTRlM2QtZjcyZS00OTAwLWFlMmQtNmU2ZGUwYTE3MzI5IiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/IMDB%20Analysis.jpg",
  },

  {
    id: 6,
    title: "Growth Analysis Telangana",
    slug: "growth-analysis-telangana",
    description:
      "Designed a Power BI dashboard for a global skincare e-store to analyze sales trends, profit margins, and customer behavior. Delivered insights that supported growth, marketing, and product expansion strategies.",
    tag: "Power BI",
    tagColor: "bg-green-100 text-green-700",
    category: "Power BI",
    githubUrl: "https://github.com/ZeyaMosharraf/Growth-Analysis-Telangana",
    methodology: `• Integrated and cleaned data across customers, markets, products, and discounts.
                   • Segmented data by region, product category, and customer segment.
                   • Used DAX for computing YOY growth, profit margins, and discount impact.
                   • Built interactive dashboards with filters and slicers to explore KPIs, sales trends, and customer behavior.
                   • Enabled real-time tracking and actionable decision-making insights for business stakeholders.`,
    resultsAndImpact: ` • Achieved 50.58% YOY sales growth and 19.14% average profit margin, exceeding the target of 15%.
                        • United States generated $1.07M in profit; Germany and China also performed strongly.
                        • Consumer segment accounted for 52.93% of total sales; Corporate segment contributed 31.06% of total profit.
                        • High-value customers like LS-172001402 highlighted the potential for customer-focused strategies.
                        • Recommended regional promotions, product line expansion, and loyalty programs to boost engagement and growth.`,
    skills: [
      "Sales & Market Analysis",
      "Customer Segmentation",
      "Profitability Tracking",
      "KPI Monitoring",
    ],
    tools: ["Power BI (DAX)", "Excel"],
    powerBiEmbedUrl: `https://app.powerbi.com/view?r=eyJrIjoiMzRlOTQxYzAtNDIyOS00YzFkLWE5ZmMtYjI2M2UyODUwMTU5IiwidCI6ImJhZTllNjhmLWIzZWQtNGQzZC05NjViLTJjMGE5Y2RjZWJjZCJ9`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Power%20BI/Thumbnail/Telangana%20Analysis.jpg",
  },

  // SQL Projects
  {
    id: 7,
    title: "Restaurant Analysis",
    slug: "restaurant-analysis",
    description:
      "The Taste of the World Cafe launched a new menu at the beginning of 2023, featuring diverse cuisine options including American, Italian, Mexican, and Asian dishes. As a newly hired Data Analyst, my goal was to evaluate customer response to this new menu by analyzing both the menu data and order history. This analysis aims to identify top-performing dishes, underperforming items, and customer preferences to inform future menu and marketing decisions.",
    tag: "SQL",
    tagColor: "bg-yellow-100 text-yellow-700",
    category: "SQL",
    githubUrl: "https://github.com/ZeyaMosharraf/Restaurant-Order-Analysis",
    methodology: ` • Explored the menu_items table containing 32 unique items across 4 cuisines.
                    • Analyzed the order_details table with 5,370 total orders and 12,234 items ordered.
                    • Used SQL joins to combine both tables for performance insights.
                    • Identified most and least ordered items based on order frequency.
                    • Analyzed the top 5 highest-spend orders and the breakdown of cuisine categories.`,
    resultsAndImpact: ` • Hamburger (American) was the most ordered item with 622 orders.
                        • Chicken Tacos (Mexican) was the least ordered with 123 orders.
                        • Highest spend order totaled $192.15 and included 14 items.
                        • Top 5 high-spend orders included 26 Italian, 17 Asian, 16 Mexican, and 10 American items.
                        • Italian dishes had the highest average price at $16.75 and were featured most in premium orders.
                        • Helped identify menu strengths and weaknesses to support future promotions and pricing decisions.`,
    skills: [
      "SQL (Structured Query Language)",
      "Data Analysis and Aggregation",
      "Pattern Recognition",
      "Business Insight Development",
      "Query Optimization",
    ],
    tools: ["SQL (language)", "MySQL Workbench (query execution and analysis)"],
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/Restaurant%20Order%20Analysis.jpg",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/SQL/Thumbhnail/Restaurant%20Analysis.jpg",
  },

  {
    id: 8,
    title: "Medical Analysis",
    slug: "medical-analysis",
    description:
      "Analyzed multiple healthcare datasets to uncover trends in hospitalization, medical checkups, and patient profiling with the goal of improving healthcare decision-making and resource allocation.",
    tag: "SQL",
    tagColor: "bg-yellow-100 text-yellow-700",
    category: "SQL",
    githubUrl: "https://github.com/ZeyaMosharraf/Medical_dataset_analysis",
    methodology: ` • Loaded and cleaned data from three sources: hospitalisation_details, medical_examinations, and names.
                    • Handled null values, standardized column formats, and ensured data consistency using Python.
                    • Imported cleaned datasets into MySQL for advanced querying.
                    • Used SQL to analyze hospitalization frequency, common diagnoses, and patient demographics.
                    • Combined datasets using joins to derive multi-dimensional insights`,
    resultsAndImpact: ` • Processed and cleaned over 4,000 rows of patient and medical data.
                        • Identified top 5 most common causes of hospitalization.
                        • Found correlation between BMI and length of hospital stay.
                        • Discovered that patients aged 45–60 had the highest hospitalization rate.
                        • Helped derive actionable insights to support hospital resource planning and patient care improvements.`,
    skills: [
      "Data Cleaning & Preparation",
      "SQL Querying & Joins",
      "Exploratory Data Analysis (EDA)",
      "Healthcare Analytics",
      "Insight Communication",
    ],
    tools: [
      "Python (Pandas, NumPy)",
      "MySQL",
      "MySQL Workbench",
      "Jupyter Notebook",
    ],
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/Healthcare%20analysis.png",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/SQL/Thumbhnail/Medical%20Analysis.jpg",
  },

  {
    id: 9,
    title: "Personal Loan Analysis",
    slug: "personal-loan-analysis",
    description:
      "This project aimed to help a bank's marketing team identify high-potential customers for personal loans using behavioral and demographic data. The focus was on deriving actionable insights that could improve conversion rates and optimize marketing costs through data-driven targeting strategies.",
    tag: "SQL",
    tagColor: "bg-yellow-100 text-yellow-700",
    category: "SQL",
    githubUrl:
      "https://github.com/ZeyaMosharraf/Strategic-Marketing-for-Personal-Loans-using-SQL",
    methodology: ` • Cleaned and preprocessed raw customer data using Python (Pandas) to ensure consistency and accuracy.
                    • Loaded the cleaned dataset into a MySQL database for efficient querying and relational analysis.
                    • Used SQL within Jupyter Notebook to perform deep exploratory analysis on variables such as income, education, family size, credit card usage, mortgage ownership, and personal loan acceptance.
                    • Segmented customers by financial and demographic traits to identify trends and opportunities for personalized marketing strategies.`,
    resultsAndImpact: ` • Identified customers earning 1.5× above average income, highlighting them as high-conversion potential for personal loans.
                        • Found that above-average credit card spenders were ~4 years older than the general customer base—critical for age-targeted campaigns.
                        • Mapped youngest family members by household size, revealing patterns for family-focused loan products.
                        • Segmented education levels to determine where the highest concentration of customers lies for broad campaign reach.
                        • Delivered a full pipeline—from raw data to actionable business insights—enabling smarter customer targeting and potential uplift of 25–30% in loan conversions through better segmentation.`,
    skills: [
      "Data Cleaning",
      "SQL Querying",
      "Behavioral Segmentation",
      "Marketing Analytics",
    ],
    tools: ["Python", "MySQL", "Jupyter Notebook"],
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/Personal%20loan.png",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/SQL/Thumbhnail/Loan%20Analysis.jpg",
  },

  // Machine Learning Projects
  {
    id: 10,
    title: "Taxi Tip Prediction",
    slug: "taxi-tip-prediction",
    description:
      "I developed a machine learning model aimed at predicting whether taxi passengers would give a generous tip, defined as 20% or more. This project showcased my expertise in various aspects of data science, including data preprocessing, feature engineering, and model evaluation using Python. By leveraging these skills, I was able to construct a predictive model that could provide valuable insights into customer tipping behavior in the taxi industry.",
    tag: "Machine Learning",
    tagColor: "bg-purple-100 text-purple-700",
    category: "Machine Learning",
    githubUrl:
      "https://github.com/ZeyaMosharraf/Automatidata-Taxi-Tip-Prediction-Model",
    methodology:
      "To build a robust predictive model for taxi tip generosity, I began with comprehensive data cleaning and preprocessing to handle missing values, outliers, and data inconsistencies. I engineered meaningful features such as trip duration, trip distance, and average fare per minute to enhance the model’s predictive power. Categorical variables were encoded appropriately, and numerical features were standardized where necessary. I then applied and compared multiple machine learning algorithms, with a primary focus on Random Forest and XGBoost classifiers. To optimize model performance, I employed GridSearchCV for hyperparameter tuning. The dataset was split into training and testing sets, and I used cross-validation to ensure the reliability of the evaluation metrics.",
    resultsAndImpact: `• The predictive model performed well, with the Random Forest classifier achieving an F1 score of 0.7136.
                       • XGBoost also showed strong performance with an F1 score of 0.6955.
                       • These results highlight the model's effectiveness in identifying passengers likely to tip 20% or more.
                       • Key features that influenced the predictions were VendorID, predicted fare amount, trip distance, and trip duration.
                       • The model offers meaningful insights into tipping behavior.
                       • It has practical applications in the taxi and ride-hailing industry.
                       • Businesses can use the model to predict high-tipping customers for better driver allocation.
                       • It can help in developing strategies to improve tipping experiences.
                       • The model supports the design of better driver incentive and reward systems.
                       • The project shows how machine learning can generate business insights and support data-driven decisions based on customer behavior.`,
    skills: [
      "Data Cleaning and Preparation",
      "Feature Engineering",
      "Model Evaluation",
      "Hyperparameter Tuning",
    ],
    tools: [
      "Python (Pandas, NumPy, Scikit-learn, XGBoost)",
      "Jupyter Notebook",
    ],
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/automatidata_taxi_tip.png",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Machine%20Learning/Taxi%20Trip%20Machine%20Learning.jpg",
  },

  // Excel Projects
  {
    id: 11,
    title: "Superstore Sales Analysis",
    slug: "superstore-sales-analysis",
    description:
      "This project involved an in-depth analysis of a superstore’s sales data to uncover valuable business insights and visualize key performance indicators (KPIs). Using advanced Excel techniques, I created an interactive dashboard to evaluate profit trends, product performance, and regional contributions. The goal was to provide data-driven insights to support strategic decision-making and improve overall profitability.",
    tag: "Excel",
    tagColor: "bg-red-100 text-red-700",
    category: "Excel",
    githubUrl:
      "https://github.com/ZeyaMosharraf/Superstore-Sales-Profit-Loss-Analysis",
    methodology: ` • Data Cleaning & Preparation: Cleaned and standardized the dataset using Excel functions to ensure consistency and accuracy for analysis.
                    • Data Analysis: Conducted detailed analysis using PivotTables, VLOOKUP, and formulas to explore monthly and regional profit trends, product category performance, and top contributors to sales and profit.
                    • Dashboard Creation: Designed a dynamic, user-friendly dashboard to visualize KPIs (e.g., Gross Profit Margin), top products by profit, and regional/category-based sales distribution.
                    • KPI Calculation: Calculated Gross Profit Margin and other metrics to evaluate financial health.`,
    resultsAndImpact: ` • Identified the top 5 profit-generating products, led by Canon imageCLASS 2200 Advanced Copier.
                        • Revealed December as the most profitable month, indicating seasonal buying behavior.
                        • California was the most profitable state, pointing to a strong market segment.
                        • Technology products had the highest sales and profit margins, showing strategic potential.
                        • Achieved a Gross Profit Margin of ~12.47%, providing a benchmark for financial performance.
                        These insights can guide marketing strategies, inventory planning, and regional focus for increased profitability.`,
    skills: [
      "Advanced Excel Functions",
      "Data Cleaning & Transformation",
      "Data Analysis & Reporting",
      "Dashboard Design",
      "KPI Calculation & Financial Analysis",
    ],
    tools: [
      "Microsoft Excel",
      "PivotTables",
      "VLOOKUP",
      "Conditional Formatting",
      "Advanced Formulas & Charts",
    ],
    excelDashboardUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/superstoresdashboardd.jpg",
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/superstoresdashboardd.jpg",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Excel/Thumbhnail/SuperStore%20Analysis.jpg",
  },
  {
    id: 12,
    title: "Zomato Restaurant Analysis",
    slug: "zomato-restaurant-analysis",
    description:
      "This project involved analyzing the Zomato dataset to gain valuable insights into restaurant performance, customer preferences, and dining trends. Python was used for efficient data cleaning, while Excel enabled detailed analysis and visualization. The final outcome was a well-structured dashboard highlighting key patterns related to restaurant types, ratings, and customer engagement.",
    tag: "Excel",
    tagColor: "bg-red-100 text-red-700",
    category: "Excel",
    githubUrl:
      "https://github.com/ZeyaMosharraf/Food-Delivery-App-Data-Analysis",
    methodology: `• Cleaned the dataset using Python to handle missing values and inconsistencies.
                   • Analyzed the data using Excel functions, filters, and formulas.
                   • Built visual dashboards in Excel to display trends and patterns.
                   • Focused on service offerings, cuisine types, cost categories, and popularity metrics.`,
    resultsAndImpact: ` • Identified top-performing restaurant types like Pub, Cafe, and Microbrewery.
                        • Found that restaurants offering online ordering and table booking received higher ratings and more customer engagement.
                        • Highlighted popular cuisines such as North Indian, Chinese, and South Indian.
                        • Discovered the most common cost range for two people is ₹300–₹800.
                        • Provided actionable insights for both restaurant owners and customers`,
    skills: [
      "Data Cleaning",
      "Data Analysis",
      "Data Visualization",
      "Dashboard Design",
      "Python Programming",
    ],
    tools: [
      "Python: For data cleaning and preprocessing",
      "Microsoft Excel: For data analysis, visualization, and dashboard creation",
    ],
    excelDashboardUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/zomato_dashboard.png",
    imageUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/image/zomato_dashboard.png",
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Excel/Thumbhnail/Zomato%20Analysis.jpg",
  },

  // Looker Studio Projects
  {
    id: 13,
    title: "E-commerce Data Analysis",
    slug: "ecommerce-data-analysis",
    description:
      "This project analyzes large-scale e-commerce datasets from an international online retailer to extract actionable insights that support data-driven decision-making. The focus is on understanding customer behavior, sales performance, and product trends through systematic data analysis and visualization.",
    tag: "Looker Studio",
    tagColor: "bg-indigo-100 text-indigo-700",
    category: "Looker Studio",
    githubUrl: "https://github.com/ZeyaMosharraf/Ecommerce-Business",
    methodology: ` • Handled missing values, duplicates, and formatting inconsistencies using Python (Pandas) to ensure high-quality data for analysis.
                      • Analyzed key business areas such as sales trends, customer segmentation, and product performance using statistical and visual techniques.
                      • Developed interactive dashboards and visual reports using Looker Studio to present insights to stakeholders clearly.
                      • Derived strategic recommendations to improve marketing strategies, inventory control, and customer engagement based on observed data patterns.`,
    resultsAndImpact: ` • The project analyzed the total revenue generated by the e-commerce business, which amounted to $9.73 million.
                          • A total of 5.16 million units of products were sold during the analyzed period.
                          • The project identified a total of 4,373 unique customers who made purchases.
                          • The project identified the top 5 customers based on their contribution to revenue and quantity sold.
                          • The project analyzed the performance of different stock codes based on quantity sold, average unit price, and total revenue generated.
                          • The project analyzed sales revenue and quantity sold for each country to identify key markets.
                          • The project analyzed the variation in total quantity sold and revenue generated over different months to identify trends and seasonality in sales.`,
    skills: [
      "Data Cleaning and Preprocessing",
      "Exploratory Data Analysis (EDA)",
      "Data Visualization",
      "Business Intelligence Reporting",
      "Strategic Thinking and Recommendation Framing",
    ],
    tools: [
      "Python (Pandas): For data manipulation and cleaning",
      "Jupyter Notebook: For code development and documentation",
      "Looker Studio: For dashboard creation and visualization",
      "Git & GitHub: For version control and project collaboration",
    ],
    lookerstudioEmbedUrl: `https://lookerstudio.google.com/embed/reporting/e64b99d3-7a2b-4b14-8ab9-e7394305cddc/page/M2itD`,
    thumbhnailUrl:
      "https://raw.githubusercontent.com/ZeyaMosharraf/zeyamosharraf.github.io/refs/heads/main/Images/Looker%20Studio/Thumbhnail/Ecommerce%20Analysis.jpg",
  },
];
