import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";
import basketStore from "../../store/BasketStore";
import {observer} from "mobx-react-lite";

export const CompleteOrder = observer(() => {

    const handleClose = () => {
        basketStore.setIsCompleteOrderOpen(false)
    }

    return (
        <Dialog keepMounted open={basketStore.isCompleteOrderOpen} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <h1>LOL</h1>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Order</Button>
            </DialogActions>
        </Dialog>
    );
});

