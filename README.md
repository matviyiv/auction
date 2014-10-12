#Auction Room.

## Running application
Before running the application make sure that node is installed.
```
node -v
```

To get all the dependencies use 
```
npm install
```

To start server use
```
npm start
```

## Project architecture
* Folder "bin" is the entrance point for NodeJS ;
* ./app.js contains all the settings and middleware for ExpressJS;
* ./settings.js should contain all the externall settings and envirovement settings for the server;
* Folder "views" should contain all html code:
*- "partials" contains extendable structure for SPA;
*- "layouts" contains general page structure;
* "routes" contains clean server API description;
* "public" client side code;