import Skeleton from "react-loading-skeleton";
const LoadingSkeletonGrid = () => {
  return (
    <div className="grid grid-cols-5 gap-9 p-4">
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className="h-24">
          <Skeleton height={96} borderRadius={8} />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeletonGrid;
