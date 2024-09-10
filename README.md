# OSC Jukebox React App

Welcome! This project is a microservice attached to the Jukebox Server application, and is a fully independent application that can be run on it's own. What does that mean? It means you don't need to run the server app in order to run this project, and you don't need any experience with the backend to be successful with this project.

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
```
git clone <git url>
```

3. Acccess the newly created directory and run `npm instal` to install the project's dependencies
```
cd Jukebox-Frontend
npm install
```

4. Run `npm run dev` to launch the App on `http://localhost:3000/`. 
```
npm run dev
```

When prompted with a login page, just enter any text into the fields and submit it.

Now that you have the project running, let's explore how you can contribute and make a meaningful impact

### Making Contributions
Once you're ready to start working on the project, go to the "Issues" tab inside the GitHub repo - this is where we keep track of tasks - and pick an "Issue". Comment on that issue to claim it (but make sure you finish it, otherwise someone else will be able to take it😬).

We recommend that you make a new branch on your system called a "feature branch". This is a technique used in some enterprises to help keep track of who is doing what, and is a part of the "Trunk based development" paradigm. You can read about that [here](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development). To make this branch you can use the following code:

```sh
# "checkout" or change to a new branch called "feature/some-cool-feature"
git checkout -b feature/some-cool-feature
```

Once you're in the new "feature branch", you can proceed to writing some revolutionary code 👨‍💻😎. If you're satisfied with your changes, follow the steps below:

1. stage your changes and commit your code
```sh
git add -A  # -A to stage your changes all at once
git commit -m 'finished new feature'
```

2. Push to the online repository in GitHub
```sh
git push -u origin feature/new-feature
```

The changes will now be visible in your online repo and assuming it's a forked version of the original, just open a pull request to transfer these changes to the original repo. If you need help with making a pull request, then [this](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) should help 😀.

Remember to change the name of the branch to be relevant to the feature you are working on, replacing `new-feature` with a short description. Same thing with the commit message, changing `finished new feature` with a relevant description.

Keep reading if you want to learn more about the project and technologies involved.

Happy Coding!

## Technology Used

This project uses **React** and **JavaScript**, making it great for beginners and advanced React developeres simultaneously. React is one of the most used frontend frameworks out there, with alternatives including *Angular* and *Vue.js*.

If you want to learn more about React, here are some great starting points:

* [React Website](https://react.dev/learn)
* [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
* [Medium Article](https://medium.com/swlh/getting-started-with-react-the-fundamentals-61b0266994af)
* [W3 Schools](https://www.w3schools.com/react/react_intro.asp)
* [FreeCodeCamp](https://www.freecodecamp.org/news/get-started-with-react-for-beginners/)
* [Online course offered by Udemy](https://www.udemy.com/share/101Wby3@HeSBtGZeq8SlDCjmZiEgFaax3-uYedK2rNgL51o16a0BumHt7txG87pyVbN8ijt5/)
* [Online course offered by Coursera](https://www.coursera.org/learn/react-basics)
* [Online course offered by creator of the Syntax podcast](https://reactforbeginners.com/)

If you want to master React, I recommend you take one of the online courses. They may cost some money, but usually you can get discounts on some of them. However, you don't need to take any of these to become a professional React developer.

One of the resources on that list included a course by Wes Bos - one of the creators of a podcast about web development called Syntax. Listening to professional developers talking about their work and recommendations is also beneficial in learning any programming language, framework, or technique.

## Git Workflow: Staging, Committing, and Pushing
If you're a beginner with Git, then you may find the following information helpful. 

### Staging vs Commiting

In version control, there are 2 ways to save a snapshot of your code: staging and commiting.

You can stage your code after you get your code to work, but before you finish the feature you are working on. This might not always apply, but may help if you're working with a lot of code. Use the following to stage your code:

```sh
# Add all files to the "stage"
git add .

# Alternatively, add a single file to the "stage"
git add file.js
```

Your code will now be saved in a temporary state. If you acccidentally break your code, and want to revert your files back to the way you had them when you staged it, use the following command:

```sh
# Revert all files to stage, or last commit if not staged
git checkout .

# Alternatively, revert a single file:
git checkout file.js
```

After you are pleased with your feature, or some working code, you can commit it to make a more permanent snapshot:

```sh
# Stage your code and commit it at the same time
git commit -am 'some cool message'

# Alternatively, commit already staged code
git commit -m 'some cool message'
```

Replace "some cool message" with a description of what you completed.

### Pushing the code back to GitHub

Once you are finished, make sure you are on a "feature branch", or a branch named with `feature/` and then a short description of what you are doing. For example, if you were working on authentication, you would maybe call the branch `feature/auth-setup`. This is optional, but highly recommended.

After you are on that branch, push your new branch to the main repo. Here's an example:

```sh
# Checkout to new feature branch called feature/auth-setup
git checkout -b feature/auth-setup

### You proceed to write some revolutionary code...###

# Commit the code
git commit -am 'finish authentication setup'

# Push the new branch to GitHub
git push -u origin feature/auth-setup
```

If you made a fork of the repository, go to your forked repo and you should see a banner that says the branch is ahead/behind of the original repo. On the right side of the banner you should see a button that says `Contribute`, click that button and click `Open Pull Request`.

If you are working on the main repo, create a pull request with your new feature branch.

If you have any troubles authenticating with GitHub, read this Wiki: <https://github.com/ufosc/Jukebox-Frontend/wiki/Authenticating-with-GitHub-in-the-Command-Line>
