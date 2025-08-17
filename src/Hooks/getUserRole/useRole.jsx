import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useRole = (uid) => {
    const axiosInstance = useAxiosSecure();
    return useQuery({
        queryKey: ['userRole', uid],
        queryFn: async()=>  await axiosInstance.get(`/users-role/${uid}`).then(res => res.data.role),
        enabled: !!uid,
        staleTime: 1000*60*5,
        
    }
    );
};

export default useRole;