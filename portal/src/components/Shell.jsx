export default function Shell({ children }) {
  return (
    <div className="shell">
      <header className="shell-nav">
        <div className="shell-nav-inner">
          <a className="brand" href="../">
            <span className="brand-mark" aria-hidden="true" />
            Clean Agro
          </a>
          <a className="back" href="../">Back to the main site</a>
        </div>
      </header>

      <main className="shell-main">{children}</main>

      <footer className="shell-foot">
        Clean Agro is a fictional company. All names, readings, and accounts are illustrative.
      </footer>
    </div>
  );
}
