export function optimizeImage(
  url: string,
  width = 1200
) {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  return url.replace(
    "/upload/",
    `/upload/c_limit,w_${width}/dpr_auto/f_auto/q_auto/`
  );
}
