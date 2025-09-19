import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import passport from "passport";

import { PrismaClient } from "../../generated/prisma/index.js";
import type { UserDataInToken } from "../dtos/user.dto.js";

const prisma = new PrismaClient();

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.secretKey as string,
    },
    async (jwtPayload, done) => {
      try {
        const user = await prisma.users.findUnique({
          where: {
            email: jwtPayload.email,
          },
          select: {
            user_id: true,
            email: true,
            username: true,
            is_admin: true,
          },
        });

        const convertDataUserInToken: UserDataInToken = {
          userId: user?.user_id as number,
          username: user?.username as string,
          email: user?.email as string,
          isAdmin: user?.is_admin as boolean,
        };

        return done(null, convertDataUserInToken);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);

export default passport;
