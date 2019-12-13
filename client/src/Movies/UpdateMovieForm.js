import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [], 
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialMovie);
    const [error, setError] = useState('');
    useEffect (() => {
        const movieToEdit = props.savedList.find(
            movie => `${movie.id}` === props.match.params.id
        );

        if (movieToEdit) setMovie(movieToEdit);
    }, [props.savedList, props.match.params.id]);

    const handleChange = event => {
        event.persist();      //?
        let value = event.target.value; 
        setMovie({
            ...movie, 
            [event.target.name]: value
        });
    };

    const handleSubmit = event => {
        event.preventDefault();
        setError('');
        axios
        .put(`http:localhost:5000/edit-movie/${movie.id}`, movie)
        .then(res => {
            console.log(res);
            props.updateItems(res.data); //?? updateItems
            props.history.goBack();
        })
        .catch(err => {
            console.error(err);
            setError(err.message);
        });
    };

    return(
        <div> 
            <h2> Update A Movie </h2>
            <form onSubmit={handleSubmit}>
            <input 
                type="text"
                name="Movie Title"
                onChange={handleChange}
                placeholder="Movie Title"
                value={movie.title}
                />
            <input 
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                /> 
                <button className="form-button"> Update Movie</button>
            </form> 
    {error && <div style={{ color: "red" }}> {Error}</div> }
        </div>
    );
};

export default UpdateMovieForm; 

