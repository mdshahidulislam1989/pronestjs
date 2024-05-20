export declare const GlobalConfig: {
    port: string | number;
    db: import("@nestjs/common").DynamicModule;
    expoNotificationUrl: string;
    mail: import("@nestjs/common").DynamicModule;
    azureMailUrl: string;
    azureAppId: string;
    hashSaltOrRounds: number;
    jwtAccessTokenSecret: string;
    jwtAccessTokenExpiresIn: string;
    jwtRefreshTokenSecret: string;
    jwtRefreshTokenExpiresIn: string;
};
