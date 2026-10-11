import type { MetadataRoute } from 'next';
import getProjects from '@/utils/getProjects';
import { absolute } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getProjects().map((p) => ({
    url: absolute(`/project/${p.fileName}`),
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));
  return [
    {
      url: absolute('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects,
  ];
}
