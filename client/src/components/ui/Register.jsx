import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
    const [message, setMessage] = useState({ type: '', content: '' });
    const [successMessage, setSuccessMessage] = useState({
        type: '',
        content: '',
    });
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const [show, setShow] = useState(true);
    const history = useHistory();

    const isFormatValid = () => {
        let validationMessage = '';
        if (!/^[A-Za-z0-9]+$/.test(userName)) {
            validationMessage += 'Invalid characters for user name. ';
        }
        if (userName.length > 20) {
            validationMessage += 'Length exceeds 20 for user name. ';
        }
        if (!/^[A-Za-z ]+$/.test(name)) {
            validationMessage += 'Invalid characters for display name. ';
        }
        if (name.length > 20) {
            validationMessage += 'Length exceeds 20 for display name. ';
        }
        if (validationMessage) {
            setMessage({ type: 'warning', content: validationMessage });
            return false;
        }
        return true;
    };

    const handleRegister = e => {
        e.preventDefault();
        setShow(true);
        if (isFormatValid()) {
            register();
        } else {
            setIsValid(false);
        }
    };

    const register = async () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            // Create user
            await axios.post(
                '/api/v1/users',
                { userName, name, email, password, isAdmin },
                config
            );
            setSuccessMessage({
                type: 'success',
                content:
                    'Successfully registered, redirect to log in page in 2 seconds',
            });

            setTimeout(() => {
                history.push('/login');
            }, 2000);
        } catch (err) {
            setIsValid(false);
            setMessage({ type: 'warning', content: err.response.data });
            console.log(err.response.data);
        }
    };

    const toggleCheckBox = () => {
        setIsAdmin(!isAdmin);
    };

    return (
        <Card>
            <Card.Header style={{ textAlign: 'center' }}>
                <strong>Register</strong>
            </Card.Header>

            <Card.Body className="register-body">
                {!isValid && message.type && show ? (
                    <Alert
                        variant={message.type}
                        className="res-message"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        {message.content}
                    </Alert>
                ) : (
                    ''
                )}
                {successMessage.type ? (
                    <Alert
                        variant={successMessage.type}
                        className="res-message"
                        onClose={() => setShow(false)}
                        dismissible
                    >
                        {successMessage.content}
                    </Alert>
                ) : (
                    ''
                )}
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formUserName">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter user name"
                            autoComplete="off"
                            onChange={e => {
                                setUserName(e.target.value.trim());
                            }}
                        />
                        <Form.Text className="text-muted">
                            Once created, user name cannot be changed. Only
                            alphanumeric characters with length less than 21 are
                            allowed
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formName">
                        <Form.Label>Display Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter your name"
                            autoComplete="off"
                            onChange={e => {
                                setName(e.target.value.trim());
                            }}
                        />
                        <Form.Text className="text-muted">
                            Only alphanumeric characters with length less than
                            21 are allowed
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            onChange={e => {
                                setEmail(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            onChange={e => {
                                setPassword(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="off"
                            isInvalid={password !== password2}
                            onChange={e => {
                                setPassword2(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCheckbox">
                        <Form.Check
                            type="checkbox"
                            label="I am an administrator"
                            onChange={toggleCheckBox}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Register
                    </Button>
                </Form>
            </Card.Body>

            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Already have an account?{' '}
                        <a href="/login">
                            <strong>Log In</strong>
                        </a>
                        <br></br>
                        2. All fields are required to create an account<br></br>
                        3. To test push notifications, please check{' '}
                        <svg
                            xmlns="https://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-check2-square"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15.354 2.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L8 9.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                            />
                            <path
                                fillRule="evenodd"
                                d="M1.5 13A1.5 1.5 0 0 0 3 14.5h10a1.5 1.5 0 0 0 1.5-1.5V8a.5.5 0 0 0-1 0v5a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h8a.5.5 0 0 0 0-1H3A1.5 1.5 0 0 0 1.5 3v10z"
                            />
                        </svg>{' '}
                        <strong>I am an administrator</strong> and then log in
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Register;
