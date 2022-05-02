import { Layout as LayoutAntd } from "antd";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import { Header } from "./Header";
import { SideDrawer } from "./SideDrawer";
import { Sider } from "./Sider";

const { Content, Footer } = LayoutAntd;

export const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LayoutAntd style={{ height: "100%" }}>
        <Sider />
        <LayoutAntd>
          <Header onClick={() => setOpen(true)} />
          <Content style={{ padding: "24px 50px", margin: 0 }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>My budget ©2022 Created by Lubos Fukas</Footer>
        </LayoutAntd>
      </LayoutAntd>

      <SideDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};
