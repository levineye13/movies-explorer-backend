module.exports.DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.CORS_OPTIONS = {
  origin: [
    'http://movies-explorer.students.nomoreparties.xyz',
    'http://www.movies-explorer.students.nomoreparties.xyz',
    'https://movies-explorer.students.nomoreparties.xyz',
    'https://www.movies-explorer.students.nomoreparties.xyz',
    'http://api.movies-explorer.students.nomoreparties.xyz',
    'http://www.api.movies-explorer.students.nomoreparties.xyz',
    'https://api.movies-explorer.students.nomoreparties.xyz',
    'https://www.api.movies-explorer.students.nomoreparties.xyz',
  ],
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With'],
  methods: ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
};
