import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  dialogContent?: () => React.ReactNode;
  dialogHeader?: string;
  onSubmit?: () => void;
};

const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
  "& .MuiBox-root": { display: "flex" },
}));

const AddDonationDialog = ({
  dialogOpen,
  setDialogOpen,
  dialogContent = () => <></>,
  dialogHeader = "",
  onSubmit = () => {},
}: Props) => (
  <Dialog open={dialogOpen} onClose={() => setDialogOpen(!dialogOpen)}>
    <DialogTitle>{dialogHeader}</DialogTitle>
    <StyledDialogContent>{dialogContent()}</StyledDialogContent>
    <DialogActions>
      <Button
        variant="contained"
        onClick={() => {
          setDialogOpen(false);
          onSubmit();
        }}
      >
        Submit
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddDonationDialog;
