import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { FilterOption, Car } from '@/components/interfaces'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAllFiltersAndOptions(allCarsData: Car[]) {
  const allFilterOptions = [
    {
      id: 'fuelType',
      displayName: 'Fuel Type'
    },
    {
      id: 'brand',
      displayName: 'Brand'
    },
    {
      id: 'options.winterTires',
      displayName: 'Winter Tires'
    },
    {
      id: 'options.towbar',
      displayName: 'Towbar'
    }
  ]

  // Loop over all cars and get all filter options
  const allFilters = allCarsData.reduce((result: any, car: Car) => {
    allFilterOptions.forEach((filterOption) => {
      if (filterOption.id.includes('.')) {
        const [first, second] = filterOption.id.split('.')
        const value = car.resource[first]?.[second]
        
        // Early return if value doens't exist
        if (!value) return

        if (!result[filterOption.id]?.find((filter: FilterOption) => filter.value == value)) {
          result[filterOption.id].push({id: filterOption.id, value})
        }
      } else {
        const value = car.resource[filterOption.id]

        // Early return if value doens't exist
        if (!value) return

        if (!result[filterOption.id]?.find((filter: FilterOption) => filter.value == value)) {
          result[filterOption.id].push({id: filterOption.id, value})
        }
      }
    })
    return result
  }, {
    fuelType: [],
    brand: [],
    'options.winterTires': [],
    'options.towbar': []
  })

  return allFilterOptions.map((filterOption) => {
    return {
      ...filterOption,
      options: allFilters[filterOption.id]
    }
  })
}

/**
 * Get all cars that conform to the filter option
 * 
 * @param selectedFilter
 * @param allCarsData 
 * @returns 
 */
export function getAllCarsFittingFilter(selectedFilter: FilterOption, allCarsData: Car[]) {
  if (!selectedFilter) return allCarsData

  return allCarsData.filter((car: Car) => {
    if (selectedFilter?.id.includes('.')) {
      const [first, second] = selectedFilter.id.split('.')
      
      return car.resource[first][second] == selectedFilter.value
    } else {
      return car.resource[selectedFilter.id] == selectedFilter.value
    }
  })
}