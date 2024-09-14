import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserBooking: builder.query({
      query: () => ({
        url: "bookings/user",
        method: "GET",
      }),
    }),

    getUserBookingbyId: builder.query({
      query: (id) => ({
        url: `bookings/${id}`,
        method: "GET",
      }),
    }),

    deleteUserBookingbyId: builder.mutation({
      query: (id) => ({
        url: `bookings/${id}`,
        method: "DELETE",
      }),
    }),

    checkAvailability: builder.query({
      query: ({ facilityId, date }) => ({
        url: `check-availability`,
        params: { facilityId, date }, // Pass facilityId and date as query parameters
        method: "GET",
      }),
    }),
    createBooking: builder.mutation({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
      
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUserBookingQuery,
  useGetUserBookingbyIdQuery,
  useDeleteUserBookingbyIdMutation,
  useLazyCheckAvailabilityQuery, 
  useCreateBookingMutation 
} = userManagementApi;

export default userManagementApi;
