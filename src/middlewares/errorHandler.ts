import { ErrorRequestHandler } from "express";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err.type === "conflict") return res.status(409).send(err.message);
  if(err.type === "unauthorized") return res.status(401).send(err.message);
  res.status(500).send("Something went wrong");

  next(err);
};
export default errorHandler;