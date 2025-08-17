import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useSalerAd = (uid) => {
    const axiosInstance = useAxiosSecure();
    return useQuery({
        queryKey: ['salerAd',uid],
        queryFn: async()=> await axiosInstance.get(`/get-saler-ad/${uid}`).then(res=> res.data),
        enabled: !!uid,
        staleTime: 1000*5*60,
    });
};

export default useSalerAd;