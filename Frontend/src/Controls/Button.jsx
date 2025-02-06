import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { color, styled } from '@mui/system';
import { grey } from '@mui/material/colors';

const StyledButton = styled(MuiButton)(({ theme }) => ({
    margin: theme.spacing(1),
    '& .MuiButton-label': {
        textTransform: 'none',

    }
}));

export default function Button(props) {
    const { children, color, variant, onClick, className, ...other } = props;

    return (
        <StyledButton
            className={className || ''}
            variant={variant || 'contained'}
            color={color || 'default'}
            onClick={onClick}
            {...other}
        >
            {children}
        </StyledButton>
    );
}
