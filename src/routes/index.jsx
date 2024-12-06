import { createBrowserRouter } from "react-router-dom";
import LayoutDefault from "../layouts/LayoutDefault";
import ErrorDetails from "../pages/errors/ErrorsDetails";
import {
  privateRouteDetail,
  privateRouteNotLayout,
  privateRouteSideBar,
  publicRoute,
} from "./routes";
import ProtectRoute from "./ProtectRoute";
import AdminProtectRoute from "./AdminProtectRoute";
import routesAdmin from "./routesAdmin";
import LayoutAdmin from "../layoutsAdmin/LayoutAdmin";


const routeSidebar = privateRouteSideBar.map((route) => {
  const Page = route.component;
  return {
    path: route.path,
    element: <Page />,
  };
});

const publicRoutes = publicRoute.map((route) => {
  const Page = route.component;
  return {
    path: route.path,
    element: <Page />,
  };
});

const privateRouteDetails = privateRouteDetail.map((route) => {
  const Page = route.component;
  return {
    path: route.path,
    element: <Page />,
  };
});
const privateRouteNotLayouts = privateRouteNotLayout.map((route) => {
  const Page = route.component;
  return {
    path: route.path,
    element: <Page />,
  };
});

// admin

const privateRouteAdmin = routesAdmin.privateRoute.map((route) => {
  const Page = route.component;
  return {
    path: route.path,
    element: <Page />,
  };
});

const routes = createBrowserRouter(
  [
   
    {
      element: <ProtectRoute />,
      errorElement: <ErrorDetails />,
      children: [
        {
          children: privateRouteNotLayouts,
        },
        {
          element: <LayoutDefault />,
          children: routeSidebar,
        },
        {
          element: <LayoutDefault />,
          children: privateRouteDetails,
        },
      ],
    },
     {
      element: <AdminProtectRoute />,
      errorElement: <ErrorDetails />,
      children: [
        {
          element: <LayoutAdmin />,
          children: privateRouteAdmin,
        },
      ],
    },


    {
      children: publicRoutes,
    },
  ],

  
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default routes;
