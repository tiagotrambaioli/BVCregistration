import { useState, useEffect } from 'react';
import api from '../api/axios';

export function useApiGet(url, params = '*') {
  const len = params.length;
  params = params.trim().replace(' ', '%20');
  let clean;
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        .get(clean)
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
  }, [params]);

  return { data, isFetching, error };
}

export function useApiPost(url, data, accessToken) {
  const [response, setResponse] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    api
      .post(url, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(response => {
        setResponse(response.data);
      })
      .catch(err => setError(err))
      .finally(() => setIsFetching(false));
  }, []);

  return { response, isFetching, error };
}
