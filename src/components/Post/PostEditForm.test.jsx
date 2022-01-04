import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import { MemoryRouter, Route } from 'react-router-dom';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import PostEditForm from '../Post/PostEditForm';

it('renders without crashing', () => {
  <MemoryRouter initialEntries={["/posts/1/edit"]}>
      <Route path="/posts/:postId/edit">
        <PostEditForm />
      </Route>
    </MemoryRouter>
});

it("should request and show the data from the API", async () => {
  const spy = jest.spyOn(GetVocalToGovApi, 'getPost', ).mockImplementationOnce(
    () =>
      new Promise((resolve) =>
        resolve({
            title: "Hello World!",
            body: "My first Post!",
            location: 'FL',
            tag: 'environment', 
            link: ''
        })
      )
  );

  render(
    <MemoryRouter initialEntries={["/posts/1/edit"]}>
        <Route path="/posts/:postId/edit">
            <PostEditForm />
        </Route>
    </MemoryRouter>
  );
    await screen.findByDisplayValue("Hello World!");
    await screen.findByDisplayValue("My first Post!");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenCalledWith("1");
});

describe("PostEditForm", () => {
  it("should render the basic fields", () => {
    jest.spyOn(GetVocalToGovApi, 'getPost', ).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          resolve({
            title: "Hello World!",
            body: "My first Post!",
            location: 'FL',
            tag: 'environment', 
            link: ''
          })
        )
    );
    render(
        <MemoryRouter initialEntries={["/posts/1/edit"]}>
            <Route path="/posts/:postId/edit">
                <PostEditForm />
            </Route>
        </MemoryRouter>
    );
    expect(
      screen.getByRole("heading", { name: "Edit Post!" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /Body/i })).toBeInTheDocument();
  });
});
