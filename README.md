# Jwt-Refresh-Manager

Jwt-refresh-manager is a library for persisting refresh token data in server without storing data to database. 
when you generate jwt token maybe you will generate a jwt refresh token too. so when you want to regenerate a token with your refresh token you must to compare your storing refresh token in your database with your refresh token from your http request post data or header or anywhere. when your refresh token key from your http is match with your refresh token from your db your refresh token is valid token.

##### jwt-refresh-manager using nodejs crypto to encrypt data


# How to use

npm install jwt-refresh-manager --save


first we initialize JwtRefreshManager class
```bash
const  manager  =  new  JwtRefreshManager('tmp/tokens.txt', 'test123');
```
JwtRefreshManager construct have 2 parameter. first parameter is using for to get location of your file, and the second parameter is using for to get your encryption key
<hr>
for storing token to file

```bash
const isSaved = manager.saveToken("token123"); // boolean
```
<hr>
for check your token in your file

```bash
const haveToken = manager.checkToken("token123"); // boolean
```

for check your token in your file then save a new token

```bash
const haveToken = manager.refreshToken("newToken123", "token123"); // boolean
```

