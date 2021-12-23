import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import {jest} from '@jest/globals'
import UserProfile from './UserProfile';

it('renders without crashing', () => {
  render(<UserProfile />);
});