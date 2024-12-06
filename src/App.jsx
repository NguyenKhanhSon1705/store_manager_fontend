import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

import env from "../src/constants/env";
import { getCurrentUser } from "./store/actions/currentUserAction";
import { ToastContainer } from "react-toastify";
import routes from "./routes";

import getShopId from "./utils/functions/getShopId";
export default function App() {
  const loginedCookie = Cookies.get(env.REACT_APP_LOGINED) === "true";
  const idShop = getShopId();
  const dispatch = useDispatch();
 

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loginedCookie && idShop && dispatch(getCurrentUser(idShop));
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, loginedCookie, idShop]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={"text-[15px]"}
      />

      <RouterProvider
        router={routes}
        future={{
          v7_startTransition: true,
        }}
      />
    </>
  );
}
