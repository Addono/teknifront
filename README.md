<div align="center">
<p align="center">
  <a href="https://gitlab.com/ioteknikringen/teknifront" rel="noopener">
    <img width=200px height=200px src="./src/logo.png" alt="Project logo">
  </a>
</p>

<h3 align="center">TekniFront</h3>
  <a href="https://gitlab.com/ioteknikringen/teknifront/builds">
  <img alt="GitLab pipeline" src="https://img.shields.io/gitlab/pipeline/ioteknikringen/teknifront?style=for-the-badge" />
  </a>
  <a href="./LICENCE">
    <img alt="License" src="https://img.shields.io/badge/Licence-MIT-green?style=for-the-badge" />
  </a>
</div>

---

<p align="center"> The front-end of the TekniLight project.
    <br> 
</p>

## 📝 Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>
This is the user-facing front-end of the TekniLight project. It can be used to announce state updates of the lights, which will be picked up by the [TekniBridge](https://gitlab.com/ioteknikringen/teknibridge).

![screenshot](./docs/img/screenshot.png)

## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Prerequisites
You need to have [Yarn](https://yarnpkg.com/en/docs/install) installed to use this repository.

### Installing
First we need to install all dependencies, run:
```bash
yarn install
```

To start the development environment, run:
```bash
yarn start
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload whenever you save any file and display potential compilation errors.


## 🔧 Running the tests <a name = "tests"></a>
After setting up the development environment, tests can be invoked using:
```bash
yarn test
```
This launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## 🎈 Usage <a name="usage"></a>
Execute 
```bash
yarn build
```
Which builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the Create-React-App documentation about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 🚀 Deployment <a name = "deployment"></a>
Deploy the static files to a CDN. We would recommend using continious deployment to automate this process, e.g. by using [Zeit Now](https://zeit.co/now) which shouldn't need any configuration to setup.


## ⛏️ Built Using <a name = "built_using"></a>
- [React](https://reactjs.org/) - Frontend Framework
- [MQTT](https://mqtt.org/) - Backend Communication Protocol
- [Gitlab](https://gitlab.com) - VCS and Continuous Integration
- [Zeit Now](https://zeit.co/now) - CDN and Continuous Deployment

## ✍️ Authors <a name = "authors"></a>
- [Adriaan Knapen](https://aknapen.nl) [![Addono@Gitlab](https://img.shields.io/badge/Gitlab-@Addono-orange?style=for-the-badge&logo=gitlab)](https://gitlab.com/Addono) [![Addono@Github](https://img.shields.io/badge/Github-@Addono-black?style=for-the-badge&logo=github)](https://github.com/Addono)
- [Andrés Prieto Yanes](https://andrespy.gitlab.io) [![andrespy@Gitlab](https://img.shields.io/badge/Gitlab-@andrespy-orange?style=for-the-badge&logo=gitlab)](https://gitlab.com/andrespy) [![andrespy@Github](https://img.shields.io/badge/Github-@andrespy-black?style=for-the-badge&logo=github)](https://github.com/andrespy)

## 🎉 Acknowledgements <a name = "acknowledgement"></a>
- Thank you React community for all the awesome packages you made!
