import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import commentApi from './../../../api/commentApi';
import InputField from './../../../components/form-controls/InputFields/index';
import CommentDetail from './CommentDetail';

CommentList.propTypes = {

};


const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: '18px 0'
    },


    inputtext: {
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
    form: {
        // width: '90% !important',
        padding: '0 20px',
    },

}))
function CommentList({ comments, postId, reload }) {

    const classes = useStyles();
    const [listCmt, setListCmt] = useState(comments);

    const form = useForm({
        defaultValues: {
            comment: '',
        },
    })
    // const { isSubmitting } = form.formState;
    const handleSubmit = async (values) => {
        console.log("value: ", values)
        const newComment = {
            postId: postId,
            content: values.comment,
        }
        try {
            if (!newComment.content) return;
            const response = await commentApi.addNewComment(newComment)
            console.log("call reload");
            reload();
            console.log("response: ", response)
        } catch (error) {
            console.log('Failed create comment: ', error);
        }
        setListCmt(comments)
        form.reset();
    }

    return (
        <div>
            <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField className="inputField" className={classes.inputtext} name="comment" label="Comment" form={form} />
            </form>

            {listCmt.map((comment) => (
                <CommentDetail key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;