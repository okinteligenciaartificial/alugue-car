import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Verificar se as variáveis de ambiente necessárias estão definidas
if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.error('Erro: Variáveis de ambiente de banco de dados não configuradas');
  process.exit(1);
}

// Verificar se o JWT_SECRET está definido
if (!process.env.JWT_SECRET) {
  console.error('Erro: JWT_SECRET não configurado');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    cargo: string;
    perfil: string;
  };
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy' });
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1 AND ativo = true',
      [email]
    );

    const user = result.rows[0];
    if (!user || !bcrypt.compareSync(senha, user.senha_hash)) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        cargo: user.cargo,
        perfil: user.perfil
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );


    await pool.query(
      'UPDATE usuarios SET ultimo_acesso = NOW() WHERE id = $1',
      [user.id]
    );

    res.json({
      token,
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        cargo: user.cargo,
        perfil: user.perfil
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

app.get('/api/user/profile', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, nome, email, cargo, perfil FROM usuarios WHERE id = $1',
      [req.user?.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});