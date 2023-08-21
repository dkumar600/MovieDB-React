import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import Loading from './Loading';
export default function MovieDetails() {
    const {movieid} = useParams();
    const [singleM, setSingleM] = useState({});
    const [castDetails, setCastDetails] = useState([])
    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=f5765ee24dadfc3af6ec1916b93b22da`)
        .then(res => setSingleM(res.data))
        axios.get(`https://api.themoviedb.org/3/movie/${movieid}/credits?api_key=f5765ee24dadfc3af6ec1916b93b22da&language=en-US`)
        .then(res=>setCastDetails([...res.data.cast]))
    },[movieid])
  return (
    <div>
        <NavBar/>
        {Object.keys(singleM).length===0?<Loading/>:
        (<main>
            <section className='first-part'>
              <div className="movie-details">
                <div className="poster-details">
                  <div className="singleposter"><img src={`https://image.tmdb.org/t/p/w500`+singleM.poster_path} alt={singleM.title} /></div>
                  <div className="singledetails">
                    <div className="singletitle">{singleM.title}</div>
                    <div className="singlerating">Rating: {singleM.vote_average}</div>
                    <div className="time-genre"><span className='time'>{singleM.runtime} min </span><span className='genre'>
                    {singleM?.genres===undefined?'':singleM?.genres.map((genre,i)=>{
                      if(i===singleM.genres.length-1){
                        return (<span key={i}>{genre.name}</span>)
                      }
                      return (<span key={i}>{genre.name},</span>)
                    })}
                      </span></div>
                      <div className="release-date">Release Date : {(()=>{const d = new Date(singleM.release_date);return `${d.toDateString()}`})()}</div>
                  </div>
                </div>
                <div className="overview-container"><div className="overview-title">Overview</div>
                  {singleM.overview}
                </div>
              </div>
              <div className="movieimg"><img src={`https://image.tmdb.org/t/p/w500`+singleM.backdrop_path} alt={singleM.title} /></div>
            </section>
            <section className='cast-container'>
              <span className='h3'>Cast</span>
              <div className="cast-details">
                {castDetails.map((cast)=>{
                  if(cast.known_for_department==='Acting'){
                    return(
                      <div key={cast.id} className="cast">
                        <div className="cast-pic"><img src={`https://image.tmdb.org/t/p/w500`+cast.profile_path} alt={cast.name}/></div>
                        <div className="cast-name">{cast.name}</div>
                        <div className="cast-char">Character: {cast.character}</div>
                      </div>
                    )
                  }
                })}
              </div>
            </section>
        </main>)}
    </div>
  )
}
