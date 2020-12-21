import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Notification = () => {
    const { userData, swRegistration } = useContext(UserContext);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [pushTitle, setPushTitle] = useState('');
    const [pushContent, setPushContent] = useState('');
    const [showFlashMessage, setShowFlashMessage] = useState(true);
    const [message, setMessage] = useState({ type: '', content: '' });
    const displayTime = 5000; // In millisecond
    const VAPID_KEY_PUBLIC = process.env.REACT_APP_VAPID_KEY_PUBLIC;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('auth-token')}`,
        },
    };

    const urlB64ToUint8Array = base64String => {
        const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    const updateSubscriptionOnServer = async (isSubscribed, subscription) => {
        // Update subscription of user
        axios
            .put(
                `/api/v1/users/${userData.user.name}/subscription`,
                subscription,
                config
            )
            .catch(err => console.log(err));

        // Update status of subscription of user
        try {
            await axios.put(
                `/api/v1/users/${userData.user.name}`,
                { isSubscribed },
                config
            );
        } catch (err) {
            console.log(err.response.data);
        }
    };

    const handleSubscribe = () => {
        const applicationServerKey = urlB64ToUint8Array(`${VAPID_KEY_PUBLIC}`);

        swRegistration.pushManager
            .subscribe({
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
            })
            .then(subscription => {
                updateSubscriptionOnServer(true, subscription);
                setIsSubscribed(true);
            })
            .catch(err => {
                setMessage({
                    type: 'danger',
                    content: 'Failed to subscribe',
                });
                console.log(err);
            });
    };

    const handleUnsubscribe = () => {
        swRegistration.pushManager
            .getSubscription()
            .then(subscription => {
                updateSubscriptionOnServer(false, null);
                setIsSubscribed(false);
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(err => {
                setMessage({
                    type: 'danger',
                    content: 'Error unsubscribing',
                });
                console.log(err);
            });
    };

    const validatePush = e => {
        e.preventDefault();
        setShowFlashMessage(true);
        setTimeout(() => setShowFlashMessage(false), displayTime);
        if (pushTitle.trim().length === 0 || pushContent.trim().length === 0) {
            setMessage({
                type: 'info',
                content: 'Please provide valid inputs for both entries',
            });
            return;
        }
        handlePush();
    };

    const handlePush = async () => {
        try {
            const res = await axios.post(`/api/subscribe`, {
                pushTitle,
                pushContent,
            });
            setMessage({
                type: 'success',
                content: `Notification successfully pushed to ${res.data.numOfSubscriber} subscriber(s)`,
            });
        } catch (err) {
            setMessage({
                type: 'danger',
                content: err.response.data,
            });
        }
    };

    useEffect(() => {
        if (userData.user) {
            setIsSubscribed(userData.user.isSubscribed);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    return (
        <Card className="text-center">
            <Card.Header>
                <Row>
                    <Col></Col>
                    <Col
                        style={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        Push Notifications
                    </Col>
                    <Col
                        style={{
                            justifyContent: 'flex-end',
                            display: 'flex',
                        }}
                    >
                        {!userData.user ? (
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            <span>
                                {isSubscribed ? (
                                    <Button
                                        id="subscribe-btn"
                                        className="subscribe-btn"
                                        onClick={handleUnsubscribe}
                                        variant="outline-primary"
                                    >
                                        Unsubscribe
                                    </Button>
                                ) : (
                                    ''
                                )}
                                {!isSubscribed ? (
                                    <Button
                                        id="subscribe-btn"
                                        className="subscribe-btn"
                                        onClick={handleSubscribe}
                                        variant="outline-primary"
                                    >
                                        Subscribe
                                    </Button>
                                ) : (
                                    ''
                                )}
                            </span>
                        )}
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    Subscribe push notifications from Cat Park to keep informed
                    of the latest features.<br></br>You are now{' '}
                    <Badge variant="dark">
                        {isSubscribed ? 'Subscribed' : 'Unsubscribed'}
                    </Badge>
                </Card.Text>

                {userData.user && userData.user.isAdmin ? (
                    <div
                        style={{
                            marginBottom: '40px',
                            border: '3px ridge grey',
                            padding: '0px 40px 10px 40px',
                        }}
                    >
                        <div style={{ textAlign: 'right', fontSize: 'small' }}>
                            * This block is for the use of administrators only
                        </div>

                        <Form
                            onSubmit={validatePush}
                            style={{ marginBottom: '10px' }}
                        >
                            <Form.Group controlId="pushTitle">
                                <Form.Label className="push-label">
                                    Push Title
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Your title"
                                    autoComplete="off"
                                    onChange={e => {
                                        setPushTitle(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Form.Group controlId="pushContent">
                                <Form.Label className="push-label">
                                    Push Content
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Notification content..."
                                    autoComplete="off"
                                    onChange={e => {
                                        setPushContent(e.target.value);
                                    }}
                                />
                            </Form.Group>
                            <Button
                                className="push-btn"
                                type="submit"
                                variant="warning"
                            >
                                Push Notification
                            </Button>
                        </Form>
                        {message.type && showFlashMessage ? (
                            <Alert variant={message.type}>
                                {message.content}
                            </Alert>
                        ) : (
                            ''
                        )}
                    </div>
                ) : (
                    ''
                )}
            </Card.Body>
            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Please allow notifications on browser to enable the
                        subscription for push notifications. Check{' '}
                        <a
                            href="https://github.com/web-push-libs/web-push#browser-support"
                            target="_blank"
                            rel="noreferrer"
                        >
                            supported browsers
                        </a>{' '}
                        for this feature
                        <br></br>
                        2. For administrators, complete the notification form to
                        push to subscribed users<br></br>
                        3. Click on the popping notification banner to be
                        redirected to the home page<br></br>
                        4. If there is no response after clicking{' '}
                        <strong>Push Notification</strong>, please re-subscribe,
                        and then push again; Also, please wait a few seconds and
                        expect a slow response from Heroku server
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Notification;
