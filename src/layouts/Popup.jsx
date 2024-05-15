export default function Popup({ data, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center font-Montserrat justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-2xl w-11/12 max-w-md mx-auto">
        <button
          className="absolute top-3 right-3 text-white bg-red-500 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md"
          onClick={onClose}>
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-blue-500 mb-4">
          Forecast Details
        </h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium text-blue-500">Date:</span> {data.date}
          </p>
          <p>
            <span className="font-medium text-blue-500">Condition:</span>{" "}
            {data.day?.condition?.text}
          </p>
          <p>
            <span className="font-medium text-blue-500">Max Temp:</span>{" "}
            {`${data.day?.maxtemp_c} °C`}
          </p>
          <p>
            <span className="font-medium text-blue-500">Min Temp:</span>{" "}
            {`${data.day?.mintemp_c} °C`}
          </p>
          <p>
            <span className="font-medium text-blue-500">Avg Temp:</span>{" "}
            {`${data.day?.avgtemp_c} °C`}
          </p>
          <p>
            <span className="font-medium text-blue-500">Max Wind:</span>{" "}
            {`${data.day?.maxwind_kph} kph`}
          </p>
          <p>
            <span className="font-medium text-blue-500">
              Total Precipitation:
            </span>{" "}
            {`${data.day?.totalprecip_mm} mm`}
          </p>
        </div>
      </div>
    </div>
  );
}
