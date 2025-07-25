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

export interface PostMetadata {
  title: string;
  description: string;
  date?: string;
  author?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  editorType?: 'markdown' | 'tiptap' | 'blocks';
  coverImage?: string;
}

export interface CreatePostRequest {
  filename: string;
  content: string;
}

export interface CreatePostFromFormRequest {
  title: string;
  description: string;
  slug: string;
  content: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  draft?: boolean;
  editorType?: 'markdown' | 'tiptap' | 'blocks';
  coverImage?: string;
}

export interface UpdatePostRequest {
  content: string;
}

export interface PostsListResponse {
  posts: Post[];
  total: number;
}

export interface ApiErrorResponse {
  error: string;
  message?: string;
  details?: any;
} 