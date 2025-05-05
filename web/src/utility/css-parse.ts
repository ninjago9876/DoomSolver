export function parseCSSTimeToMS(value: string): number {
    if (value.endsWith('ms')) {
        return parseFloat(value);
    }
    if (value.endsWith('s')) {
        return parseFloat(value) * 1000;
    }
    throw new Error(`Unsupported time unit in "${value}"`);
}

export function getCSSVariable(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
