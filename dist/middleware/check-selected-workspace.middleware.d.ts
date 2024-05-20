import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { DataSource } from 'typeorm';
export declare class CheckSelectedWorkspace implements NestMiddleware {
    private jwtService;
    private dataSource;
    constructor(jwtService: JwtService, dataSource: DataSource);
    use(request: Request, response: Response, next: NextFunction): Promise<void>;
    private validateSelectedWorkspaceFromToken;
}
