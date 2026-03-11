export interface Profile {
  _id: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  photo: string;
  cover: string;
  followers: string[];
  following: string[];
  createdAt: string;
  followersCount: number;
  followingCount: number;
  bookmarksCount: number;
  id: string;
}
