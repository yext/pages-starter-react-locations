/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */

import * as React from "react";
import { useState } from "react";
import fetch from "fetch-everywhere";
import { Pokemon } from "pokenode-ts";
import {
  Default,
  GetPath,
  TransformProps,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/sites-scripts";

/**
 * Not required depending on your use case.
 */
export const config: TemplateConfig = {
  // The name of the feature. If not set the name of this file will be used (without extension).
  // Use this when you need to override the feature name.
  name: "pokemon",
};

/**
 * A local type for getStaticProps. This could live in src/types but it's generally
 * best practice to keep unshared types local to their usage.
 */
 type PokemonData = TemplateProps & { pokemon: Pokemon };

 /**
  * Used to either alter or augement the props passed into the template at render time.
  * This function will be run during generation and pass in directly as props to the default
  * exported function.
  *
  * This can be used when data needs to be retrieved from an external (non-Knowledge Graph)
  * source. This example calls a public API and returns the data.
  *
  * If the page is truly static this function is not necessary.
  */
 export const transformProps: TransformProps<PokemonData> = async (data) => {
   const url = import.meta.env.YEXT_PUBLIC_POKEMON_API_BASE_URL;
   const pokemon = (await fetch(url).then((res: any) => res.json())) as Pokemon;

   return { ...data, pokemon };
 };

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<PokemonData> = () => {
  return `static/${Math.random().toString()}`;
};

type PokemonRenderData = TemplateRenderProps & { pokemon: Pokemon };

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Default<PokemonRenderData> = (data) => {
  const { pokemon, path, relativePrefixToRoot } = data;
  const { name } = pokemon;

  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div>Hello from {name}</div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

export default Static;
