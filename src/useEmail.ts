import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from './config';

interface ResultItem {
  id: number;
  name: string;
}

interface EmailParams extends Record<string, unknown> {
  from_name: string;
  to_name: string;
  from_email: string;
  message: string;
  results?: ResultItem[];
}

interface UseEmailReturn {
  sendEmail: (params: EmailParams) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const formatResults = (results: ResultItem[]): string => {
  return results.map(result => `- ${result.name}`).join('\n');
};

const useEmail = (): UseEmailReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const sendEmail = async (params: EmailParams) => {
    setLoading(true);
    setError(null);

    try {
      // Format the message with results if available
      const message = params.results
        ? `${params.message}\n\nResults:\n${formatResults(params.results)}`
        : params.message;

      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          ...params,
          message,
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to send email'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading, error };
};

export default useEmail; 