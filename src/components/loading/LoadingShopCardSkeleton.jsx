import Skeleton from 'react-loading-skeleton';

const LoadingShopCardSkeleton = () => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="p-4 rounded-lg w-48 relative"
            style={{ height: '250px' }} // adjust height as needed
          >
            {/* Image Skeleton */}
            <Skeleton height={100} />

            {/* Title Skeleton */}
            <div className="mt-4">
              <Skeleton width={`80%`} height={20} />
            </div>

            {/* Button Skeletons */}
            <div className="mt-4">
              <Skeleton width={`60px`} height={30} />
              <div className="mt-2">
                <Skeleton width={`80px`} height={30} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingShopCardSkeleton;
