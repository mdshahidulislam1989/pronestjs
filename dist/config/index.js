"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalConfig = void 0;
const database_config_1 = require("./database.config");
const mail_config_1 = require("./mail.config");
exports.GlobalConfig = {
    port: process.env.PORT || 3000,
    db: database_config_1.DBConfig,
    expoNotificationUrl: 'https://exp.host/--/api/v2/push/send',
    mail: mail_config_1.MailConfig,
    azureMailUrl: 'https://trillionbitscoreapi.azurewebsites.net/email-manager/pro-visit-app',
    azureAppId: 'pro-visit-0804915E-7371-4D3A-8BB3-3D1DA5D3E10D',
    hashSaltOrRounds: 10,
    jwtAccessTokenSecret: 'Jy5OjqH5bYQKkJirpLRQKL2AN4lF9t0nbwHV0jBwkMIQx0z2GpF0aMxBIo9TIIE4u2cor9Ml6dyPH94JvRdxAmL5nq0Ye',
    jwtAccessTokenExpiresIn: '7d',
    jwtRefreshTokenSecret: 'hpAPblvstl9zJbNRFJ0nsEP75mX024mKmP8sG0qEYdjcMNFvb5qeeUqMYasNIGUqSGMw9yPu0dx6dN',
    jwtRefreshTokenExpiresIn: '365d',
};
//# sourceMappingURL=index.js.map