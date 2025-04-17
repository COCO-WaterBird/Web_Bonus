export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    publishedDate?: string;
    publisher?: string;
    categories?: string[];
  };
}

export interface BookSearchResponse {
  items: Book[];
  totalItems: number;
} 