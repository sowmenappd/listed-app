import React, { useEffect, useState } from "react";
import { Card, Checkbox, Progress, Skeleton, Typography } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import config from "../config.js";

const { Meta } = Card;
// const { Text } = Typography;

const Todo = ({ todo, onDelete, onEdit, onTaskToggle }) => {
  const { name, tasks } = todo;
  const [completedTodoPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    const pct = Math.round(
      (tasks.filter((task) => task.completed === true).length / tasks.length) *
        100
    );
    console.log("pct ", pct);
    setCompletedPercentage(pct);
  }, [todo, tasks]);

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
            onClick={() => {
              console.log("more");
            }}
          />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            title={name || "Untitled todo"}
            description={tasks.map((task, i) => (
              <div key={i}>
                <Checkbox
                  onChange={() => onTaskToggle(todo, task)}
                  checked={task.completed}
                >
                  {task.name}
                </Checkbox>
                <br />
              </div>
            ))}
            avatar={
              <Progress
                type="circle"
                percent={completedTodoPercentage}
                width={50}
              />
            }
          />
        </Skeleton>
      </Card>
    </div>
  );
};

export default Todo;
