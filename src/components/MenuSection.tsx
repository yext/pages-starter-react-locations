import * as React from "react";

type Props = {
    title?: string;
    children?: React.ReactNode;
};
  
  const MenuSection = ({
    title,
    children,
  }: Props) => {
    return (
        <div className="section">
            <h2>{title}</h2>
            <div className="pt-10 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-3 gap-x-5">
                {children}
            </div>
        </div>
    );
  };

export default MenuSection;
  