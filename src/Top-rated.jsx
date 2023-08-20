import MainSection from "./MainSection";

export default function TopRated() {
  return(
    <>
    <MainSection link={'https://api.themoviedb.org/3/movie/top_rated?api_key=f5765ee24dadfc3af6ec1916b93b22da&language=en-US&page='}/>
    </>
  )
}
