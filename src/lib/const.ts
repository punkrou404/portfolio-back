/** microcms http get header(api-key) */
type MicrocmsHTTPGETHeader = {
    headers: {
        'X-API-KEY': string;
    };
};
const GET_KEY = process.env.microcms_access_key;
export const MICROCMS_GET_HEADER = {
    headers: { 'X-API-KEY': GET_KEY },
} as MicrocmsHTTPGETHeader;

/** microcms http post header */
type MicrocmsHTTPPOSTHeader = {
    'Content-Type': string;
    'X-WRITE-API-KEY': string;
};
const POST_KEY = process.env.microcms_white_access_key;
export const MICROCMS_POST_HEADER = {
    'Content-Type': 'application/json; charset=utf-8',
    'X-WRITE-API-KEY': POST_KEY,
} as MicrocmsHTTPPOSTHeader;
