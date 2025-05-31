import { FC, useState } from "react";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Menu,
  Slider,
  styled,
  Typography,
} from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import isEmpty from "lodash/isEmpty";
import LabeledInputs from "./LabeledInputs";

const StyledFilterBox = styled(Box)<{ customWidth: string }>(
  ({ customWidth }) => ({
    border: "1px solid black",
    borderRadius: "3px",
    padding: "0 8px",
    width: customWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& .MuiIconButton-root": { padding: 0 },
  })
);

const StyledMenu = styled(Menu)(() => ({
  top: "1%",
  "& .MuiPaper-root": { padding: "5px 1.5%", width: "18vw" },
  "& .MuiMenu-list": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .MuiFormHelperText-root": {
      display: "flex",
      flexWrap: "wrap",
      alignSelf: "flex-start",
    },
  },
  "& .MuiSlider-root": { width: "90%" },
  "& .MuiSlider-thumb": { width: "15px", height: "15px" },
  "& .MuiBox-root": {
    display: "flex",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    "& .MuiButton-root": { padding: "5px 10px" },
  },
}));

type Props = { onApply: (qtyRange: number[]) => void; customWidth?: string };

const QuantityFilter: FC<Props> = ({ onApply, customWidth = "33%" }) => {
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [qtyRange, setQtyRange] = useState<number[]>([5, 10]);
  const [error, setError] = useState("");

  const onRangeChange = (range: number[]) => {
    if (range[0] > range[1]) {
      setError("Minimum Quantity should be less than Maximum Quantity");
      return;
    }
    if (!isEmpty(error)) setError("");
    setQtyRange(range);
  };

  const applyFilter = () => {
    onApply(qtyRange);
    setProfileAnchor(null);
  };

  const onReset = () => {
    onApply([]);
    setProfileAnchor(null);
  };

  return (
    <>
      <StyledFilterBox customWidth={customWidth}>
        <Typography>Quantity</Typography>
        <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
          <ConfirmationNumberIcon />
        </IconButton>
      </StyledFilterBox>
      <StyledMenu
        open={Boolean(profileAnchor)}
        onClose={() => setProfileAnchor(null)}
        anchorEl={profileAnchor}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Typography alignSelf="flex-start" variant="h6" gutterBottom>
          Quantity Filter
        </Typography>
        <Slider
          disableSwap
          aria-label="Default"
          valueLabelDisplay="auto"
          value={qtyRange}
          onChange={(_e, newValue) => setQtyRange(newValue as number[])}
        />
        <Box width={250}>
          <LabeledInputs
            width="7vw"
            label="Min"
            placeholder=""
            value={qtyRange[0]}
            type="number"
            onChange={(value) => onRangeChange([Number(value), qtyRange[1]])}
          />
          <LabeledInputs
            width="7vw"
            label="Max"
            placeholder=""
            value={qtyRange[1]}
            type="number"
            onChange={(value) => onRangeChange([qtyRange[0], Number(value)])}
          />
        </Box>
        {!isEmpty(error) && <FormHelperText error>{error}</FormHelperText>}
        <Box width={150} mt={2}>
          <Button onClick={onReset} variant="contained">
            Reset
          </Button>
          <Button onClick={applyFilter} variant="contained">
            Apply
          </Button>
        </Box>
      </StyledMenu>
    </>
  );
};

export default QuantityFilter;
