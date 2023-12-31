export type Post = {
  id: number;
  postAreaId: number;
  area: string;
  userId: number;
  title: string;
  content: string;
  image: string[];
  like: number;
  location: string;
  likeChecked?: number[];
  commentId?: number[];
};
export type Comment = {
  id: number;
  postId: number;
  userId: number;
  commentId: number | null;
  content: string;
};

export interface WriteProps {
  editMode: boolean;
  postId?: number;
  onClose?: () => void;
}
