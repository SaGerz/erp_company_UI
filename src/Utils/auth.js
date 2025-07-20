export function decodeJwt(token) {
  if (!token) return null;
  const payload = token.split('.')[1];
  const decoded = JSON.parse(atob(payload));
  return decoded;
}
