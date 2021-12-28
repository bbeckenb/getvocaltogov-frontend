import React, { useEffect, useState } from 'react';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import Alert from '../Common/Alert';
import templateCreateSchema from '../../validationSchemas/templateCreateSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Card, Container, Row,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, useParams } from 'react-router-dom';

const TemplateEditForm = function () {
  const [formMessage, setFormMessage] = useState({type: 'primary', message: 'welcome!'});
  const [currTemplate, setCurrTemplate] = useState({title: '', body: ''});
  const history = useHistory();
  const { templateId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({resolver: yupResolver(templateCreateSchema)});

  useEffect(function getTemplateOnMount() {
    async function getTemplateValues() {
        const template = await GetVocalToGovApi.getTemplate(templateId);
        setCurrTemplate(template);
    }
    getTemplateValues(templateId);
  }, []);

  useEffect(function loadTemplateDefaults() {
      const {title, body} = currTemplate;
      reset({title, body});
      console.log(currTemplate)
  }, [currTemplate])

  async function editTemplate(formData) {
    try {
        const template = await GetVocalToGovApi.updateTemplate(templateId, formData);
        if (template) {
            return { success: true };
        }
      } catch (error) {
            console.error('Encountered issue editing Template:', error);
            return { success: false, error }
      }
}

  async function onSubmit(formData) {
    const res = await editTemplate(formData);
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
    const {title, body} = currTemplate;
    reset({title, body});
  }

  return (
    <Container>
      <Row className="justify-content-lg-center">
        <Card style={{ width: '800px', backgroundColor: '#AED6F1' }}>
          <Card.Body>
            <Card.Title className="font-weight-bold text-center" role="heading">
              Edit Template!
            </Card.Title>
            <div className="template-add-form">
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
                    type="body"
                    {...register('body')}
                    className={`form-control ${errors.body ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback" role="alert">{errors.body?.message}</div>
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
                    Edit Template
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

export default TemplateEditForm;
