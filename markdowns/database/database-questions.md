# Database Interview Questions

## Table of Contents
1. [SQL Fundamentals](#sql-fundamentals)
2. [Database Design](#database-design)
3. [NoSQL Databases](#nosql-databases)
4. [Performance Optimization](#performance-optimization)
5. [Transactions and ACID](#transactions-and-acid)
6. [Database Security](#database-security)
7. [Replication and Scaling](#replication-and-scaling)
8. [Advanced Topics](#advanced-topics)

---

## SQL Fundamentals

### Q1: Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with examples.
**Difficulty: Medium**

**Answer:**
JOINs are used to combine rows from two or more tables based on a related column. Each type of JOIN returns different result sets.

**SQL Examples with Sample Data:**

```sql
-- Sample Tables
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    salary DECIMAL(10,2),
    hire_date DATE
);

CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    budget DECIMAL(12,2),
    manager_id INT
);

CREATE TABLE projects (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    department_id INT,
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2)
);

CREATE TABLE employee_projects (
    employee_id INT,
    project_id INT,
    role VARCHAR(50),
    hours_allocated INT,
    PRIMARY KEY (employee_id, project_id),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

-- Insert sample data
INSERT INTO departments (id, name, budget, manager_id) VALUES
(1, 'Engineering', 1000000.00, 1),
(2, 'Marketing', 500000.00, 2),
(3, 'Sales', 750000.00, 3),
(4, 'HR', 300000.00, 4),
(5, 'Finance', 400000.00, NULL); -- No manager assigned yet

INSERT INTO employees (id, name, department_id, salary, hire_date) VALUES
(1, 'John Smith', 1, 95000.00, '2020-01-15'),
(2, 'Sarah Johnson', 2, 75000.00, '2019-03-20'),
(3, 'Mike Davis', 3, 80000.00, '2021-06-10'),
(4, 'Emily Brown', 4, 65000.00, '2018-11-05'),
(5, 'David Wilson', 1, 85000.00, '2020-09-12'),
(6, 'Lisa Anderson', 2, 70000.00, '2021-02-28'),
(7, 'Tom Miller', NULL, 90000.00, '2022-01-10'), -- No department assigned
(8, 'Anna Garcia', 1, 78000.00, '2019-08-15');

INSERT INTO projects (id, name, department_id, start_date, end_date, budget) VALUES
(1, 'Website Redesign', 1, '2023-01-01', '2023-06-30', 150000.00),
(2, 'Mobile App', 1, '2023-03-01', '2023-12-31', 200000.00),
(3, 'Marketing Campaign', 2, '2023-02-01', '2023-05-31', 75000.00),
(4, 'Sales Training', 3, '2023-01-15', '2023-03-15', 25000.00),
(5, 'HR System Upgrade', 4, '2023-04-01', '2023-08-31', 50000.00);

INSERT INTO employee_projects (employee_id, project_id, role, hours_allocated) VALUES
(1, 1, 'Lead Developer', 160),
(1, 2, 'Technical Advisor', 40),
(5, 1, 'Frontend Developer', 120),
(8, 2, 'Backend Developer', 140),
(2, 3, 'Campaign Manager', 100),
(6, 3, 'Content Creator', 80),
(3, 4, 'Trainer', 60),
(4, 5, 'Project Manager', 100);

-- === JOIN EXAMPLES ===

-- 1. INNER JOIN - Returns only matching records from both tables
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;

/*
Result:
employee_name    | department_name | salary
-----------------|-----------------|----------
John Smith       | Engineering     | 95000.00
David Wilson     | Engineering     | 85000.00
Mike Davis       | Sales           | 80000.00
Anna Garcia      | Engineering     | 78000.00
Sarah Johnson    | Marketing       | 75000.00
Lisa Anderson    | Marketing       | 70000.00
Emily Brown      | HR              | 65000.00

Note: Tom Miller is excluded because he has no department assigned
*/

-- 2. LEFT JOIN (LEFT OUTER JOIN) - Returns all records from left table
SELECT 
    e.name AS employee_name,
    COALESCE(d.name, 'No Department') AS department_name,
    e.salary
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;

/*
Result:
employee_name    | department_name | salary
-----------------|-----------------|----------
John Smith       | Engineering     | 95000.00
Tom Miller       | No Department   | 90000.00  -- Included with NULL department
David Wilson     | Engineering     | 85000.00
Mike Davis       | Sales           | 80000.00
Anna Garcia      | Engineering     | 78000.00
Sarah Johnson    | Marketing       | 75000.00
Lisa Anderson    | Marketing       | 70000.00
Emily Brown      | HR              | 65000.00
*/

-- 3. RIGHT JOIN (RIGHT OUTER JOIN) - Returns all records from right table
SELECT 
    COALESCE(e.name, 'No Manager') AS employee_name,
    d.name AS department_name,
    d.budget
FROM employees e
RIGHT JOIN departments d ON e.id = d.manager_id
ORDER BY d.budget DESC;

/*
Result:
employee_name    | department_name | budget
-----------------|-----------------|------------
John Smith       | Engineering     | 1000000.00
Mike Davis       | Sales           | 750000.00
Sarah Johnson    | Marketing       | 500000.00
No Manager       | Finance         | 400000.00  -- Finance has no manager
Emily Brown      | HR              | 300000.00
*/

-- 4. FULL OUTER JOIN - Returns all records from both tables
-- Note: MySQL doesn't support FULL OUTER JOIN directly, use UNION
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    e.salary,
    d.budget
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
UNION
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    e.salary,
    d.budget
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id
WHERE e.id IS NULL
ORDER BY salary DESC NULLS LAST;

-- PostgreSQL/SQL Server FULL OUTER JOIN syntax:
/*
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    e.salary,
    d.budget
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC NULLS LAST;
*/

-- === COMPLEX JOIN EXAMPLES ===

-- Multiple JOINs with aggregation
SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    COUNT(p.id) AS project_count,
    SUM(p.budget) AS total_project_budget
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
LEFT JOIN projects p ON d.id = p.department_id
GROUP BY d.id, d.name
HAVING COUNT(e.id) > 0  -- Only departments with employees
ORDER BY avg_salary DESC;

-- Self JOIN - Find employees who earn more than their department's average
SELECT 
    e1.name AS employee_name,
    e1.salary,
    dept_avg.avg_salary,
    d.name AS department_name
FROM employees e1
INNER JOIN departments d ON e1.department_id = d.id
INNER JOIN (
    SELECT 
        department_id,
        AVG(salary) AS avg_salary
    FROM employees
    WHERE department_id IS NOT NULL
    GROUP BY department_id
) dept_avg ON e1.department_id = dept_avg.department_id
WHERE e1.salary > dept_avg.avg_salary
ORDER BY e1.salary DESC;

-- Subquery with EXISTS
SELECT 
    e.name AS employee_name,
    e.salary,
    d.name AS department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE EXISTS (
    SELECT 1
    FROM employee_projects ep
    INNER JOIN projects p ON ep.project_id = p.id
    WHERE ep.employee_id = e.id
    AND p.budget > 100000
)
ORDER BY e.salary DESC;

-- Window functions with JOINs
SELECT 
    e.name AS employee_name,
    d.name AS department_name,
    e.salary,
    AVG(e.salary) OVER (PARTITION BY d.id) AS dept_avg_salary,
    RANK() OVER (PARTITION BY d.id ORDER BY e.salary DESC) AS salary_rank_in_dept,
    ROW_NUMBER() OVER (ORDER BY e.salary DESC) AS overall_salary_rank
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;

-- Recursive CTE for hierarchical data (PostgreSQL/SQL Server)
/*
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: top-level managers (no manager)
    SELECT 
        id,
        name,
        manager_id,
        0 AS level,
        CAST(name AS VARCHAR(1000)) AS hierarchy_path
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees with managers
    SELECT 
        e.id,
        e.name,
        e.manager_id,
        eh.level + 1,
        CAST(eh.hierarchy_path || ' -> ' || e.name AS VARCHAR(1000))
    FROM employees e
    INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT 
    REPEAT('  ', level) || name AS indented_name,
    level,
    hierarchy_path
FROM employee_hierarchy
ORDER BY hierarchy_path;
*/
```

**Performance Considerations:**

```sql
-- === INDEXING FOR JOIN PERFORMANCE ===

-- Create indexes on foreign key columns
CREATE INDEX idx_employees_department_id ON employees(department_id);
CREATE INDEX idx_projects_department_id ON projects(department_id);
CREATE INDEX idx_employee_projects_employee_id ON employee_projects(employee_id);
CREATE INDEX idx_employee_projects_project_id ON employee_projects(project_id);

-- Composite indexes for complex queries
CREATE INDEX idx_employees_dept_salary ON employees(department_id, salary DESC);
CREATE INDEX idx_projects_dept_dates ON projects(department_id, start_date, end_date);

-- === QUERY OPTIMIZATION TECHNIQUES ===

-- Use EXPLAIN to analyze query execution plans
EXPLAIN (ANALYZE, BUFFERS) 
SELECT 
    e.name,
    d.name,
    COUNT(ep.project_id) as project_count
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
GROUP BY e.id, e.name, d.name
HAVING COUNT(ep.project_id) > 1;

-- Optimize with proper WHERE clause placement
-- BAD: Filter after JOIN
SELECT e.name, d.name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE e.salary > 80000;

-- GOOD: Filter before JOIN when possible
SELECT e.name, d.name
FROM (
    SELECT id, name, department_id
    FROM employees
    WHERE salary > 80000
) e
INNER JOIN departments d ON e.department_id = d.id;

-- Use appropriate JOIN order (smaller table first)
-- Database optimizer usually handles this, but be aware

-- === COMMON JOIN PITFALLS ===

-- 1. Cartesian Product (missing JOIN condition)
-- BAD:
SELECT e.name, d.name
FROM employees e, departments d;  -- Returns 8 * 5 = 40 rows!

-- GOOD:
SELECT e.name, d.name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- 2. Duplicate rows with improper GROUP BY
-- BAD:
SELECT 
    e.name,
    COUNT(ep.project_id)
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id;
-- Missing GROUP BY causes error or unexpected results

-- GOOD:
SELECT 
    e.name,
    COUNT(ep.project_id)
FROM employees e
LEFT JOIN employee_projects ep ON e.id = ep.employee_id
GROUP BY e.id, e.name;

-- 3. NULL handling in JOINs
-- Be careful with NULL values in JOIN conditions
SELECT 
    e.name,
    COALESCE(d.name, 'No Department') AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

**Key Differences:**

1. **INNER JOIN**: Only matching records from both tables
2. **LEFT JOIN**: All records from left table + matching from right
3. **RIGHT JOIN**: All records from right table + matching from left
4. **FULL OUTER JOIN**: All records from both tables
5. **CROSS JOIN**: Cartesian product of both tables
6. **SELF JOIN**: Table joined with itself

---

### Q2: Write a complex SQL query that demonstrates window functions, CTEs, and subqueries.
**Difficulty: Hard**

**Answer:**
Here's a comprehensive example that analyzes employee performance, salary trends, and department rankings using advanced SQL features.

**Complex SQL Query with Advanced Features:**

```sql
-- === COMPREHENSIVE EMPLOYEE ANALYTICS QUERY ===
-- This query demonstrates CTEs, window functions, subqueries, and advanced SQL techniques

-- Additional sample data for more complex analysis
CREATE TABLE performance_reviews (
    id INT PRIMARY KEY,
    employee_id INT,
    review_date DATE,
    score DECIMAL(3,2), -- Score from 1.00 to 5.00
    reviewer_id INT,
    comments TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE salary_history (
    id INT PRIMARY KEY,
    employee_id INT,
    salary DECIMAL(10,2),
    effective_date DATE,
    reason VARCHAR(100),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

INSERT INTO performance_reviews (id, employee_id, review_date, score, reviewer_id, comments) VALUES
(1, 1, '2023-01-15', 4.5, 2, 'Excellent technical leadership'),
(2, 1, '2022-01-15', 4.2, 2, 'Strong performance, good team collaboration'),
(3, 2, '2023-02-01', 3.8, 1, 'Good marketing campaigns, room for improvement'),
(4, 2, '2022-02-01', 3.5, 1, 'Solid performance'),
(5, 3, '2023-01-30', 4.0, 4, 'Excellent sales results'),
(6, 4, '2023-03-01', 4.3, 1, 'Outstanding HR initiatives'),
(7, 5, '2023-02-15', 3.9, 1, 'Good technical skills'),
(8, 6, '2023-02-20', 3.7, 2, 'Creative content, meets expectations'),
(9, 8, '2023-01-20', 4.1, 1, 'Strong backend development skills');

INSERT INTO salary_history (id, employee_id, salary, effective_date, reason) VALUES
(1, 1, 85000.00, '2020-01-15', 'Initial hire'),
(2, 1, 90000.00, '2021-01-15', 'Annual raise'),
(3, 1, 95000.00, '2022-01-15', 'Promotion to Senior'),
(4, 2, 70000.00, '2019-03-20', 'Initial hire'),
(5, 2, 75000.00, '2021-03-20', 'Annual raise'),
(6, 3, 75000.00, '2021-06-10', 'Initial hire'),
(7, 3, 80000.00, '2022-06-10', 'Annual raise'),
(8, 4, 60000.00, '2018-11-05', 'Initial hire'),
(9, 4, 65000.00, '2020-11-05', 'Annual raise'),
(10, 5, 80000.00, '2020-09-12', 'Initial hire'),
(11, 5, 85000.00, '2022-09-12', 'Annual raise'),
(12, 6, 65000.00, '2021-02-28', 'Initial hire'),
(13, 6, 70000.00, '2022-02-28', 'Annual raise'),
(14, 8, 75000.00, '2019-08-15', 'Initial hire'),
(15, 8, 78000.00, '2021-08-15', 'Annual raise');

-- === MAIN COMPLEX QUERY ===

WITH 
-- CTE 1: Calculate employee tenure and salary growth
employee_metrics AS (
    SELECT 
        e.id,
        e.name,
        e.department_id,
        e.salary AS current_salary,
        e.hire_date,
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, e.hire_date)) AS tenure_years,
        
        -- Salary growth calculation
        (
            SELECT sh_first.salary 
            FROM salary_history sh_first 
            WHERE sh_first.employee_id = e.id 
            ORDER BY sh_first.effective_date ASC 
            LIMIT 1
        ) AS starting_salary,
        
        -- Calculate salary growth percentage
        CASE 
            WHEN (
                SELECT sh_first.salary 
                FROM salary_history sh_first 
                WHERE sh_first.employee_id = e.id 
                ORDER BY sh_first.effective_date ASC 
                LIMIT 1
            ) > 0 THEN
                ROUND(
                    ((e.salary - (
                        SELECT sh_first.salary 
                        FROM salary_history sh_first 
                        WHERE sh_first.employee_id = e.id 
                        ORDER BY sh_first.effective_date ASC 
                        LIMIT 1
                    )) / (
                        SELECT sh_first.salary 
                        FROM salary_history sh_first 
                        WHERE sh_first.employee_id = e.id 
                        ORDER BY sh_first.effective_date ASC 
                        LIMIT 1
                    )) * 100, 2
                )
            ELSE 0
        END AS salary_growth_percent
    FROM employees e
    WHERE e.department_id IS NOT NULL
),

-- CTE 2: Performance metrics
performance_metrics AS (
    SELECT 
        pr.employee_id,
        COUNT(*) AS review_count,
        AVG(pr.score) AS avg_performance_score,
        MAX(pr.score) AS best_score,
        MIN(pr.score) AS worst_score,
        
        -- Latest performance score
        (
            SELECT pr_latest.score
            FROM performance_reviews pr_latest
            WHERE pr_latest.employee_id = pr.employee_id
            ORDER BY pr_latest.review_date DESC
            LIMIT 1
        ) AS latest_score,
        
        -- Performance trend (comparing latest vs first review)
        CASE 
            WHEN COUNT(*) > 1 THEN
                (
                    SELECT pr_latest.score
                    FROM performance_reviews pr_latest
                    WHERE pr_latest.employee_id = pr.employee_id
                    ORDER BY pr_latest.review_date DESC
                    LIMIT 1
                ) - (
                    SELECT pr_first.score
                    FROM performance_reviews pr_first
                    WHERE pr_first.employee_id = pr.employee_id
                    ORDER BY pr_first.review_date ASC
                    LIMIT 1
                )
            ELSE 0
        END AS performance_trend
    FROM performance_reviews pr
    GROUP BY pr.employee_id
),

-- CTE 3: Project involvement metrics
project_metrics AS (
    SELECT 
        ep.employee_id,
        COUNT(DISTINCT ep.project_id) AS project_count,
        SUM(ep.hours_allocated) AS total_hours_allocated,
        AVG(p.budget) AS avg_project_budget,
        
        -- Project roles
        STRING_AGG(DISTINCT ep.role, ', ' ORDER BY ep.role) AS project_roles,
        
        -- High-budget project involvement
        COUNT(CASE WHEN p.budget > 100000 THEN 1 END) AS high_budget_projects
    FROM employee_projects ep
    INNER JOIN projects p ON ep.project_id = p.id
    GROUP BY ep.employee_id
),

-- CTE 4: Department statistics
department_stats AS (
    SELECT 
        d.id AS department_id,
        d.name AS department_name,
        COUNT(e.id) AS employee_count,
        AVG(e.salary) AS dept_avg_salary,
        STDDEV(e.salary) AS dept_salary_stddev,
        MIN(e.salary) AS dept_min_salary,
        MAX(e.salary) AS dept_max_salary,
        
        -- Department performance average
        (
            SELECT AVG(pr.score)
            FROM performance_reviews pr
            INNER JOIN employees e_pr ON pr.employee_id = e_pr.id
            WHERE e_pr.department_id = d.id
        ) AS dept_avg_performance
    FROM departments d
    LEFT JOIN employees e ON d.id = e.department_id
    GROUP BY d.id, d.name
),

-- CTE 5: Salary percentiles by department
salary_percentiles AS (
    SELECT 
        e.id AS employee_id,
        e.department_id,
        PERCENT_RANK() OVER (
            PARTITION BY e.department_id 
            ORDER BY e.salary
        ) AS salary_percentile_in_dept,
        PERCENT_RANK() OVER (
            ORDER BY e.salary
        ) AS salary_percentile_overall
    FROM employees e
    WHERE e.department_id IS NOT NULL
)

-- === MAIN SELECT WITH WINDOW FUNCTIONS ===
SELECT 
    -- Employee basic info
    em.name AS employee_name,
    ds.department_name,
    em.current_salary,
    em.tenure_years,
    
    -- Salary analysis
    em.starting_salary,
    em.salary_growth_percent,
    ROUND(sp.salary_percentile_in_dept * 100, 1) AS salary_percentile_in_dept,
    ROUND(sp.salary_percentile_overall * 100, 1) AS salary_percentile_overall,
    
    -- Performance metrics
    COALESCE(pm.avg_performance_score, 0) AS avg_performance_score,
    COALESCE(pm.latest_score, 0) AS latest_performance_score,
    COALESCE(pm.performance_trend, 0) AS performance_trend,
    COALESCE(pm.review_count, 0) AS review_count,
    
    -- Project involvement
    COALESCE(prm.project_count, 0) AS project_count,
    COALESCE(prm.total_hours_allocated, 0) AS total_hours_allocated,
    COALESCE(prm.high_budget_projects, 0) AS high_budget_projects,
    COALESCE(prm.project_roles, 'No projects') AS project_roles,
    
    -- Department context
    ds.employee_count AS dept_employee_count,
    ROUND(ds.dept_avg_salary, 2) AS dept_avg_salary,
    ROUND(ds.dept_avg_performance, 2) AS dept_avg_performance,
    
    -- Window functions for ranking and analysis
    RANK() OVER (
        PARTITION BY em.department_id 
        ORDER BY em.current_salary DESC
    ) AS salary_rank_in_dept,
    
    RANK() OVER (
        ORDER BY COALESCE(pm.avg_performance_score, 0) DESC
    ) AS performance_rank_overall,
    
    DENSE_RANK() OVER (
        PARTITION BY em.department_id 
        ORDER BY COALESCE(pm.avg_performance_score, 0) DESC
    ) AS performance_rank_in_dept,
    
    -- Moving averages and lag functions
    AVG(em.current_salary) OVER (
        PARTITION BY em.department_id 
        ORDER BY em.hire_date 
        ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
    ) AS salary_moving_avg,
    
    LAG(em.current_salary, 1) OVER (
        PARTITION BY em.department_id 
        ORDER BY em.hire_date
    ) AS prev_hire_salary,
    
    LEAD(em.current_salary, 1) OVER (
        PARTITION BY em.department_id 
        ORDER BY em.hire_date
    ) AS next_hire_salary,
    
    -- Cumulative statistics
    SUM(em.current_salary) OVER (
        PARTITION BY em.department_id 
        ORDER BY em.hire_date 
        ROWS UNBOUNDED PRECEDING
    ) AS cumulative_dept_salary_cost,
    
    -- Performance vs salary efficiency
    CASE 
        WHEN COALESCE(pm.avg_performance_score, 0) > 0 THEN
            ROUND(em.current_salary / COALESCE(pm.avg_performance_score, 1), 2)
        ELSE NULL
    END AS salary_per_performance_point,
    
    -- Employee value score (composite metric)
    ROUND(
        (
            COALESCE(pm.avg_performance_score, 2.5) * 0.4 +
            (COALESCE(prm.project_count, 0) * 0.5) * 0.3 +
            (em.tenure_years * 0.2) * 0.2 +
            (CASE WHEN em.salary_growth_percent > 20 THEN 1 ELSE 0 END) * 0.1
        ) * 20, 2
    ) AS employee_value_score,
    
    -- Quartile analysis
    NTILE(4) OVER (
        ORDER BY em.current_salary
    ) AS salary_quartile,
    
    NTILE(4) OVER (
        ORDER BY COALESCE(pm.avg_performance_score, 0)
    ) AS performance_quartile,
    
    -- Department comparison
    em.current_salary - ds.dept_avg_salary AS salary_vs_dept_avg,
    
    CASE 
        WHEN em.current_salary > ds.dept_avg_salary + ds.dept_salary_stddev THEN 'Above Average'
        WHEN em.current_salary < ds.dept_avg_salary - ds.dept_salary_stddev THEN 'Below Average'
        ELSE 'Average'
    END AS salary_category,
    
    -- Risk indicators
    CASE 
        WHEN COALESCE(pm.performance_trend, 0) < -0.5 THEN 'Performance Declining'
        WHEN COALESCE(pm.latest_score, 0) < 3.0 THEN 'Low Performance'
        WHEN em.tenure_years > 5 AND em.salary_growth_percent < 10 THEN 'Potential Flight Risk'
        WHEN COALESCE(prm.project_count, 0) = 0 THEN 'Underutilized'
        ELSE 'Stable'
    END AS risk_indicator

FROM employee_metrics em
INNER JOIN department_stats ds ON em.department_id = ds.department_id
LEFT JOIN performance_metrics pm ON em.id = pm.employee_id
LEFT JOIN project_metrics prm ON em.id = prm.employee_id
INNER JOIN salary_percentiles sp ON em.id = sp.employee_id

-- Filter for active employees with performance data
WHERE em.tenure_years >= 0

-- Order by composite value score
ORDER BY employee_value_score DESC, em.current_salary DESC;

-- === ADDITIONAL ANALYTICAL QUERIES ===

-- Top performers by department
WITH top_performers AS (
    SELECT 
        e.name,
        d.name AS department,
        AVG(pr.score) AS avg_score,
        RANK() OVER (PARTITION BY d.id ORDER BY AVG(pr.score) DESC) AS dept_rank
    FROM employees e
    INNER JOIN departments d ON e.department_id = d.id
    INNER JOIN performance_reviews pr ON e.id = pr.employee_id
    GROUP BY e.id, e.name, d.id, d.name
)
SELECT *
FROM top_performers
WHERE dept_rank <= 2;

-- Salary growth analysis
WITH salary_growth_analysis AS (
    SELECT 
        e.name,
        d.name AS department,
        sh_first.salary AS starting_salary,
        e.salary AS current_salary,
        ROUND(
            ((e.salary - sh_first.salary) / sh_first.salary) * 100, 2
        ) AS growth_percent,
        EXTRACT(YEAR FROM AGE(CURRENT_DATE, e.hire_date)) AS tenure_years
    FROM employees e
    INNER JOIN departments d ON e.department_id = d.id
    INNER JOIN (
        SELECT 
            employee_id,
            salary,
            ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY effective_date ASC) AS rn
        FROM salary_history
    ) sh_first ON e.id = sh_first.employee_id AND sh_first.rn = 1
    WHERE EXTRACT(YEAR FROM AGE(CURRENT_DATE, e.hire_date)) > 0
)
SELECT 
    *,
    ROUND(growth_percent / tenure_years, 2) AS annual_growth_rate,
    CASE 
        WHEN growth_percent > 30 THEN 'High Growth'
        WHEN growth_percent > 15 THEN 'Moderate Growth'
        WHEN growth_percent > 0 THEN 'Low Growth'
        ELSE 'No Growth'
    END AS growth_category
FROM salary_growth_analysis
ORDER BY growth_percent DESC;

-- Department efficiency analysis
SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    ROUND(AVG(e.salary), 2) AS avg_salary,
    ROUND(AVG(pr.score), 2) AS avg_performance,
    COUNT(p.id) AS project_count,
    ROUND(SUM(p.budget), 2) AS total_project_budget,
    
    -- Efficiency metrics
    ROUND(SUM(p.budget) / COUNT(e.id), 2) AS budget_per_employee,
    ROUND(AVG(e.salary) / AVG(pr.score), 2) AS salary_per_performance_point,
    
    -- Department score
    ROUND(
        (AVG(pr.score) * 0.4 + 
         (COUNT(p.id) / COUNT(e.id)) * 0.3 + 
         (SUM(p.budget) / SUM(e.salary)) * 0.3) * 20, 2
    ) AS department_efficiency_score
    
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
LEFT JOIN performance_reviews pr ON e.id = pr.employee_id
LEFT JOIN projects p ON d.id = p.department_id
GROUP BY d.id, d.name
HAVING COUNT(e.id) > 0
ORDER BY department_efficiency_score DESC;
```

**Key Advanced SQL Features Demonstrated:**

1. **Common Table Expressions (CTEs)**: Multiple CTEs for modular query building
2. **Window Functions**: RANK(), DENSE_RANK(), NTILE(), LAG(), LEAD(), moving averages
3. **Subqueries**: Correlated and non-correlated subqueries
4. **Aggregate Functions**: Advanced aggregations with CASE statements
5. **String Functions**: STRING_AGG for concatenation
6. **Date Functions**: AGE(), EXTRACT() for temporal analysis
7. **Statistical Functions**: STDDEV(), PERCENT_RANK()
8. **Conditional Logic**: Complex CASE statements
9. **Performance Analysis**: Query optimization techniques

---

## Database Design

### Q3: Design a normalized database schema for an e-commerce platform and explain the normalization process.
**Difficulty: Hard**

**Answer:**
I'll design a comprehensive e-commerce database schema following normalization principles from 1NF to 3NF, with additional considerations for performance and scalability.

**Complete E-commerce Database Schema:**

```sql
-- === E-COMMERCE DATABASE SCHEMA ===
-- Normalized design following 1NF, 2NF, 3NF principles
-- with performance optimizations and business logic

-- === CORE ENTITY TABLES ===

-- Users table (customers and administrators)
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')),
    is_active BOOLEAN DEFAULT TRUE,
    is_verified BOOLEAN DEFAULT FALSE,
    user_type VARCHAR(20) DEFAULT 'customer' CHECK (user_type IN ('customer', 'admin', 'vendor')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP WITH TIME ZONE,
    
    -- Indexes for performance
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- User addresses (1:N relationship with users)
CREATE TABLE user_addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    address_type VARCHAR(20) DEFAULT 'shipping' CHECK (address_type IN ('shipping', 'billing', 'both')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    company VARCHAR(100),
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state_province VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country_code CHAR(2) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Categories table (hierarchical structure)
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    parent_id BIGINT REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Prevent self-referencing and circular references
    CONSTRAINT categories_no_self_reference CHECK (id != parent_id)
);

-- Brands table
CREATE TABLE brands (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    long_description TEXT,
    brand_id BIGINT REFERENCES brands(id) ON DELETE SET NULL,
    
    -- Product status and visibility
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'inactive', 'discontinued')),
    visibility VARCHAR(20) DEFAULT 'visible' CHECK (visibility IN ('visible', 'hidden', 'catalog_only')),
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    sale_price DECIMAL(10,2) CHECK (sale_price >= 0 AND sale_price <= base_price),
    cost_price DECIMAL(10,2) CHECK (cost_price >= 0),
    
    -- Inventory
    track_inventory BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    low_stock_threshold INTEGER DEFAULT 10,
    
    -- Physical attributes
    weight DECIMAL(8,3) CHECK (weight >= 0), -- in kg
    length DECIMAL(8,2) CHECK (length >= 0), -- in cm
    width DECIMAL(8,2) CHECK (width >= 0),   -- in cm
    height DECIMAL(8,2) CHECK (height >= 0), -- in cm
    
    -- SEO and metadata
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP WITH TIME ZONE
);

-- Product categories (M:N relationship)
CREATE TABLE product_categories (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (product_id, category_id)
);

-- Product images
CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product attributes (for variations like size, color, etc.)
CREATE TABLE product_attributes (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(20) DEFAULT 'text' CHECK (type IN ('text', 'number', 'boolean', 'select', 'multiselect')),
    is_required BOOLEAN DEFAULT FALSE,
    is_variation BOOLEAN DEFAULT FALSE, -- Used for product variations
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Product attribute values
CREATE TABLE product_attribute_values (
    id BIGSERIAL PRIMARY KEY,
    attribute_id BIGINT NOT NULL REFERENCES product_attributes(id) ON DELETE CASCADE,
    value VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(attribute_id, value)
);

-- Product attribute assignments
CREATE TABLE product_attribute_assignments (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    attribute_id BIGINT NOT NULL REFERENCES product_attributes(id) ON DELETE CASCADE,
    attribute_value_id BIGINT REFERENCES product_attribute_values(id) ON DELETE CASCADE,
    custom_value TEXT, -- For custom values not in predefined list
    
    UNIQUE(product_id, attribute_id, attribute_value_id),
    
    -- Either use predefined value or custom value, not both
    CONSTRAINT check_value_assignment CHECK (
        (attribute_value_id IS NOT NULL AND custom_value IS NULL) OR
        (attribute_value_id IS NULL AND custom_value IS NOT NULL)
    )
);

-- Product variations (for products with different sizes, colors, etc.)
CREATE TABLE product_variations (
    id BIGSERIAL PRIMARY KEY,
    parent_product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    sku VARCHAR(100) UNIQUE NOT NULL,
    
    -- Pricing (can override parent product pricing)
    price DECIMAL(10,2) CHECK (price >= 0),
    sale_price DECIMAL(10,2) CHECK (sale_price >= 0 AND sale_price <= price),
    
    -- Inventory
    stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
    
    -- Physical attributes (can override parent)
    weight DECIMAL(8,3) CHECK (weight >= 0),
    length DECIMAL(8,2) CHECK (length >= 0),
    width DECIMAL(8,2) CHECK (width >= 0),
    height DECIMAL(8,2) CHECK (height >= 0),
    
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Variation attribute values (what makes this variation unique)
CREATE TABLE variation_attribute_values (
    variation_id BIGINT NOT NULL REFERENCES product_variations(id) ON DELETE CASCADE,
    attribute_id BIGINT NOT NULL REFERENCES product_attributes(id) ON DELETE CASCADE,
    attribute_value_id BIGINT NOT NULL REFERENCES product_attribute_values(id) ON DELETE CASCADE,
    
    PRIMARY KEY (variation_id, attribute_id),
    
    -- Only variation attributes allowed
    CONSTRAINT check_variation_attribute 
        FOREIGN KEY (attribute_id) REFERENCES product_attributes(id)
        CHECK (attribute_id IN (SELECT id FROM product_attributes WHERE is_variation = TRUE))
);

-- === SHOPPING CART AND ORDERS ===

-- Shopping cart
CREATE TABLE shopping_carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255), -- For guest users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Either user_id or session_id must be present
    CONSTRAINT check_cart_owner CHECK (
        (user_id IS NOT NULL AND session_id IS NULL) OR
        (user_id IS NULL AND session_id IS NOT NULL)
    )
);

-- Cart items
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES shopping_carts(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variation_id BIGINT REFERENCES product_variations(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(cart_id, product_id, variation_id)
);

-- Orders
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    
    -- Order status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'confirmed', 'processing', 'shipped', 
        'delivered', 'cancelled', 'refunded', 'returned'
    )),
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL CHECK (subtotal >= 0),
    tax_amount DECIMAL(10,2) DEFAULT 0 CHECK (tax_amount >= 0),
    shipping_amount DECIMAL(10,2) DEFAULT 0 CHECK (shipping_amount >= 0),
    discount_amount DECIMAL(10,2) DEFAULT 0 CHECK (discount_amount >= 0),
    total_amount DECIMAL(10,2) NOT NULL CHECK (total_amount >= 0),
    
    -- Addresses (denormalized for historical accuracy)
    billing_first_name VARCHAR(100) NOT NULL,
    billing_last_name VARCHAR(100) NOT NULL,
    billing_company VARCHAR(100),
    billing_address_line_1 VARCHAR(255) NOT NULL,
    billing_address_line_2 VARCHAR(255),
    billing_city VARCHAR(100) NOT NULL,
    billing_state_province VARCHAR(100) NOT NULL,
    billing_postal_code VARCHAR(20) NOT NULL,
    billing_country_code CHAR(2) NOT NULL,
    
    shipping_first_name VARCHAR(100) NOT NULL,
    shipping_last_name VARCHAR(100) NOT NULL,
    shipping_company VARCHAR(100),
    shipping_address_line_1 VARCHAR(255) NOT NULL,
    shipping_address_line_2 VARCHAR(255),
    shipping_city VARCHAR(100) NOT NULL,
    shipping_state_province VARCHAR(100) NOT NULL,
    shipping_postal_code VARCHAR(20) NOT NULL,
    shipping_country_code CHAR(2) NOT NULL,
    
    -- Contact information
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    
    -- Order notes
    customer_notes TEXT,
    admin_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE
);

-- Order items
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    variation_id BIGINT REFERENCES product_variations(id) ON DELETE RESTRICT,
    
    -- Product details at time of order (denormalized for historical accuracy)
    product_sku VARCHAR(100) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    variation_attributes JSONB, -- Store variation details
    
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL CHECK (unit_price >= 0),
    total_price DECIMAL(10,2) NOT NULL CHECK (total_price >= 0),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- === PAYMENT AND SHIPPING ===

-- Payment methods
CREATE TABLE payment_methods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    configuration JSONB, -- Store payment gateway configuration
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Payments
CREATE TABLE payments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_method_id BIGINT NOT NULL REFERENCES payment_methods(id),
    
    -- Payment details
    transaction_id VARCHAR(255),
    gateway_transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    currency_code CHAR(3) DEFAULT 'USD',
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded'
    )),
    
    -- Gateway response
    gateway_response JSONB,
    failure_reason TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Shipping methods
CREATE TABLE shipping_methods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    base_cost DECIMAL(10,2) DEFAULT 0 CHECK (base_cost >= 0),
    cost_per_kg DECIMAL(10,2) DEFAULT 0 CHECK (cost_per_kg >= 0),
    free_shipping_threshold DECIMAL(10,2),
    estimated_days_min INTEGER CHECK (estimated_days_min >= 0),
    estimated_days_max INTEGER CHECK (estimated_days_max >= estimated_days_min),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order shipments
CREATE TABLE order_shipments (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    shipping_method_id BIGINT NOT NULL REFERENCES shipping_methods(id),
    
    tracking_number VARCHAR(255),
    carrier VARCHAR(100),
    shipping_cost DECIMAL(10,2) NOT NULL CHECK (shipping_cost >= 0),
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN (
        'pending', 'processing', 'shipped', 'in_transit', 'delivered', 'returned'
    )),
    
    shipped_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- === DISCOUNTS AND PROMOTIONS ===

-- Discount codes/coupons
CREATE TABLE discount_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    
    -- Discount type and value
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
    discount_value DECIMAL(10,2) NOT NULL CHECK (discount_value >= 0),
    
    -- Usage limits
    usage_limit INTEGER, -- Total usage limit
    usage_limit_per_customer INTEGER,
    used_count INTEGER DEFAULT 0,
    
    -- Conditions
    minimum_order_amount DECIMAL(10,2),
    maximum_discount_amount DECIMAL(10,2),
    
    -- Validity
    starts_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Discount code usage tracking
CREATE TABLE discount_code_usage (
    id BIGSERIAL PRIMARY KEY,
    discount_code_id BIGINT NOT NULL REFERENCES discount_codes(id) ON DELETE CASCADE,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    discount_amount DECIMAL(10,2) NOT NULL CHECK (discount_amount >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(discount_code_id, order_id)
);

-- === REVIEWS AND RATINGS ===

-- Product reviews
CREATE TABLE product_reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_item_id BIGINT REFERENCES order_items(id) ON DELETE SET NULL,
    
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    
    -- Review status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    
    -- Helpful votes
    helpful_votes INTEGER DEFAULT 0,
    total_votes INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- One review per user per product
    UNIQUE(product_id, user_id)
);

-- === INVENTORY MANAGEMENT ===

-- Inventory transactions (for tracking stock changes)
CREATE TABLE inventory_transactions (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variation_id BIGINT REFERENCES product_variations(id) ON DELETE CASCADE,
    
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN (
        'purchase', 'sale', 'return', 'adjustment', 'damage', 'theft'
    )),
    
    quantity_change INTEGER NOT NULL, -- Positive for increase, negative for decrease
    quantity_after INTEGER NOT NULL CHECK (quantity_after >= 0),
    
    reference_type VARCHAR(50), -- 'order', 'purchase_order', 'manual', etc.
    reference_id BIGINT,
    
    notes TEXT,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- === INDEXES FOR PERFORMANCE ===

-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_type_active ON users(user_type, is_active);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Address indexes
CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_default ON user_addresses(user_id, is_default);

-- Category indexes
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_active ON categories(is_active);

-- Product indexes
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_price ON products(base_price, sale_price);
CREATE INDEX idx_products_stock ON products(stock_quantity);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Product category indexes
CREATE INDEX idx_product_categories_product_id ON product_categories(product_id);
CREATE INDEX idx_product_categories_category_id ON product_categories(category_id);
CREATE INDEX idx_product_categories_primary ON product_categories(category_id, is_primary);

-- Order indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_total ON orders(total_amount);

-- Order items indexes
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- Cart indexes
CREATE INDEX idx_shopping_carts_user_id ON shopping_carts(user_id);
CREATE INDEX idx_shopping_carts_session_id ON shopping_carts(session_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);

-- Review indexes
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_user_id ON product_reviews(user_id);
CREATE INDEX idx_product_reviews_rating ON product_reviews(rating);
CREATE INDEX idx_product_reviews_status ON product_reviews(status);
```

**Normalization Process Explanation:**

**1st Normal Form (1NF):**
- All tables have primary keys
- No repeating groups or arrays in columns
- Each cell contains atomic values
- Example: Instead of storing multiple addresses in one field, we created separate `user_addresses` table

**2nd Normal Form (2NF):**
- Meets 1NF requirements
- No partial dependencies on composite keys
- Example: In `product_categories` table, both `product_id` and `category_id` are needed to determine `is_primary`

**3rd Normal Form (3NF):**
- Meets 2NF requirements
- No transitive dependencies
- Example: Product brand information is in separate `brands` table, not duplicated in `products`

**Denormalization for Performance:**
- Order addresses are denormalized for historical accuracy
- Product details in `order_items` for historical pricing
- Review aggregates could be cached in `products` table

---

## NoSQL Databases

### Q4: Compare MongoDB, Redis, and Cassandra. When would you use each?
**Difficulty: Medium**

**Answer:**
Each NoSQL database serves different use cases based on data model, consistency requirements, and performance characteristics.

**MongoDB (Document Database):**

```javascript
// MongoDB Examples

// === DOCUMENT STRUCTURE ===
// User document with embedded data
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "john.doe@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: ISODate("1990-05-15"),
    preferences: {
      newsletter: true,
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  },
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "New York",
      zipCode: "10001",
      isDefault: true
    },
    {
      type: "work",
      street: "456 Business Ave",
      city: "New York",
      zipCode: "10002",
      isDefault: false
    }
  ],
  orders: [
    {
      orderId: ObjectId("507f1f77bcf86cd799439012"),
      date: ISODate("2023-01-15"),
      total: 299.99,
      status: "delivered"
    }
  ],
  createdAt: ISODate("2023-01-01"),
  lastLogin: ISODate("2023-12-01")
}

