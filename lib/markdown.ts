'use server'

import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { cache } from 'react';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

// Types for our content
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  location: string;
  subtitle: string;
  views: number;
  content: string;
}

export interface Project {
  slug: string;
  title: string;
  context: string;
  imageSrc: string;
  content: string;
}

// Custom plugin to transform markdown images to Next.js Image component
function remarkNextImage() {
  return (tree: any) => {
    visit(tree, 'image', (node: any) => {
      const data = node.data || (node.data = {});
      const props = {
        src: node.url,
        alt: node.alt,
        width: 800,
        height: 400,
        className: 'rounded-lg w-full my-8',
      };

      data.hProperties = props;
      data.hName = 'img'; // We'll transform this in the component
    });
  };
}

// Helper function to read and parse markdown files
async function parseMarkdownFile(filePath: string): Promise<{ content: string; data: any }> {
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Convert markdown to HTML with custom image handling
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkNextImage)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    content: contentHtml,
    data,
  };
}

// Get all blog posts
export const getAllBlogPosts = cache(async (): Promise<BlogPost[]> => {
  const postsDirectory = path.join(process.cwd(), 'components/content/blog');
  const fileNames = await fs.readdir(postsDirectory);
  
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const { content, data } = await parseMarkdownFile(fullPath);

      return {
        slug,
        content,
        ...data,
      } as BlogPost;
    })
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
});

// Get all projects
export const getAllProjects = cache(async (): Promise<Project[]> => {
  const projectsDirectory = path.join(process.cwd(), 'components/content/projects');
  const fileNames = await fs.readdir(projectsDirectory);
  
  const allProjectsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(projectsDirectory, fileName);
      const { content, data } = await parseMarkdownFile(fullPath);

      return {
        slug,
        content,
        ...data,
      } as Project;
    })
  );

  return allProjectsData;
});

// Get a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(process.cwd(), 'components/content/blog', `${slug}.md`);
    const { content, data } = await parseMarkdownFile(fullPath);
    
    return {
      slug,
      content,
      ...data,
    } as BlogPost;
  } catch (e) {
    return null;
  }
}

// Get a single project by slug
export async function getProject(slug: string): Promise<Project | null> {
  try {
    const fullPath = path.join(process.cwd(), 'components/content/projects', `${slug}.md`);
    const { content, data } = await parseMarkdownFile(fullPath);
    
    return {
      slug,
      content,
      ...data,
    } as Project;
  } catch (e) {
    return null;
  }
} 