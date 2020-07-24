# Pixeldust Front-end Assignment

> Shift booking application

Implement a shift booking application with and utilize the provided mock API.
See **[documentation](api/README.md)** for the API.

The application must implement the following views according the [design spec](./design-spec.pdf):

- **My shifts**
  - lists all booked shifts
  - shifts are grouped by dates
  - shifts can be cancelled
- **Available shifts**
  - filter shifts by the city
  - shifts are grouped by dates
  - shifts can be booked or cancelled

Relevant assets can be found in [`./assets`](./assets).

Considerations:

- you can choose to build the application in any front-end framework like React Js, Vue Js or any similar.
- we expect clean and robust state management
- we do not expect you to use a lot of time for the setup - you may use a starter repo
- the UI design is a reference and 1:1 implementation is not absolutely necessary
- creative skills can be used to improve the design

Submission:

- fork this repository to your account and for submission raise a pull request againt base repository once you're done with your solution
- put created app under solution repository
- include instructions how to run the app

## Mock API run instructions

Requirements:

- Node.js (recommended v. >=9)
- NPM v. >=5

```bash
npm install
npm start
```

API server runs at `localhost:8080`

# Solution

## Mock API run instructions

Requirements:
Node.js (recommended v. >=9)
NPM v. >=5

```
npm install
npm start
```

API server runs at localhost:8080

## Running the app

```
git clone --recursive [URL to Git repo]
```

- Make sure api is running

```
cd [root]
npm install
npm run
npm start
```

- Start the React app

```
cd shift-booking-app
npm install
npm start
```

## App details

- Available shifts shows all the shifts obtained from the api for 3 different areas
- On clicking "Book" button, the "My shifts" tab gets populated.
- You can delete any shift from "My shifts"

## App outcomes

- Was able to render the logic of booking and deleting of shifts
- Unable to render the required UI for the "Book" buttons as described in the design spec

## Technologies used

- React Hooks
- CSS
