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
  const avatarLetter = user.charAt(0).toUpperCase();

  useEffect(() => {
    document.body.classList.toggle("theme-light", theme === "light");
    document.body.classList.toggle("theme-dark", theme === "dark");
  }, [theme]);

  return (
    <section className="profile-section">
      <h2 className="profile-heading">Profilim</h2>

      <div className="profile-card">
        <div className="avatar profile-avatar" aria-hidden="true">
          {avatarLetter}
        </div>
        <p className="profile-name">{user}</p>
        <p className="profile-description">Bu senin profil alanin.</p>
      </div>

      <div className="settings" aria-label="Ayarlar">
        <button
          className="settings-toggle"
          type="button"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          aria-expanded={isSettingsOpen}
        >
          <h3 className="settings-title">Ayarlar</h3>
          <span className="settings-chevron" aria-hidden="true">
            {isSettingsOpen ? "−" : "+"}
          </span>
        </button>

        {isSettingsOpen ? (
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
              <p className="settings-content">Genel ayarlar</p>
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
        ) : null}
      </div>
    </section>
  );
}

export default Profile;
