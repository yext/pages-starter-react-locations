import React from 'react';
import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { reactWrapper } from '../wrapper';
import fetch from 'cross-fetch';

export const config = {
  name: 'static',
};

export const getPath = () => {
  return `static/${Math.random().toString()}`;
};

export const getStaticProps = async (data: any): Promise<any> => {
  const url = `https://pokeapi.co/api/v2/pokemon/1`;
  const pokemon = await fetch(url).then((res) => res.json());

  return { ...data, pokemon };
};

const Static = (props: any) => {
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

export const render = (data: any) =>
  reactWrapper(data, 'static', 'static.tsx', renderToString(<Static data={data} />), true);

export default Static;
