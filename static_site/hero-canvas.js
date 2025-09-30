// Hero Canvas Background Animation System
class HeroCanvas {
    constructor() {
        if (!document.body) {
            return;
        }
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'heroCanvas';
        this.canvas.setAttribute('aria-hidden', 'true');
        document.body.prepend(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.isLight = false;
        this.mouse = { x: 0, y: 0, isActive: false };
        this.dataBursts = [];
        this.animationPaused = false;
        this.animationId = null;
        this.particlePool = [];
        this.maxParticles = 100;
        this.performanceMode = 'auto';
        this.particles = [];
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.setupEventListeners();
        this.initializeParticles();
        this.setupThemeSync();
        this.setupPerformanceMonitoring();
        this.animate();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Responsive particle count
        const screenArea = this.canvas.width * this.canvas.height;
        if (screenArea < 500000) {
            this.maxParticles = 40;
        } else if (screenArea < 1000000) {
            this.maxParticles = 70;
        } else {
            this.maxParticles = 100;
        }
        
        // Adjust particles array
        if (this.particles.length > 0) {
            while (this.particles.length > this.maxParticles) {
                const particle = this.particles.pop();
                this.particlePool.push(particle);
            }
            while (this.particles.length < this.maxParticles && this.particlePool.length > 0) {
                this.particles.push(this.particlePool.pop());
            }
        }
    }
    
    setupEventListeners() {
        this.handlePointerMove = (event) => {
            this.mouse.x = event.clientX;
            this.mouse.y = event.clientY;
            this.mouse.isActive = true;
        };

        this.handlePointerLeave = () => {
            this.mouse.isActive = false;
        };

        this.handleClick = (event) => {
            if (event.defaultPrevented) return;
            const ignore = event.target.closest('[data-animation-toggle], .theme-toggle');
            if (ignore) return;
            this.createDataBurst(event.clientX, event.clientY);
        };

        window.addEventListener('mousemove', this.handlePointerMove);
        window.addEventListener('mouseout', (event) => {
            if (!event.relatedTarget || event.relatedTarget === document.documentElement) {
                this.handlePointerLeave();
            }
        });
        window.addEventListener('blur', this.handlePointerLeave);
        window.addEventListener('click', this.handleClick);
    }
    
    setupThemeSync() {
        const root = document.documentElement;
        const observer = new MutationObserver(() => {
            this.isLight = root.getAttribute('data-theme') === 'light';
        });
        observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
        this.isLight = root.getAttribute('data-theme') === 'light';
    }
    
    setupPerformanceMonitoring() {
        this.frameCount = 0;
        this.lastFpsCheck = Date.now();
        this.fps = 60;
        
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
            this.maxParticles = Math.min(this.maxParticles, 50);
        }
    }
    
    initializeParticles() {
        this.particles.length = 0;
        this.particlePool.length = 0;
        
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(new Particle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height,
                this.canvas
            ));
        }
    }
    
    createDataBurst(x, y) {
        this.dataBursts.push(new DataBurst(x, y));
    }
    
    checkPerformance() {
        this.frameCount++;
        const now = Date.now();
        if (now - this.lastFpsCheck >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.lastFpsCheck = now;
            
            if (this.performanceMode === 'auto') {
                if (this.fps < 30 && this.maxParticles > 30) {
                    this.maxParticles = Math.max(30, this.maxParticles - 10);
                    while (this.particles.length > this.maxParticles) {
                        this.particlePool.push(this.particles.pop());
                    }
                } else if (this.fps > 55 && this.maxParticles < 100) {
                    this.maxParticles = Math.min(100, this.maxParticles + 5);
                    while (this.particles.length < this.maxParticles && this.particlePool.length > 0) {
                        this.particles.push(this.particlePool.pop());
                    }
                }
            }
        }
    }
    
    animate() {
        this.checkPerformance();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.mouse);
            particle.draw(this.ctx, this.isLight);
        });
        
        // Draw connections
        const connectionLimit = this.canvas.width < 768 ? 200 : 500;
        let connectionCount = 0;
        for (let i = 0; i < this.particles.length && connectionCount < connectionLimit; i++) {
            for (let j = i + 1; j < this.particles.length && connectionCount < connectionLimit; j++) {
                const connection = new Connection(this.particles[i], this.particles[j]);
                connection.draw(this.ctx, this.isLight);
                connectionCount++;
            }
        }
        
        // Update and draw data bursts
        this.dataBursts.forEach(burst => {
            burst.update();
            burst.draw(this.ctx, this.isLight);
        });
        this.dataBursts = this.dataBursts.filter(burst => !burst.isDead());
        
        if (!this.animationPaused) {
            this.animationId = requestAnimationFrame(() => this.animate());
        }
    }
    
    toggleAnimation() {
        this.animationPaused = !this.animationPaused;
        this.updateAnimationToggleUI();

        if (!this.animationPaused) {
            this.animate();
        }
    }

    updateAnimationToggleUI() {
        const animationButton = document.querySelector('[data-animation-toggle]');
        const animationIcon = animationButton?.querySelector('[data-animation-icon]');
        const label = this.animationPaused ? 'Resume animation' : 'Pause animation';

        if (animationButton) {
            animationButton.setAttribute('aria-label', label);
            animationButton.setAttribute('title', label);
        }

        if (animationIcon) {
            animationIcon.textContent = this.animationPaused ? 'play_arrow' : 'pause';
        }
    }
}

