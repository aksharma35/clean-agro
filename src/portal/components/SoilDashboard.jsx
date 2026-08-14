const PLOTS = [
  {
    id: 'plot-a',
    name: 'Plot A — Onion, 2.4 acres',
    testedOn: 'Tested 12 Jun 2026',
    readings: [
      { k: 'Organic carbon', v: '0.81%' },
      { k: 'pH', v: '6.9' },
      { k: 'Residue', v: 'None detected' },
    ],
  },
  {
    id: 'plot-b',
    name: 'Plot B — Grape, 1.1 acres',
    testedOn: 'Tested 03 Jun 2026',
    readings: [
      { k: 'Organic carbon', v: '0.64%' },
      { k: 'pH', v: '7.4' },
      { k: 'Residue', v: 'None detected' },
    ],
  },
];

export default function SoilDashboard({ farmer, onSignOut }) {
  return (
    <div className="dash">
      <div className="dash-head">
        <div>
          <span className="eyebrow">Farmer ID {farmer.farmerId} · {farmer.village}</span>
          <h1>Namaste, {farmer.name}.</h1>
        </div>
        <button type="button" className="linkish" onClick={onSignOut}>Sign out</button>
      </div>

      <div className="plots">
        {PLOTS.map((plot) => (
          <article className="plot" key={plot.id}>
            <div className="plot-top">
              <h2>{plot.name}</h2>
              <span className="date">{plot.testedOn}</span>
            </div>
            <div className="readings">
              {plot.readings.map((r) => (
                <div className="reading" key={r.k}>
                  <div className="k">{r.k}</div>
                  <div className="v">{r.v}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
