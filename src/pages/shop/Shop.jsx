import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { FaPlusCircle } from "react-icons/fa";
import images from "../../assets/images";
import Button from "../../components/buttons/Button";
import { listShop } from "../../store/actions/shopAction";
import LoadingShopCardSkeleton from "../../components/loading/LoadingShopCardSkeleton";
import routes from "../../routes/routesPath";
import { getCurrentUser } from "../../store/actions/currentUserAction";
import Meta from "antd/es/card/Meta";
import { Card } from "antd";
import ROUTE_PATH from "../../routes/routesPath";

export default function Shop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading } = useSelector((state) => state.shop);

  useEffect(() => {
    dispatch(listShop());
  }, [dispatch]);

  const handleGotoShop = (id) => {
    dispatch(getCurrentUser(id));
    navigate(ROUTE_PATH.tables_by_area);
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6 text-center mt-10">
        Danh sách cửa hàng
      </h1>
      {loading ? (
        <LoadingShopCardSkeleton />
      ) : data?.length > 0 ? (
        <div className="flex items-center justify-center ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    style={{
                      width: 300,
                      padding: "10px",
                    }}
                    cover={
                      <div
                        style={{
                          width: "100%",
                          height: "200px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          alt="example"
                          src={item.shopLogo || images.test}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    }
                    onClick={() => handleGotoShop(item.id)}
                  >
                    <Meta
                      title={item.shopName}
                      description={item.shopAddress || "N/A"}
                    />
                    <Meta description={item.shopPhone || "N/A"} />
                  </Card>
                </div>
              );
            })}
            <div
              className="flex justify-center items-center"
              style={{
                gap: "20px",
              }}
            >
              <Card
                style={{
                  width: 300,
                  padding: "10px",
                }}
                cover={
                  <div>
                    <Button
                      to={routes.create_shop}
                      className="flex shadow-md p-2 rounded-xl justify-center flex-col items-center"
                    >
                      <span className="text-[70px] text-[var(--primary)]">
                        <FaPlusCircle />
                      </span>
                    </Button>
                  </div>
                }
              ></Card>
            </div>
          </div>
        </div>
      ) : (
        <div
              className="flex justify-center items-center"
              style={{
                gap: "20px",
              }}
            >
              <Card
                style={{
                  width: 300,
                  padding: "10px",
                }}
                cover={
                  <div>
                    <Button
                      to={routes.create_shop}
                      className="flex shadow-md p-2 rounded-xl justify-center flex-col items-center"
                    >
                      <span className="text-[70px] text-[var(--primary)]">
                        <FaPlusCircle />
                      </span>
                    </Button>
                  </div>
                }
              ></Card>
            </div>
      )}
    </div>
  );
}