class Particle {
    constructor(x, y, canvas) {
        this.canvas = canvas;
        this.reset(x, y);
    }
    
    reset(x, y) {
        this.x = x || Math.random() * this.canvas.width;
        this.y = y || Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 3 + 1;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
        this.type = Math.random() > 0.7 ? 'data' : 'node';
    }
    
    update(mouse) {
        if (mouse.isActive) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                const force = (100 - distance) / 100 * 0.02;
                this.vx += (dx / distance) * force;
                this.vy += (dy / distance) * force;
            }
        }
        
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
        this.life--;
        
        this.alpha = this.life / this.maxLife;
        
        if (this.life <= 0) {
            this.reset();
        }
    }
    
    draw(ctx, isLight) {
        const colors = isLight ? 
            ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'] :
            ['#60A5FA', '#34D399', '#FBBF24', '#F87171'];
        
        ctx.save();
        ctx.globalAlpha = this.alpha * 0.8;
        
        if (this.type === 'data') {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        } else {
            ctx.strokeStyle = colors[0];
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.restore();
    }
}

class Connection {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.strength = Math.random();
    }
    
    draw(ctx, isLight) {
        const distance = Math.sqrt(
            Math.pow(this.p2.x - this.p1.x, 2) + 
            Math.pow(this.p2.y - this.p1.y, 2)
        );
        
        if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = (1 - distance / 150) * 0.3 * this.strength;
            ctx.strokeStyle = isLight ? '#3B82F6' : '#60A5FA';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.p1.x, this.p1.y);
            ctx.lineTo(this.p2.x, this.p2.y);
            ctx.stroke();
            ctx.restore();
        }
    }
}

class DataBurst {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * 3,
                vy: Math.sin(angle) * 3,
                life: 60,
                maxLife: 60
            });
        }
    }
    
    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95;
            p.vy *= 0.95;
            p.life--;
        });
        this.particles = this.particles.filter(p => p.life > 0);
    }
    
    draw(ctx, isLight) {
        this.particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillStyle = isLight ? '#3B82F6' : '#60A5FA';
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    
    isDead() {
        return this.particles.length === 0;
    }
}

// Global instance and functions
let heroCanvas;

function toggleAnimation() {
    if (heroCanvas) {
        heroCanvas.toggleAnimation();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    heroCanvas = new HeroCanvas();

    const animationToggle = document.querySelector('[data-animation-toggle]');
    if (animationToggle) {
        animationToggle.addEventListener('click', (event) => {
            event.preventDefault();
            toggleAnimation();
        });
    }

    const root = document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (!root.getAttribute('data-theme')) {
        root.setAttribute('data-theme', systemTheme);
    }

    if (heroCanvas) {
        heroCanvas.updateAnimationToggleUI();
    }
});
