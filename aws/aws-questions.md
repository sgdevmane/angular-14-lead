# AWS Cloud Interview Questions

## Table of Contents
1. [AWS Fundamentals](#aws-fundamentals)
2. [Compute Services](#compute-services)
3. [Storage Services](#storage-services)
4. [Database Services](#database-services)
5. [Networking and Security](#networking-and-security)
6. [Serverless and Containers](#serverless-and-containers)
7. [DevOps and CI/CD](#devops-and-cicd)
8. [Monitoring and Cost Optimization](#monitoring-and-cost-optimization)

---

## AWS Fundamentals

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