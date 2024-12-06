import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListAreas } from "../../../store/actions/areasAction";
import LoadingSkeleton from "../../../components/loading/LoadingSkeleton";
import PropTypes from "prop-types";
import { FaHouseDamage } from "react-icons/fa";

function Area({ onClick }) {
  const { data, loading } = useSelector((state) => state.area);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null); // Thêm state để lưu `id` đang active

  useEffect(() => {
    dispatch(getListAreas());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      const firstId = data[0].id;
      setActiveId(firstId); // Đặt nút đầu tiên làm active mặc định
      onClick(firstId);
    }
  }, [loading, data, onClick]);

  const handleButtonClick = (id) => {
    setActiveId(id); // Cập nhật trạng thái active
    onClick(id);
  };

  return (
    <div className="flex flex-col px-3 border-l-2">
      <h6 className="text-center text-[20px]">Khu vực</h6>
      {loading ? (
        <LoadingSkeleton />
      ) : (
        data.map((item, index) => (
          <div key={index} className="my-2">
            <Button
              onClick={() => handleButtonClick(item.id)}
              className={`w-full ${activeId === item.id ? "bg-[var(--primary)] text-white" : ""}`} // Thêm lớp CSS nếu nút đang active
            >
              <FaHouseDamage />
              {item.areaName}
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

Area.propTypes = {
  onClick: PropTypes.func,
};

export default Area;
