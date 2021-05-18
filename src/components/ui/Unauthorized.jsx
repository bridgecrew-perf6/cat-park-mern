import React from 'react';
import Card from 'react-bootstrap/Card';

const Unauthorized = () => {
    return (
        <Card className="text-center">
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>Access Denied</Card.Title>
                <Card.Text>
                    Please{' '}
                    <a href="/login">
                        <strong>Log In</strong>
                    </a>{' '}
                    to access the content
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Unauthorized;
