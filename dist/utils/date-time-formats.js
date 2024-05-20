"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateTimeDiffInSeconds = exports.toDayMonthDate = exports.toYYYYMMDD = void 0;
const toYYYYMMDD = (utcDate) => utcDate.toISOString().split('T')[0];
exports.toYYYYMMDD = toYYYYMMDD;
const toDayMonthDate = (utcDate) => {
    const weekDay = utcDate.toLocaleString('en-us', { weekday: 'long' });
    const month = utcDate.toLocaleString('en-us', { month: 'short' });
    const date = utcDate.getDate();
    return `${weekDay}, ${month} ${date}`;
};
exports.toDayMonthDate = toDayMonthDate;
const getDateTimeDiffInSeconds = (end, start) => {
    const seconds = (end.getTime() - start.getTime()) / 1000;
    return Math.round(seconds);
};
exports.getDateTimeDiffInSeconds = getDateTimeDiffInSeconds;
//# sourceMappingURL=date-time-formats.js.map