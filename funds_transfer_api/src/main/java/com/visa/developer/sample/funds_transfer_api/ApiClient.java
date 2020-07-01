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

package com.visa.developer.sample.funds_transfer_api;


import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.threetenbp.ThreeTenModule;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.RSADecrypter;
import com.nimbusds.jose.crypto.RSAEncrypter;
import com.nimbusds.jose.util.Base64;
import com.nimbusds.jose.util.IOUtils;
import com.visa.developer.sample.funds_transfer_api.auth.ApiKeyAuth;
import com.visa.developer.sample.funds_transfer_api.auth.Authentication;
import com.visa.developer.sample.funds_transfer_api.auth.HttpBasicAuth;
import com.visa.developer.sample.funds_transfer_api.auth.OAuth;
import com.visa.developer.sample.funds_transfer_api.model.EncryptedResponse;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpHost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.bouncycastle.asn1.ASN1Integer;
import org.bouncycastle.asn1.ASN1Sequence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.RequestEntity.BodyBuilder;
import org.springframework.http.client.*;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.AbstractJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.threeten.bp.Instant;
import org.threeten.bp.OffsetDateTime;
import org.threeten.bp.ZonedDateTime;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import java.io.*;
import java.math.BigInteger;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPrivateKeySpec;
import java.text.DateFormat;
import java.text.ParseException;
import java.util.*;
import java.util.Map.Entry;

import static java.util.Arrays.asList;


@Component
public class ApiClient {
    private static String keystorePassword;
    private static String keystorePath;
    private static String privateKeyPassword;
    private static String mleServerPublicCertificatePath;
    private static String mleClientPublicCertificatePath;
    private static String mleClientPrivateKeyPath;
    private static String proxyHostName;
    private static int proxyPortNumber;
    private static String proxyUserName;
    private static String proxyPassword;
    private boolean debugging = false;
    private HttpHeaders defaultHeaders = new HttpHeaders();
    private String basePath = "https://sandbox.api.visa.com/";
    private RestTemplate restTemplate;
    private Map<String, Authentication> authentications;
    private HttpStatus statusCode;
    private MultiValueMap<String, String> responseHeaders;
    private DateFormat dateFormat;

    public ApiClient() {
        init();
    }


