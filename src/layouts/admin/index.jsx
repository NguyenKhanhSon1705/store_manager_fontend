import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "~/layouts/admin/navbar";
import Sidebar from "~/layouts/admin/sidebar";

// eslint-disable-next-line react-refresh/only-export-components
export const DarkMode = createContext()
export default function Admin() {

  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  
  const [theme, setTheme] = useState('light');
  
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  
  React.useEffect(() => {
    setCurrentRoute(window.location.pathname.split("/").pop());
  }, []);

  return (
    <DarkMode.Provider value={theme}>
    <div className="flex h-full w-full">
      <Sidebar open={open} onClose={() => setOpen(false)} />

      <div className="h-full w-full ">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={"Horizon UI Tailwind React"}
              brandText={currentRoute}
              onClick={value => setTheme(value) }
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
    </DarkMode.Provider>
  );
}
