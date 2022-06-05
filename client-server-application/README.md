# Client-Server Application

Project developed during classes at Bootcamp Hiring Coders 3 VTEX, from Gama Academy.

## CLIENT AND SERVER MODEL

### CLIENT

- Uses network resources;
- Make requests to the server;
- Waits for and receive responses from the server.

### SERVER

- Provides network resources;
- Receives requests;
- Responds by running services or providing registers.

## THE APPLICATION 🦸‍♀

This application makes it possible to request a list of IDs and then a series of records for each ID. Through **GraphQL** it is possible to create a query that extracts all the data in a single call of API.

The concepts covered were:

- GRAPHQL;
- Hooks;
- Components;
- Properties;
- State;
- Routes (with react-router-dom);
- Requests to external APIs (with express);
- Events;
- Handling errors and user experience.

## To Run the application

Just run the following commands in the project root:

```
pnpm install
pnpm --filter @dev-demands/server run start
pnpm --filter @dev-demands/web run start
```
