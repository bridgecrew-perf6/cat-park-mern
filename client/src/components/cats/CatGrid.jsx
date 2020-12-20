import React from 'react';
import CatItem from './CatItem';
import Spinner from 'react-bootstrap/esm/Spinner';

const CatGrid = ({ isLoading, cats }) => {
    return isLoading ? (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    ) : (
        <section className="cards">
            {cats.map(cat => (
                <CatItem key={cat.id} cat={cat}></CatItem>
            ))}
        </section>
    );
};

export default CatGrid;
