## Description

A company called **seedingfund** that fund projects and looking to create projects management
system. Users will be able to register, login, send a funding request with their project details and check the status of the funding request of the project. Admins should login and see all funding requests.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Routes

## Authentication

* Endpoint: **POST (/register)**

```
Request: Body as JSON
Body {
    username: string;
    email: string;
    password: string;
}

Response: {accessToken}
```


* Endpoint: **POST (/login)**

```
Request: Body as JSON
Body {
    email: string;
    password: string;
}

Response: {accessToken}
```

* Endpoint: **POST (/admin/login)**

```
Request: Body as JSON
Body {
    email: string;
    password: string;
}

Response: {accessToken}
```

## Admin

* Endpoint: **GET (/admin/viewfundrequest)**

```
Request: Body Null

Response: {
    _id: string;
    username: string;
    projects: Projects[];
}
```

* Endpoint: **PUT (/admin/changefundstatus)**

```
Request: Body as JSON
Body {
    userId: string;
    projectId: string;
    status: pending or rejected or accepted
}

Response: Null
```


## Project Owner


* Endpoint: **GET (/projectowner/viewfundrequest)**

```
Request: Request header must contain a valid token

Response: Projects[]
```

* Endpoint: **POST (/projectowner/createfundrequest)**

```
Request: Body as JSON
Body {
    name: string;
    description: string;
    sector: IT or Financials or Industrials or Energy or Health Care
}

Response: Null
```