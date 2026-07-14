# fullstack-project-final
 
Todo list usando react para frontend y node express para backend
Usando TypeScript y prisma

[![CI](https://github.com/CarlosZ360/fullstack-project-final/actions/workflows/ci.yml/badge.svg)](https://github.com/CarlosZ360/fullstack-project-final/actions/workflows/ci.yml)
 
## 🚀 Instalación local
 
```bash
git clone https://github.com/CarlosZ360/fullstack-project-final.git
cd fullstack-project-final
npm install
```
 
### Variables de entorno
Crea un archivo `.env` en la raíz con las siguientes claves (sin valores reales en este documento):
 
```
DATABASE_URL= "postgresql://fullstackfinal_user:test-ci.oregon-postgres.render.com/fullstackfinal"
JWT_SECRET=admin123
PORT=5432
```
 
## 📜 Comandos disponibles
 
| Comando          | Descripción                              |
|------------------|-------------------------------------------|
| `npm run dev`    | Levanta el entorno de desarrollo           |
| `npm run build`  | Genera el build de producción              |
| `npm test`       | Corre las pruebas automatizadas (pendiente — Sesión 3) |
 
## 🗄️ Base de datos
 
PostgreSQL con migraciones y seeds gestionados con Prisma (ver Módulo 2).