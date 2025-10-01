# ADR-002: Astro Project Initialization Method

## Status
Accepted

## Context
We need to initialize the Astro project for the consulting website. There are two primary approaches:

1. **Standard Astro Creation**: `npm create astro@latest` then add Cloudflare adapter
2. **Cloudflare-Optimized Creation**: `npm create cloudflare@latest -- my-astro-app --framework=astro`

The Cloudflare documentation specifically recommends their creation method for Workers/Pages deployment, which suggests it may provide better default configuration and integration.

## Decision
We will use the **Cloudflare-optimized creation method**:
```bash
npm create cloudflare@latest -- consulting-website --framework=astro
```

## Rationale

### Advantages of Cloudflare Method
- **Pre-configured Integration**: Likely includes Cloudflare adapter and optimal configuration out of the box
- **Deployment Ready**: Should include wrangler.toml and deployment scripts configured for Cloudflare
- **Best Practices**: Cloudflare's recommended approach suggests it follows their platform best practices
- **Time Savings**: Reduces manual configuration steps for Cloudflare-specific setup
- **Official Support**: Using the officially recommended method ensures better compatibility

### Comparison Analysis
| Aspect | Standard Astro | Cloudflare Method |
|--------|---------------|-------------------|
| Initial Setup | Manual adapter config | Pre-configured |
| Cloudflare Integration | Requires manual setup | Built-in |
| Deployment Config | Manual wrangler.toml | Auto-generated |
| Documentation Alignment | Generic | Platform-specific |
| Future Updates | Manual maintenance | Aligned with CF updates |

### Risk Assessment
- **Low Risk**: Both methods produce valid Astro projects
- **Mitigation**: If Cloudflare method has limitations, we can always eject or reconfigure
- **Validation**: We can verify the generated configuration meets our requirements

## Implementation Plan
1. Use `npm create cloudflare@latest -- consulting-website --framework=astro`
2. Verify generated project structure and configuration
3. Add React integration if not included by default
4. Configure TypeScript if not already set up
5. Add Tailwind CSS for styling consistency

## Expected Outcomes
- Astro project optimized for Cloudflare deployment
- Pre-configured wrangler.toml for Workers/Pages
- Reduced manual configuration overhead
- Faster path to first deployment

## Consequences

### Positive
- Faster setup with platform-optimized defaults
- Reduced configuration errors
- Better alignment with Cloudflare best practices
- Official support and documentation

### Negative
- Less control over initial configuration choices
- Potential for Cloudflare-specific opinions we need to override
- Dependency on Cloudflare's project template maintenance

### Monitoring
- Verify React integration works as expected
- Ensure TypeScript configuration meets our needs
- Validate Tailwind CSS can be added without conflicts
- Test local development experience

## Related Decisions
- Links to ADR-001 (Technology Stack Selection)
- Future ADR for deployment configuration refinements

---
**Date**: 2025-01-30  
**Author**: Steve Leve  
**Decision Driver**: Cloudflare documentation recommendation and platform optimization