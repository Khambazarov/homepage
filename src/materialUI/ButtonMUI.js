import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { ArrowForward, ArrowDownward } from "@mui/icons-material";

export const ButtonMUI = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="ButtonMUI">
      <Link to="/projects">
        <Button
          onMouseOver={() => setIsActive(true)}
          onMouseOut={() => setIsActive(false)}
          variant={isActive ? "contained" : "outlined"}
          color="error"
          size="large"
        >
          View my work {isActive ? <ArrowDownward /> : <ArrowForward />}
        </Button>
      </Link>
    </div>
  );
};
