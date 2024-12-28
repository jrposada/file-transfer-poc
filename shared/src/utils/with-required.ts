import { MergeInsertions } from './merge-intersections';

export type WithRequired<T, K extends keyof T> = MergeInsertions<
    T & { [P in K]-?: NonNullable<T[P]> }
>;
