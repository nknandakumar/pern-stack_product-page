import { useProductStore } from "../store/useProductStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react";
const ProductPage = () => {
	const {
		currentProduct,
		formData,
		setFormData,
		loading,
		error,
		fetchProduct,
		updateProduct,
		deleteProduct,
	} = useProductStore();
	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		fetchProduct(id);
	}, [fetchProduct, id]);
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen  ">
				<div className="loading loading-spinner loading-lg" />
			</div>
		);
	}
	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			await deleteProduct(id);
			navigate("/");
		}
	};

	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="alert alert-error">{error}</div>
			</div>
		);
	}
	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl mt-10 ">
			<button onClick={() => navigate("/")} className="flex items-center mb-8">
				<ArrowLeftIcon className="size-4 mr-2" />
				Back to Products
			</button>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* PRODUCT IMAGE */}
				<div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
					<img
						src={currentProduct?.image}
						alt={currentProduct?.name}
						className="size-full object-cover"
					/>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						updateProduct(id);
					}}
					className="space-y-6"
				>
					{/* PRODUCT NAME */}
					<div className="mb-4">
						<label className="block text-base font-medium text-gray-700">
							Product Name
						</label>
						<input
							type="text"
							placeholder="Enter product name"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
						/>
					</div>

					{/* PRODUCT PRICE */}
					<div className="mb-4">
						<label className="block text-base font-medium text-gray-700">
							Price
						</label>
						<input
							type="number"
							min="0"
							step="0.01"
							placeholder="0.00"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={formData.price}
							onChange={(e) =>
								setFormData({ ...formData, price: e.target.value })
							}
						/>
					</div>

					{/* PRODUCT IMAGE URL */}
					<div className="mb-4">
						<label className="block text-base font-medium text-gray-700">
							Image URL
						</label>
						<input
							type="text"
							placeholder="https://example.com/image.jpg"
							className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={formData.image}
							onChange={(e) =>
								setFormData({ ...formData, image: e.target.value })
							}
						/>
					</div>

					{/* FORM ACTIONS */}
					<div className="flex justify-between mt-8">
						<button
							type="button"
							onClick={handleDelete}
							className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 flex items-center"
						>
							<Trash2Icon className="w-5 h-5 mr-2" />
							Delete Product
						</button>

						<button
							type="submit"
							className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 flex items-center"
							disabled={
								loading || !formData.name || !formData.price || !formData.image
							}
						>
							{loading ? (
								<svg
									className="animate-spin h-5 w-5 text-white mr-2"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
								>
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 2.042.628 3.929 1.707 5.291l2.293-2.293zm6.49 1.706A7.963 7.963 0 0112 20c4.627 0 8-5.373 8-12h-4c0 2.042-.628 3.929-1.707 5.291l-2.293 2.293zm6.49-1.707A7.963 7.963 0 0120 12h4c0 4.627-5.373 8-12 8v-4c2.042 0 3.929-.628 5.291-1.707l2.293-2.293zm-6.49-6.49A7.963 7.963 0 0112 4V0c4.627 0 8 5.373 8 12h-4c0-2.042-.628-3.929-1.707-5.291l-2.293 2.293z"
									></path>
								</svg>
							) : (
								<>
									<SaveIcon className="w-5 h-5 mr-2" />
									Save Changes
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ProductPage;
