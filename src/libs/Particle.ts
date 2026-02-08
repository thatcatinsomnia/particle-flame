import { random } from './random';

export default class Particle {
    x!: number;
    y!: number;
    vx!: number;
    vy!: number;
    size!: number;
    life!: number;
    maxLife!: number;
    phase!: number;

    constructor() {
        this.reset();
        this.life = random(this.maxLife);
        this.y = this.y + this.life * this.vy;
    }

    reset() {
        this.x = (window.innerWidth / 2) + random(-80, 80);
        this.y = (window.innerHeight / 2) + random(-10, 10);
        this.vx = random(-1.5, 1.5);
        this.vy = random(-4, -8);
        this.size = random(4, 8) * 3;
        this.life = 0;
        this.maxLife = random(20, 80);
        this.phase = random(Math.PI * 2);
    }
}

