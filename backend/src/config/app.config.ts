
const currentEnv: string = process.env.APP_ENV || 'development';
const port: Number|string = process.env.APP_PORT || 3000;
const baseUrl: string = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion: string = 'api/v1/';
const tokenLife: Number = 36000;
const refreshTokenLife: Number = 96000;
const salt: string = '97b8c4b382ff27e31408df9d528bb9ce';

export {
    currentEnv,
    port,
    baseUrl,
    apiVersion,
    tokenLife,
    refreshTokenLife,
    salt
}