import { FC } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: string) => void;
  type?: "number" | "password" | "mobile" | "email" | "";
};

const StyledInputBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  margin: "1%",
  width: "20vw",
  "& .MuiOutlinedInput-input": { padding: "12px 14px" },
}));

const LabeledInputs: FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  type,
}) => (
  <StyledInputBox>
    <Typography>{label}</Typography>
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </StyledInputBox>
);
export default LabeledInputs;
