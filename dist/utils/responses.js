"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedResponse = exports.SuccessResponse = void 0;
const SuccessResponse = (message = 'Success', others = {}) => ({ success: true, message, ...others });
exports.SuccessResponse = SuccessResponse;
const FailedResponse = (message = 'Failed', others = {}) => ({ success: false, message, ...others });
exports.FailedResponse = FailedResponse;
//# sourceMappingURL=responses.js.map