import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const get = async (url: string, config: AxiosRequestConfig = {}) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await axios.get(url, config);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { get, loading, error, data };
};

export default useHttp; 