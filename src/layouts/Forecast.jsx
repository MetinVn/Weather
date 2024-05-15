import React from "react";

const Forecast = ({ data }) => {
  return (
    <div
      className="p-4 border hover:shadow-md border-gray-300 rounded-md cursor-pointer duration-300"
      style={{ backgroundColor: "#f3f4f6" }}>
      <h2 className="text-base font-bold text-[#3a86ff]">
        Forecast Day: {data.date}
      </h2>
      <img
        src={data.day?.condition?.icon}
        alt="Weather Icon"
        className="h-10 w-10"
      />
      <p className="text-sm text-[#3a86ff]">{data.day?.condition?.text}</p>
    </div>
  );
};

export default Forecast;
