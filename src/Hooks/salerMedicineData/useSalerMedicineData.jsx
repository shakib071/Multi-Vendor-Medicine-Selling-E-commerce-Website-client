import React from 'react';
import useAxiosSecure from '../AxiosSecure/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';

const useSalerMedicineData = (uid) => {
    const axiosSecureInstance = useAxiosSecure();
    return useQuery({
        querykey: ['salerMedicine', uid],
        queryFn: async() => await  axiosSecureInstance.get(`/saler-medicine/${uid}`).then(res =>res.data),
        enabled: !!uid,
        staleTime: 1000*60*5,
    });
};

export default useSalerMedicineData;