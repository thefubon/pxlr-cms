export interface Post {
  slug: string;
  title: string;
  description: string;
  content: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  editorType?: 'markdown' | 'tiptap' | 'blocks';
  coverImage?: string;
}

export interface PostFormValues {
  title: string;
  description: string;
  content: string;
  slug: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  editorType?: 'markdown' | 'tiptap' | 'blocks';
  coverImage?: string;
}

export interface PostsListResponse {
  posts: Post[];
  total: number;
}

export interface CreatePostRequest {
  filename: string;
  content: string;
}

export interface UpdatePostRequest {
  content: string;
} 