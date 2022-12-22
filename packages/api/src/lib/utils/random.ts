export function getRandomProperty<T>(obj: Record<string, T>): T {
    const keys = Object.keys(obj);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return obj[randomKey];
}

export function getRandomItem<T>(list: T[]): T {
    const randomIndex = Math.floor(Math.random() * list.length);

    return list[randomIndex];
}
