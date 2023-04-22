export function css (...args: Array<string|boolean>) {
    return args.filter((style:string|boolean) => !!style).join(' ')
}
