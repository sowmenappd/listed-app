import React, { useState } from "react";
import { Button, Divider, Empty, Timeline, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Input } from "antd";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;

function callback(key) {
  // console.log(key);
}

const Header = () => (
  <Title
    style={{
      paddingLeft: 10,
      lineHeight: 0,
      marginBottom: 0,
      color: "#fffafa",
      fontWeight: "normal",
    }}
    ellipsis
  >
    <PlusSquareOutlined
      style={{
        marginRight: 8,
      }}
    />
    Add new todo
  </Title>
);

const AddTodoNav = ({
  todos,
  tasks,
  onTodoAdd,
  onTaskAdd,
  onTaskDelete,
  onTaskListClear,
}) => {
  const [currentTodoTitle, setCurrentTodoTitle] = useState("");
  const [currentTask, setCurrentTaskTitle] = useState("");

  return (
    <Collapse
      onChange={callback}
      style={{
        backgroundColor: "#191716",
        borderWidth: 0,
      }}
    >
      <Panel
        showArrow={false}
        header={<Header />}
        key="1"
        style={{ borderWidth: 0 }}
      >
        <div
          style={{
            overflowY: "auto",
            height: "460px",
          }}
        >
          <Title level={4}>Title</Title>
          <Input
            placeholder="New todo"
            allowClear
            value={currentTodoTitle}
            onChange={(e) => {
              setCurrentTodoTitle(e.target.value);
            }}
          />
          <Divider />
          <Title level={4}>Tasks</Title>
          <Input
            placeholder="Buy groceries, call mom, .."
            allowClear
            value={currentTask}
            onChange={(e) => {
              setCurrentTaskTitle(e.target.value);
            }}
            onPressEnter={(e) => {
              onTaskAdd(currentTask);
              setCurrentTaskTitle("");
            }}
          />
          <Divider>
            {tasks.length === 0 && <Empty description="No tasks yet" />}
          </Divider>
          <div style={{ overflowY: "auto", maxHeight: 150 }}>
            <AddTodoTasks
              tasks={tasks}
              onTaskDelete={(i) => {
                onTaskDelete(i);
                setCurrentTaskTitle("");
              }}
            />
            {tasks.length ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={onTaskListClear}>Clear list</Button>
              </div>
            ) : null}
          </div>

          <Collapse
            onChange={callback}
            style={{
              borderWidth: 0,
              backgroundColor: "transparent",
              marginLeft: -10,
            }}
          >
            <Panel
              header={<b>Add more information</b>}
              key="2"
              style={{
                borderWidth: 0,
                backgroundColor: "transparent",
              }}
            >
              <TextArea
                rows={6}
                placeholder="Add some useful information to catch on to.."
              />
            </Panel>
          </Collapse>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="primary"
              style={{ marginBottom: 10 }}
              onClick={() => {
                const todoObj = {
                  id: todos.length,
                  title: currentTodoTitle,
                  tasks: tasks,
                };
                console.log(todoObj);
                onTodoAdd?.(todoObj);
                setCurrentTodoTitle("");
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
};

const AddTodoTasks = ({ tasks, onTaskDelete }) => {
  return (
    <Timeline style={{ paddingTop: 5 }}>
      {tasks &&
        tasks.map((t, index) => {
          return (
            <Timeline.Item key={index}>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                {t}
                <Button
                  type="ghost"
                  style={{ marginTop: 2 }}
                  onClick={() => onTaskDelete(index)}
                >
                  X
                </Button>
              </div>
            </Timeline.Item>
          );
        })}
    </Timeline>
  );
};

export default AddTodoNav;
