"""Pruebas de caja negra del buscador. Ejecutar con:
    python3 -m unittest -v test_buscador
"""
import unittest

from buscador import (CATEGORIAS, MENSAJE_SIN_DATO, MENSAJE_SIN_RESULTADOS,
                      buscar, cargar_catalogo, disponibilidad, formatear, mostrar)

CATALOGO = cargar_catalogo()


def titulos(resultados):
    return [libro["titulo"] for libro in resultados]


class BusquedaPorTituloOAutor(unittest.TestCase):
    def test_por_titulo(self):
        self.assertEqual(titulos(buscar(CATALOGO, "principito")), ["El principito"])

    def test_por_autor(self):
        self.assertEqual(sorted(titulos(buscar(CATALOGO, "grimm"))),
                         ["El zapatero y los duendes", "Hansel y Gretel"])

    def test_ignora_mayusculas_y_tildes(self):
        self.assertEqual(titulos(buscar(CATALOGO, "BECQUER")), ["Rimas y leyendas"])
        self.assertEqual(titulos(buscar(CATALOGO, "Saint-Exupéry")), ["El principito"])

    def test_varias_palabras(self):
        self.assertEqual(titulos(buscar(CATALOGO, "quijote cervantes")), ["Don Quijote de la Mancha"])


class BusquedaSinResultados(unittest.TestCase):
    def test_texto_inexistente(self):
        self.assertEqual(buscar(CATALOGO, "xyzabc"), [])
        self.assertEqual(mostrar(buscar(CATALOGO, "xyzabc")), MENSAJE_SIN_RESULTADOS)

    def test_consulta_vacia(self):
        self.assertEqual(buscar(CATALOGO, ""), [])
        self.assertEqual(buscar(CATALOGO, "   "), [])


class NavegacionPorCategoria(unittest.TestCase):
    def test_categoria(self):
        self.assertEqual(titulos(buscar(CATALOGO, categoria="Teatro")), ["La casa de Bernarda Alba"])

    def test_categoria_sin_tilde(self):
        self.assertEqual(titulos(buscar(CATALOGO, categoria="poesia")), ["Rimas y leyendas"])

    def test_categoria_y_texto(self):
        self.assertEqual(len(buscar(CATALOGO, "grimm", "Cuentos")), 2)
        self.assertEqual(buscar(CATALOGO, "grimm", "Novelas"), [])

    def test_todas_las_categorias_tienen_libros(self):
        for categoria in CATEGORIAS:
            self.assertTrue(buscar(CATALOGO, categoria=categoria), categoria)


class Disponibilidad(unittest.TestCase):
    def test_varios_ejemplares(self):
        libro = buscar(CATALOGO, "principito")[0]
        self.assertEqual(disponibilidad(libro), "2 ejemplares disponibles (de 3)")

    def test_un_ejemplar(self):
        libro = buscar(CATALOGO, "hansel")[0]
        self.assertEqual(disponibilidad(libro), "1 ejemplar disponible (de 1)")

    def test_ninguno_disponible(self):
        libro = buscar(CATALOGO, "patito")[0]
        self.assertEqual(disponibilidad(libro), "No hay ejemplares disponibles (0 de 2)")

    def test_dato_faltante_en_el_catalogo(self):
        libro = buscar(CATALOGO, "cerditos")[0]
        self.assertEqual(disponibilidad(libro), MENSAJE_SIN_DATO)

    def test_datos_invalidos_no_rompen(self):
        casos = [{}, {"ejemplares": None}, {"ejemplares": {}},
                 {"ejemplares": {"total": 2}}, {"ejemplares": {"total": "dos", "disponibles": 1}},
                 {"ejemplares": {"total": 2, "disponibles": 3}},
                 {"ejemplares": {"total": 2, "disponibles": -1}}]
        for libro in casos:
            self.assertEqual(disponibilidad(libro), MENSAJE_SIN_DATO, libro)

    def test_libro_sin_titulo_ni_autor(self):
        texto = formatear({"categoria": "Cuentos"})
        self.assertIn("(sin título)", texto)
        self.assertIn(MENSAJE_SIN_DATO, texto)


if __name__ == "__main__":
    unittest.main()
