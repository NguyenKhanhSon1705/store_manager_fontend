import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdStar, MdStorefront, MdMoreVert } from "react-icons/md";
import images from "../../assets/images";
import { listShop } from "../../store/actions/shopAction";
import LoadingShopCardSkeleton from "../../components/loading/LoadingShopCardSkeleton";
import routes from "../../routes/routesPath";
import { getCurrentUser } from "../../store/actions/currentUserAction";
import ROUTE_PATH from "../../routes/routesPath";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(listShop());
  }, [dispatch]);

  const handleGotoShop = async (id) => {
    await dispatch(getCurrentUser(id));
    navigate(ROUTE_PATH.tables_by_area);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-20">
      <div className="max-w-4xl mx-auto px-6 pt-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">
              Chào mừng trở lại!
            </h1>
            <p className="text-lg text-gray-500 font-medium">
              Chọn nhà hàng để bắt đầu làm việc
            </p>
          </div>

          {/* Add Button */}
          <button
            onClick={() => navigate(routes.create_shop)}
            className="group relative flex items-center justify-center p-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
            title="Thêm cửa hàng mới"
          >
            <MdAdd className="text-white text-3xl group-hover:rotate-90 transition-transform duration-300" />
            <span className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-gray-600 bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap pointer-events-none">
              Tạo mới
            </span>
          </button>
        </div>

        {/* List Section */}
        <div className="space-y-6">
          {loading ? (
            <LoadingShopCardSkeleton />
          ) : data?.length > 0 ? (
            <div className="grid gap-5">
              {data.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleGotoShop(item.id)}
                  className="group bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl w-24 h-24 flex-shrink-0 bg-gray-50 border border-gray-100">
                    <img
                      src={item.shopLogo || images.test}
                      alt={item.shopName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Info Container */}
                  <div className="flex-1 ml-6 flex flex-col justify-center gap-1.5">
                    {/* Header Row */}
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1 mr-4">
                        {item.shopName}
                      </h3>
                      <button className="text-gray-300 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100">
                        <MdMoreVert size={24} />
                      </button>
                    </div>

                    {/* Address - Optional but good for context */}
                    {item.shopAddress && (
                      <p className="text-sm text-gray-500 line-clamp-1 mb-1">
                        {item.shopAddress}
                      </p>
                    )}

                    {/* Meta Row */}
                    <div className="flex items-center gap-4 mt-1">
                      {/* Rating */}
                      <div className="flex items-center bg-orange-50 px-2.5 py-1 rounded-lg">
                        <MdStar className="text-amber-500 text-sm mb-0.5" />
                        <span className="text-sm font-bold text-gray-800 mx-1.5">4.9</span>
                        <span className="text-xs text-gray-400 font-medium tracking-wide">EXCELLENT</span>
                      </div>

                      {/* Status */}
                      <div className="flex items-center bg-green-50 px-2.5 py-1 rounded-lg">
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                        <span className="text-xs font-bold text-green-600 tracking-wide">
                          ACTIVE
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 border-dashed">
              <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6">
                <MdStorefront className="text-orange-300 text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Chưa có cửa hàng nào</h3>
              <p className="text-gray-500 text-center max-w-sm mb-8">
                Bạn chưa quản lý cửa hàng nào. Hãy bắt đầu bằng cách tạo cửa hàng đầu tiên của bạn.
              </p>
              <button
                onClick={() => navigate(routes.create_shop)}
                className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
              >
                Tạo cửa hàng ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
