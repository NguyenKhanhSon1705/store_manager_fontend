/* eslint-disable */
import React, { useContext } from "react";
import { Menu } from "antd";
import { DarkMode } from "../../";

import items from "~/routes/admin/ItemNavbar";
export function SidebarLinks() {
  const theme = useContext(DarkMode);
  return (
    <>
      <Menu
        className={theme !== "light" ? "custom-menu custom-menu2 " : ""}
        style={{
          width: 300,
          border: 0,
          fontWeight: 500,
          fontSize: 18,
          color: "blue",
          backgroundColor: "transparent",
        }}
        inlineIndent={24}
        defaultSelectedKeys={["7"]}
        mode={"inline"}
        theme={theme}
        items={items}
      />
    </>
  );
}

export default SidebarLinks;
