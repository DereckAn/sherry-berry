// TODO: CDN Integration for Image and Video Optimization
// This file will contain utilities for working with your chosen CDN

// Popular CDN options for portfolios:
// - Cloudinary (recommended for images and videos)
// - AWS CloudFront + S3
// - Vercel Image Optimization
// - Next.js built-in Image Optimization

// Example CDN configurations:

// For Cloudinary:
interface CloudinaryConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  secure: boolean;
}

// TODO: Set up environment variables
// CLOUDINARY_CLOUD_NAME=your_cloud_name
// CLOUDINARY_API_KEY=your_api_key  
// CLOUDINARY_API_SECRET=your_api_secret

const cloudinaryConfig: CloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
  apiKey: process.env.CLOUDINARY_API_KEY || '',
  apiSecret: process.env.CLOUDINARY_API_SECRET || '',
  secure: true,
};

export interface ImageTransformations {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'scale' | 'fit' | 'fill' | 'crop';
  gravity?: 'center' | 'face' | 'auto';
}

export interface VideoTransformations {
  width?: number;
  height?: number;
  quality?: 'auto' | 'best' | 'good' | 'eco';
  format?: 'auto' | 'mp4' | 'webm';
  startOffset?: number; // For thumbnails
}

// TODO: Implement Cloudinary image optimization
export function getOptimizedImageUrl(
  publicId: string, 
  transformations: ImageTransformations = {}
): string {
  // Example Cloudinary URL construction:
  // https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}
  
  const {
    width,
    height, 
    quality = 80,
    format = 'auto',
    crop = 'fill',
    gravity = 'auto'
  } = transformations;

  const transforms: string[] = [];
  
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);
  if (crop) transforms.push(`c_${crop}`);
  if (gravity && crop === 'fill') transforms.push(`g_${gravity}`);

  const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
  
  // TODO: Replace with actual Cloudinary implementation
  // return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformString}${publicId}`;
  
  // Placeholder - return the publicId as-is for now
  console.log('CDN not configured. Using placeholder image URL.');
  return publicId;
}

// TODO: Implement video optimization
export function getOptimizedVideoUrl(
  publicId: string,
  transformations: VideoTransformations = {}
): string {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto'
  } = transformations;

  const transforms: string[] = [];
  
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (quality) transforms.push(`q_${quality}`);
  if (format) transforms.push(`f_${format}`);

  const transformString = transforms.length > 0 ? transforms.join(',') + '/' : '';
  
  // TODO: Replace with actual Cloudinary implementation
  // return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${transformString}${publicId}`;
  
  console.log('CDN not configured. Using placeholder video URL.');
  return publicId;
}

// TODO: Generate video thumbnails
export function getVideoThumbnail(
  publicId: string,
  transformations: ImageTransformations & { startOffset?: number } = {}
): string {
  const {
    width = 1280,
    height = 720,
    quality = 80,
    format = 'jpg',
    startOffset = 0
  } = transformations;

  const transforms = [
    `w_${width}`,
    `h_${height}`,
    `c_fill`,
    `q_${quality}`,
    `f_${format}`,
    `so_${startOffset}` // Start offset for thumbnail
  ];

  const transformString = transforms.join(',') + '/';
  
  // TODO: Replace with actual Cloudinary implementation
  // return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/video/upload/${transformString}${publicId}.jpg`;
  
  console.log('CDN not configured. Using placeholder thumbnail URL.');
  return `/placeholder-video-thumbnail.jpg`;
}

// TODO: Responsive image generation
export function getResponsiveImageSrcSet(
  publicId: string,
  sizes: number[] = [400, 800, 1200, 1600, 2000]
): string {
  // Generate srcset for responsive images
  const srcsetEntries = sizes.map(width => {
    const url = getOptimizedImageUrl(publicId, { 
      width, 
      quality: 80, 
      format: 'auto' 
    });
    return `${url} ${width}w`;
  });

  return srcsetEntries.join(', ');
}

// TODO: Upload utilities (for CMS integration)
export async function uploadImageToCDN(
  file: File,
  folder?: string
): Promise<{ publicId: string; url: string; width: number; height: number }> {
  // TODO: Implement image upload to your CDN
  // This would typically be used in your CMS or admin interface
  
  console.log('CDN upload not implemented.');
  throw new Error('CDN upload functionality not yet implemented');
}

export async function uploadVideoToCDN(
  file: File,
  folder?: string
): Promise<{ publicId: string; url: string; duration: number }> {
  // TODO: Implement video upload to your CDN
  
  console.log('CDN video upload not implemented.');
  throw new Error('CDN video upload functionality not yet implemented');
}

// TODO: Image analysis utilities
export async function analyzeImage(publicId: string): Promise<{
  width: number;
  height: number;
  format: string;
  colors: string[];
  faces: number;
}> {
  // TODO: Use CDN's AI features for image analysis
  // Cloudinary offers automatic tagging, color analysis, face detection, etc.
  
  console.log('Image analysis not implemented.');
  throw new Error('Image analysis functionality not yet implemented');
}

// Helper function to extract public ID from CDN URL
export function extractPublicIdFromUrl(url: string): string {
  // TODO: Implement based on your CDN URL structure
  // For Cloudinary: extract the public ID from the full URL
  
  // Placeholder implementation
  return url.split('/').pop()?.split('.')[0] || url;
}

// Helper function to check if URL is from your CDN
export function isCDNUrl(url: string): boolean {
  // TODO: Check if URL is from your configured CDN
  // For Cloudinary: check if URL contains 'res.cloudinary.com'
  
  return url.includes('cloudinary.com') || url.includes('your-cdn-domain.com');
}