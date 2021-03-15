import { useState } from "react";

import { Button, Divider, Input, notification, Popconfirm, Select } from "antd";
import { PlusOutlined, DeleteTwoTone } from "@ant-design/icons";

const { Option } = Select;

const CollectionDropdown = ({
  collections,
  selectedCollection,
  onAdd,
  onSelect,
  onDelete,
}) => {
  const [collectionName, setCollectionName] = useState("");

  const onNameChange = (e) => {
    setCollectionName(e.target.value);
  };

  const addItem = () => {
    let x = collectionName.trim();
    if (collectionName && x.length > 3) {
      console.log("addItem");
      let collObj = {
        name: formatCollectionName(x),
        userId: "60491df3f8e08af8c3126e09",
      };
      onAdd?.(collObj);
      setCollectionName("");
    } else {
      notification.warn({
        message: "Collection name must be at least 4 characters long.",
        description:
          "Keep your collection names precise for better organisation.",
      });
    }
  };

  return (
    <div style={{ alignItems: "center" }}>
      <Popconfirm
        title="Are you sure to delete this collection?"
        onConfirm={() => {
          console.log(selectedCollection);
          onDelete?.({ _id: selectedCollection });
        }}
        okText="Delete"
        cancelText="Cancel"
      >
        {selectedCollection.length > 0 && (
          <DeleteTwoTone
            twoToneColor="#f40404"
            style={{ fontSize: 18, paddingRight: 8, marginTop: 4 }}
          />
        )}
      </Popconfirm>
      <Select
        style={{ width: 240 }}
        placeholder="All your collections"
        value={selectedCollection}
        defaultValue=""
        dropdownRender={(menu) => (
          <div>
            {menu}
            <Divider style={{ margin: "4px 0" }} />
            <div style={{ display: "flex", flexWrap: "nowrap", padding: 8 }}>
              <Input
                style={{ flex: "auto" }}
                value={collectionName}
                onChange={onNameChange}
                onPressEnter={addItem}
              />
              <Button type="link" onClick={addItem}>
                <PlusOutlined /> Add item
              </Button>
            </div>
          </div>
        )}
        onSelect={(value) => {
          onSelect(value);
          // console.log(value);
          //setCurrentCollectionKey(value);
        }}
      >
        {collections &&
          collections.map((item) => (
            <Option key={item._id} value={item._id}>
              {item.name}
            </Option>
          ))}
      </Select>
    </div>
  );
};

// {
//   item._id !== "" && (
//     <Popconfirm
//       title="Are you sure to delete this collection?"
//       // onConfirm={confirm}
//       // onCancel={cancel}
//       okText="Yes"
//       cancelText="No"
//     >
//       <DeleteTwoTone twoToneColor="#f40404" />
//     </Popconfirm>
//   );
// }

const formatCollectionName = (name) => {
  return name[0].toString().toUpperCase() + name.slice(1).toLowerCase();
};

export default CollectionDropdown;
