import { ErrorRequestHandler } from "express";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "conflict") return res.status(409).send(err.message);
  if(err.type === "unauthorized") return res.status(401).send(err.message);
  if(err.message === "jwt expired") return res.status(401).send("token expired");
  res.status(500).send("Internal server error");

  next(err);
};
export default errorHandler;