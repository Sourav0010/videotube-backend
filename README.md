# videotube-backend

A backend service built with Node.js, Express, and MongoDB. This project provides an API for managing users, videos, playlists, comments, likes, subscriptions, and tweets.

## Features

-   **User Management**: Allows users to register, login, manage their profile, and keep a watch history.
-   **Video Management**: Users can upload videos, add metadata like title and description, and track views.
-   **Playlists**: Users can create and manage playlists containing multiple videos.
-   **Comments and Likes**: Users can comment on videos and like both videos and tweets.
-   **Subscriptions**: Allows users to subscribe to other users’ channels.
-   **Tweets**: Users can post tweets associated with their profile.

## Database Models

Here’s an overview of the main database models:

### Users

| Field          | Type       | Description                |
| -------------- | ---------- | -------------------------- |
| `_id`          | ObjectId   | Primary key                |
| `username`     | String     | Unique username            |
| `email`        | String     | Unique email               |
| `fullName`     | String     | Full name of the user      |
| `avatar`       | String     | URL of user’s avatar       |
| `coverImage`   | String     | URL of cover image         |
| `password`     | String     | Hashed password            |
| `refreshToken` | String     | Refresh token for sessions |
| `watchHistory` | [ObjectId] | Array of video IDs watched |
| `createdAt`    | Date       | Account creation date      |
| `updatedAt`    | Date       | Profile update date        |

### Videos

| Field         | Type     | Description                      |
| ------------- | -------- | -------------------------------- |
| `_id`         | ObjectId | Primary key                      |
| `videoFile`   | String   | URL of the video file            |
| `thumbnail`   | String   | URL of the thumbnail image       |
| `owner`       | ObjectId | User ID of the video owner       |
| `title`       | String   | Title of the video               |
| `description` | String   | Description of the video         |
| `duration`    | Number   | Duration of the video in seconds |
| `views`       | Number   | Number of views                  |
| `isPublished` | Boolean  | Published status                 |
| `createdAt`   | Date     | Date of upload                   |
| `updatedAt`   | Date     | Last updated date                |

### Playlists

| Field         | Type       | Description                    |
| ------------- | ---------- | ------------------------------ |
| `_id`         | ObjectId   | Primary key                    |
| `name`        | String     | Name of the playlist           |
| `description` | String     | Description of the playlist    |
| `owner`       | ObjectId   | User ID of the playlist owner  |
| `videos`      | [ObjectId] | Array of video IDs in playlist |
| `createdAt`   | Date       | Date of creation               |
| `updatedAt`   | Date       | Last updated date              |

### Comments

| Field       | Type     | Description              |
| ----------- | -------- | ------------------------ |
| `_id`       | ObjectId | Primary key              |
| `content`   | String   | Content of the comment   |
| `video`     | ObjectId | ID of the related video  |
| `owner`     | ObjectId | User ID of the commenter |
| `createdAt` | Date     | Date of comment          |
| `updatedAt` | Date     | Last updated date        |

### Likes

| Field       | Type     | Description             |
| ----------- | -------- | ----------------------- |
| `_id`       | ObjectId | Primary key             |
| `comment`   | ObjectId | ID of the liked comment |
| `video`     | ObjectId | ID of the liked video   |
| `tweet`     | ObjectId | ID of the liked tweet   |
| `likedBy`   | ObjectId | User ID of the liker    |
| `createdAt` | Date     | Date of like            |

### Tweets

| Field       | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `_id`       | ObjectId | Primary key                 |
| `owner`     | ObjectId | User ID of the tweet poster |
| `content`   | String   | Content of the tweet        |
| `createdAt` | Date     | Date of tweet               |
| `updatedAt` | Date     | Last updated date           |

### Subscriptions

| Field        | Type     | Description                  |
| ------------ | -------- | ---------------------------- |
| `_id`        | ObjectId | Primary key                  |
| `subscriber` | ObjectId | User ID of the subscriber    |
| `channel`    | ObjectId | ID of the subscribed channel |
| `createdAt`  | Date     | Subscription date            |
| `updatedAt`  | Date     | Last updated date            |

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Sourav0010/videotube-backend.git
    cd youtube-backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    - Create a `.env` file based on the `.env.example` template.
    - Set up your MongoDB URI and other necessary configurations.

4. Start the server:
    ```bash
    npm run dev
    ```

## API Endpoints

### Users

-   `POST /api/users`: Register a new user
-   `POST /api/users/login`: Login an existing user
-   `GET /api/users/:id`: Get user details

### Videos

-   `POST /api/videos`: Upload a new video
-   `GET /api/videos/:id`: Retrieve video details
-   `PUT /api/videos/:id`: Update video information
-   `DELETE /api/videos/:id`: Delete a video

### Playlists

-   `POST /api/playlists`: Create a new playlist
-   `GET /api/playlists/:id`: Get playlist details
-   `PUT /api/playlists/:id`: Update a playlist
-   `DELETE /api/playlists/:id`: Delete a playlist

---

## Technologies Used

-   **Backend**: Node.js, Express
-   **Database**: MongoDB
-   **Authentication**: JWT
-   **Other**: Mongoose for MongoDB ORM

---
