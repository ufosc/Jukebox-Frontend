# OSC Jukebox React App

## Overview

Welcome! This project is a microservice attached to the Jukebox Server application, and is a fully independent application that can be run on it's own. What does that mean? It means you don't need to run the server app in order to run this project, and you don't need any experience with the backend to be successful with this project.

Jukebox-Frontend is the graphical interface for the Jukebox project, a dynamic music queuing system designed to allow users to interact with and manage a shared playlist. Built with React, it facilitates real-time music selection, queue management, and playback control. The project aims to create an intuitive experience where users can seamlessly add, remove, and vote on tracks to influence the queue order. The interface is optimized for use on various devices, ensuring a smooth experience for all participants. This project is ideal for social gatherings, public spaces, and collaborative listening.

## Quick Start

Inside your terminal or Git Bash:

```sh
git clone https://github.com/ufosc/Jukebox-Frontend.git
cd Jukebox-Frontend
npm install
npm run dev
```

The application can be found at <http://localhost:3000>. When prompted to log in, you can enter anything into the email and password fields.

_NOTE: If running in network mode using `npm run network`, you must first register a user with the api, then login with those credentials. Docs for that coming soon..._

### Routes

Currently, our url structure looks like this:

| Path                               | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `http://localhost:3000/`           | Base route (use case TBD)                              |
| `http://localhost:3000/admin/`     | Admin domain, dashboard                                |
| `http://localhost:3000/boards/`    | Boards domain                                          |
| `http://localhost:3000/boards/:id` | Individual boards, values are currently set to 1, 2, 3 |
| `http://localhost:3000/members/`   | Members domain                                         |

### Useful Info

- How to contribute, conventions to follow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Recommended setup: [Wiki/Recommended-Setup](https://github.com/ufosc/Jukebox-Frontend/wiki/Recommended-Setup)

### Environments

- `dev`: Exclusively use mock data, does not need any other servers running
- `network`: Run with production configuration, but allow debug messages (used for integrating with backend)
- `test`: Libs that connect to external services will be mocked
- `production`: No mock data, no debug messages, all errors should be caught, connection to network should be secured

## Prerequisites for Running the Project

### NPM

Before diving into the OSC Jukebox React App, ensure you have npm installed on your system. It's a package manager for JavaScript, primarily used for managing and sharing packages (libraries and tools) of JavaScript code. NPM is widely used in the Node.js ecosystem, but it can also manage front-end dependencies in web development. To install it, follow these steps:

1. Visit the [installer page](https://nodejs.org/en/download)
2. Choose the installer version for your operating system. For example, if you are on Windows, use the `.msi` installer

### Git

If you don't already have Git installed, make sure to so. Git is an open-source version control software supporting online repositories like GitHub, BitBucket, GitLab, and others. Follow these setps for Git installation:

1. Visit the Git [download page](https://git-scm.com/downloads).
2. Choose the "standalone installer" for your operating system.

If you are on windows, we recommend you use the GitBash CLI that comes with the install. Otherwise, if you are on a Unix based system (Linux, MacOS), then use the normal terminal.

## Start-Guide

Now that you have the required tools, you're ready to set up and run the OSC Jukebox React App. To do so, follow these steps:

### Running the Project

1. Get the Code: The easiest way to get the code and interact with it is by forking the directory into your own GitHub account. You can do this by going to the main repo page and clicking the button that
   says `Fork` in the top right side of the page. This will create a copy of the repo on your account. In your forked repo, click the green `Code` button and copy the git url. This will be used to clone the project.

2. Clone the project into your local system:

   ```sh
   git clone <git url>
   ```

3. Acccess the newly created directory and run `npm instal` to install the project's dependencies

   ```sh
   cd Jukebox-Frontend
   npm install
   ```

4. Run `npm run dev` to launch the App on `http://localhost:3000/`.

   ```sh
   npm run dev
   ```

When prompted with a login page, just enter any text into the fields and submit it.

Now that you have the project running, let's explore how you can contribute and make a meaningful impact

### Running with Network Mode

If you want to run the project and test it out with the server, use this command:

```sh
docker-compose -f docker-compose.network.yml build
docker-compose -f docker-compose.network.yml up
```

This will run the following resources:

- React app in "network" mode
- API Server
- Websocket
- Kafka node
- Kafka Zookeeper
- MongoDB
- NGINX

## Contribution

Here's how you can get involved in contributing to our project:

Aftering forking the repo and cloning your fork to your local system,

1. Create a new branch for your feature or fix
   ```sh
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them with clear, concise messages
   ```sh
   git commit -m "Add: feature description"
   ```

3. Push your branch to your fork
   ```sh
   git push origin feature/your-feature-name
   ```

4. Create a pull request (PR) by navigating to the original repository and clicking "New Pull Request"

5. Describe your changes and link to any relevant issues

## Technology Used

This project uses **React** and **JavaScript**, making it great for beginners and advanced React developeres simultaneously. React is one of the most used frontend frameworks out there, with alternatives including _Angular_ and _Vue.js_.

If you want to learn more about React, here are some great starting points:

- [React Website](https://react.dev/learn)
- [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- [Medium Article](https://medium.com/swlh/getting-started-with-react-the-fundamentals-61b0266994af)
- [W3 Schools](https://www.w3schools.com/react/react_intro.asp)
- [FreeCodeCamp](https://www.freecodecamp.org/news/get-started-with-react-for-beginners/)
- [Online course offered by Udemy](https://www.udemy.com/share/101Wby3@HeSBtGZeq8SlDCjmZiEgFaax3-uYedK2rNgL51o16a0BumHt7txG87pyVbN8ijt5/)
- [Online course offered by Coursera](https://www.coursera.org/learn/react-basics)
- [Online course offered by creator of the Syntax podcast](https://reactforbeginners.com/)

If you want to master React, I recommend you take one of the online courses. They may cost some money, but usually you can get discounts on some of them. However, you don't need to take any of these to become a professional React developer.

One of the resources on that list included a course by Wes Bos - one of the creators of a podcast about web development called Syntax. Listening to professional developers talking about their work and recommendations is also beneficial in learning any programming language, framework, or technique.
