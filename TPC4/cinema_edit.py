import json

def add_ids_to_filmes(json_file):
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    # Vamos assumir que existe uma lista "filmes" dentro do dicionário
    filmes = data.get("filmes", [])
    
    # Adicionar um id numérico sequencial a cada filme
    for idx, filme in enumerate(filmes, start=1):
        filme["id"] = idx
    
    # Guardar as alterações no mesmo ficheiro (ou num ficheiro de destino)
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    add_ids_to_filmes("cinema.json")