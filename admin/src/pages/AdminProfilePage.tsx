import { FormEvent, useEffect, useState } from "react";
import AdminAvatar from "../components/AdminAvatar";
import { ImageUploadField } from "../components/ImageUploadField";
import { StudioPageHeader } from "../components/StudioModal";
import { adminDisplayName, useAdminPage } from "../lib/AdminPageContext";
import { api } from "../lib/api";

export default function AdminProfilePage() {
  const { user, refreshUser } = useAdminPage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone ?? "");
    setAvatar(user.avatar ?? "");
  }, [user]);

  async function onSaveProfile(e: FormEvent) {
    e.preventDefault();
    setProfileError("");
    setProfileMessage("");
    setSavingProfile(true);
    try {
      await api("/api/admin/auth/profile", {
        method: "PATCH",
        body: JSON.stringify({ name, email, phone, avatar }),
      });
      await refreshUser();
      setProfileMessage("Profile updated successfully.");
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : "Failed to save profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function onSavePassword(e: FormEvent) {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");
    setSavingPassword(true);
    try {
      const res = await api<{ message: string }>("/api/admin/auth/password", {
        method: "PATCH",
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });
      setPasswordMessage(res.message ?? "Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  }

  const displayName = adminDisplayName(user);

  return (
    <div className="admin-page studio-page admin-profile-page">
      <StudioPageHeader
        title="Admin Profile"
        description="Manage your account photo, contact details, and password."
      />

      <div className="admin-profile-grid">
        <section className="studio-editor-card admin-profile-card">
          <div className="admin-profile-hero">
            <AdminAvatar name={displayName} avatar={avatar} size={88} className="admin-profile-avatar" />
            <div>
              <h2 className="admin-profile-name">{displayName}</h2>
              <p className="admin-profile-meta">{email || user?.email}</p>
              {phone ? <p className="admin-profile-meta">{phone}</p> : null}
            </div>
          </div>

          <form className="studio-form" onSubmit={onSaveProfile}>
            <ImageUploadField
              label="Profile Photo"
              value={avatar}
              onChange={setAvatar}
              variant="dropzone"
            />

            <label className="studio-field">
              <span>Full Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>

            <label className="studio-field">
              <span>Email Address</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>

            <label className="studio-field">
              <span>Phone Number</span>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="+91 00000 00000"
              />
            </label>

            {profileError ? <p className="error">{profileError}</p> : null}
            {profileMessage ? <p className="success">{profileMessage}</p> : null}

            <div className="studio-editor-actions">
              <button className="studio-btn studio-btn--primary" type="submit" disabled={savingProfile}>
                {savingProfile ? "Saving…" : "Save Profile"}
              </button>
            </div>
          </form>
        </section>

        <section className="studio-editor-card admin-profile-card">
          <h3 className="admin-profile-section-title">Change Password</h3>
          <p className="admin-profile-section-copy">
            Use a strong password with at least 8 characters. You will stay signed in after updating.
          </p>

          <form className="studio-form" onSubmit={onSavePassword}>
            <label className="studio-field">
              <span>Current Password</span>
              <input
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
                required
              />
            </label>

            <label className="studio-field">
              <span>New Password</span>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            <label className="studio-field">
              <span>Confirm New Password</span>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </label>

            {passwordError ? <p className="error">{passwordError}</p> : null}
            {passwordMessage ? <p className="success">{passwordMessage}</p> : null}

            <div className="studio-editor-actions">
              <button className="studio-btn studio-btn--primary" type="submit" disabled={savingPassword}>
                {savingPassword ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
