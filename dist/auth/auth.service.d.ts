import { JwtService } from '@nestjs/jwt';
import { NotificationSettings, Organization, OrganizationUser, User, WorkspaceUser } from 'src/db';
import { MailService } from 'src/mail/mail.service';
import { DataSource, Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgotPasswordUpdateDto } from './dto/forgot-password-update.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateNotificationPreferencesDto } from './dto/update-notification-preferences.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { IJwtAuthToken } from './i-jwt-auth-token.interface';
export declare class AuthService {
    private userRepository;
    private organizationRepository;
    private organizationUserRepository;
    private workspaceUserRepository;
    private jwtService;
    private mailService;
    private dataSource;
    otp: string;
    constructor(userRepository: Repository<User>, organizationRepository: Repository<Organization>, organizationUserRepository: Repository<OrganizationUser>, workspaceUserRepository: Repository<WorkspaceUser>, jwtService: JwtService, mailService: MailService, dataSource: DataSource);
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
    changePassword(authUser: IJwtAuthToken, changePasswordDto: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    profile(userId: number): Promise<{
        selectedWorkspace: any;
        fcmToken: null | string;
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
        createdOrganization: Organization;
        organizationUsers: OrganizationUser[];
        workspaceUsers: WorkspaceUser[];
        createdTaskTypes: import("src/db").OrgTaskType[];
        updatedTaskTypes: import("src/db").OrgTaskType[];
        createdTaskCategories: import("src/db").OrgTaskCategory[];
        updatedTaskCategories: import("src/db").OrgTaskCategory[];
        createdTasks: import("src/db").Task[];
        updatedTasks: import("src/db").Task[];
        createdTaskAttachments: import("src/db").TaskAttachment[];
        orgTeamUsers: import("src/db").OrgTeamUser[];
        taskMembers: import("src/db").TaskMember[];
        addedTaskMembers: import("src/db").TaskMember[];
        taskComments: import("src/db").TaskComment[];
        createdVisitAttachments: import("src/db").VisitAttachment[];
        visits: import("src/db").Visit[];
        attendances: import("src/db").Attendance[];
        notificationSettings: NotificationSettings;
        sendedNotifications: import("src/db").Notification[];
        receivedNotifications: import("src/db").Notification[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    profileSimpleInfo(authUser: IJwtAuthToken): Promise<{
        totalWorkspaces: number;
        myTotalPendingInvitations: number;
        myTotalOrganizationUsers: number;
        purchasedPackage: null;
    }>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateProfilePic(userId: number, image: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateFcmToken(userId: number, fcmToken: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteMyAccount(userId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    myNotificationPreferences(authUser: IJwtAuthToken): Promise<NotificationSettings>;
    updateMyNotificationPreferences(authUser: IJwtAuthToken, updateNotificationPreferencesDto: UpdateNotificationPreferencesDto): Promise<{
        success: boolean;
        message: string;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    generateAccessTokenAndRefreshToken(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
