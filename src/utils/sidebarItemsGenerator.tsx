import { NavLink } from "react-router-dom";
import {  TUsersPath } from "../types";
import { MenuProps } from "antd";  // Import MenuProps for typing

export const sidebarItemsGenerator = (items: TUsersPath[], role: string): MenuProps['items'] => {
  const sidebarItems = items.reduce((acc: MenuProps['items'], item) => {
    if (item.path && item.name) {
      // Add main menu item
      acc?.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children && item.children.length > 0) {
      // Add submenu with children
      acc?.push({
        key: item.name as string,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
        children: item.children
          .filter(child => child.name && child.path)  // Ensure child has both name and path
          .map(child => ({
            key: child.name as string,
            label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
          })),
      });
    }

    return acc;
  }, [] as MenuProps['items']);

  return sidebarItems;
};
