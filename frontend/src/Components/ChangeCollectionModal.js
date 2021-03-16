import React, { useState } from "react";
import { Card, Modal, Progress, Select, Skeleton, Tag, Typography } from "antd";

const { Meta } = Card;
const { Option } = Select;
const { Text } = Typography;

const ChangeCollectionModal = ({
  todoData,
  collections,
  onChangeConfirm,
  onCancel,
}) => {
  const [selectedOption, setOption] = useState(
    todoData ? todoData.collectionId : ""
  );

  return (
    todoData && (
      <Modal
        title={"Change collection for: " + todoData?.name}
        visible={todoData !== null}
        centered
        okText="Change"
        onOk={() => {
          let _todo = { ...todoData, collectionId: selectedOption };
          onChangeConfirm(_todo);
        }}
        confirmLoading={false}
        onCancel={onCancel}
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
                {todoData.name}
                {collections && (
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center",
                      paddingRight: 20,
                    }}
                  >
                    <Select
                      defaultValue={todoData ? todoData.collectionId : ""}
                      style={{ width: 120 }}
                      allowClear
                      onSelect={(key) => {
                        console.log(key, key.length);
                        setOption(key);
                      }}
                    >
                      {collections.map(({ name, _id }) => {
                        return (
                          <Option key={_id} value={_id}>
                            {name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
              </div>
            }
            description={
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
            }
            avatar={
              <Progress
                type="circle"
                percent={Math.round(
                  (todoData.tasks.filter((task) => task.completed === true)
                    .length /
                    todoData.tasks.length) *
                    100
                )}
                width={50}
              />
            }
          />
        </Skeleton>
      </Modal>
    )
  );
};

export default ChangeCollectionModal;
