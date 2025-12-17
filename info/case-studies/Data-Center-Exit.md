# **Case Study: Data Center Exit Under Austerity**

**Summary:** With a data center shutting down and no clear documentation, I led a high-stakes migration that stabilized the business and paved the way for modernization.

When ShareASale was acquired, we quickly learned that our hosting environment was at risk. The primary data center was scheduled to close, and nearly twenty undocumented servers were scattered across multiple facilities. There was no budget for consultants, little staff capacity, and almost no documentation to rely on. The situation was stark: if we didn’t act quickly, the business could have faced catastrophic downtime.

I rolled up my sleeves and began mapping the unknown. Using PowerShell scripts, I reverse-engineered each server to catalog tasks, services, and configurations. Slowly, we turned tribal knowledge into written assets. This gave us the foundation to design a realistic migration plan that balanced urgency with safety.

We negotiated with vendors and chose a VMware-based “lift-and-shift” strategy, with contingency plans in place. My scripts automated much of the configuration replication, so we could migrate in phases without introducing new risk. By carefully sequencing workloads and using the backup data center as a safety net, we maintained customer continuity through the transition.

In less than a year, we eliminated an existential business risk. Those undocumented legacy servers were transformed into managed, virtualized assets, and the company gained a clear path forward. Most importantly, no customers experienced disruption, and the groundwork was laid for the later AWS migration.

---

# **Case Study 2: AWS Migration & Modernization**

**Summary:** I led a six-month migration from managed hosting to AWS, modernizing critical systems while keeping operations running without downtime.

By 2022, our managed hosting provider had become a bottleneck. Performance was uneven, support was slow, and the infrastructure simply wasn’t scaling with the business. Leadership made the call to move everything to AWS — but the catch was that we had just six months to do it, and failure was not an option.

The first step was to evaluate strategies and present the trade-offs to leadership. We had to balance cost, risk, and speed, so I mapped out options ranging from quick lifts to deeper refactors. Once aligned, I coordinated external consultants and walked them through our quirky legacy systems so they could contribute effectively.

The work itself combined technical heavy lifting with culture change. We migrated SQL Server to AWS RDS and file clusters to FSx, rebuilt observability in Datadog and CloudWatch, and introduced deployment automation that shifted the organization toward a DevSecOps mindset. Along the way, we improved our disaster recovery posture and began decomposing monolithic services.

We finished the migration on time — with zero downtime. That success not only reduced infrastructure risk but also boosted confidence across the engineering team. It was a turning point: from that moment, observability, automation, and modernization weren’t just “nice to haves” — they became the standard for how we worked.