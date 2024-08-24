import { parse, serialize } from "cookie";

export function setCookie(name: string, value: string, days?: number) {
  const maxAge = days ? days * 24 * 60 * 60 : undefined;
  document.cookie = serialize(name, value, {
    maxAge,
    path: "/",
  });
}

export function getCookie(name: string): string | null {
  const cookies = parse(document.cookie || "");
  return cookies[name] || null;
}

export function clearAllCookies(): void {
  const cookies = parse(document.cookie);
  for (const name in cookies) {
    document.cookie = serialize(name, "", {
      maxAge: -1,
      path: "/",
    });
  }
}
