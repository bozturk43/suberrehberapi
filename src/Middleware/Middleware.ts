import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { UserType } from "../Schema/TypeDefs/User";
const JWT_SECRET = 'your_jwt_secret_key';

declare global {
    namespace Express {
      interface Request {
        user?: typeof UserType;
      }
    }
  }
// Kimlik doğrulama middleware'ı
export const authenticate = (req:Request, res:Response, next:NextFunction) => {
  // İstekte token kontrolü yapın
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Kimlik doğrulama gerekiyor' });
  }

  // Tokenı doğrulayın
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Geçersiz token' });
    }

    // Token doğrulandıysa kullanıcı bilgisini req objesine ekleyin
    req.user = decoded as typeof UserType;

    next(); // Middleware'ı devam ettir
  });
};

