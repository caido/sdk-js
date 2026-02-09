/**
 * The `crypto` module provides cryptographic functionality that includes a
 * set of wrappers for OpenSSL's hash, HMAC.
 *
 * ```js
 * import { createHmac } from 'crypto';
 *
 * const secret = 'abcdefg';
 * const hash = createHmac('sha256', secret)
 *                .update('I love cupcakes')
 *                .digest('hex');
 * console.log(hash);
 * // Prints:
 * //   c0fa1bc00531bd78ef38c628449c5102aeabd49b5dc3a2a516ea6ea959d6658e
 * ```
 */
declare module "crypto" {
  import { type Buffer } from "buffer";
  type BinaryLike = string | QuickJS.ArrayBufferView;
  type BinaryToTextEncoding = "base64" | "hex";
  type CharacterEncoding = "utf8" | "utf-8" | "utf16le" | "utf-16le" | "latin1";
  type LegacyCharacterEncoding = "ascii";
  type Encoding =
    | BinaryToTextEncoding
    | CharacterEncoding
    | LegacyCharacterEncoding;
  /**
   * Creates and returns a `Hash` object that can be used to generate hash digests
   * using the given `algorithm`.
   *
   * The `algorithm` is supported by `'md4'`, `'md5'`, `'sha1'`, `'sha256'`,`'sha384'` and `'sha512'`.
   */
  function createHash(algorithm: string): Hash;
  /**
   * Creates and returns an `Hmac` object that uses the given `algorithm` and `key`.
   *
   * The `algorithm` is supported by `'md4'`, `'md5'`, `'sha1'`, `'sha256'`,`'sha384'` and `'sha512'`.
   *
   * The `key` is the HMAC key used to generate the cryptographic HMAC hash.
   * If it is a string, please consider `caveats when using strings as inputs to cryptographic APIs`.
   * If it was obtained from a cryptographically secure source of entropy, such as {@link randomBytes}
   * or {@link generateKey}, its length should not exceed the block size of `algorithm`
   * (e.g., 512 bits for SHA-256).
   */
  function createHmac(algorithm: string, key: BinaryLike): Hmac;
  /**
   * The `Hash` class is a utility for creating hash digests of data.
   *
   * Using the `hash.update()` and `hash.digest()` methods to produce the
   * computed hash.
   *
   * The {@link createHash} method is used to create `Hash` instances.
   * `Hash`objects are not to be created directly using the `new` keyword.
   *
   * Example: Using the `hash.update()` and `hash.digest()` methods:
   *
   * ```js
   * import { createHash } from 'crypto';
   *
   * const hash = createHash('sha256');
   *
   * hash.update('some data to hash');
   * console.log(hash.digest('hex'));
   * // Prints:
   * //   6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
   * ```
   */
  class Hash {
    private constructor();
    /**
     * Updates the hash content with the given `data`, the encoding of which
     * is given in `inputEncoding`.
     * If `encoding` is not provided, and the `data` is a string, an
     * encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or`DataView`,
     * then `inputEncoding` is ignored.
     *
     * This can be called many times with new data as it is streamed.
     * @param inputEncoding The `encoding` of the `data` string.
     */
    update(data: BinaryLike): Hash;
    update(data: string, inputEncoding: Encoding): Hash;
    /**
     * Calculates the digest of all of the data passed to be hashed (using the `hash.update()` method).
     * If `encoding` is provided a string will be returned; otherwise
     * a `Buffer` is returned.
     *
     * The `Hash` object can not be used again after `hash.digest()` method has been
     * called. Multiple calls will cause an error to be thrown.
     * @param encoding The `encoding` of the return value.
     */
    digest(): Buffer;
    digest(encoding: BinaryToTextEncoding): string;
  }
  /**
   * The `Hmac` class is a utility for creating cryptographic HMAC digests.
   *
   * Using the `hmac.update()` and `hmac.digest()` methods to produce the
   * computed HMAC digest.
   *
   * The {@link createHmac} method is used to create `Hmac` instances.
   * `Hmac`objects are not to be created directly using the `new` keyword.
   *
   * Example: Using the `hmac.update()` and `hmac.digest()` methods:
   *
   * ```js
   * import { createHmac } from 'crypto';
   *
   * const hmac = createHmac('sha256', 'a secret');
   *
   * hmac.update('some data to hash');
   * console.log(hmac.digest('hex'));
   * // Prints:
   * //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
   * ```
   */
  class Hmac {
    private constructor();
    /**
     * Updates the `Hmac` content with the given `data`, the encoding of which
     * is given in `inputEncoding`.
     * If `encoding` is not provided, and the `data` is a string, an
     * encoding of `'utf8'` is enforced. If `data` is a `Buffer`, `TypedArray`, or`DataView`,
     * then `inputEncoding` is ignored.
     *
     * This can be called many times with new data as it is streamed.
     * @param inputEncoding The `encoding` of the `data` string.
     */
    update(data: BinaryLike): Hmac;
    update(data: string, inputEncoding: Encoding): Hmac;
    /**
     * Calculates the HMAC digest of all of the data passed using `hmac.update()`.
     * If `encoding` is
     * provided a string is returned; otherwise a `Buffer` is returned;
     *
     * The `Hmac` object can not be used again after `hmac.digest()` has been
     * called. Multiple calls to `hmac.digest()` will result in an error being thrown.
     * @param encoding The `encoding` of the return value.
     */
    digest(): Buffer;
    digest(encoding: BinaryToTextEncoding): string;
  }
  type CipherCCMTypes = "aes-128-ccm" | "aes-192-ccm" | "aes-256-ccm";
  type CipherGCMTypes = "aes-128-gcm" | "aes-192-gcm" | "aes-256-gcm";
  type CipherOCBTypes = "aes-128-ocb" | "aes-192-ocb" | "aes-256-ocb";
  type CipherChaCha20Poly1305Types = "chacha20-poly1305";
  type CipherKey = BinaryLike;
  interface CipherCCMOptions {
    authTagLength: number;
  }
  interface CipherGCMOptions {
    authTagLength?: number | undefined;
  }
  interface CipherOCBOptions {
    authTagLength: number;
  }
  interface CipherChaCha20Poly1305Options {
    /** @default 16 */
    authTagLength?: number | undefined;
  }
  /**
   * Creates and returns a `Cipher` object, with the given `algorithm`, `key` and
   * initialization vector (`iv`).
   *
   * The `options` argument controls stream behavior and is optional except when a
   * cipher in CCM or OCB mode (e.g. `'aes-128-ccm'`) is used. In that case, the`authTagLength` option is required and specifies the length of the
   * authentication tag in bytes, see `CCM mode`. In GCM mode, the `authTagLength`option is not required but can be used to set the length of the authentication
   * tag and defaults to 16 bytes.
   * For `chacha20-poly1305`, the `authTagLength` option defaults to 16 bytes.
   *
   * The `key` is the raw key used by the `algorithm` and `iv` is an [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector). Both arguments must be `'utf8'` encoded
   * strings,`Buffers`, `TypedArray`, or `DataView`s. The `key` may optionally be
   * a `KeyObject` of type `secret`. If the cipher does not need
   * an initialization vector, `iv` may be `null`.
   *
   * When passing strings for `key` or `iv`, please consider `caveats when using strings as inputs to cryptographic APIs`.
   *
   * Initialization vectors should be unpredictable and unique; ideally, they will be
   * cryptographically random. They do not have to be secret: IVs are typically just
   * added to ciphertext messages unencrypted. It may sound contradictory that
   * something has to be unpredictable and unique, but does not have to be secret;
   * remember that an attacker must not be able to predict ahead of time what a
   * given IV will be.
   */
  function createCipheriv(
    algorithm: CipherCCMTypes,
    key: CipherKey,
    iv: BinaryLike,
    options: CipherCCMOptions,
  ): Cipheriv;
  function createCipheriv(
    algorithm: CipherOCBTypes,
    key: CipherKey,
    iv: BinaryLike,
    options: CipherOCBOptions,
  ): CipherOCB;
  function createCipheriv(
    algorithm: CipherGCMTypes,
    key: CipherKey,
    iv: BinaryLike,
    options?: CipherGCMOptions,
  ): CipherGCM;
  function createCipheriv(
    algorithm: CipherChaCha20Poly1305Types,
    key: CipherKey,
    iv: BinaryLike,
    options?: CipherChaCha20Poly1305Options,
  ): CipherChaCha20Poly1305;
  function createCipheriv(
    algorithm: string,
    key: CipherKey,
    iv: BinaryLike | null,
  ): Cipheriv;
  /**
   * Instances of the `Cipheriv` class are used to encrypt data. The class can be
   * used in one way:
   *
   * * Using the `cipher.update()` and `cipher.final()` methods to produce
   * the encrypted data.
   *
   * The {@link createCipheriv} method is
   * used to create `Cipheriv` instances. `Cipheriv` objects are not to be created
   * directly using the `new` keyword.
   */
  class Cipheriv {
    private constructor();
    /**
     * Updates the cipher with `data`.
     *
     * The `cipher.update()` method can be called multiple times with new data until `cipher.final()` is called. Calling `cipher.update()` after `cipher.final()` will result in an error being
     * thrown.
     */
    update(data: BinaryLike): Buffer;
    /**
     * Once the `cipher.final()` method has been called, the `Cipheriv` object can no
     * longer be used to encrypt data. Attempts to call `cipher.final()` more than
     * once will result in an error being thrown.
     * @return Any remaining enciphered contents.
     */
    final(): Buffer;
  }
  interface CipherCCM extends Cipheriv {
    setAAD(buffer: QuickJS.ArrayBufferView): this;
    getAuthTag(): Buffer;
  }
  interface CipherGCM extends Cipheriv {
    setAAD(buffer: QuickJS.ArrayBufferView): this;
    getAuthTag(): Buffer;
  }
  interface CipherOCB extends Cipheriv {
    setAAD(buffer: QuickJS.ArrayBufferView): this;
    getAuthTag(): Buffer;
  }
  interface CipherChaCha20Poly1305 extends Cipheriv {
    setAAD(buffer: QuickJS.ArrayBufferView): this;
    getAuthTag(): Buffer;
  }
  /**
   * Creates and returns a `Decipheriv` object that uses the given `algorithm`, `key` and initialization vector (`iv`).
   *
   * The `options` argument controls stream behavior and is optional except when a
   * cipher in CCM or OCB mode (e.g. `'aes-128-ccm'`) is used. In that case, the `authTagLength` option is required and specifies the length of the
   * authentication tag in bytes, see `CCM mode`. In GCM mode, the `authTagLength` option is not required but can be used to restrict accepted authentication tags
   * to those with the specified length.
   * For `chacha20-poly1305`, the `authTagLength` option defaults to 16 bytes.
   *
   * The `key` is the raw key used by the `algorithm` and `iv` is an [initialization vector](https://en.wikipedia.org/wiki/Initialization_vector). Both arguments must be `'utf8'` encoded
   * strings,`Buffers`, `TypedArray`, or `DataView`s. The `key` may optionally be
   * a `KeyObject` of type `secret`. If the cipher does not need
   * an initialization vector, `iv` may be `null`.
   *
   * When passing strings for `key` or `iv`, please consider `caveats when using strings as inputs to cryptographic APIs`.
   *
   * Initialization vectors should be unpredictable and unique; ideally, they will be
   * cryptographically random. They do not have to be secret: IVs are typically just
   * added to ciphertext messages unencrypted. It may sound contradictory that
   * something has to be unpredictable and unique, but does not have to be secret;
   * remember that an attacker must not be able to predict ahead of time what a given
   * IV will be.
   */
  function createDecipheriv(
    algorithm: CipherCCMTypes,
    key: CipherKey,
    iv: BinaryLike,
    options: CipherCCMOptions,
  ): DecipherCCM;
  function createDecipheriv(
    algorithm: CipherOCBTypes,
    key: CipherKey,
    iv: BinaryLike,
    options: CipherOCBOptions,
  ): DecipherOCB;
  function createDecipheriv(
    algorithm: CipherGCMTypes,
    key: CipherKey,
    iv: BinaryLike,
    options?: CipherGCMOptions,
  ): DecipherGCM;
  function createDecipheriv(
    algorithm: CipherChaCha20Poly1305Types,
    key: CipherKey,
    iv: BinaryLike,
    options?: CipherChaCha20Poly1305Options,
  ): DecipherChaCha20Poly1305;
  function createDecipheriv(
    algorithm: string,
    key: CipherKey,
    iv: BinaryLike | null,
  ): Decipheriv;
  /**
   * Instances of the `Decipheriv` class are used to decrypt data. The class can be
   * used in one way:
   *
   * * Using the `decipher.update()` and `decipher.final()` methods to
   * produce the unencrypted data.
   *
   * The {@link createDecipheriv} method is
   * used to create `Decipheriv` instances. `Decipheriv` objects are not to be created
   * directly using the `new` keyword.
   */
  class Decipheriv {
    private constructor();
    /**
     * Updates the decipher with `data`.
     *
     * The `decipher.update()` method can be called multiple times with new data until `decipher.final()` is called. Calling `decipher.update()` after `decipher.final()` will result in an error
     * being thrown.

     */
    update(data: QuickJS.ArrayBufferView): Buffer;

