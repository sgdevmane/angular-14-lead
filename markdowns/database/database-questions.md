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

### Questions List
1. [Q1: Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN with examples](#q1-explain-the-difference-between-inner-join-left-join-right-join-and-full-outer-join-with-examples)
2. [Q2: Write a complex SQL query that demonstrates window functions, CTEs, and subqueries](#q2-write-a-complex-sql-query-that-demonstrates-window-functions-ctes-and-subqueries)
3. [Q3: Design a normalized database schema for an e-commerce platform and explain the normalization process](#q3-design-a-normalized-database-schema-for-an-e-commerce-platform-and-explain-the-normalization-process)
4. [Q4: Compare MongoDB, Redis, and Cassandra. When would you use each?](#q4-compare-mongodb-redis-and-cassandra-when-would-you-use-each)
5. [Q5: Design a database schema for a social media platform with posts, comments, likes, and followers](#q5-design-a-database-schema-for-a-social-media-platform-with-posts-comments-likes-and-followers)
6. [Q6: Explain database indexing strategies and when to use different types of indexes](#q6-explain-database-indexing-strategies-and-when-to-use-different-types-of-indexes)
7. [Q7: Explain database transactions, ACID properties, and isolation levels with practical examples](#q7-explain-database-transactions-acid-properties-and-isolation-levels-with-practical-examples)
8. [Q8: How do you implement database sharding and partitioning strategies for large-scale applications?](#q8-how-do-you-implement-database-sharding-and-partitioning-strategies-for-large-scale-applications)
9. [Q9: How do you implement database backup, recovery, and disaster recovery strategies?](#q9-how-do-you-implement-database-backup-recovery-and-disaster-recovery-strategies)
10. [Q10: How do you implement database security best practices and access control?](#q10-how-do-you-implement-database-security-best-practices-and-access-control)
11. [Q11: How do you implement database replication and high availability strategies?](#q11-how-do-you-implement-database-replication-and-high-availability-strategies)
12. [Q12: How do you implement database performance monitoring and optimization?](#q12-how-do-you-implement-database-performance-monitoring-and-optimization)
13. [Q13: How do you implement database connection pooling and manage database connections efficiently?](#q13-how-do-you-implement-database-connection-pooling-and-manage-database-connections-efficiently)
14. [Q14: How do you implement database migration strategies and version control for database schemas?](#q14-how-do-you-implement-database-migration-strategies-and-version-control-for-database-schemas)
15. [Q15: How do you implement database caching strategies and optimize cache performance?](#q15-how-do-you-implement-database-caching-strategies-and-optimize-cache-performance)
16. [Q16: How do you implement database query optimization and explain query execution plans?](#q16-how-do-you-implement-database-query-optimization-and-explain-query-execution-plans)
17. [Q17: How do you implement database concurrency control and handle deadlocks?](#q17-how-do-you-implement-database-concurrency-control-and-handle-deadlocks)
18. [Q18: How do you implement database monitoring, alerting, and performance tuning?](#q18-how-do-you-implement-database-monitoring-alerting-and-performance-tuning)
19. [Q19: How do you design and implement data warehousing solutions and ETL processes?](#q19-how-do-you-design-and-implement-data-warehousing-solutions-and-etl-processes)
20. [Q20: How do you implement database cloud migration and modern database architectures?](#q20-how-do-you-implement-database-cloud-migration-and-modern-database-architectures)

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
ORDER BY employee_count DESC;

-- Self JOIN example - Find employees who earn more than their department's average
SELECT 
    e1.name AS employee_name,
    e1.salary,
    d.name AS department_name,
    dept_avg.avg_salary
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
```

**Key Differences:**

1. **INNER JOIN**: Only returns rows where there's a match in both tables
2. **LEFT JOIN**: Returns all rows from the left table, with NULLs for non-matching right table rows
3. **RIGHT JOIN**: Returns all rows from the right table, with NULLs for non-matching left table rows
4. **FULL OUTER JOIN**: Returns all rows from both tables, with NULLs where there's no match

**Best Practices:**
- Use INNER JOIN when you only need matching records
- Use LEFT JOIN when you need all records from the primary table
- Always specify join conditions to avoid Cartesian products
- Consider performance implications with large datasets
- Use table aliases for better readability

---

## Transactions and ACID

### Q7: Explain database transactions, ACID properties, and isolation levels with practical examples.
**Difficulty: Advanced**

**Answer:**
Database transactions are sequences of operations that are treated as a single unit of work. They must satisfy ACID properties to ensure data integrity and consistency.

**ACID Properties:**

**1. Atomicity - All or Nothing**
```sql
-- Example: Bank transfer transaction
START TRANSACTION;

-- Deduct from source account
UPDATE accounts 
SET balance = balance - 1000 
WHERE account_id = 'ACC001';

-- Add to destination account
UPDATE accounts 
SET balance = balance + 1000 
WHERE account_id = 'ACC002';

-- Check if both operations succeeded
IF @@ERROR <> 0 OR @@ROWCOUNT = 0
BEGIN
    ROLLBACK TRANSACTION;
    PRINT 'Transaction failed - rolled back';
END
ELSE
BEGIN
    COMMIT TRANSACTION;
    PRINT 'Transfer completed successfully';
END
```

**2. Consistency - Data Integrity**
```sql
-- Example: Inventory management with constraints
CREATE TABLE inventory (
    product_id INT PRIMARY KEY,
    quantity INT CHECK (quantity >= 0),
    reserved_quantity INT CHECK (reserved_quantity >= 0),
    CONSTRAINT chk_available CHECK (quantity >= reserved_quantity)
);

-- Transaction that maintains consistency
START TRANSACTION;

-- Reserve items for order
UPDATE inventory 
SET reserved_quantity = reserved_quantity + 5
WHERE product_id = 101;

-- Create order record
INSERT INTO orders (order_id, product_id, quantity, status)
VALUES (1001, 101, 5, 'PENDING');

-- If constraint violation occurs, transaction will be rolled back
COMMIT;
```

**3. Isolation - Concurrent Access Control**
```sql
-- Example: Preventing dirty reads
-- Session 1
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;

UPDATE products SET price = 99.99 WHERE product_id = 1;
-- Price change not yet committed

-- Session 2 (running concurrently)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SELECT price FROM products WHERE product_id = 1;
-- Will see old price until Session 1 commits

-- Session 1 continues
COMMIT; -- Now Session 2 will see the new price
```

**4. Durability - Permanent Storage**
```sql
-- Example: Ensuring data persistence
START TRANSACTION;

INSERT INTO audit_log (user_id, action, timestamp)
VALUES (123, 'LOGIN', NOW());

UPDATE users 
SET last_login = NOW() 
WHERE user_id = 123;

COMMIT; -- Data is now permanently stored and survives system crashes
```

**Isolation Levels:**

**1. READ UNCOMMITTED (Lowest Isolation)**
```sql
-- Allows dirty reads
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

-- Session 1
START TRANSACTION;
UPDATE accounts SET balance = 5000 WHERE account_id = 'ACC001';
-- Don't commit yet

-- Session 2 can read uncommitted data
SELECT balance FROM accounts WHERE account_id = 'ACC001';
-- Returns 5000 even though transaction isn't committed
```

**2. READ COMMITTED (Default in most databases)**
```sql
-- Prevents dirty reads, allows non-repeatable reads
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

START TRANSACTION;

-- First read
SELECT balance FROM accounts WHERE account_id = 'ACC001';
-- Returns 1000

-- Another session commits a change
-- Second read in same transaction
SELECT balance FROM accounts WHERE account_id = 'ACC001';
-- May return different value (non-repeatable read)

COMMIT;
```

**3. REPEATABLE READ**
```sql
-- Prevents dirty and non-repeatable reads, allows phantom reads
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

START TRANSACTION;

-- First query
SELECT COUNT(*) FROM orders WHERE customer_id = 123;
-- Returns 5

-- Another session inserts a new order for customer 123

-- Second query in same transaction
SELECT COUNT(*) FROM orders WHERE customer_id = 123;
-- Still returns 5 (repeatable read)

-- But range queries might show phantom reads
SELECT * FROM orders WHERE customer_id = 123;
-- Might show the new order (phantom read)

COMMIT;
```

**4. SERIALIZABLE (Highest Isolation)**
```sql
-- Prevents all read phenomena
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

START TRANSACTION;

-- This transaction will have complete isolation
SELECT SUM(balance) FROM accounts WHERE branch_id = 'BR001';

-- No other transaction can modify accounts in BR001
-- until this transaction completes

UPDATE accounts 
SET balance = balance * 1.05 
WHERE branch_id = 'BR001';

COMMIT;
```

**Advanced Transaction Patterns:**

**Savepoints for Partial Rollback:**
```sql
START TRANSACTION;

-- First operation
INSERT INTO customers (name, email) VALUES ('John Doe', 'john@example.com');
SAVEPOINT sp1;

-- Second operation
INSERT INTO orders (customer_id, total) VALUES (LAST_INSERT_ID(), 100.00);
SAVEPOINT sp2;

-- Third operation that might fail
INSERT INTO order_items (order_id, product_id, quantity) 
VALUES (LAST_INSERT_ID(), 999, 1); -- Product doesn't exist

-- If error occurs, rollback to savepoint
IF @@ERROR <> 0
BEGIN
    ROLLBACK TO SAVEPOINT sp2;
    -- Customer and order are preserved, only order_items is rolled back
END

COMMIT;
```

**Distributed Transactions (Two-Phase Commit):**
```sql
-- Coordinator prepares all participants
XA START 'transaction_id';

-- Operations on multiple databases
INSERT INTO db1.orders (id, total) VALUES (1, 100);
INSERT INTO db2.inventory (product_id, quantity) VALUES (1, -1);

XA END 'transaction_id';
XA PREPARE 'transaction_id';

-- If all participants are ready
XA COMMIT 'transaction_id';
-- Otherwise
-- XA ROLLBACK 'transaction_id';
```

**Best Practices:**

1. **Keep transactions short** to minimize lock contention
2. **Use appropriate isolation levels** based on consistency requirements
3. **Handle deadlocks gracefully** with retry logic
4. **Avoid nested transactions** when possible
5. **Use connection pooling** for better resource management
6. **Monitor transaction logs** for performance optimization

---

### Q8: How do you implement database sharding and partitioning strategies for large-scale applications?
**Difficulty: Expert**

**Answer:**
Sharding and partitioning are techniques to distribute data across multiple storage units to improve performance, scalability, and manageability of large databases.

**Horizontal Partitioning (Sharding):**

**1. Range-Based Sharding:**
```sql
-- Example: User data sharded by user_id ranges
-- Shard 1: user_id 1-1000000
CREATE TABLE users_shard1 (
    user_id INT PRIMARY KEY CHECK (user_id BETWEEN 1 AND 1000000),
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- Shard 2: user_id 1000001-2000000
CREATE TABLE users_shard2 (
    user_id INT PRIMARY KEY CHECK (user_id BETWEEN 1000001 AND 2000000),
    username VARCHAR(50),
    email VARCHAR(100),
    created_at TIMESTAMP,
    INDEX idx_created_at (created_at)
);

-- Application logic for routing
CLASS UserRepository {
    private function getShardForUser($userId) {
        if ($userId <= 1000000) {
            return 'shard1';
        } elseif ($userId <= 2000000) {
            return 'shard2';
        }
        // Add more shards as needed
    }
    
    public function getUserById($userId) {
        $shard = $this->getShardForUser($userId);
        $connection = $this->getConnectionForShard($shard);
        return $connection->query("SELECT * FROM users_{$shard} WHERE user_id = ?", [$userId]);
    }
}
```

**2. Hash-Based Sharding:**
```sql
-- Shard determination using hash function
-- Example: 4 shards based on user_id hash

-- Shard routing logic
CLASS HashShardRouter {
    private $shardCount = 4;
    
    public function getShardForKey($key) {
        return crc32($key) % $this->shardCount;
    }
    
    public function insertUser($userData) {
        $shard = $this->getShardForKey($userData['user_id']);
        $connection = $this->getConnectionForShard($shard);
        
        return $connection->query(
            "INSERT INTO users_shard_{$shard} (user_id, username, email) VALUES (?, ?, ?)",
            [$userData['user_id'], $userData['username'], $userData['email']]
        );
    }
}

-- Database schema for each shard
CREATE TABLE users_shard_0 (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    shard_key INT AS (user_id % 4) STORED,
    INDEX idx_shard_key (shard_key)
);
```

**3. Directory-Based Sharding:**
```sql
-- Lookup service for shard mapping
CREATE TABLE shard_directory (
    entity_id VARCHAR(50) PRIMARY KEY,
    shard_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_shard_id (shard_id)
);

-- Application service
CLASS DirectoryShardRouter {
    public function getShardForEntity($entityId) {
        $result = $this->directoryDb->query(
            "SELECT shard_id FROM shard_directory WHERE entity_id = ?",
            [$entityId]
        );
        
        if (!$result) {
            // Assign to least loaded shard
            $shardId = $this->getLeastLoadedShard();
            $this->directoryDb->query(
                "INSERT INTO shard_directory (entity_id, shard_id) VALUES (?, ?)",
                [$entityId, $shardId]
            );
            return $shardId;
        }
        
        return $result['shard_id'];
    }
}
```

**Vertical Partitioning:**

**1. Column-Based Partitioning:**
```sql
-- Split large table into frequently and rarely accessed columns
-- Hot data (frequently accessed)
CREATE TABLE users_hot (
    user_id INT PRIMARY KEY,
    username VARCHAR(50),
    email VARCHAR(100),
    last_login TIMESTAMP,
    status ENUM('active', 'inactive'),
    INDEX idx_last_login (last_login),
    INDEX idx_status (status)
);

-- Cold data (rarely accessed)
CREATE TABLE users_cold (
    user_id INT PRIMARY KEY,
    full_name VARCHAR(200),
    address TEXT,
    phone VARCHAR(20),
    bio TEXT,
    preferences JSON,
    FOREIGN KEY (user_id) REFERENCES users_hot(user_id)
);

-- Application layer joins when needed
CLASS UserService {
    public function getUserProfile($userId) {
        // Get hot data first
        $hotData = $this->hotDb->query(
            "SELECT * FROM users_hot WHERE user_id = ?",
            [$userId]
        );
        
        // Get cold data only if needed
        if ($includeFullProfile) {
            $coldData = $this->coldDb->query(
                "SELECT * FROM users_cold WHERE user_id = ?",
                [$userId]
            );
            return array_merge($hotData, $coldData);
        }
        
        return $hotData;
    }
}
```

**Database-Native Partitioning:**

**1. MySQL Partitioning:**
```sql
-- Range partitioning by date
CREATE TABLE sales (
    id INT AUTO_INCREMENT,
    sale_date DATE,
    amount DECIMAL(10,2),
    customer_id INT,
    PRIMARY KEY (id, sale_date)
)
PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p2020 VALUES LESS THAN (2021),
    PARTITION p2021 VALUES LESS THAN (2022),
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Hash partitioning for even distribution
CREATE TABLE user_sessions (
    session_id VARCHAR(64) PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP,
    data JSON
)
PARTITION BY HASH(user_id)
PARTITIONS 8;

-- List partitioning by region
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT,
    customer_id INT,
    region VARCHAR(10),
    order_date DATE,
    PRIMARY KEY (order_id, region)
)
PARTITION BY LIST COLUMNS(region) (
    PARTITION p_north VALUES IN ('US', 'CA'),
    PARTITION p_europe VALUES IN ('UK', 'DE', 'FR'),
    PARTITION p_asia VALUES IN ('JP', 'CN', 'IN'),
    PARTITION p_other VALUES IN (DEFAULT)
);
```

**2. PostgreSQL Partitioning:**
```sql
-- Declarative partitioning (PostgreSQL 10+)
CREATE TABLE measurements (
    id SERIAL,
    measurement_date DATE,
    temperature DECIMAL,
    humidity DECIMAL,
    location_id INT
) PARTITION BY RANGE (measurement_date);

-- Create partitions
CREATE TABLE measurements_2023_q1 PARTITION OF measurements
    FOR VALUES FROM ('2023-01-01') TO ('2023-04-01');

CREATE TABLE measurements_2023_q2 PARTITION OF measurements
    FOR VALUES FROM ('2023-04-01') TO ('2023-07-01');

-- Automatic partition creation
CREATE OR REPLACE FUNCTION create_monthly_partition()
RETURNS void AS $$
DECLARE
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
BEGIN
    start_date := date_trunc('month', CURRENT_DATE + interval '1 month');
    end_date := start_date + interval '1 month';
    partition_name := 'measurements_' || to_char(start_date, 'YYYY_MM');
    
    EXECUTE format('CREATE TABLE %I PARTITION OF measurements FOR VALUES FROM (%L) TO (%L)',
                   partition_name, start_date, end_date);
END;
$$ LANGUAGE plpgsql;
```

**Sharding Implementation Patterns:**

**1. Application-Level Sharding:**
```python
# Python example with multiple database connections
class ShardedDatabase:
    def __init__(self, shard_configs):
        self.shards = {}
        for shard_id, config in shard_configs.items():
            self.shards[shard_id] = psycopg2.connect(**config)
    
    def get_shard_for_key(self, key):
        return hash(key) % len(self.shards)
    
    def execute_on_shard(self, shard_id, query, params=None):
        cursor = self.shards[shard_id].cursor()
        cursor.execute(query, params)
        return cursor.fetchall()
    
    def execute_on_all_shards(self, query, params=None):
        results = []
        for shard_id in self.shards:
            result = self.execute_on_shard(shard_id, query, params)
            results.extend(result)
        return results
    
    def get_user(self, user_id):
        shard_id = self.get_shard_for_key(user_id)
        return self.execute_on_shard(
            shard_id,
            "SELECT * FROM users WHERE user_id = %s",
            (user_id,)
        )
    
    def get_users_by_email_domain(self, domain):
        # Cross-shard query
        return self.execute_on_all_shards(
            "SELECT * FROM users WHERE email LIKE %s",
            (f"%@{domain}",)
        )
```

**2. Middleware-Based Sharding:**
```javascript
// Node.js example with connection pooling
class ShardManager {
    constructor(shardConfigs) {
        this.pools = new Map();
        shardConfigs.forEach((config, shardId) => {
            this.pools.set(shardId, new Pool(config));
        });
    }
    
    getShardForKey(key) {
        return murmurhash(key) % this.pools.size;
    }
    
    async executeQuery(shardId, query, params = []) {
        const pool = this.pools.get(shardId);
        const client = await pool.connect();
        try {
            const result = await client.query(query, params);
            return result.rows;
        } finally {
            client.release();
        }
    }
    
    async executeOnAllShards(query, params = []) {
        const promises = Array.from(this.pools.keys()).map(shardId =>
            this.executeQuery(shardId, query, params)
        );
        const results = await Promise.all(promises);
        return results.flat();
    }
    
    async reshardData(oldShardCount, newShardCount) {
        // Implement data migration logic
        for (let oldShard = 0; oldShard < oldShardCount; oldShard++) {
            const data = await this.executeQuery(
                oldShard,
                'SELECT * FROM users'
            );
            
            for (const row of data) {
                const newShard = this.getShardForKey(row.user_id);
                if (newShard !== oldShard) {
                    await this.executeQuery(
                        newShard,
                        'INSERT INTO users VALUES ($1, $2, $3)',
                        [row.user_id, row.username, row.email]
                    );
                    await this.executeQuery(
                        oldShard,
                        'DELETE FROM users WHERE user_id = $1',
                        [row.user_id]
                    );
                }
            }
        }
    }
}
```

**Best Practices and Considerations:**

1. **Shard Key Selection:**
   - Choose keys with good distribution
   - Avoid hotspots
   - Consider query patterns

2. **Cross-Shard Operations:**
   - Minimize cross-shard joins
   - Use denormalization when appropriate
   - Implement eventual consistency patterns

3. **Monitoring and Maintenance:**
   - Track shard utilization
   - Monitor query performance
   - Plan for rebalancing

4. **Backup and Recovery:**
   - Coordinate backups across shards
   - Test disaster recovery procedures
   - Maintain data consistency during recovery

---

### Q9: How do you implement database backup, recovery, and disaster recovery strategies?
**Difficulty: Advanced**

**Answer:**
Database backup and recovery strategies are critical for ensuring data availability, integrity, and business continuity. Here's a comprehensive approach to implementing robust backup and disaster recovery solutions.

**Backup Types and Strategies:**

**1. Full Backup:**
```sql
-- MySQL Full Backup
mysqldump --single-transaction --routines --triggers \
  --all-databases > full_backup_$(date +%Y%m%d_%H%M%S).sql

-- PostgreSQL Full Backup
pg_dumpall -h localhost -U postgres > full_backup_$(date +%Y%m%d_%H%M%S).sql

-- SQL Server Full Backup
BACKUP DATABASE [ProductionDB] 
TO DISK = 'C:\Backups\ProductionDB_Full_20231201.bak'
WITH FORMAT, INIT, COMPRESSION;
```

**2. Incremental Backup:**
```sql
-- MySQL Binary Log for Point-in-Time Recovery
-- Enable binary logging in my.cnf
[mysqld]
log-bin=mysql-bin
server-id=1
binlog-format=ROW

-- Create incremental backup script
#!/bin/bash
BACKUP_DIR="/backups/incremental"
LAST_BACKUP=$(cat /var/log/mysql/last_backup_position.txt)

mysqlbinlog --start-position=$LAST_BACKUP \
  --stop-datetime="$(date '+%Y-%m-%d %H:%M:%S')" \
  /var/log/mysql/mysql-bin.* > "$BACKUP_DIR/incremental_$(date +%Y%m%d_%H%M%S).sql"

-- PostgreSQL WAL-based Incremental Backup
-- Configure postgresql.conf
wal_level = replica
archive_mode = on
archive_command = 'cp %p /backup/wal_archive/%f'

-- Create base backup
pg_basebackup -D /backup/base_backup -Ft -z -P
```

**3. Differential Backup:**
```sql
-- SQL Server Differential Backup
BACKUP DATABASE [ProductionDB] 
TO DISK = 'C:\Backups\ProductionDB_Diff_20231201.bak'
WITH DIFFERENTIAL, COMPRESSION;

-- Automated backup strategy
CREATE PROCEDURE sp_AutomatedBackup
AS
BEGIN
    DECLARE @BackupPath NVARCHAR(500)
    DECLARE @BackupType NVARCHAR(20)
    
    -- Determine backup type based on day of week
    IF DATEPART(WEEKDAY, GETDATE()) = 1 -- Sunday
        SET @BackupType = 'FULL'
    ELSE
        SET @BackupType = 'DIFFERENTIAL'
    
    SET @BackupPath = 'C:\Backups\ProductionDB_' + @BackupType + '_' + 
                      FORMAT(GETDATE(), 'yyyyMMdd_HHmmss') + '.bak'
    
    IF @BackupType = 'FULL'
        BACKUP DATABASE [ProductionDB] TO DISK = @BackupPath WITH COMPRESSION
    ELSE
        BACKUP DATABASE [ProductionDB] TO DISK = @BackupPath WITH DIFFERENTIAL, COMPRESSION
END
```

**Advanced Backup Automation:**

**1. Automated Backup Scripts:**
```bash
#!/bin/bash
# Comprehensive MySQL Backup Script

DB_HOST="localhost"
DB_USER="backup_user"
DB_PASS="secure_password"
BACKUP_DIR="/backups/mysql"
RETENTION_DAYS=30
S3_BUCKET="my-db-backups"

# Create backup directory
mkdir -p "$BACKUP_DIR/$(date +%Y/%m/%d)"

# Function to perform full backup
perform_full_backup() {
    local backup_file="$BACKUP_DIR/$(date +%Y/%m/%d)/full_backup_$(date +%Y%m%d_%H%M%S).sql.gz"
    
    mysqldump --single-transaction --routines --triggers \
        --all-databases -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASS" | \
        gzip > "$backup_file"
    
    # Verify backup integrity
    if [ ${PIPESTATUS[0]} -eq 0 ]; then
        echo "Full backup completed: $backup_file"
        # Upload to S3
        aws s3 cp "$backup_file" "s3://$S3_BUCKET/mysql/full/"
    else
        echo "Backup failed!" >&2
        exit 1
    fi
}

# Function to perform incremental backup
perform_incremental_backup() {
    local backup_file="$BACKUP_DIR/$(date +%Y/%m/%d)/incremental_$(date +%Y%m%d_%H%M%S).sql.gz"
    local last_position=$(cat /var/log/mysql/last_backup_position.txt 2>/dev/null || echo "4")
    
    mysqlbinlog --start-position="$last_position" \
        --stop-datetime="$(date '+%Y-%m-%d %H:%M:%S')" \
        /var/log/mysql/mysql-bin.* | gzip > "$backup_file"
    
    # Update last backup position
    mysql -h"$DB_HOST" -u"$DB_USER" -p"$DB_PASS" \
        -e "SHOW MASTER STATUS\G" | grep Position | awk '{print $2}' > \
        /var/log/mysql/last_backup_position.txt
    
    # Upload to S3
    aws s3 cp "$backup_file" "s3://$S3_BUCKET/mysql/incremental/"
}

# Cleanup old backups
cleanup_old_backups() {
    find "$BACKUP_DIR" -type f -mtime +$RETENTION_DAYS -delete
    
    # Cleanup S3 backups older than retention period
    aws s3 ls "s3://$S3_BUCKET/mysql/" --recursive | \
        awk '$1 < "'$(date -d "$RETENTION_DAYS days ago" +%Y-%m-%d)'" {print $4}' | \
        xargs -I {} aws s3 rm "s3://$S3_BUCKET/{}"
}

# Main execution
case "$(date +%u)" in
    7) # Sunday - Full backup
        perform_full_backup
        ;;
    *) # Other days - Incremental backup
        perform_incremental_backup
        ;;
esac

cleanup_old_backups
```

**2. PostgreSQL Continuous Archiving:**
```bash
#!/bin/bash
# PostgreSQL Continuous Archiving Setup

# Configure postgresql.conf
cat >> /etc/postgresql/13/main/postgresql.conf << EOF
wal_level = replica
archive_mode = on
archive_command = '/usr/local/bin/archive_wal.sh %p %f'
max_wal_senders = 3
wal_keep_segments = 32
EOF

# WAL archiving script
cat > /usr/local/bin/archive_wal.sh << 'EOF'
#!/bin/bash
WAL_FILE=$1
WAL_NAME=$2
ARCHIVE_DIR="/backup/wal_archive"
S3_BUCKET="my-pg-backups"

# Copy to local archive
cp "$WAL_FILE" "$ARCHIVE_DIR/$WAL_NAME"

# Upload to S3
aws s3 cp "$ARCHIVE_DIR/$WAL_NAME" "s3://$S3_BUCKET/wal/"

# Verify upload
if aws s3 ls "s3://$S3_BUCKET/wal/$WAL_NAME" > /dev/null; then
    exit 0
else
    exit 1
fi
EOF

chmod +x /usr/local/bin/archive_wal.sh

# Base backup script
cat > /usr/local/bin/pg_base_backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backup/base"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_PATH="$BACKUP_DIR/base_backup_$DATE"

# Create base backup
pg_basebackup -D "$BACKUP_PATH" -Ft -z -P -W

# Upload to S3
aws s3 sync "$BACKUP_PATH" "s3://my-pg-backups/base/base_backup_$DATE/"

# Cleanup old base backups (keep last 7)
ls -t "$BACKUP_DIR" | tail -n +8 | xargs -I {} rm -rf "$BACKUP_DIR/{}"
EOF

chmod +x /usr/local/bin/pg_base_backup.sh
```

**Recovery Procedures:**

**1. Point-in-Time Recovery (PITR):**
```sql
-- MySQL Point-in-Time Recovery
-- 1. Restore from full backup
mysql < full_backup_20231201_020000.sql

-- 2. Apply binary logs up to specific point
mysqlbinlog --start-datetime="2023-12-01 02:00:00" \
             --stop-datetime="2023-12-01 14:30:00" \
             mysql-bin.000001 mysql-bin.000002 | mysql

-- PostgreSQL Point-in-Time Recovery
-- 1. Stop PostgreSQL service
sudo systemctl stop postgresql

-- 2. Restore base backup
rm -rf /var/lib/postgresql/13/main/*
tar -xzf /backup/base/base_backup_20231201.tar.gz -C /var/lib/postgresql/13/main/

-- 3. Create recovery configuration
cat > /var/lib/postgresql/13/main/recovery.conf << EOF
restore_command = 'cp /backup/wal_archive/%f %p'
recovery_target_time = '2023-12-01 14:30:00'
recovery_target_action = 'promote'
EOF

-- 4. Start PostgreSQL
sudo systemctl start postgresql
```

**2. Automated Recovery Testing:**
```python
#!/usr/bin/env python3
# Automated Backup Verification and Recovery Testing

import subprocess
import datetime
import logging
import os
import tempfile

class BackupVerifier:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
    
    def verify_mysql_backup(self, backup_file):
        """Verify MySQL backup integrity"""
        try:
            # Create temporary database for testing
            test_db = f"test_restore_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
            
            # Create test database
            subprocess.run([
                'mysql', '-e', f'CREATE DATABASE {test_db}'
            ], check=True)
            
            # Restore backup to test database
            with open(backup_file, 'r') as f:
                subprocess.run([
                    'mysql', test_db
                ], stdin=f, check=True)
            
            # Verify data integrity
            result = subprocess.run([
                'mysql', '-e', 
                f'SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = "{test_db}"'
            ], capture_output=True, text=True, check=True)
            
            table_count = int(result.stdout.strip().split('\n')[1])
            
            # Cleanup test database
            subprocess.run([
                'mysql', '-e', f'DROP DATABASE {test_db}'
            ], check=True)
            
            self.logger.info(f"Backup verification successful. Tables restored: {table_count}")
            return True
            
        except subprocess.CalledProcessError as e:
            self.logger.error(f"Backup verification failed: {e}")
            return False
    
    def test_recovery_procedure(self):
        """Test complete recovery procedure"""
        try:
            # Create test environment
            with tempfile.TemporaryDirectory() as temp_dir:
                # Simulate disaster scenario
                self.logger.info("Starting recovery test...")
                
                # Test backup restoration
                latest_backup = self.get_latest_backup()
                if self.verify_mysql_backup(latest_backup):
                    self.logger.info("Recovery test passed")
                    return True
                else:
                    self.logger.error("Recovery test failed")
                    return False
                    
        except Exception as e:
            self.logger.error(f"Recovery test error: {e}")
            return False
    
    def get_latest_backup(self):
        """Get the latest backup file"""
        backup_dir = self.config['backup_directory']
        backup_files = [f for f in os.listdir(backup_dir) if f.endswith('.sql')]
        backup_files.sort(reverse=True)
        return os.path.join(backup_dir, backup_files[0])

# Usage
if __name__ == "__main__":
    config = {
        'backup_directory': '/backups/mysql',
        'test_database': 'backup_test'
    }
    
    verifier = BackupVerifier(config)
    verifier.test_recovery_procedure()
```

**Disaster Recovery Strategies:**

**1. Multi-Region Replication:**
```sql
-- MySQL Master-Slave Replication Setup
-- Master configuration (my.cnf)
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
binlog-do-db = production_db

-- Create replication user
CREATE USER 'replication'@'%' IDENTIFIED BY 'secure_password';
GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';
FLUSH PRIVILEGES;

-- Get master status
SHOW MASTER STATUS;

-- Slave configuration
[mysqld]
server-id = 2
relay-log = mysql-relay-bin
log-slave-updates = 1
read-only = 1

-- Configure slave
CHANGE MASTER TO
    MASTER_HOST='master-server-ip',
    MASTER_USER='replication',
    MASTER_PASSWORD='secure_password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=154;

START SLAVE;
SHOW SLAVE STATUS\G
```

**2. Cross-Region Backup Synchronization:**
```bash
#!/bin/bash
# Cross-region backup synchronization

PRIMARY_REGION="us-east-1"
SECONDARY_REGION="us-west-2"
BUCKET_NAME="my-db-backups"

# Sync backups to secondary region
aws s3 sync "s3://$BUCKET_NAME" "s3://$BUCKET_NAME-$SECONDARY_REGION" \
    --source-region "$PRIMARY_REGION" \
    --region "$SECONDARY_REGION"

# Verify sync
PRIMARY_COUNT=$(aws s3 ls "s3://$BUCKET_NAME" --recursive --region "$PRIMARY_REGION" | wc -l)
SECONDARY_COUNT=$(aws s3 ls "s3://$BUCKET_NAME-$SECONDARY_REGION" --recursive --region "$SECONDARY_REGION" | wc -l)

if [ "$PRIMARY_COUNT" -eq "$SECONDARY_COUNT" ]; then
    echo "Backup sync successful"
else
    echo "Backup sync failed - count mismatch" >&2
    exit 1
fi
```

**Best Practices:**

1. **3-2-1 Backup Rule**: 3 copies of data, 2 different media types, 1 offsite
2. **Regular Testing**: Test recovery procedures monthly
3. **Monitoring**: Set up alerts for backup failures
4. **Documentation**: Maintain detailed recovery procedures
5. **Encryption**: Encrypt backups both in transit and at rest
6. **Retention Policies**: Define clear backup retention schedules
7. **Automation**: Automate backup and verification processes

---

## Database Security

### Q10: How do you implement database security best practices and access control?
**Difficulty: Advanced**

**Answer:**
Database security involves multiple layers of protection including authentication, authorization, encryption, auditing, and network security. Here's a comprehensive approach to implementing robust database security.

**Authentication and Access Control:**

**1. Role-Based Access Control (RBAC):**
```sql
-- MySQL Role-Based Access Control
-- Create roles
CREATE ROLE 'app_read_only';
CREATE ROLE 'app_read_write';
CREATE ROLE 'app_admin';
CREATE ROLE 'data_analyst';
CREATE ROLE 'backup_operator';

-- Grant privileges to roles
-- Read-only role
GRANT SELECT ON production_db.* TO 'app_read_only';
GRANT SELECT ON production_db.users TO 'app_read_only';
GRANT SELECT ON production_db.orders TO 'app_read_only';

-- Read-write role
GRANT SELECT, INSERT, UPDATE ON production_db.* TO 'app_read_write';
GRANT DELETE ON production_db.sessions TO 'app_read_write';
GRANT DELETE ON production_db.temp_data TO 'app_read_write';

-- Admin role
GRANT ALL PRIVILEGES ON production_db.* TO 'app_admin';
GRANT CREATE, DROP ON production_db.* TO 'app_admin';

-- Data analyst role (limited access)
GRANT SELECT ON production_db.orders TO 'data_analyst';
GRANT SELECT ON production_db.products TO 'data_analyst';
GRANT SELECT ON production_db.analytics_views TO 'data_analyst';

-- Backup operator role
GRANT SELECT, LOCK TABLES, SHOW VIEW ON *.* TO 'backup_operator';
GRANT RELOAD, PROCESS ON *.* TO 'backup_operator';

-- Create users and assign roles
CREATE USER 'app_user'@'app-server-ip' IDENTIFIED BY 'strong_password';
CREATE USER 'analyst_user'@'%' IDENTIFIED BY 'analyst_password';
CREATE USER 'backup_user'@'backup-server-ip' IDENTIFIED BY 'backup_password';

-- Assign roles to users
GRANT 'app_read_write' TO 'app_user'@'app-server-ip';
GRANT 'data_analyst' TO 'analyst_user'@'%';
GRANT 'backup_operator' TO 'backup_user'@'backup-server-ip';

-- Set default roles
SET DEFAULT ROLE 'app_read_write' TO 'app_user'@'app-server-ip';
SET DEFAULT ROLE 'data_analyst' TO 'analyst_user'@'%';
SET DEFAULT ROLE 'backup_operator' TO 'backup_user'@'backup-server-ip';

FLUSH PRIVILEGES;
```

**2. PostgreSQL Row-Level Security (RLS):**
```sql
-- Enable Row-Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_data ENABLE ROW LEVEL SECURITY;

-- Create security policies
-- Users can only see their own data
CREATE POLICY user_self_access ON users
    FOR ALL TO app_role
    USING (user_id = current_setting('app.current_user_id')::INTEGER);

-- Orders policy - users can only see their own orders
CREATE POLICY user_orders_access ON orders
    FOR ALL TO app_role
    USING (customer_id = current_setting('app.current_user_id')::INTEGER);

-- Admin can see all data
CREATE POLICY admin_full_access ON users
    FOR ALL TO admin_role
    USING (true);

CREATE POLICY admin_orders_access ON orders
    FOR ALL TO admin_role
    USING (true);

-- Department-based access
CREATE POLICY department_access ON employee_data
    FOR ALL TO hr_role
    USING (department_id IN (
        SELECT department_id 
        FROM user_departments 
        WHERE user_id = current_setting('app.current_user_id')::INTEGER
    ));

-- Time-based access (business hours only)
CREATE POLICY business_hours_access ON sensitive_data
    FOR ALL TO business_user
    USING (
        EXTRACT(hour FROM now()) BETWEEN 9 AND 17 AND
        EXTRACT(dow FROM now()) BETWEEN 1 AND 5
    );
```

**3. Advanced Authentication:**
```sql
-- SQL Server Windows Authentication
CREATE LOGIN [DOMAIN\AppServiceAccount] FROM WINDOWS;
CREATE USER [AppUser] FOR LOGIN [DOMAIN\AppServiceAccount];

-- Certificate-based authentication
CREATE CERTIFICATE AppCertificate
    WITH SUBJECT = 'Application Certificate',
    EXPIRY_DATE = '2025-12-31';

CREATE LOGIN AppCertLogin FROM CERTIFICATE AppCertificate;
CREATE USER AppCertUser FOR LOGIN AppCertLogin;

-- Multi-factor authentication setup
-- Enable Azure AD authentication
CREATE LOGIN [user@company.com] FROM EXTERNAL PROVIDER;
CREATE USER [AzureADUser] FOR LOGIN [user@company.com];

-- Conditional access policy
CREATE SECURITY POLICY ConditionalAccess
ADD FILTER PREDICATE 
    dbo.CheckAccessConditions(USER_NAME(), CONNECTIONPROPERTY('client_net_address'))
ON dbo.sensitive_table
WITH (STATE = ON);
```

**Data Encryption:**

**1. Transparent Data Encryption (TDE):**
```sql
-- SQL Server TDE
-- Create master key
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'StrongMasterKeyPassword123!';

-- Create certificate
CREATE CERTIFICATE TDECert WITH SUBJECT = 'TDE Certificate';

-- Create database encryption key
USE ProductionDB;
CREATE DATABASE ENCRYPTION KEY
WITH ALGORITHM = AES_256
ENCRYPTION BY SERVER CERTIFICATE TDECert;

-- Enable TDE
ALTER DATABASE ProductionDB SET ENCRYPTION ON;

-- Verify encryption status
SELECT 
    db_name(database_id) AS database_name,
    encryption_state,
    encryption_state_desc,
    percent_complete
FROM sys.dm_database_encryption_keys;
```

**2. Column-Level Encryption:**
```sql
-- MySQL Column Encryption
-- Create encrypted columns
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    -- Encrypt sensitive data
    ssn VARBINARY(256),
    credit_card VARBINARY(256),
    phone VARBINARY(256),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Application-level encryption functions
DELIMITER //
CREATE FUNCTION encrypt_data(plain_text TEXT, encryption_key VARCHAR(32))
RETURNS VARBINARY(256)
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN AES_ENCRYPT(plain_text, encryption_key);
END //

CREATE FUNCTION decrypt_data(encrypted_data VARBINARY(256), encryption_key VARCHAR(32))
RETURNS TEXT
READS SQL DATA
DETERMINISTIC
BEGIN
    RETURN AES_DECRYPT(encrypted_data, encryption_key);
END //
DELIMITER ;

-- Insert encrypted data
INSERT INTO users (username, email, ssn, credit_card, phone)
VALUES (
    'john_doe',
    'john@example.com',
    encrypt_data('123-45-6789', 'encryption_key_123'),
    encrypt_data('4111-1111-1111-1111', 'encryption_key_123'),
    encrypt_data('555-123-4567', 'encryption_key_123')
);

-- Query with decryption
SELECT 
    username,
    email,
    decrypt_data(ssn, 'encryption_key_123') AS ssn,
    CONCAT('****-****-****-', RIGHT(decrypt_data(credit_card, 'encryption_key_123'), 4)) AS masked_card
FROM users
WHERE id = 1;
```

**3. PostgreSQL Encryption:**
```sql
-- Install pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create table with encrypted columns
CREATE TABLE secure_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    -- Encrypted columns
    ssn_encrypted BYTEA,
    credit_card_encrypted BYTEA,
    phone_encrypted BYTEA,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Insert with encryption
INSERT INTO secure_users (username, email, ssn_encrypted, credit_card_encrypted, phone_encrypted)
VALUES (
    'jane_doe',
    'jane@example.com',
    pgp_sym_encrypt('987-65-4321', 'encryption_key'),
    pgp_sym_encrypt('5555-4444-3333-2222', 'encryption_key'),
    pgp_sym_encrypt('555-987-6543', 'encryption_key')
);

-- Query with decryption
SELECT 
    username,
    email,
    pgp_sym_decrypt(ssn_encrypted, 'encryption_key') AS ssn,
    CONCAT('****-****-****-', RIGHT(pgp_sym_decrypt(credit_card_encrypted, 'encryption_key'), 4)) AS masked_card
FROM secure_users
WHERE id = 1;
```

**Auditing and Monitoring:**

**1. Database Audit Logging:**
```sql
-- MySQL Audit Plugin
-- Install audit plugin
INSTALL PLUGIN audit_log SONAME 'audit_log.so';

-- Configure audit settings
SET GLOBAL audit_log_file = '/var/log/mysql/audit.log';
SET GLOBAL audit_log_format = 'JSON';
SET GLOBAL audit_log_policy = 'ALL';
SET GLOBAL audit_log_rotate_on_size = 1073741824; -- 1GB

-- SQL Server Audit
CREATE SERVER AUDIT ProductionAudit
TO FILE (
    FILEPATH = 'C:\AuditLogs\',
    MAXSIZE = 100 MB,
    MAX_ROLLOVER_FILES = 10
)
WITH (QUEUE_DELAY = 1000, ON_FAILURE = CONTINUE);

-- Enable audit
ALTER SERVER AUDIT ProductionAudit WITH (STATE = ON);

-- Create database audit specification
CREATE DATABASE AUDIT SPECIFICATION ProductionDB_Audit
FOR SERVER AUDIT ProductionAudit
ADD (SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo BY public),
ADD (EXECUTE ON SCHEMA::dbo BY public)
WITH (STATE = ON);
```

**2. Real-time Security Monitoring:**
```python
#!/usr/bin/env python3
# Database Security Monitor

import mysql.connector
import logging
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
import json

class DatabaseSecurityMonitor:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
    def check_failed_logins(self):
        """Monitor failed login attempts"""
        try:
            conn = mysql.connector.connect(**self.config['database'])
            cursor = conn.cursor()
            
            # Check for failed logins in last hour
            query = """
            SELECT 
                user,
                host,
                COUNT(*) as failed_attempts,
                MAX(timestamp) as last_attempt
            FROM mysql.general_log 
            WHERE command_type = 'Connect' 
                AND argument LIKE '%Access denied%'
                AND timestamp > NOW() - INTERVAL 1 HOUR
            GROUP BY user, host
            HAVING failed_attempts > 5
            """
            
            cursor.execute(query)
            results = cursor.fetchall()
            
            for row in results:
                self.send_security_alert(
                    f"Multiple failed login attempts detected: {row[2]} attempts from {row[0]}@{row[1]}"
                )
                
        except Exception as e:
            self.logger.error(f"Failed login check error: {e}")
        finally:
            if conn:
                conn.close()
    
    def check_privilege_escalation(self):
        """Monitor privilege changes"""
        try:
            conn = mysql.connector.connect(**self.config['database'])
            cursor = conn.cursor()
            
            # Check for recent privilege grants
            query = """
            SELECT 
                user,
                host,
                db,
                table_name,
                privilege_type,
                timestamp
            FROM information_schema.user_privileges up
            JOIN mysql.general_log gl ON gl.argument LIKE CONCAT('%GRANT%', up.privilege_type, '%')
            WHERE gl.timestamp > NOW() - INTERVAL 1 HOUR
            """
            
            cursor.execute(query)
            results = cursor.fetchall()
            
            for row in results:
                if row[4] in ['ALL PRIVILEGES', 'SUPER', 'FILE', 'PROCESS']:
                    self.send_security_alert(
                        f"High-privilege grant detected: {row[4]} granted to {row[0]}@{row[1]}"
                    )
                    
        except Exception as e:
            self.logger.error(f"Privilege escalation check error: {e}")
        finally:
            if conn:
                conn.close()
    
    def check_suspicious_queries(self):
        """Monitor for suspicious query patterns"""
        suspicious_patterns = [
            'UNION.*SELECT.*FROM.*information_schema',
            'SELECT.*FROM.*mysql\.user',
            'LOAD_FILE\(',
            'INTO.*OUTFILE',
            'BENCHMARK\(',
            'SLEEP\(',
            '--.*',
            '/\*.*\*/'
        ]
        
        try:
            conn = mysql.connector.connect(**self.config['database'])
            cursor = conn.cursor()
            
            for pattern in suspicious_patterns:
                query = f"""
                SELECT 
                    user_host,
                    argument,
                    timestamp
                FROM mysql.general_log 
                WHERE argument REGEXP '{pattern}'
                    AND timestamp > NOW() - INTERVAL 1 HOUR
                LIMIT 10
                """
                
                cursor.execute(query)
                results = cursor.fetchall()
                
                for row in results:
                    self.send_security_alert(
                        f"Suspicious query detected from {row[0]}: {row[1][:100]}..."
                    )
                    
        except Exception as e:
            self.logger.error(f"Suspicious query check error: {e}")
        finally:
            if conn:
                conn.close()
    
    def send_security_alert(self, message):
        """Send security alert notification"""
        try:
            msg = MIMEText(f"Database Security Alert: {message}")
            msg['Subject'] = 'Database Security Alert'
            msg['From'] = self.config['email']['from']
            msg['To'] = self.config['email']['to']
            
            server = smtplib.SMTP(self.config['email']['smtp_server'])
            server.starttls()
            server.login(self.config['email']['username'], self.config['email']['password'])
            server.send_message(msg)
            server.quit()
            
            self.logger.warning(f"Security alert sent: {message}")
            
        except Exception as e:
            self.logger.error(f"Failed to send security alert: {e}")
    
    def run_security_checks(self):
        """Run all security checks"""
        self.check_failed_logins()
        self.check_privilege_escalation()
        self.check_suspicious_queries()

# Usage
if __name__ == "__main__":
    config = {
        'database': {
            'host': 'localhost',
            'user': 'security_monitor',
            'password': 'monitor_password',
            'database': 'mysql'
        },
        'email': {
            'smtp_server': 'smtp.company.com',
            'from': 'db-security@company.com',
            'to': 'security-team@company.com',
            'username': 'alerts@company.com',
            'password': 'email_password'
        }
    }
    
    monitor = DatabaseSecurityMonitor(config)
    monitor.run_security_checks()
```

**Network Security:**

**1. SSL/TLS Configuration:**
```sql
-- MySQL SSL Configuration
-- Generate SSL certificates
-- mysql_ssl_rsa_setup --datadir=/var/lib/mysql

-- Configure SSL in my.cnf
[mysqld]
ssl-ca=/var/lib/mysql/ca.pem
ssl-cert=/var/lib/mysql/server-cert.pem
ssl-key=/var/lib/mysql/server-key.pem
require_secure_transport=ON

-- Create SSL-required users
CREATE USER 'secure_user'@'%' IDENTIFIED BY 'password' REQUIRE SSL;
GRANT SELECT ON production_db.* TO 'secure_user'@'%';

-- PostgreSQL SSL Configuration
-- postgresql.conf
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
ssl_ca_file = 'ca.crt'
ssl_crl_file = 'server.crl'

-- pg_hba.conf - require SSL
hostssl all all 0.0.0.0/0 md5
```

**2. Firewall and Network Isolation:**
```bash
#!/bin/bash
# Database firewall configuration

# Allow only specific application servers
iptables -A INPUT -p tcp --dport 3306 -s 10.0.1.100 -j ACCEPT  # App Server 1
iptables -A INPUT -p tcp --dport 3306 -s 10.0.1.101 -j ACCEPT  # App Server 2
iptables -A INPUT -p tcp --dport 3306 -s 10.0.1.102 -j ACCEPT  # Backup Server

# Allow monitoring from specific subnet
iptables -A INPUT -p tcp --dport 3306 -s 10.0.2.0/24 -j ACCEPT  # Monitoring subnet

# Drop all other MySQL connections
iptables -A INPUT -p tcp --dport 3306 -j DROP

# Save rules
iptables-save > /etc/iptables/rules.v4
```

**Best Practices Summary:**

1. **Principle of Least Privilege**: Grant minimum necessary permissions
2. **Defense in Depth**: Multiple security layers
3. **Regular Security Audits**: Periodic access reviews
4. **Encryption**: Encrypt data at rest and in transit
5. **Monitoring**: Real-time security monitoring and alerting
6. **Patch Management**: Keep database software updated
7. **Backup Security**: Secure and test backup procedures
8. **Network Segmentation**: Isolate database servers

---

## Replication and Scaling

### Q11: How do you implement database replication and high availability strategies?
**Difficulty: Advanced**

**Answer:**
Database replication and high availability are crucial for ensuring system reliability, data redundancy, and minimal downtime. Here's a comprehensive approach to implementing robust replication and HA strategies.

**MySQL Replication Strategies:**

**1. Master-Slave Replication:**
```sql
-- Master Configuration (my.cnf)
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
binlog-do-db = production_db
expire_logs_days = 7
max_binlog_size = 100M

-- Enable GTID for easier failover
gtid-mode = ON
enforce-gtid-consistency = ON
log-slave-updates = ON

-- Create replication user
CREATE USER 'replication'@'%' IDENTIFIED BY 'secure_replication_password';
GRANT REPLICATION SLAVE ON *.* TO 'replication'@'%';
FLUSH PRIVILEGES;

-- Get master status
SHOW MASTER STATUS;

-- Slave Configuration (my.cnf)
[mysqld]
server-id = 2
relay-log = mysql-relay-bin
log-slave-updates = ON
read-only = ON
gtid-mode = ON
enforce-gtid-consistency = ON

-- Configure slave
CHANGE MASTER TO
    MASTER_HOST='master-server-ip',
    MASTER_USER='replication',
    MASTER_PASSWORD='secure_replication_password',
    MASTER_AUTO_POSITION = 1;

START SLAVE;
SHOW SLAVE STATUS\G
```

**2. Master-Master Replication:**
```sql
-- Server 1 Configuration (my.cnf)
[mysqld]
server-id = 1
log-bin = mysql-bin
binlog-format = ROW
auto-increment-increment = 2
auto-increment-offset = 1
gtid-mode = ON
enforce-gtid-consistency = ON
log-slave-updates = ON

-- Server 2 Configuration (my.cnf)
[mysqld]
server-id = 2
log-bin = mysql-bin
binlog-format = ROW
auto-increment-increment = 2
auto-increment-offset = 2
gtid-mode = ON
enforce-gtid-consistency = ON
log-slave-updates = ON

-- On Server 1: Configure Server 2 as slave
CHANGE MASTER TO
    MASTER_HOST='server2-ip',
    MASTER_USER='replication',
    MASTER_PASSWORD='secure_password',
    MASTER_AUTO_POSITION = 1;

-- On Server 2: Configure Server 1 as slave
CHANGE MASTER TO
    MASTER_HOST='server1-ip',
    MASTER_USER='replication',
    MASTER_PASSWORD='secure_password',
    MASTER_AUTO_POSITION = 1;

START SLAVE;
```

**3. MySQL Group Replication:**
```sql
-- Install Group Replication plugin
INSTALL PLUGIN group_replication SONAME 'group_replication.so';

-- Configure Group Replication (my.cnf)
[mysqld]
# Group Replication settings
loose-group_replication_group_name = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"
loose-group_replication_start_on_boot = off
loose-group_replication_local_address = "node1:33061"
loose-group_replication_group_seeds = "node1:33061,node2:33061,node3:33061"
loose-group_replication_bootstrap_group = off

-- GTID settings
gtid_mode = ON
enforce_gtid_consistency = ON
log_bin = binlog
log_slave_updates = ON
binlog_format = ROW
binlog_checksum = NONE

-- Start Group Replication on first node
SET GLOBAL group_replication_bootstrap_group=ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group=OFF;

-- Join other nodes
START GROUP_REPLICATION;

-- Check group status
SELECT * FROM performance_schema.replication_group_members;
```

**PostgreSQL Replication:**

**1. Streaming Replication:**
```sql
-- Primary server configuration (postgresql.conf)
wal_level = replica
max_wal_senders = 3
wal_keep_segments = 64
archive_mode = on
archive_command = 'cp %p /archive/%f'

-- Create replication user
CREATE USER replication REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD 'secure_password';

-- Configure pg_hba.conf
host replication replication standby-server-ip/32 md5

-- Standby server setup
# Stop PostgreSQL
sudo systemctl stop postgresql

# Remove existing data
rm -rf /var/lib/postgresql/13/main/*

# Create base backup
pg_basebackup -h primary-server-ip -D /var/lib/postgresql/13/main -U replication -P -W

# Create recovery.conf
cat > /var/lib/postgresql/13/main/recovery.conf << EOF
standby_mode = 'on'
primary_conninfo = 'host=primary-server-ip port=5432 user=replication password=secure_password'
restore_command = 'cp /archive/%f %p'
EOF

# Start standby
sudo systemctl start postgresql
```

**2. Logical Replication:**
```sql
-- Publisher configuration (postgresql.conf)
wal_level = logical
max_replication_slots = 4
max_wal_senders = 4

-- Create publication
CREATE PUBLICATION my_publication FOR ALL TABLES;

-- Subscriber setup
CREATE SUBSCRIPTION my_subscription
    CONNECTION 'host=publisher-ip port=5432 user=replication password=secure_password dbname=mydb'
    PUBLICATION my_publication;

-- Monitor replication
SELECT * FROM pg_stat_replication;
SELECT * FROM pg_stat_subscription;
```

**High Availability with Load Balancers:**

**1. HAProxy Configuration:**
```bash
# /etc/haproxy/haproxy.cfg
global
    daemon
    maxconn 4096
    log stdout local0

defaults
    mode tcp
    timeout connect 5000ms
    timeout client 50000ms
    timeout server 50000ms
    option tcplog

# MySQL Master-Slave Setup
frontend mysql_frontend
    bind *:3306
    default_backend mysql_master

backend mysql_master
    balance roundrobin
    option mysql-check user haproxy_check
    server mysql1 10.0.1.10:3306 check
    server mysql2 10.0.1.11:3306 check backup

# Read-only slaves
frontend mysql_read_frontend
    bind *:3307
    default_backend mysql_slaves

backend mysql_slaves
    balance roundrobin
    option mysql-check user haproxy_check
    server mysql_slave1 10.0.1.12:3306 check
    server mysql_slave2 10.0.1.13:3306 check

# Statistics
listen stats
    bind *:8080
    stats enable
    stats uri /stats
    stats refresh 30s
```

**2. Keepalived for VIP Management:**
```bash
# /etc/keepalived/keepalived.conf
vrrp_script chk_haproxy {
    script "/bin/kill -0 `cat /var/run/haproxy.pid`"
    interval 2
    weight 2
    fall 3
    rise 2
}

vrrp_instance VI_1 {
    state MASTER
    interface eth0
    virtual_router_id 51
    priority 101
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass mypassword
    }
    virtual_ipaddress {
        10.0.1.100
    }
    track_script {
        chk_haproxy
    }
}
```

**Automated Failover Solutions:**

**1. MySQL MHA (Master High Availability):**
```bash
#!/bin/bash
# MHA Configuration

# Install MHA
yum install mha4mysql-manager mha4mysql-node

# MHA configuration file
cat > /etc/mha/app1.cnf << EOF
[server default]
manager_log=/var/log/mha/app1/manager.log
manager_workdir=/var/log/mha/app1
master_binlog_dir=/var/lib/mysql
user=mha
password=mha_password
ping_interval=1
repl_user=replication
repl_password=repl_password
ssh_user=root

[server1]
hostname=mysql1
port=3306

[server2]
hostname=mysql2
port=3306
candidate_master=1

[server3]
hostname=mysql3
port=3306
EOF

# Start MHA manager
masterha_manager --conf=/etc/mha/app1.cnf

# Check status
masterha_check_status --conf=/etc/mha/app1.cnf
```

**2. Patroni for PostgreSQL:**
```yaml
# /etc/patroni/patroni.yml
scope: postgres-cluster
namespace: /db/
name: postgresql0

restapi:
  listen: 0.0.0.0:8008
  connect_address: 10.0.1.10:8008

etcd:
  hosts: 10.0.1.10:2379,10.0.1.11:2379,10.0.1.12:2379

bootstrap:
  dcs:
    ttl: 30
    loop_wait: 10
    retry_timeout: 30
    maximum_lag_on_failover: 1048576
    postgresql:
      use_pg_rewind: true
      parameters:
        wal_level: replica
        hot_standby: "on"
        wal_keep_segments: 8
        max_wal_senders: 10
        max_replication_slots: 10
        wal_log_hints: "on"

  initdb:
  - encoding: UTF8
  - data-checksums

  pg_hba:
  - host replication replicator 127.0.0.1/32 md5
  - host replication replicator 10.0.1.0/24 md5
  - host all all 0.0.0.0/0 md5

  users:
    admin:
      password: admin_password
      options:
        - createrole
        - createdb

postgresql:
  listen: 0.0.0.0:5432
  connect_address: 10.0.1.10:5432
  data_dir: /data/postgresql0
  bin_dir: /usr/lib/postgresql/13/bin
  pgpass: /tmp/pgpass0
  authentication:
    replication:
      username: replicator
      password: rep_password
    superuser:
      username: postgres
      password: postgres_password
  parameters:
    unix_socket_directories: '.'

tags:
    nofailover: false
    noloadbalance: false
    clonefrom: false
    nosync: false
```

**Monitoring and Health Checks:**

**1. Replication Monitoring Script:**
```python
#!/usr/bin/env python3
# Database Replication Monitor

import mysql.connector
import psycopg2
import time
import logging
import smtplib
from email.mime.text import MIMEText

class ReplicationMonitor:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        
    def check_mysql_replication(self):
        """Monitor MySQL replication lag"""
        try:
            # Connect to slave
            slave_conn = mysql.connector.connect(**self.config['mysql']['slave'])
            cursor = slave_conn.cursor()
            
            # Check slave status
            cursor.execute("SHOW SLAVE STATUS")
            result = cursor.fetchone()
            
            if result:
                slave_io_running = result[10]  # Slave_IO_Running
                slave_sql_running = result[11]  # Slave_SQL_Running
                seconds_behind_master = result[32]  # Seconds_Behind_Master
                
                if slave_io_running != 'Yes' or slave_sql_running != 'Yes':
                    self.send_alert(f"MySQL replication stopped: IO={slave_io_running}, SQL={slave_sql_running}")
                    return False
                    
                if seconds_behind_master and seconds_behind_master > self.config['mysql']['max_lag']:
                    self.send_alert(f"MySQL replication lag: {seconds_behind_master} seconds")
                    return False
                    
                self.logger.info(f"MySQL replication healthy: lag={seconds_behind_master}s")
                return True
            else:
                self.send_alert("MySQL slave status unavailable")
                return False
                
        except Exception as e:
            self.logger.error(f"MySQL replication check failed: {e}")
            self.send_alert(f"MySQL replication check error: {e}")
            return False
        finally:
            if slave_conn:
                slave_conn.close()
    
    def check_postgresql_replication(self):
        """Monitor PostgreSQL replication lag"""
        try:
            # Connect to primary
            primary_conn = psycopg2.connect(**self.config['postgresql']['primary'])
            primary_cursor = primary_conn.cursor()
            
            # Connect to standby
            standby_conn = psycopg2.connect(**self.config['postgresql']['standby'])
            standby_cursor = standby_conn.cursor()
            
            # Get WAL positions
            primary_cursor.execute("SELECT pg_current_wal_lsn()")
            primary_lsn = primary_cursor.fetchone()[0]
            
            standby_cursor.execute("SELECT pg_last_wal_receive_lsn(), pg_last_wal_replay_lsn()")
            receive_lsn, replay_lsn = standby_cursor.fetchone()
            
            # Calculate lag
            primary_cursor.execute(
                "SELECT pg_wal_lsn_diff(%s, %s) AS receive_lag, pg_wal_lsn_diff(%s, %s) AS replay_lag",
                (primary_lsn, receive_lsn, receive_lsn, replay_lsn)
            )
            receive_lag, replay_lag = primary_cursor.fetchone()
            
            max_lag = self.config['postgresql']['max_lag']
            if receive_lag > max_lag or replay_lag > max_lag:
                self.send_alert(f"PostgreSQL replication lag: receive={receive_lag}, replay={replay_lag}")
                return False
                
            self.logger.info(f"PostgreSQL replication healthy: receive_lag={receive_lag}, replay_lag={replay_lag}")
            return True
            
        except Exception as e:
            self.logger.error(f"PostgreSQL replication check failed: {e}")
            self.send_alert(f"PostgreSQL replication check error: {e}")
            return False
        finally:
            if primary_conn:
                primary_conn.close()
            if standby_conn:
                standby_conn.close()
    
    def send_alert(self, message):
        """Send alert notification"""
        try:
            msg = MIMEText(f"Database Replication Alert: {message}")
            msg['Subject'] = 'Database Replication Alert'
            msg['From'] = self.config['email']['from']
            msg['To'] = self.config['email']['to']
            
            server = smtplib.SMTP(self.config['email']['smtp_server'])
            server.starttls()
            server.login(self.config['email']['username'], self.config['email']['password'])
            server.send_message(msg)
            server.quit()
            
            self.logger.warning(f"Alert sent: {message}")
            
        except Exception as e:
            self.logger.error(f"Failed to send alert: {e}")
    
    def run_checks(self):
        """Run all replication checks"""
        mysql_healthy = self.check_mysql_replication()
        postgresql_healthy = self.check_postgresql_replication()
        
        return mysql_healthy and postgresql_healthy

# Usage
if __name__ == "__main__":
    config = {
        'mysql': {
            'slave': {
                'host': 'mysql-slave',
                'user': 'monitor',
                'password': 'monitor_password',
                'database': 'mysql'
            },
            'max_lag': 30  # seconds
        },
        'postgresql': {
            'primary': {
                'host': 'pg-primary',
                'user': 'monitor',
                'password': 'monitor_password',
                'database': 'postgres'
            },
            'standby': {
                'host': 'pg-standby',
                'user': 'monitor',
                'password': 'monitor_password',
                'database': 'postgres'
            },
            'max_lag': 1048576  # bytes
        },
        'email': {
            'smtp_server': 'smtp.company.com',
            'from': 'db-monitor@company.com',
            'to': 'dba-team@company.com',
            'username': 'alerts@company.com',
            'password': 'email_password'
        }
    }
    
    monitor = ReplicationMonitor(config)
    
    while True:
        monitor.run_checks()
        time.sleep(60)  # Check every minute
```

**Best Practices:**

1. **Monitor Replication Lag**: Set up alerts for replication delays
2. **Test Failover Procedures**: Regular failover testing
3. **Network Redundancy**: Multiple network paths between servers
4. **Geographic Distribution**: Cross-region replication for disaster recovery
5. **Automated Health Checks**: Continuous monitoring of database health
6. **Documentation**: Maintain detailed runbooks for failover procedures
7. **Backup Verification**: Regular testing of backup restoration
8. **Capacity Planning**: Monitor resource usage and plan for growth

---

## Advanced Topics

### Q12: How do you implement database performance monitoring and optimization?
**Difficulty: Advanced**

**Answer:**
Database performance monitoring and optimization require a systematic approach involving metrics collection, analysis, and continuous improvement. Here's a comprehensive strategy for implementing effective database performance management.

**Performance Metrics and Monitoring:**

**1. Key Performance Indicators (KPIs):**
```sql
-- MySQL Performance Metrics
-- Query performance
SELECT 
    schema_name,
    digest_text,
    count_star,
    avg_timer_wait/1000000000 as avg_exec_time_sec,
    sum_timer_wait/1000000000 as total_exec_time_sec,
    sum_rows_examined,
    sum_rows_sent
FROM performance_schema.events_statements_summary_by_digest
ORDER BY avg_timer_wait DESC
LIMIT 10;

-- Connection metrics
SELECT 
    variable_name,
    variable_value
FROM performance_schema.global_status
WHERE variable_name IN (
    'Threads_connected',
    'Threads_running',
    'Max_used_connections',
    'Connection_errors_max_connections'
);

-- InnoDB metrics
SELECT 
    variable_name,
    variable_value
FROM performance_schema.global_status
WHERE variable_name LIKE 'Innodb%'
AND variable_name IN (
    'Innodb_buffer_pool_read_requests',
    'Innodb_buffer_pool_reads',
    'Innodb_buffer_pool_pages_dirty',
    'Innodb_buffer_pool_pages_free',
    'Innodb_rows_read',
    'Innodb_rows_inserted',
    'Innodb_rows_updated',
    'Innodb_rows_deleted'
);

-- PostgreSQL Performance Metrics
-- Query performance
SELECT 
    query,
    calls,
    total_time,
    mean_time,
    rows,
    100.0 * shared_blks_hit / nullif(shared_blks_hit + shared_blks_read, 0) AS hit_percent
FROM pg_stat_statements
ORDER BY total_time DESC
LIMIT 10;

-- Database activity
SELECT 
    datname,
    numbackends,
    xact_commit,
    xact_rollback,
    blks_read,
    blks_hit,
    tup_returned,
    tup_fetched,
    tup_inserted,
    tup_updated,
    tup_deleted
FROM pg_stat_database;

-- Index usage
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    idx_tup_read,
    idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan DESC;
```

**2. Automated Performance Monitoring System:**
```python
#!/usr/bin/env python3
# Comprehensive Database Performance Monitor

import mysql.connector
import psycopg2
import time
import json
import logging
import smtplib
from email.mime.text import MIMEText
from datetime import datetime, timedelta
import matplotlib.pyplot as plt
import pandas as pd

class DatabasePerformanceMonitor:
    def __init__(self, config):
        self.config = config
        self.logger = logging.getLogger(__name__)
        self.metrics_history = []
        
    def collect_mysql_metrics(self):
        """Collect MySQL performance metrics"""
        try:
            conn = mysql.connector.connect(**self.config['mysql'])
            cursor = conn.cursor()
            
            metrics = {
                'timestamp': datetime.now(),
                'database_type': 'mysql',
                'metrics': {}
            }
            
            # Query performance metrics
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_queries,
                    AVG(avg_timer_wait)/1000000000 as avg_query_time,
                    MAX(avg_timer_wait)/1000000000 as max_query_time,
                    SUM(sum_rows_examined) as total_rows_examined,
                    SUM(sum_rows_sent) as total_rows_sent
                FROM performance_schema.events_statements_summary_by_digest
                WHERE last_seen > NOW() - INTERVAL 5 MINUTE
            """)
            
            query_metrics = cursor.fetchone()
            metrics['metrics']['query_performance'] = {
                'total_queries': query_metrics[0],
                'avg_query_time': float(query_metrics[1] or 0),
                'max_query_time': float(query_metrics[2] or 0),
                'total_rows_examined': query_metrics[3],
                'total_rows_sent': query_metrics[4]
            }
            
            # Connection metrics
            cursor.execute("""
                SELECT variable_name, variable_value
                FROM performance_schema.global_status
                WHERE variable_name IN (
                    'Threads_connected', 'Threads_running', 'Max_used_connections',
                    'Connection_errors_max_connections', 'Aborted_connects'
                )
            """)
            
            connection_metrics = {row[0]: int(row[1]) for row in cursor.fetchall()}
            metrics['metrics']['connections'] = connection_metrics
            
            # InnoDB metrics
            cursor.execute("""
                SELECT variable_name, variable_value
                FROM performance_schema.global_status
                WHERE variable_name IN (
                    'Innodb_buffer_pool_read_requests', 'Innodb_buffer_pool_reads',
                    'Innodb_buffer_pool_pages_dirty', 'Innodb_buffer_pool_pages_free',
                    'Innodb_buffer_pool_pages_total'
                )
            """)
            
            innodb_metrics = {row[0]: int(row[1]) for row in cursor.fetchall()}
            
            # Calculate buffer pool hit ratio
            read_requests = innodb_metrics.get('Innodb_buffer_pool_read_requests', 0)
            reads = innodb_metrics.get('Innodb_buffer_pool_reads', 0)
            hit_ratio = ((read_requests - reads) / read_requests * 100) if read_requests > 0 else 0
            
            innodb_metrics['buffer_pool_hit_ratio'] = hit_ratio
            metrics['metrics']['innodb'] = innodb_metrics
            
            # Slow queries
            cursor.execute("SHOW GLOBAL STATUS LIKE 'Slow_queries'")
            slow_queries = cursor.fetchone()
            metrics['metrics']['slow_queries'] = int(slow_queries[1]) if slow_queries else 0
            
            return metrics
            
        except Exception as e:
            self.logger.error(f"MySQL metrics collection failed: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def collect_postgresql_metrics(self):
        """Collect PostgreSQL performance metrics"""
        try:
            conn = psycopg2.connect(**self.config['postgresql'])
            cursor = conn.cursor()
            
            metrics = {
                'timestamp': datetime.now(),
                'database_type': 'postgresql',
                'metrics': {}
            }
            
            # Query performance from pg_stat_statements
            cursor.execute("""
                SELECT 
                    COUNT(*) as total_queries,
                    AVG(mean_time) as avg_query_time,
                    MAX(mean_time) as max_query_time,
                    SUM(rows) as total_rows,
                    SUM(calls) as total_calls
                FROM pg_stat_statements
                WHERE last_seen > NOW() - INTERVAL '5 minutes'
            """)
            
            query_metrics = cursor.fetchone()
            metrics['metrics']['query_performance'] = {
                'total_queries': query_metrics[0],
                'avg_query_time': float(query_metrics[1] or 0),
                'max_query_time': float(query_metrics[2] or 0),
                'total_rows': query_metrics[3],
                'total_calls': query_metrics[4]
            }
            
            # Database activity
            cursor.execute("""
                SELECT 
                    SUM(numbackends) as active_connections,
                    SUM(xact_commit) as commits,
                    SUM(xact_rollback) as rollbacks,
                    SUM(blks_read) as blocks_read,
                    SUM(blks_hit) as blocks_hit
                FROM pg_stat_database
                WHERE datname NOT IN ('template0', 'template1', 'postgres')
            """)
            
            db_activity = cursor.fetchone()
            
            # Calculate cache hit ratio
            blocks_read = db_activity[3] or 0
            blocks_hit = db_activity[4] or 0
            cache_hit_ratio = (blocks_hit / (blocks_hit + blocks_read) * 100) if (blocks_hit + blocks_read) > 0 else 0
            
            metrics['metrics']['database_activity'] = {
                'active_connections': db_activity[0],
                'commits': db_activity[1],
                'rollbacks': db_activity[2],
                'cache_hit_ratio': cache_hit_ratio
            }
            
            # Lock information
            cursor.execute("""
                SELECT 
                    mode,
                    COUNT(*) as lock_count
                FROM pg_locks
                GROUP BY mode
            """)
            
            locks = {row[0]: row[1] for row in cursor.fetchall()}
            metrics['metrics']['locks'] = locks
            
            return metrics
            
        except Exception as e:
            self.logger.error(f"PostgreSQL metrics collection failed: {e}")
            return None
        finally:
            if conn:
                conn.close()
    
    def analyze_performance_trends(self):
        """Analyze performance trends and detect anomalies"""
        if len(self.metrics_history) < 10:
            return None
            
        # Convert to DataFrame for analysis
        df_data = []
        for metric in self.metrics_history[-100:]:  # Last 100 data points
            row = {
                'timestamp': metric['timestamp'],
                'database_type': metric['database_type']
            }
            
            # Flatten metrics
            for category, values in metric['metrics'].items():
                if isinstance(values, dict):
                    for key, value in values.items():
                        row[f"{category}_{key}"] = value
                else:
                    row[category] = values
                    
            df_data.append(row)
        
        df = pd.DataFrame(df_data)
        
        # Detect anomalies
        anomalies = []
        
        # Check for sudden spikes in query time
        if 'query_performance_avg_query_time' in df.columns:
            avg_query_time = df['query_performance_avg_query_time'].rolling(window=5).mean()
            current_avg = df['query_performance_avg_query_time'].iloc[-1]
            baseline_avg = avg_query_time.iloc[-6:-1].mean()
            
            if current_avg > baseline_avg * 2:  # 100% increase
                anomalies.append(f"Query time spike detected: {current_avg:.2f}s vs baseline {baseline_avg:.2f}s")
        
        # Check buffer pool hit ratio (MySQL)
        if 'innodb_buffer_pool_hit_ratio' in df.columns:
            hit_ratio = df['innodb_buffer_pool_hit_ratio'].iloc[-1]
            if hit_ratio < 95:  # Less than 95% hit ratio
                anomalies.append(f"Low buffer pool hit ratio: {hit_ratio:.2f}%")
        
        # Check cache hit ratio (PostgreSQL)
        if 'database_activity_cache_hit_ratio' in df.columns:
            cache_ratio = df['database_activity_cache_hit_ratio'].iloc[-1]
            if cache_ratio < 95:  # Less than 95% cache hit ratio
                anomalies.append(f"Low cache hit ratio: {cache_ratio:.2f}%")
        
        return anomalies
    
    def generate_performance_report(self):
        """Generate performance report with visualizations"""
        if len(self.metrics_history) < 5:
            return None
            
        # Create performance charts
        fig, axes = plt.subplots(2, 2, figsize=(15, 10))
        fig.suptitle('Database Performance Report', fontsize=16)
        
        # Prepare data
        timestamps = [m['timestamp'] for m in self.metrics_history[-50:]]
        
        # Query time chart
        if self.metrics_history[0]['database_type'] == 'mysql':
            query_times = [m['metrics']['query_performance']['avg_query_time'] for m in self.metrics_history[-50:]]
            axes[0, 0].plot(timestamps, query_times)
            axes[0, 0].set_title('Average Query Time')
            axes[0, 0].set_ylabel('Seconds')
            
            # Buffer pool hit ratio
            hit_ratios = [m['metrics']['innodb']['buffer_pool_hit_ratio'] for m in self.metrics_history[-50:]]
            axes[0, 1].plot(timestamps, hit_ratios)
            axes[0, 1].set_title('Buffer Pool Hit Ratio')
            axes[0, 1].set_ylabel('Percentage')
            
        elif self.metrics_history[0]['database_type'] == 'postgresql':
            query_times = [m['metrics']['query_performance']['avg_query_time'] for m in self.metrics_history[-50:]]
            axes[0, 0].plot(timestamps, query_times)
            axes[0, 0].set_title('Average Query Time')
            axes[0, 0].set_ylabel('Milliseconds')
            
            # Cache hit ratio
            cache_ratios = [m['metrics']['database_activity']['cache_hit_ratio'] for m in self.metrics_history[-50:]]
            axes[0, 1].plot(timestamps, cache_ratios)
            axes[0, 1].set_title('Cache Hit Ratio')
            axes[0, 1].set_ylabel('Percentage')
        
        # Connections
        if self.metrics_history[0]['database_type'] == 'mysql':
            connections = [m['metrics']['connections']['Threads_connected'] for m in self.metrics_history[-50:]]
        else:
            connections = [m['metrics']['database_activity']['active_connections'] for m in self.metrics_history[-50:]]
            
        axes[1, 0].plot(timestamps, connections)
        axes[1, 0].set_title('Active Connections')
        axes[1, 0].set_ylabel('Count')
        
        # Query volume
        if self.metrics_history[0]['database_type'] == 'mysql':
            query_volume = [m['metrics']['query_performance']['total_queries'] for m in self.metrics_history[-50:]]
        else:
            query_volume = [m['metrics']['query_performance']['total_calls'] for m in self.metrics_history[-50:]]
            
        axes[1, 1].plot(timestamps, query_volume)
        axes[1, 1].set_title('Query Volume')
        axes[1, 1].set_ylabel('Queries per 5min')
        
        # Format x-axis
        for ax in axes.flat:
            ax.tick_params(axis='x', rotation=45)
        
        plt.tight_layout()
        plt.savefig('/tmp/db_performance_report.png', dpi=300, bbox_inches='tight')
        plt.close()
        
        return '/tmp/db_performance_report.png'
    
    def send_performance_alert(self, anomalies):
        """Send performance alert with anomalies"""
        if not anomalies:
            return
            
        try:
            message = "Database Performance Alert:\n\n"
            message += "\n".join(f"- {anomaly}" for anomaly in anomalies)
            
            # Generate and attach report
            report_path = self.generate_performance_report()
            
            msg = MIMEText(message)
            msg['Subject'] = 'Database Performance Alert'
            msg['From'] = self.config['email']['from']
            msg['To'] = self.config['email']['to']
            
            server = smtplib.SMTP(self.config['email']['smtp_server'])
            server.starttls()
            server.login(self.config['email']['username'], self.config['email']['password'])
            server.send_message(msg)
            server.quit()
            
            self.logger.warning(f"Performance alert sent: {len(anomalies)} anomalies detected")
            
        except Exception as e:
            self.logger.error(f"Failed to send performance alert: {e}")
    
    def run_monitoring_cycle(self):
        """Run complete monitoring cycle"""
        # Collect metrics based on database type
        if 'mysql' in self.config:
            metrics = self.collect_mysql_metrics()
        elif 'postgresql' in self.config:
            metrics = self.collect_postgresql_metrics()
        else:
            self.logger.error("No database configuration found")
            return
        
        if metrics:
            self.metrics_history.append(metrics)
            
            # Keep only last 1000 data points
            if len(self.metrics_history) > 1000:
                self.metrics_history = self.metrics_history[-1000:]
            
            # Analyze trends and detect anomalies
            anomalies = self.analyze_performance_trends()
            
            if anomalies:
                self.send_performance_alert(anomalies)
            
            self.logger.info(f"Monitoring cycle completed. Metrics collected: {len(self.metrics_history)}")

# Usage
if __name__ == "__main__":
    config = {
        'mysql': {
            'host': 'localhost',
            'user': 'monitor',
            'password': 'monitor_password',
            'database': 'performance_schema'
        },
        'email': {
            'smtp_server': 'smtp.company.com',
            'from': 'db-monitor@company.com',
            'to': 'dba-team@company.com',
            'username': 'alerts@company.com',
            'password': 'email_password'
        }
    }
    
    monitor = DatabasePerformanceMonitor(config)
    
    while True:
        monitor.run_monitoring_cycle()
        time.sleep(300)  # Run every 5 minutes
```

**Query Optimization Techniques:**

**1. Query Analysis and Optimization:**
```sql
-- MySQL Query Optimization
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- Analyze query execution plan
EXPLAIN FORMAT=JSON
SELECT 
    u.username,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.username
HAVING total_spent > 1000
ORDER BY total_spent DESC;

-- Optimize with proper indexing
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_orders_user_total ON orders(user_id, total_amount);

-- PostgreSQL Query Optimization
-- Enable auto_explain for automatic query analysis
LOAD 'auto_explain';
SET auto_explain.log_min_duration = 1000;
SET auto_explain.log_analyze = true;
SET auto_explain.log_buffers = true;

-- Analyze query with detailed execution plan
EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT 
    u.username,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.username
HAVING SUM(o.total_amount) > 1000
ORDER BY total_spent DESC;

-- Create optimized indexes
CREATE INDEX CONCURRENTLY idx_users_created_at ON users(created_at);
CREATE INDEX CONCURRENTLY idx_orders_user_total ON orders(user_id, total_amount);
```

**2. Index Optimization:**
```sql
-- Find unused indexes
-- MySQL
SELECT 
    t.table_schema,
    t.table_name,
    s.index_name,
    s.column_name
FROM information_schema.tables t
LEFT JOIN information_schema.statistics s ON t.table_name = s.table_name
LEFT JOIN performance_schema.table_io_waits_summary_by_index_usage i 
    ON s.table_name = i.object_name AND s.index_name = i.index_name
WHERE t.table_schema = 'production_db'
    AND s.index_name IS NOT NULL
    AND (i.count_read IS NULL OR i.count_read = 0)
ORDER BY t.table_name, s.index_name;

-- PostgreSQL
SELECT 
    schemaname,
    tablename,
    indexname,
    idx_scan,
    pg_size_pretty(pg_relation_size(indexrelid)) as size
FROM pg_stat_user_indexes
WHERE idx_scan = 0
ORDER BY pg_relation_size(indexrelid) DESC;

-- Find duplicate indexes
-- PostgreSQL
SELECT 
    pg_size_pretty(SUM(pg_relation_size(idx))::BIGINT) AS size,
    (array_agg(idx))[1] AS idx1, 
    (array_agg(idx))[2] AS idx2
FROM (
    SELECT 
        indexrelid::regclass AS idx, 
        (indrelid::text ||E'\n'|| indclass::text ||E'\n'|| indkey::text ||E'\n'|| 
         COALESCE(indexprs::text,'')||E'\n' || COALESCE(indpred::text,'')) AS KEY
    FROM pg_index
) sub
GROUP BY KEY 
HAVING COUNT(*)>1
ORDER BY SUM(pg_relation_size(idx)) DESC;
```

**Best Practices:**

1. **Continuous Monitoring**: Implement 24/7 performance monitoring
2. **Baseline Establishment**: Establish performance baselines for comparison
3. **Proactive Alerting**: Set up alerts for performance degradation
4. **Regular Analysis**: Perform weekly/monthly performance reviews
5. **Query Optimization**: Regularly review and optimize slow queries
6. **Index Management**: Monitor index usage and remove unused indexes
7. **Capacity Planning**: Monitor growth trends and plan for scaling
8. **Documentation**: Maintain performance optimization documentation

---

### Q13: How do you implement database connection pooling and manage database connections efficiently?
**Difficulty: Intermediate**

**Answer:**
Database connection pooling is a critical technique for managing database connections efficiently in applications. It helps reduce connection overhead, improves performance, and prevents connection exhaustion.

**Connection Pooling Concepts:**

**1. Why Connection Pooling is Important:**
- **Connection Overhead**: Creating/destroying connections is expensive
- **Resource Management**: Limits concurrent connections to the database
- **Performance**: Reuses existing connections instead of creating new ones
- **Scalability**: Handles multiple concurrent requests efficiently

**2. Connection Pool Configuration:**
```javascript
// Node.js with MySQL2 Connection Pool
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'app_user',
  password: 'secure_password',
  database: 'production_db',
  
  // Pool configuration
  connectionLimit: 20,        // Maximum number of connections
  queueLimit: 0,             // No limit on queued connection requests
  acquireTimeout: 60000,     // Maximum time to get connection (60s)
  timeout: 60000,            // Maximum time for query execution
  reconnect: true,           // Automatically reconnect
  
  // Connection management
  idleTimeout: 300000,       // Close idle connections after 5 minutes
  maxIdle: 10,               // Maximum idle connections
  
  // SSL configuration
  ssl: {
    rejectUnauthorized: false
  },
  
  // Character set
  charset: 'utf8mb4'
});

// Connection pool event handlers
pool.on('connection', (connection) => {
  console.log(`New connection established: ${connection.threadId}`);
});

pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconnecting to database...');
  }
});

// Usage example
async function getUserById(userId) {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [userId]
    );
    return rows[0];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Transaction example with connection pool
async function transferFunds(fromAccountId, toAccountId, amount) {
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();
    
    // Debit from source account
    await connection.execute(
      'UPDATE accounts SET balance = balance - ? WHERE id = ? AND balance >= ?',
      [amount, fromAccountId, amount]
    );
    
    // Credit to destination account
    await connection.execute(
      'UPDATE accounts SET balance = balance + ? WHERE id = ?',
      [amount, toAccountId]
    );
    
    await connection.commit();
    console.log('Transfer completed successfully');
    
  } catch (error) {
    await connection.rollback();
    console.error('Transfer failed:', error);
    throw error;
  } finally {
    connection.release(); // Return connection to pool
  }
}
```

**3. Java Connection Pooling with HikariCP:**
```java
// HikariCP Configuration
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseManager {
    private static HikariDataSource dataSource;
    
    static {
        HikariConfig config = new HikariConfig();
        
        // Database connection settings
        config.setJdbcUrl("jdbc:mysql://localhost:3306/production_db");
        config.setUsername("app_user");
        config.setPassword("secure_password");
        
        // Pool configuration
        config.setMaximumPoolSize(25);           // Maximum pool size
        config.setMinimumIdle(5);                // Minimum idle connections
        config.setConnectionTimeout(30000);      // 30 seconds
        config.setIdleTimeout(600000);           // 10 minutes
        config.setMaxLifetime(1800000);          // 30 minutes
        config.setLeakDetectionThreshold(60000); // 1 minute
        
        // Performance settings
        config.setCachePrepStmts(true);
        config.setPrepStmtCacheSize(250);
        config.setPrepStmtCacheSqlLimit(2048);
        config.setUseServerPrepStmts(true);
        config.setUseLocalSessionState(true);
        config.setRewriteBatchedStatements(true);
        config.setCacheResultSetMetadata(true);
        config.setCacheServerConfiguration(true);
        config.setElideSetAutoCommits(true);
        config.setMaintainTimeStats(false);
        
        // Connection validation
        config.setConnectionTestQuery("SELECT 1");
        config.setValidationTimeout(5000);
        
        dataSource = new HikariDataSource(config);
    }
    
    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
    
    public static void closeDataSource() {
        if (dataSource != null) {
            dataSource.close();
        }
    }
    
    // Example usage
    public User getUserById(int userId) throws SQLException {
        String sql = "SELECT id, username, email, created_at FROM users WHERE id = ?";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, userId);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    return new User(
                        rs.getInt("id"),
                        rs.getString("username"),
                        rs.getString("email"),
                        rs.getTimestamp("created_at")
                    );
                }
            }
        }
        return null;
    }
    
    // Batch operation example
    public void batchInsertUsers(List<User> users) throws SQLException {
        String sql = "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
        
        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            conn.setAutoCommit(false);
            
            for (User user : users) {
                stmt.setString(1, user.getUsername());
                stmt.setString(2, user.getEmail());
                stmt.setString(3, user.getPasswordHash());
                stmt.addBatch();
                
                // Execute batch every 1000 records
                if (users.indexOf(user) % 1000 == 0) {
                    stmt.executeBatch();
                    stmt.clearBatch();
                }
            }
            
            stmt.executeBatch(); // Execute remaining records
            conn.commit();
            
        } catch (SQLException e) {
            // Rollback on error
            throw e;
        }
    }
}
```

**4. Python Connection Pooling with SQLAlchemy:**
```python
# SQLAlchemy Connection Pool Configuration
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import QueuePool
import logging
from contextlib import contextmanager

class DatabaseManager:
    def __init__(self):
        # Database URL with connection parameters
        database_url = (
            "mysql+pymysql://app_user:secure_password@localhost:3306/production_db"
            "?charset=utf8mb4"
        )
        
        # Create engine with connection pool
        self.engine = create_engine(
            database_url,
            
            # Pool configuration
            poolclass=QueuePool,
            pool_size=20,              # Number of connections to maintain
            max_overflow=30,           # Additional connections beyond pool_size
            pool_timeout=30,           # Seconds to wait for connection
            pool_recycle=3600,         # Recycle connections after 1 hour
            pool_pre_ping=True,        # Validate connections before use
            
            # Engine configuration
            echo=False,                # Set to True for SQL logging
            future=True,               # Use SQLAlchemy 2.0 style
            
            # Connection arguments
            connect_args={
                "connect_timeout": 10,
                "read_timeout": 30,
                "write_timeout": 30,
                "charset": "utf8mb4",
                "use_unicode": True,
                "autocommit": False
            }
        )
        
        # Create session factory
        self.SessionLocal = sessionmaker(
            bind=self.engine,
            autocommit=False,
            autoflush=False
        )
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    @contextmanager
    def get_db_session(self):
        """Context manager for database sessions"""
        session = self.SessionLocal()
        try:
            yield session
            session.commit()
        except Exception as e:
            session.rollback()
            self.logger.error(f"Database session error: {e}")
            raise
        finally:
            session.close()
    
    def get_connection(self):
        """Get raw database connection"""
        return self.engine.connect()
    
    def execute_query(self, query, params=None):
        """Execute a query with connection pooling"""
        with self.engine.connect() as conn:
            result = conn.execute(text(query), params or {})
            return result.fetchall()
    
    def execute_transaction(self, operations):
        """Execute multiple operations in a transaction"""
        with self.engine.connect() as conn:
            trans = conn.begin()
            try:
                results = []
                for operation in operations:
                    query, params = operation
                    result = conn.execute(text(query), params)
                    results.append(result)
                
                trans.commit()
                return results
            except Exception as e:
                trans.rollback()
                self.logger.error(f"Transaction failed: {e}")
                raise
    
    def get_pool_status(self):
        """Get connection pool status"""
        pool = self.engine.pool
        return {
            'pool_size': pool.size(),
            'checked_in': pool.checkedin(),
            'checked_out': pool.checkedout(),
            'overflow': pool.overflow(),
            'invalid': pool.invalid()
        }
    
    def close(self):
        """Close all connections"""
        self.engine.dispose()

# Usage examples
db_manager = DatabaseManager()

# Using session context manager
def create_user(username, email):
    with db_manager.get_db_session() as session:
        user = User(username=username, email=email)
        session.add(user)
        # Automatically commits on successful exit
        return user.id

# Using raw connection for complex queries
def get_user_analytics():
    query = """
    SELECT 
        DATE(created_at) as date,
        COUNT(*) as user_count,
        AVG(age) as avg_age
    FROM users 
    WHERE created_at >= :start_date
    GROUP BY DATE(created_at)
    ORDER BY date DESC
    """
    
    return db_manager.execute_query(query, {
        'start_date': '2023-01-01'
    })

# Transaction example
def transfer_credits(from_user_id, to_user_id, amount):
    operations = [
        (
            "UPDATE user_credits SET balance = balance - :amount WHERE user_id = :user_id AND balance >= :amount",
            {'amount': amount, 'user_id': from_user_id}
        ),
        (
            "UPDATE user_credits SET balance = balance + :amount WHERE user_id = :user_id",
            {'amount': amount, 'user_id': to_user_id}
        ),
        (
            "INSERT INTO credit_transactions (from_user_id, to_user_id, amount, created_at) VALUES (:from_id, :to_id, :amount, NOW())",
            {'from_id': from_user_id, 'to_id': to_user_id, 'amount': amount}
        )
    ]
    
    return db_manager.execute_transaction(operations)
```

**5. Connection Pool Monitoring:**
```python
# Connection Pool Health Monitor
import time
import threading
from datetime import datetime

class ConnectionPoolMonitor:
    def __init__(self, db_manager, check_interval=60):
        self.db_manager = db_manager
        self.check_interval = check_interval
        self.monitoring = False
        self.metrics_history = []
        
    def start_monitoring(self):
        """Start connection pool monitoring"""
        self.monitoring = True
        monitor_thread = threading.Thread(target=self._monitor_loop)
        monitor_thread.daemon = True
        monitor_thread.start()
        
    def stop_monitoring(self):
        """Stop connection pool monitoring"""
        self.monitoring = False
        
    def _monitor_loop(self):
        """Main monitoring loop"""
        while self.monitoring:
            try:
                metrics = self._collect_metrics()
                self.metrics_history.append(metrics)
                
                # Keep only last 100 metrics
                if len(self.metrics_history) > 100:
                    self.metrics_history = self.metrics_history[-100:]
                
                # Check for alerts
                self._check_alerts(metrics)
                
                time.sleep(self.check_interval)
                
            except Exception as e:
                print(f"Monitoring error: {e}")
                time.sleep(self.check_interval)
    
    def _collect_metrics(self):
        """Collect connection pool metrics"""
        pool_status = self.db_manager.get_pool_status()
        
        # Test connection response time
        start_time = time.time()
        try:
            with self.db_manager.get_connection() as conn:
                conn.execute(text("SELECT 1"))
            response_time = (time.time() - start_time) * 1000  # ms
        except Exception as e:
            response_time = None
            print(f"Connection test failed: {e}")
        
        return {
            'timestamp': datetime.now(),
            'pool_status': pool_status,
            'response_time_ms': response_time,
            'pool_utilization': (pool_status['checked_out'] / pool_status['pool_size']) * 100
        }
    
    def _check_alerts(self, metrics):
        """Check for alert conditions"""
        pool_status = metrics['pool_status']
        utilization = metrics['pool_utilization']
        response_time = metrics['response_time_ms']
        
        # High pool utilization alert
        if utilization > 80:
            print(f"ALERT: High pool utilization: {utilization:.1f}%")
        
        # Slow response time alert
        if response_time and response_time > 1000:  # 1 second
            print(f"ALERT: Slow database response: {response_time:.1f}ms")
        
        # Pool exhaustion alert
        if pool_status['checked_out'] >= pool_status['pool_size']:
            print("ALERT: Connection pool exhausted")
    
    def get_metrics_summary(self):
        """Get summary of recent metrics"""
        if not self.metrics_history:
            return None
        
        recent_metrics = self.metrics_history[-10:]  # Last 10 measurements
        
        response_times = [m['response_time_ms'] for m in recent_metrics if m['response_time_ms']]
        utilizations = [m['pool_utilization'] for m in recent_metrics]
        
        return {
            'avg_response_time_ms': sum(response_times) / len(response_times) if response_times else 0,
            'max_response_time_ms': max(response_times) if response_times else 0,
            'avg_utilization': sum(utilizations) / len(utilizations) if utilizations else 0,
            'max_utilization': max(utilizations) if utilizations else 0,
            'current_status': recent_metrics[-1]['pool_status']
        }

# Usage
monitor = ConnectionPoolMonitor(db_manager)
monitor.start_monitoring()

# Get metrics after some time
time.sleep(300)  # Wait 5 minutes
summary = monitor.get_metrics_summary()
print(f"Pool metrics summary: {summary}")
```

**Best Practices:**

1. **Right-size Pool**: Configure pool size based on application load
2. **Monitor Metrics**: Track pool utilization, response times, and errors
3. **Connection Validation**: Use connection testing to detect stale connections
4. **Timeout Configuration**: Set appropriate timeouts for connections and queries
5. **Resource Cleanup**: Always close connections, statements, and result sets
6. **Error Handling**: Implement proper error handling and retry logic
7. **Load Testing**: Test pool configuration under expected load
8. **Documentation**: Document pool configuration and monitoring procedures

---

### Q14: How do you implement database migration strategies and version control for database schemas?
**Difficulty: Intermediate**

**Answer:**
Database migration and schema version control are essential for managing database changes across different environments and ensuring consistent deployments. Here's a comprehensive approach to implementing robust migration strategies.

**Migration Concepts and Strategies:**

**1. Migration Fundamentals:**
```sql
-- Migration file structure example
-- migrations/001_create_users_table.sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_username (username)
);

-- migrations/002_add_user_profile_table.sql
CREATE TABLE user_profiles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    bio TEXT,
    avatar_url VARCHAR(255),
    birth_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_profiles_user_id (user_id)
);

-- migrations/003_add_user_roles.sql
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    user_id BIGINT,
    role_id INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_by BIGINT,
    
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (assigned_by) REFERENCES users(id)
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES 
('admin', 'System administrator with full access'),
('user', 'Regular user with limited access'),
('moderator', 'Content moderator with moderation privileges');
```

**2. Migration Management System:**
```python
#!/usr/bin/env python3
# Database Migration Manager

import os
import re
import hashlib
from datetime import datetime
from pathlib import Path
import mysql.connector
from mysql.connector import Error

class DatabaseMigrator:
    def __init__(self, db_config, migrations_dir='migrations'):
        self.db_config = db_config
        self.migrations_dir = Path(migrations_dir)
        self.connection = None
        
    def connect(self):
        """Establish database connection"""
        try:
            self.connection = mysql.connector.connect(**self.db_config)
            self.connection.autocommit = False
            print("Connected to database successfully")
        except Error as e:
            print(f"Error connecting to database: {e}")
            raise
    
    def disconnect(self):
        """Close database connection"""
        if self.connection and self.connection.is_connected():
            self.connection.close()
            print("Database connection closed")
    
    def create_migrations_table(self):
        """Create migrations tracking table"""
        create_table_query = """
        CREATE TABLE IF NOT EXISTS schema_migrations (
            id INT PRIMARY KEY AUTO_INCREMENT,
            version VARCHAR(255) UNIQUE NOT NULL,
            filename VARCHAR(255) NOT NULL,
            checksum VARCHAR(64) NOT NULL,
            executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            execution_time_ms INT,
            
            INDEX idx_migrations_version (version)
        )
        """
        
        cursor = self.connection.cursor()
        try:
            cursor.execute(create_table_query)
            self.connection.commit()
            print("Migrations table created/verified")
        except Error as e:
            print(f"Error creating migrations table: {e}")
            raise
        finally:
            cursor.close()
    
    def get_migration_files(self):
        """Get all migration files sorted by version"""
        if not self.migrations_dir.exists():
            print(f"Migrations directory {self.migrations_dir} does not exist")
            return []
        
        migration_files = []
        pattern = re.compile(r'^(\d+)_(.+)\.sql$')
        
        for file_path in self.migrations_dir.glob('*.sql'):
            match = pattern.match(file_path.name)
            if match:
                version = match.group(1)
                name = match.group(2)
                migration_files.append({
                    'version': version,
                    'name': name,
                    'filename': file_path.name,
                    'path': file_path
                })
        
        # Sort by version number
        migration_files.sort(key=lambda x: int(x['version']))
        return migration_files
    
    def get_executed_migrations(self):
        """Get list of executed migrations"""
        cursor = self.connection.cursor()
        try:
            cursor.execute("SELECT version, filename, checksum FROM schema_migrations ORDER BY version")
            return {row[0]: {'filename': row[1], 'checksum': row[2]} for row in cursor.fetchall()}
        except Error as e:
            print(f"Error fetching executed migrations: {e}")
            return {}
        finally:
            cursor.close()
    
    def calculate_checksum(self, file_path):
        """Calculate MD5 checksum of migration file"""
        with open(file_path, 'rb') as f:
            content = f.read()
            return hashlib.md5(content).hexdigest()
    
    def execute_migration(self, migration):
        """Execute a single migration"""
        print(f"Executing migration: {migration['filename']}")
        
        # Read migration file
        with open(migration['path'], 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        # Calculate checksum
        checksum = self.calculate_checksum(migration['path'])
        
        cursor = self.connection.cursor()
        start_time = datetime.now()
        
        try:
            # Split SQL content by semicolons and execute each statement
            statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
            
            for statement in statements:
                if statement:
                    cursor.execute(statement)
            
            # Record migration execution
            execution_time = int((datetime.now() - start_time).total_seconds() * 1000)
            
            cursor.execute(
                """
                INSERT INTO schema_migrations (version, filename, checksum, execution_time_ms)
                VALUES (%s, %s, %s, %s)
                """,
                (migration['version'], migration['filename'], checksum, execution_time)
            )
            
            self.connection.commit()
            print(f"Migration {migration['filename']} executed successfully in {execution_time}ms")
            
        except Error as e:
            self.connection.rollback()
            print(f"Error executing migration {migration['filename']}: {e}")
            raise
        finally:
            cursor.close()
    
    def migrate(self, target_version=None):
        """Run pending migrations"""
        self.connect()
        
        try:
            self.create_migrations_table()
            
            migration_files = self.get_migration_files()
            executed_migrations = self.get_executed_migrations()
            
            pending_migrations = []
            
            for migration in migration_files:
                version = migration['version']
                
                # Check if we should stop at target version
                if target_version and int(version) > int(target_version):
                    break
                
                if version not in executed_migrations:
                    pending_migrations.append(migration)
                else:
                    # Verify checksum
                    current_checksum = self.calculate_checksum(migration['path'])
                    stored_checksum = executed_migrations[version]['checksum']
                    
                    if current_checksum != stored_checksum:
                        print(f"WARNING: Migration {migration['filename']} has been modified after execution")
                        print(f"Stored checksum: {stored_checksum}")
                        print(f"Current checksum: {current_checksum}")
            
            if not pending_migrations:
                print("No pending migrations found")
                return
            
            print(f"Found {len(pending_migrations)} pending migrations")
            
            for migration in pending_migrations:
                self.execute_migration(migration)
            
            print("All migrations executed successfully")
            
        finally:
            self.disconnect()
    
    def rollback(self, target_version):
        """Rollback to a specific version (requires rollback files)"""
        self.connect()
        
        try:
            executed_migrations = self.get_executed_migrations()
            
            # Find migrations to rollback (in reverse order)
            rollback_migrations = []
            for version in sorted(executed_migrations.keys(), key=int, reverse=True):
                if int(version) > int(target_version):
                    rollback_file = self.migrations_dir / f"{version}_rollback.sql"
                    if rollback_file.exists():
                        rollback_migrations.append({
                            'version': version,
                            'filename': rollback_file.name,
                            'path': rollback_file
                        })
                    else:
                        print(f"WARNING: No rollback file found for migration {version}")
            
            if not rollback_migrations:
                print("No rollback migrations to execute")
                return
            
            print(f"Rolling back {len(rollback_migrations)} migrations")
            
            for migration in rollback_migrations:
                self.execute_rollback(migration)
            
            print("Rollback completed successfully")
            
        finally:
            self.disconnect()
    
    def execute_rollback(self, migration):
        """Execute a rollback migration"""
        print(f"Rolling back migration: {migration['filename']}")
        
        with open(migration['path'], 'r', encoding='utf-8') as f:
            sql_content = f.read()
        
        cursor = self.connection.cursor()
        
        try:
            statements = [stmt.strip() for stmt in sql_content.split(';') if stmt.strip()]
            
            for statement in statements:
                if statement:
                    cursor.execute(statement)
            
            # Remove migration record
            cursor.execute(
                "DELETE FROM schema_migrations WHERE version = %s",
                (migration['version'],)
            )
            
            self.connection.commit()
            print(f"Rollback {migration['filename']} executed successfully")
            
        except Error as e:
            self.connection.rollback()
            print(f"Error executing rollback {migration['filename']}: {e}")
            raise
        finally:
            cursor.close()
    
    def status(self):
        """Show migration status"""
        self.connect()
        
        try:
            self.create_migrations_table()
            
            migration_files = self.get_migration_files()
            executed_migrations = self.get_executed_migrations()
            
            print("\nMigration Status:")
            print("-" * 80)
            print(f"{'Version':<10} {'Status':<10} {'Filename':<30} {'Executed At':<20}")
            print("-" * 80)
            
            for migration in migration_files:
                version = migration['version']
                if version in executed_migrations:
                    cursor = self.connection.cursor()
                    cursor.execute(
                        "SELECT executed_at FROM schema_migrations WHERE version = %s",
                        (version,)
                    )
                    executed_at = cursor.fetchone()[0]
                    cursor.close()
                    
                    status = "EXECUTED"
                    executed_at_str = executed_at.strftime('%Y-%m-%d %H:%M:%S')
                else:
                    status = "PENDING"
                    executed_at_str = "-"
                
                print(f"{version:<10} {status:<10} {migration['filename']:<30} {executed_at_str:<20}")
            
            print("-" * 80)
            
        finally:
            self.disconnect()

# Usage example
if __name__ == "__main__":
    db_config = {
        'host': 'localhost',
        'user': 'app_user',
        'password': 'secure_password',
        'database': 'production_db',
        'charset': 'utf8mb4'
    }
    
    migrator = DatabaseMigrator(db_config)
    
    # Show current status
    migrator.status()
    
    # Run all pending migrations
    migrator.migrate()
    
    # Run migrations up to specific version
    # migrator.migrate(target_version='003')
    
    # Rollback to specific version
    # migrator.rollback(target_version='002')
```

**3. Advanced Migration Patterns:**
```sql
-- migrations/004_add_indexes_safely.sql
-- Safe index creation with IF NOT EXISTS equivalent

-- Check if index exists before creating
SET @index_exists = (
    SELECT COUNT(*) 
    FROM information_schema.statistics 
    WHERE table_schema = DATABASE() 
    AND table_name = 'users' 
    AND index_name = 'idx_users_created_at'
);

SET @sql = IF(@index_exists = 0, 
    'CREATE INDEX idx_users_created_at ON users(created_at)', 
    'SELECT "Index already exists" as message'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- migrations/005_alter_column_safely.sql
-- Safe column modification

-- Add new column first
ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT FALSE;

-- Update existing data
UPDATE users SET email_verified = TRUE WHERE created_at < '2023-01-01';

-- Add NOT NULL constraint after data is populated
ALTER TABLE users MODIFY COLUMN email_verified BOOLEAN NOT NULL DEFAULT FALSE;

-- migrations/006_data_migration.sql
-- Data migration with validation

-- Create temporary table for validation
CREATE TEMPORARY TABLE user_migration_log (
    user_id BIGINT,
    old_status VARCHAR(50),
    new_status VARCHAR(50),
    migrated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Migrate user status data
INSERT INTO user_migration_log (user_id, old_status, new_status)
SELECT 
    id,
    status,
    CASE 
        WHEN status = 'active' THEN 'verified'
        WHEN status = 'inactive' THEN 'pending'
        WHEN status = 'banned' THEN 'suspended'
        ELSE 'pending'
    END as new_status
FROM users;

-- Update users table
UPDATE users u
JOIN user_migration_log l ON u.id = l.user_id
SET u.status = l.new_status;

-- Validate migration
SELECT 
    'Migration Summary' as report,
    COUNT(*) as total_users,
    SUM(CASE WHEN old_status != new_status THEN 1 ELSE 0 END) as changed_users
FROM user_migration_log;

-- migrations/007_create_partitioned_table.sql
-- Create partitioned table for large datasets

CREATE TABLE user_activities (
    id BIGINT AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    activity_data JSON,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    PRIMARY KEY (id, created_at),
    INDEX idx_user_activities_user_id (user_id),
    INDEX idx_user_activities_type (activity_type),
    
    FOREIGN KEY (user_id) REFERENCES users(id)
) PARTITION BY RANGE (YEAR(created_at)) (
    PARTITION p2022 VALUES LESS THAN (2023),
    PARTITION p2023 VALUES LESS THAN (2024),
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

**Best Practices:**

1. **Version Control**: Store migrations in version control with descriptive names
2. **Atomic Migrations**: Each migration should be atomic and reversible
3. **Testing**: Test migrations on staging environments before production
4. **Backup Strategy**: Always backup before running migrations
5. **Rollback Plans**: Create rollback scripts for complex migrations
6. **Documentation**: Document migration purpose and any manual steps required
7. **Monitoring**: Monitor migration execution time and database performance
8. **Gradual Rollouts**: Use feature flags for gradual schema changes

---

### Q15: How do you implement database caching strategies and optimize cache performance?
**Difficulty: Advanced**

**Answer:**
Database caching is crucial for improving application performance by reducing database load and response times. Here's a comprehensive approach to implementing effective caching strategies.

**Caching Strategies and Implementation:**

**1. Cache-Aside Pattern (Lazy Loading):**
```python
# Redis Cache-Aside Implementation
import redis
import json
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Any, Dict
import mysql.connector
from mysql.connector import Error

class DatabaseCache:
    def __init__(self, redis_config, db_config):
        # Redis connection
        self.redis_client = redis.Redis(
            host=redis_config['host'],
            port=redis_config['port'],
            db=redis_config['db'],
            password=redis_config.get('password'),
            decode_responses=True,
            socket_connect_timeout=5,
            socket_timeout=5,
            retry_on_timeout=True,
            health_check_interval=30
        )
        
        # Database connection pool
        self.db_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="cache_pool",
            pool_size=10,
            pool_reset_session=True,
            **db_config
        )
        
        # Cache configuration
        self.default_ttl = 3600  # 1 hour
        self.cache_prefix = "app_cache:"
        
    def _generate_cache_key(self, table: str, query: str, params: tuple = None) -> str:
        """Generate consistent cache key"""
        key_data = f"{table}:{query}"
        if params:
            key_data += f":{str(params)}"
        
        # Create hash for long keys
        if len(key_data) > 200:
            key_hash = hashlib.md5(key_data.encode()).hexdigest()
            return f"{self.cache_prefix}{table}:{key_hash}"
        
        return f"{self.cache_prefix}{key_data}"
    
    def get_from_cache(self, cache_key: str) -> Optional[Any]:
        """Get data from cache"""
        try:
            cached_data = self.redis_client.get(cache_key)
            if cached_data:
                return json.loads(cached_data)
        except (redis.RedisError, json.JSONDecodeError) as e:
            print(f"Cache read error: {e}")
        return None
    
    def set_cache(self, cache_key: str, data: Any, ttl: int = None) -> bool:
        """Set data in cache"""
        try:
            ttl = ttl or self.default_ttl
            serialized_data = json.dumps(data, default=str)
            return self.redis_client.setex(cache_key, ttl, serialized_data)
        except (redis.RedisError, json.JSONEncodeError) as e:
            print(f"Cache write error: {e}")
            return False
    
    def invalidate_cache(self, pattern: str) -> int:
        """Invalidate cache entries matching pattern"""
        try:
            keys = self.redis_client.keys(f"{self.cache_prefix}{pattern}*")
            if keys:
                return self.redis_client.delete(*keys)
        except redis.RedisError as e:
            print(f"Cache invalidation error: {e}")
        return 0
    
    def get_user_by_id(self, user_id: int, use_cache: bool = True) -> Optional[Dict]:
        """Get user with cache-aside pattern"""
        cache_key = self._generate_cache_key("users", "get_by_id", (user_id,))
        
        # Try cache first
        if use_cache:
            cached_user = self.get_from_cache(cache_key)
            if cached_user:
                print(f"Cache HIT for user {user_id}")
                return cached_user
        
        print(f"Cache MISS for user {user_id}")
        
        # Get from database
        connection = self.db_pool.get_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            cursor.execute(
                "SELECT id, username, email, created_at, last_login FROM users WHERE id = %s",
                (user_id,)
            )
            user = cursor.fetchone()
            
            if user and use_cache:
                # Cache the result
                self.set_cache(cache_key, user, ttl=1800)  # 30 minutes
            
            return user
            
        except Error as e:
            print(f"Database error: {e}")
            return None
        finally:
            cursor.close()
            connection.close()
    
    def update_user(self, user_id: int, updates: Dict) -> bool:
        """Update user and invalidate cache"""
        connection = self.db_pool.get_connection()
        try:
            cursor = connection.cursor()
            
            # Build dynamic update query
            set_clauses = []
            values = []
            
            for field, value in updates.items():
                set_clauses.append(f"{field} = %s")
                values.append(value)
            
            values.append(user_id)
            
            query = f"UPDATE users SET {', '.join(set_clauses)} WHERE id = %s"
            cursor.execute(query, values)
            connection.commit()
            
            # Invalidate related cache entries
            self.invalidate_cache(f"users:get_by_id:({user_id},)")
            self.invalidate_cache(f"users:*")
            
            print(f"User {user_id} updated and cache invalidated")
            return True
            
        except Error as e:
            connection.rollback()
            print(f"Update error: {e}")
            return False
        finally:
            cursor.close()
            connection.close()
    
    def get_user_posts(self, user_id: int, page: int = 1, per_page: int = 10) -> Dict:
        """Get paginated user posts with caching"""
        cache_key = self._generate_cache_key(
            "user_posts", 
            "paginated", 
            (user_id, page, per_page)
        )
        
        # Try cache first
        cached_posts = self.get_from_cache(cache_key)
        if cached_posts:
            print(f"Cache HIT for user {user_id} posts page {page}")
            return cached_posts
        
        print(f"Cache MISS for user {user_id} posts page {page}")
        
        # Get from database
        connection = self.db_pool.get_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            
            # Get total count
            cursor.execute(
                "SELECT COUNT(*) as total FROM posts WHERE user_id = %s",
                (user_id,)
            )
            total = cursor.fetchone()['total']
            
            # Get paginated posts
            offset = (page - 1) * per_page
            cursor.execute(
                """
                SELECT id, title, content, created_at, updated_at
                FROM posts 
                WHERE user_id = %s 
                ORDER BY created_at DESC 
                LIMIT %s OFFSET %s
                """,
                (user_id, per_page, offset)
            )
            posts = cursor.fetchall()
            
            result = {
                'posts': posts,
                'pagination': {
                    'page': page,
                    'per_page': per_page,
                    'total': total,
                    'pages': (total + per_page - 1) // per_page
                },
                'cached_at': datetime.now().isoformat()
            }
            
            # Cache for shorter time due to frequent updates
            self.set_cache(cache_key, result, ttl=600)  # 10 minutes
            
            return result
            
        except Error as e:
            print(f"Database error: {e}")
            return {'posts': [], 'pagination': {}, 'error': str(e)}
        finally:
            cursor.close()
            connection.close()
```

**2. Write-Through and Write-Behind Caching:**
```python
# Write-Through Cache Implementation
class WriteThroughCache(DatabaseCache):
    def create_user(self, user_data: Dict) -> Optional[int]:
        """Create user with write-through caching"""
        connection = self.db_pool.get_connection()
        try:
            cursor = connection.cursor()
            
            # Insert into database
            cursor.execute(
                """
                INSERT INTO users (username, email, password_hash, created_at)
                VALUES (%s, %s, %s, NOW())
                """,
                (user_data['username'], user_data['email'], user_data['password_hash'])
            )
            
            user_id = cursor.lastrowid
            connection.commit()
            
            # Immediately cache the new user
            cache_key = self._generate_cache_key("users", "get_by_id", (user_id,))
            user_record = {
                'id': user_id,
                'username': user_data['username'],
                'email': user_data['email'],
                'created_at': datetime.now().isoformat()
            }
            
            self.set_cache(cache_key, user_record)
            
            print(f"User {user_id} created and cached")
            return user_id
            
        except Error as e:
            connection.rollback()
            print(f"User creation error: {e}")
            return None
        finally:
            cursor.close()
            connection.close()

# Write-Behind (Write-Back) Cache Implementation
import threading
import queue
import time

class WriteBehindCache(DatabaseCache):
    def __init__(self, redis_config, db_config):
        super().__init__(redis_config, db_config)
        self.write_queue = queue.Queue()
        self.write_thread = threading.Thread(target=self._process_writes, daemon=True)
        self.write_thread.start()
        self.batch_size = 100
        self.flush_interval = 5  # seconds
    
    def _process_writes(self):
        """Background thread to process write operations"""
        pending_writes = []
        last_flush = time.time()
        
        while True:
            try:
                # Get write operation with timeout
                write_op = self.write_queue.get(timeout=1)
                pending_writes.append(write_op)
                
                # Flush if batch size reached or time interval passed
                current_time = time.time()
                should_flush = (
                    len(pending_writes) >= self.batch_size or
                    current_time - last_flush >= self.flush_interval
                )
                
                if should_flush and pending_writes:
                    self._flush_writes(pending_writes)
                    pending_writes.clear()
                    last_flush = current_time
                    
            except queue.Empty:
                # Timeout reached, flush pending writes
                if pending_writes:
                    self._flush_writes(pending_writes)
                    pending_writes.clear()
                    last_flush = time.time()
            except Exception as e:
                print(f"Write-behind error: {e}")
    
    def _flush_writes(self, writes):
        """Flush pending writes to database"""
        connection = self.db_pool.get_connection()
        try:
            cursor = connection.cursor()
            
            # Group writes by operation type
            inserts = []
            updates = []
            deletes = []
            
            for write_op in writes:
                if write_op['type'] == 'insert':
                    inserts.append(write_op)
                elif write_op['type'] == 'update':
                    updates.append(write_op)
                elif write_op['type'] == 'delete':
                    deletes.append(write_op)
            
            # Execute batch operations
            if inserts:
                self._batch_insert(cursor, inserts)
            if updates:
                self._batch_update(cursor, updates)
            if deletes:
                self._batch_delete(cursor, deletes)
            
            connection.commit()
            print(f"Flushed {len(writes)} write operations")
            
        except Error as e:
            connection.rollback()
            print(f"Batch write error: {e}")
        finally:
            cursor.close()
            connection.close()
    
    def update_user_async(self, user_id: int, updates: Dict):
        """Queue user update for write-behind processing"""
        # Update cache immediately
        cache_key = self._generate_cache_key("users", "get_by_id", (user_id,))
        cached_user = self.get_from_cache(cache_key)
        
        if cached_user:
            cached_user.update(updates)
            cached_user['updated_at'] = datetime.now().isoformat()
            self.set_cache(cache_key, cached_user)
        
        # Queue database write
        write_op = {
            'type': 'update',
            'table': 'users',
            'id': user_id,
            'data': updates,
            'timestamp': time.time()
        }
        
        self.write_queue.put(write_op)
        print(f"User {user_id} update queued for write-behind")
```

**3. Cache Warming and Preloading:**
```python
# Cache Warming Strategies
class CacheWarmer:
    def __init__(self, cache_manager):
        self.cache = cache_manager
        
    def warm_popular_users(self, limit: int = 1000):
        """Pre-load popular users into cache"""
        connection = self.cache.db_pool.get_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            
            # Get most active users
            cursor.execute(
                """
                SELECT u.id, u.username, u.email, u.created_at, u.last_login,
                       COUNT(p.id) as post_count
                FROM users u
                LEFT JOIN posts p ON u.id = p.user_id
                WHERE u.last_login >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                GROUP BY u.id
                ORDER BY post_count DESC, u.last_login DESC
                LIMIT %s
                """,
                (limit,)
            )
            
            users = cursor.fetchall()
            
            # Cache each user
            for user in users:
                cache_key = self.cache._generate_cache_key(
                    "users", "get_by_id", (user['id'],)
                )
                self.cache.set_cache(cache_key, user, ttl=7200)  # 2 hours
            
            print(f"Warmed cache with {len(users)} popular users")
            
        except Error as e:
            print(f"Cache warming error: {e}")
        finally:
            cursor.close()
            connection.close()
    
    def warm_trending_content(self):
        """Pre-load trending posts and comments"""
        connection = self.cache.db_pool.get_connection()
        try:
            cursor = connection.cursor(dictionary=True)
            
            # Get trending posts (high engagement in last 24 hours)
            cursor.execute(
                """
                SELECT p.id, p.title, p.content, p.user_id, p.created_at,
                       COUNT(DISTINCT l.id) as like_count,
                       COUNT(DISTINCT c.id) as comment_count
                FROM posts p
                LEFT JOIN likes l ON p.id = l.post_id 
                    AND l.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                LEFT JOIN comments c ON p.id = c.post_id 
                    AND c.created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                WHERE p.created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                GROUP BY p.id
                HAVING (like_count + comment_count) > 10
                ORDER BY (like_count + comment_count) DESC
                LIMIT 100
                """
            )
            
            trending_posts = cursor.fetchall()
            
            # Cache trending posts
            for post in trending_posts:
                cache_key = self.cache._generate_cache_key(
                    "posts", "get_by_id", (post['id'],)
                )
                self.cache.set_cache(cache_key, post, ttl=1800)  # 30 minutes
            
            print(f"Warmed cache with {len(trending_posts)} trending posts")
            
        except Error as e:
            print(f"Trending content warming error: {e}")
        finally:
            cursor.close()
            connection.close()
    
    def schedule_cache_warming(self):
        """Schedule regular cache warming"""
        import schedule
        
        # Warm popular users every hour
        schedule.every().hour.do(self.warm_popular_users)
        
        # Warm trending content every 15 minutes
        schedule.every(15).minutes.do(self.warm_trending_content)
        
        # Run scheduler in background
        def run_scheduler():
            while True:
                schedule.run_pending()
                time.sleep(60)
        
        scheduler_thread = threading.Thread(target=run_scheduler, daemon=True)
        scheduler_thread.start()
        print("Cache warming scheduler started")
```

**4. Multi-Level Caching:**
```python
# Multi-Level Cache Implementation
class MultiLevelCache:
    def __init__(self, redis_config, db_config):
        # L1 Cache: In-memory (fastest)
        from cachetools import TTLCache
        self.l1_cache = TTLCache(maxsize=1000, ttl=300)  # 5 minutes
        
        # L2 Cache: Redis (fast, shared)
        self.l2_cache = redis.Redis(**redis_config, decode_responses=True)
        
        # L3 Cache: Database (slowest, authoritative)
        self.db_pool = mysql.connector.pooling.MySQLConnectionPool(
            pool_name="multilevel_pool",
            pool_size=15,
            **db_config
        )
        
        self.cache_stats = {
            'l1_hits': 0,
            'l2_hits': 0,
            'db_hits': 0,
            'total_requests': 0
        }
    
    def get_data(self, key: str, fetch_func, ttl_l1: int = 300, ttl_l2: int = 1800):
        """Get data with multi-level caching"""
        self.cache_stats['total_requests'] += 1
        
        # Try L1 cache first (in-memory)
        if key in self.l1_cache:
            self.cache_stats['l1_hits'] += 1
            print(f"L1 Cache HIT for {key}")
            return self.l1_cache[key]
        
        # Try L2 cache (Redis)
        try:
            l2_data = self.l2_cache.get(f"l2:{key}")
            if l2_data:
                self.cache_stats['l2_hits'] += 1
                print(f"L2 Cache HIT for {key}")
                
                # Promote to L1 cache
                data = json.loads(l2_data)
                self.l1_cache[key] = data
                return data
        except (redis.RedisError, json.JSONDecodeError) as e:
            print(f"L2 cache error: {e}")
        
        # Fetch from database (L3)
        self.cache_stats['db_hits'] += 1
        print(f"Database fetch for {key}")
        
        data = fetch_func()
        
        if data is not None:
            # Store in all cache levels
            self.l1_cache[key] = data
            
            try:
                self.l2_cache.setex(
                    f"l2:{key}", 
                    ttl_l2, 
                    json.dumps(data, default=str)
                )
            except (redis.RedisError, json.JSONEncodeError) as e:
                print(f"L2 cache write error: {e}")
        
        return data
    
    def invalidate_all_levels(self, key: str):
        """Invalidate data across all cache levels"""
        # Remove from L1
        self.l1_cache.pop(key, None)
        
        # Remove from L2
        try:
            self.l2_cache.delete(f"l2:{key}")
        except redis.RedisError as e:
            print(f"L2 cache invalidation error: {e}")
        
        print(f"Invalidated {key} across all cache levels")
    
    def get_cache_stats(self):
        """Get cache performance statistics"""
        total = self.cache_stats['total_requests']
        if total == 0:
            return self.cache_stats
        
        return {
            **self.cache_stats,
            'l1_hit_rate': (self.cache_stats['l1_hits'] / total) * 100,
            'l2_hit_rate': (self.cache_stats['l2_hits'] / total) * 100,
            'cache_hit_rate': ((self.cache_stats['l1_hits'] + self.cache_stats['l2_hits']) / total) * 100
        }
```

**Best Practices:**

1. **Cache Key Design**: Use consistent, hierarchical naming conventions
2. **TTL Strategy**: Set appropriate expiration times based on data volatility
3. **Cache Invalidation**: Implement proper invalidation strategies
4. **Monitoring**: Track cache hit rates, memory usage, and performance
5. **Fallback Handling**: Always have fallback to database when cache fails
6. **Data Consistency**: Choose appropriate consistency models for your use case
7. **Memory Management**: Monitor and limit cache memory usage
8. **Security**: Encrypt sensitive cached data and secure cache access

---

### Q16: How do you implement database query optimization and explain query execution plans?
**Difficulty: Advanced**

**Answer:**
Query optimization is critical for database performance. Understanding execution plans and optimization techniques helps identify bottlenecks and improve query performance.

**Query Execution Plan Analysis:**

**1. Understanding Execution Plans:**
```sql
-- Sample database schema for examples
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    city VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP,
    
    INDEX idx_users_age (age),
    INDEX idx_users_city (city),
    INDEX idx_users_created_at (created_at),
    INDEX idx_users_email_city (email, city)
);

CREATE TABLE orders (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_orders_user_id (user_id),
    INDEX idx_orders_product_id (product_id),
    INDEX idx_orders_date (order_date),
    INDEX idx_orders_status (status),
    INDEX idx_orders_user_date (user_id, order_date)
);

CREATE TABLE products (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_products_category (category_id),
    INDEX idx_products_price (price),
    INDEX idx_products_name (name)
);

-- === EXECUTION PLAN EXAMPLES ===

-- 1. Basic EXPLAIN usage
EXPLAIN SELECT * FROM users WHERE age > 25;

/*
Execution Plan Analysis:
+----+-------------+-------+-------+---------------+--------------+---------+------+------+-------------+
| id | select_type | table | type  | possible_keys | key          | key_len | ref  | rows | Extra       |
+----+-------------+-------+-------+---------------+--------------+---------+------+------+-------------+
|  1 | SIMPLE      | users | range | idx_users_age | idx_users_age| 5       | NULL | 5000 | Using where |
+----+-------------+-------+-------+---------------+--------------+---------+------+------+-------------+

Key Points:
- type: 'range' indicates index range scan (good)
- key: 'idx_users_age' shows index is being used
- rows: estimated 5000 rows to examine
- Extra: 'Using where' means additional filtering
*/

-- 2. EXPLAIN ANALYZE for actual execution statistics (MySQL 8.0+)
EXPLAIN ANALYZE 
SELECT u.username, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= '2023-01-01'
GROUP BY u.id, u.username
HAVING order_count > 5
ORDER BY order_count DESC
LIMIT 10;

/*
Analyze Output:
-> Limit: 10 row(s)  (cost=15234.56 rows=10) (actual time=45.123..45.234 rows=8 loops=1)
    -> Sort: order_count DESC  (cost=15234.56 rows=1523) (actual time=45.098..45.156 rows=8 loops=1)
        -> Filter: (count(o.id) > 5)  (cost=15234.56 rows=1523) (actual time=12.345..44.987 rows=8 loops=1)
            -> Group aggregate: count(o.id)  (cost=15234.56 rows=15234) (actual time=0.123..44.876 rows=1523 loops=1)
                -> Nested loop left join  (cost=8765.43 rows=15234) (actual time=0.098..42.345 rows=15234 loops=1)
                    -> Index range scan on u using idx_users_created_at  (cost=1234.56 rows=2345) (actual time=0.087..2.345 rows=2345 loops=1)
                    -> Index lookup on o using idx_orders_user_id (user_id=u.id)  (cost=2.34 rows=6.5) (actual time=0.012..0.016 rows=6.5 loops=2345)

Key Insights:
- Actual time vs estimated cost comparison
- Number of rows processed at each step
- Index usage effectiveness
- Join algorithm used (Nested loop)
*/

-- 3. Complex query optimization example
-- BEFORE: Poorly optimized query
SELECT 
    u.username,
    u.email,
    p.name as product_name,
    o.quantity,
    o.price,
    o.order_date
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE u.city = 'New York'
  AND o.order_date >= '2023-01-01'
  AND p.price > 100
  AND o.status = 'delivered'
ORDER BY o.order_date DESC;

-- Check execution plan
EXPLAIN FORMAT=JSON
SELECT 
    u.username,
    u.email,
    p.name as product_name,
    o.quantity,
    o.price,
    o.order_date
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN products p ON o.product_id = p.id
WHERE u.city = 'New York'
  AND o.order_date >= '2023-01-01'
  AND p.price > 100
  AND o.status = 'delivered'
ORDER BY o.order_date DESC;

-- AFTER: Optimized with better indexes
-- Add composite indexes for better performance
CREATE INDEX idx_users_city_id ON users(city, id);
CREATE INDEX idx_orders_status_date_user ON orders(status, order_date, user_id);
CREATE INDEX idx_products_price_id ON products(price, id);

-- Optimized query with hints if needed
SELECT /*+ USE_INDEX(o, idx_orders_status_date_user) */
    u.username,
    u.email,
    p.name as product_name,
    o.quantity,
    o.price,
    o.order_date
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN products p ON o.product_id = p.id
WHERE o.status = 'delivered'
  AND o.order_date >= '2023-01-01'
  AND u.city = 'New York'
  AND p.price > 100
ORDER BY o.order_date DESC;
```

**2. Query Optimization Techniques:**
```sql
-- === INDEX OPTIMIZATION ===

-- 1. Covering indexes (include all needed columns)
CREATE INDEX idx_orders_covering ON orders(
    status, 
    order_date, 
    user_id, 
    product_id, 
    quantity, 
    price
);

-- Query that benefits from covering index
SELECT user_id, product_id, quantity, price
FROM orders
WHERE status = 'delivered' 
  AND order_date >= '2023-01-01'
ORDER BY order_date DESC;

-- 2. Partial indexes for specific conditions
CREATE INDEX idx_orders_recent_delivered ON orders(order_date, user_id)
WHERE status = 'delivered' AND order_date >= '2023-01-01';

-- 3. Functional indexes
CREATE INDEX idx_users_email_domain ON users((SUBSTRING_INDEX(email, '@', -1)));

-- Query using functional index
SELECT username, email
FROM users
WHERE SUBSTRING_INDEX(email, '@', -1) = 'gmail.com';

-- === QUERY REWRITING ===

-- 1. EXISTS vs IN optimization
-- SLOW: Using IN with subquery
SELECT u.username
FROM users u
WHERE u.id IN (
    SELECT DISTINCT o.user_id
    FROM orders o
    WHERE o.order_date >= '2023-01-01'
);

-- FAST: Using EXISTS
SELECT u.username
FROM users u
WHERE EXISTS (
    SELECT 1
    FROM orders o
    WHERE o.user_id = u.id
      AND o.order_date >= '2023-01-01'
);

-- 2. JOIN vs subquery optimization
-- SLOW: Correlated subquery
SELECT 
    u.username,
    (
        SELECT COUNT(*)
        FROM orders o
        WHERE o.user_id = u.id
          AND o.status = 'delivered'
    ) as delivered_orders
FROM users u
WHERE u.created_at >= '2023-01-01';

-- FAST: JOIN with aggregation
SELECT 
    u.username,
    COALESCE(order_stats.delivered_orders, 0) as delivered_orders
FROM users u
LEFT JOIN (
    SELECT 
        user_id,
        COUNT(*) as delivered_orders
    FROM orders
    WHERE status = 'delivered'
    GROUP BY user_id
) order_stats ON u.id = order_stats.user_id
WHERE u.created_at >= '2023-01-01';

-- 3. Window functions for ranking
-- Get top 3 orders by value for each user
SELECT 
    user_id,
    product_id,
    price,
    order_date,
    ROW_NUMBER() OVER (
        PARTITION BY user_id 
        ORDER BY price DESC
    ) as price_rank
FROM orders
WHERE order_date >= '2023-01-01'
QUALIFY price_rank <= 3;

-- === PAGINATION OPTIMIZATION ===

-- SLOW: OFFSET pagination for large datasets
SELECT id, username, email
FROM users
ORDER BY created_at DESC
LIMIT 20 OFFSET 100000;  -- Very slow for large offsets

-- FAST: Cursor-based pagination
SELECT id, username, email, created_at
FROM users
WHERE created_at < '2023-06-15 10:30:00'  -- Last seen timestamp
ORDER BY created_at DESC
LIMIT 20;

-- Alternative: Keyset pagination
SELECT id, username, email
FROM users
WHERE id < 50000  -- Last seen ID
ORDER BY id DESC
LIMIT 20;
```

**3. Performance Monitoring and Analysis:**
```python
# Query Performance Monitor
import time
import mysql.connector
from mysql.connector import Error
import logging
from dataclasses import dataclass
from typing import List, Dict, Optional

@dataclass
class QueryStats:
    query_hash: str
    query_text: str
    execution_count: int
    total_time: float
    avg_time: float
    max_time: float
    min_time: float
    rows_examined: int
    rows_sent: int
    
class QueryOptimizer:
    def __init__(self, db_config):
        self.db_config = db_config
        self.query_stats = {}
        self.slow_query_threshold = 1.0  # 1 second
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def execute_with_monitoring(self, query: str, params: tuple = None) -> Dict:
        """Execute query with performance monitoring"""
        query_hash = hash(query)
        
        connection = mysql.connector.connect(**self.db_config)
        try:
            cursor = connection.cursor(dictionary=True)
            
            # Enable query profiling
            cursor.execute("SET profiling = 1")
            
            # Record start time
            start_time = time.time()
            
            # Execute query
            cursor.execute(query, params or ())
            results = cursor.fetchall()
            
            # Record end time
            end_time = time.time()
            execution_time = end_time - start_time
            
            # Get query profile information
            cursor.execute("SHOW PROFILES")
            profiles = cursor.fetchall()
            
            if profiles:
                query_id = profiles[-1]['Query_ID']
                
                # Get detailed profile
                cursor.execute(f"SHOW PROFILE FOR QUERY {query_id}")
                profile_details = cursor.fetchall()
                
                # Get query statistics
                cursor.execute(
                    "SELECT * FROM information_schema.PROFILING WHERE QUERY_ID = %s",
                    (query_id,)
                )
                detailed_stats = cursor.fetchall()
            
            # Update query statistics
            self._update_query_stats(query_hash, query, execution_time, len(results))
            
            # Log slow queries
            if execution_time > self.slow_query_threshold:
                self._log_slow_query(query, execution_time, params)
            
            return {
                'results': results,
                'execution_time': execution_time,
                'rows_returned': len(results),
                'profile_details': profile_details if 'profile_details' in locals() else None
            }
            
        except Error as e:
            self.logger.error(f"Query execution error: {e}")
            raise
        finally:
            cursor.close()
            connection.close()
    
    def _update_query_stats(self, query_hash: str, query: str, execution_time: float, rows_sent: int):
        """Update query performance statistics"""
        if query_hash in self.query_stats:
            stats = self.query_stats[query_hash]
            stats.execution_count += 1
            stats.total_time += execution_time
            stats.avg_time = stats.total_time / stats.execution_count
            stats.max_time = max(stats.max_time, execution_time)
            stats.min_time = min(stats.min_time, execution_time)
            stats.rows_sent += rows_sent
        else:
            self.query_stats[query_hash] = QueryStats(
                query_hash=str(query_hash),
                query_text=query[:200] + '...' if len(query) > 200 else query,
                execution_count=1,
                total_time=execution_time,
                avg_time=execution_time,
                max_time=execution_time,
                min_time=execution_time,
                rows_examined=0,  # Would need additional monitoring
                rows_sent=rows_sent
            )
    
    def _log_slow_query(self, query: str, execution_time: float, params: tuple):
        """Log slow query for analysis"""
        self.logger.warning(
            f"SLOW QUERY DETECTED:\n"
            f"Execution Time: {execution_time:.3f}s\n"
            f"Query: {query}\n"
            f"Parameters: {params}\n"
            f"{'='*50}"
        )
    
    def get_performance_report(self) -> List[QueryStats]:
        """Get query performance report"""
        # Sort by average execution time (descending)
        sorted_stats = sorted(
            self.query_stats.values(),
            key=lambda x: x.avg_time,
            reverse=True
        )
        
        return sorted_stats
    
    def analyze_query_plan(self, query: str) -> Dict:
        """Analyze query execution plan"""
        connection = mysql.connector.connect(**self.db_config)
        try:
            cursor = connection.cursor(dictionary=True)
            
            # Get execution plan
            cursor.execute(f"EXPLAIN FORMAT=JSON {query}")
            plan_result = cursor.fetchone()
            
            if plan_result:
                import json
                plan = json.loads(plan_result['EXPLAIN'])
                
                # Analyze plan for potential issues
                issues = self._analyze_plan_issues(plan)
                
                return {
                    'execution_plan': plan,
                    'potential_issues': issues,
                    'recommendations': self._generate_recommendations(issues)
                }
            
        except Error as e:
            self.logger.error(f"Plan analysis error: {e}")
            return {'error': str(e)}
        finally:
            cursor.close()
            connection.close()
    
    def _analyze_plan_issues(self, plan: Dict) -> List[str]:
        """Analyze execution plan for potential performance issues"""
        issues = []
        
        def analyze_node(node):
            if isinstance(node, dict):
                # Check for table scans
                if node.get('access_type') == 'ALL':
                    issues.append(f"Full table scan detected on table: {node.get('table_name')}")
                
                # Check for high row estimates
                rows_examined = node.get('rows_examined_per_scan', 0)
                if rows_examined > 10000:
                    issues.append(f"High row examination count: {rows_examined}")
                
                # Check for filesort
                if 'filesort' in str(node.get('used_key_parts', '')):
                    issues.append("Filesort operation detected - consider adding index")
                
                # Check for temporary tables
                if node.get('using_temporary_table'):
                    issues.append("Temporary table usage detected")
                
                # Recursively analyze child nodes
                for key, value in node.items():
                    if isinstance(value, (dict, list)):
                        analyze_node(value)
            
            elif isinstance(node, list):
                for item in node:
                    analyze_node(item)
        
        analyze_node(plan)
        return issues
    
    def _generate_recommendations(self, issues: List[str]) -> List[str]:
        """Generate optimization recommendations based on issues"""
        recommendations = []
        
        for issue in issues:
            if "Full table scan" in issue:
                recommendations.append("Add appropriate indexes to avoid full table scans")
            elif "High row examination" in issue:
                recommendations.append("Consider adding more selective WHERE clauses or better indexes")
            elif "Filesort" in issue:
                recommendations.append("Add composite index covering ORDER BY columns")
            elif "Temporary table" in issue:
                recommendations.append("Optimize GROUP BY/ORDER BY clauses or increase sort_buffer_size")
        
        return recommendations

# Usage example
optimizer = QueryOptimizer({
    'host': 'localhost',
    'user': 'app_user',
    'password': 'secure_password',
    'database': 'production_db'
})

# Execute and monitor query
result = optimizer.execute_with_monitoring(
    "SELECT u.username, COUNT(o.id) FROM users u LEFT JOIN orders o ON u.id = o.user_id GROUP BY u.id"
)

# Analyze query plan
plan_analysis = optimizer.analyze_query_plan(
    "SELECT * FROM orders WHERE order_date >= '2023-01-01' ORDER BY order_date DESC"
)

# Get performance report
performance_report = optimizer.get_performance_report()
for stats in performance_report[:5]:  # Top 5 slowest queries
    print(f"Query: {stats.query_text}")
    print(f"Avg Time: {stats.avg_time:.3f}s")
    print(f"Executions: {stats.execution_count}")
    print("-" * 50)
```

**Best Practices:**

1. **Index Strategy**: Create indexes based on query patterns, not just foreign keys
2. **Query Analysis**: Regularly analyze slow query logs and execution plans
3. **Statistics Maintenance**: Keep table statistics up to date for optimal plans
4. **Query Rewriting**: Rewrite complex queries for better performance
5. **Monitoring**: Implement continuous query performance monitoring
6. **Testing**: Test query performance with production-like data volumes
7. **Caching**: Implement query result caching for frequently accessed data
8. **Partitioning**: Use table partitioning for very large tables

---

### Q17: How do you implement database concurrency control and handle deadlocks?
**Difficulty: Advanced**

**Answer:**
Concurrency control ensures that multiple transactions can execute simultaneously without compromising data integrity. Understanding deadlocks and their prevention is crucial for high-performance database applications.

**Concurrency Control Mechanisms:**

**1. Locking Mechanisms:**
```sql
-- === LOCKING EXAMPLES ===

-- Sample schema for concurrency examples
CREATE TABLE accounts (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    account_type ENUM('checking', 'savings', 'credit') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    version INT DEFAULT 1,
    
    INDEX idx_account_number (account_number),
    INDEX idx_account_type (account_type)
);

CREATE TABLE transactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    from_account_id BIGINT,
    to_account_id BIGINT,
    amount DECIMAL(15,2) NOT NULL,
    transaction_type ENUM('transfer', 'deposit', 'withdrawal') NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    
    FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(id),
    INDEX idx_from_account (from_account_id),
    INDEX idx_to_account (to_account_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO accounts (account_number, balance, account_type) VALUES
('ACC001', 10000.00, 'checking'),
('ACC002', 5000.00, 'savings'),
('ACC003', 15000.00, 'checking'),
('ACC004', 2000.00, 'savings');

-- === EXPLICIT LOCKING ===

-- 1. Shared Lock (READ LOCK)
-- Transaction 1: Read with shared lock
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001' LOCK IN SHARE MODE;
-- Other transactions can read but cannot modify until this transaction commits
COMMIT;

-- 2. Exclusive Lock (WRITE LOCK)
-- Transaction 2: Write with exclusive lock
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001' FOR UPDATE;
-- Other transactions cannot read or write until this transaction commits
UPDATE accounts SET balance = balance - 500.00 WHERE account_number = 'ACC001';
COMMIT;

-- 3. Table-level locking
LOCK TABLES accounts WRITE;
-- Exclusive access to entire table
UPDATE accounts SET balance = balance * 1.02 WHERE account_type = 'savings';
UNLOCK TABLES;

-- === DEADLOCK SCENARIOS ===

-- Deadlock Example: Two transactions accessing same resources in different order

-- Transaction A (Session 1):
START TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE account_number = 'ACC001';
-- Wait here... Transaction B will try to lock ACC001
UPDATE accounts SET balance = balance + 100 WHERE account_number = 'ACC002';
COMMIT;

-- Transaction B (Session 2) - executed simultaneously:
START TRANSACTION;
UPDATE accounts SET balance = balance - 50 WHERE account_number = 'ACC002';
-- This will cause deadlock when trying to access ACC001
UPDATE accounts SET balance = balance + 50 WHERE account_number = 'ACC001';
COMMIT;

-- MySQL will detect deadlock and rollback one transaction
-- Error: Deadlock found when trying to get lock; try restarting transaction
```

**2. Deadlock Prevention and Handling:**
```python
# Python implementation for deadlock handling
import mysql.connector
from mysql.connector import Error
import time
import random
import logging
from typing import Optional, Tuple
from contextlib import contextmanager
from dataclasses import dataclass

@dataclass
class TransferRequest:
    from_account: str
    to_account: str
    amount: float
    description: str = ""

class DeadlockHandler:
    def __init__(self, db_config):
        self.db_config = db_config
        self.max_retries = 3
        self.base_delay = 0.1  # 100ms
        self.max_delay = 2.0   # 2 seconds
        
        # Setup logging
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    @contextmanager
    def get_connection(self):
        """Context manager for database connections"""
        connection = None
        try:
            connection = mysql.connector.connect(**self.db_config)
            connection.autocommit = False  # Explicit transaction control
            yield connection
        except Error as e:
            if connection:
                connection.rollback()
            raise
        finally:
            if connection and connection.is_connected():
                connection.close()
    
    def transfer_money_with_deadlock_handling(self, transfer: TransferRequest) -> Tuple[bool, str]:
        """Transfer money between accounts with deadlock handling"""
        for attempt in range(self.max_retries):
            try:
                with self.get_connection() as connection:
                    cursor = connection.cursor(dictionary=True)
                    
                    # Implement ordered locking to prevent deadlocks
                    # Always lock accounts in consistent order (by account_number)
                    accounts = sorted([transfer.from_account, transfer.to_account])
                    
                    # Start transaction
                    cursor.execute("START TRANSACTION")
                    
                    # Lock accounts in order to prevent deadlock
                    cursor.execute(
                        "SELECT id, balance FROM accounts WHERE account_number IN (%s, %s) ORDER BY account_number FOR UPDATE",
                        (accounts[0], accounts[1])
                    )
                    
                    account_data = {row['account_number']: row for row in cursor.fetchall()}
                    
                    # Validate accounts exist
                    if transfer.from_account not in account_data or transfer.to_account not in account_data:
                        connection.rollback()
                        return False, "One or both accounts not found"
                    
                    from_account = account_data[transfer.from_account]
                    to_account = account_data[transfer.to_account]
                    
                    # Check sufficient balance
                    if from_account['balance'] < transfer.amount:
                        connection.rollback()
                        return False, f"Insufficient balance. Available: {from_account['balance']}"
                    
                    # Create transaction record
                    cursor.execute(
                        """
                        INSERT INTO transactions (from_account_id, to_account_id, amount, transaction_type, status)
                        VALUES (%s, %s, %s, 'transfer', 'pending')
                        """,
                        (from_account['id'], to_account['id'], transfer.amount)
                    )
                    
                    transaction_id = cursor.lastrowid
                    
                    # Update account balances
                    cursor.execute(
                        "UPDATE accounts SET balance = balance - %s, updated_at = NOW() WHERE account_number = %s",
                        (transfer.amount, transfer.from_account)
                    )
                    
                    cursor.execute(
                        "UPDATE accounts SET balance = balance + %s, updated_at = NOW() WHERE account_number = %s",
                        (transfer.amount, transfer.to_account)
                    )
                    
                    # Update transaction status
                    cursor.execute(
                        "UPDATE transactions SET status = 'completed', completed_at = NOW() WHERE id = %s",
                        (transaction_id,)
                    )
                    
                    # Commit transaction
                    connection.commit()
                    
                    self.logger.info(
                        f"Transfer completed: {transfer.from_account} -> {transfer.to_account}, "
                        f"Amount: {transfer.amount}, Transaction ID: {transaction_id}"
                    )
                    
                    return True, f"Transfer successful. Transaction ID: {transaction_id}"
                    
            except mysql.connector.Error as e:
                if e.errno == 1213:  # Deadlock error code
                    self.logger.warning(f"Deadlock detected on attempt {attempt + 1}. Retrying...")
                    
                    if attempt < self.max_retries - 1:
                        # Exponential backoff with jitter
                        delay = min(
                            self.base_delay * (2 ** attempt) + random.uniform(0, 0.1),
                            self.max_delay
                        )
                        time.sleep(delay)
                        continue
                    else:
                        return False, "Transfer failed due to repeated deadlocks"
                else:
                    self.logger.error(f"Database error: {e}")
                    return False, f"Database error: {e}"
            
            except Exception as e:
                self.logger.error(f"Unexpected error: {e}")
                return False, f"Unexpected error: {e}"
        
        return False, "Transfer failed after maximum retries"
    
    def transfer_money_optimistic_locking(self, transfer: TransferRequest) -> Tuple[bool, str]:
        """Transfer money using optimistic locking with version control"""
        for attempt in range(self.max_retries):
            try:
                with self.get_connection() as connection:
                    cursor = connection.cursor(dictionary=True)
                    
                    # Start transaction
                    cursor.execute("START TRANSACTION")
                    
                    # Read accounts with version numbers
                    cursor.execute(
                        "SELECT id, account_number, balance, version FROM accounts WHERE account_number IN (%s, %s)",
                        (transfer.from_account, transfer.to_account)
                    )
                    
                    accounts = {row['account_number']: row for row in cursor.fetchall()}
                    
                    if len(accounts) != 2:
                        connection.rollback()
                        return False, "One or both accounts not found"
                    
                    from_account = accounts[transfer.from_account]
                    to_account = accounts[transfer.to_account]
                    
                    # Check sufficient balance
                    if from_account['balance'] < transfer.amount:
                        connection.rollback()
                        return False, f"Insufficient balance. Available: {from_account['balance']}"
                    
                    # Update with version check (optimistic locking)
                    cursor.execute(
                        """
                        UPDATE accounts 
                        SET balance = balance - %s, version = version + 1, updated_at = NOW() 
                        WHERE account_number = %s AND version = %s
                        """,
                        (transfer.amount, transfer.from_account, from_account['version'])
                    )
                    
                    if cursor.rowcount == 0:
                        connection.rollback()
                        self.logger.warning(f"Optimistic lock failed for account {transfer.from_account} on attempt {attempt + 1}")
                        
                        if attempt < self.max_retries - 1:
                            time.sleep(random.uniform(0.01, 0.1))  # Short random delay
                            continue
                        else:
                            return False, "Transfer failed due to concurrent modifications"
                    
                    cursor.execute(
                        """
                        UPDATE accounts 
                        SET balance = balance + %s, version = version + 1, updated_at = NOW() 
                        WHERE account_number = %s AND version = %s
                        """,
                        (transfer.amount, transfer.to_account, to_account['version'])
                    )
                    
                    if cursor.rowcount == 0:
                        connection.rollback()
                        self.logger.warning(f"Optimistic lock failed for account {transfer.to_account} on attempt {attempt + 1}")
                        
                        if attempt < self.max_retries - 1:
                            time.sleep(random.uniform(0.01, 0.1))
                            continue
                        else:
                            return False, "Transfer failed due to concurrent modifications"
                    
                    # Create transaction record
                    cursor.execute(
                        """
                        INSERT INTO transactions (from_account_id, to_account_id, amount, transaction_type, status, completed_at)
                        VALUES (%s, %s, %s, 'transfer', 'completed', NOW())
                        """,
                        (from_account['id'], to_account['id'], transfer.amount)
                    )
                    
                    transaction_id = cursor.lastrowid
                    
                    # Commit transaction
                    connection.commit()
                    
                    self.logger.info(
                        f"Optimistic transfer completed: {transfer.from_account} -> {transfer.to_account}, "
                        f"Amount: {transfer.amount}, Transaction ID: {transaction_id}"
                    )
                    
                    return True, f"Transfer successful. Transaction ID: {transaction_id}"
                    
            except mysql.connector.Error as e:
                self.logger.error(f"Database error on attempt {attempt + 1}: {e}")
                if attempt < self.max_retries - 1:
                    time.sleep(random.uniform(0.1, 0.5))
                    continue
                else:
                    return False, f"Transfer failed: {e}"
            
            except Exception as e:
                self.logger.error(f"Unexpected error: {e}")
                return False, f"Unexpected error: {e}"
        
        return False, "Transfer failed after maximum retries"
    
    def get_deadlock_statistics(self) -> dict:
        """Get deadlock statistics from MySQL"""
        try:
            with self.get_connection() as connection:
                cursor = connection.cursor(dictionary=True)
                
                # Get InnoDB status for deadlock information
                cursor.execute("SHOW ENGINE INNODB STATUS")
                status_result = cursor.fetchone()
                
                # Parse deadlock information from status
                status_text = status_result['Status']
                
                # Extract deadlock count
                deadlock_count = 0
                if 'Number of deadlocks' in status_text:
                    import re
                    match = re.search(r'Number of deadlocks: (\d+)', status_text)
                    if match:
                        deadlock_count = int(match.group(1))
                
                # Get current lock waits
                cursor.execute(
                    """
                    SELECT COUNT(*) as waiting_transactions
                    FROM information_schema.INNODB_TRX 
                    WHERE trx_state = 'LOCK WAIT'
                    """
                )
                
                waiting_transactions = cursor.fetchone()['waiting_transactions']
                
                return {
                    'total_deadlocks': deadlock_count,
                    'waiting_transactions': waiting_transactions,
                    'status_timestamp': time.time()
                }
                
        except Error as e:
            self.logger.error(f"Error getting deadlock statistics: {e}")
            return {'error': str(e)}

# Usage examples
deadlock_handler = DeadlockHandler({
    'host': 'localhost',
    'user': 'app_user',
    'password': 'secure_password',
    'database': 'banking_db'
})

# Example transfer with deadlock handling
transfer_request = TransferRequest(
    from_account='ACC001',
    to_account='ACC002',
    amount=500.00,
    description='Monthly transfer'
)

success, message = deadlock_handler.transfer_money_with_deadlock_handling(transfer_request)
print(f"Transfer result: {success}, Message: {message}")

# Example with optimistic locking
success, message = deadlock_handler.transfer_money_optimistic_locking(transfer_request)
print(f"Optimistic transfer result: {success}, Message: {message}")

# Get deadlock statistics
stats = deadlock_handler.get_deadlock_statistics()
print(f"Deadlock statistics: {stats}")
```

**3. Isolation Levels and Concurrency:**
```sql
-- === ISOLATION LEVEL EXAMPLES ===

-- 1. READ UNCOMMITTED (Lowest isolation, highest concurrency)
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- Can read uncommitted changes from other transactions (dirty reads)
COMMIT;

-- 2. READ COMMITTED (Default in most databases)
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- Wait for other transaction to commit
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- May get different result (non-repeatable reads)
COMMIT;

-- 3. REPEATABLE READ (MySQL default)
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- Same result guaranteed for subsequent reads
SELECT balance FROM accounts WHERE account_number = 'ACC001';
-- But phantom reads possible for range queries
COMMIT;

-- 4. SERIALIZABLE (Highest isolation, lowest concurrency)
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT * FROM accounts WHERE balance > 5000;
-- No other transaction can insert/update/delete rows that would affect this result
COMMIT;

-- === MONITORING LOCKS AND TRANSACTIONS ===

-- View current transactions
SELECT 
    trx_id,
    trx_state,
    trx_started,
    trx_requested_lock_id,
    trx_wait_started,
    trx_weight,
    trx_mysql_thread_id,
    trx_query
FROM information_schema.INNODB_TRX;

-- View current locks
SELECT 
    lock_id,
    lock_trx_id,
    lock_mode,
    lock_type,
    lock_table,
    lock_index,
    lock_space,
    lock_page,
    lock_rec,
    lock_data
FROM information_schema.INNODB_LOCKS;

-- View lock waits
SELECT 
    requesting_trx_id,
    requested_lock_id,
    blocking_trx_id,
    blocking_lock_id
FROM information_schema.INNODB_LOCK_WAITS;

-- Kill long-running transaction
-- KILL <thread_id>;
```

**Best Practices:**

1. **Consistent Lock Ordering**: Always acquire locks in the same order to prevent deadlocks
2. **Short Transactions**: Keep transactions as short as possible
3. **Appropriate Isolation**: Use the lowest isolation level that meets your consistency requirements
4. **Deadlock Handling**: Implement retry logic with exponential backoff
5. **Monitoring**: Monitor lock waits and deadlock frequency
6. **Optimistic Locking**: Use version numbers for high-concurrency scenarios
7. **Connection Pooling**: Limit the number of concurrent connections
8. **Index Optimization**: Proper indexes reduce lock duration

---

### Q18: How do you implement database monitoring, alerting, and performance tuning?
**Difficulty: Advanced**

**Answer:**
Comprehensive database monitoring is essential for maintaining optimal performance, preventing issues, and ensuring high availability. Here's a complete approach to database monitoring and performance tuning.

**Database Monitoring Implementation:**

**1. Performance Metrics Collection:**
```python
# Comprehensive Database Monitor
import mysql.connector
from mysql.connector import Error
import psutil
import time
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, asdict
import threading
import smtplib
from email.mime.text import MimeText
from email.mime.multipart import MimeMultipart

@dataclass
class DatabaseMetrics:
    timestamp: datetime
    connections_active: int
    connections_max: int
    queries_per_second: float
    slow_queries: int
    innodb_buffer_pool_hit_ratio: float
    innodb_buffer_pool_pages_free: int
    innodb_buffer_pool_pages_total: int
    table_locks_waited: int
    table_locks_immediate: int
    threads_running: int
    threads_connected: int
    bytes_sent: int
    bytes_received: int
    uptime: int
    cpu_usage: float
    memory_usage: float
    disk_usage: float
    replication_lag: Optional[float] = None

@dataclass
class AlertRule:
    metric_name: str
    threshold: float
    operator: str  # '>', '<', '>=', '<=', '==', '!='
    severity: str  # 'critical', 'warning', 'info'
    description: str
    enabled: bool = True

class DatabaseMonitor:
    def __init__(self, db_config, alert_config=None):
        self.db_config = db_config
        self.alert_config = alert_config or {}
        self.metrics_history = []
        self.max_history_size = 1000
        self.monitoring_active = False
        self.monitoring_thread = None
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Define alert rules
        self.alert_rules = [
            AlertRule('connections_active', 80, '>', 'warning', 'High number of active connections'),
            AlertRule('innodb_buffer_pool_hit_ratio', 95, '<', 'warning', 'Low buffer pool hit ratio'),
            AlertRule('slow_queries', 10, '>', 'warning', 'High number of slow queries'),
            AlertRule('threads_running', 50, '>', 'critical', 'Too many running threads'),
            AlertRule('cpu_usage', 80, '>', 'warning', 'High CPU usage'),
            AlertRule('memory_usage', 85, '>', 'critical', 'High memory usage'),
            AlertRule('disk_usage', 90, '>', 'critical', 'High disk usage'),
            AlertRule('replication_lag', 5, '>', 'warning', 'High replication lag')
        ]
        
        self.last_alert_times = {}
        self.alert_cooldown = 300  # 5 minutes
    
    def collect_metrics(self) -> DatabaseMetrics:
        """Collect comprehensive database metrics"""
        try:
            connection = mysql.connector.connect(**self.db_config)
            cursor = connection.cursor(dictionary=True)
            
            # Get MySQL status variables
            cursor.execute("SHOW GLOBAL STATUS")
            status_vars = {row['Variable_name']: row['Value'] for row in cursor.fetchall()}
            
            # Get MySQL variables
            cursor.execute("SHOW GLOBAL VARIABLES")
            variables = {row['Variable_name']: row['Value'] for row in cursor.fetchall()}
            
            # Calculate derived metrics
            connections_active = int(status_vars.get('Threads_connected', 0))
            connections_max = int(variables.get('max_connections', 0))
            
            # Calculate queries per second
            uptime = int(status_vars.get('Uptime', 1))
            total_queries = int(status_vars.get('Queries', 0))
            queries_per_second = total_queries / uptime if uptime > 0 else 0
            
            # InnoDB buffer pool metrics
            buffer_pool_reads = int(status_vars.get('Innodb_buffer_pool_reads', 0))
            buffer_pool_read_requests = int(status_vars.get('Innodb_buffer_pool_read_requests', 0))
            
            if buffer_pool_read_requests > 0:
                hit_ratio = ((buffer_pool_read_requests - buffer_pool_reads) / buffer_pool_read_requests) * 100
            else:
                hit_ratio = 100.0
            
            # Get replication lag if slave
            replication_lag = None
            try:
                cursor.execute("SHOW SLAVE STATUS")
                slave_status = cursor.fetchone()
                if slave_status and slave_status.get('Seconds_Behind_Master') is not None:
                    replication_lag = float(slave_status['Seconds_Behind_Master'])
            except:
                pass  # Not a slave or no replication
            
            # System metrics
            cpu_usage = psutil.cpu_percent(interval=1)
            memory = psutil.virtual_memory()
            disk = psutil.disk_usage('/')
            
            metrics = DatabaseMetrics(
                timestamp=datetime.now(),
                connections_active=connections_active,
                connections_max=connections_max,
                queries_per_second=queries_per_second,
                slow_queries=int(status_vars.get('Slow_queries', 0)),
                innodb_buffer_pool_hit_ratio=hit_ratio,
                innodb_buffer_pool_pages_free=int(status_vars.get('Innodb_buffer_pool_pages_free', 0)),
                innodb_buffer_pool_pages_total=int(status_vars.get('Innodb_buffer_pool_pages_total', 0)),
                table_locks_waited=int(status_vars.get('Table_locks_waited', 0)),
                table_locks_immediate=int(status_vars.get('Table_locks_immediate', 0)),
                threads_running=int(status_vars.get('Threads_running', 0)),
                threads_connected=connections_active,
                bytes_sent=int(status_vars.get('Bytes_sent', 0)),
                bytes_received=int(status_vars.get('Bytes_received', 0)),
                uptime=uptime,
                cpu_usage=cpu_usage,
                memory_usage=memory.percent,
                disk_usage=disk.percent,
                replication_lag=replication_lag
            )
            
            return metrics
            
        except Error as e:
            self.logger.error(f"Error collecting metrics: {e}")
            raise
        finally:
            if 'cursor' in locals():
                cursor.close()
            if 'connection' in locals() and connection.is_connected():
                connection.close()
    
    def check_alerts(self, metrics: DatabaseMetrics):
        """Check metrics against alert rules"""
        current_time = time.time()
        
        for rule in self.alert_rules:
            if not rule.enabled:
                continue
            
            # Get metric value
            metric_value = getattr(metrics, rule.metric_name, None)
            if metric_value is None:
                continue
            
            # Check if alert should fire
            should_alert = False
            
            if rule.operator == '>' and metric_value > rule.threshold:
                should_alert = True
            elif rule.operator == '<' and metric_value < rule.threshold:
                should_alert = True
            elif rule.operator == '>=' and metric_value >= rule.threshold:
                should_alert = True
            elif rule.operator == '<=' and metric_value <= rule.threshold:
                should_alert = True
            elif rule.operator == '==' and metric_value == rule.threshold:
                should_alert = True
            elif rule.operator == '!=' and metric_value != rule.threshold:
                should_alert = True
            
            if should_alert:
                # Check cooldown
                last_alert_time = self.last_alert_times.get(rule.metric_name, 0)
                if current_time - last_alert_time > self.alert_cooldown:
                    self.send_alert(rule, metric_value, metrics)
                    self.last_alert_times[rule.metric_name] = current_time
    
    def send_alert(self, rule: AlertRule, value: float, metrics: DatabaseMetrics):
        """Send alert notification"""
        alert_message = {
            'timestamp': metrics.timestamp.isoformat(),
            'severity': rule.severity,
            'metric': rule.metric_name,
            'value': value,
            'threshold': rule.threshold,
            'description': rule.description,
            'server_info': {
                'connections': metrics.connections_active,
                'cpu_usage': metrics.cpu_usage,
                'memory_usage': metrics.memory_usage,
                'queries_per_second': metrics.queries_per_second
            }
        }
        
        # Log alert
        self.logger.warning(f"ALERT: {rule.description} - {rule.metric_name}: {value} {rule.operator} {rule.threshold}")
        
        # Send email alert if configured
        if self.alert_config.get('email_enabled'):
            self.send_email_alert(alert_message)
        
        # Send to monitoring system (e.g., Prometheus, Grafana)
        if self.alert_config.get('webhook_url'):
            self.send_webhook_alert(alert_message)
    
    def send_email_alert(self, alert_data: Dict):
        """Send email alert"""
        try:
            smtp_config = self.alert_config.get('smtp', {})
            
            msg = MimeMultipart()
            msg['From'] = smtp_config.get('from_email')
            msg['To'] = ', '.join(smtp_config.get('to_emails', []))
            msg['Subject'] = f"Database Alert: {alert_data['severity'].upper()} - {alert_data['description']}"
            
            body = f"""
            Database Alert Details:
            
            Severity: {alert_data['severity'].upper()}
            Metric: {alert_data['metric']}
            Current Value: {alert_data['value']}
            Threshold: {alert_data['threshold']}
            Description: {alert_data['description']}
            Timestamp: {alert_data['timestamp']}
            
            Server Status:
            - Active Connections: {alert_data['server_info']['connections']}
            - CPU Usage: {alert_data['server_info']['cpu_usage']:.1f}%
            - Memory Usage: {alert_data['server_info']['memory_usage']:.1f}%
            - Queries/Second: {alert_data['server_info']['queries_per_second']:.2f}
            
            Please investigate immediately.
            """
            
            msg.attach(MimeText(body, 'plain'))
            
            server = smtplib.SMTP(smtp_config.get('host'), smtp_config.get('port', 587))
            server.starttls()
            server.login(smtp_config.get('username'), smtp_config.get('password'))
            server.send_message(msg)
            server.quit()
            
            self.logger.info(f"Email alert sent for {alert_data['metric']}")
            
        except Exception as e:
            self.logger.error(f"Failed to send email alert: {e}")
    
    def send_webhook_alert(self, alert_data: Dict):
        """Send webhook alert to monitoring system"""
        try:
            import requests
            
            webhook_url = self.alert_config.get('webhook_url')
            response = requests.post(
                webhook_url,
                json=alert_data,
                timeout=10
            )
            
            if response.status_code == 200:
                self.logger.info(f"Webhook alert sent for {alert_data['metric']}")
            else:
                self.logger.error(f"Webhook alert failed: {response.status_code}")
                
        except Exception as e:
            self.logger.error(f"Failed to send webhook alert: {e}")
    
    def start_monitoring(self, interval: int = 60):
        """Start continuous monitoring"""
        self.monitoring_active = True
        
        def monitor_loop():
            while self.monitoring_active:
                try:
                    metrics = self.collect_metrics()
                    
                    # Store metrics
                    self.metrics_history.append(metrics)
                    if len(self.metrics_history) > self.max_history_size:
                        self.metrics_history.pop(0)
                    
                    # Check alerts
                    self.check_alerts(metrics)
                    
                    # Log current status
                    self.logger.info(
                        f"Metrics collected - Connections: {metrics.connections_active}/{metrics.connections_max}, "
                        f"CPU: {metrics.cpu_usage:.1f}%, Memory: {metrics.memory_usage:.1f}%, "
                        f"QPS: {metrics.queries_per_second:.2f}"
                    )
                    
                except Exception as e:
                    self.logger.error(f"Error in monitoring loop: {e}")
                
                time.sleep(interval)
        
        self.monitoring_thread = threading.Thread(target=monitor_loop, daemon=True)
        self.monitoring_thread.start()
        
        self.logger.info(f"Database monitoring started with {interval}s interval")
    
    def stop_monitoring(self):
        """Stop monitoring"""
        self.monitoring_active = False
        if self.monitoring_thread:
            self.monitoring_thread.join(timeout=5)
        self.logger.info("Database monitoring stopped")
    
    def get_performance_report(self, hours: int = 24) -> Dict:
        """Generate performance report"""
        cutoff_time = datetime.now() - timedelta(hours=hours)
        recent_metrics = [m for m in self.metrics_history if m.timestamp >= cutoff_time]
        
        if not recent_metrics:
            return {'error': 'No metrics available for the specified time period'}
        
        # Calculate averages and trends
        avg_connections = sum(m.connections_active for m in recent_metrics) / len(recent_metrics)
        avg_cpu = sum(m.cpu_usage for m in recent_metrics) / len(recent_metrics)
        avg_memory = sum(m.memory_usage for m in recent_metrics) / len(recent_metrics)
        avg_qps = sum(m.queries_per_second for m in recent_metrics) / len(recent_metrics)
        
        max_connections = max(m.connections_active for m in recent_metrics)
        max_cpu = max(m.cpu_usage for m in recent_metrics)
        max_memory = max(m.memory_usage for m in recent_metrics)
        
        # Buffer pool efficiency
        latest_metrics = recent_metrics[-1]
        buffer_pool_efficiency = latest_metrics.innodb_buffer_pool_hit_ratio
        
        return {
            'report_period_hours': hours,
            'metrics_count': len(recent_metrics),
            'averages': {
                'connections': round(avg_connections, 2),
                'cpu_usage': round(avg_cpu, 2),
                'memory_usage': round(avg_memory, 2),
                'queries_per_second': round(avg_qps, 2)
            },
            'peaks': {
                'max_connections': max_connections,
                'max_cpu_usage': round(max_cpu, 2),
                'max_memory_usage': round(max_memory, 2)
            },
            'current_status': {
                'buffer_pool_hit_ratio': round(buffer_pool_efficiency, 2),
                'uptime_hours': round(latest_metrics.uptime / 3600, 2),
                'total_slow_queries': latest_metrics.slow_queries
            },
            'recommendations': self.generate_recommendations(recent_metrics)
        }
    
    def generate_recommendations(self, metrics: List[DatabaseMetrics]) -> List[str]:
        """Generate performance recommendations"""
        recommendations = []
        
        if not metrics:
            return recommendations
        
        latest = metrics[-1]
        avg_cpu = sum(m.cpu_usage for m in metrics) / len(metrics)
        avg_memory = sum(m.memory_usage for m in metrics) / len(metrics)
        
        # Connection recommendations
        connection_usage = (latest.connections_active / latest.connections_max) * 100
        if connection_usage > 80:
            recommendations.append("Consider increasing max_connections or implementing connection pooling")
        
        # Buffer pool recommendations
        if latest.innodb_buffer_pool_hit_ratio < 95:
            recommendations.append("Consider increasing innodb_buffer_pool_size for better cache hit ratio")
        
        # CPU recommendations
        if avg_cpu > 70:
            recommendations.append("High CPU usage detected - review slow queries and consider query optimization")
        
        # Memory recommendations
        if avg_memory > 80:
            recommendations.append("High memory usage - consider optimizing buffer sizes or adding more RAM")
        
        # Slow query recommendations
        if latest.slow_queries > 100:
            recommendations.append("High number of slow queries - enable slow query log and optimize problematic queries")
        
        return recommendations

# Usage example
monitor = DatabaseMonitor(
    db_config={
        'host': 'localhost',
        'user': 'monitor_user',
        'password': 'monitor_password',
        'database': 'information_schema'
    },
    alert_config={
        'email_enabled': True,
        'smtp': {
            'host': 'smtp.gmail.com',
            'port': 587,
            'username': 'alerts@company.com',
            'password': 'app_password',
            'from_email': 'alerts@company.com',
            'to_emails': ['dba@company.com', 'ops@company.com']
        },
        'webhook_url': 'https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK'
    }
)

# Start monitoring
monitor.start_monitoring(interval=30)  # Check every 30 seconds

# Get performance report
report = monitor.get_performance_report(hours=24)
print(json.dumps(report, indent=2))
```

**Best Practices:**

1. **Comprehensive Monitoring**: Monitor both database and system metrics
2. **Proactive Alerting**: Set up alerts before problems become critical
3. **Historical Analysis**: Keep metrics history for trend analysis
4. **Automated Response**: Implement automated responses for common issues
5. **Regular Reviews**: Regularly review and adjust monitoring thresholds
6. **Documentation**: Document all monitoring procedures and alert responses
7. **Testing**: Test alert systems regularly to ensure they work
8. **Integration**: Integrate with existing monitoring and incident management systems

---

## Database Design

### Q2: Write a complex SQL query that demonstrates window functions, CTEs, and subqueries. 
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

---

### Q19: How do you design and implement data warehousing solutions and ETL processes?
**Difficulty: Expert**

**Answer:**
Data warehousing involves designing systems for analytical processing and business intelligence. ETL (Extract, Transform, Load) processes are crucial for moving and transforming data from operational systems to analytical systems.

**Data Warehouse Architecture:**

```sql
-- === DIMENSIONAL MODELING ===

-- Fact Table: Sales transactions
CREATE TABLE fact_sales (
    sale_id BIGINT PRIMARY KEY,
    date_key INT NOT NULL,
    customer_key INT NOT NULL,
    product_key INT NOT NULL,
    store_key INT NOT NULL,
    sales_amount DECIMAL(12,2) NOT NULL,
    quantity_sold INT NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL,
    cost_amount DECIMAL(12,2) NOT NULL,
    profit_amount DECIMAL(12,2) GENERATED ALWAYS AS (sales_amount - cost_amount - discount_amount) STORED,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign keys to dimension tables
    FOREIGN KEY (date_key) REFERENCES dim_date(date_key),
    FOREIGN KEY (customer_key) REFERENCES dim_customer(customer_key),
    FOREIGN KEY (product_key) REFERENCES dim_product(product_key),
    FOREIGN KEY (store_key) REFERENCES dim_store(store_key)
);

-- Date Dimension
CREATE TABLE dim_date (
    date_key INT PRIMARY KEY,
    full_date DATE NOT NULL,
    day_of_week INT NOT NULL,
    day_name VARCHAR(10) NOT NULL,
    day_of_month INT NOT NULL,
    day_of_year INT NOT NULL,
    week_of_year INT NOT NULL,
    month_number INT NOT NULL,
    month_name VARCHAR(10) NOT NULL,
    quarter_number INT NOT NULL,
    quarter_name VARCHAR(2) NOT NULL,
    year_number INT NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    is_holiday BOOLEAN DEFAULT FALSE,
    fiscal_year INT NOT NULL,
    fiscal_quarter INT NOT NULL
);

-- Customer Dimension (SCD Type 2)
CREATE TABLE dim_customer (
    customer_key INT PRIMARY KEY AUTO_INCREMENT,
    customer_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    customer_segment VARCHAR(50),
    customer_tier VARCHAR(20),
    registration_date DATE,
    
    -- SCD Type 2 fields
    effective_date DATE NOT NULL,
    expiration_date DATE,
    is_current BOOLEAN DEFAULT TRUE,
    version_number INT DEFAULT 1,
    
    INDEX idx_customer_id (customer_id),
    INDEX idx_effective_date (effective_date),
    INDEX idx_is_current (is_current)
);

-- Product Dimension
CREATE TABLE dim_product (
    product_key INT PRIMARY KEY AUTO_INCREMENT,
    product_id VARCHAR(50) NOT NULL UNIQUE,
    product_name VARCHAR(255) NOT NULL,
    product_description TEXT,
    category_level1 VARCHAR(100),
    category_level2 VARCHAR(100),
    category_level3 VARCHAR(100),
    brand VARCHAR(100),
    supplier VARCHAR(100),
    unit_cost DECIMAL(10,2),
    unit_price DECIMAL(10,2),
    weight DECIMAL(8,2),
    dimensions VARCHAR(50),
    color VARCHAR(50),
    size VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_date DATE,
    discontinued_date DATE
);

-- Store Dimension
CREATE TABLE dim_store (
    store_key INT PRIMARY KEY AUTO_INCREMENT,
    store_id VARCHAR(20) NOT NULL UNIQUE,
    store_name VARCHAR(255) NOT NULL,
    store_type VARCHAR(50),
    address VARCHAR(500),
    city VARCHAR(100),
    state VARCHAR(50),
    country VARCHAR(50),
    postal_code VARCHAR(20),
    region VARCHAR(100),
    district VARCHAR(100),
    manager_name VARCHAR(200),
    phone VARCHAR(20),
    email VARCHAR(255),
    opening_date DATE,
    store_size_sqft INT,
    is_active BOOLEAN DEFAULT TRUE
);

-- === STAGING TABLES FOR ETL ===

-- Staging table for raw sales data
CREATE TABLE staging_sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    transaction_id VARCHAR(100),
    transaction_date DATETIME,
    customer_id VARCHAR(50),
    product_id VARCHAR(50),
    store_id VARCHAR(20),
    quantity INT,
    unit_price DECIMAL(10,2),
    discount_percent DECIMAL(5,2),
    tax_rate DECIMAL(5,4),
    
    -- ETL metadata
    source_system VARCHAR(50),
    batch_id VARCHAR(100),
    load_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_flag BOOLEAN DEFAULT FALSE,
    error_flag BOOLEAN DEFAULT FALSE,
    error_message TEXT
);

-- Data quality staging table
CREATE TABLE staging_data_quality (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100),
    column_name VARCHAR(100),
    rule_name VARCHAR(100),
    rule_description TEXT,
    failed_records INT,
    total_records INT,
    failure_rate DECIMAL(5,2),
    batch_id VARCHAR(100),
    check_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**ETL Process Implementation:**

```python
# === PYTHON ETL FRAMEWORK ===

import pandas as pd
import numpy as np
from sqlalchemy import create_engine, text
from datetime import datetime, timedelta
import logging
import hashlib
import json
from typing import Dict, List, Any, Optional

class ETLProcessor:
    def __init__(self, source_conn_str: str, target_conn_str: str):
        self.source_engine = create_engine(source_conn_str)
        self.target_engine = create_engine(target_conn_str)
        self.batch_id = self._generate_batch_id()
        self.logger = self._setup_logging()
        
    def _generate_batch_id(self) -> str:
        """Generate unique batch ID for ETL run"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        return f"ETL_{timestamp}"
    
    def _setup_logging(self) -> logging.Logger:
        """Setup logging configuration"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'etl_{self.batch_id}.log'),
                logging.StreamHandler()
            ]
        )
        return logging.getLogger(__name__)
    
    def extract_sales_data(self, start_date: str, end_date: str) -> pd.DataFrame:
        """Extract sales data from source system"""
        query = """
        SELECT 
            s.transaction_id,
            s.transaction_date,
            s.customer_id,
            s.product_id,
            s.store_id,
            s.quantity,
            s.unit_price,
            s.discount_percent,
            s.tax_rate,
            'OLTP_SALES' as source_system
        FROM sales_transactions s
        WHERE s.transaction_date BETWEEN %s AND %s
          AND s.status = 'completed'
        ORDER BY s.transaction_date
        """
        
        self.logger.info(f"Extracting sales data from {start_date} to {end_date}")
        df = pd.read_sql(query, self.source_engine, params=[start_date, end_date])
        self.logger.info(f"Extracted {len(df)} sales records")
        return df
    
    def validate_data_quality(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Perform data quality checks"""
        quality_results = {
            'total_records': len(df),
            'issues': [],
            'passed': True
        }
        
        # Check for null values in critical fields
        critical_fields = ['transaction_id', 'customer_id', 'product_id', 'quantity', 'unit_price']
        for field in critical_fields:
            null_count = df[field].isnull().sum()
            if null_count > 0:
                quality_results['issues'].append({
                    'field': field,
                    'issue': 'null_values',
                    'count': int(null_count),
                    'percentage': round(null_count / len(df) * 100, 2)
                })
                quality_results['passed'] = False
        
        # Check for negative quantities or prices
        if (df['quantity'] < 0).any():
            negative_qty = (df['quantity'] < 0).sum()
            quality_results['issues'].append({
                'field': 'quantity',
                'issue': 'negative_values',
                'count': int(negative_qty)
            })
            quality_results['passed'] = False
        
        if (df['unit_price'] < 0).any():
            negative_price = (df['unit_price'] < 0).sum()
            quality_results['issues'].append({
                'field': 'unit_price',
                'issue': 'negative_values',
                'count': int(negative_price)
            })
            quality_results['passed'] = False
        
        # Check for duplicate transaction IDs
        duplicates = df['transaction_id'].duplicated().sum()
        if duplicates > 0:
            quality_results['issues'].append({
                'field': 'transaction_id',
                'issue': 'duplicates',
                'count': int(duplicates)
            })
            quality_results['passed'] = False
        
        self.logger.info(f"Data quality check: {'PASSED' if quality_results['passed'] else 'FAILED'}")
        return quality_results
    
    def transform_sales_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Transform sales data for data warehouse"""
        self.logger.info("Starting data transformation")
        
        # Add batch metadata
        df['batch_id'] = self.batch_id
        df['load_timestamp'] = datetime.now()
        
        # Calculate derived fields
        df['discount_amount'] = df['unit_price'] * df['quantity'] * (df['discount_percent'] / 100)
        df['gross_amount'] = df['unit_price'] * df['quantity']
        df['net_amount'] = df['gross_amount'] - df['discount_amount']
        df['tax_amount'] = df['net_amount'] * df['tax_rate']
        df['total_amount'] = df['net_amount'] + df['tax_amount']
        
        # Generate date key (YYYYMMDD format)
        df['date_key'] = pd.to_datetime(df['transaction_date']).dt.strftime('%Y%m%d').astype(int)
        
        # Clean and standardize data
        df['customer_id'] = df['customer_id'].str.strip().str.upper()
        df['product_id'] = df['product_id'].str.strip().str.upper()
        df['store_id'] = df['store_id'].str.strip().str.upper()
        
        self.logger.info("Data transformation completed")
        return df
    
    def load_to_staging(self, df: pd.DataFrame) -> None:
        """Load data to staging table"""
        self.logger.info(f"Loading {len(df)} records to staging table")
        
        df.to_sql(
            'staging_sales',
            self.target_engine,
            if_exists='append',
            index=False,
            method='multi',
            chunksize=1000
        )
        
        self.logger.info("Data loaded to staging table successfully")
    
    def lookup_dimension_keys(self, df: pd.DataFrame) -> pd.DataFrame:
        """Lookup dimension keys for fact table"""
        self.logger.info("Looking up dimension keys")
        
        # Customer dimension lookup
        customer_query = """
        SELECT customer_id, customer_key 
        FROM dim_customer 
        WHERE is_current = TRUE
        """
        customer_dim = pd.read_sql(customer_query, self.target_engine)
        df = df.merge(customer_dim, on='customer_id', how='left')
        
        # Product dimension lookup
        product_query = """
        SELECT product_id, product_key 
        FROM dim_product 
        WHERE is_active = TRUE
        """
        product_dim = pd.read_sql(product_query, self.target_engine)
        df = df.merge(product_dim, on='product_id', how='left')
        
        # Store dimension lookup
        store_query = """
        SELECT store_id, store_key 
        FROM dim_store 
        WHERE is_active = TRUE
        """
        store_dim = pd.read_sql(store_query, self.target_engine)
        df = df.merge(store_dim, on='store_id', how='left')
        
        # Check for missing dimension keys
        missing_customers = df['customer_key'].isnull().sum()
        missing_products = df['product_key'].isnull().sum()
        missing_stores = df['store_key'].isnull().sum()
        
        if missing_customers > 0:
            self.logger.warning(f"{missing_customers} records with missing customer keys")
        if missing_products > 0:
            self.logger.warning(f"{missing_products} records with missing product keys")
        if missing_stores > 0:
            self.logger.warning(f"{missing_stores} records with missing store keys")
        
        return df
    
    def load_to_fact_table(self, df: pd.DataFrame) -> None:
        """Load data to fact table"""
        self.logger.info(f"Loading {len(df)} records to fact table")
        
        # Select only required columns for fact table
        fact_columns = [
            'transaction_id', 'date_key', 'customer_key', 'product_key', 'store_key',
            'total_amount', 'quantity', 'discount_amount', 'tax_amount', 'net_amount'
        ]
        
        fact_df = df[fact_columns].copy()
        fact_df.rename(columns={'transaction_id': 'sale_id'}, inplace=True)
        
        # Remove records with missing dimension keys
        fact_df = fact_df.dropna(subset=['customer_key', 'product_key', 'store_key'])
        
        fact_df.to_sql(
            'fact_sales',
            self.target_engine,
            if_exists='append',
            index=False,
            method='multi',
            chunksize=1000
        )
        
        self.logger.info("Data loaded to fact table successfully")
    
    def run_etl_process(self, start_date: str, end_date: str) -> Dict[str, Any]:
        """Run complete ETL process"""
        try:
            self.logger.info(f"Starting ETL process for batch {self.batch_id}")
            
            # Extract
            sales_df = self.extract_sales_data(start_date, end_date)
            
            # Validate
            quality_results = self.validate_data_quality(sales_df)
            if not quality_results['passed']:
                self.logger.error("Data quality checks failed")
                return {'status': 'failed', 'reason': 'data_quality', 'details': quality_results}
            
            # Transform
            transformed_df = self.transform_sales_data(sales_df)
            
            # Load to staging
            self.load_to_staging(transformed_df)
            
            # Lookup dimension keys
            enriched_df = self.lookup_dimension_keys(transformed_df)
            
            # Load to fact table
            self.load_to_fact_table(enriched_df)
            
            self.logger.info(f"ETL process completed successfully for batch {self.batch_id}")
            return {
                'status': 'success',
                'batch_id': self.batch_id,
                'records_processed': len(sales_df),
                'records_loaded': len(enriched_df.dropna(subset=['customer_key', 'product_key', 'store_key']))
            }
            
        except Exception as e:
            self.logger.error(f"ETL process failed: {str(e)}")
            return {'status': 'failed', 'reason': 'exception', 'error': str(e)}

# === USAGE EXAMPLE ===

if __name__ == "__main__":
    # Database connection strings
    source_conn = "mysql+pymysql://user:password@source-db:3306/oltp_db"
    target_conn = "mysql+pymysql://user:password@warehouse-db:3306/warehouse_db"
    
    # Initialize ETL processor
    etl = ETLProcessor(source_conn, target_conn)
    
    # Run ETL for yesterday's data
    yesterday = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    result = etl.run_etl_process(yesterday, yesterday)
    
    print(f"ETL Result: {result}")
```

**Data Warehouse Optimization:**

```sql
-- === PARTITIONING STRATEGIES ===

-- Partition fact table by date
CREATE TABLE fact_sales_partitioned (
    sale_id BIGINT,
    date_key INT NOT NULL,
    customer_key INT NOT NULL,
    product_key INT NOT NULL,
    store_key INT NOT NULL,
    sales_amount DECIMAL(12,2) NOT NULL,
    quantity_sold INT NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
PARTITION BY RANGE (date_key) (
    PARTITION p202301 VALUES LESS THAN (20230201),
    PARTITION p202302 VALUES LESS THAN (20230301),
    PARTITION p202303 VALUES LESS THAN (20230401),
    PARTITION p202304 VALUES LESS THAN (20230501),
    PARTITION p202305 VALUES LESS THAN (20230601),
    PARTITION p202306 VALUES LESS THAN (20230701),
    PARTITION p202307 VALUES LESS THAN (20230801),
    PARTITION p202308 VALUES LESS THAN (20230901),
    PARTITION p202309 VALUES LESS THAN (20231001),
    PARTITION p202310 VALUES LESS THAN (20231101),
    PARTITION p202311 VALUES LESS THAN (20231201),
    PARTITION p202312 VALUES LESS THAN (20240101),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- === ANALYTICAL QUERIES ===

-- Monthly sales summary with year-over-year comparison
WITH monthly_sales AS (
    SELECT 
        d.year_number,
        d.month_number,
        d.month_name,
        SUM(f.sales_amount) as total_sales,
        SUM(f.quantity_sold) as total_quantity,
        COUNT(DISTINCT f.customer_key) as unique_customers,
        COUNT(*) as transaction_count
    FROM fact_sales f
    JOIN dim_date d ON f.date_key = d.date_key
    WHERE d.year_number IN (2022, 2023)
    GROUP BY d.year_number, d.month_number, d.month_name
),
sales_with_yoy AS (
    SELECT 
        *,
        LAG(total_sales) OVER (PARTITION BY month_number ORDER BY year_number) as prev_year_sales,
        LAG(total_quantity) OVER (PARTITION BY month_number ORDER BY year_number) as prev_year_quantity
    FROM monthly_sales
)
SELECT 
    year_number,
    month_name,
    total_sales,
    total_quantity,
    unique_customers,
    transaction_count,
    prev_year_sales,
    CASE 
        WHEN prev_year_sales IS NOT NULL 
        THEN ROUND((total_sales - prev_year_sales) / prev_year_sales * 100, 2)
        ELSE NULL 
    END as sales_growth_percent,
    CASE 
        WHEN prev_year_quantity IS NOT NULL 
        THEN ROUND((total_quantity - prev_year_quantity) / prev_year_quantity * 100, 2)
        ELSE NULL 
    END as quantity_growth_percent
FROM sales_with_yoy
ORDER BY year_number, month_number;

-- Customer segmentation analysis
WITH customer_metrics AS (
    SELECT 
        f.customer_key,
        c.customer_segment,
        COUNT(*) as transaction_count,
        SUM(f.sales_amount) as total_spent,
        AVG(f.sales_amount) as avg_transaction_value,
        MIN(d.full_date) as first_purchase_date,
        MAX(d.full_date) as last_purchase_date,
        DATEDIFF(MAX(d.full_date), MIN(d.full_date)) as customer_lifetime_days
    FROM fact_sales f
    JOIN dim_customer c ON f.customer_key = c.customer_key
    JOIN dim_date d ON f.date_key = d.date_key
    WHERE d.year_number = 2023
    GROUP BY f.customer_key, c.customer_segment
),
customer_segments AS (
    SELECT 
        *,
        CASE 
            WHEN total_spent >= 10000 THEN 'High Value'
            WHEN total_spent >= 5000 THEN 'Medium Value'
            WHEN total_spent >= 1000 THEN 'Low Value'
            ELSE 'Minimal Value'
        END as value_segment,
        CASE 
            WHEN transaction_count >= 50 THEN 'Very Frequent'
            WHEN transaction_count >= 20 THEN 'Frequent'
            WHEN transaction_count >= 10 THEN 'Occasional'
            ELSE 'Rare'
        END as frequency_segment
    FROM customer_metrics
)
SELECT 
    value_segment,
    frequency_segment,
    COUNT(*) as customer_count,
    AVG(total_spent) as avg_total_spent,
    AVG(transaction_count) as avg_transaction_count,
    AVG(avg_transaction_value) as avg_order_value,
    SUM(total_spent) as segment_revenue
FROM customer_segments
GROUP BY value_segment, frequency_segment
ORDER BY segment_revenue DESC;

-- Product performance analysis
SELECT 
    p.category_level1,
    p.category_level2,
    p.brand,
    COUNT(DISTINCT f.customer_key) as unique_customers,
    SUM(f.quantity_sold) as total_quantity,
    SUM(f.sales_amount) as total_revenue,
    AVG(f.sales_amount / f.quantity_sold) as avg_unit_price,
    SUM(f.sales_amount) / SUM(SUM(f.sales_amount)) OVER () * 100 as revenue_percentage
FROM fact_sales f
JOIN dim_product p ON f.product_key = p.product_key
JOIN dim_date d ON f.date_key = d.date_key
WHERE d.year_number = 2023
GROUP BY p.category_level1, p.category_level2, p.brand
HAVING total_revenue > 10000
ORDER BY total_revenue DESC
LIMIT 20;
```

**ETL Monitoring and Alerting:**

```python
# === ETL MONITORING SYSTEM ===

class ETLMonitor:
    def __init__(self, db_conn_str: str):
        self.engine = create_engine(db_conn_str)
        self.logger = logging.getLogger(__name__)
    
    def log_etl_run(self, batch_id: str, status: str, 
                   records_processed: int, duration_seconds: int,
                   error_message: str = None) -> None:
        """Log ETL run details"""
        log_query = """
        INSERT INTO etl_run_log (
            batch_id, status, records_processed, 
            duration_seconds, error_message, run_timestamp
        ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        with self.engine.connect() as conn:
            conn.execute(text(log_query), [
                batch_id, status, records_processed, 
                duration_seconds, error_message, datetime.now()
            ])
            conn.commit()
    
    def check_data_freshness(self) -> Dict[str, Any]:
        """Check if data is fresh and up-to-date"""
        freshness_query = """
        SELECT 
            MAX(d.full_date) as latest_data_date,
            DATEDIFF(CURDATE(), MAX(d.full_date)) as days_behind
        FROM fact_sales f
        JOIN dim_date d ON f.date_key = d.date_key
        """
        
        result = pd.read_sql(freshness_query, self.engine)
        days_behind = result['days_behind'].iloc[0]
        
        return {
            'latest_data_date': result['latest_data_date'].iloc[0],
            'days_behind': days_behind,
            'is_fresh': days_behind <= 1,
            'alert_needed': days_behind > 2
        }
    
    def check_data_volume_anomalies(self) -> Dict[str, Any]:
        """Detect unusual data volumes"""
        volume_query = """
        WITH daily_volumes AS (
            SELECT 
                d.full_date,
                COUNT(*) as record_count,
                SUM(f.sales_amount) as total_amount
            FROM fact_sales f
            JOIN dim_date d ON f.date_key = d.date_key
            WHERE d.full_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY d.full_date
        ),
        volume_stats AS (
            SELECT 
                AVG(record_count) as avg_records,
                STDDEV(record_count) as stddev_records,
                AVG(total_amount) as avg_amount,
                STDDEV(total_amount) as stddev_amount
            FROM daily_volumes
            WHERE full_date < CURDATE()
        )
        SELECT 
            dv.full_date,
            dv.record_count,
            dv.total_amount,
            vs.avg_records,
            vs.stddev_records,
            ABS(dv.record_count - vs.avg_records) / vs.stddev_records as record_z_score,
            ABS(dv.total_amount - vs.avg_amount) / vs.stddev_amount as amount_z_score
        FROM daily_volumes dv
        CROSS JOIN volume_stats vs
        WHERE dv.full_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
        """
        
        result = pd.read_sql(volume_query, self.engine)
        
        if len(result) > 0:
            record_z_score = result['record_z_score'].iloc[0]
            amount_z_score = result['amount_z_score'].iloc[0]
            
            return {
                'date': result['full_date'].iloc[0],
                'record_count': result['record_count'].iloc[0],
                'total_amount': result['total_amount'].iloc[0],
                'record_anomaly': abs(record_z_score) > 2,
                'amount_anomaly': abs(amount_z_score) > 2,
                'record_z_score': record_z_score,
                'amount_z_score': amount_z_score
            }
        
        return {'status': 'no_data'}
```

**Best Practices:**

1. **Dimensional Modeling**: Use star schema for optimal query performance
2. **SCD Implementation**: Handle slowly changing dimensions appropriately
3. **Data Quality**: Implement comprehensive validation and cleansing
4. **Incremental Loading**: Process only changed/new data
5. **Error Handling**: Robust error handling and recovery mechanisms
6. **Monitoring**: Comprehensive logging and alerting
7. **Performance**: Optimize for analytical workloads with proper indexing and partitioning
8. **Documentation**: Maintain clear data lineage and business rules documentation

---

### Q20: How do you implement database cloud migration and modern database architectures?
**Difficulty: Expert**

**Answer:**
Cloud database migration involves moving databases from on-premises to cloud platforms while implementing modern architectures like microservices, serverless, and multi-cloud strategies.

**Cloud Migration Strategies:**

```yaml
# === DOCKER CONTAINERIZATION FOR MIGRATION ===

# Dockerfile for database migration container
FROM python:3.9-slim

WORKDIR /app

# Install database clients and migration tools
RUN apt-get update && apt-get install -y \
    postgresql-client \
    mysql-client \
    mongodb-tools \
    redis-tools \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy migration scripts
COPY migration/ ./migration/
COPY config/ ./config/

# Set environment variables
ENV PYTHONPATH=/app
ENV MIGRATION_ENV=production

CMD ["python", "migration/run_migration.py"]
```

```python
# === CLOUD MIGRATION FRAMEWORK ===

import boto3
import psycopg2
import pymongo
from google.cloud import storage, bigquery
from azure.storage.blob import BlobServiceClient
from sqlalchemy import create_engine
import pandas as pd
from typing import Dict, List, Any, Optional
import logging
import json
from datetime import datetime
import asyncio
import aiohttp

class CloudMigrationManager:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.logger = self._setup_logging()
        self.aws_session = boto3.Session(
            aws_access_key_id=config.get('aws_access_key'),
            aws_secret_access_key=config.get('aws_secret_key'),
            region_name=config.get('aws_region', 'us-east-1')
        )
        
    def _setup_logging(self) -> logging.Logger:
        """Setup comprehensive logging"""
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(f'migration_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log'),
                logging.StreamHandler()
            ]
        )
        return logging.getLogger(__name__)
    
    def assess_database_for_migration(self, db_config: Dict[str, Any]) -> Dict[str, Any]:
        """Assess database readiness for cloud migration"""
        assessment = {
            'database_size': 0,
            'table_count': 0,
            'index_count': 0,
            'stored_procedures': 0,
            'triggers': 0,
            'foreign_keys': 0,
            'compatibility_issues': [],
            'migration_complexity': 'low',
            'estimated_downtime': '< 1 hour',
            'recommended_strategy': 'lift_and_shift'
        }
        
        try:
            engine = create_engine(db_config['connection_string'])
            
            # Database size assessment
            size_query = """
            SELECT 
                pg_size_pretty(pg_database_size(current_database())) as db_size,
                pg_database_size(current_database()) as db_size_bytes
            """
            
            with engine.connect() as conn:
                result = conn.execute(size_query).fetchone()
                assessment['database_size'] = result[0]
                size_bytes = result[1]
                
                # Table and index analysis
                table_query = """
                SELECT 
                    COUNT(*) as table_count,
                    SUM(CASE WHEN schemaname = 'public' THEN 1 ELSE 0 END) as user_tables
                FROM pg_tables
                """
                
                index_query = """
                SELECT COUNT(*) as index_count
                FROM pg_indexes
                WHERE schemaname = 'public'
                """
                
                # Stored procedures and triggers
                proc_query = """
                SELECT COUNT(*) as proc_count
                FROM pg_proc p
                JOIN pg_namespace n ON p.pronamespace = n.oid
                WHERE n.nspname = 'public'
                """
                
                trigger_query = """
                SELECT COUNT(*) as trigger_count
                FROM pg_trigger
                WHERE NOT tgisinternal
                """
                
                # Foreign key constraints
                fk_query = """
                SELECT COUNT(*) as fk_count
                FROM information_schema.table_constraints
                WHERE constraint_type = 'FOREIGN KEY'
                  AND table_schema = 'public'
                """
                
                assessment['table_count'] = conn.execute(table_query).fetchone()[0]
                assessment['index_count'] = conn.execute(index_query).fetchone()[0]
                assessment['stored_procedures'] = conn.execute(proc_query).fetchone()[0]
                assessment['triggers'] = conn.execute(trigger_query).fetchone()[0]
                assessment['foreign_keys'] = conn.execute(fk_query).fetchone()[0]
                
                # Determine migration complexity
                complexity_score = 0
                if size_bytes > 100 * 1024 * 1024 * 1024:  # > 100GB
                    complexity_score += 3
                elif size_bytes > 10 * 1024 * 1024 * 1024:  # > 10GB
                    complexity_score += 2
                elif size_bytes > 1 * 1024 * 1024 * 1024:  # > 1GB
                    complexity_score += 1
                
                if assessment['stored_procedures'] > 50:
                    complexity_score += 2
                    assessment['compatibility_issues'].append('High number of stored procedures')
                
                if assessment['triggers'] > 20:
                    complexity_score += 2
                    assessment['compatibility_issues'].append('High number of triggers')
                
                if assessment['foreign_keys'] > 100:
                    complexity_score += 1
                    assessment['compatibility_issues'].append('Complex referential integrity')
                
                # Set migration strategy based on complexity
                if complexity_score >= 6:
                    assessment['migration_complexity'] = 'high'
                    assessment['estimated_downtime'] = '4-8 hours'
                    assessment['recommended_strategy'] = 'phased_migration'
                elif complexity_score >= 3:
                    assessment['migration_complexity'] = 'medium'
                    assessment['estimated_downtime'] = '1-4 hours'
                    assessment['recommended_strategy'] = 'blue_green_deployment'
                else:
                    assessment['migration_complexity'] = 'low'
                    assessment['estimated_downtime'] = '< 1 hour'
                    assessment['recommended_strategy'] = 'lift_and_shift'
                
        except Exception as e:
            self.logger.error(f"Database assessment failed: {str(e)}")
            assessment['compatibility_issues'].append(f"Assessment error: {str(e)}")
        
        return assessment
    
    def create_aws_rds_instance(self, db_config: Dict[str, Any]) -> Dict[str, Any]:
        """Create AWS RDS instance for migration target"""
        rds_client = self.aws_session.client('rds')
        
        try:
            # Create DB subnet group
            subnet_group_name = f"{db_config['db_name']}-subnet-group"
            
            try:
                rds_client.create_db_subnet_group(
                    DBSubnetGroupName=subnet_group_name,
                    DBSubnetGroupDescription=f"Subnet group for {db_config['db_name']}",
                    SubnetIds=db_config['subnet_ids'],
                    Tags=[
                        {'Key': 'Environment', 'Value': db_config.get('environment', 'production')},
                        {'Key': 'Application', 'Value': db_config['db_name']}
                    ]
                )
            except rds_client.exceptions.DBSubnetGroupAlreadyExistsFault:
                self.logger.info(f"Subnet group {subnet_group_name} already exists")
            
            # Create RDS instance
            response = rds_client.create_db_instance(
                DBInstanceIdentifier=db_config['db_instance_id'],
                DBInstanceClass=db_config.get('instance_class', 'db.t3.medium'),
                Engine=db_config.get('engine', 'postgres'),
                EngineVersion=db_config.get('engine_version', '13.7'),
                MasterUsername=db_config['master_username'],
                MasterUserPassword=db_config['master_password'],
                AllocatedStorage=db_config.get('allocated_storage', 100),
                StorageType=db_config.get('storage_type', 'gp2'),
                StorageEncrypted=db_config.get('encrypted', True),
                VpcSecurityGroupIds=db_config['security_group_ids'],
                DBSubnetGroupName=subnet_group_name,
                BackupRetentionPeriod=db_config.get('backup_retention', 7),
                MultiAZ=db_config.get('multi_az', True),
                PubliclyAccessible=db_config.get('publicly_accessible', False),
                DeletionProtection=db_config.get('deletion_protection', True),
                Tags=[
                    {'Key': 'Environment', 'Value': db_config.get('environment', 'production')},
                    {'Key': 'Application', 'Value': db_config['db_name']},
                    {'Key': 'MigrationDate', 'Value': datetime.now().isoformat()}
                ]
            )
            
            self.logger.info(f"RDS instance {db_config['db_instance_id']} creation initiated")
            
            # Wait for instance to be available
            waiter = rds_client.get_waiter('db_instance_available')
            waiter.wait(
                DBInstanceIdentifier=db_config['db_instance_id'],
                WaiterConfig={'Delay': 30, 'MaxAttempts': 60}
            )
            
            # Get instance details
            instance_details = rds_client.describe_db_instances(
                DBInstanceIdentifier=db_config['db_instance_id']
            )['DBInstances'][0]
            
            return {
                'status': 'success',
                'endpoint': instance_details['Endpoint']['Address'],
                'port': instance_details['Endpoint']['Port'],
                'instance_id': db_config['db_instance_id'],
                'engine': instance_details['Engine'],
                'engine_version': instance_details['EngineVersion']
            }
            
        except Exception as e:
            self.logger.error(f"RDS instance creation failed: {str(e)}")
            return {'status': 'failed', 'error': str(e)}
    
    def migrate_data_with_dms(self, source_config: Dict[str, Any], 
                             target_config: Dict[str, Any]) -> Dict[str, Any]:
        """Use AWS DMS for database migration"""
        dms_client = self.aws_session.client('dms')
        
        try:
            # Create replication subnet group
            subnet_group_name = f"{source_config['db_name']}-replication-subnet-group"
            
            try:
                dms_client.create_replication_subnet_group(
                    ReplicationSubnetGroupIdentifier=subnet_group_name,
                    ReplicationSubnetGroupDescription=f"DMS subnet group for {source_config['db_name']}",
                    SubnetIds=source_config['subnet_ids'],
                    Tags=[
                        {'Key': 'Environment', 'Value': source_config.get('environment', 'production')},
                        {'Key': 'Application', 'Value': source_config['db_name']}
                    ]
                )
            except dms_client.exceptions.ReplicationSubnetGroupAlreadyExistsFault:
                self.logger.info(f"Replication subnet group {subnet_group_name} already exists")
            
            # Create replication instance
            replication_instance_id = f"{source_config['db_name']}-replication-instance"
            
            dms_client.create_replication_instance(
                ReplicationInstanceIdentifier=replication_instance_id,
                ReplicationInstanceClass=source_config.get('replication_instance_class', 'dms.t3.medium'),
                AllocatedStorage=source_config.get('replication_storage', 100),
                VpcSecurityGroupIds=source_config['security_group_ids'],
                ReplicationSubnetGroupIdentifier=subnet_group_name,
                MultiAZ=source_config.get('multi_az', True),
                PubliclyAccessible=False,
                Tags=[
                    {'Key': 'Environment', 'Value': source_config.get('environment', 'production')},
                    {'Key': 'Application', 'Value': source_config['db_name']}
                ]
            )
            
            # Wait for replication instance to be available
            waiter = dms_client.get_waiter('replication_instance_available')
            waiter.wait(
                ReplicationInstanceIdentifier=replication_instance_id,
                WaiterConfig={'Delay': 30, 'MaxAttempts': 60}
            )
            
            # Create source endpoint
            source_endpoint_id = f"{source_config['db_name']}-source-endpoint"
            dms_client.create_endpoint(
                EndpointIdentifier=source_endpoint_id,
                EndpointType='source',
                EngineName=source_config['engine'],
                Username=source_config['username'],
                Password=source_config['password'],
                ServerName=source_config['host'],
                Port=source_config['port'],
                DatabaseName=source_config['database']
            )
            
            # Create target endpoint
            target_endpoint_id = f"{target_config['db_name']}-target-endpoint"
            dms_client.create_endpoint(
                EndpointIdentifier=target_endpoint_id,
                EndpointType='target',
                EngineName=target_config['engine'],
                Username=target_config['username'],
                Password=target_config['password'],
                ServerName=target_config['host'],
                Port=target_config['port'],
                DatabaseName=target_config['database']
            )
            
            # Create replication task
            task_id = f"{source_config['db_name']}-migration-task"
            
            table_mappings = {
                "rules": [
                    {
                        "rule-type": "selection",
                        "rule-id": "1",
                        "rule-name": "1",
                        "object-locator": {
                            "schema-name": "public",
                            "table-name": "%"
                        },
                        "rule-action": "include"
                    }
                ]
            }
            
            dms_client.create_replication_task(
                ReplicationTaskIdentifier=task_id,
                SourceEndpointArn=f"arn:aws:dms:{self.aws_session.region_name}:{self.aws_session.get_credentials().access_key}:endpoint:{source_endpoint_id}",
                TargetEndpointArn=f"arn:aws:dms:{self.aws_session.region_name}:{self.aws_session.get_credentials().access_key}:endpoint:{target_endpoint_id}",
                ReplicationInstanceArn=f"arn:aws:dms:{self.aws_session.region_name}:{self.aws_session.get_credentials().access_key}:rep:{replication_instance_id}",
                MigrationType='full-load-and-cdc',
                TableMappings=json.dumps(table_mappings),
                ReplicationTaskSettings=json.dumps({
                    "TargetMetadata": {
                        "TargetSchema": "",
                        "SupportLobs": True,
                        "FullLobMode": False,
                        "LobChunkSize": 0,
                        "LimitedSizeLobMode": True,
                        "LobMaxSize": 32,
                        "InlineLobMaxSize": 0,
                        "LoadMaxFileSize": 0,
                        "ParallelLoadThreads": 0,
                        "ParallelLoadBufferSize": 0,
                        "BatchApplyEnabled": False,
                        "TaskRecoveryTableEnabled": False
                    },
                    "FullLoadSettings": {
                        "TargetTablePrepMode": "DROP_AND_CREATE",
                        "CreatePkAfterFullLoad": False,
                        "StopTaskCachedChangesApplied": False,
                        "StopTaskCachedChangesNotApplied": False,
                        "MaxFullLoadSubTasks": 8,
                        "TransactionConsistencyTimeout": 600,
                        "CommitRate": 10000
                    },
                    "Logging": {
                        "EnableLogging": True,
                        "LogComponents": [
                            {
                                "Id": "SOURCE_UNLOAD",
                                "Severity": "LOGGER_SEVERITY_DEFAULT"
                            },
                            {
                                "Id": "TARGET_LOAD",
                                "Severity": "LOGGER_SEVERITY_DEFAULT"
                            }
                        ]
                    }
                })
            )
            
            # Start replication task
            dms_client.start_replication_task(
                ReplicationTaskArn=f"arn:aws:dms:{self.aws_session.region_name}:{self.aws_session.get_credentials().access_key}:task:{task_id}",
                StartReplicationTaskType='start-replication'
            )
            
            self.logger.info(f"DMS migration task {task_id} started successfully")
            
            return {
                'status': 'success',
                'replication_instance_id': replication_instance_id,
                'task_id': task_id,
                'source_endpoint_id': source_endpoint_id,
                'target_endpoint_id': target_endpoint_id
            }
            
        except Exception as e:
            self.logger.error(f"DMS migration failed: {str(e)}")
            return {'status': 'failed', 'error': str(e)}
    
    def setup_monitoring_and_alerting(self, db_config: Dict[str, Any]) -> Dict[str, Any]:
        """Setup CloudWatch monitoring and alerting"""
        cloudwatch = self.aws_session.client('cloudwatch')
        sns = self.aws_session.client('sns')
        
        try:
            # Create SNS topic for alerts
            topic_name = f"{db_config['db_name']}-db-alerts"
            topic_response = sns.create_topic(Name=topic_name)
            topic_arn = topic_response['TopicArn']
            
            # Subscribe email to SNS topic
            if 'alert_email' in db_config:
                sns.subscribe(
                    TopicArn=topic_arn,
                    Protocol='email',
                    Endpoint=db_config['alert_email']
                )
            
            # Create CloudWatch alarms
            alarms = [
                {
                    'AlarmName': f"{db_config['db_instance_id']}-HighCPU",
                    'ComparisonOperator': 'GreaterThanThreshold',
                    'EvaluationPeriods': 2,
                    'MetricName': 'CPUUtilization',
                    'Namespace': 'AWS/RDS',
                    'Period': 300,
                    'Statistic': 'Average',
                    'Threshold': 80.0,
                    'ActionsEnabled': True,
                    'AlarmActions': [topic_arn],
                    'AlarmDescription': 'High CPU utilization on RDS instance',
                    'Dimensions': [
                        {
                            'Name': 'DBInstanceIdentifier',
                            'Value': db_config['db_instance_id']
                        }
                    ]
                },
                {
                    'AlarmName': f"{db_config['db_instance_id']}-HighConnections",
                    'ComparisonOperator': 'GreaterThanThreshold',
                    'EvaluationPeriods': 2,
                    'MetricName': 'DatabaseConnections',
                    'Namespace': 'AWS/RDS',
                    'Period': 300,
                    'Statistic': 'Average',
                    'Threshold': 80.0,
                    'ActionsEnabled': True,
                    'AlarmActions': [topic_arn],
                    'AlarmDescription': 'High number of database connections',
                    'Dimensions': [
                        {
                            'Name': 'DBInstanceIdentifier',
                            'Value': db_config['db_instance_id']
                        }
                    ]
                },
                {
                    'AlarmName': f"{db_config['db_instance_id']}-LowFreeSpace",
                    'ComparisonOperator': 'LessThanThreshold',
                    'EvaluationPeriods': 1,
                    'MetricName': 'FreeStorageSpace',
                    'Namespace': 'AWS/RDS',
                    'Period': 300,
                    'Statistic': 'Average',
                    'Threshold': 2000000000.0,  # 2GB in bytes
                    'ActionsEnabled': True,
                    'AlarmActions': [topic_arn],
                    'AlarmDescription': 'Low free storage space on RDS instance',
                    'Dimensions': [
                        {
                            'Name': 'DBInstanceIdentifier',
                            'Value': db_config['db_instance_id']
                        }
                    ]
                }
            ]
            
            for alarm in alarms:
                cloudwatch.put_metric_alarm(**alarm)
            
            self.logger.info(f"Monitoring and alerting setup completed for {db_config['db_instance_id']}")
            
            return {
                'status': 'success',
                'topic_arn': topic_arn,
                'alarms_created': len(alarms)
            }
            
        except Exception as e:
            self.logger.error(f"Monitoring setup failed: {str(e)}")
            return {'status': 'failed', 'error': str(e)}
```

**Modern Database Architectures:**

```python
# === MICROSERVICES DATABASE PATTERN ===

class MicroservicesDatabaseManager:
    def __init__(self):
        self.services = {}
        self.event_store = EventStore()
        self.saga_manager = SagaManager()
    
    def register_service_database(self, service_name: str, db_config: Dict[str, Any]):
        """Register database for a microservice"""
        self.services[service_name] = {
            'database': Database(db_config),
            'events': [],
            'saga_participants': []
        }
    
    async def execute_distributed_transaction(self, transaction_data: Dict[str, Any]):
        """Execute distributed transaction using Saga pattern"""
        saga_id = self.saga_manager.start_saga(transaction_data)
        
        try:
            # Execute transaction steps across services
            for step in transaction_data['steps']:
                service_name = step['service']
                operation = step['operation']
                data = step['data']
                
                # Execute operation
                result = await self.services[service_name]['database'].execute(operation, data)
                
                # Record event
                event = {
                    'saga_id': saga_id,
                    'service': service_name,
                    'operation': operation,
                    'result': result,
                    'timestamp': datetime.now()
                }
                
                self.event_store.append(event)
                
                if not result['success']:
                    # Compensate previous steps
                    await self.saga_manager.compensate(saga_id)
                    return {'status': 'failed', 'saga_id': saga_id}
            
            # Commit saga
            await self.saga_manager.complete_saga(saga_id)
            return {'status': 'success', 'saga_id': saga_id}
            
        except Exception as e:
            await self.saga_manager.compensate(saga_id)
            return {'status': 'error', 'error': str(e), 'saga_id': saga_id}

# === SERVERLESS DATABASE PATTERN ===

import boto3
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger()
tracer = Tracer()
metrics = Metrics()

class ServerlessDatabaseHandler:
    def __init__(self):
        self.dynamodb = boto3.resource('dynamodb')
        self.rds_data = boto3.client('rds-data')
        self.aurora_cluster_arn = os.environ['AURORA_CLUSTER_ARN']
        self.aurora_secret_arn = os.environ['AURORA_SECRET_ARN']
    
    @tracer.capture_method
    @metrics.log_metrics
    def lambda_handler(self, event, context):
        """Serverless database operation handler"""
        try:
            operation = event.get('operation')
            
            if operation == 'read':
                result = self.handle_read_operation(event['data'])
            elif operation == 'write':
                result = self.handle_write_operation(event['data'])
            elif operation == 'analytics':
                result = self.handle_analytics_operation(event['data'])
            else:
                raise ValueError(f"Unknown operation: {operation}")
            
            metrics.add_metric(name="OperationSuccess", unit=MetricUnit.Count, value=1)
            
            return {
                'statusCode': 200,
                'body': json.dumps(result)
            }
            
        except Exception as e:
            logger.error(f"Operation failed: {str(e)}")
            metrics.add_metric(name="OperationError", unit=MetricUnit.Count, value=1)
            
            return {
                'statusCode': 500,
                'body': json.dumps({'error': str(e)})
            }
    
    @tracer.capture_method
    def handle_read_operation(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle read operations using DynamoDB"""
        table_name = data['table']
        key = data['key']
        
        table = self.dynamodb.Table(table_name)
        response = table.get_item(Key=key)
        
        return response.get('Item', {})
    
    @tracer.capture_method
    def handle_write_operation(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle write operations using DynamoDB"""
        table_name = data['table']
        item = data['item']
        
        table = self.dynamodb.Table(table_name)
        table.put_item(Item=item)
        
        return {'status': 'success', 'item_id': item.get('id')}
    
    @tracer.capture_method
    def handle_analytics_operation(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Handle analytics operations using Aurora Serverless"""
        sql = data['sql']
        parameters = data.get('parameters', [])
        
        response = self.rds_data.execute_statement(
            resourceArn=self.aurora_cluster_arn,
            secretArn=self.aurora_secret_arn,
            database='analytics',
            sql=sql,
            parameters=parameters
        )
        
        return {
            'records': response.get('records', []),
            'numberOfRecordsUpdated': response.get('numberOfRecordsUpdated', 0)
        }

# === MULTI-CLOUD DATABASE STRATEGY ===

class MultiCloudDatabaseManager:
    def __init__(self):
        self.aws_client = boto3.client('rds')
        self.gcp_client = bigquery.Client()
        self.azure_client = BlobServiceClient.from_connection_string(os.environ['AZURE_STORAGE_CONNECTION_STRING'])
        self.replication_manager = CrossCloudReplicationManager()
    
    def setup_cross_cloud_replication(self, config: Dict[str, Any]):
        """Setup replication across cloud providers"""
        primary_cloud = config['primary_cloud']
        replica_clouds = config['replica_clouds']
        
        replication_config = {
            'primary': {
                'cloud': primary_cloud,
                'region': config['primary_region'],
                'database': config['primary_database']
            },
            'replicas': []
        }
        
        for replica in replica_clouds:
            replica_config = {
                'cloud': replica['cloud'],
                'region': replica['region'],
                'database': replica['database'],
                'replication_lag_threshold': replica.get('lag_threshold', 5),
                'failover_priority': replica.get('priority', 1)
            }
            replication_config['replicas'].append(replica_config)
        
        return self.replication_manager.setup_replication(replication_config)
    
    def implement_data_residency_compliance(self, compliance_config: Dict[str, Any]):
        """Implement data residency and compliance requirements"""
        data_classification = compliance_config['data_classification']
        regional_requirements = compliance_config['regional_requirements']
        
        compliance_rules = []
        
        for region, requirements in regional_requirements.items():
            rule = {
                'region': region,
                'allowed_clouds': requirements['allowed_clouds'],
                'encryption_requirements': requirements['encryption'],
                'data_retention_days': requirements['retention_days'],
                'audit_logging': requirements['audit_logging']
            }
            compliance_rules.append(rule)
        
        return self.apply_compliance_rules(compliance_rules, data_classification)
```

**Infrastructure as Code for Database Migration:**

```yaml
# === TERRAFORM CONFIGURATION ===

# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC and Networking
resource "aws_vpc" "database_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name        = "${var.project_name}-database-vpc"
    Environment = var.environment
  }
}

resource "aws_subnet" "database_subnet" {
  count             = length(var.availability_zones)
  vpc_id            = aws_vpc.database_vpc.id
  cidr_block        = "10.0.${count.index + 1}.0/24"
  availability_zone = var.availability_zones[count.index]
  
  tags = {
    Name = "${var.project_name}-database-subnet-${count.index + 1}"
  }
}

# Security Groups
resource "aws_security_group" "database_sg" {
  name_prefix = "${var.project_name}-database-"
  vpc_id      = aws_vpc.database_vpc.id
  
  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [aws_vpc.database_vpc.cidr_block]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  tags = {
    Name = "${var.project_name}-database-sg"
  }
}

# RDS Subnet Group
resource "aws_db_subnet_group" "database_subnet_group" {
  name       = "${var.project_name}-database-subnet-group"
  subnet_ids = aws_subnet.database_subnet[*].id
  
  tags = {
    Name = "${var.project_name} Database Subnet Group"
  }
}

# RDS Instance
resource "aws_db_instance" "main_database" {
  identifier     = "${var.project_name}-database"
  engine         = "postgres"
  engine_version = "13.7"
  instance_class = var.db_instance_class
  
  allocated_storage     = var.db_allocated_storage
  max_allocated_storage = var.db_max_allocated_storage
  storage_type          = "gp2"
  storage_encrypted     = true
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  vpc_security_group_ids = [aws_security_group.database_sg.id]
  db_subnet_group_name   = aws_db_subnet_group.database_subnet_group.name
  
  backup_retention_period = var.backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  multi_az               = var.multi_az
  publicly_accessible    = false
  deletion_protection    = var.deletion_protection
  
  performance_insights_enabled = true
  monitoring_interval         = 60
  monitoring_role_arn        = aws_iam_role.rds_monitoring_role.arn
  
  tags = {
    Name        = "${var.project_name} Main Database"
    Environment = var.environment
  }
}

# Read Replica
resource "aws_db_instance" "read_replica" {
  count                  = var.create_read_replica ? 1 : 0
  identifier             = "${var.project_name}-database-replica"
  replicate_source_db    = aws_db_instance.main_database.id
  instance_class         = var.replica_instance_class
  publicly_accessible    = false
  auto_minor_version_upgrade = false
  
  tags = {
    Name        = "${var.project_name} Read Replica"
    Environment = var.environment
  }
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "database_logs" {
  name              = "/aws/rds/instance/${aws_db_instance.main_database.id}/postgresql"
  retention_in_days = 30
  
  tags = {
    Name = "${var.project_name} Database Logs"
  }
}

# IAM Role for RDS Monitoring
resource "aws_iam_role" "rds_monitoring_role" {
  name = "${var.project_name}-rds-monitoring-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "rds_monitoring_policy" {
  role       = aws_iam_role.rds_monitoring_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonRDSEnhancedMonitoringRole"
}
```

**Best Practices for Cloud Migration:**

1. **Assessment and Planning**: Thorough database assessment before migration
2. **Security**: Implement encryption at rest and in transit
3. **High Availability**: Multi-AZ deployments and read replicas
4. **Monitoring**: Comprehensive monitoring and alerting
5. **Backup and Recovery**: Automated backups and point-in-time recovery
6. **Performance**: Right-sizing instances and storage optimization
7. **Cost Optimization**: Reserved instances and storage tiering
8. **Compliance**: Data residency and regulatory compliance

---

This comprehensive database guide covers SQL fundamentals, complex queries, database design, NoSQL comparisons, performance optimization strategies, data warehousing, ETL processes, and modern cloud migration approaches essential for database interviews.