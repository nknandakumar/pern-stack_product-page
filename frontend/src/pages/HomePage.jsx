import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { CirclePlus, RefreshCcw, FilePenLine ,Trash2  } from "lucide-react";
import { Link } from "react-router-dom";


const HomePage = () => {
	const { products, loading, error, fetchProducts } = useProductStore();
	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);
	console.log(products);
	return (
		<main className="max-w-6xl mx-auto px-4 py-8 mt-8">
			<div className="flex justify-between items-center mb-8">
				<button className=" cursor-pointer border border-teal-500 bg-teal-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-teal-600 focus:outline-none focus:shadow-outline flex gap-2">
					<CirclePlus />
					Add Product
				</button>
				{/* Refetch */}
				<button onClick={fetchProducts} className="cursor-pointer  ">
					<RefreshCcw />
				</button>
			</div>
			{error && <div className="text-red-500 text-center">{error}</div>}
			{loading ? (
			<div className="border-gray-300 text-center h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{products.map((product) => (
					<div key={product.id} className="relative max-w-xs border border-solid border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                    <div className="block h-48 w-full overflow-hidden">
                      <img src={product.image} alt="Card image" className="h-full w-full object-cover" />
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800">
                      <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2 capitalize transition-all duration-500">{product.name}</h4>
                      <p className="text-xl font-normal text-gray-500 dark:text-gray-300 transition-all duration-500 leading-5 mb-5">{product.price}</p>
                      <div className="flex gap-2">
                        <Link to={`/product/${product.id}`} className="bg-indigo-600 hover:bg-indigo-700 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold transition-colors duration-300 flex items-center">
                          <FilePenLine className="mr-1" />
                          Edit
                        </Link>
                        <button className="bg-red-600 hover:bg-red-700 shadow-sm rounded-full py-2 px-5 text-xs text-white font-semibold transition-colors duration-300 flex items-center">
                          <Trash2 className="mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
					))}
				</div>
			)}
		</main>
	);
};

export default HomePage;
