import { useEffect, useState } from "react";
import { ENV } from "../config/env";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "user",
    joined: "",
  });

  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    if (!token) return;

    fetch(`${ENV.API_BASE_URL}/api/user/profile/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(user => {
        setProfile({
          fullName: user.fullName || "",
          email: user.email,
          phone: user.phone || "",
          role: user.role,
          joined: new Date(user.createdAt).toDateString(),
        });

        setAddress({
          line1: user.address?.line1 || "",
          line2: user.address?.line2 || "",
          city: user.address?.city || "",
          state: user.address?.state || "",
          pincode: user.address?.pincode || "",
        });
      });
  }, []);

  /* ================= SAVE PROFILE ================= */
  const saveProfile = async () => {
    await fetch(`${ENV.API_BASE_URL}/api/user/profile/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        fullName: profile.fullName,
        phone: profile.phone,
        address,
      }),
    });

    setEditing(false);
    alert("Profile updated successfully");
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">{profile.fullName}</h2>
        <p className="text-sm text-white/60">
          {profile.role} • Member since {profile.joined}
        </p>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ================= PERSONAL INFO ================= */}
        <Card
          title="Personal Information"
          action={
            <button
              onClick={() => setEditing(!editing)}
              className="text-sm text-primary hover:underline"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              value={profile.fullName}
              disabled={!editing}
              onChange={(v) => setProfile({ ...profile, fullName: v })}
            />
            <Input label="Email" value={profile.email} disabled />
            <Input
              label="Phone"
              value={profile.phone}
              disabled={!editing}
              onChange={(v) => setProfile({ ...profile, phone: v })}
            />
          </div>

          {editing && (
            <button
              onClick={saveProfile}
              className="mt-6 px-6 py-2 rounded-xl bg-primary text-white font-semibold"
            >
              Save Changes
            </button>
          )}
        </Card>

        {/* ================= ADDRESS ================= */}
        <Card title="Address Book">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Address Line 1"
              value={address.line1}
              onChange={(v) => setAddress({ ...address, line1: v })}
            />
            <Input
              label="Address Line 2"
              value={address.line2}
              onChange={(v) => setAddress({ ...address, line2: v })}
            />
            <Input
              label="City"
              value={address.city}
              onChange={(v) => setAddress({ ...address, city: v })}
            />
            <Input
              label="State"
              value={address.state}
              onChange={(v) => setAddress({ ...address, state: v })}
            />
            <Input
              label="Pincode"
              value={address.pincode}
              onChange={(v) => setAddress({ ...address, pincode: v })}
            />
          </div>

         <button
  onClick={saveProfile}
  className="relative z-10 mt-6 px-6 py-2 rounded-xl 
             bg-primary hover:bg-white/30 cursor-pointer"
>
  Save Address
</button>

        </Card>

      </div>
    </>
  );
}

/* ================= UI HELPERS ================= */

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-xs text-white/60">{label}</label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full mt-1 px-4 py-2 rounded-xl
          bg-white/10 border border-white/20
          text-white outline-none
          ${disabled ? "opacity-60 cursor-not-allowed" : "focus:border-primary"}
        `}
      />
    </div>
  );         

}