// === MONGODB OPERATIONS ===

// Complex aggregation pipeline
db.users.aggregate([
  // Match active users from last 30 days
  {
    $match: {
      lastLogin: { $gte: new Date(Date.now() - 30*24*60*60*1000) },
      "profile.preferences.newsletter": true
    }
  },
  
  // Unwind orders array
  { $unwind: "$orders" },
  
  // Group by user and calculate metrics
  {
    $group: {
      _id: "$_id",
      email: { $first: "$email" },
      firstName: { $first: "$profile.firstName" },
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$orders.total" },
      avgOrderValue: { $avg: "$orders.total" },
      lastOrderDate: { $max: "$orders.date" }
    }
  },
  
  // Filter high-value customers
  {
    $match: {
      totalSpent: { $gte: 1000 }
    }
  },
  
  // Sort by total spent
  { $sort: { totalSpent: -1 } },
  
  // Add customer segment
  {
    $addFields: {
      segment: {
        $switch: {
          branches: [
            { case: { $gte: ["$totalSpent", 5000] }, then: "VIP" },
            { case: { $gte: ["$totalSpent", 2000] }, then: "Premium" },
            { case: { $gte: ["$totalSpent", 1000] }, then: "Gold" }
          ],
          default: "Standard"
        }
      }
    }
  }
]);

