import { useState } from 'react';
import { renderToString } from 'react-dom/server';
import { reactWrapper } from '../wrapper';

export const config = {
  name: 'Product Test',
  hydrate: true,
  streamId: 'products-test',
  stream: {
    $id: 'products-test',
    source: 'knowledgeGraph',
    destination: 'pages',
    fields: ['name', 'meta', 'id', 'uid'],
    filter: {
      entityTypes: ['product'],
    },
    localization: {
      locales: ['en'],
      primary: false,
    },
  },
};

export const getPath = (data: any) => {
  return `test/${Math.random().toString()}`;
};

const Test = (props: any) => {
  const { document } = props.data;
  const { streamOutput } = document;
  const { name } = streamOutput;
  const [num, setNum] = useState<number>(0);

  return (
    <>
      <div>Hello from {name} starter</div>
      <button onClick={() => setNum(num + 1)}>Click me</button>
      Num: {num}
    </>
  );
};

export const render = (data: any) =>
  reactWrapper(data, 'Product Test', 'test.tsx', renderToString(<Test data={data} />), true);

export default Test;
