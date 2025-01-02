# TanStack Query Quick Guide

## HTTP POST Requests

1. Create a custom hook (prefix with "use"), e.g., `useRegister`
2. Implement `useMutation` for data modifications

```tsx
export function useRegister() {
  return useMutation({
    mutationFn: async (values: RegisterSchema) => {
      const resp = await axiosInstance.post("/auth/register", values);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Account created");
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });
}
```

- `mutationFn` is an asynchronous callback function that makes the request to the backend
- `onSuccess` and `onError` are optional callbacks that handle conditional logic for successful or failed requests

> Note: `onSuccess` and `onError` callbacks are only available in mutations

## HTTP GET Requests

1. Create a custom hook, e.g., `useLogin`
2. Implement `useQuery` for data fetching

```tsx
export function useAuth(): UseQueryResult<{ email: string }> {
  const router = useRouter();

  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const resp = await axiosInstance.get("/auth/me");
        return resp.data;
      } catch (e) {
        console.error(e);
        router.navigate({ to: "/auth/login" });
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 mins (how long to keep the data before refetching)
    gcTime: 1000 * 60 * 10, // 10 mins (for when leaving the tab or closing the tab and coming back)
    refetchOnWindowFocus: false, // when you come back to the tab it will not refetch
    refetchOnReconnect: false, // similar to the above
  });
}
```

- `queryKey` caches the result using a key-value pair system
- `queryFn` is an asynchronous callback function that makes the request to the backend
  > Note: Always wrap in a try-catch block since `useQuery` doesn't have an `onError` callback
- Optional configuration fields like `staleTime`, `gcTime`, `refetchOnWindowFocus`, and `refetchOnReconnect` will use default settings if not specified

## Using Query Client with useMutation

```tsx
export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (values: LoginSchema) => {
      const resp = await axiosInstance.post("/auth/login", values);
      return resp.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["auth"],
      });
      toast.success("Logged in successfully.");
      router.navigate({ to: "/dashboard" });
    },
    onError: () => {
      toast.error("Failed to login.");
    },
  });
}
```

While this implementation is similar to `useRegister`, it introduces the `queryClient`'s `invalidateQueries` functionality. When a POST request succeeds, the `onSuccess` callback triggers this method. The `queryKey` field matches our `useQuery` implementation, ensuring that after a successful transaction, the client data is automatically refreshed. For instance, during logout, this mechanism ensures the screen updates appropriately and redirects to the sign-in page.
