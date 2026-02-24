import Welcome from "../components/Welcome";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
    return (
        <>
            <Welcome />

            <Categories />

            <FeaturedProducts />

            <section className="bg-gray-50 py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">Why Choose Us</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl mb-4">🚚</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
                            <p className="text-gray-600">Get your orders delivered quickly right to your doorstep</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">💰</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
                            <p className="text-gray-600">Enjoy competitive prices and regular discounts</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Guaranteed</h3>
                            <p className="text-gray-600">All products are authentic and carefully checked</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;