// Geospatial queries
db.stores.createIndex({ location: "2dsphere" });

db.stores.find({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [-73.9857, 40.7484] // NYC coordinates
      },
      $maxDistance: 5000 // 5km radius
    }
  }
});

// Text search with scoring
db.products.createIndex({ 
  name: "text", 
  description: "text", 
  tags: "text" 
});

db.products.find(
  { $text: { $search: "wireless bluetooth headphones" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } });

// Change streams for real-time updates
const changeStream = db.orders.watch([
  {
    $match: {
      "fullDocument.status": "pending",
      "operationType": "insert"
    }
  }
]);

changeStream.on('change', (change) => {
  console.log('New order:', change.fullDocument);
  // Trigger notification, inventory update, etc.
});
```

**Redis (Key-Value Store):**

```javascript
// Redis Examples

// === CACHING STRATEGIES ===

// Cache-aside pattern
async function getUser(userId) {
  const cacheKey = `user:${userId}`;
  
  // Try cache first
  let user = await redis.get(cacheKey);
  if (user) {
    return JSON.parse(user);
  }
  
  // Cache miss - fetch from database
  user = await database.users.findById(userId);
  
  // Store in cache with TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
}

// Write-through cache
async function updateUser(userId, userData) {
  // Update database
  const user = await database.users.update(userId, userData);
  
  // Update cache
  const cacheKey = `user:${userId}`;
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
}

