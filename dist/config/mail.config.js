"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailConfig = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
exports.MailConfig = mailer_1.MailerModule.forRoot({
    transport: {
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: 'provisitapp@gmail.com',
            pass: 'ggdv ehjg mfps mcqw',
        },
    },
    defaults: {
        from: '"Pro Visit" <provisitapp@gmail.com>',
    },
    template: {
        dir: (0, path_1.join)(__dirname, '/../mail/templates'),
        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
        options: {
            strict: true,
        },
    },
    options: {
        partials: {
            dir: (0, path_1.join)(__dirname, '/../mail/templates', 'partials'),
            options: {
                strict: true,
            },
        },
    },
});
//# sourceMappingURL=mail.config.js.map