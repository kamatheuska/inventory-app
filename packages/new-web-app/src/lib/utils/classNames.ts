const isObject = (value: any) => value != null && (typeof value === 'object' || typeof value === 'function');

// Workaround link https://github.com/microsoft/TypeScript/issues/15972#issuecomment-420102935
type Fof<T extends any[], R> = (...args: T) => R;

const classNames: Fof<string[] | Record<string, boolean>[], string> = (...args) => {
    const classes: string[] = [];
    for (const arg of args) {
        if (typeof arg === 'string') {
            classes.push(arg);
        } else if (Array.isArray(arg)) {
            classes.push(classNames(...arg));
        } else if (isObject(arg)) {
            classes.push(classNames(...Object.keys(arg).filter((k) => arg[k])));
        }
    }

    return classes.join(' ');
};

export default classNames;
