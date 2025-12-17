# Platform Consolidation at Scale: $100M+ Revenue Protected

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

Led technical strategy for consolidating two major affiliate marketing platforms following acquisition—protecting $100M+ annual revenue while migrating 250,000 publishers and 10,000 merchants. Coordinated 15 teams across multi-year program, designing critical system integrations that enabled zero customer re-work and 98% revenue protection. This represents one of the most complex platform migrations in affiliate marketing history.

**Key Results:**
- **98% revenue protected** through targeted feature parity
- **260K accounts migrated** with 85% acceptance rate
- **250M monthly requests** handled at 263ms latency
- **Zero customer re-integration** required for tracking
- **15 teams coordinated** across two organizations

---

## The Challenge

### Acquisition Context

**Background:**
- Awin Global acquired ShareASale (2017)
- Two platforms serving overlapping markets
- Different technology stacks and business models
- Redundant operational costs

**Executive Decision (2023):**
- Sunset ShareASale platform entirely
- Migrate all customers to Awin global platform
- Consolidate operations for cost efficiency
- Timeline: Multi-year program (2023-2025)

### The Scope

**ShareASale Platform Scale:**
- **Publishers:** 250,000 affiliate partners
- **Merchants:** 10,000 advertisers
- **Transactions:** $1B+ annual GMV
- **Revenue:** $100M+ annual
- **Tracking Requests:** 250M monthly

**Technical Complexity:**
- 15+ years of custom features
- Mission-critical tracking system (99.9%+ uptime required)
- Advanced attribution features not in Awin platform
- Legacy integrations with 250K+ publisher sites
- Complex payment and fee structures

**Business Risk:**
- Every transaction = revenue (cannot drop tracking)
- Customer churn would devastate revenue
- Competitive landscape highly sensitive to service disruption
- Reputation damage from poor migration = long-term impact

---

## My Role

### Principal Architect - Technical Strategy & Integration

**Responsibilities:**
1. Design overall migration strategy and roadmap
2. Lead critical system integrations (tracking, transactions, accounts)
3. Coordinate cross-company technical teams (15+)
4. Provide subject matter expertise on ShareASale systems
5. Technical liaison between leadership and engineering
6. Risk identification and mitigation planning

**Engagement:**
- Full-time role (2023-2025)
- Reporting to CTO/VP Engineering
- Cross-functional collaboration with product, InfoSec, legal, finance
- Distributed team across US and Europe

---

## Strategic Approach

### Phase 1: Discovery & Strategy (2023)

**Executive Alignment:**
- Facilitated C-level workshops defining business objectives
- Translated technical constraints into business impact
- Established success criteria and risk thresholds
- Secured budget and resource allocation

**Technical Assessment:**
- Comprehensive feature mapping between platforms
- Identified capability gaps requiring legal/finance consultation
- Analyzed usage patterns and revenue attribution
- Prioritized features by business value and technical complexity

**Migration Strategy:**
- Phased approach with interim solutions
- Zero customer re-integration requirement
- Revenue protection as primary constraint
- Feature parity for highest-value capabilities

**Cross-Company Collaboration:**
- Initiated collaboration with 15+ teams across organizations
- Established communication channels and decision frameworks
- Created shared documentation and knowledge transfer processes
- Aligned engineering practices and tooling

---

### Phase 2: Critical System Integration (2024-2025)

## Tracking System Integration

### The Challenge

**Mission-Critical System:**
- 250M monthly requests
- 99.9%+ uptime required (every transaction = revenue)
- 250K+ publisher integrations (JavaScript tracking pixels)
- Cannot require customer re-integration
- Must maintain backward compatibility

**Awin Platform Gap:**
- Different tracking parameter structure
- Different URL patterns
- Different cookie handling
- Different attribution logic

**Business Constraint:**
- Zero tolerance for transaction loss
- No customer re-work acceptable
- Must appear unchanged externally
- Seamless transition required

---

### The Solution: Multi-Layer Reverse Proxy

**Architecture Layers:**

**Layer 1: Cloudflare (Edge)**
- WAF rules for traffic filtering
- Rate limiting and DDoS protection
- Initial routing decisions
- Custom Workers for intelligent request handling

**Layer 2: Akamai (CDN)**
- Global traffic distribution
- Caching for static content
- Secondary failover routing
- Geographic load balancing

**Layer 3: AWS (Application)**
- Lambda functions for request transformation
- Parameter translation ShareASale ↔ Awin
- Retry and failover logic
- Integration with Awin backend systems

