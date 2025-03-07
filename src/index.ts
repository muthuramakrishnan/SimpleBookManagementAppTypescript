import express from "express";
import helmet from "helmet";
import bookRoutes from "./routes/bookRoutes";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());

app.use("/books", bookRoutes);

app.listen(PORT);
