type SuccessResult<T> = readonly [T, null];

type ErrorResult<E = Error> = readonly [null, E];

type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;

export function tryCatch<T, E = Error>(
    fn: () => T
): Result<T, E> {
    try {
        const data = fn();
        return [data, null] as const;
    } catch (error) {
        return [null, error as E] as const
    }
}