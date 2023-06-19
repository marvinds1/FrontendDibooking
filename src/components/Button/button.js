import React from "react";
import { Button } from "react-bootstrap";

function DButton({
  className,
  onClick,
  variant,
  disabled,
  size,
  loading,
  children,
}) {
  return (
    <Button
      className={className}
      onClick={onClick}
      variant={variant}
      disabled={disabled}
      size={size}>
      {loading ? "Loading..." : children}
    </Button>
  );
}

export default DButton;