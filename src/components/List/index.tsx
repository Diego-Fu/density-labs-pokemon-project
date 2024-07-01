import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PokemonDetail } from "../../App";

import "./styles.css";

interface Pokemon {
  name: string;
  url: string;
}

interface ListProps {
  setLoading: (isLoading: boolean) => void;
  pokemon: PokemonDetail;
  setPokemon: (pokemon: PokemonDetail) => void;
}

export function List({ setLoading, pokemon, setPokemon }: ListProps) {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [page, setLoading]);

  const handleClick = (pokemon: Pokemon) => {
    setLoading(true);

    fetch(pokemon.url)
      .then((res) => res.json())
      .then((data) => {
        setPokemon({
          name: pokemon.name,
          image: data.sprites.front_default,
          height: 0,
          base_experience: 0,
          types: [],
          stats: [{ base_stat: 0, effort: 0, stat: { name: "" } }],
        });
        setLoading(false);
      });
  };

  const handleDoubleClick = (pokemon: Pokemon) => {
    const pokemonId = pokemon.url.split("/")[6];
    navigate(`/${pokemonId}`);
  };

  return (
    <div className="list-wrapper">
      <ul className="pokemon-list">
        {pokemons.map((pokemonItem) => (
          <li
            key={pokemonItem.name}
            onClick={() => {
              handleClick(pokemonItem);
            }}
            onDoubleClick={() => {
              handleDoubleClick(pokemonItem);
            }}
            className={`pokemon-item ${
              pokemon.name === pokemonItem.name ? "active" : ""
            }`}
          >
            {pokemonItem.name}
          </li>
        ))}
      </ul>

      <div className="buttons-wrapper">
        {page > 0 && (
          <button
            className="prev"
            onClick={() => {
              setPage(page - 20);
              setPokemons([...pokemons.slice(0, pokemons.length - 20)]);
            }}
          >
            Prev
          </button>
        )}

        {page < 151 && (
          <button
            className="next"
            onClick={() => {
              setPage(page + 20);
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
