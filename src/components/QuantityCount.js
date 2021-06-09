import { updateQuantity } from "../slices/basketSlice";
import { useDispatch } from 'react-redux';
import { MinusSmIcon, PlusIcon} from "@heroicons/react/solid";


function QuantityCount({ setQuantity, quantity = 1, dispatch = false, id = null }) {
    const newDispatch = useDispatch()

    const increaseCount = () => {
        setQuantity(quantity + 1)
        updateQuantityHere(quantity + 1)
    }

    const decreaseCount = () => {
        if(quantity > 0) {
            setQuantity(quantity - 1)
            updateQuantityHere(quantity - 1)
        }
    }

    const updateQuantityHere = count => {
        if(dispatch){
            const product = {id, quantity: count}
            newDispatch(updateQuantity(product))
        }
    }


    return (
        <div className="flex justify-between xs:justify-start space-x-2">
            <button
                className="button sm:p-2"
                onClick={decreaseCount}>
                <MinusSmIcon className="h-5 text-black" />
            </button>
            <div className="flex p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap items-center justify-center">
                <h1 className="text-sm text-gray-500 mr-1"> Quantity : </h1> <span className="font-bold">{quantity}</span>
            </div>
            <button className="button sm:p-2" onClick={increaseCount}>
                <PlusIcon className="h-5 text-black" />
            </button>
        </div>
    )
}

export default QuantityCount