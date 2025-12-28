import Breadcrumb from "~/components/helper/Breadcrumb";
import Area from "../components/order/Areas";
import LoadingSkeletonGrid from "../../components/loading/LoadingSkeletonGrid";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../routes/routesPath";
import { getTablesByArea } from "~/store/actions/tablesAction";
import { getListAreas } from "~/store/actions/areasAction"; // Import action

import {
  MdRestaurant,
  MdPeople,
  MdFilterList,
  MdSearch,
  MdTableRestaurant,
  MdChair
} from "react-icons/md";

// eslint-disable-next-line react/prop-types
function TablesByArea({ onClick }) {
  const [idArea, setIdArea] = useState(null);
  const { data, loading } = useSelector((state) => state.table);
  const { data: areaData, loading: areaLoading } = useSelector((state) => state.area); // Select Area Data
  const [activeAreaName, setActiveAreaName] = useState("Tất cả khu vực");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch Areas on Mount
  useEffect(() => {
    dispatch(getListAreas());
  }, [dispatch]);

  // Default Selection Logic: Select first area when areas load
  useEffect(() => {
    if (areaData && areaData.length > 0 && idArea === null) {
      const firstArea = areaData[0];
      setIdArea(firstArea.id);
      setActiveAreaName(firstArea.areaName);
    }
  }, [areaData, idArea]);

  useEffect(() => {
    if (idArea !== null) {
      dispatch(getTablesByArea(idArea));
    }
  }, [dispatch, idArea]);

  const handleGetIdArea = useCallback(
    (id, name) => {
      setIdArea(id);
      if (name) setActiveAreaName(name);
    },
    [setIdArea]
  );

  const handleOpenTable = (table) => {
    if (onClick) {
      onClick(table);
    } else {
      navigate(ROUTE_PATH.choose_dish_table, { state: { table } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      {/* Breadcrumb & Header Wrapper */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Breadcrumb items={[{ name: "Quản lý bàn", href: "" }, { name: activeAreaName, href: "" }]} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <MdTableRestaurant className="text-orange-500" />
                Danh sách bàn
              </h1>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                {activeAreaName ? `Khu vực đang chọn: ${activeAreaName}` : "Hiển thị tất cả các bàn"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-8">

          {/* Main Content */}
          <div className="lg:col-span-3 xl:col-span-4 order-2 lg:order-1">
            {loading ? (
              <LoadingSkeletonGrid />
            ) : (
              <>
                {data && data.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {data.map((item) => {
                      const isActive = !item.isActive; // Assuming isActive means Available based on App logic reference

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleOpenTable(item)}
                          className={`
                            group relative aspect-square rounded-2xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 border-2
                            ${isActive
                              ? "bg-sky-50 border-sky-100 hover:border-sky-300 hover:shadow-lg hover:shadow-sky-100/50"
                              : "bg-red-50 border-red-100 hover:border-red-300 hover:shadow-lg hover:shadow-red-100/50"
                            }
                          `}
                        >
                          {/* Status Dot */}
                          <div className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${isActive ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />

                          {/* Icon Badge */}
                          <div className={`
                            w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 duration-300
                            ${isActive ? "bg-white text-sky-500 shadow-sm" : "bg-white text-red-500 shadow-sm"}
                          `}>
                            {isActive ? <MdRestaurant size={26} /> : <MdPeople size={26} />}
                          </div>

                          {/* Table Name */}
                          <h3 className={`font-bold text-lg mb-1 ${isActive ? "text-sky-900" : "text-red-900"}`}>
                            {item.nameTable}
                          </h3>

                          {/* Status Text (Optional) */}
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-sky-100 text-sky-700" : "bg-red-100 text-red-700"}`}>
                            {isActive ? "Trống" : "Có khách"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Empty State */
                  <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <MdSearch className="text-gray-300 text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Không tìm thấy bàn nào</h3>
                    <p className="text-gray-500 mt-2 text-center max-w-sm">
                      Khu vực này hiện chưa có bàn nào. Vui lòng chọn khu vực khác hoặc thêm bàn mới.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-1 xl:col-span-1 order-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MdFilterList className="text-orange-500" />
                  Khu vực
                </h3>
                <Area onClick={handleGetIdArea} activeId={idArea} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TablesByArea;
