import React from "react";

const Dropdown = ({ icountry, iname, iregion }) => {
  return (
    <div className="group flex flex-col bg-transparent cursor-pointer text-balance md:text-xs text-[12px] sm:py-1 sm:px-2">
      <span className="text-white sm:text-neutral-400 group-hover:text-white">
        Country: {icountry}
      </span>
      <span className="text-white sm:text-neutral-400 group-hover:text-white">
        City: {iname}
      </span>
      <span className="text-white sm:text-neutral-400 group-hover:text-white">
        Region: {iregion}
      </span>
    </div>
  );
};

export default Dropdown;
