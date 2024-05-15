const WeatherData = ({ data, grid_layout }) => {
  return (
    <div
      className={`border-gray-300 h-full hover:shadow-md bg-[#f3f4f6] grid grid-cols-${grid_layout} justify-between border rounded-lg p-4 duration-300`}>
      {data.map((item, index) => (
        <h2
          key={index}
          className="text-base font-semibold font-Montserrat text-[#3a86ff]">
          {item.text || null}: {item.prop || null}
        </h2>
      ))}
    </div>
  );
};

export default WeatherData;
