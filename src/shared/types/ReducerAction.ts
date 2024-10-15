/* eslint-disable @typescript-eslint/no-explicit-any */
export type ReducerActionType = {
  type:
    | "POKEMON_DATA"
    | "INCREMENT_DISPLAY_COUNT"
    | "RESET_DISPLAY_COUNT"
    | string;
  data?: any;
};
