package com.visa.developer.sample.funds_transfer_api.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.visa.developer.sample.funds_transfer_api.api.FundsTransferApi;
import com.visa.developer.sample.funds_transfer_api.model.PullfundspostPayload;
import com.visa.developer.sample.funds_transfer_api.model.PullfundstransactionsgetResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.threeten.bp.LocalDateTime;
import org.threeten.bp.ZoneId;
import org.threeten.bp.ZonedDateTime;
import org.threeten.bp.format.DateTimeFormatter;
import org.threeten.bp.temporal.ChronoUnit;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.UUID;

@Component
public class FundTransferService {

    @Autowired
    FundsTransferApi api;

    public void getpullfundstransactions(String token) throws IOException {
        String jsonPayload = transformPayload("{\"localTransactionDateTime\": \"2016-11-16T23:33:06\", \"businessApplicationId\": \"AA\", \"cpsAuthorizationCharacteristicsIndicator\": \"Y\", \"senderCardExpiryDate\": \"2015-10\", \"amount\": \"124.02\", \"acquirerCountryCode\": \"840\", \"retrievalReferenceNumber\": \"330000550000\", \"cardAcceptor\": {\"idCode\": \"ABCD1234ABCD123\", \"address\": {\"county\": \"081\", \"country\": \"USA\", \"state\": \"CA\", \"zipCode\": \"94404\"}, \"terminalId\": \"ABCD1234\", \"name\": \"Visa Inc. USA-Foster City\"}, \"acquiringBin\": \"408999\", \"systemsTraceAuditNumber\": \"451001\", \"nationalReimbursementFee\": \"11.22\", \"senderCurrencyCode\": \"USD\", \"cavv\": \"0700100038238906000013405823891061668252\", \"foreignExchangeFeeTransaction\": \"11.99\", \"addressVerificationData\": {\"postalCode\": \"12345\", \"street\": \"XYZ St\"}, \"senderPrimaryAccountNumber\": \"4895142232120006\", \"surcharge\": \"11.99\"}");
        ObjectMapper mapper = new ObjectMapper();
        PullfundspostPayload body = mapper.readValue(jsonPayload, PullfundspostPayload.class);

        String statusIdentifier = api.postpullfunds(body, new ParameterizedTypeReference<String>() {
        }, String.class, true);

        PullfundstransactionsgetResponse response = api.getpullfundstransactions(statusIdentifier);
        System.out.println("res");
    }

    public String transformPayload(String payload) {
        payload = editLocalTime(payload);
        payload = addRandomValue(payload);
        return payload;
    }

    public String editLocalTime(String payload) {
        ZoneId zoneId = ZoneId.of("America/Los_Angeles");
        LocalDateTime localDateTime = LocalDateTime.now().truncatedTo(ChronoUnit.SECONDS);
        ZonedDateTime laDateTime = ZonedDateTime.of(localDateTime, zoneId);
        payload = payload.replaceAll("\"localTransactionDateTime\":\\s+\".{19}\"",
                "\"localTransactionDateTime\": \"" + DateTimeFormatter.ISO_LOCAL_DATE_TIME.format(laDateTime) + "\"");
        payload = payload.replaceAll("\"dateTimeLocal\":\\s+\".{10}\"",
                "\"dateTimeLocal\": \"" + DateTimeFormatter.ofPattern("MMddHHmmss").format(laDateTime) + "\"");
        return payload;
    }

    public String addRandomValue(String payload) {
        String randomAlphaNumericValue = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 8);
        SecureRandom rand = new SecureRandom();
        Integer randomNumber = rand.nextInt(90000) + 10000;
        payload = payload.replaceAll("random_string", randomAlphaNumericValue);
        payload = payload.replaceAll("random_integer", randomNumber.toString());
        payload = payload.replaceAll("random", randomAlphaNumericValue);
        return payload;
    }
}
