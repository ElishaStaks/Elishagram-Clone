export interface PostProps {
  post: {
    likesCount: number;
    isLiked: boolean;
    commentsCount: number;
    comments: [
      {
        _id: string,
        user: {
          username: string;
          avatar: string;
        },
        text: string
      }
    ]
    files: [string];
    caption: string;
    isMine: boolean;
    _id: string;
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