import { MailerService } from '@nestjs-modules/mailer';
import { HttpService } from '@nestjs/axios';
export declare class MailService {
    private mailerService;
    private httpService;
    constructor(mailerService: MailerService, httpService: HttpService);
    sendFromAzure(action: string, data: object): Promise<any>;
    sendOtp(to: string | Array<string>, otp: string): Promise<any>;
    registrationWelcome(to: string | Array<string>, name: string): Promise<void>;
}
