"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import PokemonReducer from "../reducer/pokemon_reducer";
import { PokemonInitState } from "../reducer/pokemon_init";
import { PokemonInitData } from "../functions/pokemonData";
import PokemonGrid from "../components/pokemonGrid";
import PokemonHeader from "@/shared/components/pokemonHeader";

const PokemonPage = () => {
  const [state, dispatch] = useReducer(PokemonReducer, PokemonInitState);
  const [activeIcon, setActiveIcon] = useState<"list" | "grid">("grid");
  const displayCount = state.displayCount;
  const limit = 150;

  useEffect(() => {
    PokemonInitData(dispatch, `pokemon?limit=${limit}&offset=0`);
  }, [dispatch]);

  const loadMorePokemons = useCallback(() => {
    if (displayCount < state.result.length) {
      dispatch({ type: "INCREMENT_DISPLAY_COUNT" });
      PokemonInitData(dispatch, `pokemon?limit=${limit}&offset=0`);
    }
  }, [displayCount, state.result.length, dispatch, limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        loadMorePokemons();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadMorePokemons]);

  return (
    <div className="p-4 mb-6 bg-white rounded-2xl">
      <PokemonHeader
        title={"List of Pokémon"}
        caption={"150 Pokémons"}
        activeIcon={activeIcon}
        toggleIcon={setActiveIcon}
      />

      {activeIcon === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <PokemonGrid state={state} displayCount={displayCount} layout="grid"/>
        </div>
      ) : (
        <PokemonGrid state={state} displayCount={displayCount} layout="list"/>
      )}

      {displayCount < state.result.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMorePokemons}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
