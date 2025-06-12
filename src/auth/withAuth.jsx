import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const withAuth = (WrappedComponent) => {
    return (props) => {
        const { getTokenFromStorage } = useContext(AuthContext);
        const navigate = useNavigate();

        useEffect(() => {
            const token = getTokenFromStorage();
            if (!token) {
                navigate('/login');
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;