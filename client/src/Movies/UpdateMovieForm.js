import React, { useState, useEffect } from "react";
import axios from "axios";



const UpdateMovieForm = props => {
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: null,
        stars: [], 
    });
    useEffect (() => {
        const movieToEdit = props.savedList.find(
            item => `${item.id}` === props.match.params.id
        );

        if (movieToEdit) setMovie(movieToEdit);
    }, [props.savedList, props.match.params.id]);

    const handleChange = event => {
        setMovie({
            ...movie, 
            [event.target.name]: event.target.value,
        });
        console.log("UpdateMovieForm.js: UpdateMovieForm, handleChange",movie)
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
        .put(`http:localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(res => {
            console.log("updatemovieform: handleSubmit ", res);
            props.history.push("/")
            // props.updateItems(res.data); 
            props.history.goBack();
        })
        .catch(err => {
            console.error(err);
        });
    };


    return(
        <div> 
            <h2> Update {movie.title} Movie </h2>
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
                value={movie.director}
                /> 
                <button className="form-button"> Update Movie</button>
            </form> 
    
        </div>
    );
};

export default UpdateMovieForm; 

