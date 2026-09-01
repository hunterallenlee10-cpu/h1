import { ImageResponse } from "next/og";
import { H1_PALETTE } from "@/data/h1";
import { readLogoDataUrl } from "@/lib/logo";

/** Home-screen icon. iOS rounds the corners itself, so this tile is square. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readLogoDataUrl();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: H1_PALETTE.ink,
        }}
      >
        <img src={logo} alt="" width={107} height={130} />
      </div>
    ),
    size
  );
}
