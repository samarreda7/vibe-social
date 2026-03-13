export interface NotificationActor {
  _id: string;
  name: string;
  photo: string;
}

export interface NotificationRecipient {
  _id: string;
  name: string;
  photo: string;
}

export interface CommentCreator {
  _id: string;
  name: string;
  username: string;
  photo: string;
}

export interface TopComment {
  _id: string;
  content: string;
  image?: string;
  commentCreator: CommentCreator;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
}

export interface NotificationEntity {
  _id: string;
  body?: string;
  image?: string;
  user?: string;
  commentsCount?: number;
  topComment?: TopComment | null;
  sharesCount?: number;
  likesCount?: number;
  isShare?: boolean;
  id?: string;
  unavailable?: boolean;
}

export type NotificationType = 'like_post' | 'comment_post' | 'share_post';

export interface Notification {
  _id: string;
  recipient: NotificationRecipient;
  actor: NotificationActor;
  type: NotificationType;
  entityType: 'post';
  entityId: string;
  isRead: boolean;
  createdAt: string;
  entity: NotificationEntity;
}