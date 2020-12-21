import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import CatGrid from '../cats/CatGrid';

const Search = () => {
    const [cats, setCats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchContent, setSearchContent] = useState('');
    const [message, setMessage] = useState({ type: '', content: '' });
    const CAT_API_KEY = process.env.REACT_APP_CAT_API_KEY;
    const config = {
        headers: {
            'x-api-key': `${CAT_API_KEY}`,
        },
    };

    const handleSearch = async e => {
        e.preventDefault();
        if (!searchContent) {
            return;
        }

        try {
            const catList = await axios(
                `https://api.thecatapi.com/v1/breeds/search?q=${searchContent}`,
                config
            );

            if (catList.data.length === 0) {
                setMessage({
                    type: 'info',
                    content: 'No such cat breed on record',
                });
            } else {
                setCats(catList.data);
                setMessage({
                    type: 'success',
                    content: `${catList.data.length} cat breed(s) found`,
                });
            }
        } catch (err) {
            console.log('3rd Party API error');
        }
    };

    const fetchBreeds = async () => {
        try {
            const catList = await axios(
                `https://api.thecatapi.com/v1/breeds`,
                config
            );
            setCats(catList.data);
            setIsLoading(false);
            setMessage({
                type: 'success',
                content: `${catList.data.length} cat breed(s) found`,
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleDisplayAll = () => {
        fetchBreeds();
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <Card className="text-center">
            <Card.Header>Cat Breeds Information</Card.Header>
            <Card.Body>
                <Form inline className="search-bar" onSubmit={handleSearch}>
                    <Form.Label htmlFor="search" srOnly>
                        Cat
                    </Form.Label>
                    <Form.Control
                        className="mb-2 mr-sm-2"
                        id="search"
                        value={searchContent}
                        onChange={e => setSearchContent(e.target.value)}
                        placeholder="Search a cat breed"
                        autoComplete="off"
                        autoFocus
                    />
                    <Button
                        type="submit"
                        className="mb-2 search-button"
                        variant="outline-primary"
                    >
                        Search
                    </Button>
                    <Button
                        type="button"
                        className="mb-2"
                        variant="outline-primary"
                        onClick={handleDisplayAll}
                    >
                        Display All
                    </Button>
                </Form>
                {message.type ? (
                    <Alert variant={message.type}>{message.content}</Alert>
                ) : (
                    ''
                )}
                <CatGrid isLoading={isLoading} cats={cats} />
            </Card.Body>
            <Card.Footer className="text-muted search-note page-footer">
                <div style={{ textAlign: 'left' }}>
                    <span>
                        <Badge variant="secondary">Note</Badge>
                    </span>
                    <p style={{ fontSize: 'small' }}>
                        1. <strong>Search</strong> returns cat breeds detailed
                        information with breed names containing the exact typed
                        characters
                        <br></br>
                        2. <strong>Display All</strong> returns all the cat
                        breeds fetched from a 3rd party API:{' '}
                        <a
                            href="https://docs.thecatapi.com/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            TheCatApi
                        </a>
                        <br></br>
                        3. Hover over cat card to flip the card and show brief
                        description
                        <br></br>
                        4. Click{' '}
                        <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-info-circle"
                            fill="currentColor"
                            xmlns="https://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                            />
                            <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                            <circle cx="8" cy="4.5" r="1" />
                        </svg>{' '}
                        icon on the back of each card to redirect to
                        corresponding Wikipedia page<br></br>
                        *5. Click <strong>More</strong> at the bottom of the
                        back of card to view cat breed detailed information
                    </p>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Search;
