import React, { useState } from 'react';
import Alert from '../Common/Alert';
import postCreateSchema from '../../validationSchemas/postCreateSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostCreateForm = function ({ addPost }) {
  const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(postCreateSchema)});

  async function onSubmit(formData) {
    let res = await addPost(formData);
    if (res.success) {
        reset()
        setFormMessage({type: 'success', message: 'success!'});
    } else {
        console.log(res)
        setFormMessage({type: 'danger', message: `${res.error}`});
    }
  }

  function resetFormAndMsg() {
    setFormMessage({type: 'primary', message: 'welcome!'});
    reset()
  }

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold text-center" role="heading">
              Create a New Post!
            </Card.Title>
            <div className="post-add-form">
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
                  <textarea
                    aria-label="body"
                    rows="5"
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
                  <button type="submit" className="btn btn-primary">
                    Create Post
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

export default PostCreateForm;
