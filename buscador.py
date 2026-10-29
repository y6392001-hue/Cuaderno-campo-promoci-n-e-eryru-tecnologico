#!/usr/bin/env python3
"""Prototipo del buscador con disponibilidad de Ñe'ẽryru Tecnológico.

Funciona en la consola, sin tablet y con datos de prueba (catalogo_prueba.json).
Solo usa la biblioteca estándar de Python 3.

Ejemplos:
    python3 buscador.py principito
    python3 buscador.py grimm
    python3 buscador.py --categoria Teatro
    python3 buscador.py            (modo interactivo)
"""
import argparse
import json
import unicodedata
from pathlib import Path

RUTA_CATALOGO = Path(__file__).with_name("catalogo_prueba.json")
CATEGORIAS = ["Cuentos", "Novelas", "Poesía", "Teatro", "Ensayo", "Diccionarios"]
MENSAJE_SIN_RESULTADOS = "Sin resultados"
MENSAJE_SIN_DATO = "Disponibilidad no registrada"
MENSAJE_UBICACION = "Ubicación: en desarrollo"


def normalizar(texto):
    """Pasa a minúsculas y quita tildes, para que 'Bécquer' y 'BECQUER' coincidan."""
    texto = unicodedata.normalize("NFD", str(texto).lower())
    return "".join(c for c in texto if unicodedata.category(c) != "Mn").strip()


def cargar_catalogo(ruta=RUTA_CATALOGO):
    with open(ruta, encoding="utf-8") as archivo:
        return json.load(archivo)


def buscar(catalogo, consulta="", categoria=None):
    """Devuelve los libros cuyo título o autor contiene todas las palabras de la
    consulta, dentro de la categoría indicada (si hay una).
    Sin consulta y sin categoría devuelve una lista vacía."""
    palabras = normalizar(consulta).split()
    cat = normalizar(categoria) if categoria else ""
    if not palabras and not cat:
        return []
    resultados = []
    for libro in catalogo:
        if cat and normalizar(libro.get("categoria", "")) != cat:
            continue
        texto = normalizar(libro.get("titulo", "")) + " " + normalizar(libro.get("autor", ""))
        if all(palabra in texto for palabra in palabras):
            resultados.append(libro)
    return resultados


def _entero(valor):
    return valor if isinstance(valor, int) and not isinstance(valor, bool) else None


def disponibilidad(libro):
    """Texto de disponibilidad. Si faltan datos o son inválidos no falla:
    devuelve 'Disponibilidad no registrada'."""
    ejemplares = libro.get("ejemplares")
    if not isinstance(ejemplares, dict):
        return MENSAJE_SIN_DATO
    total = _entero(ejemplares.get("total"))
    libres = _entero(ejemplares.get("disponibles"))
    if total is None or libres is None or total < 0 or libres < 0 or libres > total:
        return MENSAJE_SIN_DATO
    if libres == 0:
        return f"No hay ejemplares disponibles (0 de {total})"
    if libres == 1:
        return f"1 ejemplar disponible (de {total})"
    return f"{libres} ejemplares disponibles (de {total})"


def formatear(libro):
    titulo = libro.get("titulo") or "(sin título)"
    autor = libro.get("autor") or "autor no registrado"
    categoria = libro.get("categoria") or "sin categoría"
    return (f"{titulo} — {autor} [{categoria}]\n"
            f"   {disponibilidad(libro)}\n"
            f"   {MENSAJE_UBICACION}")


def mostrar(resultados):
    if not resultados:
        return MENSAJE_SIN_RESULTADOS
    return "\n\n".join(formatear(libro) for libro in resultados)


def main():
    parser = argparse.ArgumentParser(description="Buscador de la biblioteca (prototipo con datos de prueba)")
    parser.add_argument("consulta", nargs="*", help="título o autor")
    parser.add_argument("--categoria", choices=CATEGORIAS, help="filtrar por categoría")
    args = parser.parse_args()
    try:
        catalogo = cargar_catalogo()
    except (OSError, json.JSONDecodeError) as error:
        raise SystemExit(f"No se pudo leer el catálogo de prueba: {error}")

    if args.consulta or args.categoria:
        consulta = " ".join(args.consulta)
        print(mostrar(buscar(catalogo, consulta, args.categoria)))
        return

    print("Ñe'ẽryru Tecnológico · prototipo con datos de prueba")
    print("Categorías: " + ", ".join(CATEGORIAS))
    while True:
        consulta = input("\nBuscar por título, autor o categoría (Enter para salir): ").strip()
        if not consulta:
            break
        categoria = next((c for c in CATEGORIAS if normalizar(c) == normalizar(consulta)), None)
        print(mostrar(buscar(catalogo, "" if categoria else consulta, categoria)))


if __name__ == "__main__":
    main()
