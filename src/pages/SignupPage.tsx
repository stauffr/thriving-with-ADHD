import React, { useState } from 'react';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const EMAIL_OCTOPUS_API_KEY = 'eo_c0a991cefb7a2e061b7f20d65f62a53a23aa5538cf939af86fd5d24364e058e0'; // Added your EmailOctopus API key
  const EMAIL_OCTOPUS_LIST_ID = 'd7c0010e-6245-11f0-81c0-51be413765d6'; // Set your EmailOctopus List ID

  async function subscribeToEmailOctopus(email: string) {
    const res = await fetch(`https://emailoctopus.com/api/1.6/lists/${EMAIL_OCTOPUS_LIST_ID}/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Api-Key': EMAIL_OCTOPUS_API_KEY,
      },
      body: JSON.stringify({ email_address: email, status: 'SUBSCRIBED' }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error?.message || 'Failed to subscribe');
    }
    return res.json();
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      await subscribeToEmailOctopus(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', padding: '40px 20px', color: '#2c3e50', fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h1 style={{ fontSize: '2.5em', color: '#2c3e50', marginBottom: 15, fontWeight: 700 }}>Thriving with ADHD</h1>
          <p style={{ fontSize: '1.2em', color: '#6c757d', maxWidth: 600, margin: '0 auto', lineHeight: 1.5 }}>
            We are building a place to find resources and practical tips to live a better life with ADHD. Connect with a supportive community of people who truly understand your journey.
          </p>
        </div>

        <div style={{ display: 'grid', gap: 30, marginBottom: 40 }}>
          <div style={{ background: '#f0ece6', borderRadius: 20, padding: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 30, position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5em', color: '#2c3e50', marginBottom: 12, fontWeight: 600 }}>Daily Life Management</h2>
              <p style={{ color: '#6c757d', fontSize: '1.1em', lineHeight: 1.6, marginBottom: 25 }}>
                Find and share practical tips for organizing your routines, managing time, and creating systems that actually work with your ADHD brain.
              </p>
            </div>
            <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0 }}>📅</div>
          </div>
          <div style={{ background: '#e8f5ed', borderRadius: 20, padding: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 30, position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5em', color: '#2c3e50', marginBottom: 12, fontWeight: 600 }}>Productivity</h2>
              <p style={{ color: '#6c757d', fontSize: '1.1em', lineHeight: 1.6, marginBottom: 25 }}>
                Find and share techniques, tools, and strategies designed specifically for ADHD minds to improve concentration and get things done.
              </p>
            </div>
            <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0 }}>🎯</div>
          </div>
          <div style={{ background: '#ede8f5', borderRadius: 20, padding: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', gap: 30, position: 'relative', overflow: 'hidden' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5em', color: '#2c3e50', marginBottom: 12, fontWeight: 600 }}>Supportive Community</h2>
              <p style={{ color: '#6c757d', fontSize: '1.1em', lineHeight: 1.6, marginBottom: 25 }}>
                Connect with others who truly understand your journey. Share experiences, practical tips, and celebrate wins together.
              </p>
            </div>
            <div style={{ width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, flexShrink: 0 }}>🤝</div>
          </div>
        </div>

        <div style={{ background: '#e8f4f8', borderRadius: 20, padding: 50, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', textAlign: 'center' }}>
          <div style={{ width: 100, height: 100, margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, animation: 'float 3s ease-in-out infinite' }}>🧠</div>
          <h2 style={{ fontSize: '2em', color: '#2c3e50', marginBottom: 15, fontWeight: 600 }}>Be the first to know</h2>
          <p style={{ fontSize: '1.2em', color: '#6c757d', marginBottom: 40, lineHeight: 1.5 }}>
            Get notified when Thriving with ADHD goes live.
          </p>
          {submitted ? (
            <div style={{ background: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: 20, borderRadius: 12, marginTop: 20 }}>
              <strong>🎉 You're all set!</strong><br />
              We'll notify you as soon as we launch. Can't wait to support you on your ADHD journey!
            </div>
          ) : (
            <form className="signup-form" style={{ maxWidth: 400, margin: '0 auto' }} onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 25, textAlign: 'left' }}>
                <label htmlFor="email" style={{ display: 'block', color: '#2c3e50', fontWeight: 500, marginBottom: 8, fontSize: '1em' }}>Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{ width: '100%', minWidth: 0, boxSizing: 'border-box', padding: '15px 20px', border: '2px solid #e9ecef', borderRadius: 12, fontSize: '1em', transition: 'all 0.3s ease', background: 'white', borderColor: error ? '#e53e3e' : '#e9ecef', display: 'block' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5a67d8'}
                  onBlur={e => e.currentTarget.style.borderColor = error ? '#e53e3e' : '#e9ecef'}
                  disabled={loading}
                />
                {error && <div style={{ color: '#e53e3e', fontSize: '0.95em', marginTop: 8 }}>{error}</div>}
              </div>
              <button type="submit" className="submit-btn" style={{ width: '100%', background: loading ? '#a0aec0' : '#5a67d8', color: 'white', border: 'none', padding: 18, borderRadius: 12, fontSize: '1.1em', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', marginBottom: 20 }} disabled={loading}>
                {loading ? 'Signing you up...' : 'Get notified →'}
              </button>
              <div className="privacy-note" style={{ color: '#6c757d', fontSize: '0.9em', lineHeight: 1.4, marginTop: 20 }}>
                We respect your privacy. No spam, just launch updates and helpful ADHD resources. Unsubscribe anytime.
              </div>
            </form>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, padding: 20, color: '#6c757d', fontSize: '0.9em' }}>
          Built by people with ADHD, for people with ADHD, with love and a lot of coffee.
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .card { flex-direction: column !important; text-align: center !important; padding: 30px !important; gap: 20px !important; }
          .card-illustration { width: 80px !important; height: 80px !important; font-size: 60px !important; }
          .header h1 { font-size: 2em !important; }
          .signup-card { padding: 30px !important; }
          .signup-card h2 { font-size: 1.6em !important; }
        }
      `}</style>
    </div>
  );
};

export default SignupPage;
