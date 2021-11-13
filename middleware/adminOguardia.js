// Redirige al inicio si no es administrador o guardia
export default function ({ store, redirect }) {
  if (store.$auth.user.rol !== 3 && store.$auth.user.rol !== 2) {
    return redirect('/inicio');
  }
}
