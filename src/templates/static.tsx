/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */

import {
  Data,
  Default,
  GetHeadConfig,
  GetPath,
  GetStaticProps,
} from "@yext/yext-sites-scripts";
import fetch from "fetch-everywhere";
import { Pokemon } from "pokenode-ts";
import * as React from "react";
import { useState } from "react";
import Interactive from "../components/interactive";
import Layout from "../components/layout";

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<Data> = () => {
  return `static-page`;
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
export const getStaticProps: GetStaticProps<PokemonData> = async (data) => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = (await fetch(url).then((res: any) => res.json())) as Pokemon;

  return { ...data, pokemon };
};

export const getHeadConfig: GetHeadConfig<PokemonData> = ({ pokemon }) => {
  return {
    title: "My Static Page",
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Static: Default<PokemonData> = (data) => {
  const { name } = data.pokemon;

  const [num, setNum] = useState<number>(0);

  return (
    <Layout>
      <div className="prose">
        <h1>Static Template</h1>
        <p>
          This is an example of a Static Template. This source code of this file
          can be edited at <code>./src/static/tsx</code>
        </p>

        <Interactive />
        <h3>
          <code>getStaticProps</code>
        </h3>
        <p>
          This example page also uses <code>getStaticProps</code> to hit an
          external API on page load. In this case it's using the pokemon API.
          Here are the abilities for pokemon #1.
        </p>
        <pre>{JSON.stringify(data.pokemon.abilities, null, 2)}</pre>
      </div>
    </Layout>
  );
};

export default Static;
