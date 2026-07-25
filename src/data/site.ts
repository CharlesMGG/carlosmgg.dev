/**
 * Fuente única de los datos de contacto y redes. Las URLs viven aquí, no
 * en los diccionarios de i18n: no son texto traducible y tenerlas en dos
 * idiomas invita a que una se actualice y la otra no.
 */
export const SITE = {
  name: "Carlos García",
  domain: "https://carlosmgg.dev",
  email: "charlesmgg1997@gmail.com",
  github: "https://github.com/CharlesMGG",
  linkedin: "https://www.linkedin.com/in/carlos-garcia-186215259",
  // TODO Carlos: reemplazar por el usuario real de Instagram
  instagram: "https://www.instagram.com/carlosmgg/",
  instagramHandle: "@carlosmgg",
  repo: "https://github.com/CharlesMGG/carlosmgg.dev",
} as const;
