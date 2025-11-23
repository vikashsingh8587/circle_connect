import React from 'react';

// Reusable Button Component for consistency
const ActionButton = ({ onClick, children, isPrimary = false }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-xl font-semibold transition duration-200 shadow-md text-sm ${
      isPrimary
        ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-300/50'
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
    }`}
  >
    {children}
  </button>
);

const CheckoutModal = ({ show, handleClose, cartItems, totalPrice, handleCheckout }) => {
  if (!show) {
    return null;
  }

  // Placeholder image URL
  const PLACEHOLDER_IMG = "https://placehold.co/100x100/F3F4F6/9CA3AF?text=Item";

  return (
    // Modal Overlay (Fixed position, full screen, dark background)
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      
      {/* Modal Content Container */}
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100 opacity-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🛒 Final Checkout
          </h2>
          <button 
            onClick={handleClose} 
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full transition-colors"
            aria-label="Close"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true" // Added for accessibility
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Items Summary ({cartItems.length})</h3>
          
          <div className="space-y-4">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-500 py-4">Aapki cart khaali hai.</div>
            ) : (
                cartItems.map((item) => (
                    <div 
                        key={item.id} 
                        className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl transition-shadow hover:shadow-sm"
                    >
                        {/* Image Placeholder */}
                        <img 
                            src={item.imageUrl || PLACEHOLDER_IMG} 
                            alt={item.name || 'Item'} 
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER_IMG }}
                        />
                        
                        {/* Item Details */}
                        <div className="flex-grow">
                            <p className="font-bold text-gray-900 truncate">{item.name || 'Untitled Item'}</p>
                            <p className="text-sm text-gray-500">
                                Quantity: <span className="font-medium">{item.quantity || 1}</span>
                            </p>
                        </div>
                        
                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                            <p className="text-lg font-extrabold text-indigo-600">
                                ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                            </p>
                            {(item.price > 0 || totalPrice > 0) && (
                                <p className="text-xs text-gray-400">(${(item.price || 0).toFixed(2)} / unit)</p>
                            )}
                        </div>
                    </div>
                ))
            )}
          </div>
          
          {/* Total Price */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-6">
            <h4 className="text-xl font-bold text-gray-800">Total Amount:</h4>
            <h4 className="text-3xl font-extrabold text-indigo-700">
              ${(totalPrice || 0).toFixed(2)}
            </h4>
          </div>
        </div>
        
        {/* Footer (Actions) */}
        <div className="flex justify-end gap-3 p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
          <ActionButton onClick={handleClose}>
            Cancel / Close
          </ActionButton>
          <ActionButton onClick={handleCheckout} isPrimary>
            Confirm Purchase
          </ActionButton>
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;