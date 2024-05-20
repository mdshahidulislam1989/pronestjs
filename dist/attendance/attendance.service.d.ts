import { IJwtAuthToken } from 'src/auth/i-jwt-auth-token.interface';
import { Attendance } from 'src/db';
import { DataSource } from 'typeorm';
import { SaveDto } from './dto/save.dto';
export declare class AttendanceService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    myAttendanceStatus(authUser: IJwtAuthToken): Promise<{
        isDayStarted: boolean;
        attendanceInfo: Attendance;
    }>;
    dayStart(authUser: IJwtAuthToken, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    dayEnd(authUser: IJwtAuthToken, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    isAlreadyDayStarted(authUser: IJwtAuthToken): Promise<Attendance>;
}
