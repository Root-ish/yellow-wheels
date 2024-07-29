"use client";

import { useEffect, useState } from "react";
import CarItem from "@/components/CarItem";
import { getAllFiltersAndOptions, getAllCarsFittingFilter } from "@/lib/utils";
import { IoFilterOutline } from "react-icons/io5";
import { AllFilterOptions, FilterOption, Car } from '@/components/interfaces'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function Home() {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [allAvailableFilters, setAllAvailableFilters] = useState<AllFilterOptions[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>({ id: '', value: '' });
  const config = {
    method: 'POST'
  }
  const handleFilter = (id: string, value: string) => {
    setSelectedFilter({ id, value })
  }

  useEffect(() => {
    fetch('/api', config)
      .then(response => response.json())
      .then(data => {
        setCars(data.results)
        setFilteredCars(data.results)
        setIsLoading(false)
        setAllAvailableFilters(getAllFiltersAndOptions(data.results))
      })
  }, []);

  useEffect(() => {
    const filteredCars = getAllCarsFittingFilter(selectedFilter, cars)

    setFilteredCars(filteredCars)
  }, [cars, selectedFilter])

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-start gap-2 animate-pulse">
        {[...Array(10)].map((x, index) =>
          <li key={index} className="flex gap-2 hover:shadow-lg border rounded-lg w-full py-3 px-4 items-start transition-shadow">
            <div className='bg-slate-200 rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center'>
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex justify-between'>
                <h4 className="font-medium text-lg w-full h-4 bg-slate-200"></h4>
                <h5 className='flex gap-1 w-full h-4 bg-slate-200'></h5>
              </div>

              <ul className="flex flex-col md:grid md:grid-cols-2 gap-2">
                <li className='flex gap-1 w-full h-4 bg-slate-200'>
                </li>
                <li className='flex gap-1 w-full h-4 bg-slate-200'>
                </li>
                <li className='flex gap-1 w-full h-4 bg-slate-200'>
                </li>
                <li className='flex gap-1 w-full h-4 bg-slate-200'>
                </li>
              </ul>
            </div>
          </li>
        )}
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2">
      <Sheet>
        <SheetTrigger className="border fixed z-40 right-4 bottom-4 bg-slate-200 px-5 py-2 rounded-full shadow-md flex justify-center items-center h-10"><IoFilterOutline />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-3">
          <SheetHeader>
            <SheetTitle className="text-left">Filter</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full justify-between">
            <ul className="flex flex-col gap-3 flex-1">
              {allAvailableFilters.map((filter => {
                if (filter.options.length > 1)
                  return (
                    <div key={filter.id} className="flex flex-col gap-4">
                      <h3 className="text-left font-medium text-md">
                        {filter.displayName}
                      </h3>

                      <ul className="flex flex-wrap gap-2">
                        {filter.options.map((option: FilterOption) => {
                          const isActive = selectedFilter?.value == option.value ? true : false

                          return (
                            <li className="row-span-3 border rounded-full py-2 px-4 data-[active=true]:bg-slate-500 data-[active=true]:text-white" key={option.value} data-active={isActive}>
                              <button onClick={() => handleFilter(filter.id, option.value)}>
                                {option.value.toString()}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )
              }))}
            </ul>
            <SheetTrigger className="rounded-full border py-2 px-4">Close</SheetTrigger>
          </div>
        </SheetContent>
      </Sheet>

      <ul className="flex flex-col justify-start gap-1 w-full">
        {filteredCars.length > 1 ? filteredCars?.map((car: Car) => {
          return (
            <CarItem key={car.resource.id} id={car.resource.id} alias={car.resource.alias} location={car.resource.location} fuelType={car.resource.fuelType} brand={car.resource.brand} model={car.resource.model} price={car.resource.price} />
          )
        }) : cars?.map((car: Car) => {
          return (
            <CarItem key={car.resource.id} id={car.resource.id} alias={car.resource.alias} location={car.resource.location} fuelType={car.resource.fuelType} brand={car.resource.brand} model={car.resource.model} price={car.resource.price} />
          )
        })
        }
      </ul>
    </main>
  );
}
