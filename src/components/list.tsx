import * as React from "react";

type List = {
  name?: string;
  list: string[];
};

const List = (props: List) => {
  const { list } = props;
  const listItems = list.map((item) => <li key={item}>{item}</li>);
  return (
    <>
      <div>
        <div className="mb-4 text-xl font-semibold">Services</div>
        <ul className="list-disc space-y-2 pl-6">{listItems}</ul>
      </div>
    </>
  );
};

export default List;
