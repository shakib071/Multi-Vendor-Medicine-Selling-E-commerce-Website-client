import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useSoldMeds = (uid) => {
    const axiosInstance = useAxiosSecure();
    return useQuery({
        queryKey: ['soldMeds', uid],
        queryFn: async()=> await axiosInstance.get(`/sold-items/${uid}`).then(res=> res.data),
        enabled: !!uid ,
        staleTime: 1000*5*60,
    });
};

export default useSoldMeds;