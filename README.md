<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/badge/twitter-follow-1DA1F2?logo=twitter&logoColor=white" alt="Twitter"/></a>
</p>

## Features and Enhancements

This project includes the following key features and enhancements:

* **Open Dialogue System**: A new system for managing open dialogues has been integrated, including dedicated database models and application modules.
* **Enhanced Authentication Flows**:
  * **Robust Email Verification**: Improved email verification process with better user feedback, logging, and dynamic redirection.
  * **Secure Password Reset**: Enhanced password reset functionality with more secure token handling and improved email templates.
* **Flexible Application Configuration**:
  * **Configurable Application Port**: The application port can now be configured via environment variables, improving deployment flexibility.
  * **Advanced CORS Configuration**: Implemented a more robust and secure Cross-Origin Resource Sharing (CORS) setup, including dynamic origin handling and custom middleware.
* **Modern TropiPay Integration**: The TropiPay payment gateway integration has been refactored for improved reliability, logging, and error handling, utilizing a newer API version (`TropiPayV3Service`).
* **Optimized Data Transfers**: Enhanced efficiency in data transfer operations by optimizing database queries.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

* Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
* Website - [https://nestjs.com](https://nestjs.com/)
* Twitter - [@nestframework](https://twitter.com/nestframework)

## Finalizing the `main` and `develop` Synchronization

**⚠️ Warning: The following steps are destructive and will overwrite the history of the `main` branch. Only proceed after you have thoroughly tested the `develop` branch and are certain it is stable and correct.**

Once you have deployed and validated that the `develop` branch is working as expected, follow these steps to complete the synchronization with the `main` branch:

1.  **Ensure your local `develop` branch is up to date:**
    ```bash
    git checkout develop
    git pull origin develop
    ```

2.  **Switch to the `main` branch:**
    ```bash
    git checkout main
    ```

3.  **Reset the `main` branch to match `develop`:** This command makes your local `main` branch identical to your local `develop` branch.
    ```bash
    git reset --hard develop
    ```

4.  **Force-push the updated `main` branch to the remote repository:** This will overwrite the remote `main` branch with your newly synchronized local version.
    ```bash
    git push origin main --force
    ```

5.  **Clean up the temporary branches:** Now that `main` and `develop` are synchronized, you can safely delete the unification branch and the backup branches you may have created.
    ```bash
    # Delete the local unification branch
    git branch -d feature/unify-main-develop

    # Delete the remote unification branch (if you pushed it)
    git push origin --delete feature/unify-main-develop
    ```

## License

Nest is [MIT licensed](LICENSE).
