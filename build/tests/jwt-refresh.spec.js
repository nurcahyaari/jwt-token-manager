"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const fs_1 = __importDefault(require("fs"));
const jwt_refresh_1 = require("../lib/jwt-refresh");
describe('jwt manager will delete and saved data', () => {
    const manager = new jwt_refresh_1.JwtRefreshManager('tmp/tokens.txt');
    it("should saved data and create file.json", () => {
        chai_1.expect(manager.saveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5kZXYiLCJpYXQiOjE1ODY3MDMzNDMsImV4cCI6MTU4OTI5NTM0M30.ZxMJMxh8Ucr0uGhykGJZIq3w423Tc9FTHxrOJS8-Ffw"))
            .is.a("boolean");
        const file = fs_1.default.readFileSync("./tmp/tokens.txt", { encoding: "utf8" });
        const tokens = JSON.parse(file);
        chai_1.expect(tokens)
            .is.an("array")
            .to.deep.include.members([{
                token: "3c1039d919045662b7dfe09df5b8d528d0c4a853e49ec312646f5ec34f788e78a002b73a2b73edeaec5e596c910b4601ac6bf5613584ba5d9d600ff3e29010aaaeeb54baa5d2ca2c4a6f4a15f6cd2e1dc226adbc2e6369a3904674516eea339cd75e2ab15ae3bc28fa281f71d744f002c3cba16325769ba84cec37120f8be0c5d857e18601906451802add84d523dd4eda5554e95d019062fffa2a3dc3eb528a2655557303c7f720ab5988bfe7cd64371211496588eae32e69e8b314fe5e4a08ed3e57aa401a266c14ef80c7a89fc644",
                used: 0
            }]);
    });
    it("Should check the token", () => {
        chai_1.expect(manager.checkToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5kZXYiLCJpYXQiOjE1ODY3MDMzNDMsImV4cCI6MTU4OTI5NTM0M30.ZxMJMxh8Ucr0uGhykGJZIq3w423Tc9FTHxrOJS8-Ffw"))
            .to.be.a("boolean")
            .to.be.equal(true);
    });
    it("Should refresing the token", () => {
        chai_1.expect(manager.saveToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5kZXYiLCJpYXQiOjE1ODY3MDMzNDMsImV4cCI6MTU4OTI5NTM0M30.ZxMJMxh8Ucr0uGhykGJZIq3w423Tc9FTHxrOJS8-Ffw"))
            .is.a("boolean");
        chai_1.expect(manager
            .refreshToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5kZXYiLCJpYXQiOjE1ODY3MDMzNDMsImV4cCI6MTU4OTI5NTM0M30.ZxMJMxh8Ucr0uGhykGJZIq3w423Tc9FTHxrOJS8-Ffw"))
            .to.be.a("boolean")
            .to.be.equal(true);
    });
});
