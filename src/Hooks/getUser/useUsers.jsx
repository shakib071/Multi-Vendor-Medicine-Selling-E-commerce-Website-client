import React from 'react';
import useAxios from '../AxiosHook/useAxios';
import { useQuery } from '@tanstack/react-query';

const useUsers = (uid) => {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ['users',uid],
        queryFn: ()=> axiosInstance.get(`/users/${uid}`).then(res => res.data),
        enabled: !!uid,
        staleTime: 1000*60*5,
    });
};

export default useUsers;