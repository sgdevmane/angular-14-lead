# Kubernetes Interview Questions

## Table of Contents
1. [Kubernetes Fundamentals](#kubernetes-fundamentals)
2. [Pods and Containers](#pods-and-containers)
3. [Services and Networking](#services-and-networking)
4. [Deployments and ReplicaSets](#deployments-and-replicasets)
5. [ConfigMaps and Secrets](#configmaps-and-secrets)
6. [Persistent Volumes](#persistent-volumes)
7. [Ingress and Load Balancing](#ingress-and-load-balancing)
8. [Monitoring and Logging](#monitoring-and-logging)

---

## Kubernetes Fundamentals

### Q1: What is Kubernetes and explain its architecture?
**Difficulty: Medium**

**Answer:**
Kubernetes (K8s) is an open-source container orchestration platform that automates deployment, scaling, and management of containerized applications. It provides a declarative approach to managing containerized workloads and services.

**Kubernetes Architecture:**

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

This comprehensive Kubernetes guide covers architecture, networking, and practical implementation examples for modern container orchestration.