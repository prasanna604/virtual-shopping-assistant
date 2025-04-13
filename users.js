// Dummy users instead of real DB
const users = [
  {
    id: 1,
    username: 'coreuser',
    password: '$2a$10$eGV1YOiLxSgJqTKB3E0u8eEoLjglKXuVXK0k1QvYFj5MFJtx.JG3q', // hashed: "core123"
    role: 'core',
  },
  {
    id: 2,
    username: 'adminuser',
    password: '$2a$10$yLu6omTGqtF4IQi0HgYKieHVauNgl4Fj0h1PDxUr2eg.JX6soR.E6', // hashed: "admin123"
    role: 'admin',
  },
];

module.exports = users;