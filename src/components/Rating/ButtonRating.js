import React from "react";
import { Button } from "react-bootstrap";

const ButtonRating = ({ title, handleClick, selected }) => {
  return (
    <Button
      variant="light"
      style={{
        backgroundColor: selected ? "#ff7315" : "white",
        color: selected ? "white" : "black",
        border: "none",
      }}
      className={`ml-auto btn-rating mx-2 ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

export default ButtonRating;
