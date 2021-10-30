export default interface Goal {
    name: string;
    description: string | null;
    dueDate: Date | null;
    Tasks: string[]
};