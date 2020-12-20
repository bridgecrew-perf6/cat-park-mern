import React from 'react';
import Card from 'react-bootstrap/Card';

function about() {
    return (
        <Card className="text-center">
            <Card.Header>About</Card.Header>
            <Card.Body>
                <Card.Text style={{ textAlign: 'left' }}>
                    <strong>Cat Park</strong> is a PWA web application that
                    provides cat lovers with a forum to share thoughts related
                    to cats, such as writing posts, referencing, liking and
                    commenting on cat breeds, and searching for and view cat
                    related records. Users can navigate through different pages,
                    and create/view/update/delete posts created by registered
                    users, encouraging useful and helpful cat related
                    information sharing, and allowing new cat lovers to gain
                    basic knowledge about cats, make better informed decisions
                    when adopting cats, and help create friendly environment for
                    cats and cat lovers.<br></br>
                    <br></br>
                    Each view/page comes with a note at the bottom, explaining
                    what would be expected. Please refer to these notes for
                    guidance.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default about;
