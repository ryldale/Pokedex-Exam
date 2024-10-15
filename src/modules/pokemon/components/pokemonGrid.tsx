import React from "react";
import { PokemonInitStateType } from "../reducer/pokemon_init";
import PokemonDetails from "./pokemonDetail";

type propType = {
  state: PokemonInitStateType;
  displayCount: number;
  layout: "grid" | "list";
};

const PokemonGrid = ({ state, displayCount, layout }: propType) => {
  return (
    <>
      {state.result.slice(0, displayCount).map((pokemon, index) => (
        <PokemonDetails key={index} pokemon={pokemon} layout={layout} />
      ))}
    </>
  );
};

export default PokemonGrid;
