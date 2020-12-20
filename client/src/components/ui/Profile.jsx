import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

const Profile = () => {
    const { userData } = useContext(UserContext);
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [setMessage] = useState('');
    const { userName } = useParams();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': `${localStorage.getItem('auth-token')}`,
        },
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleEdit = async e => {
        try {
            const res = await axios.put(
                `/api/v1/users/${userName}`,
                { name, email },
                config
            );
            console.log(res.data);
            setMessage('Successfully editted post');
        } catch (err) {
            setMessage(err.response.data);
        }
    };

    useEffect(() => {
        const fetchUserByUsername = () => {
            axios
                .get(`/api/v1/users/${userName}`)
                .then(res => {
                    setUser(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const fetchPosts = () => {
            axios
                .get(`/api/v1/posts/profile/${userName}`)
                .then(res => {
                    setPostList(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        fetchPosts();
        fetchUserByUsername();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card className="text-center">
            <Card.Header className="posts-header">
                {userData.user && userData.user.id === user.id ? (
                    isEditMode ? (
                        <Button
                            type="button"
                            variant="outline-primary"
                            size="sm"
                            onClick={toggleEditMode}
                            style={{ marginRight: '10px' }}
                        >
                            Exit Edit Profile
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            variant="outline-primary"
                            size="sm"
                            onClick={toggleEditMode}
                            style={{ marginRight: '10px' }}
                        >
                            Edit Profile
                        </Button>
                    )
                ) : (
                    ''
                )}
            </Card.Header>
            <Card.Body>
                {isLoading ? (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                ) : (
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col sm={4} lg="4">
                                <Row>
                                    <svg
                                        xmlns="https://www.w3.org/2000/svg"
                                        width="160"
                                        height="160"
                                        fill="currentColor"
                                        className="bi bi-person-bounding-box"
                                        style={{ marginBottom: '50px' }}
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                                        />
                                    </svg>
                                </Row>
                                <Row>User Name: {user.userName}</Row>
                                <Row>Name: {user.name}</Row>
                                {userData.user &&
                                userData.user.name === user.userName ? (
                                    <Row>Email: {user.email}</Row>
                                ) : (
                                    ''
                                )}
                            </Col>
                            <Col sm={8} lg="8">
                                <Row>
                                    {isLoading ? (
                                        <Spinner
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    ) : (
                                        <Table
                                            striped
                                            bordered
                                            hover
                                            size="sm"
                                            style={{ marginTop: '40px' }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Published Posts</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {postList.map(post => (
                                                    <tr key={post._id}>
                                                        <td
                                                            style={{
                                                                textAlign:
                                                                    'left',
                                                            }}
                                                        >
                                                            <a
                                                                href={`/posts/${post._id}`}
                                                            >
                                                                {post.title}
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    )}
                                </Row>
                            </Col>
                        </Row>

                        {isEditMode ? (
                            <Form
                                onSubmit={handleEdit}
                                action={`/profile/${userData.user.name}`}
                            >
                                <Form.Group controlId="name">
                                    <Form.Label className="name-label">
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={name}
                                        autoComplete="off"
                                        onChange={e => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label className="email-label">
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={email}
                                        autoComplete="off"
                                        onChange={e => {
                                            setEmail(e.target.value);
                                        }}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        ) : (
                            ''
                        )}
                    </Container>
                )}
            </Card.Body>
            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Click <strong>Edit Profile</strong> to modify name
                        and email<br></br>
                        2. Email address is hidden from other users and visitors
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Profile;
