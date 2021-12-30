import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {jest} from '@jest/globals'
import { MemoryRouter, Route } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import GetVocalToGovApi from '../../GetVocalToGovApi';
import PostDetails from '../Post/PostDetails';

it('renders without crashing', () => {
    <MemoryRouter initialEntries={["/posts/1/details"]}>
        <Route path="/posts/:postId/details">
            <PostDetails />
        </Route>
    </MemoryRouter>
});

it("should request and show the data from the API", async () => {
    const spy = jest.spyOn(GetVocalToGovApi, 'getPost', ).mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          resolve({
              id:1,
              title: "Hello World!",
              body: "My first Post!",
              location: 'FL',
              tag: 'environment', 
              link: '',
              userId: 'test_user',
              createdAt: '2021-12-29T20:40:19.340Z',
              templates: [],
          })
        )
    );

    const currUser = { user: {
        firstName: 'Jimmothy',
        lastName: 'Deanus',
        username: 'test',
        password: '1234',
        street: '60 Sierra Street',
        city: 'Calumet City',
        state: 'IL',
        zip: '60409',
        county: 'Cook',
        email: 'jdean@gmail.com',
        isAdmin: true,
      }};

    render(
        <UserContext.Provider value={{currUser}}>
            <MemoryRouter initialEntries={["/posts/1/details"]}>
                <Route path="/posts/:postId/details">
                    <PostDetails />
                </Route>
            </MemoryRouter>
        </UserContext.Provider>
    );
      await screen.findByText("Hello World!");
      await screen.findByText("My first Post!");
      await screen.findByText("No templates currently related to this post!");
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith("1");
  });