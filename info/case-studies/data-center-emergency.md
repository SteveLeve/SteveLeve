# Data Center Emergency: From Disaster to Virtualized in 12 Months

[← Back to Case Studies](../case-studies.md)

---

## Executive Summary

During ShareASale's acquisition, discovered the primary data center housing core systems was closing in 12 months. Led emergency migration of 20 undocumented servers scattered across 4 locations with zero budget for consultants and limited engineering capacity. Reverse-engineered entire infrastructure using PowerShell automation, designed phased VMware migration, and executed ahead of schedule with zero revenue loss—transforming an existential business risk into manageable virtualized assets.

**Key Results:**
- **12 physical servers → VMware private cloud** in <12 months
- **Zero revenue loss** during migration
- **Existential business risk eliminated** ahead of deadline
- **Foundation created** for future AWS cloud migration
- **No budget required** for external consultants

---

## The Challenge

### Crisis Context

**Discovery (Early 2018):**
- ShareASale had just been acquired
- Simultaneous leadership turnover
- Primary data center (NTT) scheduled to close in 12 months
- **Existential threat** to business operations

**Infrastructure Reality:**
- **Nearly 20 servers** (mostly physical) scattered across **4 data centers**
- **Minimal documentation** of systems, dependencies, configurations
- **Tribal knowledge only** (undocumented assumptions)
- Mix of production, backup, and utility systems
- Critical revenue-generating applications

**Resource Constraints:**
- **Zero budget** for migration consultants
- **Limited engineering staff** capacity
- Concurrent acquisition integration activities ongoing
- **Cannot disrupt revenue** during migration
- No margin for error

---

## The Situation

### What We Faced

**Documentation Gap:**
- No comprehensive inventory of systems
- Unknown dependencies between services
- Unclear configuration details
- Missing network diagrams
- No recovery procedures

**Data Centers:**
1. **Primary (NTT):** Majority of production systems - CLOSING
2. **Secondary:** Backup and DR systems
3. **Tertiary:** Utility and support systems
4. **Managed Hosting:** Additional scattered services

**Technical Complexity:**
- Windows and Linux servers
- Various SQL Server versions
- File shares with complex permissions
- Scheduled tasks and custom scripts
- Network interdependencies

**Business Stakes:**
- Revenue-generating applications can't go down
- Customer-facing services must remain available
- Affiliate payments depend on these systems
- Competitive market = zero tolerance for disruption

---

## The Approach

### Phase 1: Discovery & Documentation (Months 1-3)

**Reverse Engineering with PowerShell:**

Instead of manual documentation, automated discovery:

```powershell
# Remote inventory script (conceptual)
$servers = Get-ADComputer -Filter * | Where-Object Name -like "PROD*"

foreach ($server in $servers) {
    # Inventory services
    Get-Service -ComputerName $server
    
    # Inventory scheduled tasks
    Get-ScheduledTask -ComputerName $server
    
    # Inventory file shares
    Get-SmbShare -CimSession $server
    
    # Inventory network configuration
    Get-NetAdapter -CimSession $server
    
    # Export to structured data
    Export-Csv "inventory-$($server.Name).csv"
}
```

**Discovery Output:**
- Complete service inventory per server
- Scheduled task catalog with scripts
- File share permissions documentation
- Network configuration details
- Dependency mapping between systems

**Created:**
- Central repository for all unmanaged code
- Configuration baselines for each system
- Network dependency diagrams
- Recovery priority ranking

---

### Phase 2: Migration Planning (Months 3-6)

**Migration Strategy Evaluation:**

**Option A: Physical-to-Virtual (P2V)**
- Migrate physical servers to VMware
- Faster than rebuilding
- Preserves exact configurations
- **Selected for majority**

**Option B: Physical-to-Physical (P2P)**
- New physical servers at new location
- Contingency for P2V failures
- Higher cost and complexity
- **Backup plan only**

**Option C: Rebuild from Scratch**
- Too slow given timeline
- High risk of errors
- Requires extensive testing
- **Not viable**

**Vendor Negotiations:**
- Negotiated VMware capacity with hosting provider
- Secured backup data center access
- Established transition timelines
- Confirmed network connectivity options

**Phased Migration Design:**
- **Wave 1:** Non-critical utility systems (test process)
- **Wave 2:** Secondary/backup systems (low risk)
- **Wave 3:** Production application servers
- **Wave 4:** Database servers (highest risk, most critical)

**Risk Mitigation:**
- Keep backup data center active during transition
- Ability to rollback at any point
- Weekend/off-hours migration windows
- Extensive testing before production cutover

---

### Phase 3: Automation & Remediation (Months 4-8)

**PowerShell Deployment Scripts:**

Automated configuration replication:

```powershell
# Configuration replication script (conceptual)
function Replicate-ServerConfig {
    param($SourceServer, $TargetServer)
    
    # Copy scheduled tasks
    $tasks = Get-ScheduledTask -CimSession $SourceServer
    foreach ($task in $tasks) {
        Register-ScheduledTask -CimSession $TargetServer -Xml $task.Xml
    }
    
    # Replicate file shares
    $shares = Get-SmbShare -CimSession $SourceServer
    foreach ($share in $shares) {
        New-SmbShare -CimSession $TargetServer -Name $share.Name -Path $share.Path
        # Apply permissions
    }
    
    # Configure services
    $services = Get-Service -ComputerName $SourceServer
    foreach ($service in $services) {
        Set-Service -ComputerName $TargetServer -Name $service.Name -StartupType $service.StartMode
    }
}
```

**Technical Debt Resolution:**

**Problem: Hardcoded IP Addresses**
- Found throughout codebase and configs
- Would break after migration to new network
- **Solution:** Refactored to use DNS names
- Created migration mapping for IP transitions

