import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useCategoryMed = (category) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['catMedicine',category],
        queryFn: () => axiosInstance.get(`/category-medicine/${category}`).then(res=> res.data),
        enabled: !! category,
        staleTime: 1000*60*5,
    })
};

export default useCategoryMed;