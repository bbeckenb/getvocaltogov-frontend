import React, { useState } from 'react';
import Alert from '../Common/Alert';
import postCreateSchema from '../../validationSchemas/postCreateSchema';
import { category } from '../../validationSchemas/longVars';
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
                  <select
                    aria-label="location"
                    name="location"
                    placeholder="location"
                    type="select"
                    {...register('location')}
                    className={`form-control ${errors.location ? 'is-invalid' : ''}`}>
                      <option key="0" value={null}>None</option>
                      <option key="AL" value="AL">Alabama</option>
                      <option key="AK" value="AK">Alaska</option>
                      <option key="AZ" value="AZ">Arizona</option>
                      <option key="AR" value="AR">Arkansas</option>
                      <option key="CA" value="CA">California</option>
                      <option key="CO" value="CO">Colorado</option>
                      <option key="CT" value="CT">Connecticut</option>
                      <option key="DE" value="DE">Delaware</option>
                      <option key="DC" value="DC">District Of Columbia</option>
                      <option key="FL" value="FL">Florida</option>
                      <option key="GA" value="GA">Georgia</option>
                      <option key="HI" value="HI">Hawaii</option>
                      <option key="ID" value="ID">Idaho</option>
                      <option key="IL" value="IL">Illinois</option>
                      <option key="IN" value="IN">Indiana</option>
                      <option key="IA" value="IA">Iowa</option>
                      <option key="KS" value="KS">Kansas</option>
                      <option key="KY" value="KY">Kentucky</option>
                      <option key="LA" value="LA">Louisiana</option>
                      <option key="ME" value="ME">Maine</option>
                      <option key="MD" value="MD">Maryland</option>
                      <option key="MA" value="MA">Massachusetts</option>
                      <option key="MI" value="MI">Michigan</option>
                      <option key="MN" value="MN">Minnesota</option>
                      <option key="MS" value="MS">Mississippi</option>
                      <option key="MO" value="MO">Missouri</option>
                      <option key="MT" value="MT">Montana</option>
                      <option key="NE" value="NE">Nebraska</option>
                      <option key="NV" value="NV">Nevada</option>
                      <option key="NH" value="NH">New Hampshire</option>
                      <option key="NJ" value="NJ">New Jersey</option>
                      <option key="NM" value="NM">New Mexico</option>
                      <option key="NY" value="NY">New York</option>
                      <option key="NC" value="NC">North Carolina</option>
                      <option key="ND" value="ND">North Dakota</option>
                      <option key="OH" value="OH">Ohio</option>
                      <option key="OK" value="OK">Oklahoma</option>
                      <option key="OR" value="OR">Oregon</option>
                      <option key="PA" value="PA">Pennsylvania</option>
                      <option key="RI" value="RI">Rhode Island</option>
                      <option key="SC" value="SC">South Carolina</option>
                      <option key="SD" value="SD">South Dakota</option>
                      <option key="TN" value="TN">Tennessee</option>
                      <option key="TX" value="TX">Texas</option>
                      <option key="UT" value="UT">Utah</option>
                      <option key="VT" value="VT">Vermont</option>
                      <option key="VA" value="VA">Virginia</option>
                      <option key="WA" value="WA">Washington</option>
                      <option key="WV" value="WV">West Virginia</option>
                      <option key="WI" value="WI">Wisconsin</option>
                      <option key="WY" value="WY">Wyoming</option>
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
                      <option key="0" value={null}>None</option>
                      {category.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
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
