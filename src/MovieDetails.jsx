import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
export default function MovieDetails() {
    const {movieid} = useParams();
    const [singleM, setSingleM] = useState({});
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=f5765ee24dadfc3af6ec1916b93b22da`)
        .then(res => console.log(res.data))
        axios.get(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=f5765ee24dadfc3af6ec1916b93b22da&language=en-US`)
        .then(res=>console.log(res.data))
    })
    console.log(movieid)
  return (
    <div>
        <NavBar/>
        <main>
            
        </main>
    </div>
  )
}
