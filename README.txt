🚀 Hive - Backend API

Hive es una aplicación de colaboración en equipo donde los miembros pueden trabajar juntos en distintos espacios de trabajo organizados por canales, con un sistema de roles jerárquico que permite realizar acciones específicas según los permisos de cada usuario.

📋 Información del Proyecto

- Nombre: Hive
- Autor: FacuJanssen
- Estado: En desarrollo 🔧
- Demo Frontend: https://slack-clon-frontend-ashen.vercel.app/
- Repositorio Backend: https://github.com/FacuJanssen/slack-clon-backend

✨ Características Principales

 👥 Gestión de Usuarios
- Sistema de autenticación seguro con JWT
- Registro y login de usuarios

 🏢 Workspaces & Canales
- Múltiples espacios de trabajo
- Canales organizados dentro de cada workspace

 👨‍💼 Sistema de Roles
- Admin: Acceso completo y gestión de usuarios
- Member: Funcionalidades básicas de colaboración

 💬 Sistema de Mensajería
- Mensajes persistentes en canales
- Interfaz en tiempo real (planeado)
- Historial completo de conversaciones

🛠 Stack Tecnológico

 Backend
- Runtime: Node.js v22.17.0
- Framework: Express.js
- Base de Datos: MongoDB con Mongoose
- Autenticación: JWT + bcrypt
- Email: Nodemailer

 Frontend
- Framework: React con Vite
- Deployment: Vercel

 Seguridad
- CORS configurado
- Variables de entorno para datos sensibles
- Passwords hasheados con bcrypt

🗂 Estructura de la API

 Autenticación
- POST /api/auth/register` - Registrar nuevo usuario
- POST /api/auth/login` - Iniciar sesión

 Workspaces
- GET /api/workspaces - Obtener workspaces del usuario
- POST /api/workspaces - Crear nuevo workspace
- PUT /api/workspaces/:workspace_id/update - Cambiar nombre del workspace
- DEL /api/workspaces/:workspace_id/delete - Eliminar workspace

 Canales
- GET /api/workspaces/:worspaces_id/channels - Canales de un workspace
- POST /api/workspaces/:workspace_id/channels - Crear canal
- PUT /api/workspaces/:workspace_id/channels/:channel_id/update - Cambiar nombre del canal
- DEL /api/workspaces/:workspace_id/channels/:channel_id/delete - Eliminar canal

 Mensajes
- GET /api/workspaces/:workspace_id/channels/:channel_id/messages - Obtener mensajes del canal
- POST /api/workspaces/:workspace_id/channels/:channel_id/messages - Enviar mensaje

 🔐 Sistema de Roles

Admin: Gestión completa de workspaces, canales y usuarios
Member: Enviar mensajes, unirse a canales, ver contenido

📅 Roadmap

 🔄 En Desarrollo
- [ ] Sistema de invitaciones por email
- [ ] Edición y eliminación de mensajes
- [ ] Validaciones para nombres de workspaces y channels

 🎯 Planeado
- [ ] Búsqueda de mensajes y canales

⚙️ Credenciales de prueba
 - Email: test-user@email.com
 - Passwords: 123456

📞 Contacto

- Autor: Facu Janssen
- GitHub: [FacuJanssen] https://github.com/FacuJanssen
- Demo: [Hive Frontend] https://slack-clon-frontend-ashen.vercel.app/
