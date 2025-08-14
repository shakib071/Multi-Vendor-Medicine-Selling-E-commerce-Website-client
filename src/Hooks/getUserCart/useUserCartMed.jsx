import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../AxiosHook/useAxios';

const useUserCartMed = (uid) => {
    const axiosSecureInstance = useAxios();
    return useQuery({
        queryKey: ['userCart',uid],
        queryFn: async() => await axiosSecureInstance.get(`/cart-medicines/${uid}`).then(res=> res.data),
        enabled: !!uid,
        staleTime: 1000*300,
    });
};

export default useUserCartMed;