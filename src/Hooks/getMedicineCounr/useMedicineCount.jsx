import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useMedicineCount = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['medicineCount'],
        queryFn: async()=> await axiosInstance.get('/medicineCount').then(res => res.data),
        staleTime: 5*60*1000,
    })
};

export default useMedicineCount;