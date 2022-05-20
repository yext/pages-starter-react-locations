import { Pokemon } from "pokenode-ts";
import { Data } from "./data";

export interface PokemonData extends Data {
  pokemon: Pokemon;
}
