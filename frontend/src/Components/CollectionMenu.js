import React from "react";
import { Menu, Typography } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const { Text } = Typography;

const CollectionMenu = ({ coll, onSelect }) => {
  return (
    <Menu
      style={{
        width: "100%",
        backgroundColor: "#191716",
      }}
      defaultSelectedKeys={["collections"]}
      //   defaultOpenKeys={["collections"]}
      //   onClick={this.handleClick}
      mode="inline"
    >
      <SubMenu
        key="collections"
        icon={
          <UnorderedListOutlined
            style={{
              fontSize: 36,
              color: "white",
            }}
          />
        }
        title="Collections"
        style={{
          backgroundColor: "#191716",
          color: "white",
          fontSize: 36,
        }}
      >
        {coll.map(({ name, _id }) => (
          <Menu.Item
            key={_id}
            style={{
              margin: 0,
              backgroundColor: "#191716f4",
              color: "#fff",
              fontSize: 32,
              alignItems: "center",
            }}
            onClick={() => {
              console.log(name);
              onSelect(_id);
            }}
          >
            <Text style={{ color: "white", paddingLeft: 40 }}>{name}</Text>
          </Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  );
};

export default CollectionMenu;
