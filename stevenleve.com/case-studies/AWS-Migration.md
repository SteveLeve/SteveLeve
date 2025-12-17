# **Case Study 2: AWS Migration & Modernization**

**Summary:** I led a six-month migration from managed hosting to AWS, modernizing critical systems while keeping operations running without downtime.

By 2022, our managed hosting provider had become a bottleneck. Performance was uneven, support was slow, and the infrastructure simply wasn’t scaling with the business. Leadership made the call to move everything to AWS — but the catch was that we had just six months to do it, and failure was not an option.

The first step was to evaluate strategies and present the trade-offs to leadership. We had to balance cost, risk, and speed, so I mapped out options ranging from quick lifts to deeper refactors. Once aligned, I coordinated external consultants and walked them through our quirky legacy systems so they could contribute effectively.

The work itself combined technical heavy lifting with culture change. We migrated SQL Server to AWS RDS and file clusters to FSx, rebuilt observability in Datadog and CloudWatch, and introduced deployment automation that shifted the organization toward a DevSecOps mindset. Along the way, we improved our disaster recovery posture and began decomposing monolithic services.

We finished the migration on time — with zero downtime. That success not only reduced infrastructure risk but also boosted confidence across the engineering team. It was a turning point: from that moment, observability, automation, and modernization weren’t just “nice to haves” — they became the standard for how we worked.