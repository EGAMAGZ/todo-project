import { Greeting } from "./types.ts";

export default function getGreeting(): Greeting {
    const date = new Date();
    const hours = date.getHours();
    if (hours >= 5 && hours < 12) {
        return "Good morning";
    } else if (hours >= 12 && hours < 18) {
        return "Good afternoon";
    } else {
        return "Good night";
    }
}