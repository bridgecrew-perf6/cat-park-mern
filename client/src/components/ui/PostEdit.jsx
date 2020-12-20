import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';

const PostEdit = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { postId } = useParams();

    const handleEdit = async () => {
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };

        try {
            const res = await axios.put(
                `/api/v1/posts/${postId}`,
                { title, content },
                config
            );
            console.log(res.data);
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
                <Form onSubmit={handleEdit}>
                    <Form.Group controlId="postTitle">
                        <Form.Label className="postcreate-label">
                            Title
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your title"
                            autoComplete="off"
                            onChange={e => {
                                setTitle(e.target.value);
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
                                setContent(e.target.value);
                            }}
                            placeholder="Share your thoughts here..."
                            as="textarea"
                            style={{ resize: 'none', height: '200px' }}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
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
                        1. Please allow notifications on browser to enable the
                        subscription for push notifications<br></br>
                        2. Once subscribed, click the Push Notification button
                        to test. There should be a banner popping up
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default PostEdit;
