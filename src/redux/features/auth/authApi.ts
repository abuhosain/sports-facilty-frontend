 
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    createUser: builder.mutation({
      query: (newFacility) => ({
        url: "auth/signup",
        method: "POST",
        body: newFacility,
      }),
    }),
  }),
  overrideExisting: false,
   
});

export const { useLoginMutation, useCreateUserMutation }  = authApi;
export default authApi;
