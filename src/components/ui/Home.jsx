import React, { useContext } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import UserContext from '../../context/UserContext';
import bgImage from '../img/bg.png';

const Home = () => {
  const { userData } = useContext(UserContext);

  return (
    <div style={homeStyle}>
      <Jumbotron
        style={{
          marginBottom: '0px',
          backgroundColor: '#ffffff',
        }}
      >
        <div className="speech-bubble">
          <h5 style={{ marginBottom: '10px' }}>
            Welcome<br></br>
            {userData.user ? userData.user.displayName + ',' : ''}
          </h5>
          <ButtonGroup
            vertical
            size="sm"
            style={{
              marginBottom: '50px',
              display: 'flex',
            }}
          >
            <Button
              href="/search"
              variant="light"
              style={{ background: '#f4fbfe' }}
            >
              Search for cat breeds
            </Button>
            <Button
              href="/posts"
              variant="light"
              style={{ background: '#f4fbfe' }}
            >
              Share your thoughts
            </Button>
            <Button
              href="/notification"
              variant="light"
              style={{ background: '#f4fbfe' }}
            >
              Subscribe notifications
            </Button>
            <Button
              href="/about"
              variant="info"
              style={{ background: '#629bdd' }}
            >
              Learn More
            </Button>
          </ButtonGroup>
        </div>
      </Jumbotron>
      <img src={bgImage} alt="" style={bgImageStyle} />
    </div>
  );
};

const bgImageStyle = {
  width: 'auto',
  height: '30vh',
  maxWidth: '100%',
};

const homeStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default Home;
