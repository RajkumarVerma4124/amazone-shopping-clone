function Footer() {
  return (
    <div className='flex flex-col' onClick={() => { 
        window.scrollTo(0, 0);
      }}
    >
      {/*Footer bar one*/}
      <div className='bg-amazon_blue-lightest hover:bg-amazon_blue-lighter text-sm p-3 w-full flex justify-center'>
        <button className='link text-gray-300'>Back to top</button>
      </div>

      {/*Footer bar two*/}
      <div className='max-w-full flex flex-row md:flex-row  md:justify-around bg-amazon_blue-light text-white h-full pb-5'>
        <div className='ml-5'>
          <h3 className='mt-4'>Get to Know Us</h3>
          <div className='text-sm leading-snug mt-2 text-gray-300'>
            <p className='link'>About Us</p>
            <p className='link'>Careers</p>
            <p className='link'>Press Releases</p>
            <p className='link'>Amazon Cares</p>
            <p className='link'>Get a Smile</p>
          </div>
        </div>

        <div className='ml-5'>
            <h3 className='mt-4'>Connect With Us</h3>
            <div className='text-sm leading-snug mt-2 text-gray-300'>
                <p className='link'>Facebook</p>
                <p className='link'>Twitter</p>
                <p className='link'>Instagram</p>
                <p className='link'>Google</p>
            </div>
        </div>

        <div className='ml-5'>
          <h3 className='mt-4'>Make Money with Us</h3>
          <div className='text-sm leading-snug mt-2 text-gray-300'>
            <p className='link'>Sell on Amazon</p>
            <p className='link'>Sell Under Amazon Accerlerator</p>
            <p className='link'> Amazon Global Selling </p>
            <p className='link'> Become An Affiliate </p>
            <p className='link'> Fulfilment by Amazon</p>
            <p className='link'>Advertise Your Products</p>
            <p className='link'>Amazon Pay on Merchants</p>
          </div>
        </div>

        <div className='ml-5'>
          <h3 className='mt-4'>Let Us Help You</h3>
          <div className='text-sm leading-snug mt-2 text-gray-300'>
            <p className='link'>COVID-19 and Amazon</p>
                      <p className='link'>Your Account</p>
                      <p className='link'>Returns Centre</p>
                      <p className='link'>  100% Purchase Protection </p>
                      <p className='link'>Amazon App Download</p>
                      <p className='link'>Amazon Assistant Download</p>
                      <p className='link'>Help</p> 
          </div>
        </div>
      </div>
          <div className="flex bg-amazon_blue-darkerblue items-center justify-center text-sm text-white font-bold-xl w-full p-5">
              <p className=''>Made by Raj Verma ❤️</p>
          </div>
    </div>
  );
}

export default Footer;