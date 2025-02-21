import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import getBaseUrl from './../../../utils/baseURL';
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseUrl()}/api/auth`,
        credentials:'include',
    }),
    tagTypes: ['User'],
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query: (newUser)=>({
                url:'/register',
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials)=>({
                url:'/login',
                method: 'POST',
                body:credentials
            })
        }),
        logoutUser: builder.mutation({
            query: ()=>({
                url:'/logout',
                method: 'POST',
            })
        }),
        getUser: builder.mutation({
            query: ()=>({
                url:"/users",
                method:"GET",
            }),
            refetchOnMount: true,
            invalidatesTags:['Users'],
        }),
        deleteUser:builder.mutation({
            query: (userID)=>({
                url:`/users/${userID}`,
                method: 'DELETE',
            }),
            invalidatesTags:["User"],
        }),
        updateUserRole: builder.mutation({
            query: ({userId,role})=>({
                url:`/users/${userId}`,
                method:"PUT",
                body:{role}
            }),
            refetchOnMount: true,
            invalidatesTags:['Users'],
        }),
        editProfile: builder.mutation({
            query: (profileData)=>({
                url:`/edit-profile`,
                method:"PATCH",
                body:profileData
            }),
        }),
    })
})

export const {useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation,useDeleteUserMutation,useEditProfileMutation,useGetUserMutation,useUpdateUserRoleMutation} = authApi;
export default authApi;