import React from "react";
import "./styles.css";

export default ({ item }) => {
  let firstReleasedDate = new Date(item.first_air_date)
  let genres = [];
  for(let i in item.genres) {
    genres.push(item.genres[i].name)
  }

  let description = item.overview
  if(description.length > 250) {
    description = description.substring(0, 250)+'...';
  }
  
  return (
    <section
      className="featured"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="featured--vertical">
        <div className="featured--horizontal">
          <div className="featured--name">{item.original_name}</div>
          <div className="featured--info">
            <div className="featured--points">{item.vote_average.toFixed(1)} pontos</div>
            <div className="featured--year">{firstReleasedDate.getFullYear()}</div>
            {
            item.number_of_seasons ?   
            <div className="featured--seasons">{item.number_of_seasons} Temporada{item.number_of_seasons !== 1 ? "s" : ""}</div>
            : ""
            } 
            <div className="featured--overview">{description}</div>
            <div className="featured--buttons">
              <a href={`/watch/${item.id}`} className="featured--watchbutton">► Assistir</a>
              <a href={`/list/add/${item.id}`} className="featured--mylistbutton">+ Minha Lista</a>
            </div>
            <div className="featured--genres"><strong>Gêneros: </strong>{genres.join(', ')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
