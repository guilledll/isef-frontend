// Redirige al inicio si está autenticado
export default function (context) {
  if (context.$auth.loggedIn) {
    return context.redirect('/inicio');
  }
}
