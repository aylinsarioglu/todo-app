import { useEffect, useState } from "react";

type ProfileProps = {
  user: string;
  onLogout: () => void;
};

function Profile({ user, onLogout }: ProfileProps) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "appearance" | "account">(
    "general"
  );
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [compactMode, setCompactMode] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const avatarLetter = user.charAt(0).toUpperCase();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedCompactMode = localStorage.getItem("compactMode");
    const savedReducedMotion = localStorage.getItem("reducedMotion");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    if (savedCompactMode === "true") {
      setCompactMode(true);
    }

    if (savedReducedMotion === "true") {
      setReducedMotion(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    document.body.classList.toggle("theme-dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("compact-ui", compactMode);
    localStorage.setItem("compactMode", String(compactMode));
  }, [compactMode]);

  useEffect(() => {
    document.body.classList.toggle("no-animations", reducedMotion);
    localStorage.setItem("reducedMotion", String(reducedMotion));
  }, [reducedMotion]);

  return (
    <section className="profile-section">
      <div className="profile-header">
        <h2 className="profile-heading">Profilim</h2>
        <button
          className="settings-menu-btn"
          type="button"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          aria-label="Ayarları aç veya kapat"
          aria-expanded={isSettingsOpen}
        >
          <span className="settings-menu-line" aria-hidden="true" />
          <span className="settings-menu-line" aria-hidden="true" />
          <span className="settings-menu-line" aria-hidden="true" />
        </button>
      </div>

      <div className="profile-card">
        <div className="avatar profile-avatar" aria-hidden="true">
          {avatarLetter}
        </div>
        <p className="profile-name">{user}</p>
        <p className="profile-description">Bu senin profil alanin.</p>
      </div>

      {isSettingsOpen ? (
        <button
          className="settings-backdrop"
          type="button"
          aria-label="Ayarları kapat"
          onClick={() => setIsSettingsOpen(false)}
        />
      ) : null}

      {isSettingsOpen ? (
        <aside className="settings-drawer open" aria-label="Ayarlar">
          <div className="settings">
            <div className="settings-drawer-header">
              <h3 className="settings-title">Ayarlar</h3>
              <button
                className="settings-drawer-close"
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                aria-label="Ayarları kapat"
              >
                ✕
              </button>
            </div>

            <div className="settings-panel">
              <div className="settings-tabs" role="tablist" aria-label="Ayarlar sekmeleri">
                <button
                  className={`settings-tab ${activeTab === "general" ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "general"}
                  onClick={() => setActiveTab("general")}
                >
                  Genel
                </button>
                <button
                  className={`settings-tab ${activeTab === "appearance" ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "appearance"}
                  onClick={() => setActiveTab("appearance")}
                >
                  Görünüm
                </button>
                <button
                  className={`settings-tab ${activeTab === "account" ? "active" : ""}`}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === "account"}
                  onClick={() => setActiveTab("account")}
                >
                  Hesap
                </button>
              </div>

              {activeTab === "general" ? (
                <div className="settings-content-block">
                  <p className="settings-content">Genel ayarlar</p>
                  <div className="settings-option">
                    <div className="settings-option-text">
                      <p className="settings-option-title">Kompakt görünüm</p>
                      <p className="settings-option-description">
                        Kart ve boşlukları daha sıkı hale getirir.
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`settings-switch ${compactMode ? "active" : ""}`}
                      aria-pressed={compactMode}
                      onClick={() => setCompactMode((prev) => !prev)}
                    >
                      <span className="settings-switch-thumb" />
                    </button>
                  </div>
                  <div className="settings-option">
                    <div className="settings-option-text">
                      <p className="settings-option-title">Animasyonları azalt</p>
                      <p className="settings-option-description">
                        Hover ve geçiş hareketlerini minimuma indirir.
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`settings-switch ${reducedMotion ? "active" : ""}`}
                      aria-pressed={reducedMotion}
                      onClick={() => setReducedMotion((prev) => !prev)}
                    >
                      <span className="settings-switch-thumb" />
                    </button>
                  </div>
                </div>
              ) : null}

              {activeTab === "appearance" ? (
                <div className="settings-content-block">
                  <p className="settings-content">Tema ayarları</p>
                  <button
                    className="logout-btn theme-toggle-btn"
                    type="button"
                    onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
                  >
                    {theme === "dark" ? "Açık Tema" : "Koyu Tema"}
                  </button>
                </div>
              ) : null}

              {activeTab === "account" ? (
                <div className="settings-content-block">
                  <p className="settings-content">Hesap ayarları</p>
                  <button className="logout-btn settings-logout-btn" onClick={onLogout}>
                    Çıkış Yap
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      ) : null}
    </section>
  );
}

export default Profile;
