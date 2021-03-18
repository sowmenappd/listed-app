import React, { useState, useRef } from "react";

import { Tag, Input, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const TagAdder = ({ todo, onUpdate }) => {
  const { tags } = todo;

  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  let input = useRef(null);
  let editInput = useRef(null);

  const showInput = () => {
    setInputVisible(true);
    input.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    if (inputValue && !tags.find((t) => t.name === inputValue)) {
      const newTag = {
        name: inputValue,
      };
      onUpdate?.(todo, [...tags, newTag]);
      setInputVisible(false);
      setInputValue("");
    }
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = {
      ...newTags[editInputIndex],
      name: editInputValue,
    };

    onUpdate?.(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const saveInputRef = (_input) => {
    input = _input;
  };

  const saveEditInputRef = (_input) => {
    editInput = _input;
  };

  return (
    <>
      {tags &&
        tags.map(({ name, _id }, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={saveEditInputRef}
                key={index}
                size="small"
                className="tag-input"
                value={editInputValue}
                onChange={handleEditInputChange}
                onBlur={handleEditInputConfirm}
                onPressEnter={handleEditInputConfirm}
              />
            );
          }

          const isLongTag = name.toString().length > 20;

          const tagElem = (
            <Tag
              color="volcano"
              key={_id}
              closable
              onClose={() => {
                onUpdate?.(
                  todo,
                  tags.filter((t) => t._id !== _id)
                );
              }}
              style={{ margin: 2 }}
            >
              <span
              // onDoubleClick={(e) => {
              //   if (index !== 0) {
              //     setEditInputIndex(index);
              //     setEditInputValue(name);
              //     editInput.current?.focus();
              //     e.preventDefault();
              //   }
              // }}
              >
                {isLongTag ? `${name.slice(0, 20)}...` : name}
              </span>
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={name} key={_id || index}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
      {inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          style={{ marginTop: 2 }}
        />
      )}
      {!inputVisible && (
        <Tag
          className="site-tag-plus"
          onClick={showInput}
          style={{ margin: 4 }}
        >
          <PlusOutlined /> New Tag
        </Tag>
      )}
    </>
  );
};

export default TagAdder;
