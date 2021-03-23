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
  collections,
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
    try {
      const res = await submitAsyncHandler?.();

      if (res.status === 200) {
        onUpdated?.(true);
      } else {
        onUpdated?.(false);
      }
    } catch (ex) {
      console.log(ex.message);
      onUpdated?.(false);
    }

    setConfirmLoading(false);
  };

  const handleCancel = () => {
    onUpdated?.(null);
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
            title={
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {todoData?.name}
                {todoData && (
                  <Text
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingRight: 20,
                    }}
                  >
                    {collections.find(
                      ({ _id }) => _id === todoData.collectionId
                    )
                      ? collections.find(
                          ({ _id }) => _id === todoData.collectionId
                        ).name === "All"
                        ? "No collection"
                        : collections.find(
                            ({ _id }) => _id === todoData.collectionId
                          ).name
                      : "No collection"}
                  </Text>
                )}
              </div>
            }
            description={
              todoData?.tags && (
                <div>
                  {todoData.tags.length ? (
                    todoData.tags.map((tag, i) => (
                      <Tag key={i} style={{ marginRight: 2 }} color="volcano">
                        {tag.name}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No tags</Text>
                  )}
                </div>
              )
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
