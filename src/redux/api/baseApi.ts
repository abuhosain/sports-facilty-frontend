 
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (arg, api, extraOptions): Promise<any> => {
  let result = await baseQuery(arg, api, extraOptions)
console.log(result)
  // console.log('base api inside ==>', result)

  if (result.error?.status === 404) {
      const errorData = result.error.data as { message: string }
      // toast.error(result.error.data.message)
      toast.error(errorData.message)


  }

  if (result.error?.status === 403) {
      const errorData = result.error.data as { message: string }
      // toast.error(result.error.data.message)
      toast.error(errorData.message)
  }
  if (result.error?.status === 401) {
      // send Refresh Token
      const res = await fetch(`${import.meta.env.VITE_SERVER_API_LINK}/api/auth/refresh-token`, {
          credentials: "include",
          method: "POST",
      });
      const data = await res.json();

      console.log('retrive refresh token', data);

      if (data?.data?.accessToken) {

          const user = (api.getState() as RootState).auth.user;

          api.dispatch(setUser({
              user,
              token: data.data.accessToken
          }))

          result = await baseQuery(arg, api, extraOptions);
      } else {
          api.dispatch(logout())
      }

  }
  return result;
}




export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["booking", "facility", "auth"],
  endpoints: () => ({}),
});
