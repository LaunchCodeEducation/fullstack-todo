# Simple Fullstack ToDo with Vanilla JavaScript Client and NodeJS/Express API

# Usage

> directory structure

```sh
README.md
run.sh
src/
  api/
  client/
```

## requirements

- Linux: Docker Engine
- Mac/Windows: Docker for Desktop
  - runs a Linux VM with Docker Engine
- minimum required Docker Engine version: `19.x`

> enter the following command in your Terminal to ensure you have the requirements

> if you are using Docker for Desktop make sure it is running before issuing this command

```sh
$ docker version

# expected output
Client: Docker Engine - Community
 Version:           19.x+
 API version:       1.4+
 ...

Server: Docker Engine - Community
 Engine:
  Version:          19.x+
  API version:      1.4+ (minimum version 1.x)
  ...
```

## Running the Application

> if your Docker Engine version is compatible enter the following command to start the application (both the Client and API)

```sh
$ bash run.sh
```

> then open your browser to `http://localhost:3000`

## Developing / Modifying the Application

> install the API dependencies

```sh
$ cd src/api
$ npm i
```

> run the API server in watch mode (will restart whenever a change to the code is saved)

```sh
npm run dev
```

> serve the static Client content from VSCode using the LiveServer extension

> or serve the static Client content using Python (requires version 3+)

```sh
$ python -m http.server -d src/client/src 3000
```

> then open your browser to `http://localhost:3000`

# Components

Both the Client (Frontend) and API (Backend) follow an on-the-nose MVC architecture and component design to help illustrate the respective separation of concerns. The Client and API Components are architecturally (served) separately from each other and communicate through HTTP (AJAX) requests. The terms Architecture and Design are defined in this document as follows:

> **Architecture** refers to the external infrastructure or how the components of a system are hosted and communicate with each other

> **Design** refers to the internal structure of a code base and the semantics of how its modules communicate with each other

# MVC (Client + API) Architecture

## Client

The Client code base serves as the View layer. It is concerned with the presentation of data in the browser UI. It's responsibilities include:

- rendering (styling and display) of data received from the Controller
- utilizing JavaScript to capture actions the user makes and communicating them to the Controller

## API

The API code base serves as both the Model and Controller layers.

## The Model layer

The Model layer is concerned with how data is stored and managed. It's responsibilities include:

- converting instructions received from the Controller into CRUD operations on data
  - **C**reate: creating / storing data
  - **R**ead: retrieving stored data
  - **U**pdate: updating stored data
  - **D**elete: deleting stored data
- communicating data and data modification results (successful or failed) to the Controller

## The Controller Layer

The Controller layer is the mediator that binds communication between the Model and View layers. We will explore the responsibilities of the Controller layer by separating the two sides it binds.

### For data actions sent from the View to the Controller

The Controller's responsibilities include:

- providing the interface for the access and management of data
  - for a web API these are server routes (a path and a method) that process an action a user may take on the data
  - the behavior and organization of these routes typically follow a well established web API specification like REST or GraphQL for consistency and extendability but may be "hand rolled" according to a custom specification

> the interface becomes an agreed upon "contract" upheld by the Controller that the View layer will use to communicate user driven actions to be taken on the Model data

The View supports the Frontend side of the contract by:

- keeping the AJAX requests it sends to the Controller when a user takes an action

The Controller supports the Backend side of the contract by:

- keeping its routes and behavior consistent for receiving and handling action requests sent from the View
  - authentication and authorization of the request
  - validating the request (according to the requirements of the contract)
  - formatting and issuing data action instructions to the Model layer

### For data and information received from the Model layer after issuing an instruction

The Controller's responsibilities include:

- controlling how responses are sent back to the View from its routes

  - shaping and delivering data from the Model when a (R)ead instruction is given
  - shaping and delivering information describing the success or failure of a non-read (CUD) instruction

## Implementation Freedom

Using a Client and API MVC architecture "physically" separates the presentation (View) from the management layers (Controller and Model) of data. As long as the interface (contract) does not change then the implementation details of the Client (Frontend) and API (Backend) developers will not affect each other

> Frontend developers can choose or change the internal styling, libraries, frameworks and design patterns as long as they continue to send the same AJAX requests to the API routes

> Backend developers can choose or change the internal server language, libraries, frameworks and design patterns as long as they continue to support the same API routes and behavior

> Both sides can choose or change their external hosting infrastructure at any time without affecting the other

> Both sides can make and deploy changes to their code bases at any time without needing to coordinate with or wait for the other

> only when a change must be made to either the Frontend AJAX requests or Backend routes and behavior do the two teams need to communicate and agree upon a new contract

# MVC Design

## Client (Frontend)

## API (Backend)
