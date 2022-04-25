import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SaveIcon from '@mui/icons-material/Save';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as yup from "yup";
import { getProposalDetail, getType, getBrand } from '../../../redux/actions/proposal';
import InputDateTimeField from './../../../components/form-controls/InputDateTimeField/InputDateTimeField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel } from '@mui/material';
import AdminInputField from './../../../components/form-controls/AdminInputField/AdminInputField';
import InputAdornment from '@mui/material/InputAdornment';
const useStyles = makeStyles(theme => ({

}))

function approveProposal(props) {
    const state = useSelector(state => state);
    const params = useParams();
    const dispatch = useDispatch();

    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');



    // get inffo proposal by id
    useEffect(() => {
        const proposalId = params.id;
        if (proposalId) {
            dispatch(getProposalDetail(proposalId))
            dispatch(getBrand())
            dispatch(getType())
        }
    }, [])


    //style cho MUI
    const classes = useStyles();

    // SWitch checked
    const [checked, setChecked] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleChangeBrand = (event) => {
        setBrand(event.target.value);
    };

    const handleChangeType = (event) => {
        setType(event.target.value);
    };

    // Validation
    const schema = yup.object().shape({

        // email: yup.string().required('Please enter your email.').email('Please enter a valid email'),
        // password: yup.string().required('Please enter your password'),

    });

    const form = useForm({
        defaultValues: {
            title: state.proposal.proposal.title,
            description: state.proposal.proposal.description,
            location: state.proposal.proposal.location,
            coverImage: '',
            slogan: '',
            isOnlineContest: checked,
            registerCost: '',
            minRegistration: state.proposal.proposal.minRegistration,
            maxRegistration: state.proposal.proposal.maxRegistration,
            startRegistration: '',
            endRegistration: '',
            startDate: '',
            endDate: '',
            brandName: state.proposal.proposal.brandName,
            typeName: state.proposal.proposal.typeName,
            proposalId: '',
            imagesUrl: '',
        },
        // resolver: yupResolver(schema),
    })

    const { isSubmitting } = form.formState;


    const handleSubmitContest = async (values) => {
        try {
            const newContest = {
                title: values.title,
                description: values.description,
                location: values.location,
                coverImage: '',
                slogan: values.slogan,
                isOnlineContest: checked,
                registerCost: values.registerCost,
                minRegistration: values.minRegistration,
                maxRegistration: values.maxRegistration,
                startRegistration: values.startRegistration,
                endRegistration: values.endRegistration,
                startDate: values.startDate,
                endDate: values.endDate,
                brandName: values.brandName,
                typeName: values.typeName,
                proposalId: params.id,
                imagesUrl: '',
            }
        } catch (error) {
            console.log("failed to create new contest: ", error);
        }
    }



    return (
        <>
            <div className="title-page">
                <EmojiEventsIcon />
                <span>Approve Proposal</span>
            </div>
            <div className="card-box-custom">
                <form onSubmit={form.handleSubmit(handleSubmitContest)}>
                    <div className="form-group">
                        <AdminInputField className="inputField" name="title" label="title" form={form} />
                        <AdminInputField className="inputField" name="description" label="description" form={form} />
                        <AdminInputField className="inputField" name="location" label="location" form={form} />
                        <AdminInputField className="inputField" name="coverImage" label="coverImage" form={form} />
                        <AdminInputField className="inputField" name="slogan" label="slogan" form={form} />

                        <FormControl component="fieldset" variant="standard">
                            <FormControlLabel
                                value="start"
                                label="Is Online"
                                control={
                                    <Switch
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                            />
                        </FormControl>


                        <AdminInputField className="inputField" name="registerCost" label="registerCost" form={form} />
                        <AdminInputField className="inputField" name="minRegistration" label="minRegistration" form={form} />
                        <AdminInputField className="inputField" name="maxRegistration" label="maxRegistration" form={form} />
                        <div>
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="startRegistration" label="Start Registration Time" form={form} />
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="endRegistration" label="End Registration Time" form={form} />
                        </div>
                        <div>
                            {/* Date time picker */}
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="startDate" label="Start date" form={form} />
                            <InputDateTimeField id="datetime-local" type="datetime-local" name="endDate" label="End date" form={form} />
                        </div>

                        {/* BRAND */}
                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">Brand</InputLabel>
                            <Select
                                labelId="select-brand"
                                value={brand}
                                label="Brand"
                                onChange={handleChangeBrand}
                            >
                                {state.proposal.brands?.map((brand, index) => (
                                    <MenuItem key={index} value={brand} selected={brand}>{brand}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        {/* TYPE */}
                        <FormControl sx={{ mt: 1 }} fullWidth>
                            <InputLabel id="select-role">Type</InputLabel>
                            <Select
                                labelId="select-brand"
                                value={type}
                                label="Brand"
                                onChange={handleChangeType}
                            >
                                {state.proposal.types?.map((type, index) => (
                                    <MenuItem key={index} value={type} selected={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <AdminInputField className="inputField" name="imagesUrl" label="imagesUrl" form={form} />
                    </div>
                    <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type='submit' variant="contained" onClick={handleSubmitContest}>
                            <SaveIcon />
                            <span>Save</span>
                        </Button>
                        <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => history.push('/admin/proposal')}>
                            <SettingsBackupRestoreIcon />
                            <span>Back</span>
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default approveProposal;