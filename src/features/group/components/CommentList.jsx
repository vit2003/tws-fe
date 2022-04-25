import { makeStyles } from '@mui/styles';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import commentApi from './../../../api/commentApi';
import InputField from './../../../components/form-controls/InputFields/index';
import CommentDetail from './CommentDetail';
import postApi from './../../../api/postApi';

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
function CommentList({ postId, reload }) {

    const classes = useStyles();

    const [listComment, setListComment] = useState([])

    useEffect(() => {
        (async () => {
            try {
                if (postId) {
                    const reponse = await postApi.getCmtOfPost(postId);
                    setListComment(reponse.comments);
                }
            } catch (error) {
                console.log('Failed to fetch api', error)
            }
        })()
    }, [reload])

    const form = useForm({
        defaultValues: {
            comment: '',
        },
    })


    // const { isSubmitting } = form.formState;
    const handleSubmit = async (values) => {
        const newComment = {
            postId: postId,
            content: values.comment,
        }
        try {
            if (!newComment.content) return;
            const response = await commentApi.addNewComment(newComment)
            reload();
        } catch (error) {
            console.log('Failed create comment: ', error);
        }
        // setListCmt(comments)
        form.reset();
    }

    return (
        <div>
            <form className={classes.form} onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField className="inputField" className={classes.inputtext} name="comment" label="Comment" form={form} />
            </form>

            {listComment?.map((comment) => (
                <CommentDetail key={comment.id} comment={comment} reload={reload} />
            ))}
        </div>
    );
}

export default CommentList;