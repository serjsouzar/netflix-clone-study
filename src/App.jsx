import React, { useEffect, useState } from "react";
import MovieRow from "./components/MovieRow/MovieRow";
import FeatureadMovie from "./components/FeaturedMovie/FeatureadMovie";
import Header from "./components/Header/Header";
import tmdbAPI from "./tmdbAPI";
import "./App.css";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //PEGANDO LIST TOTAL DE MOVIES
      let list = await tmdbAPI.getHomeList();
      setMovieList(list);

      //PEGANDO O FEATURED
      let originals = list.filter((item) => item.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await tmdbAPI.getMovieInfo(chosen.id, "tv" || chosen.id, "movie");
      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const handleScrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", handleScrollListener);
    return () => {
      window.removeEventListener("scroll", handleScrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeatureadMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        All rights reserved by Netflix
        <br />
        Data collected by themoviedb.org
        <br />
      </footer>
    </div>
  );
}
