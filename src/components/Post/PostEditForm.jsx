import React, { useEffect, useState } from 'react';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import Alert from '../Common/Alert';
import postCreateSchema from '../../validationSchemas/postCreateSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams } from 'react-router-dom';

const PostEditForm = function () {
  const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
  const [currPost, setCurrPost] = useState({title: '', body: '', location: '', tag: '', link: ''});
  const history = useHistory();
  const { postId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(postCreateSchema)});

  useEffect(function getPostOnMount() {
    async function getPostValues() {
        const post = await GetVocalToGovApi.getPost(postId);
        setCurrPost(post);
    }
    getPostValues(postId);
  }, []);

  useEffect(function loadPostDefaults() {
      const {title, body, location, tag, link} = currPost;
      reset({title, body, location, tag, link});
      console.log(currPost)
  }, [currPost])

  async function editPost(formData) {
    try {
        const post = await GetVocalToGovApi.updatePost(postId, formData);
        if (post) {
            return { success: true };
        }
      } catch (error) {
            console.error('Encountered issue editing Post:', error);
            return { success: false, error }
      }
}

  async function onSubmit(formData) {
    const res = await editPost(formData);
    if (res.success) {
        history.goBack();
        setFormMessage({type: 'success', message: 'success!'});
    } else {
        console.log(res)
        setFormMessage({type: 'danger', message: `${res.error}`});
    }
  }

  function resetFormAndMsg() {
    setFormMessage({type: 'primary', message: 'welcome!'});
    const {title, body} = currPost;
    reset({title, body});
  }

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold text-center" role="heading">
              Edit Post!
            </Card.Title>
            <div className="post-edit-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    aria-label="title"
                    name="title"
                    placeholder="title"
                    type="text"
                    {...register('title')}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.title?.message}</div>
                </div>

                <div className="form-group">
                  <label>Body</label>
                  <input
                    aria-label="body"
                    name="body"
                    placeholder="body"
                    type="text"
                    {...register('body')}
                    className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.body?.message}</div>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    aria-label="location"
                    name="location"
                    placeholder="location"
                    type="text"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.location?.message}</div>
                </div>

                <div className="form-group">
                  <label>Tag</label>
                  <input
                    aria-label="tag"
                    name="tag"
                    placeholder="tag"
                    type="text"
                    {...register('tag')}
                    className={`form-control ${errors.tag ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.tag?.message}</div>
                </div>

                <div className="form-group">
                  <label>Link</label>
                  <input
                    aria-label="link"
                    name="link"
                    placeholder="link"
                    type="text"
                    {...register('link')}
                    className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.link?.message}</div>
                </div>
                <Alert type={formMessage.type} message={formMessage.message} />
                <div className="form-group">
                    <button 
                        type="button" 
                        onClick={() => history.goBack()}
                        className="btn btn-info"
                    >
                        Go Back
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Edit Post
                    </button>
                    <button
                        type="button"
                        onClick={() => resetFormAndMsg()}
                        className="btn btn-warning float-right"
                    >
                        Reset
                    </button>
                </div>
              </form>
            </div>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default PostEditForm;
