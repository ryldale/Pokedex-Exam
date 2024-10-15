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
  const [searchQuery, setSearchQuery] = useState("");
  const displayCount = state.displayCount;
  const limit = 150;

  useEffect(() => {
    PokemonInitData(dispatch, `pokemon?limit=${limit}&offset=0`);
  }, [dispatch, limit]);

  const filteredPokemons = state.result.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const loadMorePokemons = useCallback(() => {
    if (displayCount < filteredPokemons.length) {
      dispatch({ type: "INCREMENT_DISPLAY_COUNT" });
      PokemonInitData(dispatch, `pokemon?limit=${limit}&offset=0`);
    }
  }, [displayCount, filteredPokemons.length, dispatch, limit]);

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
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {activeIcon === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <PokemonGrid
            displayCount={displayCount}
            layout="grid"
            pokemons={filteredPokemons}
          />
        </div>
      ) : (
        <PokemonGrid
          displayCount={displayCount}
          layout="list"
          pokemons={filteredPokemons}
        />
      )}

      {displayCount < filteredPokemons.length && (
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
