import localFont from "next/font/local";

export const robotoFlex = localFont({
  src: "../public/fonts/roboto/RobotoFlex-VariableFont_GRAD,XOPQ,XTRA,YOPQ,YTAS,YTDE,YTFI,YTLC,YTUC,opsz,slnt,wdth,wght.ttf",
  variable: "--font-roboto",
  display: "swap",
  weight: "100 1000",
});

// Temporarily commented out for Safari compatibility testing
// export const nkduyMono = localFont({
//   src: [
//     {
//       path: "../public/fonts/nkduy/NKDuyMono-SemiBold.woff2",
//       weight: "600",
//       style: "normal",
//     },
//     {
//       path: "../public/fonts/nkduy/NKDuyMono-SemiBold.ttf",
//       weight: "600",
//       style: "normal",
//     },
//   ],
//   variable: "--font-nkduy",
//   display: "swap",
// });

// Temporary placeholder to prevent import errors
export const nkduyMono = { variable: "" };
