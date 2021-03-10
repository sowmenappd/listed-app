import React from "react";
import { Empty, Button } from "antd";

import CollectionMenu from "./CollectionMenu";

const TodoCollectionNav = ({ collections }) => {
  return collections && collections.length ? (
    <CollectionMenu coll={collections} />
  ) : (
    <EmptyComp />
  );
};

const EmptyComp = ({ onPress }) => (
  <Empty
    imageStyle={{
      height: 80,
    }}
    description={
      <p style={{ color: "tomato", fontSize: 30 }}>No collections</p>
    }
  >
    <Button type="primary" onClick={onPress}>
      Create New
    </Button>
  </Empty>
);

export default TodoCollectionNav;
