import ProductFurniture from "./ProductFurniture";

function ProductFurnitureFeed({ productsFurniture }) {
    return (
        <div className="z-30 relative max-w-screen-2xl mx-auto grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 lg:-mt-80 xl:-mt-96 -mt-14">
            {productsFurniture && productsFurniture.slice(0, 4).map(product => (
                <ProductFurniture productsFurniture={productsFurniture} key={product.id} title={product.name} {...product} />
            ))}

            <img loading="lazy" src="https://links.papareact.com/dyz" alt="" className="px-5 md:col-span-4 mx-auto rounded-lg" />

            <div className="md:col-span-2">
                {productsFurniture && productsFurniture.slice(4, 5).map(product => (
                    <ProductFurniture productsFurniture={productsFurniture} key={product.id} title={product.name} {...product} />
                ))}
            </div>
            {productsFurniture && productsFurniture.slice(5, 10).map(product => (
                <ProductFurniture productsFurniture={productsFurniture} key={product.id} title={product.name} {...product} />
            ))}

            <img loading="lazy" src="https://links.papareact.com/dyz" alt="" className="px-5 md:col-span-4 mx-auto rounded-lg" />

            {productsFurniture && productsFurniture.slice(10, productsFurniture.length - 1).map(product => (
                <ProductFurniture productsFurniture={productsFurniture} key={product.id} title={product.name} {...product} />
            ))}
        </div>
    );
}

export default ProductFurnitureFeed
