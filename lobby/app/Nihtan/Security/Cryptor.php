<?php
/**
 * PHP OpenSSL Cryptor
 *
 * @author  Joseph Dan B. Alinsug <josephdanalinsug@hotmail.com>
 * @copyright Bluefrog Contents and Support Inc.
 */

namespace App\Nihtan\Security;

/**
 * Wrapper for OpenSSL encryption and decryption
 */
class Cryptor
{

    /**
     * Encrypt data passed
     *
     * @param string $data String data to be encrypted
     * @param string $key key to be used to encrypt data
     * @param string $cipher algo to be used to encrypt data
     * @return string encrypted data
     */
    public static function encrypt($data, $key, $cipher = 'AES-128-CBC')
    {
        $ivlen = openssl_cipher_iv_length($cipher);
        $iv = openssl_random_pseudo_bytes($ivlen);

        $cipherTextRaw = openssl_encrypt($data, $cipher, $key, $options = OPENSSL_RAW_DATA, $iv);
        // Generate HMAC for receiving end
        $hmac = hash_hmac('sha256', $cipherTextRaw, $key, $as_binary = true);

        // generate cipher text encoded in base64
        return base64_encode($iv.$hmac.$cipherTextRaw);
    }

    /**
     * Decrypt data passed
     *
     * @param string $data base64 encoded data to be decrypted
     * @param string $key key to be used to decrypt passed data
     * @param string $cipher algo to be used to decrypt data
     * @return string decrypted string
     */
    public static function decrypt($data, $key, $cipher = 'AES-128-CBC')
    {
        $data = base64_decode($data);
        $ivlen = openssl_cipher_iv_length($cipher);
        $iv = substr($data, 0, $ivlen);

        // retrieve HMAC
        $hmac = substr($data, $ivlen, $sha2len = 32);

        $cipherTextRaw = substr($data, $ivlen+$sha2len);
        $plainText = openssl_decrypt($cipherTextRaw, $cipher, $key, $options = OPENSSL_RAW_DATA, $iv);

        // regenerate HMAC to compare with the one received
        $calcMac = hash_hmac('sha256', $cipherTextRaw, $key, $as_binary=true);

        // compare and return
        return hash_equals($hmac, $calcMac) ? $plainText : null;
    }

    /**
     * Compare array from hash and parameters passed, excluding the hash itself
     *
     * @param  array $parameters parameters passed
     * @param string $key secret key of operator
     * @return boolean
     */
    public static function comparator(array $parameters = [], $key)
    {
        $hash = explode(',', Cryptor::decrypt($parameters['hash'], $key) ?? []);

        unset($parameters['hash']);

        $parameters = array_values($parameters);

        sort($hash);
        sort($parameters);

        return $hash == $parameters;
    }
}
