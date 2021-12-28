import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import { MemoryRouter, Route } from 'react-router-dom';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import TemplateEditForm from './TemplateEditForm';

it('renders without crashing', () => {
  <MemoryRouter initialEntries={["/templates/1/edit"]}>
      <Route path="/templates/:templateId/edit">
        <TemplateEditForm />
      </Route>
    </MemoryRouter>
});

it("should request and show the data from the API", async () => {
  const spy = jest.spyOn(GetVocalToGovApi, 'getTemplate', ).mockImplementationOnce(
    () =>
      new Promise((resolve) =>
        resolve({
          title: "Hello World!",
          body: "My first Template!"
        })
      )
  );

  render(
    <MemoryRouter initialEntries={["/templates/1/edit"]}>
      <Route path="/templates/:templateId/edit">
        <TemplateEditForm />
      </Route>
    </MemoryRouter>
  );
    await screen.findByDisplayValue("Hello World!");
    await screen.findByDisplayValue("My first Template!");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("1");
});

describe("UserSignUpForm", () => {
  it("should render the basic fields", () => {
    jest.spyOn(GetVocalToGovApi, 'getTemplate', ).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          resolve({
            title: "Hello World!",
            body: "My first Template!"
          })
        )
    );
    render(
      <MemoryRouter initialEntries={["/templates/1/edit"]}>
        <Route path="/templates/:templateId/edit">
          <TemplateEditForm />
        </Route>
      </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Edit Template!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
  });
});

// it("should validate form fields", async () => {
//   const mockSave = jest.fn();
//   render(<TemplateEditForm login={mockSave} />);
//   fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
//     target: { value: '' }
//   });

//   fireEvent.submit(screen.getByRole("button", { name: /Create Template/i }));
//   expect(await screen.findAllByRole("alert")).toHaveLength(3);
//   expect(await screen.findByText('Title is required')).toBeInTheDocument();
//   expect(await screen.findByText('Body is required')).toBeInTheDocument();
//   expect(mockSave).not.toBeCalled();
// });

// it("should submit correct form data", async () => {
//   const mockSave = jest.fn();
//   mockSave.mockReturnValueOnce({ success: false })
//   render(<TemplateEditForm addTemplate={mockSave} />);
//   fireEvent.input(screen.getByRole("textbox", { name: /Title/i }), {
//     target: { value: 'sw1107' }
//   });
//   fireEvent.input(screen.getByRole("textbox", { name: /Body/i }), {
//     target: { value: '123456' }
//   });

//   fireEvent.submit(screen.getByRole("button", { name: /Create Template/i }));

//   await waitFor(() =>
//     expect(mockSave).toHaveBeenCalledWith({
//       title: 'sw1107',
//       body: '123456'
//     })
//   );
// });