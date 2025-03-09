import Breadcrumb from "~/components/helper/Breadcrumb";
import Area from "../components/order/Areas";
import LoadingSkeletonGrid from "../../components/loading/LoadingSkeletonGrid";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import ROUTE_PATH from "../../routes/routesPath";
import { getTablesByArea } from "~/store/actions/tablesAction";

// eslint-disable-next-line react/prop-types
function TablesByArea({ onClick }) {
  const [idArea, setIdArea] = useState();
  const { data, loading } = useSelector((state) => state.table);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTablesByArea(idArea));
  }, [dispatch, idArea]);

  const handleGetIdArea = useCallback(
    (id) => {
      setIdArea(id);
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
    <div>
      <Breadcrumb items={[{ name: "Thông tin bàn theo khu vực", href: "" }]} />

      <div className="grid grid-cols-5 grid-rows-1 gap-7">
        <div className="col-span-4">
          <h6 className="text-center text-[20px]">Bàn</h6>
          {loading ? (
            <LoadingSkeletonGrid />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-9  p-4">
              {Array.isArray(data) &&
                data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`w-32 h-24 relative text-[var(--textlight)] rounded-md ${
                        item.isActive ? "bg-[var(--primary)]" : "bg-gray-400"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 absolute rounded-br-lg ${
                          item.hasHourlyRate && "bg-green-400"
                        }`}
                      ></div>
                      <Button
                        classDiff={"w-full h-full"}
                        onClick={() => handleOpenTable(item)}
                      >
                        {<div>{item.nameTable}</div>}
                      </Button>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <div className="col-start-5">
          <Area onClick={handleGetIdArea} />
        </div>
      </div>
    </div>
  );
}

export default TablesByArea;
