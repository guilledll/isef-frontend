// Redirige al inicio si no es administrador
export default function ({ store, redirect }) {
  if (store.$auth.user.rol !== 3) {
    return redirect('/inicio');
  }
}
