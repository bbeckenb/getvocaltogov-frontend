import React from 'react';
import { render } from '@testing-library/react';
import TemplateList from './TemplateList';

it('renders without crashing', () => {
  render(<TemplateList />);
});