import app from "./app.js";
import connectDB from "./config/db.js";
import 'dotenv/config';

await connectDB();

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
