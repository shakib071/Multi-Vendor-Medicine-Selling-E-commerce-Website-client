import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useCategories = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['category'],
        queryFn: ()=> axiosInstance.get('/get-category').then(res => res.data),
        staleTime: 1000*60*5,
    });
};

export default useCategories;