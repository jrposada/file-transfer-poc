# Resources
- [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- jq
# Environment Details

# Making Changes

1. Clone repository.
2. Run `npm install & npx husky`.
3. Branch from `main`.
4. Follow [conventional commits](https//www.conventionalcommits.org/env/v1.0.0/#summary) when committing changes.
5. Open a PR to `main`.
6. Release version updates are handled by `semantic-release`. Package will be automatically published when needed.

# Testing

-   Check types by running `npm run lint:types` Use utils test types to verify your types work as expected. e.g.: [with-required](./src/easy/with-required.d.ts).
-   Run unit tests `npm run test:coverage`. This will check all test and measure coverage. For live development you can use `npm run test`. This repository has configured a minimum coverage of 80%.
-   Run Prettier `npm run lint:format`. This will check code formatting.
-   Run ESLint `npm run lint:eslint`. This will check code conventions.

# Local deploy

Deploy the app to test enviromnet by running

```shell
npm run deploy:backend -- -- --aws-profile <profile>
```

# Utility scripts (/scripts)

# AWS Credentials
To test app functionality you will need access to an AWS account. If you do not have one you may request one to be created.

You can refresh you local AWS credentials by running the following command. Make sure to update the profile name to match one configured in your local machine.

```shell
./scripts/login.sh
```

## How to create a User

1. Go to IAM Identity Center
2. Got to Users section and select Add user
3. Fill username and click Next
4. Add new user to group AWSClientDeveloper
5. User should receive an email to setup their password and do their first login.
6. For subsequent access the will need IAM Identity Center's AWS access portal URL

## Configure AWS CLI

1. Install [AWS cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). Don't forget to remove installer folder once you are done.

2. Configure AWS CLI with IAM Identity Center profile

    ```shell
    aws configure sso
    ```

    ```shell
    SSO session name (Recommended): jrposada-sso
    SSO start URL [None]: <url>
    SSO region [None]: eu-west-3
    ```

    Choose AWSClientDeveloper role and eu-west-3 region when prompted.

    For the profile name you can use whatever you prefer. For this guide we have used aws-client-dev

    Run aws dynamodb list-tables --profile aws-client-dev to test your setup.

    If everything goes correctly you should see a list of DynamoDB tables and you ~/.aws/config file should look something like:

    ```shell
    [profile aws-client-dev]
    sso_session = jrposada-sso
    sso_account_id = <account-id>
    sso_role_name = AWSClientDeveloper
    region = eu-west-3
    output = json

    [sso-session jrposada-sso]
    sso_start_url = https://d-806701903d.awsapps.com/start/#
    sso_region = eu-west-3
    sso_registration_scopes = sso:account:access
    ```

## Help
