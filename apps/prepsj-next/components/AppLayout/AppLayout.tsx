"use client";

import {
  CopyOutlined,
  HomeOutlined,
  QuestionOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { PropsWithChildren, useState } from "react";

const { Content, Footer, Sider, Header } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export function AppLayout({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  let pathItems: string[] = ["Home"];
  if (path) {
    pathItems.push(...path.split("/"));
  }
  pathItems = pathItems.filter((item) => item);

  return (
    <Layout className="h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={256}
        className="py-4"
      >
        <div className="mb-5 w-full flex justify-center items-center gap-3">
          <Image
            src="/logo.png"
            alt="PrepsJ"
            className="h-12 w-12"
            width={96}
            height={96}
          />
          <h3 style={{ color: "white" }} className="text-2xl">
            PrepsJ
          </h3>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="overflow-y-scroll p-3">
        <Breadcrumb items={pathItems.map((item) => ({ title: item }))} />
        <Content className="m-4">{children}</Content>
        <Footer className="text-center">
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href="/">Home</Link>, "1", <HomeOutlined />),
  getItem(<Link href="/me">My information</Link>, "2", <UserOutlined />),
  getItem(<Link href="/results">Results</Link>, "5", <CopyOutlined />),
  getItem(
    <Link href="/examinations">Examinations</Link>,
    "3",
    <ReadOutlined />
  ),
  getItem(<Link href="/questions">Questions</Link>, "4", <QuestionOutlined />),
];
