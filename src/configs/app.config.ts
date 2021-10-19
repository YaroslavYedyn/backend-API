const {PORT, DEV_DB_URL}: any = process.env;

export const appConfig = {
    PORT: PORT || 5050,
    DB_URL: DEV_DB_URL || ''
};
