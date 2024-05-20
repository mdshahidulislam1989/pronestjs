"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateOtp = void 0;
const GenerateOtp = (otpLength = 4) => {
    var digits = '0123456789';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp.toString();
};
exports.GenerateOtp = GenerateOtp;
//# sourceMappingURL=generate-otp.js.map