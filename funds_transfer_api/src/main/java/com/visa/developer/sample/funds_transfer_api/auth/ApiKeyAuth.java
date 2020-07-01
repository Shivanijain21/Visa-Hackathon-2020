/*
 * *© Copyright 2018 - 2020 Visa. All Rights Reserved.**
 *
 * NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.*
 *
 *  By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy (developer.visa.com/privacy).In addition, all permissible uses of the Software must be in support of Visa products, programs and services provided through the Visa Developer Program (VDP) platform only (developer.visa.com). **THE SOFTWARE AND ANY ASSOCIATED INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL FAULTS” BASIS WITHOUT WARRANTY OR  CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.** All brand names are the property of their respective owners, used for identification purposes only, and do not imply product endorsement or affiliation with Visa. Any links to third party sites are for your information only and equally  do not constitute a Visa endorsement. Visa has no insight into and control over third party content and code and disclaims all liability for any such components, including continued availability and functionality. Benefits depend on implementation details and business factors and coding steps shown are exemplary only and do not reflect all necessary elements for the described capabilities. Capabilities and features are subject to Visa’s terms and conditions and may require development,implementation and resources by you based on your business and operational details. Please refer to the specific API documentation for details on the requirements, eligibility and geographic availability.*
 *
 * This Software includes programs, concepts and details under continuing development by Visa. Any Visa features,functionality, implementation, branding, and schedules may be amended, updated or canceled at Visa’s discretion.The timing of widespread availability of programs and functionality is also subject to a number of factors outside Visa’s control,including but not limited to deployment of necessary infrastructure by issuers, acquirers, merchants and mobile device manufacturers.*
 *
 */
package com.visa.developer.sample.funds_transfer_api.auth;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.springframework.http.HttpHeaders;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.SignatureException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ApiKeyAuth implements Authentication {
    private final String location;
    private final String paramName;

    private String apiKey;
    private String apiKeyPrefix;

    private String sharedSecret;
    private String token;

    private String keyId;

    public ApiKeyAuth(String location, String paramName) {
        this.location = location;
        this.paramName = paramName;
    }

    private static String toHex(byte[] bytes) {
        BigInteger bi = new BigInteger(1, bytes);
        return String.format("%0" + (bytes.length << 1) + "X", bi);
    }

    public String getLocation() {
        return location;
    }

    public String getParamName() {
        return paramName;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getApiKeyPrefix() {
        return apiKeyPrefix;
    }

    public void setApiKeyPrefix(String apiKeyPrefix) {
        this.apiKeyPrefix = apiKeyPrefix;
    }

    public String getSharedSecret() {
        return sharedSecret;
    }

    public void setSharedSecret(String sharedSecret) {
        this.sharedSecret = sharedSecret;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getKeyId() {
        return keyId;
    }

    public void setKeyId(String keyId) {
        this.keyId = keyId;
    }

    @Override
    public void applyToParams(MultiValueMap<String, String> queryParams, HttpHeaders headerParams) {
        if (apiKey == null && keyId == null) {
            return;
        }
        String value;
        if (apiKeyPrefix != null) {
            value = apiKeyPrefix + " " + apiKey;
        } else {
            value = apiKey;
        }
        if (paramName == "x-pay-token") {
            value = token;
        } else if (paramName == "keyId") {
            value = keyId;
        }
        if (location.equals("query")) {
            queryParams.add(paramName, value);
        } else if (location.equals("header")) {
            headerParams.add(paramName, value);
        }
    }

    public void generateAndSetXpaytoken(MultiValueMap<String, String> queryParams, String resourcePath, Object requestBody) throws SignatureException, JsonProcessingException {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        String requestBodyString = requestBody == null ? "" : ow.writeValueAsString(requestBody);
        String timestamp = timeStamp();

        // Sorting Query Parameters.
        UriComponentsBuilder builder = UriComponentsBuilder.fromPath(resourcePath);
        List<String> keys = new ArrayList<String>(queryParams.keySet());
        Collections.sort(keys);
        if (queryParams != null) {
            for (String key : keys) {
                builder.queryParam(key, queryParams.getFirst(key));
            }
        }
        String fullPath = builder.toUriString();
        String queryString = fullPath.substring(fullPath.indexOf('?') + 1);
        String beforeHash = timestamp + resourcePath + queryString + requestBodyString;
        String hash = hmacSha256Digest(beforeHash, sharedSecret);
        String token = "xv2:" + timestamp + ":" + hash;
        setToken(token);
    }

    private String timeStamp() {
        return String.valueOf(System.currentTimeMillis() / 1000L);
    }

    private String hmacSha256Digest(String data, String sharedSecret) throws SignatureException {
        return getDigest("HmacSHA256", sharedSecret, data, true);
    }

    private String getDigest(String algorithm, String sharedSecret, String data, boolean toLower) throws SignatureException {
        try {
            Mac sha256HMAC = Mac.getInstance(algorithm);
            SecretKeySpec secretKey = new SecretKeySpec(sharedSecret.getBytes(StandardCharsets.UTF_8), algorithm);
            sha256HMAC.init(secretKey);

            byte[] hashByte = sha256HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
            String hashString = toHex(hashByte);

            return toLower ? hashString.toLowerCase() : hashString;
        } catch (Exception e) {
            throw new SignatureException(e);
        }
    }
}
