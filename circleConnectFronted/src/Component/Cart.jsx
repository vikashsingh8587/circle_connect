import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup.jsx";

const FALLBACK_IMAGE = "/mnt/data/A_2D_digital_user_dashboard_design_showcases_a_mod.png"; // uploaded file path

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);

  // cart items for UI (only items that exist in backend)
  const [cartItems, setCartItems] = useState([]);
  // map of itemId -> { url, blob, fileName }
  const [cartImages, setCartImages] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // fetch products from backend and filter cart items that still exist
  useEffect(() => {
    let isMounted = true;
    const fetchImagesAndUpdateCart = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        const backendProductIds = response.data.map((p) => p.id);

        // keep only cart items that exist in backend
        const updatedCartItems = cart.filter((item) =>
          backendProductIds.includes(item.id)
        );

        if (!isMounted) return;

        setCartItems(updatedCartItems);

        // fetch images for each item (parallel)
        await Promise.all(
          updatedCartItems.map(async (item) => {
            try {
              const res = await axios.get(
                `http://localhost:8080/api/product/${item.id}/image`,
                { responseType: "blob" }
              );

              const blob = res.data;
              const fileName = (res.headers && res.headers["x-filename"]) || `${item.id}.jpg`;

              const url = URL.createObjectURL(blob);

              // store blob + url per item
              setCartImages((prev) => {
                // cleanup previous url for same id if existed
                if (prev[item.id] && prev[item.id].url) {
                  URL.revokeObjectURL(prev[item.id].url);
                }
                return { ...prev, [item.id]: { url, blob, fileName } };
              });
            } catch (err) {
              console.error("Error fetching image for item", item.id, err);
              // set fallback url
              setCartImages((prev) => {
                if (prev[item.id] && prev[item.id].url) return prev;
                return { ...prev, [item.id]: { url: FALLBACK_IMAGE, blob: null, fileName: null } };
              });
            }
          })
        );
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (cart && cart.length > 0) {
      fetchImagesAndUpdateCart();
    } else {
      // clear UI state if cart empty
      setCartItems([]);
      // revoke any created urls
      Object.values(cartImages).forEach((v) => {
        if (v && v.url && v.url.startsWith("blob:")) URL.revokeObjectURL(v.url);
      });
      setCartImages({});
    }

    return () => {
      isMounted = false;
      // cleanup blob urls
      Object.values(cartImages).forEach((v) => {
        if (v && v.url && v.url.startsWith("blob:")) URL.revokeObjectURL(v.url);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  // recalc total whenever cartItems or their quantities change
  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);
    setTotalPrice(total);
  }, [cartItems]);

  // utility to convert blob -> File (if backend expects file field)
  const convertBlobToFile = (blob, fileName = "image.jpg") => {
    if (!blob) return null;
    try {
      return new File([blob], fileName, { type: blob.type || "image/jpeg" });
    } catch (e) {
      // some older environments may not allow File constructor
      const file = new Blob([blob], { type: blob.type || "image/jpeg" });
      file.name = fileName;
      return file;
    }
  };

  const handleIncreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          if (item.stockQuantity && item.quantity >= item.stockQuantity) {
            alert("Cannot add more than available stock");
            return item;
          }
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      })
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setCartItems((prev) => prev.filter((i) => i.id !== itemId));
    // cleanup any blob url
    if (cartImages[itemId] && cartImages[itemId].url && cartImages[itemId].url.startsWith("blob:")) {
      URL.revokeObjectURL(cartImages[itemId].url);
    }
    setCartImages((prev) => {
      const copy = { ...prev };
      delete copy[itemId];
      return copy;
    });
  };

  const handleCheckout = async () => {
    try {
      // iterate sequentially to avoid overloading backend (you can parallelize if desired)
      for (const item of cartItems) {
        const { id } = item;
        const imageEntry = cartImages[id];
        const fileForUpload = imageEntry ? convertBlobToFile(imageEntry.blob, imageEntry.fileName || `${id}.jpg`) : null;

        const updatedStockQuantity = (item.stockQuantity || 0) - (item.quantity || 1);
        const updatedProductData = { ...item, stockQuantity: updatedStockQuantity };

        const form = new FormData();
        if (fileForUpload) form.append("imageFile", fileForUpload);
        form.append("product", new Blob([JSON.stringify(updatedProductData)], { type: "application/json" }));

        // send request
        await axios.put(`http://localhost:8080/api/product/${id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      // after successful checkout
      clearCart();
      setCartItems([]);
      // cleanup blob urls
      Object.values(cartImages).forEach((v) => {
        if (v && v.url && v.url.startsWith("blob:")) URL.revokeObjectURL(v.url);
      });
      setCartImages({});
      setShowModal(false);
      alert("Checkout successful!");
    } catch (error) {
      console.error("error during checkout", error);
      alert("Checkout failed. Check console for details.");
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">Shopping Bag</h3>
          <div className="text-sm text-gray-600">Items: {cartItems.length}</div>
        </div>

        {cartItems.length === 0 ? (
          <div className="p-6 text-left">
            <h4 className="text-gray-700">Your cart is empty</h4>
            <p className="text-sm text-gray-500 mt-2">Browse items and add to cart to see them here.</p>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={(cartImages[item.id] && cartImages[item.id].url) || FALLBACK_IMAGE}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.brand}</div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</div>
                        <div className="text-xs text-gray-400">Unit: ${item.price?.toFixed?.(2) || "0.00"}</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() => handleDecreaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-100"
                          aria-label="decrease quantity"
                        >
                          −
                        </button>
                        <div className="px-4 py-1 bg-gray-50 text-sm">{item.quantity || 1}</div>
                        <button
                          onClick={() => handleIncreaseQuantity(item.id)}
                          className="px-3 py-1 hover:bg-gray-100"
                          aria-label="increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-sm text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <div className="text-sm text-gray-500">Total</div>
                <div className="text-2xl font-semibold">${totalPrice.toFixed(2)}</div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Checkout
                </button>

                <button
                  onClick={() => {
                    // optional: clear cart in context and local
                    clearCart();
                    setCartItems([]);
                    Object.values(cartImages).forEach((v) => {
                      if (v && v.url && v.url.startsWith("blob:")) URL.revokeObjectURL(v.url);
                    });
                    setCartImages({});
                  }}
                  className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-50"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;
