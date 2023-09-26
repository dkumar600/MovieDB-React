import React from 'react'
import Skeleton,{SkeletonTheme} from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Loading() {
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  return (
    <main>
      <section  style={{display:"flex",flexWrap:"wrap"}}>
      {arr.map(elem => (<div key={elem} style={{margin:"35px 15px",zIndex:-1}}>
      <SkeletonTheme baseColor="#11182729" highlightColor="rgb(0 79 126)">
        <Skeleton height="170px" width="140px" />
        <Skeleton width="90px" />
        <Skeleton width="80px" />
        </SkeletonTheme>
      </div>))}
      </section>
      
    </main>
  )
}
