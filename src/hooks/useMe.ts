import { useGetMeQuery } from "@/redux/features/auth/auth.api";

export function useMe() {
  const { data, isLoading, error, refetch } = useGetMeQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
  });

  return {
    me: data?.data,
    loading: isLoading,
    error,
    refetch,
  };
}
