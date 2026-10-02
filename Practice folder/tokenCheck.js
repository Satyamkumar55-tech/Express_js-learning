const jwt = require("jsonwebtoken");
const secret = "test-secret-123"; // hardcoded is fine for an isolated practice script

// 1. Create a valid token (jwt.sign — you know this)
const token = jwt.sign({ id: "abc123" }, secret, {
  expiresIn: "5s",
});
console.log("Token:", token);
// 2. Verify it in a try/catch, console.log the decoded payload on success
try{
       const decoded = jwt.verify(token, secret);
        console.log("Valid token, decoded payload:", decoded);
} catch (error) {
    console.log("Verification failed:", error.name, error.message);
}
// 3. Take the same token, change one character, verify again — log what error.name and error.message you get
const brokenToken = token.slice(0, -5) + "XXXXX"; // mangles the last 5 characters

try {
    const decoded = jwt.verify(brokenToken, secret);
    console.log("This shouldn't print:", decoded);
} catch (error) {
    console.log("Modified token failed as expected:", error.name, error.message);
}
// 4. Create a token with expiresIn: "1s", wait 2 seconds (look up setTimeout or a simple delay), verify — log error.name/message
const shortToken = jwt.sign({ id: "abc123" }, secret, { expiresIn: "1s" });

setTimeout(() => {
    try {
        const decoded = jwt.verify(shortToken, secret);
        console.log("This shouldn't print:", decoded);
    } catch (error) {
        console.log("Expired token failed as expected:", error.name, error.message);
    }
}, 2000); // wait 2 seconds, so the 1-second token has definitely expired
// 5. Call jwt.verify(undefined, secret) — see what happens, log it
try {
    const decoded = jwt.verify(undefined, secret);
    console.log("This shouldn't print:", decoded);
} catch (error) {
    console.log("Missing token failed as expected:", error.name, error.message);
}