import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getStorage } from "firebase/storage";
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as yup from "yup";
import eventApi from './../../../api/eventApi';
import groupApi from './../../../api/groupApi';
import InputEditBioField from './../../../components/form-controls/InputEditBioField/InputEditBioField';
import InputField from './../../../components/form-controls/InputFields/index';
import SelectFormField from './../../../components/form-controls/SelectField/SelectFormField';


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
ProposalForm.propTypes = {

};

function ProposalForm({ value }) {

    // Make Styles 
    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();

    const [groupList, setGroupList] = useState([]);

    // STATE FOR SELECTION
    const [selected, setSelected] = useState(false);

    useEffect(async () => {
        const response = await groupApi.getAllGroup();
        setGroupList(response)
    })

    const Input = styled('input')({
        display: 'none',
    });
    // Validate Form
    const schema = yup.object().shape({
        title: yup.string().required(`Please enter Contest's Title.`),
        description: yup.string().required(`Please enter Description of Contest.`),
        reason: yup.string().required(`Please enter reason.`),
        rule: yup.string().required(`Please enter rule of contest.`),
        slogan: yup.string().required(`Please enter slogan of contest.`),
    });

    const control = useForm();
    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            reason: '',
            rule: '',
            slogan: '',
        },
        resolver: yupResolver(schema),
    })


    const [inputImage, setInputImage] = React.useState([]);
    const [strgImg, setStrgImg] = React.useState([]);
    const inputRef = React.useRef();
    // Display selected iamge  
    const handleFileChange = (event) => {
        let image = [];
        let storageImage = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].type === 'image/png' || event.target.files[i].type === 'image/jpeg' || event.target.files[i].type === 'image/jpg' || event.target.files[i].type === 'image/gif') {
                image.push(URL.createObjectURL(event.target.files[i]))
                storageImage.push(event.target.files[i]);
            } else return;
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };
    const handleChoose = (event) => {
        // inputRef.current.focus();
    };

    // handle deleted iamge 
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    }

    const storage = getStorage();

    const handleSubmit = async (values) => {

        const newProposal = {
            groupId: values.group,
            title: values.title,
            description: values.description,
            reason: values.reason,
            rule: values.rule,
            slogan: values.slogan,
            // imagesUrl: inputImage,
        }
        try {
            const response = await eventApi.proposalToOpenContest(newProposal);
            await Swal.fire(
                'Send Proposal successfully',
                'Click Button to continute!',
                'success'
            )
            console.log("response: ", response);
        } catch (error) {
            console.log('Failed create Proposal: ', error);
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
        form.reset();
        // setInputImage([]);
    }

    const { isSubmitting } = form.formState;

    return (
        <div>
            <Typography variant="h3" sx={{ textAlign: 'center', margin: '30px 0', fontFamily: "Wallpoet !important", textTransform: 'uppercase', background: "-webkit-linear-gradient(#c31432, #2C5364)", WebkitBackgroundClip: "text", WebkitTextFillColor: 'transparent' }}>Proposal Here</Typography>


            <Box sx={{ display: 'flex', padding: '0 50px', }}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className={classes.form}>
                    <Grid container>
                        {/* TITLE */}


                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Group</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl sx={{ mt: 1 }} fullWidth>
                                <InputLabel id="select-role">
                                    Select Group
                                </InputLabel>
                                <SelectFormField
                                    labelId="select-group"
                                    id="group"
                                    name="group"
                                    label="group"
                                    control={control}
                                    defaultValue="1"
                                    variant="outlined"
                                    margin="normal"
                                    form={form}
                                >
                                    {groupList?.map((group, index) => (
                                        <MenuItem
                                            key={index}
                                            value={group.id}
                                            selected={selected}
                                        >
                                            {group.name}
                                        </MenuItem>
                                    ))}
                                </SelectFormField>
                            </FormControl>
                        </Grid>

                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Title</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="title" form={form} />
                        </Grid>


                        {/* DESCRIPTION */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Description</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputEditBioField className={classes.inputtext} name="description" form={form} />
                        </Grid>

                        {/* REASON  */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Reason</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputEditBioField className={classes.inputtext} name="reason" form={form} />
                        </Grid>

                        {/* RULE*/}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Rule</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputEditBioField className={classes.inputtext} name="rule" form={form} />
                        </Grid>

                        {/* SLOGAN */}
                        <Grid item xs={4}>
                            <Typography className={classes.labelText}>Slogan</Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <InputField className={classes.inputtext} name="slogan" form={form} />
                        </Grid>

                        {/* Button */}
                        <Button disabled={isSubmitting} type='submit' className={classes.button} variant='contained'>
                            Proposal
                        </Button>
                        {/* {isSubmitting && <CircularProgressWithLabel value={100} />} */}
                    </Grid>
                </form>
            </Box>
        </div>
    );
}

export default ProposalForm;