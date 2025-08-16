import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllPurchasedMed = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['allPurchased'],
        queryFn: ()=> axiosInstance.get('/all-purchased-med').then(res => res.data),
        staleTime: 1000*60*5,
    })
};

export default useAllPurchasedMed;