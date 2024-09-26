/* eslint-disable @typescript-eslint/no-unused-vars */
import { http } from '@libraries/axios';
import useAxios, { configure } from 'axios-hooks';
import { LRUCache } from 'lru-cache';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const cache: any = new LRUCache({ max: 10 });

configure({ axios: http, cache });

export const useRestApi = useAxios;
