# 💰 Expense Tracker - Frontend

Aplicación web para el seguimiento y análisis de gastos personales, construida con Angular 19 y arquitectura limpia.

## 🚀 Características

- ✅ **Autenticación segura** con validación de token en backend
- ✅ **Gestión de gastos** (crear, editar, eliminar)
- ✅ **Análisis y estadísticas** con gráficos interactivos
- ✅ **Filtros avanzados** por categoría, fecha y rango personalizado
- ✅ **Persistencia de sesión** automática
- ✅ **Arquitectura limpia** organizada por features
- ✅ **Diseño responsive** con PrimeNG

## 📁 Estructura del Proyecto

```
src/app/
├── core/                          # Configuración y servicios globales
│   ├── config/
│   │   └── app.config.ts         # Configuración de la aplicación
│   ├── guards/
│   │   └── auth.guard.ts         # Protección de rutas
│   └── services/
│       └── auth-state.service.ts # Gestión de estado de autenticación
│
├── features/                      # Módulos por dominio
│   ├── auth/                      # Autenticación
│   │   ├── data-access/
│   │   │   └── auth.service.ts
│   │   ├── models/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   └── register/
│   │   └── auth.routes.ts
│   │
│   ├── expenses/                  # Gestión de gastos
│   │   ├── data-access/
│   │   │   ├── expenses.service.ts
│   │   │   ├── expense-form.service.ts
│   │   │   ├── categories.service.ts
│   │   │   └── expense-events.service.ts
│   │   ├── models/
│   │   ├── components/
│   │   │   ├── expense-form/
│   │   │   ├── expense-list/
│   │   │   ├── expense-icon/
│   │   │   ├── expense-delete-dialog/
│   │   │   └── expense-filters/
│   │   └── pages/
│   │       ├── home/
│   │       └── filters/
│   │
│   └── analytics/                 # Análisis y estadísticas
│       ├── data-access/
│       │   └── analytics.service.ts
│       ├── models/
│       └── components/
│           ├── total-spent/
│           ├── spending-chart/
│           └── filter-summary/
│
└── shared/                        # Código compartido
    ├── ui/                        # Componentes UI reutilizables
    ├── layout/
    ├── pipes/
    └── animations/
```

## 🛠️ Tecnologías

- **Angular 19** - Framework principal
- **TypeScript** - Lenguaje de programación
- **PrimeNG** - Biblioteca de componentes UI
- **RxJS** - Programación reactiva
- **Signals** - Gestión de estado reactivo

## 📋 Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x
- Angular CLI >= 19.x

## ⚙️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/lautigrz/expense-tracker-front.git

# Navegar al directorio
cd expense-tracker-front

# Instalar dependencias
npm install
```

## 🔧 Configuración

### Variables de Entorno

Configurar la URL del backend en `src/environment/environments.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000' // URL de tu backend
};
```

### Backend Requerido

El frontend espera los siguientes endpoints:

#### Autenticación
- `POST /auth/register` - Registro de usuario
- `POST /login` - Inicio de sesión
- `GET /auth/verify` - Verificación de token (requerido)

#### Gastos
- `GET /expense` - Listar gastos (con filtros opcionales)
- `POST /expense` - Crear gasto
- `PUT /expense/:id` - Actualizar gasto
- `DELETE /expense/:id` - Eliminar gasto

#### Categorías
- `GET /category` - Listar categorías

#### Analytics
- `GET /analytics/summary` - Resumen de gastos
- `GET /analytics/summary/top-categories` - Top categorías
- `GET /analytics/summary/monthly-comparison` - Comparación mensual

## 🚀 Ejecución

### Desarrollo

```bash
npm run dev
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

### Producción

```bash
npm run build
```

Los archivos compilados estarán en `dist/expense-tracker-app`

## 🔐 Sistema de Autenticación

### Flujo de Autenticación

1. **Inicio de sesión**: Usuario ingresa credenciales
2. **Validación**: Backend valida y retorna token JWT
3. **Almacenamiento**: Token se guarda en localStorage
4. **Estado**: AuthStateService actualiza el estado global
5. **Navegación**: Usuario es redirigido a /home

### Verificación Automática

Al iniciar la aplicación:

1. `APP_INITIALIZER` ejecuta verificación de token
2. Llama a `GET /auth/verify` con el token
3. Si es válido → mantiene sesión
4. Si no es válido → cierra sesión automáticamente

### Protección de Rutas

Las rutas `/home` y `/filtro` están protegidas con `authGuard`:

```typescript
{
  path: 'home',
  canActivate: [authGuard],
  loadChildren: () => import('./features/expenses/pages/home/home.routes')
}
```

## 📊 Características Principales

### Dashboard Principal
- Resumen de gastos semanales y mensuales
- Gráfico de categorías más gastadas
- Lista de últimos movimientos
- Comparación con mes anterior

### Gestión de Gastos
- Formulario para agregar/editar gastos
- Selección de categorías
- Validación de campos
- Feedback visual de operaciones

### Filtros Avanzados
- Por rango de fechas predefinido
- Por categoría
- Por rango personalizado
- Visualización de total filtrado

### Analytics
- Gráfico de dona con distribución por categoría
- Indicador de variación mensual
- Top 5 categorías más gastadas

## 🎨 Componentes UI Compartidos

- `Button` - Botón personalizado
- `Input` - Campo de entrada
- `Select` - Selector dropdown
- `ConfirmDialog` - Diálogo de confirmación
- `EmptyState` - Estado vacío
- `Loading` - Indicador de carga
- `MessageInvalid` - Mensaje de error

## 🔄 Gestión de Estado

### AuthStateService

Gestiona el estado de autenticación usando Angular Signals:

```typescript
// Señales públicas de solo lectura
isAuthenticated = computed(() => this.userState().isAuthenticated);
currentUser = computed(() => this.userState().username);
token = computed(() => this.userState().token);

// Métodos
login(token: string, username?: string): void
logout(): void
checkAuthStatus(): Observable<boolean>
```

### ExpenseEventsService

Notifica cambios en gastos para actualizar vistas:

```typescript
expenseChanged$.subscribe(() => {
  // Recargar datos
});
```

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:coverage
```

## 📦 Build

```bash
# Build de producción
npm run build

# Build con análisis de bundle
npm run build -- --stats-json
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'feat: agregar AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convención de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `refactor:` - Refactorización de código
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato
- `test:` - Agregar o modificar tests

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

**Lautaro Gerez**
- GitHub: [@lautigrz](https://github.com/lautigrz)

## 🙏 Agradecimientos

- [Angular](https://angular.dev/)
- [PrimeNG](https://primeng.org/)
- [RxJS](https://rxjs.dev/)

---

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!
