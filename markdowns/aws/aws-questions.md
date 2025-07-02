# AWS Cloud Interview Questions

## Table of Contents
1. [Q1: Explain AWS Global Infrastructure and its components.](#q1-explain-aws-global-infrastructure-and-its-components)
2. [Q2: What is the difference between AWS Regions and Availability Zones?](#q2-what-is-the-difference-between-aws-regions-and-availability-zones)
3. [Q3: Explain the AWS Shared Responsibility Model.](#q3-explain-the-aws-shared-responsibility-model)
4. [Q4: Compare EC2, Lambda, and Fargate. When would you use each?](#q4-compare-ec2-lambda-and-fargate-when-would-you-use-each)
5. [Q5: How do you implement Auto Scaling in AWS?](#q5-how-do-you-implement-auto-scaling-in-aws)
6. [Q6: Compare S3 storage classes and their use cases.](#q6-compare-s3-storage-classes-and-their-use-cases)
7. [Q7: How do you implement cross-region replication in S3?](#q7-how-do-you-implement-cross-region-replication-in-s3)
8. [Q8: Compare RDS, DynamoDB, and Aurora. When would you use each?](#q8-compare-rds-dynamodb-and-aurora-when-would-you-use-each)
9. [Q9: How do you implement VPC networking with public and private subnets?](#q9-how-do-you-implement-vpc-networking-with-public-and-private-subnets)
10. [Q10: How do you implement IAM policies and roles for least privilege access?](#q10-how-do-you-implement-iam-policies-and-roles-for-least-privilege-access)
11. [Q11: How do you implement AWS WAF for web application security?](#q11-how-do-you-implement-aws-waf-for-web-application-security)
12. [Q12: How do you build a serverless application with Lambda, API Gateway, and DynamoDB?](#q12-how-do-you-build-a-serverless-application-with-lambda-api-gateway-and-dynamodb)
13. [Q13: How do you implement ECS with Fargate for containerized applications?](#q13-how-do-you-implement-ecs-with-fargate-for-containerized-applications)
14. [Q14: How do you implement CI/CD pipeline using CodePipeline, CodeBuild, and CodeDeploy?](#q14-how-do-you-implement-cicd-pipeline-using-codepipeline-codebuild-and-codedeploy)
15. [Q15: How do you implement Infrastructure as Code using CloudFormation and CDK?](#q15-how-do-you-implement-infrastructure-as-code-using-cloudformation-and-cdk)
16. [Q16: How do you implement comprehensive monitoring with CloudWatch, X-Ray, and AWS Config?](#q16-how-do-you-implement-comprehensive-monitoring-with-cloudwatch-x-ray-and-aws-config)
17. [Q17: How do you implement cost optimization strategies in AWS?](#q17-how-do-you-implement-cost-optimization-strategies-in-aws)
18. [Q18: How do you implement disaster recovery and backup strategies in AWS?](#q18-how-do-you-implement-disaster-recovery-and-backup-strategies-in-aws)
19. [Q19: How do you implement advanced security with AWS WAF, GuardDuty, and Security Hub?](#q19-how-do-you-implement-advanced-security-with-aws-waf-guardduty-and-security-hub)
20. [Q20: How do you implement multi-account governance with AWS Organizations and Control Tower?](#q20-how-do-you-implement-multi-account-governance-with-aws-organizations-and-control-tower)

---

## AWS Fundamentals

### Q1: Explain AWS Global Infrastructure and its components.
**Difficulty: Medium**

**Answer:**
AWS Global Infrastructure consists of Regions, Availability Zones, Edge Locations, and Regional Edge Caches that provide a highly available, fault-tolerant, and scalable cloud computing platform worldwide.

### Q2: What is the difference between AWS Regions and Availability Zones?
**Difficulty: Easy**

**Answer:**
- **AWS Regions**: Separate geographic areas around the world where AWS clusters data centers. Each region is completely independent and isolated from other regions.
- **Availability Zones (AZs)**: One or more discrete data centers with redundant power, networking, and connectivity in an AWS Region. AZs are isolated from each other but connected through low-latency links.

```yaml
# Example: Multi-AZ deployment
Resources:
  WebServerAZ1:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1a
      ImageId: ami-0abcdef1234567890
      InstanceType: t3.micro
      
  WebServerAZ2:
    Type: AWS::EC2::Instance
    Properties:
      AvailabilityZone: us-east-1b
      ImageId: ami-0abcdef1234567890
      InstanceType: t3.micro
```

### Q3: Explain the AWS Shared Responsibility Model.
**Difficulty: Medium**

**Answer:**
The AWS Shared Responsibility Model defines the security responsibilities between AWS and the customer:

**AWS Responsibilities (Security OF the Cloud):**
- Physical security of data centers
- Hardware and software infrastructure
- Network infrastructure
- Virtualization infrastructure
- Managed services security

**Customer Responsibilities (Security IN the Cloud):**
- Operating system patches and updates
- Network and firewall configuration
- Identity and access management
- Data encryption
- Application-level security

```json
{
  "SharedResponsibilityModel": {
    "AWS": {
      "infrastructure": ["hardware", "software", "networking", "facilities"],
      "managedServices": ["RDS", "Lambda", "S3", "DynamoDB"]
    },
    "Customer": {
      "guestOS": ["patches", "updates", "security"],
      "applications": ["code", "runtime", "middleware"],
      "data": ["encryption", "integrity", "classification"],
      "identity": ["IAM", "MFA", "credentials"]
    }
  }
}
```

---

## Compute Services

### Q4: Compare EC2, Lambda, and Fargate. When would you use each?
**Difficulty: Medium**

**Answer:**

| Service | Use Case | Pricing Model | Management |
|---------|----------|---------------|------------|
| **EC2** | Long-running applications, custom environments | Pay for instance time | Full control, manual scaling |
| **Lambda** | Event-driven, short-duration tasks | Pay per request/execution time | Serverless, auto-scaling |
| **Fargate** | Containerized applications without server management | Pay for vCPU and memory | Serverless containers |

```python
# Lambda Function Example
import json
import boto3

def lambda_handler(event, context):
    """
    Process S3 events and resize images
    """
    s3 = boto3.client('s3')
    
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        
        # Process image
        response = process_image(bucket, key)
        
    return {
        'statusCode': 200,
        'body': json.dumps('Images processed successfully')
    }

def process_image(bucket, key):
    # Image processing logic
    pass
```

```yaml
# Fargate Task Definition
TaskDefinition:
  Type: AWS::ECS::TaskDefinition
  Properties:
    Family: web-app
    NetworkMode: awsvpc
    RequiresCompatibilities:
      - FARGATE
    Cpu: 256
    Memory: 512
    ExecutionRoleArn: !Ref TaskExecutionRole
    ContainerDefinitions:
      - Name: web-container
        Image: nginx:latest
        PortMappings:
          - ContainerPort: 80
            Protocol: tcp
        LogConfiguration:
          LogDriver: awslogs
          Options:
            awslogs-group: !Ref LogGroup
            awslogs-region: !Ref AWS::Region
```

### Q5: How do you implement Auto Scaling in AWS?
**Difficulty: Medium**

**Answer:**
AWS Auto Scaling automatically adjusts capacity to maintain steady, predictable performance at the lowest possible cost.

```yaml
# Auto Scaling Group with Launch Template
LaunchTemplate:
  Type: AWS::EC2::LaunchTemplate
  Properties:
    LaunchTemplateName: !Sub '${Environment}-launch-template'
    LaunchTemplateData:
      ImageId: ami-0abcdef1234567890
      InstanceType: t3.micro
      SecurityGroupIds:
        - !Ref WebServerSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<h1>Hello from $(hostname -f)</h1>" > /var/www/html/index.html

AutoScalingGroup:
  Type: AWS::AutoScaling::AutoScalingGroup
  Properties:
    AutoScalingGroupName: !Sub '${Environment}-asg'
    LaunchTemplate:
      LaunchTemplateId: !Ref LaunchTemplate
      Version: !GetAtt LaunchTemplate.LatestVersionNumber
    MinSize: 2
    MaxSize: 10
    DesiredCapacity: 3
    VPCZoneIdentifier:
      - !Ref PrivateSubnet1
      - !Ref PrivateSubnet2
      - !Ref PrivateSubnet3
    TargetGroupARNs:
      - !Ref TargetGroup
    HealthCheckType: ELB
    HealthCheckGracePeriod: 300
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-web-server'
        PropagateAtLaunch: true

# Scaling Policies
ScaleUpPolicy:
  Type: AWS::AutoScaling::ScalingPolicy
  Properties:
    AdjustmentType: ChangeInCapacity
    AutoScalingGroupName: !Ref AutoScalingGroup
    Cooldown: 300
    ScalingAdjustment: 1
    PolicyType: SimpleScaling

ScaleDownPolicy:
  Type: AWS::AutoScaling::ScalingPolicy
  Properties:
    AdjustmentType: ChangeInCapacity
    AutoScalingGroupName: !Ref AutoScalingGroup
    Cooldown: 300
    ScalingAdjustment: -1
    PolicyType: SimpleScaling

# CloudWatch Alarms
CPUAlarmHigh:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmDescription: Scale up on high CPU
    AlarmActions:
      - !Ref ScaleUpPolicy
    MetricName: CPUUtilization
    Namespace: AWS/EC2
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 80
    ComparisonOperator: GreaterThanThreshold
    Dimensions:
      - Name: AutoScalingGroupName
        Value: !Ref AutoScalingGroup

CPUAlarmLow:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmDescription: Scale down on low CPU
    AlarmActions:
      - !Ref ScaleDownPolicy
    MetricName: CPUUtilization
    Namespace: AWS/EC2
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 20
    ComparisonOperator: LessThanThreshold
    Dimensions:
      - Name: AutoScalingGroupName
        Value: !Ref AutoScalingGroup
```

---

## Storage Services

### Q6: Compare S3 storage classes and their use cases.
**Difficulty: Medium**

**Answer:**

| Storage Class | Use Case | Retrieval Time | Cost |
|---------------|----------|----------------|------|
| **S3 Standard** | Frequently accessed data | Immediate | Highest |
| **S3 IA** | Infrequently accessed data | Immediate | Medium |
| **S3 One Zone-IA** | Infrequent access, single AZ | Immediate | Lower |
| **S3 Glacier Instant** | Archive with instant access | Immediate | Low |
| **S3 Glacier Flexible** | Archive data | 1-5 minutes | Very Low |
| **S3 Glacier Deep Archive** | Long-term archive | 12 hours | Lowest |

```python
# S3 Lifecycle Policy Example
import boto3
import json

def create_lifecycle_policy():
    s3 = boto3.client('s3')
    
    lifecycle_config = {
        'Rules': [
            {
                'ID': 'DataLifecycleRule',
                'Status': 'Enabled',
                'Filter': {'Prefix': 'documents/'},
                'Transitions': [
                    {
                        'Days': 30,
                        'StorageClass': 'STANDARD_IA'
                    },
                    {
                        'Days': 90,
                        'StorageClass': 'GLACIER'
                    },
                    {
                        'Days': 365,
                        'StorageClass': 'DEEP_ARCHIVE'
                    }
                ],
                'Expiration': {
                    'Days': 2555  # 7 years
                }
            },
            {
                'ID': 'LogsLifecycleRule',
                'Status': 'Enabled',
                'Filter': {'Prefix': 'logs/'},
                'Transitions': [
                    {
                        'Days': 7,
                        'StorageClass': 'STANDARD_IA'
                    },
                    {
                        'Days': 30,
                        'StorageClass': 'GLACIER'
                    }
                ],
                'Expiration': {
                    'Days': 90
                }
            }
        ]
    }
    
    response = s3.put_bucket_lifecycle_configuration(
        Bucket='my-bucket',
        LifecycleConfiguration=lifecycle_config
    )
    
    return response

# S3 Event Notification
def setup_s3_notifications():
    s3 = boto3.client('s3')
    
    notification_config = {
        'LambdaConfigurations': [
            {
                'Id': 'ProcessImageUpload',
                'LambdaFunctionArn': 'arn:aws:lambda:us-east-1:123456789012:function:ProcessImage',
                'Events': ['s3:ObjectCreated:*'],
                'Filter': {
                    'Key': {
                        'FilterRules': [
                            {
                                'Name': 'prefix',
                                'Value': 'images/'
                            },
                            {
                                'Name': 'suffix',
                                'Value': '.jpg'
                            }
                        ]
                    }
                }
            }
        ]
    }
    
    response = s3.put_bucket_notification_configuration(
        Bucket='my-bucket',
        NotificationConfiguration=notification_config
    )
    
    return response
```

### Q7: How do you implement cross-region replication in S3?
**Difficulty: Medium**

**Answer:**
S3 Cross-Region Replication (CRR) automatically replicates objects across AWS regions for compliance, lower latency, and disaster recovery.

```yaml
# S3 Bucket with Cross-Region Replication
SourceBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub '${Environment}-source-bucket-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    ReplicationConfiguration:
      Role: !GetAtt ReplicationRole.Arn
      Rules:
        - Id: ReplicateToDestination
          Status: Enabled
          Prefix: documents/
          Destination:
            BucketArn: !Sub 'arn:aws:s3:::${Environment}-dest-bucket-${AWS::AccountId}'
            StorageClass: STANDARD_IA
            ReplicationTime:
              Status: Enabled
              Time:
                Minutes: 15
            Metrics:
              Status: Enabled
              EventThreshold:
                Minutes: 15
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true

DestinationBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub '${Environment}-dest-bucket-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true

# IAM Role for Replication
ReplicationRole:
  Type: AWS::IAM::Role
  Properties:
    AssumeRolePolicyDocument:
      Version: '2012-10-17'
      Statement:
        - Effect: Allow
          Principal:
            Service: s3.amazonaws.com
          Action: sts:AssumeRole
    Policies:
      - PolicyName: ReplicationPolicy
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Effect: Allow
              Action:
                - s3:GetObjectVersionForReplication
                - s3:GetObjectVersionAcl
              Resource: !Sub '${SourceBucket}/*'
            - Effect: Allow
              Action:
                - s3:ListBucket
              Resource: !Ref SourceBucket
            - Effect: Allow
              Action:
                - s3:ReplicateObject
                - s3:ReplicateDelete
              Resource: !Sub '${DestinationBucket}/*'
```

---

## Database Services

### Q8: Compare RDS, DynamoDB, and Aurora. When would you use each?
**Difficulty: Medium**

**Answer:**

| Service | Type | Use Case | Scaling | Consistency |
|---------|------|----------|---------|-------------|
| **RDS** | Relational | Traditional RDBMS needs | Vertical | ACID |
| **DynamoDB** | NoSQL | High-scale, low-latency apps | Horizontal | Eventually consistent |
| **Aurora** | Relational | High-performance, cloud-native | Auto-scaling | ACID |

```yaml
# RDS Multi-AZ Setup
RDSInstance:
  Type: AWS::RDS::DBInstance
  Properties:
    DBInstanceIdentifier: !Sub '${Environment}-database'
    DBInstanceClass: db.t3.micro
    Engine: mysql
    EngineVersion: '8.0.35'
    MasterUsername: admin
    MasterUserPassword: !Ref DBPassword
    AllocatedStorage: 20
    StorageType: gp2
    StorageEncrypted: true
    MultiAZ: true
    VPCSecurityGroups:
      - !Ref DatabaseSecurityGroup
    DBSubnetGroupName: !Ref DBSubnetGroup
    BackupRetentionPeriod: 7
    PreferredBackupWindow: "03:00-04:00"
    PreferredMaintenanceWindow: "sun:04:00-sun:05:00"
    DeletionProtection: true
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-database'

DBSubnetGroup:
  Type: AWS::RDS::DBSubnetGroup
  Properties:
    DBSubnetGroupDescription: Subnet group for RDS
    SubnetIds:
      - !Ref DatabaseSubnet1
      - !Ref DatabaseSubnet2
      - !Ref DatabaseSubnet3
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-db-subnet-group'
```

```python
# DynamoDB Operations
import boto3
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
import json

class DynamoDBManager:
    def __init__(self, table_name, region='us-east-1'):
        self.dynamodb = boto3.resource('dynamodb', region_name=region)
        self.table = self.dynamodb.Table(table_name)
    
    def create_item(self, item):
        """Create a new item"""
        try:
            response = self.table.put_item(
                Item=item,
                ConditionExpression='attribute_not_exists(id)'
            )
            return response
        except Exception as e:
            print(f"Error creating item: {e}")
            return None
    
    def get_item(self, key):
        """Get item by primary key"""
        try:
            response = self.table.get_item(Key=key)
            return response.get('Item')
        except Exception as e:
            print(f"Error getting item: {e}")
            return None
    
    def query_items(self, partition_key, sort_key_condition=None):
        """Query items by partition key"""
        try:
            if sort_key_condition:
                response = self.table.query(
                    KeyConditionExpression=Key('pk').eq(partition_key) & sort_key_condition
                )
            else:
                response = self.table.query(
                    KeyConditionExpression=Key('pk').eq(partition_key)
                )
            return response['Items']
        except Exception as e:
            print(f"Error querying items: {e}")
            return []
    
    def update_item(self, key, update_expression, expression_values):
        """Update an existing item"""
        try:
            response = self.table.update_item(
                Key=key,
                UpdateExpression=update_expression,
                ExpressionAttributeValues=expression_values,
                ReturnValues='UPDATED_NEW'
            )
            return response
        except Exception as e:
            print(f"Error updating item: {e}")
            return None
    
    def scan_with_filter(self, filter_expression):
        """Scan table with filter"""
        try:
            response = self.table.scan(
                FilterExpression=filter_expression
            )
            return response['Items']
        except Exception as e:
            print(f"Error scanning table: {e}")
            return []
    
    def batch_write(self, items):
        """Batch write multiple items"""
        try:
            with self.table.batch_writer() as batch:
                for item in items:
                    batch.put_item(Item=item)
            return True
        except Exception as e:
            print(f"Error batch writing: {e}")
            return False

# Usage Example
if __name__ == "__main__":
    db = DynamoDBManager('users-table')
    
    # Create user
    user = {
        'id': 'user123',
        'email': 'user@example.com',
        'name': 'John Doe',
        'created_at': '2024-01-01T00:00:00Z',
        'status': 'active'
    }
    db.create_item(user)
    
    # Query users
    users = db.query_items('user123')
    
    # Update user
    db.update_item(
        {'id': 'user123'},
        'SET #status = :status, #updated_at = :updated_at',
        {
            ':status': 'inactive',
            ':updated_at': '2024-01-02T00:00:00Z'
        }
    )
```

---

## Networking and Security

### Q9: How do you implement VPC networking with public and private subnets?
**Difficulty: Medium**

**Answer:**
A VPC provides an isolated network environment where you can launch AWS resources with complete control over networking configuration.

```yaml
# Complete VPC Setup with NAT Gateway
VPC:
  Type: AWS::EC2::VPC
  Properties:
    CidrBlock: 10.0.0.0/16
    EnableDnsHostnames: true
    EnableDnsSupport: true
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-vpc'

# Internet Gateway
InternetGateway:
  Type: AWS::EC2::InternetGateway
  Properties:
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-igw'

InternetGatewayAttachment:
  Type: AWS::EC2::VPCGatewayAttachment
  Properties:
    InternetGatewayId: !Ref InternetGateway
    VpcId: !Ref VPC

# NAT Gateway for private subnets
NATGatewayEIP:
  Type: AWS::EC2::EIP
  DependsOn: InternetGatewayAttachment
  Properties:
    Domain: vpc
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-nat-eip'

NATGateway:
  Type: AWS::EC2::NatGateway
  Properties:
    AllocationId: !GetAtt NATGatewayEIP.AllocationId
    SubnetId: !Ref PublicSubnet1
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-nat-gateway'

# Route Tables
PublicRouteTable:
  Type: AWS::EC2::RouteTable
  Properties:
    VpcId: !Ref VPC
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-public-rt'

DefaultPublicRoute:
  Type: AWS::EC2::Route
  DependsOn: InternetGatewayAttachment
  Properties:
    RouteTableId: !Ref PublicRouteTable
    DestinationCidrBlock: 0.0.0.0/0
    GatewayId: !Ref InternetGateway

PrivateRouteTable:
  Type: AWS::EC2::RouteTable
  Properties:
    VpcId: !Ref VPC
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-private-rt'

DefaultPrivateRoute:
  Type: AWS::EC2::Route
  Properties:
    RouteTableId: !Ref PrivateRouteTable
    DestinationCidrBlock: 0.0.0.0/0
    NatGatewayId: !Ref NATGateway

# Route Table Associations
PublicSubnet1RouteTableAssociation:
  Type: AWS::EC2::SubnetRouteTableAssociation
  Properties:
    RouteTableId: !Ref PublicRouteTable
    SubnetId: !Ref PublicSubnet1

PrivateSubnet1RouteTableAssociation:
  Type: AWS::EC2::SubnetRouteTableAssociation
  Properties:
    RouteTableId: !Ref PrivateRouteTable
    SubnetId: !Ref PrivateSubnet1
```

### Q10: How do you implement IAM policies and roles for least privilege access?
**Difficulty: Hard**

**Answer:**
IAM follows the principle of least privilege, granting only the minimum permissions necessary for users and services to perform their tasks.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowS3ReadOnlyForSpecificBucket",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::my-app-bucket",
        "arn:aws:s3:::my-app-bucket/*"
      ],
      "Condition": {
        "StringEquals": {
          "s3:prefix": [
            "user-data/${aws:username}/",
            "shared/"
          ]
        },
        "DateGreaterThan": {
          "aws:CurrentTime": "2024-01-01T00:00:00Z"
        },
        "IpAddress": {
          "aws:SourceIp": ["203.0.113.0/24", "198.51.100.0/24"]
        }
      }
    },
    {
      "Sid": "AllowCloudWatchLogsForApplication",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "logs:DescribeLogStreams"
      ],
      "Resource": "arn:aws:logs:*:*:log-group:/aws/lambda/my-app-*"
    },
    {
      "Sid": "DenyDangerousActions",
      "Effect": "Deny",
      "Action": [
        "iam:CreateUser",
        "iam:DeleteUser",
        "iam:CreateRole",
        "iam:DeleteRole",
        "ec2:TerminateInstances"
      ],
      "Resource": "*",
      "Condition": {
        "Bool": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

```python
# IAM Policy Generator
import json
import boto3
from typing import List, Dict, Any

class IAMPolicyBuilder:
    def __init__(self):
        self.policy = {
            "Version": "2012-10-17",
            "Statement": []
        }
    
    def add_statement(self, 
                     effect: str,
                     actions: List[str],
                     resources: List[str],
                     conditions: Dict[str, Any] = None,
                     sid: str = None) -> 'IAMPolicyBuilder':
        """Add a statement to the policy"""
        statement = {
            "Effect": effect,
            "Action": actions,
            "Resource": resources
        }
        
        if sid:
            statement["Sid"] = sid
        
        if conditions:
            statement["Condition"] = conditions
        
        self.policy["Statement"].append(statement)
        return self
    
    def allow_s3_access(self, bucket_name: str, prefix: str = None) -> 'IAMPolicyBuilder':
        """Allow S3 access to specific bucket and prefix"""
        resources = [f"arn:aws:s3:::{bucket_name}"]
        
        if prefix:
            resources.append(f"arn:aws:s3:::{bucket_name}/{prefix}/*")
        else:
            resources.append(f"arn:aws:s3:::{bucket_name}/*")
        
        return self.add_statement(
            effect="Allow",
            actions=[
                "s3:GetObject",
                "s3:PutObject",
                "s3:DeleteObject",
                "s3:ListBucket"
            ],
            resources=resources,
            sid="AllowS3Access"
        )
    
    def allow_lambda_execution(self, function_name: str) -> 'IAMPolicyBuilder':
        """Allow Lambda execution permissions"""
        return self.add_statement(
            effect="Allow",
            actions=[
                "logs:CreateLogGroup",
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            resources=[f"arn:aws:logs:*:*:log-group:/aws/lambda/{function_name}:*"],
            sid="AllowLambdaLogging"
        )
    
    def deny_without_mfa(self, actions: List[str]) -> 'IAMPolicyBuilder':
        """Deny actions without MFA"""
        return self.add_statement(
            effect="Deny",
            actions=actions,
            resources=["*"],
            conditions={
                "Bool": {
                    "aws:MultiFactorAuthPresent": "false"
                }
            },
            sid="DenyWithoutMFA"
        )
    
    def build(self) -> Dict[str, Any]:
        """Build and return the policy"""
        return self.policy
    
    def to_json(self) -> str:
        """Convert policy to JSON string"""
        return json.dumps(self.policy, indent=2)

# Usage Example
if __name__ == "__main__":
    # Create a policy for a web application
    policy_builder = IAMPolicyBuilder()
    
    policy = (policy_builder
              .allow_s3_access("my-app-bucket", "uploads")
              .allow_lambda_execution("my-app-processor")
              .deny_without_mfa([
                  "iam:CreateUser",
                  "iam:DeleteUser",
                  "ec2:TerminateInstances"
              ])
              .build())
    
    print(json.dumps(policy, indent=2))
```

### Q11: How do you implement AWS WAF for web application security?
**Difficulty: Medium**

**Answer:**
AWS WAF protects web applications from common web exploits and bots that may affect availability, compromise security, or consume excessive resources.

```yaml
# AWS WAF Configuration
WebACL:
  Type: AWS::WAFv2::WebACL
  Properties:
    Name: !Sub '${Environment}-web-acl'
    Scope: REGIONAL  # Use CLOUDFRONT for CloudFront distributions
    DefaultAction:
      Allow: {}
    Rules:
      # Rate limiting rule
      - Name: RateLimitRule
        Priority: 1
        Statement:
          RateBasedStatement:
            Limit: 2000
            AggregateKeyType: IP
        Action:
          Block: {}
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: RateLimitRule
      
      # AWS Managed Rules - Core Rule Set
      - Name: AWSManagedRulesCommonRuleSet
        Priority: 2
        OverrideAction:
          None: {}
        Statement:
          ManagedRuleGroupStatement:
            VendorName: AWS
            Name: AWSManagedRulesCommonRuleSet
            ExcludedRules:
              - Name: SizeRestrictions_BODY
              - Name: GenericRFI_BODY
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: CommonRuleSetMetric
      
      # AWS Managed Rules - Known Bad Inputs
      - Name: AWSManagedRulesKnownBadInputsRuleSet
        Priority: 3
        OverrideAction:
          None: {}
        Statement:
          ManagedRuleGroupStatement:
            VendorName: AWS
            Name: AWSManagedRulesKnownBadInputsRuleSet
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: KnownBadInputsMetric
      
      # Custom IP whitelist rule
      - Name: IPWhitelistRule
        Priority: 4
        Statement:
          IPSetReferenceStatement:
            Arn: !GetAtt IPWhitelist.Arn
        Action:
          Allow: {}
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: IPWhitelistMetric
      
      # Geographic restriction
      - Name: GeoBlockRule
        Priority: 5
        Statement:
          GeoMatchStatement:
            CountryCodes:
              - CN
              - RU
              - KP
        Action:
          Block: {}
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: GeoBlockMetric
    
    VisibilityConfig:
      SampledRequestsEnabled: true
      CloudWatchMetricsEnabled: true
      MetricName: !Sub '${Environment}WebACL'

# IP Set for whitelisting
IPWhitelist:
  Type: AWS::WAFv2::IPSet
  Properties:
    Name: !Sub '${Environment}-ip-whitelist'
    Scope: REGIONAL
    IPAddressVersion: IPV4
    Addresses:
      - 203.0.113.0/24
      - 198.51.100.0/24
      - 192.0.2.44/32

# Associate WAF with Application Load Balancer
WebACLAssociation:
  Type: AWS::WAFv2::WebACLAssociation
  Properties:
    ResourceArn: !Ref ApplicationLoadBalancer
    WebACLArn: !GetAtt WebACL.Arn
```

---

## Serverless and Containers

### Q12: How do you build a serverless application with Lambda, API Gateway, and DynamoDB?
**Difficulty: Hard**

**Answer:**
A serverless application eliminates server management while providing automatic scaling and pay-per-use pricing.

### Q13: How do you implement ECS with Fargate for containerized applications?
**Difficulty: Medium**

**Answer:**
ECS with Fargate provides serverless container hosting without managing EC2 instances.

```yaml
# ECS Cluster with Fargate
ECSCluster:
  Type: AWS::ECS::Cluster
  Properties:
    ClusterName: !Sub '${Environment}-cluster'
    CapacityProviders:
      - FARGATE
      - FARGATE_SPOT
    DefaultCapacityProviderStrategy:
      - CapacityProvider: FARGATE
        Weight: 1
      - CapacityProvider: FARGATE_SPOT
        Weight: 4
    ClusterSettings:
      - Name: containerInsights
        Value: enabled

# Task Definition
TaskDefinition:
  Type: AWS::ECS::TaskDefinition
  Properties:
    Family: !Sub '${Environment}-app'
    NetworkMode: awsvpc
    RequiresCompatibilities:
      - FARGATE
    Cpu: 512
    Memory: 1024
    ExecutionRoleArn: !Ref TaskExecutionRole
    TaskRoleArn: !Ref TaskRole
    ContainerDefinitions:
      - Name: app
        Image: !Sub '${AWS::AccountId}.dkr.ecr.${AWS::Region}.amazonaws.com/${ECRRepository}:latest'
        Essential: true
        PortMappings:
          - ContainerPort: 3000
            Protocol: tcp
        Environment:
          - Name: NODE_ENV
            Value: !Ref Environment
          - Name: DATABASE_URL
            Value: !Sub 'postgresql://${DBUsername}:${DBPassword}@${RDSInstance.Endpoint.Address}:5432/${DBName}'
        Secrets:
          - Name: JWT_SECRET
            ValueFrom: !Ref JWTSecret
          - Name: API_KEY
            ValueFrom: !Ref APIKeySecret
        LogConfiguration:
          LogDriver: awslogs
          Options:
            awslogs-group: !Ref LogGroup
            awslogs-region: !Ref AWS::Region
            awslogs-stream-prefix: ecs
        HealthCheck:
          Command:
            - CMD-SHELL
            - curl -f http://localhost:3000/health || exit 1
          Interval: 30
          Timeout: 5
          Retries: 3
          StartPeriod: 60

# ECS Service
ECSService:
  Type: AWS::ECS::Service
  DependsOn: LoadBalancerListener
  Properties:
    ServiceName: !Sub '${Environment}-app-service'
    Cluster: !Ref ECSCluster
    TaskDefinition: !Ref TaskDefinition
    DesiredCount: 2
    LaunchType: FARGATE
    PlatformVersion: LATEST
    NetworkConfiguration:
      AwsvpcConfiguration:
        SecurityGroups:
          - !Ref ECSSecurityGroup
        Subnets:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        AssignPublicIp: DISABLED
    LoadBalancers:
      - ContainerName: app
        ContainerPort: 3000
        TargetGroupArn: !Ref TargetGroup
    ServiceRegistries:
      - RegistryArn: !GetAtt ServiceDiscovery.Arn
    DeploymentConfiguration:
      MaximumPercent: 200
      MinimumHealthyPercent: 50
      DeploymentCircuitBreaker:
        Enable: true
        Rollback: true
    EnableExecuteCommand: true

# Auto Scaling
ServiceScalingTarget:
  Type: AWS::ApplicationAutoScaling::ScalableTarget
  Properties:
    MaxCapacity: 10
    MinCapacity: 2
    ResourceId: !Sub 'service/${ECSCluster}/${ECSService.Name}'
    RoleARN: !Sub 'arn:aws:iam::${AWS::AccountId}:role/aws-service-role/ecs.application-autoscaling.amazonaws.com/AWSServiceRoleForApplicationAutoScaling_ECSService'
    ScalableDimension: ecs:service:DesiredCount
    ServiceNamespace: ecs

ServiceScalingPolicy:
  Type: AWS::ApplicationAutoScaling::ScalingPolicy
  Properties:
    PolicyName: !Sub '${Environment}-cpu-scaling'
    PolicyType: TargetTrackingScaling
    ScalingTargetId: !Ref ServiceScalingTarget
    TargetTrackingScalingPolicyConfiguration:
      PredefinedMetricSpecification:
        PredefinedMetricType: ECSServiceAverageCPUUtilization
      TargetValue: 70.0
      ScaleOutCooldown: 300
      ScaleInCooldown: 300
```

---

## DevOps and CI/CD

### Q14: How do you implement CI/CD pipeline using CodePipeline, CodeBuild, and CodeDeploy?
**Difficulty: Hard**

**Answer:**
AWS CodePipeline orchestrates the entire CI/CD workflow from source code to deployment.

```yaml
# CodeCommit Repository
CodeRepository:
  Type: AWS::CodeCommit::Repository
  Properties:
    RepositoryName: !Sub '${Environment}-app-repo'
    RepositoryDescription: Application source code repository
    Code:
      BranchName: main
      S3:
        Bucket: !Ref SourceCodeBucket
        Key: source-code.zip

# S3 Bucket for Artifacts
ArtifactsBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub '${Environment}-pipeline-artifacts-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    BucketEncryption:
      ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: AES256
    PublicAccessBlockConfiguration:
      BlockPublicAcls: true
      BlockPublicPolicy: true
      IgnorePublicAcls: true
      RestrictPublicBuckets: true

# CodeBuild Project
CodeBuildProject:
  Type: AWS::CodeBuild::Project
  Properties:
    Name: !Sub '${Environment}-build-project'
    ServiceRole: !GetAtt CodeBuildRole.Arn
    Artifacts:
      Type: CODEPIPELINE
    Environment:
      Type: LINUX_CONTAINER
      ComputeType: BUILD_GENERAL1_MEDIUM
      Image: aws/codebuild/amazonlinux2-x86_64-standard:3.0
      PrivilegedMode: true
      EnvironmentVariables:
        - Name: AWS_DEFAULT_REGION
          Value: !Ref AWS::Region
        - Name: AWS_ACCOUNT_ID
          Value: !Ref AWS::AccountId
        - Name: IMAGE_REPO_NAME
          Value: !Ref ECRRepository
        - Name: IMAGE_TAG
          Value: latest
        - Name: ENVIRONMENT
          Value: !Ref Environment
    Source:
      Type: CODEPIPELINE
      BuildSpec: |
        version: 0.2
        phases:
          pre_build:
            commands:
              - echo Logging in to Amazon ECR...
              - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
              - REPOSITORY_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME
              - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
              - IMAGE_TAG=${COMMIT_HASH:=latest}
          build:
            commands:
              - echo Build started on `date`
              - echo Building the Docker image...
              - docker build -t $IMAGE_REPO_NAME:$IMAGE_TAG .
              - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $REPOSITORY_URI:$IMAGE_TAG
              - docker tag $IMAGE_REPO_NAME:$IMAGE_TAG $REPOSITORY_URI:latest
              - echo Running tests...
              - npm test
              - echo Running security scan...
              - npm audit
          post_build:
            commands:
              - echo Build completed on `date`
              - echo Pushing the Docker images...
              - docker push $REPOSITORY_URI:$IMAGE_TAG
              - docker push $REPOSITORY_URI:latest
              - echo Writing image definitions file...
              - printf '[{"name":"app","imageUri":"%s"}]' $REPOSITORY_URI:$IMAGE_TAG > imagedefinitions.json
        artifacts:
          files:
            - imagedefinitions.json
            - appspec.yml
            - taskdef.json

# CodeDeploy Application
CodeDeployApplication:
  Type: AWS::CodeDeploy::Application
  Properties:
    ApplicationName: !Sub '${Environment}-app'
    ComputePlatform: ECS

CodeDeployDeploymentGroup:
  Type: AWS::CodeDeploy::DeploymentGroup
  Properties:
    ApplicationName: !Ref CodeDeployApplication
    DeploymentGroupName: !Sub '${Environment}-deployment-group'
    ServiceRoleArn: !GetAtt CodeDeployRole.Arn
    DeploymentConfigName: CodeDeployDefault.ECSAllAtOnceBlueGreen
    BlueGreenDeploymentConfiguration:
      TerminateBlueInstancesOnDeploymentSuccess:
        Action: TERMINATE
        TerminationWaitTimeInMinutes: 5
      DeploymentReadyOption:
        ActionOnTimeout: CONTINUE_DEPLOYMENT
      GreenFleetProvisioningOption:
        Action: COPY_AUTO_SCALING_GROUP
    LoadBalancerInfo:
      TargetGroupInfoList:
        - Name: !GetAtt TargetGroup.TargetGroupName
    ECSServices:
      - ServiceName: !GetAtt ECSService.Name
        ClusterName: !Ref ECSCluster

# CodePipeline
CodePipeline:
  Type: AWS::CodePipeline::Pipeline
  Properties:
    Name: !Sub '${Environment}-pipeline'
    RoleArn: !GetAtt CodePipelineRole.Arn
    ArtifactStore:
      Type: S3
      Location: !Ref ArtifactsBucket
      EncryptionKey:
        Id: !GetAtt PipelineKMSKey.Arn
        Type: KMS
    Stages:
      - Name: Source
        Actions:
          - Name: SourceAction
            ActionTypeId:
              Category: Source
              Owner: AWS
              Provider: CodeCommit
              Version: 1
            Configuration:
              RepositoryName: !GetAtt CodeRepository.Name
              BranchName: main
              PollForSourceChanges: false
            OutputArtifacts:
              - Name: SourceOutput
      
      - Name: Build
        Actions:
          - Name: BuildAction
            ActionTypeId:
              Category: Build
              Owner: AWS
              Provider: CodeBuild
              Version: 1
            Configuration:
              ProjectName: !Ref CodeBuildProject
            InputArtifacts:
              - Name: SourceOutput
            OutputArtifacts:
              - Name: BuildOutput
      
      - Name: Deploy
        Actions:
          - Name: DeployAction
            ActionTypeId:
              Category: Deploy
              Owner: AWS
              Provider: CodeDeployToECS
              Version: 1
            Configuration:
              ApplicationName: !Ref CodeDeployApplication
              DeploymentGroupName: !Ref CodeDeployDeploymentGroup
              TaskDefinitionTemplateArtifact: BuildOutput
              TaskDefinitionTemplatePath: taskdef.json
              AppSpecTemplateArtifact: BuildOutput
              AppSpecTemplatePath: appspec.yml
              Image1ArtifactName: BuildOutput
              Image1ContainerName: IMAGE1_NAME
            InputArtifacts:
              - Name: BuildOutput
            Region: !Ref AWS::Region
```

```python
# Pipeline Monitoring and Notifications
import boto3
import json
from datetime import datetime

def lambda_handler(event, context):
    """Handle CodePipeline state changes"""
    
    # Parse the event
    detail = event['detail']
    pipeline_name = detail['pipeline']
    execution_id = detail['execution-id']
    state = detail['state']
    
    # Initialize clients
    codepipeline = boto3.client('codepipeline')
    sns = boto3.client('sns')
    
    try:
        # Get pipeline execution details
        response = codepipeline.get_pipeline_execution(
            pipelineName=pipeline_name,
            pipelineExecutionId=execution_id
        )
        
        execution_details = response['pipelineExecution']
        
        # Prepare notification message
        message = {
            'pipeline': pipeline_name,
            'execution_id': execution_id,
            'state': state,
            'timestamp': datetime.utcnow().isoformat(),
            'trigger': execution_details.get('trigger', {}),
            'artifacts': execution_details.get('artifactRevisions', [])
        }
        
        # Determine notification topic based on state
        if state == 'SUCCEEDED':
            topic_arn = os.environ['SUCCESS_TOPIC_ARN']
            subject = f"✅ Pipeline {pipeline_name} succeeded"
        elif state == 'FAILED':
            topic_arn = os.environ['FAILURE_TOPIC_ARN']
            subject = f"❌ Pipeline {pipeline_name} failed"
            
            # Get failure details
            stages_response = codepipeline.get_pipeline_execution(
                pipelineName=pipeline_name,
                pipelineExecutionId=execution_id
            )
            
            message['failure_details'] = get_failure_details(
                codepipeline, pipeline_name, execution_id
            )
        else:
            topic_arn = os.environ['STATUS_TOPIC_ARN']
            subject = f"🔄 Pipeline {pipeline_name} is {state.lower()}"
        
        # Send notification
        sns.publish(
            TopicArn=topic_arn,
            Subject=subject,
            Message=json.dumps(message, indent=2)
        )
        
        # Log metrics to CloudWatch
        cloudwatch = boto3.client('cloudwatch')
        cloudwatch.put_metric_data(
            Namespace='CodePipeline/Executions',
            MetricData=[
                {
                    'MetricName': 'ExecutionState',
                    'Dimensions': [
                        {
                            'Name': 'PipelineName',
                            'Value': pipeline_name
                        },
                        {
                            'Name': 'State',
                            'Value': state
                        }
                    ],
                    'Value': 1,
                    'Unit': 'Count',
                    'Timestamp': datetime.utcnow()
                }
            ]
        )
        
        return {
            'statusCode': 200,
            'body': json.dumps('Notification sent successfully')
        }
        
    except Exception as e:
        print(f"Error processing pipeline event: {str(e)}")
        raise e

def get_failure_details(codepipeline, pipeline_name, execution_id):
    """Get detailed failure information"""
    try:
        # Get action executions
        response = codepipeline.list_action_executions(
            pipelineName=pipeline_name,
            filter={
                'pipelineExecutionId': execution_id
            }
        )
        
        failed_actions = []
        for action in response['actionExecutionDetails']:
            if action['status'] == 'Failed':
                failed_actions.append({
                    'actionName': action['actionName'],
                    'stageName': action['stageName'],
                    'errorCode': action.get('output', {}).get('executionResult', {}).get('errorCode'),
                    'errorMessage': action.get('output', {}).get('executionResult', {}).get('errorMessage')
                })
        
        return failed_actions
        
    except Exception as e:
        print(f"Error getting failure details: {str(e)}")
        return []
```

### Q15: How do you implement Infrastructure as Code using CloudFormation and CDK?
**Difficulty: Hard**

**Answer:**
Infrastructure as Code enables version control, repeatability, and automation of infrastructure provisioning.

```python
# AWS CDK Example (Python)
from aws_cdk import (
    Stack,
    aws_ec2 as ec2,
    aws_ecs as ecs,
    aws_ecs_patterns as ecs_patterns,
    aws_rds as rds,
    aws_elasticloadbalancingv2 as elbv2,
    aws_route53 as route53,
    aws_certificatemanager as acm,
    aws_logs as logs,
    aws_iam as iam,
    Duration,
    RemovalPolicy
)
from constructs import Construct

class WebApplicationStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)
        
        # VPC with public and private subnets
        self.vpc = ec2.Vpc(
            self, "VPC",
            max_azs=3,
            cidr="10.0.0.0/16",
            subnet_configuration=[
                ec2.SubnetConfiguration(
                    subnet_type=ec2.SubnetType.PUBLIC,
                    name="Public",
                    cidr_mask=24
                ),
                ec2.SubnetConfiguration(
                    subnet_type=ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    name="Private",
                    cidr_mask=24
                ),
                ec2.SubnetConfiguration(
                    subnet_type=ec2.SubnetType.PRIVATE_ISOLATED,
                    name="Database",
                    cidr_mask=24
                )
            ],
            nat_gateways=2,
            enable_dns_hostnames=True,
            enable_dns_support=True
        )
        
        # Security Groups
        self.alb_security_group = ec2.SecurityGroup(
            self, "ALBSecurityGroup",
            vpc=self.vpc,
            description="Security group for Application Load Balancer",
            allow_all_outbound=True
        )
        
        self.alb_security_group.add_ingress_rule(
            ec2.Peer.any_ipv4(),
            ec2.Port.tcp(80),
            "Allow HTTP traffic"
        )
        
        self.alb_security_group.add_ingress_rule(
            ec2.Peer.any_ipv4(),
            ec2.Port.tcp(443),
            "Allow HTTPS traffic"
        )
        
        self.ecs_security_group = ec2.SecurityGroup(
            self, "ECSSecurityGroup",
            vpc=self.vpc,
            description="Security group for ECS tasks"
        )
        
        self.ecs_security_group.add_ingress_rule(
            self.alb_security_group,
            ec2.Port.tcp(3000),
            "Allow traffic from ALB"
        )
        
        self.db_security_group = ec2.SecurityGroup(
            self, "DatabaseSecurityGroup",
            vpc=self.vpc,
            description="Security group for RDS database"
        )
        
        self.db_security_group.add_ingress_rule(
            self.ecs_security_group,
            ec2.Port.tcp(5432),
            "Allow database access from ECS"
        )
        
        # RDS Database
        self.database = rds.DatabaseInstance(
            self, "Database",
            engine=rds.DatabaseInstanceEngine.postgres(
                version=rds.PostgresEngineVersion.VER_13_7
            ),
            instance_type=ec2.InstanceType.of(
                ec2.InstanceClass.BURSTABLE3,
                ec2.InstanceSize.MICRO
            ),
            vpc=self.vpc,
            vpc_subnets=ec2.SubnetSelection(
                subnet_type=ec2.SubnetType.PRIVATE_ISOLATED
            ),
            security_groups=[self.db_security_group],
            database_name="appdb",
            credentials=rds.Credentials.from_generated_secret(
                "dbadmin",
                secret_name="rds-credentials"
            ),
            backup_retention=Duration.days(7),
            deletion_protection=True,
            delete_automated_backups=False,
            storage_encrypted=True,
            monitoring_interval=Duration.seconds(60),
            enable_performance_insights=True,
            cloudwatch_logs_exports=["postgresql"]
        )
        
        # ECS Cluster
        self.cluster = ecs.Cluster(
            self, "Cluster",
            vpc=self.vpc,
            container_insights=True
        )
        
        # Task Definition
        self.task_definition = ecs.FargateTaskDefinition(
            self, "TaskDefinition",
            memory_limit_mib=1024,
            cpu=512
        )
        
        # Container Definition
        self.container = self.task_definition.add_container(
            "app",
            image=ecs.ContainerImage.from_registry("nginx:latest"),
            memory_limit_mib=1024,
            logging=ecs.LogDrivers.aws_logs(
                stream_prefix="ecs",
                log_group=logs.LogGroup(
                    self, "LogGroup",
                    log_group_name=f"/ecs/{construct_id}",
                    retention=logs.RetentionDays.ONE_WEEK,
                    removal_policy=RemovalPolicy.DESTROY
                )
            ),
            environment={
                "NODE_ENV": "production",
                "DATABASE_HOST": self.database.instance_endpoint.hostname
            },
            secrets={
                "DATABASE_PASSWORD": ecs.Secret.from_secrets_manager(
                    self.database.secret,
                    "password"
                )
            },
            health_check=ecs.HealthCheck(
                command=["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
                interval=Duration.seconds(30),
                timeout=Duration.seconds(5),
                retries=3,
                start_period=Duration.seconds(60)
            )
        )
        
        self.container.add_port_mappings(
            ecs.PortMapping(
                container_port=3000,
                protocol=ecs.Protocol.TCP
            )
        )
        
        # Application Load Balancer
        self.load_balancer = elbv2.ApplicationLoadBalancer(
            self, "LoadBalancer",
            vpc=self.vpc,
            internet_facing=True,
            security_group=self.alb_security_group
        )
        
        # ECS Service with Load Balancer
        self.service = ecs_patterns.ApplicationLoadBalancedFargateService(
            self, "Service",
            cluster=self.cluster,
            task_definition=self.task_definition,
            public_load_balancer=True,
            listener_port=80,
            desired_count=2,
            platform_version=ecs.FargatePlatformVersion.LATEST,
            assign_public_ip=False,
            security_groups=[self.ecs_security_group]
        )
        
        # Auto Scaling
        scaling = self.service.service.auto_scale_task_count(
            max_capacity=10,
            min_capacity=2
        )
        
        scaling.scale_on_cpu_utilization(
            "CpuScaling",
            target_utilization_percent=70,
            scale_in_cooldown=Duration.seconds(300),
            scale_out_cooldown=Duration.seconds(300)
        )
        
        scaling.scale_on_memory_utilization(
            "MemoryScaling",
            target_utilization_percent=80
        )
        
        # CloudWatch Alarms
        self.service.service.metric_cpu_utilization().create_alarm(
            self, "HighCpuAlarm",
            threshold=80,
            evaluation_periods=2,
            alarm_description="High CPU utilization"
        )
        
        self.service.service.metric_memory_utilization().create_alarm(
            self, "HighMemoryAlarm",
            threshold=85,
            evaluation_periods=2,
            alarm_description="High memory utilization"
        )
        
        # Grant database access to ECS task
        self.database.secret.grant_read(self.task_definition.task_role)
        
        # Output important values
        self.load_balancer_dns = self.service.load_balancer.load_balancer_dns_name
        self.database_endpoint = self.database.instance_endpoint.hostname

# CDK App
from aws_cdk import App, Environment

app = App()

# Development environment
dev_stack = WebApplicationStack(
    app, "WebApp-Dev",
    env=Environment(
        account="123456789012",
        region="us-east-1"
    )
)

# Production environment
prod_stack = WebApplicationStack(
    app, "WebApp-Prod",
    env=Environment(
        account="123456789012",
        region="us-east-1"
    )
)

app.synth()
```

---

## Monitoring and Cost Optimization

### Q16: How do you implement comprehensive monitoring with CloudWatch, X-Ray, and AWS Config?
**Difficulty: Medium**

**Answer:**
Comprehensive monitoring provides visibility into application performance, infrastructure health, and compliance.

```yaml
# CloudWatch Dashboard
CloudWatchDashboard:
  Type: AWS::CloudWatch::Dashboard
  Properties:
    DashboardName: !Sub '${Environment}-application-dashboard'
    DashboardBody: !Sub |
      {
        "widgets": [
          {
            "type": "metric",
            "x": 0,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
              "metrics": [
                [ "AWS/ECS", "CPUUtilization", "ServiceName", "${ECSService}", "ClusterName", "${ECSCluster}" ],
                [ ".", "MemoryUtilization", ".", ".", ".", "." ]
              ],
              "view": "timeSeries",
              "stacked": false,
              "region": "${AWS::Region}",
              "title": "ECS Service Metrics",
              "period": 300
            }
          },
          {
            "type": "metric",
            "x": 12,
            "y": 0,
            "width": 12,
            "height": 6,
            "properties": {
              "metrics": [
                [ "AWS/ApplicationELB", "RequestCount", "LoadBalancer", "${LoadBalancer}" ],
                [ ".", "TargetResponseTime", ".", "." ],
                [ ".", "HTTPCode_Target_2XX_Count", ".", "." ],
                [ ".", "HTTPCode_Target_4XX_Count", ".", "." ],
                [ ".", "HTTPCode_Target_5XX_Count", ".", "." ]
              ],
              "view": "timeSeries",
              "stacked": false,
              "region": "${AWS::Region}",
              "title": "Load Balancer Metrics",
              "period": 300
            }
          },
          {
            "type": "metric",
            "x": 0,
            "y": 6,
            "width": 24,
            "height": 6,
            "properties": {
              "metrics": [
                [ "AWS/RDS", "CPUUtilization", "DBInstanceIdentifier", "${RDSInstance}" ],
                [ ".", "DatabaseConnections", ".", "." ],
                [ ".", "FreeableMemory", ".", "." ],
                [ ".", "ReadLatency", ".", "." ],
                [ ".", "WriteLatency", ".", "." ]
              ],
              "view": "timeSeries",
              "stacked": false,
              "region": "${AWS::Region}",
              "title": "RDS Metrics",
              "period": 300
            }
          }
        ]
      }

# CloudWatch Alarms
HighCPUAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: !Sub '${Environment}-high-cpu'
    AlarmDescription: 'High CPU utilization'
    MetricName: CPUUtilization
    Namespace: AWS/ECS
    Statistic: Average
    Period: 300
    EvaluationPeriods: 2
    Threshold: 80
    ComparisonOperator: GreaterThanThreshold
    Dimensions:
      - Name: ServiceName
        Value: !Ref ECSService
      - Name: ClusterName
        Value: !Ref ECSCluster
    AlarmActions:
      - !Ref SNSTopicAlerts
      - !Ref ScaleUpPolicy

HighErrorRateAlarm:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: !Sub '${Environment}-high-error-rate'
    AlarmDescription: 'High error rate'
    MetricName: HTTPCode_Target_5XX_Count
    Namespace: AWS/ApplicationELB
    Statistic: Sum
    Period: 300
    EvaluationPeriods: 2
    Threshold: 10
    ComparisonOperator: GreaterThanThreshold
    TreatMissingData: notBreaching
    Dimensions:
      - Name: LoadBalancer
        Value: !GetAtt LoadBalancer.LoadBalancerFullName
    AlarmActions:
      - !Ref SNSTopicAlerts

# Custom Metrics
CustomMetricsLambda:
  Type: AWS::Lambda::Function
  Properties:
    FunctionName: !Sub '${Environment}-custom-metrics'
    Runtime: python3.9
    Handler: index.lambda_handler
    Role: !GetAtt CustomMetricsRole.Arn
    Code:
      ZipFile: |
        import boto3
        import json
        import requests
        from datetime import datetime
        
        def lambda_handler(event, context):
            cloudwatch = boto3.client('cloudwatch')
            
            try:
                # Application health check
                response = requests.get('http://internal-alb/health', timeout=5)
                health_status = 1 if response.status_code == 200 else 0
                
                # Business metrics
                active_users = get_active_users()
                transaction_count = get_transaction_count()
                
                # Send custom metrics
                cloudwatch.put_metric_data(
                    Namespace='Application/Health',
                    MetricData=[
                        {
                            'MetricName': 'HealthStatus',
                            'Value': health_status,
                            'Unit': 'Count',
                            'Timestamp': datetime.utcnow()
                        },
                        {
                            'MetricName': 'ActiveUsers',
                            'Value': active_users,
                            'Unit': 'Count',
                            'Timestamp': datetime.utcnow()
                        },
                        {
                            'MetricName': 'TransactionCount',
                            'Value': transaction_count,
                            'Unit': 'Count',
                            'Timestamp': datetime.utcnow()
                        }
                    ]
                )
                
                return {
                    'statusCode': 200,
                    'body': json.dumps('Metrics sent successfully')
                }
                
            except Exception as e:
                print(f"Error: {str(e)}")
                return {
                    'statusCode': 500,
                    'body': json.dumps(f'Error: {str(e)}')
                }
        
        def get_active_users():
            # Implement your logic to get active users
            return 100
        
        def get_transaction_count():
            # Implement your logic to get transaction count
            return 50

# X-Ray Tracing
XRayTracingConfig:
  Type: AWS::ECS::Service
  Properties:
    # ... other properties
    TaskDefinition: !Ref TaskDefinitionWithXRay

TaskDefinitionWithXRay:
  Type: AWS::ECS::TaskDefinition
  Properties:
    # ... other properties
    ContainerDefinitions:
      - Name: app
        # ... other properties
        Environment:
          - Name: _X_AMZN_TRACE_ID
            Value: !Ref AWS::NoValue
        DependsOn:
          - ContainerName: xray-daemon
            Condition: START
      
      - Name: xray-daemon
        Image: amazon/aws-xray-daemon:latest
        Essential: true
        PortMappings:
          - ContainerPort: 2000
            Protocol: udp
        LogConfiguration:
          LogDriver: awslogs
          Options:
            awslogs-group: !Ref XRayLogGroup
            awslogs-region: !Ref AWS::Region
            awslogs-stream-prefix: xray
```

### Q17: How do you implement cost optimization strategies in AWS?
**Difficulty: Medium**

**Answer:**
Cost optimization involves right-sizing resources, using appropriate pricing models, and implementing automated cost controls.

```python
# Cost Optimization Lambda Function
import boto3
import json
from datetime import datetime, timedelta
from typing import List, Dict, Any

def lambda_handler(event, context):
    """Main cost optimization function"""
    
    recommendations = []
    
    # EC2 Cost Optimization
    recommendations.extend(analyze_ec2_instances())
    
    # RDS Cost Optimization
    recommendations.extend(analyze_rds_instances())
    
    # S3 Cost Optimization
    recommendations.extend(analyze_s3_buckets())
    
    # EBS Cost Optimization
    recommendations.extend(analyze_ebs_volumes())
    
    # Lambda Cost Optimization
    recommendations.extend(analyze_lambda_functions())
    
    # Send recommendations
    send_cost_recommendations(recommendations)
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Cost optimization analysis completed',
            'recommendations_count': len(recommendations)
        })
    }

def analyze_ec2_instances() -> List[Dict[str, Any]]:
    """Analyze EC2 instances for cost optimization"""
    ec2 = boto3.client('ec2')
    cloudwatch = boto3.client('cloudwatch')
    
    recommendations = []
    
    # Get all running instances
    response = ec2.describe_instances(
        Filters=[
            {'Name': 'instance-state-name', 'Values': ['running']}
        ]
    )
    
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            instance_type = instance['InstanceType']
            
            # Get CPU utilization for the last 7 days
            cpu_metrics = cloudwatch.get_metric_statistics(
                Namespace='AWS/EC2',
                MetricName='CPUUtilization',
                Dimensions=[
                    {'Name': 'InstanceId', 'Value': instance_id}
                ],
                StartTime=datetime.utcnow() - timedelta(days=7),
                EndTime=datetime.utcnow(),
                Period=3600,
                Statistics=['Average']
            )
            
            if cpu_metrics['Datapoints']:
                avg_cpu = sum(dp['Average'] for dp in cpu_metrics['Datapoints']) / len(cpu_metrics['Datapoints'])
                
                # Recommend downsizing if CPU < 20%
                if avg_cpu < 20:
                    recommendations.append({
                        'type': 'EC2_DOWNSIZE',
                        'resource_id': instance_id,
                        'current_type': instance_type,
                        'recommended_action': 'Consider downsizing instance',
                        'avg_cpu_utilization': avg_cpu,
                        'potential_savings': calculate_ec2_savings(instance_type)
                    })
                
                # Recommend Spot instances for non-critical workloads
                if not has_tag(instance, 'Critical', 'true'):
                    recommendations.append({
                        'type': 'EC2_SPOT',
                        'resource_id': instance_id,
                        'current_type': instance_type,
                        'recommended_action': 'Consider using Spot instances',
                        'potential_savings': calculate_spot_savings(instance_type)
                    })
    
    return recommendations

def analyze_rds_instances() -> List[Dict[str, Any]]:
    """Analyze RDS instances for cost optimization"""
    rds = boto3.client('rds')
    cloudwatch = boto3.client('cloudwatch')
    
    recommendations = []
    
    # Get all RDS instances
    response = rds.describe_db_instances()
    
    for db_instance in response['DBInstances']:
        db_identifier = db_instance['DBInstanceIdentifier']
        db_class = db_instance['DBInstanceClass']
        
        # Get CPU utilization
        cpu_metrics = cloudwatch.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='CPUUtilization',
            Dimensions=[
                {'Name': 'DBInstanceIdentifier', 'Value': db_identifier}
            ],
            StartTime=datetime.utcnow() - timedelta(days=7),
            EndTime=datetime.utcnow(),
            Period=3600,
            Statistics=['Average']
        )
        
        # Get connection count
        connection_metrics = cloudwatch.get_metric_statistics(
            Namespace='AWS/RDS',
            MetricName='DatabaseConnections',
            Dimensions=[
                {'Name': 'DBInstanceIdentifier', 'Value': db_identifier}
            ],
            StartTime=datetime.utcnow() - timedelta(days=7),
            EndTime=datetime.utcnow(),
            Period=3600,
            Statistics=['Average']
        )
        
        if cpu_metrics['Datapoints'] and connection_metrics['Datapoints']:
            avg_cpu = sum(dp['Average'] for dp in cpu_metrics['Datapoints']) / len(cpu_metrics['Datapoints'])
            avg_connections = sum(dp['Average'] for dp in connection_metrics['Datapoints']) / len(connection_metrics['Datapoints'])
            
            # Recommend downsizing if CPU < 30% and connections < 10
            if avg_cpu < 30 and avg_connections < 10:
                recommendations.append({
                    'type': 'RDS_DOWNSIZE',
                    'resource_id': db_identifier,
                    'current_class': db_class,
                    'recommended_action': 'Consider downsizing RDS instance',
                    'avg_cpu_utilization': avg_cpu,
                    'avg_connections': avg_connections,
                    'potential_savings': calculate_rds_savings(db_class)
                })
    
    return recommendations

def analyze_s3_buckets() -> List[Dict[str, Any]]:
    """Analyze S3 buckets for cost optimization"""
    s3 = boto3.client('s3')
    cloudwatch = boto3.client('cloudwatch')
    
    recommendations = []
    
    # Get all buckets
    response = s3.list_buckets()
    
    for bucket in response['Buckets']:
        bucket_name = bucket['Name']
        
        try:
            # Check lifecycle configuration
            try:
                s3.get_bucket_lifecycle_configuration(Bucket=bucket_name)
                has_lifecycle = True
            except s3.exceptions.NoSuchLifecycleConfiguration:
                has_lifecycle = False
            
            # Get storage metrics
            storage_metrics = cloudwatch.get_metric_statistics(
                Namespace='AWS/S3',
                MetricName='BucketSizeBytes',
                Dimensions=[
                    {'Name': 'BucketName', 'Value': bucket_name},
                    {'Name': 'StorageType', 'Value': 'StandardStorage'}
                ],
                StartTime=datetime.utcnow() - timedelta(days=1),
                EndTime=datetime.utcnow(),
                Period=86400,
                Statistics=['Average']
            )
            
            if storage_metrics['Datapoints'] and not has_lifecycle:
                storage_size = storage_metrics['Datapoints'][0]['Average']
                
                # Recommend lifecycle policy for buckets > 1GB
                if storage_size > 1024**3:  # 1GB
                    recommendations.append({
                        'type': 'S3_LIFECYCLE',
                        'resource_id': bucket_name,
                        'recommended_action': 'Implement S3 lifecycle policy',
                        'storage_size_gb': storage_size / (1024**3),
                        'potential_savings': calculate_s3_lifecycle_savings(storage_size)
                    })
        
        except Exception as e:
            print(f"Error analyzing bucket {bucket_name}: {str(e)}")
    
    return recommendations

def analyze_ebs_volumes() -> List[Dict[str, Any]]:
    """Analyze EBS volumes for cost optimization"""
    ec2 = boto3.client('ec2')
    cloudwatch = boto3.client('cloudwatch')
    
    recommendations = []
    
    # Get all EBS volumes
    response = ec2.describe_volumes()
    
    for volume in response['Volumes']:
        volume_id = volume['VolumeId']
        volume_type = volume['VolumeType']
        volume_size = volume['Size']
        
        # Check if volume is attached
        if volume['State'] == 'available':
            recommendations.append({
                'type': 'EBS_UNATTACHED',
                'resource_id': volume_id,
                'recommended_action': 'Delete unattached EBS volume',
                'volume_size_gb': volume_size,
                'potential_savings': calculate_ebs_savings(volume_type, volume_size)
            })
        
        # Check IOPS utilization for gp2 volumes
        elif volume_type == 'gp2' and volume_size > 100:
            iops_metrics = cloudwatch.get_metric_statistics(
                Namespace='AWS/EBS',
                MetricName='VolumeReadOps',
                Dimensions=[
                    {'Name': 'VolumeId', 'Value': volume_id}
                ],
                StartTime=datetime.utcnow() - timedelta(days=7),
                EndTime=datetime.utcnow(),
                Period=3600,
                Statistics=['Sum']
            )
            
            if iops_metrics['Datapoints']:
                total_iops = sum(dp['Sum'] for dp in iops_metrics['Datapoints'])
                avg_iops_per_hour = total_iops / len(iops_metrics['Datapoints'])
                
                # Recommend gp3 if IOPS usage is low
                if avg_iops_per_hour < 100:
                    recommendations.append({
                        'type': 'EBS_GP3_MIGRATION',
                        'resource_id': volume_id,
                        'current_type': volume_type,
                        'recommended_action': 'Migrate from gp2 to gp3',
                        'avg_iops': avg_iops_per_hour,
                        'potential_savings': calculate_gp3_savings(volume_size)
                    })
    
    return recommendations

def analyze_lambda_functions() -> List[Dict[str, Any]]:
    """Analyze Lambda functions for cost optimization"""
    lambda_client = boto3.client('lambda')
    cloudwatch = boto3.client('cloudwatch')
    
    recommendations = []
    
    # Get all Lambda functions
    response = lambda_client.list_functions()
    
    for function in response['Functions']:
        function_name = function['FunctionName']
        memory_size = function['MemorySize']
        
        # Get duration metrics
        duration_metrics = cloudwatch.get_metric_statistics(
            Namespace='AWS/Lambda',
            MetricName='Duration',
            Dimensions=[
                {'Name': 'FunctionName', 'Value': function_name}
            ],
            StartTime=datetime.utcnow() - timedelta(days=7),
            EndTime=datetime.utcnow(),
            Period=3600,
            Statistics=['Average']
        )
        
        if duration_metrics['Datapoints']:
            avg_duration = sum(dp['Average'] for dp in duration_metrics['Datapoints']) / len(duration_metrics['Datapoints'])
            
            # Recommend memory optimization
            if avg_duration < 1000 and memory_size > 512:  # < 1 second, > 512MB
                recommendations.append({
                    'type': 'LAMBDA_MEMORY_OPTIMIZATION',
                    'resource_id': function_name,
                    'current_memory': memory_size,
                    'recommended_action': 'Consider reducing memory allocation',
                    'avg_duration_ms': avg_duration,
                    'potential_savings': calculate_lambda_savings(memory_size, avg_duration)
                })
    
    return recommendations

def send_cost_recommendations(recommendations: List[Dict[str, Any]]):
    """Send cost optimization recommendations"""
    sns = boto3.client('sns')
    
    if not recommendations:
        return
    
    # Group recommendations by type
    grouped_recommendations = {}
    total_potential_savings = 0
    
    for rec in recommendations:
        rec_type = rec['type']
        if rec_type not in grouped_recommendations:
            grouped_recommendations[rec_type] = []
        grouped_recommendations[rec_type].append(rec)
        
        if 'potential_savings' in rec:
            total_potential_savings += rec['potential_savings']
    
    # Create summary message
    message = f"""Cost Optimization Report - {datetime.utcnow().strftime('%Y-%m-%d')}

Total Potential Monthly Savings: ${total_potential_savings:.2f}

Recommendations by Category:
"""
    
    for rec_type, recs in grouped_recommendations.items():
        message += f"\n{rec_type.replace('_', ' ').title()}: {len(recs)} recommendations\n"
        for rec in recs[:5]:  # Show first 5 recommendations
            message += f"  - {rec['resource_id']}: {rec['recommended_action']}\n"
        if len(recs) > 5:
            message += f"  ... and {len(recs) - 5} more\n"
    
    # Send notification
    sns.publish(
        TopicArn=os.environ['COST_OPTIMIZATION_TOPIC'],
        Subject='AWS Cost Optimization Recommendations',
        Message=message
    )

# Helper functions for calculating savings
def calculate_ec2_savings(instance_type: str) -> float:
    """Calculate potential EC2 savings"""
    # Simplified calculation - in reality, use AWS Pricing API
    pricing_map = {
        't3.micro': 8.47,
        't3.small': 16.94,
        't3.medium': 33.89,
        't3.large': 67.78,
        'm5.large': 87.60,
        'm5.xlarge': 175.20
    }
    return pricing_map.get(instance_type, 50) * 0.3  # 30% savings estimate

def calculate_spot_savings(instance_type: str) -> float:
    """Calculate Spot instance savings"""
    # Spot instances typically save 70-90%
    return calculate_ec2_savings(instance_type) * 0.8

def calculate_rds_savings(db_class: str) -> float:
    """Calculate RDS savings"""
    # Simplified RDS pricing
    return 100.0  # Placeholder

def calculate_s3_lifecycle_savings(storage_size: float) -> float:
    """Calculate S3 lifecycle savings"""
    # Assume 50% of data can be moved to IA after 30 days
    monthly_cost = (storage_size / (1024**3)) * 0.023  # $0.023 per GB
    return monthly_cost * 0.5 * 0.6  # 50% data, 60% savings

def calculate_ebs_savings(volume_type: str, volume_size: int) -> float:
    """Calculate EBS savings"""
    if volume_type == 'gp2':
        return volume_size * 0.10  # $0.10 per GB per month
    return volume_size * 0.08

def calculate_gp3_savings(volume_size: int) -> float:
    """Calculate gp3 migration savings"""
    return volume_size * 0.02  # $0.02 per GB savings

def calculate_lambda_savings(memory_size: int, avg_duration: float) -> float:
    """Calculate Lambda memory optimization savings"""
    return (memory_size - 256) * 0.0000166667 * (avg_duration / 1000) * 30 * 24 * 60  # Simplified

def has_tag(instance: Dict, key: str, value: str) -> bool:
    """Check if instance has specific tag"""
    tags = instance.get('Tags', [])
    for tag in tags:
        if tag['Key'] == key and tag['Value'] == value:
            return True
    return False
 ```

### Q18: How do you implement disaster recovery and backup strategies in AWS?
**Difficulty: Hard**

**Answer:**
Disaster recovery ensures business continuity through automated backups, cross-region replication, and failover mechanisms.

```yaml
# Multi-Region Disaster Recovery Setup
PrimaryRegionStack:
  Type: AWS::CloudFormation::Stack
  Properties:
    TemplateURL: !Sub 'https://${TemplatesBucket}.s3.amazonaws.com/primary-region.yaml'
    Parameters:
      Environment: !Ref Environment
      IsSecondaryRegion: false

SecondaryRegionStack:
  Type: AWS::CloudFormation::Stack
  Condition: CreateSecondaryRegion
  Properties:
    TemplateURL: !Sub 'https://${TemplatesBucket}.s3.amazonaws.com/secondary-region.yaml'
    Parameters:
      Environment: !Ref Environment
      IsSecondaryRegion: true
      PrimaryRegion: !Ref AWS::Region

# RDS with Cross-Region Backup
PrimaryDatabase:
  Type: AWS::RDS::DBInstance
  Properties:
    DBInstanceIdentifier: !Sub '${Environment}-primary-db'
    Engine: postgres
    EngineVersion: '13.7'
    DBInstanceClass: db.t3.medium
    AllocatedStorage: 100
    StorageType: gp2
    StorageEncrypted: true
    KmsKeyId: !Ref DatabaseKMSKey
    VPCSecurityGroups:
      - !Ref DatabaseSecurityGroup
    DBSubnetGroupName: !Ref DatabaseSubnetGroup
    BackupRetentionPeriod: 30
    PreferredBackupWindow: '03:00-04:00'
    PreferredMaintenanceWindow: 'sun:04:00-sun:05:00'
    DeletionProtection: true
    EnablePerformanceInsights: true
    MonitoringInterval: 60
    MonitoringRoleArn: !GetAtt RDSEnhancedMonitoringRole.Arn
    Tags:
      - Key: Environment
        Value: !Ref Environment
      - Key: BackupRequired
        Value: 'true'

# Cross-Region Read Replica
ReadReplica:
  Type: AWS::RDS::DBInstance
  Condition: CreateReadReplica
  Properties:
    DBInstanceIdentifier: !Sub '${Environment}-replica-db'
    SourceDBInstanceIdentifier: !Sub 'arn:aws:rds:${AWS::Region}:${AWS::AccountId}:db:${PrimaryDatabase}'
    DBInstanceClass: db.t3.medium
    PubliclyAccessible: false
    Tags:
      - Key: Environment
        Value: !Ref Environment
      - Key: Role
        Value: ReadReplica

# S3 Cross-Region Replication
PrimaryBucket:
  Type: AWS::S3::Bucket
  Properties:
    BucketName: !Sub '${Environment}-primary-data-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    ReplicationConfiguration:
      Role: !GetAtt S3ReplicationRole.Arn
      Rules:
        - Id: ReplicateToSecondaryRegion
          Status: Enabled
          Prefix: ''
          Destination:
            Bucket: !Sub 'arn:aws:s3:::${Environment}-secondary-data-${AWS::AccountId}'
            StorageClass: STANDARD_IA
            EncryptionConfiguration:
              ReplicaKmsKeyID: !Sub 'arn:aws:kms:${SecondaryRegion}:${AWS::AccountId}:key/${SecondaryRegionKMSKey}'
    NotificationConfiguration:
      CloudWatchConfigurations:
        - Event: s3:ObjectCreated:*
          CloudWatchConfiguration:
            LogGroupName: !Ref S3AccessLogGroup
    BucketEncryption:
      ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: aws:kms
            KMSMasterKeyID: !Ref S3KMSKey

SecondaryBucket:
  Type: AWS::S3::Bucket
  Condition: CreateSecondaryRegion
  Properties:
    BucketName: !Sub '${Environment}-secondary-data-${AWS::AccountId}'
    VersioningConfiguration:
      Status: Enabled
    BucketEncryption:
      ServerSideEncryptionConfiguration:
        - ServerSideEncryptionByDefault:
            SSEAlgorithm: aws:kms
            KMSMasterKeyID: !Ref SecondaryRegionKMSKey

# Route 53 Health Checks and Failover
PrimaryHealthCheck:
  Type: AWS::Route53::HealthCheck
  Properties:
    Type: HTTPS
    ResourcePath: /health
    FullyQualifiedDomainName: !GetAtt PrimaryLoadBalancer.DNSName
    Port: 443
    RequestInterval: 30
    FailureThreshold: 3
    Tags:
      - Key: Name
        Value: !Sub '${Environment}-primary-health-check'

DNSRecord:
  Type: AWS::Route53::RecordSet
  Properties:
    HostedZoneId: !Ref HostedZone
    Name: !Sub '${Environment}.${DomainName}'
    Type: A
    SetIdentifier: Primary
    Failover: PRIMARY
    TTL: 60
    ResourceRecords:
      - !GetAtt PrimaryLoadBalancer.DNSName
    HealthCheckId: !Ref PrimaryHealthCheck

SecondaryDNSRecord:
  Type: AWS::Route53::RecordSet
  Condition: CreateSecondaryRegion
  Properties:
    HostedZoneId: !Ref HostedZone
    Name: !Sub '${Environment}.${DomainName}'
    Type: A
    SetIdentifier: Secondary
    Failover: SECONDARY
    TTL: 60
    ResourceRecords:
      - !GetAtt SecondaryLoadBalancer.DNSName
```

```python
# Automated Backup and Recovery Lambda
import boto3
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any

def lambda_handler(event, context):
    """Automated backup and recovery orchestration"""
    
    action = event.get('action', 'backup')
    
    if action == 'backup':
        return perform_backup(event)
    elif action == 'restore':
        return perform_restore(event)
    elif action == 'failover':
        return perform_failover(event)
    else:
        raise ValueError(f"Unknown action: {action}")

def perform_backup(event: Dict[str, Any]) -> Dict[str, Any]:
    """Perform comprehensive backup"""
    
    results = {
        'timestamp': datetime.utcnow().isoformat(),
        'backups': []
    }
    
    # RDS Snapshots
    rds_results = backup_rds_instances()
    results['backups'].extend(rds_results)
    
    # EBS Snapshots
    ebs_results = backup_ebs_volumes()
    results['backups'].extend(ebs_results)
    
    # DynamoDB Backups
    dynamodb_results = backup_dynamodb_tables()
    results['backups'].extend(dynamodb_results)
    
    # S3 Sync to Glacier
    s3_results = archive_s3_data()
    results['backups'].extend(s3_results)
    
    # Send notification
    send_backup_notification(results)
    
    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }

def backup_rds_instances() -> List[Dict[str, Any]]:
    """Create RDS snapshots"""
    rds = boto3.client('rds')
    results = []
    
    # Get all RDS instances
    response = rds.describe_db_instances()
    
    for db_instance in response['DBInstances']:
        db_identifier = db_instance['DBInstanceIdentifier']
        
        # Skip read replicas
        if 'ReadReplicaDBInstanceIdentifiers' in db_instance:
            continue
            
        snapshot_id = f"{db_identifier}-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}"
        
        try:
            snapshot_response = rds.create_db_snapshot(
                DBSnapshotIdentifier=snapshot_id,
                DBInstanceIdentifier=db_identifier,
                Tags=[
                    {'Key': 'CreatedBy', 'Value': 'AutomatedBackup'},
                    {'Key': 'CreatedAt', 'Value': datetime.utcnow().isoformat()},
                    {'Key': 'RetentionDays', 'Value': '30'}
                ]
            )
            
            results.append({
                'type': 'RDS_SNAPSHOT',
                'resource_id': db_identifier,
                'snapshot_id': snapshot_id,
                'status': 'INITIATED',
                'arn': snapshot_response['DBSnapshot']['DBSnapshotArn']
            })
            
        except Exception as e:
            results.append({
                'type': 'RDS_SNAPSHOT',
                'resource_id': db_identifier,
                'status': 'FAILED',
                'error': str(e)
            })
    
    return results

def backup_ebs_volumes() -> List[Dict[str, Any]]:
    """Create EBS snapshots"""
    ec2 = boto3.client('ec2')
    results = []
    
    # Get all EBS volumes
    response = ec2.describe_volumes(
        Filters=[
            {'Name': 'state', 'Values': ['in-use']}
        ]
    )
    
    for volume in response['Volumes']:
        volume_id = volume['VolumeId']
        
        # Get instance information
        instance_id = None
        if volume['Attachments']:
            instance_id = volume['Attachments'][0]['InstanceId']
        
        description = f"Automated snapshot of {volume_id}"
        if instance_id:
            description += f" from instance {instance_id}"
        
        try:
            snapshot_response = ec2.create_snapshot(
                VolumeId=volume_id,
                Description=description,
                TagSpecifications=[
                    {
                        'ResourceType': 'snapshot',
                        'Tags': [
                            {'Key': 'Name', 'Value': f'{volume_id}-{datetime.utcnow().strftime("%Y%m%d-%H%M%S")}'},
                            {'Key': 'CreatedBy', 'Value': 'AutomatedBackup'},
                            {'Key': 'SourceVolumeId', 'Value': volume_id},
                            {'Key': 'CreatedAt', 'Value': datetime.utcnow().isoformat()}
                        ]
                    }
                ]
            )
            
            results.append({
                'type': 'EBS_SNAPSHOT',
                'resource_id': volume_id,
                'snapshot_id': snapshot_response['SnapshotId'],
                'status': 'INITIATED'
            })
            
        except Exception as e:
            results.append({
                'type': 'EBS_SNAPSHOT',
                'resource_id': volume_id,
                'status': 'FAILED',
                'error': str(e)
            })
    
    return results

def backup_dynamodb_tables() -> List[Dict[str, Any]]:
    """Create DynamoDB backups"""
    dynamodb = boto3.client('dynamodb')
    results = []
    
    # Get all tables
    response = dynamodb.list_tables()
    
    for table_name in response['TableNames']:
        backup_name = f"{table_name}-{datetime.utcnow().strftime('%Y%m%d-%H%M%S')}"
        
        try:
            backup_response = dynamodb.create_backup(
                TableName=table_name,
                BackupName=backup_name
            )
            
            results.append({
                'type': 'DYNAMODB_BACKUP',
                'resource_id': table_name,
                'backup_arn': backup_response['BackupDetails']['BackupArn'],
                'status': 'INITIATED'
            })
            
        except Exception as e:
            results.append({
                'type': 'DYNAMODB_BACKUP',
                'resource_id': table_name,
                'status': 'FAILED',
                'error': str(e)
            })
    
    return results

def archive_s3_data() -> List[Dict[str, Any]]:
    """Archive S3 data to Glacier"""
    s3 = boto3.client('s3')
    results = []
    
    # Get buckets with backup tag
    response = s3.list_buckets()
    
    for bucket in response['Buckets']:
        bucket_name = bucket['Name']
        
        try:
            # Check if bucket has backup tag
            tags_response = s3.get_bucket_tagging(Bucket=bucket_name)
            backup_required = False
            
            for tag in tags_response.get('TagSet', []):
                if tag['Key'] == 'BackupRequired' and tag['Value'] == 'true':
                    backup_required = True
                    break
            
            if not backup_required:
                continue
            
            # Apply lifecycle policy for archiving
            lifecycle_config = {
                'Rules': [
                    {
                        'ID': 'ArchiveOldObjects',
                        'Status': 'Enabled',
                        'Filter': {'Prefix': ''},
                        'Transitions': [
                            {
                                'Days': 30,
                                'StorageClass': 'STANDARD_IA'
                            },
                            {
                                'Days': 90,
                                'StorageClass': 'GLACIER'
                            },
                            {
                                'Days': 365,
                                'StorageClass': 'DEEP_ARCHIVE'
                            }
                        ]
                    }
                ]
            }
            
            s3.put_bucket_lifecycle_configuration(
                Bucket=bucket_name,
                LifecycleConfiguration=lifecycle_config
            )
            
            results.append({
                'type': 'S3_LIFECYCLE',
                'resource_id': bucket_name,
                'status': 'CONFIGURED'
            })
            
        except Exception as e:
            results.append({
                'type': 'S3_LIFECYCLE',
                'resource_id': bucket_name,
                'status': 'FAILED',
                'error': str(e)
            })
    
    return results

def perform_failover(event: Dict[str, Any]) -> Dict[str, Any]:
    """Perform automated failover to secondary region"""
    
    route53 = boto3.client('route53')
    rds = boto3.client('rds')
    
    results = {
        'timestamp': datetime.utcnow().isoformat(),
        'failover_actions': []
    }
    
    try:
        # Promote read replica to primary
        replica_identifier = event.get('replica_identifier')
        if replica_identifier:
            rds.promote_read_replica(
                DBInstanceIdentifier=replica_identifier
            )
            
            results['failover_actions'].append({
                'action': 'PROMOTE_READ_REPLICA',
                'resource_id': replica_identifier,
                'status': 'INITIATED'
            })
        
        # Update Route 53 records for failover
        hosted_zone_id = event.get('hosted_zone_id')
        secondary_endpoint = event.get('secondary_endpoint')
        
        if hosted_zone_id and secondary_endpoint:
            route53.change_resource_record_sets(
                HostedZoneId=hosted_zone_id,
                ChangeBatch={
                    'Changes': [
                        {
                            'Action': 'UPSERT',
                            'ResourceRecordSet': {
                                'Name': event.get('domain_name'),
                                'Type': 'A',
                                'SetIdentifier': 'Failover',
                                'Failover': 'PRIMARY',
                                'TTL': 60,
                                'ResourceRecords': [
                                    {'Value': secondary_endpoint}
                                ]
                            }
                        }
                    ]
                }
            )
            
            results['failover_actions'].append({
                'action': 'UPDATE_DNS',
                'resource_id': hosted_zone_id,
                'status': 'COMPLETED'
            })
        
        # Send failover notification
        send_failover_notification(results)
        
    except Exception as e:
        results['failover_actions'].append({
            'action': 'FAILOVER',
            'status': 'FAILED',
            'error': str(e)
        })
    
    return {
        'statusCode': 200,
        'body': json.dumps(results)
    }

def send_backup_notification(results: Dict[str, Any]):
    """Send backup completion notification"""
    sns = boto3.client('sns')
    
    successful_backups = [b for b in results['backups'] if b['status'] in ['INITIATED', 'COMPLETED', 'CONFIGURED']]
    failed_backups = [b for b in results['backups'] if b['status'] == 'FAILED']
    
    message = f"""Backup Report - {results['timestamp']}

Successful Backups: {len(successful_backups)}
Failed Backups: {len(failed_backups)}

Details:
"""
    
    for backup in results['backups']:
        status_emoji = "✅" if backup['status'] != 'FAILED' else "❌"
        message += f"{status_emoji} {backup['type']}: {backup['resource_id']} - {backup['status']}\n"
    
    sns.publish(
        TopicArn=os.environ['BACKUP_NOTIFICATION_TOPIC'],
        Subject=f"Backup Report - {len(failed_backups)} failures",
        Message=message
    )

def send_failover_notification(results: Dict[str, Any]):
    """Send failover notification"""
    sns = boto3.client('sns')
    
    message = f"""🚨 FAILOVER INITIATED - {results['timestamp']}

Failover actions performed:
"""
    
    for action in results['failover_actions']:
        status_emoji = "✅" if action['status'] != 'FAILED' else "❌"
        message += f"{status_emoji} {action['action']}: {action.get('resource_id', 'N/A')} - {action['status']}\n"
    
    sns.publish(
        TopicArn=os.environ['CRITICAL_ALERTS_TOPIC'],
        Subject='🚨 DISASTER RECOVERY FAILOVER INITIATED',
        Message=message
    )
```

### Q19: How do you implement advanced security with AWS WAF, GuardDuty, and Security Hub?
**Difficulty: Hard**

**Answer:**
Advanced security requires multiple layers of protection including web application firewalls, threat detection, and centralized security monitoring.

```yaml
# AWS WAF v2 Configuration
WebACL:
  Type: AWS::WAFv2::WebACL
  Properties:
    Name: !Sub '${Environment}-web-acl'
    Scope: REGIONAL
    DefaultAction:
      Allow: {}
    Rules:
      # AWS Managed Rules - Core Rule Set
      - Name: AWSManagedRulesCommonRuleSet
        Priority: 1
        OverrideAction:
          None: {}
        Statement:
          ManagedRuleGroupStatement:
            VendorName: AWS
            Name: AWSManagedRulesCommonRuleSet
            ExcludedRules:
              - Name: SizeRestrictions_BODY
              - Name: GenericRFI_BODY
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: CommonRuleSetMetric
      
      # AWS Managed Rules - Known Bad Inputs
      - Name: AWSManagedRulesKnownBadInputsRuleSet
        Priority: 2
        OverrideAction:
          None: {}
        Statement:
          ManagedRuleGroupStatement:
            VendorName: AWS
            Name: AWSManagedRulesKnownBadInputsRuleSet
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: KnownBadInputsMetric
      
      # Rate Limiting Rule
      - Name: RateLimitRule
        Priority: 3
        Action:
          Block: {}
        Statement:
          RateBasedStatement:
            Limit: 2000
            AggregateKeyType: IP
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: RateLimitMetric
      
      # Geo Blocking Rule
      - Name: GeoBlockRule
        Priority: 4
        Action:
          Block: {}
        Statement:
          GeoMatchStatement:
            CountryCodes:
              - CN
              - RU
              - KP
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: GeoBlockMetric
      
      # Custom SQL Injection Rule
      - Name: CustomSQLiRule
        Priority: 5
        Action:
          Block: {}
        Statement:
          SqliMatchStatement:
            FieldToMatch:
              AllQueryArguments: {}
            TextTransformations:
              - Priority: 0
                Type: URL_DECODE
              - Priority: 1
                Type: HTML_ENTITY_DECODE
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: SQLiMetric
      
      # IP Whitelist Rule
      - Name: IPWhitelistRule
        Priority: 6
        Action:
          Allow: {}
        Statement:
          IPSetReferenceStatement:
            Arn: !GetAtt TrustedIPSet.Arn
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: IPWhitelistMetric
    
    VisibilityConfig:
      SampledRequestsEnabled: true
      CloudWatchMetricsEnabled: true
      MetricName: !Sub '${Environment}WebACL'
    
    Tags:
      - Key: Environment
        Value: !Ref Environment
      - Key: Purpose
        Value: WebApplicationFirewall

# Trusted IP Set
TrustedIPSet:
  Type: AWS::WAFv2::IPSet
  Properties:
    Name: !Sub '${Environment}-trusted-ips'
    Scope: REGIONAL
    IPAddressVersion: IPV4
    Addresses:
      - 203.0.113.0/24  # Office IP range
      - 198.51.100.0/24  # VPN IP range
    Tags:
      - Key: Environment
        Value: !Ref Environment

# Associate WAF with Load Balancer
WebACLAssociation:
  Type: AWS::WAFv2::WebACLAssociation
  Properties:
    ResourceArn: !Ref LoadBalancer
    WebACLArn: !GetAtt WebACL.Arn

# GuardDuty Detector
GuardDutyDetector:
  Type: AWS::GuardDuty::Detector
  Properties:
    Enable: true
    FindingPublishingFrequency: FIFTEEN_MINUTES
    DataSources:
      S3Logs:
        Enable: true
      KubernetesConfiguration:
        AuditLogs:
          Enable: true
      MalwareProtection:
        ScanEc2InstanceWithFindings:
          EbsVolumes: true
    Tags:
      - Key: Environment
        Value: !Ref Environment

# GuardDuty Threat Intel Set
ThreatIntelSet:
  Type: AWS::GuardDuty::ThreatIntelSet
  Properties:
    Activate: true
    DetectorId: !Ref GuardDutyDetector
    Format: TXT
    Location: !Sub 's3://${ThreatIntelBucket}/threat-intel.txt'
    Name: !Sub '${Environment}-threat-intel'

# Security Hub
SecurityHub:
  Type: AWS::SecurityHub::Hub
  Properties:
    Tags:
      Environment: !Ref Environment

# Config Configuration Recorder
ConfigurationRecorder:
  Type: AWS::Config::ConfigurationRecorder
  Properties:
    Name: !Sub '${Environment}-config-recorder'
    RoleARN: !GetAtt ConfigRole.Arn
    RecordingGroup:
      AllSupported: true
      IncludeGlobalResourceTypes: true
      ResourceTypes: []

# Config Delivery Channel
DeliveryChannel:
  Type: AWS::Config::DeliveryChannel
  Properties:
    Name: !Sub '${Environment}-delivery-channel'
    S3BucketName: !Ref ConfigBucket
    S3KeyPrefix: config
    ConfigSnapshotDeliveryProperties:
      DeliveryFrequency: Daily

# Config Rules
S3BucketPublicAccessProhibited:
  Type: AWS::Config::ConfigRule
  DependsOn: ConfigurationRecorder
  Properties:
    ConfigRuleName: s3-bucket-public-access-prohibited
    Source:
      Owner: AWS
      SourceIdentifier: S3_BUCKET_PUBLIC_ACCESS_PROHIBITED

RootAccessKeyCheck:
  Type: AWS::Config::ConfigRule
  DependsOn: ConfigurationRecorder
  Properties:
    ConfigRuleName: root-access-key-check
    Source:
      Owner: AWS
      SourceIdentifier: ROOT_ACCESS_KEY_CHECK

EncryptedVolumes:
  Type: AWS::Config::ConfigRule
  DependsOn: ConfigurationRecorder
  Properties:
    ConfigRuleName: encrypted-volumes
    Source:
      Owner: AWS
      SourceIdentifier: ENCRYPTED_VOLUMES
```

```python
# Security Automation Lambda
import boto3
import json
from datetime import datetime
from typing import Dict, List, Any

def lambda_handler(event, context):
    """Handle security events and automate responses"""
    
    event_source = event.get('source')
    
    if event_source == 'aws.guardduty':
        return handle_guardduty_finding(event)
    elif event_source == 'aws.securityhub':
        return handle_security_hub_finding(event)
    elif event_source == 'aws.config':
        return handle_config_compliance(event)
    elif event_source == 'aws.wafv2':
        return handle_waf_event(event)
    else:
        print(f"Unknown event source: {event_source}")
        return {'statusCode': 200}

def handle_guardduty_finding(event: Dict[str, Any]) -> Dict[str, Any]:
    """Handle GuardDuty security findings"""
    
    detail = event['detail']
    finding_type = detail['type']
    severity = detail['severity']
    
    response_actions = []
    
    # High severity findings require immediate action
    if severity >= 7.0:
        response_actions.extend(handle_high_severity_finding(detail))
    
    # Specific finding type responses
    if 'Backdoor' in finding_type:
        response_actions.extend(handle_backdoor_finding(detail))
    elif 'CryptoCurrency' in finding_type:
        response_actions.extend(handle_crypto_mining(detail))
    elif 'Malware' in finding_type:
        response_actions.extend(handle_malware_finding(detail))
    elif 'UnauthorizedAPICall' in finding_type:
        response_actions.extend(handle_unauthorized_api_call(detail))
    
    # Send notification
    send_security_notification({
        'type': 'GuardDuty Finding',
        'finding_type': finding_type,
        'severity': severity,
        'actions_taken': response_actions,
        'details': detail
    })
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'actions_taken': len(response_actions),
            'response_actions': response_actions
        })
    }

def handle_high_severity_finding(detail: Dict[str, Any]) -> List[str]:
    """Handle high severity security findings"""
    actions = []
    
    # Get affected resource
    service = detail.get('service', {})
    resource_role = service.get('resourceRole')
    
    if resource_role == 'TARGET':
        # Instance is compromised
        instance_id = service.get('remoteIpDetails', {}).get('instanceId')
        if instance_id:
            actions.extend(isolate_instance(instance_id))
    
    # Create support case for high severity
    actions.append(create_support_case(detail))
    
    return actions

def handle_backdoor_finding(detail: Dict[str, Any]) -> List[str]:
    """Handle backdoor detection"""
    actions = []
    
    # Block malicious IPs
    remote_ip = detail.get('service', {}).get('remoteIpDetails', {}).get('ipAddressV4')
    if remote_ip:
        actions.append(block_ip_in_waf(remote_ip))
        actions.append(block_ip_in_nacl(remote_ip))
    
    # Isolate affected instance
    instance_id = detail.get('service', {}).get('resourceRole')
    if instance_id:
        actions.extend(isolate_instance(instance_id))
    
    return actions

def handle_crypto_mining(detail: Dict[str, Any]) -> List[str]:
    """Handle cryptocurrency mining detection"""
    actions = []
    
    # Block mining pool IPs
    remote_ip = detail.get('service', {}).get('remoteIpDetails', {}).get('ipAddressV4')
    if remote_ip:
        actions.append(block_ip_in_waf(remote_ip))
    
    # Check for unauthorized processes
    instance_id = detail.get('service', {}).get('resourceRole')
    if instance_id:
        actions.append(f"Initiated process scan on instance {instance_id}")
    
    return actions

def isolate_instance(instance_id: str) -> List[str]:
    """Isolate compromised EC2 instance"""
    ec2 = boto3.client('ec2')
    actions = []
    
    try:
        # Create isolation security group
        vpc_response = ec2.describe_instances(InstanceIds=[instance_id])
        vpc_id = vpc_response['Reservations'][0]['Instances'][0]['VpcId']
        
        isolation_sg = ec2.create_security_group(
            GroupName=f'isolation-{instance_id}-{int(datetime.utcnow().timestamp())}',
            Description=f'Isolation security group for compromised instance {instance_id}',
            VpcId=vpc_id,
            TagSpecifications=[
                {
                    'ResourceType': 'security-group',
                    'Tags': [
                        {'Key': 'Purpose', 'Value': 'SecurityIsolation'},
                        {'Key': 'InstanceId', 'Value': instance_id},
                        {'Key': 'CreatedBy', 'Value': 'SecurityAutomation'}
                    ]
                }
            ]
        )
        
        # Apply isolation security group
        ec2.modify_instance_attribute(
            InstanceId=instance_id,
            Groups=[isolation_sg['GroupId']]
        )
        
        actions.append(f"Isolated instance {instance_id} with security group {isolation_sg['GroupId']}")
        
        # Create snapshot for forensics
        volumes_response = ec2.describe_volumes(
            Filters=[
                {'Name': 'attachment.instance-id', 'Values': [instance_id]}
            ]
        )
        
        for volume in volumes_response['Volumes']:
            snapshot_response = ec2.create_snapshot(
                VolumeId=volume['VolumeId'],
                Description=f'Forensic snapshot of {volume["VolumeId"]} from compromised instance {instance_id}',
                TagSpecifications=[
                    {
                        'ResourceType': 'snapshot',
                        'Tags': [
                            {'Key': 'Purpose', 'Value': 'ForensicAnalysis'},
                            {'Key': 'SourceInstance', 'Value': instance_id},
                            {'Key': 'CreatedBy', 'Value': 'SecurityAutomation'}
                        ]
                    }
                ]
            )
            actions.append(f"Created forensic snapshot {snapshot_response['SnapshotId']}")
        
    except Exception as e:
        actions.append(f"Failed to isolate instance {instance_id}: {str(e)}")
    
    return actions

def block_ip_in_waf(ip_address: str) -> str:
    """Block IP address in WAF"""
    wafv2 = boto3.client('wafv2')
    
    try:
        # Get existing blocked IPs set
        ip_set_name = 'blocked-ips'
        
        # Add IP to blocked set
        wafv2.update_ip_set(
            Scope='REGIONAL',
            Id=ip_set_name,
            Addresses=[ip_address],
            LockToken='update-token'
        )
        
        return f"Blocked IP {ip_address} in WAF"
        
    except Exception as e:
        return f"Failed to block IP {ip_address} in WAF: {str(e)}"

def block_ip_in_nacl(ip_address: str) -> str:
    """Block IP address in Network ACL"""
    ec2 = boto3.client('ec2')
    
    try:
        # Find default NACL
        nacls_response = ec2.describe_network_acls(
            Filters=[
                {'Name': 'default', 'Values': ['true']}
            ]
        )
        
        for nacl in nacls_response['NetworkAcls']:
            # Add deny rule
            ec2.create_network_acl_entry(
                NetworkAclId=nacl['NetworkAclId'],
                RuleNumber=1,
                Protocol='-1',
                RuleAction='deny',
                CidrBlock=f'{ip_address}/32'
            )
        
        return f"Blocked IP {ip_address} in Network ACL"
        
    except Exception as e:
        return f"Failed to block IP {ip_address} in NACL: {str(e)}"

def create_support_case(detail: Dict[str, Any]) -> str:
    """Create AWS Support case for security incident"""
    support = boto3.client('support')
    
    try:
        case_response = support.create_case(
            subject=f"Security Incident: {detail['type']}",
            serviceCode='security',
            severityCode='high',
            categoryCode='security',
            communicationBody=f"""Automated security incident report:
            
Finding Type: {detail['type']}
Severity: {detail['severity']}
Description: {detail['description']}
Time: {detail['updatedAt']}
            
This case was created automatically by our security automation system.
            Please investigate this security incident.
            """,
            ccEmailAddresses=[
                os.environ.get('SECURITY_EMAIL', 'security@company.com')
            ],
            language='en'
        )
        
        return f"Created support case {case_response['caseId']}"
        
    except Exception as e:
        return f"Failed to create support case: {str(e)}"

def send_security_notification(incident: Dict[str, Any]):
    """Send security incident notification"""
    sns = boto3.client('sns')
    
    severity_emoji = {
        'LOW': '🟡',
        'MEDIUM': '🟠', 
        'HIGH': '🔴',
        'CRITICAL': '🚨'
    }
    
    severity = 'HIGH' if incident.get('severity', 0) >= 7.0 else 'MEDIUM'
    emoji = severity_emoji.get(severity, '⚠️')
    
    message = f"""{emoji} SECURITY ALERT - {incident['type']}

Finding Type: {incident['finding_type']}
Severity: {incident['severity']}
Actions Taken: {len(incident['actions_taken'])}

Automated Response Actions:
"""
    
    for action in incident['actions_taken']:
        message += f"• {action}\n"
    
    message += f"\nTimestamp: {datetime.utcnow().isoformat()}"
    
    sns.publish(
        TopicArn=os.environ['SECURITY_ALERTS_TOPIC'],
        Subject=f"{emoji} Security Alert: {incident['finding_type']}",
        Message=message
    )
```

### Q20: How do you implement multi-account governance with AWS Organizations and Control Tower?
**Difficulty: Hard**

**Answer:**
Multi-account governance provides centralized management, security controls, and compliance across multiple AWS accounts.

```yaml
# AWS Organizations Setup
Organization:
  Type: AWS::Organizations::Organization
  Properties:
    FeatureSet: ALL
    EnabledPolicyTypes:
      - SERVICE_CONTROL_POLICY
      - TAG_POLICY
      - BACKUP_POLICY
      - AISERVICES_OPT_OUT_POLICY

# Organizational Units
SecurityOU:
  Type: AWS::Organizations::OrganizationalUnit
  Properties:
    Name: Security
    ParentId: !GetAtt Organization.RootId
    Tags:
      - Key: Purpose
        Value: SecurityAccounts

ProductionOU:
  Type: AWS::Organizations::OrganizationalUnit
  Properties:
    Name: Production
    ParentId: !GetAtt Organization.RootId
    Tags:
      - Key: Environment
        Value: Production

DevelopmentOU:
  Type: AWS::Organizations::OrganizationalUnit
  Properties:
    Name: Development
    ParentId: !GetAtt Organization.RootId
    Tags:
      - Key: Environment
        Value: Development

SandboxOU:
  Type: AWS::Organizations::OrganizationalUnit
  Properties:
    Name: Sandbox
    ParentId: !GetAtt Organization.RootId
    Tags:
      - Key: Environment
        Value: Sandbox

# Service Control Policies
DenyRootUserPolicy:
  Type: AWS::Organizations::Policy
  Properties:
    Name: DenyRootUserAccess
    Description: Deny root user access except for specific actions
    Type: SERVICE_CONTROL_POLICY
    Content: |
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "DenyRootUserAccess",
            "Effect": "Deny",
            "Principal": {
              "AWS": "*"
            },
            "Action": "*",
            "Resource": "*",
            "Condition": {
              "StringEquals": {
                "aws:PrincipalType": "Root"
              },
              "StringNotEquals": {
                "aws:RequestedRegion": [
                  "us-east-1",
                  "us-west-2"
                ]
              }
            }
          }
        ]
      }
    TargetIds:
      - !Ref ProductionOU
      - !Ref DevelopmentOU

DenyHighRiskServicesPolicy:
  Type: AWS::Organizations::Policy
  Properties:
    Name: DenyHighRiskServices
    Description: Deny access to high-risk services in development accounts
    Type: SERVICE_CONTROL_POLICY
    Content: |
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "DenyHighRiskServices",
            "Effect": "Deny",
            "Action": [
              "organizations:*",
              "account:*",
              "aws-portal:*",
              "trustedadvisor:*",
              "support:*",
              "directconnect:*",
              "route53domains:*",
              "route53resolver:*"
            ],
            "Resource": "*"
          },
          {
            "Sid": "DenyRegionRestriction",
            "Effect": "Deny",
            "NotAction": [
              "iam:*",
              "organizations:*",
              "route53:*",
              "cloudfront:*",
              "waf:*",
              "support:*",
              "trustedadvisor:*"
            ],
            "Resource": "*",
            "Condition": {
              "StringNotEquals": {
                "aws:RequestedRegion": [
                  "us-east-1",
                  "us-west-2",
                  "eu-west-1"
                ]
              }
            }
          }
        ]
      }
    TargetIds:
      - !Ref DevelopmentOU
      - !Ref SandboxOU

RequireEncryptionPolicy:
  Type: AWS::Organizations::Policy
  Properties:
    Name: RequireEncryption
    Description: Require encryption for S3 and EBS
    Type: SERVICE_CONTROL_POLICY
    Content: |
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "RequireS3Encryption",
            "Effect": "Deny",
            "Action": [
              "s3:PutObject"
            ],
            "Resource": "*",
            "Condition": {
              "StringNotEquals": {
                "s3:x-amz-server-side-encryption": [
                  "AES256",
                  "aws:kms"
                ]
              }
            }
          },
          {
            "Sid": "RequireEBSEncryption",
            "Effect": "Deny",
            "Action": [
              "ec2:CreateVolume"
            ],
            "Resource": "*",
            "Condition": {
              "Bool": {
                "ec2:Encrypted": "false"
              }
            }
          }
        ]
      }
    TargetIds:
      - !Ref ProductionOU
      - !Ref DevelopmentOU

# Tag Policies
RequiredTagsPolicy:
  Type: AWS::Organizations::Policy
  Properties:
    Name: RequiredTags
    Description: Require specific tags on resources
    Type: TAG_POLICY
    Content: |
      {
        "tags": {
          "Environment": {
            "tag_key": {
              "@@assign": "Environment"
            },
            "tag_value": {
              "@@assign": [
                "Production",
                "Development",
                "Staging",
                "Sandbox"
              ]
            },
            "enforced_for": {
              "@@assign": [
                "ec2:instance",
                "s3:bucket",
                "rds:db",
                "lambda:function"
              ]
            }
          },
          "Owner": {
            "tag_key": {
              "@@assign": "Owner"
            },
            "enforced_for": {
              "@@assign": [
                "ec2:instance",
                "s3:bucket",
                "rds:db"
              ]
            }
          },
          "CostCenter": {
            "tag_key": {
              "@@assign": "CostCenter"
            },
            "enforced_for": {
              "@@assign": [
                "ec2:instance",
                "rds:db",
                "lambda:function"
              ]
            }
          }
        }
      }
    TargetIds:
      - !Ref ProductionOU
      - !Ref DevelopmentOU

# Control Tower Landing Zone
ControlTowerLandingZone:
  Type: AWS::ControlTower::LandingZone
  Properties:
    Version: '3.0'
    Manifest:
      governedRegions:
        - us-east-1
        - us-west-2
        - eu-west-1
      organizationStructure:
        security:
          name: Security
        sandbox:
          name: Sandbox
      centralizedLogging:
        accountId: !Ref LogArchiveAccount
        configurations:
          loggingBucket:
            retentionConfiguration:
              retentionPeriodInDays: 365
          accessLoggingBucket:
            retentionConfiguration:
              retentionPeriodInDays: 3653
      securityRoles:
        accountId: !Ref AuditAccount
      accessManagement:
        enabled: true
    Tags:
      - Key: Purpose
        Value: LandingZone

# Account Factory for Control Tower
AccountFactory:
  Type: AWS::ServiceCatalog::CloudFormationProduct
  Properties:
    Name: AWS Control Tower Account Factory
    Description: Automated account provisioning with Control Tower
    Owner: Platform Team
    ProvisioningArtifactParameters:
      - Name: v1.0
        Description: Account Factory v1.0
        Info:
          LoadTemplateFromURL: !Sub 'https://${TemplatesBucket}.s3.amazonaws.com/account-factory.yaml'
    Tags:
      - Key: Purpose
        Value: AccountFactory

# Config Aggregator for multi-account compliance
ConfigAggregator:
  Type: AWS::Config::ConfigurationAggregator
  Properties:
    ConfigurationAggregatorName: OrganizationConfigAggregator
    OrganizationAggregationSource:
      AllAwsRegions: true
      RoleArn: !GetAtt ConfigAggregatorRole.Arn
    Tags:
      - Key: Purpose
        Value: ComplianceAggregation

# GuardDuty Organization Configuration
GuardDutyOrganizationConfiguration:
  Type: AWS::GuardDuty::OrganizationConfiguration
  Properties:
    DetectorId: !Ref GuardDutyDetector
    AutoEnable: true
    MemberFeatures:
      - Name: S3_DATA_EVENTS
        Status: ENABLED
        AdditionalConfiguration:
          - Name: EKS_AUDIT_LOGS
            Status: ENABLED
      - Name: EKS_AUDIT_LOGS
        Status: ENABLED
      - Name: EBS_MALWARE_PROTECTION
        Status: ENABLED
```

```python
# Multi-Account Governance Automation
import boto3
import json
from datetime import datetime, timedelta
from typing import Dict, List, Any, Optional

def lambda_handler(event, context):
    """Handle multi-account governance automation"""
    
    action = event.get('action')
    
    if action == 'create_account':
        return create_managed_account(event)
    elif action == 'apply_policies':
        return apply_organization_policies(event)
    elif action == 'compliance_check':
        return run_compliance_check(event)
    elif action == 'cost_analysis':
        return analyze_multi_account_costs(event)
    elif action == 'security_audit':
        return perform_security_audit(event)
    else:
        return {'statusCode': 400, 'body': f'Unknown action: {action}'}

def create_managed_account(event: Dict[str, Any]) -> Dict[str, Any]:
    """Create a new managed account with Control Tower"""
    
    organizations = boto3.client('organizations')
    servicecatalog = boto3.client('servicecatalog')
    
    account_name = event['account_name']
    account_email = event['account_email']
    organizational_unit = event.get('organizational_unit', 'Sandbox')
    
    try:
        # Create account through Control Tower Account Factory
        response = servicecatalog.provision_product(
            ProductName='AWS Control Tower Account Factory',
            ProvisioningArtifactName='v1.0',
            ProvisionedProductName=f'Account-{account_name}-{int(datetime.utcnow().timestamp())}',
            ProvisioningParameters=[
                {
                    'Key': 'AccountName',
                    'Value': account_name
                },
                {
                    'Key': 'AccountEmail',
                    'Value': account_email
                },
                {
                    'Key': 'OrganizationalUnitName',
                    'Value': organizational_unit
                },
                {
                    'Key': 'ManagedOrganizationalUnit',
                    'Value': organizational_unit
                }
            ],
            Tags=[
                {
                    'Key': 'CreatedBy',
                    'Value': 'AccountFactory'
                },
                {
                    'Key': 'CreatedAt',
                    'Value': datetime.utcnow().isoformat()
                },
                {
                    'Key': 'Environment',
                    'Value': organizational_unit
                }
            ]
        )
        
        provisioned_product_id = response['RecordDetail']['ProvisionedProductId']
        
        # Wait for account creation to complete
        account_id = wait_for_account_creation(servicecatalog, provisioned_product_id)
        
        if account_id:
            # Apply additional configurations
            setup_account_baseline(account_id, organizational_unit)
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'account_id': account_id,
                    'account_name': account_name,
                    'organizational_unit': organizational_unit,
                    'status': 'CREATED'
                })
            }
        else:
            return {
                'statusCode': 500,
                'body': json.dumps({'error': 'Account creation failed'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def wait_for_account_creation(servicecatalog, provisioned_product_id: str, max_wait_time: int = 1800) -> Optional[str]:
    """Wait for account creation to complete"""
    
    start_time = datetime.utcnow()
    
    while (datetime.utcnow() - start_time).seconds < max_wait_time:
        try:
            response = servicecatalog.describe_provisioned_product(
                Id=provisioned_product_id
            )
            
            status = response['ProvisionedProductDetail']['Status']
            
            if status == 'AVAILABLE':
                # Extract account ID from outputs
                outputs = response['ProvisionedProductDetail'].get('Outputs', [])
                for output in outputs:
                    if output['OutputKey'] == 'AccountId':
                        return output['OutputValue']
            elif status in ['ERROR', 'TAINTED']:
                print(f"Account creation failed with status: {status}")
                return None
                
            time.sleep(30)
            
        except Exception as e:
            print(f"Error checking account creation status: {str(e)}")
            time.sleep(30)
    
    return None

def setup_account_baseline(account_id: str, environment: str):
    """Setup baseline configuration for new account"""
    
    # Assume role in the new account
    sts = boto3.client('sts')
    
    try:
        assumed_role = sts.assume_role(
            RoleArn=f'arn:aws:iam::{account_id}:role/AWSControlTowerExecution',
            RoleSessionName='AccountSetup'
        )
        
        credentials = assumed_role['Credentials']
        
        # Create session with assumed role
        session = boto3.Session(
            aws_access_key_id=credentials['AccessKeyId'],
            aws_secret_access_key=credentials['SecretAccessKey'],
            aws_session_token=credentials['SessionToken']
        )
        
        # Setup CloudTrail
        setup_cloudtrail(session, account_id, environment)
        
        # Setup Config
        setup_config_rules(session, environment)
        
        # Setup GuardDuty
        setup_guardduty(session)
        
        # Setup Security Hub
        setup_security_hub(session)
        
        # Setup cost allocation tags
        setup_cost_allocation_tags(session, environment)
        
    except Exception as e:
        print(f"Error setting up account baseline: {str(e)}")

def setup_cloudtrail(session, account_id: str, environment: str):
    """Setup CloudTrail for the account"""
    cloudtrail = session.client('cloudtrail')
    s3 = session.client('s3')
    
    bucket_name = f'cloudtrail-logs-{account_id}-{environment.lower()}'
    
    try:
        # Create S3 bucket for CloudTrail logs
        s3.create_bucket(
            Bucket=bucket_name,
            CreateBucketConfiguration={
                'LocationConstraint': session.region_name
            } if session.region_name != 'us-east-1' else {}
        )
        
        # Apply bucket policy
        bucket_policy = {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Sid": "AWSCloudTrailAclCheck",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "cloudtrail.amazonaws.com"
                    },
                    "Action": "s3:GetBucketAcl",
                    "Resource": f"arn:aws:s3:::{bucket_name}"
                },
                {
                    "Sid": "AWSCloudTrailWrite",
                    "Effect": "Allow",
                    "Principal": {
                        "Service": "cloudtrail.amazonaws.com"
                    },
                    "Action": "s3:PutObject",
                    "Resource": f"arn:aws:s3:::{bucket_name}/*",
                    "Condition": {
                        "StringEquals": {
                            "s3:x-amz-acl": "bucket-owner-full-control"
                        }
                    }
                }
            ]
        }
        
        s3.put_bucket_policy(
            Bucket=bucket_name,
            Policy=json.dumps(bucket_policy)
        )
        
        # Create CloudTrail
        cloudtrail.create_trail(
            Name=f'{environment}-cloudtrail',
            S3BucketName=bucket_name,
            IncludeGlobalServiceEvents=True,
            IsMultiRegionTrail=True,
            EnableLogFileValidation=True,
            EventSelectors=[
                {
                    'ReadWriteType': 'All',
                    'IncludeManagementEvents': True,
                    'DataResources': [
                        {
                            'Type': 'AWS::S3::Object',
                            'Values': ['arn:aws:s3:::*/*']
                        },
                        {
                            'Type': 'AWS::Lambda::Function',
                            'Values': ['arn:aws:lambda:*']
                        }
                    ]
                }
            ],
            Tags=[
                {
                    'Key': 'Environment',
                    'Value': environment
                },
                {
                    'Key': 'Purpose',
                    'Value': 'Compliance'
                }
            ]
        )
        
        # Start logging
        cloudtrail.start_logging(
            Name=f'{environment}-cloudtrail'
        )
        
    except Exception as e:
        print(f"Error setting up CloudTrail: {str(e)}")

def apply_organization_policies(event: Dict[str, Any]) -> Dict[str, Any]:
    """Apply organization-wide policies"""
    
    organizations = boto3.client('organizations')
    
    policy_updates = []
    
    try:
        # Get all accounts in organization
        accounts_response = organizations.list_accounts()
        accounts = accounts_response['Accounts']
        
        # Get organizational units
        ous_response = organizations.list_organizational_units_for_parent(
            ParentId=organizations.list_roots()['Roots'][0]['Id']
        )
        
        for ou in ous_response['OrganizationalUnits']:
            ou_name = ou['Name']
            ou_id = ou['Id']
            
            # Apply environment-specific policies
            if ou_name == 'Production':
                policies = ['RequireEncryption', 'DenyRootUserAccess', 'RequiredTags']
            elif ou_name == 'Development':
                policies = ['DenyHighRiskServices', 'RequiredTags']
            elif ou_name == 'Sandbox':
                policies = ['DenyHighRiskServices']
            else:
                continue
            
            for policy_name in policies:
                try:
                    # Find policy by name
                    policies_response = organizations.list_policies(
                        Filter='SERVICE_CONTROL_POLICY'
                    )
                    
                    policy_id = None
                    for policy in policies_response['Policies']:
                        if policy['Name'] == policy_name:
                            policy_id = policy['Id']
                            break
                    
                    if policy_id:
                        # Attach policy to OU
                        organizations.attach_policy(
                            PolicyId=policy_id,
                            TargetId=ou_id
                        )
                        
                        policy_updates.append({
                            'policy_name': policy_name,
                            'target': ou_name,
                            'status': 'ATTACHED'
                        })
                    
                except Exception as e:
                    policy_updates.append({
                        'policy_name': policy_name,
                        'target': ou_name,
                        'status': 'FAILED',
                        'error': str(e)
                    })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'policy_updates': policy_updates,
                'total_updates': len(policy_updates)
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def run_compliance_check(event: Dict[str, Any]) -> Dict[str, Any]:
    """Run compliance checks across all accounts"""
    
    config = boto3.client('config')
    organizations = boto3.client('organizations')
    
    compliance_results = []
    
    try:
        # Get compliance summary from Config aggregator
        response = config.get_aggregate_compliance_details_by_config_rule(
            ConfigurationAggregatorName='OrganizationConfigAggregator',
            ConfigRuleName='encrypted-volumes',
            ComplianceType='NON_COMPLIANT'
        )
        
        for result in response['AggregateEvaluationResults']:
            compliance_results.append({
                'account_id': result['AccountId'],
                'region': result['AwsRegion'],
                'resource_type': result['EvaluationResultIdentifier']['EvaluationResultQualifier']['ResourceType'],
                'resource_id': result['EvaluationResultIdentifier']['EvaluationResultQualifier']['ResourceId'],
                'compliance_type': result['ComplianceType'],
                'config_rule': 'encrypted-volumes'
            })
        
        # Check for untagged resources
        untagged_response = config.get_aggregate_compliance_details_by_config_rule(
            ConfigurationAggregatorName='OrganizationConfigAggregator',
            ConfigRuleName='required-tags',
            ComplianceType='NON_COMPLIANT'
        )
        
        for result in untagged_response['AggregateEvaluationResults']:
            compliance_results.append({
                'account_id': result['AccountId'],
                'region': result['AwsRegion'],
                'resource_type': result['EvaluationResultIdentifier']['EvaluationResultQualifier']['ResourceType'],
                'resource_id': result['EvaluationResultIdentifier']['EvaluationResultQualifier']['ResourceId'],
                'compliance_type': result['ComplianceType'],
                'config_rule': 'required-tags'
            })
        
        # Generate compliance report
        compliance_summary = generate_compliance_report(compliance_results)
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'compliance_summary': compliance_summary,
                'non_compliant_resources': len(compliance_results),
                'details': compliance_results[:50]  # Limit for response size
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }

def generate_compliance_report(compliance_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generate compliance summary report"""
    
    summary = {
        'total_non_compliant': len(compliance_results),
        'by_account': {},
        'by_rule': {},
        'by_resource_type': {}
    }
    
    for result in compliance_results:
        account_id = result['account_id']
        config_rule = result['config_rule']
        resource_type = result['resource_type']
        
        # Count by account
        if account_id not in summary['by_account']:
            summary['by_account'][account_id] = 0
        summary['by_account'][account_id] += 1
        
        # Count by rule
        if config_rule not in summary['by_rule']:
            summary['by_rule'][config_rule] = 0
        summary['by_rule'][config_rule] += 1
        
        # Count by resource type
        if resource_type not in summary['by_resource_type']:
            summary['by_resource_type'][resource_type] = 0
        summary['by_resource_type'][resource_type] += 1
    
    return summary

def analyze_multi_account_costs(event: Dict[str, Any]) -> Dict[str, Any]:
    """Analyze costs across multiple accounts"""
    
    ce = boto3.client('ce')  # Cost Explorer
    organizations = boto3.client('organizations')
    
    try:
        # Get cost data for the last 30 days
        end_date = datetime.utcnow().date()
        start_date = end_date - timedelta(days=30)
        
        response = ce.get_cost_and_usage(
            TimePeriod={
                'Start': start_date.strftime('%Y-%m-%d'),
                'End': end_date.strftime('%Y-%m-%d')
            },
            Granularity='DAILY',
            Metrics=['BlendedCost'],
            GroupBy=[
                {
                    'Type': 'DIMENSION',
                    'Key': 'LINKED_ACCOUNT'
                },
                {
                    'Type': 'DIMENSION',
                    'Key': 'SERVICE'
                }
            ]
        )
        
        cost_analysis = {
            'total_cost': 0,
            'by_account': {},
            'by_service': {},
            'trends': []
        }
        
        for result in response['ResultsByTime']:
            date = result['TimePeriod']['Start']
            daily_total = 0
            
            for group in result['Groups']:
                account_id = group['Keys'][0]
                service = group['Keys'][1]
                amount = float(group['Metrics']['BlendedCost']['Amount'])
                
                daily_total += amount
                cost_analysis['total_cost'] += amount
                
                # Aggregate by account
                if account_id not in cost_analysis['by_account']:
                    cost_analysis['by_account'][account_id] = 0
                cost_analysis['by_account'][account_id] += amount
                
                # Aggregate by service
                if service not in cost_analysis['by_service']:
                    cost_analysis['by_service'][service] = 0
                cost_analysis['by_service'][service] += amount
            
            cost_analysis['trends'].append({
                'date': date,
                'cost': daily_total
            })
        
        # Get account names
        accounts_response = organizations.list_accounts()
        account_names = {acc['Id']: acc['Name'] for acc in accounts_response['Accounts']}
        
        # Add account names to results
        for account_id in cost_analysis['by_account']:
            if account_id in account_names:
                cost_analysis['by_account'][account_names[account_id]] = cost_analysis['by_account'].pop(account_id)
        
        return {
            'statusCode': 200,
            'body': json.dumps(cost_analysis, default=str)
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }
```

This comprehensive AWS questions collection now includes 20 detailed questions covering:

1. **AWS Fundamentals** - Global Infrastructure, Shared Responsibility Model
2. **Compute Services** - EC2, Lambda, Fargate, Auto Scaling
3. **Storage Services** - S3, EBS, storage classes, cross-region replication
4. **Database Services** - RDS, DynamoDB, Aurora comparisons
5. **Networking** - VPC, subnets, security groups
6. **Security** - IAM, WAF, GuardDuty, Security Hub
7. **Serverless** - Lambda, API Gateway, DynamoDB integration
8. **Containers** - ECS, Fargate, container orchestration
9. **CI/CD** - CodePipeline, CodeBuild, CodeDeploy
10. **Infrastructure as Code** - CloudFormation, CDK
11. **Monitoring** - CloudWatch, X-Ray, AWS Config
12. **Cost Optimization** - Cost analysis, recommendations
13. **Disaster Recovery** - Backup strategies, cross-region replication
14. **Advanced Security** - Multi-layered security, automated response
15. **Multi-Account Governance** - Organizations, Control Tower

Each question includes detailed explanations, comprehensive code examples in YAML/JSON/Python, and real-world implementation scenarios suitable for senior-level interviews.

Globals:
  Function:
    Timeout: 30
    Runtime: python3.9
    Environment:
      Variables:
        TABLE_NAME: !Ref UsersTable
        REGION: !Ref AWS::Region

Resources:
  # DynamoDB Table
  UsersTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub '${Environment}-users'
      BillingMode: PAY_PER_REQUEST
      AttributeDefinitions:
        - AttributeName: userId
          AttributeType: S
        - AttributeName: email
          AttributeType: S
      KeySchema:
        - AttributeName: userId
          KeyType: HASH
      GlobalSecondaryIndexes:
        - IndexName: EmailIndex
          KeySchema:
            - AttributeName: email
              KeyType: HASH
          Projection:
            ProjectionType: ALL
      StreamSpecification:
        StreamViewType: NEW_AND_OLD_IMAGES
      PointInTimeRecoverySpecification:
        PointInTimeRecoveryEnabled: true
      SSESpecification:
        SSEEnabled: true

  # API Gateway
  ApiGateway:
    Type: AWS::Serverless::Api
    Properties:
      StageName: !Ref Environment
      Cors:
        AllowMethods: "'GET,POST,PUT,DELETE,OPTIONS'"
        AllowHeaders: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
        AllowOrigin: "'*'"
      Auth:
        DefaultAuthorizer: CognitoAuthorizer
        Authorizers:
          CognitoAuthorizer:
            UserPoolArn: !GetAtt UserPool.Arn
      GatewayResponses:
        DEFAULT_4XX:
          ResponseParameters:
            Headers:
              Access-Control-Allow-Origin: "'*'"
              Access-Control-Allow-Headers: "'*'"
        DEFAULT_5XX:
          ResponseParameters:
            Headers:
              Access-Control-Allow-Origin: "'*'"
              Access-Control-Allow-Headers: "'*'"

  # Lambda Functions
  CreateUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub '${Environment}-create-user'
      CodeUri: src/
      Handler: handlers.create_user
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
      Events:
        CreateUser:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGateway
            Path: /users
            Method: POST

  GetUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub '${Environment}-get-user'
      CodeUri: src/
      Handler: handlers.get_user
      Policies:
        - DynamoDBReadPolicy:
            TableName: !Ref UsersTable
      Events:
        GetUser:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGateway
            Path: /users/{userId}
            Method: GET

  UpdateUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub '${Environment}-update-user'
      CodeUri: src/
      Handler: handlers.update_user
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
      Events:
        UpdateUser:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGateway
            Path: /users/{userId}
            Method: PUT

  DeleteUserFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub '${Environment}-delete-user'
      CodeUri: src/
      Handler: handlers.delete_user
      Policies:
        - DynamoDBCrudPolicy:
            TableName: !Ref UsersTable
      Events:
        DeleteUser:
          Type: Api
          Properties:
            RestApiId: !Ref ApiGateway
            Path: /users/{userId}
            Method: DELETE

  # Stream Processing Function
  StreamProcessorFunction:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName: !Sub '${Environment}-stream-processor'
      CodeUri: src/
      Handler: handlers.process_stream
      Events:
        DynamoDBStream:
          Type: DynamoDB
          Properties:
            Stream: !GetAtt UsersTable.StreamArn
            StartingPosition: LATEST
            BatchSize: 10
            MaximumBatchingWindowInSeconds: 5

  # Cognito User Pool
  UserPool:
    Type: AWS::Cognito::UserPool
    Properties:
      UserPoolName: !Sub '${Environment}-user-pool'
      AutoVerifiedAttributes:
        - email
      Policies:
        PasswordPolicy:
          MinimumLength: 8
          RequireUppercase: true
          RequireLowercase: true
          RequireNumbers: true
          RequireSymbols: true
      Schema:
        - Name: email
          AttributeDataType: String
          Required: true
          Mutable: true

  UserPoolClient:
    Type: AWS::Cognito::UserPoolClient
    Properties:
      UserPoolId: !Ref UserPool
      ClientName: !Sub '${Environment}-user-pool-client'
      GenerateSecret: false
      ExplicitAuthFlows:
        - ADMIN_NO_SRP_AUTH
        - USER_PASSWORD_AUTH
```

```python
# Lambda Handlers (src/handlers.py)
import json
import boto3
import uuid
from datetime import datetime
from decimal import Decimal
import os

# Initialize DynamoDB
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def lambda_response(status_code, body):
    """Create standardized Lambda response"""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS'
        },
        'body': json.dumps(body, default=str)
    }

def create_user(event, context):
    """Create a new user"""
    try:
        # Parse request body
        body = json.loads(event['body'])
        
        # Validate required fields
        required_fields = ['name', 'email']
        for field in required_fields:
            if field not in body:
                return lambda_response(400, {
                    'error': f'Missing required field: {field}'
                })
        
        # Create user item
        user_id = str(uuid.uuid4())
        user_item = {
            'userId': user_id,
            'name': body['name'],
            'email': body['email'],
            'createdAt': datetime.utcnow().isoformat(),
            'updatedAt': datetime.utcnow().isoformat()
        }
        
        # Add optional fields
        optional_fields = ['phone', 'address', 'preferences']
        for field in optional_fields:
            if field in body:
                user_item[field] = body[field]
        
        # Save to DynamoDB
        table.put_item(
            Item=user_item,
            ConditionExpression='attribute_not_exists(userId)'
        )
        
        return lambda_response(201, {
            'message': 'User created successfully',
            'user': user_item
        })
        
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        return lambda_response(500, {
            'error': 'Internal server error'
        })

def get_user(event, context):
    """Get user by ID"""
    try:
        user_id = event['pathParameters']['userId']
        
        # Get user from DynamoDB
        response = table.get_item(
            Key={'userId': user_id}
        )
        
        if 'Item' not in response:
            return lambda_response(404, {
                'error': 'User not found'
            })
        
        return lambda_response(200, {
            'user': response['Item']
        })
        
    except Exception as e:
        print(f"Error getting user: {str(e)}")
        return lambda_response(500, {
            'error': 'Internal server error'
        })

def update_user(event, context):
    """Update user"""
    try:
        user_id = event['pathParameters']['userId']
        body = json.loads(event['body'])
        
        # Build update expression
        update_expression = "SET updatedAt = :updatedAt"
        expression_values = {
            ':updatedAt': datetime.utcnow().isoformat()
        }
        
        # Add fields to update
        updatable_fields = ['name', 'email', 'phone', 'address', 'preferences']
        for field in updatable_fields:
            if field in body:
                update_expression += f", {field} = :{field}"
                expression_values[f":{field}"] = body[field]
        
        # Update item
        response = table.update_item(
            Key={'userId': user_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values,
            ConditionExpression='attribute_exists(userId)',
            ReturnValues='ALL_NEW'
        )
        
        return lambda_response(200, {
            'message': 'User updated successfully',
            'user': response['Attributes']
        })
        
    except Exception as e:
        print(f"Error updating user: {str(e)}")
        return lambda_response(500, {
            'error': 'Internal server error'
        })

def delete_user(event, context):
    """Delete user"""
    try:
        user_id = event['pathParameters']['userId']
        
        # Delete user
        table.delete_item(
            Key={'userId': user_id},
            ConditionExpression='attribute_exists(userId)'
        )
        
        return lambda_response(200, {
            'message': 'User deleted successfully'
        })
        
    except Exception as e:
        print(f"Error deleting user: {str(e)}")
        return lambda_response(500, {
            'error': 'Internal server error'
        })

def process_stream(event, context):
    """Process DynamoDB stream events"""
    try:
        for record in event['Records']:
            event_name = record['eventName']
            
            if event_name == 'INSERT':
                # Handle new user creation
                new_image = record['dynamodb']['NewImage']
                print(f"New user created: {new_image['userId']['S']}")
                
                # Send welcome email, update analytics, etc.
                
            elif event_name == 'MODIFY':
                # Handle user updates
                old_image = record['dynamodb']['OldImage']
                new_image = record['dynamodb']['NewImage']
                print(f"User updated: {new_image['userId']['S']}")
                
                # Update search index, send notifications, etc.
                
            elif event_name == 'REMOVE':
                # Handle user deletion
                old_image = record['dynamodb']['OldImage']
                print(f"User deleted: {old_image['userId']['S']}")
                
                # Clean up related data, send notifications, etc.
        
        return {'statusCode': 200}
        
    except Exception as e:
        print(f"Error processing stream: {str(e)}")
        raise e
```

### Q1: Explain AWS Global Infrastructure and its components.
**Difficulty: Medium**

**Answer:**
AWS Global Infrastructure consists of Regions, Availability Zones, Edge Locations, and Regional Edge Caches that provide a highly available, fault-tolerant, and scalable cloud computing platform worldwide.

**AWS Global Infrastructure Components:**

```yaml
# AWS Infrastructure as Code (CloudFormation) Example
# This demonstrates a multi-region, highly available architecture

AWSTemplateFormatVersion: '2010-09-09'
Description: 'Multi-Region AWS Infrastructure with High Availability'

Parameters:
  Environment:
    Type: String
    Default: production
    AllowedValues: [development, staging, production]
    Description: Environment name
  
  KeyPairName:
    Type: AWS::EC2::KeyPair::KeyName
    Description: EC2 Key Pair for SSH access
  
  DBPassword:
    Type: String
    NoEcho: true
    MinLength: 8
    Description: Database password

Mappings:
  RegionMap:
    us-east-1:
      AMI: ami-0abcdef1234567890
      AZ1: us-east-1a
      AZ2: us-east-1b
      AZ3: us-east-1c
    us-west-2:
      AMI: ami-0fedcba0987654321
      AZ1: us-west-2a
      AZ2: us-west-2b
      AZ3: us-west-2c
    eu-west-1:
      AMI: ami-0123456789abcdef0
      AZ1: eu-west-1a
      AZ2: eu-west-1b
      AZ3: eu-west-1c

Resources:
  # === VPC AND NETWORKING ===
  
  # Primary VPC
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-vpc'
        - Key: Environment
          Value: !Ref Environment

  # Internet Gateway
  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-igw'

  InternetGatewayAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      InternetGatewayId: !Ref InternetGateway
      VpcId: !Ref VPC

  # Public Subnets (Multi-AZ)
  PublicSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ1]
      CidrBlock: 10.0.1.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-public-subnet-1'
        - Key: Type
          Value: Public

  PublicSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ2]
      CidrBlock: 10.0.2.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-public-subnet-2'
        - Key: Type
          Value: Public

  PublicSubnet3:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ3]
      CidrBlock: 10.0.3.0/24
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-public-subnet-3'
        - Key: Type
          Value: Public

  # Private Subnets (Multi-AZ)
  PrivateSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ1]
      CidrBlock: 10.0.11.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-private-subnet-1'
        - Key: Type
          Value: Private

  PrivateSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ2]
      CidrBlock: 10.0.12.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-private-subnet-2'
        - Key: Type
          Value: Private

  PrivateSubnet3:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ3]
      CidrBlock: 10.0.13.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-private-subnet-3'
        - Key: Type
          Value: Private

  # Database Subnets (Multi-AZ)
  DatabaseSubnet1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ1]
      CidrBlock: 10.0.21.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-database-subnet-1'
        - Key: Type
          Value: Database

  DatabaseSubnet2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ2]
      CidrBlock: 10.0.22.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-database-subnet-2'
        - Key: Type
          Value: Database

  DatabaseSubnet3:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      AvailabilityZone: !FindInMap [RegionMap, !Ref 'AWS::Region', AZ3]
      CidrBlock: 10.0.23.0/24
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-database-subnet-3'
        - Key: Type
          Value: Database

  # NAT Gateways for Private Subnets
  NatGateway1EIP:
    Type: AWS::EC2::EIP
    DependsOn: InternetGatewayAttachment
    Properties:
      Domain: vpc
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-nat-eip-1'

  NatGateway2EIP:
    Type: AWS::EC2::EIP
    DependsOn: InternetGatewayAttachment
    Properties:
      Domain: vpc
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-nat-eip-2'

  NatGateway1:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGateway1EIP.AllocationId
      SubnetId: !Ref PublicSubnet1
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-nat-gateway-1'

  NatGateway2:
    Type: AWS::EC2::NatGateway
    Properties:
      AllocationId: !GetAtt NatGateway2EIP.AllocationId
      SubnetId: !Ref PublicSubnet2
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-nat-gateway-2'

  # Route Tables
  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-public-routes'

  DefaultPublicRoute:
    Type: AWS::EC2::Route
    DependsOn: InternetGatewayAttachment
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  PublicSubnet1RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PublicRouteTable
      SubnetId: !Ref PublicSubnet1

  PublicSubnet2RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PublicRouteTable
      SubnetId: !Ref PublicSubnet2

  PublicSubnet3RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PublicRouteTable
      SubnetId: !Ref PublicSubnet3

  PrivateRouteTable1:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-private-routes-1'

  DefaultPrivateRoute1:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable1
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGateway1

  PrivateSubnet1RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PrivateRouteTable1
      SubnetId: !Ref PrivateSubnet1

  PrivateRouteTable2:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-private-routes-2'

  DefaultPrivateRoute2:
    Type: AWS::EC2::Route
    Properties:
      RouteTableId: !Ref PrivateRouteTable2
      DestinationCidrBlock: 0.0.0.0/0
      NatGatewayId: !Ref NatGateway2

  PrivateSubnet2RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PrivateRouteTable2
      SubnetId: !Ref PrivateSubnet2

  PrivateSubnet3RouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      RouteTableId: !Ref PrivateRouteTable2
      SubnetId: !Ref PrivateSubnet3

  # === SECURITY GROUPS ===
  
  # Application Load Balancer Security Group
  ALBSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Sub '${Environment}-alb-sg'
      GroupDescription: Security group for Application Load Balancer
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
          Description: HTTP access from anywhere
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
          Description: HTTPS access from anywhere
      SecurityGroupEgress:
        - IpProtocol: -1
          CidrIp: 0.0.0.0/0
          Description: All outbound traffic
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-alb-sg'

  # Web Server Security Group
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Sub '${Environment}-web-sg'
      GroupDescription: Security group for web servers
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          SourceSecurityGroupId: !Ref ALBSecurityGroup
          Description: HTTP from ALB
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          SourceSecurityGroupId: !Ref ALBSecurityGroup
          Description: HTTPS from ALB
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          SourceSecurityGroupId: !Ref BastionSecurityGroup
          Description: SSH from Bastion
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-web-sg'

  # Application Server Security Group
  AppServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Sub '${Environment}-app-sg'
      GroupDescription: Security group for application servers
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 8080
          ToPort: 8080
          SourceSecurityGroupId: !Ref WebServerSecurityGroup
          Description: Application port from web servers
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          SourceSecurityGroupId: !Ref BastionSecurityGroup
          Description: SSH from Bastion
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-app-sg'

  # Database Security Group
  DatabaseSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Sub '${Environment}-db-sg'
      GroupDescription: Security group for database servers
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 3306
          ToPort: 3306
          SourceSecurityGroupId: !Ref AppServerSecurityGroup
          Description: MySQL from application servers
        - IpProtocol: tcp
          FromPort: 5432
          ToPort: 5432
          SourceSecurityGroupId: !Ref AppServerSecurityGroup
          Description: PostgreSQL from application servers
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-db-sg'

  # Bastion Host Security Group
  BastionSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupName: !Sub '${Environment}-bastion-sg'
      GroupDescription: Security group for bastion host
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
          Description: SSH access from anywhere (restrict in production)
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-bastion-sg'

  # === COMPUTE RESOURCES ===
  
  # Launch Template for Web Servers
  WebServerLaunchTemplate:
    Type: AWS::EC2::LaunchTemplate
    Properties:
      LaunchTemplateName: !Sub '${Environment}-web-server-template'
      LaunchTemplateData:
        ImageId: !FindInMap [RegionMap, !Ref 'AWS::Region', AMI]
        InstanceType: t3.medium
        KeyName: !Ref KeyPairName
        SecurityGroupIds:
          - !Ref WebServerSecurityGroup
        IamInstanceProfile:
          Arn: !GetAtt WebServerInstanceProfile.Arn
        UserData:
          Fn::Base64: !Sub |
            #!/bin/bash
            yum update -y
            yum install -y httpd
            systemctl start httpd
            systemctl enable httpd
            
            # Install CloudWatch agent
            wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
            rpm -U ./amazon-cloudwatch-agent.rpm
            
            # Configure CloudWatch agent
            cat > /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json << EOF
            {
              "metrics": {
                "namespace": "AWS/EC2/Custom",
                "metrics_collected": {
                  "cpu": {
                    "measurement": ["cpu_usage_idle", "cpu_usage_iowait", "cpu_usage_user", "cpu_usage_system"],
                    "metrics_collection_interval": 60
                  },
                  "disk": {
                    "measurement": ["used_percent"],
                    "metrics_collection_interval": 60,
                    "resources": ["*"]
                  },
                  "mem": {
                    "measurement": ["mem_used_percent"],
                    "metrics_collection_interval": 60
                  }
                }
              },
              "logs": {
                "logs_collected": {
                  "files": {
                    "collect_list": [
                      {
                        "file_path": "/var/log/httpd/access_log",
                        "log_group_name": "${Environment}-web-access-logs",
                        "log_stream_name": "{instance_id}"
                      },
                      {
                        "file_path": "/var/log/httpd/error_log",
                        "log_group_name": "${Environment}-web-error-logs",
                        "log_stream_name": "{instance_id}"
                      }
                    ]
                  }
                }
              }
            }
            EOF
            
            # Start CloudWatch agent
            /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
              -a fetch-config -m ec2 -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json -s
            
            # Create simple index page
            cat > /var/www/html/index.html << EOF
            <!DOCTYPE html>
            <html>
            <head>
                <title>AWS Infrastructure Demo</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .container { max-width: 800px; margin: 0 auto; }
                    .info { background: #f0f0f0; padding: 20px; border-radius: 5px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>AWS Multi-Region Infrastructure</h1>
                    <div class="info">
                        <h2>Instance Information</h2>
                        <p><strong>Region:</strong> ${AWS::Region}</p>
                        <p><strong>Environment:</strong> ${Environment}</p>
                        <p><strong>Instance ID:</strong> <span id="instance-id">Loading...</span></p>
                        <p><strong>Availability Zone:</strong> <span id="az">Loading...</span></p>
                        <p><strong>Local IP:</strong> <span id="local-ip">Loading...</span></p>
                        <p><strong>Public IP:</strong> <span id="public-ip">Loading...</span></p>
                    </div>
                    
                    <h2>Health Check</h2>
                    <div id="health-status">Checking...</div>
                    
                    <h2>Database Connection</h2>
                    <div id="db-status">Testing...</div>
                </div>
                
                <script>
                    // Fetch instance metadata
                    fetch('http://169.254.169.254/latest/meta-data/instance-id')
                        .then(response => response.text())
                        .then(data => document.getElementById('instance-id').textContent = data);
                    
                    fetch('http://169.254.169.254/latest/meta-data/placement/availability-zone')
                        .then(response => response.text())
                        .then(data => document.getElementById('az').textContent = data);
                    
                    fetch('http://169.254.169.254/latest/meta-data/local-ipv4')
                        .then(response => response.text())
                        .then(data => document.getElementById('local-ip').textContent = data);
                    
                    fetch('http://169.254.169.254/latest/meta-data/public-ipv4')
                        .then(response => response.text())
                        .then(data => document.getElementById('public-ip').textContent = data)
                        .catch(() => document.getElementById('public-ip').textContent = 'N/A');
                    
                    // Health check
                    document.getElementById('health-status').innerHTML = 
                        '<span style="color: green;">✓ Web server is running</span>';
                    
                    // Database connection test (placeholder)
                    document.getElementById('db-status').innerHTML = 
                        '<span style="color: blue;">Database connection configured</span>';
                </script>
            </body>
            </html>
            EOF
            
            # Create health check endpoint
            cat > /var/www/html/health << EOF
            {
              "status": "healthy",
              "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
              "region": "${AWS::Region}",
              "environment": "${Environment}"
            }
            EOF
        TagSpecifications:
          - ResourceType: instance
            Tags:
              - Key: Name
                Value: !Sub '${Environment}-web-server'
              - Key: Environment
                Value: !Ref Environment
              - Key: Type
                Value: WebServer

  # Auto Scaling Group for Web Servers
  WebServerAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      AutoScalingGroupName: !Sub '${Environment}-web-asg'
      VPCZoneIdentifier:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
        - !Ref PrivateSubnet3
      LaunchTemplate:
        LaunchTemplateId: !Ref WebServerLaunchTemplate
        Version: !GetAtt WebServerLaunchTemplate.LatestVersionNumber
      MinSize: 2
      MaxSize: 10
      DesiredCapacity: 3
      TargetGroupARNs:
        - !Ref WebServerTargetGroup
      HealthCheckType: ELB
      HealthCheckGracePeriod: 300
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-web-asg'
          PropagateAtLaunch: false
        - Key: Environment
          Value: !Ref Environment
          PropagateAtLaunch: true
    UpdatePolicy:
      AutoScalingRollingUpdate:
        MinInstancesInService: 1
        MaxBatchSize: 1
        PauseTime: PT5M
        WaitOnResourceSignals: false

  # Application Load Balancer
  ApplicationLoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: !Sub '${Environment}-alb'
      Scheme: internet-facing
      Type: application
      SecurityGroups:
        - !Ref ALBSecurityGroup
      Subnets:
        - !Ref PublicSubnet1
        - !Ref PublicSubnet2
        - !Ref PublicSubnet3
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-alb'
        - Key: Environment
          Value: !Ref Environment

  # Target Group for Web Servers
  WebServerTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: !Sub '${Environment}-web-tg'
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPC
      HealthCheckPath: /health
      HealthCheckProtocol: HTTP
      HealthCheckIntervalSeconds: 30
      HealthCheckTimeoutSeconds: 5
      HealthyThresholdCount: 2
      UnhealthyThresholdCount: 3
      TargetType: instance
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-web-tg'

  # ALB Listener
  ALBListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref WebServerTargetGroup
      LoadBalancerArn: !Ref ApplicationLoadBalancer
      Port: 80
      Protocol: HTTP

  # === IAM ROLES AND POLICIES ===
  
  # IAM Role for Web Servers
  WebServerRole:
    Type: AWS::IAM::Role
    Properties:
      RoleName: !Sub '${Environment}-web-server-role'
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ec2.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/CloudWatchAgentServerPolicy
        - arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
      Policies:
        - PolicyName: S3Access
          PolicyDocument:
            Version: '2012-10-17'
            Statement:
              - Effect: Allow
                Action:
                  - s3:GetObject
                  - s3:PutObject
                Resource:
                  - !Sub '${S3Bucket}/*'
              - Effect: Allow
                Action:
                  - s3:ListBucket
                Resource:
                  - !Ref S3Bucket

  WebServerInstanceProfile:
    Type: AWS::IAM::InstanceProfile
    Properties:
      InstanceProfileName: !Sub '${Environment}-web-server-profile'
      Roles:
        - !Ref WebServerRole

  # === STORAGE ===
  
  # S3 Bucket for application assets
  S3Bucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: !Sub '${Environment}-app-assets-${AWS::AccountId}-${AWS::Region}'
      VersioningConfiguration:
        Status: Enabled
      BucketEncryption:
        ServerSideEncryptionConfiguration:
          - ServerSideEncryptionByDefault:
              SSEAlgorithm: AES256
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      LifecycleConfiguration:
        Rules:
          - Id: DeleteOldVersions
            Status: Enabled
            NoncurrentVersionExpirationInDays: 30
          - Id: TransitionToIA
            Status: Enabled
            TransitionInDays: 30
            StorageClass: STANDARD_IA
          - Id: TransitionToGlacier
            Status: Enabled
            TransitionInDays: 90
            StorageClass: GLACIER
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-app-assets'
        - Key: Environment
          Value: !Ref Environment

  # === DATABASE ===
  
  # DB Subnet Group
  DatabaseSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupName: !Sub '${Environment}-db-subnet-group'
      DBSubnetGroupDescription: Subnet group for RDS database
      SubnetIds:
        - !Ref DatabaseSubnet1
        - !Ref DatabaseSubnet2
        - !Ref DatabaseSubnet3
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-db-subnet-group'

  # RDS Database Instance
  DatabaseInstance:
    Type: AWS::RDS::DBInstance
    DeletionPolicy: Snapshot
    Properties:
      DBInstanceIdentifier: !Sub '${Environment}-database'
      DBInstanceClass: db.t3.micro
      Engine: mysql
      EngineVersion: '8.0.35'
      AllocatedStorage: 20
      StorageType: gp2
      StorageEncrypted: true
      MasterUsername: admin
      MasterUserPassword: !Ref DBPassword
      DBSubnetGroupName: !Ref DatabaseSubnetGroup
      VPCSecurityGroups:
        - !Ref DatabaseSecurityGroup
      BackupRetentionPeriod: 7
      PreferredBackupWindow: "03:00-04:00"
      PreferredMaintenanceWindow: "sun:04:00-sun:05:00"
      MultiAZ: true
      PubliclyAccessible: false
      DeletionProtection: true
      Tags:
        - Key: Name
          Value: !Sub '${Environment}-database'
        - Key: Environment
          Value: !Ref Environment

  # === MONITORING ===
  
  # CloudWatch Log Groups
  WebAccessLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub '${Environment}-web-access-logs'
      RetentionInDays: 30

  WebErrorLogGroup:
    Type: AWS::Logs::LogGroup
    Properties:
      LogGroupName: !Sub '${Environment}-web-error-logs'
      RetentionInDays: 30

  # CloudWatch Alarms
  HighCPUAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: !Sub '${Environment}-high-cpu'
      AlarmDescription: Alarm when CPU exceeds 80%
      MetricName: CPUUtilization
      Namespace: AWS/EC2
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 80
      ComparisonOperator: GreaterThanThreshold
      Dimensions:
        - Name: AutoScalingGroupName
          Value: !Ref WebServerAutoScalingGroup
      AlarmActions:
        - !Ref ScaleUpPolicy

  LowCPUAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: !Sub '${Environment}-low-cpu'
      AlarmDescription: Alarm when CPU is below 20%
      MetricName: CPUUtilization
      Namespace: AWS/EC2
      Statistic: Average
      Period: 300
      EvaluationPeriods: 2
      Threshold: 20
      ComparisonOperator: LessThanThreshold
      Dimensions:
        - Name: AutoScalingGroupName
          Value: !Ref WebServerAutoScalingGroup
      AlarmActions:
        - !Ref ScaleDownPolicy

  # Auto Scaling Policies
  ScaleUpPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AdjustmentType: ChangeInCapacity
      AutoScalingGroupName: !Ref WebServerAutoScalingGroup
      Cooldown: 300
      ScalingAdjustment: 1

  ScaleDownPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AdjustmentType: ChangeInCapacity
      AutoScalingGroupName: !Ref WebServerAutoScalingGroup
      Cooldown: 300
      ScalingAdjustment: -1

Outputs:
  VPCId:
    Description: VPC ID
    Value: !Ref VPC
    Export:
      Name: !Sub '${Environment}-vpc-id'

  LoadBalancerDNS:
    Description: Application Load Balancer DNS name
    Value: !GetAtt ApplicationLoadBalancer.DNSName
    Export:
      Name: !Sub '${Environment}-alb-dns'

  DatabaseEndpoint:
    Description: RDS Database endpoint
    Value: !GetAtt DatabaseInstance.Endpoint.Address
    Export:
      Name: !Sub '${Environment}-db-endpoint'

  S3BucketName:
    Description: S3 Bucket name
    Value: !Ref S3Bucket
    Export:
      Name: !Sub '${Environment}-s3-bucket'

  Region:
    Description: AWS Region
    Value: !Ref 'AWS::Region'
    Export:
      Name: !Sub '${Environment}-region'
```

**AWS CLI Management Scripts:**

```bash
#!/bin/bash
# AWS Infrastructure Management Script

# Set variables
ENVIRONMENT="production"
REGION="us-east-1"
STACK_NAME="${ENVIRONMENT}-infrastructure"
TEMPLATE_FILE="infrastructure.yaml"
PARAMETERS_FILE="parameters.json"

# === AWS CONFIGURATION ===

# Configure AWS CLI
echo "🔧 Configuring AWS CLI..."
aws configure set region $REGION
aws configure set output json

# Verify AWS credentials
echo "🔍 Verifying AWS credentials..."
aws sts get-caller-identity

if [ $? -ne 0 ]; then
    echo "❌ AWS credentials not configured properly"
    exit 1
fi

# === CLOUDFORMATION OPERATIONS ===

# Function to deploy CloudFormation stack
deploy_stack() {
    echo "🚀 Deploying CloudFormation stack: $STACK_NAME"
    
    # Validate template
    echo "✅ Validating CloudFormation template..."
    aws cloudformation validate-template \
        --template-body file://$TEMPLATE_FILE
    
    if [ $? -ne 0 ]; then
        echo "❌ Template validation failed"
        exit 1
    fi
    
    # Check if stack exists
    aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --region $REGION > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "📝 Updating existing stack..."
        aws cloudformation update-stack \
            --stack-name $STACK_NAME \
            --template-body file://$TEMPLATE_FILE \
            --parameters file://$PARAMETERS_FILE \
            --capabilities CAPABILITY_NAMED_IAM \
            --region $REGION
    else
        echo "🆕 Creating new stack..."
        aws cloudformation create-stack \
            --stack-name $STACK_NAME \
            --template-body file://$TEMPLATE_FILE \
            --parameters file://$PARAMETERS_FILE \
            --capabilities CAPABILITY_NAMED_IAM \
            --enable-termination-protection \
            --region $REGION
    fi
    
    # Wait for stack operation to complete
    echo "⏳ Waiting for stack operation to complete..."
    aws cloudformation wait stack-update-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    if [ $? -eq 0 ]; then
        echo "✅ Stack operation completed successfully"
    else
        echo "❌ Stack operation failed"
        aws cloudformation describe-stack-events \
            --stack-name $STACK_NAME \
            --region $REGION \
            --query 'StackEvents[?ResourceStatus==`CREATE_FAILED` || ResourceStatus==`UPDATE_FAILED`]'
        exit 1
    fi
}

# Function to delete CloudFormation stack
delete_stack() {
    echo "🗑️  Deleting CloudFormation stack: $STACK_NAME"
    
    # Disable termination protection
    aws cloudformation update-termination-protection \
        --stack-name $STACK_NAME \
        --no-enable-termination-protection \
        --region $REGION
    
    # Delete stack
    aws cloudformation delete-stack \
        --stack-name $STACK_NAME \
        --region $REGION
    
    # Wait for deletion to complete
    echo "⏳ Waiting for stack deletion to complete..."
    aws cloudformation wait stack-delete-complete \
        --stack-name $STACK_NAME \
        --region $REGION
    
    echo "✅ Stack deleted successfully"
}

# Function to get stack outputs
get_outputs() {
    echo "📋 Getting stack outputs..."
    aws cloudformation describe-stacks \
        --stack-name $STACK_NAME \
        --region $REGION \
        --query 'Stacks[0].Outputs' \
        --output table
}

# Function to get stack resources
get_resources() {
    echo "📦 Getting stack resources..."
    aws cloudformation list-stack-resources \
        --stack-name $STACK_NAME \
        --region $REGION \
        --output table
}

# === EC2 OPERATIONS ===

# Function to list EC2 instances
list_instances() {
    echo "🖥️  Listing EC2 instances..."
    aws ec2 describe-instances \
        --filters "Name=tag:Environment,Values=$ENVIRONMENT" \
        --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,PublicIpAddress,PrivateIpAddress,Tags[?Key==`Name`].Value|[0]]' \
        --output table \
        --region $REGION
}

# Function to get instance health
get_instance_health() {
    echo "🏥 Checking instance health..."
    
    # Get Auto Scaling Group instances
    ASG_NAME="${ENVIRONMENT}-web-asg"
    aws autoscaling describe-auto-scaling-groups \
        --auto-scaling-group-names $ASG_NAME \
        --query 'AutoScalingGroups[0].Instances[*].[InstanceId,HealthStatus,LifecycleState]' \
        --output table \
        --region $REGION
    
    # Get Load Balancer target health
    TARGET_GROUP_ARN=$(aws elbv2 describe-target-groups \
        --names "${ENVIRONMENT}-web-tg" \
        --query 'TargetGroups[0].TargetGroupArn' \
        --output text \
        --region $REGION)
    
    if [ "$TARGET_GROUP_ARN" != "None" ]; then
        echo "🎯 Target Group Health:"
        aws elbv2 describe-target-health \
            --target-group-arn $TARGET_GROUP_ARN \
            --query 'TargetHealthDescriptions[*].[Target.Id,TargetHealth.State,TargetHealth.Description]' \
            --output table \
            --region $REGION
    fi
}

# === RDS OPERATIONS ===

# Function to get RDS status
get_rds_status() {
    echo "🗄️  Getting RDS status..."
    aws rds describe-db-instances \
        --db-instance-identifier "${ENVIRONMENT}-database" \
        --query 'DBInstances[0].[DBInstanceIdentifier,DBInstanceStatus,Engine,EngineVersion,AllocatedStorage,DBInstanceClass,MultiAZ]' \
        --output table \
        --region $REGION
}

# Function to create RDS snapshot
create_rds_snapshot() {
    SNAPSHOT_ID="${ENVIRONMENT}-database-$(date +%Y%m%d%H%M%S)"
    echo "📸 Creating RDS snapshot: $SNAPSHOT_ID"
    
    aws rds create-db-snapshot \
        --db-instance-identifier "${ENVIRONMENT}-database" \
        --db-snapshot-identifier $SNAPSHOT_ID \
        --region $REGION
    
    echo "⏳ Waiting for snapshot to complete..."
    aws rds wait db-snapshot-completed \
        --db-snapshot-identifier $SNAPSHOT_ID \
        --region $REGION
    
    echo "✅ Snapshot created successfully: $SNAPSHOT_ID"
}

# === S3 OPERATIONS ===

# Function to sync files to S3
sync_to_s3() {
    BUCKET_NAME="${ENVIRONMENT}-app-assets-$(aws sts get-caller-identity --query Account --output text)-${REGION}"
    LOCAL_PATH="./assets/"
    
    echo "📤 Syncing files to S3 bucket: $BUCKET_NAME"
    
    if [ -d "$LOCAL_PATH" ]; then
        aws s3 sync $LOCAL_PATH s3://$BUCKET_NAME/ \
            --delete \
            --exclude "*.tmp" \
            --exclude ".DS_Store" \
            --region $REGION
        
        echo "✅ Files synced successfully"
    else
        echo "⚠️  Local assets directory not found: $LOCAL_PATH"
    fi
}

# === MONITORING ===

# Function to get CloudWatch metrics
get_metrics() {
    echo "📊 Getting CloudWatch metrics..."
    
    # CPU Utilization
    echo "CPU Utilization (last 1 hour):"
    aws cloudwatch get-metric-statistics \
        --namespace AWS/EC2 \
        --metric-name CPUUtilization \
        --dimensions Name=AutoScalingGroupName,Value="${ENVIRONMENT}-web-asg" \
        --statistics Average \
        --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
        --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
        --period 300 \
        --query 'Datapoints[*].[Timestamp,Average]' \
        --output table \
        --region $REGION
    
    # ALB Request Count
    ALB_ARN=$(aws elbv2 describe-load-balancers \
        --names "${ENVIRONMENT}-alb" \
        --query 'LoadBalancers[0].LoadBalancerArn' \
        --output text \
        --region $REGION)
    
    if [ "$ALB_ARN" != "None" ]; then
        echo "\nALB Request Count (last 1 hour):"
        aws cloudwatch get-metric-statistics \
            --namespace AWS/ApplicationELB \
            --metric-name RequestCount \
            --dimensions Name=LoadBalancer,Value=$(echo $ALB_ARN | cut -d'/' -f2-) \
            --statistics Sum \
            --start-time $(date -u -d '1 hour ago' +%Y-%m-%dT%H:%M:%S) \
            --end-time $(date -u +%Y-%m-%dT%H:%M:%S) \
            --period 300 \
            --query 'Datapoints[*].[Timestamp,Sum]' \
            --output table \
            --region $REGION
    fi
}

# Function to get recent CloudWatch alarms
get_alarms() {
    echo "🚨 Getting CloudWatch alarms..."
    aws cloudwatch describe-alarms \
        --alarm-name-prefix $ENVIRONMENT \
        --query 'MetricAlarms[*].[AlarmName,StateValue,StateReason]' \
        --output table \
        --region $REGION
}

# === COST ANALYSIS ===

# Function to get cost and usage
get_costs() {
    echo "💰 Getting cost information..."
    
    # Get current month costs
    START_DATE=$(date +%Y-%m-01)
    END_DATE=$(date +%Y-%m-%d)
    
    aws ce get-cost-and-usage \
        --time-period Start=$START_DATE,End=$END_DATE \
        --granularity MONTHLY \
        --metrics BlendedCost \
        --group-by Type=DIMENSION,Key=SERVICE \
        --query 'ResultsByTime[0].Groups[?Metrics.BlendedCost.Amount>`1`].[Keys[0],Metrics.BlendedCost.Amount,Metrics.BlendedCost.Unit]' \
        --output table
}

# === SECURITY ===

# Function to check security groups
check_security() {
    echo "🔒 Checking security configuration..."
    
    # List security groups with open access
    echo "Security groups with open access (0.0.0.0/0):"
    aws ec2 describe-security-groups \
        --filters "Name=tag:Environment,Values=$ENVIRONMENT" \
        --query 'SecurityGroups[?IpPermissions[?IpRanges[?CidrIp==`0.0.0.0/0`]]].[GroupId,GroupName,Description]' \
        --output table \
        --region $REGION
    
    # Check for unused security groups
    echo "\nUnused security groups:"
    aws ec2 describe-security-groups \
        --filters "Name=tag:Environment,Values=$ENVIRONMENT" \
        --query 'SecurityGroups[?length(IpPermissionsEgress)==`1` && IpPermissionsEgress[0].IpRanges[0].CidrIp==`0.0.0.0/0` && length(IpPermissions)==`0`].[GroupId,GroupName]' \
        --output table \
        --region $REGION
}

# === BACKUP AND DISASTER RECOVERY ===

# Function to create AMI backup
create_ami_backup() {
    echo "💾 Creating AMI backups..."
    
    # Get running instances
    INSTANCE_IDS=$(aws ec2 describe-instances \
        --filters "Name=tag:Environment,Values=$ENVIRONMENT" "Name=instance-state-name,Values=running" \
        --query 'Reservations[*].Instances[*].InstanceId' \
        --output text \
        --region $REGION)
    
    for INSTANCE_ID in $INSTANCE_IDS; do
        AMI_NAME="${ENVIRONMENT}-${INSTANCE_ID}-$(date +%Y%m%d%H%M%S)"
        echo "Creating AMI for instance $INSTANCE_ID: $AMI_NAME"
        
        aws ec2 create-image \
            --instance-id $INSTANCE_ID \
            --name $AMI_NAME \
            --description "Automated backup of $INSTANCE_ID" \
            --no-reboot \
            --region $REGION
    done
}

# === MAIN SCRIPT ===

case "$1" in
    deploy)
        deploy_stack
        ;;
    delete)
        delete_stack
        ;;
    outputs)
        get_outputs
        ;;
    resources)
        get_resources
        ;;
    instances)
        list_instances
        ;;
    health)
        get_instance_health
        ;;
    rds)
        get_rds_status
        ;;
    snapshot)
        create_rds_snapshot
        ;;
    sync)
        sync_to_s3
        ;;
    metrics)
        get_metrics
        ;;
    alarms)
        get_alarms
        ;;
    costs)
        get_costs
        ;;
    security)
        check_security
        ;;
    backup)
        create_ami_backup
        ;;
    status)
        echo "📊 Infrastructure Status Report"
        echo "================================"
        get_outputs
        echo "\n"
        list_instances
        echo "\n"
        get_instance_health
        echo "\n"
        get_rds_status
        echo "\n"
        get_alarms
        ;;
    *)
        echo "Usage: $0 {deploy|delete|outputs|resources|instances|health|rds|snapshot|sync|metrics|alarms|costs|security|backup|status}"
        echo ""
        echo "Commands:"
        echo "  deploy    - Deploy CloudFormation stack"
        echo "  delete    - Delete CloudFormation stack"
        echo "  outputs   - Show stack outputs"
        echo "  resources - Show stack resources"
        echo "  instances - List EC2 instances"
        echo "  health    - Check instance health"
        echo "  rds       - Show RDS status"
        echo "  snapshot  - Create RDS snapshot"
        echo "  sync      - Sync files to S3"
        echo "  metrics   - Show CloudWatch metrics"
        echo "  alarms    - Show CloudWatch alarms"
        echo "  costs     - Show cost information"
        echo "  security  - Check security configuration"
        echo "  backup    - Create AMI backups"
        echo "  status    - Show complete infrastructure status"
        exit 1
        ;;
esac

echo "\n✅ Operation completed successfully!"
```

**AWS Global Infrastructure Benefits:**

1. **High Availability**: Multiple AZs within regions
2. **Disaster Recovery**: Cross-region replication
3. **Low Latency**: Edge locations worldwide
4. **Scalability**: Auto-scaling capabilities
5. **Security**: Multiple layers of security
6. **Compliance**: Various compliance certifications
7. **Cost Optimization**: Pay-as-you-use model
8. **Global Reach**: Presence in multiple countries

**Key Components:**
- **Regions**: Geographic areas with multiple AZs
- **Availability Zones**: Isolated data centers
- **Edge Locations**: Content delivery network points
- **Regional Edge Caches**: Larger caching locations
- **Local Zones**: Ultra-low latency for specific metros
- **Wavelength**: 5G edge computing

---

This comprehensive AWS guide covers infrastructure design, automation, monitoring, and best practices for cloud-native applications.