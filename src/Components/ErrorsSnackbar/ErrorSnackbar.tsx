import React, {useState} from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppSelector} from "../../App/state/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export const ErrorSnackbar = () => {
    const ApiError = useAppSelector<null|string>(state => state.app.error)
    const [open, setOpen] = useState(false)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {

        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error' sx={{width: '100%'}}>
                {ApiError}
            </Alert>
        </Snackbar>
    )
}
