import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure';

const useUserCartMed = (uid) => {
    const axiosSecureInstance = useAxiosSecure();
    return useQuery({
        queryKey: ['userCart',uid],
        queryFn: async() => await axiosSecureInstance.get(`/cart-medicines/${uid}`).then(res=> res.data),
        enabled: !!uid,
        staleTime: 1000*5*60,
    });
};

export default useUserCartMed;