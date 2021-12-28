class Completer<T> {
    public readonly promise: Promise<T>;
    public complete!: (value: T | PromiseLike<T>) => void;
    public reject!: (reason?: any) => void;

    constructor() {
        this.promise = new Promise<T>((resolve, reject) => {
            this.complete = resolve;
            this.reject = reject;
        });
    }
}

export { Completer };
