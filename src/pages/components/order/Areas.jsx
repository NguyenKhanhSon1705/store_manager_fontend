import { useSelector } from "react-redux";
import LoadingSkeleton from "../../../components/loading/LoadingSkeleton";
import PropTypes from "prop-types";
import { MdRadioButtonChecked, MdRadioButtonUnchecked, MdCheck } from "react-icons/md";

function Area({ onClick, activeId }) {
  // Data is now fetched by parent (TablesByArea), but we still select it here if we want, 
  // OR we can rely on the fact that if parent fetched it, it's in Redux.
  // Ideally parent should pass data down or we select it. Selecting it is fine.
  const { data, loading } = useSelector((state) => state.area);

  // Removed internal useEffect for fetching and default selection as logic is moved to parent.

  return (
    <div className="flex flex-col w-full">
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="space-y-1">
          {data && data.map((item, index) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={index}
                onClick={() => onClick(item.id, item.areaName)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? "bg-sky-50 text-sky-700 font-semibold shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <span className={`mr-3 ${isActive ? "text-sky-500" : "text-gray-400 group-hover:text-gray-500"}`}>
                  {isActive ? <MdRadioButtonChecked size={20} /> : <MdRadioButtonUnchecked size={20} />}
                </span>

                <span className="flex-1 text-left text-[15px]">
                  {item.areaName}
                </span>

                {isActive && (
                  <MdCheck className="text-sky-500 opacity-100 transition-opacity" size={18} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

Area.propTypes = {
  onClick: PropTypes.func,
  activeId: PropTypes.number,
};

export default Area;
