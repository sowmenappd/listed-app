import React, { useState } from "react";
import { Button, Divider, Empty, Timeline, Typography } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Input } from "antd";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;

function callback(key) {
  console.log(key);
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
  >
    <PlusSquareOutlined
      style={{
        marginRight: 8,
      }}
    />
    Add new todo
  </Title>
);

const AddTodoNav = () => {
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState("");

  const handleTaskDelete = (id) => {
    const filtered = tasks.filter((t) => t.id !== id);
    setTasks(filtered);
  };

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
        <Title level={4}>Title</Title>
        <Input placeholder="New todo" allowClear />
        <Divider />
        <Title level={4}>Tasks</Title>
        <Input
          placeholder="Buy groceries, call mom, .."
          allowClear
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          onPressEnter={() => {
            if (!task.length) return;
            const newTasks = [...tasks, { id: tasks.length, name: task }];
            setTasks(newTasks);
            setTask("");
          }}
        />
        <Divider>
          {tasks.length === 0 && <Empty description="No tasks yet" />}
        </Divider>
        <AddTodoTasks tasks={tasks} onTaskDelete={handleTaskDelete} />

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
      </Panel>
    </Collapse>
  );
};

const AddTodoTasks = ({ tasks, onTaskDelete }) => {
  return (
    <Timeline>
      {tasks &&
        tasks.map((t) => {
          return (
            <Timeline.Item>
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                }}
              >
                {t.name}
                <Button type="ghost" onClick={() => onTaskDelete(t.id)}>
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
