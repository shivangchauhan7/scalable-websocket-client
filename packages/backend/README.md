# Backend

This is where all the magic happens.

## Features

- HTTP API
- Client can create a new websocket connection, with HTTP headers
- Client can send messages via a websocket connection
- Messages received from websocket connection are pushed to correspoding client

## Get started

1. Make sure you ran `npm install` in the root directory
2. Install local dependencies
    ```console
    $ cd packages/backend
    $ npm install
    ```
3. Make a copy of the config
    ```console
    $ cp .env.example .env.development
    ```
4. Run the app in development mode
    ```console
    $ npm run dev
    ```