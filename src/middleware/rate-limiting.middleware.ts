import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private attempts = new Map<string, { count: number, lastAttempt: number }>();
    private readonly MAX_ATTEMPTS = 5;
    private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutos

    use(req: Request, res: Response, next: NextFunction) {
        // Solo aplicar rate limiting a endpoints de auth
        if (!req.path.includes('/auth/')) {
            return next();
        }

        const ip = req.ip || req.connection.remoteAddress || 'unknown';
        const key = `${ip}-${req.path}`;
        const now = Date.now();
        
        const attemptData = this.attempts.get(key) || { count: 0, lastAttempt: 0 };
        
        // Reset counter si ha pasado el tiempo de ventana
        if (now - attemptData.lastAttempt > this.WINDOW_MS) {
            attemptData.count = 0;
        }
        
        attemptData.count++;
        attemptData.lastAttempt = now;
        this.attempts.set(key, attemptData);
        
        // Agregar headers de rate limiting
        res.setHeader('X-RateLimit-Limit', this.MAX_ATTEMPTS.toString());
        res.setHeader('X-RateLimit-Remaining', Math.max(0, this.MAX_ATTEMPTS - attemptData.count).toString());
        res.setHeader('X-RateLimit-Reset', new Date(now + this.WINDOW_MS).toISOString());
        
        if (attemptData.count > this.MAX_ATTEMPTS) {
            return res.status(429).json({
                message: 'Too many attempts, please try again later',
                retryAfter: Math.ceil((this.WINDOW_MS - (now - attemptData.lastAttempt)) / 1000)
            });
        }
        
        next();
    }
}
