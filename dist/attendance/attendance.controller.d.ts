import { AttendanceService } from './attendance.service';
import { SaveDto } from './dto/save.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    myAttendanceStatus(req: any): Promise<{
        isDayStarted: boolean;
        attendanceInfo: import("../db").Attendance;
    }>;
    dayStart(req: any, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
    dayEnd(req: any, saveDto: SaveDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
