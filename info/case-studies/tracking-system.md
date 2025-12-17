# Tracking System: 250M Monthly Requests, 263ms Latency

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

Designed multi-layer reverse proxy architecture enabling ShareASale's revenue-critical tracking system to remain functional during platform consolidation while appearing unchanged to 250K+ publisher integrations. Built production system bridging two incompatible platforms using Cloudflare Workers + AWS Lambda, maintaining 263ms average latency at 250M monthly requests with 99.5% revenue protection and 75% error rate reduction.

**Key Results:**
- **250M monthly requests** handled seamlessly
- **263ms average latency** maintained  
- **99.5% revenue protection** achieved
- **75% error rate reduction** through improved fault tolerance
- **Zero customer re-integration** required

---

## The Challenge

### Mission-Critical System

**Business Context:**
ShareASale's tracking system was responsible for capturing every affiliate transaction—the source of the company's revenue. During platform consolidation, this system needed to:

- Continue operating through multi-year migration
- Maintain 99.9%+ uptime (every dropped transaction = lost revenue)
- Require zero customer re-integration (250K+ publisher sites)
- Support 250M monthly tracking requests
- Preserve backward compatibility with legacy parameters

**Technical Reality:**
- **ShareASale platform:** Custom tracking URLs, parameters, cookie logic
- **Awin platform:** Different URL structure, parameters, attribution model  
- **Integration points:** 250K+ publisher websites with hardcoded tracking pixels
- **Business constraint:** Publishers cannot be asked to update their integrations

---

### The Problem

**Incompatible Platforms:**

ShareASale tracking request:
```
https://shareasale.com/r.cfm?b=123&u=456&m=789&urllink=example.com
```

Awin platform expected completely different structure, parameters, and processing logic.

**Cannot Change:**
- 250,000+ publisher websites have ShareASale tracking installed
- JavaScript tracking pixels embedded across millions of pages
- Deep links in emails, social media, and marketing materials
- Asking publishers to re-integrate = massive customer disruption

**Must Work:**
- Every tracking request must complete successfully
- Attribution logic must remain consistent  
- Performance cannot degrade
- Revenue cannot be impacted

---

## The Solution: Multi-Layer Reverse Proxy

### Architecture Overview

```
[Publisher Site] → [Cloudflare Edge]
                         ↓
                  [Routing Logic]
                         ↓
        ┌────────────────┴────────────────┐
        ↓                                 ↓
  [Awin Platform]                [ShareASale Legacy]
    (Primary)                         (Failover)
```

**Architecture Layers:**

**Layer 1: Cloudflare (Edge)**
- WAF rules for traffic filtering
- DDoS protection and rate limiting
- Initial routing decisions based on rules
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

---

### Cloudflare Workers Implementation

**Custom Routing Logic:**

```javascript
// Conceptual implementation
export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Parse ShareASale tracking parameters
    const params = {
      merchant: url.searchParams.get('m'),
      affiliate: url.searchParams.get('u'),
      banner: url.searchParams.get('b'),
      destination: url.searchParams.get('urllink')
    };
    
    // Translate to Awin format
    const awinParams = translateParameters(params);
    
    // Route to Awin platform
    try {
      const response = await fetch(awinPlatformUrl, {
        method: 'GET',
        headers: buildHeaders(awinParams)
      });
      
      if (response.ok) {
        return response;
      } else {
        // Failover to ShareASale legacy
        return await failoverToLegacy(params);
      }
    } catch (error) {
      // Handle errors, retry logic
      return await handleError(error, params);
    }
  }
};
```

**Key Features:**
- **Parameter translation:** ShareASale → Awin format
- **Intelligent routing:** Primary (Awin) with failover (ShareASale)
- **Retry logic:** Automatic retries on transient failures
- **Error handling:** Graceful degradation
- **Logging:** Request tracking for debugging

**Cloudflare Services Used:**
- **Workers:** Edge compute for routing logic
- **KV:** Configuration storage (routing rules, mappings)
- **D1:** Request logging and analytics
- **Wrangler:** Safe CI/CD deployment

---

### AWS Lambda Integration

**Awin-Side Processing:**

On the Awin platform side, AWS Lambda functions handled:

- **Request validation:** Ensure required parameters present
- **Data transformation:** Convert ShareASale data structures to Awin
- **Attribution logic:** Apply correct commission rules
- **Database writes:** Store transaction data in Awin systems
- **Response generation:** Return appropriate tracking pixel

**Technology Stack:**
- **Lambda:** TypeScript functions
- **API Gateway:** HTTP endpoint management
- **DynamoDB:** Fast key-value lookups
- **RDS:** Transaction storage
- **CloudWatch:** Logging and monitoring

**Integration Points:**
- Cloudflare Workers call AWS API Gateway
- Lambda functions process and route internally
- Awin backend systems receive standardized data
- Response flows back through proxy layers

---

### Observability & Monitoring

**Comprehensive Monitoring:**

**DataDog:**
- Distributed tracing across all layers (Cloudflare → AWS → Awin)
- Request latency percentiles (p50, p95, p99)
- Error rate tracking by type
- Custom dashboards for tracking health
- Anomaly detection and alerting

**CloudWatch:**
- Lambda execution metrics
- API Gateway performance
- RDS query performance  
- Cost tracking

**OpsGenie:**
- Incident escalation and on-call rotation
- Integration with DataDog alerts
- Escalation policies by severity
- Post-mortem workflow

**Custom Dashboards:**
- Real-time request volume
- Latency trends
- Error rates by category
- Failover frequency
- Geographic distribution

**Synthetic Monitoring:**
- Health checks every 5 minutes
- End-to-end tracking request simulation
- Alerting on failures
- Geographic diversity (multiple regions tested)

