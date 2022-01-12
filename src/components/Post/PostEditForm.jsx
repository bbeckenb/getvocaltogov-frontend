import React, { useEffect, useState } from 'react';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import Alert from '../Common/Alert';
import postCreateSchema from '../../validationSchemas/postCreateSchema';
import { category } from '../../validationSchemas/longVars';
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
    <Container style={{"marginTop": "50px", "marginBottom": "30px"}}>
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
                  <select
                    aria-label="location"
                    name="location"
                    placeholder="location"
                    type="select"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}>
                      <option value={null}>None</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                    </select>
                  
                  <div className="invalid-feedback" role="alert">{errors.location?.message}</div>
                </div>


                <div className="form-group">
                  <label>Tag</label>
                  <select
                    aria-label="tag"
                    name="tag"
                    placeholder="tag"
                    type="select"
                    {...register('tag')}
                    className={`form-control ${errors.tag ? 'is-invalid' : ''}`}>
                      <option value={null}>None</option>
                      {category.map((cat) => <option value={cat}>{cat}</option>)}
                  </select>
                  
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
