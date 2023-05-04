export abstract class ValueObject<T> {
    readonly value: T;

    constructor(value: T) {
        this.check(value);

        this.value = value;
    }

    abstract check(value: T): void;

}