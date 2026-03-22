export interface Reply {
  _id: string;
  content: string;
   image?: string; 
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: any[]; 
  createdAt: string;
  repliesCount: number;
}

export interface CommentCreator {
  _id: string;
  name: string;
  photo: string;
}