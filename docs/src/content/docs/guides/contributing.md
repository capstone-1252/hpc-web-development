---
title: Contributing Through Github
description: How to effectively commit and merge code with the teamd
---
# Collaboration Workflow

- We will use the official method provided by github: [Github Flow](https://docs.github.com/en/get-started/using-github/github-flow) 

You can use either the github CLI or Github Desktop, the methodology won't change

1. All work will be done in seperate feature branches.  Never on the main branch.  This is to keep work seperate and to minimize conflict in production.
2. After the changes are made, and pushed to your branch, a pull request should be opened. This can be done on github.
3. After a pull request is opened, a code review will happen, any changes needed to be done will be written in the comments.
4. After all fixes are done, the feature will be merged into the main branch.

    These are the steps needed to do this effectively.

    1. Clone the repo with `git clone <url>`
    2. Checkout a new branch off main: `$ git checkout -b my-feature`
    3. Commit as frequently as you can - this usually is after every change you make. Make sure commit messages are meaningful and descriptive.
        - For example: "add helper function to extract price from product" or "fix typo"
        - Never have a commit message that just says "some updates"
    4. Push code to your branch: `$ git push origin my-feature`
    5. Then the code review process will start.
    6. Finally the code is merged into main and the changes should be live in production

### Final step after all work is done is to delete your branch.

## Issues

Issues can help track bugs or improvements needed in the project as it grows in complexity.  Github provides a nice way of sumbitting these and it helps keep record of things that we have fixed.

1. When you find a bug or think of an improvement / feature, you can open an Issue in github: [Github Docs](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues) 
2. Select one of the provided issue templates, if you want to add another there are plenty found [Here](https://github.com/topics/issue-templates) 
3. Fill out the necessary information, and choose the proper tags: bug | feature | improvement
4. If an issue is fixed, you can link the Issue number in the PR title to close out an issue at the same time:
- Example: Fixes bug ABC: Issue #1234


## Github Workflows & Testing
Once a client and tech stack has been decided, it is helpful to include end to end testing to ensure that the data is being represented correctly.  The Lead Developer will be the main person to write these workflows and tests but other team members are encouraged to add whatever it is they think would help.  

The reasoning for this is to make the development -> production workflow fully tested in all environments and make sure the production build doesn't break for our client sometime in the future
