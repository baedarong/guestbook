export function cls(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
