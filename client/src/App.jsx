import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './components/ui/Header';
import Home from './components/ui/Home';
import About from './components/ui/About';
import CatDetail from './components/ui/CatDetail';
import Notification from './components/ui/Notification';
import Posts from './components/ui/Posts';
import Search from './components/ui/Search';
import Login from './components/ui/Login';
import Register from './components/ui/Register';
import PostCreate from './components/ui/PostCreate';
import PostDetail from './components/ui/PostDetail';
import Profile from './components/ui/Profile';
import PageNotFound from './components/ui/PageNotFound';
import Unauthorized from './components/ui/Unauthorized';
import PrivateRoute from './components/ui/PrivateRoute';

function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });
    const [swRegistration, setSwRegistration] = useState(null);
    const HeaderWithRouter = withRouter(Header);

    const registerSw = () => {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(swReg => {
                    console.log('[Service Worker] Registered ', swReg.scope);
                    setSwRegistration(swReg);
                })
                .catch(err => {
                    console.log('Service Worker Error ', err);
                });
        } else {
            console.warn('Push messaging is not supported');
        }
    };

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

            if (res.data) {
                const res = await axios.get('/api/v1/users/', config);
                setUserData({
                    token,
                    user: res.data,
                });
            }
        };
        checkLogin();
        registerSw();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Router>
            <UserContext.Provider
                value={{
                    userData,
                    setUserData,
                    swRegistration,
                }}
            >
                <HeaderWithRouter />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/posts/:postId" component={PostDetail} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/cats/:catName" component={CatDetail} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route
                        exact
                        path="/profile/:userName"
                        component={Profile}
                    />
                    <Route exact path="/pnf" component={PageNotFound} />
                    <Route
                        exact
                        path="/unauthorized"
                        component={Unauthorized}
                    />
                    <PrivateRoute
                        exact
                        path="/notification"
                        component={Notification}
                    />
                    <PrivateRoute
                        exact
                        path="/postcreate"
                        component={PostCreate}
                    />
                    <Route path="*" component={PageNotFound} />
                </Switch>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