// === SESSION MANAGEMENT ===

// Store session data
async function createSession(userId, sessionData) {
  const sessionId = generateSessionId();
  const sessionKey = `session:${sessionId}`;
  
  await redis.hmset(sessionKey, {
    userId: userId,
    createdAt: Date.now(),
    lastAccess: Date.now(),
    ipAddress: sessionData.ipAddress,
    userAgent: sessionData.userAgent
  });
  
  // Set expiration
  await redis.expire(sessionKey, 86400); // 24 hours
  
  return sessionId;
}

// === REAL-TIME FEATURES ===

// Pub/Sub for real-time notifications
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Publish notification
async function sendNotification(userId, message) {
  await publisher.publish(`user:${userId}:notifications`, JSON.stringify({
    type: 'info',
    message: message,
    timestamp: Date.now()
  }));
}

// Subscribe to notifications
subscriber.subscribe('user:*:notifications');
subscriber.on('message', (channel, message) => {
  const userId = channel.split(':')[1];
  const notification = JSON.parse(message);
  
  // Send to WebSocket, email, etc.
  sendToWebSocket(userId, notification);
});

// === RATE LIMITING ===

// Sliding window rate limiter
async function checkRateLimit(userId, limit = 100, window = 3600) {
  const key = `rate_limit:${userId}`;
  const now = Date.now();
  const windowStart = now - (window * 1000);
  
  // Remove old entries
  await redis.zremrangebyscore(key, 0, windowStart);
  
  // Count current requests
  const currentCount = await redis.zcard(key);
  
  if (currentCount >= limit) {
    return { allowed: false, remaining: 0 };
  }
  
  // Add current request
  await redis.zadd(key, now, `${now}-${Math.random()}`);
  await redis.expire(key, window);
  
  return { 
    allowed: true, 
    remaining: limit - currentCount - 1 
  };
}

