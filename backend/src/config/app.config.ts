const currentEnv: string = process.env.APP_ENV || 'development';
const port: number|string = process.env.APP_PORT || 3000;
const baseUrl: string = process.env.APP_URL || `http://localhost:${port}/`;
const apiVersion: string = 'api/v1/';
const tokenLife: number = 36000;
const refreshTokenLife: number = 96000;
const salt: string = '97b8c4b382ff27e31408df9d528bb9ce';
const mongoUri = 'mongodb://localhost:27018/react_express_ts';

export {
    currentEnv,
    port,
    baseUrl,
    apiVersion,
    tokenLife,
    refreshTokenLife,
    salt,
    mongoUri
}