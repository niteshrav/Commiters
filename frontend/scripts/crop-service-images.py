from pathlib import Path

from PIL import Image

SRC = Path(
    r"C:\Users\SMILE\.cursor\projects\c-Users-SMILE-Documents-Committers\assets"
    r"\c__Users_SMILE_AppData_Roaming_Cursor_User_workspaceStorage_empty-window_images_"
    r"image-caa50dd1-6b6f-4085-adef-370a899ce559.png"
)
OUT = Path(__file__).resolve().parent.parent / "public" / "assets" / "services"
im = Image.open(SRC).convert("RGB")
panel = im.crop((10, 9, 1012, 570))

# Pixel bounds on the inner panel (from mock inspection).
BOXES = {
    "website-development": (38, 92, 246, 208),
    "web-applications": (262, 92, 488, 208),
    "mobile-applications": (502, 92, 728, 208),
    "e-commerce-development": (742, 92, 968, 208),
    "ai-integration": (38, 318, 344, 434),
    "automation-tools": (358, 318, 664, 434),
    "mvp-development": (678, 318, 984, 434),
}


def avg_color(box):
    c = panel.crop(box)
    px = list(c.getdata())
    return sum(sum(p) for p in px) / (len(px) * 3)


for name, box in BOXES.items():
    print(name, "avg", round(avg_color(box), 1))

for name, box in BOXES.items():
    crop = panel.crop(box)
    crop = crop.resize((crop.width * 2, crop.height * 2), Image.Resampling.LANCZOS)
    crop.save(OUT / f"{name}.jpg", quality=92, optimize=True)
