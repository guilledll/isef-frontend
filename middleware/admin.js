// Redirige al inicio si no es administrador
export default function (context) {
  if (context.$auth.user.rol == 3) {
    return context.redirect('/inicio')
  }
}
