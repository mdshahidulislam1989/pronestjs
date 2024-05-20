"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("./config");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
        console.log('Server is up and running!');
        await app.listen(config_1.GlobalConfig.port);
    }
    catch (error) {
        console.error('Error starting the application:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map