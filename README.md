# Node-Express
Node/Express/MongoDB/Pug

## What is this?
This is just a test project using Express and NodeJS to build a REST API that grabs data from a MongoDB.
Pug/Jade, server-side rendered HTML, is also used on some API endpoints for quick data visualization

## What it does so far
- The server intercepts all requests and checks for an Authorization header with a bearer token. It then validates that a user in the database has this token before the request is allowed through
- Grabs, removes, and places data into the badges collection in Mongo
- Modular File Structure
- API Endpoints ready for an application to access, and some server generated HTML pages visualizing real data that can be acccessed from the server itself

## How to use
1. Clone this repository
2. cd into the folder where you stored the project
3. Run the command: ```npm install```
4. Run the command: ```npm start```
  - This will start the live-reload server, which means the server will restart whenever you save a file directly affecting the server's functionality
  
## Applicationless Testing
You can now reach out to this API if you send a valid Bearer Token in the Authentication header. 
If you want to just visualize data with no application, follow these instructions:
  1. Go in to index.js
  2. Find this section of code
```javascript
      app.use((req, res, next) => {
        let _authService = new AuthService(db);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');

        if(req.method == 'OPTIONS'){
          res.status(200).send({message: "Preflight check successful"});
        }

        if(req.headers.authorization){
          let bearer = req.headers.authorization.split(`Bearer `)[1];
        _authService.verifyToken(bearer, (data) => {
          if(data) next();
          else res.status(401).send({message: "Not Authenticated"});
        });
        } else {
        res.status(401).send({message: "Not Authenticated."})
        next();
        }
      })
   ```
  3. Under the line   ```let _authService = new AuthService(db);```, place the following: ```req.headers['authorization'] = 'Bearer 12345'```
  4. Now, after the server has started, in your browser navigate to ```localhost:3000/home``` and you should see a list of badges directly from the database!

## To Do
1. Login System
2. Relational data (1 -> many, many -> many) to associate items with users

