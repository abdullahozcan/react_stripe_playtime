import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

function PrettyButton(text, onClickFunction) {
  return (
    <Button variant="contained" color="primary" onclick={onClickFunction || ""}>
      {text}
    </Button>
  );
}

export default PrettyButton;