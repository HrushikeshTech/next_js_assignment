1.What problem does Zod solve in a backend application? Why not rely only on frontend validation?

Ans:  Zod solves the problem of validating untrusted backend data and ensuring type-safe, secure APIs. Frontend validation alone is insufficient because it can be bypassed; backend validation is mandatory.

2.What is the difference between z.string() and z.string().min(3)?

Ans: z.string() only checks that the value is a string, while z.string().min(3) also enforces a minimum length of 3 characters

3.What happens if Zod validation fails? How do you send the error to the client?

Ans: When Zod validation fails, it returns validation errors instead of valid data. These errors should be sent to the client with a 400 Bad Request response, containing clear messages about what went wrong.

4.Explain the difference between.parse() and .safeParse().

Ans: .parse() throws an exception if validation fails.
.safeParse() does not throw; it returns an object with success, data, or error.

5.How do you validate email and password using Zod? Explain rules.

Ans:Email is validated using .email() to ensure proper format.
Password is validated using .min() to enforce minimum length and can include additional rules for security (uppercase, number, special character).

Example rules:
Email must be a valid email format
Password must be at least 6–8 characters long

6.What is z.object() and why is nested validation important?

Ans: z.object() defines the expected structure of an object. Nested validation ensures that complex data (like user + address) is fully validated, preventing invalid or incomplete inner objects from reaching the backend.

7.Why is Zod better than manual if-else validation? Give me only interview ready answer of this questions

Ans: Zod is better because it provides clean, reusable, type-safe schemas, detailed error messages, and avoids repetitive, error-prone if-else logic. It also integrates directly with TypeScript for better reliability.

8.What is authentication? How is it different from authorization?

Ans: Authentication verifies who the user is (login).
Authorization determines what the user is allowed to do (permissions).
Authentication comes before authorization.

9.Why should passwords never be stored in plain text? Name one hashing library.

Ans: Plain-text passwords can be stolen if the database is compromised. Hashing protects user credentials by making them irreversible.

10.What is JWT? Name its three parts and what each part stores.

Ans: JWT (JSON Web Token) is a stateless token used for authentication.
It has three parts:
Header – algorithm and token type
Payload – user data and claims
Signature – verifies token integrity

11.Where should JWT be stored on the client? Which option is dangerous and why?

Ans: JWT should be stored in HTTP-only cookies.
Storing JWT in localStorage is dangerous because it is vulnerable to XSS attacks.

12.Explain the backend login flow step by step.

Ans: User sends email and password
Backend validates input
Backend checks user exists
Password is compared using hashing
JWT is generated
Token is sent to the client

13.What is token expiration and why is it important?

Ans:Token expiration limits how long a JWT is valid. It improves security by reducing the risk of stolen tokens being misused.

14.What is authentication middleware? Give one use case.

Ans: Authentication middleware verifies JWT before allowing access to protected routes.
Use case: Protecting user profile or admin routes.

15.What is MongoDB? How is it different from SQL databases?

Ans: MongoDB is a NoSQL, document-based database that stores data in JSON-like documents.
Unlike SQL databases, it is schema-flexible, does not use tables/rows, and scales horizontally.

16.What is a Mongoose schema and why is it required?

Ans: A Mongoose schema defines the structure, data types, and validation rules for MongoDB documents.
It is required to enforce consistency and validation in a schema-less database.

17.What does unique: true do? Does it guarantee uniqueness?

Ans: unique: true creates a unique index in MongoDB.
It helps prevent duplicates but does not guarantee uniqueness by itself without proper index creation and error handling.

18.Difference between findOne() and findById()?

Ans: findOne() finds a document using any field
findById() finds a document using _id only and is more optimized

19.Why are indexes important in MongoDB?

Ans: Indexes improve query performance by reducing the amount of data scanned.
Without indexes, MongoDB performs full collection scans, which are slow.

20.Why do we use .env files for MongoDB connection? What happens if pushed to GitHub?

Ans: .env files store sensitive credentials like database URLs securely.
If pushed to GitHub, credentials can be leaked, leading to database compromise or data loss.
