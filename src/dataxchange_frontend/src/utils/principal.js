export const shortenPrincipal = (principal) => {
  if (!principal || principal.length < 9) {
    return principal;
  }
  return `${principal.slice(0, 4)}...${principal.slice(-4)}`;
};