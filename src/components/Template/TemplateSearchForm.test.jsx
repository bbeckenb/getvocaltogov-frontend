import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import TemplateSearchForm from './TemplateSearchForm';

it('renders without crashing', () => {
  render(<TemplateSearchForm />);
});

describe("UserSignUpForm", () => {
  it("should render the basic fields", () => {
    render(<TemplateSearchForm />);
    expect(
      screen.getByRole("heading", { name: "Search Templates!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
  });
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<TemplateSearchForm searchTemplates={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
    target: { value: 'sw1107' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Body/i }), {
    target: { value: '123456' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Search Templates/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
      title: 'sw1107',
      body: '123456'
    })
  );
});