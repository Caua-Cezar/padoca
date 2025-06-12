import bcrypt from 'bcryptjs';

const senhaAdmin = 'admin123';

bcrypt.hash(senhaAdmin, 8, (err, hash) => {
  if (err) throw err;
  console.log('Hash da senha admin:', hash);
});
