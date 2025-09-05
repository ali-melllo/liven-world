// lib/services/types.ts
export interface MyHeroPost {
    _id: string;
    title: string;
    content: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    comments?: MyHeroComment[];
  }
  
  export interface MyHeroComment {
    _id: string;
    postId: string;
    userId: string;
    content: string;
    createdAt: string;
  }
  