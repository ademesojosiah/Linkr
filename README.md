# OURPASS_CAPSTONE

Oupass Backend task

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)</a>
<a href="">![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)</a>
<a href="">![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)</a>

</div>

<div align="center">

<a href="">![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)</a>
<a href="">![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)</a>

</div>

## Useful Links.

- [Postman Documentation](https://documenter.getpostman.com/view/26999767/2s93Y6sJkQ)

---

## Basic Features

- Login
- Registration
- Inventory List
- Inventory creation
- Unit test case for all functions and apis

---

## User

| field            | data_type | constraints      |
| ---------------- | --------- | ---------------- |
| email            | string    | required, unique |
| username         | string    | required, unique |
| password         | string    | required         |
---

### Signup User

- Route: auth/signup
- Method: POST
- Body:

```
{
    "username":"josiah",
    "email":"joj@gmail.com",
    "password":"secret123"
}
```

- Responses

Success

{
    "message": "Account created succesfully",
    "user": {
        "_id": "64979456edc53fe97a2908a8",
        "username": "josiahh",
        "email": "jo@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDk3OTQ1NmVkYzUzZmU5N2EyOTA4YTgiLCJ1c2VybmFtZSI6Impvc2lhaGgiLCJlbWFpbCI6ImpvQGdtYWlsLmNvbSIsImlhdCI6MTY4NzY1NTUxMSwiZXhwIjoxNjg3NjU5MTExfQ.yVMDBv9Q2kKwlAY8NtLgL4rZepRBseHBG-7s4tS7irk"
}
```

- Response statusCodes

```javascript
  - 201: success || Created
  - 401: error || Unauthorized error
  - 400: error || Bad Request
  - 500: error || Internal Server Error
```

---

### Login User

- Route: auth/login
- Method: POST
- Body:

```
{
    "email":"jojo@gmail.com",
    "password":"secret123"
}
```

- Responses

Success

```
 "user": {
        "_id": "648a0bffe1990ac0fabec60f",
        "username": "josiah",
        "email": "jojo@gmail.com",
        "password": "$2b$10$Vj6SKvXd3hsEhs1sj16CHOiweY7/BMndomJV0Xqhyhsk2ReQ5o8Yq",
        "createdAt": "2023-06-14T18:50:39.076Z",
        "updatedAt": "2023-06-14T18:50:39.076Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDhhMGJmZmUxOTkwYWMwZmFiZWM2MGYiLCJ1c2VybmFtZSI6Impvc2lhaCIsImVtYWlsIjoiam9qb0BnbWFpbC5jb20iLCJpYXQiOjE2ODc2NTU2MzIsImV4cCI6MTY4NzY1OTIzMn0.YG-XFEUdNZtEWCEC5TjprLa7a5LH4RdAjajQZbLEKlU"
}
```

---

### Inventory

| field           | data_type | constraints | 
| --------------- | --------- | ----------- |
| originalLink    | string    | required    |
|customLink        | enums     | optional   | 
               

---

## Link Routes

---

### create a link -Pubished (logged in users only )

- Route: /create
- Method: POST
- Header
  -authorization : Bearer {token}
- Body:   
{
    "originalLink":"http://www.facebook.com"
}                                          |
- Responses

Success

```
{
    "originalLink": "http://www.gmail.com",
    "shortLink": "http://localhost:3333/foWNxT",
    "userId": "648a0bffe1990ac0fabec60f",
    "clicks": 0,
    "_id": "6497965cedc53fe97a2908ab",
    "createdAt": "2023-06-25T01:20:28.078Z",
    "updatedAt": "2023-06-25T01:20:28.078Z",
    "__v": 0
}
```



---

### Delete a link (logged in users only )

- Route: /api/link/:id
- Method: DELETE
- Header
  -authorization : Bearer {token}
- Responses

Success

```
{
    "raw": [],
    "affected": 1
}


```

---

### Get all Inventories ( users only )

- Route: /api/links
- Method: GET
- Header:
  -authorization : Bearer {token}

- Responses

Success

```
{
[}
}
```



### Get inventory by id (logged in users only )

- Route: /api/link/:id
- Method: GET
- Header
  -authorization : Bearer {token}
- Responses

Success

```
{
    "originalLink": "http://www.gmail.com",
    "shortLink": "http://localhost:3333/foWNxT",
    "userId": "648a0bffe1990ac0fabec60f",
    "clicks": 0,
    "_id": "6497965cedc53fe97a2908ab",
    "createdAt": "2023-06-25T01:20:28.078Z",
    "updatedAt": "2023-06-25T01:20:28.078Z",
    "__v": 0
}
```

## Contributors

- Josiah Ademeso (monte carlo)
