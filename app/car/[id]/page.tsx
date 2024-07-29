"use client";
import { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import Map from "@/components/Map";
import { MapProvider } from "@/providers/MapProdvider";
import { GiElectric } from 'react-icons/gi';
import { LuFuel } from "react-icons/lu";
import { Car } from "@/components/interfaces";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [car, setCar] = useState(Object);
  const config = {
    method: 'POST'
  }

  useEffect(() => {
    fetch('/api', config)
      .then(response => response.json())
      .then(data => {
        const allCars = data.results

        const specificCar = allCars.find((car: Car) => {
          return car.resource.id == id
        })

        setCar(specificCar)
      })
  }, []);

  return (
    <div>
      {car.resource ? (
        <div className="flex flex-col">
          <MapProvider>
            <Map id={car.resource.id} latitude={car.resource.latitude} longitude={car.resource.longitude}></Map>
            <div className="grid grid-cols-5 gap-2 py-3 px-4">
              <div className='bg-slate-200 rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center'>
                <FaCar />
              </div>
              <div className='flex flex-col justify-between col-start-2 col-end-6'>
                <h4 className="font-medium text-lg">{car.resource.alias}</h4>
                <h5 className='flex gap-1 text-sm'>€{car.resource.price.hourRate} /per hour</h5>
              </div>
              <ul className="md:grid md:grid-cols-2 gap-2 col-start-2 col-end-6 row-span-2">
                <li className='flex gap-1'>
                  <h5 className='font-medium'>Location: </h5>
                  <p className=''>{car.resource.location}</p>
                </li>
                <li className='flex gap-1'>
                  <h5 className='font-medium'>Fuel type: </h5>
                  <p className='flex gap-2 justify-center items-center'>{car.resource.fuelType === "elektrisch" ? <GiElectric /> : <LuFuel />} {car.resource.fuelType}</p>
                </li>
                <li className='flex gap-1'>
                  <h5 className='font-medium'>Brand: </h5>
                  <p className=''>{car.resource.brand}</p>
                </li>
                <li className='flex gap-1'>
                  <h5 className='font-medium'>Model: </h5>
                  <p className=''>{car.resource.model}</p>
                </li>
              </ul>
            </div>
          </MapProvider>
        </div>
      ) : (
        <div className="w-full h-[60vh] bg-gray-200 animate-pulse">

        </div>
      )}
    </div>
  )
}