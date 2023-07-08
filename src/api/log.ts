export default (...args: string[]) => console.log(...args);


export function sleep(ms:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}