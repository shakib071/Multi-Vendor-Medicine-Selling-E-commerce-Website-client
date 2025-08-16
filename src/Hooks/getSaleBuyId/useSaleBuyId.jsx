import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useSaleBuyId = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['salebuyId'],
        queryFn: async()=> await axiosInstance.get('/get-buy-sale-id').then(res=> res.data),
        staleTime: 0,
    })
};

export default useSaleBuyId;