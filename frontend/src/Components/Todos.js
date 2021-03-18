import React from "react";
import {
  Col,
  Card,
  Divider,
  Empty,
  List,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";

import Todo from "./Todo";
import CollectionDropdown from "./CollectionDropdown";

const { Text, Title } = Typography;
const { Meta } = Card;

const Todos = ({
  collections,
  loading,
  todos,
  onCollectionAdd,
  onCollectionDelete,
  onTodoTaskToggle,
  onDeleteTodo,
  onEditTodo,
  onSelectCollection,
  onTodoChangeCollection,
  onUpdateTodo,
  onUpdateTag,
  selectedCollection,
  user,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Row>
        <Col span={24}>
          <div
            style={{
              marginBottom: 30,
              width: "100%",
            }}
          >
            <Divider>
              <Title
                style={{
                  fontWeight: "lighter",
                  marginBottom: 10,
                }}
              >
                <span style={{ color: "blueviolet" }}>
                  <b>Your </b>
                </span>
                <span style={{ color: "darkmagenta" }}>
                  <b>lists</b>
                </span>
              </Title>
            </Divider>
            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <CollectionDropdown
                collections={collections}
                selectedCollection={selectedCollection}
                onAdd={onCollectionAdd}
                onDelete={onCollectionDelete}
                onSelect={onSelectCollection}
                user={user}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        {todos.length > 0 ? (
          <List
            style={{
              overflowX: "hidden",
              width: "100%",
              overflowY: "auto",
              paddingBottom: 20,
              paddingLeft: 20,
            }}
            grid={{
              gutter: 32,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={todos}
            renderItem={(td, i) => (
              <List.Item key={i}>
                <Todo
                  todo={td}
                  onTaskToggle={onTodoTaskToggle}
                  onDelete={onDeleteTodo}
                  onEdit={onEditTodo}
                  onUpdate={onUpdateTodo}
                  onUpdateTag={onUpdateTag}
                  onChangeCollection={onTodoChangeCollection}
                />
              </List.Item>
            )}
          />
        ) : loading ? (
          <List
            style={{
              overflowX: "hidden",
              width: "100%",
              overflowY: "auto",
              paddingBottom: 20,
              paddingLeft: 20,
            }}
            grid={{
              gutter: 32,
              xs: 1,
              sm: 1,
              md: 2,
              lg: 2,
              xl: 3,
              xxl: 4,
            }}
            dataSource={[1, 2, 3, 4]}
            renderItem={(_, i) => (
              <List.Item key={i}>
                <LoadingCard />
              </List.Item>
            )}
          />
        ) : (
          <div
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Empty
              description={<Text style={{ fontSize: 36 }}>No todos found</Text>}
              imageStyle={{ marginTop: 50, width: 400, height: 250 }}
            />
          </div>
        )}
      </Row>
    </div>
  );
};

const LoadingCard = () => (
  <Card
    style={{ width: 300, marginTop: 16 }}
    actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
  >
    <Skeleton loading active>
      <Meta title="Card title" description="This is the description" />
    </Skeleton>
  </Card>
);

export default Todos;
