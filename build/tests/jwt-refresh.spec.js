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
                token: "dac5a720da2619ba5c50c1a73e49628500a350df04d29eebe8d780859e49d6cfe7ebbdc32d441826cb67c97b2dd52871bdd1e49b03b01a9a7326ba6c097b3ac5dffc92e052f0d326efcb915bd56c0beed3b35e32a89a0183a59a425d36b60fbfda72863a543e67a2854eb6bf10f618998c71a5e8394b6d0161040fbb73886aac938238f8c17138bcd756248f22fc3fe74912590ea5ce0f8ae86e054359813d8e",
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
