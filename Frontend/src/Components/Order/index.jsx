import React from 'react'
import OrderForm from './OrderForm'
import { useForm } from '../../Hooks/UseForm';
import Grid from '@mui/material/Grid2';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItems from './OrderedFoodItems';




const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();



const getFreshModelObject = () => ({
    orderMasterId: 0,
    orderNumber: generateOrderNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds: '',
    orderDetails: []
})

const Order = () => {


    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);







    return (
        <>
            < OrderForm resetFormControls={resetFormControls} values={values} setValues={setValues} errors={errors} setErrors={setErrors} handleInputChange={handleInputChange} />

            <Grid container spacing={2}>
                <Grid size={6} >
                    <SearchFoodItems
                        values={values}
                        setValues={setValues}
                    />
                </Grid>

                <Grid size={6}>
                    <OrderedFoodItems
                        errors={errors}
                        values={values}
                        setValues={setValues}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Order
