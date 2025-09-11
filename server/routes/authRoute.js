import bodyParser from "body-parser";


app.use(express.json());

app.post("/clerk",
  bodyParser.raw({ type: "application/json" }),
  clerkwebhook
);
