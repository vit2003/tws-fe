import { yupResolver } from '@hookform/resolvers/yup';
import { PhotoCamera } from '@mui/icons-material/';
import { Avatar, Button, Grid } from '@mui/material';
import { Box, Typography, MenuItem } from '@mui/material/';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import * as yup from "yup";
import InputEditBioField from './../../../components/form-controls/InputEditBioField/InputEditBioField';
import InputField from './../../../components/form-controls/InputFields/index';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import accountApi from '../../../api/accountApi';
import Swal from 'sweetalert2';
import StorageKeys from './../../../constants/storage-keys';
import SelectFormField from './../../../components/form-controls/SelectField/SelectFormField';
import { setAccount } from './../../../redux/actions/login';
import { useParams, useRouteMatch, useHistory } from 'react-router-dom';
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
function EditAccount() {

    // Make Styles 
    const classes = useStyles();
    // const location = useLocation
    // const account = location.state
    const history = useHistory()
    const dispatch = useDispatch();

    // Current Account logged in
    const currentAccount = useSelector(state => state.login.infoUser);
    const storage = getStorage();

    // STATE FOR SELECTION
    const [selected, setSelected] = useState(false);

    console.log("currentAccount: ", currentAccount)
    const [reload, setReload] = useState(false)
    // Change Avatar
    const Input = styled('input')({
        display: 'none',
    });
    const [image, setImage] = useState(currentAccount.avatar)


    const [strgImg, setStrgImg] = React.useState([]);
    const onImageChange = (event) => {
        let storageImage = [];
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            storageImage.push(event.target.files[0]);
        }
        setStrgImg(storageImage);
    }

    let imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/Avatar/${strgImg[i].name}`)
            // console.log(strgImg[i].name)
            await uploadBytes(storageRef, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRef)
                .then((url) => {
                    imagesLink.push(url)
                })
                .catch((error) => {
                    console.log("error: ", error);
                })
        }
    }
    // Validation
    const schema = yup.object().shape({
        bio: yup.string().required('Please enter your Bio.').max(100, 'Please enter no more than 100 characters.'),
        phone: yup.string()
            .matches(/[0-9]{10}/, {
                message: "Phone must be a number and no more than 10",
                excludeEmptyString: false,
            })
            .required(),
    });
    const control = useForm();
    const form = useForm({
        defaultValues: {
            // avatar: currentAccount.avatar,
            accountName: currentAccount.name,
            bio: currentAccount.biography,
            phone: currentAccount.phone,
            gender: currentAccount.gender,
        },
        resolver: yupResolver(schema),
    })
    const { isSubmitting } = form.formState;

    const handleSubmit = async (values) => {
        await uploadAndGetLinkImg();
        try {
            const newEdit = {
                name: values.accountName,
                phone: values.phone,
                avatar: imagesLink[0] ? imagesLink[0] : currentAccount.avatar,
                biography: values.bio,
                gender: values.gender,
            }
            const reponse = await accountApi.editAccount(currentAccount.accountId, newEdit);
            history.push(`/account/${currentAccount.accountId}`)
            const pushUserEdited = {
                ...currentAccount,
                name: values.accountName,
                phone: values.phone,
                avatar: imagesLink[0] ? imagesLink[0] : currentAccount.avatar,
                biography: values.bio,
                gender: values.gender,
            }
            localStorage.setItem(StorageKeys.ACCOUNT, JSON.stringify(pushUserEdited))
            dispatch(setAccount(pushUserEdited));
            await Swal.fire(
                'Edit account successfully',
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

            <Box sx={{ display: 'flex', padding: '0 50px', }}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar sx={{ margin: '20px 0', height: '100px', width: '100px' }} src={image} />
                        </Grid>
                        <Grid item xs={8}>
                            <Box sx={{ paddingTop: '20px' }}>
                                <Typography>{currentAccount.email}</Typography>
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" onChange={onImageChange} />
                                    {/* <Avatar sx={{ margin: '20px 0', height: '70px', width: '70px' }} src={image} /> */}
                                    <Button sx={{ backgroundColor: "db36a4 !important", color: '#db36a4' }} variant="text" aria-label="upload picture" component="span" endIcon={<PhotoCamera />}>
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
                            <InputField className={classes.inputtext} name="phone" form={form} />
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Gender</Typography>
                        </Grid>
                        {/* <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="gender" form={form} />
                        </Grid> */}
                        <Grid item xs={8}>
                            <SelectFormField
                                id="gender"
                                name="gender"
                                control={control}
                                defaultValue="1"
                                variant="outlined"
                                margin="normal"
                                form={form}
                            >
                                <MenuItem value={"Male"} selected={selected}>
                                    Male
                                </MenuItem>
                                <MenuItem value={"Female"} selected={selected}>
                                    Female
                                </MenuItem>
                                <MenuItem value={"Other"} selected={selected}>
                                    Other
                                </MenuItem>
                            </SelectFormField>
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