import useSWR from 'swr';

import { httpFetcher } from '@utils/http';

type APIError = {};

type APIResponse<Data, Error> = {
  data: Data | undefined,
  error: Error | undefined,
};

// eslint-disable-next-line import/prefer-default-export
const useSWRWithHTTP = <Data>(url: string): APIResponse<Data, APIError> => {
  const { data, error } = useSWR<Data, APIError>(url, httpFetcher);

  return {
    data,
    error,
  };
};

export default useSWRWithHTTP;
