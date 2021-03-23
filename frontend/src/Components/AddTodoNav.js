import React, { useMemo, useState, useRef } from "react";
import { Button, Divider, Empty, Select, Timeline, Typography } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import { Input } from "antd";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Title } = Typography;

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
    <FileAddOutlined
      style={{
        marginRight: 8,
      }}
    />
    Add new list
  </Title>
);

const AddListNav = ({
  collections,
  tasks,
  onTodoAdd,
  onTaskAdd,
  onTaskDelete,
  onTaskListClear,
  busy,
  user,
}) => {
  const [currentTodoTitle, setCurrentTodoTitle] = useState("");
  const [currentTask, setCurrentTaskTitle] = useState("");
  const [currentTags, setCurrentTags] = useState([]);
  const [currentCollection, setCurrentCollection] = useState("Default");

  const defTags = useMemo(() => ["important", "home", "work", "personal"], []);
  const selectRef = useRef();

  return (
    <Collapse
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
            maxHeight: "350pt",
          }}
        >
          <Title level={4}>Title</Title>
          <Input
            placeholder="New list"
            allowClear
            value={currentTodoTitle}
            onChange={(e) => {
              setCurrentTodoTitle(e.target.value);
            }}
          />
          <Select
            mode="tags"
            style={{ width: "70%", marginTop: 8 }}
            placeholder="Add some tags"
            onChange={(values) => {
              console.log(values);
              let _tags = values.map((value) => ({
                name: value,
              }));
              setCurrentTags(_tags);
            }}
            allowClear
            tokenSeparators={[","]}
            ref={selectRef}
            value={currentTags.map(({ name }) => name)}
          >
            {defTags.map((tag) => (
              <Select.Option key={tag}>{tag}</Select.Option>
            ))}
          </Select>
          <Select
            placeholder="Select collection"
            bordered={false}
            style={{ width: 120, color: "skyblue" }}
            onSelect={(value) => {
              setCurrentCollection(value);
            }}
          >
            {collections &&
              collections.map(({ name, _id }) => (
                <Select.Option value={_id} key={_id}>
                  {name}
                </Select.Option>
              ))}
          </Select>
          <Divider />
          <Title level={4}>Items</Title>
          <Input
            placeholder="Buy groceries, call mom, .."
            allowClear
            value={currentTask}
            onChange={(e) => {
              setCurrentTaskTitle(e.target.value);
            }}
            onPressEnter={() => {
              if (currentTask && currentTask.length > 0) {
                onTaskAdd(currentTask);
                setCurrentTaskTitle("");
              }
            }}
          />
          <Divider>
            {tasks.length === 0 && <Empty description="No tasks yet" />}
          </Divider>
          <div>
            <AddTodoTasks
              tasks={tasks}
              onTaskDelete={(i) => {
                onTaskDelete(i);
                setCurrentTaskTitle("");
              }}
            />
            {tasks.length ? (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button shape="round" onClick={onTaskListClear}>
                  Clear list
                </Button>
              </div>
            ) : null}
          </div>
          <Collapse
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
              style={{ marginBottom: 10, marginRight: 10 }}
              disabled={busy}
              loading={busy}
              shape="round"
              onClick={() => {
                if (!tasks.length) return;
                const todoObj = {
                  name: currentTodoTitle,
                  tasks: tasks,
                  tags: currentTags,
                  collectionId: currentCollection,
                  userId: user._id,
                };
                console.log(todoObj);
                onTodoAdd?.(todoObj);
                setCurrentTodoTitle("");
                setCurrentTags([]);
                console.log(Object.keys(selectRef.current));
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
                {t.name}
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

export default AddListNav;
