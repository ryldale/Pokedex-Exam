import Modal from "@/shared/components/modal";
import { CapturedPokemon } from "@/shared/types/types";
import { formatName } from "@/shared/utils/formatName";
import Image from "next/image";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedPokemon: CapturedPokemon | null;
  onConfirm: () => void;
};

const PokemonModal = ({
  isOpen,
  onClose,
  selectedPokemon,
  onConfirm,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pokémon Details"
      onConfirm={onConfirm}
    >
      {selectedPokemon && (
        <div className="p-4">
          <div className="flex flex-col items-center">
            <Image
              src={selectedPokemon.sprite}
              alt={selectedPokemon.name}
              width={150}
              height={150}
              className="rounded-full shadow-lg mb-4"
            />
            <h3 className="font-semibold text-lg mb-2 font-galindo">
              {formatName(selectedPokemon.name)}
            </h3>
            <p className="text-gray-700">
              <strong>Nickname:</strong> {selectedPokemon.nickname}
            </p>
            <p className="text-gray-700">
              <strong>Captured on:</strong> {selectedPokemon.date}
            </p>
            <p className="text-gray-700">
              <strong>Weight:</strong> {selectedPokemon.weight} kg
            </p>
          </div>

          <div className="mt-4">
            <strong className="text-lg">Stats:</strong>
            <ul className="list-disc list-inside">
              {selectedPokemon.stats && selectedPokemon.stats.length > 0 ? (
                selectedPokemon.stats.map((stat, statIndex) => (
                  <li key={statIndex} className="text-gray-600">
                    <span className="font-medium">{stat.name}:</span>{" "}
                    {stat.base_stat}
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No stats available</li>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <strong className="text-lg">Abilities:</strong>
            <ul className="list-disc list-inside">
              {selectedPokemon.abilities &&
              selectedPokemon.abilities.length > 0 ? (
                selectedPokemon.abilities.map((ability, abilityIndex) => (
                  <li key={abilityIndex} className="text-gray-600">
                    {ability.name}
                  </li>
                ))
              ) : (
                <li className="text-gray-600">No abilities available</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PokemonModal;
