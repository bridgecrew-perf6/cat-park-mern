import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';

function about() {
    return (
        <Card className="text-center">
            <Card.Header>About</Card.Header>
            <Card.Body>
                <Card.Text style={{ textAlign: 'left' }}>
                    Cat Park is a progressive web app that provides offline
                    access and push notifications for subscribed users. Users
                    can not only write posts, comments, but also refer to, like,
                    and search cat breeds. Through navigation bar, users can
                    also navigate to different pages, create/read/update/delete
                    posts, check and edit user profiles. With these basic
                    functionalities and features for users to explore, Cat Park
                    is a great place to gain knowledge of cat breeds and
                    interact with others.<br></br>
                    <br></br>
                    Each view/page comes with a note at the bottom, explaining
                    what would be expected. Please refer to these notes for
                    guidance.
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. Check{' '}
                        <a
                            href="https://github.com/web-push-libs/web-push#browser-support"
                            target="_blank"
                            rel="noreferrer"
                        >
                            supported browsers
                        </a>{' '}
                        for offline content access and push notifications
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
}

export default about;
