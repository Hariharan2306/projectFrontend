import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Box, Button } from "@mui/material";
import LabeledInputs from "./LabeledInputs";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
};

const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
  "& .MuiBox-root": { display: "flex" },
}));

const AddDonationDialog = ({ dialogOpen, setDialogOpen }: Props) => {
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [productType, setProductType] = useState("");

  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(!dialogOpen)}>
      <DialogTitle>Add Donation</DialogTitle>
      <StyledDialogContent>
        <Box>
          <LabeledInputs
            label="Quantity"
            placeholder="Enter Quantity"
            type="number"
            value={quantity}
            onChange={(value) => setQuantity(Number(value))}
          />
          <LabeledInputs
            label="Location"
            placeholder="Enter location"
            value={location}
            onChange={(value) => setLocation(value)}
          />
        </Box>
        <Box>
          <LabeledInputs
            label="Time Availability"
            placeholder="Time"
            value={time}
            onChange={(value) => setTime(value)}
          />
          <LabeledInputs
            label="Product Type"
            placeholder="Product Type"
            value={productType}
            onChange={(value) => setProductType(value)}
          />
        </Box>
      </StyledDialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setDialogOpen(false)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDonationDialog;
