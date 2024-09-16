import React from "react";
import { usePathname } from "next/navigation";

import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";

import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CompaniesDropdown } from "./companies-dropdown";
import { Sidebar } from "./sidebar.styles";

import { siteConfig } from "@/config/site";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div
          className={Sidebar.Overlay()}
          onClick={setCollapsed}
          onKeyPress={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setCollapsed();
            }
          }}
          tabIndex={0}
          role="button"
        />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              href={siteConfig.links.home}
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              title="Home"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                btn={<button>➕</button>}
                href={siteConfig.links.pages}
                icon={<AccountsIcon />}
                isActive={pathname === "/pages"}
                props={"bg [&_svg_path]:fill-primary-500 bg-primary-200  "}
                title="Diary"
              />

              <SidebarItem
                href={siteConfig.links.notes}
                icon={<ProductsIcon />}
                isActive={pathname === "/notes"}
                title="Notes"
              />

              {/* <SidebarItem
                href={siteConfig.links.reports}
                icon={<ReportsIcon />}
                isActive={pathname === "/reports"}
                title="Reports"
              /> */}
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                href={siteConfig.links.changelog}
                icon={<ChangeLogIcon />}
                isActive={pathname === "/changelog"}
                title="Changelog"
              />
            </SidebarMenu>
          </div>
          {/* <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div> */}
        </div>
      </div>
    </aside>
  );
};
