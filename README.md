# OSC Jukebox React App 🎵
[![Code Linting](https://github.com/ufosc/Jukebox-Frontend/actions/workflows/code-linting.yml/badge.svg)](https://github.com/ufosc/Jukebox-Frontend/actions/workflows/code-linting.yml)
[![Unit Tests](https://github.com/ufosc/Jukebox-Frontend/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/ufosc/Jukebox-Frontend/actions/workflows/unit-tests.yml)

## 🚀 Overview

Welcome! This project is a microservice attached to the Jukebox Server application and is a fully independent app that can run on its own. 🎶 That means you don't need the server app to explore and contribute here!

Jukebox-Frontend is the graphical interface for the Jukebox project, a dynamic music queuing system designed to allow users to interact with and manage a shared playlist. Built with React ⚛️, it facilitates real-time music selection, queue management, and playback control. 🎸 The project aims to create an intuitive experience where users can seamlessly add, remove, and vote on tracks to influence the queue order. 📊

## ⚡ Quick Start

Inside your terminal or Git Bash:

```sh
# Clone the repo
git clone https://github.com/ufosc/Jukebox-Frontend.git

# Navigate to the project directory
cd Jukebox-Frontend

# Install dependencies
npm install

# Start the app
npm run dev
```

The application can be found at the address displayed in your terminal (most cases it will be http://localhost:3000). When prompted to log in, you can enter anything into the email and password fields.

*NOTE: If running in network mode using npm run network, you must first register a user with the api, then login with those credentials. Docs for that coming soon...*

## 🌐 Routes

| Path                               | Description                                            |
| ---------------------------------- | ------------------------------------------------------ |
| `http://localhost:3000/`           | Base route (use case TBD)                              |
| `http://localhost:3000/admin/`     | Admin domain, dashboard                                |
| `http://localhost:3000/boards/`    | Boards domain                                          |
| `http://localhost:3000/boards/:id` | Individual boards, values are currently set to 1, 2, 3 |
| `http://localhost:3000/members/`   | Members domain                                         |

## 🛠️ Useful Info

- How to contribute, conventions to follow: [CONTRIBUTING.md](CONTRIBUTING.md)
- Recommended setup: [Wiki/Recommended-Setup](https://github.com/ufosc/Jukebox-Frontend/wiki/Recommended-Setup)

## 📋 Prerequisites for Running the Project

### Node.js

Before diving into the OSC Jukebox React App, ensure you have Node.js installed on your system. 🌟 Node.js is a JavaScript runtime that allows you to run JavaScript code outside of a web browser and acts as a package manager for JavaScript. To install it, follow these steps:

1. Visit the [Node.js installer page](https://nodejs.org/en/download)
2. Choose the installer version for your operating system.

### Git

If you don't already have Git installed, make sure to do so. Git is an open-source version control system supporting online repositories like GitHub, BitBucket, GitLab, and others. 📦 Follow these steps for Git installation:

1. Visit the Git [download page](https://git-scm.com/downloads).
2. Click the link for your operating system under downloads.
3. Follow directions on this page to install Git for your operating system. For example, on Windows, you just need to download the "standalone installer," but directions differ for other operating systems.

## 🎨 Contribution

Here's how you can get involved in contributing to our project:

1. Create a new branch for your feature or fix ✨
```sh
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them with clear, concise messages 📝
```sh
git commit -m "Add: feature description"
```

3. Push your branch to your fork 🚀
```sh
git push origin feature/your-feature-name
```

4. Create a pull request (PR) by navigating to the original repository and clicking "New Pull Request" 📤

## 🖥️ Technology Used

This project leverages cutting-edge web technologies to provide an efficient and responsive user experience:

- **React:** The core framework used for building the user interface.
- **JavaScript:** The primary programming language for frontend logic.
- **Vite:** Fast build tool and development server.
- **Sass CSS:** For streamlined and modern styling.
- **Docker:** Used for network mode deployment and service management.
- **Kafka:** Real-time message streaming for events.
- **NGINX:** Reverse proxy for efficient resource handling.

If you're new to React, here are some great learning resources:

- [React Docs](https://react.dev/learn)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
- [FreeCodeCamp](https://www.freecodecamp.org/news/get-started-with-react-for-beginners/)
- [W3 Schools](https://www.w3schools.com/react/react_intro.asp)
- [React for Beginners by Wes Bos](https://reactforbeginners.com/)
- [Coursera React Course](https://www.coursera.org/learn/react-basics)

Whether you're a beginner or an experienced developer, these tools and resources will help you navigate the project seamlessly. 🚀

