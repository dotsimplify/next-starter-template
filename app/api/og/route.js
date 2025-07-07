import { ImageResponse } from "next/og";

// export const runtime = "edge";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const hasTitle = searchParams.has("title");

  const title = hasTitle ? searchParams.get("title") : "My Logo";
  const fonts = await fetch(
    new URL("/public/fonts/Helvetica-Black.woff", import.meta.url)
  ).then((res) => res.arrayBuffer());
  const logo = await fetch(new URL("/public/logo.png", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  const options = {
    fonts: [
      {
        name: "Helvetica",
        data: fonts,
        style: "normal",
      },
    ],
    width: 512,
    height: 512,
  };

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          backgroundImage:
            "linear-gradient(90deg,rgba(238, 250, 12, 1) 0%, rgba(230, 221, 48, 1) 59%, rgba(237, 221, 83, 1) 93%)",

          fontFamily: "Helvetica",
          border: "4px solid yellow",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img height={48} width={48} src={logo} />
          <span
            style={{
              marginLeft: 16,
              fontSize: 40,
              color: "#000",
            }}
          >
            {process.env.NEXT_PUBLIC_SITE_NAME}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px 50px",
            margin: "0 42px",
            fontSize: 40,
            width: "auto",
            maxWidth: 550,
            textAlign: "center",
            color: "#000",
            lineHeight: 1.4,
            textTransform: "uppercase",
          }}
        >
          {title}
        </div>
      </div>
    ),
    options
  );
}
