// lib/services/types.ts
export interface MyHeroPost {
  _id: string;
  title: string;
  content: string;
  likes: string[];
  type: string;
  createdAt: string;
  updatedAt: string;
  commentCount: string | number;
  comments?: MyHeroComment[];
}

export interface MyHeroComment {
  _id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
  user : {
    fullName : string;
  }
}
