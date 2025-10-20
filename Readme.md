# Backend for learning

- this is a backend with a good project just for learning 

- {} -> use when you want to import by the exact name and use default when you want to import by any name 

🧩 2️⃣ Should you return both access and refresh tokens?

Here’s the reasoning:

Token Type	Purpose	Where Stored	Lifetime	When Used
Access Token	Used to access protected APIs	Usually in memory or short-term storage	Short (e.g., 15 min – 1 hr)	Sent with each request (Authorization: Bearer ...)
Refresh Token	Used to get a new access token when it expires	Usually stored in secure HTTP-only cookie or DB	Long (e.g., 7 days – 30 days)	Only sent to /refresh endpoint

So you usually return both when the user logs in:

The frontend keeps the accessToken (for immediate use)

The backend stores the refreshToken (and optionally returns it to the frontend if needed)