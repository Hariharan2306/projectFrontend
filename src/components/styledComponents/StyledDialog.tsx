import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  dialogContent?: () => React.ReactNode;
  dialogHeader?: string;
  onSubmit?: VoidFunction;
  onCancel?: VoidFunction;
  submitLabel?: string;
  cancelLabel?: string;
};

const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
  "& .MuiBox-root": { display: "flex" },
}));
const StyledDialogAction = styled(DialogActions)(() => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "0 1%",
}));
const StyledDialogTitle = styled(DialogTitle)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 2px 16px 24px",
  "& .MuiSvgIcon-root": { marginTop: "-12px", cursor: "pointer" },
}));

const StyledDialog = ({
  dialogOpen,
  setDialogOpen,
  dialogContent = () => <></>,
  dialogHeader = "",
  onSubmit = () => {},
  onCancel,
  submitLabel = "Submit",
  cancelLabel,
}: Props) => (
  <Dialog open={dialogOpen} onClose={() => setDialogOpen(!dialogOpen)}>
    <StyledDialogTitle>
      {dialogHeader}
      <CancelIcon onClick={() => setDialogOpen(false)} />
    </StyledDialogTitle>
    <StyledDialogContent>{dialogContent()}</StyledDialogContent>
    <StyledDialogAction>
      {onCancel && (
        <Button
          variant="contained"
          onClick={() => {
            setDialogOpen(false);
            onCancel && onCancel();
          }}
        >
          {cancelLabel || "Cancel"}
        </Button>
      )}
      <Button
        variant="contained"
        onClick={() => {
          setDialogOpen(false);
          onSubmit();
        }}
      >
        {submitLabel}
      </Button>
    </StyledDialogAction>
  </Dialog>
);

export default StyledDialog;
