/* Home Page with User Info and Logout */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function HomePage() {
  // Use 'User | null | undefined' to reflect the three states:
  // 1. User object (logged in)
  // 2. null (no user, but auth check is done)
  // 3. undefined (initial state, auth check is not yet done)
  const [user, setUser] = useState(undefined); 
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    // Set up the listener to watch for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // 1. Update the user state
      setUser(currentUser); 
      
      // 2. If no user is found, redirect to login
      if (!currentUser) {
        router.push("/login"); 
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    // Sign the user out
    await signOut(auth);
    // The onAuthStateChanged listener handles the subsequent redirect to /login
  };

  // Styles for consistency with Glassmorphism aesthetic
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFC1DA', // Using the light pink background color
    padding: '1rem',
    fontFamily: 'Inter, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '1rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    textAlign: 'center'
  };

  const headerStyle = {
    fontSize: '2.25rem',
    fontWeight: '800',
    color: '#B04B76', // Pink color for branding
    marginBottom: '1rem'
  };

  const textStyle = {
    color: '#374151',
    marginBottom: '2rem',
    fontSize: '1.125rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#E67D9C', // Pink button color
    borderRadius: '0.5rem',
    transition: 'background-color 0.2s, transform 0.2s',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#D45A7C'; // Darker pink on hover
    e.currentTarget.style.transform = 'scale(1.01)';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = '#E67D9C';
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  };

  // ----------------------------------------------------
  // Initial Auth Check / Loading State
  // ----------------------------------------------------
  if (user === undefined) {
    // Show a loading screen while the client determines auth status
    return (
      <div style={{ ...containerStyle, backgroundColor: '#F9FAFB' }}>
        <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>Checking authentication status...</p>
      </div>
    );
  }
  
  // Get the display name (or use the first part of the email as a fallback)
  const displayName = user?.displayName || user?.email?.split('@')[0];

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {user ? (
          <>
            <h1 style={headerStyle}>
              Hello, {displayName}!
            </h1>
            <p style={textStyle}>
              You’re successfully logged in.
            </p>
            <button
              onClick={handleLogout}
              style={buttonStyle}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Logout
            </button>
          </>
        ) : (
           // This block should ideally not be reached if the redirect works
           <p style={{ fontSize: '1.25rem', color: '#6B7280' }}>Redirecting to login...</p>
        )}
      </div>
    </div>
  );
}
