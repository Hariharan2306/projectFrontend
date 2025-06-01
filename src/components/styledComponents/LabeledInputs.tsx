import { FC, useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";

type Props = {
  label: string;
  placeholder?: string;
  value: string | number | Date;
  onChange: (e: string) => void;
  type?: "number" | "password" | "mobile" | "email" | "datetime-local" | "";
  width?: string;
  slotProps?: object;
  multiline?: boolean;
  rows?: number;
};

export const StyledInputBox = styled(Box)<{ width?: string }>(({ width }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "1%",
  width: width || "18vw",
  "& .MuiOutlinedInput-input": { padding: "12px 14px", width: "100%" },
}));

const LabeledInputs: FC<Props> = ({
  label,
  placeholder = "",
  value,
  onChange,
  type,
  width,
  slotProps,
  multiline = false,
  rows,
}) => {
  const [error, setError] = useState("");
  const { min = 1, max } = get(slotProps, "input", {}) as {
    min: number;
    max: number;
  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEmpty(slotProps)) return onChange(e.target.value);

    if (Number(e.target.value) > max || Number(e.target.value) < min) {
      setError("Enter Quantity within Available Range");
      return;
    }
    setError("");
    onChange(e.target.value);
  };

  return (
    <StyledInputBox width={width}>
      <Typography>{label}</Typography>
      <TextField
        type={type}
        placeholder={placeholder}
        value={value}
        error={!isEmpty(error)}
        helperText={error}
        onChange={inputChange}
        slotProps={slotProps}
        multiline={multiline}
        rows={rows}
      />
    </StyledInputBox>
  );
};
export default LabeledInputs;