**Problem: Insecure Credential Storage**
- Passwords in plain text config files
- Scheduled tasks with embedded credentials
- **Solution:** Migrated to Windows Credential Manager
- Implemented proper secret management

**Problem: Undocumented Dependencies**
- Services assumed other services without explicit checks
- **Solution:** Added dependency validation
- Created startup orchestration scripts

**Testing Framework:**
- Automated testing of service functionality
- Validation of scheduled task execution
- File share access verification
- Application smoke tests

---

### Phase 4: Execution (Months 8-12)

**Migration Waves:**

**Wave 1: Utility Systems (Month 8)**
- File servers
- Print servers
- Monitoring tools
- **Result:** Validated P2V process, identified issues

**Wave 2: Secondary Systems (Month 9)**
- Backup systems
- Reporting servers
- Development/staging environments
- **Result:** Refined migration procedures

**Wave 3: Application Servers (Month 10-11)**
- Web application servers
- API servers
- Batch processing systems
- **Result:** Critical applications migrated successfully

**Wave 4: Database Servers (Month 11-12)**
- SQL Server migration (most critical)
- Master databases
- Transaction processing databases
- **Result:** Zero data loss, minimal downtime

**Business Continuity:**
- Backup data center remained active throughout
- Ability to switch back if issues discovered
- Monitoring for any performance degradation
- Customer communication plan ready (never needed)

---

## Results

### Migration Outcomes

**Timeline:**
- **12 physical servers → VMware** in <12 months
- Completed ahead of data center closure deadline
- Some systems migrated early to reduce pressure

**Business Impact:**
- **Zero revenue loss** during entire migration
- **No customer-facing downtime**
- **Existential risk eliminated**
- Business continuity protected

**Technical Transformation:**
- Undocumented physical servers → Managed virtual infrastructure
- Tribal knowledge → Written documentation
- Manual processes → Automated deployment scripts
- Unknown dependencies → Mapped architecture

---

### Foundation for Future

**AWS Cloud Migration (2022):**
- Documentation created in 2018 used for 2022 AWS migration
- PowerShell automation scripts adapted for cloud
- Lessons learned applied to larger migration
- Virtualization first step toward cloud

**Operational Improvements:**
- Configuration management practices established
- Documentation culture initiated
- Disaster recovery procedures created
- Technical debt reduction begun

---

## Key Insights

### When You Can't Afford Consultants

**Automation Becomes Force Multiplier:**
- PowerShell scripts replicated months of manual work
- Repeatable processes reduced errors
- Documentation generated automatically
- Time investment paid off immediately

**Small Team, Big Impact:**
- Strategic automation enabled small team to accomplish large migration
- Focused effort on highest-value work
- Delegated mechanical tasks to scripts

### Documentation Pays Dividends

**Created Once, Used Many Times:**
- 2018 documentation used for:
  - Ongoing operations (2018-2022)
  - Troubleshooting and support
  - New employee onboarding
  - 2022 AWS migration planning
  - Disaster recovery procedures

**ROI:**
- Time invested: ~200 hours (documentation + automation)
- Time saved: 1000+ hours over 4 years
- **5x return minimum**

---

## Lessons Learned

### What Worked Well

**Automation First:**
- PowerShell investment paid off immediately
- Repeatable processes crucial for reliability
- Documentation generated as byproduct
- Enabled small team to accomplish large task

**Phased Approach:**
- Start with low-risk systems to learn
- Refine process before critical systems
- Build confidence through early wins
- Rollback capability maintained throughout

**Risk Management:**
- Backup data center safety net critical
- Weekend migration windows reduced risk
- Extensive testing prevented issues
- Conservative timeline allowed for problems

---

### What I'd Do Differently

**Start Documentation Earlier:**
- Should have been ongoing, not crisis-driven
- Prevented knowledge loss from turnover
- Would have accelerated migration

**More Aggressive Remediation:**
- Could have fixed more technical debt
- Focused on migration, deferred some improvements
- Left some debt for future

**Better Change Management:**
- Communication could have been more proactive
- Some stakeholders surprised by changes
- More documentation of decisions

---

## What This Demonstrates

**For Infrastructure Roles:**
- Emergency response and crisis management
- Physical-to-virtual migration expertise
- PowerShell automation and scripting
- Technical debt identification and resolution

**For Technical Leadership:**
- Resource-constrained execution
- Risk management and mitigation
- Stakeholder communication under pressure
- Team coordination during crisis

**For DevOps / Automation:**
- Infrastructure automation with PowerShell
- Configuration management practices
- Documentation generation from code
- Repeatable deployment processes

**For Problem-Solving:**
- Creative solutions under constraints
- Automation as force multiplier
- Systematic approach to complex problems
- Turning crisis into opportunity

---

## Technologies Used

**Migration Platform:**
- VMware vSphere (virtualization)
- P2V migration tools
- Network configuration tools

**Automation:**
- PowerShell remoting
- PowerShell DSC concepts
- Scheduled task automation
- File share replication scripts

**Operating Systems:**
- Windows Server (various versions)
- Linux (CentOS, Ubuntu)
- SQL Server (2008, 2012, 2014)

**Documentation:**
- Markdown for documentation
- Excel for inventory tracking
- Visio for network diagrams
- Git for version control

---

## Contact

Faced with infrastructure emergency or resource-constrained migration? Let's discuss automation strategies, crisis management, and turning constraints into opportunities.

**Get in Touch:** [stevenleve.com/contact](https://stevenleve.com/contact)  
**LinkedIn:** [linkedin.com/in/steve-leve](https://linkedin.com/in/steve-leve)

---

[← Back to Case Studies](../case-studies.md)
