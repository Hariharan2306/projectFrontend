import { FC } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

type Props = {
  label: string;
  placeholder: string;
  value: string | number | Date;
  onChange: (e: string) => void;
  type?: "number" | "password" | "mobile" | "email" | "datetime-local" | "";
  width?: string;
};

const StyledInputBox = styled(Box)<{ width?: string }>(({ width }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "1%",
  width: width || "20vw",
  "& .MuiOutlinedInput-input": { padding: "12px 14px", width: 200 },
}));

const LabeledInputs: FC<Props> = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  width,
}) => (
  <StyledInputBox width={width}>
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
