import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import PostSearchForm from './PostSearchForm';

it('renders without crashing', () => {
  render(<PostSearchForm />);
});

describe("PostSearchForm", () => {
  it("should render the basic fields", () => {
    render(<PostSearchForm />);
    expect(
      screen.getByRole("heading", { name: "Search Posts!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Tag/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Location/i })).toBeInTheDocument();

  });
});

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  render(<PostSearchForm searchPosts={mockSave} />);
  fireEvent.input(screen.getByRole("textbox", { name: /Tag/i }), {
    target: { value: 'wrong' }
  });
  fireEvent.input(screen.getByRole("textbox", { name: /Location/i }), {
    target: { value: 'wrong' }
  });

  fireEvent.submit(screen.getByRole("button", { name: /Search Posts/i }));
  expect(await screen.findAllByRole("alert")).toHaveLength(5);
  expect(await screen.findByText('tag must be one of the following values: environment, health care, defense')).toBeInTheDocument();
  expect(await screen.findByText('location must be one of the following values: AK, AL, AR, AZ, CA, CO, CT, DC, DE, FL, GA, HI, IA, ID, IL, IN, KS, KY, LA, MA, MD, ME, MI, MN, MO, MS, MT, NC, ND, NE, NH, NJ, NM, NV, NY, OH, OK, OR, PA, RI, SC, SD, TN, TX, UT, VA, VT, WA, WI, WV, WY')).toBeInTheDocument();
  expect(mockSave).not.toBeCalled();
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  mockSave.mockReturnValueOnce({ success: false })
  render(<PostSearchForm searchPosts={mockSave} />);
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

  fireEvent.submit(screen.getByRole("button", { name: /Search Posts/i }));

  await waitFor(() =>
    expect(mockSave).toHaveBeenCalledWith({
        title: 'sw1107',
        body: '123456',
        location: 'FL',
        tag: 'environment',
    })
  );
});