    /**
     * Once the `decipher.final()` method has been called, the `Decipheriv` object can
     * no longer be used to decrypt data. Attempts to call `decipher.final()` more
     * than once will result in an error being thrown.
     */
    final(): Buffer;
  }
  interface DecipherCCM extends Decipheriv {
    setAuthTag(buffer: QuickJS.ArrayBufferView): this;
    setAAD(buffer: QuickJS.ArrayBufferView): this;
  }
  interface DecipherGCM extends Decipheriv {
    setAuthTag(buffer: QuickJS.ArrayBufferView): this;
    setAAD(buffer: QuickJS.ArrayBufferView): this;
  }
  interface DecipherOCB extends Decipheriv {
    setAuthTag(buffer: QuickJS.ArrayBufferView): this;
    setAAD(buffer: QuickJS.ArrayBufferView): this;
  }
  interface DecipherChaCha20Poly1305 extends Decipheriv {
    setAuthTag(buffer: QuickJS.ArrayBufferView): this;
    setAAD(buffer: QuickJS.ArrayBufferView): this;
  }
  /**
   * Generates cryptographically strong pseudorandom data. The `size` argument
   * is a number indicating the number of bytes to generate.
   *
   * the random bytes are generated synchronously and returned as a `Buffer`.
   * An error will be thrown if there is a problem generating the bytes.
   *
   * ```js
   * // Synchronous
   * import { randomBytes } from 'crypto';
   *
   * const buf = randomBytes(256);
   * console.log(
   *   `${buf.length} bytes of random data: ${buf.toString('hex')}`);
   * ```
   *
   * The `crypto.randomBytes()` method will not complete until there is
   * sufficient entropy available.
   * This should normally never take longer than a few milliseconds. The only time
   * when generating the random bytes may conceivably block for a longer period of
   * time is right after boot, when the whole system is still low on entropy.
   *
   * @param size The number of bytes to generate. The `size` must not be larger than `2**31 - 1`.
   */
  function randomBytes(size: number): Buffer;
  /**
   * Return a random integer `n` such that `min <= n < max`.  This
   * implementation avoids [modulo bias](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Modulo_bias).
   *
   * The range (`max - min`) must be less than 2**48. `min` and `max` must
   * be [safe integers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger).
   *
   * ```js
   * // Synchronous
   * import { randomInt } from 'crypto';
   *
   * const n = randomInt(3);
   * console.log(`Random number chosen from (0, 1, 2): ${n}`);
   * ```
   *
   * ```js
   * // With `min` argument
   * import { randomInt } from 'crypto';
   *
   * const n = randomInt(1, 7);
   * console.log(`The dice rolled: ${n}`);
   * ```
   * @param [min=0] Start of random range (inclusive).
   * @param max End of random range (exclusive).
   */
  function randomInt(max: number): number;
  function randomInt(min: number, max: number): number;
  /**
   * Synchronous version of {@link randomFill}.
   *
   * ```js
   * import { Buffer } from 'buffer';
   * import { randomFillSync } from 'crypto';
   *
   * const buf = Buffer.alloc(10);
   * console.log(randomFillSync(buf).toString('hex'));
   *
   * randomFillSync(buf, 5);
   * console.log(buf.toString('hex'));
   *
   * // The above is equivalent to the following:
   * randomFillSync(buf, 5, 5);
   * console.log(buf.toString('hex'));
   * ```
   *
   * Any `ArrayBuffer`, `TypedArray` or `DataView` instance may be passed as`buffer`.
   *
   * ```js
   * import { Buffer } from 'buffer';
   * import { randomFillSync } from 'crypto';
   *
   * const a = new Uint32Array(10);
   * console.log(Buffer.from(randomFillSync(a).buffer,
   *                         a.byteOffset, a.byteLength).toString('hex'));
   *
   * const b = new DataView(new ArrayBuffer(10));
   * console.log(Buffer.from(randomFillSync(b).buffer,
   *                         b.byteOffset, b.byteLength).toString('hex'));
   *
   * const c = new ArrayBuffer(10);
   * console.log(Buffer.from(randomFillSync(c)).toString('hex'));
   * ```
   * @param buffer Must be supplied. The size of the provided `buffer` must not be larger than `2**31 - 1`.
   * @param [offset=0]
   * @param [size=buffer.length - offset]
   * @return The object passed as `buffer` argument.
   */
  function randomFillSync<T extends QuickJS.ArrayBufferView>(
    buffer: T,
    offset?: number,
    size?: number,
  ): T;
  /**
   * This function is similar to {@link randomBytes} but requires the first
   * argument to be a `Buffer` that will be filled. It also
   * requires that a callback is passed in.
   *
   * If the `callback` function is not provided, an error will be thrown.
   *
   * ```js
   * import { Buffer } from 'buffer';
   * import { randomFill } from 'crypto';
   *
   * const buf = Buffer.alloc(10);
   * randomFill(buf, (err, buf) => {
   *   if (err) throw err;
   *   console.log(buf.toString('hex'));
   * });
   *
   * randomFill(buf, 5, (err, buf) => {
   *   if (err) throw err;
   *   console.log(buf.toString('hex'));
   * });
   *
   * // The above is equivalent to the following:
   * randomFill(buf, 5, 5, (err, buf) => {
   *   if (err) throw err;
   *   console.log(buf.toString('hex'));
   * });
   * ```
   *
   * Any `ArrayBuffer`, `TypedArray`, or `DataView` instance may be passed as `buffer`.
   *
   * While this includes instances of `Float32Array` and `Float64Array`, this
   * function should not be used to generate random floating-point numbers. The
   * result may contain `+Infinity`, `-Infinity`, and `NaN`, and even if the array
   * contains finite numbers only, they are not drawn from a uniform random
   * distribution and have no meaningful lower or upper bounds.
   *
   * ```js
   * import { Buffer } from 'buffer';
   * import { randomFill } from 'crypto';
   *
   * const a = new Uint32Array(10);
   * randomFill(a, (err, buf) => {
   *   if (err) throw err;
   *   console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
   *     .toString('hex'));
   * });
   *
   * const b = new DataView(new ArrayBuffer(10));
   * randomFill(b, (err, buf) => {
   *   if (err) throw err;
   *   console.log(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength)
   *     .toString('hex'));
   * });
   *
   * const c = new ArrayBuffer(10);
   * randomFill(c, (err, buf) => {
   *   if (err) throw err;
   *   console.log(Buffer.from(buf).toString('hex'));
   * });
   * ```
   * @param buffer Must be supplied. The size of the provided `buffer` must not be larger than `2**31 - 1`.
   * @param [offset=0]
   * @param [size=buffer.length - offset]
   * @param callback `function(err, buf) {}`.
   */
  function randomFill<T extends QuickJS.ArrayBufferView>(
    buffer: T,
    callback: (err: Error | null, buf: T) => void,
  ): void;
  function randomFill<T extends QuickJS.ArrayBufferView>(
    buffer: T,
    offset: number,
    callback: (err: Error | null, buf: T) => void,
  ): void;
  function randomFill<T extends QuickJS.ArrayBufferView>(
    buffer: T,
    offset: number,
    size: number,
    callback: (err: Error | null, buf: T) => void,
  ): void;
  type UUID = `${string}-${string}-${string}-${string}-${string}`;
  /**
   * A convenient alias for {@link webcrypto.getRandomValues}. This
   * implementation is not compliant with the Web Crypto spec, to write
   * web-compatible code use {@link webcrypto.getRandomValues} instead.
   * @return Returns `typedArray`.
   */
  function getRandomValues<T extends QuickJS.ArrayBufferView>(typedArray: T): T;
  /**
   * Generates a random {@link https://www.rfc-editor.org/rfc/rfc4122.txt RFC 4122} version 4 UUID.
   * The UUID is generated using a cryptographic pseudorandom number generator.
   */
  function randomUUID(): UUID;
}
