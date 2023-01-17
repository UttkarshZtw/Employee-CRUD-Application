# Employee Management system

## Parts 👩‍👩‍👧‍👦

1. FrontEnd - Angular
2. Backend - Node.js
3. Database - MongoDb

### Getting started 🚀

1. Clone the repo by using `git clone <repo url>`

2. Navigate to each of the subrepo i.e. [Backend](./crudBackend) and [FrontEnd](./crudFrontend/) and type `npm install` to install the dependency and packages

3. Start the **Backend** and **Frontend** Seperately by typing `npm start`. The frontend would run on `https://localhost:8200` and backend would run on `https://localhost:3000`

### Backend Routes

Endpoints are mentoined below

- `/` - METHOD `GET` Getting all the employees

- `/` - METHOD `POST` Getting all the employees
  payload :
  ```json
  {
  "employeeId" : Number,
  "name" : String,
  "salary" : Number,
  "dateOfBirth" : Date,
  "skills" : Array,
  "photo" : String
  }
  ```
- `/:id` - METHOD `GET` Getting the particular employee data

- `/:id` - METHOD `PUT` Updating the particular employee data

- `/:id` - METHOD `DELETE` Delete the particular employee data

- `/search/employee?filter=keyword&page=pageNumber&limit=limitNumber` - METHOD `GET` Getting the 
employees with respective parameters 

- `/employee/delete/:id` - METHOD `GET` Soft delete a particular employee 

### Pending Tasks 👁

- Bug fixes

- some angular learning stuffs(must do 🛑)

### Bugs to be fixed 

- Remove the employeeCount collection 
