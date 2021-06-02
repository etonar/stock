import { useEffect, useState } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading };
};
