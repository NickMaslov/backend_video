import express from "express";

import authentification from "./autentication";

const router = express.Router();

export default (): express.Router => {
  authentification(router);

  return router;
};
