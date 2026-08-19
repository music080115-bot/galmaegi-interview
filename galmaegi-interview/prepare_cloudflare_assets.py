from pathlib import Path
from PIL import Image

SOURCE_DIR = Path("/home/ubuntu/webdev-static-assets")
OUTPUT_DIR = Path("/home/ubuntu/galmaegi-interview/client/public/media")

ASSETS = {
    "intro.png": "intro.webp",
    "message.png": "message.webp",
    "reason.png": "reason.webp",
    "hardship.png": "hardship.webp",
    "fun.png": "fun.webp",
    "episode.png": "episode.webp",
    "audience.png": "audience.webp",
}


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    for source_name, output_name in ASSETS.items():
        with Image.open(SOURCE_DIR / source_name) as image:
            image = image.convert("RGB")
            image.thumbnail((1600, 9000), Image.Resampling.LANCZOS)
            image.save(OUTPUT_DIR / output_name, "WEBP", quality=88, method=6)
            print(f"Created {output_name}: {image.width}×{image.height}")


if __name__ == "__main__":
    main()
