import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import TemplateCreateForm from './TemplateCreateForm';

it('renders without crashing', () => {
  render(<TemplateCreateForm />);
});

describe("TemplateCreateForm", () => {
  it("should render the basic fields", () => {
    render(<TemplateCreateForm />);
    expect(
      screen.getByRole("heading", { name: "Create a New Template!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(<TemplateCreateForm addTemplate={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
    target: { value: '' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create Template/i }));
  expect(await screen.findAllByRole("alert")).toHaveLength(3);
  expect(await screen.findByText('Title is required')).toBeInTheDocument();
  expect(await screen.findByText('Body is required')).toBeInTheDocument();
  expect(mockSave).not.toBeCalled();
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<TemplateCreateForm addTemplate={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
    target: { value: 'sw1107' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Body/i }), {
    target: { value: '123456' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Create Template/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
      title: 'sw1107',
      body: '123456'
    })
  );
});