import { Post, PostMetadata } from '@/types/post';
export declare const CONTENT_DIR: string;
export declare function ensureContentDir(): Promise<void>;
export declare function getAllPosts(): Promise<Post[]>;
export declare function getPostBySlug(slug: string): Promise<Post | null>;
export declare function createPost(slug: string, content: string): Promise<Post>;
export declare function updatePost(slug: string, content: string): Promise<Post>;
export declare function deletePost(slug: string): Promise<boolean>;
export declare function generatePostContent(metadata: PostMetadata, content: string): string;
//# sourceMappingURL=mdx.d.ts.map