import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// @desc   post messages
// @route  POST /api/messages/post
// @access Public
const postMessage = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const { login, password } = request.body;

    response.json({});
  } catch (error: any) {
    response.status(404).json({
      message: error.message,
    });
    next(`Error: ${error.message}`);
  }
};

export { postMessage };
