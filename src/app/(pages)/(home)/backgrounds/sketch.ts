import type P5 from "p5";
import { useThemeContext } from "contexts/themeContext";

function hexToHSL(hex: string): { h: number; s: number; l: number; } {
    const result = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/ui).exec(hex)!;
    const r: number = parseInt(result[1]!, 16) / 255;
    const g: number = parseInt(result[2]!, 16) / 255;
    const b: number = parseInt(result[3]!, 16) / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g: h = (b - r) / d + 2;
                break;
            case b: h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    s *= 100;
    s = Math.round(s);
    l *= 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return { h, l, s };
}

export default function sketch(): {
    setup: (p5: P5, canvasParentRef: Element) => void;
    draw: (p5: P5) => void;
    mouseMoved: (p5: P5) => void;
} {
    const { theme: { palette: { background: { default: _default }, primary: { main } } } } = useThemeContext();
    const background = hexToHSL(_default);
    const colour = hexToHSL(main);

    const angle = (): number => 2 * Math.PI * Math.random();
    const length: number = 2;
    let mouseHasMoved: boolean = false;
    const particles: Particle[] = [];

    class Particle {
        public p5: P5;

        public pos: P5.Vector;

        public vel: P5.Vector;

        public lifetime: number;

        public age: number = 0;

        public constructor(p5: P5, pos: P5.Vector) {
            this.p5 = p5;
            this.pos = pos;
            this.vel = p5.createVector(p5.random(length / 2, 3 * length / 2), 0).rotate(angle() * p5.round(p5.random(0, 360)));
            this.lifetime = p5.random(50, 150);
            particles.push(this);
        }

        public update(): void {
            if (this.age >= this.lifetime)
                this.remove();
            this.age++;
            if (this.age % 10 === 0)
                this.vel.rotate(this.p5.random([-angle(), angle()]) as number);
            this.pos.add(this.vel);
        }

        public draw(): void {
            this.p5.push();
            this.p5.stroke(colour.h, colour.s, colour.l, 1 - this.age / this.lifetime);
            this.p5.translate(this.pos.x, this.pos.y);
            this.p5.line(0, 0, -this.vel.x, -this.vel.y);
            this.p5.pop();
        }

        public remove(): void {
            particles.splice(particles.indexOf(this), 1);
        }
    }

    function setup(p5: P5, canvasParentRef: Element): void {
        p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);
        p5.colorMode("hsl");
        p5.noStroke();
        for (let i = 0; i < 500; i++)
            void new Particle(p5, p5.createVector(p5.random(p5.width), p5.random(p5.height)));
    }

    function draw(p5: P5): void {
        if (particles.length === 0)
            mouseHasMoved = false;
        if (!mouseHasMoved) {
            for (let i = 0; i < 50; i++)
                void new Particle(p5, p5.createVector(p5.random(p5.width), p5.random(p5.height)));
        }
        p5.background(background.h, background.s, background.l);
        for (const p of particles) {
            p.update();
            p.draw();
        }
    }

    function mouseMoved(p5: P5): void {
        mouseHasMoved = true;
        for (let i = 0; i < 50; i++)
            void new Particle(p5, p5.createVector(p5.mouseX, p5.mouseY));
    }

    return { draw, mouseMoved, setup };
}
