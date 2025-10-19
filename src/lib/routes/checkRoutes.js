export default function isRouteMatched(pathname, routes = []) {
  return routes.some((route) => pathname.startsWith(route));
}
