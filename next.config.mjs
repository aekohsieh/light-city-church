/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      // TODO: 待教會提供 hero-storefront.jpg / small-group.jpg 實體檔案後，
      // 移到 public/images 改用本地路徑，並移除此 remotePattern。
      { protocol: "https", hostname: "preeminent-tanuki-8bdebb.netlify.app" }
    ]
  }
};

export default nextConfig;
