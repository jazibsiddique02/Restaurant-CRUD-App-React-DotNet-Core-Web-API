// This is a wrapper of Table Component Of Material UI





import React from 'react'
import { styled } from '@mui/material';
import { Table as MuiTable } from '@mui/material';




const StyledMuiTable = styled(MuiTable)(() => ({
    '& tbody td': {
        fontWeight: '300',
    },
    '& tbody tr:hover': {
        backgroundColor: '#fffbf2',
        cursor: 'pointer',
    },
    '& .MuiTableCell-root': {
        border: 'none'
    }
}));




export default function Table(props) {

    return (
        <StyledMuiTable>
            {props.children}
        </StyledMuiTable>
    )
}