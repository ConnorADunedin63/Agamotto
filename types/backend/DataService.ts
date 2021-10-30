import GoalResponse from './GoalResponse';
import Goal from '../models/Goal';

interface DataServiceType {
    saveGoal: (goal: Goal) => GoalResponse
    editGoal: (goal: Goal) => GoalResponse
};

export default DataServiceType;