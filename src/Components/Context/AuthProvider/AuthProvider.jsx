import React, { useState } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    

    const AuthData = {
        user,
        setUser,
        loading,
        setLoading,
    }
    return (
        <AuthContext.Provider value={AuthData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;