import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu.html'),
        cart: resolve(__dirname, 'cart.html'),
        order: resolve(__dirname, 'order.html'),
        reviews: resolve(__dirname, 'reviews.html'),
        gallery: resolve(__dirname, 'gallery.html'),
      },
    },
  },
});
