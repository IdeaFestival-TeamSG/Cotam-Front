export const getCookie = (name: string): string | undefined => {
  const cookies = `; ${document.cookie}`;
  const cookie = cookies.split(`; ${name}=`);
  if (cookie.length === 2) return cookie.pop()?.split(";").shift();
  return undefined;
};
