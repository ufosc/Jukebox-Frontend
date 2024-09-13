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

Keep reading if you want to learn more about the project and technologies involved.

Happy Coding!
