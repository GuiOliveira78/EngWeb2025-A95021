import json
import re
from pathlib import Path

def parse_list_field(value):
    if isinstance(value, list):
        return value
    if value.startswith("[") and value.endswith("]"):
        inner = value[1:-1].strip()
        if not inner:
            return []
        items = re.split(r",\s*(?=(?:[^()]*\([^()]*\))*[^()]*$)", inner)
        return [item.strip().strip("'\"") for item in items]
    return [value]

dataset_path = Path("dataset.json")
output_books_path = Path("books.json")
output_authors_path = Path("authors.json")

with dataset_path.open("r", encoding="utf-8") as f:
    books = json.load(f)

authors_map = {}
authors_list = []
next_author_id = 1

for i, book in enumerate(books):
    # Rename bookId to _id and reorder dictionary
    book_id = book.pop("bookId")
    book = {"_id": book_id, **book}
    books[i] = book

    # Convert string list fields to actual lists
    for key in ["genres", "characters", "setting", "awards", "ratingsByStars"]:
        if key in book:
            book[key] = parse_list_field(book[key])

    # Process author(s) with robust splitting for commas outside parentheses
    author_str = book.get("author", "")
    author_names = re.split(r",\s*(?=(?:[^()]*\([^()]*\))*[^()]*$)", author_str) if author_str else []
    author_ids = []
    for name in author_names:
        name = name.strip()
        if name not in authors_map:
            author_id = f"a{next_author_id}"
            next_author_id += 1
            authors_map[name] = author_id
            authors_list.append({"_id": author_id, "name": name})
        author_ids.append(authors_map[name])
    book["author"] = author_ids

with output_books_path.open("w", encoding="utf-8") as f:
    json.dump(books, f, ensure_ascii=False, indent=2)

with output_authors_path.open("w", encoding="utf-8") as f:
    json.dump(authors_list, f, ensure_ascii=False, indent=2)