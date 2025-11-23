function Donate(params) {
    return(
         <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
          <h2 className="card-title mb-3">Donate Object</h2>
          <div className="section-body">
            <div className="form-group">
              <label className="input-label">Item name</label>
              <input type="text" placeholder="e.g. Study table, Winter jacket, Smartphone" className="w-full rounded-md px-3 py-2" />
            </div>

            <div className="form-group">
              <label className="input-label">Category</label>
              <select className="w-full rounded-md px-3 py-2">
                <option>Clothes</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Furniture</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="input-label">Notes</label>
              <textarea placeholder="Add size, color, any damage, or pickup details..." className="w-full rounded-md px-3 py-2" />
            </div>

            <button className="mt-3 px-4 py-2 rounded-full bg-sky-500 text-slate-900">Add to donation list</button>
          </div>
        </section>
    )
}
export default Donate;