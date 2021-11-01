import Goal from "../types/models/Goal";
import GoalResponse from "../types/backend/GoalResponse";
import DataServiceType from "../types/backend/DataService";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * A class that is responsible for the management of application data
 */
export default class DataService implements DataServiceType {
    /**
     * A function that saves a goal and returns a GoalResponse
     * @param { Goal } goal: The goal object that should be saved
     * @returns { Promise<GoalResponse> } returns a GoalResponse object
     */
    public async saveGoal(goal: Goal): Promise<GoalResponse> {
        const response: GoalResponse = {
            success: true,
            errors: null
        };

        // If the name of the goal is blank
        if(goal.name === "") {
            response.success = false;
            response.errors = "Goal name cannot be blank";
            return response;
        }

        // Check that the key is not used
        if(await AsyncStorage.getItem(goal.name) === null) {
            // Set the key value pair
            await AsyncStorage.setItem(goal.name, JSON.stringify(goal), (error: Error | undefined) => {
                // After saving the goal, check that no error has occured
                if(error !== undefined) {
                    response.errors = error.message;
                    response.success = false;
                }
            });
        }
        // The key is already in use
        else {
            response.success = false;
            response.errors = "Goal Name is already used";
        }

        return response;
    }

    /**
     * A function that edits the given goal
     * @param { Goal } goal 
     * @returns { GoalResponse } The response to saving the goal
     */
    public async editGoal(goal: Goal): Promise<GoalResponse> {
        const response: GoalResponse = {
            success: true,
            errors: null
        };

        if(goal.name === "") {
            response.success = false;
            response.errors = "Goal name cannot be blank";
            return response;
        }

        // Check if the key exists
        if(await AsyncStorage.getItem(goal.name) !== null) {
            // Update the goal
            AsyncStorage.setItem(goal.name, JSON.stringify(goal), (error: Error | undefined) => {
                // Check if any errors have occured
                if(error !== undefined) {
                    response.success = false;
                    response.errors = error.message;
                }
            });
        }
        // The goal is not in async storage
        else {
            response.success = false;
            response.errors = "Goal not found in storage";
        }

        return response;
    }
};