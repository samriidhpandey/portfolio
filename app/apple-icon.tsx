import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B0D13 0%, #131722 50%, #1B202E 100%)",
          borderRadius: "40px",
          border: "5px solid #FF6B00",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 900,
            fontFamily: "monospace",
            fontSize: "76px",
            lineHeight: 1,
          }}
        >
          <span style={{ color: "#FF5500" }}>S</span>
          <span style={{ color: "#F59E0B" }}>P</span>
        </div>
        <div
          style={{
            marginTop: "8px",
            fontSize: "13px",
            fontWeight: 800,
            fontFamily: "monospace",
            letterSpacing: "4px",
            color: "#FF8800",
          }}
        >
          SAMRIDH
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
