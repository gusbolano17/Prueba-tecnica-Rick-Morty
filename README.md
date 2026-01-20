# Rick and Morty App 🛸

Aplicación web desarrollada con **React + Vite** que consume la **API pública de Rick and Morty** para mostrar personajes, episodios y/o ubicaciones.

El proyecto utiliza **Tailwind CSS** para estilos, **Flowbite** como librería UI, **Axios** para las peticiones HTTP y **React Router** para la navegación.

---

## 🚀 Tecnologías utilizadas

* ⚛️ React
* ⚡ Vite
* 🌐 Axios – Peticiones HTTP
* 🎨 Tailwind CSS – Estilos
* 🧩 Flowbite / Flowbite React – Componentes UI
* 🧭 React Router DOM – Manejo de rutas
* 🧠 Rick and Morty API

  * [https://rickandmortyapi.com/](https://rickandmortyapi.com/)

---

## 📦 Requisitos previos

* Node.js v18 o superior
* npm (o pnpm / yarn)

---

## 🛠️ Inicialización del proyecto

### 1️⃣ Crear el proyecto con Vite

```bash
npm create vite@latest rick-and-morty-app
```

Seleccionar:

* Framework: **React**
* Variant: **TypeScript**

Entrar al proyecto:

```bash
cd rick-and-morty-app
```

Instalar dependencias base:

```bash
npm install
```

---

## 📥 Instalación de dependencias

### Axios (peticiones HTTP)

```bash
npm install axios
```

### React Router DOM

```bash
npm install react-router-dom
```

### Tailwind CSS

Instalar Tailwind y sus dependencias:

```bash
npm install -D tailwindcss @tailwindcss/vite
```

Configurar `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
})
```

Agregar las directivas en `src/index.css`:

```css
@import "tailwindcss";
@import "flowbite-react/plugin/tailwindcss";
@source "../.flowbite-react/class-list.json";
```

---

### Flowbite + Flowbite React

```bash
npx flowbite-react@latest init
```

---

## 🧭 Configuración de rutas (React Router)

Implementacion del enrutamiento:

```tsx
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { Personaje } from "./components/pages/personaje.tsx";
import { Favoritos } from "./components/pages/favoritos.tsx";
import App from "./App.tsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/characters" />,
  },
  {
    path: "/characters",
    Component: App,
  },
  {
    path: "/character/:id",
    element: <Personaje />,
  },
  {
    path: "/favorites",
    Component: Favoritos,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);

```

---

## 🌐 Consumo de la API (Axios)

Instancia de Axios:

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
```

Uso en un servicio:

```js
export const getCharacters = async () => {
  const { data } = await api.get("/character");
  return data.results;
};
```

---

## 💾 Caching con LocalStorage

Para optimizar el rendimiento y reducir llamadas innecesarias a la API, se implementó **caching de datos utilizando `localStorage`**.

La aplicación primero verifica si los datos existen en `localStorage`. Si están disponibles, se cargan desde allí; de lo contrario, se realiza la petición HTTP y se guardan los datos para futuros accesos.

Asi fue como se implemento el caching:

```ts
import { useEffect, useState } from "react";

export const useFetching = <T>(
  url: string,
  callbackPromise: (url: string) => Promise<T>
) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const key = url.split('?')[1];
    if (!key) return;

    const cached = localStorage.getItem(key);
    if (cached) {
      setData(JSON.parse(cached) as T);
      setLoading(false);
      return;
    }

    let mounted = true;
    callbackPromise(url)
      .then((resp) => {
        if (!mounted) return;
        setData(resp);
        try {
          localStorage.setItem(key, JSON.stringify(resp));
        } catch {
          // ignore storage errors
        }
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [url, callbackPromise]);

  return { data, error, loading };
};

```

Este enfoque mejora la experiencia del usuario y disminuye la carga sobre la API externa.

---

## ▶️ Ejecutar el proyecto

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

---

## 📁 Estructura del proyecto

```txt
src/
├── components/
│   └── pages/
├── hooks/
├── models/
├── services/
│   └── ricky-morty-service.ts
├── App.tsx
├── main.tsx
```

---

## 🔍 Búsqueda y filtros

La aplicación incluye un sistema de **búsqueda avanzada de personajes** que permite filtrar los resultados combinando múltiples criterios:

* 🔤 **Nombre** del personaje
* 🟢 **Status** (Alive, Dead, Unknown)
* 🧬 **Especie**

Los filtros pueden utilizarse de forma individual o combinada, mejorando la experiencia de exploración y facilitando la localización de personajes específicos.

---

## ⭐ Sección de Favoritos

La aplicación cuenta con una **sección de favoritos**, donde el usuario puede:

* ➕ **Agregar** personajes a favoritos
* ➖ **Quitar** personajes de favoritos
* 📂 Visualizar todos los personajes marcados como favoritos en una vista dedicada

Los favoritos se almacenan utilizando **localStorage**, permitiendo que la selección del usuario se mantenga incluso después de recargar la página.

---

## 🪝 Hooks

Los hooks personalizados que se utilizaron en este proyecto fueron los siguientes
* useDebounce que permite crear un delay al momento de realizar la busqueda a travez del input mediante el nombre
* useFetching que permite cumple por un lado el manejo de los servicios de peticiones http y al mismo tiempo hace caching de la data que se recibe.

## 📄 Licencia

Proyecto con fines educativos.
La API de Rick and Morty es pública y gratuita.
