function Accept(params) {
    return(
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h2 className="card-title mb-3">Accept Object from Donations</h2>
          <div className="section-body">
            <div className="form-group">
              <label className="input-label">Search</label>
              <input type="text" placeholder="Search by item name or category..." className="w-full rounded-md px-3 py-2" />
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
            </div>
          </div>
        </section>
    )
}

export default Accept;