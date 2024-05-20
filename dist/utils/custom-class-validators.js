"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsHHMMSS = exports.IsYYYYMMDD = void 0;
const class_validator_1 = require("class-validator");
const IsYYYYMMDD = () => (0, class_validator_1.Matches)(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, {
    message: val => {
        return `${val.property} must match yyyy:mm:dd`;
    },
});
exports.IsYYYYMMDD = IsYYYYMMDD;
const IsHHMMSS = () => (0, class_validator_1.Matches)(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/, {
    message: val => {
        return `${val.property} must match HH:MM:SS (from 00:00:00 to 23:59:59)`;
    },
});
exports.IsHHMMSS = IsHHMMSS;
//# sourceMappingURL=custom-class-validators.js.map