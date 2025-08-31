import Header from './Header.js';
function SignInPage() {
    return (
      
          <div className="signin-container">
          <div className="signin-card">
            <h2 className="signin-title">Sign In</h2>
            <form>
              <div className="input-group">
                <label className="signin-label" htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  className="signin-input"
                  placeholder="Email"
                  required
                />
                
              </div>
              <div className="input-group">
                <label className="signin-label" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="signin-input"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="submit"
                className="signin-button"
              >
                Sign In
              </button>
            </form>
            <p className="signin-text">
              Don’t have an account?{' '}
              <a href="/signup" className="signin-link">
                Sign up
              </a>
            </p>
          </div>
        </div>
    );
  }
  export default SignInPage
