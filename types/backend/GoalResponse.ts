/**
 * This type represents the type that is returned when a Goal is saved or edited.
 */
export default interface GoalResponse {
    success: boolean;
    errors: string | null;
};