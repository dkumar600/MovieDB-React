import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
export default function NavBar() {
  const [movieList, setMovieList] = useState([]);
  const navigate = useNavigate()
  const [querytext,setQueryText] = useState('');
  const [isActive, setIsActive] = useState(false);
  // const login = useGoogleLogin({
  //   onSuccess: tokenResponse => {console.log(tokenResponse);},
  // });
  function debounce(func, delay) {
    let timer = null;
  
    return function() {
      if (timer) {
        clearTimeout(timer);
      }
  
      timer = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  }
  function rem(e){
    let movieText = e.target.value;
    setQueryText(movieText);
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f5765ee24dadfc3af6ec1916b93b22da&language=en-US&query=${movieText}&page=1`)
    .then(res=>{
      if(res.data.results.length!==0){
        setMovieList([res.data.results[0],res.data.results[1],res.data.results[2],res.data.results[3],res.data.results[4]])
      }else{
        setMovieList([])
      }
      
    });
      
  }
  function Navigation(){
    if(querytext!==''){
      console.log(querytext)
      navigate(`/movie?query=${querytext}`)
    }
  }
  const optimisedV = debounce(rem,1000);
  return (
    <div className="navbar">
      <nav>
        <h1>MovieDB</h1>
        <div className={`hamburger ${isActive ? "active":""}`} onClick={()=>setIsActive(prev=>!prev)}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={`menu-component ${isActive ? "active":""}`}>
          <ul>
            <li><Link to={'/'}>Popular</Link></li>
            <li><Link to={'/top-rated'}>Top Rated</Link></li>
            <li><Link to={'/upcoming'}>Upcoming</Link></li>
          </ul>
          <div className='search-div'>
            <input type="text" placeholder={'Movie Name'} onChange={(e) => optimisedV(e)} />
            <div className="searchresult">
              {movieList.length === 0 ? 'No Result' : movieList.map((elem) => {
                return (
                  <>
                    <Link key={elem?.id} to={`/movie/${elem?.id}`} >
                      <div className='search-container'>
                        <div className='search-image'><img src={`https://image.tmdb.org/t/p/w500/${elem?.poster_path}`} alt={elem?.title} /></div>
                        <div className="search-title">{elem?.title}</div>
                      </div>
                    </Link>
                  </>
                )
              })}
            </div>
            <button onClick={Navigation}>Search</button>
          </div>
        </div>
      </nav>

    </div>
  )
}
