import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllMedicines = (page,limit,sortOrder,searchQuery) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['all-medicines'],
        queryFn: () => axiosInstance.get(`/all-medicines?page=${page}&limit=${limit}&sortOrder=${sortOrder}&searchQuery=${searchQuery}`).then(res => res.data),
        staleTime: 1000*60*5,
    });
};

export default useAllMedicines;