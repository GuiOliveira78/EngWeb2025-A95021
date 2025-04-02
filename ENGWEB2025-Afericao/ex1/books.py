import json
import ast

f = open("dataset.json", encoding='utf-8')
bd = json.load(f)
f.close()

# campos que são listas
campos = ["genres", "characters", "awards", "ratingsByStars", "setting"]

for reg in bd:
    for campo in campos:
        data = reg[campo]
        reg[campo] = ast.literal_eval(data)

with open("books.json", "w", encoding='utf-8') as f:
    json.dump(bd, f, ensure_ascii=False, indent=4)
