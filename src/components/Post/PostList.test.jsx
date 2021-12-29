import React from 'react';
import { render } from '@testing-library/react';
import PostList from './PostList';

it('renders without crashing', () => {
  render(<PostList />);
});