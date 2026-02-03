const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(
  url: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("token");

  const res = await fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  // ⚠️ body ek hi baar parse karo
  let data: any = null;
  const contentType = res.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  // 🔥 TOKEN EXPIRED HANDLE (YAHI DALNA THA)
  if (res.status === 401 && data?.expired) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    throw new Error(
      typeof data === "string" ? data : JSON.stringify(data)
    );
  }

  return data;
}

export const api = {
  // PUBLIC
  get: (url: string) => request(url),
  post: (url: string, body: any) =>
    request(url, { method: "POST", body: JSON.stringify(body) }),

  // ADMIN (JWT BASED)
  adminGet: (url: string) => request(url),
  adminPost: (url: string, body: any) =>
    request(url, { method: "POST", body: JSON.stringify(body) }),
  adminPut: (url: string, body: any) =>
    request(url, { method: "PUT", body: JSON.stringify(body) }),
  adminDelete: (url: string) =>
    request(url, { method: "DELETE" }),

  // IMAGE UPLOAD (ADMIN)
  adminUpload: async (file: File) => {
    const token = localStorage.getItem("token");

    const fd = new FormData();
    fd.append("image", file);

    const res = await fetch(`${BASE_URL}/api/admin/upload`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: fd,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    return res.json();
  },
};
