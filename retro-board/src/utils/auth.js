import { jwtDecode as jwt_decode } from 'jwt-decode';


/**
 * Checks if a JWT token has expired.
 * @param {string} token - The JWT token to be checked.
 * @returns {boolean} - Returns true if the token is expired, false otherwise.
 */
export const isTokenExpired = (token) => {
  if (!token) return true; // If there's no token, consider it expired
  try {
    const decoded = jwt_decode(token);  // Decode the JWT token
    const currentTime = Date.now() / 1000;  // Get current time in seconds
    return decoded.exp < currentTime;  // Compare expiration time with current time
  } catch (error) {
    return true;  // If the token can't be decoded, treat it as expired
  }
};
