"use client";

import MainNavbar from "@/components/navbar/mainNavbar";

export default function Home() {
  return (
    <>
      <div className="w-full h-dvh bg-purple-100 ">
        <MainNavbar />
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
          <h1 className="text-3xl font-bold mb-6 text-purple-800">¿Qué es GestPro?</h1>
          <p className="mb-6 text-gray-700 leading-relaxed">
            GestPro es una aplicación SaaS diseñada para la gestión de inventarios y facturación. 
            Nuestra plataforma permite a las empresas llevar un control detallado de sus productos, 
            gestionar el stock y generar facturas de manera eficiente.
          </p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">¿Para qué sirve?</h2>
          <p className="mb-6 text-gray-700 leading-relaxed">
            GestPro sirve para optimizar la administración de inventarios y procesos de facturación. 
            Con nuestra herramienta, puedes:
          </p>
          <ul className="list-disc list-inside mb-6 text-gray-700 leading-relaxed">
            <li>Registrar y monitorear productos.</li>
            <li>Generar y enviar facturas electrónicas.</li>
            <li>Obtener reportes detallados de ventas y stock.</li>
            <li>Automatizar tareas repetitivas y reducir errores humanos.</li>
          </ul>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-700">¿Quiénes somos?</h2>
          <p className="text-gray-700 leading-relaxed">
            Somos un equipo de profesionales apasionados por la tecnología y la eficiencia empresarial. 
            Nuestro objetivo es proporcionar herramientas innovadoras que ayuden a las empresas a crecer 
            y mejorar sus procesos internos.
          </p>
        </div>
      </div>
    </>
  );
}
