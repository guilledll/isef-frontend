// Redirige al inicio si no es guardia
export default function ({ store, redirect }) {
  if (store.$auth.user.rol !== 2) {
    return redirect('/inicio');
  }
}
