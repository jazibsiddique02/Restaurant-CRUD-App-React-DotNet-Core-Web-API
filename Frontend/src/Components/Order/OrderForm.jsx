import React, { useState } from 'react'
import Form from '../../Layout/Form'
import Grid from '@mui/material/Grid2';
import { Input, Button, Select } from '../../Controls';
import { ButtonGroup, InputAdornment, Typography } from '@mui/material';
import { styled } from "@mui/system";
import { Button as MuiButton } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Reorder } from '@mui/icons-material';
import { grey } from '@mui/material/colors';

const pMethods = [
    { id: 'none', title: "Select" },
    { id: "Cash", title: "Cash" },
    { id: "Card", title: "Card" }
]

const buttonbgcolor = grey[700]

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
    '& .MuiTypography-root': {
        color: '#f3b33d',
        fontWeight: 'bolder',
        fontSize: '1.5em',
    }
}));



const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    backgroundColor: '#f3b33d', // Group background color
    margin: theme.spacing(1),
    '& .MuiButton-root': {
        color: 'black', // Set text color of the button to black
        '&:hover': {
            backgroundColor: '#ffb84d', // Optional: add hover effect for buttons
            color: 'black', // Ensure text stays black on hover
        },
    },
    '& .MuiButton-label': {
        textTransform: 'none', // Remove text transform (uppercase) on button labels
    },
    '&:hover': {
        backgroundColor: '#f3b33d', // Hover effect for the group itself
    },
}));



const OrderForm = (props) => {


    const { values, handleInputChange, errors } = props;

    return (
        <Form>
            <Grid container>
                <Grid size={6}>

                    <Input
                        disabled
                        label="Order Number"
                        name="orderNumber"
                        value="12345" // Sample value
                        InputProps={{

                            startAdornment: <StyledInputAdornment position="start">
                                <Typography>#</Typography>
                            </StyledInputAdornment>
                        }}
                    />
                    <Select
                        label="Customer"
                        name="customerId"
                        value={values.customerId}
                        onChange={handleInputChange}
                        options={[
                            { id: 0, title: "Select" },
                            { id: 1, title: "Customer 1" },
                            { id: 2, title: "Customer 2" },
                            { id: 3, title: "Customer 3" },
                            { id: 4, title: "Customer 4" },

                        ]}
                    />
                </Grid>



                <Grid size={6}>
                    <Select
                        label="Payment Method"
                        name="pMethod"
                        onChange={handleInputChange}
                        value={values.pMethod}
                        options={pMethods}
                    />
                    <Input
                        InputProps={{

                            startAdornment: <StyledInputAdornment position="start">
                                <Typography>$</Typography>
                            </StyledInputAdornment>
                        }}
                        disabled label='Grand Total'
                        value={values.gTotal}
                        name='gTotal'
                    />
                    <StyledButtonGroup>
                        <MuiButton
                            size='large'
                            endIcon={<RestaurantMenuIcon />}
                            type='submit'
                            color='primary'
                        >
                            Submit
                        </MuiButton>

                        <MuiButton
                            size='small'
                            startIcon={<RefreshIcon />}
                        >

                        </MuiButton>
                    </StyledButtonGroup>

                    <Button
                        size="large"
                        startIcon={<Reorder />}
                        color="warning"
                    >
                        Orders
                    </Button>
                </Grid>
            </Grid>
        </Form>
    )
}

export default OrderForm
