export interface Strategy {
    verifyAccess(
        area_id: string,
        user_id: string,
        user_email: string
    ): Promise<boolean>;
}
