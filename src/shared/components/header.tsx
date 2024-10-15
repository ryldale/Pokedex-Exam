import React, { ReactNode } from "react";

type propType = {
  title: ReactNode;
  caption?: ReactNode;
};

const PokemonHeader = ({
  title,
  caption,
}: propType) => {

  return (
    <div className="flex justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold font-galindo text-[#242424]">
          {title}
        </h1>
        <p className="text-[#979292]">{caption}</p>
      </div>
    </div>
  );
};

export default PokemonHeader;
