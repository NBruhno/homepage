export const getHslValue = (hsl: string) => (/(?<=\().+?(?=\))/g).exec(hsl)
