import { app } from "./app";
import { prisma } from "./database/prisma";

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`API sucessfully started at port ${port}`);
});
