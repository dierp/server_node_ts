export interface EmailValidator {
    isValid(email: string): boolean,
    alreadyExists(email: string): boolean
}