import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Grid, Input } from '@mui/material';
import { Typography, Box } from '@mui/material/';
import InputField from './../../../components/form-controls/InputFields/index';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import InputEditBioField from './../../../components/form-controls/InputEditBioField/InputEditBioField';
import { IconButton } from '@mui/material/';
import { PhotoCamera } from '@mui/icons-material/';
import { styled } from '@mui/material/styles';
EditAccount.propTypes = {

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
function EditAccount(props) {

    // Make Styles 
    const classes = useStyles();

    // Current Account logged in
    const currentAccount = useSelector(state => state.account.current);


    console.log(currentAccount)

    // Change Avatar
    const Input = styled('input')({
        display: 'none',
    });
    const [image, setImage] = useState(currentAccount.avatar)
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    // Validate Form
    const schema = yup.object().shape({
        accountName: yup.string().required('Please enter your email.'),
    });
    const form = useForm({
        defaultValues: {
            accountName: currentAccount.name,
            bio: currentAccount.biography,
            phoneNumber: currentAccount.phoneNumber,
            gender: currentAccount.gender,
        },
        resolver: yupResolver(schema),
    })
    const { isSubmitting } = form.formState;

    const handleSubmit = async (values) => {
        // const { onSubmit } = props;
        // if (onSubmit) {
        //     await onSubmit(values);
        // }
    }



    return (
        <div>

            <Box sx={{ display: 'flex', padding: '0 50px', }}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar sx={{ margin: '20px 0', height: '100px', width: '100px' }} src={image} />
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{paddingTop: '20px'}}>
                                <Typography>{currentAccount.email}</Typography>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onImageChange}/>
                                    {/* <Avatar sx={{ margin: '20px 0', height: '70px', width: '70px' }} src={image} /> */}
                                    <Button sx={{ backgroundColor: "db36a4 !important", color:'#db36a4' }} variant="text" aria-label="upload picture" component="span" endIcon={<PhotoCamera />}>
                                        Change Avatar
                                    </Button>
                                </label>
                            </Box>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Name</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="accountName" form={form} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Bio</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputEditBioField className={classes.inputtext} name="bio" form={form} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Phone Number</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="phoneNumber" form={form} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Gender</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="gender" form={form} />
                        </Grid>
                        <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                            Edit
                        </Button>
                    </Grid>


                </form>
            </Box>


        </div>
    );
}

export default EditAccount;