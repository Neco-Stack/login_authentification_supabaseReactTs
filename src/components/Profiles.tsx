import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";

interface UserProfile {
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  last_sign_in_at: string;
}

const Profiles = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const { data: userDataResponse, error: userError } = await supabase.auth.getUser();
      if (userError || !userDataResponse?.user) {
        setError("Benutzer nicht eingeloggt");
        return;
      }

      const user = userDataResponse.user;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ein unbekannter Fehler ist aufgetreten");
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload(); 
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Keine Daten gefunden. Bitte anmelden.</div>;
  }

  return (
    <div>
      <h2>Dein Profil</h2>
      <p>E-Mail: {userData.email}</p>
      <p>Vorname: {userData.first_name}</p>
      <p>Nachname: {userData.last_name}</p>
      <p>Account erstellt: {new Date(userData.created_at).toLocaleString()}</p>
      <p>Zuletzt geändert: {new Date(userData.updated_at).toLocaleString()}</p>
      <p>Letztes Login: {new Date(userData.last_sign_in_at).toLocaleString()}</p>
      <button onClick={handleLogout}>Abmelden</button>
    </div>
  );
};

export default Profiles;