/**
 * Validates an email address format
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates that a string meets a minimum length requirement
 * @param str The string to validate
 * @param minLength The minimum required length
 * @returns True if the string meets the minimum length, false otherwise
 */
export function isValidLength(str: string, minLength: number): boolean {
  return str.length >= minLength;
}