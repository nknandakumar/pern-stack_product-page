import { useProductStore } from "../store/useProductStore";
import { Package2Icon, DollarSignIcon, ImageIcon, PlusCircleIcon, XIcon } from "lucide-react";
import { useEffect } from "react";

const AddProductModal = () => {
  const { addProduct, formData, setFormData, loading } = useProductStore();

  // Function to close the modal
  const closeModal = () => {
    document.getElementById("add_product_modal").classList.add("hidden");
  };

  // Close modal when clicking outside`  
  useEffect(() => {
    const handleClickOutside = (event) => {
      const modalElement = document.getElementById("add_product_modal");
      if (modalElement && !modalElement.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div id="add_product_modal" className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 hidden">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg relative">
        <div className="flex justify-between items-center mb-4">
          {/* Modal Header */}
          <h2 className="font-bold text-xl">Add New Product</h2>
          {/* Close Button */}
          <button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* PRODUCT NAME INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Product Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Package2Icon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered w-full pl-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>
            {/* PRODUCT PRICE INPUT */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Price</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <DollarSignIcon className="w-5 h-5" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>
            {/* PRODUCT IMAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Image URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full pl-10 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>
          {/* MODAL ACTIONS */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-md text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 rounded-md text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors duration-200"
              disabled={!formData.name || !formData.price || !formData.image || loading}
            >
              {loading ? (
          <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
              ) : (
                <>
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
