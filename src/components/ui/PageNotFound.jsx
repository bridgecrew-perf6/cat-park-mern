import React from 'react';
import Card from 'react-bootstrap/Card';

const PageNotFound = () => {
    return (
        <Card className="text-center">
            <Card.Header></Card.Header>
            <Card.Body>
                <Card.Title>Page Not Found</Card.Title>
                <Card.Text>
                    Please check the URL or back to{' '}
                    <a href="/">
                        <strong>home page</strong>
                    </a>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PageNotFound;
