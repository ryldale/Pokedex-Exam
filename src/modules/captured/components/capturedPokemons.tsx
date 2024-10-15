import React, { useState } from "react";
import Image from "next/image";
import { CapturedPokemon } from "@/shared/types/types";
import { PokemonDetails } from "@/modules/pokemon/reducer/pokemon_init";
import PokemonModal from "./pokemonModal";
import { formatName } from "@/shared/utils/formatName";

type PropType = {
  capturedPokemons: CapturedPokemon[];
  pokemonDetails: PokemonDetails[];
};

const CapturedPokemons = ({ capturedPokemons, pokemonDetails }: PropType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] =
    useState<CapturedPokemon | null>(null);

  const handlePokemonClick = (pokemon: CapturedPokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };
  return (
    <>
      {/* Modal Component */}
      <PokemonModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        selectedPokemon={selectedPokemon}
        onConfirm={() => {
          console.log("Confirmed:", selectedPokemon);
          handleModalClose();
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {capturedPokemons.map((pokemon, index) => (
          <div
            key={pokemon.name}
            className="flex flex-col border border-gray-300 rounded-lg p-2 cursor-pointer"
            onClick={() => handlePokemonClick(pokemon)}
          >
            <div className="flex justify-center mb-2">
              {pokemonDetails[index] && (
                <Image
                  src={pokemonDetails[index]?.sprites?.front_default}
                  alt={pokemon.name}
                  width={150}
                  height={150}
                />
              )}
            </div>
            <div className="flex flex-col justify-center">
              <p>
                <strong>Name:</strong> {formatName(pokemon.name)}
              </p>
              <p>
                <strong>Nickname:</strong> {pokemon.nickname}
              </p>
              <p>
                <strong>Captured on:</strong> {pokemon.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CapturedPokemons;
