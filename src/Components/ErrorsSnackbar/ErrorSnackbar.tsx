import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppDispatch, useAppSelector} from "../../App/state/store";
import {setErrorAC} from "../../BLL/Reducers/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {
    const dispatch = useAppDispatch()
    const ApiError = useAppSelector<string | null>(state => state.app.error);




    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
      dispatch(setErrorAC(null))

    }


    return (
        <Snackbar open={!!ApiError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {ApiError}
            </Alert>
        </Snackbar>
    )
}
