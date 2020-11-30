export interface EmailExistance {
    alreadyExists(email: string): Promise<boolean> 
}