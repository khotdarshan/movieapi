export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    ACCESS_DENIED: 401,
    NOT_FOUND: 404,
    REQUEST_TIMEOUT: 408,
    INTERNAL_SERVER_ERROR: 500
}

export const ErrorMessages = {
    CREDENTIALS_EMPTY: "Credentials cannot be empty",
    MOVIE_NOT_FOUND: "Movie Not Found",
    USER_NOT_FOUND: "User Not Found",
    INVALID_TOKEN: "invalid token",
    INVALID_OBJECT_ID: "invalid object id",
    EMPTY_REVIEW_INPUT: "empty review input",
    EMPTY_VOTE_INPUT: "empty vote input",
    EMPTY_MOVIE_NAME_INPUT: "empty movie name input",
    EMPTY_MOVIE_GENRE_INPUT: "empty movie genre input",
    USER_VERIFIED_SUCCESSFULLY: "User verified successfully",
    INVALID_USER_CREDENTIALS: "Invalid User credentials",
    DUPLICATE_EMAIL: "Duplicate email found",
    DUPLICATE_USERNAME: "Duplicate username found",
    NO_TOKEN_PROVIDED: "Access denied. No token provided",
    SESSION_EXPIRED: "Session expired",
    ACCESS_DENIED: "Access Denied"
}

export const Messages = {
    LOGGED_OUT_SUCCESSFULLY: "Logged out successfully!"
}
