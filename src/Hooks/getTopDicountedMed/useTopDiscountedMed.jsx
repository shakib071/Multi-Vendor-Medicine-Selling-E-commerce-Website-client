import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useTopDiscountedMed = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['topdiscounted'],
        queryFn: async()=> await axiosInstance.get('/top-discounted').then(res=>res.data),
        staleTime: 1000*5*60,
    });
};

export default useTopDiscountedMed;