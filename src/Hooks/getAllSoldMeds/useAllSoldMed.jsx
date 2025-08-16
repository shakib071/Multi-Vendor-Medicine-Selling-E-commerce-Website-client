import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllSoldMed = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['allSold'],
        queryFn: async() => await axiosInstance.get('/all-sold-med').then(res => res.data),
        staleTime: 1000*5*60,
    });
};

export default useAllSoldMed;