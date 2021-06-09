import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className="relative">
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
            <Carousel
            autoplay
            infiniteLoop
            showStatus={false}
            showIndicators={false}
            showThumbs={false}
            slide={true}
            interval={5000}
            >
                <div>
                    <img loading="lazy" src="https://links.papareact.com/gi1" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://links.papareact.com/6ff" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://links.papareact.com/7ma" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/IMG20/Home/2021/GW/Resytle-home_1500x600._CB657690304_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/under_1499_updated/v1/tall_hero_1500x600._CB655764075_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/WLA/April/Headsets/HeadsetDays/Ingress/D22204153_WLA_Headset_Days_April_Tall_Hero_1500x600._CB656281278_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Xiaomi/Mi11Ultra/GW/Set2/D22087666_WLD_Xiaomi_Mi11_Ultra_NewLaunch_tallhero_1500x600_1._CB656348321_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Samsung/SamsungM/M51/7thApril/RV1/P38983965_IN_WLME_SamsungGalaxy_M51_PC_1500x600_1._CB656279627_.jpges-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/Rajeshwari/March-21/Network_Hero_banners/HeroPC_1500x600_5._CB657961025_.jpgmages-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2021/desktop-1x._CB658860139_.jpg" alt="" />
                </div>
                <div>
                    <img loading="lazy" src="https://images-eu.ssl-images-amazon.com/images/G/31/img2020/fashion/WA_2020/EthnicNewyear2021/Gateway/PC1500._CB655928816_.jpg" alt="" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner
