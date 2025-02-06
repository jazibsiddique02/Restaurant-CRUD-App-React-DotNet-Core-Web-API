import React from "react";
import { styled } from "@mui/system";


const StyledForm = styled("form")(({ theme }) => ({
    '& .MuiFormControl-root': {
        width: '90%',
        margin: theme.spacing(1)
    }
}))



export default function Form(props) {
    const { children, ...other } = props

    return (
        <StyledForm autoComplete="off" {...other} noValidate>
            {children}
        </StyledForm>
    )
}