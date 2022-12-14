import { Row } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from './Sections/MainImage';
import axios from 'axios';


function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MianMovieImage, setMianMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endPoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endPoint)
    }, [])

    const fetchMovies = (endPoint) => {
        fetch(endPoint)
        .then(response => response.json())
        .then(response => {
            // setMovies(...[response.results])
            setMovies([...Movies, ...response.results])
            setMianMovieImage(response.results[0])
            setCurrentPage(response.page)
        })
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endPoint)
    }

    return (
        <div style={{ width: '100%', margin: '0'}}>
        {MianMovieImage &&
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${MianMovieImage.backdrop_path}`}
                title={MianMovieImage.original_title}
                text={MianMovieImage.overview} 
            />
        }
            <div style={{ width: '85%', margin: '1rem auto'}}>
                <h2>Movies by latest</h2>
                <hr/>
                <Row gutter={[16, 16]}>
                {Movies && Movies.map((movie, index) => (
                    <React.Fragment key={index}>
                        <GridCards 
                            landingPage
                            image={movie.poster_path ?
                                `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}
                </Row>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
