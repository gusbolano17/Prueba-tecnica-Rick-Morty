import { useEffect, useState } from "react";

export const useFetching = <T>(
  url: string,
  callbackPromise: (url: string) => Promise<T>
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = url.split('?')[1];
    if (!key) return;

    const cached = localStorage.getItem(key);
    if (cached) {
      setData(JSON.parse(cached) as T);
      setLoading(false);
      return;
    }

    let mounted = true;
    callbackPromise(url)
      .then((resp) => {
        if (!mounted) return;
        setData(resp);
        try {
          localStorage.setItem(key, JSON.stringify(resp));
        } catch {
          // ignore storage errors
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [url, callbackPromise]);

  return { data, error, loading };
};
