import { TokenInterface } from './token.interface';
export declare class JwtRefreshManager {
    private DIR_PATH;
    private dirPath;
    private keyEncription;
    constructor(keyEncription?: string);
    saveToken(token: string): boolean;
    getTokens(): TokenInterface[];
    refreshToken(token: string, refreshToken: string): boolean;
    checkToken(refreshToken: string): boolean;
}
