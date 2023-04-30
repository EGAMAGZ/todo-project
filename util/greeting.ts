import { Greeting } from "./types.ts";

export default function getGreeting(): Greeting {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let greeting: Greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good night";
    }

    return greeting;
}
