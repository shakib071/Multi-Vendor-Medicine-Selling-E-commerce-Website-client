import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const usePurchasedmed = (uid) => {
    const axiosInstance = useAxiosSecure();
    return useQuery({
        queryKey:['purchasedMed',uid],
        queryFn: async()=> await axiosInstance.get(`/purchased-med/${uid}`).then(res => res.data),
        enabled: !!uid ,
        staleTime: 1000*5*60,

    })
};

export default usePurchasedmed;