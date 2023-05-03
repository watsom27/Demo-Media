/**
 * Simple Result type, inspired by the 'Result' type in Rust.
 */
export type Result<T, E> = { ok: true, value: T } | { ok: false, error: E };

export function Ok<T>(value: T): { ok: true, value: T } {
    return { ok: true, value };
}

export function Err<E>(error: E): { ok: false, error: E } {
    return { ok: false, error };
}
