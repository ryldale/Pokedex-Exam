import React, { useEffect, useState } from "react";
import {
  Pokemon,
  PokemonDetails as PokemonDetailsType,
} from "../reducer/pokemon_init";
import { pokemonAPI } from "@/core/api/api";
import { AxiosResponse } from "axios";
import Image from "next/image";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { formatName } from "@/shared/utils/formatName";

type propType = {
  pokemon: Pokemon;
  layout: "grid" | "list";
};

const PokemonDetail = ({ pokemon, layout }: propType) => {
  const [pokemonDetails, setPokemonDetails] =
    useState<PokemonDetailsType | null>(null);
  const [isCaptured, setIsCaptured] = useState<boolean>(false);
  const [captureDate, setCaptureDate] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();
    pokemonAPI
      .get(pokemon.url, { signal: controller.signal })
      .then((res: AxiosResponse) => {
        console.log(res.data);
        setPokemonDetails(res.data);

        const storedData = localStorage.getItem(pokemon.name);
        if (storedData) {
          const { date, nickname } = JSON.parse(storedData);
          setIsCaptured(true);
          setCaptureDate(date);
          setNickname(nickname);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      controller.abort();
    };
  }, [pokemon.name, pokemon.url]);

  const handleCapture = () => {
    if (nickname.trim() === "") return;

    const formattedStats = Array.isArray(pokemonDetails?.stats)
      ? pokemonDetails.stats.map((stat) => ({
          name: stat.stat.name,
          base_stat: stat.base_stat,
        }))
      : [];

    const formattedAbilities = Array.isArray(pokemonDetails?.abilities)
      ? pokemonDetails.abilities.map((ability) => ({
          name: ability.ability.name,
        }))
      : [];

    const currentDate = new Date().toLocaleDateString();
    const captureInfo = {
      date: currentDate,
      nickname,
      url: pokemon.url,
      weight: pokemonDetails?.weight,
      stats: formattedStats,
      abilities: formattedAbilities,
      sprite: pokemonDetails?.sprites?.front_default,
    };

    console.log("Capture info being saved:", captureInfo);

    localStorage.setItem(pokemon.name, JSON.stringify(captureInfo));

    setIsCaptured(true);
    setCaptureDate(currentDate);
  };

  const handleRelease = () => {
    localStorage.removeItem(pokemon.name);

    setIsCaptured(false);
    setCaptureDate("");
    setNickname("");
  };

  return (
    <div
      className={`${
        layout === "grid" ? "flex flex-col" : "flex flex-row mb-4"
      } items-center border-2 border-solid rounded-2xl border-[#D7D7D7] p-4 `}
    >
      <div className="flex justify-center relative" onClick={handleCapture}>
        {isCaptured && (
          <CheckCircleOutlineIcon
            style={{
              position: "absolute",
              width: 150,
              height: "auto",
              color: "#32CD32",
            }}
          />
        )}
        {pokemonDetails?.sprites.front_default ? (
          <div className="flex flex-col items-center">
            <Image
              src={pokemonDetails.sprites.front_default}
              alt={pokemon.name}
              width={150}
              height={150}
            />
            <p className="font-galindo">{formatName(pokemon.name)}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-gray-400 rounded-full"></div>
            <span>Loading...</span>
          </div>
        )}
      </div>
      {!isCaptured && (
        <div className="flex flex-col mt-4 w-full">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="border border-solid rounded-2xl p-2 mb-2 w-full"
          />
          <input
            type="date"
            value={captureDate}
            onChange={(e) => setCaptureDate(e.target.value)}
            className="border border-solid rounded-2xl p-2 mb-2 w-full"
          />
          <button
            onClick={handleCapture}
            className="bg-blue-500 text-white rounded p-2"
          >
            Tag as Captured
          </button>
        </div>
      )}
      {isCaptured && (
        <div className="flex flex-col mt-4 w-full">
          <p>
            <strong>Nickname:</strong> {nickname}
          </p>
          <p>
            <strong>Captured on:</strong> {captureDate}
          </p>
          <button
            onClick={handleRelease}
            className="bg-red-500 text-white rounded p-2 mt-2"
          >
            Release
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonDetail;
