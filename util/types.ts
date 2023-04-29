export type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
}

export type Greeting =
    | "Good morning"
    | "Good afternoon"
    | "Good night";