// === LEADERBOARDS ===

// Game leaderboard with sorted sets
async function updateScore(userId, score) {
  await redis.zadd('leaderboard:global', score, userId);
  
  // Weekly leaderboard
  const weekKey = `leaderboard:week:${getWeekNumber()}`;
  await redis.zadd(weekKey, score, userId);
  await redis.expire(weekKey, 604800); // 1 week
}

// Get top players
async function getTopPlayers(count = 10) {
  return await redis.zrevrange('leaderboard:global', 0, count - 1, 'WITHSCORES');
}

// Get user rank
async function getUserRank(userId) {
  const rank = await redis.zrevrank('leaderboard:global', userId);
  const score = await redis.zscore('leaderboard:global', userId);
  
  return { rank: rank + 1, score };
}

// === DISTRIBUTED LOCKS ===

// Implement distributed lock with Redis
class RedisLock {
  constructor(redis, key, ttl = 10000) {
    this.redis = redis;
    this.key = `lock:${key}`;
    this.ttl = ttl;
    this.lockValue = `${Date.now()}-${Math.random()}`;
  }
  
  async acquire() {
    const result = await this.redis.set(
      this.key, 
      this.lockValue, 
      'PX', 
      this.ttl, 
      'NX'
    );
    
    return result === 'OK';
  }
  
