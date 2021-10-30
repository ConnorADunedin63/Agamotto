import Goal from "../types/models/Goal";
import GoalResponse from "../types/backend/GoalResponse";
import DataServiceType from "../types/backend/DataService";

/**
 * A class that is responsible for the management of application data
 */
class DataService implements DataServiceType {
    
    /**
     * A function that saves a goal and returns a GoalResponse
     * @param { Goal } goal: The goal object that should be saved
     * @returns { GoalResponse } returns a GoalResponse object
     */
    public static saveGoal(goal: Goal): GoalResponse {
        const response: GoalResponse = {
            success: true,
            errors: null
        };

        return response;
    }
};