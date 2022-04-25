import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControl, InputLabel, MenuItem, Button, Card, ImageList, ImageListItem, IconButton } from '@mui/material/';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from "@mui/icons-material/Close";
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import SelectFormField from './../../../components/form-controls/SelectField/SelectFormField';
import InputDateTimeField from './../../../components/form-controls/InputDateTimeField/InputDateTimeField';
import { styled } from '@mui/material/styles';
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from 'react-redux';
import { getGroups } from './../../../redux/actions/group';
import Swal from 'sweetalert2';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import * as yup from "yup";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useForm } from 'react-hook-form';
import { makeStyles } from '@mui/styles';
import eventApi from './../../../api/eventApi';

const useStyle = makeStyles((theme) => ({
    closeBtn: {
        position: "absolute !important",
        bottom: 0,

        right: 0,
        color: "black",
        backgroundColor: "rgba(219, 54, 164, 0.3)",
    },

}));

CreateContestForm.propTypes = {

};

function CreateContestForm({ proposal }) {

    const classes = useStyle();

    const stateGroup = useSelector((state) => state.group);
    const dispatch = useDispatch();


    // STYLED FOR INPUT IMAGE
    const Input = styled("input")({
        display: "none",
    });


    // GET DATA FROM REDUC
    useEffect(() => {
        dispatch(getGroups());
    }, []);

    // STATE FOR SELECTION
    const [selected, setSelected] = useState(false);

    // STATE OF INPUTIMAGE
    const [inputImage, setInputImage] = useState([]);
    // STATE FOR OBJ IMG TO PUSH FIREBASE
    const [strgImg, setStrgImg] = useState([]);
    // INPUT REF
    const inputRef = React.useRef();


    const storage = getStorage();

    const [title, setTitle] = useState(proposal.title);
    const [description, setDescription] = useState(proposal.description);
    const [rule, setRule] = useState(proposal.rule);
    const [slogan, setSlogan] = useState(proposal.slogan);

    const handleOnChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const handleOnChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleOnChangeRule = (e) => {
        setRule(e.target.value)
    }
    const handleOnChangeSlogan = (e) => {
        setSlogan(e.target.value)
    }

    // HANDLE CHOOSE IMAGE
    const handleChoose = (event) => {
        inputRef.current.click();
    };

    // HANDLE DELETE IMAGE
    const handleDeleteSelectedSource = () => {
        setInputImage([]);
    };

    // HANDLE DISPLAY CHOOSED IMAGE
    const handleFileChange = (event) => {
        let storageImage = [];
        let image = [];
        for (let i = 0; i < event.target.files.length; i++) {
            if (
                event.target.files[i].type === "image/png" ||
                event.target.files[i].type === "image/jpeg" ||
                event.target.files[i].type === "image/jpg" ||
                event.target.files[i].type === "image/gif"
            ) {
                image.push(URL.createObjectURL(event.target.files[i]));
                storageImage.push(event.target.files[i]);
            }
        }
        setStrgImg(storageImage);
        setInputImage(image);
    };

    // VALIDATE FORM
    const schema = yup.object().shape({
        // title: yup.string()
        //     .required('Please enter your Title')
        //     .test('should has at least two words', 'Please Enter as least two words', (value) => {
        //         return value.split(' ').length >= 2;
        //     }),
        // toyName: yup.string().required('Please enter your Toy.'),
    });


    const control = useForm();
    const form = useForm({
        defaultValues: {
            startRegistration: "",
            endRegistration: "",
            startDate: "",
            endDate: "",
        },
        resolver: yupResolver(schema),
    });

    // UPLOAD ANG GET IMAGE URL FROM FIREBASE
    const imagesLink = [];
    const uploadAndGetLinkImg = async () => {
        for (let i = 0; i < strgImg.length; i++) {
            const storageRef = ref(storage, `/Contest/${strgImg[i].name}`);
            await uploadBytes(storageRef, strgImg[i]);
            // get link from database to download
            await getDownloadURL(storageRef)
                .then((url) => {
                    imagesLink.push(url);
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        }
    };

    const handleSubmitContest = async (values) => {
        await uploadAndGetLinkImg();
        try {
            const newContest = {
                title: title,
                description: description,
                rule: rule,
                slogan: slogan,
                startRegistration: values.startRegistration,
                endRegistration: values.endRegistration,
                startDate: values.startDate,
                endDate: values.endDate,
                typeName: "",
                coverImage: imagesLink[0],
            };

            const response = await eventApi.createNewEvent(
                values.group,
                newContest
            );
            await Swal.fire(
                'New contest Successfully',
                'Click Button to continute!',
                'success'
            )
        } catch (error) {
            console.log("Failed create new post: ", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Something go wrong",
            })
        }
        setStrgImg([]);
        form.reset();
    };
    const { isSubmitting } = form.formState;
    return (
        <form onSubmit={form.handleSubmit(handleSubmitContest)}>
            <FormControl sx={{ mt: 1, mb: 1 }} fullWidth>
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
                    {stateGroup.groups?.map((group, index) => (
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
            <div className="form-group">
                <TextField type="text" sx={{ mb: 2 }} value={title} fullWidth label="Title" name='title' multiline onChange={handleOnChangeTitle} />
                <TextField type="text" sx={{ mb: 2 }} value={description} fullWidth label="Description" name='description' multiline onChange={handleOnChangeDescription} />
                <TextField type="text" sx={{ mb: 2 }} value={rule} fullWidth label="Rule" name='rule' multiline onChange={handleOnChangeRule} />
                <TextField type="text" sx={{ mb: 2 }} value={slogan} fullWidth label="Slogan" name='slogan' multiline onChange={handleOnChangeSlogan} />
            </div>
            <div>
                <InputDateTimeField id="datetime-local" type="datetime-local" name="startRegistration" label="Start Registration Time" form={form} />
                <InputDateTimeField id="datetime-local" type="datetime-local" name="endRegistration" label="End Registration Time" form={form} />
            </div>
            <div>
                {/* Date time picker */}
                <InputDateTimeField id="datetime-local" type="datetime-local" name="startDate" label="Start date" form={form} />
                <InputDateTimeField id="datetime-local" type="datetime-local" name="endDate" label="End date" form={form} />
            </div>

            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" onChange={handleFileChange} />
                <Button variant="contained" aria-label="upload picture" onClick={handleChoose} component="span" endIcon={<PhotoCamera />} >Photo</Button>
            </label>

            {inputImage.length ? (
                <Card
                    variant="outlined"
                    sx={{
                        padding: "10px",
                        marginTop: 2,
                        position: "relative",
                    }}
                >
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {inputImage.map((image, index) => (
                            <div key={index} className="image-item">
                                <ImageListItem key={index}>
                                    <img
                                        src={image}
                                        alt={"image"}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            </div>
                        ))}
                    </ImageList>
                    <IconButton
                        className={classes.closeBtn}
                        onClick={handleDeleteSelectedSource}
                    >
                        <CloseIcon />
                    </IconButton>
                </Card>
            ) : (
                <></>
            )}


            <div className="form-group" style={{ display: 'flex', justifyContent: 'center' }}>
                <Button disabled={isSubmitting} className={classes.btn} type="submit">
                    Create
                </Button>
            </div>
        </form>
    );
}

export default CreateContestForm;