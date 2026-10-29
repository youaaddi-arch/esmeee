import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { domains } from "@/data/domains";
import { programs } from "@/data/programs";
import { articles } from "@/data/blog";

type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

const staticRoutes: {
  path: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/formations", priority: 0.9, changeFrequency: "weekly" },
  { path: "/domaines", priority: 0.8, changeFrequency: "monthly" },
  { path: "/formats", priority: 0.8, changeFrequency: "monthly" },
  { path: "/financement", priority: 0.8, changeFrequency: "monthly" },
  { path: "/financement/simulateur", priority: 0.8, changeFrequency: "monthly" },
  { path: "/equipe-pedagogique", priority: 0.7, changeFrequency: "monthly" },
  { path: "/notre-approche", priority: 0.7, changeFrequency: "monthly" },
  { path: "/observatoire", priority: 0.7, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  { path: "/devis", priority: 0.6, changeFrequency: "yearly" },
  { path: "/plan-du-site", priority: 0.3, changeFrequency: "monthly" },
  { path: "/mentions-legales", priority: 0.2, changeFrequency: "yearly" },
  { path: "/cgv", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...domains.map((domain) => ({
      url: `${site.url}/domaines/${domain.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...programs.map((program) => ({
      url: `${site.url}/formations/${program.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...articles.map((article) => ({
      url: `${site.url}/blog/${article.slug}`,
      lastModified: article.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
