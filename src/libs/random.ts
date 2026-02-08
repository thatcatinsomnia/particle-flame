export function random(max: number): number;
export function random(min: number, max: number): number;
export function random(minOrMax: number, max?: number) {
    if (max === undefined) {
        return Math.random() * minOrMax;
    }

    return Math.random() * (max - minOrMax) + minOrMax;
}

