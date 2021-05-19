import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

const PostCreate = () => {
    const { userData } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });
    const [show, setShow] = useState(true);
    const history = useHistory();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('auth-token')}`,
        },
    };

    const handleCreate = async e => {
        e.preventDefault();
        setShow(true);

        if (!title || !content) {
            setMessage({ type: 'info', content: 'Please provide valid input' });
            return;
        }

        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
                { title, content, id: userData.user.id },
                config
            );
            history.push('/posts');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card>
            <Card.Header style={{ textAlign: 'center' }}>
                Create a post
            </Card.Header>
            <Card.Body>
                {message.type && show ? (
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
                <Form onSubmit={handleCreate}>
                    <Form.Group controlId="postTitle">
                        <Form.Label className="postcreate-label">
                            Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your title"
                            autoComplete="off"
                            onChange={e => {
                                setTitle(e.target.value.trim());
                            }}
                        />
                    </Form.Group>
                    <Form.Group controlId="postContent">
                        <Form.Label className="postcreate-label">
                            Content
                        </Form.Label>
                        <Form.Control
                            type="text"
                            onChange={e => {
                                setContent(e.target.value.trim());
                            }}
                            placeholder="Share your thoughts here..."
                            as="textarea"
                            style={{ resize: 'none', height: '200px' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" block>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Once submit, you'll be redirected to{' '}
                        <strong>Posts</strong> page<br></br>
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default PostCreate;
