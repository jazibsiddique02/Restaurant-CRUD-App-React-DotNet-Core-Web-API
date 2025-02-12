// This Component Shows List of Selected Food Items


import React from 'react'
import { ListItem, ListItemText, styled, Typography, Paper, IconButton, ButtonGroup, Button, listItemSecondaryActionClasses, ListItemSecondaryAction } from '@mui/material';
import { DeleteTwoTone } from '@mui/icons-material';
import { roundTo2DecimalPoint } from '../../utils';



const StyledPaper = styled(Paper)(({ theme }) => ({
    margin: '15px 0px',
    '&:hover': {
        cursor: 'pointer',
    },
    '&:hover .deleteButton': {
        display: 'block',
    },
}));

const StyledButtonGroup = styled(ButtonGroup)(({ theme }) => ({
    backgroundColor: '#E3E3E3',
    borderRadius: 8,
    '& .MuiButtonBase-root': {
        border: 'none',
        minWidth: '25px',
        padding: '1px',
    },
    '& button:nth-of-type(2)': {
        fontSize: '1.2em',
        color: '#000',
    },
}));

const StyledDeleteButton = styled('div')(({ theme }) => ({
    display: 'none',
    '& .MuiButtonBase-root': {
        color: '#E81719'
    }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 'bolder',
    fontSize: '1.2em',
    margin: '0px 10px',
}));










export default function OrderedFoodItems(props) {

    const { values, setValues } = props;

    let orderedFoodItems = values.orderDetails;




    const removeOrderedFoodItem = (id, index) => {
        let x = { ...values }
        x.orderDetails = x.orderDetails.filter((_, i) => {    // here _ represents each item to be iterated. its just put for reference
            return i != index
        })
        setValues({ ...x })
    }





    const updateQuantity = (index, value) => {
        let x = { ...values }
        let foodItem = x.orderDetails[index]

        if (foodItem.quantity + 1 > 0) {
            if (!(foodItem.quantity == 1 && value == -1)) {
                foodItem.quantity += value;
                setValues({ ...x })
            }
        }
    }





    return (
        <>
            {
                orderedFoodItems.map((item, index) => (
                    <StyledPaper key={index}>
                        <ListItem
                            secondaryAction={
                                <StyledDeleteButton className="deleteButton"> {/* Add class name here */}
                                    <IconButton onClick={() => removeOrderedFoodItem(item.orderDetailId, index)}>
                                        <DeleteTwoTone />
                                    </IconButton>
                                </StyledDeleteButton>
                            }
                        >
                            <ListItemText
                                primary={
                                    <Typography
                                        component="h1"
                                        fontWeight="500"
                                        fontSize="1.2em"
                                    >
                                        {item.foodItemName}
                                    </Typography>
                                }

                                secondary={
                                    <div>
                                        <StyledButtonGroup
                                            size='small'
                                        >
                                            <Button
                                                onClick={e => updateQuantity(index, -1)}
                                            >-</Button>
                                            <Button disabled>{item.quantity}</Button>
                                            <Button
                                                onClick={(e) => updateQuantity(index, 1)}
                                            >+</Button>
                                        </StyledButtonGroup>

                                        <StyledTypography
                                            component={'span'}
                                        >
                                            {'$' + roundTo2DecimalPoint(item.quantity * item.price)}
                                        </StyledTypography>
                                    </div>
                                }





                            />


                        </ListItem>
                    </StyledPaper>
                ))
            }
        </>
    )
}
