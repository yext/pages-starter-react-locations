/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */

import * as React from "react";
import { useState } from "react";
import { renderToString } from "react-dom/server";
import { reactWrapper } from "../wrapper";
import fetch from "fetch-everywhere";
import { Data } from "../types/data";
import { Pokemon } from "pokenode-ts";

/**
 * Required only to define the name of this feature.
 *
 * NOTE: A future change may remove this and the feature name would use
 * the name of the template by default.
 */
export const config = {
  name: "static",
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath = () => {
  return `static/${Math.random().toString()}`;
};

/**
 * A local type for getStaticProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
type PokemonData = Data & { pokemon: Pokemon };

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 *
 * This example calls a public API and returns the data.
 */
export const getStaticProps = async (data: Data): Promise<PokemonData> => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = (await fetch(url).then((res: any) => res.json())) as Pokemon;

  return { ...data, pokemon };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: React.FC<PokemonData> = (props: PokemonData) => {
  const { name } = props.pokemon;

  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div>Hello from {name}</div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

/**
 * Defines how the plugin will render the template for the production build. This has no
 * impact on local dev.
 *
 * A convenient function is currently defined in src/wrapper.ts.
 *
 * NOTE: Future changes may impact how this is used.
 */
export const render = (data: PokemonData) =>
  reactWrapper(data, "static.tsx", renderToString(<Static {...data} />), true);

export default Static;