**Custom Cloudflare Workers Solution:**
```
[Publisher Site] → [Cloudflare WAF]
                          ↓
                   [Routing Logic]
                          ↓
           ┌──────────────┴──────────────┐
           ↓                             ↓
   [Awin Platform]              [ShareASale Legacy]
       (Primary)                     (Failover)
```

**Implementation:**
- JavaScript/Node.js custom routing logic
- Cloudflare KV for configuration storage
- D1 for request logging and analytics
- Wrangler for safe CI/CD deployment

**Observability:**
- DataDog tracing across all layers
- CloudWatch metrics and alarms
- OpsGenie integration for incident escalation
- Custom dashboards for real-time visibility
- Synthetic monitoring for health checks

---

### Results: Tracking System

**Performance:**
- **250M monthly requests** handled seamlessly
- **263ms average latency** maintained
- **99.5% revenue protection** achieved
- **75% error rate reduction** through improved fault tolerance

**Business Impact:**
- **Zero customer re-integration** required
- No tracking disruption during migration
- Maintained publisher trust and relationships
- Protected $100M+ annual revenue stream

**Technical Achievement:**
Built production system bridging two incompatible platforms while maintaining sub-second latency and near-perfect reliability at massive scale.

---

## Transaction Processing Integration

### The Challenge

**ShareASale Unique Features:**
- Advanced multi-touch attribution
- Complex commission rules
- Flexible transaction modifiers
- Custom data fields
- Real-time transaction relay

**Business Requirement:**
- Maintain attribution capabilities for power users
- Synchronize transactions between platforms during migration
- Support accounts operating on both platforms
- Zero transaction loss during cutover

---

### The Solution: Transaction Relay Microservice

**Architecture:**
```
[ShareASale Transaction Processor]
             ↓
    [Translation Layer]
             ↓
    [Relay Microservice] ←→ [Awin Transaction System]
             ↓
       [Validation & Monitoring]
```

**Implementation:**
- C#, SQL Server for core processing
- AWS (EKS, SQS) for microservice infrastructure
- Rust for high-performance translation layer
- DataDog for comprehensive observability

**Feature Parity Work:**
- Analyzed 20+ attribution features
- Prioritized by usage frequency and revenue impact
- Implemented top 95% by revenue
- Documented gaps with workarounds

**Data Synchronization:**
- Real-time transaction relay
- Bidirectional sync for hybrid accounts
- Conflict resolution logic
- Audit trail for reconciliation

---

### Results: Transaction Processing

**Scale:**
- **25K daily transactions** processed
- **95% feature parity** by revenue
- Sub-second processing latency
- Zero transaction loss during migration

**Business Impact:**
- Enabled seamless platform switch for customers
- Maintained advanced attribution for power users
- Protected merchant relationships
- Smooth transition without disruption

---

## Account Migration System

### The Challenge

**Scope:**
- 260K accounts (250K publishers + 10K merchants)
- Complex relationship data
- Account balances and payment history
- Custom settings and preferences
- Legal: New terms of service acceptance required

**Technical Complexity:**
- Different account structures between platforms
- Different permission models
- Different data normalization
- Data validation and integrity checks

---

### The Solution: Collaborative Migration System

**My Contribution:**
- Provided ShareASale system expertise and documentation
- Co-designed schema mapping with Awin engineering team
- Conducted comprehensive data analysis
- Validated migration workflows
- Participated in QA and defect triage

**Technology Stack:**
- Java, Spring (Awin platform)
- AWS DocumentDB, SQL Server
- DataBricks for data analysis
- Postman, Curl, PowerShell for testing

**Migration Workflow:**
1. Account data extraction from ShareASale
2. Data transformation and validation
3. Import into Awin platform
4. Relationship mapping and preservation
5. User notification and acceptance flow
6. Verification and reconciliation

---

### Results: Account Migration

**Scale:**
- **260K accounts migrated** successfully
- **85% acceptance rate** on first login
- Account balances preserved accurately
- Relationships maintained intact

**Business Impact:**
- Met executive timeline expectations
- Maintained customer trust through smooth process
- Protected business continuity
- Minimal customer support burden

---

## Product Datafeed Migration

### The Challenge

**ShareASale Datafeed System:**
- Self-hosted FTP for merchant uploads
- ETL pipeline processing product catalogs
- Thousands of merchant catalogs
- Millions of products synchronized

**Awin Gap:**
- Could pull from merchant FTP endpoints
- No direct upload capability
- Different processing workflow
- New system 6+ months away

**Business Risk:**
- Merchants depend on datafeed uploads daily
- Disruption = customer churn
- Revenue at risk ($X million from datafeed-dependent features)