  async release() {
    const script = `
      if redis.call('GET', KEYS[1]) == ARGV[1] then
        return redis.call('DEL', KEYS[1])
      else
        return 0
      end
    `;
    
    return await this.redis.eval(script, 1, this.key, this.lockValue);
  }
}

// Usage
async function processPayment(orderId) {
  const lock = new RedisLock(redis, `payment:${orderId}`);
  
  if (await lock.acquire()) {
    try {
      // Process payment logic
      await processPaymentLogic(orderId);
    } finally {
      await lock.release();
    }
  } else {
    throw new Error('Payment already being processed');
  }
}
```

**Cassandra (Wide-Column Store):**

```sql
-- Cassandra CQL Examples

-- === KEYSPACE AND TABLE DESIGN ===

-- Create keyspace with replication
CREATE KEYSPACE ecommerce 
WITH REPLICATION = {
  'class': 'NetworkTopologyStrategy',
  'datacenter1': 3,
  'datacenter2': 2
};

USE ecommerce;

-- Time-series data for user activity
CREATE TABLE user_activity (
    user_id UUID,
    activity_date DATE,
    activity_time TIMESTAMP,
    activity_type TEXT,
    page_url TEXT,
    session_id UUID,
    ip_address INET,
    user_agent TEXT,
    PRIMARY KEY ((user_id, activity_date), activity_time)
) WITH CLUSTERING ORDER BY (activity_time DESC)
  AND compaction = {'class': 'TimeWindowCompactionStrategy'}
  AND default_time_to_live = 2592000; -- 30 days

-- Product catalog with denormalized data
CREATE TABLE products_by_category (
    category_id UUID,
    product_id UUID,
    product_name TEXT,
    brand TEXT,
    price DECIMAL,
    rating FLOAT,
    review_count INT,
    image_urls LIST<TEXT>,
    attributes MAP<TEXT, TEXT>,
    created_at TIMESTAMP,
    PRIMARY KEY (category_id, price, product_id)
) WITH CLUSTERING ORDER BY (price ASC, product_id ASC);

-- Order history partitioned by user and time
CREATE TABLE user_orders (
    user_id UUID,
    order_month TEXT, -- YYYY-MM format
    order_id UUID,
    order_date TIMESTAMP,
    total_amount DECIMAL,
    status TEXT,
    items LIST<FROZEN<order_item>>,
    shipping_address FROZEN<address>,
    PRIMARY KEY ((user_id, order_month), order_date, order_id)
) WITH CLUSTERING ORDER BY (order_date DESC, order_id ASC);

-- User-defined types
CREATE TYPE order_item (
    product_id UUID,
    product_name TEXT,
    quantity INT,
    unit_price DECIMAL
);

CREATE TYPE address (
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    country TEXT
);

-- === QUERY PATTERNS ===

-- Insert user activity (optimized for writes)
INSERT INTO user_activity (
    user_id, activity_date, activity_time, 
    activity_type, page_url, session_id
) VALUES (
    550e8400-e29b-41d4-a716-446655440000,
    '2023-12-01',
    '2023-12-01 10:30:00',
    'page_view',
    '/products/electronics',
    550e8400-e29b-41d4-a716-446655440001
);

-- Query user activity for a specific day
SELECT * FROM user_activity 
WHERE user_id = 550e8400-e29b-41d4-a716-446655440000 
  AND activity_date = '2023-12-01'
ORDER BY activity_time DESC;

-- Query products by category with price range
SELECT * FROM products_by_category 
WHERE category_id = 550e8400-e29b-41d4-a716-446655440002
  AND price >= 100 AND price <= 500
LIMIT 20;

-- Get user orders for specific month
SELECT * FROM user_orders 
WHERE user_id = 550e8400-e29b-41d4-a716-446655440000 
  AND order_month = '2023-12'
ORDER BY order_date DESC;

-- === MATERIALIZED VIEWS ===

-- Create materialized view for product search by brand
CREATE MATERIALIZED VIEW products_by_brand AS
SELECT category_id, brand, product_id, product_name, price, rating
FROM products_by_category
WHERE category_id IS NOT NULL 
  AND brand IS NOT NULL 
  AND product_id IS NOT NULL
PRIMARY KEY (brand, rating, product_id);

-- === BATCH OPERATIONS ===

-- Batch insert for better performance
BEGIN BATCH
  INSERT INTO user_activity (...) VALUES (...);
  INSERT INTO user_activity (...) VALUES (...);
  INSERT INTO user_activity (...) VALUES (...);
APPLY BATCH;

-- === COUNTERS ===

-- Counter table for statistics
CREATE TABLE product_stats (
    product_id UUID PRIMARY KEY,
    view_count COUNTER,
    purchase_count COUNTER,
    wishlist_count COUNTER
);

