// Define a type for our book data to keep it clean
export interface BookData {
  id: string;
  title: string;
  author: string;
  category: string;
  status: "Read" | "Reading" | "To Read";
  rating: number;
  description: string;
}