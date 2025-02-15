export function getEcmaEnvironmentVariable(name: string): string {
    const value = import.meta.env[name];

    if (value === undefined) {
        console.error(`Variable ${name} is not defined`);
        throw new Error(`Variable ${name} is not defined`);
    }

    return value;
}
