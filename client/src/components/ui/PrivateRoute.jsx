import React, { useEffect, useState, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userData } = useContext(UserContext);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const config = {
                headers: { 'x-auth-token': token },
            };
            const res = await axios.post(
                '/api/auth/tokenValidation',
                null,
                config
            );
            setIsAuthenticated(res.data);
        };
        checkLogin();
        // eslint-disable-next-line
    }, [userData]);

    if (isAuthenticated === null) {
        return <></>;
    }

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/unauthorized" />
                )
            }
        />
    );
};

export default PrivateRoute;
