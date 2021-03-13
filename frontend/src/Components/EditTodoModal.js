import React, { useState, useEffect } from "react";
import {
  Card,
  Checkbox,
  Divider,
  Input,
  Modal,
  Progress,
  Skeleton,
  Tag,
  Typography,
} from "antd";
import { HighlightOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const EditTodoModal = ({
  todoData,
  onAddTask,
  onChangeTaskName,
  onUpdated,
  submitAsyncHandler,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [completedTodoPercentage, setCompletedPercentage] = useState(0);

  const [addTaskState, setAddTask] = useState("");

  useEffect(() => {
    if (!todoData) return;
    const pct = Math.round(
      (todoData.tasks.filter((task) => task.completed === true).length /
        todoData.tasks.length) *
        100
    );
    setCompletedPercentage(pct);
  }, [todoData]);

  const handleOk = async () => {
    setConfirmLoading(true);

    const res = await submitAsyncHandler?.();

    if (res.status === 200) {
      onUpdated?.(true);
    } else {
      onUpdated?.(false);
    }

    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    onUpdated?.(false);
  };

  return (
    <>
      <Modal
        title={"Edit Todo: " + todoData?.name}
        visible={todoData !== null}
        centered
        okText="Update"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText="Back"
      >
        <Skeleton loading={false} avatar active>
          <Meta
            title={todoData?.name}
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
          {todoData &&
            todoData.tasks.map((task, i) => (
              <div key={i}>
                <Checkbox disabled checked={task.completed}>
                  <Text
                    editable={{
                      icon: <HighlightOutlined />,
                      tooltip: "click to edit text",
                      onChange: (newTaskName) =>
                        onChangeTaskName?.(todoData, i, newTaskName),
                    }}
                  >
                    {task.name}
                  </Text>
                </Checkbox>
                <br />
              </div>
            ))}
          <Input
            placeholder="Add todos"
            value={addTaskState}
            bordered={false}
            onChange={(e) => {
              setAddTask(e.target.value);
            }}
            onPressEnter={(e) => {
              const text = e.target.value;
              if (!text) return;

              onAddTask?.({ name: text, completed: false });
              setAddTask("");
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditTodoModal;
