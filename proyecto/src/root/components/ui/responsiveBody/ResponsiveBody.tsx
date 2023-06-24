

import React from 'react'

export default function ResponsiveBody() {
    return (
        <>
            <body className="font-sans min-h-screen text-center bg-white antialiased grid gap-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-4 md:grid-rows-4 lg:grid-rows-3">
                <div className="bg-black shadow-md rounded p-2 md:col-span-4 lg:col-span-4 lg:order-1">hbox-top</div>
                <div className="bg-green shadow-md rounded p-2 md:col-span-4 lg:col-span-1 lg:row-span-2 lg:order-2">vbox-center1</div>
                <div className="bg-lithBlue shadow-md rounded p-2 text-white md:col-span-1 md:row-span-3 lg:col-span-1 lg:row-span-2 lg:order-4">vbox-center2</div>
                <div className="bg-red shadow-md rounded p-2 text-white md:col-span-3 md:row-span-2 lg:col-span-2 lg:row-span-2 lg:order-3">vbox-center3</div>
                <div className="bg-blue shadow-md rounded p-2 flex justify-center items-center space-x-5 md:col-span-4 md:row-span-1 lg:col-span-4 lg:order-5">
                    hbox-bottom
                    <button className="bg-transparent text-lithGray text-lg font-semibold border-2 border-lithGray rounded-sm p-1.5 transition-all duration-1000 ease-in-out shadow-md hover:shadow-none active:shadow-inner">AyudaDios</button>
                </div>
            </body>
        </>
    )
}
