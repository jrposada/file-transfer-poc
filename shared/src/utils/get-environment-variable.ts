export function getEnvironmentVariable(name: string): string {
    const value = process.env[name]

    if (value === undefined) {
        throw new Error(`Variable ${name} is not defined`);
    }

    return value;
}