import type { BookData } from "../types/BookData";

export const booksData: BookData[] = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Software Engineering",
    status: "Read",
    rating: 5,
    description: "A handbook of agile software engineering practices that will help you write code that is readable and maintainable."
  },
  {
    id: "2",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    category: "Career",
    status: "Reading",
    rating: 5,
    description: "Your one-stop manual for the modern software developer. It helps you master techniques to improve your programming skills."
  },
  {
    id: "3",
    title: "Zero to One",
    author: "Peter Thiel",
    category: "Startup",
    status: "To Read",
    rating: 0,
    description: "Notes on startups, or how to build the future. A guide on building monopolies and creating value."
  },
  {
    id: "4",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    category: "Architecture",
    status: "Read",
    rating: 4,
    description: "The classic collection of solutions to common design problems in software development."
  },
];
