import Product from "./Product";

function ProductFeed({ products }) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            
            {products
            .slice(0,4)
            .map(({id, title, price, description, category, image}) => (
                <Product
                    key={id}
                    id={id}
                    title={title}
                    price={price}
                    description={description}
                    category={category}
                    image={image}
                    products={products}
                />
            ))}
            
            
            <img className="p-5 md:col-span-full" src="https://links.papareact.com/dyz" alt=""/>

            <div className="md:col-span-2">
                {products
                    .slice(4, 5)
                    .map(({ id, title, price, description, category, image }) => (
                        <Product
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                            products={products}

                        />
                    ))}
            </div>

           
            {products
                .slice(5, 10)
                .map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        products={products}

                    />
                ))}

            <img className="p-5 md:col-span-full " src="https://links.papareact.com/dyz" alt="" />

            <div className="md:col-span-2">
            {products
                .slice(10, 11)
                .map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        products={products}

                    />
                ))}
                </div>


          

            {products
                .slice(11, 19)
                .map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                        products={products}

                    />
                ))}

            <div className="md:col-span-2">
                {products
                    .slice(19, 20)
                    .map(({ id, title, price, description, category, image }) => (
                        <Product
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                            products={products}

                        />
                    ))}
            </div>


           
            <img className="p-5 md:col-span-full" src="https://links.papareact.com/dyz" alt="" />

        </div>
    );
}

export default ProductFeed
