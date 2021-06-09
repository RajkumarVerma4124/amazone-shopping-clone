import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFilters, clearFilters, selectFilteredProducts, selectProducts } from "../slices/basketSlice"
import { getUniqueValues } from "../utils/helpers"
import styles from "../styles/Product.module.css"
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'

function AllFilter() {
    const dispatch = useDispatch()
    const all_products = useSelector(selectProducts)
    const [activeCategory, setActiveCategory] = useState('all')
    const [lastChange, setLastChange] = useState(null)
    const [showClear, setShowClear] = useState(false)
    const [price, setPrice] = useState(0)
    const [priceMax, setPriceMax] = useState(1)

    const categories = all_products ? getUniqueValues(all_products, 'category') : null

    const reFilter = (products, dont) => {
        const items = ['category']
        let filtered = products
        products.filter(item => item !== dont).map(item => {
            filtered = items.filter(product => product[item] === activeCategory)
        })
        return filtered
    }

    const filterCategory = (value, item) => {
        setShowClear(true)
        setActiveCategory(value)
        setLastChange('category')
        
    }

    useEffect(() => {
        const items = ['category']
        const hello = {
            category: activeCategory,
        }
        // const items = ['category', 'company', 'colors']
        if (all_products) {

            let filtered = all_products

            if (hello[lastChange] !== 'all') {
                filtered = all_products.filter(product => product[lastChange] === hello[lastChange])
            } else {
                items.forEach(x => {
                    filtered = (x == lastChange && hello[x] !== 'all') ? filtered.filter(product => product[x] === hello[x]) : filtered
                })
            }

            items.forEach(x => {
                if (hello[x] !== 'all') {
                    filtered = (x !== lastChange) ? filtered.filter(product => product[x] === hello[x]) : filtered
                }
            })
            dispatch(updateFilters(filtered))
        }

    }, [activeCategory, lastChange])

    useEffect(() => {
        if (!all_products) return false
        const max = all_products?.map(product => product.price).reduce((a, b) => Math.max(a, b))
        setPriceMax(max)
        setPrice(max)
    }, [all_products])

    const clearAllFilters = () => {
        dispatch(clearFilters())
        setShowClear(false)
        setActiveCategory('all')
        setPrice(priceMax)
    }

    const priceFilter = value => {
        setPrice(value)
        const filtered = all_products.filter(product => product.price <= value)
        dispatch(updateFilters(filtered))
        setShowClear(true)
    }

    return (
        <div className="flex flex-col mt-10">
            <div className="mb-4">
                <h2 className="font-bold text-base text-gray-600">
                    Categories
                </h2>
                <div className="flex flex-col my-5">
                    {categories && categories.map(value => (
                        <p key={value} className={`${value == activeCategory && styles.active_filter} text-gray-500 cursor-pointer mb-2`} onClick={() => filterCategory(value, 'category')}>{value}</p>
                    ))}
                </div>
            </div>
           
            <div className="mb-4 pr-10">
                <h2 className="font-bold text-base text-gray-600">
                    Price
                </h2>
                <div className="flex flex-col my-5">
                    <InputRange
                        maxValue={priceMax}
                        minValue={0}
                        value={price}
                        formatLabel={value => `$ ${value}`}
                        onChange={priceFilter}
                    />
                </div>
            </div>
            {showClear && <button onClick={clearAllFilters} className="button w-full">Clear Filter</button>}

        </div>
    )
}

export default AllFilter