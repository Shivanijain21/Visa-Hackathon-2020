package com.visa.developer.sample.funds_transfer_api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.visa.developer.sample.funds_transfer_api.ApiClient;
import com.visa.developer.sample.funds_transfer_api.Config;
import com.visa.developer.sample.funds_transfer_api.api.FundsTransferApi;
import com.visa.developer.sample.funds_transfer_api.model.FundTransferRequest;
import com.visa.developer.sample.funds_transfer_api.model.FundTransferResponse;
import com.visa.developer.sample.funds_transfer_api.model.PullfundspostPayload;
import com.visa.developer.sample.funds_transfer_api.model.PullfundstransactionsgetResponse;
import com.visa.developer.sample.funds_transfer_api.service.FundTransferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestClientResponseException;
import org.threeten.bp.LocalDateTime;
import org.threeten.bp.ZoneId;
import org.threeten.bp.ZonedDateTime;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.temporal.ChronoUnit;
import java.util.Base64;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.security.SecureRandom;
import java.util.UUID;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    FundTransferService fundTransferService;

    static final String message = "transaction was successful";

    private FundsTransferApi api = null;


    @RequestMapping(value = "/fund", method = RequestMethod.POST)
    ResponseEntity<FundTransferResponse> pullFunds(@RequestBody FundTransferRequest fundTransferRequest) throws IOException {
        return getpullfundstransactions(fundTransferRequest.getToken(), fundTransferRequest.getAmount());
    }


    @PostConstruct
    void init() {
        ApiClient apiClient = new ApiClient();
        Config config = new Config();
        apiClient.setUsername(config.getProperty("userName"));
        apiClient.setPassword(decodePassword(config.getProperty("password")));
        //apiClient.setKeystorePath(config.getResourceFilePath(config.getProperty("keyStorePath")));
        apiClient.setKeystorePath("./myProject_keyAndCertBundle.jks");

        apiClient.setKeystorePassword(config.getProperty("keyStorePassword"));
        apiClient.setPrivateKeyPassword(config.getProperty("keyStorePassword"));
        // If behind a proxy set proxy host and port numbers here
        String proxyHostName = config.getProperty("proxyHostName");
        if (!StringUtils.isEmpty(proxyHostName)) {
            apiClient.setProxyHostName(proxyHostName);
            apiClient.setProxyPortNumber(Integer.parseInt(config.getProperty("proxyPortNumber")));
        }

        // Configure HTTP basic authorization: basicAuth

        // To set proxy uncomment the below lines
        // apiClient.setProxyHostName("proxy.address@example.com");
        // apiClient.setProxyPortNumber(0000);

        // To log requests and response set Debug to true

        apiClient.setDebugging(true);
        apiClient.buildRestTemplate();


        api = new FundsTransferApi(apiClient);
    }

    public ResponseEntity<FundTransferResponse> getpullfundstransactions(String token, String amount) throws IOException {
        String jsonPayload = transformPayload("{\"localTransactionDateTime\": \"2016-11-16T23:33:06\", \"businessApplicationId\": \"AA\", \"cpsAuthorizationCharacteristicsIndicator\": \"Y\", \"senderCardExpiryDate\": \"2015-10\", \"amount\": \"124.02\", \"acquirerCountryCode\": \"840\", \"retrievalReferenceNumber\": \"330000550000\", \"cardAcceptor\": {\"idCode\": \"ABCD1234ABCD123\", \"address\": {\"county\": \"081\", \"country\": \"USA\", \"state\": \"CA\", \"zipCode\": \"94404\"}, \"terminalId\": \"ABCD1234\", \"name\": \"Visa Inc. USA-Foster City\"}, \"acquiringBin\": \"408999\", \"systemsTraceAuditNumber\": \"451001\", \"nationalReimbursementFee\": \"11.22\", \"senderCurrencyCode\": \"USD\", \"cavv\": \"0700100038238906000013405823891061668252\", \"foreignExchangeFeeTransaction\": \"11.99\", \"addressVerificationData\": {\"postalCode\": \"12345\", \"street\": \"XYZ St\"}, \"senderPrimaryAccountNumber\": \"4895142232120006\", \"surcharge\": \"11.99\"}");
        ObjectMapper mapper = new ObjectMapper();
        FundTransferResponse
                fundTransferResponse = new FundTransferResponse();
        try {
            PullfundspostPayload body = mapper.readValue(jsonPayload, PullfundspostPayload.class);
            body.setSenderPrimaryAccountNumber(token);
            body.setAmount(Double.valueOf(amount));

            String statusIdentifier = api.postpullfunds(body, new ParameterizedTypeReference<String>() {
            }, String.class, true);

            PullfundstransactionsgetResponse response = api.getpullfundstransactions(statusIdentifier);
        } catch (RestClientResponseException ex) {
            ex.getStackTrace();

            fundTransferResponse.setCode(ex.getRawStatusCode());
            fundTransferResponse.setMessage(ex.getStatusText());
            return new ResponseEntity(fundTransferResponse, HttpStatus.valueOf(ex.getRawStatusCode()));
        }
        fundTransferResponse.setMessage(message);
        fundTransferResponse.setCode(HttpStatus.OK.value());
        return new ResponseEntity(fundTransferResponse, HttpStatus.OK);
    }

    private String transformPayload(String payload) {
        payload = editLocalTime(payload);
        payload = addRandomValue(payload);
        return payload;
    }

    private String editLocalTime(String payload) {
        ZoneId zoneId = ZoneId.of("America/Los_Angeles");
        LocalDateTime localDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        ZonedDateTime laDateTime = ZonedDateTime.of(localDateTime, zoneId);
        payload = payload.replaceAll("\"localTransactionDateTime\":\\s+\".{19}\"",
                "\"localTransactionDateTime\": \"" + DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(laDateTime) + "\"");
        payload = payload.replaceAll("\"dateTimeLocal\":\\s+\".{10}\"",
                "\"dateTimeLocal\": \"" + DateTimeFormatter.ofPattern("MMddHHmmss").format(laDateTime) + "\"");
        return payload;
    }

    private String addRandomValue(String payload) {
        String randomAlphaNumericValue = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
        SecureRandom rand = new SecureRandom();
        Integer randomNumber = rand.nextInt(90000) + 10000;
        payload = payload.replaceAll("random_string", randomAlphaNumericValue);
        payload = payload.replaceAll("random_integer", randomNumber.toString());
        payload = payload.replaceAll("random", randomAlphaNumericValue);
        return payload;
    }

    private String decodePassword(String text) {
        Base64.Decoder decoder = Base64.getDecoder();
        // Decoding string
        String dStr = new String(decoder.decode(text));
        return dStr;
    }
}
