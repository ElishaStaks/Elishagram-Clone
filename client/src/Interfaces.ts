export interface PostProps {
  post: {
    likesCount: number;
    isLiked: boolean;
    commentsCount: number;
    comments: [object];
    _id: string;
    files: [string];
    caption: string;
    isMine: boolean;
    user: {
      avatar: string;
      username: string;
    }
  }
}

export interface CommentProps {
    comment: {
        user: {
            username: string;
            avatar: string
        }
        text: string;
    }
}