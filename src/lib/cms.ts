// TODO: CMS Integration Implementation
// This file will contain the integration with your chosen CMS (Contentful, Strapi, Sanity, etc.)

import { Project, ProjectImage, ProjectVideo } from '@/types/project';

// TODO: Configure your CMS client
// Example for different CMS providers:

// For Contentful:
// import { createClient } from 'contentful';
// const client = createClient({
//   space: process.env.CONTENTFUL_SPACE_ID!,
//   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
// });

// For Sanity:
// import { createClient } from '@sanity/client';
// const client = createClient({
//   projectId: process.env.SANITY_PROJECT_ID!,
//   dataset: process.env.SANITY_DATASET!,
//   useCdn: true,
//   apiVersion: '2023-05-03',
// });

// For Strapi:
// const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

interface CMSProject {
  // TODO: Define the structure based on your CMS
  // This should match the content model you create in your CMS
  id: string;
  title: string;
  year: number;
  category: string;
  description: string;
  shortDescription: string;
  role: string;
  director?: string;
  productionCompany?: string;
  network?: string;
  featured: boolean;
  status: string;
  images: CMSImage[];
  videos?: CMSVideo[];
  credits?: CMSCredit[];
}

interface CMSImage {
  // TODO: Define based on your CDN/CMS image structure
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  order: number;
}

interface CMSVideo {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  duration?: number;
  type: string;
}

interface CMSCredit {
  role: string;
  name: string;
}

// TODO: Implement actual CMS data fetching
export async function fetchProjectsFromCMS(): Promise<Project[]> {
  try {
    // Example implementation for different CMS:
    
    // For Contentful:
    // const response = await client.getEntries({
    //   content_type: 'project',
    //   order: '-fields.year',
    // });
    // return response.items.map(transformContentfulProject);
    
    // For Sanity:
    // const query = `*[_type == "project"] | order(year desc) {
    //   _id,
    //   title,
    //   year,
    //   category,
    //   description,
    //   shortDescription,
    //   role,
    //   director,
    //   productionCompany,
    //   network,
    //   featured,
    //   status,
    //   "images": images[]{
    //     _key,
    //     "url": asset->url,
    //     alt,
    //     caption,
    //     "width": asset->metadata.dimensions.width,
    //     "height": asset->metadata.dimensions.height,
    //     order
    //   },
    //   videos,
    //   credits
    // }`;
    // const projects = await client.fetch(query);
    // return projects.map(transformSanityProject);
    
    // For Strapi:
    // const response = await fetch(`${STRAPI_URL}/api/projects?populate=*&sort=year:desc`);
    // const data = await response.json();
    // return data.data.map(transformStrapiProject);
    
    // Placeholder return - remove when implementing actual CMS
    console.log('CMS integration not yet implemented. Using mock data.');
    return [];
    
  } catch (error) {
    console.error('Error fetching projects from CMS:', error);
    throw new Error('Failed to fetch projects from CMS');
  }
}

export async function fetchProjectByIdFromCMS(id: string): Promise<Project | null> {
  try {
    // TODO: Implement CMS-specific project fetching by ID
    
    // For Contentful:
    // const response = await client.getEntry(id);
    // return transformContentfulProject(response);
    
    // For Sanity:
    // const query = `*[_type == "project" && _id == $id][0] { /* same fields as above */ }`;
    // const project = await client.fetch(query, { id });
    // return project ? transformSanityProject(project) : null;
    
    // For Strapi:
    // const response = await fetch(`${STRAPI_URL}/api/projects/${id}?populate=*`);
    // const data = await response.json();
    // return transformStrapiProject(data.data);
    
    console.log(`CMS integration not yet implemented. Cannot fetch project ${id}.`);
    return null;
    
  } catch (error) {
    console.error(`Error fetching project ${id} from CMS:`, error);
    return null;
  }
}

// TODO: Implement transformation functions for your specific CMS
function transformContentfulProject(entry: any): Project {
  // Transform Contentful entry to Project type
  // Handle image URL optimization, field mapping, etc.
  throw new Error('Not implemented');
}

function transformSanityProject(project: any): Project {
  // Transform Sanity document to Project type
  // Handle image URL optimization, field mapping, etc.
  throw new Error('Not implemented');
}

function transformStrapiProject(project: any): Project {
  // Transform Strapi entry to Project type
  // Handle image URL optimization, field mapping, etc.
  throw new Error('Not implemented');
}

// TODO: Image optimization utilities
export function getOptimizedImageUrl(
  imageUrl: string, 
  width?: number, 
  height?: number,
  quality?: number
): string {
  // Implement image optimization based on your CDN
  // Examples:
  
  // For Cloudinary:
  // return imageUrl.replace('/upload/', `/upload/w_${width},h_${height},q_${quality || 80}/`);
  
  // For Contentful:
  // return `${imageUrl}?w=${width}&h=${height}&q=${quality || 80}&fm=webp`;
  
  // For Sanity:
  // return `${imageUrl}?w=${width}&h=${height}&q=${quality || 80}&auto=format`;
  
  // For now, return original URL
  return imageUrl;
}

// TODO: Video handling utilities
export function getVideoThumbnail(videoUrl: string): string {
  // Generate or get video thumbnail based on your video hosting solution
  // Could be Vimeo, YouTube, custom CDN, etc.
  return videoUrl; // Placeholder
}

export function getVideoEmbedUrl(videoUrl: string): string {
  // Convert video URL to embeddable format
  // Handle different video platforms (YouTube, Vimeo, etc.)
  return videoUrl; // Placeholder
}