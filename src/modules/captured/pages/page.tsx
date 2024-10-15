"use client";

import { pokemonAPI } from "@/core/api/api";
import { PokemonDetails } from "@/modules/pokemon/reducer/pokemon_init";
import Header from "@/shared/components/header";
import getCapturedPokemons from "@/shared/utils/getCapturedPokemons";
import { useEffect, useState } from "react";
import CapturedPokemons from "../components/capturedPokemons";
import { CapturedPokemon } from "@/shared/types/types";

const CapturedPage = () => {
  const [capturedPokemons, setCapturedPokemons] = useState<CapturedPokemon[]>(
    []
  );
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    const captured = getCapturedPokemons();
    setCapturedPokemons(captured);
  }, []);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const controller = new AbortController();

      const detailsPromises = capturedPokemons.map((pokemon) =>
        pokemonAPI.get(pokemon.url, { signal: controller.signal })
      );

      Promise.all(detailsPromises)
        .then((responses) => {
          const details = responses.map((res) => res.data);
          setPokemonDetails(details);
        })
        .catch((err) => {
          console.log(err);
        });

      return () => {
        controller.abort();
      };
    };

    if (capturedPokemons.length > 0) {
      fetchPokemonDetails();
    }
  }, [capturedPokemons]);

  return (
    <div className="p-4 mb-6 bg-white rounded-2xl">
      <Header
        title={"Captured Pokémons"}
        caption={"Explore your collection of captured Pokémon."}
      />

      {capturedPokemons.length > 0 ? (
        <CapturedPokemons
          capturedPokemons={capturedPokemons}
          pokemonDetails={pokemonDetails}
        />
      ) : (
        <p>No Pokémon captured yet.</p>
      )}
    </div>
  );
};

export default CapturedPage;
