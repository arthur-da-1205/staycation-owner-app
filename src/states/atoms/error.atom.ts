import { atomic } from '@libraries/state';

export const errorAtom = atomic<Error | null>(null);
