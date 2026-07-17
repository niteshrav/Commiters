import type { Request, Response } from "express";
import {
  Service,
  Project,
  TeamMember,
  Blog,
  Testimonial,
  ContactQuery,
  Faq,
  JobPosition,
} from "../models";
import { asyncHandler } from "../utils/asyncHandler";

function relativeTime(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString();
}

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const [
    totalServices,
    totalProjects,
    totalTeamMembers,
    totalBlogs,
    totalTestimonials,
    totalContactQueries,
    unreadContactQueries,
    totalFaqs,
    openJobs,
    recentQueries,
    recentBlogs,
    openJobPositions,
  ] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    TeamMember.countDocuments(),
    Blog.countDocuments(),
    Testimonial.countDocuments(),
    ContactQuery.countDocuments(),
    ContactQuery.countDocuments({ isRead: false }),
    Faq.countDocuments(),
    JobPosition.countDocuments({ status: "open" }),
    ContactQuery.find().sort({ createdAt: -1 }).limit(4).lean(),
    Blog.find().sort({ updatedAt: -1 }).limit(4).lean(),
    JobPosition.find({ status: "open" }).sort({ order: 1 }).limit(5).lean(),
  ]);

  const activity = [
    ...recentQueries.map((query) => ({
      id: String(query._id),
      sortTime: new Date(query.createdAt).getTime(),
      type: "inquiry" as const,
      title: `New Inquiry: ${query.serviceNeeded || "General"}`,
      subtitle: `From: ${query.name} • ${relativeTime(new Date(query.createdAt))}`,
      tag: query.isRead ? "Read" : "Inquiry",
    })),
    ...recentBlogs.map((blog) => ({
      id: String(blog._id),
      sortTime: new Date(blog.updatedAt).getTime(),
      type: blog.isPublished ? ("blog" as const) : ("draft" as const),
      title: blog.isPublished ? `Blog Published: ${blog.title}` : `Draft Saved: ${blog.title}`,
      subtitle: `${blog.isPublished ? "Author" : "Edited"}: ${blog.author || "Admin"} • ${relativeTime(new Date(blog.updatedAt))}`,
      tag: blog.isPublished ? "Blog" : "Draft",
    })),
  ]
    .sort((a, b) => b.sortTime - a.sortTime)
    .slice(0, 6)
    .map(({ sortTime: _sortTime, ...item }) => item);

  const talentPipeline = openJobPositions.map((job, index) => ({
    id: String(job._id),
    title: job.title,
    applicantsLabel: job.location ? job.location : "Open role",
    fillPercent: Math.max(20, 100 - index * 18),
  }));

  return res.json({
    totalServices,
    totalProjects,
    totalTeamMembers,
    totalBlogs,
    totalTestimonials,
    totalContactQueries,
    unreadContactQueries,
    totalFaqs,
    openJobs,
    activity,
    talentPipeline,
  });
});
