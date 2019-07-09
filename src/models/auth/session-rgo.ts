export interface SessionRGOModel {
    authenticated: {
        authenticator: string,
        accessToken: string,
        user: {
            username: string,
            id: string,
            avatarUrl: string,
        },
        cdnUrls: {
            user: string,
            content: string,
        },
        isAuthenticated: boolean,

    };
}
