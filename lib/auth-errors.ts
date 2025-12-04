// Firebase error code to user-friendly message mapping
export function getAuthErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const errorMessage = error.message;
    
    // Extract Firebase error code from message
    const codeMatch = errorMessage.match(/\(auth\/([^)]+)\)/);
    const errorCode = codeMatch ? codeMatch[1] : null;
    
    switch (errorCode) {
      case "invalid-credential":
        return "Invalid email or password. Please check your credentials and try again.";
      case "user-not-found":
        return "No account found with this email. Please sign up first.";
      case "wrong-password":
        return "Incorrect password. Please try again.";
      case "email-already-in-use":
        return "An account with this email already exists. Please sign in instead.";
      case "weak-password":
        return "Password is too weak. Please use at least 8 characters.";
      case "invalid-email":
        return "Please enter a valid email address.";
      case "user-disabled":
        return "This account has been disabled. Please contact support.";
      case "too-many-requests":
        return "Too many failed attempts. Please try again later.";
      case "network-request-failed":
        return "Network error. Please check your internet connection.";
      case "popup-closed-by-user":
        return "Sign-in was cancelled. Please try again.";
      case "operation-not-allowed":
        return "This sign-in method is not enabled. Please contact support.";
      default:
        return "An error occurred. Please try again.";
    }
  }
  
  return "An unexpected error occurred. Please try again.";
}
