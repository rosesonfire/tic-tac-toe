import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const httpFetcher = <T>(url: string) => axios.get<T>(url).then(res => res.data);
