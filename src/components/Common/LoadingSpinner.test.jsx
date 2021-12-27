import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

it('renders without crashing', () => {
  render(<LoadingSpinner />);
});