import { useRef, useEffect } from 'react';
import Particle from './libs/Particle';
import { random } from './libs/random';

export function createParticles(count: number) {
    return Array.from({ length: count }).map(() => new Particle());
}

export default function App() {
    const particleRef = useRef(createParticles(600));

    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        canvas.style.backgroundColor = '#362F4F';
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        if (!ctx) return;

        let frameId: number;

        const animate = () => {
            const particles = particleRef.current;
            ctx.fillStyle = '#362f4f99';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);


            ctx.globalCompositeOperation = 'lighter';

            particles.forEach(p => {
                const progress = p.life / p.maxLife;
                const green = Math.floor(80 * Math.pow((1 - progress), 4));
                const blue = Math.floor(100 * Math.pow(1 - progress, 10));
                const opacity = Math.pow(1 - progress, 3);
                const size = p.size - (progress * p.size);

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
                gradient.addColorStop(0, `rgba(180, ${green}, ${blue}, ${opacity})`);
                gradient.addColorStop(0.6, `rgba(180, ${green}, 0, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();

                const offsetX = p.x - (window.innerWidth / 2);
                const pullStrength = offsetX * 0.05;

                p.y += p.vy;
                p.x += p.vx + Math.sin(p.life * 0.05 + p.phase) * 0.5 + random(-0.2, 0.2) - pullStrength;
                p.life++;

                if (p.life >= p.maxLife) {
                    p.reset();
                }
            });

            ctx.globalCompositeOperation = 'source-over';
            frameId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

    return <canvas ref={ref} />;
}

