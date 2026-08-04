export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

export async function uniqueJobSlug(
  title: string,
  findExisting: (slug: string) => Promise<{ _id: unknown } | null>,
  excludeId?: string,
): Promise<string> {
  const base = slugify(title) || "job";
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await findExisting(candidate);
    if (!existing || String(existing._id) === excludeId) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}
