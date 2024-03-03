"use client";

import { BACKEND_URL } from "@/environments";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import styles from "./page.module.css";

const loginUrl = `${BACKEND_URL}/auth/login/google`;

export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <main className="h-full flex items-center">
      <div className="mx-auto w-80 p-2">
        <h1 className="text-2xl font-bold text-center mb-4">
          Log in to PrepsJ
        </h1>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a className={styles["login-form-forgot"]} href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Log in
            </Button>
          </Form.Item>
          <Divider>Or</Divider>
          <Form.Item>
            <Button className="w-full" danger href={loginUrl}>
              Google
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
}
