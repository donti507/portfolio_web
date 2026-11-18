const assets = new Set(Object.keys(import.meta.glob('/public/**/*')).map(path => path.slice('/public/'.length)));
export const hasAsset = (path: string) => assets.has(path);
export const asset = (path: string) => import.meta.env.BASE_URL + path;
