import { useRef, useState } from "react";
import { supabase } from '../services/supabaseClient';

const SignUp = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const handleSetUp = async () => {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const firstName = firstNameRef.current?.value
        const lastName = lastNameRef.current?.value

        if (!email || !password || !firstName || !lastName) {
            setError('Alle Felder müssen ausgefüllt werden.')
            return
        }

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email, 
                password, 
                options: {
                    data: {
                        first_name: firstName,  
                        last_name: lastName,    
                    }
                }
            })

            if (signUpError) throw signUpError;

            const user = data?.user;
            if (user) {
                setMessage('Registrierung erfolgreich und du bist jetzt eingeloggt');
            } 
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unbekannter Fehler')
            }
        }
    };
    
    return (
        <div>
            <h1>Registrierung</h1>
            <div>
                <label htmlFor="first-name">Vorname</label>
                <input
                    id="first-name"
                    type="text"
                    ref={firstNameRef}
                    placeholder="Vorname"
                />
            </div>
            <div>
                <label htmlFor="last-name">Nachname</label>
                <input
                    id="last-name"
                    type="text"
                    ref={lastNameRef}
                    placeholder="Nachname"
                />
            </div>
            <div>
                <label htmlFor="email">E-Mail</label>
                <input
                    id="email"
                    type="email"
                    ref={emailRef}
                    placeholder="E-Mail"
                />
            </div>
            <div>
                <label htmlFor="password">Passwort</label>
                <input
                    id="password"
                    type="password"
                    ref={passwordRef}
                    placeholder="Passwort"
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <button onClick={handleSetUp}>Registrieren</button>
        </div>
    );
};

export default SignUp;
