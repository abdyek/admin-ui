// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/abdyek/Projects/umono/admin-ui/node_modules/vite/dist/node/index.js";
import vue from "file:///home/abdyek/Projects/umono/admin-ui/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/abdyek/Projects/umono/admin-ui/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    host: "127.0.0.1",
    proxy: {
      "/": {
        target: "http://127.0.0.1:8999/",
        changeOrigin: true,
        bypass: (req) => {
          if (req.url.startsWith("/admin") || req.url.startsWith("/src") || req.url.startsWith("/@vite") || req.url.startsWith("/node_modules") || req.url.startsWith("/@id")) {
            return req.url;
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9hYmR5ZWsvUHJvamVjdHMvdW1vbm8vYWRtaW4tdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2FiZHllay9Qcm9qZWN0cy91bW9uby9hZG1pbi11aS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9hYmR5ZWsvUHJvamVjdHMvdW1vbm8vYWRtaW4tdWkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcxMjcuMC4wLjEnLFxuICAgIHByb3h5OiB7XG4gICAgICAnLyc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovLzEyNy4wLjAuMTo4OTk5LycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgYnlwYXNzOiAocmVxKSA9PiB7XG4gICAgICAgICAgaWYgKHJlcS51cmwuc3RhcnRzV2l0aCgnL2FkbWluJykgfHwgcmVxLnVybC5zdGFydHNXaXRoKCcvc3JjJykgfHwgcmVxLnVybC5zdGFydHNXaXRoKCcvQHZpdGUnKSB8fCByZXEudXJsLnN0YXJ0c1dpdGgoJy9ub2RlX21vZHVsZXMnKSB8fCByZXEudXJsLnN0YXJ0c1dpdGgoJy9AaWQnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcS51cmxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsZUFBZSxXQUFXO0FBQ2pVLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUZnSyxJQUFNLDJDQUEyQztBQUtqTyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDO0FBQUEsRUFDZixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLFFBQ0gsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsUUFBUSxDQUFDLFFBQVE7QUFDZixjQUFJLElBQUksSUFBSSxXQUFXLFFBQVEsS0FBSyxJQUFJLElBQUksV0FBVyxNQUFNLEtBQUssSUFBSSxJQUFJLFdBQVcsUUFBUSxLQUFLLElBQUksSUFBSSxXQUFXLGVBQWUsS0FBSyxJQUFJLElBQUksV0FBVyxNQUFNLEdBQUc7QUFDbkssbUJBQU8sSUFBSTtBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
