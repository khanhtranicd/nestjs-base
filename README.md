<div id="top"></div>
<!-- PROJECT LOGO -->
<br/>
<div align="center">
  <a href="https://git.icd-vietnam.com/icd-vietnam/icdvn-internal-system">
    <img src="public/dist/img/logo.svg" alt="Logo" width="160" height="160">
  </a>
  <h3 align="center">MULTIPLE STORES SYSTEM</h3>
  <p align="center">
    <a href="https://git.icd-vietnam.com/icd-vietnam/icdvn-internal-system/-/blob/integrate/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
  </p>
</div>

![Gcloud CLI](https://img.shields.io/badge/Gcloud%20CLI-download-orange) ![NodeJS](https://img.shields.io/badge/NodeJS-V14-blue) ![NestJs](https://img.shields.io/badge/NestJS-V8-lightgrey) ![TypeScript](https://img.shields.io/badge/TypeScript-x%-red) ![CSS](https://img.shields.io/badge/CSS-x%-orange) ![HTML](https://img.shields.io/badge/HTML-x%-yellowgreen) ![Javascript](https://img.shields.io/badge/Javascript-x%-lightgrey)
<br/>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#migrations">Migrations</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#support">Support</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

### Built With
<div id="built-with"></div>

* [GCP](https://cloud.google.com/docs)
* [NestJs](https://docs.nestjs.com/)
* [MySQL](https://dev.mysql.com/doc/)
  <p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started
<div id="getting-started"></div>

To get a local copy up and running follow these simple example steps.

### Prerequisites
<div id="prerequisites"></div>

1. Install NodeJS version >= 14.x.x <br>
[Click here!](https://nodejs.org/en/download/)

2. Install MySQL<br>
[Click here!](https://www.mysql.com/downloads/)

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation
<div id="installation"></div>

1. Install node modules
   ```sh
    npm install
2. Running the app
   ```sh
    # Development mode
    npm run start
    # Watch mode
    npm run start:dev
    # Production mode
    npm run start:prod
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Migrations
<div id="migrations"></div>

1. Create ormconfig.json - copy from ormconfig.example.json file<br>
2. Update your mysql connection such as host, port, username, password, database and logging.<br>
3. Command to create new migration version

    ```sh
      npm run migration:create <migration_name>
    ```

4. Command to generate migration version from class entities
    ```sh
      npm run migration:generate <migration_name>
    ```

5. Command to apply all migration versions to database
    ```sh
      npm run migration:run
    ```
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
### Usage
<div id="usage"></div>
_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#top">back to top</a>)</p>


### Support
<div id="support"></div>

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).
<p align="right">(<a href="#top">back to top</a>)</p>

### License
<div id="license"></div>

Nest is [MIT licensed](LICENSE).
<p align="right">(<a href="#top">back to top</a>)</p>