import Axios from 'axios';

export const http = Axios.create({
  timeout: 30 * 1000,
  baseURL: import.meta.env.VITE_REST_URL,
  // signal: new AbortController().signal,
  // http adapter only (node.js)
  // maxRate: [
  //   500 * 100 * 1024, // 50MB/s upload limit,
  //   500 * 100 * 1024, // 50MB/s download limit
  // ],
});
