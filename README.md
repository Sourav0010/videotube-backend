# videotube-backend

A backend service built with Node.js, Express, and MongoDB. This project provides an API for managing users, videos, playlists, comments, likes, subscriptions, and tweets.

`Mentor : Hitesh Choudhary`

`Feel free to test this application and if you want to build the frontend upon it you can use this backend, Incase if you find any bug or something just rise a issue and if you want to contribute just pull a request I will be excited to merge your pull.`

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
    npm i
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

-   `POST /api/v1/users/signup`: Register a new user
-   `POST /api/v1/users/login`: Login an existing user
-   `GET /api/v1/users/getuser`: Get current loggined user details
-   `POST /api/v1/users/logout`: Logout user
-   `POST /api/v1/users/refresh-token`: refresh user token
-   `POST /api/v1/users/c/:channelId`: get Subscriber count of a channel
-   `POST /api/v1/users/delete-user`: Delete User Account

### Videos

-   `POST /api/v1/videos/`: Upload a new video
-   `GET /api/v1/videos/`: Retrieve all videos
-   `GET /api/videos/:videoId`: Get a perticular video details
-   `DELETE /api/v1/videos/:videoId`: Delete a video
-   `PATCH /api/v1/videos/toggle/publish/:videoId`: Toggle Publish Status Of A Video

### Subscription

-   `POST /api/v1/subscriptions/c/:channelId`: Subscribe/Unsubscribe Channel
-   `GET /api/v1/subscriptions/c/:channelId`: Get subscriber list of a channel
-   `GET /api/v1/subscriptions/u/:subscriberId`: Get channel list to which user has subscribed

### Tweet

-   `POST /api/v1/tweets/`: Create Tweet
-   `GET /api/v1/tweets/user/:userId`: Get User Tweets
-   `PATCH /api/v1/tweets/:tweetId`: Update Tweet
-   `DELETE /api/v1/tweets/:tweetId`: Delete Tweet

### Playlist

-   `POST /api/v1/playlists/`: Create a playlist
-   `GET /api/v1/playlists/:playlistId`: Get Playlist by ID
-   `PATCH /api/v1/playlists/:playlistId`: Update Playlist details by ID
-   `DELETE /api/v1/playlists/:playlistId`: Delete Playlist by ID
-   `PATCH /api/v1/playlists/add/:videoId/:playlistId`: Add video to a playlist
-   `PATCH /api/v1/playlists/remove/:videoId/:playlistId`: Remove a video from the playlist
-   `GET /api/v1/playlists/user/:userId`: Get Playlists Created by user

### Comment

-   `POST /api/v1/comments/:videoId`: Create a comment
-   `GET /api/v1/comments/:videoId`: Get all comments of a video
-   `PATCH /api/v1/comments/c/:commentId`: Update Comment
-   `DELETE /api/v1/comments/c/:commentId`: Delete Comment

### Like

-   `POST /api/v1/likes/toggle/v/:videoId`: Toggle Video Like
-   `POST /api/v1/likes/toggle/c/:commentId`: Toggle Comment Like
-   `POST /api/v1/likes/toggle/t/:tweetId`: Toggle Tweet Like
-   `GET /api/v1/likes/videos`: Get All Liked Video

## Technologies Used

-   **Backend**: Node.js, Express
-   **Database**: MongoDB
-   **Authentication**: JWT
-   **Other**: Mongoose for MongoDB ORM , Cloudinary for ODM

---

`Thanks You ~ Sourav Mohanty`
