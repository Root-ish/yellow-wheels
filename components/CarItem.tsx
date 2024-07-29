import { GiElectric } from 'react-icons/gi';
import Link from "next/link";
import { LuFuel } from "react-icons/lu";
import { FaCar } from "react-icons/fa";
import { CarResource } from "@/components/interfaces";

const CarItem = (props: CarResource) => {  
  return ( 
    <li className="flex gap-2 hover:shadow-lg border rounded-lg w-full py-3 px-4 items-start transition-shadow">
      <Link href={`/car/${props.id}`} className="flex gap-2">
        <div className='bg-slate-200 rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center'>
          <FaCar />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex justify-between'> 
            <h4 className="font-medium text-lg">{props.alias}</h4>
            <h5 className='flex gap-1'>€{props.price.hourRate} /per hour</h5>
          </div>
          
          <ul className="md:grid md:grid-cols-2 gap-2">
            <li className='flex gap-1'>
              <h5 className='font-medium'>Location: </h5>
              <p className=''>{props.location}</p>
            </li>
            <li className='flex gap-1'>
              <h5 className='font-medium'>Fuel type: </h5>
              <p className='flex gap-2 justify-center items-center'>{props.fuelType === "elektrisch" ? <GiElectric /> : <LuFuel /> } {props.fuelType}</p>
            </li>
            <li className='flex gap-1'>
              <h5 className='font-medium'>Brand: </h5>
              <p className=''>{props.brand}</p>
            </li>
            <li className='flex gap-1'>
              <h5 className='font-medium'>Model: </h5>
              <p className=''>{props.model}</p>
            </li>
          </ul>
        </div>
      </Link>
    </li>
   );
}
 
export default CarItem;