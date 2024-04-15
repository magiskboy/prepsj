import { Table } from "antd";

export default function ExaminationsPage() {
  return (
    <main>
      <Table
        dataSource={[
          { name: "Thanh", age: 20 },
          { name: "My ", age: 21 },
        ]}
      />
    </main>
  );
}
