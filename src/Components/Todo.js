import React from "react";
import { Skeleton, Card, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const Todo = ({ todo, onDelete, onEdit }) => {
  console.log(Object.keys(todo));
  const { title, tasks } = todo;
  return (
    <div>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <SettingOutlined
            key="setting"
            onClick={() => console.log("settings")}
          />,
          <EditOutlined key="edit" onClick={() => console.log("edit")} />,
          <EllipsisOutlined
            key="ellipsis"
            onClick={() => console.log("more")}
          />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            title={title || "Untitled todo"}
            description={tasks.map((task, i) => (
              <div key={i}>
                <Text>
                  {i + 1}. {task}
                </Text>
                <br />
              </div>
            ))}
          />
        </Skeleton>
      </Card>
    </div>
  );
};

export default Todo;
