import { ReducerActionType } from "@/shared/types/ReducerAction";
import { Reducer } from "react";
import { PokemonInitStateType } from "./pokemon_init";

const PokemonReducer: Reducer<PokemonInitStateType, ReducerActionType> = (
  state: PokemonInitStateType,
  action: ReducerActionType
) => {
  switch (action.type) {
    case "POKEMON_DATA":
      const { count, next, previous, results } = action.data.axiosData.data;
      return {
        ...state,
        count,
        next,
        previous,
        result: results,
        detailedResults: [],
      };
    case "INCREMENT_DISPLAY_COUNT":
      return {
        ...state,
        displayCount: Math.min(state.displayCount + 12, state.result.length),
      };
    case "RESET_DISPLAY_COUNT":
      return {
        ...state,
        displayCount: 30,
      };

    default: {
      return state;
    }
  }
};

export default PokemonReducer;
