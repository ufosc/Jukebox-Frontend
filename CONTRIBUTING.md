# Contributor Guidelines

Once you're ready to start working on the project, go to the "Issues" tab inside the GitHub repo - this is where we keep track of tasks - and pick an "Issue". Comment on that issue to claim it (but make sure you finish it, otherwise someone else will be able to take it😬).

We recommend that you make a new branch on your system called a "feature branch". This is a technique used in some enterprises to help keep track of who is doing what, and is a part of the "Trunk based development" paradigm. You can read about that [here](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development). To make this branch you can use the following code:

```sh
# "checkout" or change to a new branch called "feature/new-feature"
git checkout -b feature/new-feature
```

Once you're in the new "feature branch", you can proceed to writing some revolutionary code 👨‍💻😎. If you're satisfied with your changes, follow the steps below:

1. stage your changes and commit your code

   ```sh
   git add .
   git commit -m 'finished new feature'
   ```

2. Push to the online repository in GitHub

   ```sh
   git push -u origin feature/new-feature
   ```

The changes will now be visible in your online repo and assuming it's a forked version of the original, just open a pull request to transfer these changes to the original repo. If you need help with making a pull request, then [this](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) should help 😀.

Remember to change the name of the branch to be relevant to the feature you are working on, replacing `new-feature` with a short description. Same thing with the commit message, changing `finished new feature` with a relevant description.

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
