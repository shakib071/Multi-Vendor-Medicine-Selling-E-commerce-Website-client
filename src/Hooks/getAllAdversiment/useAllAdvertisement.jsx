import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useAllAdvertisement = () => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['advertisement'],
        queryFn: async()=> await axiosInstance.get('/get-all-advertisement').then(res => res.data),
        staleTime: 1000*5*60,
    });
};

export default useAllAdvertisement;