function Carts(params) {
    return (
         <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h2 className="card-title mb-3">Cart</h2>
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
            </div>

            <button className="mt-3 px-4 py-2 rounded-full bg-sky-500 text-slate-900">Confirm all & proceed</button>
          </div>
        </section>
    )
}

export default Carts