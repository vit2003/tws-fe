import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Grid } from '@mui/material';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from "yup";
import accountApi from '../../../api/accountApi';
import InputField from './../../../components/form-controls/InputFields/index';
import PasswordField from './../../../components/form-controls/PasswordField/index';
import Swal from 'sweetalert2';
ChangePassword.propTypes = {

};
const useStyles = makeStyles(theme => ({
    form: {

    },
    labelText: {
        paddingTop: '15px'
    },
    button: {
        backgroundColor: '#DB36A4 !important',
        margin: '20px auto !important'
    },
    inputtext: {
        // padding: '0 !important',
        // margin: '0 !important',
        // width: '50% !important',
        height: '20px !important',
        "& .Mui-focused": {
            color: 'pink',
            borderColor: 'pink'
        },
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline-focused': {
                borderColor: 'pink',
            },
            '&:hover fieldset': {
                borderColor: 'pink',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'pink',
            },
        },

    },

}))
function ChangePassword(props) {

    // Make Styles 
    const classes = useStyles();

    // Current Account logged in
    const currentAccount = useSelector(state => state.login.infoUser);
    console.log(currentAccount)



    // Validate Form
    const schema = yup.object().shape({
        oldPassword: yup.string().required('Please enter your old password.'),
        newPassword: yup.string().required('Please enter your new password.').min(6, 'Please enter at least 6 characters.'),
        confirmNewPassword: yup.string().required("Please retype your password.").oneOf([yup.ref('newPassword')], 'Password does not match'),
    });

    const form = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        resolver: yupResolver(schema),
    })
    const { isSubmitting } = form.formState;

    const handleSubmit = async (values) => {
        try {
            const newChangePass = {
                old_password: values.oldPassword,
                new_password: values.newPassword,
            }
            console.log("newChangePass: ", newChangePass);
            const reponse = await accountApi.changePassword(newChangePass);
            await Swal.fire(
                'Edit Account successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    return (
        <div>

            <Box sx={{ display: 'flex', padding: '0 50px', }}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar src={currentAccount.avatar} />
                        </Grid>
                        <Grid item xs={8}>
                            <Box>
                                <Typography>{currentAccount.name}</Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Old Password</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <PasswordField className={classes.inputtext} name="oldPassword" form={form} />
                        </Grid>



                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>New Password</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <PasswordField className={classes.inputtext} name="newPassword" form={form} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Confirm New Password</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <PasswordField className={classes.inputtext} name="confirmNewPassword" form={form} />
                        </Grid>
                        <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                            Change Password
                        </Button>
                    </Grid>
                </form>
            </Box>


        </div>
    );
}

export default ChangePassword;