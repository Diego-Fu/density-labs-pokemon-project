import "./styles.css";

interface PokemonPreview {
  name: string;
  image: string;
}

export function Preview(pokemonPreview: PokemonPreview) {
  return (
    <div className="preview-wrapper">
      <img src={pokemonPreview.image} alt={pokemonPreview.name} />

      <h2 className="pokemon-name">{pokemonPreview.name}</h2>
    </div>
  );
}
