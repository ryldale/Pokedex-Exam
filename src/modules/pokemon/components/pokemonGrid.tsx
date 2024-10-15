import React from "react";
import { PokemonInitStateType } from "../reducer/pokemon_init";
import PokemonDetails from "./pokemonDetail";

type propType = {
  pokemons: PokemonInitStateType["result"];
  displayCount: number;
  layout: "grid" | "list";
};

const PokemonGrid = ({ pokemons, displayCount, layout }: propType) => {
  return (
    <>
      {pokemons.slice(0, displayCount).map((pokemon, index) => (
        <PokemonDetails key={index} pokemon={pokemon} layout={layout} />
      ))}
    </>
  );
};

export default PokemonGrid;
