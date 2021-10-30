export default interface Goal {
    name: string;
    description: string;
    dueDate: Date | null;
    tasks: string[]
};