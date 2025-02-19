import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/material';
import { Close } from '@mui/icons-material';





const StyledDialog = styled(Dialog)(theme => ({
    padding: '16px',  // Replaced theme.spacing with simple CSS
    position: 'absolute',
    top: '40px',

}))

const StyledDialogTitle = styled(DialogTitle)(theme => ({
    paddingRight: '0px'
}))





export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;

    return (
        <StyledDialog open={openPopup} maxWidth="md">
            <StyledDialogTitle>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => { setOpenPopup(false) }}>
                        <Close />
                    </IconButton>
                </div>
            </StyledDialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </StyledDialog>
    )
}