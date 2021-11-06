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

        let keyInUse: boolean = false;
        // Check that the key is not used
        await AsyncStorage.getItem(goal.name, async(error?: Error, result?: string | null) => {
            // Error while checking key
            if(error !== undefined && error !== null) {
                response.errors = error.message;
                response.success = false;
            }
            // If the key is already in use
            else if(result !== null) { 
                keyInUse = true;
                response.errors = "Goal name already used";
                response.success = false;
            }
        });

        // The key has not been used before, ok to save
        if(!keyInUse && response.errors === null) {
            await AsyncStorage.setItem(goal.name, JSON.stringify(goal), (error?: Error) => {
                if(error !== undefined && error !== null) {
                    response.errors = error.message;
                    response.success = false;
                }
            });
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