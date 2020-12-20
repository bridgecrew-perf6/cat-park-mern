import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

const AuthBar = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push('/register');
    const login = () => history.push('/login');
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem('auth-token', '');
        history.push('/login');
    };

    return (
        <div className="auth-bar">
            {userData.user ? (
                <div>
                    <div>
                        <Badge variant="dark">
                            <a
                                href={`/profile/${userData.user.name}`}
                                className="auth-bar-profile"
                            >
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-person-circle"
                                    fill="currentColor"
                                    xmlns="https://www.w3.org/2000/svg"
                                    style={{ margin: '0px 5px 4px 0px' }}
                                >
                                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                                    />
                                </svg>
                                {userData.user.name}
                            </a>
                        </Badge>
                    </div>
                    <Button variant="outline-light" size="sm" onClick={logout}>
                        Log out
                    </Button>
                </div>
            ) : (
                <div>
                    <div>
                        <Button
                            variant="outline-light"
                            size="sm"
                            onClick={register}
                        >
                            Register
                        </Button>
                    </div>
                    <Button variant="outline-light" size="sm" onClick={login}>
                        Log In
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AuthBar;
