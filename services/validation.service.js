export const mensajes = {
  required: () => 'Campo requerido',
  minLength: ({ $params }) =>
    `Debe tener al menos ${$params.minLength.min} caracteres.`,
  maxLength: ({ $params }) =>
    `Debe tener como máximo ${$params.maxLength.max} caracteres.`,
  numeric: () => 'El campo debe ser numérico.',
  email: () => 'El correo no es válido.',
  sameAsPassword: () => 'Las contraseñas no coinciden.',
  departamento: () => 'Por favor seleccione un departamento.',
}
