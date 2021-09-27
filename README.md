# st-2-rest-api

## Installation

```json
$ npm install
```

## Running the app

```json
$ npm run start
```

## Drop tables

```json
$ npm run schema:drop
```

## Seeding tables

```json
$ npm run seeder:run
```

## Usage

- **User**

  - [Get User](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#get-user)
  - [Get Users](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#get-users)
  - [Create User](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#create-user)
  - [Delete User](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#delete-user)
  - [Update User](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#update-user)

- **Group**
  - [Get Group](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#get-group)
  - [Get Groups](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#get-groups)
  - [Create Group](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#create-group)
  - [Delete Group](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#delete-group)
  - [Update Group](https://git.epam.com/andrei_posakhau/st-2-rest-api/-/tree/task-6-3#update-group)

---

## **Get User**

Returns data about user.

<details>

- **URL**

  /api/user:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[uuid]`

* **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```typescript
    [
      {
        id: "b8ec561e-af57-412e-b5c1-90b4e76f9fe8",
        login: "admin1",
        password: "admin1",
        age: 14,
        isDeleted: false,
      },
    ];
    ```

* **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "user not found"
    ```

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    "User deleted, please try another request"
    ```

</details>
<br>

---

## **Get Users**

Returns data about sort users.

<details>

- **URL**

  /api/user

- **Method:**

  `GET`

- **URL Params**

  None

- **Query Params**

  **Optional:**

  `loginSubstring=[integer]`

  `limit=[integer]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```typescript
    [
      {
        id: "b8ec561e-af57-412e-b5c1-90b4e76f9fe8",
        login: "admin1",
        password: "admin1",
        age: 14,
        isDeleted: false,
      },
    ];
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "users not found"
    ```

</details>
<br>

---

## **Create User**

Creates a new user.

<details>

- **URL**

  /api/user

- **Method:**

  `POST`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      "login": "admin1",
      "password": "admin1",
      "age": 14,
    }
  ```

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**
    ```typescript
      {
        "id": "f50e4d76-cae2-443a-8869-1d98b857d5b5",
        "login": "new-useazr1",
        "password": "111111qqqq",
        "age": 13,
        "isDeleted": false
      }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    "user already exists, please try another login"
    ```

</details>
<br>

---

## **Delete User**

Change isDeleted on false

<details>

- **URL**

  /api/user/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      "login": "admin1",
      "password": "admin1",
      "age": 14,
    }
  ```

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    "User :id deleted"
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "User deleted, please try another request"
    ```

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "user not found"
    ```

</details>
<br>

---

## **Update User**

Updates user.

<details>

- **URL**

  /api/user/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      "login": "11newa122s222",
      "password": "11newa12222",
      "age": 13
    }
  ```

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**

    ```json
    "User updated"
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "User not found"
    ```

</details>
<br>

---

## **Get Group**

Returns data about group.

<details>

- **URL**

  /api/group:id

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `id=[uuid]`

* **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```typescript
    [
      {
        id: "b8ec561e-af57-412e-b5c1-90b4e76f9fe8",
        name: "developer",
        permissions: ["DELETE", "READ", "WRITE"],
      },
    ];
    ```

* **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "Group not found"
    ```

</details>
<br>

---

## **Get Groups**

Returns data about sort groups.

<details>

- **URL**

  /api/group

- **Method:**

  `GET`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```typescript
    [
      {
        id: "b8ec561e-af57-412e-b5c1-90b4e76f9fe8",
        name: "developer",
        permissions: ["DELETE", "READ", "WRITE"],
      },
      {
        id: "28ec561e-af57-412e-b5c1-90b4e76f9fe8",
        name: "user",
        permissions: ["WRITE"],
      },
    ];
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "Groups not found"
    ```

</details>
<br>

---

## **Create Group**

Creates a new group.

<details>

- **URL**

  /api/group

- **Method:**

  `POST`

- **URL Params**

  None

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      name: "user",
      permissions: ["READ"],
    },
  ```

- **Success Response:**

  - **Code:** 201 CREATED <br />
    **Content:**

    ```typescript
      {
        id: "28ec561e-af57-412e-b5c1-90b4e76f9fe8",
        name: "user",
        permissions: ["READ"],
      }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />
    **Content:**

    ```json
    "Group already exists, please try another name"
    ```

</details>
<br>

---

## **Delete Group**

Remove group (hard delete – group data is fully removed from the DB)

<details>

- **URL**

  /api/group/:id

- **Method:**

  `DELETE`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      id: "28ec561e-af57-412e-b5c1-90b4e76f9fe8",
    }
  ```

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**
    ```json
    "User deleted"
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "Group not found"
    ```

</details>
<br>

---

## **Update Group**

Updates group.

<details>

- **URL**

  /api/group/:id

- **Method:**

  `PUT`

- **URL Params**

  **Required:**

  `id=[integer]`

- **Query Params**

  None

- **Data Params**

  ```typescript
    {
      name: "user",
      permissions: ["READ"],
    }
  ```

  or

  ```typescript
    {
      groupIds: "23rtc561e-aqw4-412e-b5c1-e76f9ff9fe8",
      userIds: ["28ec561e-af57-412e-b5c1-90b4e76f9fe8", "qweec561e-aqw4-412e-b5c1-90b4e76f9fe8"],
    }
  ```

- **Success Response:**

  - **Code:** 200 OK <br />
    **Content:**

    ```json
    "Group updated"
    ```

- **Error Response:**

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    "Group not found"
    ```

</details>
<br>

---
