from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H

URL = "https://galmaegi-interview.pages.dev/"
OUTPUT = Path("/home/ubuntu/Downloads/galmaegi-interview-qr.png")


def main() -> None:
    code = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_H,
        box_size=16,
        border=5,
    )
    code.add_data(URL)
    code.make(fit=True)
    image = code.make_image(fill_color="#1D1F16", back_color="#FFF9EC").convert("RGB")
    image.save(OUTPUT, "PNG", optimize=True)
    print(f"QR created: {OUTPUT}")
    print(f"Encoded URL: {URL}")


if __name__ == "__main__":
    main()
