import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useCategoryMed = (category,page,limit) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['catMedicine',category],
        queryFn: () => axiosInstance.get(`/category-medicine/${category}?page=${page}&limit=${limit}`).then(res=> res.data),
        enabled: !! category,
        staleTime: 1000*60*5,
    })
};

export default useCategoryMed;