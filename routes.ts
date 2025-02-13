import { AppLinks } from "@/constants/AppLinks";

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to home
 * @type {string[]}
 */
export const authRoutes = ['/auth/sign-in', '/auth/sign-up'];

/**
 * An array of static routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicStaticRoutes = ['/', AppLinks.INITIATIVES_LIST];

/**
 * An array of static assets that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicAssets = ['/landing-page/landing-background-img.jpg'];

/**
 * An array of dynamic routes that are accessible to the public.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicDynamicRoutes = [`${AppLinks.INITIATIVE}/`];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
