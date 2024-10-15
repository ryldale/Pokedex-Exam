import { pokemonAPI } from "@/core/api/api";
import { ReducerActionType } from "@/shared/types/ReducerAction";
import { AxiosResponse } from "axios";
import { Dispatch } from "react";

export const PokemonInitData = (
  dispatch: Dispatch<ReducerActionType>,
  url: string
) => {
  pokemonAPI
    .get(url)
    .then((res: AxiosResponse) => {
      console.log(res.data);
      dispatch({ type: "POKEMON_DATA", data: { axiosData: res } });
    })
    .catch((err) => {
      console.log(err);
    });
};
