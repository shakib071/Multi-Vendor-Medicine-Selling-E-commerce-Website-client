import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useSalerAd = (uid) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['salerAd',uid],
        queryFn: async()=> await axiosInstance.get(`/get-saler-ad/${uid}`).then(res=> res.data),
        enabled: !!uid,
        staleTime: 1000*5*60,
    });
};

export default useSalerAd;