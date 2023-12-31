# JsonWebToken package configured with RSA

This micro project is a way to register knowledge achieved by a reading in the official documentation and of the coding my own example of the JsonWebToken package with RSA private key.

## Run this project

```
npm install
npm start
```

## JsonWebToken documentation

- [NPM](https://www.npmjs.com/package/jsonwebtoken)
- [Git Hub](https://github.com/auth0/node-jsonwebtoken#readme)

## Points to see in this code

The `privateKey` in this case is a RSA Private Key generated by ssh-keygen (bash application).

```javascript
const privateKey = fs.readFileSync(path.resolve('./ssh-keys/id_rsa'));
```
To know how to generate this `privateKey` see [Create RSA Private Key](#create-rsa-private-key) .

The `sign` function of `jwt` generate a JWT token after a supposed validation that this user exists in database (not included in this code), in this way sign a user in the application.

```javascript
const token = await jwt.sign(
  { name: 'halysson', email: 'halyssonfreitas@gmail.com' },
  privateKey,
  { expiresIn: '1h', algorithm: 'RS512' }
);
```

That token needs at least a `payload` and a `privateKey`. The third argument is a `options` object and is optional.

The `payload` are public data. After token generated you can see this data by decoding it with [JWT site](https://jwt.io/) .

The `privateKey` can be a simple secret or a private key like a RSA used in this project.

The `options` object complete possibilities can be show in [JsonWebToken documentation](#jsonwebtoken-documentation). The propertie `expiresIn` determine the token life time, where in this case configure that this token has one hour of validity. The `algorithm` specifies what kind of cryptography to use. The above case `RS512` means that it will use RSA with SHA512.

### Using simple secret

With the code below you will use a secret, not a private key, that will be cryptography by HMAC with SHA-256, that is the default. 

```javascript
const token = await jwt.sign(
  { name: 'halysson', email: 'halyssonfreitas@gmail.com' },
  'anysecret',
  { expiresIn: '1h' }
);
```

## Create RSA Private Key

There are many tutorials on web that describe how to do it with ssh-keygen (linux terminal application), but I didn't find one that explaint in fully to me what I need for this case, cause that, I will explain it bellow the command construction (limited for my poor knowledge about this theme) and indicate some site to reade.

```bash
ssh-keygen -t rsa -b 4096 -E SHA512 -m PEM -f id_rsa
```

### Explain

- RSA - Rivest Shamir Adleman (RSA) is a way to generate private and public keys.
- 4096 - this is the length of key size in bits.
- SHA512 - this is the figerprint type. After key is generated, the figerprint algorithm generate a unique signature for this
- PEM - encoding type based on Base64. This determine the final aspec of file outputed.
- id_rsa - the name of file outputed.

### Indicated readings

- [
RSA Keys (PEM, DER, PKCS1, PKCS8 and OpenSSH)](https://asecuritysite.com/openssh/openssh)
- [SSH Key Fingerprints](https://weberblog.net/ssh-key-fingerprints/)
- [RS256 vs HS256: What's The Difference?](https://auth0.com/blog/rs256-vs-hs256-whats-the-difference/)