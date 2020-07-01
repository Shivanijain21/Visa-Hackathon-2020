package com.visa.developer.sample.funds_transfer_api.model;

public class FundTransferRequest {
    private String token;
    private String amount;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }
}
