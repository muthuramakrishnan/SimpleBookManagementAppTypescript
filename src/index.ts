import express from "express";
import helmet from "helmet";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./utilities/errorHandler";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());

app.use("/books", bookRoutes);
app.use(errorHandler);

app.listen(PORT);
