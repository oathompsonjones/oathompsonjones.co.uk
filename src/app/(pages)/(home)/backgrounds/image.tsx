import Image from "next/image";
import desk from "images/desk.jpg";

export default function BackgroundImage(): React.ReactNode {
    return (
        <Image
            alt="Picture of a computer desk."
            src={desk}
            style={{
                filter: "brightness(50%)",
                height: "100%",
                left: "50%",
                objectFit: "cover",
                overflow: "hidden",
                position: "absolute",
                top: 0,
                transform: "translateX(-50%)",
                width: "100%"
            }}
        />
    );
}
