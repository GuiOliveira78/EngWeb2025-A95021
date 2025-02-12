import json

def editReparacoes():
    new_json = {
        "reparacoes": [],
        "intervencoes": [],
        "viaturas": []
    }
    
    i=0
    with open("dataset_reparacoes.json", "r") as file:
        dados = json.load(file)  # Carrega o JSON em um dicionário
        
        for i, reparacao in enumerate(dados["reparacoes"], start=1):  # i começa em 1 e vai sendo incrementado
            nova_reparacao = {
                "id": i,
                "nome": reparacao["nome"],
                "nif": reparacao["nif"],
                "data": reparacao["data"],
                "matricula": reparacao["viatura"]["matricula"],
                "nr_intervencoes": reparacao["nr_intervencoes"],
                "codigos_intervencoes": [intervencao["codigo"] for intervencao in reparacao["intervencoes"]]
            }
            nova_reparacao["codigos_intervencoes"] = sorted(nova_reparacao["codigos_intervencoes"])
            
            nova_viatura = {
                "matricula": reparacao["viatura"]["matricula"],
                "marca": reparacao["viatura"]["marca"],
                "modelo": reparacao["viatura"]["modelo"],
                "nr_intervencoes": reparacao["nr_intervencoes"],
                "codigos_intervencoes": [intervencao["codigo"] for intervencao in reparacao["intervencoes"]]
            }
            nova_viatura["codigos_intervencoes"] = sorted(nova_viatura["codigos_intervencoes"])
            
            for intervencao in reparacao["intervencoes"]:
                nova_intervencao = {
                    "codigo": intervencao["codigo"],
                    "nome": intervencao["nome"],
                    "descricao": intervencao["descricao"],
                }
                if nova_intervencao not in new_json["intervencoes"]:
                    new_json["intervencoes"].append(nova_intervencao)
                
            # Agora tenho de adicionar estes novos itens a new_json verificando se já existem
            if nova_reparacao not in new_json["reparacoes"]:
                new_json["reparacoes"].append(nova_reparacao)
                
            if not any(viatura["matricula"] == nova_viatura["matricula"] for viatura in new_json["viaturas"]):
                new_json["viaturas"].append(nova_viatura)
            else:
                for viatura in new_json["viaturas"]:
                    if viatura["matricula"] == nova_viatura["matricula"]:
                        viatura["nr_intervencoes"] += nova_viatura["nr_intervencoes"]
                        for codigo in nova_viatura["codigos_intervencoes"]:
                            viatura["codigos_intervencoes"].append(codigo)
                        viatura["codigos_intervencoes"] = sorted(viatura["codigos_intervencoes"])
    
    new_json["reparacoes"] = sorted(new_json["reparacoes"], key=lambda r: r["id"])
    new_json["intervencoes"] = sorted(new_json["intervencoes"], key=lambda i: i["codigo"])
    new_json["viaturas"] = sorted(new_json["viaturas"], key=lambda v: v["matricula"])
    
    # Salvar o novo JSON
    with open("reparacoes_reorganizadas.json", "w", encoding="utf-8") as output_file:
        json.dump(new_json, output_file, indent=4, ensure_ascii=False)

    print("Novo JSON criado com sucesso!")            

editReparacoes()