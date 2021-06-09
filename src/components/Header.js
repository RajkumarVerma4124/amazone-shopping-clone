import Image from 'next/image'
import {
    MenuIcon,
    SearchIcon,
    ShoppingCartIcon,
    
} from '@heroicons/react/outline'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router';    
import { useSelector } from 'react-redux';
import { selectTotalItems } from '../slices/basketSlice';

function Header(props) {

    const [session] = useSession()
    const router = useRouter()
    // const items = useSelector(selectItems);
    const selectTotalItem = useSelector(selectTotalItems)


    return (
        <header className="sticky top-0 z-50">
            {/* Top Nav */}
            <div className='flex items-center bg-amazon_blue p-1 flex-grow py-2'>
                {/* Left */}
                <div className='mt-2 flex items-center flex-grow sm:flex-grow-0'>
                    <Image
                        src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                        width={150}
                        height={40}
                        objectFit="contain"
                        className='cursor-pointer active:transform active:scale-90'
                        onClick={() => router.push('/')}
                    />
                </div>

                {/* Custom SearchBar*/}
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500'>

                    {router.route === "/furniture" ? 
                    <>
                    <input 
                    className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" 
                    type='text'
                    placeholder={router.route === "/furniture" ? "Search in products listed below…" : ""}
                    onInput={(event) => router.route === "/furniture" && props.onSearchValue(event.target.value)}
                    />
                    <SearchIcon className='h-12 p-4'/> 
                    </>
                    : 
                    <>
                    <input
                    className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" 
                    type='text'
                    placeholder={router.route === "/" ? "Search in products listed below…" : ""}
                    onInput={(event) => router.route === "/" && props.onSearchValue(event.target.value)}
                    />
                    <SearchIcon className='h-12 p-4'/>
                    </>
                    }
                    
    
                </div>

                {/* Right */}
                <div className=' text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap'>
                    <div onClick={!session ? signIn : signOut} className='link'>
                        <p>{session ? `Hello, ${session.user.name}` : 'Sign In'}</p>
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>
                    <div onClick={() => session && router.push('/orders')}className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    <div title="Click To Checkout Product" onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold'>
                            {selectTotalItem}
                        </span>
                        <ShoppingCartIcon className='h-10'/>
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>
            {/* Bottom Nav */}
            <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
                <p onClick={() => router.push('/product')} className='link flex items-center'>
                    <MenuIcon className="h-6 mr-1"/> 
                    All Furniture 
                </p>
                <p onClick={() => router.push('/products')} className='link flex items-center'>
                    All Products
                </p>
                <p className='link '>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
                <p className='link hidden lg:inline-flex' onClick={() => router.push('/furniture')} >Home Decor</p>
            </div>
        </header>
    )
}

export default Header
