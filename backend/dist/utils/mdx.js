"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTENT_DIR = void 0;
exports.ensureContentDir = ensureContentDir;
exports.getAllPosts = getAllPosts;
exports.getPostBySlug = getPostBySlug;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.generatePostContent = generatePostContent;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const gray_matter_1 = __importDefault(require("gray-matter"));
exports.CONTENT_DIR = path.join(process.cwd(), 'content');
async function ensureContentDir() {
    await fs.ensureDir(exports.CONTENT_DIR);
}
async function getAllPosts() {
    await ensureContentDir();
    const files = await fs.readdir(exports.CONTENT_DIR);
    const mdxFiles = files.filter(file => file.endsWith('.mdx'));
    const posts = [];
    for (const file of mdxFiles) {
        const slug = path.basename(file, '.mdx');
        const post = await getPostBySlug(slug);
        if (post) {
            posts.push(post);
        }
    }
    return posts.sort((a, b) => {
        const dateA = new Date(a.date || '').getTime();
        const dateB = new Date(b.date || '').getTime();
        return dateB - dateA;
    });
}
async function getPostBySlug(slug) {
    try {
        const filePath = path.join(exports.CONTENT_DIR, `${slug}.mdx`);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data, content } = (0, gray_matter_1.default)(fileContent);
        return {
            slug,
            title: data.title || '',
            description: data.description || '',
            content,
            date: data.date || new Date().toISOString(),
            author: data.author,
            tags: data.tags || [],
            category: data.category,
            draft: data.draft || false,
        };
    }
    catch (error) {
        return null;
    }
}
async function createPost(slug, content) {
    await ensureContentDir();
    const filePath = path.join(exports.CONTENT_DIR, `${slug}.mdx`);
    const exists = await fs.pathExists(filePath);
    if (exists) {
        throw new Error(`Post with slug "${slug}" already exists`);
    }
    await fs.writeFile(filePath, content, 'utf-8');
    const post = await getPostBySlug(slug);
    if (!post) {
        throw new Error('Failed to create post');
    }
    return post;
}
async function updatePost(slug, content) {
    const filePath = path.join(exports.CONTENT_DIR, `${slug}.mdx`);
    const exists = await fs.pathExists(filePath);
    if (!exists) {
        throw new Error(`Post with slug "${slug}" not found`);
    }
    await fs.writeFile(filePath, content, 'utf-8');
    const post = await getPostBySlug(slug);
    if (!post) {
        throw new Error('Failed to update post');
    }
    return post;
}
async function deletePost(slug) {
    try {
        const filePath = path.join(exports.CONTENT_DIR, `${slug}.mdx`);
        await fs.remove(filePath);
        return true;
    }
    catch (error) {
        return false;
    }
}
function generatePostContent(metadata, content) {
    const frontmatter = gray_matter_1.default.stringify('', metadata);
    return `${frontmatter.trim()}\n\n${content}`;
}
//# sourceMappingURL=mdx.js.map