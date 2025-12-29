/* eslint-disable */
import React, { useContext } from "react";
import { Menu, ConfigProvider } from "antd";
import { DarkMode } from "../../";
import items from "~/routes/admin/ItemNavbar";

export function SidebarLinks() {
  const theme = useContext(DarkMode);
  const isDark = theme === "dark";

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemBg: "transparent",
            itemColor: isDark ? "rgba(255,255,255,0.65)" : "#4B5563",
            itemSelectedBg: "rgba(251, 146, 60, 0.1)", // Light orange
            itemSelectedColor: "#F97316", // Orange-500
            itemHoverBg: isDark ? "rgba(255,255,255,0.05)" : "#F9FAFB",
            itemHoverColor: "#F97316",
            groupTitleColor: isDark ? "rgba(255,255,255,0.45)" : "#9CA3AF",
            itemMarginInline: 8,
            itemBorderRadius: 12,
            subMenuItemBg: "transparent",
          },
        },
      }}
    >
      <style>{`
        .sidebar-menu.ant-menu-inline {
           border-inline-end: none !important;
        }
        .sidebar-menu .ant-menu-item-selected {
           background: linear-gradient(to right, #f97316, #ef4444) !important;
           color: white !important;
           box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
        }
        .sidebar-menu .ant-menu-item-selected .ant-menu-item-icon {
           color: white !important;
        }
        .sidebar-menu .ant-menu-item-selected a {
           color: white !important;
        }
        .sidebar-menu .ant-menu-submenu-title:hover {
           color: #f97316 !important;
        }
        .sidebar-menu .ant-menu-item:not(.ant-menu-item-selected):hover {
           color: #f97316 !important;
        }
      `}</style>
      <Menu
        mode="inline"
        theme={theme}
        items={items}
        className="sidebar-menu"
        style={{
          width: '100%',
          fontWeight: 500,
          fontSize: 15,
        }}
        defaultSelectedKeys={["7"]}
      />
    </ConfigProvider>
  );
}

export default SidebarLinks;

