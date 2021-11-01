import Goal from '../../types/models/Goal';
import GoalResponse from '../../types/backend/GoalResponse';
import DataService from '../../backend/DataService';

const dataService: DataService = new DataService();

describe("saveGoal function should", () => {
    it("return false when the name is blank.", async() => {
        const goalName: Goal = {
            name: "",
            description: "Test description",
            dueDate: new Date(),
            tasks: ["Test task"]
        };

        const result: GoalResponse = await dataService.saveGoal(goalName);
        expect(result.success).toBe(false);
        expect(result.errors).toBe("Name cannot be blank");
    });

    it("return false when a name is already used.", async() => {
        const goalValid: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: new Date(),
            tasks: ["Test task"]
        };

        await dataService.saveGoal(goalValid);

        const goalNameDuplicate: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: new Date(),
            tasks: ["Test task"]
        };

        const result: GoalResponse = await dataService.saveGoal(goalNameDuplicate);
        expect(result.success).toBe(false);
        expect(result.errors).toBe("Name already exists");
    });

    it("return true when the description is blank.", async() => {
        const goalDescription: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: new Date(),
            tasks: ["Test task"]
        };

        const result: GoalResponse = await dataService.saveGoal(goalDescription);
        expect(result.success).toBe(true);
    });

    it("returns true when the due date is null.", async() => {
        const goalDueDate: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: null,
            tasks: ["Test task"]
        };

        const result: GoalResponse = await dataService.saveGoal(goalDueDate);
        expect(result.success).toBe(true);
    });

    it("returns true when there are no tasks.", async() => {
        const goalTasks: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: new Date(),
            tasks: []
        };

        const result: GoalResponse = await dataService.saveGoal(goalTasks);
        expect(result.success).toBe(true);
    });

    it("returns true when there are many tasks.", async() => {
        const goalTasks: Goal = {
            name: "Test Goal",
            description: "",
            dueDate: new Date(),
            tasks: ["Test task 1", "Test task 2"]
        };

        const result: GoalResponse = await dataService.saveGoal(goalTasks);
        expect(result.success).toBe(true);
    });
});