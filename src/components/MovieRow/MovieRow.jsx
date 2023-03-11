import React, { useState } from "react";
import "./styles.css";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function MovieRow({ title, items }) {

  const [scrollX, setScrollX] = useState(0)

  const handleLeftArrow = () => {
    let axisX = scrollX + Math.round(window.innerWidth / 2);
    if(axisX > 0){
      axisX = 0
    }
    setScrollX(axisX)
  }

  const handleRightArrow = () => {
    let axisX = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.results.length * 150;
    if((window.innerWidth - listWidth > axisX)){
      axisX = (window.innerWidth - listWidth) - 60;
    }
    setScrollX(axisX)
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--left" onClick={handleLeftArrow}>
      <NavigateBeforeIcon style={{fontSize:50}}/>
      </div>
      <div className="movieRow--right" onClick={handleRightArrow}>
      <NavigateNextIcon style={{fontSize:50}}/>
      </div>

      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft:scrollX,
          width: items.results.length * 150 
          }}>
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                  alt={item.original_title}
                  key={key}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
