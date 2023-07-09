const format = (obj: Object) => JSON.stringify(obj, null, 2);
const log = (...args: string[]) => console.log(...args);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export { format, log, sleep };
