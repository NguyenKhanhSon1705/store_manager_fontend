import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const LoadingSkeleton = ({height = 10 , count = 5 , highlightColor = '#b7b5b5'}) => {
  const props = {
    height,
    count,
    highlightColor
  }
  return (
    <section className="py-5 text-center container">
      <div className="row py-lg-5">
        <div className="col-lg-6 col-md-8 mx-auto">
          <Skeleton
          {...props} 
          />
        </div>
      </div>
    </section>
  );
};
LoadingSkeleton.propTypes = {
  height: PropTypes.number,
  count: PropTypes.number,
  highlightColor: PropTypes.string
};

export default LoadingSkeleton;
