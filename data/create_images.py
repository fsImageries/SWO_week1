import csv

from pathlib import Path
from pprint import pprint


img_dir = r"C:\\Users\\farooq.singh\\OneDrive - SoftwareONE\Desktop\\week1_html\\images"
img_dir = Path(img_dir)


csv_path = r"C:\\Users\\farooq.singh\\OneDrive - SoftwareONE\Desktop\\week1_html\\data\\images.csv"
with open(csv_path, mode="w") as csv_file:
    fieldnames = ["filepath", "name"]
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()


    for path in img_dir.glob("**/*"):
        name = path.stem
        filepath = f"images/{path.name}"

        writer.writerow({"filepath": filepath, "name": name})
