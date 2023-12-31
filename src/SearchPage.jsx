import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useSearchParams,Link } from 'react-router-dom'
import axios from 'axios';
import Loading from './Loading';
export default function SearchPage() {
    const[searchParam,setSearchParams] = useSearchParams();
    const [data,setData] = useState([]);
    const [pageTrack, setPageTrack] = useState(1);
    const [paginate, setPagination] = useState([]);
    useEffect(()=>{
      let pageArray=[];
      let page;
      let pageNumber;
      if(pageTrack<=3){
          pageNumber=3;
          page = 3-2;
          if(pageTrack<=0){
              setPageTrack(1)
          }
      }else{
          pageNumber=pageTrack;
          page=pageNumber-2;
      }
      for(page;page<=pageNumber+2;page++){
          pageArray.push(page)
      }
      setPagination([...pageArray])
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=f5765ee24dadfc3af6ec1916b93b22da&language=en-US&query=${searchParam.get('query')}&page=${pageTrack}`).then(res=>setData(res.data.results))
  },[pageTrack,searchParam.get('query')])
    return (
      <div>
        <NavBar/>
        {data.length===0?<Loading/>:(
      <main> 
        <h2>You have Searched For : {searchParam.get('query')}</h2>
      <section>
          {data.map((elem)=>{
              return(
                  <div className="container" key={elem.id}>
                      <Link to={`/movie/${elem.id}`}>
                          <div className="moviecontainer" >
                              <div className="movieposter"><img src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`} alt={elem.title} /></div>
                              <div>
                                  <div>{elem.title}</div>
                                  <div>Rating: {elem.vote_average}</div>
                              </div>
                          </div>
                      </Link>
                  </div>
              )
          })}
          
      </section>
      <div className='pagination' >
          <button onClick={()=>setPageTrack(prev=>prev-1)}>Prev</button>
              {paginate.map((elem)=>{
                  if(elem==pageTrack){
                      return(<button style={{backgroundColor:'black',color:'white'}} key={elem} onClick={()=>{setPageTrack(elem)}}>{elem}</button>)
                  }
                  return(<button key={elem} onClick={()=>{setPageTrack(elem)}}>{elem}</button>)})}
          <button onClick={()=>setPageTrack(prev=>prev+1)}>Next</button>
          </div>
      </main>
      )}
      </div>
    )
}
