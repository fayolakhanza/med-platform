import axios from "axios";

// Gunakan env var jika ada, jika tidak fallback ke /api/v1
// yang akan di-proxy oleh Next.js ke Railway (lihat next.config.ts)
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || '/api/v1',
});

export default api;