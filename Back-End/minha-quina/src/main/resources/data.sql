--senha: D7e-kx;$7wQD5e
insert into usuarios (id, email, password, role, username)
values (default,
        'admin@email.com',
        '$2a$10$Z7pZX/j7CXN9bfMe3GVXx.2F7Jrb2nMgod9QwFVwQwzsmN0mdGDju',
        'ADMIN',
        'admin.admin');

-- senha: abc123456$R
insert into usuarios (id, email, password, role, username)
values (default,
        'user@email.com',
        '$2a$10$6XSRSHyMmC3AXxUFEWkkJOz9uJQiLsPIUhQsQM0bqxRnoRVcWtghO',
        'USER',
        'user.user');

