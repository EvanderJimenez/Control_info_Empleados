import React from "react";
//TODO: use the same name case in all files
export default function Prueba() {
  return (
    <>
      <nav className="bg-gray-200 py-4">
        <ul className="flex">
          <li className="mr-4">{/* TODO: Do not use a in Next.js */}
            <a href="#seccion1" className="text-gray-700 hover:text-gray-900">
              Sección 1
            </a>
          </li>
          <li className="mr-4">{/* TODO: Do not use a in Next.js */}
            <a href="#seccion2" className="text-gray-700 hover:text-gray-900">
              Sección 2
            </a>
          </li>
          <li className="mr-4">{/* TODO: Do not use a in Next.js */}
            <a href="#seccion3" className="text-gray-700 hover:text-gray-900">
              Sección 3
            </a>
          </li>
        </ul>
      </nav>

      <main>
        <section id="seccion1" className="p-8">
          <div className="bg-red"> Hola</div>
        </section>

        <section id="seccion2" className="p-8">
          <h2 className="text-xl font-bold">Sección 2</h2>
        </section>

        <section id="seccion3" className="p-8">
          <h2 className="text-xl font-bold">Sección 3</h2>
        </section>
      </main>
    </>
  );
}
