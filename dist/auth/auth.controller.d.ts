import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordUpdateDto } from './dto/forgot-password-update.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    verifySignupEmail(email: string): Promise<{
        success: boolean;
        message: string;
    } | {
        otp: string;
        success: boolean;
        message: string;
    }>;
    verifyOtp(otp: string): Promise<{
        success: boolean;
        message: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
    } | {
        accessToken: string;
        refreshToken: string;
    }>;
    forgotPassword(email: string): Promise<{
        success: boolean;
        message: string;
    } | {
        otp: string;
        success: boolean;
        message: string;
    }>;
    forgotPasswordUpdate(forgotPasswordUpdateDto: ForgotPasswordUpdateDto): Promise<{
        success: boolean;
        message: string;
    }>;
    changePassword(req: any, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    profile(req: any): Promise<{
        selectedWorkspace: any;
        fcmToken: string;
        id: number;
        name: string;
        loginId: string;
        password: string;
        email: string;
        dialCode: string;
        phone: string;
        address: string;
        image: string;
        provider: string;
        refreshToken: string;
        isEmailVerified: boolean;
        isSocialLogin: boolean;
        isActive: boolean;
        lastLoginAt: Date;
        profileUpdatedAt: Date;
        createdOrganization: import("../db").Organization;
        organizationUsers: import("../db").OrganizationUser[];
        workspaceUsers: import("../db").WorkspaceUser[];
        createdTaskTypes: import("../db").OrgTaskType[];
        updatedTaskTypes: import("../db").OrgTaskType[];
        createdTaskCategories: import("../db").OrgTaskCategory[];
        updatedTaskCategories: import("../db").OrgTaskCategory[];
        createdTasks: import("../db").Task[];
        updatedTasks: import("../db").Task[];
        createdTaskAttachments: import("../db").TaskAttachment[];
        orgTeamUsers: import("../db").OrgTeamUser[];
        taskMembers: import("../db").TaskMember[];
        addedTaskMembers: import("../db").TaskMember[];
        taskComments: import("../db").TaskComment[];
        createdVisitAttachments: import("../db").VisitAttachment[];
        visits: import("../db").Visit[];
        attendances: import("../db").Attendance[];
        notificationSettings: import("../db").NotificationSettings;
        sendedNotifications: import("../db").Notification[];
        receivedNotifications: import("../db").Notification[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    profileSimpleInfo(req: any): Promise<{
        totalWorkspaces: number;
        myTotalPendingInvitations: number;
        myTotalOrganizationUsers: number;
        purchasedPackage: null;
    }>;
    updateProfile(req: any, updateProfileDto: UpdateProfileDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateProfilePic(req: any, image: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateFcmToken(req: any, fcmToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteMyAccount(req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    myNotificationPreferences(req: any): Promise<import("../db").NotificationSettings>;
    updateMyNotificationPreferences(req: any, updateNotificationPreferencesDto: UpdateNotificationPreferencesDto): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
