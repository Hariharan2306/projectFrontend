import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
};

const AddDonationDialog = ({ dialogOpen, setDialogOpen }: Props) => {
  return (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(!dialogOpen)}>
      <DialogTitle>Add Donation</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDonationDialog;
