require('dotenv').config();

const cors = require('cors');
const app = require('./app');
const prisma = require('./config/prisma');

// 🔥 CORS (antes das rotas)
app.use(cors({
  origin: 'https://desabandonefocinhos-front.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// 🔥 Preflight (evita erro em algumas requisições)
app.options('*', cors());

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    try {
      await prisma.$connect();
      console.log('Database connection has been established successfully.');
    } catch (dbError) {
      console.warn('Database connection failed on startup, server will continue:', dbError.message);
    }

    app.listen(PORT, () => {
      console.log(`✅ Backend rodando na porta: ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer();