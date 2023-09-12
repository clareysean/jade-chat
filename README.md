# Jade Chat - Instant Messaging App

Welcome to Jade Chat, a real-time messaging application built using the MERN stack. The application uses web sockets via [socket.io](https://socket.io/) to enable real-time messaging between users. Jade Chat lets users add and remove contacts to their chat room and upload a an avatar. Planned future enhancements include room and contact search, attachment support, and notifications.

Launch the deployed app: [Here](https://jade-chat-f37f785f9c0d.herokuapp.com/)

![auth page](https://i.imgur.com/gR1YA6K.png)
![chat room](https://i.imgur.com/EHrfPCc.png)

## Table of Contents

-   [Features](#features)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Authentication](#authentication)
-   [Future Enhancements](#future-enhancements)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   **Real-Time Messaging**: Experience seamless, real-time messaging with other users.
-   **Contact Management**: Easily add and remove contacts to your chat rooms.
-   **Token-Based Authentication**: Secure user authentication using JSON Web Tokens (JWT).
-   **Scalable Architecture**: Enjoy a well-structured codebase designed for scalability and future enhancements.
-   **Dynamic UI**: Utilize React components and state management for a responsive user interface.

## Getting Started

### Prerequisites

Before you start, ensure you have the following prerequisites:

-   Node.js and npm installed: [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine using:

    ```
    git clone https://github.com/clareysean/jade-chat.git
    ```

2. Navigate to the project directory:

    ```
    cd jade-chat
    ```

3. Install the required dependencies:

    ```
    npm install
    ```

4. Configure the environment variables as needed. These will include the keys, urls, and secrets from:

    - [MondoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
    - [AWS S3](https://aws.amazon.com/)

5. Start the development server:

    ```
    node server.js
    ```

6. Start the react app:

    ```
    npm start
    ```

7. Open your web browser and visit `http://localhost:3000` to use Jade Chat locally.

8. To run your production build:

    ```
    npm run build
    node server.js
    ```

    Navigate to your specified port configured in .env

## Authentication

-   Jade Chat employs token-based authentication, utilizing JSON Web Tokens (JWT) for secure user authentication. This ensures the protection of sensitive user data and protected routes on the API.

## Future Enhancements

Here are some potential enhancements for Jade Chat:

-   **Search Features**: Implement search functionality for rooms and contacts.
-   **Attachment Support**: Enable users to send and receive attachments, such as images and files.
-   **Notifications**: Add notification features to keep users informed about new messages.

## Contributing

Contributions to Jade Chat are encouraged! If you have suggestions, improvements, or feature ideas, please open an issue or submit a pull request :)

## License

This project is licensed under the [MIT License](LICENSE).
