import React, { useState } from "react";
import styles from "./SafeCityDashboard.module.css";

const sidebarItems = [
  "Overview",
  "Resources",
  "Counselors & Services",
  "Emergency Helplines",
  "Legal Rights",
  "Suggestions",
  "Settings",
];

const demoAdminCredentials = {
  email: "admin@scpanel.com",
  password: "admin123",
};

function AdminLoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === demoAdminCredentials.email &&
      password === demoAdminCredentials.password
    ) {
      setError("");
      onLogin();
      onClose();
    } else {
      setError("Invalid demo credentials.");
    }
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContent}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@scpanel.com"
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="admin123"
              autoComplete="current-password"
            />
          </label>
          {error && <p className={styles.errorMsg}>{error}</p>}
          <button type="submit" className={styles.primaryBtn}>
            Login
          </button>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

function Sidebar({ selected, onSelect }) {
  return (
    <nav className={styles.sidebar} aria-label="Main navigation">
      {sidebarItems.map((item) => (
        <button
          key={item}
          className={`${styles.sidebarBtn} ${
            selected === item ? styles.activeSidebarBtn : ""
          }`}
          onClick={() => onSelect(item)}
          aria-current={selected === item ? "page" : undefined}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}

function TopNav({ onShowLogin, onViewUser, isAdmin }) {
  return (
    <header className={styles.topNav}>
      <div className={styles.topNavLeft}>
        <h1 className={styles.logo}>SafeCity</h1>
        <span className={styles.subTitle}>Support & Admin Panel</span>
      </div>
      <div className={styles.topNavRight}>
        {!isAdmin && (
          <button className={styles.primaryBtn} onClick={onShowLogin}>
            Admin Login
          </button>
        )}
        {isAdmin && <span className={styles.loggedInIndicator}>Admin</span>}
        <button className={styles.secondaryBtn} onClick={onViewUser}>
          View as User
        </button>
      </div>
    </header>
  );
}

function KPISection({ activeResources, reportsThisMonth }) {
  return (
    <section className={styles.kpiSection} aria-label="Key performance indicators">
      <div className={styles.kpiCard}>
        <h3>Active Resources</h3>
        <p>{activeResources}</p>
      </div>
      <div className={styles.kpiCard}>
        <h3>Reports This Month</h3>
        <p>{reportsThisMonth}</p>
      </div>
    </section>
  );
}

function QuickActions() {
  const handleAddResource = () => alert("Add Resource clicked!");
  const handleExport = () => alert("Export clicked!");

  return (
    <section className={styles.quickActions} aria-label="Quick actions">
      <button className={styles.primaryBtn} onClick={handleAddResource}>
        Add Resource
      </button>
      <button className={styles.secondaryBtn} onClick={handleExport}>
        Export
      </button>
    </section>
  );
}

function Overview() {
  return (
    <section>
      <h2>Welcome to SafeCity Admin Panel</h2>
      <p>
        This dashboard provides you an overview of system status and insights.
      </p>
      <p>
        Manage resources, counselors, emergency info, legal rights, suggestions,
        and adjust settings.
      </p>
    </section>
  );
}

function Resources() {
  
  const resourceCategories = {
    MentalHealth: [
      { name: "MindCare Support", contact: "mindcare@example.com" },
      { name: "Peaceful Minds", contact: "peaceful@example.com" },
    ],
    Shelter: [
      { name: "Safe Shelter Homes", contact: "shelterhomes@example.com" },
      { name: "Community Shelter", contact: "communityshelter@example.com" },
    ],
    FinancialAid: [
      { name: "Finance Help Center", contact: "financehelp@example.com" },
    ],
  };

  return (
    <section>
      <h2>Support Resources</h2>
      {Object.entries(resourceCategories).map(([category, resources]) => (
        <div key={category} className={styles.resourceCategory}>
          <h3>{category.replace(/([A-Z])/g, " $1").trim()}</h3>
          <ul>
            {resources.map((r, idx) => (
              <li key={idx}>
                <strong>{r.name}</strong> — {r.contact}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function CounselorsServices() {
  const counselors = [
    {
      name: "Jane Doe",
      specialty: "Mental Health Counseling",
      phone: "+1-555-123-4567",
      email: "jane.doe@example.com",
    },
    {
      name: "John Smith",
      specialty: "Legal Advice",
      phone: "+1-555-987-6543",
      email: "john.smith@example.com",
    },
  ];

  return (
    <section>
      <h2>Counselors & Services</h2>
      <ul className={styles.counselorList}>
        {counselors.map((c, i) => (
          <li key={i} className={styles.counselorCard}>
            <h3>{c.name}</h3>
            <p>{c.specialty}</p>
            <p>
              <a href={`tel:${c.phone}`} aria-label={`Call ${c.name}`}>
                📞 {c.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${c.email}`} aria-label={`Email ${c.name}`}>
                📧 {c.email}
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EmergencyHelplines() {
  return (
    <section>
      <h2>Emergency Helplines</h2>
      <ul className={styles.helplineList}>
        <li>
          National Helpline: <strong>181</strong>{" "}
          <button
            className={styles.quickBtn}
            onClick={() => alert("Calling 181...")}
            aria-label="Call 181 helpline"
          >
            Call 181
          </button>
          <button
            className={styles.quickBtn}
            onClick={() => alert("Starting quick chat...")}
            aria-label="Start Quick Chat"
          >
            Quick Chat
          </button>
        </li>
        <li>
          Women Assistance: <strong>1091</strong>
        </li>
        <li>
          Child Helpline: <strong>1098</strong>
        </li>
      </ul>
    </section>
  );
}

function LegalRights() {
  const legalCards = [
    {
      title: "Right to Equality",
      desc: "All citizens are entitled to equality under the law without discrimination.",
    },
    {
      title: "Right to Legal Aid",
      desc: "Access free legal aid if you cannot afford a lawyer in criminal cases.",
    },
  ];

  return (
    <section>
      <h2>Legal Rights Guidance</h2>
      <div className={styles.legalCards}>
        {legalCards.map((card, i) => (
          <article key={i} className={styles.legalCard}>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Suggestions() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim()) {
      alert("Thank you for your feedback!");
      setFeedback("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section>
      <h2>Suggestions & Feedback</h2>
      <form onSubmit={handleSubmit} className={styles.feedbackForm}>
        <label htmlFor="feedback">
          Your Feedback:
          <textarea
            id="feedback"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            placeholder="Enter your suggestions here..."
          ></textarea>
        </label>
        <button type="submit" className={styles.primaryBtn}>
          Submit
        </button>
        {submitted && <p className={styles.thanksMsg}>Feedback submitted!</p>}
      </form>
    </section>
  );
}

function Settings() {
  const [role, setRole] = useState("Admin");
  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
  });

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const togglePreference = (pref) => {
    setPreferences((prev) => ({
      ...prev,
      [pref]: !prev[pref],
    }));
  };

  return (
    <section>
      <h2>Settings</h2>
      <form className={styles.settingsForm}>
        <label>
          Role Management:
          <select value={role} onChange={handleRoleChange} aria-label="Role selection">
            <option>Admin</option>
            <option>User</option>
            <option>Counselor</option>
          </select>
        </label>
        <fieldset className={styles.preferencesFieldset}>
          <legend>Preferences:</legend>
          <label>
            <input
              type="checkbox"
              checked={preferences.darkMode}
              onChange={() => togglePreference("darkMode")}
            />{" "}
            Dark Mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={preferences.notifications}
              onChange={() => togglePreference("notifications")}
            />{" "}
            Notifications
          </label>
        </fieldset>
      </form>
    </section>
  );
}

function MainContent({ selected }) {
  switch (selected) {
    case "Overview":
      return <Overview />;
    case "Resources":
      return <Resources />;
    case "Counselors & Services":
      return <CounselorsServices />;
    case "Emergency Helplines":
      return <EmergencyHelplines />;
    case "Legal Rights":
      return <LegalRights />;
    case "Suggestions":
      return <Suggestions />;
    case "Settings":
      return <Settings />;
    default:
      return <Overview />;
  }
}

export default function SafeCityDashboard() {
  const [selectedPage, setSelectedPage] = useState("Overview");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLoginSuccess = () => setIsAdmin(true);
  const handleViewUser = () => setIsAdmin(false);

  return (
    <div className={styles.safeCityApp}>
      <TopNav
        onShowLogin={() => setShowLoginModal(true)}
        onViewUser={handleViewUser}
        isAdmin={isAdmin}
      />
      <div className={styles.mainWrapper}>
        <Sidebar selected={selectedPage} onSelect={setSelectedPage} />
        <main className={styles.mainContentArea} tabIndex={-1}>
          <KPISection activeResources={128} reportsThisMonth={27} />
          <QuickActions />
          <div className={styles.pageContent}>
            <MainContent selected={selectedPage} />
          </div>
        </main>
      </div>
      {showLoginModal && (
        <AdminLoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLoginSuccess}
        />
      )}
    </div>
  );
}
