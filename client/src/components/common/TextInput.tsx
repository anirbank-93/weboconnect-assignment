"use client";

import React from "react";

// Components
import {
  Grid,
  TextField,
  // InputAdornment,
  // IconButton
} from "@mui/material";

type InputPropTypes = {
  mandatory?: boolean;
  autoFocus?: boolean;
  type?: string;
  id?: string;
  name?: string;
  className?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  halfScreen?: boolean;
};

const TextInput = ({
  mandatory = false,
  autoFocus = false,
  type = "text",
  id,
  name,
  className,
  label,
  value,
  placeholder,
  onChange,
  error,
  halfScreen,
}: InputPropTypes) => {
  return (
    <Grid item xs={12} sm={halfScreen ? 6 : 12}>
      <TextField
        variant="outlined"
        fullWidth
        autoFocus={autoFocus}
        type={type}
        id={id}
        name={name}
        className={className}
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {/* {mandatory && <small className="errors">*</small>} */}
      <span className="errors">{error}</span>
    </Grid>
  );
};

export default TextInput;
