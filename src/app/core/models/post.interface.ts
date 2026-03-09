export interface Post {
  _id: string;
  body: string;
  image: string;
  privacy: 'public' | 'following' | 'only_me';
  user: PostUser;
  sharedPost: Post | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  topComment: Comment | null;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  id: string;
  bookmarked: boolean;
}

export interface PostUser {
  _id: string;
  name: string;
  username: string;
  photo: string;
}
