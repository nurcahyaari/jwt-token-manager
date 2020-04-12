export declare class JwtRefreshManager {
    private DIR_PATH;
    private dirPath;
    private keyEncription;
    constructor();
    saveToken(token: string): boolean;
    refreshToken(token: string, refreshToken: string): boolean;
    checkToken(refreshToken: string): boolean;
}
