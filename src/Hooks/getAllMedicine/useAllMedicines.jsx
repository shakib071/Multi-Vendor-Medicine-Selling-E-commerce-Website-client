import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllMedicines = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['all-medicines'],
        queryFn: () => axiosInstance.get('/all-medicines').then(res => res.data),
        staleTime: 1000*60*5,
    });
};

export default useAllMedicines;