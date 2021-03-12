import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  List,
  Popover,
  Progress,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const Todo = ({ todo, onChangeCollection, onDelete, onEdit, onTaskToggle }) => {
  const { name, tasks } = todo;
  const [completedTodoPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    const pct = Math.round(
      (tasks.filter((task) => task.completed === true).length / tasks.length) *
        100
    );
    setCompletedPercentage(pct);
  }, [todo, tasks]);

  const HoverSubmenu = () => {
    return (
      <List>
        <List.Item>
          <Button type="text" onClick={() => onChangeCollection(todo)}>
            <Text style={{ textAlign: "left" }}>Change collection</Text>
          </Button>
        </List.Item>
        <List.Item style={{ width: "100%" }}>
          <Button
            type="text"
            style={{ width: "100%" }}
            onClick={() => onDelete(todo)}
          >
            <Text type="danger" style={{ width: "100%", textAlign: "left" }}>
              Delete
            </Text>
          </Button>
        </List.Item>
      </List>
    );
  };

  return (
    <div>
      <Card
        style={{ width: 300, maxHeight: 500, marginTop: 16 }}
        actions={[
          <Popover content="Edit note" trigger="hover">
            <EditOutlined key="edit" onClick={() => onEdit(todo)} />
          </Popover>,
          <Popover
            placement="bottom"
            content={<HoverSubmenu />}
            trigger="click"
          >
            <EllipsisOutlined
              key="ellipsis"
              onClick={() => {
                console.log("more");
              }}
            />
          </Popover>,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            title={name || "Untitled todo"}
            description={
              <div>
                <Tag style={{ margin: 2 }} color="volcano">
                  volcano
                </Tag>
                <Tag style={{ margin: 2 }} color="orange">
                  orange
                </Tag>
                <Tag style={{ margin: 2 }} color="gold">
                  gold
                </Tag>
                <Tag style={{ margin: 2 }} color="lime">
                  lime
                </Tag>
                <Tag style={{ margin: 2 }} color="green">
                  green
                </Tag>
              </div>
            }
            avatar={
              <Progress
                type="circle"
                percent={completedTodoPercentage}
                width={50}
              />
            }
          />
        </Skeleton>
        <Divider />

        <div
          style={{
            width: "100%",
          }}
        >
          {tasks.map((task, i) => (
            <div key={i}>
              <Checkbox
                onChange={() => onTaskToggle(todo, task)}
                checked={task.completed}
              >
                <Text>{task.name}</Text>
              </Checkbox>
              <br />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Todo;