-- Update counters
UPDATE product_stats 
SET view_count = view_count + 1 
WHERE product_id = 550e8400-e29b-41d4-a716-446655440003;
```

**When to Use Each Database:**

**MongoDB:**
- ✅ **Use When:**
  - Complex, nested data structures
  - Rapid application development
  - Flexible schema requirements
  - Rich query capabilities needed
  - ACID transactions required (4.0+)
  - Geospatial queries
  - Full-text search

- ❌ **Avoid When:**
  - High-frequency, simple key-value operations
  - Extremely high write throughput
  - Strong consistency across multiple documents

**Redis:**
- ✅ **Use When:**
  - Caching and session storage
  - Real-time analytics
  - Pub/Sub messaging
  - Rate limiting
  - Leaderboards and counters
  - Distributed locks
  - Sub-millisecond latency required

- ❌ **Avoid When:**
  - Primary data storage for large datasets
  - Complex queries needed
  - Data persistence is critical (use Redis Cluster/Sentinel)

**Cassandra:**
- ✅ **Use When:**
  - Massive write-heavy workloads
  - Time-series data
  - High availability requirements
  - Linear scalability needed
  - Multi-datacenter deployment
  - IoT data ingestion
  - Event logging

- ❌ **Avoid When:**
  - Complex joins required
  - ACID transactions needed
  - Small datasets
  - Ad-hoc queries common

---

### Q5: Design a database schema for a social media platform with posts, comments, likes, and followers.
**Difficulty: Hard**

**Answer:**
I'll design both SQL and NoSQL schemas for a social media platform, considering scalability, performance, and different access patterns.

**SQL Schema (PostgreSQL):**

```sql
-- === SOCIAL MEDIA PLATFORM DATABASE SCHEMA ===

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    bio TEXT,
    avatar_url VARCHAR(500),
    cover_photo_url VARCHAR(500),
    
    -- Profile settings
    is_private BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Location
    location VARCHAR(255),
    timezone VARCHAR(50),
    
    -- Counts (denormalized for performance)
    followers_count INTEGER DEFAULT 0,
    following_count INTEGER DEFAULT 0,
    posts_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_active_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT users_username_check CHECK (username ~* '^[a-zA-Z0-9_]{3,50}$'),
    CONSTRAINT users_email_check CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Posts table
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT,
    
    -- Post type and visibility
    post_type VARCHAR(20) DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'video', 'link', 'poll')),
    visibility VARCHAR(20) DEFAULT 'public' CHECK (visibility IN ('public', 'followers', 'private')),
    
    -- Media and metadata
    media_urls JSONB, -- Array of media URLs
    link_preview JSONB, -- Link metadata
    location JSONB, -- Geolocation data
    
    -- Engagement metrics (denormalized)
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    
    -- Moderation
    is_deleted BOOLEAN DEFAULT FALSE,
    is_reported BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Full-text search
    search_vector TSVECTOR
);

-- Comments table (supports nested comments)
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    parent_comment_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    
    content TEXT NOT NULL,
    
    -- Engagement
    likes_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    
    -- Hierarchy and ordering
    depth INTEGER DEFAULT 0,
    path LTREE, -- For efficient hierarchical queries
    
    -- Moderation
    is_deleted BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT comments_depth_check CHECK (depth >= 0 AND depth <= 5)
);

-- Likes table (for posts and comments)
CREATE TABLE likes (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Polymorphic relationship
    likeable_type VARCHAR(20) NOT NULL CHECK (likeable_type IN ('post', 'comment')),
    likeable_id BIGINT NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Unique constraint to prevent duplicate likes
    UNIQUE(user_id, likeable_type, likeable_id)
);

-- Follows table (user relationships)
CREATE TABLE follows (
    id BIGSERIAL PRIMARY KEY,
    follower_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    following_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Follow status
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'pending', 'blocked')),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    -- Prevent self-following and duplicate follows
    CONSTRAINT follows_no_self_follow CHECK (follower_id != following_id),
    UNIQUE(follower_id, following_id)
);

-- Hashtags table
CREATE TABLE hashtags (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Post hashtags (M:N relationship)
CREATE TABLE post_hashtags (
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    hashtag_id BIGINT NOT NULL REFERENCES hashtags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (post_id, hashtag_id)
);

-- User mentions in posts
CREATE TABLE post_mentions (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    mentioned_user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    position_start INTEGER NOT NULL,
    position_end INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(post_id, mentioned_user_id)
);

-- Notifications table
CREATE TABLE notifications (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    actor_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN (
        'like_post', 'like_comment', 'comment_post', 'reply_comment',
        'follow_request', 'follow_accepted', 'mention', 'share'
    )),
    
    -- Reference to the object that triggered the notification
    object_type VARCHAR(20) CHECK (object_type IN ('post', 'comment', 'user')),
    object_id BIGINT,
    
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User feed cache (for performance)
CREATE TABLE user_feeds (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    
    -- Feed ranking score
    score FLOAT DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, post_id)
);

-- === INDEXES FOR PERFORMANCE ===

-- User indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_active ON users(is_active, last_active_at);

-- Post indexes
CREATE INDEX idx_posts_user_id ON posts(user_id, created_at DESC);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_visibility ON posts(visibility, created_at DESC);
CREATE INDEX idx_posts_search ON posts USING GIN(search_vector);
CREATE INDEX idx_posts_location ON posts USING GIN(location);

-- Comment indexes
CREATE INDEX idx_comments_post_id ON comments(post_id, created_at);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent ON comments(parent_comment_id);
CREATE INDEX idx_comments_path ON comments USING GIST(path);

-- Like indexes
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_likes_likeable ON likes(likeable_type, likeable_id);

-- Follow indexes
CREATE INDEX idx_follows_follower ON follows(follower_id, status);
CREATE INDEX idx_follows_following ON follows(following_id, status);

-- Notification indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read, created_at DESC);

-- Feed indexes
CREATE INDEX idx_user_feeds_user_score ON user_feeds(user_id, score DESC);

-- === TRIGGERS AND FUNCTIONS ===

