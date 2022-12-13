import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useApiGet(url, params = '*', headers = null) {
  params = params.trim().replace(' ', '%20');

  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const len = params.length;
    let clean;
    if ((len < 3 && params !== '*') || params === '' || params === null) return;
    if (params === '*') {
      clean = url.trim();
    }
    if (params !== '*') {
      clean = `${url}/${params}`;
    }

    if (clean) {
      setIsFetching(true);
      api
        .get(clean, headers !== null && { ...headers })
        .then(response => {
          setData(response.data);
        })
        .catch(err => {
          setError(err);
          setData([]);
          console.log(err.response.data.msg);
        })
        .finally(() => setIsFetching(false));
    }
  }, [url, params, headers]);

  return { data, isFetching, error };
}
