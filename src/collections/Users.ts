import type { Access, CollectionConfig } from 'payload'

const TEN_MINUTES_IN_MS = 10 * 60 * 1000

const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

// Solo administradores: no hay registro público y únicamente un usuario autenticado
// puede ver o editar cuentas. El primer usuario se crea desde /admin al instalar.
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario', plural: 'Usuarios' },
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: TEN_MINUTES_IN_MS,
  },
  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  fields: [],
}
