import json
from collections import defaultdict

def verificar_matriculas_repetidas():
    with open("dataset_reparacoes.json", "r", encoding="utf-8") as file:
        dados = json.load(file)
    
    contador_matriculas = defaultdict(int)

    # Contar quantas vezes cada matrícula aparece
    for reparacao in dados["reparacoes"]:
        matricula = reparacao["viatura"]["matricula"]
        contador_matriculas[matricula] += 1

    # Verificar quais matrículas aparecem mais de uma vez
    duplicadas = {matricula: count for matricula, count in contador_matriculas.items() if count > 1}

    if duplicadas:
        i=0
        print("⚠️ Matrículas com duas ou mais reparações:")
        for matricula, count in duplicadas.items():
            print(f"- Matrícula {matricula} teve {count} reparações.")
            i+=1
        print(f"Total de {i} matrículas com duas ou mais reparações.")
    else:
        print("✅ Todas as matrículas são únicas.")
    
    

verificar_matriculas_repetidas()



'''
Este programa verifica quantas e quais as matrículas que têm duas ou mais reparações no dataset fornecido.
'''