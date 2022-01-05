import React from 'react';
import { render } from '@testing-library/react';
import RepresentativeCard from './RepresentativeCard';

it('renders without crashing', () => {
  render(<RepresentativeCard urls={[]} />)
});

