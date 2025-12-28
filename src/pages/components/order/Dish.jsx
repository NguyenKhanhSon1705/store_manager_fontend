import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { Button, Input, Empty, Skeleton, Badge, Typography } from "antd";
import { MdSearch, MdCheckCircle, MdAddShoppingCart, MdRestaurantMenu } from "react-icons/md";

import useDebounce from "../../../hook/useDebounce";
import { getAllNameMenuGroup } from "../../../store/actions/menuGroupAction";
import dishAction from "../../../store/actions/dishAction";
import { validatePriceVND } from "../../../utils/validatePriceVND";
import images from "../../../assets/images";
import PropTypes from "prop-types";

const { Text, Title } = Typography;

function Dish({ onSubmit }) {
  const dispatch = useDispatch();
  const { data: menuGroups, loading: loadingGroups } = useSelector((state) => state.menuGroup);
  const { dish_menugroup: listDish, loading: loadingDish } = useSelector(
    (state) => state.dish
  );

  const [selectedDishes, setSelectedDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGroupId, setActiveGroupId] = useState(null); // null means 'All'

  // Pagination/Filter State (simplified for infinite scroll or large pages)
  const [payload, setPayload] = useState({
    pageSize: 100,
    pageIndex: 1,
    menuGroupId: null,
  });

  const debouncedSearch = useDebounce(search, 500);

  // Fetch Menu Groups on Mount
  useEffect(() => {
    dispatch(getAllNameMenuGroup());
  }, [dispatch]);

  // Fetch Dishes when filters change
  useEffect(() => {
    // If activeGroupId is 'all' (null), send null to API
    dispatch(
      dishAction.getDishByMenugroup({
        pageSize: payload.pageSize,
        pageIndex: payload.pageIndex,
        search: debouncedSearch,
        menuGroupId: activeGroupId,
      })
    );
  }, [dispatch, payload.pageSize, payload.pageIndex, debouncedSearch, activeGroupId]);

  // Handle Category Click
  const handleCategoryClick = (id) => {
    setActiveGroupId(prev => prev === id ? null : id);
    setPayload(prev => ({ ...prev, pageIndex: 1 })); // Reset to first page
  };

  // Handle Dish Selection
  const toggleDishSelection = (dish) => {
    setSelectedDishes((prev) => {
      const exists = prev.find((item) => item.id === dish.id);
      if (exists) {
        return prev.filter((item) => item.id !== dish.id);
      }
      return [...prev, dish];
    });
  };

  // Submit Selection
  const handleSubmit = useCallback(() => {
    if (onSubmit) {
      // Ensure each item has a 'key' mapped from 'id'
      const formattedItems = selectedDishes.map(item => ({
        ...item,
        key: item.id
      }));
      onSubmit(formattedItems);
      setSelectedDishes([]); // Optional: clear selection after submit
    }
  }, [onSubmit, selectedDishes]);

  // Render
  return (
    <div className="flex flex-col h-[90vh] bg-gray-50 rounded-xl overflow-hidden relative">

      {/* 1. Header & Search */}
      <div className="p-4 bg-white border-b border-gray-100 flex flex-col gap-3 sticky top-0 z-10 shadow-sm">
        <Input
          size="large"
          placeholder="Tìm kiếm món ăn..."
          prefix={<MdSearch className="text-gray-400 text-xl" />}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border-gray-200 hover:border-orange-400 focus:border-orange-500"
        />

        {/* Categories (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <Button
            type={activeGroupId === null ? "primary" : "default"}
            onClick={() => handleCategoryClick(null)}
            className={`rounded-full px-4 border-0 font-medium ${activeGroupId === null
              ? "bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            Tất cả
          </Button>

          {loadingGroups ? (
            <Skeleton.Button active size="small" shape="round" />
          ) : (
            menuGroups?.map((group) => (
              <Button
                key={group.id}
                onClick={() => handleCategoryClick(group.id)}
                className={`rounded-full px-4 border-0 font-medium whitespace-nowrap ${activeGroupId === group.id
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {group.name}
              </Button>
            ))
          )}
        </div>
      </div>

      {/* 2. Dish Grid (Scrollable Content) */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {loadingDish ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-3 h-48 animate-pulse">
                <div className="w-full h-24 bg-gray-200 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : listDish?.items?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20"> {/* pb-20 for sticky footer space */}
            {listDish.items.map((dish) => {
              const isSelected = selectedDishes.some((item) => item.id === dish.id);

              return (
                <div
                  key={dish.id}
                  onClick={() => toggleDishSelection(dish)}
                  className={`
                    relative group cursor-pointer bg-white rounded-2xl p-3 shadow-sm border-2 transition-all duration-200
                    hover:shadow-md hover:-translate-y-1
                    ${isSelected ? "border-orange-500 bg-orange-50/30" : "border-transparent hover:border-orange-200"}
                  `}
                >
                  {/* Selection Badge */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 z-10 bg-orange-500 text-white rounded-full p-1 shadow-lg animate-scale-in">
                      <MdCheckCircle size={20} />
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square mb-3 overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={dish.image || images.img_default}
                      alt={dish.dish_Name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => (e.target.src = images.img_default)}
                    />
                  </div>

                  {/* Info */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[40px]">
                      {dish.dish_Name}
                    </h3>
                    <p className="text-orange-600 font-extrabold text-base">
                      {validatePriceVND(String(dish.selling_Price))}đ
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MdRestaurantMenu size={64} className="mb-4 text-gray-200" />
            <span className="text-lg font-medium">Không tìm thấy món ăn nào</span>
          </div>
        )}
      </div>

      {/* 3. Sticky Footer Actions */}
      {selectedDishes.length > 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] z-20 animate-slide-up">
          <Button
            type="primary"
            size="large"
            shape="round"
            onClick={handleSubmit}
            className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-lg shadow-orange-500/30 flex items-center justify-between px-6 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            <span className="flex items-center gap-2 font-bold text-lg">
              <Badge count={selectedDishes.length} showZero color="white" style={{ color: '#f53d2d' }} />
              Đã chọn
            </span>
            <span className="flex items-center gap-2 font-bold">
              Thêm vào bàn <MdAddShoppingCart size={22} />
            </span>
          </Button>
        </div>
      )}
    </div>
  );
}

Dish.propTypes = {
  onSubmit: PropTypes.func,
};

export default Dish;
