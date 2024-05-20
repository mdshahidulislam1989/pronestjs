"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
exports.DBConfig = typeorm_1.TypeOrmModule.forRoot(process.env.NODE_ENV === 'production'
    ? {
        type: 'mysql',
        host: 'provisit.mysql.database.azure.com',
        port: 3306,
        username: 'provisitadmin',
        password: 'xoqmu7-niCmuk-kykriq',
        database: 'provisit_prod',
        entities: [__dirname + '/../db/*.entity.{js,ts}'],
        synchronize: false,
        logging: false,
    }
    : {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '1234',
        database: 'pro_visit',
        entities: [__dirname + '/../db/*.entity.{js,ts}'],
        synchronize: true,
        logging: true,
    });
//# sourceMappingURL=database.config.js.map