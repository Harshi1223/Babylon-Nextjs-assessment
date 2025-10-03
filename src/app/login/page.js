"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
// Assuming you have a file named 'firebase.js' in the parent directory
import { auth } from "../firebase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Effect to handle success message from registration query parameter
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Registered successfully! Please log in.");
      // Clear the URL parameter
      router.replace(pathname, { shallow: true });
      
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [searchParams, router, pathname]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    setSuccessMessage(""); 

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (err) {
      setIsSubmitting(false);

      if (err.code === "auth/user-not-found") {
        setError("User not registered. Please sign up.");
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Incorrect email or password.");
      } else {
        setError("Login failed. Check your credentials.");
        console.error("Firebase Login Error:", err.code);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto", padding: "0 20px" }}>
      
      {/* Success Message Popup - Translucent Green Background */}
      {successMessage && (
        <div style={{ 
          padding: 10, 
          marginBottom: 15, 
          backgroundColor: 'rgba(182, 237, 184, 0.9)', 
          color: '#155724', 
          border: '1px solid #c3e6cb', 
          borderRadius: '8px', 
          textAlign: 'center',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          {successMessage}
        </div>
      )}

      {/* Main Login Box - Glassmorphism Style */}
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
        <h1 style={{fontSize: '28px', marginBottom: '20px', color: '#B04B76'}}>Login</h1>
        
        <form onSubmit={handleLogin}>
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
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", color: '#555' }}>
          Not a member?{" "}
          <span
            style={{ color: "#B04B76", cursor: "pointer", fontWeight: "bold", textDecoration: "none" }}
            onClick={() => router.push("/register")}
            onMouseOver={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
