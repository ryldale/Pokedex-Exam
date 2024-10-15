import React, { ReactNode } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

type propType = {
  title: ReactNode;
  caption?: ReactNode;
  activeIcon: "list" | "grid";
  toggleIcon: (icon: "list" | "grid") => void;
};

const PokemonHeader = ({
  title,
  caption,
  activeIcon,
  toggleIcon,
}: propType) => {

  return (
    <div className="flex justify-between mb-4">
      <div>
        <h1 className="text-2xl font-bold font-galindo text-[#242424]">
          {title}
        </h1>
        <p className="text-[#979292]">{caption}</p>
      </div>
      <div>
        <ViewListIcon
          style={{
            width: 50,
            height: "auto",
            color: activeIcon === "list" ? "#242424" : "#979292",
            cursor: "pointer",
          }}
          onClick={() => toggleIcon("list")}
        />
        <ViewModuleIcon
          style={{
            width: 50,
            height: "auto",
            color: activeIcon === "grid" ? "#242424" : "#979292",
            cursor: "pointer",
          }}
          onClick={() => toggleIcon("grid")}
        />
      </div>
    </div>
  );
};

export default PokemonHeader;
