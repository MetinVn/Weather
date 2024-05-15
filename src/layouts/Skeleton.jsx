export const Skeleton = () => (
  <div className="bg-gray-300 rounded-lg shadow-md p-4 animate-pulse">
    <div className="h-4 w-20 bg-[#3a86ff] rounded mb-2"></div>
    <div className="h-2 w-4 bg-[#3a86ff] rounded mb-2"></div>
    <div className="h-2 w-4 bg-[#3a86ff] rounded mb-2"></div>
  </div>
);
export const GridSkeleton = () => {
  return (
    <div className="flex flex-col justify-center p-10 rounded-lg animate-pulse">
      <div className="h-8 w-8 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 w-16 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 w-16 bg-gray-300 rounded"></div>
    </div>
  );
};
