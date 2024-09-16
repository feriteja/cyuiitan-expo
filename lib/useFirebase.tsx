import { Alert } from "react-native";
import { useEffect, useState } from "react";

type AsyncFunction<T> = () => Promise<T>;

interface UseFirebaseReturn<T> {
  data: T | null;
  loading: boolean;
  refetch: () => Promise<void>;
}

function useFirebase<T>(fn: AsyncFunction<T>): UseFirebaseReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fn();
      setData((_) => res);
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = async () => await fetchData();

  return { data, loading, refetch };
}

export default useFirebase;
