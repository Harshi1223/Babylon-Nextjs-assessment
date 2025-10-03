/* Register Page with Glassmorphism Box and Show Password Toggle */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// Assuming you have a file named 'firebase.js' in the parent directory
import { auth } from "../firebase";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, { displayName: fullName });
      
      // Redirect to login page with a success message flag
      router.push("/login?registered=true");
      
    } catch (err) {
      setIsSubmitting(false);
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in.");
      } else {
        setError("Registration failed. Please try again.");
        console.error("Firebase Register Error:", err.code);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: "0 20px" }}>
      {/* Main Register Box - Glassmorphism Style */}
      <div style={{ 
        padding: "30px", 
        backgroundColor: 'rgba(255, 255, 255, 0.4)', // Translucent white (40% opacity)
        borderRadius: '16px', 
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)', // The glass effect
        border: '1px solid rgba(255, 255, 255, 0.5)', // Light border
        color: '#171717', // Dark text
        textAlign: 'center'
      }}>
        <h1 style={{fontSize: '28px', marginBottom: '20px', color: '#B04B76'}}>Register</h1>
        
        <form onSubmit={handleRegister}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", textAlign: 'left' }}>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginBottom: 15, 
              border: "1px solid rgba(0, 0, 0, 0.2)", 
              borderRadius: "8px", 
              boxSizing: "border-box",
              backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly visible input
              outline: 'none',
              color: '#171717',
            }}
            placeholder="John Doe"
            required
            disabled={isSubmitting}
          />

          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", textAlign: 'left' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: "100%", 
              padding: "12px", 
              marginBottom: 15, 
              border: "1px solid rgba(0, 0, 0, 0.2)", 
              borderRadius: "8px", 
              boxSizing: "border-box",
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              outline: 'none',
              color: '#171717',
            }}
            placeholder="you@example.com"
            required
            disabled={isSubmitting}
          />

          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", textAlign: 'left' }}>Password</label>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              type={showPassword ? "text" : "password"} // Dynamic input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                width: "100%", 
                padding: "12px", 
                paddingRight: '40px', // Make space for the button
                border: "1px solid rgba(0, 0, 0, 0.2)", 
                borderRadius: "8px", 
                boxSizing: "border-box",
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                outline: 'none',
                color: '#171717',
              }}
              placeholder="Min 6 characters"
              required
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: '5px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#B04B76',
                padding: '5px',
                fontSize: '14px',
                fontWeight: '600'
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p style={{ color: "#d9534f", marginBottom: 15, textAlign: 'center' }}>{error}</p>}

          <button 
            type="submit" 
            style={{ 
              width: "100%", 
              padding: 14, 
              backgroundColor: "#E67D9C", // Pink button color
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: isSubmitting ? "not-allowed" : "pointer", 
              opacity: isSubmitting ? 0.8 : 1, 
              fontWeight: "bold",
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D45A7C'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E67D9C'}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", color: '#555' }}>
          Already a member?{" "}
          <span
            style={{ color: "#B04B76", cursor: "pointer", fontWeight: "bold", textDecoration: "none" }}
            onClick={() => router.push("/login")}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
