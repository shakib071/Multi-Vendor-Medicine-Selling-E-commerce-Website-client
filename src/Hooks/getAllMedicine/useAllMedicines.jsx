import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllMedicines = (page,limit) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['all-medicines'],
        queryFn: () => axiosInstance.get(`/all-medicines?page=${page}&limit=${limit}`).then(res => res.data),
        staleTime: 1000*60*5,
    });
};

export default useAllMedicines;