type MediumUserResponse = {
  data: {
    id: string;
    username: string;
  };
};

type MediumPostResponse = {
  data: {
    id: string;
    url: string;
  };
};

export type MediumPublishInput = {
  title: string;
  contentMarkdown: string;
  tags: string[];
  canonicalUrl?: string;
  publishStatus?: "public" | "draft";
};

export type MediumPublishResult = {
  postId: string;
  url: string;
};

function getMediumApiBase(): string {
  return process.env.MEDIUM_API_BASE_URL?.trim() || "https://api.medium.com/v1";
}

function getIntegrationToken(): string | null {
  const token = process.env.MEDIUM_INTEGRATION_TOKEN?.trim();
  return token || null;
}

export function isMediumPublishConfigured(env: NodeJS.ProcessEnv = process.env): boolean {
  return Boolean(env.MEDIUM_INTEGRATION_TOKEN?.trim());
}

async function mediumRequest<T>(path: string, init: RequestInit): Promise<T> {
  const token = getIntegrationToken();
  if (!token) {
    throw new Error("Medium integration token is not configured.");
  }

  const response = await fetch(`${getMediumApiBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | (T & { errors?: Array<{ message?: string }> })
    | null;

  if (!response.ok) {
    const message = payload?.errors?.[0]?.message ?? `Medium API request failed (${response.status}).`;
    throw new Error(message);
  }

  if (!payload) {
    throw new Error("Medium API returned an empty response.");
  }

  return payload;
}

async function getAuthenticatedUserId(): Promise<string> {
  const payload = await mediumRequest<MediumUserResponse>("/me", { method: "GET" });
  return payload.data.id;
}

export async function publishToMedium(input: MediumPublishInput): Promise<MediumPublishResult> {
  const userId = await getAuthenticatedUserId();
  const payload = await mediumRequest<MediumPostResponse>(`/users/${userId}/posts`, {
    method: "POST",
    body: JSON.stringify({
      title: input.title,
      contentFormat: "markdown",
      content: input.contentMarkdown,
      tags: input.tags.slice(0, 5),
      canonicalUrl: input.canonicalUrl,
      publishStatus: input.publishStatus ?? "public",
    }),
  });

  return {
    postId: payload.data.id,
    url: payload.data.url,
  };
}
