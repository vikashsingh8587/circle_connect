import React, { useState, useEffect } from "react";
import DashboardUI from "./DashboardUI";

/**
 * DashboardLogic: container component
 * - Holds state, fetches data (simulated), handles actions
 * - Passes only props & handlers to DashboardUI
 */

const MOCK_USER = {
  id: "u1",
  name: "John Doe",
  email: "john.doe@example.com",
  city: "Mumbai, IN",
  phone: "+91 98765 43210",
  avatarUrl: "/assets/uploaded-ui.png" // you can replace with the sandbox path if needed
};

export default function DashboardLogic() {
  const [activeTab, setActiveTab] = useState("personal");
  const [user, setUser] = useState(null);
  const [donationForm, setDonationForm] = useState({
    name: "",
    category: "Clothes",
    condition: "Like New",
    notes: ""
  });

  const [availableItems, setAvailableItems] = useState([]);
  const [cart, setCart] = useState([]);

  // simulate data fetch on mount
  useEffect(() => {
    // fake async load
    setTimeout(() => {
      setUser(MOCK_USER);
      setAvailableItems([
        { id: "i1", title: "Winter Jacket (M)", meta: "Like new • 2 km", status: "available" },
        { id: "i2", title: "Study Desk", meta: "Used • 3 km", status: "needs-transport" },
      ]);
    }, 250);
  }, []);

  // handlers
  function handleTabChange(tab) {
    setActiveTab(tab);
  }

  function handleDonationChange(k, v) {
    setDonationForm(prev => ({ ...prev, [k]: v }));
  }

  function submitDonation() {
    if (!donationForm.name.trim()) return alert("Please enter item name");
    const newItem = {
      id: `d${Date.now()}`,
      title: donationForm.name,
      category: donationForm.category,
      condition: donationForm.condition,
      notes: donationForm.notes
    };
    // For demo, push to cart (or items)
    setCart(prev => [newItem, ...prev]);
    setDonationForm({ name: "", category: "Clothes", condition: "Like New", notes: "" });
    alert("Donation added to your cart — you can confirm later.");
  }

  function acceptItem(itemId) {
    const item = availableItems.find(i => i.id === itemId);
    if (!item) return;
    setCart(prev => [{ ...item, accepted: true }, ...prev]);

    setAvailableItems(prev => prev.filter(i => i.id !== itemId));
  }

  function removeCartItem(itemId) {
    setCart(prev => prev.filter(i => i.id !== itemId));
  }

  function confirmAll() {
    if (cart.length === 0) return alert("Cart empty");
    // simulate confirm
    setCart([]);
    alert("All items confirmed. Thank you!");
  }

  return (
    <DashboardUI
      user={user}
      activeTab={activeTab}
      onTabChange={handleTabChange}

      donationForm={donationForm}
      onDonationChange={handleDonationChange}
      onSubmitDonation={submitDonation}

      availableItems={availableItems}
      onAcceptItem={acceptItem}

      cart={cart}
      onRemoveCartItem={removeCartItem}
      onConfirmAll={confirmAll}
    />
  );
}
