import jwt, { JwtPayload } from 'jsonwebtoken';

interface TokenPayload {
  id: string;
}

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (userId: string): TokenPair => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string): JwtPayload & TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & TokenPayload;
};