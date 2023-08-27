'use client'

import { Dialog } from "@mui/material";

interface Props {
    open: boolean;
    close: () => void;
}

const AssignDialog: React.FC<Props> = ({ open, close }) => {
    return (
        <Dialog
            open={open}
            onClose={close}
        >
            {/* TODO: Přidat dialog s výběrem uživatele */}

        </Dialog>
    )
}

export default AssignDialog