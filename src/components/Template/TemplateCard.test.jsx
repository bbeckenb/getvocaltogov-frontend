import React from 'react';
import { render } from '@testing-library/react';
import TemplateCard from './TemplateCard';

it('renders without crashing', () => {
  render(<TemplateCard />);
});