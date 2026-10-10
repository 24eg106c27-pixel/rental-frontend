import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

// loads data from an endpoint and gives back a reload() function
export default function useFetch(path, initial = []) {
  const [data, setData] = useState(initial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const reload = useCallback(
    () =>
      api(path)
        .then((d) => { setData(d); setError(""); })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false)),
    [path]
  );

  useEffect(() => { reload(); }, [reload]);
  return { data, error, loading, reload };
}
