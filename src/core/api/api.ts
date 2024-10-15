import axios from "axios";

const apiPokemonEnv = {
  master: "https://pokeapi.co/api/v2/",
};

export const baseURLPokemon = apiPokemonEnv.master;

export const pokemonAPI = axios.create({
  baseURL: baseURLPokemon,
  headers: {
    "Content-Type": "application/json",
  },
});


