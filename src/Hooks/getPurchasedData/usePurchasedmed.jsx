import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const usePurchasedmed = (uid) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey:['purchasedMed',uid],
        queryFn: async()=> await axiosInstance.get(`/purchased-med/${uid}`).then(res => res.data),
        enabled: !!uid ,
        staleTime: 1000*5*60,

    })
};

export default usePurchasedmed;