import GoalResponse from './GoalResponse';
import Goal from '../models/Goal';

interface DataServiceType {
    saveGoal(goal: Goal): Promise<GoalResponse>;
    editGoal(goal: Goal): Promise<GoalResponse>;
};

export default DataServiceType;