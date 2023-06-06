import type { IParticle } from "./particles";
import type P5 from "p5";
import ParticlesTrail from "./particles";

export default class RaysTrail extends ParticlesTrail {
    public override mouseMoved(p5: P5): void {
        // Only creates 1 particle instead of 25.
        this.particles.push({
            // Life span is half.
            lifeSpan: 25,
            position: p5.createVector(p5.mouseX, p5.mouseY)
        });
    }

    protected override renderParticle(p5: P5, particle: IParticle): void {
        p5.stroke(
            this.primaryColour.r,
            this.primaryColour.g,
            this.primaryColour.b,
            p5.map(particle.lifeSpan, 0, 25, 0, 255)
        );
        // Draws line between particle and mouse instead of drawing point at particle.
        p5.line(particle.position.x, particle.position.y, p5.mouseX, p5.mouseY);
    }
}
