import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useUsers = (uid) => {
    const axiosInstance = useAxiosSecure();
    return useQuery({
        queryKey: ['users',uid],
        queryFn: async()=> await axiosInstance.get(`/users/${uid}`).then(res => res.data),
        enabled: !!uid,
        staleTime: 1000*60*5,
    });
};

export default useUsers;