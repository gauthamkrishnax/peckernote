# Pecker Note API server

API for Peckernote, a simple note making web app.

---

### **_CRUD_**

- Fetch Notes - **GET** Request to `/notes`

- Create Note - **POST** Request to `/note`

  - Body:

  ```javascript
    {
        "title": "Note title..."
        "content": "Note content..."
    }
  ```

- Update Note - **PUT** Request to `/note`

  - Body:

  ```javascript
    {
        "_id": "Note ID" //Mongo Object.ID("...")
        "title": "Note title..."
        "content": "Note content..."
    }
  ```

- Delete Note - **DELETE** Request to `/note`
  - Body:
  ```javascript
    {
        "_id": "Note ID" //Mongo Object.ID("...")
    }
  ```

---

### **_Authentication_**

- Sign Up / Log in Button Route - **GET** Request to `/google`

- Callback URL - **GET** Request to `/google/callback`

- Auth failure - **GET** Request to `/authFail`

- Logout - **GET** Request to `/logout`

---
