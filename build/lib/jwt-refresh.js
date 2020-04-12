"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
class JwtRefreshManager {
    constructor() {
        this.DIR_PATH = "./tmp/tokens.txt";
        this.dirPath = path_1.default.dirname(this.DIR_PATH);
        this.keyEncription = "2f3b9b0455a70009d6ccdefb31cfcef9";
    }
    saveToken(token) {
        try {
            const cipher = crypto_1.default.createCipher('aes-128-cbc', this.keyEncription);
            token = cipher.update(token, 'utf8', 'hex');
            token += cipher.final('hex');
            if (fs_1.default.existsSync(this.DIR_PATH)) {
                let tokenFromSource = fs_1.default.readFileSync(this.DIR_PATH, { encoding: "utf8" });
                let tokens = JSON.parse(tokenFromSource);
                tokens.push({
                    token: token,
                    used: 0
                });
                fs_1.default.writeFileSync(this.DIR_PATH, JSON.stringify(tokens));
            }
            else {
                let tokens = [];
                tokens.push({
                    token: token,
                    used: 0
                });
                fs_1.default.mkdirSync(this.dirPath, { recursive: true });
                fs_1.default.writeFileSync(this.DIR_PATH, JSON.stringify(tokens));
            }
            return true;
        }
        catch (err) {
            return false;
        }
    }
    refreshToken(token, refreshToken) {
        let isTokenAvailable = this.checkToken(refreshToken);
        if (isTokenAvailable) {
            return this.saveToken(token);
        }
        return false;
    }
    checkToken(refreshToken) {
        let tokenFromSource = fs_1.default.readFileSync(this.DIR_PATH, { encoding: "utf8" });
        const tokens = JSON.parse(tokenFromSource);
        let dechiper;
        const savedRefreshToken = tokens.filter(data => {
            const createDeciper = crypto_1.default.createDecipher('aes-128-cbc', this.keyEncription);
            dechiper = createDeciper.update(data.token, 'hex', 'utf8');
            dechiper += createDeciper.final('utf8');
            if (dechiper == refreshToken && data.used == 0) {
                return data;
            }
        });
        if (savedRefreshToken.length > 0) {
            const newToken = tokens.filter(data => {
                const createDeciper = crypto_1.default.createDecipher('aes-128-cbc', this.keyEncription);
                dechiper = createDeciper.update(data.token, 'hex', 'utf8');
                dechiper += createDeciper.final('utf8');
                if (dechiper != refreshToken) {
                    return data;
                }
            });
            fs_1.default.writeFileSync(this.DIR_PATH, JSON.stringify(newToken));
            return true;
        }
        return false;
    }
}
exports.JwtRefreshManager = JwtRefreshManager;
