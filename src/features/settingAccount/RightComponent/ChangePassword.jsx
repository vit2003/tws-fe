import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, Grid } from '@mui/material';
import { Box, Typography } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from "yup";
import accountApi from '../../../api/accountApi';
import InputField from './../../../components/form-controls/InputFields/index';
import PasswordField from './../../../components/form-controls/PasswordField/index';
import Swal from 'sweetalert2';
import { setAccount } from '../../../redux/actions/login';
import StorageKeys from './../../../constants/storage-keys';

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
    const dispatch = useDispatch();
    // Current Account logged in
    const currentAccount = useSelector(state => state.login.infoUser);

    // Validate Form
    const schemaChange = yup.object().shape({
        oldPassword: yup.string().required('Please enter your old password.'),
        newPassword: yup.string().required('Please enter your new password.').min(6, 'Please enter at least 6 characters.'),
        confirmNewPassword: yup.string().required("Please retype your password.").oneOf([yup.ref('newPassword')], 'Password does not match'),
    });
    const schemaNew = yup.object().shape({
        newPassword: yup.string().required('Please enter your new password.').min(6, 'Please enter at least 6 characters.'),
        confirmNewPassword: yup.string().required("Please retype your password.").oneOf([yup.ref('newPassword')], 'Password does not match'),
    });

    const formChange = useForm({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
        resolver: yupResolver(schemaChange),
    })
    const formNew = useForm({
        defaultValues: {
            newPassword: '',
            confirmNewPassword: '',
        },
        resolver: yupResolver(schemaNew),
    })
    const { isSubmitting } = formChange.formState;

    const handleSubmitChange = async (values) => {
        console.log("test1");
        try {
            const newChangePass = {
                old_password: values.oldPassword,
                new_password: values.newPassword,
            }
            const reponse = await accountApi.changePassword(newChangePass);
            await Swal.fire(
                'Change password successfully',
                'Click button to continute!',
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
    const handleSubmitNew = async (values) => {
        console.log("test1");
        try {
            console.log("test2");
            const reponse = await accountApi.newPassword(values.newPassword);
            const pushUserEdited = {
                ...currentAccount,
                isHasPassword: true,
            }
            localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(pushUserEdited))
            dispatch(setAccount(pushUserEdited));
            await Swal.fire(
                'New password successfully',
                'Click button to continute!',
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
            {
                currentAccount.isHasPassword === false ? <Box sx={{ display: 'flex', padding: '0 50px', }}>
                    <form onSubmit={formNew.handleSubmit(handleSubmitNew)} className={classes.form}>
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
                                <Typography className={classes.labelText}>New Password</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <PasswordField className={classes.inputtext} name="newPassword" form={formNew} />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography className={classes.labelText}>Confirm New Password</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <PasswordField className={classes.inputtext} name="confirmNewPassword" form={formNew} />
                            </Grid>
                            <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                                New Password
                            </Button>
                        </Grid>
                    </form>

                </Box> :
                    <Box sx={{ display: 'flex', padding: '0 50px', }}>
                        <form onSubmit={formChange.handleSubmit(handleSubmitChange)} className={classes.form}>
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
                                    <PasswordField className={classes.inputtext} name="oldPassword" form={formChange} />
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography className={classes.labelText}>New Password</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <PasswordField className={classes.inputtext} name="newPassword" form={formChange} />
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography className={classes.labelText}>Confirm New Password</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <PasswordField className={classes.inputtext} name="confirmNewPassword" form={formChange} />
                                </Grid>
                                <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                                    Change Password
                                </Button>
                            </Grid>
                        </form>
                    </Box>
            }




        </div>
    );
}

export default ChangePassword;