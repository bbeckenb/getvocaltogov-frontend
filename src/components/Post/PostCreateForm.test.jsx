import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import PostCreateForm from './PostCreateForm';

it('renders without crashing', () => {
  render(<PostCreateForm />);
});

describe("UserSignUpForm", () => {
  it("should render the basic fields", () => {
    render(<PostCreateForm />);
    expect(
      screen.getByRole("heading", { name: "Create a New Post!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Link/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Tag/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Location/i })).toBeInTheDocument();

  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(<PostCreateForm login={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
    target: { value: '' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create Post/i }));
  expect(await screen.findAllByRole("alert")).toHaveLength(6);
  expect(await screen.findByText('Title is required')).toBeInTheDocument();
  expect(await screen.findByText('Body is required')).toBeInTheDocument();
  expect(mockSave).not.toBeCalled();
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<PostCreateForm addPost={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
    target: { value: 'sw1107' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Body/i }), {
    target: { value: '123456' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Tag/i }), {
    target: { value: 'environment' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Location/i }), {
    target: { value: 'FL' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create Post/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
        title: 'sw1107',
        body: '123456',
        link: '',
        location: 'FL',
        tag: 'environment',
    })
  );
});