-- Update search vector for posts
CREATE OR REPLACE FUNCTION update_post_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := to_tsvector('english', COALESCE(NEW.content, ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_search_vector_update
    BEFORE INSERT OR UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_post_search_vector();

-- Update counts when likes are added/removed
CREATE OR REPLACE FUNCTION update_like_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.likeable_type = 'post' THEN
            UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.likeable_id;
        ELSIF NEW.likeable_type = 'comment' THEN
            UPDATE comments SET likes_count = likes_count + 1 WHERE id = NEW.likeable_id;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.likeable_type = 'post' THEN
            UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.likeable_id;
        ELSIF OLD.likeable_type = 'comment' THEN
            UPDATE comments SET likes_count = likes_count - 1 WHERE id = OLD.likeable_id;
        END IF;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER likes_count_update
    AFTER INSERT OR DELETE ON likes
    FOR EACH ROW EXECUTE FUNCTION update_like_counts();

-- Update follow counts
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'active' THEN
        UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
        UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' AND OLD.status = 'active' THEN
        UPDATE users SET following_count = following_count - 1 WHERE id = OLD.follower_id;
        UPDATE users SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status = 'active' AND NEW.status != 'active' THEN
            UPDATE users SET following_count = following_count - 1 WHERE id = NEW.follower_id;
            UPDATE users SET followers_count = followers_count - 1 WHERE id = NEW.following_id;
        ELSIF OLD.status != 'active' AND NEW.status = 'active' THEN
            UPDATE users SET following_count = following_count + 1 WHERE id = NEW.follower_id;
            UPDATE users SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
        END IF;
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER follows_count_update
    AFTER INSERT OR UPDATE OR DELETE ON follows
    FOR EACH ROW EXECUTE FUNCTION update_follow_counts();
```

**Key Design Decisions:**

1. **Denormalized Counts**: Store like/comment/follow counts directly for performance
2. **Polymorphic Likes**: Single table for both post and comment likes
3. **Hierarchical Comments**: Using LTREE for efficient nested comment queries
4. **Feed Caching**: Pre-computed user feeds for timeline performance
5. **Full-text Search**: PostgreSQL's built-in search capabilities
6. **Soft Deletes**: Mark content as deleted rather than hard delete

---

## Performance Optimization

### Q6: Explain database indexing strategies and when to use different types of indexes.
**Difficulty: Medium**

**Answer:**
Database indexes are crucial for query performance. Different index types serve different purposes and have specific use cases.

**Index Types and Strategies:**

```sql
-- === B-TREE INDEXES (Most Common) ===

-- Single column index
CREATE INDEX idx_users_email ON users(email);

-- Composite index (order matters!)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at DESC);

-- Partial index (with WHERE clause)
CREATE INDEX idx_active_users ON users(last_login_at) 
WHERE is_active = TRUE;

-- Functional index
CREATE INDEX idx_users_email_lower ON users(LOWER(email));

-- === HASH INDEXES ===
-- Only for equality comparisons
CREATE INDEX idx_sessions_token ON user_sessions USING HASH(session_token);

-- === GIN INDEXES (Generalized Inverted Index) ===
-- For JSONB, arrays, full-text search
CREATE INDEX idx_products_attributes ON products USING GIN(attributes);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_search ON posts USING GIN(to_tsvector('english', content));

-- === GIST INDEXES (Generalized Search Tree) ===
-- For geometric data, ranges, full-text search
CREATE INDEX idx_stores_location ON stores USING GIST(location);
CREATE INDEX idx_events_daterange ON events USING GIST(date_range);

-- === BRIN INDEXES (Block Range Index) ===
-- For very large tables with natural ordering
CREATE INDEX idx_logs_timestamp ON application_logs USING BRIN(created_at);

-- === SP-GIST INDEXES ===
-- For non-balanced data structures
CREATE INDEX idx_ip_addresses ON access_logs USING SPGIST(ip_address inet_ops);
```

**Comprehensive Indexing Strategy Example:**

```sql
-- === E-COMMERCE INDEXING STRATEGY ===

-- Products table with various index types
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    sku VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category_id BIGINT,
    brand_id BIGINT,
    price DECIMAL(10,2),
    sale_price DECIMAL(10,2),
    stock_quantity INTEGER,
    attributes JSONB,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- === PRIMARY ACCESS PATTERNS AND INDEXES ===

-- 1. Product lookup by SKU (exact match)
CREATE UNIQUE INDEX idx_products_sku ON products(sku);

-- 2. Category browsing with sorting
CREATE INDEX idx_products_category_price ON products(category_id, price) 
WHERE is_active = TRUE;

CREATE INDEX idx_products_category_created ON products(category_id, created_at DESC) 
WHERE is_active = TRUE;

-- 3. Brand filtering
CREATE INDEX idx_products_brand_price ON products(brand_id, price) 
WHERE is_active = TRUE;

-- 4. Price range queries
CREATE INDEX idx_products_price_range ON products(price, sale_price) 
WHERE is_active = TRUE;

-- 5. Stock management
CREATE INDEX idx_products_low_stock ON products(stock_quantity) 
WHERE is_active = TRUE AND stock_quantity < 10;

-- 6. Full-text search
CREATE INDEX idx_products_search ON products 
USING GIN(to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- 7. JSONB attribute queries
CREATE INDEX idx_products_attributes ON products USING GIN(attributes);

-- 8. Array tag searches
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- 9. Recent products
CREATE INDEX idx_products_recent ON products(created_at DESC) 
WHERE is_active = TRUE;

-- === QUERY OPTIMIZATION EXAMPLES ===

-- Efficient category browsing with price sorting
EXPLAIN (ANALYZE, BUFFERS) 
SELECT id, name, price, sale_price
FROM products 
WHERE category_id = 123 
  AND is_active = TRUE 
  AND price BETWEEN 50 AND 200
ORDER BY price ASC
LIMIT 20;

-- Multi-column search with proper index usage
EXPLAIN (ANALYZE, BUFFERS)
SELECT p.id, p.name, p.price, b.name as brand_name
FROM products p
JOIN brands b ON p.brand_id = b.id
WHERE p.category_id = 123
  AND p.brand_id IN (1, 2, 3)
  AND p.price <= 500
  AND p.is_active = TRUE
ORDER BY p.created_at DESC
LIMIT 20;

-- JSONB attribute filtering
EXPLAIN (ANALYZE, BUFFERS)
SELECT id, name, attributes
FROM products
WHERE attributes @> '{"color": "red", "size": "large"}'
  AND is_active = TRUE;

-- Full-text search with ranking
EXPLAIN (ANALYZE, BUFFERS)
SELECT 
    id, 
    name, 
    ts_rank(to_tsvector('english', name || ' ' || COALESCE(description, '')), 
             plainto_tsquery('english', 'wireless bluetooth headphones')) as rank
FROM products
WHERE to_tsvector('english', name || ' ' || COALESCE(description, '')) 
      @@ plainto_tsquery('english', 'wireless bluetooth headphones')
  AND is_active = TRUE
ORDER BY rank DESC, created_at DESC
LIMIT 20;

-- === INDEX MAINTENANCE AND MONITORING ===

-- Monitor index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_tup_read,
    idx_tup_fetch,
    idx_scan,
    ROUND(idx_tup_read::NUMERIC / NULLIF(idx_scan, 0), 2) as avg_tuples_per_scan
FROM pg_stat_user_indexes
WHERE schemaname = 'public'
ORDER BY idx_scan DESC;

-- Find unused indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND schemaname = 'public'
ORDER BY pg_relation_size(indexrelid) DESC;

-- Index bloat analysis
WITH index_bloat AS (
    SELECT 
        schemaname,
        tablename,
        indexname,
        pg_size_pretty(pg_relation_size(indexrelid)) as size,
        ROUND(
            CASE WHEN pg_relation_size(indexrelid) > 0 
            THEN (pg_relation_size(indexrelid) - 
                  pg_relation_size(indexrelid, 'main'))::NUMERIC / 
                 pg_relation_size(indexrelid) * 100
            ELSE 0 END, 2
        ) as bloat_percent
    FROM pg_stat_user_indexes
    WHERE schemaname = 'public'
)
SELECT *
FROM index_bloat
WHERE bloat_percent > 20
ORDER BY bloat_percent DESC;

-- === INDEX OPTIMIZATION STRATEGIES ===

-- 1. Covering indexes (include additional columns)
CREATE INDEX idx_orders_user_status_covering 
ON orders(user_id, status) 
INCLUDE (total_amount, created_at);

-- 2. Expression indexes for computed values
CREATE INDEX idx_orders_total_with_tax 
ON orders((total_amount + tax_amount));

-- 3. Conditional indexes for specific use cases
CREATE INDEX idx_orders_pending 
ON orders(created_at) 
WHERE status = 'pending';

CREATE INDEX idx_products_on_sale 
ON products(category_id, sale_price) 
WHERE sale_price IS NOT NULL AND sale_price < price;

-- 4. Multi-column indexes with proper column order
-- Rule: Most selective columns first, then sort columns
CREATE INDEX idx_order_items_analysis 
ON order_items(product_id, created_at DESC, quantity);

-- === ADVANCED INDEXING TECHNIQUES ===

-- Partial unique indexes
CREATE UNIQUE INDEX idx_users_email_active 
ON users(email) 
WHERE is_active = TRUE;

-- Functional indexes for case-insensitive searches
CREATE INDEX idx_users_username_lower 
ON users(LOWER(username));

-- Trigram indexes for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_products_name_trgm 
ON products USING GIN(name gin_trgm_ops);

-- Query using trigram similarity
SELECT name, similarity(name, 'iPhone') as sim
FROM products
WHERE name % 'iPhone'
ORDER BY sim DESC;

-- === INDEX MAINTENANCE PROCEDURES ===

-- Reindex specific index
REINDEX INDEX idx_products_category_price;

-- Reindex entire table
REINDEX TABLE products;

-- Analyze table statistics
ANALYZE products;

-- Update statistics for specific columns
ANALYZE products(category_id, price, created_at);

-- === MONITORING QUERIES ===

-- Check index hit ratio
SELECT 
    sum(idx_blks_hit) as idx_hit,
    sum(idx_blks_read) as idx_read,
    ROUND(
        sum(idx_blks_hit)::NUMERIC / 
        NULLIF(sum(idx_blks_hit) + sum(idx_blks_read), 0) * 100, 2
    ) as hit_ratio
FROM pg_statio_user_indexes;

-- Table and index sizes
SELECT 
    schemaname,
    tablename,
    pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as total_size,
    pg_size_pretty(pg_relation_size(schemaname||'.'||tablename)) as table_size,
    pg_size_pretty(
        pg_total_relation_size(schemaname||'.'||tablename) - 
        pg_relation_size(schemaname||'.'||tablename)
    ) as index_size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Slow queries that might need indexes
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows
FROM pg_stat_statements
WHERE mean_time > 100  -- queries taking more than 100ms on average
ORDER BY mean_time DESC
LIMIT 10;
```

**Index Selection Guidelines:**

**B-Tree Indexes (Default):**
- ✅ Equality and range queries
- ✅ Sorting operations
- ✅ Most common use case
- ❌ Pattern matching with leading wildcards

**Hash Indexes:**
- ✅ Equality comparisons only
- ✅ Faster than B-tree for equality
- ❌ No range queries
- ❌ Not WAL-logged (until PostgreSQL 10)

**GIN Indexes:**
- ✅ JSONB queries
- ✅ Array operations
- ✅ Full-text search
- ❌ Large storage overhead
- ❌ Slower updates

**GIST Indexes:**
- ✅ Geometric data
- ✅ Range types
- ✅ Custom data types
- ❌ Larger than B-tree
- ❌ More complex maintenance

**BRIN Indexes:**
- ✅ Very large tables
- ✅ Naturally ordered data
- ✅ Minimal storage overhead
- ❌ Only effective with correlation
- ❌ Limited query types

**Best Practices:**

1. **Index Column Order**: Most selective first, then sort columns
2. **Partial Indexes**: Use WHERE clauses for filtered queries
3. **Covering Indexes**: Include frequently accessed columns
4. **Monitor Usage**: Remove unused indexes
5. **Regular Maintenance**: REINDEX and ANALYZE regularly
6. **Query Analysis**: Use EXPLAIN ANALYZE to verify index usage

---

This comprehensive database guide covers SQL fundamentals, complex queries, database design, NoSQL comparisons, and performance optimization strategies essential for database interviews.