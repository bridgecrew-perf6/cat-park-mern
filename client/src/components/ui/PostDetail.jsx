import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import UserContext from '../../context/UserContext';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Comments from './Comments';

const PostDetail = () => {
    const { userData } = useContext(UserContext);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postUserName, setPostUserName] = useState('');
    const [message, setMessage] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [comment, setComment] = useState('');
    const { postId } = useParams();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('auth-token')}`,
        },
    };

    const fetchPostById = async () => {
        const post = await axios.get(`/api/v1/posts/${postId}`);
        setPostTitle(post.data.title);
        setPostContent(post.data.content);
        setPostUserName(post.data.userName);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleEdit = async () => {
        try {
            const res = await axios.put(
                `/api/v1/posts/${postId}`,
                { title: postTitle, content: postContent },
                config
            );
            console.log(res.data);
            setMessage('Successfully editted post');
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/v1/posts/${postId}`, config);
            setMessage('Successfully deleted post');
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    const handleComment = async () => {
        try {
            await axios.post(
                '/api/v1/comments',
                { userName: userData.user.name, comment, postId },
                config
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            fetchPostById();
        };
        fetchPost();
        // eslint-disable-next-line
    }, []);

    return (
        <Card className="text-center">
            <Card.Header className="posts-header">
                {userData.user && userData.user.name === postUserName ? (
                    <div>
                        {isEditMode ? (
                            <Button
                                type="button"
                                variant="outline-primary"
                                size="sm"
                                onClick={toggleEditMode}
                                style={{ marginRight: '10px' }}
                            >
                                Exit Edit
                            </Button>
                        ) : (
                            <Button
                                type="button"
                                variant="outline-primary"
                                size="sm"
                                onClick={toggleEditMode}
                                style={{ marginRight: '10px' }}
                            >
                                Edit
                            </Button>
                        )}
                        <Button
                            type="button"
                            variant="outline-danger"
                            size="sm"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </div>
                ) : (
                    ''
                )}
            </Card.Header>
            <Card.Body>
                {message ? (
                    <Alert variant="warning">{message}</Alert>
                ) : isEditMode ? (
                    <Form onSubmit={handleEdit}>
                        <Form.Group controlId="postTitle">
                            <Form.Label className="postcreate-label">
                                Title
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={postTitle}
                                autoComplete="off"
                                onChange={e => {
                                    setPostTitle(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group controlId="postContent">
                            <Form.Label className="postcreate-label">
                                Content
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={postContent}
                                onChange={e => {
                                    setPostContent(e.target.value);
                                }}
                                as="textarea"
                                style={{ resize: 'none', height: '200px' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                ) : (
                    <div>
                        <Card.Title>{postTitle}</Card.Title>
                        <Card.Text style={{ textAlign: 'left' }}>
                            {postContent}
                        </Card.Text>
                    </div>
                )}

                <Comments postId={postId} />
                {userData.user ? (
                    <Form onSubmit={handleComment}>
                        <Form.Group controlId="comment">
                            <Form.Label className="comment-label"></Form.Label>
                            <Form.Control
                                type="text"
                                onChange={e => {
                                    setComment(e.target.value);
                                }}
                                placeholder="Comment here..."
                                as="textarea"
                                style={{ resize: 'none', height: '100px' }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" block>
                            Submit
                        </Button>
                    </Form>
                ) : (
                    ''
                )}
            </Card.Body>
            <Card.Footer className="text-muted page-footer">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Logged in users can edit and delete personal posts,
                        comment on any posts
                        <br></br>
                        2. Visitors / Unregistered users may only view posts
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default PostDetail;
