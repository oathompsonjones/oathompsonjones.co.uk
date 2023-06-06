import type P5 from "p5";
import Sketch from "../sketch";

export interface IParticle {
    lifeSpan: number;
    position: P5.Vector;
}

export default class ParticlesTrail extends Sketch {
    protected readonly particles: IParticle[] = [];

    public setup(p5: P5, canvasParentRef: Element): void {
        void this;
        p5.createCanvas(p5.windowWidth, p5.windowHeight).parent(canvasParentRef);
    }

    public draw(p5: P5): void {
        p5.background(this.backgroundColour.r, this.backgroundColour.g, this.backgroundColour.b);
        for (const particle of this.particles) {
            this.updateParticle(p5, particle);
            this.renderParticle(p5, particle);
        }
    }

    public override mouseMoved(p5: P5): void {
        for (let i = 0; i < 25; i++) {
            this.particles.push({
                lifeSpan: 50,
                position: p5.createVector(p5.mouseX, p5.mouseY)
            });
        }
    }

    protected updateParticle(p5: P5, particle: IParticle): void {
        if (particle.lifeSpan <= 0)
            this.particles.splice(this.particles.indexOf(particle), 1);
        particle.position.add(p5.createVector(p5.random(-5, 5), p5.random(-5, 5)));
        particle.lifeSpan--;
    }

    protected renderParticle(p5: P5, particle: IParticle): void {
        p5.stroke(
            this.primaryColour.r,
            this.primaryColour.g,
            this.primaryColour.b,
            p5.map(particle.lifeSpan, 0, 25, 0, 255)
        );
        p5.point(particle.position.x, particle.position.y);
    }
}
