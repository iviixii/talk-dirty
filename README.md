# Talk Dirty

Talk Dirty is a react app that implements React(16.8) using Redux Boilerplate that uses JWT authentication. Currently http interceptors implementing a fake backend. Localstorage is used to save user data unencrypted to give the feel of a working authentication. The chat uses the chatkit api which lets you add 1-1 and group chat to your app, along with typing indicators, file attachments and storage, user online presence and a flexible permissions system. Finally we wrap everything up using webpack to handle our babel loader and sass loader.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

## Install

#### `npm install`
#### `npm run start`
#### `enjoy:)`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## TODO
* `Add redux actions and reducers to our chat components`
* `Add user creation with our chatkit api using our localstorage login data`

