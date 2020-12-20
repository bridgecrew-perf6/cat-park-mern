import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import Table from 'react-bootstrap/esm/Table';
import moment from 'moment';

const Posts = () => {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [postList, setPostList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleCreate = () => history.push('/postcreate');

    useEffect(() => {
        const fetchPosts = () => {
            axios
                .get(`/api/v1/posts`)
                .then(res => {
                    setPostList(res.data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchPosts();
    }, []);

    return (
        <Card className="text-center">
            <Card.Header className="posts-header">
                {userData.user ? (
                    <Button
                        type="button"
                        variant="outline-success"
                        size="sm"
                        onClick={handleCreate}
                    >
                        Create Post
                    </Button>
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
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Created</th>
                                <th>Updated</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postList.map(post => (
                                <tr key={post._id}>
                                    <td style={{ textAlign: 'left' }}>
                                        <a href={`/posts/${post._id}`}>
                                            {post.title}
                                        </a>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <a href={`/profile/${post.userName}`}>
                                            {post.name}
                                        </a>
                                    </td>
                                    <td>
                                        {moment(post.createdAt).format(
                                            'yyyy-MM-DD H:mm'
                                        )}
                                    </td>
                                    <td>
                                        {moment(post.updatedAt).format(
                                            'yyyy-MM-DD H:mm'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Card.Body>
            <Card.Footer className="text-muted page-footer">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Please register and login to create post<br></br>
                        2. Author is displayed as user's display name<br></br>
                        3. Click post title to view detailed post<br></br>
                        4. Click author to view author's profile
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Posts;