---

## Technical Challenges Solved

### Parameter Translation

**Challenge:**
ShareASale and Awin used completely different parameter structures and naming.

**Solution:**
Built translation layer with comprehensive mapping:

```javascript
const parameterMap = {
  // ShareASale → Awin
  'm': 'advertiser_id',
  'u': 'publisher_id', 
  'b': 'creative_id',
  'urllink': 'destination_url',
  'afftrack': 'tracking_reference'
  // ... dozens more parameters
};
```

**Complexity:**
- 50+ parameters to map
- Different data types (integers, strings, URLs)
- Conditional logic (some parameters only in certain contexts)
- Validation rules (ensure data integrity)

---

### Cookie Handling

**Challenge:**
ShareASale and Awin used different cookie structures for attribution.

**Solution:**
- Read ShareASale cookies at edge
- Translate to Awin cookie format
- Set both cookie formats during transition
- Gradually phase out ShareASale cookies

**Considerations:**
- Cookie expiration handling
- Domain scope differences
- GDPR/privacy compliance
- Cross-device attribution

---

### High Availability

**Challenge:**
99.9%+ uptime requirement with zero tolerance for revenue loss.

**Solution: Multi-Layer Failover**

**Primary Path:**
Publisher Site → Cloudflare → Awin Platform

**Failover Path 1:**
If Awin fails → Route to ShareASale Legacy

**Failover Path 2:**
If both fail → Return tracking pixel with retry queue

**Retry Logic:**
- Exponential backoff for transient failures
- Circuit breaker for persistent failures
- Dead letter queue for manual recovery

**Result:**
- 99.5% revenue protection (nearly perfect)
- No single point of failure
- Graceful degradation under stress

---

## Results

### Performance Metrics

**Scale:**
- **250M monthly tracking requests**
- ~95,000 requests per hour average
- ~1,600 requests per minute sustained
- Peaks 3-5x average during holidays

**Latency:**
- **263ms average response time**
- p50: 180ms
- p95: 450ms
- p99: 800ms

**Availability:**
- **99.5% revenue protection** (effectively 99.5% uptime)
- Zero scheduled downtime
- Unplanned outages < 4 hours annually

---

### Reliability Improvements

**Error Rate Reduction:**
- **75% error rate reduction** vs. legacy system
- Improved retry logic caught transient failures
- Better error handling prevented cascading failures
- Circuit breakers protected against overload

**Fault Tolerance:**
- Multi-layer failover prevented revenue loss
- Graceful degradation under stress
- No single point of failure
- Automatic recovery from transient issues

---

### Business Impact

**Revenue Protection:**
- **99.5% of transactions** captured successfully
- **$100M+ annual revenue** protected
- Zero customer disruption required
- Seamless migration from customer perspective

**Customer Experience:**
- **250K+ publishers:** Zero re-integration required
- **10K+ merchants:** Uninterrupted tracking
- No change to user-facing experience
- Maintained trust during complex migration

**Migration Enablement:**
- Bought time for permanent Awin solution development
- Allowed phased migration approach
- Reduced migration risk significantly
- Protected business continuity

---

## Lessons Learned

### What Worked Well

**Multi-Layer Approach:**
- Defense in depth provided resilience
- Multiple failover options prevented outages
- Flexibility to iterate on routing logic

**Edge Computing:**
- Cloudflare Workers = global low latency
- Zero cold starts (vs. AWS Lambda)
- Easy deployment and rollback
- Cost-effective at scale

**Comprehensive Monitoring:**
- Early detection of issues
- Fast incident response
- Data-driven optimization
- Clear visibility for stakeholders

---

### What I'd Do Differently

**Earlier Load Testing:**
- Should have load tested at full scale earlier
- Discovered some bottlenecks in production
- More aggressive synthetic traffic testing

**More Granular Alerts:**
- Initial alerts sometimes too noisy
- Refined over time but could have been better day 1
- More context in alert messages

**Documentation:**
- Runbooks created reactively
- Should have written comprehensive docs upfront
- Knowledge transfer could have been smoother

---

## What This Demonstrates

**For Tracking & Attribution Roles:**
- Revenue-critical system design and implementation
- High-availability architecture (99.5% revenue protection)
- Cookie-based attribution logic
- Cross-platform tracking integration

**For Platform Engineering:**
- Distributed systems at scale (250M requests/month)
- Multi-layer reverse proxy architecture
- Edge computing with Cloudflare Workers
- AWS Lambda serverless integration

**For Site Reliability Engineering:**
- High-availability system design
- Comprehensive observability (DataDog, CloudWatch)
- Incident response and on-call processes
- Performance optimization (263ms at scale)

**For Technical Leadership:**
- Complex system integration across organizations
- Risk management for revenue-critical systems
- Stakeholder communication (business + technical)
- Interim solution enabling long-term strategy

---

## Technologies Used

**Edge Layer:**
- Cloudflare Workers (JavaScript/Node.js)
- Cloudflare KV (configuration storage)
- Cloudflare D1 (request logging)
- Cloudflare WAF (security)
- Wrangler (deployment)

**CDN Layer:**
- Akamai (global distribution)
- Caching and routing rules

**Application Layer:**
- AWS Lambda (TypeScript)
- AWS API Gateway
- AWS DynamoDB
- AWS RDS (PostgreSQL)

**Observability:**
- DataDog (tracing, metrics, logs)
- CloudWatch (AWS monitoring)
- OpsGenie (incident management)
- Custom dashboards

---

## Contact

Building revenue-critical tracking systems or complex platform integrations? Let's discuss high-availability architecture, edge computing, and systems that protect business continuity.

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)  
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
