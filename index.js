import fs from 'fs';
import jwt from 'jsonwebtoken';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve('./ssh-keys/id_rsa'));

const token = await jwt.sign(
  { name: 'halysson', email: 'halyssonfreitas@gmail.com' },
  privateKey,
  { expiresIn: '1h', algorithm: 'RS512' }
);

const decoded = await jwt.verify(token, privateKey);

console.log('token :::', token, '\n');
console.log('json :::', JSON.stringify(decoded, null, 4));
