import React, { useState } from 'react';
import UtilClass from '../../classes/UtilClass';
import Alert from '../Common/Alert';
import templateSearchSchema from '../../validationSchemas/templateSearchSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TemplateSearchForm = function ({ searchTemplates }) {
  const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(templateSearchSchema)});

  async function onSubmit(formData) {
    let cleanFormData = UtilClass.omitEmptyVals(formData);
    let res = await searchTemplates(cleanFormData);
    if (res.success) {
        reset()
        setFormMessage({type: 'success', message: `success! Templates filtered with following criteria: ${UtilClass.objKeysValsToString(formData)}`});
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
              Search Templates!
            </Card.Title>
            <div className="template-search-form">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Title Search</label>
                  <input
                    aria-label="title"
                    name="title"
                    placeholder="title search term"
                    type="text"
                    {...register('title')}
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.title?.message}</div>
                </div>

                <div className="form-group">
                  <label>Body Search</label>
                  <input
                    aria-label="body"
                    name="body"
                    placeholder="body search term"
                    type="text"
                    {...register('body')}
                    className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.body?.message}</div>
                </div>
                <Alert type={formMessage.type} message={formMessage.message} />
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Search Templates
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

export default TemplateSearchForm;
