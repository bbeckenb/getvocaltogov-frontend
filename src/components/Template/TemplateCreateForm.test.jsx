import React from 'react';
import { render } from '@testing-library/react';
import TemplateCreateForm from './TemplateCreateForm';

it('renders without crashing', () => {
  render(<TemplateCreateForm />);
});