## Resources

## Environment Details

## Making Changes

1. Clone repository.
2. Run `npm install & npx husky`.
3. Branch from `main`.
4. Follow [conventional commits](https//www.conventionalcommits.org/env/v1.0.0/#summary) when committing changes.
5. Open a PR to `main`.
6. Release version updates are handled by `semantic-release`. Package will be automatically published when needed.

## Testing

-   Check types by running `npm run lint:types` Use utils test types to verify your types work as expected. e.g.: [with-required](./src/easy/with-required.d.ts).
-   Run unit tests `npm run test:coverage`. This will check all test and measure coverage. For live development you can use `npm run test`. This repository has configured a minimum coverage of 80%.
-   Run Prettier `npm run lint:format`. This will check code formatting.
-   Run ESLint `npm run lint:eslint`. This will check code conventions.

## Utility scripts (/scripts)

## Help
