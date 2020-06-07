import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

import { TokenInterface } from './token.interface';

export class JwtRefreshManager {
  private DIR_PATH: string;
  private dirPath: any;
  private keyEncription: string;
  private keyIv: string;

  constructor(source:string, keyEncription = '2f3b9b0455a7000943t34', keyIv: string = '2353er23rfewr3fer3') {
    this.DIR_PATH = `${process.cwd()}/${source}`;
    this.dirPath = path.dirname(this.DIR_PATH);
    this.keyEncription = keyEncription.slice(0,16);
    this.keyIv = keyIv.slice(0,16);
  }

  saveToken(token: string) {
    // first we encrypt key using aes-128-cbc file
    try {
      const cipher: any = crypto.createCipheriv('aes-128-cbc', this.keyEncription, this.keyIv);
      token = cipher.update(token, 'utf8', 'hex');
      token += cipher.final('hex');

      if (fs.existsSync(this.DIR_PATH)) {
        const tokenFromSource: string = fs.readFileSync(this.DIR_PATH, { encoding: 'utf8' });
        const tokens: TokenInterface[] = JSON.parse(tokenFromSource);

        tokens.push({
          token,
          used: 0,
        });
        fs.writeFileSync(this.DIR_PATH, JSON.stringify(tokens));
      } else {
        const tokens: TokenInterface[] = [];
        tokens.push({
          token,
          used: 0,
        });
        fs.mkdirSync(this.dirPath, { recursive: true });
        fs.writeFileSync(this.DIR_PATH, JSON.stringify(tokens));
      }
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }

  getTokens():TokenInterface[]{
    const tokenFromSource: string = fs.readFileSync(this.DIR_PATH, { encoding: 'utf8' });
    const tokens: TokenInterface[] = JSON.parse(tokenFromSource);
    return tokens;
  }

  refreshToken(token: string, refreshToken: string): boolean {
    const isTokenAvailable: boolean = this.checkToken(refreshToken);
    if (isTokenAvailable) {
      const tokenFromSource: string = fs.readFileSync(this.DIR_PATH, { encoding: 'utf8' });
      const tokens: TokenInterface[] = JSON.parse(tokenFromSource);
      let dechiper: any;
      const newToken: any = tokens.filter((data) => {
        const createDeciper: any = crypto.createDecipheriv('aes-128-cbc', this.keyEncription, this.keyIv);
        dechiper = createDeciper.update(data.token, 'hex', 'utf8');
        dechiper += createDeciper.final('utf8');

        if (dechiper !== refreshToken) {
          return data;
        }
      });
      fs.writeFileSync(this.DIR_PATH, JSON.stringify(newToken));
      return this.saveToken(token);
    }
    return false;
  }

  checkToken(refreshToken: string): boolean {
    const tokenFromSource: string = fs.readFileSync(this.DIR_PATH, { encoding: 'utf8' });
    const tokens: TokenInterface[] = JSON.parse(tokenFromSource);
    let dechiper: any;
    const savedRefreshToken: any = tokens.filter((data) => {
      const createDeciper: any = crypto.createDecipheriv('aes-128-cbc', this.keyEncription, this.keyIv);
      dechiper = createDeciper.update(data.token, 'hex', 'utf8');
      dechiper += createDeciper.final('utf8');
      if (dechiper === refreshToken && data.used === 0) {
        return data;
      }
    });

    if (savedRefreshToken.length > 0) {
      return true;
    }
    return false;
  }
}
