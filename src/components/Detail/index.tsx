import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { PokemonDetail } from "../../App";

import "./styles.css";

interface DetailProps {
  setLoading: (isLoading: boolean) => void;
  pokemon: PokemonDetail;
  setPokemon: (pokemon: PokemonDetail) => void;
}

export function Detail({ setLoading, pokemon, setPokemon }: DetailProps) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          height: data.height,
          base_experience: data.base_experience,
          types: data.types,
          stats: data.stats,
        });
        setLoading(false);
      });
  }, [id, setLoading, setPokemon]);

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="pokemon-detail-wrapper">
      <div className="general-stats">
        <h1 className="pokemon-name-title">{pokemon.name}</h1>
      </div>

      <div className="pokemon-main-info">
        <div className="pokemon-info">
          <h2 className="subtitle-detail">Type</h2>
          <ul className="pokemon-types-list">
            {pokemon.types.map((type) => (
              <div className="info-pill" key={type.type.name}>
                {type.type.name}
              </div>
            ))}
          </ul>

          <div className="general-stats">
            <p>
              height:<b> {pokemon.height}</b>
            </p>
            <p>
              experience: <b>{pokemon.base_experience}</b>
            </p>
          </div>
        </div>

        <div className="pokemon-info">
          <h2 className="subtitle-detail">Stats</h2>
          <ul className="pokemon-info-list">
            {pokemon.stats.map((stat) => (
              <div className="skill-bar" key={stat.stat.name}>
                {stat.stat.name}

                <div
                  className="skill-bar-percentage"
                  style={{ width: `${stat.base_stat}%` }}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={() => {
          goBack();
        }}
        className="go-back-button"
      >
        Go Back to Pokemons
      </button>
    </div>
  );
}
