import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const { setUserData } = useContext(UserContext);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [showFlashMessage, setShowFlashMessage] = useState(true);
    const [message, setMessage] = useState({ type: '', content: '' });
    const history = useHistory();
    const displayTime = 5000; // In millisecond

    const validate = e => {
        e.preventDefault();
        setShowFlashMessage(true);
        setTimeout(() => setShowFlashMessage(false), displayTime);

        if (!userName || !password) {
            setMessage({ type: 'warning', content: 'Invalid inputs' });
            return;
        }
        handleLogin();
    };

    const handleLogin = async () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const res = await axios.post(
                '/api/auth/login',
                { userName, password },
                config
            );
            setUserData({
                token: res.data.token,
                user: res.data.user,
            });

            localStorage.setItem('auth-token', res.data.token);
            history.push('/');
        } catch (err) {
            setMessage({
                type: 'danger',
                content: err.response.data,
            });
        }
    };

    return (
        <Card>
            <Card.Header style={{ textAlign: 'center' }}>
                <strong>Log In</strong>
            </Card.Header>
            <Card.Body className="register-body">
                <Form onSubmit={validate}>
                    <Form.Group controlId="userName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            autoComplete="off"
                            onChange={e => {
                                setUserName(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            onChange={e => {
                                setPassword(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        block
                        style={{ marginBottom: '20px' }}
                    >
                        Log In
                    </Button>
                    {message.type && showFlashMessage ? (
                        <Alert
                            variant={message.type}
                            style={{ textAlign: 'center' }}
                        >
                            {message.content}
                        </Alert>
                    ) : (
                        ''
                    )}
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Haven't registered?{' '}
                        <a href="/register">
                            <strong>Register</strong>
                        </a>
                        <br></br>
                        2. Once logged in, you'll be redirected to home page
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Login;
