import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useCatMedCount = (category) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['CategoryMedCount'],
        queryFn: async()=> await axiosInstance.get(`/category-count/${category}`).then(res=> res.data),
        staleTime: 5*60*1000,
    })
};

export default useCatMedCount;