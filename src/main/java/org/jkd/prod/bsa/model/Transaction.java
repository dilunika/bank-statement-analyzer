package org.jkd.prod.bsa.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private LocalDate transactionTime;
	
	private String paymentType;
	
	private double amount;
	
	@ManyToOne
	private Statement statement;

	public LocalDate getTransactionTime() {
		return transactionTime;
	}

	public void setTransactionTime(LocalDate transactionTime) {
		this.transactionTime = transactionTime;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public long getId() {
		return id;
	}

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", transactionTime=" + transactionTime + ", paymentType=" + paymentType
				+ ", amount=" + amount + "]";
	}

	public Statement getStatement() {
		return statement;
	}

	public void setStatement(Statement statement) {
		this.statement = statement;
	}
	
}
