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
}
export interface PostMetadata {
    title: string;
    description: string;
    date?: string;
    author?: string;
    tags?: string[];
    category?: string;
    draft?: boolean;
}
export interface CreatePostRequest {
    filename: string;
    content: string;
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
//# sourceMappingURL=post.d.ts.map