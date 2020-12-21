import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image from '../ui/DefaultImage';

const CatItem = ({ cat }) => {
    const [catImageUrl, setCatImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCatInfo = async () => {
            try {
                const resCatApiKey = await axios.get('/api/v1/cats/catapi');
                const config = {
                    headers: {
                        'x-api-key': `${resCatApiKey.data}`,
                    },
                };
                const catInfo = await axios.get(
                    `https://api.thecatapi.com/v1/images/${cat.reference_image_id}`,
                    config
                );
                setCatImageUrl(catInfo.data.url);
                setIsLoading(false);
            } catch (err) {
                console.log(
                    `Image for cat breed[${cat.name}] cannot be retrieved from 3rd party API`
                );
            }
        };
        fetchCatInfo();
    }, [cat.reference_image_id, cat.name]);

    return (
        <div className="card-cat">
            <div className="card-inner">
                <div className="card-front">
                    {isLoading ? (
                        <Image />
                    ) : (
                        <img src={catImageUrl} alt="Cat" />
                    )}
                </div>
                <div className="card-back">
                    <h6>
                        {cat.name}
                        <sup>
                            <a
                                href={cat.wikipedia_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <svg
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 16 16"
                                    className="bi bi-info-circle"
                                    fill="currentColor"
                                    xmlns="https://www.w3.org/2000/svg"
                                    style={{ width: '6%', height: '6%' }}
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                                    />
                                    <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z" />
                                    <circle cx="8" cy="4.5" r="1" />
                                </svg>
                            </a>
                        </sup>
                    </h6>
                    <p className="record">
                        <strong>Origin:</strong> {cat.origin}
                    </p>
                    {cat.weight ? (
                        <p className="record">
                            <strong>Weight:</strong> {cat.weight.imperial} lbs
                        </p>
                    ) : (
                        ''
                    )}
                    <p className="record">
                        <strong>Life Span:</strong> {cat.life_span} years
                    </p>
                    <p className="record">
                        <strong>Temperament:</strong> {cat.temperament}
                    </p>
                    <p className="record description">
                        <strong>Description:</strong> {cat.description}
                    </p>
                    <div style={{ borderTop: 'solid 1px', marginTop: '10px' }}>
                        <a href={`/cats/${cat.name}`}>
                            <svg
                                xmlns="https://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-chat-dots"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"
                                />
                                <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                            </svg>
                            &nbsp;more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatItem;
