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
import {
  DownloadOutlined,
  UploadOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Paragraph, Text } = Typography;

const Todo = ({ todo, onChangeCollection, onDelete, onEdit, onTaskToggle }) => {
  const { name, tasks, tags } = todo;
  const [completedTodoPercentage, setCompletedPercentage] = useState(0);
  const [showMore, setShowMore] = useState(tasks.length > 5);

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
        style={{ width: 300, marginTop: 16 }}
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
                {tags.length ? (
                  tags.map((tag, i) => (
                    <Tag key={i} style={{ marginRight: 2 }} color="volcano">
                      {tag.name}
                    </Tag>
                  ))
                ) : (
                  <Text type="secondary">No tags</Text>
                )}
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
          {tasks.map((task, i) =>
            !showMore && i > 4 ? null : (
              <div key={i}>
                <Paragraph
                  ellipsis={{ rows: 3, symbol: "..." }}
                  style={{ margin: 0 }}
                >
                  <Checkbox
                    onChange={() => onTaskToggle(todo, task)}
                    checked={task.completed}
                  >
                    <Text delete={task.completed}>{task.name}</Text>
                  </Checkbox>
                </Paragraph>
                <br />
              </div>
            )
          )}
          <div
            style={{
              display: "flex",
              flex: 1,
              padding: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {tasks.length > 5 && (
              <Button
                type="primary"
                shape="round"
                icon={!showMore ? <DownloadOutlined /> : <UploadOutlined />}
                size="small"
                style={{ fontSize: 12 }}
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                Show {!showMore ? "more" : "less"}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Todo;