---

### The Solution: Interim SFTP Sync

**Stopgap Design:**
- Used ShareASale FTP as source
- Awin systems pull from ShareASale
- Scheduled synchronization (PowerShell automation)
- Minimal engineering effort ("vibe-coded")

**My Role:**
- Identified viable interim solution
- Conducted log and data analysis for prioritization
- Fixed flaws in archiving system
- Designed secure workflow
- Coordinated with data teams

---

### Results: Datafeed Migration

**Impact:**
- **62% of top merchants** protected (powerrank top 100)
- Seamless automated sync enabled
- Merchants continued operations without re-integration
- Bought time for permanent solution
- Revenue preserved during transition

**Lessons:**
- Sometimes "good enough" is better than "perfect but late"
- Creative re-purposing of existing systems
- Data analysis drives prioritization

---

## Overall Results

### Business Outcomes

**Revenue Protection:**
- **98% revenue protected** through targeted feature parity
- $100M+ annual revenue stream maintained
- Minimal customer churn (<5% attributable to migration)
- Competitive position preserved

**Customer Experience:**
- **Zero re-integration** required for 250K+ publishers
- **85% acceptance rate** on first login (target: 90%)
- Minimal support ticket volume
- Maintained platform trust

**Operational Efficiency:**
- Consolidated from 2 platforms to 1
- Reduced operational overhead
- Simplified compliance and security
- Unified product roadmap

---

### Technical Achievements

**Scale:**
- **250M monthly tracking requests** at 263ms latency
- **25K daily transactions** processed
- **260K accounts** migrated with data integrity
- Multi-year program delivered on executive timeline

**Reliability:**
- **99.5% revenue protection** during migration
- **75% error rate reduction** through proxy architecture
- Zero critical outages attributable to migration
- Maintained SLAs throughout transition

**Coordination:**
- **15 teams aligned** across two organizations
- Clear communication channels established
- Knowledge transfer completed
- Distributed execution successful

---

## Lessons Learned

### What Worked Well

**Interim Solutions:**
- Proxy architecture bought time for permanent solutions
- Pragmatic stopgaps (datafeed sync) prevented disruption
- "Good enough" > "perfect but late"

**Cross-Functional Collaboration:**
- Early stakeholder alignment prevented rework
- Regular communication maintained momentum
- Shared documentation reduced friction
- Clear decision framework enabled progress

**Phased Approach:**
- Risk mitigation through incremental rollout
- Canary deployments caught issues early
- Rollback capability provided safety net

---

### What I'd Do Differently

**Earlier Customer Communication:**
- More proactive outreach before migration
- Better explanation of benefits to users
- More training resources available

**More Aggressive Testing:**
- Load testing earlier in process
- More end-to-end scenarios
- Chaos engineering for failure modes

**Documentation:**
- Start runbooks earlier
- More comprehensive knowledge transfer
- Better onboarding materials for operations

---

## What This Demonstrates

**For Enterprise Architecture Roles:**
- Multi-year program strategy and execution
- Cross-company coordination at scale
- Complex system integration
- Risk management and mitigation

**For Technical Leadership Roles:**
- Strategic thinking balanced with hands-on architecture
- Team coordination across 15+ groups
- Stakeholder management (C-level to engineers)
- Delivery under business-critical constraints

**For Platform Engineering Roles:**
- Distributed systems design (proxy architecture)
- High-availability systems (99.5% revenue protection)
- Performance optimization (263ms at 250M requests/month)
- Observability and monitoring at scale

**For MarTech Roles:**
- Deep affiliate marketing platform expertise
- Tracking and attribution systems
- Transaction processing at scale
- Product and business model understanding

---

## Technologies Used

**Infrastructure:**
- Cloudflare (Workers, WAF, CDN)
- Akamai (CDN, global distribution)
- AWS (Lambda, EKS, SQS, DocumentDB)

**Languages & Frameworks:**
- JavaScript/Node.js (Cloudflare Workers)
- TypeScript (Lambda functions)
- C# (transaction processing)
- Rust (high-performance relay)
- Java/Spring (Awin platform)
- PowerShell (automation)

**Databases:**
- SQL Server (ShareASale legacy)
- PostgreSQL (Awin platform)
- DocumentDB (NoSQL)
- DataBricks (analytics)

**Observability:**
- DataDog (tracing, metrics, logging)
- CloudWatch (AWS monitoring)
- OpsGenie (incident management)
- Custom dashboards

---

## Contact

Interested in discussing complex platform migrations, system integration at scale, or affiliate marketing technology? Let's connect.

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)  
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
