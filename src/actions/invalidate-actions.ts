"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function invalidatePathAction(path: string) {
  try {
    if (!path) {
      throw new Error("Path is required for cache invalidation");
    }

    revalidatePath(path);
    return { success: true, message: `Cache invalidated for path: ${path}` };
  } catch (error) {
    console.error("Failed to invalidate path cache:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to invalidate path cache",
    };
  }
}

export async function invalidateTagAction(tags: string | string[] | undefined) {
  try {
    if (!tags) {
      throw new Error("Tags are required for cache invalidation");
    }

    const tagArray = Array.isArray(tags) ? tags : [tags];

    if (tagArray.length === 0) {
      throw new Error("At least one tag is required");
    }

    // Invalidate each tag
    tagArray.forEach((tag) => {
      if (typeof tag === "string" && tag.trim()) {
        revalidateTag(tag.trim());
      }
    });

    return {
      success: true,
      message: `Cache invalidated for tags: ${tagArray.join(", ")}`,
    };
  } catch (error) {
    console.error("Failed to invalidate tag cache:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to invalidate tag cache",
    };
  }
}

// Form-compatible server actions
export async function invalidatePathFormAction(formData: FormData) {
  const path = formData.get("path") as string;

  try {
    if (!path) {
      throw new Error("Path is required for cache invalidation");
    }

    revalidatePath(path);
    console.log(`✅ Cache invalidated for path: ${path}`);
  } catch (error) {
    console.error("Failed to invalidate path cache:", error);
    // Still redirect back, but log the error
    redirect(path || "/");
  }
}

export async function invalidateTagFormAction(formData: FormData) {
  const tags = formData.get("tags") as string;
  const redirectPath = (formData.get("redirectPath") as string) || "/";

  try {
    if (!tags) {
      throw new Error("Tags are required for cache invalidation");
    }

    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    if (tagArray.length === 0) {
      throw new Error("At least one tag is required");
    }

    // Invalidate each tag
    tagArray.forEach((tag) => {
      if (typeof tag === "string" && tag.trim()) {
        revalidateTag(tag.trim());
      }
    });

    console.log(`✅ Cache invalidated for tags: ${tagArray.join(", ")}`);
    redirect(redirectPath);
  } catch (error) {
    console.error("Failed to invalidate tag cache:", error);
    redirect(redirectPath);
  }
}
