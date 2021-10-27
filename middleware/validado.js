// Redirige al inicio si no es administrador
export default function ({ store, redirect }) {
  if (store.$auth.user.rol === 0) {
    return redirect('/auth/validar');
  }
}
