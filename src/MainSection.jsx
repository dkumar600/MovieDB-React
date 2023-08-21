import React, { useState,useEffect } from 'react'
import NavBar from './NavBar'
import axios from 'axios';
import { Link,useSearchParams } from 'react-router-dom';
import Loading from './Loading';
export default function MainSection({link}) {
    const [data,setData] = useState([]);
    const [searchParam, setSearchParams] = useSearchParams();
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
      axios.get(link+pageTrack).then(res=>setData(res.data.results))
      setSearchParams({page:pageTrack})
  },[pageTrack])
    return (
      <div>
        <NavBar/>
        {data.length===0?<Loading/>:(
      <main> 
      <section>
          {data.map((elem)=>{
              return(
                  <div className="container" key={elem.id}>
                      
                          <div className="moviecontainer" >
                              <div className="movieposter"><img src={`https://image.tmdb.org/t/p/w500/${elem.poster_path}`} alt={elem.title} /></div>
                              <div>
                                  <div>{elem.title}</div>
                                  <div>Rating: {elem.vote_average}</div>
                              </div>
                          </div>
                  </div>
              )
          })}
          
      </section>
      <div className='pagination' >
            <Link to={`?page=${pageTrack}`}>
            <button onClick={()=>setPageTrack(prev=>prev-1)}>Prev</button>
                {paginate.map((elem)=>{
                    if(elem==pageTrack){
                        return(<button style={{backgroundColor:'black',color:'white'}} key={elem} onClick={()=>{setPageTrack(elem)}}>{elem}</button>)
                    }
                    return(<button key={elem} onClick={()=>{setPageTrack(elem)}}>{elem}</button>)})}
            <button onClick={()=>setPageTrack(prev=>prev+1)}>Next</button>
          </Link>
          </div>
      </main>
      )}
      </div>
    )
}
