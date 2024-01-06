import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formUrlQuery = (params: string, key: string, value: string) => {
  const currentUrl = queryString.parse(params as string);

  currentUrl[key] = value;

  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true, strict: true }
  );
};

export const includeAuthorQuery = {
  include: {
    User: {
      select: {
        image: true,
        username: true,
      },
    },
  },
} as const;
