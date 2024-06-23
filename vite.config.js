import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',             // Directorio de salida para los archivos construidos
    assetsDir: 'assets',        // Carpeta para los activos generados (js, css, imágenes, etc.)
    manifest: true,             // Generar archivo de manifiesto
    rollupOptions: {
      input: {
        main: 'src/main.jsx'     // Archivo principal de entrada de la aplicación React
      }
    }
  }
});
