# Kubernetes Interview Questions

## Table of Contents
1. [Kubernetes Fundamentals](#kubernetes-fundamentals)
2. [Pods and Containers](#pods-and-containers)
3. [Services and Networking](#services-and-networking)
4. [ConfigMaps and Secrets](#configmaps-and-secrets)
5. [Deployments and ReplicaSets](#deployments-and-replicasets)
6. [Persistent Volumes](#persistent-volumes)
7. [Ingress and Load Balancing](#ingress-and-load-balancing)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Security](#security)
10. [Autoscaling](#autoscaling)
11. [CI/CD Pipelines](#cicd-pipelines)
12. [Disaster Recovery](#disaster-recovery)
13. [Operators and Custom Resources](#operators-and-custom-resources)
14. [Multi-cluster Management](#multi-cluster-management)
15. [Resource Management](#resource-management)
16. [Troubleshooting and Debugging](#troubleshooting-and-debugging)
17. [Service Mesh and Istio](#service-mesh-and-istio)
18. [GitOps and ArgoCD](#gitops-and-argocd)
19. [Advanced Networking and CNI](#advanced-networking-and-cni)
20. [Performance Optimization and Tuning](#performance-optimization-and-tuning)

---

## Kubernetes Fundamentals

## Q1: What is Kubernetes and explain its architecture?
**Difficulty: Medium**

**Answer:**

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google and now maintained by the Cloud Native Computing Foundation (CNCF), Kubernetes provides a robust framework for running distributed systems resiliently.

### Kubernetes Architecture Overview

```yaml
# Kubernetes Cluster Architecture
apiVersion: v1
kind: ConfigMap
metadata:
  name: k8s-architecture-overview
  namespace: default
data:
  architecture.yaml: |
    cluster:
      control-plane:
        - api-server
        - etcd
        - controller-manager
        - scheduler
      worker-nodes:
        - kubelet
        - kube-proxy
        - container-runtime
      networking:
        - pod-network
        - service-network
        - ingress-controllers
```

### Control Plane Components

**1. API Server (kube-apiserver)**
```bash
# API Server is the central management entity
# Exposes Kubernetes API
# Validates and configures data for API objects
# Serves as the frontend for the cluster's shared state

# Example API call
kubectl get pods --v=8  # Shows API calls being made
```

**2. etcd**
```bash
# Distributed key-value store
# Stores all cluster data
# Provides strong consistency and high availability

# Check etcd health
kubectl get componentstatuses

# Backup etcd (important for disaster recovery)
ETCDCTL_API=3 etcdctl snapshot save backup.db \
  --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/healthcheck-client.crt \
  --key=/etc/kubernetes/pki/etcd/healthcheck-client.key
```

**3. Controller Manager (kube-controller-manager)**
```yaml
# Runs controller processes
# Examples of controllers:
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  replicas: 3  # ReplicaSet controller ensures this
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: app
        image: nginx:1.21
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

**4. Scheduler (kube-scheduler)**
```python
#!/usr/bin/env python3
"""
Kubernetes Scheduler Decision Process Simulation
"""

class KubernetesScheduler:
    def __init__(self):
        self.nodes = []
        self.pods = []
    
    def schedule_pod(self, pod_spec, nodes):
        """
        Simplified scheduling algorithm
        """
        # 1. Filtering Phase
        feasible_nodes = self.filter_nodes(pod_spec, nodes)
        
        # 2. Scoring Phase
        scored_nodes = self.score_nodes(pod_spec, feasible_nodes)
        
        # 3. Select best node
        best_node = max(scored_nodes, key=lambda x: x['score'])
        
        return best_node['node']
    
    def filter_nodes(self, pod_spec, nodes):
        """
        Filter nodes based on resource requirements
        """
        feasible = []
        
        for node in nodes:
            # Check resource requirements
            if (node['available_cpu'] >= pod_spec['cpu_request'] and
                node['available_memory'] >= pod_spec['memory_request']):
                
                # Check node selectors
                if self.check_node_selectors(pod_spec, node):
                    # Check taints and tolerations
                    if self.check_taints_tolerations(pod_spec, node):
                        feasible.append(node)
        
        return feasible
    
    def score_nodes(self, pod_spec, nodes):
        """
        Score nodes based on various factors
        """
        scored_nodes = []
        
        for node in nodes:
            score = 0
            
            # Resource utilization scoring
            cpu_utilization = (node['used_cpu'] / node['total_cpu']) * 100
            memory_utilization = (node['used_memory'] / node['total_memory']) * 100
            
            # Prefer nodes with balanced resource usage
            if 30 <= cpu_utilization <= 70:
                score += 10
            if 30 <= memory_utilization <= 70:
                score += 10
            
            # Affinity/Anti-affinity scoring
            score += self.calculate_affinity_score(pod_spec, node)
            
            scored_nodes.append({
                'node': node,
                'score': score
            })
        
        return scored_nodes
    
    def check_node_selectors(self, pod_spec, node):
        """Check if pod's node selector matches node labels"""
        if 'node_selector' not in pod_spec:
            return True
        
        for key, value in pod_spec['node_selector'].items():
            if node['labels'].get(key) != value:
                return False
        
        return True
    
    def check_taints_tolerations(self, pod_spec, node):
        """Check if pod tolerates node taints"""
        tolerations = pod_spec.get('tolerations', [])
        
        for taint in node.get('taints', []):
            if not self.pod_tolerates_taint(taint, tolerations):
                return False
        
        return True
    
    def pod_tolerates_taint(self, taint, tolerations):
        """Check if pod has toleration for specific taint"""
        for toleration in tolerations:
            if (toleration.get('key') == taint['key'] and
                toleration.get('operator', 'Equal') == 'Equal' and
                toleration.get('value') == taint['value']):
                return True
        
        return False
    
    def calculate_affinity_score(self, pod_spec, node):
        """Calculate affinity/anti-affinity score"""
        score = 0
        
        # Pod affinity
        if 'affinity' in pod_spec:
            affinity = pod_spec['affinity']
            
            # Node affinity
            if 'node_affinity' in affinity:
                score += self.score_node_affinity(affinity['node_affinity'], node)
            
            # Pod affinity
            if 'pod_affinity' in affinity:
                score += self.score_pod_affinity(affinity['pod_affinity'], node)
        
        return score
    
    def score_node_affinity(self, node_affinity, node):
        """Score based on node affinity rules"""
        score = 0
        
        # Preferred scheduling terms
        preferred_terms = node_affinity.get('preferred_during_scheduling_ignored_during_execution', [])
        
        for term in preferred_terms:
            if self.node_matches_selector(node, term['preference']):
                score += term['weight']
        
        return score
    
    def score_pod_affinity(self, pod_affinity, node):
        """Score based on pod affinity rules"""
        # Simplified implementation
        return 0
    
    def node_matches_selector(self, node, selector):
        """Check if node matches label selector"""
        match_expressions = selector.get('match_expressions', [])
        
        for expr in match_expressions:
            key = expr['key']
            operator = expr['operator']
            values = expr.get('values', [])
            
            node_value = node['labels'].get(key)
            
            if operator == 'In' and node_value not in values:
                return False
            elif operator == 'NotIn' and node_value in values:
                return False
            elif operator == 'Exists' and key not in node['labels']:
                return False
            elif operator == 'DoesNotExist' and key in node['labels']:
                return False
        
        return True


# Example usage
if __name__ == "__main__":
    scheduler = KubernetesScheduler()
    
    # Sample nodes
    nodes = [
        {
            'name': 'node-1',
            'total_cpu': 4000,  # millicores
            'used_cpu': 1000,
            'available_cpu': 3000,
            'total_memory': 8192,  # MB
            'used_memory': 2048,
            'available_memory': 6144,
            'labels': {
                'kubernetes.io/hostname': 'node-1',
                'node-type': 'worker',
                'zone': 'us-west-1a'
            },
            'taints': []
        },
        {
            'name': 'node-2',
            'total_cpu': 4000,
            'used_cpu': 2000,
            'available_cpu': 2000,
            'total_memory': 8192,
            'used_memory': 4096,
            'available_memory': 4096,
            'labels': {
                'kubernetes.io/hostname': 'node-2',
                'node-type': 'worker',
                'zone': 'us-west-1b'
            },
            'taints': []
        }
    ]
    
    # Sample pod specification
    pod_spec = {
        'name': 'example-pod',
        'cpu_request': 500,
        'memory_request': 1024,
        'node_selector': {
            'node-type': 'worker'
        },
        'tolerations': [],
        'affinity': {
            'node_affinity': {
                'preferred_during_scheduling_ignored_during_execution': [
                    {
                        'weight': 50,
                        'preference': {
                            'match_expressions': [
                                {
                                    'key': 'zone',
                                    'operator': 'In',
                                    'values': ['us-west-1a']
                                }
                            ]
                        }
                    }
                ]
            }
        }
    }
    
    # Schedule the pod
    selected_node = scheduler.schedule_pod(pod_spec, nodes)
    print(f"Pod scheduled to: {selected_node['name']}")
```

### Worker Node Components

**1. kubelet**
```bash
# Primary node agent
# Manages pods and containers
# Reports node and pod status to API server

# Check kubelet status
systemctl status kubelet

# View kubelet logs
journalctl -u kubelet -f

# Kubelet configuration
cat /var/lib/kubelet/config.yaml
```

**2. kube-proxy**
```yaml
# Network proxy running on each node
# Maintains network rules for Services
apiVersion: v1
kind: Service
metadata:
  name: example-service
spec:
  selector:
    app: example
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP

---
# kube-proxy creates iptables rules for this service
# Example iptables rule created by kube-proxy:
# -A KUBE-SERVICES -d 10.96.0.1/32 -p tcp -m tcp --dport 80 -j KUBE-SVC-EXAMPLE
```

**3. Container Runtime**
```bash
# Container runtime (Docker, containerd, CRI-O)
# Pulls images and runs containers

# Check container runtime
kubectl get nodes -o wide

# For containerd
crictl ps
crictl images

# For Docker (deprecated in newer versions)
docker ps
docker images
```

### Networking Architecture

```yaml
# Pod Network Example
apiVersion: v1
kind: Pod
metadata:
  name: network-example
  labels:
    app: network-demo
spec:
  containers:
  - name: app
    image: nginx:1.21
    ports:
    - containerPort: 80
      name: http
    env:
    - name: POD_IP
      valueFrom:
        fieldRef:
          fieldPath: status.podIP
    - name: NODE_NAME
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName

---
# Service Network Example
apiVersion: v1
kind: Service
metadata:
  name: network-demo-service
spec:
  selector:
    app: network-demo
  ports:
  - port: 80
    targetPort: 80
    protocol: TCP
  type: ClusterIP

---
# Ingress Example
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: network-demo-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: demo.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: network-demo-service
            port:
              number: 80
```

### Key Architectural Principles

**1. Declarative Configuration**
```yaml
# Desired state specification
apiVersion: apps/v1
kind: Deployment
metadata:
  name: declarative-example
spec:
  replicas: 3  # Desired state: 3 replicas
  selector:
    matchLabels:
      app: example
  template:
    metadata:
      labels:
        app: example
    spec:
      containers:
      - name: app
        image: nginx:1.21
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 200m
            memory: 256Mi
```

**2. Controller Pattern**
```python
# Simplified controller loop
def controller_loop():
    while True:
        # 1. Observe current state
        current_state = get_current_state()
        
        # 2. Compare with desired state
        desired_state = get_desired_state()
        
        # 3. Take action to reconcile
        if current_state != desired_state:
            reconcile(current_state, desired_state)
        
        # 4. Wait before next iteration
        time.sleep(30)
```

**3. API-Driven Architecture**
```bash
# Everything in Kubernetes is an API object
kubectl api-resources

# Custom Resource Definitions extend the API
kubectl get crd

# API versioning
kubectl api-versions
```

### Architecture Benefits

1. **High Availability**: Control plane can be distributed across multiple nodes
2. **Scalability**: Horizontal scaling of both applications and infrastructure
3. **Portability**: Runs on various cloud providers and on-premises
4. **Extensibility**: Custom resources and operators extend functionality
5. **Self-healing**: Automatic restart, replacement, and rescheduling
6. **Service Discovery**: Built-in DNS and service discovery
7. **Load Balancing**: Automatic traffic distribution
8. **Rolling Updates**: Zero-downtime deployments

## Q2: Explain Kubernetes Pods and their lifecycle management?
**Difficulty: Medium**

**Answer:**

A Pod is the smallest deployable unit in Kubernetes that represents a group of one or more containers with shared storage, network, and a specification for how to run the containers. Pods are ephemeral and designed to be disposable and replaceable.

### Pod Fundamentals

```yaml
# Basic Pod Definition
apiVersion: v1
kind: Pod
metadata:
  name: basic-pod
  namespace: default
  labels:
    app: web-server
    version: v1.0
  annotations:
    description: "Basic web server pod"
spec:
  containers:
  - name: web-container
    image: nginx:1.21
    ports:
    - containerPort: 80
      name: http
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    env:
    - name: ENV_VAR
      value: "production"
    volumeMounts:
    - name: config-volume
      mountPath: /etc/config
  volumes:
  - name: config-volume
    configMap:
      name: app-config
  restartPolicy: Always
  nodeSelector:
    disktype: ssd
```

### Multi-Container Pod Example

```yaml
# Sidecar Pattern Pod
apiVersion: v1
kind: Pod
metadata:
  name: multi-container-pod
  labels:
    app: web-app
spec:
  containers:
  # Main application container
  - name: web-app
    image: nginx:1.21
    ports:
    - containerPort: 80
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx
    - name: shared-data
      mountPath: /usr/share/nginx/html
  
  # Sidecar container for log processing
  - name: log-processor
    image: fluent/fluent-bit:1.8
    volumeMounts:
    - name: shared-logs
      mountPath: /var/log/nginx
    - name: fluent-bit-config
      mountPath: /fluent-bit/etc
  
  # Init container for setup
  initContainers:
  - name: setup
    image: busybox:1.35
    command: ['sh', '-c']
    args:
    - |
      echo "Setting up application..."
      echo "<h1>Hello from Init Container</h1>" > /shared/index.html
      echo "Setup completed"
    volumeMounts:
    - name: shared-data
      mountPath: /shared
  
  volumes:
  - name: shared-logs
    emptyDir: {}
  - name: shared-data
    emptyDir: {}
  - name: fluent-bit-config
    configMap:
      name: fluent-bit-config
```

### Pod Lifecycle Management

```python
#!/usr/bin/env python3
"""
Kubernetes Pod Lifecycle Manager
"""

import time
from enum import Enum
from typing import Dict, List, Optional
from dataclasses import dataclass
from datetime import datetime, timedelta

class PodPhase(Enum):
    PENDING = "Pending"
    RUNNING = "Running"
    SUCCEEDED = "Succeeded"
    FAILED = "Failed"
    UNKNOWN = "Unknown"

class ContainerState(Enum):
    WAITING = "Waiting"
    RUNNING = "Running"
    TERMINATED = "Terminated"

@dataclass
class ContainerStatus:
    name: str
    state: ContainerState
    ready: bool
    restart_count: int
    image: str
    container_id: Optional[str] = None
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    exit_code: Optional[int] = None
    reason: Optional[str] = None
    message: Optional[str] = None

@dataclass
class PodCondition:
    type: str  # Ready, Initialized, PodScheduled, ContainersReady
    status: str  # True, False, Unknown
    last_transition_time: datetime
    reason: Optional[str] = None
    message: Optional[str] = None

class PodLifecycleManager:
    def __init__(self):
        self.pods: Dict[str, 'Pod'] = {}
        self.events: List[Dict] = []
    
    def create_pod(self, pod_spec: Dict) -> 'Pod':
        """
        Create a new pod and start its lifecycle
        """
        pod = Pod(pod_spec)
        self.pods[pod.name] = pod
        
        # Start lifecycle management
        self._schedule_pod(pod)
        
        return pod
    
    def _schedule_pod(self, pod: 'Pod'):
        """
        Schedule pod to a node (simplified)
        """
        pod.phase = PodPhase.PENDING
        pod.add_condition(PodCondition(
            type="PodScheduled",
            status="True",
            last_transition_time=datetime.now(),
            reason="Scheduled",
            message="Successfully assigned to node"
        ))
        
        # Simulate scheduling delay
        time.sleep(1)
        
        self._start_init_containers(pod)
    
    def _start_init_containers(self, pod: 'Pod'):
        """
        Start init containers sequentially
        """
        if not pod.init_containers:
            self._start_main_containers(pod)
            return
        
        for init_container in pod.init_containers:
            print(f"Starting init container: {init_container['name']}")
            
            # Simulate init container execution
            container_status = ContainerStatus(
                name=init_container['name'],
                state=ContainerState.RUNNING,
                ready=False,
                restart_count=0,
                image=init_container['image'],
                started_at=datetime.now()
            )
            
            pod.container_statuses.append(container_status)
            
            # Simulate completion
            time.sleep(2)
            
            container_status.state = ContainerState.TERMINATED
            container_status.finished_at = datetime.now()
            container_status.exit_code = 0
            container_status.reason = "Completed"
            
            print(f"Init container {init_container['name']} completed")
        
        pod.add_condition(PodCondition(
            type="Initialized",
            status="True",
            last_transition_time=datetime.now(),
            reason="InitContainersCompleted",
            message="All init containers completed successfully"
        ))
        
        self._start_main_containers(pod)
    
    def _start_main_containers(self, pod: 'Pod'):
        """
        Start main containers in parallel
        """
        print(f"Starting main containers for pod: {pod.name}")
        
        all_ready = True
        
        for container in pod.containers:
            print(f"Starting container: {container['name']}")
            
            container_status = ContainerStatus(
                name=container['name'],
                state=ContainerState.RUNNING,
                ready=True,
                restart_count=0,
                image=container['image'],
                container_id=f"docker://{container['name']}-{int(time.time())}",
                started_at=datetime.now()
            )
            
            pod.container_statuses.append(container_status)
            
            # Simulate readiness probe
            if not self._check_readiness_probe(container):
                container_status.ready = False
                all_ready = False
        
        if all_ready:
            pod.phase = PodPhase.RUNNING
            pod.add_condition(PodCondition(
                type="ContainersReady",
                status="True",
                last_transition_time=datetime.now(),
                reason="ContainersReady",
                message="All containers are ready"
            ))
            
            pod.add_condition(PodCondition(
                type="Ready",
                status="True",
                last_transition_time=datetime.now(),
                reason="PodReady",
                message="Pod is ready to serve traffic"
            ))
        
        print(f"Pod {pod.name} is now {pod.phase.value}")
    
    def _check_readiness_probe(self, container: Dict) -> bool:
        """
        Simulate readiness probe check
        """
        readiness_probe = container.get('readinessProbe')
        if not readiness_probe:
            return True
        
        # Simulate probe execution
        time.sleep(0.5)
        
        # 90% success rate for simulation
        import random
        return random.random() > 0.1
    
    def _check_liveness_probe(self, container: Dict) -> bool:
        """
        Simulate liveness probe check
        """
        liveness_probe = container.get('livenessProbe')
        if not liveness_probe:
            return True
        
        # Simulate probe execution
        time.sleep(0.5)
        
        # 95% success rate for simulation
        import random
        return random.random() > 0.05
    
    def monitor_pods(self):
        """
        Continuous monitoring of pod health
        """
        while True:
            for pod in self.pods.values():
                if pod.phase == PodPhase.RUNNING:
                    self._perform_health_checks(pod)
            
            time.sleep(10)  # Check every 10 seconds
    
    def _perform_health_checks(self, pod: 'Pod'):
        """
        Perform liveness and readiness probes
        """
        for container_status in pod.container_statuses:
            if container_status.state == ContainerState.RUNNING:
                container_spec = next(
                    (c for c in pod.containers if c['name'] == container_status.name),
                    None
                )
                
                if container_spec:
                    # Liveness probe
                    if not self._check_liveness_probe(container_spec):
                        print(f"Liveness probe failed for {container_status.name}")
                        self._restart_container(pod, container_status)
                    
                    # Readiness probe
                    was_ready = container_status.ready
                    container_status.ready = self._check_readiness_probe(container_spec)
                    
                    if was_ready != container_status.ready:
                        self._update_pod_ready_condition(pod)
    
    def _restart_container(self, pod: 'Pod', container_status: ContainerStatus):
        """
        Restart a failed container
        """
        print(f"Restarting container: {container_status.name}")
        
        container_status.state = ContainerState.TERMINATED
        container_status.finished_at = datetime.now()
        container_status.exit_code = 1
        container_status.reason = "Error"
        container_status.restart_count += 1
        
        # Simulate restart delay
        time.sleep(2)
        
        container_status.state = ContainerState.RUNNING
        container_status.started_at = datetime.now()
        container_status.ready = True
        
        print(f"Container {container_status.name} restarted (restart count: {container_status.restart_count})")
    
    def _update_pod_ready_condition(self, pod: 'Pod'):
        """
        Update pod ready condition based on container readiness
        """
        all_ready = all(
            cs.ready for cs in pod.container_statuses 
            if cs.state == ContainerState.RUNNING
        )
        
        ready_condition = next(
            (c for c in pod.conditions if c.type == "Ready"),
            None
        )
        
        if ready_condition:
            if (ready_condition.status == "True") != all_ready:
                ready_condition.status = "True" if all_ready else "False"
                ready_condition.last_transition_time = datetime.now()
                ready_condition.reason = "ContainersReady" if all_ready else "ContainersNotReady"
    
    def delete_pod(self, pod_name: str, grace_period: int = 30):
        """
        Gracefully delete a pod
        """
        if pod_name not in self.pods:
            return
        
        pod = self.pods[pod_name]
        print(f"Deleting pod: {pod_name} (grace period: {grace_period}s)")
        
        # Send SIGTERM to containers
        for container_status in pod.container_statuses:
            if container_status.state == ContainerState.RUNNING:
                print(f"Sending SIGTERM to container: {container_status.name}")
                container_status.reason = "Terminating"
        
        # Wait for grace period
        time.sleep(min(grace_period, 5))  # Simulate shorter for demo
        
        # Force kill if still running
        for container_status in pod.container_statuses:
            if container_status.state == ContainerState.RUNNING:
                print(f"Force killing container: {container_status.name}")
                container_status.state = ContainerState.TERMINATED
                container_status.finished_at = datetime.now()
                container_status.exit_code = 137  # SIGKILL
                container_status.reason = "Killed"
        
        pod.phase = PodPhase.SUCCEEDED
        del self.pods[pod_name]
        print(f"Pod {pod_name} deleted")

class Pod:
    def __init__(self, spec: Dict):
        self.name = spec['metadata']['name']
        self.namespace = spec['metadata'].get('namespace', 'default')
        self.labels = spec['metadata'].get('labels', {})
        self.annotations = spec['metadata'].get('annotations', {})
        
        self.containers = spec['spec']['containers']
        self.init_containers = spec['spec'].get('initContainers', [])
        self.volumes = spec['spec'].get('volumes', [])
        self.restart_policy = spec['spec'].get('restartPolicy', 'Always')
        self.node_selector = spec['spec'].get('nodeSelector', {})
        
        self.phase = PodPhase.PENDING
        self.conditions: List[PodCondition] = []
        self.container_statuses: List[ContainerStatus] = []
        
        self.created_at = datetime.now()
        self.started_at: Optional[datetime] = None
        self.finished_at: Optional[datetime] = None
    
    def add_condition(self, condition: PodCondition):
        # Remove existing condition of same type
        self.conditions = [c for c in self.conditions if c.type != condition.type]
        self.conditions.append(condition)
    
    def get_status(self) -> Dict:
        return {
            'phase': self.phase.value,
            'conditions': [
                {
                    'type': c.type,
                    'status': c.status,
                    'lastTransitionTime': c.last_transition_time.isoformat(),
                    'reason': c.reason,
                    'message': c.message
                }
                for c in self.conditions
            ],
            'containerStatuses': [
                {
                    'name': cs.name,
                    'state': cs.state.value,
                    'ready': cs.ready,
                    'restartCount': cs.restart_count,
                    'image': cs.image,
                    'containerID': cs.container_id
                }
                for cs in self.container_statuses
            ]
        }


# Example usage
if __name__ == "__main__":
    # Pod specification
    pod_spec = {
        'apiVersion': 'v1',
        'kind': 'Pod',
        'metadata': {
            'name': 'example-pod',
            'namespace': 'default',
            'labels': {
                'app': 'web-server'
            }
        },
        'spec': {
            'initContainers': [
                {
                    'name': 'init-setup',
                    'image': 'busybox:1.35',
                    'command': ['sh', '-c', 'echo "Initializing..." && sleep 2']
                }
            ],
            'containers': [
                {
                    'name': 'web-server',
                    'image': 'nginx:1.21',
                    'ports': [{'containerPort': 80}],
                    'readinessProbe': {
                        'httpGet': {
                            'path': '/',
                            'port': 80
                        },
                        'initialDelaySeconds': 5,
                        'periodSeconds': 10
                    },
                    'livenessProbe': {
                        'httpGet': {
                            'path': '/health',
                            'port': 80
                        },
                        'initialDelaySeconds': 15,
                        'periodSeconds': 20
                    }
                }
            ],
            'restartPolicy': 'Always'
        }
    }
    
    # Create and manage pod
    manager = PodLifecycleManager()
    pod = manager.create_pod(pod_spec)
    
    # Print pod status
    print("\nPod Status:")
    import json
    print(json.dumps(pod.get_status(), indent=2, default=str))
```

### Pod Lifecycle Phases

1. **Pending**: Pod accepted but containers not yet created
2. **Running**: Pod bound to node and at least one container is running
3. **Succeeded**: All containers terminated successfully
4. **Failed**: All containers terminated, at least one failed
5. **Unknown**: Pod state cannot be determined

### Pod Restart Policies

```yaml
# Always restart (default)
apiVersion: v1
kind: Pod
metadata:
  name: always-restart
spec:
  restartPolicy: Always
  containers:
  - name: app
    image: nginx:1.21

---
# Never restart
apiVersion: v1
kind: Pod
metadata:
  name: never-restart
spec:
  restartPolicy: Never
  containers:
  - name: batch-job
    image: busybox:1.35
    command: ["sh", "-c", "echo 'Job completed' && exit 0"]

---
# Restart only on failure
apiVersion: v1
kind: Pod
metadata:
  name: on-failure-restart
spec:
  restartPolicy: OnFailure
  containers:
  - name: worker
    image: python:3.9
    command: ["python", "-c", "import sys; sys.exit(1)"]
```

### Health Checks and Probes

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: health-check-pod
spec:
  containers:
  - name: app
    image: nginx:1.21
    ports:
    - containerPort: 80
    
    # Readiness Probe
    readinessProbe:
      httpGet:
        path: /ready
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 10
      timeoutSeconds: 5
      successThreshold: 1
      failureThreshold: 3
    
    # Liveness Probe
    livenessProbe:
      httpGet:
        path: /health
        port: 80
      initialDelaySeconds: 15
      periodSeconds: 20
      timeoutSeconds: 5
      failureThreshold: 3
    
    # Startup Probe (for slow-starting containers)
    startupProbe:
      httpGet:
        path: /startup
        port: 80
      initialDelaySeconds: 10
      periodSeconds: 10
      timeoutSeconds: 5
      failureThreshold: 30
```

### Pod Best Practices

1. **Single Responsibility**: One main process per container
2. **Immutable Infrastructure**: Don't modify running containers
3. **Resource Limits**: Always set resource requests and limits
4. **Health Checks**: Implement proper readiness and liveness probes
5. **Graceful Shutdown**: Handle SIGTERM signals properly
6. **Security**: Run as non-root user when possible
7. **Logging**: Log to stdout/stderr for centralized collection
8. **Configuration**: Use ConfigMaps and Secrets for configuration

## Q3: What are Kubernetes Services and how do they enable service discovery?
**Difficulty: Medium**

**Answer:**

Kubernetes Services provide a stable network endpoint for accessing a set of Pods. They abstract away the complexity of Pod IP addresses, which can change when Pods are recreated, and provide load balancing, service discovery, and external access capabilities.

### Service Types Overview

```yaml
# Service Types Comparison
apiVersion: v1
kind: ConfigMap
metadata:
  name: service-types-overview
data:
  service-types.yaml: |
    service-types:
      ClusterIP:
        description: "Internal cluster access only"
        use-case: "Internal microservices communication"
        ip-range: "Cluster internal IP range"
      NodePort:
        description: "Exposes service on each node's IP at a static port"
        use-case: "External access for development/testing"
        port-range: "30000-32767"
      LoadBalancer:
        description: "Exposes service externally using cloud provider's load balancer"
        use-case: "Production external access"
        requirements: "Cloud provider support"
      ExternalName:
        description: "Maps service to external DNS name"
        use-case: "External service integration"
        mechanism: "DNS CNAME record"
```

### ClusterIP Service (Default)

```yaml
# ClusterIP Service Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0
    spec:
      containers:
      - name: web-container
        image: nginx:1.21
        ports:
        - containerPort: 80
          name: http
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
  labels:
    app: web-app
spec:
  type: ClusterIP  # Default type
  selector:
    app: web-app  # Matches pods with this label
  ports:
  - name: http
    port: 80        # Service port
    targetPort: 80  # Container port
    protocol: TCP
  sessionAffinity: None  # None or ClientIP
```

### NodePort Service

```yaml
# NodePort Service Example
apiVersion: v1
kind: Service
metadata:
  name: web-app-nodeport
  labels:
    app: web-app
spec:
  type: NodePort
  selector:
    app: web-app
  ports:
  - name: http
    port: 80          # Service port
    targetPort: 80    # Container port
    nodePort: 30080   # External port on each node (30000-32767)
    protocol: TCP
```

### LoadBalancer Service

```yaml
# LoadBalancer Service Example
apiVersion: v1
kind: Service
metadata:
  name: web-app-loadbalancer
  labels:
    app: web-app
  annotations:
    # Cloud provider specific annotations
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
    service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
spec:
  type: LoadBalancer
  selector:
    app: web-app
  ports:
  - name: http
    port: 80
    targetPort: 80
    protocol: TCP
  - name: https
    port: 443
    targetPort: 8443
    protocol: TCP
  loadBalancerSourceRanges:
  - "10.0.0.0/8"    # Restrict access to specific IP ranges
  - "172.16.0.0/12"
  - "192.168.0.0/16"
```

### ExternalName Service

```yaml
# ExternalName Service Example
apiVersion: v1
kind: Service
metadata:
  name: external-database
  namespace: production
spec:
  type: ExternalName
  externalName: database.example.com
  ports:
  - port: 5432
    targetPort: 5432
    protocol: TCP

---
# Usage in application
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-using-external-db
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: app
        image: myapp:latest
        env:
        - name: DATABASE_HOST
          value: "external-database.production.svc.cluster.local"
        - name: DATABASE_PORT
          value: "5432"
```

### Service Discovery Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Service Discovery Simulation
"""

import json
import random
from typing import Dict, List, Optional
from dataclasses import dataclass, field
from enum import Enum

class ServiceType(Enum):
    CLUSTER_IP = "ClusterIP"
    NODE_PORT = "NodePort"
    LOAD_BALANCER = "LoadBalancer"
    EXTERNAL_NAME = "ExternalName"

class EndpointState(Enum):
    READY = "Ready"
    NOT_READY = "NotReady"
    TERMINATING = "Terminating"

@dataclass
class Endpoint:
    ip: str
    port: int
    node_name: str
    pod_name: str
    state: EndpointState = EndpointState.READY
    ready: bool = True

@dataclass
class ServicePort:
    name: str
    port: int
    target_port: int
    protocol: str = "TCP"
    node_port: Optional[int] = None

@dataclass
class Service:
    name: str
    namespace: str
    service_type: ServiceType
    cluster_ip: str
    selector: Dict[str, str]
    ports: List[ServicePort]
    endpoints: List[Endpoint] = field(default_factory=list)
    external_name: Optional[str] = None
    load_balancer_ip: Optional[str] = None
    session_affinity: str = "None"

class DNSResolver:
    def __init__(self):
        self.dns_records: Dict[str, str] = {}
        self.srv_records: Dict[str, List[Dict]] = {}
    
    def register_service(self, service: Service):
        """
        Register service in DNS
        """
        # A record for service
        service_fqdn = f"{service.name}.{service.namespace}.svc.cluster.local"
        
        if service.service_type == ServiceType.EXTERNAL_NAME:
            # CNAME record for ExternalName
            self.dns_records[service_fqdn] = service.external_name
        else:
            # A record pointing to ClusterIP
            self.dns_records[service_fqdn] = service.cluster_ip
        
        # SRV records for service ports
        srv_records = []
        for port in service.ports:
            srv_record = {
                'port': port.port,
                'target': service_fqdn,
                'weight': 10,
                'priority': 10
            }
            srv_records.append(srv_record)
            
            # Named port SRV record
            if port.name:
                port_fqdn = f"_{port.name}._tcp.{service_fqdn}"
                self.srv_records[port_fqdn] = [srv_record]
        
        self.srv_records[f"_tcp.{service_fqdn}"] = srv_records
    
    def resolve(self, hostname: str) -> Optional[str]:
        """
        Resolve hostname to IP address
        """
        return self.dns_records.get(hostname)
    
    def resolve_srv(self, service_name: str) -> List[Dict]:
        """
        Resolve SRV record
        """
        return self.srv_records.get(service_name, [])

class ServiceDiscovery:
    def __init__(self):
        self.services: Dict[str, Service] = {}
        self.pods: Dict[str, Dict] = {}
        self.dns_resolver = DNSResolver()
        self.cluster_ip_pool = self._generate_cluster_ips()
        self.node_port_pool = list(range(30000, 32768))
    
    def _generate_cluster_ips(self) -> List[str]:
        """
        Generate pool of cluster IP addresses
        """
        ips = []
        for i in range(1, 255):
            ips.append(f"10.96.0.{i}")
        return ips
    
    def create_service(self, service_spec: Dict) -> Service:
        """
        Create a new service
        """
        metadata = service_spec['metadata']
        spec = service_spec['spec']
        
        # Allocate cluster IP
        cluster_ip = None
        if spec.get('type', 'ClusterIP') != 'ExternalName':
            if spec.get('clusterIP') == 'None':
                cluster_ip = 'None'  # Headless service
            else:
                cluster_ip = self.cluster_ip_pool.pop(0)
        
        # Process ports
        ports = []
        for port_spec in spec.get('ports', []):
            node_port = None
            if spec.get('type') == 'NodePort':
                node_port = port_spec.get('nodePort')
                if not node_port:
                    node_port = self.node_port_pool.pop(0)
                elif node_port in self.node_port_pool:
                    self.node_port_pool.remove(node_port)
            
            service_port = ServicePort(
                name=port_spec.get('name', ''),
                port=port_spec['port'],
                target_port=port_spec.get('targetPort', port_spec['port']),
                protocol=port_spec.get('protocol', 'TCP'),
                node_port=node_port
            )
            ports.append(service_port)
        
        # Create service
        service = Service(
            name=metadata['name'],
            namespace=metadata.get('namespace', 'default'),
            service_type=ServiceType(spec.get('type', 'ClusterIP')),
            cluster_ip=cluster_ip,
            selector=spec.get('selector', {}),
            ports=ports,
            external_name=spec.get('externalName'),
            session_affinity=spec.get('sessionAffinity', 'None')
        )
        
        # Allocate load balancer IP if needed
        if service.service_type == ServiceType.LOAD_BALANCER:
            service.load_balancer_ip = f"203.0.113.{random.randint(1, 254)}"
        
        # Register in DNS
        self.dns_resolver.register_service(service)
        
        # Update endpoints
        self._update_service_endpoints(service)
        
        service_key = f"{service.namespace}/{service.name}"
        self.services[service_key] = service
        
        return service
    
    def register_pod(self, pod_spec: Dict):
        """
        Register a pod for service discovery
        """
        metadata = pod_spec['metadata']
        spec = pod_spec['spec']
        
        pod_key = f"{metadata.get('namespace', 'default')}/{metadata['name']}"
        
        pod_info = {
            'name': metadata['name'],
            'namespace': metadata.get('namespace', 'default'),
            'labels': metadata.get('labels', {}),
            'ip': f"10.244.{random.randint(0, 255)}.{random.randint(1, 254)}",
            'node_name': f"node-{random.randint(1, 3)}",
            'phase': 'Running',
            'ready': True,
            'ports': []
        }
        
        # Extract container ports
        for container in spec.get('containers', []):
            for port in container.get('ports', []):
                pod_info['ports'].append({
                    'name': port.get('name', ''),
                    'containerPort': port['containerPort'],
                    'protocol': port.get('protocol', 'TCP')
                })
        
        self.pods[pod_key] = pod_info
        
        # Update all services that might select this pod
        self._update_all_service_endpoints()
    
    def _update_all_service_endpoints(self):
        """
        Update endpoints for all services
        """
        for service in self.services.values():
            self._update_service_endpoints(service)
    
    def _update_service_endpoints(self, service: Service):
        """
        Update endpoints for a specific service
        """
        if not service.selector:
            return  # Headless service or ExternalName
        
        endpoints = []
        
        for pod in self.pods.values():
            if pod['namespace'] != service.namespace:
                continue
            
            # Check if pod matches service selector
            if self._pod_matches_selector(pod, service.selector):
                for service_port in service.ports:
                    # Find matching pod port
                    pod_port = self._find_pod_port(pod, service_port.target_port)
                    if pod_port:
                        endpoint = Endpoint(
                            ip=pod['ip'],
                            port=pod_port,
                            node_name=pod['node_name'],
                            pod_name=pod['name'],
                            state=EndpointState.READY if pod['ready'] else EndpointState.NOT_READY,
                            ready=pod['ready']
                        )
                        endpoints.append(endpoint)
        
        service.endpoints = endpoints
    
    def _pod_matches_selector(self, pod: Dict, selector: Dict[str, str]) -> bool:
        """
        Check if pod labels match service selector
        """
        pod_labels = pod.get('labels', {})
        
        for key, value in selector.items():
            if pod_labels.get(key) != value:
                return False
        
        return True
    
    def _find_pod_port(self, pod: Dict, target_port) -> Optional[int]:
        """
        Find pod port that matches target port
        """
        # target_port can be port number or port name
        if isinstance(target_port, int):
            # Look for exact port match
            for port in pod['ports']:
                if port['containerPort'] == target_port:
                    return target_port
        else:
            # Look for named port
            for port in pod['ports']:
                if port.get('name') == target_port:
                    return port['containerPort']
        
        return None
    
    def get_service_endpoints(self, service_name: str, namespace: str = 'default') -> List[Endpoint]:
        """
        Get endpoints for a service
        """
        service_key = f"{namespace}/{service_name}"
        service = self.services.get(service_key)
        
        if not service:
            return []
        
        return [ep for ep in service.endpoints if ep.ready]
    
    def resolve_service(self, service_name: str, namespace: str = 'default') -> Optional[str]:
        """
        Resolve service name to IP address
        """
        # Try different DNS formats
        dns_names = [
            service_name,  # Short name within same namespace
            f"{service_name}.{namespace}",  # Cross-namespace
            f"{service_name}.{namespace}.svc",  # Full service domain
            f"{service_name}.{namespace}.svc.cluster.local"  # FQDN
        ]
        
        for dns_name in dns_names:
            ip = self.dns_resolver.resolve(dns_name)
            if ip:
                return ip
        
        return None
    
    def load_balance_request(self, service_name: str, namespace: str = 'default') -> Optional[Endpoint]:
        """
        Load balance a request to service endpoints
        """
        endpoints = self.get_service_endpoints(service_name, namespace)
        
        if not endpoints:
            return None
        
        # Simple round-robin load balancing
        return random.choice(endpoints)
    
    def get_service_info(self, service_name: str, namespace: str = 'default') -> Optional[Dict]:
        """
        Get comprehensive service information
        """
        service_key = f"{namespace}/{service_name}"
        service = self.services.get(service_key)
        
        if not service:
            return None
        
        return {
            'name': service.name,
            'namespace': service.namespace,
            'type': service.service_type.value,
            'clusterIP': service.cluster_ip,
            'loadBalancerIP': service.load_balancer_ip,
            'externalName': service.external_name,
            'ports': [
                {
                    'name': p.name,
                    'port': p.port,
                    'targetPort': p.target_port,
                    'nodePort': p.node_port,
                    'protocol': p.protocol
                }
                for p in service.ports
            ],
            'endpoints': [
                {
                    'ip': ep.ip,
                    'port': ep.port,
                    'nodeName': ep.node_name,
                    'podName': ep.pod_name,
                    'ready': ep.ready
                }
                for ep in service.endpoints
            ],
            'selector': service.selector,
            'sessionAffinity': service.session_affinity
        }


# Example usage
if __name__ == "__main__":
    # Initialize service discovery
    sd = ServiceDiscovery()
    
    # Register some pods
    pod1_spec = {
        'metadata': {
            'name': 'web-app-1',
            'namespace': 'default',
            'labels': {
                'app': 'web-app',
                'version': 'v1.0'
            }
        },
        'spec': {
            'containers': [
                {
                    'name': 'web',
                    'ports': [
                        {
                            'name': 'http',
                            'containerPort': 80,
                            'protocol': 'TCP'
                        }
                    ]
                }
            ]
        }
    }
    
    pod2_spec = {
        'metadata': {
            'name': 'web-app-2',
            'namespace': 'default',
            'labels': {
                'app': 'web-app',
                'version': 'v1.0'
            }
        },
        'spec': {
            'containers': [
                {
                    'name': 'web',
                    'ports': [
                        {
                            'name': 'http',
                            'containerPort': 80,
                            'protocol': 'TCP'
                        }
                    ]
                }
            ]
        }
    }
    
    sd.register_pod(pod1_spec)
    sd.register_pod(pod2_spec)
    
    # Create a service
    service_spec = {
        'metadata': {
            'name': 'web-app-service',
            'namespace': 'default'
        },
        'spec': {
            'type': 'ClusterIP',
            'selector': {
                'app': 'web-app'
            },
            'ports': [
                {
                    'name': 'http',
                    'port': 80,
                    'targetPort': 80,
                    'protocol': 'TCP'
                }
            ]
        }
    }
    
    service = sd.create_service(service_spec)
    
    # Test service discovery
    print("Service Info:")
    print(json.dumps(sd.get_service_info('web-app-service'), indent=2))
    
    print("\nDNS Resolution:")
    print(f"web-app-service -> {sd.resolve_service('web-app-service')}")
    
    print("\nLoad Balancing:")
    for i in range(5):
        endpoint = sd.load_balance_request('web-app-service')
        if endpoint:
            print(f"Request {i+1} -> {endpoint.ip}:{endpoint.port} (pod: {endpoint.pod_name})")
```

### Headless Services

```yaml
# Headless Service for StatefulSet
apiVersion: v1
kind: Service
metadata:
  name: database-headless
  labels:
    app: database
spec:
  clusterIP: None  # Makes it headless
  selector:
    app: database
  ports:
  - name: mysql
    port: 3306
    targetPort: 3306
    protocol: TCP

---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: database
spec:
  serviceName: database-headless  # Links to headless service
  replicas: 3
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
    spec:
      containers:
      - name: mysql
        image: mysql:8.0
        ports:
        - containerPort: 3306
          name: mysql
        env:
        - name: MYSQL_ROOT_PASSWORD
          value: "password"
```

### Service Discovery Best Practices

1. **Use DNS Names**: Always use service DNS names instead of IP addresses
2. **Health Checks**: Implement proper readiness probes for accurate endpoints
3. **Session Affinity**: Use when needed but prefer stateless applications
4. **Port Naming**: Use descriptive names for service ports
5. **Namespace Isolation**: Use namespaces to isolate services
6. **Security**: Implement network policies to control service access
7. **Monitoring**: Monitor service endpoint health and DNS resolution
8. **Load Balancing**: Understand different load balancing algorithms

### Service Mesh Integration

```yaml
# Istio Service Mesh Example
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: web-app-vs
spec:
  hosts:
  - web-app-service
  http:
  - match:
    - headers:
        version:
          exact: v2
    route:
    - destination:
        host: web-app-service
        subset: v2
  - route:
    - destination:
        host: web-app-service
        subset: v1
      weight: 90
    - destination:
        host: web-app-service
        subset: v2
      weight: 10

---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: web-app-dr
spec:
  host: web-app-service
  subsets:
  - name: v1
    labels:
      version: v1.0
  - name: v2
    labels:
      version: v2.0
```

## Q4: How do you manage configuration and secrets in Kubernetes?
**Difficulty: Medium**

**Answer:**

Kubernetes provides ConfigMaps and Secrets to manage application configuration and sensitive data separately from container images. This separation allows for better security, flexibility, and environment-specific configurations.

### ConfigMaps Overview

ConfigMaps store non-sensitive configuration data in key-value pairs and can be consumed by Pods as environment variables, command-line arguments, or configuration files.

```yaml
# ConfigMap Examples
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
  namespace: default
data:
  # Simple key-value pairs
  database_host: "mysql.example.com"
  database_port: "3306"
  log_level: "INFO"
  feature_flags: "feature1=true,feature2=false"
  
  # Configuration file content
  app.properties: |
    server.port=8080
    server.servlet.context-path=/api
    spring.datasource.url=jdbc:mysql://mysql.example.com:3306/mydb
    spring.datasource.username=app_user
    logging.level.com.example=INFO
    
  nginx.conf: |
    server {
        listen 80;
        server_name example.com;
        
        location / {
            proxy_pass http://backend-service:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
        
        location /health {
            access_log off;
            return 200 "healthy\n";
        }
    }
    
  config.json: |
    {
      "api": {
        "version": "v1",
        "timeout": 30,
        "retries": 3
      },
      "cache": {
        "enabled": true,
        "ttl": 300
      },
      "features": {
        "authentication": true,
        "analytics": false
      }
    }
```

### Secrets Overview

Secrets store sensitive data such as passwords, tokens, and keys. They are base64 encoded and can be encrypted at rest.

```yaml
# Secret Examples
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: default
type: Opaque
data:
  # Base64 encoded values
  database_password: cGFzc3dvcmQxMjM=  # password123
  api_key: YWJjZGVmZ2hpams=  # abcdefghijk
  jwt_secret: bXlfc3VwZXJfc2VjcmV0X2tleQ==  # my_super_secret_key

---
# TLS Secret
apiVersion: v1
kind: Secret
metadata:
  name: tls-secret
  namespace: default
type: kubernetes.io/tls
data:
  tls.crt: LS0tLS1CRUdJTi... # Base64 encoded certificate
  tls.key: LS0tLS1CRUdJTi... # Base64 encoded private key

---
# Docker Registry Secret
apiVersion: v1
kind: Secret
metadata:
  name: registry-secret
  namespace: default
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: eyJhdXRocyI6eyJyZWdpc3RyeS5leGFtcGxlLmNvbSI6eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InBhc3MiLCJhdXRoIjoiZFhObGNqcHdZWE56In19fQ==

---
# Service Account Token Secret
apiVersion: v1
kind: Secret
metadata:
  name: service-account-token
  namespace: default
  annotations:
    kubernetes.io/service-account.name: "my-service-account"
type: kubernetes.io/service-account-token
```

### Using ConfigMaps and Secrets in Pods

```yaml
# Pod using ConfigMaps and Secrets
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-container
        image: nginx:1.21
        ports:
        - containerPort: 80
        
        # Environment variables from ConfigMap
        env:
        - name: DATABASE_HOST
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_host
        - name: DATABASE_PORT
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database_port
        - name: LOG_LEVEL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: log_level
        
        # Environment variables from Secret
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database_password
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: api_key
        
        # Load all ConfigMap keys as environment variables
        envFrom:
        - configMapRef:
            name: app-config
        - secretRef:
            name: app-secrets
        
        # Mount ConfigMap as volume
        volumeMounts:
        - name: config-volume
          mountPath: /etc/config
          readOnly: true
        - name: nginx-config
          mountPath: /etc/nginx/conf.d
          readOnly: true
        - name: secret-volume
          mountPath: /etc/secrets
          readOnly: true
        - name: tls-certs
          mountPath: /etc/ssl/certs
          readOnly: true
        
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
      
      # Image pull secret
      imagePullSecrets:
      - name: registry-secret
      
      volumes:
      # ConfigMap volumes
      - name: config-volume
        configMap:
          name: app-config
          items:
          - key: app.properties
            path: application.properties
          - key: config.json
            path: config.json
      
      - name: nginx-config
        configMap:
          name: app-config
          items:
          - key: nginx.conf
            path: default.conf
      
      # Secret volumes
      - name: secret-volume
        secret:
          secretName: app-secrets
          defaultMode: 0400  # Read-only for owner
          items:
          - key: jwt_secret
            path: jwt.key
      
      - name: tls-certs
        secret:
          secretName: tls-secret
          defaultMode: 0400
```

### Configuration Management Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Configuration and Secret Management Utility
"""

import base64
import json
import yaml
import os
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from pathlib import Path

@dataclass
class ConfigMapData:
    name: str
    namespace: str
    data: Dict[str, str] = field(default_factory=dict)
    binary_data: Dict[str, bytes] = field(default_factory=dict)
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

@dataclass
class SecretData:
    name: str
    namespace: str
    secret_type: str = "Opaque"
    data: Dict[str, str] = field(default_factory=dict)  # Base64 encoded
    string_data: Dict[str, str] = field(default_factory=dict)  # Plain text
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

class ConfigurationManager:
    def __init__(self):
        self.config_maps: Dict[str, ConfigMapData] = {}
        self.secrets: Dict[str, SecretData] = {}
    
    def create_configmap_from_files(self, name: str, namespace: str, 
                                   file_paths: List[str], 
                                   labels: Optional[Dict[str, str]] = None) -> ConfigMapData:
        """
        Create ConfigMap from files
        """
        data = {}
        binary_data = {}
        
        for file_path in file_paths:
            path = Path(file_path)
            if not path.exists():
                raise FileNotFoundError(f"File not found: {file_path}")
            
            key = path.name
            
            try:
                # Try to read as text
                with open(path, 'r', encoding='utf-8') as f:
                    data[key] = f.read()
            except UnicodeDecodeError:
                # Read as binary
                with open(path, 'rb') as f:
                    binary_data[key] = f.read()
        
        config_map = ConfigMapData(
            name=name,
            namespace=namespace,
            data=data,
            binary_data=binary_data,
            labels=labels or {}
        )
        
        self.config_maps[f"{namespace}/{name}"] = config_map
        return config_map
    
    def create_configmap_from_env(self, name: str, namespace: str,
                                 env_file: str,
                                 labels: Optional[Dict[str, str]] = None) -> ConfigMapData:
        """
        Create ConfigMap from environment file
        """
        data = {}
        
        with open(env_file, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#'):
                    if '=' in line:
                        key, value = line.split('=', 1)
                        data[key.strip()] = value.strip()
        
        config_map = ConfigMapData(
            name=name,
            namespace=namespace,
            data=data,
            labels=labels or {}
        )
        
        self.config_maps[f"{namespace}/{name}"] = config_map
        return config_map
    
    def create_secret_from_files(self, name: str, namespace: str,
                                file_paths: List[str],
                                secret_type: str = "Opaque",
                                labels: Optional[Dict[str, str]] = None) -> SecretData:
        """
        Create Secret from files
        """
        data = {}
        
        for file_path in file_paths:
            path = Path(file_path)
            if not path.exists():
                raise FileNotFoundError(f"File not found: {file_path}")
            
            key = path.name
            
            with open(path, 'rb') as f:
                content = f.read()
                data[key] = base64.b64encode(content).decode('utf-8')
        
        secret = SecretData(
            name=name,
            namespace=namespace,
            secret_type=secret_type,
            data=data,
            labels=labels or {}
        )
        
        self.secrets[f"{namespace}/{name}"] = secret
        return secret
    
    def create_tls_secret(self, name: str, namespace: str,
                         cert_file: str, key_file: str,
                         labels: Optional[Dict[str, str]] = None) -> SecretData:
        """
        Create TLS Secret from certificate and key files
        """
        with open(cert_file, 'rb') as f:
            cert_data = base64.b64encode(f.read()).decode('utf-8')
        
        with open(key_file, 'rb') as f:
            key_data = base64.b64encode(f.read()).decode('utf-8')
        
        secret = SecretData(
            name=name,
            namespace=namespace,
            secret_type="kubernetes.io/tls",
            data={
                'tls.crt': cert_data,
                'tls.key': key_data
            },
            labels=labels or {}
        )
        
        self.secrets[f"{namespace}/{name}"] = secret
        return secret
    
    def create_docker_registry_secret(self, name: str, namespace: str,
                                     server: str, username: str, password: str,
                                     email: Optional[str] = None,
                                     labels: Optional[Dict[str, str]] = None) -> SecretData:
        """
        Create Docker registry Secret
        """
        auth_string = base64.b64encode(f"{username}:{password}".encode()).decode()
        
        docker_config = {
            "auths": {
                server: {
                    "username": username,
                    "password": password,
                    "auth": auth_string
                }
            }
        }
        
        if email:
            docker_config["auths"][server]["email"] = email
        
        config_json = json.dumps(docker_config)
        encoded_config = base64.b64encode(config_json.encode()).decode()
        
        secret = SecretData(
            name=name,
            namespace=namespace,
            secret_type="kubernetes.io/dockerconfigjson",
            data={
                '.dockerconfigjson': encoded_config
            },
            labels=labels or {}
        )
        
        self.secrets[f"{namespace}/{name}"] = secret
        return secret
    
    def create_generic_secret(self, name: str, namespace: str,
                            data: Dict[str, str],
                            labels: Optional[Dict[str, str]] = None) -> SecretData:
        """
        Create generic Secret from key-value pairs
        """
        secret = SecretData(
            name=name,
            namespace=namespace,
            secret_type="Opaque",
            string_data=data,  # Will be base64 encoded automatically
            labels=labels or {}
        )
        
        self.secrets[f"{namespace}/{name}"] = secret
        return secret
    
    def generate_configmap_yaml(self, config_map: ConfigMapData) -> str:
        """
        Generate YAML for ConfigMap
        """
        manifest = {
            'apiVersion': 'v1',
            'kind': 'ConfigMap',
            'metadata': {
                'name': config_map.name,
                'namespace': config_map.namespace
            }
        }
        
        if config_map.labels:
            manifest['metadata']['labels'] = config_map.labels
        
        if config_map.annotations:
            manifest['metadata']['annotations'] = config_map.annotations
        
        if config_map.data:
            manifest['data'] = config_map.data
        
        if config_map.binary_data:
            manifest['binaryData'] = {
                k: base64.b64encode(v).decode('utf-8')
                for k, v in config_map.binary_data.items()
            }
        
        return yaml.dump(manifest, default_flow_style=False)
    
    def generate_secret_yaml(self, secret: SecretData) -> str:
        """
        Generate YAML for Secret
        """
        manifest = {
            'apiVersion': 'v1',
            'kind': 'Secret',
            'metadata': {
                'name': secret.name,
                'namespace': secret.namespace
            },
            'type': secret.secret_type
        }
        
        if secret.labels:
            manifest['metadata']['labels'] = secret.labels
        
        if secret.annotations:
            manifest['metadata']['annotations'] = secret.annotations
        
        if secret.data:
            manifest['data'] = secret.data
        
        if secret.string_data:
            manifest['stringData'] = secret.string_data
        
        return yaml.dump(manifest, default_flow_style=False)
    
    def export_all_manifests(self, output_dir: str):
        """
        Export all ConfigMaps and Secrets as YAML files
        """
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Export ConfigMaps
        for key, config_map in self.config_maps.items():
            filename = f"configmap-{config_map.name}.yaml"
            file_path = output_path / filename
            
            with open(file_path, 'w') as f:
                f.write(self.generate_configmap_yaml(config_map))
        
        # Export Secrets
        for key, secret in self.secrets.items():
            filename = f"secret-{secret.name}.yaml"
            file_path = output_path / filename
            
            with open(file_path, 'w') as f:
                f.write(self.generate_secret_yaml(secret))
    
    def validate_configuration(self) -> List[str]:
        """
        Validate configuration and return list of issues
        """
        issues = []
        
        # Check for naming conflicts
        all_names = set()
        
        for config_map in self.config_maps.values():
            key = f"{config_map.namespace}/{config_map.name}"
            if key in all_names:
                issues.append(f"Duplicate name: {key}")
            all_names.add(key)
        
        for secret in self.secrets.values():
            key = f"{secret.namespace}/{secret.name}"
            if key in all_names:
                issues.append(f"Duplicate name: {key}")
            all_names.add(key)
        
        # Validate Secret data
        for secret in self.secrets.values():
            for key, value in secret.data.items():
                try:
                    base64.b64decode(value)
                except Exception:
                    issues.append(f"Invalid base64 data in secret {secret.name}, key {key}")
        
        return issues


# Example usage and utilities
class ConfigurationTemplates:
    @staticmethod
    def create_database_config(db_host: str, db_port: int, db_name: str,
                             username: str, password: str,
                             namespace: str = "default") -> tuple[ConfigMapData, SecretData]:
        """
        Create database configuration ConfigMap and Secret
        """
        cm = ConfigurationManager()
        
        # ConfigMap for non-sensitive data
        config_map = ConfigMapData(
            name="database-config",
            namespace=namespace,
            data={
                "host": db_host,
                "port": str(db_port),
                "database": db_name,
                "connection_pool_size": "10",
                "timeout": "30"
            }
        )
        
        # Secret for sensitive data
        secret = SecretData(
            name="database-secret",
            namespace=namespace,
            string_data={
                "username": username,
                "password": password
            }
        )
        
        return config_map, secret
    
    @staticmethod
    def create_app_config_template(app_name: str, environment: str,
                                 namespace: str = "default") -> ConfigMapData:
        """
        Create application configuration template
        """
        config_data = {
            "app.name": app_name,
            "app.environment": environment,
            "logging.level": "INFO" if environment == "production" else "DEBUG",
            "metrics.enabled": "true",
            "health.check.interval": "30s"
        }
        
        # Environment-specific settings
        if environment == "production":
            config_data.update({
                "cache.ttl": "3600",
                "rate.limit": "1000",
                "debug.enabled": "false"
            })
        else:
            config_data.update({
                "cache.ttl": "300",
                "rate.limit": "100",
                "debug.enabled": "true"
            })
        
        return ConfigMapData(
            name=f"{app_name}-config",
            namespace=namespace,
            data=config_data,
            labels={
                "app": app_name,
                "environment": environment
            }
        )


if __name__ == "__main__":
    # Example usage
    cm = ConfigurationManager()
    
    # Create ConfigMap from environment variables
    config_map = cm.create_configmap_from_env(
        name="app-config",
        namespace="default",
        env_file="app.env"
    )
    
    # Create generic secret
    secret = cm.create_generic_secret(
        name="app-secrets",
        namespace="default",
        data={
            "api_key": "secret-api-key",
            "jwt_secret": "jwt-signing-secret"
        }
    )
    
    # Create TLS secret
    # tls_secret = cm.create_tls_secret(
    #     name="tls-secret",
    #     namespace="default",
    #     cert_file="server.crt",
    #     key_file="server.key"
    # )
    
    # Validate configuration
    issues = cm.validate_configuration()
    if issues:
        print("Configuration issues found:")
        for issue in issues:
            print(f"  - {issue}")
    
    # Export manifests
    cm.export_all_manifests("./k8s-manifests")
    
    print("Configuration and secrets created successfully!")
```

### Best Practices for Configuration Management

1. **Separation of Concerns**: Keep configuration separate from secrets
2. **Environment-Specific**: Use different ConfigMaps/Secrets per environment
3. **Immutable Deployments**: Treat ConfigMaps and Secrets as immutable
4. **Version Control**: Store ConfigMap manifests in version control (not Secrets)
5. **Encryption**: Enable encryption at rest for etcd
6. **Access Control**: Use RBAC to limit access to Secrets
7. **Secret Rotation**: Implement regular secret rotation
8. **Monitoring**: Monitor access to sensitive configuration
9. **Validation**: Validate configuration before deployment
10. **Documentation**: Document configuration parameters and their purposes

### External Secret Management Integration

```yaml
# External Secrets Operator Example
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: default
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "demo"
          serviceAccountRef:
            name: "external-secrets-sa"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secret
  namespace: default
spec:
  refreshInterval: 15s
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secret
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: secret/data/database
      property: password
```

## Q5: What are Kubernetes Deployments and how do they manage application rollouts?
**Difficulty: Medium**

**Answer:**

Kubernetes Deployments provide declarative updates for Pods and ReplicaSets. They manage the desired state of your application, handle rolling updates, rollbacks, and scaling operations automatically.

### Deployment Fundamentals

```yaml
# Basic Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-deployment
  namespace: default
  labels:
    app: web-app
    version: v1.0
  annotations:
    deployment.kubernetes.io/revision: "1"
spec:
  # Deployment strategy
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  
  # Update strategy
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1      # Max pods that can be unavailable during update
      maxSurge: 1           # Max pods that can be created above desired replica count
  
  # Minimum time for pod to be ready
  minReadySeconds: 10
  
  # Number of old ReplicaSets to retain
  revisionHistoryLimit: 10
  
  # How long to wait before considering deployment failed
  progressDeadlineSeconds: 600
  
  template:
    metadata:
      labels:
        app: web-app
        version: v1.0
    spec:
      containers:
      - name: web-container
        image: nginx:1.21
        ports:
        - containerPort: 80
          name: http
        
        # Resource requirements
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
        
        # Health checks
        livenessProbe:
          httpGet:
            path: /health
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 3
        
        readinessProbe:
          httpGet:
            path: /ready
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5
          timeoutSeconds: 3
          failureThreshold: 3
        
        # Startup probe for slow-starting containers
        startupProbe:
          httpGet:
            path: /startup
            port: 80
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 30
        
        # Environment variables
        env:
        - name: APP_ENV
          value: "production"
        - name: LOG_LEVEL
          value: "INFO"
        
        # Volume mounts
        volumeMounts:
        - name: config-volume
          mountPath: /etc/config
          readOnly: true
      
      # Volumes
      volumes:
      - name: config-volume
        configMap:
          name: app-config
      
      # Pod disruption budget considerations
      # Security context
      securityContext:
        runAsNonRoot: true
        runAsUser: 1000
        fsGroup: 2000
      
      # Node selection
      nodeSelector:
        kubernetes.io/os: linux
      
      # Tolerations for node taints
      tolerations:
      - key: "node.kubernetes.io/not-ready"
        operator: "Exists"
        effect: "NoExecute"
        tolerationSeconds: 300
```

### Deployment Strategies

```yaml
# Rolling Update Strategy (Default)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rolling-update-deployment
spec:
  replicas: 5
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 25%    # Can be absolute number or percentage
      maxSurge: 25%         # Can be absolute number or percentage
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.21
        ports:
        - containerPort: 80

---
# Recreate Strategy
apiVersion: apps/v1
kind: Deployment
metadata:
  name: recreate-deployment
spec:
  replicas: 3
  strategy:
    type: Recreate  # All pods are killed before new ones are created
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database
    spec:
      containers:
      - name: db
        image: postgres:13
        ports:
        - containerPort: 5432
```

### Blue-Green Deployment Pattern

```yaml
# Blue Deployment (Current)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-blue
  labels:
    app: web-app
    version: blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
      version: blue
  template:
    metadata:
      labels:
        app: web-app
        version: blue
    spec:
      containers:
      - name: web
        image: nginx:1.20  # Current version
        ports:
        - containerPort: 80

---
# Green Deployment (New)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-green
  labels:
    app: web-app
    version: green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
      version: green
  template:
    metadata:
      labels:
        app: web-app
        version: green
    spec:
      containers:
      - name: web
        image: nginx:1.21  # New version
        ports:
        - containerPort: 80

---
# Service switches between blue and green
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
    version: blue  # Switch to 'green' for deployment
  ports:
  - port: 80
    targetPort: 80
```

### Canary Deployment Pattern

```yaml
# Stable Deployment (90% traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-stable
  labels:
    app: web-app
    version: stable
spec:
  replicas: 9  # 90% of traffic
  selector:
    matchLabels:
      app: web-app
      version: stable
  template:
    metadata:
      labels:
        app: web-app
        version: stable
    spec:
      containers:
      - name: web
        image: nginx:1.20
        ports:
        - containerPort: 80

---
# Canary Deployment (10% traffic)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-canary
  labels:
    app: web-app
    version: canary
spec:
  replicas: 1  # 10% of traffic
  selector:
    matchLabels:
      app: web-app
      version: canary
  template:
    metadata:
      labels:
        app: web-app
        version: canary
    spec:
      containers:
      - name: web
        image: nginx:1.21  # New version
        ports:
        - containerPort: 80

---
# Service selects both versions
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app  # Selects both stable and canary
  ports:
  - port: 80
    targetPort: 80
```

### Deployment Management Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Deployment Management Utility
"""

import time
import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta

class DeploymentStrategy(Enum):
    ROLLING_UPDATE = "RollingUpdate"
    RECREATE = "Recreate"
    BLUE_GREEN = "BlueGreen"
    CANARY = "Canary"

class DeploymentStatus(Enum):
    PROGRESSING = "Progressing"
    COMPLETE = "Complete"
    FAILED = "Failed"
    PAUSED = "Paused"

@dataclass
class DeploymentCondition:
    type: str
    status: str
    reason: str
    message: str
    last_update_time: datetime
    last_transition_time: datetime

@dataclass
class ReplicaSetInfo:
    name: str
    revision: int
    replicas: int
    ready_replicas: int
    available_replicas: int
    image: str
    creation_timestamp: datetime
    labels: Dict[str, str] = field(default_factory=dict)

@dataclass
class DeploymentInfo:
    name: str
    namespace: str
    replicas: int
    ready_replicas: int
    available_replicas: int
    updated_replicas: int
    unavailable_replicas: int
    observed_generation: int
    revision: int
    strategy: DeploymentStrategy
    conditions: List[DeploymentCondition] = field(default_factory=list)
    replica_sets: List[ReplicaSetInfo] = field(default_factory=list)
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

class DeploymentManager:
    def __init__(self):
        self.deployments: Dict[str, DeploymentInfo] = {}
        self.rollout_history: Dict[str, List[Dict]] = {}
    
    def create_deployment(self, deployment_spec: Dict) -> DeploymentInfo:
        """
        Create a new deployment
        """
        metadata = deployment_spec['metadata']
        spec = deployment_spec['spec']
        
        deployment = DeploymentInfo(
            name=metadata['name'],
            namespace=metadata.get('namespace', 'default'),
            replicas=spec['replicas'],
            ready_replicas=0,
            available_replicas=0,
            updated_replicas=0,
            unavailable_replicas=spec['replicas'],
            observed_generation=1,
            revision=1,
            strategy=DeploymentStrategy(spec.get('strategy', {}).get('type', 'RollingUpdate')),
            labels=metadata.get('labels', {}),
            annotations=metadata.get('annotations', {})
        )
        
        # Add initial condition
        condition = DeploymentCondition(
            type="Progressing",
            status="True",
            reason="NewReplicaSetCreated",
            message="Created new replica set",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        # Create initial ReplicaSet
        replica_set = ReplicaSetInfo(
            name=f"{deployment.name}-{deployment.revision}",
            revision=deployment.revision,
            replicas=deployment.replicas,
            ready_replicas=0,
            available_replicas=0,
            image=self._extract_image_from_spec(spec),
            creation_timestamp=datetime.now(),
            labels=spec['template']['metadata'].get('labels', {})
        )
        deployment.replica_sets.append(replica_set)
        
        deployment_key = f"{deployment.namespace}/{deployment.name}"
        self.deployments[deployment_key] = deployment
        
        # Initialize rollout history
        self.rollout_history[deployment_key] = [{
            'revision': 1,
            'change_cause': 'Initial deployment',
            'timestamp': datetime.now().isoformat(),
            'image': replica_set.image
        }]
        
        return deployment
    
    def update_deployment(self, deployment_name: str, namespace: str,
                         new_image: str, change_cause: str = None) -> bool:
        """
        Update deployment with new image
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return False
        
        # Increment revision
        deployment.revision += 1
        deployment.observed_generation += 1
        
        # Create new ReplicaSet
        new_replica_set = ReplicaSetInfo(
            name=f"{deployment.name}-{deployment.revision}",
            revision=deployment.revision,
            replicas=deployment.replicas,
            ready_replicas=0,
            available_replicas=0,
            image=new_image,
            creation_timestamp=datetime.now(),
            labels=deployment.replica_sets[-1].labels.copy()
        )
        deployment.replica_sets.append(new_replica_set)
        
        # Add rollout history entry
        self.rollout_history[deployment_key].append({
            'revision': deployment.revision,
            'change_cause': change_cause or f'Updated image to {new_image}',
            'timestamp': datetime.now().isoformat(),
            'image': new_image
        })
        
        # Update deployment condition
        condition = DeploymentCondition(
            type="Progressing",
            status="True",
            reason="NewReplicaSetCreated",
            message=f"Created new replica set {new_replica_set.name}",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        # Simulate rolling update
        self._simulate_rolling_update(deployment)
        
        return True
    
    def rollback_deployment(self, deployment_name: str, namespace: str,
                           target_revision: Optional[int] = None) -> bool:
        """
        Rollback deployment to previous or specific revision
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return False
        
        if target_revision is None:
            # Rollback to previous revision
            if len(deployment.replica_sets) < 2:
                return False
            target_revision = deployment.replica_sets[-2].revision
        
        # Find target ReplicaSet
        target_rs = None
        for rs in deployment.replica_sets:
            if rs.revision == target_revision:
                target_rs = rs
                break
        
        if not target_rs:
            return False
        
        # Create new ReplicaSet based on target
        deployment.revision += 1
        deployment.observed_generation += 1
        
        rollback_rs = ReplicaSetInfo(
            name=f"{deployment.name}-{deployment.revision}",
            revision=deployment.revision,
            replicas=deployment.replicas,
            ready_replicas=0,
            available_replicas=0,
            image=target_rs.image,
            creation_timestamp=datetime.now(),
            labels=target_rs.labels.copy()
        )
        deployment.replica_sets.append(rollback_rs)
        
        # Add rollout history entry
        self.rollout_history[deployment_key].append({
            'revision': deployment.revision,
            'change_cause': f'Rolled back to revision {target_revision}',
            'timestamp': datetime.now().isoformat(),
            'image': target_rs.image
        })
        
        # Update deployment condition
        condition = DeploymentCondition(
            type="Progressing",
            status="True",
            reason="FoundNewReplicaSet",
            message=f"Rolled back to revision {target_revision}",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        # Simulate rolling update
        self._simulate_rolling_update(deployment)
        
        return True
    
    def scale_deployment(self, deployment_name: str, namespace: str,
                        replicas: int) -> bool:
        """
        Scale deployment to specified number of replicas
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return False
        
        old_replicas = deployment.replicas
        deployment.replicas = replicas
        deployment.observed_generation += 1
        
        # Update current ReplicaSet
        if deployment.replica_sets:
            current_rs = deployment.replica_sets[-1]
            current_rs.replicas = replicas
            
            # Simulate scaling
            if replicas > old_replicas:
                # Scale up
                current_rs.ready_replicas = min(replicas, current_rs.ready_replicas + (replicas - old_replicas))
                current_rs.available_replicas = current_rs.ready_replicas
            else:
                # Scale down
                current_rs.ready_replicas = replicas
                current_rs.available_replicas = replicas
        
        deployment.ready_replicas = deployment.replica_sets[-1].ready_replicas if deployment.replica_sets else 0
        deployment.available_replicas = deployment.ready_replicas
        deployment.updated_replicas = deployment.ready_replicas
        deployment.unavailable_replicas = max(0, replicas - deployment.ready_replicas)
        
        # Add condition
        condition = DeploymentCondition(
            type="Progressing",
            status="True",
            reason="NewReplicaSetScaled",
            message=f"Scaled {('up' if replicas > old_replicas else 'down')} to {replicas} replicas",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        return True
    
    def pause_deployment(self, deployment_name: str, namespace: str) -> bool:
        """
        Pause deployment rollout
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return False
        
        condition = DeploymentCondition(
            type="Progressing",
            status="Unknown",
            reason="DeploymentPaused",
            message="Deployment is paused",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        return True
    
    def resume_deployment(self, deployment_name: str, namespace: str) -> bool:
        """
        Resume paused deployment
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return False
        
        condition = DeploymentCondition(
            type="Progressing",
            status="True",
            reason="DeploymentResumed",
            message="Deployment is resumed",
            last_update_time=datetime.now(),
            last_transition_time=datetime.now()
        )
        deployment.conditions.append(condition)
        
        # Continue rolling update
        self._simulate_rolling_update(deployment)
        
        return True
    
    def get_deployment_status(self, deployment_name: str, namespace: str) -> Optional[Dict]:
        """
        Get deployment status
        """
        deployment_key = f"{namespace}/{deployment_name}"
        deployment = self.deployments.get(deployment_key)
        
        if not deployment:
            return None
        
        return {
            'name': deployment.name,
            'namespace': deployment.namespace,
            'replicas': deployment.replicas,
            'readyReplicas': deployment.ready_replicas,
            'availableReplicas': deployment.available_replicas,
            'updatedReplicas': deployment.updated_replicas,
            'unavailableReplicas': deployment.unavailable_replicas,
            'revision': deployment.revision,
            'strategy': deployment.strategy.value,
            'conditions': [
                {
                    'type': c.type,
                    'status': c.status,
                    'reason': c.reason,
                    'message': c.message,
                    'lastUpdateTime': c.last_update_time.isoformat(),
                    'lastTransitionTime': c.last_transition_time.isoformat()
                }
                for c in deployment.conditions[-5:]  # Last 5 conditions
            ],
            'replicaSets': [
                {
                    'name': rs.name,
                    'revision': rs.revision,
                    'replicas': rs.replicas,
                    'readyReplicas': rs.ready_replicas,
                    'availableReplicas': rs.available_replicas,
                    'image': rs.image,
                    'creationTimestamp': rs.creation_timestamp.isoformat()
                }
                for rs in deployment.replica_sets[-3:]  # Last 3 ReplicaSets
            ]
        }
    
    def get_rollout_history(self, deployment_name: str, namespace: str) -> List[Dict]:
        """
        Get deployment rollout history
        """
        deployment_key = f"{namespace}/{deployment_name}"
        return self.rollout_history.get(deployment_key, [])
    
    def _extract_image_from_spec(self, spec: Dict) -> str:
        """
        Extract container image from deployment spec
        """
        containers = spec.get('template', {}).get('spec', {}).get('containers', [])
        if containers:
            return containers[0].get('image', 'unknown')
        return 'unknown'
    
    def _simulate_rolling_update(self, deployment: DeploymentInfo):
        """
        Simulate rolling update process
        """
        if len(deployment.replica_sets) < 2:
            return
        
        current_rs = deployment.replica_sets[-1]
        previous_rs = deployment.replica_sets[-2]
        
        # Simulate gradual rollout
        total_replicas = deployment.replicas
        max_unavailable = max(1, int(total_replicas * 0.25))  # 25% max unavailable
        max_surge = max(1, int(total_replicas * 0.25))  # 25% max surge
        
        # Gradually scale up new ReplicaSet and scale down old one
        steps = min(5, total_replicas)  # Simulate in steps
        for step in range(steps + 1):
            progress = step / steps
            
            # New ReplicaSet scaling up
            current_rs.replicas = int(total_replicas * progress)
            current_rs.ready_replicas = current_rs.replicas
            current_rs.available_replicas = current_rs.replicas
            
            # Old ReplicaSet scaling down
            previous_rs.replicas = int(total_replicas * (1 - progress))
            previous_rs.ready_replicas = previous_rs.replicas
            previous_rs.available_replicas = previous_rs.replicas
        
        # Update deployment status
        deployment.ready_replicas = current_rs.ready_replicas
        deployment.available_replicas = current_rs.available_replicas
        deployment.updated_replicas = current_rs.ready_replicas
        deployment.unavailable_replicas = max(0, total_replicas - deployment.ready_replicas)
        
        # Add completion condition
        if deployment.ready_replicas == deployment.replicas:
            condition = DeploymentCondition(
                type="Progressing",
                status="True",
                reason="NewReplicaSetAvailable",
                message="ReplicaSet has successfully progressed",
                last_update_time=datetime.now(),
                last_transition_time=datetime.now()
            )
            deployment.conditions.append(condition)


# Example usage
if __name__ == "__main__":
    dm = DeploymentManager()
    
    # Create deployment
    deployment_spec = {
        'metadata': {
            'name': 'web-app',
            'namespace': 'default',
            'labels': {'app': 'web-app'}
        },
        'spec': {
            'replicas': 3,
            'strategy': {'type': 'RollingUpdate'},
            'template': {
                'metadata': {'labels': {'app': 'web-app'}},
                'spec': {
                    'containers': [{
                        'name': 'web',
                        'image': 'nginx:1.20'
                    }]
                }
            }
        }
    }
    
    deployment = dm.create_deployment(deployment_spec)
    print("Created deployment:")
    print(json.dumps(dm.get_deployment_status('web-app', 'default'), indent=2))
    
    # Update deployment
    dm.update_deployment('web-app', 'default', 'nginx:1.21', 'Updated to nginx 1.21')
    print("\nAfter update:")
    print(json.dumps(dm.get_deployment_status('web-app', 'default'), indent=2))
    
    # Scale deployment
    dm.scale_deployment('web-app', 'default', 5)
    print("\nAfter scaling:")
    print(json.dumps(dm.get_deployment_status('web-app', 'default'), indent=2))
    
    # Rollback
    dm.rollback_deployment('web-app', 'default')
    print("\nAfter rollback:")
    print(json.dumps(dm.get_deployment_status('web-app', 'default'), indent=2))
    
    # Show rollout history
    print("\nRollout history:")
    history = dm.get_rollout_history('web-app', 'default')
    for entry in history:
        print(f"  Revision {entry['revision']}: {entry['change_cause']} ({entry['image']})")
```

### Deployment Best Practices

1. **Health Checks**: Always define readiness and liveness probes
2. **Resource Limits**: Set appropriate resource requests and limits
3. **Rolling Updates**: Use rolling updates for zero-downtime deployments
4. **Rollback Strategy**: Keep revision history for quick rollbacks
5. **Pod Disruption Budgets**: Define PDBs for high availability
6. **Monitoring**: Monitor deployment progress and health
7. **Testing**: Test deployments in staging environments first
8. **Gradual Rollouts**: Use canary deployments for risk mitigation
9. **Automation**: Automate deployment processes with CI/CD
10. **Documentation**: Document deployment procedures and rollback plans

## Q6: How do you implement persistent storage in Kubernetes using Persistent Volumes and Persistent Volume Claims?
**Difficulty: Medium-Hard**

**Answer:**

Persistent Volumes (PV) and Persistent Volume Claims (PVC) provide a way to manage storage in Kubernetes that persists beyond the lifecycle of individual pods. This abstraction allows applications to request storage without knowing the underlying storage infrastructure details.

### Persistent Volume (PV) Fundamentals

```yaml
# Local Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: local-pv-storage
  labels:
    type: local
    environment: development
spec:
  # Storage capacity
  capacity:
    storage: 10Gi
  
  # Access modes
  accessModes:
    - ReadWriteOnce    # Can be mounted as read-write by single node
    # - ReadOnlyMany   # Can be mounted read-only by many nodes
    # - ReadWriteMany  # Can be mounted as read-write by many nodes
  
  # Reclaim policy
  persistentVolumeReclaimPolicy: Retain  # Retain, Delete, or Recycle
  
  # Storage class
  storageClassName: local-storage
  
  # Volume mode
  volumeMode: Filesystem  # Filesystem or Block
  
  # Node affinity for local volumes
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - worker-node-1
  
  # Local volume configuration
  local:
    path: /mnt/disks/vol1
  
  # Mount options
  mountOptions:
    - hard
    - nfsvers=4.1

---
# NFS Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: nfs-pv-storage
  labels:
    type: nfs
    environment: production
spec:
  capacity:
    storage: 100Gi
  accessModes:
    - ReadWriteMany  # NFS supports multiple readers/writers
  persistentVolumeReclaimPolicy: Retain
  storageClassName: nfs-storage
  nfs:
    server: nfs-server.example.com
    path: "/exports/kubernetes/data"
  mountOptions:
    - hard
    - nfsvers=4.1
    - timeo=600
    - retrans=2

---
# AWS EBS Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: ebs-pv-storage
  labels:
    type: ebs
    environment: production
spec:
  capacity:
    storage: 50Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: gp2-storage
  awsElasticBlockStore:
    volumeID: vol-0123456789abcdef0
    fsType: ext4
    partition: 1

---
# Azure Disk Persistent Volume
apiVersion: v1
kind: PersistentVolume
metadata:
  name: azure-disk-pv
  labels:
    type: azure-disk
spec:
  capacity:
    storage: 20Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: managed-premium
  azureDisk:
    diskName: myAzureDisk
    diskURI: /subscriptions/{subscription}/resourceGroups/{rg}/providers/Microsoft.Compute/disks/myAzureDisk
    kind: Managed
    fsType: ext4
    readOnly: false
```

### Persistent Volume Claims (PVC)

```yaml
# Basic PVC
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: web-app-storage-claim
  namespace: default
  labels:
    app: web-app
    component: storage
spec:
  # Access modes must match or be subset of PV
  accessModes:
    - ReadWriteOnce
  
  # Storage class (optional - for dynamic provisioning)
  storageClassName: fast-ssd
  
  # Resource requirements
  resources:
    requests:
      storage: 5Gi
    limits:
      storage: 10Gi
  
  # Volume mode
  volumeMode: Filesystem
  
  # Selector to bind to specific PV
  selector:
    matchLabels:
      type: local
      environment: development
    matchExpressions:
    - key: capacity
      operator: In
      values: ["10Gi", "20Gi"]

---
# Database PVC with specific requirements
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-storage-claim
  namespace: database
  annotations:
    volume.beta.kubernetes.io/storage-provisioner: kubernetes.io/aws-ebs
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: gp2-encrypted
  resources:
    requests:
      storage: 100Gi
  # Data source for cloning
  dataSource:
    name: postgres-snapshot
    kind: VolumeSnapshot
    apiGroup: snapshot.storage.k8s.io

---
# Shared storage PVC for multiple pods
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-storage-claim
  namespace: default
spec:
  accessModes:
    - ReadWriteMany  # Multiple pods can mount this
  storageClassName: nfs-storage
  resources:
    requests:
      storage: 50Gi
```

### Storage Classes for Dynamic Provisioning

```yaml
# AWS EBS Storage Class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ebs
  annotations:
    storageclass.kubernetes.io/is-default-class: "false"
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3  # gp2, gp3, io1, io2, sc1, st1
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/12345678-1234-1234-1234-123456789012"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
mountOptions:
  - debug
  - noatime

---
# Azure Disk Storage Class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: managed-premium-ssd
provisioner: kubernetes.io/azure-disk
parameters:
  storageaccounttype: Premium_LRS
  kind: Managed
  cachingmode: ReadOnly
  diskIopsReadWrite: "500"
  diskMbpsReadWrite: "100"
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: Immediate

---
# GCP Persistent Disk Storage Class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: fast-ssd-gcp
provisioner: kubernetes.io/gce-pd
parameters:
  type: pd-ssd
  zones: us-central1-a,us-central1-b
  replication-type: regional-pd
reclaimPolicy: Delete
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer

---
# Local Storage Class
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: local-storage
provisioner: kubernetes.io/no-provisioner
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Delete
```

### Using Persistent Storage in Pods

```yaml
# StatefulSet with Persistent Storage
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres-statefulset
  namespace: database
spec:
  serviceName: postgres-service
  replicas: 3
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        ports:
        - containerPort: 5432
          name: postgres
        env:
        - name: POSTGRES_DB
          value: "myapp"
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: username
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        - name: PGDATA
          value: "/var/lib/postgresql/data/pgdata"
        
        # Volume mounts
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
        - name: postgres-config
          mountPath: /etc/postgresql/postgresql.conf
          subPath: postgresql.conf
        - name: postgres-init
          mountPath: /docker-entrypoint-initdb.d
        
        # Resource requirements
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        
        # Liveness and readiness probes
        livenessProbe:
          exec:
            command:
            - /bin/sh
            - -c
            - exec pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" -h 127.0.0.1 -p 5432
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 6
        
        readinessProbe:
          exec:
            command:
            - /bin/sh
            - -c
            - exec pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" -h 127.0.0.1 -p 5432
          initialDelaySeconds: 5
          periodSeconds: 10
          timeoutSeconds: 5
          failureThreshold: 6
      
      # Additional volumes
      volumes:
      - name: postgres-config
        configMap:
          name: postgres-config
      - name: postgres-init
        configMap:
          name: postgres-init-scripts
  
  # Volume claim templates for StatefulSet
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
      labels:
        app: postgres
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: fast-ebs
      resources:
        requests:
          storage: 20Gi

---
# Deployment with existing PVC
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app-deployment
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: nginx:1.21
        ports:
        - containerPort: 80
        volumeMounts:
        - name: web-storage
          mountPath: /usr/share/nginx/html
        - name: logs-storage
          mountPath: /var/log/nginx
        - name: cache-storage
          mountPath: /var/cache/nginx
      
      volumes:
      - name: web-storage
        persistentVolumeClaim:
          claimName: web-app-storage-claim
      - name: logs-storage
        persistentVolumeClaim:
          claimName: logs-storage-claim
      - name: cache-storage
        emptyDir:
          sizeLimit: 1Gi
```

### Storage Management Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Storage Management Utility
"""

import json
import time
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime

class VolumePhase(Enum):
    PENDING = "Pending"
    AVAILABLE = "Available"
    BOUND = "Bound"
    RELEASED = "Released"
    FAILED = "Failed"

class AccessMode(Enum):
    READ_WRITE_ONCE = "ReadWriteOnce"
    READ_ONLY_MANY = "ReadOnlyMany"
    READ_WRITE_MANY = "ReadWriteMany"

class ReclaimPolicy(Enum):
    RETAIN = "Retain"
    DELETE = "Delete"
    RECYCLE = "Recycle"

@dataclass
class StorageSpec:
    capacity: str
    access_modes: List[AccessMode]
    storage_class: Optional[str] = None
    volume_mode: str = "Filesystem"
    mount_options: List[str] = field(default_factory=list)

@dataclass
class PersistentVolume:
    name: str
    capacity: str
    access_modes: List[AccessMode]
    reclaim_policy: ReclaimPolicy
    storage_class: Optional[str]
    phase: VolumePhase
    claim_ref: Optional[str] = None
    volume_type: str = "local"
    creation_timestamp: datetime = field(default_factory=datetime.now)
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

@dataclass
class PersistentVolumeClaim:
    name: str
    namespace: str
    access_modes: List[AccessMode]
    storage_request: str
    storage_class: Optional[str]
    phase: VolumePhase
    volume_name: Optional[str] = None
    creation_timestamp: datetime = field(default_factory=datetime.now)
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

class StorageManager:
    def __init__(self):
        self.persistent_volumes: Dict[str, PersistentVolume] = {}
        self.persistent_volume_claims: Dict[str, PersistentVolumeClaim] = {}
        self.storage_classes: Dict[str, Dict] = {}
        self.volume_snapshots: Dict[str, Dict] = {}
    
    def create_persistent_volume(self, pv_spec: Dict) -> PersistentVolume:
        """
        Create a new Persistent Volume
        """
        metadata = pv_spec['metadata']
        spec = pv_spec['spec']
        
        pv = PersistentVolume(
            name=metadata['name'],
            capacity=spec['capacity']['storage'],
            access_modes=[AccessMode(mode) for mode in spec['accessModes']],
            reclaim_policy=ReclaimPolicy(spec.get('persistentVolumeReclaimPolicy', 'Retain')),
            storage_class=spec.get('storageClassName'),
            phase=VolumePhase.AVAILABLE,
            volume_type=self._determine_volume_type(spec),
            labels=metadata.get('labels', {}),
            annotations=metadata.get('annotations', {})
        )
        
        self.persistent_volumes[pv.name] = pv
        return pv
    
    def create_persistent_volume_claim(self, pvc_spec: Dict) -> PersistentVolumeClaim:
        """
        Create a new Persistent Volume Claim
        """
        metadata = pvc_spec['metadata']
        spec = pvc_spec['spec']
        
        pvc = PersistentVolumeClaim(
            name=metadata['name'],
            namespace=metadata.get('namespace', 'default'),
            access_modes=[AccessMode(mode) for mode in spec['accessModes']],
            storage_request=spec['resources']['requests']['storage'],
            storage_class=spec.get('storageClassName'),
            phase=VolumePhase.PENDING,
            labels=metadata.get('labels', {}),
            annotations=metadata.get('annotations', {})
        )
        
        pvc_key = f"{pvc.namespace}/{pvc.name}"
        self.persistent_volume_claims[pvc_key] = pvc
        
        # Try to bind to available PV
        self._bind_pvc_to_pv(pvc)
        
        return pvc
    
    def create_storage_class(self, sc_spec: Dict) -> Dict:
        """
        Create a new Storage Class
        """
        metadata = sc_spec['metadata']
        
        storage_class = {
            'name': metadata['name'],
            'provisioner': sc_spec['provisioner'],
            'parameters': sc_spec.get('parameters', {}),
            'reclaimPolicy': sc_spec.get('reclaimPolicy', 'Delete'),
            'allowVolumeExpansion': sc_spec.get('allowVolumeExpansion', False),
            'volumeBindingMode': sc_spec.get('volumeBindingMode', 'Immediate'),
            'mountOptions': sc_spec.get('mountOptions', []),
            'annotations': metadata.get('annotations', {})
        }
        
        self.storage_classes[storage_class['name']] = storage_class
        return storage_class
    
    def bind_pvc_to_pv(self, pvc_name: str, namespace: str, pv_name: str) -> bool:
        """
        Manually bind a PVC to a specific PV
        """
        pvc_key = f"{namespace}/{pvc_name}"
        pvc = self.persistent_volume_claims.get(pvc_key)
        pv = self.persistent_volumes.get(pv_name)
        
        if not pvc or not pv:
            return False
        
        if pv.phase != VolumePhase.AVAILABLE:
            return False
        
        # Check compatibility
        if not self._is_compatible(pvc, pv):
            return False
        
        # Bind them
        pvc.volume_name = pv.name
        pvc.phase = VolumePhase.BOUND
        pv.claim_ref = pvc_key
        pv.phase = VolumePhase.BOUND
        
        return True
    
    def release_persistent_volume(self, pv_name: str) -> bool:
        """
        Release a Persistent Volume
        """
        pv = self.persistent_volumes.get(pv_name)
        if not pv:
            return False
        
        if pv.claim_ref:
            # Remove claim reference
            pvc = self.persistent_volume_claims.get(pv.claim_ref)
            if pvc:
                pvc.volume_name = None
                pvc.phase = VolumePhase.PENDING
        
        pv.claim_ref = None
        
        # Handle reclaim policy
        if pv.reclaim_policy == ReclaimPolicy.DELETE:
            pv.phase = VolumePhase.FAILED  # Simulate deletion
            del self.persistent_volumes[pv_name]
        elif pv.reclaim_policy == ReclaimPolicy.RETAIN:
            pv.phase = VolumePhase.RELEASED
        elif pv.reclaim_policy == ReclaimPolicy.RECYCLE:
            pv.phase = VolumePhase.AVAILABLE
        
        return True
    
    def expand_persistent_volume_claim(self, pvc_name: str, namespace: str, new_size: str) -> bool:
        """
        Expand a Persistent Volume Claim
        """
        pvc_key = f"{namespace}/{pvc_name}"
        pvc = self.persistent_volume_claims.get(pvc_key)
        
        if not pvc or not pvc.volume_name:
            return False
        
        pv = self.persistent_volumes.get(pvc.volume_name)
        if not pv:
            return False
        
        # Check if storage class allows expansion
        if pvc.storage_class:
            sc = self.storage_classes.get(pvc.storage_class)
            if not sc or not sc.get('allowVolumeExpansion', False):
                return False
        
        # Update sizes
        pvc.storage_request = new_size
        pv.capacity = new_size
        
        return True
    
    def create_volume_snapshot(self, snapshot_spec: Dict) -> Dict:
        """
        Create a volume snapshot
        """
        metadata = snapshot_spec['metadata']
        spec = snapshot_spec['spec']
        
        snapshot = {
            'name': metadata['name'],
            'namespace': metadata.get('namespace', 'default'),
            'source_pvc': spec['source']['persistentVolumeClaimName'],
            'snapshot_class': spec.get('volumeSnapshotClassName'),
            'creation_timestamp': datetime.now().isoformat(),
            'ready_to_use': True,  # Simulate immediate readiness
            'restore_size': self._get_pvc_size(spec['source']['persistentVolumeClaimName'], metadata.get('namespace', 'default')),
            'labels': metadata.get('labels', {}),
            'annotations': metadata.get('annotations', {})
        }
        
        snapshot_key = f"{snapshot['namespace']}/{snapshot['name']}"
        self.volume_snapshots[snapshot_key] = snapshot
        
        return snapshot
    
    def restore_from_snapshot(self, pvc_spec: Dict, snapshot_name: str) -> Optional[PersistentVolumeClaim]:
        """
        Create PVC from volume snapshot
        """
        metadata = pvc_spec['metadata']
        namespace = metadata.get('namespace', 'default')
        snapshot_key = f"{namespace}/{snapshot_name}"
        
        snapshot = self.volume_snapshots.get(snapshot_key)
        if not snapshot or not snapshot['ready_to_use']:
            return None
        
        # Create PVC with snapshot as data source
        pvc_spec['spec']['dataSource'] = {
            'name': snapshot_name,
            'kind': 'VolumeSnapshot',
            'apiGroup': 'snapshot.storage.k8s.io'
        }
        
        return self.create_persistent_volume_claim(pvc_spec)
    
    def get_storage_metrics(self) -> Dict:
        """
        Get storage utilization metrics
        """
        total_pvs = len(self.persistent_volumes)
        bound_pvs = sum(1 for pv in self.persistent_volumes.values() if pv.phase == VolumePhase.BOUND)
        available_pvs = sum(1 for pv in self.persistent_volumes.values() if pv.phase == VolumePhase.AVAILABLE)
        
        total_pvcs = len(self.persistent_volume_claims)
        bound_pvcs = sum(1 for pvc in self.persistent_volume_claims.values() if pvc.phase == VolumePhase.BOUND)
        pending_pvcs = sum(1 for pvc in self.persistent_volume_claims.values() if pvc.phase == VolumePhase.PENDING)
        
        # Calculate total capacity
        total_capacity = 0
        used_capacity = 0
        
        for pv in self.persistent_volumes.values():
            capacity_gi = int(pv.capacity.replace('Gi', '').replace('G', ''))
            total_capacity += capacity_gi
            if pv.phase == VolumePhase.BOUND:
                used_capacity += capacity_gi
        
        return {
            'persistent_volumes': {
                'total': total_pvs,
                'bound': bound_pvs,
                'available': available_pvs,
                'released': total_pvs - bound_pvs - available_pvs
            },
            'persistent_volume_claims': {
                'total': total_pvcs,
                'bound': bound_pvcs,
                'pending': pending_pvcs
            },
            'capacity': {
                'total_gi': total_capacity,
                'used_gi': used_capacity,
                'available_gi': total_capacity - used_capacity,
                'utilization_percent': (used_capacity / total_capacity * 100) if total_capacity > 0 else 0
            },
            'storage_classes': len(self.storage_classes),
            'volume_snapshots': len(self.volume_snapshots)
        }
    
    def list_persistent_volumes(self, storage_class: Optional[str] = None) -> List[Dict]:
        """
        List persistent volumes with optional filtering
        """
        pvs = []
        for pv in self.persistent_volumes.values():
            if storage_class and pv.storage_class != storage_class:
                continue
            
            pvs.append({
                'name': pv.name,
                'capacity': pv.capacity,
                'accessModes': [mode.value for mode in pv.access_modes],
                'reclaimPolicy': pv.reclaim_policy.value,
                'status': pv.phase.value,
                'claim': pv.claim_ref,
                'storageClass': pv.storage_class,
                'volumeType': pv.volume_type,
                'age': (datetime.now() - pv.creation_timestamp).days
            })
        
        return sorted(pvs, key=lambda x: x['name'])
    
    def list_persistent_volume_claims(self, namespace: Optional[str] = None) -> List[Dict]:
        """
        List persistent volume claims with optional namespace filtering
        """
        pvcs = []
        for pvc_key, pvc in self.persistent_volume_claims.items():
            if namespace and pvc.namespace != namespace:
                continue
            
            pvcs.append({
                'name': pvc.name,
                'namespace': pvc.namespace,
                'status': pvc.phase.value,
                'volume': pvc.volume_name,
                'capacity': pvc.storage_request,
                'accessModes': [mode.value for mode in pvc.access_modes],
                'storageClass': pvc.storage_class,
                'age': (datetime.now() - pvc.creation_timestamp).days
            })
        
        return sorted(pvcs, key=lambda x: (x['namespace'], x['name']))
    
    def _bind_pvc_to_pv(self, pvc: PersistentVolumeClaim):
        """
        Automatically bind PVC to compatible PV
        """
        for pv in self.persistent_volumes.values():
            if pv.phase == VolumePhase.AVAILABLE and self._is_compatible(pvc, pv):
                pvc.volume_name = pv.name
                pvc.phase = VolumePhase.BOUND
                pv.claim_ref = f"{pvc.namespace}/{pvc.name}"
                pv.phase = VolumePhase.BOUND
                break
    
    def _is_compatible(self, pvc: PersistentVolumeClaim, pv: PersistentVolume) -> bool:
        """
        Check if PVC is compatible with PV
        """
        # Check access modes
        pvc_modes = set(pvc.access_modes)
        pv_modes = set(pv.access_modes)
        if not pvc_modes.issubset(pv_modes):
            return False
        
        # Check storage class
        if pvc.storage_class and pvc.storage_class != pv.storage_class:
            return False
        
        # Check capacity
        pvc_size = int(pvc.storage_request.replace('Gi', '').replace('G', ''))
        pv_size = int(pv.capacity.replace('Gi', '').replace('G', ''))
        if pvc_size > pv_size:
            return False
        
        return True
    
    def _determine_volume_type(self, spec: Dict) -> str:
        """
        Determine volume type from spec
        """
        if 'local' in spec:
            return 'local'
        elif 'nfs' in spec:
            return 'nfs'
        elif 'awsElasticBlockStore' in spec:
            return 'ebs'
        elif 'azureDisk' in spec:
            return 'azure-disk'
        elif 'gcePersistentDisk' in spec:
            return 'gce-pd'
        else:
            return 'unknown'
    
    def _get_pvc_size(self, pvc_name: str, namespace: str) -> str:
        """
        Get PVC size for snapshot
        """
        pvc_key = f"{namespace}/{pvc_name}"
        pvc = self.persistent_volume_claims.get(pvc_key)
        return pvc.storage_request if pvc else "0Gi"


# Example usage
if __name__ == "__main__":
    sm = StorageManager()
    
    # Create storage class
    storage_class_spec = {
        'metadata': {'name': 'fast-ssd'},
        'provisioner': 'kubernetes.io/aws-ebs',
        'parameters': {'type': 'gp3', 'encrypted': 'true'},
        'reclaimPolicy': 'Delete',
        'allowVolumeExpansion': True
    }
    sm.create_storage_class(storage_class_spec)
    
    # Create persistent volume
    pv_spec = {
        'metadata': {
            'name': 'test-pv',
            'labels': {'type': 'ssd'}
        },
        'spec': {
            'capacity': {'storage': '10Gi'},
            'accessModes': ['ReadWriteOnce'],
            'persistentVolumeReclaimPolicy': 'Retain',
            'storageClassName': 'fast-ssd',
            'local': {'path': '/mnt/data'}
        }
    }
    pv = sm.create_persistent_volume(pv_spec)
    
    # Create persistent volume claim
    pvc_spec = {
        'metadata': {
            'name': 'test-pvc',
            'namespace': 'default'
        },
        'spec': {
            'accessModes': ['ReadWriteOnce'],
            'storageClassName': 'fast-ssd',
            'resources': {'requests': {'storage': '5Gi'}}
        }
    }
    pvc = sm.create_persistent_volume_claim(pvc_spec)
    
    # Display metrics
    print("Storage Metrics:")
    print(json.dumps(sm.get_storage_metrics(), indent=2))
    
    # List volumes
    print("\nPersistent Volumes:")
    for pv_info in sm.list_persistent_volumes():
        print(f"  {pv_info['name']}: {pv_info['capacity']} ({pv_info['status']})")
    
    print("\nPersistent Volume Claims:")
    for pvc_info in sm.list_persistent_volume_claims():
        print(f"  {pvc_info['namespace']}/{pvc_info['name']}: {pvc_info['capacity']} ({pvc_info['status']})")
```

### Storage Best Practices

1. **Storage Classes**: Use appropriate storage classes for different workload requirements
2. **Access Modes**: Choose correct access modes based on application needs
3. **Capacity Planning**: Monitor storage usage and plan for growth
4. **Backup Strategy**: Implement regular backups using volume snapshots
5. **Performance**: Select appropriate storage types for performance requirements
6. **Security**: Use encrypted storage for sensitive data
7. **Cost Optimization**: Use appropriate storage tiers and reclaim policies
8. **Monitoring**: Monitor storage performance and availability
9. **Disaster Recovery**: Plan for cross-region storage replication
10. **Resource Limits**: Set appropriate storage quotas and limits

## Q7: How do you implement networking and ingress in Kubernetes?
**Difficulty: Medium-Hard**

**Answer:**

Kubernetes networking enables communication between pods, services, and external clients. Ingress provides HTTP/HTTPS routing to services based on rules, acting as a reverse proxy and load balancer.

### Kubernetes Networking Fundamentals

```yaml
# Pod-to-Pod Communication Example
apiVersion: v1
kind: Pod
metadata:
  name: frontend-pod
  labels:
    app: frontend
    tier: web
spec:
  containers:
  - name: frontend
    image: nginx:1.21
    ports:
    - containerPort: 80
      name: http
    env:
    - name: BACKEND_SERVICE
      value: "backend-service.default.svc.cluster.local:8080"
    - name: DATABASE_SERVICE
      value: "postgres-service.database.svc.cluster.local:5432"

---
apiVersion: v1
kind: Pod
metadata:
  name: backend-pod
  labels:
    app: backend
    tier: api
spec:
  containers:
  - name: backend
    image: node:16-alpine
    ports:
    - containerPort: 8080
      name: api
    command: ["node", "server.js"]
    env:
    - name: DB_HOST
      value: "postgres-service.database.svc.cluster.local"
    - name: DB_PORT
      value: "5432"
```

### Network Policies for Security

```yaml
# Default Deny All Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}  # Applies to all pods in namespace
  policyTypes:
  - Ingress
  - Egress

---
# Allow Frontend to Backend Communication
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080

---
# Allow Backend to Database Communication
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-to-database
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Egress
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: database
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432

---
# Allow External DNS Resolution
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-dns
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Egress
  egress:
  - to: []
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53

---
# Complex Network Policy with Multiple Rules
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: web-app-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      tier: web
  policyTypes:
  - Ingress
  - Egress
  
  ingress:
  # Allow traffic from ingress controller
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    ports:
    - protocol: TCP
      port: 80
    - protocol: TCP
      port: 443
  
  # Allow traffic from monitoring namespace
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
    - podSelector:
        matchLabels:
          app: prometheus
    ports:
    - protocol: TCP
      port: 9090
  
  egress:
  # Allow traffic to API services
  - to:
    - podSelector:
        matchLabels:
          tier: api
    ports:
    - protocol: TCP
      port: 8080
  
  # Allow traffic to external services
  - to: []
    ports:
    - protocol: TCP
      port: 443  # HTTPS
    - protocol: TCP
      port: 80   # HTTP
```

### Ingress Controllers and Resources

```yaml
# NGINX Ingress Controller Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-ingress-controller
  namespace: ingress-nginx
  labels:
    app: nginx-ingress-controller
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nginx-ingress-controller
  template:
    metadata:
      labels:
        app: nginx-ingress-controller
    spec:
      serviceAccountName: nginx-ingress-serviceaccount
      containers:
      - name: nginx-ingress-controller
        image: k8s.gcr.io/ingress-nginx/controller:v1.3.0
        args:
        - /nginx-ingress-controller
        - --configmap=$(POD_NAMESPACE)/nginx-configuration
        - --tcp-services-configmap=$(POD_NAMESPACE)/tcp-services
        - --udp-services-configmap=$(POD_NAMESPACE)/udp-services
        - --publish-service=$(POD_NAMESPACE)/ingress-nginx
        - --annotations-prefix=nginx.ingress.kubernetes.io
        - --enable-ssl-passthrough
        - --default-ssl-certificate=$(POD_NAMESPACE)/default-ssl-certificate
        env:
        - name: POD_NAME
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: POD_NAMESPACE
          valueFrom:
            fieldRef:
              fieldPath: metadata.namespace
        ports:
        - name: http
          containerPort: 80
        - name: https
          containerPort: 443
        - name: metrics
          containerPort: 10254
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /healthz
            port: 10254
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3
        readinessProbe:
          httpGet:
            path: /healthz
            port: 10254
            scheme: HTTP
          initialDelaySeconds: 10
          periodSeconds: 10
          timeoutSeconds: 1
          successThreshold: 1
          failureThreshold: 3

---
# Basic Ingress Resource
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  namespace: default
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
spec:
  tls:
  - hosts:
    - myapp.example.com
    - api.example.com
    secretName: tls-secret
  
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
  
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api-service
            port:
              number: 3000

---
# Advanced Ingress with Multiple Features
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: advanced-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    
    # SSL and Security
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/ssl-protocols: "TLSv1.2 TLSv1.3"
    nginx.ingress.kubernetes.io/ssl-ciphers: "ECDHE-RSA-AES128-GCM-SHA256,ECDHE-RSA-AES256-GCM-SHA384"
    
    # Rate Limiting
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    
    # CORS
    nginx.ingress.kubernetes.io/enable-cors: "true"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://myapp.example.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    nginx.ingress.kubernetes.io/cors-allow-headers: "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization"
    
    # Authentication
    nginx.ingress.kubernetes.io/auth-type: basic
    nginx.ingress.kubernetes.io/auth-secret: basic-auth
    nginx.ingress.kubernetes.io/auth-realm: 'Authentication Required'
    
    # Load Balancing
    nginx.ingress.kubernetes.io/load-balance: "round_robin"
    nginx.ingress.kubernetes.io/upstream-hash-by: "$request_uri"
    
    # Timeouts
    nginx.ingress.kubernetes.io/proxy-connect-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-send-timeout: "60"
    nginx.ingress.kubernetes.io/proxy-read-timeout: "60"
    
    # Request Size
    nginx.ingress.kubernetes.io/proxy-body-size: "10m"
    
    # Custom Headers
    nginx.ingress.kubernetes.io/configuration-snippet: |
      more_set_headers "X-Frame-Options: DENY";
      more_set_headers "X-Content-Type-Options: nosniff";
      more_set_headers "X-XSS-Protection: 1; mode=block";
      more_set_headers "Strict-Transport-Security: max-age=31536000; includeSubDomains";
spec:
  tls:
  - hosts:
    - secure.example.com
    secretName: wildcard-tls-secret
  
  rules:
  - host: secure.example.com
    http:
      paths:
      - path: /app
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80
      - path: /api/v1
        pathType: Prefix
        backend:
          service:
            name: api-v1-service
            port:
              number: 8080
      - path: /api/v2
        pathType: Prefix
        backend:
          service:
            name: api-v2-service
            port:
              number: 8080

---
# Ingress with Canary Deployment
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: canary-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"  # 10% traffic to canary
    # nginx.ingress.kubernetes.io/canary-by-header: "X-Canary"
    # nginx.ingress.kubernetes.io/canary-by-cookie: "canary"
spec:
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: app-canary-service
            port:
              number: 80
```

### Service Mesh with Istio

```yaml
# Istio Gateway
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: web-app-gateway
  namespace: production
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - myapp.example.com
    tls:
      httpsRedirect: true
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: myapp-tls-secret
    hosts:
    - myapp.example.com

---
# Istio Virtual Service
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: web-app-virtual-service
  namespace: production
spec:
  hosts:
  - myapp.example.com
  gateways:
  - web-app-gateway
  http:
  # Canary routing based on headers
  - match:
    - headers:
        x-canary:
          exact: "true"
    route:
    - destination:
        host: web-app-service
        subset: canary
      weight: 100
  
  # Weight-based routing
  - match:
    - uri:
        prefix: "/api/v2"
    route:
    - destination:
        host: api-service
        subset: v2
      weight: 90
    - destination:
        host: api-service
        subset: v1
      weight: 10
  
  # Default routing
  - route:
    - destination:
        host: web-app-service
        subset: stable
      weight: 100
    timeout: 30s
    retries:
      attempts: 3
      perTryTimeout: 10s

---
# Istio Destination Rule
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: web-app-destination-rule
  namespace: production
spec:
  host: web-app-service
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 10
    circuitBreaker:
      consecutiveErrors: 5
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
  subsets:
  - name: stable
    labels:
      version: stable
  - name: canary
    labels:
      version: canary
    trafficPolicy:
      loadBalancer:
        simple: ROUND_ROBIN
```

### Networking Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Networking and Ingress Management Utility
"""

import json
import re
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime

class IngressClass(Enum):
    NGINX = "nginx"
    TRAEFIK = "traefik"
    ISTIO = "istio"
    AMBASSADOR = "ambassador"
    CONTOUR = "contour"

class PathType(Enum):
    EXACT = "Exact"
    PREFIX = "Prefix"
    IMPLEMENTATION_SPECIFIC = "ImplementationSpecific"

class NetworkPolicyType(Enum):
    INGRESS = "Ingress"
    EGRESS = "Egress"

@dataclass
class IngressRule:
    host: str
    paths: List[Dict[str, Any]]
    tls_enabled: bool = False
    tls_secret: Optional[str] = None

@dataclass
class NetworkPolicyRule:
    policy_type: NetworkPolicyType
    from_selectors: List[Dict] = field(default_factory=list)
    to_selectors: List[Dict] = field(default_factory=list)
    ports: List[Dict] = field(default_factory=list)

@dataclass
class IngressResource:
    name: str
    namespace: str
    ingress_class: IngressClass
    rules: List[IngressRule]
    annotations: Dict[str, str] = field(default_factory=dict)
    labels: Dict[str, str] = field(default_factory=dict)
    creation_timestamp: datetime = field(default_factory=datetime.now)

@dataclass
class NetworkPolicy:
    name: str
    namespace: str
    pod_selector: Dict[str, Any]
    policy_rules: List[NetworkPolicyRule]
    labels: Dict[str, str] = field(default_factory=dict)
    creation_timestamp: datetime = field(default_factory=datetime.now)

class NetworkingManager:
    def __init__(self):
        self.ingress_resources: Dict[str, IngressResource] = {}
        self.network_policies: Dict[str, NetworkPolicy] = {}
        self.ingress_controllers: Dict[str, Dict] = {}
        self.service_mesh_config: Dict[str, Any] = {}
    
    def create_ingress(self, ingress_spec: Dict) -> IngressResource:
        """
        Create an Ingress resource
        """
        metadata = ingress_spec['metadata']
        spec = ingress_spec['spec']
        
        # Parse ingress class from annotations
        annotations = metadata.get('annotations', {})
        ingress_class_name = annotations.get('kubernetes.io/ingress.class', 'nginx')
        ingress_class = IngressClass(ingress_class_name)
        
        # Parse rules
        rules = []
        for rule_spec in spec.get('rules', []):
            host = rule_spec.get('host', '*')
            paths = []
            
            if 'http' in rule_spec:
                for path_spec in rule_spec['http'].get('paths', []):
                    path_info = {
                        'path': path_spec.get('path', '/'),
                        'pathType': path_spec.get('pathType', 'Prefix'),
                        'backend': path_spec['backend']
                    }
                    paths.append(path_info)
            
            # Check for TLS
            tls_enabled = False
            tls_secret = None
            for tls_spec in spec.get('tls', []):
                if host in tls_spec.get('hosts', []):
                    tls_enabled = True
                    tls_secret = tls_spec.get('secretName')
                    break
            
            rule = IngressRule(
                host=host,
                paths=paths,
                tls_enabled=tls_enabled,
                tls_secret=tls_secret
            )
            rules.append(rule)
        
        ingress = IngressResource(
            name=metadata['name'],
            namespace=metadata.get('namespace', 'default'),
            ingress_class=ingress_class,
            rules=rules,
            annotations=annotations,
            labels=metadata.get('labels', {})
        )
        
        ingress_key = f"{ingress.namespace}/{ingress.name}"
        self.ingress_resources[ingress_key] = ingress
        
        return ingress
    
    def create_network_policy(self, policy_spec: Dict) -> NetworkPolicy:
        """
        Create a Network Policy
        """
        metadata = policy_spec['metadata']
        spec = policy_spec['spec']
        
        # Parse policy rules
        policy_rules = []
        
        # Parse ingress rules
        for ingress_rule in spec.get('ingress', []):
            rule = NetworkPolicyRule(
                policy_type=NetworkPolicyType.INGRESS,
                from_selectors=ingress_rule.get('from', []),
                ports=ingress_rule.get('ports', [])
            )
            policy_rules.append(rule)
        
        # Parse egress rules
        for egress_rule in spec.get('egress', []):
            rule = NetworkPolicyRule(
                policy_type=NetworkPolicyType.EGRESS,
                to_selectors=egress_rule.get('to', []),
                ports=egress_rule.get('ports', [])
            )
            policy_rules.append(rule)
        
        policy = NetworkPolicy(
            name=metadata['name'],
            namespace=metadata.get('namespace', 'default'),
            pod_selector=spec.get('podSelector', {}),
            policy_rules=policy_rules,
            labels=metadata.get('labels', {})
        )
        
        policy_key = f"{policy.namespace}/{policy.name}"
        self.network_policies[policy_key] = policy
        
        return policy
    
    def configure_ingress_controller(self, controller_type: str, config: Dict) -> Dict:
        """
        Configure an ingress controller
        """
        controller_config = {
            'type': controller_type,
            'namespace': config.get('namespace', 'ingress-nginx'),
            'replicas': config.get('replicas', 2),
            'resources': config.get('resources', {
                'requests': {'memory': '256Mi', 'cpu': '200m'},
                'limits': {'memory': '512Mi', 'cpu': '500m'}
            }),
            'service_type': config.get('service_type', 'LoadBalancer'),
            'ssl_protocols': config.get('ssl_protocols', ['TLSv1.2', 'TLSv1.3']),
            'rate_limiting': config.get('rate_limiting', {
                'enabled': True,
                'requests_per_minute': 100
            }),
            'monitoring': config.get('monitoring', {
                'enabled': True,
                'metrics_port': 10254
            }),
            'creation_timestamp': datetime.now().isoformat()
        }
        
        self.ingress_controllers[controller_type] = controller_config
        return controller_config
    
    def setup_service_mesh(self, mesh_type: str, config: Dict) -> Dict:
        """
        Setup service mesh configuration
        """
        mesh_config = {
            'type': mesh_type,
            'namespace': config.get('namespace', 'istio-system'),
            'mtls_enabled': config.get('mtls_enabled', True),
            'tracing_enabled': config.get('tracing_enabled', True),
            'monitoring_enabled': config.get('monitoring_enabled', True),
            'gateways': config.get('gateways', []),
            'virtual_services': config.get('virtual_services', []),
            'destination_rules': config.get('destination_rules', []),
            'policies': config.get('policies', []),
            'creation_timestamp': datetime.now().isoformat()
        }
        
        self.service_mesh_config[mesh_type] = mesh_config
        return mesh_config
    
    def validate_ingress_rules(self, ingress_name: str, namespace: str) -> List[str]:
        """
        Validate ingress rules and return any issues
        """
        ingress_key = f"{namespace}/{ingress_name}"
        ingress = self.ingress_resources.get(ingress_key)
        
        if not ingress:
            return ["Ingress resource not found"]
        
        issues = []
        
        for rule in ingress.rules:
            # Validate host format
            if rule.host != '*' and not self._is_valid_hostname(rule.host):
                issues.append(f"Invalid hostname: {rule.host}")
            
            # Validate paths
            for path_info in rule.paths:
                path = path_info['path']
                path_type = path_info['pathType']
                
                if path_type == 'Exact' and not path.startswith('/'):
                    issues.append(f"Exact path must start with '/': {path}")
                
                if path_type == 'Prefix' and not path.startswith('/'):
                    issues.append(f"Prefix path must start with '/': {path}")
                
                # Validate backend service
                backend = path_info['backend']
                if 'service' not in backend:
                    issues.append(f"Backend service not specified for path: {path}")
            
            # Validate TLS configuration
            if rule.tls_enabled and not rule.tls_secret:
                issues.append(f"TLS enabled but no secret specified for host: {rule.host}")
        
        return issues
    
    def get_ingress_traffic_routing(self, ingress_name: str, namespace: str) -> Dict:
        """
        Get traffic routing information for an ingress
        """
        ingress_key = f"{namespace}/{ingress_name}"
        ingress = self.ingress_resources.get(ingress_key)
        
        if not ingress:
            return {}
        
        routing_info = {
            'ingress_class': ingress.ingress_class.value,
            'hosts': [],
            'tls_hosts': [],
            'path_routing': {},
            'annotations': ingress.annotations
        }
        
        for rule in ingress.rules:
            routing_info['hosts'].append(rule.host)
            
            if rule.tls_enabled:
                routing_info['tls_hosts'].append({
                    'host': rule.host,
                    'secret': rule.tls_secret
                })
            
            host_paths = []
            for path_info in rule.paths:
                backend_service = path_info['backend']['service']
                host_paths.append({
                    'path': path_info['path'],
                    'pathType': path_info['pathType'],
                    'service': backend_service['name'],
                    'port': backend_service['port']['number']
                })
            
            routing_info['path_routing'][rule.host] = host_paths
        
        return routing_info
    
    def analyze_network_policies(self, namespace: str) -> Dict:
        """
        Analyze network policies for a namespace
        """
        namespace_policies = [
            policy for policy in self.network_policies.values()
            if policy.namespace == namespace
        ]
        
        analysis = {
            'total_policies': len(namespace_policies),
            'default_deny_all': False,
            'ingress_policies': 0,
            'egress_policies': 0,
            'pod_coverage': {},
            'common_patterns': [],
            'security_gaps': []
        }
        
        for policy in namespace_policies:
            # Check for default deny all
            if (policy.pod_selector == {} and 
                any(rule.policy_type == NetworkPolicyType.INGRESS for rule in policy.policy_rules) and
                any(rule.policy_type == NetworkPolicyType.EGRESS for rule in policy.policy_rules)):
                analysis['default_deny_all'] = True
            
            # Count policy types
            for rule in policy.policy_rules:
                if rule.policy_type == NetworkPolicyType.INGRESS:
                    analysis['ingress_policies'] += 1
                else:
                    analysis['egress_policies'] += 1
            
            # Analyze pod selector coverage
            selector_key = str(policy.pod_selector)
            if selector_key not in analysis['pod_coverage']:
                analysis['pod_coverage'][selector_key] = 0
            analysis['pod_coverage'][selector_key] += 1
        
        # Identify common patterns
        if analysis['default_deny_all']:
            analysis['common_patterns'].append('Default Deny All')
        
        if analysis['ingress_policies'] > analysis['egress_policies']:
            analysis['common_patterns'].append('Ingress-focused Security')
        elif analysis['egress_policies'] > analysis['ingress_policies']:
            analysis['common_patterns'].append('Egress-focused Security')
        
        # Identify security gaps
        if not analysis['default_deny_all']:
            analysis['security_gaps'].append('No default deny policy')
        
        if analysis['ingress_policies'] == 0:
            analysis['security_gaps'].append('No ingress restrictions')
        
        if analysis['egress_policies'] == 0:
            analysis['security_gaps'].append('No egress restrictions')
        
        return analysis
    
    def get_networking_metrics(self) -> Dict:
        """
        Get networking metrics
        """
        total_ingresses = len(self.ingress_resources)
        tls_enabled_ingresses = sum(
            1 for ingress in self.ingress_resources.values()
            if any(rule.tls_enabled for rule in ingress.rules)
        )
        
        ingress_classes = {}
        for ingress in self.ingress_resources.values():
            class_name = ingress.ingress_class.value
            ingress_classes[class_name] = ingress_classes.get(class_name, 0) + 1
        
        total_policies = len(self.network_policies)
        namespaces_with_policies = len(set(
            policy.namespace for policy in self.network_policies.values()
        ))
        
        return {
            'ingress_resources': {
                'total': total_ingresses,
                'tls_enabled': tls_enabled_ingresses,
                'by_class': ingress_classes
            },
            'network_policies': {
                'total': total_policies,
                'namespaces_covered': namespaces_with_policies
            },
            'ingress_controllers': len(self.ingress_controllers),
            'service_mesh': len(self.service_mesh_config)
        }
    
    def _is_valid_hostname(self, hostname: str) -> bool:
        """
        Validate hostname format
        """
        if len(hostname) > 253:
            return False
        
        # Allow wildcard subdomains
        if hostname.startswith('*.'):
            hostname = hostname[2:]
        
        # Basic hostname validation
        pattern = r'^[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$'
        return re.match(pattern, hostname) is not None


# Example usage
if __name__ == "__main__":
    nm = NetworkingManager()
    
    # Configure NGINX ingress controller
    nginx_config = {
        'namespace': 'ingress-nginx',
        'replicas': 3,
        'service_type': 'LoadBalancer',
        'rate_limiting': {
            'enabled': True,
            'requests_per_minute': 200
        }
    }
    nm.configure_ingress_controller('nginx', nginx_config)
    
    # Create ingress resource
    ingress_spec = {
        'metadata': {
            'name': 'web-app-ingress',
            'namespace': 'production',
            'annotations': {
                'kubernetes.io/ingress.class': 'nginx',
                'nginx.ingress.kubernetes.io/ssl-redirect': 'true'
            }
        },
        'spec': {
            'tls': [{
                'hosts': ['myapp.example.com'],
                'secretName': 'tls-secret'
            }],
            'rules': [{
                'host': 'myapp.example.com',
                'http': {
                    'paths': [{
                        'path': '/',
                        'pathType': 'Prefix',
                        'backend': {
                            'service': {
                                'name': 'web-service',
                                'port': {'number': 80}
                            }
                        }
                    }]
                }
            }]
        }
    }
    
    ingress = nm.create_ingress(ingress_spec)
    
    # Create network policy
    policy_spec = {
        'metadata': {
            'name': 'web-app-policy',
            'namespace': 'production'
        },
        'spec': {
            'podSelector': {
                'matchLabels': {'app': 'web-app'}
            },
            'policyTypes': ['Ingress', 'Egress'],
            'ingress': [{
                'from': [{
                    'namespaceSelector': {
                        'matchLabels': {'name': 'ingress-nginx'}
                    }
                }],
                'ports': [{'protocol': 'TCP', 'port': 80}]
            }],
            'egress': [{
                'to': [{
                    'podSelector': {
                        'matchLabels': {'app': 'backend'}
                    }
                }],
                'ports': [{'protocol': 'TCP', 'port': 8080}]
            }]
        }
    }
    
    policy = nm.create_network_policy(policy_spec)
    
    # Display metrics
    print("Networking Metrics:")
    print(json.dumps(nm.get_networking_metrics(), indent=2))
    
    # Validate ingress
    issues = nm.validate_ingress_rules('web-app-ingress', 'production')
    if issues:
        print("\nIngress Issues:")
        for issue in issues:
            print(f"  - {issue}")
    else:
        print("\nIngress validation passed!")
    
    # Analyze network policies
    analysis = nm.analyze_network_policies('production')
    print("\nNetwork Policy Analysis:")
    print(json.dumps(analysis, indent=2))
```

### Networking Best Practices

1. **Network Segmentation**: Use network policies to segment traffic between namespaces and pods
2. **TLS Everywhere**: Enable TLS for all external-facing services
3. **Ingress Controllers**: Choose appropriate ingress controllers for your use case
4. **Rate Limiting**: Implement rate limiting to protect against abuse
5. **Monitoring**: Monitor network traffic and ingress performance
6. **Security Headers**: Configure security headers in ingress controllers
7. **Service Mesh**: Consider service mesh for complex microservices communication
8. **DNS**: Use proper DNS configuration for service discovery
9. **Load Balancing**: Configure appropriate load balancing algorithms
10. **Disaster Recovery**: Plan for ingress controller high availability

## Q8: How do you implement monitoring and observability in Kubernetes?
**Difficulty: Medium-Hard**

**Answer:**

Monitoring and observability in Kubernetes involves collecting metrics, logs, and traces from applications and infrastructure components to ensure system health, performance, and troubleshooting capabilities.

### Prometheus and Grafana Stack

```yaml
# Prometheus Configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
      external_labels:
        cluster: 'production'
        region: 'us-west-2'
    
    rule_files:
    - "/etc/prometheus/rules/*.yml"
    
    alerting:
      alertmanagers:
      - static_configs:
        - targets:
          - alertmanager:9093
    
    scrape_configs:
    # Kubernetes API Server
    - job_name: 'kubernetes-apiservers'
      kubernetes_sd_configs:
      - role: endpoints
        namespaces:
          names:
          - default
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        insecure_skip_verify: true
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
    
    # Kubernetes Nodes
    - job_name: 'kubernetes-nodes'
      kubernetes_sd_configs:
      - role: node
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        insecure_skip_verify: true
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
      - target_label: __address__
        replacement: kubernetes.default.svc:443
      - source_labels: [__meta_kubernetes_node_name]
        regex: (.+)
        target_label: __metrics_path__
        replacement: /api/v1/nodes/${1}/proxy/metrics
    
    # Kubernetes Pods
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
        action: replace
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
        target_label: __address__
      - action: labelmap
        regex: __meta_kubernetes_pod_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_pod_name]
        action: replace
        target_label: kubernetes_pod_name
    
    # Application Services
    - job_name: 'kubernetes-services'
      kubernetes_sd_configs:
      - role: endpoints
      relabel_configs:
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
        action: replace
        target_label: __scheme__
        regex: (https?)
      - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)
      - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
        action: replace
        target_label: __address__
        regex: ([^:]+)(?::\d+)?;(\d+)
        replacement: $1:$2
      - action: labelmap
        regex: __meta_kubernetes_service_label_(.+)
      - source_labels: [__meta_kubernetes_namespace]
        action: replace
        target_label: kubernetes_namespace
      - source_labels: [__meta_kubernetes_service_name]
        action: replace
        target_label: kubernetes_name

---
# Prometheus Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus
  namespace: monitoring
  labels:
    app: prometheus
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus
  template:
    metadata:
      labels:
        app: prometheus
    spec:
      serviceAccountName: prometheus
      containers:
      - name: prometheus
        image: prom/prometheus:v2.40.0
        args:
        - '--config.file=/etc/prometheus/prometheus.yml'
        - '--storage.tsdb.path=/prometheus/'
        - '--web.console.libraries=/etc/prometheus/console_libraries'
        - '--web.console.templates=/etc/prometheus/consoles'
        - '--storage.tsdb.retention.time=15d'
        - '--web.enable-lifecycle'
        - '--web.enable-admin-api'
        ports:
        - containerPort: 9090
          name: web
        volumeMounts:
        - name: prometheus-config
          mountPath: /etc/prometheus
        - name: prometheus-storage
          mountPath: /prometheus
        resources:
          requests:
            memory: "2Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /-/healthy
            port: 9090
          initialDelaySeconds: 30
          timeoutSeconds: 30
        readinessProbe:
          httpGet:
            path: /-/ready
            port: 9090
          initialDelaySeconds: 30
          timeoutSeconds: 30
      volumes:
      - name: prometheus-config
        configMap:
          name: prometheus-config
      - name: prometheus-storage
        persistentVolumeClaim:
          claimName: prometheus-pvc

---
# Grafana Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: monitoring
  labels:
    app: grafana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: grafana
  template:
    metadata:
      labels:
        app: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana:9.3.0
        ports:
        - containerPort: 3000
          name: web
        env:
        - name: GF_SECURITY_ADMIN_PASSWORD
          valueFrom:
            secretKeyRef:
              name: grafana-secret
              key: admin-password
        - name: GF_INSTALL_PLUGINS
          value: "grafana-kubernetes-app,grafana-piechart-panel,grafana-worldmap-panel"
        - name: GF_SERVER_ROOT_URL
          value: "https://grafana.example.com"
        - name: GF_SECURITY_COOKIE_SECURE
          value: "true"
        - name: GF_ANALYTICS_REPORTING_ENABLED
          value: "false"
        volumeMounts:
        - name: grafana-storage
          mountPath: /var/lib/grafana
        - name: grafana-datasources
          mountPath: /etc/grafana/provisioning/datasources
        - name: grafana-dashboards-config
          mountPath: /etc/grafana/provisioning/dashboards
        - name: grafana-dashboards
          mountPath: /var/lib/grafana/dashboards
        resources:
          requests:
            memory: "512Mi"
            cpu: "200m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          timeoutSeconds: 30
        readinessProbe:
          httpGet:
            path: /api/health
            port: 3000
          initialDelaySeconds: 30
          timeoutSeconds: 30
      volumes:
      - name: grafana-storage
        persistentVolumeClaim:
          claimName: grafana-pvc
      - name: grafana-datasources
        configMap:
          name: grafana-datasources
      - name: grafana-dashboards-config
        configMap:
          name: grafana-dashboards-config
      - name: grafana-dashboards
        configMap:
          name: grafana-dashboards
```

### Logging with ELK Stack

```yaml
# Elasticsearch StatefulSet
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch
  namespace: logging
  labels:
    app: elasticsearch
spec:
  serviceName: elasticsearch
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch
  template:
    metadata:
      labels:
        app: elasticsearch
    spec:
      containers:
      - name: elasticsearch
        image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
        ports:
        - containerPort: 9200
          name: rest
        - containerPort: 9300
          name: inter-node
        env:
        - name: cluster.name
          value: "kubernetes-logs"
        - name: node.name
          valueFrom:
            fieldRef:
              fieldPath: metadata.name
        - name: discovery.seed_hosts
          value: "elasticsearch-0.elasticsearch,elasticsearch-1.elasticsearch,elasticsearch-2.elasticsearch"
        - name: cluster.initial_master_nodes
          value: "elasticsearch-0,elasticsearch-1,elasticsearch-2"
        - name: ES_JAVA_OPTS
          value: "-Xms2g -Xmx2g"
        - name: xpack.security.enabled
          value: "false"
        - name: xpack.monitoring.collection.enabled
          value: "true"
        volumeMounts:
        - name: elasticsearch-data
          mountPath: /usr/share/elasticsearch/data
        resources:
          requests:
            memory: "4Gi"
            cpu: "1000m"
          limits:
            memory: "6Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /_cluster/health
            port: 9200
          initialDelaySeconds: 90
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /_cluster/health
            port: 9200
          initialDelaySeconds: 90
          periodSeconds: 10
  volumeClaimTemplates:
  - metadata:
      name: elasticsearch-data
    spec:
      accessModes: ["ReadWriteOnce"]
      storageClassName: "fast-ssd"
      resources:
        requests:
          storage: 100Gi

---
# Logstash Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: logstash
  namespace: logging
  labels:
    app: logstash
spec:
  replicas: 2
  selector:
    matchLabels:
      app: logstash
  template:
    metadata:
      labels:
        app: logstash
    spec:
      containers:
      - name: logstash
        image: docker.elastic.co/logstash/logstash:8.5.0
        ports:
        - containerPort: 5044
          name: beats
        - containerPort: 9600
          name: monitoring
        env:
        - name: LS_JAVA_OPTS
          value: "-Xmx2g -Xms2g"
        volumeMounts:
        - name: logstash-config
          mountPath: /usr/share/logstash/pipeline
        - name: logstash-settings
          mountPath: /usr/share/logstash/config
        resources:
          requests:
            memory: "3Gi"
            cpu: "1000m"
          limits:
            memory: "4Gi"
            cpu: "2000m"
        livenessProbe:
          httpGet:
            path: /
            port: 9600
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 9600
          initialDelaySeconds: 60
          periodSeconds: 10
      volumes:
      - name: logstash-config
        configMap:
          name: logstash-config
      - name: logstash-settings
        configMap:
          name: logstash-settings

---
# Kibana Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: kibana
  namespace: logging
  labels:
    app: kibana
spec:
  replicas: 1
  selector:
    matchLabels:
      app: kibana
  template:
    metadata:
      labels:
        app: kibana
    spec:
      containers:
      - name: kibana
        image: docker.elastic.co/kibana/kibana:8.5.0
        ports:
        - containerPort: 5601
          name: web
        env:
        - name: ELASTICSEARCH_HOSTS
          value: "http://elasticsearch:9200"
        - name: SERVER_NAME
          value: "kibana.example.com"
        - name: SERVER_BASEPATH
          value: "/kibana"
        - name: XPACK_MONITORING_ENABLED
          value: "true"
        - name: XPACK_SECURITY_ENABLED
          value: "false"
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /api/status
            port: 5601
          initialDelaySeconds: 60
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/status
            port: 5601
          initialDelaySeconds: 60
          periodSeconds: 10

---
# Fluent Bit DaemonSet for Log Collection
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluent-bit
  namespace: logging
  labels:
    app: fluent-bit
spec:
  selector:
    matchLabels:
      app: fluent-bit
  template:
    metadata:
      labels:
        app: fluent-bit
    spec:
      serviceAccountName: fluent-bit
      tolerations:
      - key: node-role.kubernetes.io/master
        operator: Exists
        effect: NoSchedule
      containers:
      - name: fluent-bit
        image: fluent/fluent-bit:2.0.0
        ports:
        - containerPort: 2020
          name: metrics
        env:
        - name: FLUENT_ELASTICSEARCH_HOST
          value: "elasticsearch"
        - name: FLUENT_ELASTICSEARCH_PORT
          value: "9200"
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        volumeMounts:
        - name: varlog
          mountPath: /var/log
          readOnly: true
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
        - name: fluent-bit-config
          mountPath: /fluent-bit/etc
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
      - name: fluent-bit-config
        configMap:
          name: fluent-bit-config
```

### Distributed Tracing with Jaeger

```yaml
# Jaeger All-in-One Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jaeger
  namespace: tracing
  labels:
    app: jaeger
spec:
  replicas: 1
  selector:
    matchLabels:
      app: jaeger
  template:
    metadata:
      labels:
        app: jaeger
    spec:
      containers:
      - name: jaeger
        image: jaegertracing/all-in-one:1.40.0
        ports:
        - containerPort: 16686
          name: web
        - containerPort: 14268
          name: collector
        - containerPort: 6831
          name: agent-compact
          protocol: UDP
        - containerPort: 6832
          name: agent-binary
          protocol: UDP
        - containerPort: 5778
          name: agent-config
        - containerPort: 14250
          name: grpc
        env:
        - name: COLLECTOR_ZIPKIN_HOST_PORT
          value: ":9411"
        - name: SPAN_STORAGE_TYPE
          value: "elasticsearch"
        - name: ES_SERVER_URLS
          value: "http://elasticsearch.logging:9200"
        - name: ES_INDEX_PREFIX
          value: "jaeger"
        - name: JAEGER_DISABLED
          value: "false"
        resources:
          requests:
            memory: "512Mi"
            cpu: "200m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 16686
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 16686
          initialDelaySeconds: 30
          periodSeconds: 10

---
# OpenTelemetry Collector
apiVersion: apps/v1
kind: Deployment
metadata:
  name: otel-collector
  namespace: tracing
  labels:
    app: otel-collector
spec:
  replicas: 2
  selector:
    matchLabels:
      app: otel-collector
  template:
    metadata:
      labels:
        app: otel-collector
    spec:
      containers:
      - name: otel-collector
        image: otel/opentelemetry-collector-contrib:0.68.0
        ports:
        - containerPort: 4317
          name: otlp-grpc
        - containerPort: 4318
          name: otlp-http
        - containerPort: 8888
          name: metrics
        - containerPort: 8889
          name: prometheus
        volumeMounts:
        - name: otel-config
          mountPath: /etc/otel
        command:
        - "/otelcol-contrib"
        - "--config=/etc/otel/config.yaml"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /
            port: 8888
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 8888
          initialDelaySeconds: 30
          periodSeconds: 10
      volumes:
      - name: otel-config
        configMap:
          name: otel-collector-config
```

### Application Monitoring Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Monitoring and Observability Management System
"""

import json
import time
import logging
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
import requests
from prometheus_client import CollectorRegistry, Gauge, Counter, Histogram, generate_latest

class MetricType(Enum):
    GAUGE = "gauge"
    COUNTER = "counter"
    HISTOGRAM = "histogram"
    SUMMARY = "summary"

class AlertSeverity(Enum):
    CRITICAL = "critical"
    WARNING = "warning"
    INFO = "info"

class LogLevel(Enum):
    DEBUG = "debug"
    INFO = "info"
    WARNING = "warning"
    ERROR = "error"
    CRITICAL = "critical"

@dataclass
class MetricDefinition:
    name: str
    metric_type: MetricType
    description: str
    labels: List[str] = field(default_factory=list)
    buckets: Optional[List[float]] = None  # For histograms
    unit: str = ""

@dataclass
class AlertRule:
    name: str
    expression: str
    severity: AlertSeverity
    duration: str
    description: str
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)

@dataclass
class LogEntry:
    timestamp: datetime
    level: LogLevel
    message: str
    service: str
    namespace: str
    pod: str
    container: str
    labels: Dict[str, str] = field(default_factory=dict)
    fields: Dict[str, Any] = field(default_factory=dict)

@dataclass
class TraceSpan:
    trace_id: str
    span_id: str
    parent_span_id: Optional[str]
    operation_name: str
    service_name: str
    start_time: datetime
    duration: timedelta
    tags: Dict[str, Any] = field(default_factory=dict)
    logs: List[Dict] = field(default_factory=list)

class MonitoringManager:
    def __init__(self):
        self.metrics_registry = CollectorRegistry()
        self.metrics: Dict[str, Any] = {}
        self.alert_rules: Dict[str, AlertRule] = {}
        self.log_entries: List[LogEntry] = []
        self.traces: Dict[str, List[TraceSpan]] = {}
        self.dashboards: Dict[str, Dict] = {}
        self.prometheus_url = "http://prometheus:9090"
        self.elasticsearch_url = "http://elasticsearch:9200"
        self.jaeger_url = "http://jaeger:16686"
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def register_metric(self, metric_def: MetricDefinition) -> Any:
        """
        Register a new metric with Prometheus
        """
        if metric_def.name in self.metrics:
            return self.metrics[metric_def.name]
        
        if metric_def.metric_type == MetricType.GAUGE:
            metric = Gauge(
                metric_def.name,
                metric_def.description,
                labelnames=metric_def.labels,
                registry=self.metrics_registry
            )
        elif metric_def.metric_type == MetricType.COUNTER:
            metric = Counter(
                metric_def.name,
                metric_def.description,
                labelnames=metric_def.labels,
                registry=self.metrics_registry
            )
        elif metric_def.metric_type == MetricType.HISTOGRAM:
            buckets = metric_def.buckets or [0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
            metric = Histogram(
                metric_def.name,
                metric_def.description,
                labelnames=metric_def.labels,
                buckets=buckets,
                registry=self.metrics_registry
            )
        else:
            raise ValueError(f"Unsupported metric type: {metric_def.metric_type}")
        
        self.metrics[metric_def.name] = metric
        return metric
    
    def create_alert_rule(self, rule: AlertRule) -> AlertRule:
        """
        Create a new alert rule
        """
        self.alert_rules[rule.name] = rule
        return rule
    
    def log_event(self, log_entry: LogEntry) -> None:
        """
        Log an event
        """
        self.log_entries.append(log_entry)
        
        # Also log to Python logger
        log_message = f"[{log_entry.service}:{log_entry.pod}] {log_entry.message}"
        
        if log_entry.level == LogLevel.DEBUG:
            self.logger.debug(log_message)
        elif log_entry.level == LogLevel.INFO:
            self.logger.info(log_message)
        elif log_entry.level == LogLevel.WARNING:
            self.logger.warning(log_message)
        elif log_entry.level == LogLevel.ERROR:
            self.logger.error(log_message)
        elif log_entry.level == LogLevel.CRITICAL:
            self.logger.critical(log_message)
    
    def add_trace_span(self, span: TraceSpan) -> None:
        """
        Add a trace span
        """
        if span.trace_id not in self.traces:
            self.traces[span.trace_id] = []
        
        self.traces[span.trace_id].append(span)
    
    def query_prometheus(self, query: str, time_range: Optional[str] = None) -> Dict:
        """
        Query Prometheus for metrics
        """
        try:
            if time_range:
                url = f"{self.prometheus_url}/api/v1/query_range"
                params = {
                    'query': query,
                    'start': time_range,
                    'end': 'now',
                    'step': '15s'
                }
            else:
                url = f"{self.prometheus_url}/api/v1/query"
                params = {'query': query}
            
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            
            return response.json()
        
        except requests.RequestException as e:
            self.logger.error(f"Failed to query Prometheus: {e}")
            return {}
    
    def search_logs(self, query: str, time_range: str = "1h", size: int = 100) -> List[Dict]:
        """
        Search logs in Elasticsearch
        """
        try:
            search_body = {
                "query": {
                    "bool": {
                        "must": [
                            {
                                "query_string": {
                                    "query": query
                                }
                            },
                            {
                                "range": {
                                    "@timestamp": {
                                        "gte": f"now-{time_range}"
                                    }
                                }
                            }
                        ]
                    }
                },
                "sort": [
                    {
                        "@timestamp": {
                            "order": "desc"
                        }
                    }
                ],
                "size": size
            }
            
            url = f"{self.elasticsearch_url}/logstash-*/_search"
            response = requests.post(url, json=search_body, timeout=30)
            response.raise_for_status()
            
            result = response.json()
            return result.get('hits', {}).get('hits', [])
        
        except requests.RequestException as e:
            self.logger.error(f"Failed to search logs: {e}")
            return []
    
    def get_trace(self, trace_id: str) -> Optional[List[TraceSpan]]:
        """
        Get trace by ID
        """
        return self.traces.get(trace_id)
    
    def create_dashboard(self, name: str, dashboard_config: Dict) -> Dict:
        """
        Create a Grafana dashboard
        """
        dashboard = {
            'id': None,
            'title': name,
            'tags': dashboard_config.get('tags', []),
            'timezone': 'browser',
            'panels': dashboard_config.get('panels', []),
            'time': {
                'from': 'now-1h',
                'to': 'now'
            },
            'timepicker': {
                'refresh_intervals': ['5s', '10s', '30s', '1m', '5m', '15m', '30m', '1h', '2h', '1d'],
                'time_options': ['5m', '15m', '1h', '6h', '12h', '24h', '2d', '7d', '30d']
            },
            'templating': {
                'list': dashboard_config.get('variables', [])
            },
            'annotations': {
                'list': dashboard_config.get('annotations', [])
            },
            'refresh': '30s',
            'schemaVersion': 30,
            'version': 1,
            'links': dashboard_config.get('links', [])
        }
        
        self.dashboards[name] = dashboard
        return dashboard
    
    def generate_kubernetes_dashboard(self) -> Dict:
        """
        Generate a comprehensive Kubernetes dashboard
        """
        panels = [
            {
                'id': 1,
                'title': 'Cluster CPU Usage',
                'type': 'stat',
                'targets': [{
                    'expr': '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)',
                    'legendFormat': 'CPU Usage %'
                }],
                'gridPos': {'h': 8, 'w': 6, 'x': 0, 'y': 0}
            },
            {
                'id': 2,
                'title': 'Cluster Memory Usage',
                'type': 'stat',
                'targets': [{
                    'expr': '(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100',
                    'legendFormat': 'Memory Usage %'
                }],
                'gridPos': {'h': 8, 'w': 6, 'x': 6, 'y': 0}
            },
            {
                'id': 3,
                'title': 'Pod Count by Namespace',
                'type': 'graph',
                'targets': [{
                    'expr': 'sum(kube_pod_info) by (namespace)',
                    'legendFormat': '{{namespace}}'
                }],
                'gridPos': {'h': 8, 'w': 12, 'x': 12, 'y': 0}
            },
            {
                'id': 4,
                'title': 'Container Restarts',
                'type': 'graph',
                'targets': [{
                    'expr': 'increase(kube_pod_container_status_restarts_total[1h])',
                    'legendFormat': '{{namespace}}/{{pod}}/{{container}}'
                }],
                'gridPos': {'h': 8, 'w': 24, 'x': 0, 'y': 8}
            },
            {
                'id': 5,
                'title': 'Network I/O',
                'type': 'graph',
                'targets': [
                    {
                        'expr': 'sum(rate(container_network_receive_bytes_total[5m])) by (pod)',
                        'legendFormat': 'Received - {{pod}}'
                    },
                    {
                        'expr': 'sum(rate(container_network_transmit_bytes_total[5m])) by (pod)',
                        'legendFormat': 'Transmitted - {{pod}}'
                    }
                ],
                'gridPos': {'h': 8, 'w': 12, 'x': 0, 'y': 16}
            },
            {
                'id': 6,
                'title': 'Disk I/O',
                'type': 'graph',
                'targets': [
                    {
                        'expr': 'sum(rate(container_fs_reads_bytes_total[5m])) by (pod)',
                        'legendFormat': 'Read - {{pod}}'
                    },
                    {
                        'expr': 'sum(rate(container_fs_writes_bytes_total[5m])) by (pod)',
                        'legendFormat': 'Write - {{pod}}'
                    }
                ],
                'gridPos': {'h': 8, 'w': 12, 'x': 12, 'y': 16}
            }
        ]
        
        dashboard_config = {
            'panels': panels,
            'tags': ['kubernetes', 'infrastructure'],
            'variables': [
                {
                    'name': 'namespace',
                    'type': 'query',
                    'query': 'label_values(kube_pod_info, namespace)',
                    'refresh': 1
                },
                {
                    'name': 'pod',
                    'type': 'query',
                    'query': 'label_values(kube_pod_info{namespace="$namespace"}, pod)',
                    'refresh': 1
                }
            ]
        }
        
        return self.create_dashboard('Kubernetes Cluster Overview', dashboard_config)
    
    def setup_default_alerts(self) -> List[AlertRule]:
        """
        Setup default Kubernetes alert rules
        """
        alert_rules = [
            AlertRule(
                name="HighCPUUsage",
                expression="100 - (avg(irate(node_cpu_seconds_total{mode='idle'}[5m])) * 100) > 80",
                severity=AlertSeverity.WARNING,
                duration="5m",
                description="High CPU usage detected",
                annotations={
                    "summary": "High CPU usage on {{ $labels.instance }}",
                    "description": "CPU usage is above 80% for more than 5 minutes"
                }
            ),
            AlertRule(
                name="HighMemoryUsage",
                expression="(1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 85",
                severity=AlertSeverity.WARNING,
                duration="5m",
                description="High memory usage detected",
                annotations={
                    "summary": "High memory usage on {{ $labels.instance }}",
                    "description": "Memory usage is above 85% for more than 5 minutes"
                }
            ),
            AlertRule(
                name="PodCrashLooping",
                expression="increase(kube_pod_container_status_restarts_total[1h]) > 5",
                severity=AlertSeverity.CRITICAL,
                duration="0m",
                description="Pod is crash looping",
                annotations={
                    "summary": "Pod {{ $labels.namespace }}/{{ $labels.pod }} is crash looping",
                    "description": "Pod has restarted more than 5 times in the last hour"
                }
            ),
            AlertRule(
                name="PodNotReady",
                expression="kube_pod_status_ready{condition='false'} == 1",
                severity=AlertSeverity.WARNING,
                duration="10m",
                description="Pod is not ready",
                annotations={
                    "summary": "Pod {{ $labels.namespace }}/{{ $labels.pod }} is not ready",
                    "description": "Pod has been in not ready state for more than 10 minutes"
                }
            ),
            AlertRule(
                name="HighDiskUsage",
                expression="(node_filesystem_size_bytes - node_filesystem_free_bytes) / node_filesystem_size_bytes * 100 > 85",
                severity=AlertSeverity.WARNING,
                duration="5m",
                description="High disk usage detected",
                annotations={
                    "summary": "High disk usage on {{ $labels.instance }}",
                    "description": "Disk usage is above 85% for more than 5 minutes"
                }
            )
        ]
        
        for rule in alert_rules:
            self.create_alert_rule(rule)
        
        return alert_rules
    
    def get_cluster_health(self) -> Dict:
        """
        Get overall cluster health metrics
        """
        health_metrics = {}
        
        # CPU Usage
        cpu_query = '100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)'
        cpu_result = self.query_prometheus(cpu_query)
        if cpu_result.get('data', {}).get('result'):
            health_metrics['cpu_usage'] = float(cpu_result['data']['result'][0]['value'][1])
        
        # Memory Usage
        memory_query = '(1 - (sum(node_memory_MemAvailable_bytes) / sum(node_memory_MemTotal_bytes))) * 100'
        memory_result = self.query_prometheus(memory_query)
        if memory_result.get('data', {}).get('result'):
            health_metrics['memory_usage'] = float(memory_result['data']['result'][0]['value'][1])
        
        # Pod Count
        pod_query = 'sum(kube_pod_info)'
        pod_result = self.query_prometheus(pod_query)
        if pod_result.get('data', {}).get('result'):
            health_metrics['total_pods'] = int(float(pod_result['data']['result'][0]['value'][1]))
        
        # Node Count
        node_query = 'sum(kube_node_info)'
        node_result = self.query_prometheus(node_query)
        if node_result.get('data', {}).get('result'):
            health_metrics['total_nodes'] = int(float(node_result['data']['result'][0]['value'][1]))
        
        # Failed Pods
        failed_query = 'sum(kube_pod_status_phase{phase="Failed"})'
        failed_result = self.query_prometheus(failed_query)
        if failed_result.get('data', {}).get('result'):
            health_metrics['failed_pods'] = int(float(failed_result['data']['result'][0]['value'][1]))
        else:
            health_metrics['failed_pods'] = 0
        
        return health_metrics
    
    def export_metrics(self) -> str:
        """
        Export metrics in Prometheus format
        """
        return generate_latest(self.metrics_registry).decode('utf-8')
    
    def simulate_application_metrics(self) -> None:
        """
        Simulate application metrics for demonstration
        """
        # Register application metrics
        request_duration = self.register_metric(MetricDefinition(
            name="http_request_duration_seconds",
            metric_type=MetricType.HISTOGRAM,
            description="HTTP request duration in seconds",
            labels=["method", "endpoint", "status_code"],
            buckets=[0.1, 0.5, 1.0, 2.5, 5.0, 10.0]
        ))
        
        request_count = self.register_metric(MetricDefinition(
            name="http_requests_total",
            metric_type=MetricType.COUNTER,
            description="Total HTTP requests",
            labels=["method", "endpoint", "status_code"]
        ))
        
        active_connections = self.register_metric(MetricDefinition(
            name="active_connections",
            metric_type=MetricType.GAUGE,
            description="Number of active connections",
            labels=["service"]
        ))
        
        # Simulate some metrics
        import random
        
        # Simulate HTTP requests
        methods = ["GET", "POST", "PUT", "DELETE"]
        endpoints = ["/api/users", "/api/orders", "/api/products", "/health"]
        status_codes = ["200", "201", "400", "404", "500"]
        
        for _ in range(100):
            method = random.choice(methods)
            endpoint = random.choice(endpoints)
            status_code = random.choice(status_codes)
            duration = random.uniform(0.1, 5.0)
            
            request_duration.labels(method=method, endpoint=endpoint, status_code=status_code).observe(duration)
            request_count.labels(method=method, endpoint=endpoint, status_code=status_code).inc()
        
        # Simulate active connections
        services = ["web-service", "api-service", "database-service"]
        for service in services:
            connections = random.randint(10, 100)
            active_connections.labels(service=service).set(connections)


# Example usage
if __name__ == "__main__":
    mm = MonitoringManager()
    
    # Setup default alerts
    alert_rules = mm.setup_default_alerts()
    print(f"Created {len(alert_rules)} alert rules")
    
    # Create Kubernetes dashboard
    dashboard = mm.generate_kubernetes_dashboard()
    print(f"Created dashboard: {dashboard['title']}")
    
    # Simulate application metrics
    mm.simulate_application_metrics()
    
    # Log some events
    log_entry = LogEntry(
        timestamp=datetime.now(),
        level=LogLevel.INFO,
        message="Application started successfully",
        service="web-app",
        namespace="production",
        pod="web-app-7d4b8c9f8-xyz123",
        container="web-app",
        labels={"version": "v1.2.3", "environment": "production"}
    )
    mm.log_event(log_entry)
    
    # Add a trace span
    trace_span = TraceSpan(
        trace_id="abc123def456",
        span_id="span789",
        parent_span_id=None,
        operation_name="http_request",
        service_name="web-app",
        start_time=datetime.now(),
        duration=timedelta(milliseconds=250),
        tags={"http.method": "GET", "http.url": "/api/users", "http.status_code": 200}
    )
    mm.add_trace_span(trace_span)
    
    # Get cluster health
    health = mm.get_cluster_health()
    print("\nCluster Health:")
    print(json.dumps(health, indent=2))
    
    # Export metrics
    metrics_output = mm.export_metrics()
    print("\nSample Metrics:")
    print(metrics_output[:500] + "..." if len(metrics_output) > 500 else metrics_output)
```

### Monitoring Best Practices

1. **Four Golden Signals**: Monitor latency, traffic, errors, and saturation
2. **Resource Monitoring**: Track CPU, memory, disk, and network usage
3. **Application Metrics**: Implement custom metrics for business logic
4. **Log Aggregation**: Centralize logs from all components
5. **Distributed Tracing**: Track requests across microservices
6. **Alerting Strategy**: Set up meaningful alerts with proper thresholds
7. **Dashboard Design**: Create clear and actionable dashboards
8. **Retention Policies**: Configure appropriate data retention
9. **Security**: Secure monitoring infrastructure and data
10. **Documentation**: Document monitoring setup and runbooks

## Q9: How do you implement security in Kubernetes clusters?
**Difficulty: Hard**

**Answer:**

Kubernetes security involves implementing multiple layers of protection including authentication, authorization, network policies, pod security, secrets management, and cluster hardening.

### Authentication and Authorization

```yaml
# Service Account with RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: production
automountServiceAccountToken: true

---
# ClusterRole for specific permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: pod-reader
rules:
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "watch", "list"]
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list"]
- apiGroups: ["apps"]
  resources: ["deployments"]
  verbs: ["get", "list", "watch"]

---
# Role for namespace-specific permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: production
  name: secret-manager
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list", "create", "update", "patch", "delete"]
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["get", "list", "create", "update", "patch"]

---
# ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: read-pods-global
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: production
- kind: User
  name: jane@example.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: pod-reader
  apiGroup: rbac.authorization.k8s.io

---
# RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: manage-secrets
  namespace: production
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: production
- kind: User
  name: admin@example.com
  apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: Role
  name: secret-manager
  apiGroup: rbac.authorization.k8s.io
```

### Pod Security Standards

```yaml
# Pod Security Policy (deprecated, use Pod Security Standards)
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted-psp
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
  seLinux:
    rule: 'RunAsAny'
  fsGroup:
    rule: 'RunAsAny'
  readOnlyRootFilesystem: true
  seccompProfile:
    type: RuntimeDefault

---
# Namespace with Pod Security Standards
apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# Secure Pod Configuration
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
  namespace: secure-namespace
  labels:
    app: secure-app
spec:
  serviceAccountName: app-service-account
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: nginx:1.20-alpine
    ports:
    - containerPort: 8080
      name: http
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1000
      capabilities:
        drop:
        - ALL
        add:
        - NET_BIND_SERVICE
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: var-cache
      mountPath: /var/cache/nginx
    - name: var-run
      mountPath: /var/run
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 8080
      initialDelaySeconds: 5
      periodSeconds: 5
  volumes:
  - name: tmp
    emptyDir: {}
  - name: var-cache
    emptyDir: {}
  - name: var-run
    emptyDir: {}
```

### Network Policies

```yaml
# Default Deny All Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

---
# Allow Frontend to Backend Communication
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080

---
# Allow Backend to Database Communication
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-backend-to-database
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Egress
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  # Allow DNS resolution
  - to: []
    ports:
    - protocol: UDP
      port: 53

---
# Allow External HTTPS Traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-external-https
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from: []
    ports:
    - protocol: TCP
      port: 443
  egress:
  # Allow HTTPS to external services
  - to: []
    ports:
    - protocol: TCP
      port: 443
  # Allow DNS resolution
  - to: []
    ports:
    - protocol: UDP
      port: 53

---
# Namespace Isolation Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: namespace-isolation
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: production
  egress:
  - to:
    - namespaceSelector:
        matchLabels:
          name: production
  # Allow DNS resolution
  - to: []
    ports:
    - protocol: UDP
      port: 53
```

### Secrets Management

```yaml
# Encrypted Secret
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
  namespace: production
  annotations:
    kubernetes.io/description: "Application secrets with encryption at rest"
type: Opaque
data:
  database-password: cGFzc3dvcmQxMjM=  # base64 encoded
  api-key: YWJjZGVmZ2hpams=  # base64 encoded
  jwt-secret: c3VwZXJzZWNyZXRrZXk=  # base64 encoded

---
# Secret mounted as volume
apiVersion: apps/v1
kind: Deployment
metadata:
  name: secure-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: secure-app
  template:
    metadata:
      labels:
        app: secure-app
    spec:
      serviceAccountName: app-service-account
      containers:
      - name: app
        image: myapp:v1.0.0
        env:
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: api-key
        volumeMounts:
        - name: jwt-secret
          mountPath: "/etc/secrets"
          readOnly: true
        securityContext:
          runAsNonRoot: true
          runAsUser: 1000
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          capabilities:
            drop:
            - ALL
      volumes:
      - name: jwt-secret
        secret:
          secretName: app-secrets
          items:
          - key: jwt-secret
            path: jwt.key
            mode: 0400

---
# External Secrets Operator Configuration
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: vault-backend
  namespace: production
spec:
  provider:
    vault:
      server: "https://vault.example.com"
      path: "secret"
      version: "v2"
      auth:
        kubernetes:
          mountPath: "kubernetes"
          role: "demo"
          serviceAccountRef:
            name: "external-secrets-sa"

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: vault-secret
  namespace: production
spec:
  refreshInterval: 15s
  secretStoreRef:
    name: vault-backend
    kind: SecretStore
  target:
    name: app-secrets-from-vault
    creationPolicy: Owner
  data:
  - secretKey: password
    remoteRef:
      key: secret/data/database
      property: password
  - secretKey: username
    remoteRef:
      key: secret/data/database
      property: username
```

### Image Security

```yaml
# Image Policy Webhook Configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: image-policy-webhook
  namespace: kube-system
data:
  policy.yaml: |
    imagePolicy:
      kubeConfigFile: /etc/kubernetes/image-policy-webhook-config
      allowTTL: 50
      denyTTL: 50
      retryBackoff: 500
      defaultAllow: false

---
# Pod with image security constraints
apiVersion: v1
kind: Pod
metadata:
  name: secure-image-pod
  namespace: production
spec:
  containers:
  - name: app
    image: registry.example.com/myapp:v1.0.0@sha256:abc123def456  # Use digest for immutability
    imagePullPolicy: Always
    securityContext:
      runAsNonRoot: true
      runAsUser: 1000
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
  imagePullSecrets:
  - name: registry-credentials

---
# Image Pull Secret
apiVersion: v1
kind: Secret
metadata:
  name: registry-credentials
  namespace: production
type: kubernetes.io/dockerconfigjson
data:
  .dockerconfigjson: eyJhdXRocyI6eyJyZWdpc3RyeS5leGFtcGxlLmNvbSI6eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6InBhc3MiLCJhdXRoIjoiZFhObGNqcHdZWE56In19fQ==
```

### Security Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Security Management System
"""

import json
import base64
import hashlib
import logging
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
import yaml
from kubernetes import client, config
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

class SecurityLevel(Enum):
    BASELINE = "baseline"
    RESTRICTED = "restricted"
    PRIVILEGED = "privileged"

class ThreatLevel(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class SecurityPolicy:
    name: str
    namespace: str
    level: SecurityLevel
    rules: List[Dict] = field(default_factory=list)
    exceptions: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)

@dataclass
class SecurityViolation:
    resource_type: str
    resource_name: str
    namespace: str
    violation_type: str
    severity: ThreatLevel
    description: str
    detected_at: datetime = field(default_factory=datetime.now)
    remediation: Optional[str] = None

@dataclass
class RBACRule:
    api_groups: List[str]
    resources: List[str]
    verbs: List[str]
    resource_names: Optional[List[str]] = None
    non_resource_urls: Optional[List[str]] = None

@dataclass
class NetworkPolicyRule:
    direction: str  # ingress or egress
    from_selectors: List[Dict] = field(default_factory=list)
    to_selectors: List[Dict] = field(default_factory=list)
    ports: List[Dict] = field(default_factory=list)

class SecurityManager:
    def __init__(self, kubeconfig_path: Optional[str] = None):
        # Initialize Kubernetes client
        if kubeconfig_path:
            config.load_kube_config(config_file=kubeconfig_path)
        else:
            try:
                config.load_incluster_config()
            except:
                config.load_kube_config()
        
        self.v1 = client.CoreV1Api()
        self.rbac_v1 = client.RbacAuthorizationV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.networking_v1 = client.NetworkingV1Api()
        
        self.security_policies: Dict[str, SecurityPolicy] = {}
        self.violations: List[SecurityViolation] = []
        self.encryption_key = self._generate_encryption_key()
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def _generate_encryption_key(self) -> Fernet:
        """
        Generate encryption key for sensitive data
        """
        password = b"kubernetes-security-manager"
        salt = b"salt_1234567890123456"  # In production, use random salt
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password))
        return Fernet(key)
    
    def create_service_account(self, name: str, namespace: str, 
                             annotations: Optional[Dict] = None) -> Dict:
        """
        Create a service account with security best practices
        """
        service_account = {
            'apiVersion': 'v1',
            'kind': 'ServiceAccount',
            'metadata': {
                'name': name,
                'namespace': namespace,
                'annotations': annotations or {}
            },
            'automountServiceAccountToken': True
        }
        
        try:
            result = self.v1.create_namespaced_service_account(
                namespace=namespace,
                body=service_account
            )
            self.logger.info(f"Created service account {name} in namespace {namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create service account: {e}")
            raise
    
    def create_rbac_role(self, name: str, namespace: str, 
                        rules: List[RBACRule]) -> Dict:
        """
        Create RBAC role with specified rules
        """
        role_rules = []
        for rule in rules:
            role_rule = {
                'apiGroups': rule.api_groups,
                'resources': rule.resources,
                'verbs': rule.verbs
            }
            if rule.resource_names:
                role_rule['resourceNames'] = rule.resource_names
            if rule.non_resource_urls:
                role_rule['nonResourceURLs'] = rule.non_resource_urls
            
            role_rules.append(role_rule)
        
        role = {
            'apiVersion': 'rbac.authorization.k8s.io/v1',
            'kind': 'Role',
            'metadata': {
                'name': name,
                'namespace': namespace
            },
            'rules': role_rules
        }
        
        try:
            result = self.rbac_v1.create_namespaced_role(
                namespace=namespace,
                body=role
            )
            self.logger.info(f"Created role {name} in namespace {namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create role: {e}")
            raise
    
    def create_role_binding(self, name: str, namespace: str, 
                           role_name: str, subjects: List[Dict]) -> Dict:
        """
        Create role binding
        """
        role_binding = {
            'apiVersion': 'rbac.authorization.k8s.io/v1',
            'kind': 'RoleBinding',
            'metadata': {
                'name': name,
                'namespace': namespace
            },
            'subjects': subjects,
            'roleRef': {
                'kind': 'Role',
                'name': role_name,
                'apiGroup': 'rbac.authorization.k8s.io'
            }
        }
        
        try:
            result = self.rbac_v1.create_namespaced_role_binding(
                namespace=namespace,
                body=role_binding
            )
            self.logger.info(f"Created role binding {name} in namespace {namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create role binding: {e}")
            raise
    
    def create_network_policy(self, name: str, namespace: str, 
                             pod_selector: Dict, rules: List[NetworkPolicyRule]) -> Dict:
        """
        Create network policy
        """
        policy_types = []
        ingress_rules = []
        egress_rules = []
        
        for rule in rules:
            if rule.direction == 'ingress':
                policy_types.append('Ingress')
                ingress_rule = {}
                if rule.from_selectors:
                    ingress_rule['from'] = rule.from_selectors
                if rule.ports:
                    ingress_rule['ports'] = rule.ports
                ingress_rules.append(ingress_rule)
            
            elif rule.direction == 'egress':
                policy_types.append('Egress')
                egress_rule = {}
                if rule.to_selectors:
                    egress_rule['to'] = rule.to_selectors
                if rule.ports:
                    egress_rule['ports'] = rule.ports
                egress_rules.append(egress_rule)
        
        network_policy = {
            'apiVersion': 'networking.k8s.io/v1',
            'kind': 'NetworkPolicy',
            'metadata': {
                'name': name,
                'namespace': namespace
            },
            'spec': {
                'podSelector': pod_selector,
                'policyTypes': list(set(policy_types))
            }
        }
        
        if ingress_rules:
            network_policy['spec']['ingress'] = ingress_rules
        if egress_rules:
            network_policy['spec']['egress'] = egress_rules
        
        try:
            result = self.networking_v1.create_namespaced_network_policy(
                namespace=namespace,
                body=network_policy
            )
            self.logger.info(f"Created network policy {name} in namespace {namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create network policy: {e}")
            raise
    
    def create_secure_secret(self, name: str, namespace: str, 
                           data: Dict[str, str], secret_type: str = 'Opaque') -> Dict:
        """
        Create encrypted secret
        """
        # Encrypt sensitive data
        encrypted_data = {}
        for key, value in data.items():
            encrypted_value = self.encryption_key.encrypt(value.encode())
            encrypted_data[key] = base64.b64encode(encrypted_value).decode()
        
        secret = {
            'apiVersion': 'v1',
            'kind': 'Secret',
            'metadata': {
                'name': name,
                'namespace': namespace,
                'annotations': {
                    'kubernetes.io/description': 'Encrypted secret managed by SecurityManager'
                }
            },
            'type': secret_type,
            'data': encrypted_data
        }
        
        try:
            result = self.v1.create_namespaced_secret(
                namespace=namespace,
                body=secret
            )
            self.logger.info(f"Created encrypted secret {name} in namespace {namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create secret: {e}")
            raise
    
    def scan_pod_security(self, namespace: str = None) -> List[SecurityViolation]:
        """
        Scan pods for security violations
        """
        violations = []
        
        try:
            if namespace:
                pods = self.v1.list_namespaced_pod(namespace=namespace)
            else:
                pods = self.v1.list_pod_for_all_namespaces()
            
            for pod in pods.items:
                pod_violations = self._check_pod_security(pod)
                violations.extend(pod_violations)
        
        except Exception as e:
            self.logger.error(f"Failed to scan pod security: {e}")
        
        self.violations.extend(violations)
        return violations
    
    def _check_pod_security(self, pod) -> List[SecurityViolation]:
        """
        Check individual pod for security violations
        """
        violations = []
        pod_name = pod.metadata.name
        namespace = pod.metadata.namespace
        
        # Check if running as root
        if pod.spec.security_context:
            if (pod.spec.security_context.run_as_user == 0 or 
                not pod.spec.security_context.run_as_non_root):
                violations.append(SecurityViolation(
                    resource_type="Pod",
                    resource_name=pod_name,
                    namespace=namespace,
                    violation_type="RunAsRoot",
                    severity=ThreatLevel.HIGH,
                    description="Pod is running as root user",
                    remediation="Set runAsNonRoot: true and runAsUser to non-zero value"
                ))
        
        # Check containers
        for container in pod.spec.containers:
            # Check privileged containers
            if (container.security_context and 
                container.security_context.privileged):
                violations.append(SecurityViolation(
                    resource_type="Container",
                    resource_name=f"{pod_name}/{container.name}",
                    namespace=namespace,
                    violation_type="PrivilegedContainer",
                    severity=ThreatLevel.CRITICAL,
                    description="Container is running in privileged mode",
                    remediation="Remove privileged: true from container security context"
                ))
            
            # Check for allowPrivilegeEscalation
            if (container.security_context and 
                container.security_context.allow_privilege_escalation):
                violations.append(SecurityViolation(
                    resource_type="Container",
                    resource_name=f"{pod_name}/{container.name}",
                    namespace=namespace,
                    violation_type="PrivilegeEscalation",
                    severity=ThreatLevel.HIGH,
                    description="Container allows privilege escalation",
                    remediation="Set allowPrivilegeEscalation: false"
                ))
            
            # Check for readOnlyRootFilesystem
            if (not container.security_context or 
                not container.security_context.read_only_root_filesystem):
                violations.append(SecurityViolation(
                    resource_type="Container",
                    resource_name=f"{pod_name}/{container.name}",
                    namespace=namespace,
                    violation_type="WritableRootFilesystem",
                    severity=ThreatLevel.MEDIUM,
                    description="Container root filesystem is writable",
                    remediation="Set readOnlyRootFilesystem: true"
                ))
            
            # Check resource limits
            if not container.resources or not container.resources.limits:
                violations.append(SecurityViolation(
                    resource_type="Container",
                    resource_name=f"{pod_name}/{container.name}",
                    namespace=namespace,
                    violation_type="NoResourceLimits",
                    severity=ThreatLevel.MEDIUM,
                    description="Container has no resource limits",
                    remediation="Set CPU and memory limits"
                ))
        
        return violations
    
    def generate_security_report(self) -> Dict:
        """
        Generate comprehensive security report
        """
        # Scan for violations
        violations = self.scan_pod_security()
        
        # Categorize violations by severity
        severity_counts = {level.value: 0 for level in ThreatLevel}
        for violation in violations:
            severity_counts[violation.severity.value] += 1
        
        # Get cluster info
        try:
            nodes = self.v1.list_node()
            namespaces = self.v1.list_namespace()
            
            cluster_info = {
                'total_nodes': len(nodes.items),
                'total_namespaces': len(namespaces.items),
                'kubernetes_version': nodes.items[0].status.node_info.kube_proxy_version if nodes.items else 'Unknown'
            }
        except Exception as e:
            self.logger.error(f"Failed to get cluster info: {e}")
            cluster_info = {}
        
        report = {
            'generated_at': datetime.now().isoformat(),
            'cluster_info': cluster_info,
            'security_summary': {
                'total_violations': len(violations),
                'severity_breakdown': severity_counts,
                'security_score': self._calculate_security_score(violations)
            },
            'violations': [
                {
                    'resource_type': v.resource_type,
                    'resource_name': v.resource_name,
                    'namespace': v.namespace,
                    'violation_type': v.violation_type,
                    'severity': v.severity.value,
                    'description': v.description,
                    'remediation': v.remediation,
                    'detected_at': v.detected_at.isoformat()
                }
                for v in violations
            ],
            'recommendations': self._generate_recommendations(violations)
        }
        
        return report
    
    def _calculate_security_score(self, violations: List[SecurityViolation]) -> int:
        """
        Calculate security score based on violations
        """
        if not violations:
            return 100
        
        penalty_weights = {
            ThreatLevel.CRITICAL: 25,
            ThreatLevel.HIGH: 15,
            ThreatLevel.MEDIUM: 8,
            ThreatLevel.LOW: 3
        }
        
        total_penalty = sum(penalty_weights.get(v.severity, 0) for v in violations)
        score = max(0, 100 - total_penalty)
        
        return score
    
    def _generate_recommendations(self, violations: List[SecurityViolation]) -> List[str]:
        """
        Generate security recommendations based on violations
        """
        recommendations = []
        
        violation_types = set(v.violation_type for v in violations)
        
        if 'RunAsRoot' in violation_types:
            recommendations.append(
                "Implement Pod Security Standards to enforce non-root containers"
            )
        
        if 'PrivilegedContainer' in violation_types:
            recommendations.append(
                "Use Pod Security Policies or Admission Controllers to prevent privileged containers"
            )
        
        if 'NoResourceLimits' in violation_types:
            recommendations.append(
                "Implement LimitRanges and ResourceQuotas to enforce resource limits"
            )
        
        if 'WritableRootFilesystem' in violation_types:
            recommendations.append(
                "Enable read-only root filesystem for all containers"
            )
        
        # General recommendations
        recommendations.extend([
            "Implement network policies to restrict pod-to-pod communication",
            "Use RBAC to implement least privilege access",
            "Enable audit logging for security monitoring",
            "Regularly scan container images for vulnerabilities",
            "Implement secrets management with encryption at rest",
            "Use service mesh for mTLS between services"
        ])
        
        return recommendations
    
    def apply_security_baseline(self, namespace: str) -> Dict:
        """
        Apply security baseline to a namespace
        """
        results = {}
        
        try:
            # Create default deny network policy
            deny_all_rule = NetworkPolicyRule(
                direction='ingress',
                from_selectors=[],
                ports=[]
            )
            
            deny_all_egress_rule = NetworkPolicyRule(
                direction='egress',
                to_selectors=[],
                ports=[]
            )
            
            results['network_policy'] = self.create_network_policy(
                name='default-deny-all',
                namespace=namespace,
                pod_selector={},
                rules=[deny_all_rule, deny_all_egress_rule]
            )
            
            # Create restricted service account
            results['service_account'] = self.create_service_account(
                name='restricted-sa',
                namespace=namespace,
                annotations={
                    'kubernetes.io/description': 'Restricted service account for security baseline'
                }
            )
            
            # Create minimal RBAC role
            minimal_rules = [
                RBACRule(
                    api_groups=[''],
                    resources=['configmaps'],
                    verbs=['get', 'list']
                )
            ]
            
            results['rbac_role'] = self.create_rbac_role(
                name='minimal-role',
                namespace=namespace,
                rules=minimal_rules
            )
            
            # Bind role to service account
            subjects = [{
                'kind': 'ServiceAccount',
                'name': 'restricted-sa',
                'namespace': namespace
            }]
            
            results['role_binding'] = self.create_role_binding(
                name='minimal-role-binding',
                namespace=namespace,
                role_name='minimal-role',
                subjects=subjects
            )
            
            self.logger.info(f"Applied security baseline to namespace {namespace}")
            
        except Exception as e:
            self.logger.error(f"Failed to apply security baseline: {e}")
            results['error'] = str(e)
        
        return results


# Example usage
if __name__ == "__main__":
    sm = SecurityManager()
    
    # Apply security baseline to a namespace
    baseline_results = sm.apply_security_baseline('production')
    print("Security baseline applied:")
    print(json.dumps(baseline_results, indent=2, default=str))
    
    # Generate security report
    report = sm.generate_security_report()
    print("\nSecurity Report:")
    print(json.dumps(report, indent=2, default=str))
    
    # Create a secure secret
    secret_data = {
        'database-password': 'super-secret-password',
        'api-key': 'api-key-12345'
    }
    
    secret_result = sm.create_secure_secret(
        name='app-secrets',
        namespace='production',
        data=secret_data
    )
    print("\nSecure secret created:")
    print(json.dumps(secret_result, indent=2, default=str))
```

### Security Best Practices

1. **Principle of Least Privilege**: Grant minimal necessary permissions
2. **Defense in Depth**: Implement multiple security layers
3. **Pod Security Standards**: Use restricted security contexts
4. **Network Segmentation**: Implement network policies
5. **Secrets Management**: Encrypt secrets at rest and in transit
6. **Image Security**: Scan images and use trusted registries
7. **RBAC**: Implement fine-grained access controls
8. **Audit Logging**: Enable comprehensive audit trails
9. **Regular Updates**: Keep Kubernetes and components updated
10. **Security Monitoring**: Implement continuous security monitoring

## Q10: How do you implement autoscaling in Kubernetes?
**Difficulty: Medium**

**Answer:**

Kubernetes autoscaling involves automatically adjusting the number of pods or nodes based on resource utilization or custom metrics. There are three main types: Horizontal Pod Autoscaler (HPA), Vertical Pod Autoscaler (VPA), and Cluster Autoscaler.

### Horizontal Pod Autoscaler (HPA)

```yaml
# Deployment for HPA
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.20
        ports:
        - containerPort: 80
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /
            port: 80
          initialDelaySeconds: 5
          periodSeconds: 5

---
# Basic HPA with CPU metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
      - type: Pods
        value: 2
        periodSeconds: 60
      selectPolicy: Min
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
      - type: Pods
        value: 4
        periodSeconds: 60
      selectPolicy: Max

---
# Advanced HPA with custom metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: advanced-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 50
  metrics:
  # CPU utilization
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 60
  # Memory utilization
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 70
  # Custom metric: requests per second
  - type: Pods
    pods:
      metric:
        name: http_requests_per_second
      target:
        type: AverageValue
        averageValue: "100"
  # External metric: SQS queue length
  - type: External
    external:
      metric:
        name: sqs_queue_length
        selector:
          matchLabels:
            queue: "work-queue"
      target:
        type: Value
        value: "10"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 25
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
      - type: Pods
        value: 5
        periodSeconds: 15
      selectPolicy: Max
```

### Vertical Pod Autoscaler (VPA)

```yaml
# VPA Configuration
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-app-vpa
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  updatePolicy:
    updateMode: "Auto"  # Auto, Recreate, Initial, Off
  resourcePolicy:
    containerPolicies:
    - containerName: web
      minAllowed:
        cpu: 50m
        memory: 64Mi
      maxAllowed:
        cpu: 2
        memory: 2Gi
      controlledResources: ["cpu", "memory"]
      controlledValues: RequestsAndLimits

---
# VPA with recommendation mode
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-app-vpa-recommend
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  updatePolicy:
    updateMode: "Off"  # Only provide recommendations
  resourcePolicy:
    containerPolicies:
    - containerName: web
      minAllowed:
        cpu: 50m
        memory: 64Mi
      maxAllowed:
        cpu: 4
        memory: 4Gi
      controlledResources: ["cpu", "memory"]

---
# Multi-container VPA
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: multi-container-vpa
  namespace: production
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: multi-container-app
  updatePolicy:
    updateMode: "Auto"
  resourcePolicy:
    containerPolicies:
    - containerName: web
      minAllowed:
        cpu: 100m
        memory: 128Mi
      maxAllowed:
        cpu: 2
        memory: 2Gi
      controlledResources: ["cpu", "memory"]
    - containerName: sidecar
      minAllowed:
        cpu: 50m
        memory: 64Mi
      maxAllowed:
        cpu: 500m
        memory: 512Mi
      controlledResources: ["cpu", "memory"]
```

### Cluster Autoscaler

```yaml
# Cluster Autoscaler Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
  labels:
    app: cluster-autoscaler
spec:
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
      annotations:
        prometheus.io/scrape: 'true'
        prometheus.io/port: '8085'
    spec:
      serviceAccountName: cluster-autoscaler
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
        name: cluster-autoscaler
        resources:
          limits:
            cpu: 100m
            memory: 300Mi
          requests:
            cpu: 100m
            memory: 300Mi
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/kubernetes-cluster-name
        - --balance-similar-node-groups
        - --scale-down-enabled=true
        - --scale-down-delay-after-add=10m
        - --scale-down-unneeded-time=10m
        - --scale-down-utilization-threshold=0.5
        - --skip-nodes-with-system-pods=false
        volumeMounts:
        - name: ssl-certs
          mountPath: /etc/ssl/certs/ca-certificates.crt
          readOnly: true
        imagePullPolicy: "Always"
      volumes:
      - name: ssl-certs
        hostPath:
          path: "/etc/ssl/certs/ca-bundle.crt"

---
# Cluster Autoscaler RBAC
apiVersion: v1
kind: ServiceAccount
metadata:
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
  name: cluster-autoscaler
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
rules:
- apiGroups: [""]
  resources: ["events", "endpoints"]
  verbs: ["create", "patch"]
- apiGroups: [""]
  resources: ["pods/eviction"]
  verbs: ["create"]
- apiGroups: [""]
  resources: ["pods/status"]
  verbs: ["update"]
- apiGroups: [""]
  resources: ["endpoints"]
  resourceNames: ["cluster-autoscaler"]
  verbs: ["get", "update"]
- apiGroups: [""]
  resources: ["nodes"]
  verbs: ["watch", "list", "get", "update"]
- apiGroups: [""]
  resources: ["pods", "services", "replicationcontrollers", "persistentvolumeclaims", "persistentvolumes"]
  verbs: ["watch", "list", "get"]
- apiGroups: ["extensions"]
  resources: ["replicasets", "daemonsets"]
  verbs: ["watch", "list", "get"]
- apiGroups: ["policy"]
  resources: ["poddisruptionbudgets"]
  verbs: ["watch", "list"]
- apiGroups: ["apps"]
  resources: ["statefulsets", "replicasets", "daemonsets"]
  verbs: ["watch", "list", "get"]
- apiGroups: ["storage.k8s.io"]
  resources: ["storageclasses", "csinodes"]
  verbs: ["watch", "list", "get"]
- apiGroups: ["batch", "extensions"]
  resources: ["jobs"]
  verbs: ["get", "list", "watch", "patch"]
- apiGroups: ["coordination.k8s.io"]
  resources: ["leases"]
  verbs: ["create"]
- apiGroups: ["coordination.k8s.io"]
  resourceNames: ["cluster-autoscaler"]
  resources: ["leases"]
  verbs: ["get", "update"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cluster-autoscaler
  labels:
    k8s-addon: cluster-autoscaler.addons.k8s.io
    k8s-app: cluster-autoscaler
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-autoscaler
subjects:
- kind: ServiceAccount
  name: cluster-autoscaler
  namespace: kube-system

---
# Node Group Configuration (AWS)
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-autoscaler-status
  namespace: kube-system
data:
  nodes.max: "100"
  nodes.min: "3"
  scale-down-delay-after-add: "10m"
  scale-down-unneeded-time: "10m"
  scale-down-utilization-threshold: "0.5"
```

### Custom Metrics and KEDA

```yaml
# KEDA ScaledObject for advanced autoscaling
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: redis-scaledobject
  namespace: production
spec:
  scaleTargetRef:
    name: redis-consumer
  pollingInterval: 30
  cooldownPeriod: 300
  idleReplicaCount: 0
  minReplicaCount: 1
  maxReplicaCount: 20
  triggers:
  - type: redis
    metadata:
      address: redis-service:6379
      listName: work-queue
      listLength: '5'
      enableTLS: 'false'

---
# KEDA ScaledObject for Prometheus metrics
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: prometheus-scaledobject
  namespace: production
spec:
  scaleTargetRef:
    name: web-app
  pollingInterval: 30
  triggers:
  - type: prometheus
    metadata:
      serverAddress: http://prometheus-server:80
      metricName: http_requests_per_second
      threshold: '100'
      query: sum(rate(http_requests_total[2m]))

---
# KEDA ScaledObject for Kafka
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: kafka-scaledobject
  namespace: production
spec:
  scaleTargetRef:
    name: kafka-consumer
  triggers:
  - type: kafka
    metadata:
      bootstrapServers: kafka-broker:9092
      consumerGroup: my-group
      topic: events
      lagThreshold: '50'

---
# KEDA ScaledObject for AWS SQS
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: aws-sqs-scaledobject
  namespace: production
spec:
  scaleTargetRef:
    name: sqs-consumer
  triggers:
  - type: aws-sqs-queue
    authenticationRef:
      name: keda-aws-credentials
    metadata:
      queueURL: https://sqs.us-east-1.amazonaws.com/123456789/my-queue
      queueLength: '5'
      awsRegion: "us-east-1"

---
# KEDA Authentication for AWS
apiVersion: keda.sh/v1alpha1
kind: TriggerAuthentication
metadata:
  name: keda-aws-credentials
  namespace: production
spec:
  secretTargetRef:
  - parameter: awsAccessKeyID
    name: aws-secrets
    key: AWS_ACCESS_KEY_ID
  - parameter: awsSecretAccessKey
    name: aws-secrets
    key: AWS_SECRET_ACCESS_KEY
```

### Autoscaling Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Autoscaling Management System
"""

import json
import time
import logging
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
import yaml
from kubernetes import client, config
import requests
from prometheus_client.parser import text_string_to_metric_families

class AutoscalerType(Enum):
    HPA = "hpa"
    VPA = "vpa"
    CLUSTER = "cluster"
    KEDA = "keda"

class ScalingDirection(Enum):
    UP = "up"
    DOWN = "down"
    STABLE = "stable"

@dataclass
class ScalingMetric:
    name: str
    current_value: float
    target_value: float
    metric_type: str  # Resource, Pods, Object, External
    threshold_percentage: Optional[float] = None

@dataclass
class ScalingEvent:
    timestamp: datetime
    autoscaler_name: str
    autoscaler_type: AutoscalerType
    direction: ScalingDirection
    old_replicas: int
    new_replicas: int
    reason: str
    metrics: List[ScalingMetric] = field(default_factory=list)

@dataclass
class AutoscalerConfig:
    name: str
    namespace: str
    target_ref: Dict[str, str]
    min_replicas: int
    max_replicas: int
    metrics: List[Dict] = field(default_factory=list)
    behavior: Optional[Dict] = None
    autoscaler_type: AutoscalerType = AutoscalerType.HPA

class AutoscalingManager:
    def __init__(self, kubeconfig_path: Optional[str] = None):
        # Initialize Kubernetes client
        if kubeconfig_path:
            config.load_kube_config(config_file=kubeconfig_path)
        else:
            try:
                config.load_incluster_config()
            except:
                config.load_kube_config()
        
        self.v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.autoscaling_v2 = client.AutoscalingV2Api()
        self.custom_objects = client.CustomObjectsApi()
        
        self.scaling_events: List[ScalingEvent] = []
        self.autoscalers: Dict[str, AutoscalerConfig] = {}
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def create_hpa(self, config: AutoscalerConfig) -> Dict:
        """
        Create Horizontal Pod Autoscaler
        """
        hpa_spec = {
            'scaleTargetRef': {
                'apiVersion': config.target_ref.get('apiVersion', 'apps/v1'),
                'kind': config.target_ref.get('kind', 'Deployment'),
                'name': config.target_ref['name']
            },
            'minReplicas': config.min_replicas,
            'maxReplicas': config.max_replicas,
            'metrics': config.metrics
        }
        
        if config.behavior:
            hpa_spec['behavior'] = config.behavior
        
        hpa = {
            'apiVersion': 'autoscaling/v2',
            'kind': 'HorizontalPodAutoscaler',
            'metadata': {
                'name': config.name,
                'namespace': config.namespace
            },
            'spec': hpa_spec
        }
        
        try:
            result = self.autoscaling_v2.create_namespaced_horizontal_pod_autoscaler(
                namespace=config.namespace,
                body=hpa
            )
            self.autoscalers[f"{config.namespace}/{config.name}"] = config
            self.logger.info(f"Created HPA {config.name} in namespace {config.namespace}")
            return result.to_dict()
        except Exception as e:
            self.logger.error(f"Failed to create HPA: {e}")
            raise
    
    def create_vpa(self, config: AutoscalerConfig, 
                   update_mode: str = "Auto",
                   resource_policy: Optional[Dict] = None) -> Dict:
        """
        Create Vertical Pod Autoscaler
        """
        vpa_spec = {
            'targetRef': {
                'apiVersion': config.target_ref.get('apiVersion', 'apps/v1'),
                'kind': config.target_ref.get('kind', 'Deployment'),
                'name': config.target_ref['name']
            },
            'updatePolicy': {
                'updateMode': update_mode
            }
        }
        
        if resource_policy:
            vpa_spec['resourcePolicy'] = resource_policy
        
        vpa = {
            'apiVersion': 'autoscaling.k8s.io/v1',
            'kind': 'VerticalPodAutoscaler',
            'metadata': {
                'name': config.name,
                'namespace': config.namespace
            },
            'spec': vpa_spec
        }
        
        try:
            result = self.custom_objects.create_namespaced_custom_object(
                group="autoscaling.k8s.io",
                version="v1",
                namespace=config.namespace,
                plural="verticalpodautoscalers",
                body=vpa
            )
            config.autoscaler_type = AutoscalerType.VPA
            self.autoscalers[f"{config.namespace}/{config.name}"] = config
            self.logger.info(f"Created VPA {config.name} in namespace {config.namespace}")
            return result
        except Exception as e:
            self.logger.error(f"Failed to create VPA: {e}")
            raise
    
    def create_keda_scaledobject(self, config: AutoscalerConfig, 
                                triggers: List[Dict],
                                polling_interval: int = 30,
                                cooldown_period: int = 300,
                                idle_replica_count: int = 0) -> Dict:
        """
        Create KEDA ScaledObject
        """
        scaled_object = {
            'apiVersion': 'keda.sh/v1alpha1',
            'kind': 'ScaledObject',
            'metadata': {
                'name': config.name,
                'namespace': config.namespace
            },
            'spec': {
                'scaleTargetRef': {
                    'name': config.target_ref['name']
                },
                'pollingInterval': polling_interval,
                'cooldownPeriod': cooldown_period,
                'idleReplicaCount': idle_replica_count,
                'minReplicaCount': config.min_replicas,
                'maxReplicaCount': config.max_replicas,
                'triggers': triggers
            }
        }
        
        try:
            result = self.custom_objects.create_namespaced_custom_object(
                group="keda.sh",
                version="v1alpha1",
                namespace=config.namespace,
                plural="scaledobjects",
                body=scaled_object
            )
            config.autoscaler_type = AutoscalerType.KEDA
            self.autoscalers[f"{config.namespace}/{config.name}"] = config
            self.logger.info(f"Created KEDA ScaledObject {config.name} in namespace {config.namespace}")
            return result
        except Exception as e:
            self.logger.error(f"Failed to create KEDA ScaledObject: {e}")
            raise
    
    def get_hpa_status(self, name: str, namespace: str) -> Dict:
        """
        Get HPA status and metrics
        """
        try:
            hpa = self.autoscaling_v2.read_namespaced_horizontal_pod_autoscaler(
                name=name,
                namespace=namespace
            )
            
            status = {
                'name': hpa.metadata.name,
                'namespace': hpa.metadata.namespace,
                'current_replicas': hpa.status.current_replicas,
                'desired_replicas': hpa.status.desired_replicas,
                'min_replicas': hpa.spec.min_replicas,
                'max_replicas': hpa.spec.max_replicas,
                'target_ref': hpa.spec.scale_target_ref.to_dict(),
                'current_metrics': [],
                'conditions': []
            }
            
            if hpa.status.current_metrics:
                for metric in hpa.status.current_metrics:
                    status['current_metrics'].append(metric.to_dict())
            
            if hpa.status.conditions:
                for condition in hpa.status.conditions:
                    status['conditions'].append(condition.to_dict())
            
            return status
        except Exception as e:
            self.logger.error(f"Failed to get HPA status: {e}")
            raise
    
    def get_vpa_recommendations(self, name: str, namespace: str) -> Dict:
        """
        Get VPA recommendations
        """
        try:
            vpa = self.custom_objects.get_namespaced_custom_object(
                group="autoscaling.k8s.io",
                version="v1",
                namespace=namespace,
                plural="verticalpodautoscalers",
                name=name
            )
            
            recommendations = {
                'name': vpa['metadata']['name'],
                'namespace': vpa['metadata']['namespace'],
                'target_ref': vpa['spec']['targetRef'],
                'update_mode': vpa['spec']['updatePolicy']['updateMode'],
                'recommendations': {}
            }
            
            if 'status' in vpa and 'recommendation' in vpa['status']:
                recommendations['recommendations'] = vpa['status']['recommendation']
            
            return recommendations
        except Exception as e:
            self.logger.error(f"Failed to get VPA recommendations: {e}")
            raise
    
    def monitor_scaling_events(self, namespace: str = None, 
                             duration_minutes: int = 60) -> List[ScalingEvent]:
        """
        Monitor scaling events for a specified duration
        """
        events = []
        start_time = datetime.now()
        end_time = start_time + timedelta(minutes=duration_minutes)
        
        self.logger.info(f"Monitoring scaling events for {duration_minutes} minutes")
        
        while datetime.now() < end_time:
            try:
                # Monitor HPA events
                hpa_events = self._get_hpa_events(namespace)
                events.extend(hpa_events)
                
                # Monitor VPA events
                vpa_events = self._get_vpa_events(namespace)
                events.extend(vpa_events)
                
                # Monitor KEDA events
                keda_events = self._get_keda_events(namespace)
                events.extend(keda_events)
                
                time.sleep(30)  # Check every 30 seconds
                
            except Exception as e:
                self.logger.error(f"Error monitoring scaling events: {e}")
                time.sleep(30)
        
        self.scaling_events.extend(events)
        return events
    
    def _get_hpa_events(self, namespace: str = None) -> List[ScalingEvent]:
        """
        Get HPA scaling events
        """
        events = []
        
        try:
            if namespace:
                hpas = self.autoscaling_v2.list_namespaced_horizontal_pod_autoscaler(
                    namespace=namespace
                )
            else:
                hpas = self.autoscaling_v2.list_horizontal_pod_autoscaler_for_all_namespaces()
            
            for hpa in hpas.items:
                if hpa.status.conditions:
                    for condition in hpa.status.conditions:
                        if condition.type == "ScalingActive" and condition.status == "True":
                            # Determine scaling direction
                            current = hpa.status.current_replicas or 0
                            desired = hpa.status.desired_replicas or 0
                            
                            if desired > current:
                                direction = ScalingDirection.UP
                            elif desired < current:
                                direction = ScalingDirection.DOWN
                            else:
                                direction = ScalingDirection.STABLE
                            
                            # Extract metrics
                            metrics = []
                            if hpa.status.current_metrics:
                                for metric in hpa.status.current_metrics:
                                    if metric.resource:
                                        metrics.append(ScalingMetric(
                                            name=metric.resource.name,
                                            current_value=float(metric.resource.current.average_utilization or 0),
                                            target_value=float(hpa.spec.metrics[0].resource.target.average_utilization or 0),
                                            metric_type="Resource"
                                        ))
                            
                            event = ScalingEvent(
                                timestamp=datetime.now(),
                                autoscaler_name=hpa.metadata.name,
                                autoscaler_type=AutoscalerType.HPA,
                                direction=direction,
                                old_replicas=current,
                                new_replicas=desired,
                                reason=condition.reason or "Unknown",
                                metrics=metrics
                            )
                            events.append(event)
        
        except Exception as e:
            self.logger.error(f"Failed to get HPA events: {e}")
        
        return events
    
    def _get_vpa_events(self, namespace: str = None) -> List[ScalingEvent]:
        """
        Get VPA scaling events
        """
        events = []
        
        try:
            if namespace:
                vpa_list = self.custom_objects.list_namespaced_custom_object(
                    group="autoscaling.k8s.io",
                    version="v1",
                    namespace=namespace,
                    plural="verticalpodautoscalers"
                )
            else:
                vpa_list = self.custom_objects.list_cluster_custom_object(
                    group="autoscaling.k8s.io",
                    version="v1",
                    plural="verticalpodautoscalers"
                )
            
            for vpa in vpa_list['items']:
                if 'status' in vpa and 'conditions' in vpa['status']:
                    for condition in vpa['status']['conditions']:
                        if condition['type'] == 'RecommendationProvided':
                            event = ScalingEvent(
                                timestamp=datetime.now(),
                                autoscaler_name=vpa['metadata']['name'],
                                autoscaler_type=AutoscalerType.VPA,
                                direction=ScalingDirection.STABLE,  # VPA doesn't scale replicas
                                old_replicas=0,
                                new_replicas=0,
                                reason="Resource recommendation updated"
                            )
                            events.append(event)
        
        except Exception as e:
            self.logger.error(f"Failed to get VPA events: {e}")
        
        return events
    
    def _get_keda_events(self, namespace: str = None) -> List[ScalingEvent]:
        """
        Get KEDA scaling events
        """
        events = []
        
        try:
            if namespace:
                keda_list = self.custom_objects.list_namespaced_custom_object(
                    group="keda.sh",
                    version="v1alpha1",
                    namespace=namespace,
                    plural="scaledobjects"
                )
            else:
                keda_list = self.custom_objects.list_cluster_custom_object(
                    group="keda.sh",
                    version="v1alpha1",
                    plural="scaledobjects"
                )
            
            for scaled_object in keda_list['items']:
                if 'status' in scaled_object and 'conditions' in scaled_object['status']:
                    for condition in scaled_object['status']['conditions']:
                        if condition['type'] == 'Ready' and condition['status'] == 'True':
                            event = ScalingEvent(
                                timestamp=datetime.now(),
                                autoscaler_name=scaled_object['metadata']['name'],
                                autoscaler_type=AutoscalerType.KEDA,
                                direction=ScalingDirection.STABLE,
                                old_replicas=0,
                                new_replicas=0,
                                reason="KEDA scaling active"
                            )
                            events.append(event)
        
        except Exception as e:
            self.logger.error(f"Failed to get KEDA events: {e}")
        
        return events
    
    def generate_autoscaling_report(self, namespace: str = None) -> Dict:
        """
        Generate comprehensive autoscaling report
        """
        report = {
            'generated_at': datetime.now().isoformat(),
            'namespace': namespace or 'all',
            'autoscalers': {
                'hpa': [],
                'vpa': [],
                'keda': []
            },
            'scaling_events': [],
            'recommendations': []
        }
        
        try:
            # Get HPA status
            if namespace:
                hpas = self.autoscaling_v2.list_namespaced_horizontal_pod_autoscaler(
                    namespace=namespace
                )
            else:
                hpas = self.autoscaling_v2.list_horizontal_pod_autoscaler_for_all_namespaces()
            
            for hpa in hpas.items:
                hpa_status = self.get_hpa_status(hpa.metadata.name, hpa.metadata.namespace)
                report['autoscalers']['hpa'].append(hpa_status)
            
            # Get VPA recommendations
            try:
                if namespace:
                    vpa_list = self.custom_objects.list_namespaced_custom_object(
                        group="autoscaling.k8s.io",
                        version="v1",
                        namespace=namespace,
                        plural="verticalpodautoscalers"
                    )
                else:
                    vpa_list = self.custom_objects.list_cluster_custom_object(
                        group="autoscaling.k8s.io",
                        version="v1",
                        plural="verticalpodautoscalers"
                    )
                
                for vpa in vpa_list['items']:
                    vpa_rec = self.get_vpa_recommendations(
                        vpa['metadata']['name'], 
                        vpa['metadata']['namespace']
                    )
                    report['autoscalers']['vpa'].append(vpa_rec)
            except Exception as e:
                self.logger.warning(f"VPA not available: {e}")
            
            # Get KEDA ScaledObjects
            try:
                if namespace:
                    keda_list = self.custom_objects.list_namespaced_custom_object(
                        group="keda.sh",
                        version="v1alpha1",
                        namespace=namespace,
                        plural="scaledobjects"
                    )
                else:
                    keda_list = self.custom_objects.list_cluster_custom_object(
                        group="keda.sh",
                        version="v1alpha1",
                        plural="scaledobjects"
                    )
                
                for scaled_object in keda_list['items']:
                    report['autoscalers']['keda'].append({
                        'name': scaled_object['metadata']['name'],
                        'namespace': scaled_object['metadata']['namespace'],
                        'target_ref': scaled_object['spec']['scaleTargetRef'],
                        'triggers': scaled_object['spec']['triggers'],
                        'min_replicas': scaled_object['spec'].get('minReplicaCount', 0),
                        'max_replicas': scaled_object['spec'].get('maxReplicaCount', 100)
                    })
            except Exception as e:
                self.logger.warning(f"KEDA not available: {e}")
            
            # Add recent scaling events
            report['scaling_events'] = [
                {
                    'timestamp': event.timestamp.isoformat(),
                    'autoscaler_name': event.autoscaler_name,
                    'autoscaler_type': event.autoscaler_type.value,
                    'direction': event.direction.value,
                    'old_replicas': event.old_replicas,
                    'new_replicas': event.new_replicas,
                    'reason': event.reason,
                    'metrics': [
                        {
                            'name': m.name,
                            'current_value': m.current_value,
                            'target_value': m.target_value,
                            'metric_type': m.metric_type
                        }
                        for m in event.metrics
                    ]
                }
                for event in self.scaling_events[-50:]  # Last 50 events
            ]
            
            # Generate recommendations
            report['recommendations'] = self._generate_autoscaling_recommendations(report)
        
        except Exception as e:
            self.logger.error(f"Failed to generate autoscaling report: {e}")
            report['error'] = str(e)
        
        return report
    
    def _generate_autoscaling_recommendations(self, report: Dict) -> List[str]:
        """
        Generate autoscaling recommendations based on current state
        """
        recommendations = []
        
        # Check HPA configurations
        for hpa in report['autoscalers']['hpa']:
            if hpa['current_replicas'] == hpa['max_replicas']:
                recommendations.append(
                    f"HPA {hpa['name']} is at maximum replicas. Consider increasing max_replicas or optimizing resource usage."
                )
            
            if hpa['current_replicas'] == hpa['min_replicas']:
                recommendations.append(
                    f"HPA {hpa['name']} is at minimum replicas. Consider decreasing min_replicas if appropriate."
                )
        
        # Check for missing autoscalers
        if not report['autoscalers']['hpa'] and not report['autoscalers']['keda']:
            recommendations.append(
                "No horizontal autoscalers found. Consider implementing HPA or KEDA for automatic scaling."
            )
        
        if not report['autoscalers']['vpa']:
            recommendations.append(
                "No vertical autoscalers found. Consider implementing VPA for automatic resource optimization."
            )
        
        # General recommendations
        recommendations.extend([
            "Monitor scaling events regularly to optimize autoscaling parameters",
            "Use custom metrics for more accurate scaling decisions",
            "Implement proper resource requests and limits for effective autoscaling",
            "Consider using KEDA for event-driven autoscaling",
            "Test autoscaling behavior under different load conditions"
        ])
        
        return recommendations


# Example usage
if __name__ == "__main__":
    am = AutoscalingManager()
    
    # Create HPA configuration
    hpa_config = AutoscalerConfig(
        name="web-app-hpa",
        namespace="production",
        target_ref={
            "apiVersion": "apps/v1",
            "kind": "Deployment",
            "name": "web-app"
        },
        min_replicas=3,
        max_replicas=20,
        metrics=[
            {
                "type": "Resource",
                "resource": {
                    "name": "cpu",
                    "target": {
                        "type": "Utilization",
                        "averageUtilization": 70
                    }
                }
            }
        ]
    )
    
    # Create HPA
    hpa_result = am.create_hpa(hpa_config)
    print("HPA created:")
    print(json.dumps(hpa_result, indent=2, default=str))
    
    # Generate autoscaling report
    report = am.generate_autoscaling_report(namespace="production")
    print("\nAutoscaling Report:")
    print(json.dumps(report, indent=2, default=str))
```

### Autoscaling Best Practices

1. **Resource Requests**: Always set resource requests for accurate HPA scaling
2. **Gradual Scaling**: Use scaling policies to prevent rapid fluctuations
3. **Multiple Metrics**: Combine CPU, memory, and custom metrics for better decisions
4. **Testing**: Test autoscaling behavior under various load conditions
5. **Monitoring**: Monitor scaling events and adjust parameters accordingly
6. **Custom Metrics**: Use application-specific metrics for more accurate scaling
7. **Cluster Capacity**: Ensure cluster has sufficient capacity for scaling
8. **Pod Disruption Budgets**: Use PDBs to maintain availability during scaling
9. **Resource Limits**: Set appropriate limits to prevent resource exhaustion
10. **Regular Review**: Regularly review and optimize autoscaling configurations

## Q11: How do you implement CI/CD pipelines for Kubernetes applications?
**Difficulty: Advanced**

**Answer:**

Implementing CI/CD pipelines for Kubernetes applications involves automating the build, test, and deployment processes. This includes container image building, security scanning, testing, and progressive deployment strategies.

### GitLab CI/CD Pipeline

```yaml
# .gitlab-ci.yml
stages:
  - build
  - test
  - security
  - deploy-staging
  - deploy-production

variables:
  DOCKER_DRIVER: overlay2
  DOCKER_TLS_CERTDIR: "/certs"
  REGISTRY: registry.gitlab.com
  IMAGE_NAME: $REGISTRY/$CI_PROJECT_PATH
  KUBECONFIG_FILE: $KUBECONFIG

services:
  - docker:20.10.16-dind

before_script:
  - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY

# Build stage
build:
  stage: build
  image: docker:20.10.16
  script:
    - docker build -t $IMAGE_NAME:$CI_COMMIT_SHA .
    - docker build -t $IMAGE_NAME:latest .
    - docker push $IMAGE_NAME:$CI_COMMIT_SHA
    - docker push $IMAGE_NAME:latest
  only:
    - main
    - develop
    - merge_requests

# Unit tests
unit-tests:
  stage: test
  image: node:16-alpine
  script:
    - npm ci
    - npm run test:unit
    - npm run test:coverage
  coverage: '/Lines\s*:\s*(\d+\.?\d*)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 1 week
  only:
    - main
    - develop
    - merge_requests

# Integration tests
integration-tests:
  stage: test
  image: docker/compose:1.29.2
  services:
    - docker:20.10.16-dind
  script:
    - docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
    - docker-compose -f docker-compose.test.yml down
  only:
    - main
    - develop
    - merge_requests

# Security scanning
container-security:
  stage: security
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 0 --severity HIGH,CRITICAL $IMAGE_NAME:$CI_COMMIT_SHA
    - trivy image --exit-code 1 --severity CRITICAL $IMAGE_NAME:$CI_COMMIT_SHA
  allow_failure: true
  only:
    - main
    - develop

# SAST scanning
sast:
  stage: security
  image: securecodewarrior/gitlab-sast:latest
  script:
    - /analyzer run
  artifacts:
    reports:
      sast: gl-sast-report.json
  only:
    - main
    - develop
    - merge_requests

# Deploy to staging
deploy-staging:
  stage: deploy-staging
  image: bitnami/kubectl:latest
  environment:
    name: staging
    url: https://staging.example.com
  script:
    - echo $KUBECONFIG_STAGING | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
    - envsubst < k8s/staging/service.yaml | kubectl apply -f -
    - envsubst < k8s/staging/ingress.yaml | kubectl apply -f -
    - kubectl rollout status deployment/app-staging -n staging
  variables:
    ENVIRONMENT: staging
    NAMESPACE: staging
    REPLICAS: 2
    IMAGE_TAG: $CI_COMMIT_SHA
  only:
    - develop

# Deploy to production
deploy-production:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://production.example.com
  script:
    - echo $KUBECONFIG_PRODUCTION | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - envsubst < k8s/production/deployment.yaml | kubectl apply -f -
    - envsubst < k8s/production/service.yaml | kubectl apply -f -
    - envsubst < k8s/production/ingress.yaml | kubectl apply -f -
    - kubectl rollout status deployment/app-production -n production
  variables:
    ENVIRONMENT: production
    NAMESPACE: production
    REPLICAS: 5
    IMAGE_TAG: $CI_COMMIT_SHA
  when: manual
  only:
    - main

# Canary deployment
canary-deploy:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production-canary
    url: https://production.example.com
  script:
    - echo $KUBECONFIG_PRODUCTION | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - envsubst < k8s/production/canary-deployment.yaml | kubectl apply -f -
    - kubectl rollout status deployment/app-canary -n production
    - sleep 300  # Wait 5 minutes for monitoring
    - ./scripts/check-canary-metrics.sh
  variables:
    ENVIRONMENT: production
    NAMESPACE: production
    CANARY_REPLICAS: 1
    IMAGE_TAG: $CI_COMMIT_SHA
  when: manual
  only:
    - main

# Promote canary to full deployment
promote-canary:
  stage: deploy-production
  image: bitnami/kubectl:latest
  environment:
    name: production
    url: https://production.example.com
  script:
    - echo $KUBECONFIG_PRODUCTION | base64 -d > kubeconfig
    - export KUBECONFIG=kubeconfig
    - kubectl patch deployment app-production -n production -p '{"spec":{"template":{"spec":{"containers":[{"name":"app","image":"'$IMAGE_NAME:$CI_COMMIT_SHA'"}]}}}}'
    - kubectl rollout status deployment/app-production -n production
    - kubectl delete deployment app-canary -n production
  variables:
    IMAGE_TAG: $CI_COMMIT_SHA
  when: manual
  needs: ["canary-deploy"]
  only:
    - main
```

### GitHub Actions Workflow

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
      security-events: write
    
    outputs:
      image-digest: ${{ steps.build.outputs.digest }}
      image-tag: ${{ steps.meta.outputs.tags }}
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: |
        npm run test:unit
        npm run test:coverage
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella
    
    - name: Run integration tests
      run: |
        docker-compose -f docker-compose.test.yml up --build --abort-on-container-exit
        docker-compose -f docker-compose.test.yml down
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v3
    
    - name: Log in to Container Registry
      uses: docker/login-action@v3
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v5
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
          type=raw,value=latest,enable={{is_default_branch}}
    
    - name: Build and push Docker image
      id: build
      uses: docker/build-push-action@v5
      with:
        context: .
        platforms: linux/amd64,linux/arm64
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max
    
    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      if: always()
      with:
        sarif_file: 'trivy-results.sarif'

  deploy-staging:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.example.com
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.28.0'
    
    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBECONFIG_STAGING }}" | base64 -d > kubeconfig
        echo "KUBECONFIG=kubeconfig" >> $GITHUB_ENV
    
    - name: Deploy to staging
      run: |
        export IMAGE_TAG=${{ github.sha }}
        export ENVIRONMENT=staging
        export NAMESPACE=staging
        export REPLICAS=2
        envsubst < k8s/staging/deployment.yaml | kubectl apply -f -
        envsubst < k8s/staging/service.yaml | kubectl apply -f -
        envsubst < k8s/staging/ingress.yaml | kubectl apply -f -
        kubectl rollout status deployment/app-staging -n staging --timeout=300s
    
    - name: Run smoke tests
      run: |
        sleep 30
        curl -f https://staging.example.com/health || exit 1
        npm run test:e2e:staging

  deploy-production:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment:
      name: production
      url: https://production.example.com
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.28.0'
    
    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBECONFIG_PRODUCTION }}" | base64 -d > kubeconfig
        echo "KUBECONFIG=kubeconfig" >> $GITHUB_ENV
    
    - name: Blue-Green Deployment
      run: |
        export IMAGE_TAG=${{ github.sha }}
        export ENVIRONMENT=production
        export NAMESPACE=production
        export REPLICAS=5
        
        # Deploy to green environment
        envsubst < k8s/production/green-deployment.yaml | kubectl apply -f -
        kubectl rollout status deployment/app-green -n production --timeout=600s
        
        # Run health checks
        kubectl run health-check --image=curlimages/curl:latest --rm -i --restart=Never -- \
          curl -f http://app-green-service.production.svc.cluster.local/health
        
        # Switch traffic to green
        kubectl patch service app-service -n production -p '{"spec":{"selector":{"version":"green"}}}'
        
        # Wait and verify
        sleep 60
        curl -f https://production.example.com/health || exit 1
        
        # Clean up old blue deployment
        kubectl delete deployment app-blue -n production --ignore-not-found=true
        
        # Rename green to blue for next deployment
        kubectl patch deployment app-green -n production -p '{"metadata":{"name":"app-blue"}}'

  canary-deployment:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'workflow_dispatch'
    environment:
      name: production-canary
      url: https://production.example.com
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
    
    - name: Set up kubectl
      uses: azure/setup-kubectl@v3
      with:
        version: 'v1.28.0'
    
    - name: Configure kubectl
      run: |
        echo "${{ secrets.KUBECONFIG_PRODUCTION }}" | base64 -d > kubeconfig
        echo "KUBECONFIG=kubeconfig" >> $GITHUB_ENV
    
    - name: Deploy canary
      run: |
        export IMAGE_TAG=${{ github.sha }}
        export ENVIRONMENT=production
        export NAMESPACE=production
        export CANARY_REPLICAS=1
        
        # Deploy canary version
        envsubst < k8s/production/canary-deployment.yaml | kubectl apply -f -
        kubectl rollout status deployment/app-canary -n production --timeout=300s
        
        # Configure traffic split (10% to canary)
        envsubst < k8s/production/canary-service.yaml | kubectl apply -f -
        envsubst < k8s/production/canary-ingress.yaml | kubectl apply -f -
    
    - name: Monitor canary metrics
      run: |
        # Wait for metrics collection
        sleep 300
        
        # Check error rate and latency
        python scripts/check-canary-metrics.py --duration=300 --error-threshold=1 --latency-threshold=500
    
    - name: Promote or rollback canary
      run: |
        if [ "${{ steps.monitor.outcome }}" == "success" ]; then
          echo "Promoting canary to full deployment"
          kubectl patch deployment app-production -n production -p '{"spec":{"template":{"spec":{"containers":[{"name":"app","image":"'${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}:${{ github.sha }}'"}]}}}}'
          kubectl rollout status deployment/app-production -n production --timeout=600s
          kubectl delete deployment app-canary -n production
        else
          echo "Rolling back canary deployment"
          kubectl delete deployment app-canary -n production
          exit 1
        fi
```

### ArgoCD GitOps Configuration

```yaml
# argocd/application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app
  namespace: argocd
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default
  source:
    repoURL: https://github.com/company/web-app-manifests
    targetRevision: HEAD
    path: overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10

---
# argocd/rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: web-app-rollout
  namespace: production
spec:
  replicas: 5
  strategy:
    canary:
      maxSurge: "25%"
      maxUnavailable: 0
      analysis:
        templates:
        - templateName: success-rate
        startingStep: 2
        args:
        - name: service-name
          value: web-app-service
      steps:
      - setWeight: 20
      - pause: {duration: 10m}
      - setWeight: 40
      - pause: {duration: 10m}
      - setWeight: 60
      - pause: {duration: 10m}
      - setWeight: 80
      - pause: {duration: 10m}
      canaryService: web-app-canary-service
      stableService: web-app-stable-service
      trafficRouting:
        nginx:
          stableIngress: web-app-stable-ingress
          annotationPrefix: nginx.ingress.kubernetes.io
          additionalIngressAnnotations:
            canary-by-header: X-Canary
            canary-by-header-value: "true"
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: registry.example.com/web-app:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
# argocd/analysis-template.yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
  namespace: production
spec:
  args:
  - name: service-name
  metrics:
  - name: success-rate
    interval: 2m
    count: 5
    successCondition: result[0] >= 0.95
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus-server:80
        query: |
          sum(rate(http_requests_total{service="{{args.service-name}}",status!~"5.."}[2m])) /
          sum(rate(http_requests_total{service="{{args.service-name}}"}[2m]))
  - name: avg-response-time
    interval: 2m
    count: 5
    successCondition: result[0] <= 0.5
    failureLimit: 3
    provider:
      prometheus:
        address: http://prometheus-server:80
        query: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket{service="{{args.service-name}}"}[2m])) by (le)
          )
```

### Tekton Pipeline

```yaml
# tekton/pipeline.yaml
apiVersion: tekton.dev/v1beta1
kind: Pipeline
metadata:
  name: web-app-pipeline
  namespace: tekton-pipelines
spec:
  params:
  - name: git-url
    type: string
    description: Git repository URL
  - name: git-revision
    type: string
    description: Git revision
    default: main
  - name: image-name
    type: string
    description: Container image name
  - name: environment
    type: string
    description: Target environment
    default: staging
  
  workspaces:
  - name: shared-data
    description: Shared workspace for pipeline tasks
  - name: docker-credentials
    description: Docker registry credentials
  
  tasks:
  - name: fetch-source
    taskRef:
      name: git-clone
    workspaces:
    - name: output
      workspace: shared-data
    params:
    - name: url
      value: $(params.git-url)
    - name: revision
      value: $(params.git-revision)
  
  - name: run-tests
    taskRef:
      name: npm-test
    runAfter: ["fetch-source"]
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: ARGS
      value: ["ci", "test", "test:coverage"]
  
  - name: security-scan
    taskRef:
      name: trivy-scanner
    runAfter: ["fetch-source"]
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: ARGS
      value: ["fs", "--security-checks", "vuln,secret,config", "--format", "sarif", "."]
  
  - name: build-image
    taskRef:
      name: buildah
    runAfter: ["run-tests", "security-scan"]
    workspaces:
    - name: source
      workspace: shared-data
    - name: dockerconfig
      workspace: docker-credentials
    params:
    - name: IMAGE
      value: $(params.image-name):$(params.git-revision)
    - name: DOCKERFILE
      value: ./Dockerfile
    - name: CONTEXT
      value: .
    - name: FORMAT
      value: docker
  
  - name: scan-image
    taskRef:
      name: trivy-scanner
    runAfter: ["build-image"]
    params:
    - name: ARGS
      value: ["image", "--exit-code", "1", "--severity", "CRITICAL", "$(params.image-name):$(params.git-revision)"]
  
  - name: deploy-app
    taskRef:
      name: kubectl-deploy
    runAfter: ["scan-image"]
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: image
      value: $(params.image-name):$(params.git-revision)
    - name: environment
      value: $(params.environment)
    - name: manifest-path
      value: k8s/$(params.environment)
  
  - name: run-e2e-tests
    taskRef:
      name: cypress-e2e
    runAfter: ["deploy-app"]
    workspaces:
    - name: source
      workspace: shared-data
    params:
    - name: environment
      value: $(params.environment)
    - name: base-url
      value: https://$(params.environment).example.com

---
# tekton/task-kubectl-deploy.yaml
apiVersion: tekton.dev/v1beta1
kind: Task
metadata:
  name: kubectl-deploy
  namespace: tekton-pipelines
spec:
  params:
  - name: image
    type: string
    description: Container image to deploy
  - name: environment
    type: string
    description: Target environment
  - name: manifest-path
    type: string
    description: Path to Kubernetes manifests
  
  workspaces:
  - name: source
    description: Source code workspace
  
  steps:
  - name: deploy
    image: bitnami/kubectl:latest
    script: |
      #!/bin/bash
      set -e
      
      cd $(workspaces.source.path)
      
      # Set environment variables
      export IMAGE=$(params.image)
      export ENVIRONMENT=$(params.environment)
      export NAMESPACE=$(params.environment)
      
      # Apply manifests
      for file in $(params.manifest-path)/*.yaml; do
        envsubst < $file | kubectl apply -f -
      done
      
      # Wait for deployment to complete
      kubectl rollout status deployment/web-app -n $(params.environment) --timeout=300s
      
      # Verify deployment
      kubectl get pods -n $(params.environment) -l app=web-app
    env:
    - name: KUBECONFIG
      value: /etc/kubeconfig/config
    volumeMounts:
    - name: kubeconfig
      mountPath: /etc/kubeconfig
      readOnly: true
  
  volumes:
  - name: kubeconfig
    secret:
      secretName: kubeconfig-$(params.environment)

---
# tekton/trigger.yaml
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerTemplate
metadata:
  name: web-app-trigger-template
  namespace: tekton-pipelines
spec:
  params:
  - name: git-revision
    description: Git revision
  - name: git-commit-message
    description: Git commit message
  - name: git-repo-url
    description: Git repository URL
  - name: git-repo-name
    description: Git repository name
  
  resourcetemplates:
  - apiVersion: tekton.dev/v1beta1
    kind: PipelineRun
    metadata:
      generateName: web-app-pipeline-run-
      namespace: tekton-pipelines
    spec:
      pipelineRef:
        name: web-app-pipeline
      params:
      - name: git-url
        value: $(tt.params.git-repo-url)
      - name: git-revision
        value: $(tt.params.git-revision)
      - name: image-name
        value: registry.example.com/$(tt.params.git-repo-name)
      - name: environment
        value: staging
      workspaces:
      - name: shared-data
        volumeClaimTemplate:
          spec:
            accessModes:
            - ReadWriteOnce
            resources:
              requests:
                storage: 1Gi
      - name: docker-credentials
        secret:
          secretName: docker-credentials

---
apiVersion: triggers.tekton.dev/v1beta1
kind: TriggerBinding
metadata:
  name: web-app-trigger-binding
  namespace: tekton-pipelines
spec:
  params:
  - name: git-revision
    value: $(body.head_commit.id)
  - name: git-commit-message
    value: $(body.head_commit.message)
  - name: git-repo-url
    value: $(body.repository.clone_url)
  - name: git-repo-name
    value: $(body.repository.name)

---
apiVersion: triggers.tekton.dev/v1beta1
kind: EventListener
metadata:
  name: web-app-event-listener
  namespace: tekton-pipelines
spec:
  serviceAccountName: tekton-triggers-sa
  triggers:
  - name: github-push
    bindings:
    - ref: web-app-trigger-binding
    template:
      ref: web-app-trigger-template
    interceptors:
    - github:
        secretRef:
          secretName: github-webhook-secret
          secretKey: token
        eventTypes:
        - push
    - cel:
        filter: body.ref == 'refs/heads/main' || body.ref == 'refs/heads/develop'
```

### CI/CD Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes CI/CD Pipeline Management System
"""

import json
import time
import logging
import subprocess
import yaml
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
from pathlib import Path
import requests
from kubernetes import client, config
import docker
import git

class DeploymentStrategy(Enum):
    ROLLING_UPDATE = "rolling_update"
    BLUE_GREEN = "blue_green"
    CANARY = "canary"
    RECREATE = "recreate"

class PipelineStage(Enum):
    BUILD = "build"
    TEST = "test"
    SECURITY = "security"
    DEPLOY = "deploy"
    VERIFY = "verify"
    PROMOTE = "promote"

@dataclass
class PipelineConfig:
    name: str
    repository_url: str
    branch: str
    dockerfile_path: str
    manifest_path: str
    registry_url: str
    image_name: str
    environments: List[str] = field(default_factory=lambda: ["staging", "production"])
    deployment_strategy: DeploymentStrategy = DeploymentStrategy.ROLLING_UPDATE
    test_commands: List[str] = field(default_factory=list)
    security_scans: List[str] = field(default_factory=lambda: ["trivy", "snyk"])

@dataclass
class PipelineRun:
    id: str
    config: PipelineConfig
    commit_sha: str
    branch: str
    status: str
    stages: Dict[PipelineStage, Dict] = field(default_factory=dict)
    start_time: datetime = field(default_factory=datetime.now)
    end_time: Optional[datetime] = None
    artifacts: Dict[str, str] = field(default_factory=dict)

class CICDManager:
    def __init__(self, kubeconfig_path: Optional[str] = None):
        # Initialize Kubernetes client
        if kubeconfig_path:
            config.load_kube_config(config_file=kubeconfig_path)
        else:
            try:
                config.load_incluster_config()
            except:
                config.load_kube_config()
        
        self.v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.docker_client = docker.from_env()
        
        self.pipeline_runs: Dict[str, PipelineRun] = {}
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
    
    def create_pipeline(self, config: PipelineConfig) -> str:
        """
        Create a new CI/CD pipeline
        """
        pipeline_id = f"{config.name}-{int(time.time())}"
        
        # Clone repository
        repo_path = f"/tmp/{pipeline_id}"
        repo = git.Repo.clone_from(config.repository_url, repo_path, branch=config.branch)
        commit_sha = repo.head.commit.hexsha
        
        # Create pipeline run
        pipeline_run = PipelineRun(
            id=pipeline_id,
            config=config,
            commit_sha=commit_sha,
            branch=config.branch,
            status="running"
        )
        
        self.pipeline_runs[pipeline_id] = pipeline_run
        
        self.logger.info(f"Created pipeline {pipeline_id} for commit {commit_sha}")
        return pipeline_id
    
    def run_pipeline(self, pipeline_id: str) -> Dict:
        """
        Execute the complete CI/CD pipeline
        """
        pipeline_run = self.pipeline_runs[pipeline_id]
        
        try:
            # Build stage
            self._run_build_stage(pipeline_run)
            
            # Test stage
            self._run_test_stage(pipeline_run)
            
            # Security stage
            self._run_security_stage(pipeline_run)
            
            # Deploy to staging
            if "staging" in pipeline_run.config.environments:
                self._run_deploy_stage(pipeline_run, "staging")
                self._run_verify_stage(pipeline_run, "staging")
            
            # Deploy to production (manual approval required)
            if "production" in pipeline_run.config.environments:
                self.logger.info(f"Pipeline {pipeline_id} ready for production deployment")
                pipeline_run.status = "awaiting_approval"
            else:
                pipeline_run.status = "completed"
                pipeline_run.end_time = datetime.now()
        
        except Exception as e:
            self.logger.error(f"Pipeline {pipeline_id} failed: {e}")
            pipeline_run.status = "failed"
            pipeline_run.end_time = datetime.now()
            raise
        
        return self._get_pipeline_status(pipeline_id)
    
    def _run_build_stage(self, pipeline_run: PipelineRun) -> None:
        """
        Run build stage - build and push container image
        """
        self.logger.info(f"Running build stage for pipeline {pipeline_run.id}")
        
        stage_start = datetime.now()
        repo_path = f"/tmp/{pipeline_run.id}"
        
        try:
            # Build Docker image
            image_tag = f"{pipeline_run.config.image_name}:{pipeline_run.commit_sha}"
            latest_tag = f"{pipeline_run.config.image_name}:latest"
            
            self.logger.info(f"Building image {image_tag}")
            
            # Build image
            image, build_logs = self.docker_client.images.build(
                path=repo_path,
                dockerfile=pipeline_run.config.dockerfile_path,
                tag=image_tag,
                rm=True,
                forcerm=True
            )
            
            # Tag as latest
            image.tag(latest_tag)
            
            # Push to registry
            self.logger.info(f"Pushing image {image_tag}")
            push_logs = self.docker_client.images.push(
                repository=pipeline_run.config.image_name,
                tag=pipeline_run.commit_sha
            )
            
            # Store artifacts
            pipeline_run.artifacts["image_tag"] = image_tag
            pipeline_run.artifacts["image_digest"] = image.id
            
            # Record stage completion
            pipeline_run.stages[PipelineStage.BUILD] = {
                "status": "success",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "artifacts": {
                    "image_tag": image_tag,
                    "image_digest": image.id
                }
            }
            
            self.logger.info(f"Build stage completed for pipeline {pipeline_run.id}")
        
        except Exception as e:
            pipeline_run.stages[PipelineStage.BUILD] = {
                "status": "failed",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "error": str(e)
            }
            raise
    
    def _run_test_stage(self, pipeline_run: PipelineRun) -> None:
        """
        Run test stage - unit tests, integration tests, coverage
        """
        self.logger.info(f"Running test stage for pipeline {pipeline_run.id}")
        
        stage_start = datetime.now()
        repo_path = f"/tmp/{pipeline_run.id}"
        
        try:
            test_results = {}
            
            # Run test commands
            for i, test_cmd in enumerate(pipeline_run.config.test_commands):
                self.logger.info(f"Running test command: {test_cmd}")
                
                result = subprocess.run(
                    test_cmd.split(),
                    cwd=repo_path,
                    capture_output=True,
                    text=True,
                    timeout=600  # 10 minutes timeout
                )
                
                test_results[f"test_{i}"] = {
                    "command": test_cmd,
                    "exit_code": result.returncode,
                    "stdout": result.stdout,
                    "stderr": result.stderr
                }
                
                if result.returncode != 0:
                    raise Exception(f"Test command failed: {test_cmd}")
            
            # Record stage completion
            pipeline_run.stages[PipelineStage.TEST] = {
                "status": "success",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "results": test_results
            }
            
            self.logger.info(f"Test stage completed for pipeline {pipeline_run.id}")
        
        except Exception as e:
            pipeline_run.stages[PipelineStage.TEST] = {
                "status": "failed",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "error": str(e)
            }
            raise
    
    def _run_security_stage(self, pipeline_run: PipelineRun) -> None:
        """
        Run security stage - vulnerability scanning, SAST, secrets detection
        """
        self.logger.info(f"Running security stage for pipeline {pipeline_run.id}")
        
        stage_start = datetime.now()
        image_tag = pipeline_run.artifacts["image_tag"]
        
        try:
            security_results = {}
            
            # Run security scans
            for scan_type in pipeline_run.config.security_scans:
                if scan_type == "trivy":
                    result = self._run_trivy_scan(image_tag)
                    security_results["trivy"] = result
                elif scan_type == "snyk":
                    result = self._run_snyk_scan(image_tag)
                    security_results["snyk"] = result
            
            # Check for critical vulnerabilities
            critical_vulns = self._check_critical_vulnerabilities(security_results)
            if critical_vulns:
                raise Exception(f"Critical vulnerabilities found: {critical_vulns}")
            
            # Record stage completion
            pipeline_run.stages[PipelineStage.SECURITY] = {
                "status": "success",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "results": security_results
            }
            
            self.logger.info(f"Security stage completed for pipeline {pipeline_run.id}")
        
        except Exception as e:
            pipeline_run.stages[PipelineStage.SECURITY] = {
                "status": "failed",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "error": str(e)
            }
            raise
    
    def _run_deploy_stage(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Run deployment stage for specific environment
        """
        self.logger.info(f"Running deploy stage for pipeline {pipeline_run.id} to {environment}")
        
        stage_start = datetime.now()
        
        try:
            if pipeline_run.config.deployment_strategy == DeploymentStrategy.ROLLING_UPDATE:
                self._deploy_rolling_update(pipeline_run, environment)
            elif pipeline_run.config.deployment_strategy == DeploymentStrategy.BLUE_GREEN:
                self._deploy_blue_green(pipeline_run, environment)
            elif pipeline_run.config.deployment_strategy == DeploymentStrategy.CANARY:
                self._deploy_canary(pipeline_run, environment)
            else:
                self._deploy_recreate(pipeline_run, environment)
            
            # Record stage completion
            pipeline_run.stages[f"{PipelineStage.DEPLOY}_{environment}"] = {
                "status": "success",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "environment": environment,
                "strategy": pipeline_run.config.deployment_strategy.value
            }
            
            self.logger.info(f"Deploy stage completed for pipeline {pipeline_run.id} to {environment}")
        
        except Exception as e:
            pipeline_run.stages[f"{PipelineStage.DEPLOY}_{environment}"] = {
                "status": "failed",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "environment": environment,
                "error": str(e)
            }
            raise
    
    def _deploy_rolling_update(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Deploy using rolling update strategy
        """
        image_tag = pipeline_run.artifacts["image_tag"]
        manifest_path = Path(f"/tmp/{pipeline_run.id}/{pipeline_run.config.manifest_path}/{environment}")
        
        # Apply manifests with image substitution
        for manifest_file in manifest_path.glob("*.yaml"):
            with open(manifest_file, 'r') as f:
                manifest = yaml.safe_load(f)
            
            # Update image in deployment
            if manifest.get('kind') == 'Deployment':
                containers = manifest['spec']['template']['spec']['containers']
                for container in containers:
                    if container['name'] == pipeline_run.config.name:
                        container['image'] = image_tag
            
            # Apply manifest
            self._apply_manifest(manifest, environment)
        
        # Wait for rollout to complete
        self._wait_for_rollout(pipeline_run.config.name, environment)
    
    def _deploy_blue_green(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Deploy using blue-green strategy
        """
        # Implementation for blue-green deployment
        self.logger.info(f"Deploying blue-green for {pipeline_run.id} to {environment}")
        # ... blue-green deployment logic
    
    def _deploy_canary(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Deploy using canary strategy
        """
        # Implementation for canary deployment
        self.logger.info(f"Deploying canary for {pipeline_run.id} to {environment}")
        # ... canary deployment logic
    
    def _deploy_recreate(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Deploy using recreate strategy
        """
        # Implementation for recreate deployment
        self.logger.info(f"Deploying recreate for {pipeline_run.id} to {environment}")
        # ... recreate deployment logic
    
    def _run_verify_stage(self, pipeline_run: PipelineRun, environment: str) -> None:
        """
        Run verification stage - health checks, smoke tests
        """
        self.logger.info(f"Running verify stage for pipeline {pipeline_run.id} in {environment}")
        
        stage_start = datetime.now()
        
        try:
            # Health check
            health_status = self._check_application_health(pipeline_run.config.name, environment)
            
            # Smoke tests
            smoke_test_results = self._run_smoke_tests(pipeline_run, environment)
            
            # Record stage completion
            pipeline_run.stages[f"{PipelineStage.VERIFY}_{environment}"] = {
                "status": "success",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "environment": environment,
                "health_status": health_status,
                "smoke_tests": smoke_test_results
            }
            
            self.logger.info(f"Verify stage completed for pipeline {pipeline_run.id} in {environment}")
        
        except Exception as e:
            pipeline_run.stages[f"{PipelineStage.VERIFY}_{environment}"] = {
                "status": "failed",
                "start_time": stage_start.isoformat(),
                "end_time": datetime.now().isoformat(),
                "environment": environment,
                "error": str(e)
            }
            raise
    
    def _run_trivy_scan(self, image_tag: str) -> Dict:
        """
        Run Trivy vulnerability scan
        """
        cmd = f"trivy image --format json {image_tag}"
        result = subprocess.run(cmd.split(), capture_output=True, text=True)
        
        if result.returncode == 0:
            return json.loads(result.stdout)
        else:
            raise Exception(f"Trivy scan failed: {result.stderr}")
    
    def _run_snyk_scan(self, image_tag: str) -> Dict:
        """
        Run Snyk vulnerability scan
        """
        cmd = f"snyk container test {image_tag} --json"
        result = subprocess.run(cmd.split(), capture_output=True, text=True)
        
        try:
            return json.loads(result.stdout)
        except json.JSONDecodeError:
            return {"error": "Failed to parse Snyk output", "stderr": result.stderr}
    
    def _check_critical_vulnerabilities(self, security_results: Dict) -> List[str]:
        """
        Check for critical vulnerabilities in security scan results
        """
        critical_vulns = []
        
        # Check Trivy results
        if "trivy" in security_results:
            trivy_results = security_results["trivy"]
            if "Results" in trivy_results:
                for result in trivy_results["Results"]:
                    if "Vulnerabilities" in result:
                        for vuln in result["Vulnerabilities"]:
                            if vuln.get("Severity") == "CRITICAL":
                                critical_vulns.append(f"Trivy: {vuln.get('VulnerabilityID')}")
        
        # Check Snyk results
        if "snyk" in security_results:
            snyk_results = security_results["snyk"]
            if "vulnerabilities" in snyk_results:
                for vuln in snyk_results["vulnerabilities"]:
                    if vuln.get("severity") == "high":
                        critical_vulns.append(f"Snyk: {vuln.get('id')}")
        
        return critical_vulns
    
    def _apply_manifest(self, manifest: Dict, namespace: str) -> None:
        """
        Apply Kubernetes manifest
        """
        kind = manifest.get('kind')
        
        if kind == 'Deployment':
            self.apps_v1.create_namespaced_deployment(
                namespace=namespace,
                body=manifest
            )
        elif kind == 'Service':
            self.v1.create_namespaced_service(
                namespace=namespace,
                body=manifest
            )
        # Add more resource types as needed
    
    def _wait_for_rollout(self, deployment_name: str, namespace: str, timeout: int = 300) -> None:
        """
        Wait for deployment rollout to complete
        """
        start_time = time.time()
        
        while time.time() - start_time < timeout:
            try:
                deployment = self.apps_v1.read_namespaced_deployment(
                    name=deployment_name,
                    namespace=namespace
                )
                
                if (deployment.status.ready_replicas == deployment.spec.replicas and
                    deployment.status.updated_replicas == deployment.spec.replicas):
                    self.logger.info(f"Deployment {deployment_name} rollout completed")
                    return
                
                time.sleep(10)
            except Exception as e:
                self.logger.warning(f"Error checking deployment status: {e}")
                time.sleep(10)
        
        raise Exception(f"Deployment {deployment_name} rollout timed out")
    
    def _check_application_health(self, app_name: str, namespace: str) -> Dict:
        """
        Check application health status
        """
        try:
            # Get pods
            pods = self.v1.list_namespaced_pod(
                namespace=namespace,
                label_selector=f"app={app_name}"
            )
            
            healthy_pods = 0
            total_pods = len(pods.items)
            
            for pod in pods.items:
                if pod.status.phase == "Running":
                    # Check readiness
                    if pod.status.conditions:
                        for condition in pod.status.conditions:
                            if condition.type == "Ready" and condition.status == "True":
                                healthy_pods += 1
                                break
            
            return {
                "healthy_pods": healthy_pods,
                "total_pods": total_pods,
                "health_percentage": (healthy_pods / total_pods * 100) if total_pods > 0 else 0
            }
        
        except Exception as e:
            return {"error": str(e)}
    
    def _run_smoke_tests(self, pipeline_run: PipelineRun, environment: str) -> Dict:
        """
        Run smoke tests against deployed application
        """
        # Implementation for smoke tests
        return {"status": "passed", "tests_run": 5, "tests_passed": 5}
    
    def approve_production_deployment(self, pipeline_id: str) -> Dict:
        """
        Approve and execute production deployment
        """
        pipeline_run = self.pipeline_runs[pipeline_id]
        
        if pipeline_run.status != "awaiting_approval":
            raise Exception(f"Pipeline {pipeline_id} is not awaiting approval")
        
        try:
            # Deploy to production
            self._run_deploy_stage(pipeline_run, "production")
            self._run_verify_stage(pipeline_run, "production")
            
            pipeline_run.status = "completed"
            pipeline_run.end_time = datetime.now()
            
            self.logger.info(f"Production deployment completed for pipeline {pipeline_id}")
            return self._get_pipeline_status(pipeline_id)
        
        except Exception as e:
            pipeline_run.status = "failed"
            pipeline_run.end_time = datetime.now()
            self.logger.error(f"Production deployment failed for pipeline {pipeline_id}: {e}")
            raise
    
    def _get_pipeline_status(self, pipeline_id: str) -> Dict:
        """
        Get pipeline status and details
        """
        pipeline_run = self.pipeline_runs[pipeline_id]
        
        return {
            "id": pipeline_run.id,
            "status": pipeline_run.status,
            "commit_sha": pipeline_run.commit_sha,
            "branch": pipeline_run.branch,
            "start_time": pipeline_run.start_time.isoformat(),
            "end_time": pipeline_run.end_time.isoformat() if pipeline_run.end_time else None,
            "duration": str(pipeline_run.end_time - pipeline_run.start_time) if pipeline_run.end_time else None,
            "stages": {stage.value: details for stage, details in pipeline_run.stages.items()},
            "artifacts": pipeline_run.artifacts
        }
    
    def get_pipeline_history(self, limit: int = 50) -> List[Dict]:
        """
        Get pipeline execution history
        """
        history = []
        
        for pipeline_id in sorted(self.pipeline_runs.keys(), reverse=True)[:limit]:
            history.append(self._get_pipeline_status(pipeline_id))
        
        return history


# Example usage
if __name__ == "__main__":
    cicd = CICDManager()
    
    # Create pipeline configuration
    config = PipelineConfig(
        name="web-app",
        repository_url="https://github.com/company/web-app.git",
        branch="main",
        dockerfile_path="Dockerfile",
        manifest_path="k8s",
        registry_url="registry.example.com",
        image_name="registry.example.com/web-app",
        test_commands=["npm ci", "npm test", "npm run test:coverage"],
        deployment_strategy=DeploymentStrategy.ROLLING_UPDATE
    )
    
    # Create and run pipeline
    pipeline_id = cicd.create_pipeline(config)
    result = cicd.run_pipeline(pipeline_id)
    
    print("Pipeline Status:")
    print(json.dumps(result, indent=2, default=str))
```

### CI/CD Best Practices

1. **Automated Testing**: Implement comprehensive test suites (unit, integration, e2e)
2. **Security Scanning**: Include vulnerability scanning in every pipeline
3. **Immutable Images**: Use immutable container images with specific tags
4. **Environment Parity**: Maintain consistency across environments
5. **Rollback Strategy**: Implement automated rollback mechanisms
6. **Monitoring**: Monitor deployments and application health
7. **Secrets Management**: Use secure secret management solutions
8. **Progressive Delivery**: Use canary or blue-green deployments for production
9. **Infrastructure as Code**: Manage infrastructure using IaC tools
10. **Compliance**: Implement compliance checks and audit trails

## Q12: How do you implement disaster recovery and backup strategies for Kubernetes clusters?
**Difficulty: Advanced**

**Answer:**

Implementing disaster recovery and backup strategies for Kubernetes clusters involves protecting cluster state, application data, and ensuring business continuity. This includes backing up etcd, persistent volumes, and implementing multi-region deployments.

### Cluster Backup Strategy

```yaml
# backup/etcd-backup-cronjob.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: etcd-backup
  namespace: kube-system
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: etcd-backup
            image: quay.io/coreos/etcd:v3.5.9
            command:
            - /bin/sh
            - -c
            - |
              ETCDCTL_API=3 etcdctl snapshot save /backup/etcd-snapshot-$(date +%Y%m%d-%H%M%S).db \
                --endpoints=https://127.0.0.1:2379 \
                --cacert=/etc/kubernetes/pki/etcd/ca.crt \
                --cert=/etc/kubernetes/pki/etcd/server.crt \
                --key=/etc/kubernetes/pki/etcd/server.key
              
              # Upload to cloud storage
              aws s3 cp /backup/etcd-snapshot-$(date +%Y%m%d-%H%M%S).db s3://k8s-backups/etcd/
              
              # Cleanup old local backups (keep last 7 days)
              find /backup -name "etcd-snapshot-*.db" -mtime +7 -delete
            volumeMounts:
            - name: etcd-certs
              mountPath: /etc/kubernetes/pki/etcd
              readOnly: true
            - name: backup-storage
              mountPath: /backup
            env:
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  name: aws-credentials
                  key: access-key-id
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  name: aws-credentials
                  key: secret-access-key
          volumes:
          - name: etcd-certs
            hostPath:
              path: /etc/kubernetes/pki/etcd
          - name: backup-storage
            hostPath:
              path: /var/lib/etcd-backup
          restartPolicy: OnFailure
          nodeSelector:
            node-role.kubernetes.io/control-plane: ""
          tolerations:
          - key: node-role.kubernetes.io/control-plane
            operator: Exists
            effect: NoSchedule

---
# backup/velero-backup-schedule.yaml
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup
  namespace: velero
spec:
  schedule: "0 1 * * *"  # Daily at 1 AM
  template:
    includedNamespaces:
    - "*"
    excludedNamespaces:
    - kube-system
    - kube-public
    - kube-node-lease
    includedResources:
    - "*"
    excludedResources:
    - events
    - events.events.k8s.io
    storageLocation: default
    volumeSnapshotLocations:
    - default
    ttl: 720h0m0s  # 30 days
    snapshotVolumes: true
    includeClusterResources: true
    hooks:
      resources:
      - name: mysql-backup-hook
        includedNamespaces:
        - production
        labelSelector:
          matchLabels:
            app: mysql
        pre:
        - exec:
            container: mysql
            command:
            - /bin/bash
            - -c
            - "mysqldump --all-databases --single-transaction --routines --triggers > /tmp/backup.sql"
            onError: Fail
        post:
        - exec:
            container: mysql
            command:
            - /bin/bash
            - -c
            - "rm -f /tmp/backup.sql"

---
# backup/backup-storage-class.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: backup-storage
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
  iops: "3000"
  throughput: "125"
  encrypted: "true"
  kmsKeyId: "arn:aws:kms:us-west-2:123456789012:key/12345678-1234-1234-1234-123456789012"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
reclaimPolicy: Retain
```

### Multi-Region Disaster Recovery

```yaml
# dr/primary-cluster-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-config
  namespace: kube-system
data:
  cluster-role: "primary"
  region: "us-west-2"
  backup-region: "us-east-1"
  replication-enabled: "true"

---
# dr/cross-region-replication.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cross-region-replicator
  namespace: disaster-recovery
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cross-region-replicator
  template:
    metadata:
      labels:
        app: cross-region-replicator
    spec:
      containers:
      - name: replicator
        image: registry.example.com/k8s-replicator:v1.0.0
        env:
        - name: PRIMARY_REGION
          value: "us-west-2"
        - name: DR_REGION
          value: "us-east-1"
        - name: REPLICATION_INTERVAL
          value: "300"  # 5 minutes
        - name: AWS_ACCESS_KEY_ID
          valueFrom:
            secretKeyRef:
              name: aws-credentials
              key: access-key-id
        - name: AWS_SECRET_ACCESS_KEY
          valueFrom:
            secretKeyRef:
              name: aws-credentials
              key: secret-access-key
        volumeMounts:
        - name: kubeconfig-primary
          mountPath: /etc/kubeconfig/primary
          readOnly: true
        - name: kubeconfig-dr
          mountPath: /etc/kubeconfig/dr
          readOnly: true
        resources:
          requests:
            memory: "256Mi"
            cpu: "100m"
          limits:
            memory: "512Mi"
            cpu: "200m"
      volumes:
      - name: kubeconfig-primary
        secret:
          secretName: kubeconfig-primary
      - name: kubeconfig-dr
        secret:
          secretName: kubeconfig-dr

---
# dr/failover-service.yaml
apiVersion: v1
kind: Service
metadata:
  name: global-load-balancer
  namespace: disaster-recovery
  annotations:
    external-dns.alpha.kubernetes.io/hostname: app.example.com
    external-dns.alpha.kubernetes.io/aws-health-check-id: "health-check-123"
spec:
  type: LoadBalancer
  selector:
    app: global-lb
  ports:
  - port: 80
    targetPort: 8080
    protocol: TCP
  - port: 443
    targetPort: 8443
    protocol: TCP

---
# dr/health-check-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: health-check-service
  namespace: disaster-recovery
spec:
  replicas: 2
  selector:
    matchLabels:
      app: health-check
  template:
    metadata:
      labels:
        app: health-check
    spec:
      containers:
      - name: health-checker
        image: registry.example.com/health-checker:v1.0.0
        ports:
        - containerPort: 8080
        env:
        - name: PRIMARY_ENDPOINT
          value: "https://primary.example.com/health"
        - name: DR_ENDPOINT
          value: "https://dr.example.com/health"
        - name: FAILOVER_THRESHOLD
          value: "3"  # Fail after 3 consecutive failures
        - name: CHECK_INTERVAL
          value: "30"  # Check every 30 seconds
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Database Backup and Recovery

```yaml
# backup/postgres-backup.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: postgres-backup
  namespace: production
spec:
  schedule: "0 3 * * *"  # Daily at 3 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: postgres-backup
            image: postgres:15-alpine
            command:
            - /bin/bash
            - -c
            - |
              # Create backup
              BACKUP_FILE="postgres-backup-$(date +%Y%m%d-%H%M%S).sql"
              pg_dump -h $POSTGRES_HOST -U $POSTGRES_USER -d $POSTGRES_DB > /backup/$BACKUP_FILE
              
              # Compress backup
              gzip /backup/$BACKUP_FILE
              
              # Upload to S3
              aws s3 cp /backup/$BACKUP_FILE.gz s3://k8s-backups/postgres/
              
              # Test backup integrity
              gunzip -t /backup/$BACKUP_FILE.gz
              
              # Cleanup old backups (keep last 30 days)
              find /backup -name "postgres-backup-*.sql.gz" -mtime +30 -delete
              
              # Send notification
              curl -X POST $SLACK_WEBHOOK_URL \
                -H 'Content-type: application/json' \
                --data '{"text":"PostgreSQL backup completed: '$BACKUP_FILE.gz'"}'
            env:
            - name: POSTGRES_HOST
              value: "postgres-service"
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: postgres-credentials
                  key: username
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgres-credentials
                  key: password
            - name: POSTGRES_DB
              value: "production"
            - name: AWS_ACCESS_KEY_ID
              valueFrom:
                secretKeyRef:
                  name: aws-credentials
                  key: access-key-id
            - name: AWS_SECRET_ACCESS_KEY
              valueFrom:
                secretKeyRef:
                  name: aws-credentials
                  key: secret-access-key
            - name: SLACK_WEBHOOK_URL
              valueFrom:
                secretKeyRef:
                  name: slack-credentials
                  key: webhook-url
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: backup-pvc
          restartPolicy: OnFailure

---
# backup/mysql-backup.yaml
apiVersion: batch/v1
kind: CronJob
metadata:
  name: mysql-backup
  namespace: production
spec:
  schedule: "0 4 * * *"  # Daily at 4 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: mysql-backup
            image: mysql:8.0
            command:
            - /bin/bash
            - -c
            - |
              # Create backup with binary logs
              BACKUP_FILE="mysql-backup-$(date +%Y%m%d-%H%M%S).sql"
              mysqldump -h $MYSQL_HOST -u $MYSQL_USER -p$MYSQL_PASSWORD \
                --all-databases \
                --single-transaction \
                --routines \
                --triggers \
                --master-data=2 \
                --flush-logs > /backup/$BACKUP_FILE
              
              # Create incremental backup
              mysqlbinlog --read-from-remote-server \
                --host=$MYSQL_HOST \
                --user=$MYSQL_USER \
                --password=$MYSQL_PASSWORD \
                --raw \
                --result-file=/backup/binlog- \
                mysql-bin.000001
              
              # Compress and upload
              tar -czf /backup/$BACKUP_FILE.tar.gz /backup/$BACKUP_FILE /backup/binlog-*
              aws s3 cp /backup/$BACKUP_FILE.tar.gz s3://k8s-backups/mysql/
              
              # Cleanup
              rm -f /backup/$BACKUP_FILE /backup/binlog-*
              find /backup -name "mysql-backup-*.tar.gz" -mtime +30 -delete
            env:
            - name: MYSQL_HOST
              value: "mysql-service"
            - name: MYSQL_USER
              valueFrom:
                secretKeyRef:
                  name: mysql-credentials
                  key: username
            - name: MYSQL_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: mysql-credentials
                  key: password
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            persistentVolumeClaim:
              claimName: backup-pvc
          restartPolicy: OnFailure
```

### Disaster Recovery Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Disaster Recovery Management System
"""

import json
import time
import logging
import subprocess
import yaml
import boto3
import requests
from typing import Dict, List, Optional, Any, Tuple
from dataclasses import dataclass, field
from enum import Enum
from datetime import datetime, timedelta
from pathlib import Path
from kubernetes import client, config
import threading
import schedule

class DisasterType(Enum):
    CLUSTER_FAILURE = "cluster_failure"
    REGION_OUTAGE = "region_outage"
    DATA_CORRUPTION = "data_corruption"
    SECURITY_BREACH = "security_breach"
    NETWORK_PARTITION = "network_partition"

class RecoveryStrategy(Enum):
    FAILOVER = "failover"
    RESTORE_FROM_BACKUP = "restore_from_backup"
    REBUILD_CLUSTER = "rebuild_cluster"
    PARTIAL_RECOVERY = "partial_recovery"

@dataclass
class BackupConfig:
    name: str
    schedule: str
    retention_days: int
    storage_location: str
    encryption_enabled: bool = True
    compression_enabled: bool = True
    notification_webhook: Optional[str] = None

@dataclass
class DisasterRecoveryPlan:
    name: str
    disaster_types: List[DisasterType]
    recovery_strategy: RecoveryStrategy
    rto_minutes: int  # Recovery Time Objective
    rpo_minutes: int  # Recovery Point Objective
    primary_region: str
    dr_region: str
    automated_failover: bool = False
    notification_channels: List[str] = field(default_factory=list)

@dataclass
class DisasterEvent:
    id: str
    disaster_type: DisasterType
    severity: str
    detected_at: datetime
    description: str
    affected_services: List[str]
    recovery_plan: Optional[DisasterRecoveryPlan] = None
    status: str = "detected"
    recovery_start_time: Optional[datetime] = None
    recovery_end_time: Optional[datetime] = None

class DisasterRecoveryManager:
    def __init__(self, primary_kubeconfig: str, dr_kubeconfig: str):
        # Initialize Kubernetes clients for both regions
        self.primary_config = config.load_kube_config(config_file=primary_kubeconfig)
        self.primary_v1 = client.CoreV1Api()
        self.primary_apps_v1 = client.AppsV1Api()
        
        # Load DR cluster config
        config.load_kube_config(config_file=dr_kubeconfig)
        self.dr_v1 = client.CoreV1Api()
        self.dr_apps_v1 = client.AppsV1Api()
        
        # Initialize AWS clients
        self.s3_client = boto3.client('s3')
        self.route53_client = boto3.client('route53')
        self.ec2_client = boto3.client('ec2')
        
        self.backup_configs: Dict[str, BackupConfig] = {}
        self.dr_plans: Dict[str, DisasterRecoveryPlan] = {}
        self.active_disasters: Dict[str, DisasterEvent] = {}
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Start monitoring
        self._start_monitoring()
    
    def create_backup_config(self, config: BackupConfig) -> None:
        """
        Create a backup configuration
        """
        self.backup_configs[config.name] = config
        
        # Schedule backup job
        schedule.every().day.at(config.schedule).do(
            self._execute_backup, config.name
        )
        
        self.logger.info(f"Created backup config: {config.name}")
    
    def create_dr_plan(self, plan: DisasterRecoveryPlan) -> None:
        """
        Create a disaster recovery plan
        """
        self.dr_plans[plan.name] = plan
        self.logger.info(f"Created DR plan: {plan.name}")
    
    def _execute_backup(self, backup_name: str) -> Dict:
        """
        Execute backup based on configuration
        """
        config = self.backup_configs[backup_name]
        
        try:
            self.logger.info(f"Starting backup: {backup_name}")
            
            # Create backup timestamp
            timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
            backup_id = f"{backup_name}-{timestamp}"
            
            # Execute different backup types
            if "etcd" in backup_name.lower():
                result = self._backup_etcd(backup_id, config)
            elif "postgres" in backup_name.lower():
                result = self._backup_postgres(backup_id, config)
            elif "mysql" in backup_name.lower():
                result = self._backup_mysql(backup_id, config)
            elif "volumes" in backup_name.lower():
                result = self._backup_volumes(backup_id, config)
            else:
                result = self._backup_cluster_resources(backup_id, config)
            
            # Send notification
            if config.notification_webhook:
                self._send_notification(
                    config.notification_webhook,
                    f"Backup completed: {backup_id}",
                    "success"
                )
            
            self.logger.info(f"Backup completed: {backup_id}")
            return result
        
        except Exception as e:
            self.logger.error(f"Backup failed: {backup_name} - {e}")
            if config.notification_webhook:
                self._send_notification(
                    config.notification_webhook,
                    f"Backup failed: {backup_name} - {e}",
                    "error"
                )
            raise
    
    def _backup_etcd(self, backup_id: str, config: BackupConfig) -> Dict:
        """
        Backup etcd cluster state
        """
        backup_file = f"/tmp/{backup_id}.db"
        
        # Create etcd snapshot
        cmd = [
            "etcdctl", "snapshot", "save", backup_file,
            "--endpoints=https://127.0.0.1:2379",
            "--cacert=/etc/kubernetes/pki/etcd/ca.crt",
            "--cert=/etc/kubernetes/pki/etcd/server.crt",
            "--key=/etc/kubernetes/pki/etcd/server.key"
        ]
        
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            raise Exception(f"etcd backup failed: {result.stderr}")
        
        # Compress if enabled
        if config.compression_enabled:
            subprocess.run(["gzip", backup_file], check=True)
            backup_file += ".gz"
        
        # Upload to storage
        s3_key = f"etcd/{backup_id}.db{'gz' if config.compression_enabled else ''}"
        self.s3_client.upload_file(backup_file, config.storage_location, s3_key)
        
        # Cleanup local file
        Path(backup_file).unlink()
        
        return {
            "backup_id": backup_id,
            "type": "etcd",
            "size_bytes": Path(backup_file).stat().st_size if Path(backup_file).exists() else 0,
            "storage_location": f"s3://{config.storage_location}/{s3_key}"
        }
    
    def _backup_postgres(self, backup_id: str, config: BackupConfig) -> Dict:
        """
        Backup PostgreSQL database
        """
        # Implementation for PostgreSQL backup
        self.logger.info(f"Backing up PostgreSQL: {backup_id}")
        return {"backup_id": backup_id, "type": "postgres"}
    
    def _backup_mysql(self, backup_id: str, config: BackupConfig) -> Dict:
        """
        Backup MySQL database
        """
        # Implementation for MySQL backup
        self.logger.info(f"Backing up MySQL: {backup_id}")
        return {"backup_id": backup_id, "type": "mysql"}
    
    def _backup_volumes(self, backup_id: str, config: BackupConfig) -> Dict:
        """
        Backup persistent volumes using Velero
        """
        # Create Velero backup
        backup_spec = {
            "apiVersion": "velero.io/v1",
            "kind": "Backup",
            "metadata": {
                "name": backup_id,
                "namespace": "velero"
            },
            "spec": {
                "includedNamespaces": ["*"],
                "storageLocation": "default",
                "volumeSnapshotLocations": ["default"],
                "ttl": f"{config.retention_days * 24}h0m0s"
            }
        }
        
        # Apply backup resource
        # Implementation would use Velero API or kubectl
        
        return {"backup_id": backup_id, "type": "volumes"}
    
    def _backup_cluster_resources(self, backup_id: str, config: BackupConfig) -> Dict:
        """
        Backup cluster resources (manifests, configs)
        """
        # Implementation for cluster resource backup
        self.logger.info(f"Backing up cluster resources: {backup_id}")
        return {"backup_id": backup_id, "type": "cluster_resources"}
    
    def detect_disaster(self, disaster_type: DisasterType, description: str, 
                       affected_services: List[str]) -> str:
        """
        Detect and register a disaster event
        """
        disaster_id = f"disaster-{int(time.time())}"
        
        disaster_event = DisasterEvent(
            id=disaster_id,
            disaster_type=disaster_type,
            severity=self._assess_severity(disaster_type, affected_services),
            detected_at=datetime.now(),
            description=description,
            affected_services=affected_services
        )
        
        self.active_disasters[disaster_id] = disaster_event
        
        # Find appropriate recovery plan
        recovery_plan = self._find_recovery_plan(disaster_type)
        if recovery_plan:
            disaster_event.recovery_plan = recovery_plan
            
            # Auto-trigger recovery if enabled
            if recovery_plan.automated_failover:
                self._trigger_recovery(disaster_id)
        
        # Send alerts
        self._send_disaster_alert(disaster_event)
        
        self.logger.critical(f"Disaster detected: {disaster_id} - {description}")
        return disaster_id
    
    def _trigger_recovery(self, disaster_id: str) -> None:
        """
        Trigger disaster recovery process
        """
        disaster = self.active_disasters[disaster_id]
        plan = disaster.recovery_plan
        
        if not plan:
            raise Exception(f"No recovery plan found for disaster: {disaster_id}")
        
        disaster.status = "recovering"
        disaster.recovery_start_time = datetime.now()
        
        try:
            if plan.recovery_strategy == RecoveryStrategy.FAILOVER:
                self._execute_failover(disaster, plan)
            elif plan.recovery_strategy == RecoveryStrategy.RESTORE_FROM_BACKUP:
                self._execute_restore(disaster, plan)
            elif plan.recovery_strategy == RecoveryStrategy.REBUILD_CLUSTER:
                self._execute_rebuild(disaster, plan)
            else:
                self._execute_partial_recovery(disaster, plan)
            
            disaster.status = "recovered"
            disaster.recovery_end_time = datetime.now()
            
            # Calculate recovery metrics
            recovery_time = (disaster.recovery_end_time - disaster.recovery_start_time).total_seconds() / 60
            
            self.logger.info(f"Recovery completed for {disaster_id} in {recovery_time:.2f} minutes")
            
            # Send success notification
            self._send_recovery_notification(disaster, "success")
        
        except Exception as e:
            disaster.status = "recovery_failed"
            self.logger.error(f"Recovery failed for {disaster_id}: {e}")
            self._send_recovery_notification(disaster, "failed")
            raise
    
    def _execute_failover(self, disaster: DisasterEvent, plan: DisasterRecoveryPlan) -> None:
        """
        Execute failover to DR region
        """
        self.logger.info(f"Executing failover from {plan.primary_region} to {plan.dr_region}")
        
        # Update DNS records to point to DR region
        self._update_dns_records(plan.dr_region)
        
        # Scale up DR cluster
        self._scale_dr_cluster(disaster.affected_services)
        
        # Sync latest data
        self._sync_data_to_dr()
        
        # Verify DR cluster health
        self._verify_dr_cluster_health()
    
    def _execute_restore(self, disaster: DisasterEvent, plan: DisasterRecoveryPlan) -> None:
        """
        Execute restore from backup
        """
        self.logger.info(f"Executing restore from backup for disaster: {disaster.id}")
        
        # Find latest backup
        latest_backup = self._find_latest_backup(disaster.disaster_type)
        
        # Restore from backup
        if disaster.disaster_type == DisasterType.DATA_CORRUPTION:
            self._restore_data_from_backup(latest_backup)
        else:
            self._restore_cluster_from_backup(latest_backup)
    
    def _execute_rebuild(self, disaster: DisasterEvent, plan: DisasterRecoveryPlan) -> None:
        """
        Execute cluster rebuild
        """
        self.logger.info(f"Executing cluster rebuild for disaster: {disaster.id}")
        
        # Provision new cluster
        self._provision_new_cluster(plan)
        
        # Restore from backup
        latest_backup = self._find_latest_backup(disaster.disaster_type)
        self._restore_cluster_from_backup(latest_backup)
        
        # Update DNS and routing
        self._update_dns_records(plan.primary_region)
    
    def _execute_partial_recovery(self, disaster: DisasterEvent, plan: DisasterRecoveryPlan) -> None:
        """
        Execute partial recovery for specific services
        """
        self.logger.info(f"Executing partial recovery for services: {disaster.affected_services}")
        
        for service in disaster.affected_services:
            self._recover_service(service, plan)
    
    def _start_monitoring(self) -> None:
        """
        Start continuous monitoring for disaster detection
        """
        def monitor():
            while True:
                try:
                    # Check cluster health
                    self._check_cluster_health()
                    
                    # Check service health
                    self._check_service_health()
                    
                    # Check data integrity
                    self._check_data_integrity()
                    
                    # Run scheduled backups
                    schedule.run_pending()
                    
                    time.sleep(30)  # Check every 30 seconds
                
                except Exception as e:
                    self.logger.error(f"Monitoring error: {e}")
                    time.sleep(60)  # Wait longer on error
        
        # Start monitoring in background thread
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def _check_cluster_health(self) -> None:
        """
        Check overall cluster health
        """
        try:
            # Check node status
            nodes = self.primary_v1.list_node()
            unhealthy_nodes = []
            
            for node in nodes.items:
                for condition in node.status.conditions:
                    if condition.type == "Ready" and condition.status != "True":
                        unhealthy_nodes.append(node.metadata.name)
            
            if len(unhealthy_nodes) > len(nodes.items) * 0.5:  # More than 50% nodes unhealthy
                self.detect_disaster(
                    DisasterType.CLUSTER_FAILURE,
                    f"Cluster failure: {len(unhealthy_nodes)} unhealthy nodes",
                    ["cluster"]
                )
        
        except Exception as e:
            self.logger.warning(f"Cluster health check failed: {e}")
    
    def _check_service_health(self) -> None:
        """
        Check service health across namespaces
        """
        # Implementation for service health checking
        pass
    
    def _check_data_integrity(self) -> None:
        """
        Check data integrity
        """
        # Implementation for data integrity checking
        pass
    
    def _assess_severity(self, disaster_type: DisasterType, affected_services: List[str]) -> str:
        """
        Assess disaster severity
        """
        if disaster_type in [DisasterType.CLUSTER_FAILURE, DisasterType.REGION_OUTAGE]:
            return "critical"
        elif len(affected_services) > 5:
            return "high"
        elif len(affected_services) > 2:
            return "medium"
        else:
            return "low"
    
    def _find_recovery_plan(self, disaster_type: DisasterType) -> Optional[DisasterRecoveryPlan]:
        """
        Find appropriate recovery plan for disaster type
        """
        for plan in self.dr_plans.values():
            if disaster_type in plan.disaster_types:
                return plan
        return None
    
    def _send_disaster_alert(self, disaster: DisasterEvent) -> None:
        """
        Send disaster alert notifications
        """
        message = f"🚨 DISASTER DETECTED\n" \
                 f"ID: {disaster.id}\n" \
                 f"Type: {disaster.disaster_type.value}\n" \
                 f"Severity: {disaster.severity}\n" \
                 f"Description: {disaster.description}\n" \
                 f"Affected Services: {', '.join(disaster.affected_services)}"
        
        # Send to notification channels
        if disaster.recovery_plan:
            for channel in disaster.recovery_plan.notification_channels:
                self._send_notification(channel, message, "alert")
    
    def _send_recovery_notification(self, disaster: DisasterEvent, status: str) -> None:
        """
        Send recovery status notification
        """
        if status == "success":
            recovery_time = (disaster.recovery_end_time - disaster.recovery_start_time).total_seconds() / 60
            message = f"✅ RECOVERY COMPLETED\n" \
                     f"Disaster ID: {disaster.id}\n" \
                     f"Recovery Time: {recovery_time:.2f} minutes\n" \
                     f"Status: Successful"
        else:
            message = f"❌ RECOVERY FAILED\n" \
                     f"Disaster ID: {disaster.id}\n" \
                     f"Status: Failed - Manual intervention required"
        
        if disaster.recovery_plan:
            for channel in disaster.recovery_plan.notification_channels:
                self._send_notification(channel, message, status)
    
    def _send_notification(self, webhook_url: str, message: str, level: str) -> None:
        """
        Send notification to webhook
        """
        try:
            payload = {
                "text": message,
                "level": level,
                "timestamp": datetime.now().isoformat()
            }
            
            response = requests.post(webhook_url, json=payload, timeout=10)
            response.raise_for_status()
        
        except Exception as e:
            self.logger.error(f"Failed to send notification: {e}")
    
    def get_disaster_status(self, disaster_id: str) -> Dict:
        """
        Get disaster status and recovery progress
        """
        if disaster_id not in self.active_disasters:
            raise Exception(f"Disaster not found: {disaster_id}")
        
        disaster = self.active_disasters[disaster_id]
        
        return {
            "id": disaster.id,
            "type": disaster.disaster_type.value,
            "severity": disaster.severity,
            "status": disaster.status,
            "detected_at": disaster.detected_at.isoformat(),
            "recovery_start_time": disaster.recovery_start_time.isoformat() if disaster.recovery_start_time else None,
            "recovery_end_time": disaster.recovery_end_time.isoformat() if disaster.recovery_end_time else None,
            "affected_services": disaster.affected_services,
            "recovery_plan": disaster.recovery_plan.name if disaster.recovery_plan else None
        }
    
    def list_backups(self, backup_type: Optional[str] = None) -> List[Dict]:
        """
        List available backups
        """
        # Implementation to list backups from storage
        backups = []
        
        for config_name, config in self.backup_configs.items():
            if backup_type and backup_type not in config_name:
                continue
            
            # List backups from S3
            try:
                response = self.s3_client.list_objects_v2(
                    Bucket=config.storage_location,
                    Prefix=config_name
                )
                
                for obj in response.get('Contents', []):
                    backups.append({
                        "name": obj['Key'],
                        "size": obj['Size'],
                        "last_modified": obj['LastModified'].isoformat(),
                        "type": config_name
                    })
            
            except Exception as e:
                self.logger.error(f"Failed to list backups for {config_name}: {e}")
        
        return sorted(backups, key=lambda x: x['last_modified'], reverse=True)


# Example usage
if __name__ == "__main__":
    dr_manager = DisasterRecoveryManager(
        primary_kubeconfig="/path/to/primary-kubeconfig",
        dr_kubeconfig="/path/to/dr-kubeconfig"
    )
    
    # Create backup configurations
    etcd_backup = BackupConfig(
        name="etcd-backup",
        schedule="02:00",
        retention_days=30,
        storage_location="k8s-backups",
        notification_webhook="https://hooks.slack.com/services/..."
    )
    
    dr_manager.create_backup_config(etcd_backup)
    
    # Create disaster recovery plan
    dr_plan = DisasterRecoveryPlan(
        name="primary-failover",
        disaster_types=[DisasterType.CLUSTER_FAILURE, DisasterType.REGION_OUTAGE],
        recovery_strategy=RecoveryStrategy.FAILOVER,
        rto_minutes=15,
        rpo_minutes=5,
        primary_region="us-west-2",
        dr_region="us-east-1",
        automated_failover=True,
        notification_channels=["https://hooks.slack.com/services/..."]
    )
    
    dr_manager.create_dr_plan(dr_plan)
    
    # Simulate disaster detection
    disaster_id = dr_manager.detect_disaster(
        DisasterType.CLUSTER_FAILURE,
        "Primary cluster nodes are unresponsive",
        ["web-app", "api-service", "database"]
    )
    
    print(f"Disaster detected: {disaster_id}")
    print(json.dumps(dr_manager.get_disaster_status(disaster_id), indent=2))
```

### Disaster Recovery Best Practices

1. **Regular Testing**: Test disaster recovery procedures regularly
2. **Automated Backups**: Implement automated backup schedules
3. **Multi-Region Setup**: Deploy across multiple regions for high availability
4. **Monitoring**: Implement comprehensive monitoring and alerting
5. **Documentation**: Maintain detailed runbooks and procedures
6. **RTO/RPO Targets**: Define and measure recovery objectives
7. **Data Encryption**: Encrypt backups and data in transit
8. **Access Control**: Implement strict access controls for DR procedures
9. **Communication Plan**: Establish clear communication channels during disasters
10. **Post-Incident Review**: Conduct thorough post-incident analysis

## Q13: How do you implement and manage Kubernetes operators and custom resources?
**Difficulty: Expert**

**Answer:**

Kubernetes operators extend the Kubernetes API to manage complex, stateful applications by encoding operational knowledge into software. They use custom resources and controllers to automate deployment, scaling, backup, and recovery operations.

### Custom Resource Definition (CRD)

```yaml
# crd/database-crd.yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databases.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              engine:
                type: string
                enum: ["mysql", "postgresql", "mongodb"]
              version:
                type: string
              replicas:
                type: integer
                minimum: 1
                maximum: 10
              storage:
                type: object
                properties:
                  size:
                    type: string
                  storageClass:
                    type: string
                required:
                - size
              backup:
                type: object
                properties:
                  enabled:
                    type: boolean
                  schedule:
                    type: string
                  retention:
                    type: string
              monitoring:
                type: object
                properties:
                  enabled:
                    type: boolean
                  prometheus:
                    type: boolean
            required:
            - engine
            - version
            - replicas
            - storage
          status:
            type: object
            properties:
              phase:
                type: string
                enum: ["Pending", "Creating", "Running", "Updating", "Deleting", "Failed"]
              conditions:
                type: array
                items:
                  type: object
                  properties:
                    type:
                      type: string
                    status:
                      type: string
                    lastTransitionTime:
                      type: string
                      format: date-time
                    reason:
                      type: string
                    message:
                      type: string
              replicas:
                type: integer
              readyReplicas:
                type: integer
              endpoint:
                type: string
              backupStatus:
                type: object
                properties:
                  lastBackup:
                    type: string
                    format: date-time
                  nextBackup:
                    type: string
                    format: date-time
                  status:
                    type: string
    additionalPrinterColumns:
    - name: Engine
      type: string
      jsonPath: .spec.engine
    - name: Version
      type: string
      jsonPath: .spec.version
    - name: Replicas
      type: integer
      jsonPath: .spec.replicas
    - name: Status
      type: string
      jsonPath: .status.phase
    - name: Age
      type: date
      jsonPath: .metadata.creationTimestamp
  scope: Namespaced
  names:
    plural: databases
    singular: database
    kind: Database
    shortNames:
    - db

---
# crd/backup-crd.yaml
apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: databasebackups.example.com
spec:
  group: example.com
  versions:
  - name: v1
    served: true
    storage: true
    schema:
      openAPIV3Schema:
        type: object
        properties:
          spec:
            type: object
            properties:
              databaseRef:
                type: object
                properties:
                  name:
                    type: string
                  namespace:
                    type: string
                required:
                - name
              type:
                type: string
                enum: ["full", "incremental"]
              storageLocation:
                type: string
              encryption:
                type: object
                properties:
                  enabled:
                    type: boolean
                  keyRef:
                    type: object
                    properties:
                      name:
                        type: string
                      key:
                        type: string
            required:
            - databaseRef
            - type
            - storageLocation
          status:
            type: object
            properties:
              phase:
                type: string
                enum: ["Pending", "Running", "Completed", "Failed"]
              startTime:
                type: string
                format: date-time
              completionTime:
                type: string
                format: date-time
              backupSize:
                type: string
              location:
                type: string
              error:
                type: string
    additionalPrinterColumns:
    - name: Database
      type: string
      jsonPath: .spec.databaseRef.name
    - name: Type
      type: string
      jsonPath: .spec.type
    - name: Status
      type: string
      jsonPath: .status.phase
    - name: Size
      type: string
      jsonPath: .status.backupSize
    - name: Age
      type: date
      jsonPath: .metadata.creationTimestamp
  scope: Namespaced
  names:
    plural: databasebackups
    singular: databasebackup
    kind: DatabaseBackup
    shortNames:
    - dbbackup
```

### Operator Implementation

```python
#!/usr/bin/env python3
"""
Kubernetes Database Operator
"""

import asyncio
import json
import logging
import yaml
import kopf
import kubernetes
from typing import Dict, Any, Optional, List
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum
import subprocess
import tempfile
import os
from pathlib import Path

class DatabaseEngine(Enum):
    MYSQL = "mysql"
    POSTGRESQL = "postgresql"
    MONGODB = "mongodb"

class DatabasePhase(Enum):
    PENDING = "Pending"
    CREATING = "Creating"
    RUNNING = "Running"
    UPDATING = "Updating"
    DELETING = "Deleting"
    FAILED = "Failed"

@dataclass
class DatabaseSpec:
    engine: str
    version: str
    replicas: int
    storage: Dict[str, Any]
    backup: Optional[Dict[str, Any]] = None
    monitoring: Optional[Dict[str, Any]] = None

class DatabaseOperator:
    def __init__(self):
        # Initialize Kubernetes client
        kubernetes.config.load_incluster_config()
        self.v1 = kubernetes.client.CoreV1Api()
        self.apps_v1 = kubernetes.client.AppsV1Api()
        self.custom_api = kubernetes.client.CustomObjectsApi()
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Database templates
        self.templates = {
            DatabaseEngine.MYSQL: self._get_mysql_template,
            DatabaseEngine.POSTGRESQL: self._get_postgresql_template,
            DatabaseEngine.MONGODB: self._get_mongodb_template
        }
    
    def _get_mysql_template(self, spec: DatabaseSpec, name: str, namespace: str) -> Dict:
        """
        Generate MySQL deployment template
        """
        return {
            "statefulset": {
                "apiVersion": "apps/v1",
                "kind": "StatefulSet",
                "metadata": {
                    "name": f"{name}-mysql",
                    "namespace": namespace,
                    "labels": {
                        "app": name,
                        "component": "database",
                        "engine": "mysql"
                    }
                },
                "spec": {
                    "serviceName": f"{name}-mysql-headless",
                    "replicas": spec.replicas,
                    "selector": {
                        "matchLabels": {
                            "app": name,
                            "component": "database"
                        }
                    },
                    "template": {
                        "metadata": {
                            "labels": {
                                "app": name,
                                "component": "database",
                                "engine": "mysql"
                            }
                        },
                        "spec": {
                            "containers": [{
                                "name": "mysql",
                                "image": f"mysql:{spec.version}",
                                "env": [
                                    {
                                        "name": "MYSQL_ROOT_PASSWORD",
                                        "valueFrom": {
                                            "secretKeyRef": {
                                                "name": f"{name}-mysql-secret",
                                                "key": "root-password"
                                            }
                                        }
                                    },
                                    {
                                        "name": "MYSQL_DATABASE",
                                        "value": "app"
                                    },
                                    {
                                        "name": "MYSQL_USER",
                                        "value": "app"
                                    },
                                    {
                                        "name": "MYSQL_PASSWORD",
                                        "valueFrom": {
                                            "secretKeyRef": {
                                                "name": f"{name}-mysql-secret",
                                                "key": "user-password"
                                            }
                                        }
                                    }
                                ],
                                "ports": [{
                                    "containerPort": 3306,
                                    "name": "mysql"
                                }],
                                "volumeMounts": [{
                                    "name": "data",
                                    "mountPath": "/var/lib/mysql"
                                }],
                                "livenessProbe": {
                                    "exec": {
                                        "command": [
                                            "mysqladmin",
                                            "ping",
                                            "-h",
                                            "localhost"
                                        ]
                                    },
                                    "initialDelaySeconds": 30,
                                    "periodSeconds": 10
                                },
                                "readinessProbe": {
                                    "exec": {
                                        "command": [
                                            "mysql",
                                            "-h",
                                            "127.0.0.1",
                                            "-e",
                                            "SELECT 1"
                                        ]
                                    },
                                    "initialDelaySeconds": 5,
                                    "periodSeconds": 2
                                }
                            }]
                        }
                    },
                    "volumeClaimTemplates": [{
                        "metadata": {
                            "name": "data"
                        },
                        "spec": {
                            "accessModes": ["ReadWriteOnce"],
                            "storageClassName": spec.storage.get("storageClass"),
                            "resources": {
                                "requests": {
                                    "storage": spec.storage["size"]
                                }
                            }
                        }
                    }]
                }
            },
            "service": {
                "apiVersion": "v1",
                "kind": "Service",
                "metadata": {
                    "name": f"{name}-mysql",
                    "namespace": namespace
                },
                "spec": {
                    "selector": {
                        "app": name,
                        "component": "database"
                    },
                    "ports": [{
                        "port": 3306,
                        "targetPort": 3306,
                        "name": "mysql"
                    }],
                    "type": "ClusterIP"
                }
            },
            "headless_service": {
                "apiVersion": "v1",
                "kind": "Service",
                "metadata": {
                    "name": f"{name}-mysql-headless",
                    "namespace": namespace
                },
                "spec": {
                    "selector": {
                        "app": name,
                        "component": "database"
                    },
                    "ports": [{
                        "port": 3306,
                        "targetPort": 3306,
                        "name": "mysql"
                    }],
                    "clusterIP": "None"
                }
            },
            "secret": {
                "apiVersion": "v1",
                "kind": "Secret",
                "metadata": {
                    "name": f"{name}-mysql-secret",
                    "namespace": namespace
                },
                "type": "Opaque",
                "data": {
                    "root-password": "cm9vdHBhc3N3b3Jk",  # base64 encoded 'rootpassword'
                    "user-password": "dXNlcnBhc3N3b3Jk"   # base64 encoded 'userpassword'
                }
            }
        }
    
    def _get_postgresql_template(self, spec: DatabaseSpec, name: str, namespace: str) -> Dict:
        """
        Generate PostgreSQL deployment template
        """
        return {
            "statefulset": {
                "apiVersion": "apps/v1",
                "kind": "StatefulSet",
                "metadata": {
                    "name": f"{name}-postgresql",
                    "namespace": namespace,
                    "labels": {
                        "app": name,
                        "component": "database",
                        "engine": "postgresql"
                    }
                },
                "spec": {
                    "serviceName": f"{name}-postgresql-headless",
                    "replicas": spec.replicas,
                    "selector": {
                        "matchLabels": {
                            "app": name,
                            "component": "database"
                        }
                    },
                    "template": {
                        "metadata": {
                            "labels": {
                                "app": name,
                                "component": "database",
                                "engine": "postgresql"
                            }
                        },
                        "spec": {
                            "containers": [{
                                "name": "postgresql",
                                "image": f"postgres:{spec.version}",
                                "env": [
                                    {
                                        "name": "POSTGRES_DB",
                                        "value": "app"
                                    },
                                    {
                                        "name": "POSTGRES_USER",
                                        "value": "app"
                                    },
                                    {
                                        "name": "POSTGRES_PASSWORD",
                                        "valueFrom": {
                                            "secretKeyRef": {
                                                "name": f"{name}-postgresql-secret",
                                                "key": "password"
                                            }
                                        }
                                    },
                                    {
                                        "name": "PGDATA",
                                        "value": "/var/lib/postgresql/data/pgdata"
                                    }
                                ],
                                "ports": [{
                                    "containerPort": 5432,
                                    "name": "postgresql"
                                }],
                                "volumeMounts": [{
                                    "name": "data",
                                    "mountPath": "/var/lib/postgresql/data"
                                }],
                                "livenessProbe": {
                                    "exec": {
                                        "command": [
                                            "pg_isready",
                                            "-U",
                                            "app",
                                            "-d",
                                            "app"
                                        ]
                                    },
                                    "initialDelaySeconds": 30,
                                    "periodSeconds": 10
                                },
                                "readinessProbe": {
                                    "exec": {
                                        "command": [
                                            "pg_isready",
                                            "-U",
                                            "app",
                                            "-d",
                                            "app"
                                        ]
                                    },
                                    "initialDelaySeconds": 5,
                                    "periodSeconds": 2
                                }
                            }]
                        }
                    },
                    "volumeClaimTemplates": [{
                        "metadata": {
                            "name": "data"
                        },
                        "spec": {
                            "accessModes": ["ReadWriteOnce"],
                            "storageClassName": spec.storage.get("storageClass"),
                            "resources": {
                                "requests": {
                                    "storage": spec.storage["size"]
                                }
                            }
                        }
                    }]
                }
            },
            # Service and Secret definitions similar to MySQL...
        }
    
    def _get_mongodb_template(self, spec: DatabaseSpec, name: str, namespace: str) -> Dict:
        """
        Generate MongoDB deployment template
        """
        # Implementation for MongoDB template
        return {}
    
    async def create_database_resources(self, spec: DatabaseSpec, name: str, namespace: str) -> Dict:
        """
        Create database resources based on engine type
        """
        engine = DatabaseEngine(spec.engine)
        template_func = self.templates[engine]
        resources = template_func(spec, name, namespace)
        
        created_resources = []
        
        try:
            # Create Secret
            if "secret" in resources:
                secret = await self._create_secret(resources["secret"])
                created_resources.append(secret)
            
            # Create Services
            if "service" in resources:
                service = await self._create_service(resources["service"])
                created_resources.append(service)
            
            if "headless_service" in resources:
                headless_service = await self._create_service(resources["headless_service"])
                created_resources.append(headless_service)
            
            # Create StatefulSet
            if "statefulset" in resources:
                statefulset = await self._create_statefulset(resources["statefulset"])
                created_resources.append(statefulset)
            
            return {
                "status": "success",
                "resources": created_resources
            }
        
        except Exception as e:
            self.logger.error(f"Failed to create database resources: {e}")
            # Cleanup created resources
            await self._cleanup_resources(created_resources)
            raise
    
    async def _create_secret(self, secret_spec: Dict) -> Dict:
        """
        Create Kubernetes Secret
        """
        try:
            result = self.v1.create_namespaced_secret(
                namespace=secret_spec["metadata"]["namespace"],
                body=secret_spec
            )
            return {
                "kind": "Secret",
                "name": result.metadata.name,
                "namespace": result.metadata.namespace
            }
        except kubernetes.client.exceptions.ApiException as e:
            if e.status == 409:  # Already exists
                return {
                    "kind": "Secret",
                    "name": secret_spec["metadata"]["name"],
                    "namespace": secret_spec["metadata"]["namespace"]
                }
            raise
    
    async def _create_service(self, service_spec: Dict) -> Dict:
        """
        Create Kubernetes Service
        """
        try:
            result = self.v1.create_namespaced_service(
                namespace=service_spec["metadata"]["namespace"],
                body=service_spec
            )
            return {
                "kind": "Service",
                "name": result.metadata.name,
                "namespace": result.metadata.namespace
            }
        except kubernetes.client.exceptions.ApiException as e:
            if e.status == 409:  # Already exists
                return {
                    "kind": "Service",
                    "name": service_spec["metadata"]["name"],
                    "namespace": service_spec["metadata"]["namespace"]
                }
            raise
    
    async def _create_statefulset(self, statefulset_spec: Dict) -> Dict:
        """
        Create Kubernetes StatefulSet
        """
        try:
            result = self.apps_v1.create_namespaced_stateful_set(
                namespace=statefulset_spec["metadata"]["namespace"],
                body=statefulset_spec
            )
            return {
                "kind": "StatefulSet",
                "name": result.metadata.name,
                "namespace": result.metadata.namespace
            }
        except kubernetes.client.exceptions.ApiException as e:
            if e.status == 409:  # Already exists
                return {
                    "kind": "StatefulSet",
                    "name": statefulset_spec["metadata"]["name"],
                    "namespace": statefulset_spec["metadata"]["namespace"]
                }
            raise
    
    async def _cleanup_resources(self, resources: List[Dict]) -> None:
        """
        Cleanup created resources on failure
        """
        for resource in reversed(resources):  # Delete in reverse order
            try:
                if resource["kind"] == "StatefulSet":
                    self.apps_v1.delete_namespaced_stateful_set(
                        name=resource["name"],
                        namespace=resource["namespace"]
                    )
                elif resource["kind"] == "Service":
                    self.v1.delete_namespaced_service(
                        name=resource["name"],
                        namespace=resource["namespace"]
                    )
                elif resource["kind"] == "Secret":
                    self.v1.delete_namespaced_secret(
                        name=resource["name"],
                        namespace=resource["namespace"]
                    )
            except Exception as e:
                self.logger.warning(f"Failed to cleanup resource {resource}: {e}")
    
    async def update_database_status(self, name: str, namespace: str, status: Dict) -> None:
        """
        Update database custom resource status
        """
        try:
            # Get current resource
            current = self.custom_api.get_namespaced_custom_object(
                group="example.com",
                version="v1",
                namespace=namespace,
                plural="databases",
                name=name
            )
            
            # Update status
            current["status"] = status
            
            # Patch the resource
            self.custom_api.patch_namespaced_custom_object_status(
                group="example.com",
                version="v1",
                namespace=namespace,
                plural="databases",
                name=name,
                body=current
            )
        
        except Exception as e:
            self.logger.error(f"Failed to update database status: {e}")
    
    async def check_database_health(self, name: str, namespace: str, engine: str) -> Dict:
        """
        Check database health and return status
        """
        try:
            # Get StatefulSet status
            statefulset_name = f"{name}-{engine}"
            statefulset = self.apps_v1.read_namespaced_stateful_set(
                name=statefulset_name,
                namespace=namespace
            )
            
            ready_replicas = statefulset.status.ready_replicas or 0
            replicas = statefulset.spec.replicas
            
            if ready_replicas == replicas:
                phase = DatabasePhase.RUNNING.value
            elif ready_replicas > 0:
                phase = DatabasePhase.UPDATING.value
            else:
                phase = DatabasePhase.CREATING.value
            
            # Get service endpoint
            service_name = f"{name}-{engine}"
            service = self.v1.read_namespaced_service(
                name=service_name,
                namespace=namespace
            )
            
            endpoint = f"{service_name}.{namespace}.svc.cluster.local"
            
            return {
                "phase": phase,
                "replicas": replicas,
                "readyReplicas": ready_replicas,
                "endpoint": endpoint,
                "conditions": [{
                    "type": "Ready",
                    "status": "True" if ready_replicas == replicas else "False",
                    "lastTransitionTime": datetime.now().isoformat(),
                    "reason": "DatabaseReady" if ready_replicas == replicas else "DatabaseNotReady",
                    "message": f"{ready_replicas}/{replicas} replicas ready"
                }]
            }
        
        except Exception as e:
            self.logger.error(f"Failed to check database health: {e}")
            return {
                "phase": DatabasePhase.FAILED.value,
                "conditions": [{
                    "type": "Ready",
                    "status": "False",
                    "lastTransitionTime": datetime.now().isoformat(),
                    "reason": "HealthCheckFailed",
                    "message": str(e)
                }]
            }

# Initialize operator
operator = DatabaseOperator()

# Kopf handlers for Database CRD
@kopf.on.create('example.com', 'v1', 'databases')
async def create_database(spec, name, namespace, logger, **kwargs):
    """
    Handle Database creation
    """
    logger.info(f"Creating database: {name} in namespace: {namespace}")
    
    try:
        # Update status to Creating
        await operator.update_database_status(name, namespace, {
            "phase": DatabasePhase.CREATING.value
        })
        
        # Parse spec
        database_spec = DatabaseSpec(
            engine=spec['engine'],
            version=spec['version'],
            replicas=spec['replicas'],
            storage=spec['storage'],
            backup=spec.get('backup'),
            monitoring=spec.get('monitoring')
        )
        
        # Create database resources
        result = await operator.create_database_resources(database_spec, name, namespace)
        
        # Update status to Running
        status = await operator.check_database_health(name, namespace, database_spec.engine)
        await operator.update_database_status(name, namespace, status)
        
        logger.info(f"Database created successfully: {name}")
        return {"message": f"Database {name} created successfully"}
    
    except Exception as e:
        logger.error(f"Failed to create database {name}: {e}")
        await operator.update_database_status(name, namespace, {
            "phase": DatabasePhase.FAILED.value,
            "conditions": [{
                "type": "Ready",
                "status": "False",
                "lastTransitionTime": datetime.now().isoformat(),
                "reason": "CreationFailed",
                "message": str(e)
            }]
        })
        raise

@kopf.on.update('example.com', 'v1', 'databases')
async def update_database(spec, name, namespace, logger, **kwargs):
    """
    Handle Database updates
    """
    logger.info(f"Updating database: {name} in namespace: {namespace}")
    
    try:
        # Update status to Updating
        await operator.update_database_status(name, namespace, {
            "phase": DatabasePhase.UPDATING.value
        })
        
        # Parse spec
        database_spec = DatabaseSpec(
            engine=spec['engine'],
            version=spec['version'],
            replicas=spec['replicas'],
            storage=spec['storage'],
            backup=spec.get('backup'),
            monitoring=spec.get('monitoring')
        )
        
        # Update StatefulSet replicas if changed
        statefulset_name = f"{name}-{database_spec.engine}"
        statefulset = operator.apps_v1.read_namespaced_stateful_set(
            name=statefulset_name,
            namespace=namespace
        )
        
        if statefulset.spec.replicas != database_spec.replicas:
            statefulset.spec.replicas = database_spec.replicas
            operator.apps_v1.patch_namespaced_stateful_set(
                name=statefulset_name,
                namespace=namespace,
                body=statefulset
            )
        
        # Check health and update status
        status = await operator.check_database_health(name, namespace, database_spec.engine)
        await operator.update_database_status(name, namespace, status)
        
        logger.info(f"Database updated successfully: {name}")
        return {"message": f"Database {name} updated successfully"}
    
    except Exception as e:
        logger.error(f"Failed to update database {name}: {e}")
        await operator.update_database_status(name, namespace, {
            "phase": DatabasePhase.FAILED.value
        })
        raise

@kopf.on.delete('example.com', 'v1', 'databases')
async def delete_database(spec, name, namespace, logger, **kwargs):
    """
    Handle Database deletion
    """
    logger.info(f"Deleting database: {name} in namespace: {namespace}")
    
    try:
        # Update status to Deleting
        await operator.update_database_status(name, namespace, {
            "phase": DatabasePhase.DELETING.value
        })
        
        engine = spec['engine']
        
        # Delete StatefulSet
        try:
            operator.apps_v1.delete_namespaced_stateful_set(
                name=f"{name}-{engine}",
                namespace=namespace
            )
        except kubernetes.client.exceptions.ApiException as e:
            if e.status != 404:
                raise
        
        # Delete Services
        for service_name in [f"{name}-{engine}", f"{name}-{engine}-headless"]:
            try:
                operator.v1.delete_namespaced_service(
                    name=service_name,
                    namespace=namespace
                )
            except kubernetes.client.exceptions.ApiException as e:
                if e.status != 404:
                    raise
        
        # Delete Secret
        try:
            operator.v1.delete_namespaced_secret(
                name=f"{name}-{engine}-secret",
                namespace=namespace
            )
        except kubernetes.client.exceptions.ApiException as e:
            if e.status != 404:
                raise
        
        logger.info(f"Database deleted successfully: {name}")
        return {"message": f"Database {name} deleted successfully"}
    
    except Exception as e:
        logger.error(f"Failed to delete database {name}: {e}")
        raise

@kopf.timer('example.com', 'v1', 'databases', interval=60)
async def monitor_database(spec, name, namespace, logger, **kwargs):
    """
    Periodic health monitoring
    """
    try:
        engine = spec['engine']
        status = await operator.check_database_health(name, namespace, engine)
        await operator.update_database_status(name, namespace, status)
    
    except Exception as e:
        logger.warning(f"Health check failed for database {name}: {e}")

# Backup operator handlers
@kopf.on.create('example.com', 'v1', 'databasebackups')
async def create_backup(spec, name, namespace, logger, **kwargs):
    """
    Handle DatabaseBackup creation
    """
    logger.info(f"Creating backup: {name} in namespace: {namespace}")
    
    try:
        # Implementation for backup creation
        # This would involve creating a Job that performs the backup
        pass
    
    except Exception as e:
        logger.error(f"Failed to create backup {name}: {e}")
        raise

if __name__ == "__main__":
    # Run the operator
    kopf.run()
```

### Operator Deployment

```yaml
# operator/operator-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: database-operator
  namespace: database-operator-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: database-operator
  template:
    metadata:
      labels:
        app: database-operator
    spec:
      serviceAccountName: database-operator
      containers:
      - name: operator
        image: registry.example.com/database-operator:v1.0.0
        env:
        - name: KOPF_LOG_LEVEL
          value: "INFO"
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        securityContext:
          allowPrivilegeEscalation: false
          readOnlyRootFilesystem: true
          runAsNonRoot: true
          runAsUser: 1000

---
# operator/rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: database-operator
  namespace: database-operator-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: database-operator
rules:
- apiGroups: [""]
  resources: ["pods", "services", "secrets", "configmaps", "persistentvolumeclaims"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["apps"]
  resources: ["deployments", "statefulsets", "replicasets"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["batch"]
  resources: ["jobs", "cronjobs"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["example.com"]
  resources: ["databases", "databasebackups"]
  verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
- apiGroups: ["example.com"]
  resources: ["databases/status", "databasebackups/status"]
  verbs: ["get", "update", "patch"]
- apiGroups: ["apiextensions.k8s.io"]
  resources: ["customresourcedefinitions"]
  verbs: ["get", "list", "watch"]

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: database-operator
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: database-operator
subjects:
- kind: ServiceAccount
  name: database-operator
  namespace: database-operator-system
```

### Custom Resource Examples

```yaml
# examples/mysql-database.yaml
apiVersion: example.com/v1
kind: Database
metadata:
  name: my-mysql-db
  namespace: production
spec:
  engine: mysql
  version: "8.0"
  replicas: 3
  storage:
    size: "100Gi"
    storageClass: "fast-ssd"
  backup:
    enabled: true
    schedule: "0 2 * * *"
    retention: "30d"
  monitoring:
    enabled: true
    prometheus: true

---
# examples/postgresql-database.yaml
apiVersion: example.com/v1
kind: Database
metadata:
  name: my-postgres-db
  namespace: development
spec:
  engine: postgresql
  version: "15"
  replicas: 1
  storage:
    size: "50Gi"
    storageClass: "standard"
  backup:
    enabled: true
    schedule: "0 3 * * *"
    retention: "7d"
  monitoring:
    enabled: false

---
# examples/database-backup.yaml
apiVersion: example.com/v1
kind: DatabaseBackup
metadata:
  name: mysql-backup-20231201
  namespace: production
spec:
  databaseRef:
    name: my-mysql-db
    namespace: production
  type: full
  storageLocation: "s3://my-backups/mysql/"
  encryption:
    enabled: true
    keyRef:
      name: backup-encryption-key
      key: key
```

### Operator Best Practices

1. **Idempotent Operations**: Ensure all operations are idempotent
2. **Status Reporting**: Always update custom resource status
3. **Error Handling**: Implement comprehensive error handling
4. **Resource Cleanup**: Clean up resources on deletion
5. **Health Monitoring**: Implement periodic health checks
6. **Validation**: Validate custom resource specifications
7. **Security**: Follow security best practices for RBAC
8. **Testing**: Implement unit and integration tests
9. **Logging**: Provide detailed logging for debugging
10. **Documentation**: Document custom resources and operator behavior

## Q14: How do you implement multi-cluster Kubernetes management and federation?
**Difficulty: Expert**

**Answer:**

Multi-cluster Kubernetes management involves orchestrating and managing multiple Kubernetes clusters across different environments, regions, or cloud providers. This approach provides high availability, disaster recovery, workload distribution, and compliance with data locality requirements.

### Cluster API (CAPI) Implementation

```yaml
# cluster-api/cluster-template.yaml
apiVersion: cluster.x-k8s.io/v1beta1
kind: Cluster
metadata:
  name: production-cluster
  namespace: default
spec:
  clusterNetwork:
    pods:
      cidrBlocks:
      - 192.168.0.0/16
    services:
      cidrBlocks:
      - 10.128.0.0/12
  infrastructureRef:
    apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
    kind: AWSCluster
    name: production-cluster
  controlPlaneRef:
    kind: KubeadmControlPlane
    apiVersion: controlplane.cluster.x-k8s.io/v1beta1
    name: production-cluster-control-plane

---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSCluster
metadata:
  name: production-cluster
  namespace: default
spec:
  region: us-west-2
  sshKeyName: cluster-api-key
  networkSpec:
    vpc:
      availabilityZoneUsageLimit: 3
      availabilityZoneSelection: Ordered
    subnets:
    - availabilityZone: us-west-2a
      cidrBlock: 10.0.0.0/24
      isPublic: true
    - availabilityZone: us-west-2b
      cidrBlock: 10.0.1.0/24
      isPublic: true
    - availabilityZone: us-west-2c
      cidrBlock: 10.0.2.0/24
      isPublic: true
    - availabilityZone: us-west-2a
      cidrBlock: 10.0.3.0/24
      isPublic: false
    - availabilityZone: us-west-2b
      cidrBlock: 10.0.4.0/24
      isPublic: false
    - availabilityZone: us-west-2c
      cidrBlock: 10.0.5.0/24
      isPublic: false

---
apiVersion: controlplane.cluster.x-k8s.io/v1beta1
kind: KubeadmControlPlane
metadata:
  name: production-cluster-control-plane
  namespace: default
spec:
  replicas: 3
  machineTemplate:
    infrastructureRef:
      kind: AWSMachineTemplate
      apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
      name: production-cluster-control-plane
  kubeadmConfigSpec:
    initConfiguration:
      nodeRegistration:
        kubeletExtraArgs:
          cloud-provider: aws
    clusterConfiguration:
      apiServer:
        extraArgs:
          cloud-provider: aws
      controllerManager:
        extraArgs:
          cloud-provider: aws
    joinConfiguration:
      nodeRegistration:
        kubeletExtraArgs:
          cloud-provider: aws
  version: v1.28.0

---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSMachineTemplate
metadata:
  name: production-cluster-control-plane
  namespace: default
spec:
  template:
    spec:
      instanceType: m5.large
      iamInstanceProfile: control-plane.cluster-api-provider-aws.sigs.k8s.io
      sshKeyName: cluster-api-key

---
apiVersion: cluster.x-k8s.io/v1beta1
kind: MachineDeployment
metadata:
  name: production-cluster-md-0
  namespace: default
spec:
  clusterName: production-cluster
  replicas: 3
  selector:
    matchLabels:
      cluster.x-k8s.io/cluster-name: production-cluster
      cluster.x-k8s.io/deployment-name: production-cluster-md-0
  template:
    metadata:
      labels:
        cluster.x-k8s.io/cluster-name: production-cluster
        cluster.x-k8s.io/deployment-name: production-cluster-md-0
    spec:
      clusterName: production-cluster
      version: v1.28.0
      bootstrap:
        configRef:
          name: production-cluster-md-0
          apiVersion: bootstrap.cluster.x-k8s.io/v1beta1
          kind: KubeadmConfigTemplate
      infrastructureRef:
        name: production-cluster-md-0
        apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
        kind: AWSMachineTemplate

---
apiVersion: infrastructure.cluster.x-k8s.io/v1beta1
kind: AWSMachineTemplate
metadata:
  name: production-cluster-md-0
  namespace: default
spec:
  template:
    spec:
      instanceType: m5.xlarge
      iamInstanceProfile: nodes.cluster-api-provider-aws.sigs.k8s.io
      sshKeyName: cluster-api-key

---
apiVersion: bootstrap.cluster.x-k8s.io/v1beta1
kind: KubeadmConfigTemplate
metadata:
  name: production-cluster-md-0
  namespace: default
spec:
  template:
    spec:
      joinConfiguration:
        nodeRegistration:
          kubeletExtraArgs:
            cloud-provider: aws
```

### Multi-Cluster Management Implementation

```python
#!/usr/bin/env python3
"""
Multi-Cluster Kubernetes Management System
"""

import asyncio
import json
import logging
import yaml
import kubernetes
from typing import Dict, Any, List, Optional, Tuple
from datetime import datetime, timedelta
from dataclasses import dataclass, field
from enum import Enum
import subprocess
import tempfile
import os
from pathlib import Path
import base64
import hashlib
from concurrent.futures import ThreadPoolExecutor, as_completed

class ClusterStatus(Enum):
    HEALTHY = "Healthy"
    DEGRADED = "Degraded"
    UNHEALTHY = "Unhealthy"
    UNKNOWN = "Unknown"

class DeploymentStrategy(Enum):
    ROLLING = "Rolling"
    BLUE_GREEN = "BlueGreen"
    CANARY = "Canary"
    ALL_AT_ONCE = "AllAtOnce"

@dataclass
class ClusterConfig:
    name: str
    endpoint: str
    region: str
    provider: str
    kubeconfig_path: str
    context: str
    labels: Dict[str, str] = field(default_factory=dict)
    annotations: Dict[str, str] = field(default_factory=dict)
    priority: int = 100
    capacity: Dict[str, Any] = field(default_factory=dict)

@dataclass
class ApplicationConfig:
    name: str
    namespace: str
    manifests: List[str]
    target_clusters: List[str]
    strategy: DeploymentStrategy
    health_checks: List[Dict[str, Any]] = field(default_factory=list)
    dependencies: List[str] = field(default_factory=list)
    rollback_on_failure: bool = True

class MultiClusterManager:
    def __init__(self, config_path: str = None):
        self.clusters: Dict[str, ClusterConfig] = {}
        self.cluster_clients: Dict[str, kubernetes.client.ApiClient] = {}
        self.applications: Dict[str, ApplicationConfig] = {}
        
        # Setup logging
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)
        
        # Load configuration
        if config_path:
            self.load_configuration(config_path)
        
        # Initialize thread pool for concurrent operations
        self.executor = ThreadPoolExecutor(max_workers=10)
    
    def load_configuration(self, config_path: str) -> None:
        """
        Load multi-cluster configuration from file
        """
        try:
            with open(config_path, 'r') as f:
                config = yaml.safe_load(f)
            
            # Load cluster configurations
            for cluster_config in config.get('clusters', []):
                cluster = ClusterConfig(**cluster_config)
                self.clusters[cluster.name] = cluster
                self._initialize_cluster_client(cluster)
            
            # Load application configurations
            for app_config in config.get('applications', []):
                app = ApplicationConfig(**app_config)
                self.applications[app.name] = app
            
            self.logger.info(f"Loaded configuration for {len(self.clusters)} clusters and {len(self.applications)} applications")
        
        except Exception as e:
            self.logger.error(f"Failed to load configuration: {e}")
            raise
    
    def _initialize_cluster_client(self, cluster: ClusterConfig) -> None:
        """
        Initialize Kubernetes client for a cluster
        """
        try:
            # Load kubeconfig for the cluster
            config = kubernetes.config.load_kube_config(
                config_file=cluster.kubeconfig_path,
                context=cluster.context
            )
            
            # Create API client
            api_client = kubernetes.client.ApiClient()
            self.cluster_clients[cluster.name] = api_client
            
            self.logger.info(f"Initialized client for cluster: {cluster.name}")
        
        except Exception as e:
            self.logger.error(f"Failed to initialize client for cluster {cluster.name}: {e}")
    
    async def get_cluster_status(self, cluster_name: str) -> Dict[str, Any]:
        """
        Get comprehensive status of a cluster
        """
        try:
            cluster = self.clusters[cluster_name]
            client = self.cluster_clients[cluster_name]
            
            # Create API instances
            v1 = kubernetes.client.CoreV1Api(client)
            apps_v1 = kubernetes.client.AppsV1Api(client)
            metrics_v1beta1 = kubernetes.client.CustomObjectsApi(client)
            
            # Get cluster info
            version_info = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                lambda: v1.get_code().version_info
            )
            
            # Get node status
            nodes = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                lambda: v1.list_node()
            )
            
            node_status = {
                "total": len(nodes.items),
                "ready": 0,
                "not_ready": 0,
                "unknown": 0
            }
            
            for node in nodes.items:
                for condition in node.status.conditions:
                    if condition.type == "Ready":
                        if condition.status == "True":
                            node_status["ready"] += 1
                        elif condition.status == "False":
                            node_status["not_ready"] += 1
                        else:
                            node_status["unknown"] += 1
                        break
            
            # Get namespace count
            namespaces = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                lambda: v1.list_namespace()
            )
            
            # Get pod status
            pods = await asyncio.get_event_loop().run_in_executor(
                self.executor,
                lambda: v1.list_pod_for_all_namespaces()
            )
            
            pod_status = {
                "total": len(pods.items),
                "running": 0,
                "pending": 0,
                "failed": 0,
                "succeeded": 0
            }
            
            for pod in pods.items:
                phase = pod.status.phase.lower()
                if phase in pod_status:
                    pod_status[phase] += 1
            
            # Determine overall cluster health
            health_score = 0
            if node_status["total"] > 0:
                health_score = (node_status["ready"] / node_status["total"]) * 100
            
            if health_score >= 90:
                status = ClusterStatus.HEALTHY
            elif health_score >= 70:
                status = ClusterStatus.DEGRADED
            elif health_score > 0:
                status = ClusterStatus.UNHEALTHY
            else:
                status = ClusterStatus.UNKNOWN
            
            return {
                "cluster_name": cluster_name,
                "status": status.value,
                "health_score": health_score,
                "kubernetes_version": version_info.git_version,
                "region": cluster.region,
                "provider": cluster.provider,
                "nodes": node_status,
                "namespaces": len(namespaces.items),
                "pods": pod_status,
                "last_updated": datetime.now().isoformat()
            }
        
        except Exception as e:
            self.logger.error(f"Failed to get status for cluster {cluster_name}: {e}")
            return {
                "cluster_name": cluster_name,
                "status": ClusterStatus.UNKNOWN.value,
                "error": str(e),
                "last_updated": datetime.now().isoformat()
            }
    
    async def get_all_cluster_status(self) -> List[Dict[str, Any]]:
        """
        Get status of all managed clusters
        """
        tasks = []
        for cluster_name in self.clusters.keys():
            task = asyncio.create_task(self.get_cluster_status(cluster_name))
            tasks.append(task)
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        cluster_statuses = []
        for result in results:
            if isinstance(result, Exception):
                self.logger.error(f"Failed to get cluster status: {result}")
            else:
                cluster_statuses.append(result)
        
        return cluster_statuses
    
    async def deploy_application(self, app_name: str, target_clusters: List[str] = None) -> Dict[str, Any]:
        """
        Deploy application to specified clusters
        """
        try:
            if app_name not in self.applications:
                raise ValueError(f"Application {app_name} not found")
            
            app = self.applications[app_name]
            clusters_to_deploy = target_clusters or app.target_clusters
            
            self.logger.info(f"Starting deployment of {app_name} to clusters: {clusters_to_deploy}")
            
            deployment_results = []
            
            if app.strategy == DeploymentStrategy.ROLLING:
                # Deploy to clusters one by one
                for cluster_name in clusters_to_deploy:
                    result = await self._deploy_to_cluster(app, cluster_name)
                    deployment_results.append(result)
                    
                    if not result["success"] and app.rollback_on_failure:
                        self.logger.error(f"Deployment failed on {cluster_name}, initiating rollback")
                        await self._rollback_application(app_name, [cluster_name])
                        break
            
            elif app.strategy == DeploymentStrategy.ALL_AT_ONCE:
                # Deploy to all clusters simultaneously
                tasks = []
                for cluster_name in clusters_to_deploy:
                    task = asyncio.create_task(self._deploy_to_cluster(app, cluster_name))
                    tasks.append(task)
                
                results = await asyncio.gather(*tasks, return_exceptions=True)
                
                for result in results:
                    if isinstance(result, Exception):
                        deployment_results.append({
                            "cluster": "unknown",
                            "success": False,
                            "error": str(result)
                        })
                    else:
                        deployment_results.append(result)
            
            elif app.strategy == DeploymentStrategy.CANARY:
                # Deploy to a subset of clusters first
                canary_clusters = clusters_to_deploy[:max(1, len(clusters_to_deploy) // 3)]
                remaining_clusters = clusters_to_deploy[len(canary_clusters):]
                
                # Deploy to canary clusters
                for cluster_name in canary_clusters:
                    result = await self._deploy_to_cluster(app, cluster_name)
                    deployment_results.append(result)
                    
                    if not result["success"]:
                        self.logger.error(f"Canary deployment failed on {cluster_name}")
                        return {
                            "application": app_name,
                            "strategy": app.strategy.value,
                            "success": False,
                            "results": deployment_results
                        }
                
                # Wait for health checks
                await asyncio.sleep(30)  # Wait for canary to stabilize
                
                # Check canary health
                canary_healthy = await self._check_application_health(app, canary_clusters)
                
                if canary_healthy:
                    # Deploy to remaining clusters
                    for cluster_name in remaining_clusters:
                        result = await self._deploy_to_cluster(app, cluster_name)
                        deployment_results.append(result)
                else:
                    self.logger.error("Canary deployment health check failed")
                    await self._rollback_application(app_name, canary_clusters)
                    return {
                        "application": app_name,
                        "strategy": app.strategy.value,
                        "success": False,
                        "results": deployment_results,
                        "error": "Canary health check failed"
                    }
            
            success = all(result["success"] for result in deployment_results)
            
            return {
                "application": app_name,
                "strategy": app.strategy.value,
                "success": success,
                "results": deployment_results,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            self.logger.error(f"Failed to deploy application {app_name}: {e}")
            return {
                "application": app_name,
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    async def _deploy_to_cluster(self, app: ApplicationConfig, cluster_name: str) -> Dict[str, Any]:
        """
        Deploy application to a specific cluster
        """
        try:
            self.logger.info(f"Deploying {app.name} to cluster {cluster_name}")
            
            client = self.cluster_clients[cluster_name]
            
            # Create namespace if it doesn't exist
            v1 = kubernetes.client.CoreV1Api(client)
            try:
                await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    lambda: v1.create_namespace(
                        body=kubernetes.client.V1Namespace(
                            metadata=kubernetes.client.V1ObjectMeta(name=app.namespace)
                        )
                    )
                )
            except kubernetes.client.exceptions.ApiException as e:
                if e.status != 409:  # Ignore if namespace already exists
                    raise
            
            # Apply manifests
            applied_resources = []
            for manifest_path in app.manifests:
                with open(manifest_path, 'r') as f:
                    manifests = yaml.safe_load_all(f)
                
                for manifest in manifests:
                    if manifest is None:
                        continue
                    
                    # Apply manifest to cluster
                    result = await self._apply_manifest(client, manifest, app.namespace)
                    applied_resources.append(result)
            
            # Wait for deployment to be ready
            await self._wait_for_deployment_ready(client, app.name, app.namespace)
            
            return {
                "cluster": cluster_name,
                "success": True,
                "resources": applied_resources,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            self.logger.error(f"Failed to deploy to cluster {cluster_name}: {e}")
            return {
                "cluster": cluster_name,
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    async def _apply_manifest(self, client: kubernetes.client.ApiClient, manifest: Dict, namespace: str) -> Dict[str, Any]:
        """
        Apply a Kubernetes manifest to a cluster
        """
        try:
            api_version = manifest.get('apiVersion', '')
            kind = manifest.get('kind', '')
            
            # Ensure namespace is set
            if 'metadata' not in manifest:
                manifest['metadata'] = {}
            if 'namespace' not in manifest['metadata'] and kind != 'Namespace':
                manifest['metadata']['namespace'] = namespace
            
            # Determine the appropriate API client
            if api_version.startswith('apps/'):
                api_client = kubernetes.client.AppsV1Api(client)
            elif api_version == 'v1':
                api_client = kubernetes.client.CoreV1Api(client)
            elif api_version.startswith('extensions/'):
                api_client = kubernetes.client.ExtensionsV1beta1Api(client)
            else:
                # Use dynamic client for custom resources
                api_client = kubernetes.client.CustomObjectsApi(client)
            
            # Apply the manifest
            if kind == 'Deployment':
                try:
                    result = api_client.create_namespaced_deployment(
                        namespace=namespace,
                        body=manifest
                    )
                except kubernetes.client.exceptions.ApiException as e:
                    if e.status == 409:  # Already exists, update instead
                        result = api_client.patch_namespaced_deployment(
                            name=manifest['metadata']['name'],
                            namespace=namespace,
                            body=manifest
                        )
                    else:
                        raise
            elif kind == 'Service':
                try:
                    result = api_client.create_namespaced_service(
                        namespace=namespace,
                        body=manifest
                    )
                except kubernetes.client.exceptions.ApiException as e:
                    if e.status == 409:  # Already exists, update instead
                        result = api_client.patch_namespaced_service(
                            name=manifest['metadata']['name'],
                            namespace=namespace,
                            body=manifest
                        )
                    else:
                        raise
            # Add more resource types as needed
            
            return {
                "kind": kind,
                "name": manifest['metadata']['name'],
                "namespace": namespace,
                "status": "applied"
            }
        
        except Exception as e:
            self.logger.error(f"Failed to apply manifest {kind}/{manifest.get('metadata', {}).get('name', 'unknown')}: {e}")
            return {
                "kind": kind,
                "name": manifest.get('metadata', {}).get('name', 'unknown'),
                "namespace": namespace,
                "status": "failed",
                "error": str(e)
            }
    
    async def _wait_for_deployment_ready(self, client: kubernetes.client.ApiClient, app_name: str, namespace: str, timeout: int = 300) -> None:
        """
        Wait for deployment to be ready
        """
        apps_v1 = kubernetes.client.AppsV1Api(client)
        start_time = datetime.now()
        
        while (datetime.now() - start_time).seconds < timeout:
            try:
                deployment = await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    lambda: apps_v1.read_namespaced_deployment(
                        name=app_name,
                        namespace=namespace
                    )
                )
                
                if (deployment.status.ready_replicas and 
                    deployment.status.ready_replicas == deployment.spec.replicas):
                    self.logger.info(f"Deployment {app_name} is ready")
                    return
                
                await asyncio.sleep(10)
            
            except Exception as e:
                self.logger.warning(f"Error checking deployment status: {e}")
                await asyncio.sleep(10)
        
        raise TimeoutError(f"Deployment {app_name} did not become ready within {timeout} seconds")
    
    async def _check_application_health(self, app: ApplicationConfig, clusters: List[str]) -> bool:
        """
        Check application health across clusters
        """
        try:
            health_results = []
            
            for cluster_name in clusters:
                client = self.cluster_clients[cluster_name]
                
                # Run health checks
                for health_check in app.health_checks:
                    check_type = health_check.get('type', 'http')
                    
                    if check_type == 'http':
                        # Implement HTTP health check
                        result = await self._http_health_check(client, health_check, app.namespace)
                        health_results.append(result)
                    elif check_type == 'tcp':
                        # Implement TCP health check
                        result = await self._tcp_health_check(client, health_check, app.namespace)
                        health_results.append(result)
            
            # Return True if all health checks pass
            return all(health_results)
        
        except Exception as e:
            self.logger.error(f"Health check failed: {e}")
            return False
    
    async def _http_health_check(self, client: kubernetes.client.ApiClient, health_check: Dict, namespace: str) -> bool:
        """
        Perform HTTP health check
        """
        # Implementation for HTTP health check
        # This would involve creating a temporary pod to perform the check
        return True  # Simplified for example
    
    async def _tcp_health_check(self, client: kubernetes.client.ApiClient, health_check: Dict, namespace: str) -> bool:
        """
        Perform TCP health check
        """
        # Implementation for TCP health check
        return True  # Simplified for example
    
    async def _rollback_application(self, app_name: str, clusters: List[str]) -> Dict[str, Any]:
        """
        Rollback application deployment
        """
        try:
            self.logger.info(f"Rolling back {app_name} on clusters: {clusters}")
            
            rollback_results = []
            
            for cluster_name in clusters:
                client = self.cluster_clients[cluster_name]
                apps_v1 = kubernetes.client.AppsV1Api(client)
                
                try:
                    # Get deployment
                    deployment = await asyncio.get_event_loop().run_in_executor(
                        self.executor,
                        lambda: apps_v1.read_namespaced_deployment(
                            name=app_name,
                            namespace=self.applications[app_name].namespace
                        )
                    )
                    
                    # Rollback to previous revision
                    rollback_body = {
                        "spec": {
                            "rollbackTo": {
                                "revision": 0  # Previous revision
                            }
                        }
                    }
                    
                    await asyncio.get_event_loop().run_in_executor(
                        self.executor,
                        lambda: apps_v1.patch_namespaced_deployment(
                            name=app_name,
                            namespace=self.applications[app_name].namespace,
                            body=rollback_body
                        )
                    )
                    
                    rollback_results.append({
                        "cluster": cluster_name,
                        "success": True
                    })
                
                except Exception as e:
                    self.logger.error(f"Failed to rollback on cluster {cluster_name}: {e}")
                    rollback_results.append({
                        "cluster": cluster_name,
                        "success": False,
                        "error": str(e)
                    })
            
            return {
                "application": app_name,
                "rollback_results": rollback_results,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            self.logger.error(f"Failed to rollback application {app_name}: {e}")
            return {
                "application": app_name,
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    async def sync_resources_across_clusters(self, resource_type: str, source_cluster: str, target_clusters: List[str]) -> Dict[str, Any]:
        """
        Sync resources from source cluster to target clusters
        """
        try:
            self.logger.info(f"Syncing {resource_type} from {source_cluster} to {target_clusters}")
            
            source_client = self.cluster_clients[source_cluster]
            
            # Get resources from source cluster
            if resource_type == 'configmaps':
                v1 = kubernetes.client.CoreV1Api(source_client)
                resources = await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    lambda: v1.list_config_map_for_all_namespaces()
                )
            elif resource_type == 'secrets':
                v1 = kubernetes.client.CoreV1Api(source_client)
                resources = await asyncio.get_event_loop().run_in_executor(
                    self.executor,
                    lambda: v1.list_secret_for_all_namespaces()
                )
            else:
                raise ValueError(f"Unsupported resource type: {resource_type}")
            
            sync_results = []
            
            # Sync to target clusters
            for target_cluster in target_clusters:
                target_client = self.cluster_clients[target_cluster]
                
                for resource in resources.items:
                    try:
                        # Clean up resource metadata
                        resource.metadata.resource_version = None
                        resource.metadata.uid = None
                        resource.metadata.creation_timestamp = None
                        
                        # Apply to target cluster
                        if resource_type == 'configmaps':
                            v1_target = kubernetes.client.CoreV1Api(target_client)
                            try:
                                await asyncio.get_event_loop().run_in_executor(
                                    self.executor,
                                    lambda: v1_target.create_namespaced_config_map(
                                        namespace=resource.metadata.namespace,
                                        body=resource
                                    )
                                )
                            except kubernetes.client.exceptions.ApiException as e:
                                if e.status == 409:  # Already exists
                                    await asyncio.get_event_loop().run_in_executor(
                                        self.executor,
                                        lambda: v1_target.patch_namespaced_config_map(
                                            name=resource.metadata.name,
                                            namespace=resource.metadata.namespace,
                                            body=resource
                                        )
                                    )
                                else:
                                    raise
                        
                        sync_results.append({
                            "cluster": target_cluster,
                            "resource": f"{resource.metadata.namespace}/{resource.metadata.name}",
                            "success": True
                        })
                    
                    except Exception as e:
                        sync_results.append({
                            "cluster": target_cluster,
                            "resource": f"{resource.metadata.namespace}/{resource.metadata.name}",
                            "success": False,
                            "error": str(e)
                        })
            
            return {
                "resource_type": resource_type,
                "source_cluster": source_cluster,
                "target_clusters": target_clusters,
                "results": sync_results,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            self.logger.error(f"Failed to sync resources: {e}")
            return {
                "resource_type": resource_type,
                "success": False,
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def generate_cluster_report(self) -> Dict[str, Any]:
        """
        Generate comprehensive cluster report
        """
        try:
            report = {
                "generated_at": datetime.now().isoformat(),
                "total_clusters": len(self.clusters),
                "clusters": [],
                "applications": [],
                "summary": {
                    "healthy_clusters": 0,
                    "degraded_clusters": 0,
                    "unhealthy_clusters": 0,
                    "total_nodes": 0,
                    "total_pods": 0
                }
            }
            
            # Get cluster statuses
            cluster_statuses = asyncio.run(self.get_all_cluster_status())
            
            for status in cluster_statuses:
                report["clusters"].append(status)
                
                # Update summary
                if status.get("status") == ClusterStatus.HEALTHY.value:
                    report["summary"]["healthy_clusters"] += 1
                elif status.get("status") == ClusterStatus.DEGRADED.value:
                    report["summary"]["degraded_clusters"] += 1
                else:
                    report["summary"]["unhealthy_clusters"] += 1
                
                if "nodes" in status:
                    report["summary"]["total_nodes"] += status["nodes"].get("total", 0)
                
                if "pods" in status:
                    report["summary"]["total_pods"] += status["pods"].get("total", 0)
            
            # Add application information
            for app_name, app in self.applications.items():
                report["applications"].append({
                    "name": app_name,
                    "namespace": app.namespace,
                    "target_clusters": app.target_clusters,
                    "strategy": app.strategy.value
                })
            
            return report
        
        except Exception as e:
            self.logger.error(f"Failed to generate cluster report: {e}")
            return {
                "error": str(e),
                "generated_at": datetime.now().isoformat()
            }

# Example usage
if __name__ == "__main__":
    async def main():
        # Initialize multi-cluster manager
        manager = MultiClusterManager("multi-cluster-config.yaml")
        
        # Get cluster statuses
        statuses = await manager.get_all_cluster_status()
        print("Cluster Statuses:")
        for status in statuses:
            print(f"  {status['cluster_name']}: {status['status']}")
        
        # Deploy application
        result = await manager.deploy_application("my-app")
        print(f"\nDeployment Result: {result['success']}")
        
        # Generate report
        report = manager.generate_cluster_report()
        print(f"\nCluster Report: {report['summary']}")
    
    asyncio.run(main())
```

### ArgoCD GitOps Multi-Cluster Setup

```yaml
# argocd/application-set.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: multi-cluster-apps
  namespace: argocd
spec:
  generators:
  - clusters:
      selector:
        matchLabels:
          environment: production
  - git:
      repoURL: https://github.com/company/k8s-manifests
      revision: HEAD
      directories:
      - path: apps/*
  template:
    metadata:
      name: '{{path.basename}}-{{name}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/company/k8s-manifests
        targetRevision: HEAD
        path: '{{path}}'
      destination:
        server: '{{server}}'
        namespace: '{{path.basename}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
        syncOptions:
        - CreateNamespace=true
        retry:
          limit: 5
          backoff:
            duration: 5s
            factor: 2
            maxDuration: 3m

---
# argocd/cluster-secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: production-cluster-1
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: cluster
    environment: production
    region: us-west-2
type: Opaque
stringData:
  name: production-cluster-1
  server: https://prod-cluster-1.example.com
  config: |
    {
      "bearerToken": "<token>",
      "tlsClientConfig": {
        "insecure": false,
        "caData": "<ca-data>"
      }
    }

---
# argocd/multi-cluster-rbac.yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: argocd-manager
  namespace: kube-system

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: argocd-manager-role
rules:
- apiGroups:
  - '*'
  resources:
  - '*'
  verbs:
  - '*'
- nonResourceURLs:
  - '*'
  verbs:
  - '*'

---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd-manager-role-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: argocd-manager-role
subjects:
- kind: ServiceAccount
  name: argocd-manager
  namespace: kube-system
```

### Flux Multi-Cluster Configuration

```yaml
# flux/clusters/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- ../../base
- cluster-config.yaml
patchesStrategicMerge:
- cluster-patches.yaml

---
# flux/clusters/production/cluster-config.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-config
  namespace: flux-system
data:
  cluster.name: "production"
  cluster.region: "us-west-2"
  cluster.environment: "production"

---
# flux/base/apps/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
- web-app.yaml
- api-app.yaml
- database.yaml

---
# flux/base/apps/web-app.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: default
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web
        image: nginx:1.21
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "250m"
          limits:
            memory: "128Mi"
            cpu: "500m"
```

### Multi-Cluster Best Practices

1. **Cluster Standardization**: Maintain consistent cluster configurations
2. **Network Connectivity**: Ensure secure connectivity between clusters
3. **Identity Management**: Implement centralized identity and access management
4. **Monitoring and Observability**: Deploy comprehensive monitoring across clusters
5. **Disaster Recovery**: Implement cross-cluster backup and recovery strategies
6. **Security**: Apply consistent security policies across all clusters
7. **Cost Management**: Monitor and optimize costs across multiple clusters
8. **Compliance**: Ensure all clusters meet regulatory requirements
9. **Automation**: Automate cluster provisioning and management
10. **Documentation**: Maintain comprehensive documentation for all clusters

---

```yaml
# Complete Kubernetes cluster architecture example
# This demonstrates a production-ready setup with multiple components

# === CONTROL PLANE COMPONENTS ===

# 1. API Server - Central management component
apiVersion: v1
kind: ConfigMap
metadata:
  name: kube-apiserver-config
  namespace: kube-system
data:
  config.yaml: |
    apiVersion: kubeadm.k8s.io/v1beta3
    kind: ClusterConfiguration
    kubernetesVersion: v1.28.0
    controlPlaneEndpoint: "k8s-api.example.com:6443"
    networking:
      serviceSubnet: "10.96.0.0/12"
      podSubnet: "10.244.0.0/16"
    etcd:
      external:
        endpoints:
        - "https://etcd1.example.com:2379"
        - "https://etcd2.example.com:2379"
        - "https://etcd3.example.com:2379"
        caFile: "/etc/kubernetes/pki/etcd/ca.crt"
        certFile: "/etc/kubernetes/pki/apiserver-etcd-client.crt"
        keyFile: "/etc/kubernetes/pki/apiserver-etcd-client.key"
    apiServer:
      extraArgs:
        audit-log-maxage: "30"
        audit-log-maxbackup: "10"
        audit-log-maxsize: "100"
        audit-log-path: "/var/log/audit.log"
        enable-admission-plugins: "NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota,PodSecurityPolicy"
      certSANs:
      - "k8s-api.example.com"
      - "10.0.0.100"
      - "127.0.0.1"
    controllerManager:
      extraArgs:
        bind-address: "0.0.0.0"
        secure-port: "10257"
    scheduler:
      extraArgs:
        bind-address: "0.0.0.0"
        secure-port: "10259"

---
# 2. etcd cluster configuration
apiVersion: v1
kind: Pod
metadata:
  name: etcd
  namespace: kube-system
  labels:
    component: etcd
    tier: control-plane
spec:
  containers:
  - name: etcd
    image: k8s.gcr.io/etcd:3.5.9-0
    command:
    - etcd
    - --advertise-client-urls=https://10.0.0.10:2379
    - --cert-file=/etc/kubernetes/pki/etcd/server.crt
    - --client-cert-auth=true
    - --data-dir=/var/lib/etcd
    - --initial-advertise-peer-urls=https://10.0.0.10:2380
    - --initial-cluster=etcd1=https://10.0.0.10:2380,etcd2=https://10.0.0.11:2380,etcd3=https://10.0.0.12:2380
    - --key-file=/etc/kubernetes/pki/etcd/server.key
    - --listen-client-urls=https://127.0.0.1:2379,https://10.0.0.10:2379
    - --listen-metrics-urls=http://127.0.0.1:2381
    - --listen-peer-urls=https://10.0.0.10:2380
    - --name=etcd1
    - --peer-cert-file=/etc/kubernetes/pki/etcd/peer.crt
    - --peer-client-cert-auth=true
    - --peer-key-file=/etc/kubernetes/pki/etcd/peer.key
    - --peer-trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    - --snapshot-count=10000
    - --trusted-ca-file=/etc/kubernetes/pki/etcd/ca.crt
    resources:
      requests:
        cpu: 100m
        memory: 100Mi
    volumeMounts:
    - mountPath: /var/lib/etcd
      name: etcd-data
    - mountPath: /etc/kubernetes/pki/etcd
      name: etcd-certs
  volumes:
  - hostPath:
      path: /var/lib/etcd
      type: DirectoryOrCreate
    name: etcd-data
  - hostPath:
      path: /etc/kubernetes/pki/etcd
      type: DirectoryOrCreate
    name: etcd-certs

---
# === NODE COMPONENTS ===

# 3. kubelet configuration
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
address: "0.0.0.0"
port: 10250
readOnlyPort: 0
serializeImagePulls: false
staticPodPath: "/etc/kubernetes/manifests"
clusterDomain: "cluster.local"
clusterDNS:
- "10.96.0.10"
runtimeRequestTimeout: "15m"
runcOptions:
  systemd-cgroup: true
featureGates:
  RotateKubeletServerCertificate: true
serverTLSBootstrap: true
authentication:
  x509:
    clientCAFile: "/etc/kubernetes/pki/ca.crt"
  webhook:
    enabled: true
    cacheTTL: "2m0s"
  anonymous:
    enabled: false
authorization:
  mode: Webhook
  webhook:
    cacheAuthorizedTTL: "5m0s"
    cacheUnauthorizedTTL: "30s"
evictionHard:
  imagefs.available: "15%"
  memory.available: "100Mi"
  nodefs.available: "10%"
  nodefs.inodesFree: "5%"
evictionSoft:
  imagefs.available: "20%"
  memory.available: "200Mi"
  nodefs.available: "15%"
  nodefs.inodesFree: "10%"
evictionSoftGracePeriod:
  imagefs.available: "2m"
  memory.available: "1m30s"
  nodefs.available: "2m"
  nodefs.inodesFree: "2m"
maxPods: 110

---
# 4. kube-proxy configuration
apiVersion: kubeproxy.config.k8s.io/v1alpha1
kind: KubeProxyConfiguration
bindAddress: "0.0.0.0"
clientConnection:
  kubeconfig: "/var/lib/kube-proxy/kubeconfig.conf"
clusterCIDR: "10.244.0.0/16"
mode: "ipvs"
ipvs:
  scheduler: "rr"
  syncPeriod: "30s"
  minSyncPeriod: "5s"
iptables:
  syncPeriod: "30s"
  minSyncPeriod: "5s"
conntrack:
  maxPerCore: 32768
  min: 131072
  tcpEstablishedTimeout: "24h0m0s"
  tcpCloseWaitTimeout: "1h0m0s"

---
# === NETWORKING COMPONENTS ===

# 5. CNI Plugin (Calico example)
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: calico-node
  namespace: kube-system
  labels:
    k8s-app: calico-node
spec:
  selector:
    matchLabels:
      k8s-app: calico-node
  updateStrategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
  template:
    metadata:
      labels:
        k8s-app: calico-node
    spec:
      nodeSelector:
        kubernetes.io/os: linux
      hostNetwork: true
      tolerations:
      - effect: NoSchedule
        operator: Exists
      - key: CriticalAddonsOnly
        operator: Exists
      - effect: NoExecute
        operator: Exists
      serviceAccountName: calico-node
      terminationGracePeriodSeconds: 0
      priorityClassName: system-node-critical
      initContainers:
      - name: upgrade-ipam
        image: calico/cni:v3.26.1
        command: ["/opt/cni/bin/calico-ipam", "-upgrade"]
        envFrom:
        - configMapRef:
            name: kubernetes-services-endpoint
            optional: true
        env:
        - name: KUBERNETES_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: CALICO_NETWORKING_BACKEND
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: calico_backend
        volumeMounts:
        - mountPath: /var/lib/cni/networks
          name: host-local-net-dir
        - mountPath: /host/opt/cni/bin
          name: cni-bin-dir
        securityContext:
          privileged: true
      - name: install-cni
        image: calico/cni:v3.26.1
        command: ["/opt/cni/bin/install"]
        envFrom:
        - configMapRef:
            name: kubernetes-services-endpoint
            optional: true
        env:
        - name: CNI_CONF_NAME
          value: "10-calico.conflist"
        - name: CNI_NETWORK_CONFIG
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: cni_network_config
        - name: KUBERNETES_NODE_NAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: CNI_MTU
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: veth_mtu
        - name: SLEEP
          value: "false"
        volumeMounts:
        - mountPath: /host/opt/cni/bin
          name: cni-bin-dir
        - mountPath: /host/etc/cni/net.d
          name: cni-net-dir
        securityContext:
          privileged: true
      containers:
      - name: calico-node
        image: calico/node:v3.26.1
        envFrom:
        - configMapRef:
            name: kubernetes-services-endpoint
            optional: true
        env:
        - name: DATASTORE_TYPE
          value: "kubernetes"
        - name: WAIT_FOR_DATASTORE
          value: "true"
        - name: NODENAME
          valueFrom:
            fieldRef:
              fieldPath: spec.nodeName
        - name: CALICO_NETWORKING_BACKEND
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: calico_backend
        - name: CLUSTER_TYPE
          value: "k8s,bgp"
        - name: IP
          value: "autodetect"
        - name: CALICO_IPV4POOL_IPIP
          value: "Always"
        - name: CALICO_IPV4POOL_VXLAN
          value: "Never"
        - name: FELIX_IPINIPMTU
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: veth_mtu
        - name: FELIX_VXLANMTU
          valueFrom:
            configMapKeyRef:
              name: calico-config
              key: veth_mtu
        - name: CALICO_IPV4POOL_CIDR
          value: "10.244.0.0/16"
        - name: CALICO_DISABLE_FILE_LOGGING
          value: "true"
        - name: FELIX_DEFAULTENDPOINTTOHOSTACTION
          value: "ACCEPT"
        - name: FELIX_IPV6SUPPORT
          value: "false"
        - name: FELIX_HEALTHENABLED
          value: "true"
        securityContext:
          privileged: true
        resources:
          requests:
            cpu: 250m
        lifecycle:
          preStop:
            exec:
              command:
              - /bin/calico-node
              - -shutdown
        livenessProbe:
          exec:
            command:
            - /bin/calico-node
            - -felix-live
            - -bird-live
          periodSeconds: 10
          initialDelaySeconds: 10
          failureThreshold: 6
          timeoutSeconds: 10
        readinessProbe:
          exec:
            command:
            - /bin/calico-node
            - -felix-ready
            - -bird-ready
          periodSeconds: 10
          timeoutSeconds: 10
        volumeMounts:
        - mountPath: /lib/modules
          name: lib-modules
          readOnly: true
        - mountPath: /run/xtables.lock
          name: xtables-lock
        - mountPath: /var/run/calico
          name: var-run-calico
        - mountPath: /var/lib/calico
          name: var-lib-calico
        - mountPath: /var/run/nodeagent
          name: policysync
        - mountPath: /sys/fs/
          name: sysfs
        - mountPath: /var/log/calico/cni
          name: cni-log-dir
          readOnly: true
      volumes:
      - name: lib-modules
        hostPath:
          path: /lib/modules
      - name: var-run-calico
        hostPath:
          path: /var/run/calico
      - name: var-lib-calico
        hostPath:
          path: /var/lib/calico
      - name: xtables-lock
        hostPath:
          path: /run/xtables.lock
          type: FileOrCreate
      - name: sysfs
        hostPath:
          path: /sys/fs/
          type: DirectoryOrCreate
      - name: cni-bin-dir
        hostPath:
          path: /opt/cni/bin
      - name: cni-net-dir
        hostPath:
          path: /etc/cni/net.d
      - name: cni-log-dir
        hostPath:
          path: /var/log/calico/cni
      - name: host-local-net-dir
        hostPath:
          path: /var/lib/cni/networks
      - name: policysync
        hostPath:
          type: DirectoryOrCreate
          path: /var/run/nodeagent
```

**Kubernetes Components Explained:**

```bash
#!/bin/bash
# Kubernetes Cluster Management Script

# === CONTROL PLANE COMPONENTS ===

# 1. API Server
# - Central management component
# - Exposes Kubernetes API
# - Validates and configures API objects
# - Serves as frontend for cluster's shared state
echo "🔧 API Server Status:"
kubectl get componentstatus

# 2. etcd
# - Distributed key-value store
# - Stores all cluster data
# - Provides strong consistency and high availability
echo "📊 etcd Health Check:"
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  endpoint health

# 3. Controller Manager
# - Runs controller processes
# - Watches shared state and makes changes
# - Includes Node, Replication, Endpoints controllers
echo "🎮 Controller Manager Status:"
kubectl get pods -n kube-system | grep controller-manager

# 4. Scheduler
# - Assigns pods to nodes
# - Considers resource requirements, constraints
# - Makes scheduling decisions
echo "📅 Scheduler Status:"
kubectl get pods -n kube-system | grep scheduler

# === NODE COMPONENTS ===

# 5. kubelet
# - Primary node agent
# - Manages pods and containers
# - Reports node status to API server
echo "🤖 kubelet Status on all nodes:"
kubectl get nodes -o wide

# 6. kube-proxy
# - Network proxy on each node
# - Maintains network rules
# - Enables service abstraction
echo "🌐 kube-proxy Status:"
kubectl get pods -n kube-system | grep kube-proxy

# 7. Container Runtime
# - Runs containers (Docker, containerd, CRI-O)
# - Manages container lifecycle
echo "📦 Container Runtime Info:"
kubectl get nodes -o jsonpath='{.items[*].status.nodeInfo.containerRuntimeVersion}'

# === NETWORKING COMPONENTS ===

# 8. CNI Plugin
# - Container Network Interface
# - Provides pod networking
# - Examples: Calico, Flannel, Weave
echo "🔗 CNI Plugin Status:"
kubectl get pods -n kube-system | grep -E "calico|flannel|weave"

# 9. DNS (CoreDNS)
# - Provides DNS services for cluster
# - Enables service discovery
echo "🌍 DNS Status:"
kubectl get pods -n kube-system | grep coredns

# === CLUSTER INFORMATION ===

echo "\n📋 Cluster Information:"
kubectl cluster-info

echo "\n🏷️  Cluster Version:"
kubectl version --short

echo "\n📊 Node Resources:"
kubectl top nodes

echo "\n🔍 Cluster Events:"
kubectl get events --sort-by=.metadata.creationTimestamp

# === HEALTH CHECKS ===

echo "\n🏥 Component Health Checks:"

# Check API server health
echo "API Server Health:"
curl -k https://localhost:6443/healthz

# Check etcd health
echo "\netcd Health:"
ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
  --cacert=/etc/kubernetes/pki/etcd/ca.crt \
  --cert=/etc/kubernetes/pki/etcd/server.crt \
  --key=/etc/kubernetes/pki/etcd/server.key \
  endpoint status --write-out=table

# Check node readiness
echo "\nNode Readiness:"
kubectl get nodes -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.status.conditions[?(@.type=="Ready")].status}{"\n"}{end}'

# Check system pods
echo "\nSystem Pods Status:"
kubectl get pods -n kube-system --field-selector=status.phase!=Running

# === TROUBLESHOOTING COMMANDS ===

echo "\n🔧 Troubleshooting Commands:"

# View logs for system components
echo "View API server logs:"
echo "sudo journalctl -u kubelet | grep apiserver"

echo "\nView kubelet logs:"
echo "sudo journalctl -u kubelet -f"

echo "\nView container runtime logs:"
echo "sudo journalctl -u docker -f  # for Docker"
echo "sudo journalctl -u containerd -f  # for containerd"

# Check certificates
echo "\nCheck certificate expiration:"
echo "sudo kubeadm certs check-expiration"

# Cluster backup
echo "\nBackup etcd:"
echo "ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \\"
echo "  --cacert=/etc/kubernetes/pki/etcd/ca.crt \\"
echo "  --cert=/etc/kubernetes/pki/etcd/server.crt \\"
echo "  --key=/etc/kubernetes/pki/etcd/server.key \\"
echo "  snapshot save /backup/etcd-snapshot-\$(date +%Y%m%d%H%M%S).db"

# === PERFORMANCE MONITORING ===

echo "\n📈 Performance Monitoring:"

# Resource usage
kubectl top nodes
kubectl top pods --all-namespaces

# Cluster capacity
echo "\nCluster Capacity:"
kubectl describe nodes | grep -A 5 "Allocated resources"

# Network policies
echo "\nNetwork Policies:"
kubectl get networkpolicies --all-namespaces

# Storage classes
echo "\nStorage Classes:"
kubectl get storageclass

# Persistent volumes
echo "\nPersistent Volumes:"
kubectl get pv

echo "\n✅ Kubernetes cluster analysis complete!"
```

**Architecture Benefits:**

1. **High Availability**: Multiple control plane nodes
2. **Scalability**: Horizontal scaling of applications
3. **Self-healing**: Automatic restart and replacement
4. **Service Discovery**: Built-in DNS and service mesh
5. **Load Balancing**: Automatic traffic distribution
6. **Rolling Updates**: Zero-downtime deployments
7. **Resource Management**: CPU and memory limits
8. **Security**: RBAC, network policies, secrets

**Key Concepts:**
- **Declarative Configuration**: Desired state management
- **Controllers**: Reconciliation loops
- **Labels and Selectors**: Resource organization
- **Namespaces**: Multi-tenancy and isolation
- **Custom Resources**: Extensibility
- **Operators**: Application-specific controllers

---

### Q2: Explain Kubernetes networking model and how pods communicate.
**Difficulty: Medium**

**Answer:**
Kubernetes networking follows a flat network model where every pod gets its own IP address and can communicate with any other pod without NAT. This creates a simple and powerful networking abstraction.

**Kubernetes Networking Model:**

```yaml
# Complete networking example with multiple scenarios
# This demonstrates pod-to-pod, service, and ingress communication

# === POD NETWORKING ===

# 1. Basic pod with networking
apiVersion: v1
kind: Pod
metadata:
  name: frontend-pod
  namespace: production
  labels:
    app: frontend
    tier: web
    version: v1.0
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
      name: http
      protocol: TCP
    - containerPort: 443
      name: https
      protocol: TCP
    env:
    - name: BACKEND_URL
      value: "http://backend-service.production.svc.cluster.local:8080"
    resources:
      requests:
        cpu: 100m
        memory: 128Mi
      limits:
        cpu: 500m
        memory: 512Mi
    livenessProbe:
      httpGet:
        path: /health
        port: 80
      initialDelaySeconds: 30
      periodSeconds: 10
    readinessProbe:
      httpGet:
        path: /ready
        port: 80
      initialDelaySeconds: 5
      periodSeconds: 5
  - name: sidecar-proxy
    image: envoyproxy/envoy:v1.27.0
    ports:
    - containerPort: 8080
      name: proxy
    volumeMounts:
    - name: envoy-config
      mountPath: /etc/envoy
  volumes:
  - name: envoy-config
    configMap:
      name: envoy-config
  dnsPolicy: ClusterFirst
  dnsConfig:
    options:
    - name: ndots
      value: "2"
    - name: edns0

---
# 2. Multi-container pod with shared networking
apiVersion: v1
kind: Pod
metadata:
  name: backend-pod
  namespace: production
  labels:
    app: backend
    tier: api
spec:
  containers:
  - name: api-server
    image: myapp/backend:v2.1
    ports:
    - containerPort: 8080
      name: api
    env:
    - name: DATABASE_URL
      valueFrom:
        secretKeyRef:
          name: db-credentials
          key: url
    - name: REDIS_URL
      value: "redis://redis-service.production.svc.cluster.local:6379"
    volumeMounts:
    - name: app-logs
      mountPath: /var/log/app
  - name: log-shipper
    image: fluent/fluent-bit:2.1.8
    volumeMounts:
    - name: app-logs
      mountPath: /var/log/app
      readOnly: true
    - name: fluent-bit-config
      mountPath: /fluent-bit/etc
  volumes:
  - name: app-logs
    emptyDir: {}
  - name: fluent-bit-config
    configMap:
      name: fluent-bit-config

---
# === SERVICE NETWORKING ===

# 3. ClusterIP Service (internal communication)
apiVersion: v1
kind: Service
metadata:
  name: backend-service
  namespace: production
  labels:
    app: backend
spec:
  type: ClusterIP
  selector:
    app: backend
    tier: api
  ports:
  - name: api
    port: 8080
    targetPort: 8080
    protocol: TCP
  - name: metrics
    port: 9090
    targetPort: 9090
    protocol: TCP
  sessionAffinity: ClientIP
  sessionAffinityConfig:
    clientIP:
      timeoutSeconds: 10800

---
# 4. NodePort Service (external access)
apiVersion: v1
kind: Service
metadata:
  name: frontend-nodeport
  namespace: production
spec:
  type: NodePort
  selector:
    app: frontend
    tier: web
  ports:
  - name: http
    port: 80
    targetPort: 80
    nodePort: 30080
    protocol: TCP
  - name: https
    port: 443
    targetPort: 443
    nodePort: 30443
    protocol: TCP
  externalTrafficPolicy: Local

---
# 5. LoadBalancer Service (cloud provider integration)
apiVersion: v1
kind: Service
metadata:
  name: frontend-loadbalancer
  namespace: production
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: "nlb"
    service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled: "true"
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: "tcp"
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - name: http
    port: 80
    targetPort: 80
  - name: https
    port: 443
    targetPort: 443
  loadBalancerSourceRanges:
  - "10.0.0.0/8"
  - "172.16.0.0/12"
  - "192.168.0.0/16"

---
# 6. Headless Service (direct pod access)
apiVersion: v1
kind: Service
metadata:
  name: database-headless
  namespace: production
spec:
  clusterIP: None
  selector:
    app: postgres
    role: primary
  ports:
  - name: postgres
    port: 5432
    targetPort: 5432

---
# === INGRESS NETWORKING ===

# 7. Ingress Controller (NGINX)
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: app-ingress
  namespace: production
  annotations:
    kubernetes.io/ingress.class: "nginx"
    nginx.ingress.kubernetes.io/rewrite-target: /
    nginx.ingress.kubernetes.io/ssl-redirect: "true"
    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
    nginx.ingress.kubernetes.io/cors-allow-origin: "https://app.example.com"
    nginx.ingress.kubernetes.io/cors-allow-methods: "GET, POST, PUT, DELETE, OPTIONS"
    nginx.ingress.kubernetes.io/cors-allow-headers: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"
spec:
  tls:
  - hosts:
    - app.example.com
    - api.example.com
    secretName: app-tls-secret
  rules:
  - host: app.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 80
      - path: /static
        pathType: Prefix
        backend:
          service:
            name: static-files-service
            port:
              number: 80
  - host: api.example.com
    http:
      paths:
      - path: /api/v1
        pathType: Prefix
        backend:
          service:
            name: backend-service
            port:
              number: 8080
      - path: /api/v2
        pathType: Prefix
        backend:
          service:
            name: backend-v2-service
            port:
              number: 8080

---
# === NETWORK POLICIES ===

# 8. Network Policy for security
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
      tier: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - namespaceSelector:
        matchLabels:
          name: production
    - podSelector:
        matchLabels:
          app: frontend
    - podSelector:
        matchLabels:
          app: api-gateway
    ports:
    - protocol: TCP
      port: 8080
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
    ports:
    - protocol: TCP
      port: 9090
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: postgres
    ports:
    - protocol: TCP
      port: 5432
  - to:
    - podSelector:
        matchLabels:
          app: redis
    ports:
    - protocol: TCP
      port: 6379
  - to: []
    ports:
    - protocol: TCP
      port: 443
    - protocol: TCP
      port: 53
    - protocol: UDP
      port: 53

---
# 9. Service Mesh (Istio) configuration
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: backend-virtual-service
  namespace: production
spec:
  hosts:
  - backend-service
  http:
  - match:
    - headers:
        version:
          exact: v2
    route:
    - destination:
        host: backend-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: backend-service
        subset: v1
      weight: 90
    - destination:
        host: backend-service
        subset: v2
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
    retries:
      attempts: 3
      perTryTimeout: 2s

---
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: backend-destination-rule
  namespace: production
spec:
  host: backend-service
  trafficPolicy:
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 10
    loadBalancer:
      simple: LEAST_CONN
    outlierDetection:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
  subsets:
  - name: v1
    labels:
      version: v1
  - name: v2
    labels:
      version: v2
    trafficPolicy:
      connectionPool:
        tcp:
          maxConnections: 50
```

**Networking Implementation Examples:**

```go
// Go application demonstrating Kubernetes service discovery
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

type NetworkInfo struct {
	PodIP       string            `json:"podIP"`
	NodeName    string            `json:"nodeName"`
	Namespace   string            `json:"namespace"`
	ServiceName string            `json:"serviceName"`
	ClusterIP   string            `json:"clusterIP"`
	Endpoints   []string          `json:"endpoints"`
	DNSInfo     map[string]string `json:"dnsInfo"`
	Headers     map[string]string `json:"headers"`
}

type App struct {
	clientset *kubernetes.Clientset
	namespace string
	podName   string
	nodeName  string
}

func main() {
	// Initialize Kubernetes client
	config, err := rest.InClusterConfig()
	if err != nil {
		log.Fatalf("Failed to create in-cluster config: %v", err)
	}

	clientset, err := kubernetes.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create clientset: %v", err)
	}

	app := &App{
		clientset: clientset,
		namespace: getEnv("POD_NAMESPACE", "default"),
		podName:   getEnv("POD_NAME", "unknown"),
		nodeName:  getEnv("NODE_NAME", "unknown"),
	}

	// Setup routes
	r := mux.NewRouter()
	r.HandleFunc("/health", app.healthHandler).Methods("GET")
	r.HandleFunc("/network-info", app.networkInfoHandler).Methods("GET")
	r.HandleFunc("/service-discovery", app.serviceDiscoveryHandler).Methods("GET")
	r.HandleFunc("/dns-test", app.dnsTestHandler).Methods("GET")
	r.HandleFunc("/connectivity-test", app.connectivityTestHandler).Methods("GET")
	r.HandleFunc("/call-service/{service}", app.callServiceHandler).Methods("GET")

	// Start server
	port := getEnv("PORT", "8080")
	log.Printf("🚀 Server starting on port %s", port)
	log.Printf("📍 Pod: %s, Node: %s, Namespace: %s", app.podName, app.nodeName, app.namespace)

	srv := &http.Server{
		Addr:         ":" + port,
		Handler:      r,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func (app *App) healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":    "healthy",
		"timestamp": time.Now().UTC(),
		"pod":       app.podName,
		"node":      app.nodeName,
		"namespace": app.namespace,
	})
}

func (app *App) networkInfoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Get pod information
	pod, err := app.clientset.CoreV1().Pods(app.namespace).Get(
		context.TODO(), app.podName, metav1.GetOptions{},
	)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get pod info: %v", err), http.StatusInternalServerError)
		return
	}

	// Get service information
	services, err := app.clientset.CoreV1().Services(app.namespace).List(
		context.TODO(), metav1.ListOptions{},
	)
	if err != nil {
		log.Printf("Failed to list services: %v", err)
	}

	var clusterIP string
	var endpoints []string

	for _, svc := range services.Items {
		if svc.Spec.Selector != nil {
			// Check if this service selects our pod
			matches := true
			for key, value := range svc.Spec.Selector {
				if pod.Labels[key] != value {
					matches = false
					break
				}
			}
			if matches {
				clusterIP = svc.Spec.ClusterIP
				break
			}
		}
	}

	// Get endpoints
	endpointsList, err := app.clientset.CoreV1().Endpoints(app.namespace).List(
		context.TODO(), metav1.ListOptions{},
	)
	if err == nil {
		for _, ep := range endpointsList.Items {
			for _, subset := range ep.Subsets {
				for _, addr := range subset.Addresses {
					endpoints = append(endpoints, addr.IP)
				}
			}
		}
	}

	// Collect headers
	headers := make(map[string]string)
	for name, values := range r.Header {
		if len(values) > 0 {
			headers[name] = values[0]
		}
	}

	// DNS information
	dnsInfo := map[string]string{
		"cluster_domain": "cluster.local",
		"search_domains": fmt.Sprintf("%s.svc.cluster.local svc.cluster.local cluster.local", app.namespace),
		"nameserver":     "10.96.0.10", // Default CoreDNS service IP
	}

	networkInfo := NetworkInfo{
		PodIP:       pod.Status.PodIP,
		NodeName:    pod.Spec.NodeName,
		Namespace:   app.namespace,
		ServiceName: app.podName,
		ClusterIP:   clusterIP,
		Endpoints:   endpoints,
		DNSInfo:     dnsInfo,
		Headers:     headers,
	}

	json.NewEncoder(w).Encode(networkInfo)
}

func (app *App) serviceDiscoveryHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// List all services in the namespace
	services, err := app.clientset.CoreV1().Services(app.namespace).List(
		context.TODO(), metav1.ListOptions{},
	)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to list services: %v", err), http.StatusInternalServerError)
		return
	}

	serviceInfo := make(map[string]interface{})
	for _, svc := range services.Items {
		ports := make([]map[string]interface{}, 0)
		for _, port := range svc.Spec.Ports {
			ports = append(ports, map[string]interface{}{
				"name":       port.Name,
				"port":       port.Port,
				"targetPort": port.TargetPort.String(),
				"protocol":   port.Protocol,
			})
		}

		serviceInfo[svc.Name] = map[string]interface{}{
			"clusterIP": svc.Spec.ClusterIP,
			"type":      svc.Spec.Type,
			"ports":     ports,
			"selector":  svc.Spec.Selector,
			"fqdn":      fmt.Sprintf("%s.%s.svc.cluster.local", svc.Name, app.namespace),
		}
	}

	json.NewEncoder(w).Encode(serviceInfo)
}

func (app *App) dnsTestHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Test DNS resolution for common services
	testHosts := []string{
		"kubernetes.default.svc.cluster.local",
		fmt.Sprintf("backend-service.%s.svc.cluster.local", app.namespace),
		fmt.Sprintf("frontend-service.%s.svc.cluster.local", app.namespace),
		"google.com",
	}

	dnsResults := make(map[string]interface{})
	for _, host := range testHosts {
		start := time.Now()
		addrs, err := net.LookupHost(host)
		duration := time.Since(start)

		if err != nil {
			dnsResults[host] = map[string]interface{}{
				"error":    err.Error(),
				"duration": duration.String(),
			}
		} else {
			dnsResults[host] = map[string]interface{}{
				"addresses": addrs,
				"duration":  duration.String(),
			}
		}
	}

	json.NewEncoder(w).Encode(dnsResults)
}

func (app *App) connectivityTestHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// Test connectivity to various services
	testConnections := []struct {
		Name string
		Host string
		Port string
	}{
		{"Kubernetes API", "kubernetes.default.svc.cluster.local", "443"},
		{"CoreDNS", "kube-dns.kube-system.svc.cluster.local", "53"},
		{"Backend Service", fmt.Sprintf("backend-service.%s.svc.cluster.local", app.namespace), "8080"},
	}

	connectivityResults := make(map[string]interface{})
	for _, test := range testConnections {
		start := time.Now()
		conn, err := net.DialTimeout("tcp", test.Host+":"+test.Port, 5*time.Second)
		duration := time.Since(start)

		if err != nil {
			connectivityResults[test.Name] = map[string]interface{}{
				"host":     test.Host,
				"port":     test.Port,
				"status":   "failed",
				"error":    err.Error(),
				"duration": duration.String(),
			}
		} else {
			conn.Close()
			connectivityResults[test.Name] = map[string]interface{}{
				"host":     test.Host,
				"port":     test.Port,
				"status":   "success",
				"duration": duration.String(),
			}
		}
	}

	json.NewEncoder(w).Encode(connectivityResults)
}

func (app *App) callServiceHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	vars := mux.Vars(r)
	serviceName := vars["service"]

	// Construct service URL
	serviceURL := fmt.Sprintf("http://%s.%s.svc.cluster.local:8080/health", serviceName, app.namespace)

	// Make HTTP request
	client := &http.Client{
		Timeout: 10 * time.Second,
	}

	start := time.Now()
	resp, err := client.Get(serviceURL)
	duration := time.Since(start)

	result := map[string]interface{}{
		"service":  serviceName,
		"url":      serviceURL,
		"duration": duration.String(),
		"caller": map[string]string{
			"pod":       app.podName,
			"namespace": app.namespace,
			"node":      app.nodeName,
		},
	}

	if err != nil {
		result["status"] = "error"
		result["error"] = err.Error()
	} else {
		defer resp.Body.Close()
		result["status"] = "success"
		result["statusCode"] = resp.StatusCode
		result["headers"] = resp.Header

		// Read response body
		body := make([]byte, 1024)
		n, _ := resp.Body.Read(body)
		if n > 0 {
			result["body"] = string(body[:n])
		}
	}

	json.NewEncoder(w).Encode(result)
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
```

**Key Networking Principles:**

1. **Flat Network Model**: Every pod gets a unique IP
2. **No NAT Required**: Direct pod-to-pod communication
3. **Service Abstraction**: Stable endpoints for dynamic pods
4. **DNS-Based Discovery**: Automatic service resolution
5. **Network Policies**: Security through traffic control
6. **Ingress Controllers**: External traffic management
7. **Service Mesh**: Advanced traffic management and observability

**Communication Patterns:**
- **Pod-to-Pod**: Direct IP communication
- **Pod-to-Service**: Via service discovery
- **External-to-Pod**: Through ingress or load balancers
- **Cross-Namespace**: FQDN or network policies
- **Cross-Cluster**: Service mesh or federation

---

## Q15: How do you implement resource management and optimization in Kubernetes?

**Difficulty: Advanced**

**Answer:**

Kubernetes resource management involves controlling CPU, memory, and storage allocation to ensure optimal cluster performance and cost efficiency.

### Resource Requests and Limits

```yaml
# pod-with-resources.yaml
apiVersion: v1
kind: Pod
metadata:
  name: resource-demo
spec:
  containers:
  - name: app
    image: nginx:1.21
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
  - name: sidecar
    image: busybox:1.35
    command: ["sleep", "3600"]
    resources:
      requests:
        memory: "32Mi"
        cpu: "100m"
      limits:
        memory: "64Mi"
        cpu: "200m"
```

### Resource Quotas and Limit Ranges

```yaml
# namespace-quota.yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: compute-quota
  namespace: production
spec:
  hard:
    requests.cpu: "4"
    requests.memory: 8Gi
    limits.cpu: "8"
    limits.memory: 16Gi
    persistentvolumeclaims: "10"
    pods: "20"
    services: "10"
---
apiVersion: v1
kind: LimitRange
metadata:
  name: limit-range
  namespace: production
spec:
  limits:
  - default:
      cpu: "500m"
      memory: "512Mi"
    defaultRequest:
      cpu: "100m"
      memory: "128Mi"
    type: Container
  - max:
      cpu: "2"
      memory: "2Gi"
    min:
      cpu: "50m"
      memory: "64Mi"
    type: Container
```

### Quality of Service Classes

```yaml
# qos-guaranteed.yaml
apiVersion: v1
kind: Pod
metadata:
  name: qos-guaranteed
spec:
  containers:
  - name: app
    image: nginx:1.21
    resources:
      requests:
        memory: "200Mi"
        cpu: "700m"
      limits:
        memory: "200Mi"
        cpu: "700m"
---
# qos-burstable.yaml
apiVersion: v1
kind: Pod
metadata:
  name: qos-burstable
spec:
  containers:
  - name: app
    image: nginx:1.21
    resources:
      requests:
        memory: "100Mi"
        cpu: "100m"
      limits:
        memory: "200Mi"
        cpu: "500m"
---
# qos-besteffort.yaml
apiVersion: v1
kind: Pod
metadata:
  name: qos-besteffort
spec:
  containers:
  - name: app
    image: nginx:1.21
    # No resource requests or limits
```

### Python Resource Management Implementation

```python
import time
import logging
from typing import Dict, List, Optional
from kubernetes import client, config
from kubernetes.client.rest import ApiException
import yaml

class ResourceManager:
    """Kubernetes Resource Management and Optimization"""
    
    def __init__(self):
        """Initialize the Resource Manager"""
        try:
            config.load_incluster_config()
        except:
            config.load_kube_config()
        
        self.v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.metrics_v1beta1 = client.CustomObjectsApi()
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def analyze_node_resources(self) -> Dict:
        """Analyze node resource utilization"""
        try:
            nodes = self.v1.list_node()
            node_analysis = {}
            
            for node in nodes.items:
                node_name = node.metadata.name
                
                # Get node capacity and allocatable resources
                capacity = node.status.capacity
                allocatable = node.status.allocatable
                
                # Get pods running on this node
                pods = self.v1.list_pod_for_all_namespaces(
                    field_selector=f"spec.nodeName={node_name}"
                )
                
                # Calculate resource usage
                total_cpu_requests = 0
                total_memory_requests = 0
                total_cpu_limits = 0
                total_memory_limits = 0
                
                for pod in pods.items:
                    if pod.spec.containers:
                        for container in pod.spec.containers:
                            if container.resources:
                                if container.resources.requests:
                                    cpu_req = container.resources.requests.get('cpu', '0')
                                    mem_req = container.resources.requests.get('memory', '0')
                                    total_cpu_requests += self._parse_cpu(cpu_req)
                                    total_memory_requests += self._parse_memory(mem_req)
                                
                                if container.resources.limits:
                                    cpu_lim = container.resources.limits.get('cpu', '0')
                                    mem_lim = container.resources.limits.get('memory', '0')
                                    total_cpu_limits += self._parse_cpu(cpu_lim)
                                    total_memory_limits += self._parse_memory(mem_lim)
                
                node_analysis[node_name] = {
                    'capacity': {
                        'cpu': self._parse_cpu(capacity.get('cpu', '0')),
                        'memory': self._parse_memory(capacity.get('memory', '0'))
                    },
                    'allocatable': {
                        'cpu': self._parse_cpu(allocatable.get('cpu', '0')),
                        'memory': self._parse_memory(allocatable.get('memory', '0'))
                    },
                    'requests': {
                        'cpu': total_cpu_requests,
                        'memory': total_memory_requests
                    },
                    'limits': {
                        'cpu': total_cpu_limits,
                        'memory': total_memory_limits
                    },
                    'utilization': {
                        'cpu_requests': (total_cpu_requests / self._parse_cpu(allocatable.get('cpu', '1'))) * 100,
                        'memory_requests': (total_memory_requests / self._parse_memory(allocatable.get('memory', '1'))) * 100
                    },
                    'pod_count': len(pods.items)
                }
            
            return node_analysis
            
        except ApiException as e:
            self.logger.error(f"Error analyzing node resources: {e}")
            return {}
    
    def optimize_pod_resources(self, namespace: str, deployment_name: str) -> Dict:
        """Optimize pod resource allocation based on usage patterns"""
        try:
            # Get deployment
            deployment = self.apps_v1.read_namespaced_deployment(
                name=deployment_name,
                namespace=namespace
            )
            
            # Get pods for this deployment
            pods = self.v1.list_namespaced_pod(
                namespace=namespace,
                label_selector=f"app={deployment_name}"
            )
            
            recommendations = {
                'current_resources': {},
                'recommended_resources': {},
                'optimization_potential': {}
            }
            
            # Analyze current resource allocation
            for container in deployment.spec.template.spec.containers:
                container_name = container.name
                current_resources = container.resources
                
                if current_resources:
                    recommendations['current_resources'][container_name] = {
                        'requests': current_resources.requests or {},
                        'limits': current_resources.limits or {}
                    }
                
                # Get metrics for optimization (simplified)
                # In real implementation, you'd use metrics-server or Prometheus
                recommended_cpu = self._calculate_recommended_cpu(container_name, pods.items)
                recommended_memory = self._calculate_recommended_memory(container_name, pods.items)
                
                recommendations['recommended_resources'][container_name] = {
                    'requests': {
                        'cpu': f"{recommended_cpu}m",
                        'memory': f"{recommended_memory}Mi"
                    },
                    'limits': {
                        'cpu': f"{recommended_cpu * 2}m",
                        'memory': f"{recommended_memory * 1.5}Mi"
                    }
                }
            
            return recommendations
            
        except ApiException as e:
            self.logger.error(f"Error optimizing pod resources: {e}")
            return {}
    
    def create_resource_quota(self, namespace: str, quota_config: Dict) -> bool:
        """Create resource quota for namespace"""
        try:
            quota_body = client.V1ResourceQuota(
                metadata=client.V1ObjectMeta(name=f"{namespace}-quota"),
                spec=client.V1ResourceQuotaSpec(
                    hard=quota_config
                )
            )
            
            self.v1.create_namespaced_resource_quota(
                namespace=namespace,
                body=quota_body
            )
            
            self.logger.info(f"Resource quota created for namespace {namespace}")
            return True
            
        except ApiException as e:
            self.logger.error(f"Error creating resource quota: {e}")
            return False
    
    def monitor_resource_usage(self, namespace: str = None) -> Dict:
        """Monitor real-time resource usage"""
        try:
            usage_data = {
                'timestamp': time.time(),
                'cluster_summary': {},
                'namespace_usage': {},
                'pod_usage': []
            }
            
            # Get cluster-wide resource usage
            nodes = self.v1.list_node()
            total_capacity = {'cpu': 0, 'memory': 0}
            total_allocatable = {'cpu': 0, 'memory': 0}
            
            for node in nodes.items:
                capacity = node.status.capacity
                allocatable = node.status.allocatable
                
                total_capacity['cpu'] += self._parse_cpu(capacity.get('cpu', '0'))
                total_capacity['memory'] += self._parse_memory(capacity.get('memory', '0'))
                total_allocatable['cpu'] += self._parse_cpu(allocatable.get('cpu', '0'))
                total_allocatable['memory'] += self._parse_memory(allocatable.get('memory', '0'))
            
            usage_data['cluster_summary'] = {
                'total_nodes': len(nodes.items),
                'total_capacity': total_capacity,
                'total_allocatable': total_allocatable
            }
            
            # Get namespace-specific usage
            if namespace:
                namespaces = [namespace]
            else:
                ns_list = self.v1.list_namespace()
                namespaces = [ns.metadata.name for ns in ns_list.items]
            
            for ns in namespaces:
                pods = self.v1.list_namespaced_pod(namespace=ns)
                ns_usage = {'cpu_requests': 0, 'memory_requests': 0, 'pod_count': len(pods.items)}
                
                for pod in pods.items:
                    if pod.spec.containers:
                        for container in pod.spec.containers:
                            if container.resources and container.resources.requests:
                                cpu_req = container.resources.requests.get('cpu', '0')
                                mem_req = container.resources.requests.get('memory', '0')
                                ns_usage['cpu_requests'] += self._parse_cpu(cpu_req)
                                ns_usage['memory_requests'] += self._parse_memory(mem_req)
                
                usage_data['namespace_usage'][ns] = ns_usage
            
            return usage_data
            
        except ApiException as e:
            self.logger.error(f"Error monitoring resource usage: {e}")
            return {}
    
    def _parse_cpu(self, cpu_str: str) -> float:
        """Parse CPU string to millicores"""
        if not cpu_str or cpu_str == '0':
            return 0.0
        
        if cpu_str.endswith('m'):
            return float(cpu_str[:-1])
        elif cpu_str.endswith('n'):
            return float(cpu_str[:-1]) / 1000000
        else:
            return float(cpu_str) * 1000
    
    def _parse_memory(self, memory_str: str) -> float:
        """Parse memory string to MiB"""
        if not memory_str or memory_str == '0':
            return 0.0
        
        units = {
            'Ki': 1/1024, 'Mi': 1, 'Gi': 1024, 'Ti': 1024*1024,
            'K': 1/1024, 'M': 1, 'G': 1024, 'T': 1024*1024
        }
        
        for unit, multiplier in units.items():
            if memory_str.endswith(unit):
                return float(memory_str[:-len(unit)]) * multiplier
        
        # Assume bytes if no unit
        return float(memory_str) / (1024 * 1024)
    
    def _calculate_recommended_cpu(self, container_name: str, pods: List) -> int:
        """Calculate recommended CPU based on usage patterns"""
        # Simplified calculation - in real implementation, use metrics
        base_cpu = 100  # 100m base
        return base_cpu
    
    def _calculate_recommended_memory(self, container_name: str, pods: List) -> int:
        """Calculate recommended memory based on usage patterns"""
        # Simplified calculation - in real implementation, use metrics
        base_memory = 128  # 128Mi base
        return base_memory

# Example usage
if __name__ == "__main__":
    rm = ResourceManager()
    
    # Analyze node resources
    node_analysis = rm.analyze_node_resources()
    print("Node Resource Analysis:")
    for node, data in node_analysis.items():
        print(f"  {node}: CPU {data['utilization']['cpu_requests']:.1f}%, Memory {data['utilization']['memory_requests']:.1f}%")
    
    # Monitor resource usage
    usage = rm.monitor_resource_usage(namespace="default")
    print(f"\nCluster has {usage['cluster_summary']['total_nodes']} nodes")
    
    # Create resource quota
    quota_config = {
        "requests.cpu": "2",
        "requests.memory": "4Gi",
        "limits.cpu": "4",
        "limits.memory": "8Gi",
        "pods": "10"
    }
    rm.create_resource_quota("test-namespace", quota_config)
```

### Priority Classes and Node Affinity

```yaml
# priority-class.yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000
globalDefault: false
description: "High priority class for critical applications"
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: low-priority
value: 100
globalDefault: false
description: "Low priority class for batch jobs"
---
# deployment-with-priority.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: critical-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: critical-app
  template:
    metadata:
      labels:
        app: critical-app
    spec:
      priorityClassName: high-priority
      affinity:
        nodeAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
            nodeSelectorTerms:
            - matchExpressions:
              - key: node.kubernetes.io/instance-type
                operator: In
                values:
                - m5.xlarge
                - m5.2xlarge
      containers:
      - name: app
        image: critical-app:latest
        resources:
          requests:
            memory: "256Mi"
            cpu: "500m"
          limits:
            memory: "512Mi"
            cpu: "1"
```

**Resource Management Best Practices:**

1. **Right-sizing**: Regularly analyze and adjust resource requests and limits
2. **Quality of Service**: Use appropriate QoS classes for different workload types
3. **Resource Quotas**: Implement namespace-level resource quotas
4. **Priority Classes**: Use priority classes for workload scheduling
5. **Node Affinity**: Optimize pod placement based on node characteristics
6. **Monitoring**: Implement comprehensive resource monitoring
7. **Autoscaling**: Use HPA and VPA for dynamic resource management
8. **Cost Optimization**: Regular review of resource allocation vs. actual usage

---

## Q16: How do you implement advanced Kubernetes troubleshooting and debugging?

**Difficulty: Expert**

**Answer:**

Advanced Kubernetes troubleshooting requires systematic approaches to diagnose cluster, networking, storage, and application issues.

### Cluster Debugging Tools

```yaml
# debug/debug-pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: debug-toolkit
  namespace: default
spec:
  containers:
  - name: debug
    image: nicolaka/netshoot:latest
    command: ["sleep", "3600"]
    securityContext:
      capabilities:
        add:
        - NET_ADMIN
        - SYS_PTRACE
    volumeMounts:
    - name: host-proc
      mountPath: /host/proc
      readOnly: true
    - name: host-sys
      mountPath: /host/sys
      readOnly: true
    - name: host-root
      mountPath: /host
      readOnly: true
  volumes:
  - name: host-proc
    hostPath:
      path: /proc
  - name: host-sys
    hostPath:
      path: /sys
  - name: host-root
    hostPath:
      path: /
  hostNetwork: true
  hostPID: true
  restartPolicy: Never
```

### Python Debugging Framework

```python
import time
import json
import subprocess
import logging
from typing import Dict, List, Optional, Any
from kubernetes import client, config
from kubernetes.client.rest import ApiException
from datetime import datetime, timedelta
import yaml

class KubernetesDebugger:
    """Advanced Kubernetes Troubleshooting and Debugging Framework"""
    
    def __init__(self):
        """Initialize the Kubernetes Debugger"""
        try:
            config.load_incluster_config()
        except:
            config.load_kube_config()
        
        self.v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.networking_v1 = client.NetworkingV1Api()
        self.events_v1 = client.EventsV1Api()
        
        logging.basicConfig(level=logging.INFO)
        self.logger = logging.getLogger(__name__)
    
    def diagnose_pod_issues(self, namespace: str, pod_name: str) -> Dict:
        """Comprehensive pod diagnostics"""
        try:
            pod = self.v1.read_namespaced_pod(name=pod_name, namespace=namespace)
            
            diagnosis = {
                'pod_info': {
                    'name': pod.metadata.name,
                    'namespace': pod.metadata.namespace,
                    'phase': pod.status.phase,
                    'node': pod.spec.node_name,
                    'created': pod.metadata.creation_timestamp.isoformat() if pod.metadata.creation_timestamp else None
                },
                'container_status': [],
                'events': [],
                'resource_analysis': {},
                'network_analysis': {},
                'recommendations': []
            }
            
            # Analyze container statuses
            if pod.status.container_statuses:
                for container_status in pod.status.container_statuses:
                    container_info = {
                        'name': container_status.name,
                        'ready': container_status.ready,
                        'restart_count': container_status.restart_count,
                        'image': container_status.image,
                        'state': {}
                    }
                    
                    # Current state
                    if container_status.state.running:
                        container_info['state']['running'] = {
                            'started_at': container_status.state.running.started_at.isoformat() if container_status.state.running.started_at else None
                        }
                    elif container_status.state.waiting:
                        container_info['state']['waiting'] = {
                            'reason': container_status.state.waiting.reason,
                            'message': container_status.state.waiting.message
                        }
                    elif container_status.state.terminated:
                        container_info['state']['terminated'] = {
                            'exit_code': container_status.state.terminated.exit_code,
                            'reason': container_status.state.terminated.reason,
                            'message': container_status.state.terminated.message,
                            'started_at': container_status.state.terminated.started_at.isoformat() if container_status.state.terminated.started_at else None,
                            'finished_at': container_status.state.terminated.finished_at.isoformat() if container_status.state.terminated.finished_at else None
                        }
                    
                    # Last termination state
                    if container_status.last_state and container_status.last_state.terminated:
                        container_info['last_termination'] = {
                            'exit_code': container_status.last_state.terminated.exit_code,
                            'reason': container_status.last_state.terminated.reason,
                            'message': container_status.last_state.terminated.message
                        }
                    
                    diagnosis['container_status'].append(container_info)
            
            # Get recent events
            events = self.v1.list_namespaced_event(
                namespace=namespace,
                field_selector=f"involvedObject.name={pod_name}"
            )
            
            for event in events.items:
                diagnosis['events'].append({
                    'type': event.type,
                    'reason': event.reason,
                    'message': event.message,
                    'first_timestamp': event.first_timestamp.isoformat() if event.first_timestamp else None,
                    'last_timestamp': event.last_timestamp.isoformat() if event.last_timestamp else None,
                    'count': event.count
                })
            
            # Resource analysis
            diagnosis['resource_analysis'] = self._analyze_pod_resources(pod)
            
            # Network analysis
            diagnosis['network_analysis'] = self._analyze_pod_networking(pod)
            
            # Generate recommendations
            diagnosis['recommendations'] = self._generate_pod_recommendations(pod, diagnosis)
            
            return diagnosis
            
        except ApiException as e:
            self.logger.error(f"Error diagnosing pod {pod_name}: {e}")
            return {'error': str(e)}
    
    def diagnose_service_issues(self, namespace: str, service_name: str) -> Dict:
        """Diagnose service connectivity issues"""
        try:
            service = self.v1.read_namespaced_service(name=service_name, namespace=namespace)
            
            diagnosis = {
                'service_info': {
                    'name': service.metadata.name,
                    'namespace': service.metadata.namespace,
                    'type': service.spec.type,
                    'cluster_ip': service.spec.cluster_ip,
                    'ports': []
                },
                'endpoints': [],
                'selector_analysis': {},
                'connectivity_tests': [],
                'recommendations': []
            }
            
            # Service ports
            for port in service.spec.ports:
                diagnosis['service_info']['ports'].append({
                    'name': port.name,
                    'port': port.port,
                    'target_port': str(port.target_port),
                    'protocol': port.protocol
                })
            
            # Get endpoints
            try:
                endpoints = self.v1.read_namespaced_endpoints(name=service_name, namespace=namespace)
                if endpoints.subsets:
                    for subset in endpoints.subsets:
                        if subset.addresses:
                            for address in subset.addresses:
                                endpoint_info = {
                                    'ip': address.ip,
                                    'hostname': address.hostname,
                                    'node_name': address.node_name
                                }
                                if address.target_ref:
                                    endpoint_info['target'] = {
                                        'kind': address.target_ref.kind,
                                        'name': address.target_ref.name,
                                        'namespace': address.target_ref.namespace
                                    }
                                diagnosis['endpoints'].append(endpoint_info)
            except ApiException:
                diagnosis['endpoints'] = []
            
            # Analyze selector
            if service.spec.selector:
                diagnosis['selector_analysis'] = self._analyze_service_selector(
                    namespace, service.spec.selector
                )
            
            # Connectivity tests
            diagnosis['connectivity_tests'] = self._test_service_connectivity(
                namespace, service_name, service.spec.ports
            )
            
            # Generate recommendations
            diagnosis['recommendations'] = self._generate_service_recommendations(service, diagnosis)
            
            return diagnosis
            
        except ApiException as e:
            self.logger.error(f"Error diagnosing service {service_name}: {e}")
            return {'error': str(e)}
    
    def diagnose_cluster_health(self) -> Dict:
        """Comprehensive cluster health diagnosis"""
        try:
            diagnosis = {
                'cluster_info': {},
                'node_health': [],
                'system_pods': [],
                'resource_pressure': {},
                'network_health': {},
                'storage_health': {},
                'recommendations': []
            }
            
            # Cluster version info
            version_info = self.v1.get_api_resources()
            diagnosis['cluster_info'] = {
                'api_version': 'v1',
                'timestamp': datetime.now().isoformat()
            }
            
            # Node health
            nodes = self.v1.list_node()
            for node in nodes.items:
                node_info = {
                    'name': node.metadata.name,
                    'ready': False,
                    'conditions': [],
                    'capacity': node.status.capacity,
                    'allocatable': node.status.allocatable,
                    'node_info': {
                        'kernel_version': node.status.node_info.kernel_version,
                        'os_image': node.status.node_info.os_image,
                        'container_runtime_version': node.status.node_info.container_runtime_version,
                        'kubelet_version': node.status.node_info.kubelet_version
                    }
                }
                
                # Node conditions
                for condition in node.status.conditions:
                    condition_info = {
                        'type': condition.type,
                        'status': condition.status,
                        'reason': condition.reason,
                        'message': condition.message,
                        'last_transition_time': condition.last_transition_time.isoformat() if condition.last_transition_time else None
                    }
                    node_info['conditions'].append(condition_info)
                    
                    if condition.type == 'Ready' and condition.status == 'True':
                        node_info['ready'] = True
                
                diagnosis['node_health'].append(node_info)
            
            # System pods health
            system_namespaces = ['kube-system', 'kube-public', 'kube-node-lease']
            for namespace in system_namespaces:
                try:
                    pods = self.v1.list_namespaced_pod(namespace=namespace)
                    for pod in pods.items:
                        if pod.status.phase != 'Running':
                            diagnosis['system_pods'].append({
                                'name': pod.metadata.name,
                                'namespace': pod.metadata.namespace,
                                'phase': pod.status.phase,
                                'node': pod.spec.node_name,
                                'restart_count': sum(cs.restart_count for cs in pod.status.container_statuses) if pod.status.container_statuses else 0
                            })
                except ApiException:
                    continue
            
            # Resource pressure analysis
            diagnosis['resource_pressure'] = self._analyze_cluster_resource_pressure()
            
            # Network health
            diagnosis['network_health'] = self._analyze_cluster_networking()
            
            # Storage health
            diagnosis['storage_health'] = self._analyze_cluster_storage()
            
            # Generate cluster recommendations
            diagnosis['recommendations'] = self._generate_cluster_recommendations(diagnosis)
            
            return diagnosis
            
        except ApiException as e:
            self.logger.error(f"Error diagnosing cluster health: {e}")
            return {'error': str(e)}
    
    def debug_networking_issues(self, namespace: str, pod_name: str = None) -> Dict:
        """Debug networking connectivity issues"""
        try:
            debug_results = {
                'dns_resolution': {},
                'service_connectivity': {},
                'external_connectivity': {},
                'network_policies': [],
                'recommendations': []
            }
            
            # DNS resolution tests
            dns_tests = [
                'kubernetes.default.svc.cluster.local',
                'kube-dns.kube-system.svc.cluster.local',
                'google.com'
            ]
            
            for dns_target in dns_tests:
                debug_results['dns_resolution'][dns_target] = self._test_dns_resolution(
                    namespace, dns_target, pod_name
                )
            
            # Service connectivity tests
            services = self.v1.list_namespaced_service(namespace=namespace)
            for service in services.items:
                debug_results['service_connectivity'][service.metadata.name] = self._test_service_connectivity(
                    namespace, service.metadata.name, service.spec.ports, pod_name
                )
            
            # External connectivity
            external_targets = ['8.8.8.8', 'google.com']
            for target in external_targets:
                debug_results['external_connectivity'][target] = self._test_external_connectivity(
                    namespace, target, pod_name
                )
            
            # Network policies
            try:
                network_policies = self.networking_v1.list_namespaced_network_policy(namespace=namespace)
                for policy in network_policies.items:
                    debug_results['network_policies'].append({
                        'name': policy.metadata.name,
                        'pod_selector': policy.spec.pod_selector.match_labels if policy.spec.pod_selector else {},
                        'policy_types': policy.spec.policy_types,
                        'ingress_rules': len(policy.spec.ingress) if policy.spec.ingress else 0,
                        'egress_rules': len(policy.spec.egress) if policy.spec.egress else 0
                    })
            except ApiException:
                debug_results['network_policies'] = []
            
            # Generate networking recommendations
            debug_results['recommendations'] = self._generate_networking_recommendations(debug_results)
            
            return debug_results
            
        except ApiException as e:
            self.logger.error(f"Error debugging networking: {e}")
            return {'error': str(e)}
    
    def _analyze_pod_resources(self, pod) -> Dict:
        """Analyze pod resource allocation and usage"""
        analysis = {
            'requests': {'cpu': 0, 'memory': 0},
            'limits': {'cpu': 0, 'memory': 0},
            'qos_class': 'BestEffort'
        }
        
        if pod.spec.containers:
            has_requests = False
            has_limits = False
            requests_equal_limits = True
            
            for container in pod.spec.containers:
                if container.resources:
                    if container.resources.requests:
                        has_requests = True
                        cpu_req = container.resources.requests.get('cpu', '0')
                        mem_req = container.resources.requests.get('memory', '0')
                        analysis['requests']['cpu'] += self._parse_cpu(cpu_req)
                        analysis['requests']['memory'] += self._parse_memory(mem_req)
                    
                    if container.resources.limits:
                        has_limits = True
                        cpu_lim = container.resources.limits.get('cpu', '0')
                        mem_lim = container.resources.limits.get('memory', '0')
                        analysis['limits']['cpu'] += self._parse_cpu(cpu_lim)
                        analysis['limits']['memory'] += self._parse_memory(mem_lim)
                    
                    # Check if requests equal limits
                    if container.resources.requests and container.resources.limits:
                        for resource in ['cpu', 'memory']:
                            req = container.resources.requests.get(resource)
                            lim = container.resources.limits.get(resource)
                            if req != lim:
                                requests_equal_limits = False
            
            # Determine QoS class
            if has_requests and has_limits and requests_equal_limits:
                analysis['qos_class'] = 'Guaranteed'
            elif has_requests or has_limits:
                analysis['qos_class'] = 'Burstable'
            else:
                analysis['qos_class'] = 'BestEffort'
        
        return analysis
    
    def _analyze_pod_networking(self, pod) -> Dict:
        """Analyze pod networking configuration"""
        analysis = {
            'pod_ip': pod.status.pod_ip,
            'host_network': pod.spec.host_network,
            'dns_policy': pod.spec.dns_policy,
            'service_account': pod.spec.service_account_name
        }
        
        return analysis
    
    def _generate_pod_recommendations(self, pod, diagnosis) -> List[str]:
        """Generate recommendations for pod issues"""
        recommendations = []
        
        # Check for high restart count
        if diagnosis['container_status']:
            for container in diagnosis['container_status']:
                if container['restart_count'] > 5:
                    recommendations.append(f"Container {container['name']} has high restart count ({container['restart_count']}). Check logs and resource limits.")
        
        # Check for resource issues
        resource_analysis = diagnosis.get('resource_analysis', {})
        if resource_analysis.get('qos_class') == 'BestEffort':
            recommendations.append("Pod has no resource requests/limits. Consider setting appropriate resource constraints.")
        
        # Check events for issues
        for event in diagnosis.get('events', []):
            if event['type'] == 'Warning':
                if 'FailedScheduling' in event['reason']:
                    recommendations.append("Pod scheduling issues detected. Check node resources and constraints.")
                elif 'Unhealthy' in event['reason']:
                    recommendations.append("Health check failures detected. Review readiness/liveness probes.")
        
        return recommendations
    
    def _analyze_service_selector(self, namespace: str, selector: Dict) -> Dict:
        """Analyze service selector and matching pods"""
        try:
            label_selector = ','.join([f"{k}={v}" for k, v in selector.items()])
            pods = self.v1.list_namespaced_pod(
                namespace=namespace,
                label_selector=label_selector
            )
            
            return {
                'selector': selector,
                'matching_pods': len(pods.items),
                'pod_names': [pod.metadata.name for pod in pods.items]
            }
        except ApiException:
            return {'selector': selector, 'matching_pods': 0, 'pod_names': []}
    
    def _test_service_connectivity(self, namespace: str, service_name: str, ports: List, source_pod: str = None) -> List[Dict]:
        """Test service connectivity"""
        # Simplified connectivity test
        # In real implementation, you'd create test pods or use existing ones
        tests = []
        
        for port in ports:
            test_result = {
                'port': port.port,
                'protocol': port.protocol,
                'status': 'unknown',
                'message': 'Connectivity test not implemented in this example'
            }
            tests.append(test_result)
        
        return tests
    
    def _generate_service_recommendations(self, service, diagnosis) -> List[str]:
        """Generate recommendations for service issues"""
        recommendations = []
        
        if not diagnosis['endpoints']:
            recommendations.append("Service has no endpoints. Check if pods matching the selector are running and ready.")
        
        selector_analysis = diagnosis.get('selector_analysis', {})
        if selector_analysis.get('matching_pods', 0) == 0:
            recommendations.append("No pods match the service selector. Verify pod labels and selector configuration.")
        
        return recommendations
    
    def _analyze_cluster_resource_pressure(self) -> Dict:
        """Analyze cluster-wide resource pressure"""
        # Simplified analysis
        return {
            'cpu_pressure': False,
            'memory_pressure': False,
            'disk_pressure': False,
            'message': 'Resource pressure analysis not fully implemented in this example'
        }
    
    def _analyze_cluster_networking(self) -> Dict:
        """Analyze cluster networking health"""
        return {
            'dns_healthy': True,
            'service_mesh_healthy': True,
            'message': 'Network health analysis not fully implemented in this example'
        }
    
    def _analyze_cluster_storage(self) -> Dict:
        """Analyze cluster storage health"""
        return {
            'pv_healthy': True,
            'storage_classes_available': True,
            'message': 'Storage health analysis not fully implemented in this example'
        }
    
    def _generate_cluster_recommendations(self, diagnosis) -> List[str]:
        """Generate cluster-level recommendations"""
        recommendations = []
        
        # Check node health
        unhealthy_nodes = [node for node in diagnosis['node_health'] if not node['ready']]
        if unhealthy_nodes:
            recommendations.append(f"Found {len(unhealthy_nodes)} unhealthy nodes. Investigate node conditions.")
        
        # Check system pods
        if diagnosis['system_pods']:
            recommendations.append(f"Found {len(diagnosis['system_pods'])} non-running system pods. Check system component health.")
        
        return recommendations
    
    def _test_dns_resolution(self, namespace: str, target: str, source_pod: str = None) -> Dict:
        """Test DNS resolution"""
        # Simplified DNS test
        return {
            'target': target,
            'status': 'unknown',
            'message': 'DNS test not implemented in this example'
        }
    
    def _test_external_connectivity(self, namespace: str, target: str, source_pod: str = None) -> Dict:
        """Test external connectivity"""
        # Simplified connectivity test
        return {
            'target': target,
            'status': 'unknown',
            'message': 'External connectivity test not implemented in this example'
        }
    
    def _generate_networking_recommendations(self, debug_results) -> List[str]:
        """Generate networking recommendations"""
        recommendations = []
        
        # Check DNS issues
        dns_failures = [target for target, result in debug_results['dns_resolution'].items() 
                       if result.get('status') == 'failed']
        if dns_failures:
            recommendations.append(f"DNS resolution failures detected for: {', '.join(dns_failures)}")
        
        # Check network policies
        if debug_results['network_policies']:
            recommendations.append("Network policies are active. Verify they allow required traffic.")
        
        return recommendations
    
    def _parse_cpu(self, cpu_str: str) -> float:
        """Parse CPU string to millicores"""
        if not cpu_str or cpu_str == '0':
            return 0.0
        
        if cpu_str.endswith('m'):
            return float(cpu_str[:-1])
        elif cpu_str.endswith('n'):
            return float(cpu_str[:-1]) / 1000000
        else:
            return float(cpu_str) * 1000
    
    def _parse_memory(self, memory_str: str) -> float:
        """Parse memory string to MiB"""
        if not memory_str or memory_str == '0':
            return 0.0
        
        units = {
            'Ki': 1/1024, 'Mi': 1, 'Gi': 1024, 'Ti': 1024*1024,
            'K': 1/1024, 'M': 1, 'G': 1024, 'T': 1024*1024
        }
        
        for unit, multiplier in units.items():
            if memory_str.endswith(unit):
                return float(memory_str[:-len(unit)]) * multiplier
        
        # Assume bytes if no unit
        return float(memory_str) / (1024 * 1024)

# Example usage
if __name__ == "__main__":
    debugger = KubernetesDebugger()
    
    # Diagnose a specific pod
    pod_diagnosis = debugger.diagnose_pod_issues("default", "my-app-pod")
    print("Pod Diagnosis:")
    print(json.dumps(pod_diagnosis, indent=2))
    
    # Diagnose cluster health
    cluster_health = debugger.diagnose_cluster_health()
    print("\nCluster Health:")
    print(f"Nodes: {len(cluster_health['node_health'])}")
    print(f"Recommendations: {len(cluster_health['recommendations'])}")
    
    # Debug networking
    network_debug = debugger.debug_networking_issues("default")
    print("\nNetwork Debug:")
    print(f"DNS tests: {len(network_debug['dns_resolution'])}")
    print(f"Network policies: {len(network_debug['network_policies'])}")
```

### Debugging Commands and Tools

```bash
# Essential debugging commands

# Pod debugging
kubectl describe pod <pod-name> -n <namespace>
kubectl logs <pod-name> -n <namespace> --previous
kubectl exec -it <pod-name> -n <namespace> -- /bin/bash

# Service debugging
kubectl describe service <service-name> -n <namespace>
kubectl get endpoints <service-name> -n <namespace>

# Node debugging
kubectl describe node <node-name>
kubectl top nodes
kubectl get events --sort-by=.metadata.creationTimestamp

# Network debugging
kubectl exec -it <debug-pod> -- nslookup <service-name>
kubectl exec -it <debug-pod> -- curl -v <service-name>:<port>
kubectl exec -it <debug-pod> -- netstat -tulpn

# Resource debugging
kubectl top pods -n <namespace>
kubectl describe quota -n <namespace>
kubectl describe limitrange -n <namespace>
```

**Advanced Troubleshooting Best Practices:**

1. **Systematic Approach**: Follow a structured debugging methodology
2. **Log Aggregation**: Centralize logs for easier analysis
3. **Monitoring Integration**: Use metrics for proactive issue detection
4. **Debug Tooling**: Maintain debug pods with networking tools
5. **Event Analysis**: Regularly review cluster events
6. **Resource Monitoring**: Track resource usage patterns
7. **Network Tracing**: Use tools like tcpdump for network issues
8. **Documentation**: Maintain runbooks for common issues

---

## Service Mesh and Istio

## Q17: How do you implement and manage a service mesh with Istio in Kubernetes?
**Difficulty: Expert**

**Answer:**

Istio is a service mesh that provides traffic management, security, and observability for microservices. It uses a sidecar proxy pattern with Envoy proxies to intercept and manage service-to-service communication.

### Istio Architecture and Installation

```bash
# Install Istio using istioctl
curl -L https://istio.io/downloadIstio | sh -
cd istio-*
export PATH=$PWD/bin:$PATH

# Install Istio with demo profile
istioctl install --set values.defaultRevision=default

# Enable sidecar injection for namespace
kubectl label namespace default istio-injection=enabled

# Verify installation
kubectl get pods -n istio-system
istioctl verify-install
```

### Service Mesh Configuration

```yaml
# Gateway for external traffic
apiVersion: networking.istio.io/v1beta1
kind: Gateway
metadata:
  name: bookinfo-gateway
  namespace: default
spec:
  selector:
    istio: ingressgateway
  servers:
  - port:
      number: 80
      name: http
      protocol: HTTP
    hosts:
    - "bookinfo.example.com"
  - port:
      number: 443
      name: https
      protocol: HTTPS
    tls:
      mode: SIMPLE
      credentialName: bookinfo-tls
    hosts:
    - "bookinfo.example.com"

---
# Virtual Service for traffic routing
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: bookinfo-vs
  namespace: default
spec:
  hosts:
  - "bookinfo.example.com"
  gateways:
  - bookinfo-gateway
  http:
  - match:
    - headers:
        user-type:
          exact: premium
    route:
    - destination:
        host: productpage
        subset: v2
      weight: 100
  - match:
    - uri:
        prefix: "/api/v1"
    route:
    - destination:
        host: productpage
        subset: v1
      weight: 90
    - destination:
        host: productpage
        subset: v2
      weight: 10
    fault:
      delay:
        percentage:
          value: 0.1
        fixedDelay: 5s
  - route:
    - destination:
        host: productpage
        subset: v1

---
# Destination Rule for load balancing
apiVersion: networking.istio.io/v1beta1
kind: DestinationRule
metadata:
  name: productpage-dr
  namespace: default
spec:
  host: productpage
  trafficPolicy:
    loadBalancer:
      simple: LEAST_CONN
    connectionPool:
      tcp:
        maxConnections: 100
      http:
        http1MaxPendingRequests: 50
        maxRequestsPerConnection: 10
    circuitBreaker:
      consecutiveErrors: 3
      interval: 30s
      baseEjectionTime: 30s
      maxEjectionPercent: 50
  subsets:
  - name: v1
    labels:
      version: v1
    trafficPolicy:
      portLevelSettings:
      - port:
          number: 9080
        connectionPool:
          tcp:
            maxConnections: 50
  - name: v2
    labels:
      version: v2
    trafficPolicy:
      outlierDetection:
        consecutiveErrors: 2
        interval: 10s
```

### Security Policies

```yaml
# PeerAuthentication for mTLS
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: default
spec:
  mtls:
    mode: STRICT

---
# AuthorizationPolicy for access control
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: productpage-authz
  namespace: default
spec:
  selector:
    matchLabels:
      app: productpage
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/bookinfo-gateway"]
  - to:
    - operation:
        methods: ["GET", "POST"]
        paths: ["/productpage", "/api/*"]
  - when:
    - key: request.headers[user-role]
      values: ["admin", "user"]

---
# RequestAuthentication for JWT validation
apiVersion: security.istio.io/v1beta1
kind: RequestAuthentication
metadata:
  name: jwt-auth
  namespace: default
spec:
  selector:
    matchLabels:
      app: productpage
  jwtRules:
  - issuer: "https://auth.example.com"
    jwksUri: "https://auth.example.com/.well-known/jwks.json"
    audiences:
    - "bookinfo-api"
    forwardOriginalToken: true
```

### Observability Configuration

```python
#!/usr/bin/env python3
"""
Istio Observability and Monitoring Setup
"""

import yaml
import requests
from typing import Dict, List, Any
import json
from datetime import datetime, timedelta

class IstioObservability:
    def __init__(self, prometheus_url: str, jaeger_url: str, kiali_url: str):
        self.prometheus_url = prometheus_url
        self.jaeger_url = jaeger_url
        self.kiali_url = kiali_url
    
    def get_service_metrics(self, service_name: str, namespace: str = "default", duration: str = "5m") -> Dict:
        """
        Get service metrics from Prometheus
        """
        queries = {
            'request_rate': f'rate(istio_requests_total{{destination_service_name="{service_name}",destination_service_namespace="{namespace}"}}[{duration}])',
            'error_rate': f'rate(istio_requests_total{{destination_service_name="{service_name}",destination_service_namespace="{namespace}",response_code!~"2.*"}}[{duration}])',
            'response_time_p99': f'histogram_quantile(0.99, rate(istio_request_duration_milliseconds_bucket{{destination_service_name="{service_name}",destination_service_namespace="{namespace}"}}[{duration}]))',
            'response_time_p95': f'histogram_quantile(0.95, rate(istio_request_duration_milliseconds_bucket{{destination_service_name="{service_name}",destination_service_namespace="{namespace}"}}[{duration}]))',
            'response_time_p50': f'histogram_quantile(0.50, rate(istio_request_duration_milliseconds_bucket{{destination_service_name="{service_name}",destination_service_namespace="{namespace}"}}[{duration}]))'
        }
        
        metrics = {}
        for metric_name, query in queries.items():
            try:
                response = requests.get(f"{self.prometheus_url}/api/v1/query", 
                                      params={'query': query})
                if response.status_code == 200:
                    data = response.json()
                    if data['data']['result']:
                        metrics[metric_name] = data['data']['result'][0]['value'][1]
                    else:
                        metrics[metric_name] = "0"
                else:
                    metrics[metric_name] = "error"
            except Exception as e:
                metrics[metric_name] = f"error: {str(e)}"
        
        return metrics
    
    def get_service_topology(self, namespace: str = "default") -> Dict:
        """
        Get service topology from Kiali
        """
        try:
            response = requests.get(f"{self.kiali_url}/api/namespaces/{namespace}/graph",
                                  params={
                                      'graphType': 'service',
                                      'duration': '600s',
                                      'includeIdleEdges': 'false'
                                  })
            if response.status_code == 200:
                return response.json()
            else:
                return {'error': f'Failed to get topology: {response.status_code}'}
        except Exception as e:
            return {'error': f'Exception getting topology: {str(e)}'}
    
    def get_distributed_traces(self, service_name: str, limit: int = 20) -> List[Dict]:
        """
        Get distributed traces from Jaeger
        """
        try:
            response = requests.get(f"{self.jaeger_url}/api/traces",
                                  params={
                                      'service': service_name,
                                      'limit': limit,
                                      'lookback': '1h'
                                  })
            if response.status_code == 200:
                return response.json()['data']
            else:
                return []
        except Exception as e:
            return [{'error': f'Exception getting traces: {str(e)}'}]
    
    def analyze_service_health(self, service_name: str, namespace: str = "default") -> Dict:
        """
        Comprehensive service health analysis
        """
        metrics = self.get_service_metrics(service_name, namespace)
        topology = self.get_service_topology(namespace)
        traces = self.get_distributed_traces(service_name)
        
        # Calculate health score
        health_score = 100
        issues = []
        
        # Check error rate
        try:
            error_rate = float(metrics.get('error_rate', 0))
            if error_rate > 0.05:  # 5% error rate threshold
                health_score -= 30
                issues.append(f"High error rate: {error_rate:.2%}")
            elif error_rate > 0.01:  # 1% error rate threshold
                health_score -= 10
                issues.append(f"Elevated error rate: {error_rate:.2%}")
        except (ValueError, TypeError):
            issues.append("Unable to determine error rate")
        
        # Check response time
        try:
            p99_latency = float(metrics.get('response_time_p99', 0))
            if p99_latency > 1000:  # 1 second threshold
                health_score -= 20
                issues.append(f"High P99 latency: {p99_latency:.0f}ms")
            elif p99_latency > 500:  # 500ms threshold
                health_score -= 10
                issues.append(f"Elevated P99 latency: {p99_latency:.0f}ms")
        except (ValueError, TypeError):
            issues.append("Unable to determine response time")
        
        # Check request rate
        try:
            request_rate = float(metrics.get('request_rate', 0))
            if request_rate == 0:
                health_score -= 50
                issues.append("No traffic detected")
        except (ValueError, TypeError):
            issues.append("Unable to determine request rate")
        
        return {
            'service': service_name,
            'namespace': namespace,
            'health_score': max(0, health_score),
            'status': 'healthy' if health_score >= 80 else 'degraded' if health_score >= 50 else 'unhealthy',
            'issues': issues,
            'metrics': metrics,
            'trace_count': len(traces),
            'timestamp': datetime.now().isoformat()
        }

# Telemetry Configuration
telemetry_config = """
apiVersion: telemetry.istio.io/v1alpha1
kind: Telemetry
metadata:
  name: custom-metrics
  namespace: default
spec:
  metrics:
  - providers:
    - name: prometheus
  - overrides:
    - match:
        metric: ALL_METRICS
      tagOverrides:
        request_id:
          value: "%{REQUEST_ID}"
        user_id:
          value: "%{REQUEST_HEADERS['user-id']}"
  accessLogging:
  - providers:
    - name: otel
  tracing:
  - providers:
    - name: jaeger
    customTags:
      user_id:
        header:
          name: user-id
      request_id:
        header:
          name: x-request-id
"""

print("Istio Observability Configuration:")
print(telemetry_config)
```

### Traffic Management and Canary Deployments

```yaml
# Canary deployment with traffic splitting
apiVersion: networking.istio.io/v1beta1
kind: VirtualService
metadata:
  name: canary-deployment
  namespace: default
spec:
  hosts:
  - productpage
  http:
  - match:
    - headers:
        canary-user:
          exact: "true"
    route:
    - destination:
        host: productpage
        subset: canary
      weight: 100
  - route:
    - destination:
        host: productpage
        subset: stable
      weight: 90
    - destination:
        host: productpage
        subset: canary
      weight: 10
    fault:
      abort:
        percentage:
          value: 0.1
        httpStatus: 500

---
# Service Entry for external services
apiVersion: networking.istio.io/v1beta1
kind: ServiceEntry
metadata:
  name: external-api
  namespace: default
spec:
  hosts:
  - api.external.com
  ports:
  - number: 443
    name: https
    protocol: HTTPS
  - number: 80
    name: http
    protocol: HTTP
  location: MESH_EXTERNAL
  resolution: DNS

---
# Sidecar configuration for resource optimization
apiVersion: networking.istio.io/v1beta1
kind: Sidecar
metadata:
  name: productpage-sidecar
  namespace: default
spec:
  workloadSelector:
    labels:
      app: productpage
  egress:
  - hosts:
    - "./reviews.default.svc.cluster.local"
    - "./details.default.svc.cluster.local"
    - "istio-system/*"
  - port:
      number: 443
      protocol: HTTPS
      name: external-https
    hosts:
    - "api.external.com"
```

**Service Mesh Best Practices:**

1. **Gradual Rollout**: Implement service mesh incrementally
2. **Security First**: Enable mTLS and proper authorization policies
3. **Observability**: Configure comprehensive monitoring and tracing
4. **Traffic Management**: Use canary deployments and circuit breakers
5. **Resource Optimization**: Configure sidecars to minimize resource usage
6. **Policy Enforcement**: Implement consistent security and traffic policies
7. **Performance Monitoring**: Regularly monitor latency and throughput
8. **Disaster Recovery**: Plan for service mesh component failures

---

## GitOps and ArgoCD

## Q18: How do you implement GitOps workflows with ArgoCD in Kubernetes?
**Difficulty: Expert**

**Answer:**

GitOps is a declarative approach to continuous deployment where Git repositories serve as the single source of truth for infrastructure and application configuration. ArgoCD is a declarative GitOps continuous delivery tool for Kubernetes.

### ArgoCD Installation and Setup

```bash
# Install ArgoCD
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD to be ready
kubectl wait --for=condition=available --timeout=300s deployment/argocd-server -n argocd

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d

# Port forward to access ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Install ArgoCD CLI
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
```

### GitOps Repository Structure

```yaml
# Repository structure for GitOps
# apps/
# ├── base/
# │   ├── kustomization.yaml
# │   ├── deployment.yaml
# │   ├── service.yaml
# │   └── configmap.yaml
# ├── overlays/
# │   ├── development/
# │   │   ├── kustomization.yaml
# │   │   └── patches/
# │   ├── staging/
# │   │   ├── kustomization.yaml
# │   │   └── patches/
# │   └── production/
# │       ├── kustomization.yaml
# │       └── patches/
# └── argocd/
#     ├── applications/
#     └── projects/

# base/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
- deployment.yaml
- service.yaml
- configmap.yaml

commonLabels:
  app: web-application
  version: v1.0.0

images:
- name: web-app
  newTag: latest

---
# base/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-application
  labels:
    app: web-application
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web-application
  template:
    metadata:
      labels:
        app: web-application
    spec:
      containers:
      - name: web-app
        image: web-app:latest
        ports:
        - containerPort: 8080
        env:
        - name: DATABASE_URL
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: database-url
        - name: API_KEY
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: api-key
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

---
# overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: production

resources:
- ../../base

patchesStrategicMerge:
- patches/deployment-patch.yaml
- patches/hpa-patch.yaml

images:
- name: web-app
  newTag: v1.2.3

replicas:
- name: web-application
  count: 5

---
# overlays/production/patches/deployment-patch.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-application
spec:
  template:
    spec:
      containers:
      - name: web-app
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        env:
        - name: ENVIRONMENT
          value: "production"
        - name: LOG_LEVEL
          value: "info"
```

### ArgoCD Application Configuration

```yaml
# argocd/applications/web-app-production.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: web-app-production
  namespace: argocd
  labels:
    environment: production
    team: platform
  annotations:
    argocd.argoproj.io/sync-wave: "1"
  finalizers:
  - resources-finalizer.argocd.argoproj.io
spec:
  project: production-apps
  source:
    repoURL: https://github.com/company/k8s-manifests
    targetRevision: main
    path: apps/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
    - CreateNamespace=true
    - PrunePropagationPolicy=foreground
    - PruneLast=true
    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
  revisionHistoryLimit: 10
  ignoreDifferences:
  - group: apps
    kind: Deployment
    jsonPointers:
    - /spec/replicas
  - group: ""
    kind: Secret
    jsonPointers:
    - /data

---
# argocd/projects/production-apps.yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: production-apps
  namespace: argocd
spec:
  description: Production applications project
  sourceRepos:
  - 'https://github.com/company/k8s-manifests'
  - 'https://helm.company.com/*'
  destinations:
  - namespace: 'production'
    server: https://kubernetes.default.svc
  - namespace: 'monitoring'
    server: https://kubernetes.default.svc
  clusterResourceWhitelist:
  - group: ''
    kind: Namespace
  - group: rbac.authorization.k8s.io
    kind: ClusterRole
  - group: rbac.authorization.k8s.io
    kind: ClusterRoleBinding
  namespaceResourceWhitelist:
  - group: ''
    kind: ConfigMap
  - group: ''
    kind: Secret
  - group: ''
    kind: Service
  - group: apps
    kind: Deployment
  - group: apps
    kind: ReplicaSet
  - group: networking.k8s.io
    kind: Ingress
  roles:
  - name: production-admin
    description: Admin access to production applications
    policies:
    - p, proj:production-apps:production-admin, applications, *, production-apps/*, allow
    - p, proj:production-apps:production-admin, repositories, *, *, allow
    groups:
    - company:production-admins
  - name: production-developer
    description: Developer access to production applications
    policies:
    - p, proj:production-apps:production-developer, applications, get, production-apps/*, allow
    - p, proj:production-apps:production-developer, applications, sync, production-apps/*, allow
    groups:
    - company:developers
```

### Advanced GitOps Patterns

```python
#!/usr/bin/env python3
"""
Advanced GitOps Automation with ArgoCD
"""

import yaml
import git
import requests
import json
from typing import Dict, List, Any
from datetime import datetime
import subprocess
import os

class GitOpsManager:
    def __init__(self, repo_url: str, argocd_server: str, argocd_token: str):
        self.repo_url = repo_url
        self.argocd_server = argocd_server
        self.argocd_token = argocd_token
        self.headers = {
            'Authorization': f'Bearer {argocd_token}',
            'Content-Type': 'application/json'
        }
    
    def promote_application(self, app_name: str, from_env: str, to_env: str, image_tag: str) -> Dict:
        """
        Promote application from one environment to another
        """
        try:
            # Clone repository
            repo_path = f"/tmp/{app_name}-gitops"
            if os.path.exists(repo_path):
                repo = git.Repo(repo_path)
                repo.remotes.origin.pull()
            else:
                repo = git.Repo.clone_from(self.repo_url, repo_path)
            
            # Update kustomization file
            kustomization_path = f"{repo_path}/apps/overlays/{to_env}/kustomization.yaml"
            
            with open(kustomization_path, 'r') as f:
                kustomization = yaml.safe_load(f)
            
            # Update image tag
            for image in kustomization.get('images', []):
                if image['name'] == app_name:
                    image['newTag'] = image_tag
                    break
            else:
                # Add new image if not exists
                if 'images' not in kustomization:
                    kustomization['images'] = []
                kustomization['images'].append({
                    'name': app_name,
                    'newTag': image_tag
                })
            
            # Write updated kustomization
            with open(kustomization_path, 'w') as f:
                yaml.dump(kustomization, f, default_flow_style=False)
            
            # Commit and push changes
            repo.index.add([kustomization_path])
            commit_message = f"Promote {app_name} to {to_env}: {image_tag}"
            repo.index.commit(commit_message)
            repo.remotes.origin.push()
            
            # Trigger ArgoCD sync
            sync_result = self.sync_application(f"{app_name}-{to_env}")
            
            return {
                'status': 'success',
                'message': f'Successfully promoted {app_name} to {to_env}',
                'commit': repo.head.commit.hexsha,
                'sync_result': sync_result
            }
            
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Failed to promote {app_name}: {str(e)}'
            }
    
    def sync_application(self, app_name: str, revision: str = None) -> Dict:
        """
        Trigger ArgoCD application sync
        """
        sync_request = {
            'revision': revision or 'HEAD',
            'prune': True,
            'dryRun': False,
            'strategy': {
                'hook': {
                    'force': True
                }
            }
        }
        
        try:
            response = requests.post(
                f"{self.argocd_server}/api/v1/applications/{app_name}/sync",
                headers=self.headers,
                json=sync_request
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                return {
                    'status': 'error',
                    'message': f'Sync failed: {response.text}'
                }
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Sync request failed: {str(e)}'
            }
    
    def get_application_status(self, app_name: str) -> Dict:
        """
        Get ArgoCD application status
        """
        try:
            response = requests.get(
                f"{self.argocd_server}/api/v1/applications/{app_name}",
                headers=self.headers
            )
            
            if response.status_code == 200:
                app_data = response.json()
                return {
                    'name': app_data['metadata']['name'],
                    'health': app_data['status']['health']['status'],
                    'sync': app_data['status']['sync']['status'],
                    'revision': app_data['status']['sync']['revision'][:8],
                    'last_sync': app_data['status']['operationState'].get('finishedAt', 'Never'),
                    'resources': len(app_data['status'].get('resources', []))
                }
            else:
                return {
                    'status': 'error',
                    'message': f'Failed to get application status: {response.text}'
                }
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Request failed: {str(e)}'
            }
    
    def create_application_from_template(self, app_name: str, environment: str, 
                                       repo_path: str, namespace: str) -> Dict:
        """
        Create new ArgoCD application from template
        """
        application = {
            'apiVersion': 'argoproj.io/v1alpha1',
            'kind': 'Application',
            'metadata': {
                'name': f"{app_name}-{environment}",
                'namespace': 'argocd',
                'labels': {
                    'app': app_name,
                    'environment': environment
                }
            },
            'spec': {
                'project': f"{environment}-apps",
                'source': {
                    'repoURL': self.repo_url,
                    'targetRevision': 'main',
                    'path': f"apps/overlays/{environment}/{repo_path}"
                },
                'destination': {
                    'server': 'https://kubernetes.default.svc',
                    'namespace': namespace
                },
                'syncPolicy': {
                    'automated': {
                        'prune': True,
                        'selfHeal': True
                    },
                    'syncOptions': [
                        'CreateNamespace=true'
                    ]
                }
            }
        }
        
        try:
            response = requests.post(
                f"{self.argocd_server}/api/v1/applications",
                headers=self.headers,
                json=application
            )
            
            if response.status_code == 200:
                return {
                    'status': 'success',
                    'message': f'Application {app_name}-{environment} created successfully',
                    'application': response.json()
                }
            else:
                return {
                    'status': 'error',
                    'message': f'Failed to create application: {response.text}'
                }
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Request failed: {str(e)}'
            }
    
    def rollback_application(self, app_name: str, revision: str) -> Dict:
        """
        Rollback application to specific revision
        """
        rollback_request = {
            'revision': revision,
            'prune': True,
            'dryRun': False
        }
        
        try:
            response = requests.post(
                f"{self.argocd_server}/api/v1/applications/{app_name}/rollback",
                headers=self.headers,
                json=rollback_request
            )
            
            if response.status_code == 200:
                return {
                    'status': 'success',
                    'message': f'Rollback initiated for {app_name} to revision {revision}'
                }
            else:
                return {
                    'status': 'error',
                    'message': f'Rollback failed: {response.text}'
                }
        except Exception as e:
            return {
                'status': 'error',
                'message': f'Rollback request failed: {str(e)}'
            }

# Example usage
if __name__ == "__main__":
    gitops = GitOpsManager(
        repo_url="https://github.com/company/k8s-manifests",
        argocd_server="https://argocd.company.com",
        argocd_token="your-argocd-token"
    )
    
    # Promote application
    result = gitops.promote_application(
        app_name="web-app",
        from_env="staging",
        to_env="production",
        image_tag="v1.2.3"
    )
    print(json.dumps(result, indent=2))
    
    # Check application status
    status = gitops.get_application_status("web-app-production")
    print(json.dumps(status, indent=2))
```

### Multi-Environment GitOps Pipeline

```yaml
# .github/workflows/gitops-pipeline.yaml
name: GitOps Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    outputs:
      image-tag: ${{ steps.meta.outputs.tags }}
      image-digest: ${{ steps.build.outputs.digest }}
    steps:
    - name: Checkout
      uses: actions/checkout@v3
    
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2
    
    - name: Log in to Container Registry
      uses: docker/login-action@v2
      with:
        registry: ${{ env.REGISTRY }}
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}
    
    - name: Extract metadata
      id: meta
      uses: docker/metadata-action@v4
      with:
        images: ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}
        tags: |
          type=ref,event=branch
          type=ref,event=pr
          type=sha,prefix={{branch}}-
    
    - name: Build and push
      id: build
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: ${{ steps.meta.outputs.tags }}
        labels: ${{ steps.meta.outputs.labels }}
        cache-from: type=gha
        cache-to: type=gha,mode=max

  deploy-dev:
    needs: build-and-test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Checkout GitOps repo
      uses: actions/checkout@v3
      with:
        repository: company/k8s-manifests
        token: ${{ secrets.GITOPS_TOKEN }}
        path: gitops
    
    - name: Update development manifests
      run: |
        cd gitops
        yq eval '.images[0].newTag = "${{ needs.build-and-test.outputs.image-tag }}"' -i apps/overlays/development/kustomization.yaml
        git config user.name "GitHub Actions"
        git config user.email "actions@github.com"
        git add .
        git commit -m "Update development image to ${{ needs.build-and-test.outputs.image-tag }}"
        git push

  deploy-staging:
    needs: [build-and-test, deploy-dev]
    runs-on: ubuntu-latest
    environment: staging
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Checkout GitOps repo
      uses: actions/checkout@v3
      with:
        repository: company/k8s-manifests
        token: ${{ secrets.GITOPS_TOKEN }}
        path: gitops
    
    - name: Update staging manifests
      run: |
        cd gitops
        yq eval '.images[0].newTag = "${{ needs.build-and-test.outputs.image-tag }}"' -i apps/overlays/staging/kustomization.yaml
        git config user.name "GitHub Actions"
        git config user.email "actions@github.com"
        git add .
        git commit -m "Update staging image to ${{ needs.build-and-test.outputs.image-tag }}"
        git push

  deploy-production:
    needs: [build-and-test, deploy-staging]
    runs-on: ubuntu-latest
    environment: production
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Checkout GitOps repo
      uses: actions/checkout@v3
      with:
        repository: company/k8s-manifests
        token: ${{ secrets.GITOPS_TOKEN }}
        path: gitops
    
    - name: Update production manifests
      run: |
        cd gitops
        yq eval '.images[0].newTag = "${{ needs.build-and-test.outputs.image-tag }}"' -i apps/overlays/production/kustomization.yaml
        git config user.name "GitHub Actions"
        git config user.email "actions@github.com"
        git add .
        git commit -m "Update production image to ${{ needs.build-and-test.outputs.image-tag }}"
        git push
```

**GitOps Best Practices:**

1. **Repository Structure**: Separate application code from deployment manifests
2. **Environment Promotion**: Use automated promotion pipelines between environments
3. **Security**: Implement RBAC and secure secret management
4. **Monitoring**: Set up comprehensive observability for GitOps workflows
5. **Rollback Strategy**: Maintain ability to quickly rollback deployments
6. **Branch Protection**: Protect main branches with required reviews
7. **Drift Detection**: Monitor and alert on configuration drift
8. **Multi-Cluster**: Plan for multi-cluster deployments from the start

---

## Advanced Networking and CNI

## Q19: How do you implement advanced networking patterns and CNI plugins in Kubernetes?
**Difficulty: Expert**

**Answer:**

Container Network Interface (CNI) is a specification for configuring network interfaces in Linux containers. Kubernetes uses CNI plugins to provide networking capabilities for pods, including IP allocation, routing, and network policies.

### CNI Plugin Architecture and Implementation

```bash
# Install Calico CNI
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# Install Cilium CNI with eBPF
helm repo add cilium https://helm.cilium.io/
helm install cilium cilium/cilium --version 1.14.0 \
  --namespace kube-system \
  --set kubeProxyReplacement=strict \
  --set k8sServiceHost=YOUR_K8S_API_SERVER_IP \
  --set k8sServicePort=6443

# Install Weave Net
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"

# Verify CNI installation
kubectl get pods -n kube-system | grep -E '(calico|cilium|weave)'
kubectl get nodes -o wide
```

### Advanced Network Policies

```yaml
# Comprehensive Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: advanced-network-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: web-application
      tier: frontend
  policyTypes:
  - Ingress
  - Egress
  ingress:
  # Allow traffic from load balancer
  - from:
    - namespaceSelector:
        matchLabels:
          name: ingress-nginx
    - podSelector:
        matchLabels:
          app: nginx-ingress
    ports:
    - protocol: TCP
      port: 8080
  # Allow traffic from same namespace
  - from:
    - podSelector:
        matchLabels:
          tier: backend
    ports:
    - protocol: TCP
      port: 8080
  # Allow traffic from monitoring namespace
  - from:
    - namespaceSelector:
        matchLabels:
          name: monitoring
    - podSelector:
        matchLabels:
          app: prometheus
    ports:
    - protocol: TCP
      port: 9090
  egress:
  # Allow DNS resolution
  - to: []
    ports:
    - protocol: UDP
      port: 53
    - protocol: TCP
      port: 53
  # Allow HTTPS to external services
  - to: []
    ports:
    - protocol: TCP
      port: 443
  # Allow traffic to backend services
  - to:
    - podSelector:
        matchLabels:
          tier: backend
    ports:
    - protocol: TCP
      port: 3000
  # Allow traffic to database
  - to:
    - podSelector:
        matchLabels:
          app: postgresql
    ports:
    - protocol: TCP
      port: 5432

---
# Calico Global Network Policy
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: deny-all-non-system-traffic
spec:
  order: 1000
  selector: projectcalico.org/namespace != "kube-system"
  types:
  - Ingress
  - Egress
  egress:
  # Allow DNS
  - action: Allow
    protocol: UDP
    destination:
      ports: [53]
  - action: Allow
    protocol: TCP
    destination:
      ports: [53]
  # Allow NTP
  - action: Allow
    protocol: UDP
    destination:
      ports: [123]
  # Deny all other traffic
  - action: Deny

---
# Cilium Network Policy with L7 rules
apiVersion: cilium.io/v2
kind: CiliumNetworkPolicy
metadata:
  name: l7-policy
  namespace: production
spec:
  endpointSelector:
    matchLabels:
      app: api-gateway
  ingress:
  - fromEndpoints:
    - matchLabels:
        app: frontend
    toPorts:
    - ports:
      - port: "8080"
        protocol: TCP
      rules:
        http:
        - method: "GET"
          path: "/api/v1/.*"
        - method: "POST"
          path: "/api/v1/users"
          headers:
          - "Content-Type: application/json"
        - method: "PUT"
          path: "/api/v1/users/[0-9]+"
  egress:
  - toEndpoints:
    - matchLabels:
        app: user-service
    toPorts:
    - ports:
      - port: "3000"
        protocol: TCP
      rules:
        http:
        - method: "GET"
          path: "/users/.*"
        - method: "POST"
          path: "/users"
```

### Multi-Cluster Networking

```python
#!/usr/bin/env python3
"""
Multi-Cluster Networking Management
"""

import yaml
import subprocess
import json
from typing import Dict, List, Any
import ipaddress
from dataclasses import dataclass

@dataclass
class ClusterConfig:
    name: str
    kubeconfig: str
    pod_cidr: str
    service_cidr: str
    api_server: str
    region: str

class MultiClusterNetworking:
    def __init__(self):
        self.clusters = {}
        self.mesh_config = {}
    
    def add_cluster(self, config: ClusterConfig):
        """
        Add cluster to multi-cluster setup
        """
        self.clusters[config.name] = config
        
        # Validate CIDR ranges don't overlap
        self._validate_cidr_ranges()
    
    def _validate_cidr_ranges(self):
        """
        Ensure pod and service CIDRs don't overlap between clusters
        """
        pod_networks = []
        service_networks = []
        
        for cluster in self.clusters.values():
            pod_net = ipaddress.ip_network(cluster.pod_cidr)
            service_net = ipaddress.ip_network(cluster.service_cidr)
            
            # Check for overlaps
            for existing_pod in pod_networks:
                if pod_net.overlaps(existing_pod):
                    raise ValueError(f"Pod CIDR overlap detected: {cluster.pod_cidr} overlaps with existing network")
            
            for existing_service in service_networks:
                if service_net.overlaps(existing_service):
                    raise ValueError(f"Service CIDR overlap detected: {cluster.service_cidr} overlaps with existing network")
            
            pod_networks.append(pod_net)
            service_networks.append(service_net)
    
    def setup_submariner(self, broker_cluster: str) -> Dict:
        """
        Setup Submariner for multi-cluster connectivity
        """
        try:
            # Install Submariner broker on designated cluster
            broker_config = self.clusters[broker_cluster]
            
            # Deploy broker
            broker_cmd = [
                'subctl', 'deploy-broker',
                '--kubeconfig', broker_config.kubeconfig,
                '--service-discovery'
            ]
            
            result = subprocess.run(broker_cmd, capture_output=True, text=True)
            if result.returncode != 0:
                return {'status': 'error', 'message': f'Broker deployment failed: {result.stderr}'}
            
            # Join other clusters to broker
            for cluster_name, cluster_config in self.clusters.items():
                if cluster_name != broker_cluster:
                    join_cmd = [
                        'subctl', 'join',
                        '--kubeconfig', cluster_config.kubeconfig,
                        '--clusterid', cluster_name,
                        '--repository', 'quay.io/submariner',
                        'broker-info.subm'
                    ]
                    
                    join_result = subprocess.run(join_cmd, capture_output=True, text=True)
                    if join_result.returncode != 0:
                        return {
                            'status': 'error', 
                            'message': f'Failed to join cluster {cluster_name}: {join_result.stderr}'
                        }
            
            return {
                'status': 'success',
                'message': 'Submariner multi-cluster setup completed',
                'broker_cluster': broker_cluster
            }
            
        except Exception as e:
            return {'status': 'error', 'message': f'Submariner setup failed: {str(e)}'}
    
    def setup_istio_multicluster(self) -> Dict:
        """
        Setup Istio multi-cluster mesh
        """
        try:
            # Install Istio on each cluster
            for cluster_name, cluster_config in self.clusters.items():
                # Create network and cluster labels
                network_name = f"network-{cluster_config.region}"
                
                istio_install_cmd = [
                    'istioctl', 'install',
                    '--kubeconfig', cluster_config.kubeconfig,
                    '--set', f'values.pilot.env.EXTERNAL_ISTIOD=false',
                    '--set', f'values.global.meshID=mesh1',
                    '--set', f'values.global.network={network_name}',
                    '--set', f'values.global.cluster={cluster_name}'
                ]
                
                result = subprocess.run(istio_install_cmd, capture_output=True, text=True)
                if result.returncode != 0:
                    return {
                        'status': 'error', 
                        'message': f'Istio installation failed on {cluster_name}: {result.stderr}'
                    }
            
            # Setup cross-cluster service discovery
            self._setup_istio_cross_cluster_discovery()
            
            return {
                'status': 'success',
                'message': 'Istio multi-cluster mesh setup completed'
            }
            
        except Exception as e:
            return {'status': 'error', 'message': f'Istio multi-cluster setup failed: {str(e)}'}
    
    def _setup_istio_cross_cluster_discovery(self):
        """
        Setup Istio cross-cluster service discovery
        """
        for cluster_name, cluster_config in self.clusters.items():
            for remote_cluster_name, remote_config in self.clusters.items():
                if cluster_name != remote_cluster_name:
                    # Create secret for remote cluster access
                    secret_cmd = [
                        'kubectl', 'create', 'secret', 'generic',
                        f'cacerts-{remote_cluster_name}',
                        '--kubeconfig', cluster_config.kubeconfig,
                        '-n', 'istio-system',
                        '--from-file', f'root-cert.pem=/tmp/{remote_cluster_name}-root-cert.pem',
                        '--from-file', f'cert-chain.pem=/tmp/{remote_cluster_name}-cert-chain.pem'
                    ]
                    
                    subprocess.run(secret_cmd, capture_output=True, text=True)
    
    def create_service_export(self, cluster_name: str, service_name: str, namespace: str) -> str:
        """
        Create ServiceExport for multi-cluster service discovery
        """
        service_export = {
            'apiVersion': 'networking.istio.io/v1alpha3',
            'kind': 'ServiceEntry',
            'metadata': {
                'name': f'{service_name}-remote',
                'namespace': namespace
            },
            'spec': {
                'hosts': [f'{service_name}.{namespace}.global'],
                'location': 'MESH_EXTERNAL',
                'ports': [
                    {
                        'number': 80,
                        'name': 'http',
                        'protocol': 'HTTP'
                    }
                ],
                'resolution': 'DNS',
                'addresses': [f'{service_name}.{namespace}.svc.cluster.local'],
                'endpoints': [
                    {
                        'address': f'{service_name}.{namespace}.svc.cluster.local',
                        'network': f'network-{self.clusters[cluster_name].region}',
                        'ports': {'http': 80}
                    }
                ]
            }
        }
        
        return yaml.dump(service_export, default_flow_style=False)
    
    def monitor_cross_cluster_connectivity(self) -> Dict:
        """
        Monitor connectivity between clusters
        """
        connectivity_status = {}
        
        for source_cluster, source_config in self.clusters.items():
            connectivity_status[source_cluster] = {}
            
            for target_cluster, target_config in self.clusters.items():
                if source_cluster != target_cluster:
                    # Test connectivity using kubectl
                    test_cmd = [
                        'kubectl', 'run', 'connectivity-test',
                        '--kubeconfig', source_config.kubeconfig,
                        '--image=busybox',
                        '--rm', '-i', '--restart=Never',
                        '--', 'ping', '-c', '3', target_config.api_server.split('://')[1].split(':')[0]
                    ]
                    
                    result = subprocess.run(test_cmd, capture_output=True, text=True)
                    connectivity_status[source_cluster][target_cluster] = {
                        'status': 'success' if result.returncode == 0 else 'failed',
                        'latency': self._extract_ping_latency(result.stdout) if result.returncode == 0 else None
                    }
        
        return connectivity_status
    
    def _extract_ping_latency(self, ping_output: str) -> float:
        """
        Extract average latency from ping output
        """
        try:
            lines = ping_output.split('\n')
            for line in lines:
                if 'avg' in line:
                    # Extract average latency
                    parts = line.split('/')
                    if len(parts) >= 5:
                        return float(parts[4])
            return 0.0
        except:
            return 0.0

# Example usage
if __name__ == "__main__":
    # Setup multi-cluster networking
    mcn = MultiClusterNetworking()
    
    # Add clusters
    cluster1 = ClusterConfig(
        name="prod-us-east",
        kubeconfig="/path/to/us-east-kubeconfig",
        pod_cidr="10.1.0.0/16",
        service_cidr="10.101.0.0/16",
        api_server="https://us-east-api.example.com:6443",
        region="us-east-1"
    )
    
    cluster2 = ClusterConfig(
        name="prod-us-west",
        kubeconfig="/path/to/us-west-kubeconfig",
        pod_cidr="10.2.0.0/16",
        service_cidr="10.102.0.0/16",
        api_server="https://us-west-api.example.com:6443",
        region="us-west-2"
    )
    
    mcn.add_cluster(cluster1)
    mcn.add_cluster(cluster2)
    
    # Setup Submariner
    result = mcn.setup_submariner("prod-us-east")
    print(json.dumps(result, indent=2))
    
    # Monitor connectivity
    connectivity = mcn.monitor_cross_cluster_connectivity()
    print(json.dumps(connectivity, indent=2))
```

### eBPF-based Networking with Cilium

```yaml
# Cilium ConfigMap for advanced eBPF features
apiVersion: v1
kind: ConfigMap
metadata:
  name: cilium-config
  namespace: kube-system
data:
  # Enable eBPF-based kube-proxy replacement
  kube-proxy-replacement: "strict"
  
  # Enable Hubble for network observability
  enable-hubble: "true"
  hubble-listen-address: ":4244"
  hubble-metrics-server: ":9091"
  hubble-metrics: |
    dns:query;ignoreAAAA
    drop
    tcp
    flow
    icmp
    http
  
  # Enable L7 load balancing
  enable-l7-proxy: "true"
  
  # Enable bandwidth management
  enable-bandwidth-manager: "true"
  
  # Enable local redirect policy
  enable-local-redirect-policy: "true"
  
  # Enable endpoint routes
  enable-endpoint-routes: "true"
  
  # Enable host routing
  enable-host-routing: "true"
  
  # Configure IPAM
  ipam: "kubernetes"
  
  # Enable encryption
  enable-ipsec: "true"
  ipsec-key-file: "/etc/ipsec/keys"
  
  # Enable Wireguard encryption (alternative to IPSec)
  enable-wireguard: "false"
  
  # Configure cluster pool
  cluster-pool-ipv4-cidr: "10.0.0.0/8"
  cluster-pool-ipv4-mask-size: "24"

---
# Cilium Load Balancer IP Pool
apiVersion: cilium.io/v2alpha1
kind: CiliumLoadBalancerIPPool
metadata:
  name: production-pool
spec:
  cidrs:
  - cidr: "192.168.1.0/24"
  serviceSelector:
    matchLabels:
      environment: production

---
# Cilium BGP Peering Policy
apiVersion: cilium.io/v2alpha1
kind: CiliumBGPPeeringPolicy
metadata:
  name: bgp-peering
spec:
  nodeSelector:
    matchLabels:
      kubernetes.io/os: linux
  virtualRouters:
  - localASN: 65001
    exportPodCIDR: true
    serviceSelector:
      matchExpressions:
      - key: somekey
        operator: NotIn
        values: ['never-used-value']
    neighbors:
    - peerAddress: "192.168.1.1/32"
      peerASN: 65000
```

### Network Troubleshooting Tools

```bash
# Network debugging commands

# Check CNI plugin status
kubectl get pods -n kube-system | grep -E '(calico|cilium|weave|flannel)'

# Verify node networking
kubectl get nodes -o wide
kubectl describe node <node-name>

# Check pod networking
kubectl get pods -o wide
kubectl exec -it <pod-name> -- ip addr show
kubectl exec -it <pod-name> -- ip route show

# Test DNS resolution
kubectl run -it --rm debug --image=busybox --restart=Never -- nslookup kubernetes.default

# Test service connectivity
kubectl run -it --rm debug --image=busybox --restart=Never -- wget -qO- http://service-name:port

# Check network policies
kubectl get networkpolicies -A
kubectl describe networkpolicy <policy-name> -n <namespace>

# Cilium specific debugging
cilium status
cilium endpoint list
cilium service list
cilium policy get

# Hubble network observability
hubble status
hubble observe --follow
hubble observe --from-pod default/frontend --to-pod default/backend

# Check iptables rules (on nodes)
sudo iptables -t nat -L
sudo iptables -t filter -L

# Monitor network traffic
sudo tcpdump -i any -n host <pod-ip>
kubectl exec -it <pod-name> -- tcpdump -i eth0 -n
```

**Advanced Networking Best Practices:**

1. **CNI Selection**: Choose CNI based on performance, security, and feature requirements
2. **Network Policies**: Implement zero-trust networking with comprehensive policies
3. **Multi-Cluster**: Plan for cross-cluster communication and service discovery
4. **Observability**: Deploy network monitoring and tracing tools
5. **Security**: Enable encryption for pod-to-pod communication
6. **Performance**: Optimize network performance with eBPF and hardware acceleration
7. **Troubleshooting**: Maintain network debugging tools and procedures
8. **Compliance**: Ensure network configuration meets regulatory requirements

---

## Performance Optimization and Tuning

## Q20: How do you optimize Kubernetes cluster performance and implement advanced tuning strategies?
**Difficulty: Expert**

**Answer:**

Kubernetes performance optimization involves tuning multiple layers: cluster infrastructure, node configuration, pod scheduling, resource management, and application-level optimizations.

### Cluster-Level Performance Optimization

```yaml
# High-Performance Node Configuration
apiVersion: v1
kind: Node
metadata:
  name: high-perf-node
  labels:
    node-type: high-performance
    workload-class: compute-intensive
  annotations:
    cluster-autoscaler.kubernetes.io/scale-down-disabled: "true"
spec:
  # Node-specific configurations
  taints:
  - key: "high-performance"
    value: "true"
    effect: "NoSchedule"

---
# Performance-optimized Pod
apiVersion: v1
kind: Pod
metadata:
  name: high-perf-app
  annotations:
    scheduler.alpha.kubernetes.io/preferred-zone: "us-west-2a"
spec:
  nodeSelector:
    node-type: high-performance
  tolerations:
  - key: "high-performance"
    operator: "Equal"
    value: "true"
    effect: "NoSchedule"
  containers:
  - name: app
    image: myapp:latest
    resources:
      requests:
        cpu: "2"
        memory: "4Gi"
        ephemeral-storage: "10Gi"
      limits:
        cpu: "4"
        memory: "8Gi"
        ephemeral-storage: "20Gi"
    # CPU and memory optimizations
    env:
    - name: GOMAXPROCS
      valueFrom:
        resourceFieldRef:
          resource: limits.cpu
    - name: GOMEMLIMIT
      valueFrom:
        resourceFieldRef:
          resource: limits.memory
  # Performance-critical scheduling
  priorityClassName: high-priority
  schedulerName: performance-scheduler
  # Topology spread constraints
  topologySpreadConstraints:
  - maxSkew: 1
    topologyKey: kubernetes.io/hostname
    whenUnsatisfiable: DoNotSchedule
    labelSelector:
      matchLabels:
        app: high-perf-app

---
# Priority Class for critical workloads
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "High priority class for performance-critical workloads"
```

### Advanced Resource Management

```python
#!/usr/bin/env python3
"""
Kubernetes Performance Optimization and Monitoring
"""

import yaml
import json
import subprocess
import time
from typing import Dict, List, Any, Optional
from dataclasses import dataclass
from kubernetes import client, config
import psutil
import numpy as np

@dataclass
class PerformanceMetrics:
    cpu_usage: float
    memory_usage: float
    network_io: Dict[str, float]
    disk_io: Dict[str, float]
    pod_count: int
    node_count: int
    timestamp: float

class KubernetesPerformanceOptimizer:
    def __init__(self, kubeconfig_path: Optional[str] = None):
        if kubeconfig_path:
            config.load_kube_config(config_file=kubeconfig_path)
        else:
            config.load_incluster_config()
        
        self.v1 = client.CoreV1Api()
        self.apps_v1 = client.AppsV1Api()
        self.metrics_v1beta1 = client.CustomObjectsApi()
        self.autoscaling_v2 = client.AutoscalingV2Api()
    
    def analyze_cluster_performance(self) -> Dict[str, Any]:
        """
        Comprehensive cluster performance analysis
        """
        try:
            # Get cluster metrics
            nodes = self.v1.list_node()
            pods = self.v1.list_pod_for_all_namespaces()
            
            # Calculate resource utilization
            total_cpu_capacity = 0
            total_memory_capacity = 0
            total_cpu_requests = 0
            total_memory_requests = 0
            
            node_metrics = []
            
            for node in nodes.items:
                # Node capacity
                cpu_capacity = self._parse_cpu(node.status.capacity.get('cpu', '0'))
                memory_capacity = self._parse_memory(node.status.capacity.get('memory', '0'))
                
                total_cpu_capacity += cpu_capacity
                total_memory_capacity += memory_capacity
                
                # Node conditions and performance
                node_ready = False
                for condition in node.status.conditions:
                    if condition.type == 'Ready' and condition.status == 'True':
                        node_ready = True
                        break
                
                node_metrics.append({
                    'name': node.metadata.name,
                    'ready': node_ready,
                    'cpu_capacity': cpu_capacity,
                    'memory_capacity': memory_capacity,
                    'kernel_version': node.status.node_info.kernel_version,
                    'container_runtime': node.status.node_info.container_runtime_version
                })
            
            # Calculate pod resource requests
            pod_metrics = []
            for pod in pods.items:
                if pod.status.phase == 'Running':
                    pod_cpu_requests = 0
                    pod_memory_requests = 0
                    
                    for container in pod.spec.containers:
                        if container.resources and container.resources.requests:
                            cpu_req = container.resources.requests.get('cpu', '0')
                            memory_req = container.resources.requests.get('memory', '0')
                            
                            pod_cpu_requests += self._parse_cpu(cpu_req)
                            pod_memory_requests += self._parse_memory(memory_req)
                    
                    total_cpu_requests += pod_cpu_requests
                    total_memory_requests += pod_memory_requests
                    
                    pod_metrics.append({
                        'name': pod.metadata.name,
                        'namespace': pod.metadata.namespace,
                        'node': pod.spec.node_name,
                        'cpu_requests': pod_cpu_requests,
                        'memory_requests': pod_memory_requests,
                        'restart_count': sum([c.restart_count for c in pod.status.container_statuses or []])
                    })
            
            # Calculate utilization percentages
            cpu_utilization = (total_cpu_requests / total_cpu_capacity * 100) if total_cpu_capacity > 0 else 0
            memory_utilization = (total_memory_requests / total_memory_capacity * 100) if total_memory_capacity > 0 else 0
            
            return {
                'cluster_summary': {
                    'total_nodes': len(nodes.items),
                    'total_pods': len([p for p in pods.items if p.status.phase == 'Running']),
                    'cpu_utilization_percent': round(cpu_utilization, 2),
                    'memory_utilization_percent': round(memory_utilization, 2),
                    'total_cpu_capacity': total_cpu_capacity,
                    'total_memory_capacity_gb': round(total_memory_capacity / (1024**3), 2)
                },
                'node_metrics': node_metrics,
                'pod_metrics': pod_metrics[:10],  # Top 10 pods by resource usage
                'recommendations': self._generate_performance_recommendations(cpu_utilization, memory_utilization, node_metrics)
            }
            
        except Exception as e:
            return {'error': f'Failed to analyze cluster performance: {str(e)}'}
    
    def optimize_pod_scheduling(self, namespace: str = 'default') -> Dict[str, Any]:
        """
        Optimize pod scheduling and placement
        """
        try:
            # Get pods in namespace
            pods = self.v1.list_namespaced_pod(namespace)
            nodes = self.v1.list_node()
            
            optimization_recommendations = []
            
            for pod in pods.items:
                if pod.status.phase == 'Running':
                    recommendations = self._analyze_pod_placement(pod, nodes.items)
                    if recommendations:
                        optimization_recommendations.append({
                            'pod': pod.metadata.name,
                            'current_node': pod.spec.node_name,
                            'recommendations': recommendations
                        })
            
            return {
                'namespace': namespace,
                'total_pods_analyzed': len(pods.items),
                'optimization_opportunities': len(optimization_recommendations),
                'recommendations': optimization_recommendations
            }
            
        except Exception as e:
            return {'error': f'Failed to optimize pod scheduling: {str(e)}'}
    
    def implement_performance_tuning(self, deployment_name: str, namespace: str = 'default') -> Dict[str, Any]:
        """
        Implement performance tuning for a deployment
        """
        try:
            # Get current deployment
            deployment = self.apps_v1.read_namespaced_deployment(deployment_name, namespace)
            
            # Create optimized deployment spec
            optimized_spec = self._create_optimized_deployment_spec(deployment)
            
            # Apply optimizations
            self.apps_v1.patch_namespaced_deployment(
                name=deployment_name,
                namespace=namespace,
                body=optimized_spec
            )
            
            # Create HPA if not exists
            hpa_spec = self._create_performance_hpa(deployment_name, namespace)
            
            try:
                self.autoscaling_v2.create_namespaced_horizontal_pod_autoscaler(
                    namespace=namespace,
                    body=hpa_spec
                )
                hpa_created = True
            except client.exceptions.ApiException as e:
                if e.status == 409:  # Already exists
                    hpa_created = False
                else:
                    raise
            
            return {
                'deployment': deployment_name,
                'namespace': namespace,
                'optimizations_applied': [
                    'Resource requests/limits optimized',
                    'Node affinity configured',
                    'Topology spread constraints added',
                    'Performance annotations added'
                ],
                'hpa_created': hpa_created,
                'status': 'success'
            }
            
        except Exception as e:
            return {'error': f'Failed to implement performance tuning: {str(e)}'}
    
    def monitor_performance_metrics(self, duration_minutes: int = 5) -> List[PerformanceMetrics]:
        """
        Monitor cluster performance metrics over time
        """
        metrics = []
        end_time = time.time() + (duration_minutes * 60)
        
        while time.time() < end_time:
            try:
                # Get current metrics
                nodes = self.v1.list_node()
                pods = self.v1.list_pod_for_all_namespaces()
                
                # Calculate current utilization
                running_pods = [p for p in pods.items if p.status.phase == 'Running']
                
                # Get system metrics (simplified)
                cpu_usage = psutil.cpu_percent(interval=1)
                memory_usage = psutil.virtual_memory().percent
                network_io = psutil.net_io_counters()._asdict()
                disk_io = psutil.disk_io_counters()._asdict()
                
                metrics.append(PerformanceMetrics(
                    cpu_usage=cpu_usage,
                    memory_usage=memory_usage,
                    network_io=network_io,
                    disk_io=disk_io,
                    pod_count=len(running_pods),
                    node_count=len(nodes.items),
                    timestamp=time.time()
                ))
                
                time.sleep(30)  # Sample every 30 seconds
                
            except Exception as e:
                print(f"Error collecting metrics: {e}")
                time.sleep(30)
        
        return metrics
    
    def _parse_cpu(self, cpu_str: str) -> float:
        """
        Parse CPU string to float (cores)
        """
        if cpu_str.endswith('m'):
            return float(cpu_str[:-1]) / 1000
        return float(cpu_str)
    
    def _parse_memory(self, memory_str: str) -> int:
        """
        Parse memory string to bytes
        """
        units = {'Ki': 1024, 'Mi': 1024**2, 'Gi': 1024**3, 'Ti': 1024**4}
        
        for unit, multiplier in units.items():
            if memory_str.endswith(unit):
                return int(memory_str[:-2]) * multiplier
        
        return int(memory_str)
    
    def _generate_performance_recommendations(self, cpu_util: float, memory_util: float, node_metrics: List[Dict]) -> List[str]:
        """
        Generate performance optimization recommendations
        """
        recommendations = []
        
        if cpu_util > 80:
            recommendations.append("High CPU utilization detected. Consider adding more nodes or optimizing workloads.")
        elif cpu_util < 30:
            recommendations.append("Low CPU utilization. Consider consolidating workloads or reducing cluster size.")
        
        if memory_util > 85:
            recommendations.append("High memory utilization detected. Consider adding memory or optimizing applications.")
        elif memory_util < 40:
            recommendations.append("Low memory utilization. Consider right-sizing your applications.")
        
        # Check node health
        unhealthy_nodes = [n for n in node_metrics if not n['ready']]
        if unhealthy_nodes:
            recommendations.append(f"Found {len(unhealthy_nodes)} unhealthy nodes. Investigate node issues.")
        
        return recommendations
    
    def _analyze_pod_placement(self, pod, nodes: List) -> List[str]:
        """
        Analyze pod placement and suggest optimizations
        """
        recommendations = []
        
        # Check if pod has resource requests
        has_requests = False
        for container in pod.spec.containers:
            if container.resources and container.resources.requests:
                has_requests = True
                break
        
        if not has_requests:
            recommendations.append("Add resource requests for better scheduling")
        
        # Check node affinity
        if not pod.spec.affinity:
            recommendations.append("Consider adding node affinity for optimal placement")
        
        # Check for anti-affinity
        if not pod.spec.affinity or not pod.spec.affinity.pod_anti_affinity:
            recommendations.append("Consider adding pod anti-affinity for high availability")
        
        return recommendations
    
    def _create_optimized_deployment_spec(self, deployment) -> Dict:
        """
        Create optimized deployment specification
        """
        # Clone the deployment
        optimized = deployment.to_dict()
        
        # Add performance optimizations
        container = optimized['spec']['template']['spec']['containers'][0]
        
        # Optimize resource requests/limits
        if 'resources' not in container:
            container['resources'] = {}
        
        container['resources'] = {
            'requests': {
                'cpu': '100m',
                'memory': '128Mi'
            },
            'limits': {
                'cpu': '500m',
                'memory': '512Mi'
            }
        }
        
        # Add performance annotations
        if 'annotations' not in optimized['spec']['template']['metadata']:
            optimized['spec']['template']['metadata']['annotations'] = {}
        
        optimized['spec']['template']['metadata']['annotations'].update({
            'cluster-autoscaler.kubernetes.io/safe-to-evict': 'true',
            'scheduler.alpha.kubernetes.io/preferred-zone': 'us-west-2a'
        })
        
        # Add topology spread constraints
        optimized['spec']['template']['spec']['topologySpreadConstraints'] = [{
            'maxSkew': 1,
            'topologyKey': 'kubernetes.io/hostname',
            'whenUnsatisfiable': 'DoNotSchedule',
            'labelSelector': {
                'matchLabels': optimized['spec']['selector']['matchLabels']
            }
        }]
        
        return optimized
    
    def _create_performance_hpa(self, deployment_name: str, namespace: str) -> Dict:
        """
        Create HPA for performance optimization
        """
        return {
            'apiVersion': 'autoscaling/v2',
            'kind': 'HorizontalPodAutoscaler',
            'metadata': {
                'name': f'{deployment_name}-hpa',
                'namespace': namespace
            },
            'spec': {
                'scaleTargetRef': {
                    'apiVersion': 'apps/v1',
                    'kind': 'Deployment',
                    'name': deployment_name
                },
                'minReplicas': 2,
                'maxReplicas': 10,
                'metrics': [
                    {
                        'type': 'Resource',
                        'resource': {
                            'name': 'cpu',
                            'target': {
                                'type': 'Utilization',
                                'averageUtilization': 70
                            }
                        }
                    },
                    {
                        'type': 'Resource',
                        'resource': {
                            'name': 'memory',
                            'target': {
                                'type': 'Utilization',
                                'averageUtilization': 80
                            }
                        }
                    }
                ],
                'behavior': {
                    'scaleDown': {
                        'stabilizationWindowSeconds': 300,
                        'policies': [{
                            'type': 'Percent',
                            'value': 10,
                            'periodSeconds': 60
                        }]
                    },
                    'scaleUp': {
                        'stabilizationWindowSeconds': 60,
                        'policies': [{
                            'type': 'Percent',
                            'value': 50,
                            'periodSeconds': 60
                        }]
                    }
                }
            }
        }

# Example usage
if __name__ == "__main__":
    optimizer = KubernetesPerformanceOptimizer()
    
    # Analyze cluster performance
    analysis = optimizer.analyze_cluster_performance()
    print(json.dumps(analysis, indent=2))
    
    # Optimize pod scheduling
    scheduling_optimization = optimizer.optimize_pod_scheduling('production')
    print(json.dumps(scheduling_optimization, indent=2))
    
    # Implement performance tuning
    tuning_result = optimizer.implement_performance_tuning('web-app', 'production')
    print(json.dumps(tuning_result, indent=2))
```

### Node-Level Performance Tuning

```bash
#!/bin/bash
# Node Performance Optimization Script

# Kernel parameter tuning for Kubernetes nodes
cat << EOF > /etc/sysctl.d/99-kubernetes-performance.conf
# Network performance
net.core.somaxconn = 32768
net.core.netdev_max_backlog = 5000
net.core.rmem_default = 262144
net.core.rmem_max = 16777216
net.core.wmem_default = 262144
net.core.wmem_max = 16777216
net.ipv4.tcp_rmem = 4096 65536 16777216
net.ipv4.tcp_wmem = 4096 65536 16777216
net.ipv4.tcp_congestion_control = bbr

# File system performance
fs.file-max = 2097152
fs.inotify.max_user_instances = 8192
fs.inotify.max_user_watches = 524288

# Memory management
vm.max_map_count = 262144
vm.swappiness = 1
vm.dirty_ratio = 15
vm.dirty_background_ratio = 5

# Process limits
kernel.pid_max = 4194304
kernel.threads-max = 4194304
EOF

# Apply kernel parameters
sysctl -p /etc/sysctl.d/99-kubernetes-performance.conf

# CPU governor optimization
echo 'performance' | tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor

# Disable swap for Kubernetes
swapoff -a
sed -i '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab

# Container runtime optimization (containerd)
cat << EOF > /etc/containerd/config.toml
version = 2

[plugins."io.containerd.grpc.v1.cri"]
  # Performance optimizations
  max_container_log_line_size = 16384
  max_concurrent_downloads = 10
  
  [plugins."io.containerd.grpc.v1.cri".containerd]
    default_runtime_name = "runc"
    
    [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc]
      runtime_type = "io.containerd.runc.v2"
      
      [plugins."io.containerd.grpc.v1.cri".containerd.runtimes.runc.options]
        SystemdCgroup = true
        
  [plugins."io.containerd.grpc.v1.cri".registry]
    [plugins."io.containerd.grpc.v1.cri".registry.mirrors]
      [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]
        endpoint = ["https://registry-1.docker.io"]
EOF

# Restart containerd
systemctl restart containerd

# Kubelet performance flags
cat << EOF > /etc/kubernetes/kubelet/kubelet-config.yaml
apiVersion: kubelet.config.k8s.io/v1beta1
kind: KubeletConfiguration
# Performance optimizations
maxPods: 250
podsPerCore: 10
kubeReserved:
  cpu: "100m"
  memory: "1Gi"
  ephemeral-storage: "1Gi"
systemReserved:
  cpu: "100m"
  memory: "1Gi"
  ephemeral-storage: "1Gi"
evictionHard:
  memory.available: "200Mi"
  nodefs.available: "10%"
  imagefs.available: "15%"
# Container log management
containerLogMaxSize: "50Mi"
containerLogMaxFiles: 5
# Image garbage collection
imageGCHighThresholdPercent: 85
imageGCLowThresholdPercent: 80
# CPU management
cpuManagerPolicy: "static"
topologyManagerPolicy: "best-effort"
# Memory management
memoryManagerPolicy: "Static"
reservedMemory:
- numaNode: 0
  limits:
    memory: "1Gi"
EOF

# Restart kubelet
systemctl restart kubelet

echo "Node performance optimization completed!"
```

### Advanced Monitoring and Alerting

```yaml
# Prometheus configuration for performance monitoring
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-performance-config
  namespace: monitoring
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
      evaluation_interval: 15s
    
    rule_files:
    - "/etc/prometheus/rules/*.yml"
    
    scrape_configs:
    # Kubernetes API server
    - job_name: 'kubernetes-apiservers'
      kubernetes_sd_configs:
      - role: endpoints
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
    
    # Node metrics
    - job_name: 'kubernetes-nodes'
      kubernetes_sd_configs:
      - role: node
      scheme: https
      tls_config:
        ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
      bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
      relabel_configs:
      - action: labelmap
        regex: __meta_kubernetes_node_label_(.+)
    
    # Pod metrics
    - job_name: 'kubernetes-pods'
      kubernetes_sd_configs:
      - role: pod
      relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)

---
# Performance alerting rules
apiVersion: v1
kind: ConfigMap
metadata:
  name: performance-alert-rules
  namespace: monitoring
data:
  performance.yml: |
    groups:
    - name: kubernetes-performance
      rules:
      # High CPU utilization
      - alert: HighCPUUtilization
        expr: (1 - rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100 > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU utilization on {{ $labels.instance }}"
          description: "CPU utilization is above 80% for more than 5 minutes"
      
      # High memory utilization
      - alert: HighMemoryUtilization
        expr: (1 - (node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes)) * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory utilization on {{ $labels.instance }}"
          description: "Memory utilization is above 85% for more than 5 minutes"
      
      # Pod restart rate
      - alert: HighPodRestartRate
        expr: rate(kube_pod_container_status_restarts_total[15m]) * 60 * 15 > 5
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High pod restart rate in {{ $labels.namespace }}/{{ $labels.pod }}"
          description: "Pod is restarting more than 5 times in 15 minutes"
      
      # API server latency
      - alert: HighAPIServerLatency
        expr: histogram_quantile(0.99, rate(apiserver_request_duration_seconds_bucket[5m])) > 1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High API server latency"
          description: "99th percentile latency is above 1 second"
```

**Performance Optimization Best Practices:**

1. **Resource Management**: Set appropriate requests and limits for all containers
2. **Node Optimization**: Tune kernel parameters and container runtime settings
3. **Scheduling**: Use node affinity, anti-affinity, and topology spread constraints
4. **Monitoring**: Implement comprehensive performance monitoring and alerting
5. **Autoscaling**: Configure HPA and VPA for dynamic resource management
6. **Storage**: Optimize persistent volume performance and storage classes
7. **Networking**: Choose appropriate CNI and optimize network policies
8. **Image Optimization**: Use multi-stage builds and optimize container images

---