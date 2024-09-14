import { baseApi } from "../../api/baseApi";

const adminManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacilities: builder.query({
      query: () => ({
        url: "facility",
        method: "GET",
      }),
      providesTags: ["facility"], // This provides the 'facility' tag, which will be invalidated by the mutations
    }),
  
    updateFacility: builder.mutation({
      query: ({ id, data }) => ({
        url: `facility/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["facility"], // Invalidates the 'facility' tag on update
    }),
    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `facility/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facility"], // Invalidates the 'facility' tag on delete
    }),
    createFacility: builder.mutation({
      query: (newFacility) => ({
        url: "facility",
        method: "POST",
        body: newFacility,
      }),
      invalidatesTags: ["facility"], // Invalidates the 'facility' tag on create
    }),
    createAdmin: builder.mutation({
      query: (newFacility) => ({
        url: "auth/signup/admin",
        method: "POST",
        body: newFacility,
      }),
    }),
    getAllBookings: builder.query({
        query: () => ({
          url: "bookings",
          method: "GET"
        }),
        providesTags: ["booking"],
      }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllFacilitiesQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useCreateFacilityMutation,
  useGetAllBookingsQuery,
  useCreateAdminMutation
} = adminManagementApi;

export default adminManagementApi;
