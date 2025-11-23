import React, { useState } from "react";
import Profile from "../../Component/Profile";
import Donate from "../../Component/Donate";
import Accept from "../../Component/Accept";



export default function Dashboard() {
  const [active, setActive] = useState("overview");

  const renderContent = () => {
    
    if (active === "overview") {
      return (
        <>
          {/* TOP GRID */}
          <section className="grid md:grid-cols-[1.6fr_1fr] gap-5">
            {/* PROFILE CARD */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-lg">Profile & Personal Info</h2>
                  <p className="text-sm text-slate-400">Keep contact details up to date for smooth pickup & delivery.</p>
                </div>
                <div className="text-xs bg-slate-800/60 px-3 py-1 rounded-full">Profile 92% complete</div>
              </div>

              <div className="grid md:grid-cols-[auto_1fr] gap-5 items-center">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-emerald-500 p-1">
                    <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-3xl font-semibold">J</div>
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-xs text-slate-400">john.doe@example.com</div>
                    <div className="mt-1 inline-block text-xs px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500 text-emerald-200">Verified donor</div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs uppercase text-slate-400">Phone</div>
                      <div className="font-medium">+1 (555) 0123 456</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-slate-400">City</div>
                      <div className="font-medium">Mumbai, IN</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs uppercase text-slate-400">Preferred contact</div>
                      <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-slate-700 bg-slate-800/40">WhatsApp & Email</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-slate-400">Member since</div>
                      <div className="font-medium">Jan 2024</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs uppercase text-slate-400">Address</div>
                    <div className="font-medium">221B Baker Street, Khar West</div>
                    <div className="flex gap-2 mt-3">
                      <button className="px-3 py-1 rounded-full border border-slate-700 text-sm">✏️ Edit</button>
                      <button className="px-3 py-1 rounded-full border border-slate-700 text-sm">📍 Pickup instr.</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* STATS CARD */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-lg">Your Donation Activity</h2>
                  <p className="text-sm text-slate-400">Snapshot of donated, accepted and cart items.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat label="Total Objects Donated" value="18" chip="+3 this month" />
                <Stat label="Objects Accepted" value="7" chip="2 awaiting pickup" />
                <Stat label="Items in Cart" value="4" chip="Checkout pending" red />
                <Stat label="Impact Score" value="92" chip="Top 10% donors" />
              </div>
            </section>
          </section>

          {/* BOTTOM GRID */}
          <section className="grid md:grid-cols-3 gap-5">
            {/* Donate Object */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Donate Object</h2>
                  <p className="card-subtitle">
                    Add new items you want to give away — we’ll match them with requests.
                  </p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-group">
                  <label className="input-label">Item name</label>
                  <input type="text" placeholder="e.g. Study table, Winter jacket, Smartphone" />
                </div>

                <div className="form-group">
                  <label className="input-label">Category</label>
                  <select>
                    <option>Clothes</option>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Condition</label>
                  <div className="tags-row">
                    <button className="tag active" type="button">Like New</button>
                    <button className="tag" type="button">Good</button>
                    <button className="tag" type="button">Used</button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">Notes</label>
                  <textarea placeholder="Add size, color, any damage, or pickup details..."></textarea>
                </div>

                <button className="btn btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '2px'}}>
                  <span className="btn-icon">➕</span> Add to donation list
                </button>
              </div>
            </section>

            {/* Accept Object from Donation */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Accept Object from Donations</h2>
                  <p className="card-subtitle">
                    Browse objects available near you and accept what you need.
                  </p>
                </div>
              </div>

              <div className="section-body">
                <div className="form-group">
                  <label className="input-label">Search</label>
                  <input type="text" placeholder="Search by item name or category..." />
                </div>

                <div className="tags-row">
                  <button className="tag active" type="button">All</button>
                  <button className="tag" type="button">Nearby</button>
                  <button className="tag" type="button">Clothes</button>
                  <button className="tag" type="button">Books</button>
                  <button className="tag" type="button">Electronics</button>
                </div>

                <div className="list">
                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">Winter Jacket (M)</span>
                      <span className="list-meta">Like new • 2 km away</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge badge-green">Available</span>
                      <button className="btn-xs">Accept</button>
                    </div>
                  </div>

                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">School Textbooks (Grade 8)</span>
                      <span className="list-meta">Good condition • 5 km away</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge badge-orange">Pickup by Sat</span>
                      <button className="btn-xs">Accept</button>
                    </div>
                  </div>

                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">Study Desk</span>
                      <span className="list-meta">Used • 3 km away</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge badge-blue">Needs transport</span>
                      <button className="btn-xs">Accept</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cart */}
            <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Cart</h2>
                  <p className="card-subtitle">
                    Review items you’re about to donate or receive before confirming.
                  </p>
                </div>
              </div>

              <div className="section-body">
                <div className="list">
                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">Children’s Story Books (x5)</span>
                      <span className="list-meta">You are donating • Pickup scheduled</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge-pill">Tomorrow, 4:00 PM</span>
                      <button className="btn-xs">Remove</button>
                    </div>
                  </div>

                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">Laptop Backpack</span>
                      <span className="list-meta">You are accepting • 4 km away</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge-pill">Pickup pending</span>
                      <button className="btn-xs">Edit</button>
                    </div>
                  </div>

                  <div className="list-item">
                    <div className="list-item-main">
                      <span className="list-title">Office Chair</span>
                      <span className="list-meta">You are donating • Needs confirmation</span>
                    </div>
                    <div className="list-actions">
                      <span className="badge-pill">Awaiting NGO</span>
                      <button className="btn-xs">Remove</button>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>
                  <span className="btn-icon">✅</span> Confirm all & proceed
                </button>
              </div>
            </section>
          </section>
        </>
      );
    }

    // Personal only
    if (active === "personal") {
      return (
        <Profile/>
      );
    }

    // Donate only
    if (active === "donate") {
      return (
       <Donate/>
      );
    }

    // Accept only
    if (active === "accept") {
      return (
        <Accept/>
      );
    }

    // Cart only
    if (active === "cart") {
      return (
       <Carts/>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR */}
        <aside className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-6 shadow-lg">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center font-bold text-slate-900">U</div>
              <div>
                <div className="font-semibold">UserHub</div>
                <div className="text-xs text-slate-400">Donations Dashboard</div>
              </div>
            </div>

            <nav className="mt-3">
              <ul className="flex flex-col gap-2">
                {[
                  { key: 'overview', label: 'Overview', icon: '🏠' },
                  { key: 'personal', label: 'Personal Info', icon: '👤' },
                  { key: 'donate', label: 'Donate Object', icon: '🎁' },
                  { key: 'accept', label: 'Accept Donations', icon: '📥' },
                  { key: 'cart', label: 'Cart', icon: '🛒' }
                ].map((i) => (
                  <li
                    key={i.key}
                    onClick={() => setActive(i.key)}
                    className={`cursor-pointer rounded-full px-3 py-2 flex items-center justify-between gap-3 text-sm transition-all duration-150 ${active === i.key ? 'bg-sky-500/20 border border-sky-500 text-sky-100' : 'text-slate-300 hover:bg-slate-800/50'}`}>
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs">{i.icon}</span>
                      <span>{i.label}</span>
                    </div>
                    {i.key === 'overview' && <span className="text-xs bg-slate-800/60 px-2 py-1 rounded-full">Today</span>}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-emerald-500 flex items-center justify-center text-slate-900 font-medium">JD</div>
              <div>
                <div className="text-sm font-medium">John Doe</div>
                <div className="text-xs text-slate-400">Member</div>
              </div>
            </div>
            <button className="text-xs px-3 py-1 rounded-full border border-rose-400 text-rose-200 hover:bg-rose-900/30">Log out</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex flex-col gap-6">
          <header className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">Welcome back, John 👋</h1>
              <p className="text-sm text-slate-400">Manage your profile, donations, accepted items, and cart.</p>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-2 rounded-full border border-slate-700 text-sm hover:bg-slate-800/40">Account Settings</button>
              <button className="px-4 py-2 rounded-full bg-sky-500 text-slate-900 font-medium shadow">New Donation</button>
            </div>
          </header>

          {renderContent()}
        </main>
      </div>
    </div>
  );
}


function Stat({ label, value, chip, red }) {
  return (
    <div className={`rounded-xl border border-slate-800 p-3 bg-slate-900/40`}>
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-semibold">{value}</div>
        <div className={`text-xs px-2 py-1 rounded-full ${red ? 'bg-rose-900/30 border border-rose-400 text-rose-200' : 'bg-emerald-900/30 border border-emerald-400 text-emerald-200'}`}>{chip}</div>
      </div>
    </div>
  );
}

function AcceptItem({ title, meta, badge, variant }) {
  const badgeClass = variant === 'orange' ? 'bg-orange-900/30 border border-orange-400 text-orange-200' : variant === 'blue' ? 'bg-sky-900/30 border border-sky-400 text-sky-200' : 'bg-emerald-900/30 border border-emerald-400 text-emerald-200';
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 p-3 bg-slate-800/40">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-slate-400">{meta}</div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className={`text-xs px-2 py-1 rounded-full ${badgeClass}`}>{badge}</div>
        <button className="text-xs px-3 py-1 rounded-full border border-slate-700">Accept</button>
      </div>
    </div>
  );
}

function CartItem({ title, meta, pill }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-slate-800 p-3 bg-slate-800/40">
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-xs text-slate-400">{meta}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs px-2 py-1 rounded-full border border-slate-700">{pill}</div>
        <button className="text-xs px-2 py-1 rounded-full border border-slate-700">Remove</button>
      </div>
    </div>
  );
}
