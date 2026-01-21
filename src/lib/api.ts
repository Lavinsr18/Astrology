// src/lib/api.ts

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN;

async function request(
  url: string,
  options: RequestInit = {},
  isAdmin = false
) {
  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      ...(isAdmin ? { Authorization: ADMIN_TOKEN } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
}



export const api = {
  // PUBLIC
  get: (url: string) => request(url),
  post: (url: string, body: any) =>
    request(url, { method: "POST", body: JSON.stringify(body) }),

  // ADMIN JSON
  adminGet: (url: string) => request(url, {}, true),
  adminPost: (url: string, body: any) =>
    request(url, { method: "POST", body: JSON.stringify(body) }, true),
  adminPut: (url: string, body: any) =>
    request(url, { method: "PUT", body: JSON.stringify(body) }, true),
  adminDelete: (url: string) =>
    request(url, { method: "DELETE" }, true),

  // ADMIN IMAGE UPLOAD (Cloudinary)
  adminUpload: async (file: File) => {
    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: {
        Authorization: ADMIN_TOKEN,
      },
      body: fd,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return res.json(); // { url: "https://res.cloudinary.com/..." }
  },

  
};
