"use client";

import { getMe } from "@/apis/user";
import {
  FacebookFilled,
  GoogleCircleFilled,
  LoadingOutlined,
  PlusOutlined,
  XOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  GetProp,
  Input,
  Upload,
  UploadProps,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function UserPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form] = useForm<Awaited<ReturnType<typeof getMe>>>();

  useEffect(() => {
    getMe()
      .then((data) => {
        form.setFieldsValue(data);
        console.log(data);
      })
      .catch(() => {
        router.push("/login");
      });
  }, [router, form]);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <Flex className="bg-white h-full gap-8">
      <div className="w-1/4">
        <div
          className="flex justify-center items-center border-stone-200 rounded border mx-auto mt-4"
          style={{ width: 200, height: 200 }}
        >
          <Upload
            name="avatar"
            listType="picture"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {form.getFieldValue("photoURL") ? (
              <Image
                src={form.getFieldValue("photoURL")}
                alt="avatar"
                width={200}
                height={200}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        </div>
      </div>
      <div className="mt-4 h-full w-full">
        <h2 className="text-3xl mb-3">My profile</h2>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
          className="w-ull max-w-lg"
          form={form}
        >
          <Form.Item label="ID" name="id">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Fullname" name="fullname">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" disabled />
          </Form.Item>
          <Form.Item label="Verify" name="isVerified">
            <Checkbox checked />
          </Form.Item>
          <Form.Item label="Current password" name="currentPassword">
            <Input type="password" placeholder="*********" />
          </Form.Item>
          <Form.Item label="New password" name="newPassword">
            <Input type="password" placeholder="*********" />
          </Form.Item>
          <Form.Item label="Link to">
            <Flex gap={20} className="ml-4">
              {form.getFieldValue("googleId") && (
                <GoogleCircleFilled
                  style={{ fontSize: "36px", color: "#db1916" }}
                />
              )}
              {form.getFieldValue("facebookId") && (
                <FacebookFilled
                  style={{
                    fontSize: "36px",
                    color: "#0789ed",
                  }}
                />
              )}
              {form.getFieldValue("twitterId") && (
                <XOutlined
                  style={{
                    fontSize: "36px",
                  }}
                />
              )}
            </Flex>
          </Form.Item>
          <Flex className="w-full">
            <Button className="w-full" type="primary">
              Update
            </Button>
          </Flex>
        </Form>
      </div>
    </Flex>
  );
}
