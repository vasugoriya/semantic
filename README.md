Title: Automating Versioning and Releases with Semantic-Release

1. Introduction
   In today's fast-paced software development landscape, efficiently managing versioning and releases is crucial for maintaining a smooth and organized workflow. Manually handling these tasks can be time-consuming, error-prone, and lead to inconsistencies. This is where semantic-release comes into play. Semantic-release is a powerful tool that automates the versioning and release process, making it easier for development teams to focus on writing quality code while ensuring consistent and meaningful releases.

2. Semantic Versioning
   Before diving into semantic-release, it's important to understand the concept of semantic versioning. Semantic versioning is a widely adopted versioning scheme that conveys the nature and impact of changes in each release. It follows the format MAJOR.MINOR.PATCH, where:
   - MAJOR version: Indicates significant changes that may break backward compatibility.
   - MINOR version: Represents the addition of new features or functionality without breaking existing code.
   - PATCH version: Denotes bug fixes and minor improvements that do not affect functionality.


4. Commit Message Conventions
   To leverage the full potential of semantic-release, it's essential to follow a consistent commit message convention. One popular convention is the Angular commit message convention, which provides a structured format for writing meaningful and descriptive commit messages. The convention defines different types of commits, such as:
   - feat: Introduces a new feature
   - fix: Represents a bug fix
   - patch: Small Patch deployment

   By prefixing commit messages with these types, semantic-release can accurately determine the appropriate version increment and generate informative release notes.

5. Configuring Semantic-Release
   To set up semantic-release in our project, we need to follow a few configuration steps. First, install the semantic-release package as a development dependency in our project using npm or yarn. Then, create a configuration file named `.releaserc.json` in the root directory of our project. This file specifies the plugins, branches, and other settings for semantic-release.

   Here's our configuration file:

   ```json
    {
    "branches": ["main"],
    "plugins": [
      ["@semantic-release/commit-analyzer", {
        "preset": "angular",
        "releaseRules": [
            {"type": "feat", "release": "major"},
            {"type": "fix", "release": "minor"},
            {"type": "chore", "release": "patch"},
            {"type": "docs", "release": "patch"},
            {"type": "style", "release": "patch"},
            {"type": "refactor", "release": "patch"},
            {"type": "perf", "release": "patch"},
            {"type": "test", "release": "patch"}
        ]
      }],
      "@semantic-release/release-notes-generator",
      "./incremental-release.js",
      ["@semantic-release/github", {
        "success": false
      }]
    ]
    }
   ```

6. Workflow Integration
   We have configured semantic-release to run on Github Action whenever a commit is pushed to the designated release branch.

   ```yaml
    name: Semantic Release

    on:
    workflow_call:
        secrets:
        GH_TOKEN:
            required: true

    permissions:
    contents: write
    issues: write

    jobs:
        release-tags:
            runs-on: ubuntu-latest
            
            steps:
            - name: Checkout code
            uses: actions/checkout@v3
        
            - name: Set up Node.js
            uses: actions/setup-node@v3
            with:
                node-version: '20'
        
            - name: Install dependencies
            run: npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github
        
            - name: Release
            env:
                GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
            run: npx semantic-release
   ```

   In our release tag template, terraform will run first and then semantic-release is executed to handle the versioning and release process. It will release tag with specific version

7. Automating Releases
   With semantic-release integrated into our workflow, the release process becomes fully automated. When a feature branch is merged into the main branch, semantic-release analyzes the commit messages since the last release and determines the appropriate version increment based on predefined rules.

   If a new version is needed, semantic-release performs the following steps:
   - Increments the version number based on the commit messages
   - Generates a changelog and release notes from the commit history
   - Creates a new release on the version control platform (e.g., GitHub)

   This automation ensures consistent and reliable releases, saving time and reducing human error.

   In our repository, the workflow is structured as follows:
   1. Changes are made in feature branches, triggering a feature pipeline on push.
   2. After a successful feature pipeline run, the branch is merged into the main branch.
   3. The main branch triggers the dev pipeline.
   4. After a successful dev pipeline run, the QA pipeline is triggered when the pull request is merged.
   5. The QA pipeline includes a new stage that generates a new tag upon successful completion of the Terraform apply stage.
   6. The stage and prod pipelines are configured to run only on newly released tags, ensuring that only approved changes are deployed to these environments.

   By following this automated release process, you can ensure that each release is properly versioned, documented, and traceable. The semantic tagging structure provides a clear history of our terraform code.
