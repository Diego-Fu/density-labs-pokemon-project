import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { List } from "./components/List";
import { Detail } from "./components/Detail";
import { Preview } from "./components/Preview";
import Loading from "./components/Loading";

import pokemonLogo from "./assets/pokelogo.svg";
import pokeball from "./assets/pokeball.svg";

import "./App.css";

export interface PokemonDetail {
  name: string;
  image: string;
  height: number;
  base_experience: number;
  types: { type: { name: string } }[];
  stats: [{ base_stat: number; effort: number; stat: { name: string } }];
}

function App() {
  const [pokemon, setPokemon] = useState<PokemonDetail>({
    name: "",
    image: pokeball,
    height: 0,
    base_experience: 0,
    types: [],
    stats: [{ base_stat: 0, effort: 0, stat: { name: "" } }],
  });
  const [isLoading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="side-wrapper">
          <div className="pokemon-logo">
            <Link to="/">
              <img src={pokemonLogo} alt="Pokemon Logo" />
            </Link>
          </div>

          {isLoading && <Loading />}

          <Preview image={pokemon.image} name={pokemon.name} />
        </div>

        <div className="content-wrapper">
          <Routes>
            <Route
              path="/"
              element={
                <List {...{ isLoading, setLoading, pokemon, setPokemon }} />
              }
            />
            <Route
              path="/:id"
              element={
                <Detail {...{ isLoading, setLoading, pokemon, setPokemon }} />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