    @Autowired
    public ApiClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void setRestTemplate(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    protected void init() {
        // Use RFC3339 format for date and datetime.
        // See http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14
        this.dateFormat = new RFC3339DateFormat();

        // Use UTC as the default time zone.
        this.dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

        // Set default User-Agent.
        setUserAgent("VDP_SampleCode_Java");

        // Setup authentications (key: authentication name, value: authentication).
        authentications = new HashMap<String, Authentication>();
        authentications.put("basicAuth", new HttpBasicAuth());
        // Prevent the authentications from being modified.
        authentications = Collections.unmodifiableMap(authentications);
    }

    /**
     * Get the current base path
     *
     * @return String the base path
     */
    public String getBasePath() {
        return basePath;
    }

    /**
     * Set the base path, which should include the host
     *
     * @param basePath the base path
     * @return ApiClient this client
     */
    public ApiClient setBasePath(String basePath) {
        this.basePath = basePath;
        return this;
    }

    /**
     * Gets the status code of the previous request
     *
     * @return HttpStatus the status code
     */
    public HttpStatus getStatusCode() {
        return statusCode;
    }

    /**
     * Gets the response headers of the previous request
     *
     * @return MultiValueMap a map of response headers
     */
    public MultiValueMap<String, String> getResponseHeaders() {
        return responseHeaders;
    }

    /**
     * Get authentications (key: authentication name, value: authentication).
     *
     * @return Map the currently configured authentication types
     */
    public Map<String, Authentication> getAuthentications() {
        return authentications;
    }

    /**
     * Get authentication for the given name.
     *
     * @param authName The authentication name
     * @return The authentication, null if not found
     */
    public Authentication getAuthentication(String authName) {
        return authentications.get(authName);
    }

    /**
     * Helper method to set username for the first HTTP basic authentication.
     *
     * @param username the username
     */
    public void setUsername(String username) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof HttpBasicAuth) {
                ((HttpBasicAuth) auth).setUsername(username);
            }
        }
    }

    /**
     * Helper method to set password for the first HTTP basic authentication.
     *
     * @param password the password
     */
    public void setPassword(String password) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof HttpBasicAuth) {
                ((HttpBasicAuth) auth).setPassword(password);
            }
        }
    }

    public String getKeystorePassword() {
        return keystorePassword;
    }

    public void setKeystorePassword(String keystorePassword) {
        this.keystorePassword = keystorePassword;
    }

    public String getKeystorePath() {
        return keystorePath;
    }

    public void setKeystorePath(String keystorePath) {
        this.keystorePath = keystorePath;
    }

    public String getPrivateKeyPassword() {
        return privateKeyPassword;
    }

    public void setPrivateKeyPassword(String privateKeyPassword) {
        this.privateKeyPassword = privateKeyPassword;
    }

    public String getMleServerPublicCertificatePath() {
        return mleServerPublicCertificatePath;
    }

    public void setMleServerPublicCertificatePath(String mleServerPublicCertificatePath) {
        this.mleServerPublicCertificatePath = mleServerPublicCertificatePath;
    }

    public String getMleClientPublicCertificatePath() {
        return mleClientPublicCertificatePath;
    }

    public void setMleClientPublicCertificatePath(String mleClientPublicCertificatePath) {
        this.mleClientPublicCertificatePath = mleClientPublicCertificatePath;
    }

    public String getMleClientPrivateKeyPath() {
        return mleClientPrivateKeyPath;
    }

    public void setMleClientPrivateKeyPath(String mleClientPrivateKeyPath) {
        this.mleClientPrivateKeyPath = mleClientPrivateKeyPath;
    }

    public String getProxyHostName() {
        return proxyHostName;
    }

    public void setProxyHostName(String proxyHostName) {
        this.proxyHostName = proxyHostName;
    }

    public String getProxyUserName() {
        return proxyUserName;
    }

    public void setProxyUserName(String proxyHostName) {
        this.proxyUserName = proxyHostName;
    }

    public String getProxyPassword() {
        return proxyPassword;
    }

    public void setProxyPassword(String proxyHostName) {
        this.proxyPassword = proxyPassword;
    }

    public int getProxyPortNumber() {
        return proxyPortNumber;
    }

    public void setProxyPortNumber(int proxyPortNumber) {
        this.proxyPortNumber = proxyPortNumber;
    }

    /**
     * Helper method to set API key value for the first API key authentication.
     *
     * @param apiKey the API key
     */
    public void setApiKey(String apiKey) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof ApiKeyAuth) {
                ((ApiKeyAuth) auth).setApiKey(apiKey);
            }
        }
    }

    /**
     * Helper method to set API key prefix for the first API key authentication.
     *
     * @param apiKeyPrefix the API key prefix
     */
    public void setApiKeyPrefix(String apiKeyPrefix) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof ApiKeyAuth) {
                ((ApiKeyAuth) auth).setApiKeyPrefix(apiKeyPrefix);
            }
        }
    }

    /**
     * Helper method to set KeyId for the MLE.
     *
     * @param keyId the Shared Secret
     */
    public void setKeyId(String keyId) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof ApiKeyAuth) {
                ((ApiKeyAuth) auth).setKeyId(keyId);
            }
        }
    }

    /**
     * Helper method to set Shared Secret for the x-pay-token authentication.
     *
     * @param sharedSecret the Shared Secret
     */
    public void setSharedSecret(String sharedSecret) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof ApiKeyAuth) {
                ((ApiKeyAuth) auth).setSharedSecret(sharedSecret);
            }
        }
    }

    /**
     * Helper method to set access token for the first OAuth2 authentication.
     *
     * @param accessToken the access token
     */
    public void setAccessToken(String accessToken) {
        for (Authentication auth : authentications.values()) {
            if (auth instanceof OAuth) {
                ((OAuth) auth).setAccessToken(accessToken);
            }
        }
    }

    /**
     * Set the User-Agent header's value (by adding to the default header map).
     *
     * @param userAgent the user agent string
     * @return ApiClient this client
     */
    public ApiClient setUserAgent(String userAgent) {
        addDefaultHeader("User-Agent", userAgent);
        return this;
    }

    /**
     * Add a default header.
     *
     * @param name  The header's name
     * @param value The header's value
     * @return ApiClient this client
     */
    public ApiClient addDefaultHeader(String name, String value) {
        defaultHeaders.add(name, value);
        return this;
    }

    public void setDebugging(RestTemplate restTemplate, boolean debugging) {
        List<ClientHttpRequestInterceptor> currentInterceptors = restTemplate.getInterceptors();
        if (debugging) {
            if (currentInterceptors == null) {
                currentInterceptors = new ArrayList<ClientHttpRequestInterceptor>();
            }
            ClientHttpRequestInterceptor interceptor = new ApiClientHttpRequestInterceptor();
            currentInterceptors.add(interceptor);
            restTemplate.setInterceptors(currentInterceptors);
        } else {
            if (currentInterceptors != null && !currentInterceptors.isEmpty()) {
                Iterator<ClientHttpRequestInterceptor> iter = currentInterceptors.iterator();
                while (iter.hasNext()) {
                    ClientHttpRequestInterceptor interceptor = iter.next();
                    if (interceptor instanceof ApiClientHttpRequestInterceptor) {
                        iter.remove();
                    }
                }
                restTemplate.setInterceptors(currentInterceptors);
            }
        }
        this.debugging = debugging;
    }

    /**
     * Check that whether debugging is enabled for this API client.
     *
     * @return boolean true if this client is enabled for debugging, false otherwise
     */
    public boolean isDebugging() {
        return debugging;
    }

    public void setDebugging(boolean debugging) {
        this.debugging = debugging;
    }

    /**
     * Get the date format used to parse/format date parameters.
     *
     * @return DateFormat format
     */
    public DateFormat getDateFormat() {
        return dateFormat;
    }

    /**
     * Set the date format used to parse/format date parameters.
     *
     * @param dateFormat Date format
     * @return API client
     */
    public ApiClient setDateFormat(DateFormat dateFormat) {
        this.dateFormat = dateFormat;

        for (HttpMessageConverter converter : restTemplate.getMessageConverters()) {
            if (converter instanceof AbstractJackson2HttpMessageConverter) {
                ObjectMapper mapper = ((AbstractJackson2HttpMessageConverter) converter).getObjectMapper();
                mapper.setDateFormat(dateFormat);
            }
        }

        return this;
    }

    /**
     * Parse the given string into Date object.
     */
    public Date parseDate(String str) {
        try {
            return dateFormat.parse(str);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Format the given Date object into string.
     */
    public String formatDate(Date date) {
        return dateFormat.format(date);
    }

    /**
     * Format the given parameter object into string.
     *
     * @param param the object to convert
     * @return String the parameter represented as a String
     */
    public String parameterToString(Object param) {
        if (param == null) {
            return "";
        } else if (param instanceof Date) {
            return formatDate((Date) param);
        } else if (param instanceof Collection) {
            StringBuilder b = new StringBuilder();
            for (Object o : (Collection<?>) param) {
                if (b.length() > 0) {
                    b.append(",");
                }
                b.append(String.valueOf(o));
            }
            return b.toString();
        } else {
            return String.valueOf(param);
        }
    }

    /**
     * Converts a parameter to a {@link MultiValueMap} for use in REST requests
     *
     * @param collectionFormat The format to convert to
     * @param name             The name of the parameter
     * @param value            The parameter's value
     * @return a Map containing the String value(s) of the input parameter
     */
    public MultiValueMap<String, String> parameterToMultiValueMap(CollectionFormat collectionFormat, String name, Object value) {
        final MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();

        if (name == null || name.isEmpty() || value == null) {
            return params;
        }

        if (collectionFormat == null) {
            collectionFormat = CollectionFormat.CSV;
        }

        Collection<?> valueCollection = null;
        if (value instanceof Collection) {
            valueCollection = (Collection<?>) value;
        } else {
            params.add(name, parameterToString(value));
            return params;
        }

        if (valueCollection.isEmpty()) {
            return params;
        }

        if (collectionFormat.equals(CollectionFormat.MULTI)) {
            for (Object item : valueCollection) {
                params.add(name, parameterToString(item));
            }
            return params;
        }

        List<String> values = new ArrayList<String>();
        for (Object o : valueCollection) {
            values.add(parameterToString(o));
        }
        params.add(name, collectionFormat.collectionToString(values));

        return params;
    }

    /**
     * Check if the given {@code String} is a JSON MIME.
     *
     * @param mediaType the input MediaType
     * @return boolean true if the MediaType represents JSON, false otherwise
     */
    public boolean isJsonMime(String mediaType) {
        // "* / *" is default to JSON
        if ("*/*".equals(mediaType)) {
            return true;
        }

        try {
            return isJsonMime(MediaType.parseMediaType(mediaType));
        } catch (InvalidMediaTypeException e) {
        }
        return false;
    }

    /**
     * Check if the given MIME is a JSON MIME.
     * JSON MIME examples:
     * application/json
     * application/json; charset=UTF8
     * APPLICATION/JSON
     *
     * @param mediaType the input MediaType
     * @return boolean true if the MediaType represents JSON, false otherwise
     */
    public boolean isJsonMime(MediaType mediaType) {
        return mediaType != null && (MediaType.APPLICATION_JSON.isCompatibleWith(mediaType) || mediaType.getSubtype().matches("^.*\\+json[;]?\\s*$"));
    }

    /**
     * Select the Accept header's value from the given accepts array:
     * if JSON exists in the given array, use it;
     * otherwise use all of them (joining into a string)
     *
     * @param accepts The accepts array to select from
     * @return List The list of MediaTypes to use for the Accept header
     */
    public List<MediaType> selectHeaderAccept(String[] accepts) {
        if (accepts.length == 0) {
            return null;
        }
        for (String accept : accepts) {
            MediaType mediaType = MediaType.parseMediaType(accept);
            if (isJsonMime(mediaType)) {
                return Collections.singletonList(mediaType);
            }
        }
        return MediaType.parseMediaTypes(StringUtils.arrayToCommaDelimitedString(accepts));
    }

    /**
     * Select the Content-Type header's value from the given array:
     * if JSON exists in the given array, use it;
     * otherwise use the first one of the array.
     *
     * @param contentTypes The Content-Type array to select from
     * @return MediaType The Content-Type header to use. If the given array is empty, JSON will be used.
     */
    public MediaType selectHeaderContentType(String[] contentTypes) {
        if (contentTypes.length == 0) {
            return MediaType.APPLICATION_JSON;
        }
        for (String contentType : contentTypes) {
            MediaType mediaType = MediaType.parseMediaType(contentType);
            if (isJsonMime(mediaType)) {
                return mediaType;
            }
        }
        return MediaType.parseMediaType(contentTypes[0]);
    }

    /**
     * Select the body to use for the request
     *
     * @param obj         the body object
     * @param formParams  the form parameters
     * @param contentType the content type of the request
     * @return Object the selected body
     */
    protected Object selectBody(Object obj, MultiValueMap<String, Object> formParams, MediaType contentType) {
        boolean isForm = MediaType.MULTIPART_FORM_DATA.isCompatibleWith(contentType) || MediaType.APPLICATION_FORM_URLENCODED.isCompatibleWith(contentType);
        if (authentications.containsKey("keyId")) {
            try {
                obj = EncryptionUtils.getEncryptedPayload(obj, ((ApiKeyAuth) authentications.get("keyId")).getKeyId());
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return isForm ? formParams : obj;
    }

    /**
     * Invoke API by sending HTTP request with the given options.
     *
     * @param <T>          the return type to use
     * @param path         The sub-path of the HTTP URL
     * @param method       The request method
     * @param queryParams  The query parameters
     * @param body         The request body object
     * @param headerParams The header parameters
     * @param formParams   The form parameters
     * @param accept       The request's Accept header
     * @param contentType  The request's Content-Type header
     * @param authNames    The authentications to apply
     * @param returnType   The return type into which to deserialize the response
     * @return The response body in chosen type
     */
    public <T> T invokeAPI(String path, String resourcePath, HttpMethod method, MultiValueMap<String, String> queryParams, Object body, HttpHeaders headerParams, MultiValueMap<String, Object> formParams, List<MediaType> accept, MediaType contentType, String[] authNames, ParameterizedTypeReference<T> returnType, Class<T> returnClassType) throws RestClientException {
        updateParamsForAuth(authNames, queryParams, headerParams, resourcePath, body);

        List<String> keys = new ArrayList<String>(queryParams.keySet());
        Collections.sort(keys);

        final UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(basePath).path(path);
        if (queryParams != null) {
            for (String key : keys) {
                builder.queryParam(key, queryParams.getFirst(key));
            }
        }

        final BodyBuilder requestBuilder = RequestEntity.method(method, builder.build().toUri());
        if (accept != null) {
            requestBuilder.accept(accept.toArray(new MediaType[accept.size()]));
        }
        if (contentType != null) {
            requestBuilder.contentType(contentType);
        }

        addHeadersToRequest(headerParams, requestBuilder);
        addHeadersToRequest(defaultHeaders, requestBuilder);

        RequestEntity<Object> requestEntity = requestBuilder.body(selectBody(body, formParams, contentType));
//   -------   For Encryption     -------
//      ParameterizedTypeReference<EncryptedResponse> encryptedResponseType = new ParameterizedTypeReference<EncryptedResponse>() {};
//      ResponseEntity<EncryptedResponse> responseEntity = restTemplate.exchange(requestEntity, encryptedResponseType);


        ResponseEntity<T> responseEntity = restTemplate.exchange(requestEntity, returnType);

        statusCode = responseEntity.getStatusCode();
        responseHeaders = responseEntity.getHeaders();

        if (responseEntity.getStatusCode() == HttpStatus.NO_CONTENT) {
            return null;
        } else if (responseEntity.getStatusCode().is2xxSuccessful()) {
            if (returnType == null) {
                return null;
            }
            // -------- For Encryption --------
            // return EncryptionUtils.getDecryptedPayload(responseEntity.getBody(), returnClassType);
            return responseEntity.getBody();
        } else {
            // The error handler built into the RestTemplate should handle 400 and 500 series errors.
            throw new RestClientException("API returned " + statusCode + " and it wasn't handled by the RestTemplate error handler");
        }
    }

    /**
     * Add headers to the request that is being built
     *
     * @param headers        The headers to add
     * @param requestBuilder The current request
     */
    protected void addHeadersToRequest(HttpHeaders headers, BodyBuilder requestBuilder) {
        for (Entry<String, List<String>> entry : headers.entrySet()) {
            List<String> values = entry.getValue();
            for (String value : values) {
                if (value != null) {
                    requestBuilder.header(entry.getKey(), value);
                }
            }
        }
    }

    /**
     * Build the RestTemplate used to make HTTP requests.
     *
     * @return RestTemplate
     */
    public RestTemplate buildRestTemplate() {
        if (this.restTemplate == null) {
            RestTemplate restTemplate = authentications.containsKey("basicAuth") ? getRestTemplateForMutualAuth()
                    : getRestTemplateWithoutMutualAuth();
            this.setDebugging(restTemplate, this.debugging);
            this.restTemplate = restTemplate;
            return restTemplate;
        }
        return this.restTemplate;
    }

    protected RestTemplate getRestTemplateWithoutMutualAuth() {
        CloseableHttpClient httpClient = proxyHostName != null && proxyHostName != "" && proxyPortNumber != 0
                ? HttpClients.custom().setProxy(new HttpHost(proxyHostName, proxyPortNumber)).build()
                : HttpClients.custom().build();
        HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
        requestFactory.setHttpClient(httpClient);
        RestTemplate restTemplate = new RestTemplate(requestFactory);

        for (HttpMessageConverter converter : restTemplate.getMessageConverters()) {
            if (converter instanceof AbstractJackson2HttpMessageConverter) {
                ObjectMapper mapper = ((AbstractJackson2HttpMessageConverter) converter).getObjectMapper();
                ThreeTenModule module = new ThreeTenModule();
                module.addDeserializer(Instant.class, CustomInstantDeserializer.INSTANT);
                module.addDeserializer(OffsetDateTime.class, CustomInstantDeserializer.OFFSET_DATE_TIME);
                module.addDeserializer(ZonedDateTime.class, CustomInstantDeserializer.ZONED_DATE_TIME);
                mapper.registerModule(module);
            }
        }

        // This allows us to read the response more than once - Necessary for debugging.
        restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(restTemplate.getRequestFactory()));
        return restTemplate;
    }

    protected RestTemplate getRestTemplateForMutualAuth() {
        try {
            KeyStore keystore = KeyStore.getInstance(KeyStore.getDefaultType());
            FileInputStream keystoreInputStream = new FileInputStream(keystorePath);
            keystore.load(keystoreInputStream, keystorePassword.toCharArray());
            keystoreInputStream.close();

            SSLContext sslcontext = SSLContexts.custom().useProtocol("TLS")
                    .loadKeyMaterial(keystore, keystorePassword.toCharArray())
                    .loadTrustMaterial(new File(keystorePath), keystorePassword.toCharArray())
                    .build();

            HostnameVerifier hostnameverifier = null;
            SSLConnectionSocketFactory sslSocketFactory = new SSLConnectionSocketFactory(sslcontext, null, null,
                    hostnameverifier);
            CloseableHttpClient httpClient = proxyHostName != null && proxyHostName != "" && proxyPortNumber != 0
                    ? HttpClients.custom().setSSLSocketFactory(sslSocketFactory).setProxy(new HttpHost(proxyHostName, proxyPortNumber)).build()
                    : HttpClients.custom().setSSLSocketFactory(sslSocketFactory).build();

            HttpsURLConnection.setDefaultSSLSocketFactory(sslcontext.getSocketFactory());
            HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
            requestFactory.setReadTimeout(10000);
            requestFactory.setConnectTimeout(30000);
            requestFactory.setHttpClient(httpClient);
            RestTemplate restTemplate = new RestTemplate(requestFactory);

            for (HttpMessageConverter converter : restTemplate.getMessageConverters()) {
                if (converter instanceof AbstractJackson2HttpMessageConverter) {
                    ObjectMapper mapper = ((AbstractJackson2HttpMessageConverter) converter).getObjectMapper();
                    ThreeTenModule module = new ThreeTenModule();
                    module.addDeserializer(Instant.class, CustomInstantDeserializer.INSTANT);
                    module.addDeserializer(OffsetDateTime.class, CustomInstantDeserializer.OFFSET_DATE_TIME);
                    module.addDeserializer(ZonedDateTime.class, CustomInstantDeserializer.ZONED_DATE_TIME);
                    mapper.registerModule(module);
                }
            }
            restTemplate.setRequestFactory(new BufferingClientHttpRequestFactory(restTemplate.getRequestFactory()));
            return restTemplate;

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Update query and header parameters based on authentication settings.
     *
     * @param authNames    The authentications to apply
     * @param queryParams  The query parameters
     * @param headerParams The header parameters
     */
    private void updateParamsForAuth(String[] authNames, MultiValueMap<String, String> queryParams, HttpHeaders headerParams, String resourcePath, Object requestBody) {
        try {
            for (String authName : authNames) {
                Authentication auth = authentications.get(authName);
                if (auth == null) {
                    throw new RestClientException("Authentication undefined: " + authName);
                }
                if (authName == "x-pay-token") {
                    ((ApiKeyAuth) auth).generateAndSetXpaytoken(queryParams, resourcePath, requestBody);
                }
                auth.applyToParams(queryParams, headerParams);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean isAllowedHeader(String header) {
        List<String> allowedHeaders = asList("Accept", "Content-Type", "Authorization", "User-Agent", "Content-Length", "X-Client-Transaction-Id", "X-TRANSACTION-TIMEOUT-MS", "Server", "X-SERVED-BY", "X-CORRELATION-ID", "X-APP-STATUS", "X-Backside-Transport", "X-Global-Transaction-ID", "X-Frame-Options", "X-XSS-Protection", "X-Content-Type-Options", "Strict-Transport-Security", "Cache-Control", "Pragma", "Expires", "Content-Language", "Date", "Connection");
        return allowedHeaders.contains(header);
    }

    public enum CollectionFormat {
        CSV(","), TSV("\t"), SSV(" "), PIPES("|"), MULTI(null);

        private final String separator;

        private CollectionFormat(String separator) {
            this.separator = separator;
        }

        private String collectionToString(Collection<? extends CharSequence> collection) {
            return StringUtils.collectionToDelimitedString(collection, separator);
        }
    }

    static class EncryptionUtils {

        private static final String BEGIN_CERT = "-----BEGIN CERTIFICATE-----";
        private static final String END_CERT = "-----END CERTIFICATE-----";
        private static final String BEGIN_RSA_PRIVATE_KEY = "-----BEGIN RSA PRIVATE KEY-----";
        private static final String END_RSA_PRIVATE_KEY = "-----END RSA PRIVATE KEY-----";
        private static final String ENC_DATA = "encData";

        public static String getEncryptedPayload(Object payload, String keyId) throws CertificateException, JOSEException, IOException {

            ObjectMapper mapper = new ObjectMapper();
            mapper.setSerializationInclusion(Include.NON_NULL);
            mapper.setSerializationInclusion(Include.NON_EMPTY);

            String plainText = payload == null ? "" : mapper.writeValueAsString(payload);
            JWEHeader.Builder headerBuilder = new JWEHeader.Builder(JWEAlgorithm.RSA_OAEP_256, EncryptionMethod.A128GCM);

            headerBuilder.keyID(keyId);
            headerBuilder.customParam("iat", System.currentTimeMillis());

            JWEObject jweObject = new JWEObject(headerBuilder.build(), new Payload(plainText));
            jweObject.encrypt(new RSAEncrypter(getRSAPublicKey()));
            return "{\"encData\":\"" + jweObject.serialize() + "\"}";
        }

        public static <T> T getDecryptedPayload(EncryptedResponse encryptedPayload, Class<T> returnType) {
            String response = encryptedPayload.getEncData();
            T decryptedResponse = null;
            try {
                JWEObject jweObject = JWEObject.parse(response);
                jweObject.decrypt(new RSADecrypter(getRSAPrivateKey()));
                response = jweObject.getPayload().toString();
                ObjectMapper mapper = new ObjectMapper();
                decryptedResponse = mapper.readValue(response, returnType);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return decryptedResponse;
        }

        /*
         * Converts PEM file content to RSAPrivateKey
         */
        private static PrivateKey getRSAPrivateKey() throws IOException, NoSuchAlgorithmException, InvalidKeySpecException {
            String pemEncodedKey = IOUtils.readFileToString(new File(mleClientPrivateKeyPath), Charset.forName("UTF-8"));
            Base64 base64 = new Base64(pemEncodedKey.replaceAll(BEGIN_RSA_PRIVATE_KEY, "").replaceAll(END_RSA_PRIVATE_KEY, ""));
            ASN1Sequence primitive = (ASN1Sequence) ASN1Sequence.fromByteArray(base64.decode());
            Enumeration<?> e = primitive.getObjects();
            BigInteger v = ((ASN1Integer) e.nextElement()).getValue();
            int version = v.intValue();
            if (version != 0 && version != 1) {
                throw new IllegalArgumentException("wrong version for RSA private key");
            }
            BigInteger modulus = ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            BigInteger privateExponent = ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            ((ASN1Integer) e.nextElement()).getValue();
            RSAPrivateKeySpec privateKeySpec = new RSAPrivateKeySpec(modulus, privateExponent);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            return (PrivateKey) keyFactory.generatePrivate(privateKeySpec);
        }

        /*
         * Converts PEM file content to RSAPublicKey
         */
        private static RSAPublicKey getRSAPublicKey() throws CertificateException, IOException {
            String pemEncodedPublicKey = IOUtils.readFileToString(new File(mleServerPublicCertificatePath), Charset.forName("UTF-8"));
            Base64 base64 = new Base64(
                    pemEncodedPublicKey.replaceAll(BEGIN_CERT, "").replaceAll(END_CERT, ""));
            Certificate cf = CertificateFactory.getInstance("X.509")
                    .generateCertificate(new ByteArrayInputStream(base64.decode()));
            return (RSAPublicKey) cf.getPublicKey();
        }
    }

    private class ApiClientHttpRequestInterceptor implements ClientHttpRequestInterceptor {
        private final Log log = LogFactory.getLog(ApiClientHttpRequestInterceptor.class);


        @Override
        public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
            logRequest(request, body);
            ClientHttpResponse response = execution.execute(request, body);

            logResponse(response);
            return response;
        }

        private void logRequest(HttpRequest request, byte[] body) throws UnsupportedEncodingException {
            log.info("URI: " + request.getURI());
            log.info("HTTP Method: " + request.getMethod());
            log.info("HTTP Headers: " + headersToString(request));
            log.info("Request Body: " + new String(body, StandardCharsets.UTF_8));
        }

        private void logResponse(ClientHttpResponse response) throws IOException {
            log.info("HTTP Status Code: " + response.getRawStatusCode());
            log.info("Status Text: " + response.getStatusText());
            log.info("HTTP Headers: " + headersToString(response));
            log.info("Response Body: " + bodyToString(response.getBody()));
        }

        private String headersToString(HttpMessage request) {
            StringBuilder builder = new StringBuilder();

            for (Entry<String, List<String>> entry : request.getHeaders().entrySet()) {
                if (isAllowedHeader(entry.getKey())) {
                    builder.append(entry.getKey()).append("=[");
                    for (String value : entry.getValue()) {
                        builder.append(value).append(",");
                    }
                    builder.setLength(builder.length() - 1); // Get rid of trailing comma
                    builder.append("],");
                }
            }
            builder.setLength(builder.length() - 1); // Get rid of trailing comma
            return builder.toString();
        }

        private String bodyToString(InputStream body) throws IOException {
            StringBuilder builder = new StringBuilder();
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(body, StandardCharsets.UTF_8));
            String line = bufferedReader.readLine();
            while (line != null) {
                builder.append(line).append(System.lineSeparator());
                line = bufferedReader.readLine();
            }
            bufferedReader.close();
            return builder.toString();
        }
    }

}
