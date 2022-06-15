import * as React from "react";
import { useState } from "react";

const Interactive = () => {
  const [num, setNum] = useState<number>(0);

  return (
    <div>
      <h3>Static Generation</h3>
      <p>
        Static Templates are generated statically but are hydrated client-side
        to support interactive elements.
      </p>
      <div>
        <button
          onClick={() => setNum(num + 1)}
          className="px-4 py-2 bg-gray-100"
        >
          Click Me ({num})
        </button>
      </div>
    </div>
  );
};

export default Interactive;
