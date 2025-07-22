export type BlockType = 'markdown' | 'button' | 'heading' | 'image' | 'spacer';

export type BlockWidth = 'fullsize' | 'container';

export interface BaseBlock {
  id: string;
  type: BlockType;
  width: BlockWidth;
  order: number;
}

export interface MarkdownBlock extends BaseBlock {
  type: 'markdown';
  content: string;
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  text: string;
  href: string;
  variant: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
  size: 'sm' | 'default' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  className?: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level: 1 | 2 | 3 | 4 | 5 | 6;
  content: string;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer';
  height: 'sm' | 'md' | 'lg' | 'xl';
}

export type Block = MarkdownBlock | ButtonBlock | HeadingBlock | ImageBlock | SpacerBlock;

export interface BlockEditorData {
  blocks: Block[];
  version: string;
} 