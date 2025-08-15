import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useSoldMeds = (uid) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['soldMeds', uid],
        queryFn: async()=> await axiosInstance.get(`/sold-items/${uid}`).then(res=> res.data),
        enabled: !!uid ,
        staleTime: 1000*5*60,
    });
};

export default useSoldMeds;