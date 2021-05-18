import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';

const Post = () => {
  const { catName } = useParams();
  const { userData } = useContext(UserContext);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [commentData, setCommentData] = useState('');
  const [comment, setComment] = useState('');
  const [origin, setOrigin] = useState('');
  const [temperament, setTemperament] = useState('');
  const [weightImperial, setWeightImperial] = useState('');
  const [lifeSpan, setLifeSpan] = useState('');
  const [indoor, setIndoor] = useState(true);
  const [lap, setLap] = useState(true);
  const [intelligence, setIntelligence] = useState(0);
  const [adaptability, setAdaptability] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  const [affectionLevel, setAffectionLevel] = useState(0);
  const [childFriendly, setChildFriendly] = useState(0);
  const [strangerFriendly, setStrangerFriendly] = useState(0);
  const [dogFriendly, setDogFriendly] = useState(0);
  const [sheddingLevel, setSheddingLevel] = useState(0);
  const [socialNeeds, setSocialNeeds] = useState(0);
  const [description, setDescription] = useState('');
  const [wikipediaUrl, setWikipediaUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const fetchCatByName = async () => {
    try {
      const resCatApiKey = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/cats/catapi`
      );
      const config = {
        headers: {
          'x-api-key': `${resCatApiKey.data}`,
        },
      };
      const catData = await axios.get(
        `https://api.thecatapi.com/v1/breeds/search?q=${catName}`,
        config
      );
      const cat = catData.data[0];
      setOrigin(cat.origin);
      setTemperament(cat.temperament);
      setWeightImperial(cat.weight.imperial);
      setLifeSpan(cat.life_span);
      setIndoor(cat.indoor);
      setLap(cat.lap);
      setIntelligence(cat.intelligence);
      setAdaptability(cat.adaptability);
      setEnergyLevel(cat.energy_level);
      setAffectionLevel(cat.affection_level);
      setChildFriendly(cat.child_friendly);
      setStrangerFriendly(cat.stranger_friendly);
      setDogFriendly(cat.dog_friendly);
      setSheddingLevel(cat.shedding_level);
      setSocialNeeds(cat.social_needs);
      setDescription(cat.description);
      setWikipediaUrl(cat.wikipedia_url);

      const catImage = await axios.get(
        `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`,
        config
      );
      setImageUrl(catImage.data.url);
    } catch (err) {
      console.log(`3rd party API error`);
      console.log(err);
    }
  };

  const fetchCommentByCatName = async () => {
    const comments = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/catcomments/${catName}`
    );
    setCommentData(comments.data);
  };

  const fetchLikeByCatName = async () => {
    const likes = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/likes/${catName}`
    );
    setLikes(likes.data);
  };

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': `${localStorage.getItem('auth-token')}`,
    },
  };

  const handleComment = async () => {
    if (!comment) return;

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/catcomments`,
        {
          catName,
          userName: userData.user.name,
          name: userData.user.displayName,
          comment,
        },
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (liked) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/likes/${catName}/${userData.user.name}`,
          config
        );
      } catch (err) {
        console.log(err.response.data);
      }
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/v1/likes`,
          {
            userName: userData.user.name,
            name: userData.user.displayName,
            catName,
          },
          config
        );
      } catch (err) {
        console.log(err);
      }
    }

    setLiked(!liked);
  };

  const checkLikeByCatNameUserName = async () => {
    if (userData.user) {
      const doesLike = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/likes/${catName}/${userData.user.name}`
      );
      setLiked(doesLike.data);
    }
  };

  useEffect(() => {
    fetchCatByName();
    fetchCommentByCatName();
    fetchLikeByCatName();
    checkLikeByCatNameUserName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, liked]);

  return (
    <Card className="text-center">
      <Card.Header>
        <h3>{catName}</h3>
      </Card.Header>
      <Card.Body>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={`${imageUrl}`} />

            <Card.Header>
              {userData.user ? (
                <span onClick={handleLike} style={{ cursor: 'pointer' }}>
                  {!liked ? (
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="https://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="red"
                      className="bi bi-heart-fill"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                      />
                    </svg>
                  )}
                </span>
              ) : (
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                  />
                </svg>
              )}
              &nbsp;{likes.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <svg
                xmlns="https://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chat-text"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                />
                <path
                  fillRule="evenodd"
                  d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              &nbsp;
              {commentData.length}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href={wikipediaUrl} target="_blank" rel="noreferrer">
                <svg
                  xmlns="https://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-info-circle"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                  />
                  <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                  <circle cx="8" cy="4.5" r="1" />
                </svg>
              </a>
            </Card.Header>
            <ListGroup variant="flush" style={{ textAlign: 'left' }}>
              {commentData
                ? commentData.map(commentItem => (
                    <ListGroup.Item key={commentItem._id}>
                      <a href={`/profile/${commentItem.userName}`}>
                        {commentItem.name}
                      </a>
                      : {commentItem.comment}
                    </ListGroup.Item>
                  ))
                : ''}
            </ListGroup>
            {userData.user ? (
              <Form onSubmit={handleComment}>
                <Form.Group controlId="comment">
                  <Form.Label className="comment-label"></Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => {
                      setComment(e.target.value.trim());
                    }}
                    placeholder="Comment here..."
                    as="textarea"
                    style={{
                      resize: 'none',
                      height: '100px',
                      width: '20rem',
                      margin: '0 auto 0 auto',
                    }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  block
                  style={{
                    width: '20rem',
                    margin: '0 auto 30px auto',
                  }}
                >
                  Submit
                </Button>
              </Form>
            ) : (
              ''
            )}
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body style={{ textAlign: 'left' }}>
              <p>
                <strong>Origin:</strong> {origin}
              </p>
              <p>
                <strong>Weight:</strong> {weightImperial} lbs
              </p>
              <p>
                <strong>Life Span:</strong> {lifeSpan} years
              </p>
              <p>
                <strong>Temperament:</strong> {temperament}
              </p>
              <p>
                <strong>Indoor:</strong> {indoor ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Lap:</strong> {lap ? 'Yes' : 'No'}
              </p>
              <Row>
                <Col>
                  <strong>Intelligence:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={intelligence * 20}
                    label={`${intelligence}/5`}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <strong>Adaptability:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={adaptability * 20}
                    label={`${adaptability}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Energy Level:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={energyLevel * 20}
                    label={`${energyLevel}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Affection Level:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={affectionLevel * 20}
                    label={`${affectionLevel}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Child Friendly:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={childFriendly * 20}
                    label={`${childFriendly}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Stranger Friendly:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={strangerFriendly * 20}
                    label={`${strangerFriendly}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Dog Friendly:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={dogFriendly * 20}
                    label={`${dogFriendly}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Shedding Level:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={sheddingLevel * 20}
                    label={`${sheddingLevel}/5`}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>Social Needs:</strong>
                </Col>
                <Col>
                  <ProgressBar
                    variant="info"
                    now={socialNeeds * 20}
                    label={`${socialNeeds}/5`}
                  />
                </Col>
              </Row>
              <p style={{ marginTop: '15px' }}>
                <strong>Description:</strong> {description}
              </p>
            </Card.Body>
          </Card>
        </CardGroup>
      </Card.Body>
      <Card.Footer className="text-muted">
        <div style={{ textAlign: 'left' }}>
          <span>
            <Badge variant="secondary">Note</Badge>
          </span>
          <p style={{ fontSize: 'small' }}>
            1. <strong>Like</strong> and <strong>Comment</strong>{' '}
            functionalities are enbaled for logged in users<br></br>
            2. Click{' '}
            <svg
              xmlns="https://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
              <circle cx="8" cy="4.5" r="1" />
            </svg>{' '}
            to view corresponding Wikipedia page
          </p>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
