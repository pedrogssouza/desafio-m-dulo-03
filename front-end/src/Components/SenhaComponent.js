import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useState } from "react";

export default function InputSenha(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl>
      <InputLabel htmlFor={props.id} error={props.error}>
        {props.label}
      </InputLabel>
      <Input
        {...props.register()}
        id={props.id}
        type={showPassword ? "text" : "password"}
        error={props.error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      ></Input>
    </FormControl>
  );
}
