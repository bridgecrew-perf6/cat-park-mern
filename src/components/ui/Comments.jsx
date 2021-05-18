import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';

const Comments = ({ postId }) => {
    const [commentData, setCommentData] = useState('');
    const [isLoading, SetIsLoading] = useState(true);

    const fetchCommentsByPostId = async () => {
        const commentRes = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/comments/post/${postId}`);
        setCommentData(commentRes.data);
        SetIsLoading(false);
    };

    useEffect(() => {
        const fetchComments = async () => {
            fetchCommentsByPostId();
        };
        fetchComments();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {!isLoading ? (
                commentData.length !== 0 ? (
                    <Table
                        striped
                        bordered
                        hover
                        size="sm"
                        style={{ marginTop: '40px' }}
                    >
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Comment</th>
                                <th>Commented</th>
                            </tr>
                        </thead>

                        <tbody>
                            {commentData.map(commentItem => (
                                <tr key={commentItem._id}>
                                    <td style={{ textAlign: 'left' }}>
                                        <a
                                            href={`/profile/${commentItem.userName}`}
                                        >
                                            {commentItem.name}
                                        </a>
                                    </td>
                                    <td style={{ textAlign: 'left' }}>
                                        {commentItem.comment}
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        {moment(commentItem.createdAt).format(
                                            'yyyy-MM-DD H:mm'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <Alert variant="info" style={{ marginTop: '40px' }}>
                        No Comment
                    </Alert>
                )
            ) : (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )}
        </>
    );
};

export default Comments;
